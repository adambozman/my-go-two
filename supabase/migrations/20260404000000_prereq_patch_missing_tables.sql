-- Prerequisite patch: creates tables that were added in legacy migrations
-- (20260320150000–20260326234412) which were marked as applied without running
-- on the fresh DB migration. All statements are idempotent (IF NOT EXISTS).
-- v2_runtime_catchup (20260411113000) also creates these with IF NOT EXISTS,
-- so whichever migration runs first wins and the other is a safe no-op.

-- ============================================================
-- saved_product_cards
-- ============================================================
CREATE TABLE IF NOT EXISTS public.saved_product_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_card_key text NOT NULL,
  subcategory_label text NOT NULL DEFAULT '',
  card_title text NOT NULL DEFAULT '',
  field_values jsonb NOT NULL DEFAULT '{}'::jsonb,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_product_cards
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS field_values jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS subcategory_label text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS card_title text NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_saved_product_cards_user_key
  ON public.saved_product_cards (user_id, product_card_key);

ALTER TABLE public.saved_product_cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own saved product cards" ON public.saved_product_cards;
CREATE POLICY "Users manage own saved product cards"
  ON public.saved_product_cards
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_saved_product_cards_updated_at ON public.saved_product_cards;
CREATE TRIGGER update_saved_product_cards_updated_at
BEFORE UPDATE ON public.saved_product_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- user_connections
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_email text,
  invitee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  display_label text,
  photo_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_connections
  ADD COLUMN IF NOT EXISTS display_label text,
  ADD COLUMN IF NOT EXISTS photo_url text;

ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own user connections" ON public.user_connections;
CREATE POLICY "Users can view own user connections"
  ON public.user_connections
  FOR SELECT
  USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);

DROP POLICY IF EXISTS "Users can create user connections" ON public.user_connections;
CREATE POLICY "Users can create user connections"
  ON public.user_connections
  FOR INSERT
  WITH CHECK (auth.uid() = inviter_id);

DROP POLICY IF EXISTS "Users can update own user connections" ON public.user_connections;
CREATE POLICY "Users can update own user connections"
  ON public.user_connections
  FOR UPDATE
  USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);

DROP POLICY IF EXISTS "Users can delete own user connections" ON public.user_connections;
CREATE POLICY "Users can delete own user connections"
  ON public.user_connections
  FOR DELETE
  USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);

DROP TRIGGER IF EXISTS update_user_connections_updated_at ON public.user_connections;
CREATE TRIGGER update_user_connections_updated_at
BEFORE UPDATE ON public.user_connections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- connection_access_settings
-- ============================================================
CREATE TABLE IF NOT EXISTS public.connection_access_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_connection_id uuid NOT NULL REFERENCES public.user_connections(id) ON DELETE CASCADE,
  connection_kind text NOT NULL DEFAULT 'custom',
  access_tier text NOT NULL DEFAULT 'free',
  feed_enabled boolean NOT NULL DEFAULT true,
  occasion_tracking_enabled boolean NOT NULL DEFAULT true,
  for_them_enabled boolean NOT NULL DEFAULT true,
  gifting_enabled boolean NOT NULL DEFAULT true,
  feature_gates jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_connection_id, owner_user_id, connection_user_id)
);

ALTER TABLE public.connection_access_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own connection access settings" ON public.connection_access_settings;
CREATE POLICY "Users manage own connection access settings"
  ON public.connection_access_settings
  FOR ALL
  USING (auth.uid() = owner_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

DROP TRIGGER IF EXISTS update_connection_access_settings_updated_at ON public.connection_access_settings;
CREATE TRIGGER update_connection_access_settings_updated_at
BEFORE UPDATE ON public.connection_access_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- shared_connection_profile_fields
-- ============================================================
CREATE TABLE IF NOT EXISTS public.shared_connection_profile_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_connection_id uuid NOT NULL REFERENCES public.user_connections(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  field_key text NOT NULL CHECK (field_key IN ('display_name', 'avatar_url', 'birthday', 'anniversary')),
  is_shared boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_connection_id, owner_user_id, connection_user_id, field_key)
);

ALTER TABLE public.shared_connection_profile_fields ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own shared profile fields" ON public.shared_connection_profile_fields;
CREATE POLICY "Users manage own shared profile fields"
  ON public.shared_connection_profile_fields
  FOR ALL
  USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

DROP TRIGGER IF EXISTS update_shared_connection_profile_fields_updated_at ON public.shared_connection_profile_fields;
CREATE TRIGGER update_shared_connection_profile_fields_updated_at
BEFORE UPDATE ON public.shared_connection_profile_fields
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- shared_connection_derivations
-- ============================================================
CREATE TABLE IF NOT EXISTS public.shared_connection_derivations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_connection_id uuid NOT NULL REFERENCES public.user_connections(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature_key text NOT NULL CHECK (feature_key IN ('your_vibe', 'for_you_recommendations', 'ai_conversation_access')),
  is_shared boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_connection_id, owner_user_id, connection_user_id, feature_key)
);

ALTER TABLE public.shared_connection_derivations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own shared derivations" ON public.shared_connection_derivations;
CREATE POLICY "Users manage own shared derivations"
  ON public.shared_connection_derivations
  FOR ALL
  USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

DROP TRIGGER IF EXISTS update_shared_connection_derivations_updated_at ON public.shared_connection_derivations;
CREATE TRIGGER update_shared_connection_derivations_updated_at
BEFORE UPDATE ON public.shared_connection_derivations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- shared_saved_product_cards
-- ============================================================
CREATE TABLE IF NOT EXISTS public.shared_saved_product_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_connection_id uuid NOT NULL REFERENCES public.user_connections(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  saved_product_card_id uuid NOT NULL REFERENCES public.saved_product_cards(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_connection_id, owner_user_id, connection_user_id, saved_product_card_id)
);

ALTER TABLE public.shared_saved_product_cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own shared saved product cards" ON public.shared_saved_product_cards;
CREATE POLICY "Users manage own shared saved product cards"
  ON public.shared_saved_product_cards
  FOR ALL
  USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

-- ============================================================
-- onboarding_responses
-- ============================================================
CREATE TABLE IF NOT EXISTS public.onboarding_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  response_value jsonb NOT NULL DEFAULT 'null'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);

ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their onboarding responses" ON public.onboarding_responses;
CREATE POLICY "Users manage their onboarding responses"
  ON public.onboarding_responses
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_onboarding_responses_updated_at ON public.onboarding_responses;
CREATE TRIGGER update_onboarding_responses_updated_at
BEFORE UPDATE ON public.onboarding_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- know_me_responses
-- ============================================================
CREATE TABLE IF NOT EXISTS public.know_me_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  response_value jsonb NOT NULL DEFAULT 'null'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);

ALTER TABLE public.know_me_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their Know Me responses" ON public.know_me_responses;
CREATE POLICY "Users manage their Know Me responses"
  ON public.know_me_responses
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_know_me_responses_updated_at ON public.know_me_responses;
CREATE TRIGGER update_know_me_responses_updated_at
BEFORE UPDATE ON public.know_me_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- knowledge_derivations
-- ============================================================
CREATE TABLE IF NOT EXISTS public.knowledge_derivations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  derivation_key text NOT NULL,
  derivation_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_snapshot jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, derivation_key)
);

ALTER TABLE public.knowledge_derivations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their knowledge derivations" ON public.knowledge_derivations;
CREATE POLICY "Users manage their knowledge derivations"
  ON public.knowledge_derivations
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_knowledge_derivations_updated_at ON public.knowledge_derivations;
CREATE TRIGGER update_knowledge_derivations_updated_at
BEFORE UPDATE ON public.knowledge_derivations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- Utility functions that were in skipped legacy migrations
-- ============================================================

-- next_annual_occurrence: returns the next upcoming calendar date for an annual event
CREATE OR REPLACE FUNCTION public.next_annual_occurrence(p_original_date date)
RETURNS date LANGUAGE plpgsql STABLE SET search_path = public AS $$
DECLARE
  current_year integer;
  candidate date;
  month_part integer;
  day_part integer;
BEGIN
  IF p_original_date IS NULL THEN RETURN NULL; END IF;
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  month_part := EXTRACT(MONTH FROM p_original_date);
  day_part := EXTRACT(DAY FROM p_original_date);
  candidate := make_date(current_year, month_part,
    LEAST(day_part, EXTRACT(DAY FROM (date_trunc('month', make_date(current_year, month_part, 1)) + interval '1 month - 1 day'))::int)
  );
  IF candidate < CURRENT_DATE THEN
    candidate := make_date(current_year+1, month_part,
      LEAST(day_part, EXTRACT(DAY FROM (date_trunc('month', make_date(current_year+1, month_part, 1)) + interval '1 month - 1 day'))::int)
    );
  END IF;
  RETURN candidate;
END;
$$;

-- get_connection_upcoming_occasions: modernized version using user_connections
-- (original used `couples` table which was renamed; this version is idempotent)
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
    SELECT uc.id AS user_connection_id
    FROM public.user_connections uc
    JOIN viewer v ON true
    WHERE uc.status = 'accepted'
      AND (
        (uc.inviter_id = v.viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = v.viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
    LIMIT 1
  ),
  conn_profile AS (
    SELECT p.birthday, p.anniversary
    FROM public.profiles p
    WHERE p.user_id = p_connection_user_id
  ),
  profile_occasions AS (
    SELECT
      'birthday'::text AS occasion_type,
      'Birthday'::text AS occasion_label,
      public.next_annual_occurrence(cp.birthday::date) AS occasion_date,
      'shared_profile'::text AS source_type,
      jsonb_build_object('field_key', 'birthday') AS metadata
    FROM conn_profile cp
    WHERE cp.birthday IS NOT NULL

    UNION ALL

    SELECT
      'anniversary'::text AS occasion_type,
      'Anniversary'::text AS occasion_label,
      public.next_annual_occurrence(cp.anniversary::date) AS occasion_date,
      'shared_profile'::text AS source_type,
      jsonb_build_object('field_key', 'anniversary') AS metadata
    FROM conn_profile cp
    WHERE cp.anniversary IS NOT NULL
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
