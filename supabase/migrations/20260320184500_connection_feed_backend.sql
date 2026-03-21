ALTER TABLE public.connection_context_preferences
  ADD COLUMN IF NOT EXISTS feed_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS for_them_enabled boolean NOT NULL DEFAULT true;

CREATE OR REPLACE FUNCTION public.get_connection_feed(
  p_limit integer DEFAULT 40,
  p_couple_id uuid DEFAULT NULL
)
RETURNS TABLE (
  feed_item_id text,
  couple_id uuid,
  connection_user_id uuid,
  connection_label text,
  item_kind text,
  title text,
  subtitle text,
  body text,
  image_url text,
  section text,
  event_at timestamptz,
  meta jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH viewer AS (
    SELECT auth.uid() AS viewer_user_id
  ),
  relations AS (
    SELECT
      c.id AS couple_id,
      CASE
        WHEN c.inviter_id = v.viewer_user_id THEN c.invitee_id
        ELSE c.inviter_id
      END AS connection_user_id,
      COALESCE(
        c.display_label,
        sp.display_name,
        'Connection'
      ) AS connection_label,
      COALESCE(ccp.feed_enabled, true) AS feed_enabled,
      COALESCE(ccp.occasion_tracking_enabled, true) AS occasion_tracking_enabled
    FROM public.couples c
    JOIN viewer v ON true
    LEFT JOIN public.connection_context_preferences ccp
      ON ccp.couple_id = c.id
     AND ccp.owner_user_id = v.viewer_user_id
     AND ccp.connection_user_id = CASE
        WHEN c.inviter_id = v.viewer_user_id THEN c.invitee_id
        ELSE c.inviter_id
      END
    LEFT JOIN LATERAL public.get_connection_shared_profile(
      c.id,
      CASE
        WHEN c.inviter_id = v.viewer_user_id THEN c.invitee_id
        ELSE c.inviter_id
      END,
      v.viewer_user_id
    ) sp ON true
    WHERE c.status = 'accepted'
      AND (
        c.inviter_id = v.viewer_user_id
        OR c.invitee_id = v.viewer_user_id
      )
      AND (p_couple_id IS NULL OR c.id = p_couple_id)
  ),
  card_events AS (
    SELECT
      'card:' || ce.id::text AS feed_item_id,
      r.couple_id,
      r.connection_user_id,
      r.connection_label,
      'card_update'::text AS item_kind,
      ce.entry_name AS title,
      ce.group_name AS subtitle,
      'Shared a product card'::text AS body,
      ce.image_url,
      public.infer_card_entry_section(ce.card_key, ce.group_name, ce.entry_name) AS section,
      GREATEST(ce.updated_at, sce.created_at) AS event_at,
      jsonb_build_object(
        'card_entry_id', ce.id,
        'card_key', ce.card_key,
        'group_name', ce.group_name
      ) AS meta
    FROM relations r
    JOIN viewer v ON true
    JOIN public.shared_card_entries sce
      ON sce.couple_id = r.couple_id
     AND sce.owner_user_id = r.connection_user_id
     AND sce.connection_user_id = v.viewer_user_id
    JOIN public.card_entries ce
      ON ce.id = sce.card_entry_id
    WHERE r.feed_enabled
  ),
  profile_events AS (
    SELECT
      'profile:' || spf.id::text AS feed_item_id,
      r.couple_id,
      r.connection_user_id,
      r.connection_label,
      'profile_signal'::text AS item_kind,
      CASE spf.field_key
        WHEN 'display_name' THEN 'Shared display name'
        WHEN 'avatar_url' THEN 'Shared profile photo'
        WHEN 'birthday' THEN 'Shared birthday'
        WHEN 'anniversary' THEN 'Shared anniversary'
        ELSE 'Shared profile update'
      END AS title,
      r.connection_label AS subtitle,
      CASE spf.field_key
        WHEN 'display_name' THEN COALESCE(p.display_name, 'Display name shared')
        WHEN 'avatar_url' THEN 'A profile photo is now visible to you'
        WHEN 'birthday' THEN 'Birthday is now available in your connection view'
        WHEN 'anniversary' THEN 'Anniversary is now available in your connection view'
        ELSE 'Shared profile access changed'
      END AS body,
      CASE
        WHEN spf.field_key = 'avatar_url' THEN p.avatar_url
        ELSE NULL
      END AS image_url,
      'profile'::text AS section,
      GREATEST(spf.updated_at, spf.created_at) AS event_at,
      jsonb_build_object('field_key', spf.field_key) AS meta
    FROM relations r
    JOIN viewer v ON true
    JOIN public.shared_profile_fields spf
      ON spf.couple_id = r.couple_id
     AND spf.owner_user_id = r.connection_user_id
     AND spf.connection_user_id = v.viewer_user_id
     AND spf.is_shared = true
    JOIN public.profiles p
      ON p.user_id = r.connection_user_id
    WHERE r.feed_enabled
  ),
  derived_events AS (
    SELECT
      'derived:' || sdf.id::text AS feed_item_id,
      r.couple_id,
      r.connection_user_id,
      r.connection_label,
      'derived_signal'::text AS item_kind,
      CASE sdf.feature_key
        WHEN 'your_vibe' THEN 'Shared Your Vibe'
        WHEN 'for_you_recommendations' THEN 'Shared recommendation signals'
        WHEN 'ai_conversation_access' THEN 'Opened AI conversation access'
        ELSE 'Shared derived feature'
      END AS title,
      r.connection_label AS subtitle,
      CASE sdf.feature_key
        WHEN 'your_vibe' THEN COALESCE(sv.persona_summary, 'Your Vibe is now visible to you')
        WHEN 'for_you_recommendations' THEN 'Recommendation results are available in this connection'
        WHEN 'ai_conversation_access' THEN 'AI conversation access has been enabled for this connection'
        ELSE 'A derived connection feature changed'
      END AS body,
      NULL::text AS image_url,
      'derived'::text AS section,
      GREATEST(sdf.updated_at, sdf.created_at) AS event_at,
      jsonb_build_object(
        'feature_key', sdf.feature_key,
        'has_vibe', CASE WHEN sdf.feature_key = 'your_vibe' AND sv.persona_summary IS NOT NULL THEN true ELSE false END,
        'recommendation_count', CASE
          WHEN sdf.feature_key = 'for_you_recommendations'
            THEN CASE
              WHEN jsonb_typeof(sr.products) = 'array' THEN jsonb_array_length(sr.products)
              ELSE 0
            END
          ELSE 0
        END
      ) AS meta
    FROM relations r
    JOIN viewer v ON true
    JOIN public.shared_derived_features sdf
      ON sdf.couple_id = r.couple_id
     AND sdf.owner_user_id = r.connection_user_id
     AND sdf.connection_user_id = v.viewer_user_id
     AND sdf.is_shared = true
    LEFT JOIN LATERAL public.get_connection_shared_vibe(
      r.couple_id,
      r.connection_user_id,
      v.viewer_user_id
    ) sv ON sdf.feature_key = 'your_vibe'
    LEFT JOIN LATERAL public.get_connection_shared_recommendations(
      r.couple_id,
      r.connection_user_id,
      v.viewer_user_id
    ) sr ON sdf.feature_key = 'for_you_recommendations'
    WHERE r.feed_enabled
  ),
  occasion_events AS (
    SELECT
      'occasion:' || r.couple_id::text || ':' || o.occasion_type || ':' || o.occasion_date::text AS feed_item_id,
      r.couple_id,
      r.connection_user_id,
      r.connection_label,
      'occasion'::text AS item_kind,
      o.occasion_label AS title,
      r.connection_label AS subtitle,
      CASE o.source_type
        WHEN 'shared_profile' THEN 'Upcoming shared profile milestone'
        WHEN 'calendar' THEN 'Upcoming connection calendar event'
        WHEN 'holiday' THEN 'Upcoming relevant holiday'
        ELSE 'Upcoming occasion'
      END AS body,
      NULL::text AS image_url,
      'calendar'::text AS section,
      o.occasion_date::timestamptz AS event_at,
      jsonb_build_object(
        'occasion_type', o.occasion_type,
        'occasion_date', o.occasion_date,
        'source_type', o.source_type,
        'metadata', o.metadata
      ) AS meta
    FROM relations r
    CROSS JOIN LATERAL public.get_connection_relevant_occasions(r.connection_user_id, 120) o
    WHERE r.feed_enabled
      AND r.occasion_tracking_enabled
  )
  SELECT
    feed.feed_item_id,
    feed.couple_id,
    feed.connection_user_id,
    feed.connection_label,
    feed.item_kind,
    feed.title,
    feed.subtitle,
    feed.body,
    feed.image_url,
    feed.section,
    feed.event_at,
    feed.meta
  FROM (
    SELECT * FROM card_events
    UNION ALL
    SELECT * FROM profile_events
    UNION ALL
    SELECT * FROM derived_events
    UNION ALL
    SELECT * FROM occasion_events
  ) feed
  ORDER BY
    CASE WHEN feed.item_kind = 'occasion' THEN 0 ELSE 1 END,
    CASE WHEN feed.item_kind = 'occasion' THEN feed.event_at END ASC NULLS LAST,
    CASE WHEN feed.item_kind <> 'occasion' THEN feed.event_at END DESC NULLS LAST
  LIMIT GREATEST(COALESCE(p_limit, 40), 1);
$$;
