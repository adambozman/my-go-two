CREATE OR REPLACE FUNCTION public.next_holiday_occurrence(
  p_month integer,
  p_day integer
)
RETURNS date
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  current_year integer;
  candidate date;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  candidate := make_date(current_year, p_month, p_day);

  IF candidate < CURRENT_DATE THEN
    candidate := make_date(current_year + 1, p_month, p_day);
  END IF;

  RETURN candidate;
END;
$$;

CREATE OR REPLACE FUNCTION public.connection_kind_allows_occasion(
  p_connection_kind text,
  p_occasion_type text
)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN COALESCE(p_connection_kind, 'custom') = 'significant_other' THEN
      COALESCE(p_occasion_type, '') IN (
        'birthday',
        'anniversary',
        'christmas',
        'valentines_day',
        'reminder',
        'custom'
      )
    WHEN COALESCE(p_connection_kind, 'custom') IN ('parent', 'family', 'friend', 'coworker', 'custom') THEN
      COALESCE(p_occasion_type, '') IN (
        'birthday',
        'christmas',
        'reminder',
        'custom'
      )
    ELSE false
  END;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_relevant_occasions(
  p_connection_user_id uuid,
  p_days_ahead integer DEFAULT 120
)
RETURNS TABLE (
  occasion_type text,
  occasion_label text,
  occasion_date date,
  source_type text,
  metadata jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH viewer AS (
    SELECT auth.uid() AS viewer_user_id
  ),
  relation AS (
    SELECT c.id AS couple_id
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
  context_pref AS (
    SELECT COALESCE(ccp.connection_kind, 'custom') AS connection_kind
    FROM relation r
    LEFT JOIN public.connection_context_preferences ccp
      ON ccp.couple_id = r.couple_id
     AND ccp.owner_user_id = (SELECT viewer_user_id FROM viewer)
     AND ccp.connection_user_id = p_connection_user_id
  ),
  base_occasions AS (
    SELECT
      o.occasion_type,
      o.occasion_label,
      o.occasion_date,
      o.source_type,
      o.metadata
    FROM public.get_connection_upcoming_occasions(p_connection_user_id, p_days_ahead) o
  ),
  holiday_occasions AS (
    SELECT
      'christmas'::text AS occasion_type,
      'Christmas'::text AS occasion_label,
      public.next_holiday_occurrence(12, 25) AS occasion_date,
      'holiday'::text AS source_type,
      jsonb_build_object('scope', 'global') AS metadata
    UNION ALL
    SELECT
      'valentines_day'::text AS occasion_type,
      'Valentine''s Day'::text AS occasion_label,
      public.next_holiday_occurrence(2, 14) AS occasion_date,
      'holiday'::text AS source_type,
      jsonb_build_object('scope', 'global') AS metadata
  ),
  combined AS (
    SELECT * FROM base_occasions
    UNION ALL
    SELECT * FROM holiday_occasions
  )
  SELECT
    c.occasion_type,
    c.occasion_label,
    c.occasion_date,
    c.source_type,
    c.metadata
  FROM combined c
  CROSS JOIN context_pref cp
  WHERE c.occasion_date >= CURRENT_DATE
    AND c.occasion_date <= CURRENT_DATE + GREATEST(p_days_ahead, 1)
    AND public.connection_kind_allows_occasion(cp.connection_kind, c.occasion_type)
  ORDER BY c.occasion_date ASC, c.occasion_label ASC;
$$;

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
      COALESCE(c.display_label, p.display_name, 'Connection') AS connection_label
    FROM public.couples c
    JOIN viewer v ON true
    LEFT JOIN public.profiles p
      ON p.user_id = p_connection_user_id
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
    SELECT sv.persona_summary AS vibe_summary
    FROM relation r
    JOIN viewer v ON true
    LEFT JOIN LATERAL public.get_connection_shared_vibe(
      r.couple_id,
      p_connection_user_id,
      v.viewer_user_id
    ) sv ON true
  ),
  shared_recommendations AS (
    SELECT COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', sr.id,
          'week_start', sr.week_start,
          'generated_at', sr.generated_at,
          'products', sr.products
        )
        ORDER BY sr.week_start DESC, sr.generated_at DESC
      ),
      '[]'::jsonb
    ) AS recommendations
    FROM relation r
    JOIN viewer v ON true
    LEFT JOIN LATERAL public.get_connection_shared_recommendations(
      r.couple_id,
      p_connection_user_id,
      v.viewer_user_id
    ) sr ON true
  ),
  occasions AS (
    SELECT COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'occasion_type', o.occasion_type,
          'occasion_label', o.occasion_label,
          'occasion_date', o.occasion_date,
          'source_type', o.source_type,
          'metadata', o.metadata
        )
        ORDER BY o.occasion_date ASC
      ),
      '[]'::jsonb
    ) AS upcoming
    FROM public.get_connection_relevant_occasions(p_connection_user_id, p_days_ahead) o
  )
  SELECT jsonb_build_object(
    'viewer_user_id', v.viewer_user_id,
    'connection_user_id', p_connection_user_id,
    'couple_id', r.couple_id,
    'connection_label', r.connection_label,
    'connection_kind', pr.connection_kind,
    'gifting_enabled', pr.gifting_enabled,
    'occasion_tracking_enabled', pr.occasion_tracking_enabled,
    'access_tier', pr.access_tier,
    'feature_gates', pr.feature_gates,
    'profile', COALESCE(to_jsonb(sp), '{}'::jsonb),
    'derived', jsonb_build_object(
      'your_vibe', sv.vibe_summary,
      'shared_recommendations', sr.recommendations
    ),
    'upcoming_occasions', oc.upcoming,
    'shared_card_entries', sc.cards,
    'generated_at', now()
  )
  FROM viewer v
  JOIN relation r ON true
  JOIN preference_row pr ON true
  LEFT JOIN shared_profile sp ON true
  JOIN shared_cards sc ON true
  JOIN shared_vibe sv ON true
  JOIN shared_recommendations sr ON true
  JOIN occasions oc ON true;
$$;
