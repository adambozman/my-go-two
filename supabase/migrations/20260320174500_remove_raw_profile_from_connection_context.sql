CREATE OR REPLACE FUNCTION public.get_connection_for_you_context(
  p_connection_user_id uuid,
  p_days_ahead integer DEFAULT 120
)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH viewer AS (
    SELECT auth.uid() AS viewer_user_id
  ),
  relation AS (
    SELECT
      c.id AS couple_id,
      COALESCE(NULLIF(c.display_label, ''), 'Connection') AS connection_label
    FROM public.couples c
    JOIN viewer v ON true
    WHERE c.status = 'accepted'
      AND (
        (c.inviter_id = v.viewer_user_id AND c.invitee_id = p_connection_user_id)
        OR
        (c.invitee_id = v.viewer_user_id AND c.inviter_id = p_connection_user_id)
      )
    LIMIT 1
  ),
  preference_row AS (
    SELECT
      COALESCE(ccp.connection_kind, 'custom') AS connection_kind,
      COALESCE(ccp.gifting_enabled, true) AS gifting_enabled,
      COALESCE(ccp.occasion_tracking_enabled, true) AS occasion_tracking_enabled,
      COALESCE(ccp.access_tier, 'free') AS access_tier,
      COALESCE(
        ccp.feature_gates,
        jsonb_build_object(
          'connection_context', true,
          'occasion_gifting', true,
          'deep_gifting', false
        )
      ) AS feature_gates
    FROM relation r
    LEFT JOIN public.connection_context_preferences ccp
      ON ccp.couple_id = r.couple_id
     AND ccp.owner_user_id = (SELECT viewer_user_id FROM viewer)
     AND ccp.connection_user_id = p_connection_user_id
  ),
  shared_profile AS (
    SELECT sp.*
    FROM relation r
    JOIN viewer v ON true
    CROSS JOIN LATERAL public.get_connection_shared_profile(
      r.couple_id,
      p_connection_user_id,
      v.viewer_user_id
    ) sp
  ),
  shared_cards AS (
    SELECT COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', ce.id,
          'entry_name', ce.entry_name,
          'group_name', ce.group_name,
          'card_key', ce.card_key,
          'field_values', ce.field_values,
          'image_url', ce.image_url,
          'updated_at', ce.updated_at
        )
        ORDER BY ce.updated_at DESC
      ),
      '[]'::jsonb
    ) AS cards
    FROM relation r
    JOIN viewer v ON true
    CROSS JOIN LATERAL public.get_connection_visible_card_entries(
      r.couple_id,
      p_connection_user_id,
      v.viewer_user_id
    ) ce
  ),
  shared_vibe AS (
    SELECT COALESCE(
      (
        SELECT jsonb_build_object(
          'persona_summary', vibe.persona_summary,
          'updated_at', vibe.updated_at
        )
        FROM relation r
        JOIN viewer v ON true
        LEFT JOIN LATERAL public.get_connection_shared_vibe(
          r.couple_id,
          p_connection_user_id,
          v.viewer_user_id
        ) vibe ON true
        LIMIT 1
      ),
      '{}'::jsonb
    ) AS vibe
  ),
  shared_recommendations AS (
    SELECT COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', recommendation.id,
            'summary', recommendation.summary,
            'products', recommendation.products,
            'updated_at', recommendation.updated_at
          )
          ORDER BY recommendation.updated_at DESC
        )
        FROM relation r
        JOIN viewer v ON true
        LEFT JOIN LATERAL public.get_connection_shared_recommendations(
          r.couple_id,
          p_connection_user_id,
          v.viewer_user_id
        ) recommendation ON true
      ),
      '[]'::jsonb
    ) AS recommendations
  ),
  relevant_occasions AS (
    SELECT COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'occasion_type', o.occasion_type,
          'occasion_label', o.occasion_label,
          'occasion_date', o.occasion_date,
          'source_type', o.source_type,
          'metadata', o.metadata
        )
        ORDER BY o.occasion_date ASC, o.occasion_label ASC
      ),
      '[]'::jsonb
    ) AS occasions
    FROM public.get_connection_relevant_occasions(p_connection_user_id, p_days_ahead) o
  )
  SELECT jsonb_build_object(
    'connection_user_id', p_connection_user_id,
    'connection_label', COALESCE(NULLIF(r.connection_label, ''), NULLIF(sp.display_name, ''), 'Connection'),
    'connection_kind', pr.connection_kind,
    'gifting_enabled', pr.gifting_enabled,
    'occasion_tracking_enabled', pr.occasion_tracking_enabled,
    'access_tier', pr.access_tier,
    'feature_gates', pr.feature_gates,
    'profile', jsonb_build_object(
      'display_name', sp.display_name,
      'avatar_url', sp.avatar_url,
      'birthday', sp.birthday,
      'anniversary', sp.anniversary
    ),
    'derived', jsonb_build_object(
      'your_vibe', sv.vibe ->> 'persona_summary',
      'shared_recommendations', sr.recommendations
    ),
    'shared_card_entries', sc.cards,
    'upcoming_occasions', ro.occasions
  )
  FROM relation r
  JOIN preference_row pr ON true
  LEFT JOIN shared_profile sp ON true
  JOIN shared_cards sc ON true
  JOIN shared_vibe sv ON true
  JOIN shared_recommendations sr ON true
  JOIN relevant_occasions ro ON true;
$$;
