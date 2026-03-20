CREATE TABLE public.connection_context_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_kind text NOT NULL DEFAULT 'custom' CHECK (
    connection_kind IN ('significant_other', 'parent', 'family', 'friend', 'coworker', 'custom')
  ),
  gifting_enabled boolean NOT NULL DEFAULT true,
  occasion_tracking_enabled boolean NOT NULL DEFAULT true,
  access_tier text NOT NULL DEFAULT 'free' CHECK (
    access_tier IN ('free', 'premium', 'concierge')
  ),
  feature_gates jsonb NOT NULL DEFAULT jsonb_build_object(
    'connection_context', true,
    'occasion_gifting', true,
    'deep_gifting', false
  ),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, owner_user_id, connection_user_id)
);

ALTER TABLE public.connection_context_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view connection context preferences"
ON public.connection_context_preferences
FOR SELECT
USING (auth.uid() = owner_user_id);

CREATE POLICY "Owners can insert connection context preferences"
ON public.connection_context_preferences
FOR INSERT
WITH CHECK (
  auth.uid() = owner_user_id
  AND EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = connection_context_preferences.couple_id
      AND c.status = 'accepted'
      AND (
        (c.inviter_id = owner_user_id AND c.invitee_id = connection_user_id)
        OR
        (c.invitee_id = owner_user_id AND c.inviter_id = connection_user_id)
      )
  )
);

CREATE POLICY "Owners can update connection context preferences"
ON public.connection_context_preferences
FOR UPDATE
USING (auth.uid() = owner_user_id)
WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Owners can delete connection context preferences"
ON public.connection_context_preferences
FOR DELETE
USING (auth.uid() = owner_user_id);

CREATE TRIGGER update_connection_context_preferences_updated_at
BEFORE UPDATE ON public.connection_context_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.connection_context_preferences;

CREATE TABLE public.connection_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  viewer_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recommendation_scope text NOT NULL DEFAULT 'for_you' CHECK (
    recommendation_scope IN ('for_you')
  ),
  recommendation_kind text NOT NULL DEFAULT 'gift' CHECK (
    recommendation_kind IN ('gift', 'occasion', 'general')
  ),
  occasion_type text,
  occasion_date date,
  access_tier text NOT NULL DEFAULT 'free' CHECK (
    access_tier IN ('free', 'premium', 'concierge')
  ),
  gate_key text NOT NULL DEFAULT 'connection_gifting',
  status text NOT NULL DEFAULT 'draft' CHECK (
    status IN ('draft', 'ready', 'archived')
  ),
  source_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.connection_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Viewers can view connection recommendations"
ON public.connection_recommendations
FOR SELECT
USING (auth.uid() = viewer_user_id);

CREATE POLICY "Viewers can insert connection recommendations"
ON public.connection_recommendations
FOR INSERT
WITH CHECK (auth.uid() = viewer_user_id);

CREATE POLICY "Viewers can update connection recommendations"
ON public.connection_recommendations
FOR UPDATE
USING (auth.uid() = viewer_user_id)
WITH CHECK (auth.uid() = viewer_user_id);

CREATE POLICY "Viewers can delete connection recommendations"
ON public.connection_recommendations
FOR DELETE
USING (auth.uid() = viewer_user_id);

CREATE INDEX idx_connection_recommendations_viewer_connection
ON public.connection_recommendations (viewer_user_id, connection_user_id, updated_at DESC);

CREATE TRIGGER update_connection_recommendations_updated_at
BEFORE UPDATE ON public.connection_recommendations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.connection_recommendations;

CREATE OR REPLACE FUNCTION public.next_annual_occurrence(p_original_date date)
RETURNS date
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  current_year integer;
  candidate date;
  month_part integer;
  day_part integer;
BEGIN
  IF p_original_date IS NULL THEN
    RETURN NULL;
  END IF;

  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  month_part := EXTRACT(MONTH FROM p_original_date);
  day_part := EXTRACT(DAY FROM p_original_date);

  candidate := make_date(
    current_year,
    month_part,
    LEAST(day_part, EXTRACT(DAY FROM (date_trunc('month', make_date(current_year, month_part, 1)) + interval '1 month - 1 day'))::int)
  );

  IF candidate < CURRENT_DATE THEN
    candidate := make_date(
      current_year + 1,
      month_part,
      LEAST(day_part, EXTRACT(DAY FROM (date_trunc('month', make_date(current_year + 1, month_part, 1)) + interval '1 month - 1 day'))::int)
    );
  END IF;

  RETURN candidate;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_upcoming_occasions(
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
  shared_profile AS (
    SELECT *
    FROM viewer v
    JOIN relation r ON true
    CROSS JOIN LATERAL public.get_connection_shared_profile(
      r.couple_id,
      p_connection_user_id,
      v.viewer_user_id
    ) sp
  ),
  profile_occasions AS (
    SELECT
      'birthday'::text AS occasion_type,
      'Birthday'::text AS occasion_label,
      public.next_annual_occurrence(NULLIF(sp.birthday, '')::date) AS occasion_date,
      'shared_profile'::text AS source_type,
      jsonb_build_object('field_key', 'birthday') AS metadata
    FROM shared_profile sp
    WHERE NULLIF(sp.birthday, '') IS NOT NULL

    UNION ALL

    SELECT
      'anniversary'::text AS occasion_type,
      'Anniversary'::text AS occasion_label,
      public.next_annual_occurrence(NULLIF(sp.anniversary, '')::date) AS occasion_date,
      'shared_profile'::text AS source_type,
      jsonb_build_object('field_key', 'anniversary') AS metadata
    FROM shared_profile sp
    WHERE NULLIF(sp.anniversary, '') IS NOT NULL
  ),
  calendar_occasions AS (
    SELECT
      ce.event_type AS occasion_type,
      ce.title AS occasion_label,
      ce.date AS occasion_date,
      'calendar'::text AS source_type,
      jsonb_build_object(
        'event_id', ce.id,
        'description', ce.description,
        'source_type', ce.source_type
      ) AS metadata
    FROM public.calendar_events ce
    JOIN viewer v ON v.viewer_user_id = ce.user_id
    WHERE ce.connection_user_id = p_connection_user_id
      AND ce.date >= CURRENT_DATE
      AND ce.date <= CURRENT_DATE + GREATEST(p_days_ahead, 1)
  )
  SELECT
    o.occasion_type,
    o.occasion_label,
    o.occasion_date,
    o.source_type,
    o.metadata
  FROM (
    SELECT * FROM profile_occasions
    UNION ALL
    SELECT * FROM calendar_occasions
  ) o
  WHERE o.occasion_date IS NOT NULL
    AND o.occasion_date <= CURRENT_DATE + GREATEST(p_days_ahead, 1)
  ORDER BY o.occasion_date ASC, o.occasion_label ASC;
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
    FROM public.get_connection_upcoming_occasions(p_connection_user_id, p_days_ahead) o
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

CREATE OR REPLACE FUNCTION public.prepare_connection_recommendation(
  p_connection_user_id uuid,
  p_recommendation_kind text DEFAULT 'gift',
  p_occasion_type text DEFAULT NULL,
  p_occasion_date date DEFAULT NULL,
  p_gate_key text DEFAULT 'connection_gifting'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
  relation_row record;
  context_payload jsonb;
  inserted_id uuid;
  resolved_access_tier text := 'free';
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_recommendation_kind NOT IN ('gift', 'occasion', 'general') THEN
    RAISE EXCEPTION 'Invalid recommendation kind';
  END IF;

  SELECT
    c.id AS couple_id
  INTO relation_row
  FROM public.couples c
  WHERE c.status = 'accepted'
    AND (
      (c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id)
      OR
      (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id)
    )
  LIMIT 1;

  IF relation_row.couple_id IS NULL THEN
    RAISE EXCEPTION 'Accepted connection not found';
  END IF;

  context_payload := public.get_connection_for_you_context(p_connection_user_id, 120);
  resolved_access_tier := COALESCE(context_payload ->> 'access_tier', 'free');

  INSERT INTO public.connection_recommendations (
    couple_id,
    viewer_user_id,
    connection_user_id,
    recommendation_scope,
    recommendation_kind,
    occasion_type,
    occasion_date,
    access_tier,
    gate_key,
    status,
    source_snapshot,
    recommendations
  ) VALUES (
    relation_row.couple_id,
    viewer_user_id,
    p_connection_user_id,
    'for_you',
    p_recommendation_kind,
    p_occasion_type,
    p_occasion_date,
    resolved_access_tier,
    p_gate_key,
    'draft',
    context_payload,
    '[]'::jsonb
  )
  RETURNING id INTO inserted_id;

  RETURN inserted_id;
END;
$$;
