CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS birthday text,
  ADD COLUMN IF NOT EXISTS anniversary text,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamptz;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'card_entries'
      AND column_name = 'card_key'
  ) THEN
    ALTER TABLE public.card_entries RENAME COLUMN card_key TO product_card_key;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'card_entries'
      AND column_name = 'group_name'
  ) THEN
    ALTER TABLE public.card_entries RENAME COLUMN group_name TO subcategory_label;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'card_entries'
      AND column_name = 'entry_name'
  ) THEN
    ALTER TABLE public.card_entries RENAME COLUMN entry_name TO card_title;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'card_entries'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'saved_product_cards'
  ) THEN
    ALTER TABLE public.card_entries RENAME TO saved_product_cards;
  END IF;
END
$$;

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

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'shared_card_entries'
      AND column_name = 'couple_id'
  ) THEN
    ALTER TABLE public.shared_card_entries RENAME COLUMN couple_id TO user_connection_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'shared_card_entries'
      AND column_name = 'card_entry_id'
  ) THEN
    ALTER TABLE public.shared_card_entries RENAME COLUMN card_entry_id TO saved_product_card_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_card_entries'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_saved_product_cards'
  ) THEN
    ALTER TABLE public.shared_card_entries RENAME TO shared_saved_product_cards;
  END IF;
END
$$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'couples'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'user_connections'
  ) THEN
    ALTER TABLE public.couples RENAME TO user_connections;
  END IF;
END
$$;

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

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'connection_context_preferences'
      AND column_name = 'couple_id'
  ) THEN
    ALTER TABLE public.connection_context_preferences RENAME COLUMN couple_id TO user_connection_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'connection_context_preferences'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'connection_access_settings'
  ) THEN
    ALTER TABLE public.connection_context_preferences RENAME TO connection_access_settings;
  END IF;
END
$$;

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

DROP POLICY IF EXISTS "Owners manage connection access settings" ON public.connection_access_settings;
CREATE POLICY "Owners manage connection access settings"
  ON public.connection_access_settings
  FOR ALL
  USING (auth.uid() = owner_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

DROP TRIGGER IF EXISTS update_connection_access_settings_updated_at ON public.connection_access_settings;
CREATE TRIGGER update_connection_access_settings_updated_at
BEFORE UPDATE ON public.connection_access_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'shared_profile_fields'
      AND column_name = 'couple_id'
  ) THEN
    ALTER TABLE public.shared_profile_fields RENAME COLUMN couple_id TO user_connection_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_profile_fields'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_connection_profile_fields'
  ) THEN
    ALTER TABLE public.shared_profile_fields RENAME TO shared_connection_profile_fields;
  END IF;
END
$$;

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

DROP POLICY IF EXISTS "Owners manage shared connection profile fields" ON public.shared_connection_profile_fields;
CREATE POLICY "Owners manage shared connection profile fields"
  ON public.shared_connection_profile_fields
  FOR ALL
  USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

DROP TRIGGER IF EXISTS update_shared_connection_profile_fields_updated_at ON public.shared_connection_profile_fields;
CREATE TRIGGER update_shared_connection_profile_fields_updated_at
BEFORE UPDATE ON public.shared_connection_profile_fields
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'shared_derived_features'
      AND column_name = 'couple_id'
  ) THEN
    ALTER TABLE public.shared_derived_features RENAME COLUMN couple_id TO user_connection_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_derived_features'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_connection_derivations'
  ) THEN
    ALTER TABLE public.shared_derived_features RENAME TO shared_connection_derivations;
  END IF;
END
$$;

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

DROP POLICY IF EXISTS "Owners manage shared connection derivations" ON public.shared_connection_derivations;
CREATE POLICY "Owners manage shared connection derivations"
  ON public.shared_connection_derivations
  FOR ALL
  USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

DROP TRIGGER IF EXISTS update_shared_connection_derivations_updated_at ON public.shared_connection_derivations;
CREATE TRIGGER update_shared_connection_derivations_updated_at
BEFORE UPDATE ON public.shared_connection_derivations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

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

DROP POLICY IF EXISTS "Owners manage shared saved product cards" ON public.shared_saved_product_cards;
CREATE POLICY "Owners manage shared saved product cards"
  ON public.shared_saved_product_cards
  FOR ALL
  USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

CREATE TABLE IF NOT EXISTS public.onboarding_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  response_value jsonb NOT NULL DEFAULT 'null'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);

CREATE TABLE IF NOT EXISTS public.know_me_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  response_value jsonb NOT NULL DEFAULT 'null'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);

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

ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.know_me_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_derivations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their onboarding responses" ON public.onboarding_responses;
CREATE POLICY "Users manage their onboarding responses"
  ON public.onboarding_responses
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their Know Me responses" ON public.know_me_responses;
CREATE POLICY "Users manage their Know Me responses"
  ON public.know_me_responses
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their knowledge derivations" ON public.knowledge_derivations;
CREATE POLICY "Users manage their knowledge derivations"
  ON public.knowledge_derivations
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_onboarding_responses_updated_at ON public.onboarding_responses;
CREATE TRIGGER update_onboarding_responses_updated_at
BEFORE UPDATE ON public.onboarding_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_know_me_responses_updated_at ON public.know_me_responses;
CREATE TRIGGER update_know_me_responses_updated_at
BEFORE UPDATE ON public.know_me_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_knowledge_derivations_updated_at ON public.knowledge_derivations;
CREATE TRIGGER update_knowledge_derivations_updated_at
BEFORE UPDATE ON public.knowledge_derivations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.this_or_that_v2_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id uuid,
  question_key text NOT NULL,
  selected_option_id uuid,
  selected_option_key text,
  rejected_option_id uuid,
  rejected_option_key text,
  category_key text,
  subgroup_key text,
  recommendation_category text,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  brand text,
  location_keys text[] NOT NULL DEFAULT '{}'::text[],
  answer_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  response_source text NOT NULL DEFAULT 'this_or_that_v2',
  source_version text NOT NULL DEFAULT 'this_or_that_v2',
  answered_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT this_or_that_v2_answers_user_question_unique UNIQUE (user_id, question_key)
);

CREATE TABLE IF NOT EXISTS public.this_or_that_v2_answer_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id uuid NOT NULL REFERENCES public.this_or_that_v2_answers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  signal_polarity text NOT NULL DEFAULT 'positive',
  signal_type text NOT NULL DEFAULT 'entity',
  category_key text,
  subgroup_key text,
  recommendation_category text,
  entity_type text,
  entity_key text,
  entity_label text,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  brand text,
  location_keys text[] NOT NULL DEFAULT '{}'::text[],
  tags text[] NOT NULL DEFAULT '{}'::text[],
  notes text,
  source_version text NOT NULL DEFAULT 'this_or_that_v2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.this_or_that_v2_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.this_or_that_v2_answer_signals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their This or That v2 structured answers" ON public.this_or_that_v2_answers;
CREATE POLICY "Users manage their This or That v2 structured answers"
  ON public.this_or_that_v2_answers
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their This or That v2 structured answer signals" ON public.this_or_that_v2_answer_signals;
CREATE POLICY "Users manage their This or That v2 structured answer signals"
  ON public.this_or_that_v2_answer_signals
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_this_or_that_v2_answers_updated_at ON public.this_or_that_v2_answers;
CREATE TRIGGER update_this_or_that_v2_answers_updated_at
BEFORE UPDATE ON public.this_or_that_v2_answers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_this_or_that_v2_answer_signals_updated_at ON public.this_or_that_v2_answer_signals;
CREATE TRIGGER update_this_or_that_v2_answer_signals_updated_at
BEFORE UPDATE ON public.this_or_that_v2_answer_signals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.user_preference_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_type text NOT NULL,
  signal_key text NOT NULL,
  signal_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  signal_source text NOT NULL,
  signal_strength integer NOT NULL DEFAULT 50,
  is_negative boolean NOT NULL DEFAULT false,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_preference_signals_user_signal_unique UNIQUE (user_id, signal_type, signal_key)
);

CREATE TABLE IF NOT EXISTS public.user_product_card_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  saved_product_card_id uuid NOT NULL REFERENCES public.saved_product_cards(id) ON DELETE CASCADE,
  product_card_key text NOT NULL,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  brand_keywords text[] NOT NULL DEFAULT '{}'::text[],
  category text,
  subcategory text,
  negative_keywords text[] NOT NULL DEFAULT '{}'::text[],
  source_version text NOT NULL DEFAULT 'recommendation-v2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_product_card_keywords_user_card_primary_unique UNIQUE (user_id, saved_product_card_id, primary_keyword)
);

CREATE TABLE IF NOT EXISTS public.user_like_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  like_type text NOT NULL,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  brand text,
  category text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_dislike_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dislike_type text NOT NULL,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  brand text,
  category text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.recommendation_keyword_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_keyword text NOT NULL,
  descriptor_keyword text NOT NULL,
  category text NOT NULL,
  weight numeric NOT NULL DEFAULT 1,
  source_type text NOT NULL,
  source_version text NOT NULL DEFAULT 'recommendation-v2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT recommendation_keyword_bank_unique UNIQUE (primary_keyword, descriptor_keyword, category)
);

CREATE TABLE IF NOT EXISTS public.recommendation_brand_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  primary_keyword text NOT NULL,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  category text NOT NULL,
  weight numeric NOT NULL DEFAULT 1,
  source_type text NOT NULL,
  source_version text NOT NULL DEFAULT 'recommendation-v2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT recommendation_brand_bank_unique UNIQUE (brand, primary_keyword, category)
);

CREATE TABLE IF NOT EXISTS public.recommendation_brand_location_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_key text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  primary_keywords text[] NOT NULL DEFAULT '{}'::text[],
  weight numeric NOT NULL DEFAULT 1,
  source_type text NOT NULL,
  source_version text NOT NULL DEFAULT 'recommendation-v2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT recommendation_brand_location_bank_unique UNIQUE (location_key, brand, category)
);

CREATE TABLE IF NOT EXISTS public.recommendation_product_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_keyword text NOT NULL,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  keyword_signature text NOT NULL,
  category text NOT NULL,
  brand text NOT NULL,
  product_title text NOT NULL,
  product_url text NOT NULL,
  product_url_hash text GENERATED ALWAYS AS (md5(product_url)) STORED,
  product_image_url text NOT NULL,
  product_price_text text NOT NULL,
  product_currency text,
  scraped_description text,
  scraped_features jsonb NOT NULL DEFAULT '[]'::jsonb,
  search_query text,
  resolver_source text NOT NULL,
  source_version text NOT NULL DEFAULT 'recommendation-v2',
  match_confidence numeric NOT NULL DEFAULT 0,
  exact_match_confirmed boolean NOT NULL DEFAULT false,
  usage_count integer NOT NULL DEFAULT 0,
  last_verified_at timestamptz,
  bank_state text NOT NULL DEFAULT 'exact_verified',
  bank_source text NOT NULL DEFAULT 'engine-v2',
  image_status text NOT NULL DEFAULT 'verified',
  verification_notes jsonb,
  last_verification_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT recommendation_product_bank_product_url_hash_unique UNIQUE (product_url_hash),
  CONSTRAINT recommendation_product_bank_brand_title_unique UNIQUE (primary_keyword, brand, product_title)
);

CREATE TABLE IF NOT EXISTS public.user_weekly_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start date NOT NULL,
  generation_version text NOT NULL DEFAULT 'recommendation-engine-v2',
  products jsonb NOT NULL DEFAULT '[]'::jsonb,
  input_snapshot_summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  generated_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_weekly_recommendations_user_week_unique UNIQUE (user_id, week_start)
);

ALTER TABLE public.user_preference_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_product_card_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_like_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_dislike_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_keyword_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_brand_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_brand_location_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_product_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_weekly_recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their preference signals" ON public.user_preference_signals;
CREATE POLICY "Users manage their preference signals"
  ON public.user_preference_signals
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their product card keywords" ON public.user_product_card_keywords;
CREATE POLICY "Users manage their product card keywords"
  ON public.user_product_card_keywords
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their like signals" ON public.user_like_signals;
CREATE POLICY "Users manage their like signals"
  ON public.user_like_signals
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their dislike signals" ON public.user_dislike_signals;
CREATE POLICY "Users manage their dislike signals"
  ON public.user_dislike_signals
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can view recommendation keyword bank" ON public.recommendation_keyword_bank;
CREATE POLICY "Authenticated users can view recommendation keyword bank"
  ON public.recommendation_keyword_bank
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can view recommendation brand bank" ON public.recommendation_brand_bank;
CREATE POLICY "Authenticated users can view recommendation brand bank"
  ON public.recommendation_brand_bank
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can view recommendation brand location bank" ON public.recommendation_brand_location_bank;
CREATE POLICY "Authenticated users can view recommendation brand location bank"
  ON public.recommendation_brand_location_bank
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can view recommendation product bank" ON public.recommendation_product_bank;
CREATE POLICY "Authenticated users can view recommendation product bank"
  ON public.recommendation_product_bank
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users manage their weekly recommendation output" ON public.user_weekly_recommendations;
CREATE POLICY "Users manage their weekly recommendation output"
  ON public.user_weekly_recommendations
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_user_preference_signals_updated_at ON public.user_preference_signals;
CREATE TRIGGER update_user_preference_signals_updated_at
BEFORE UPDATE ON public.user_preference_signals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_product_card_keywords_updated_at ON public.user_product_card_keywords;
CREATE TRIGGER update_user_product_card_keywords_updated_at
BEFORE UPDATE ON public.user_product_card_keywords
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_recommendation_keyword_bank_updated_at ON public.recommendation_keyword_bank;
CREATE TRIGGER update_recommendation_keyword_bank_updated_at
BEFORE UPDATE ON public.recommendation_keyword_bank
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_recommendation_brand_bank_updated_at ON public.recommendation_brand_bank;
CREATE TRIGGER update_recommendation_brand_bank_updated_at
BEFORE UPDATE ON public.recommendation_brand_bank
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_recommendation_brand_location_bank_updated_at ON public.recommendation_brand_location_bank;
CREATE TRIGGER update_recommendation_brand_location_bank_updated_at
BEFORE UPDATE ON public.recommendation_brand_location_bank
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_recommendation_product_bank_updated_at ON public.recommendation_product_bank;
CREATE TRIGGER update_recommendation_product_bank_updated_at
BEFORE UPDATE ON public.recommendation_product_bank
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_weekly_recommendations_updated_at ON public.user_weekly_recommendations;
CREATE TRIGGER update_user_weekly_recommendations_updated_at
BEFORE UPDATE ON public.user_weekly_recommendations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.sync_recommendation_normalized_state(
  p_user_id uuid,
  p_signals jsonb DEFAULT '[]'::jsonb,
  p_product_card_keywords jsonb DEFAULT '[]'::jsonb,
  p_like_signals jsonb DEFAULT '[]'::jsonb,
  p_dislike_signals jsonb DEFAULT '[]'::jsonb,
  p_this_or_that_signal_rows jsonb DEFAULT '[]'::jsonb,
  p_keyword_bank_rows jsonb DEFAULT '[]'::jsonb,
  p_brand_bank_rows jsonb DEFAULT '[]'::jsonb,
  p_brand_location_rows jsonb DEFAULT '[]'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.user_preference_signals WHERE user_id = p_user_id;
  DELETE FROM public.user_product_card_keywords WHERE user_id = p_user_id;
  DELETE FROM public.user_like_signals WHERE user_id = p_user_id;
  DELETE FROM public.user_dislike_signals WHERE user_id = p_user_id;
  DELETE FROM public.this_or_that_v2_answer_signals WHERE user_id = p_user_id;

  INSERT INTO public.user_preference_signals (
    user_id, signal_type, signal_key, signal_value, signal_source, signal_strength, is_negative, recorded_at
  )
  SELECT
    p_user_id, entry.signal_type, entry.signal_key, entry.signal_value, entry.signal_source,
    entry.signal_strength, entry.is_negative, entry.recorded_at
  FROM jsonb_to_recordset(COALESCE(p_signals, '[]'::jsonb)) AS entry(
    signal_type text,
    signal_key text,
    signal_value jsonb,
    signal_source text,
    signal_strength integer,
    is_negative boolean,
    recorded_at timestamptz
  );

  INSERT INTO public.user_product_card_keywords (
    user_id, saved_product_card_id, product_card_key, primary_keyword, descriptor_keywords,
    brand_keywords, category, subcategory, negative_keywords, source_version
  )
  SELECT
    p_user_id,
    entry.saved_product_card_id,
    entry.product_card_key,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    COALESCE(entry.brand_keywords, '{}'::text[]),
    entry.category,
    entry.subcategory,
    COALESCE(entry.negative_keywords, '{}'::text[]),
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_product_card_keywords, '[]'::jsonb)) AS entry(
    saved_product_card_id uuid,
    product_card_key text,
    primary_keyword text,
    descriptor_keywords text[],
    brand_keywords text[],
    category text,
    subcategory text,
    negative_keywords text[],
    source_version text
  );

  INSERT INTO public.user_like_signals (
    user_id, like_type, primary_keyword, descriptor_keywords, brand, category, notes
  )
  SELECT
    p_user_id,
    entry.like_type,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    entry.brand,
    entry.category,
    entry.notes
  FROM jsonb_to_recordset(COALESCE(p_like_signals, '[]'::jsonb)) AS entry(
    like_type text,
    primary_keyword text,
    descriptor_keywords text[],
    brand text,
    category text,
    notes text
  );

  INSERT INTO public.user_dislike_signals (
    user_id, dislike_type, primary_keyword, descriptor_keywords, brand, category, notes
  )
  SELECT
    p_user_id,
    entry.dislike_type,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    entry.brand,
    entry.category,
    entry.notes
  FROM jsonb_to_recordset(COALESCE(p_dislike_signals, '[]'::jsonb)) AS entry(
    dislike_type text,
    primary_keyword text,
    descriptor_keywords text[],
    brand text,
    category text,
    notes text
  );

  INSERT INTO public.this_or_that_v2_answer_signals (
    answer_id, user_id, question_key, signal_polarity, signal_type, category_key, subgroup_key,
    recommendation_category, entity_type, entity_key, entity_label, primary_keyword,
    descriptor_keywords, brand, location_keys, tags, notes, source_version
  )
  SELECT
    entry.answer_id,
    p_user_id,
    entry.question_key,
    entry.signal_polarity,
    entry.signal_type,
    entry.category_key,
    entry.subgroup_key,
    entry.recommendation_category,
    entry.entity_type,
    entry.entity_key,
    entry.entity_label,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    entry.brand,
    COALESCE(entry.location_keys, '{}'::text[]),
    COALESCE(entry.tags, '{}'::text[]),
    entry.notes,
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_this_or_that_signal_rows, '[]'::jsonb)) AS entry(
    answer_id uuid,
    question_key text,
    signal_polarity text,
    signal_type text,
    category_key text,
    subgroup_key text,
    recommendation_category text,
    entity_type text,
    entity_key text,
    entity_label text,
    primary_keyword text,
    descriptor_keywords text[],
    brand text,
    location_keys text[],
    tags text[],
    notes text,
    source_version text
  );

  INSERT INTO public.recommendation_keyword_bank (
    primary_keyword, descriptor_keyword, category, weight, source_type, source_version
  )
  SELECT
    entry.primary_keyword,
    entry.descriptor_keyword,
    entry.category,
    entry.weight,
    entry.source_type,
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_keyword_bank_rows, '[]'::jsonb)) AS entry(
    primary_keyword text,
    descriptor_keyword text,
    category text,
    weight numeric,
    source_type text,
    source_version text
  )
  ON CONFLICT (primary_keyword, descriptor_keyword, category)
  DO UPDATE SET
    weight = EXCLUDED.weight,
    source_type = EXCLUDED.source_type,
    source_version = EXCLUDED.source_version,
    updated_at = now();

  INSERT INTO public.recommendation_brand_bank (
    brand, primary_keyword, descriptor_keywords, category, weight, source_type, source_version
  )
  SELECT
    entry.brand,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    entry.category,
    entry.weight,
    entry.source_type,
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_brand_bank_rows, '[]'::jsonb)) AS entry(
    brand text,
    primary_keyword text,
    descriptor_keywords text[],
    category text,
    weight numeric,
    source_type text,
    source_version text
  )
  ON CONFLICT (brand, primary_keyword, category)
  DO UPDATE SET
    descriptor_keywords = EXCLUDED.descriptor_keywords,
    weight = EXCLUDED.weight,
    source_type = EXCLUDED.source_type,
    source_version = EXCLUDED.source_version,
    updated_at = now();

  INSERT INTO public.recommendation_brand_location_bank (
    location_key, brand, category, primary_keywords, weight, source_type, source_version
  )
  SELECT
    entry.location_key,
    entry.brand,
    entry.category,
    COALESCE(entry.primary_keywords, '{}'::text[]),
    entry.weight,
    entry.source_type,
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_brand_location_rows, '[]'::jsonb)) AS entry(
    location_key text,
    brand text,
    category text,
    primary_keywords text[],
    weight numeric,
    source_type text,
    source_version text
  )
  ON CONFLICT (location_key, brand, category)
  DO UPDATE SET
    primary_keywords = EXCLUDED.primary_keywords,
    weight = EXCLUDED.weight,
    source_type = EXCLUDED.source_type,
    source_version = EXCLUDED.source_version,
    updated_at = now();
END;
$$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'user_preferences'
  ) THEN
    WITH onboarding_keys AS (
      SELECT unnest(ARRAY[
        'identity',
        'birthday',
        'anniversary',
        'style-personality',
        'daily-vibe',
        'spending-mindset',
        'purchase-values',
        'free-time',
        'gift-preference',
        'aesthetic-lean'
      ]) AS question_key
    ),
    legacy_answers AS (
      SELECT
        up.user_id,
        answer.key AS question_key,
        answer.value AS response_value,
        COALESCE(up.updated_at, now()) AS recorded_at
      FROM public.user_preferences up
      CROSS JOIN LATERAL jsonb_each(COALESCE(to_jsonb(up.profile_answers), '{}'::jsonb)) AS answer(key, value)
    )
    INSERT INTO public.onboarding_responses (user_id, question_key, response_value, created_at, updated_at)
    SELECT
      la.user_id,
      la.question_key,
      la.response_value,
      la.recorded_at,
      la.recorded_at
    FROM legacy_answers la
    JOIN onboarding_keys ok ON ok.question_key = la.question_key
    ON CONFLICT (user_id, question_key) DO UPDATE
    SET
      response_value = EXCLUDED.response_value,
      updated_at = EXCLUDED.updated_at;

    WITH onboarding_keys AS (
      SELECT unnest(ARRAY[
        'identity',
        'birthday',
        'anniversary',
        'style-personality',
        'daily-vibe',
        'spending-mindset',
        'purchase-values',
        'free-time',
        'gift-preference',
        'aesthetic-lean'
      ]) AS question_key
    ),
    legacy_answers AS (
      SELECT
        up.user_id,
        answer.key AS question_key,
        answer.value AS response_value,
        COALESCE(up.updated_at, now()) AS recorded_at
      FROM public.user_preferences up
      CROSS JOIN LATERAL jsonb_each(COALESCE(to_jsonb(up.profile_answers), '{}'::jsonb)) AS answer(key, value)
    )
    INSERT INTO public.know_me_responses (user_id, question_key, response_value, created_at, updated_at)
    SELECT
      la.user_id,
      la.question_key,
      la.response_value,
      la.recorded_at,
      la.recorded_at
    FROM legacy_answers la
    LEFT JOIN onboarding_keys ok ON ok.question_key = la.question_key
    WHERE ok.question_key IS NULL
    ON CONFLICT (user_id, question_key) DO UPDATE
    SET
      response_value = EXCLUDED.response_value,
      updated_at = EXCLUDED.updated_at;

    INSERT INTO public.knowledge_derivations (
      user_id,
      derivation_key,
      derivation_payload,
      created_at,
      updated_at
    )
    SELECT
      up.user_id,
      'your_vibe',
      COALESCE(to_jsonb(up.ai_personalization), '{}'::jsonb),
      COALESCE(up.created_at, now()),
      COALESCE(up.updated_at, now())
    FROM public.user_preferences up
    WHERE up.ai_personalization IS NOT NULL
    ON CONFLICT (user_id, derivation_key) DO UPDATE
    SET
      derivation_payload = EXCLUDED.derivation_payload,
      updated_at = EXCLUDED.updated_at;

    UPDATE public.profiles p
    SET onboarding_completed_at = COALESCE(p.onboarding_completed_at, up.updated_at, now())
    FROM public.user_preferences up
    WHERE up.user_id = p.user_id
      AND COALESCE(up.onboarding_complete, false) = true
      AND p.onboarding_completed_at IS NULL;
  END IF;
END
$$;

CREATE OR REPLACE VIEW public.user_knowledge_derivations AS
SELECT
  kd.id,
  kd.user_id,
  kd.derivation_key,
  kd.derivation_payload,
  kd.source_snapshot,
  kd.created_at,
  kd.updated_at
FROM public.knowledge_derivations kd;

CREATE OR REPLACE VIEW public.user_knowledge_facts AS
WITH connection_members AS (
  SELECT
    uc.inviter_id AS user_id,
    'owner'::text AS membership_role,
    jsonb_build_object(
      'user_connection_id', uc.id,
      'connection_user_id', uc.invitee_id,
      'invitee_email', uc.invitee_email,
      'display_label', uc.display_label,
      'status', uc.status,
      'photo_url', uc.photo_url
    ) AS fact_value,
    uc.updated_at AS recorded_at
  FROM public.user_connections uc
  UNION ALL
  SELECT
    uc.invitee_id AS user_id,
    'connection'::text AS membership_role,
    jsonb_build_object(
      'user_connection_id', uc.id,
      'connection_user_id', uc.inviter_id,
      'invitee_email', uc.invitee_email,
      'display_label', uc.display_label,
      'status', uc.status,
      'photo_url', uc.photo_url
    ) AS fact_value,
    uc.updated_at AS recorded_at
  FROM public.user_connections uc
  WHERE uc.invitee_id IS NOT NULL
)
SELECT
  p.user_id,
  'profile_core'::text AS fact_source,
  'profile_core'::text AS fact_key,
  jsonb_build_object(
    'display_name', p.display_name,
    'avatar_url', p.avatar_url,
    'gender', p.gender,
    'birthday', p.birthday,
    'anniversary', p.anniversary,
    'onboarding_completed_at', p.onboarding_completed_at
  ) AS fact_value,
  COALESCE(p.updated_at, now()) AS recorded_at
FROM public.profiles p
UNION ALL
SELECT
  orr.user_id,
  'onboarding'::text AS fact_source,
  orr.question_key AS fact_key,
  orr.response_value AS fact_value,
  orr.updated_at AS recorded_at
FROM public.onboarding_responses orr
UNION ALL
SELECT
  kmr.user_id,
  'know_me'::text AS fact_source,
  kmr.question_key AS fact_key,
  kmr.response_value AS fact_value,
  kmr.updated_at AS recorded_at
FROM public.know_me_responses kmr
UNION ALL
SELECT
  spc.user_id,
  'saved_product_card'::text AS fact_source,
  spc.product_card_key AS fact_key,
  jsonb_build_object(
    'id', spc.id,
    'product_card_key', spc.product_card_key,
    'subcategory_label', spc.subcategory_label,
    'card_title', spc.card_title,
    'field_values', spc.field_values,
    'image_url', spc.image_url,
    'updated_at', spc.updated_at
  ) AS fact_value,
  spc.updated_at AS recorded_at
FROM public.saved_product_cards spc
UNION ALL
SELECT
  cm.user_id,
  'connection'::text AS fact_source,
  cm.membership_role AS fact_key,
  cm.fact_value,
  cm.recorded_at
FROM connection_members cm;

CREATE OR REPLACE VIEW public.user_knowledge_snapshots AS
WITH all_users AS (
  SELECT user_id FROM public.profiles
  UNION
  SELECT user_id FROM public.onboarding_responses
  UNION
  SELECT user_id FROM public.know_me_responses
  UNION
  SELECT user_id FROM public.saved_product_cards
  UNION
  SELECT user_id FROM public.knowledge_derivations
  UNION
  SELECT user_id FROM public.this_or_that_v2_answers
  UNION
  SELECT inviter_id AS user_id FROM public.user_connections
  UNION
  SELECT invitee_id AS user_id FROM public.user_connections WHERE invitee_id IS NOT NULL
),
profile_core AS (
  SELECT
    p.user_id,
    jsonb_build_object(
      'display_name', p.display_name,
      'avatar_url', p.avatar_url,
      'gender', p.gender,
      'birthday', p.birthday,
      'anniversary', p.anniversary,
      'onboarding_completed_at', p.onboarding_completed_at
    ) AS profile_core,
    COALESCE(p.updated_at, now()) AS updated_at
  FROM public.profiles p
),
onboarding_data AS (
  SELECT
    user_id,
    COALESCE(jsonb_object_agg(question_key, response_value ORDER BY question_key), '{}'::jsonb) AS onboarding_responses,
    MAX(updated_at) AS updated_at
  FROM public.onboarding_responses
  GROUP BY user_id
),
know_me_data AS (
  SELECT
    user_id,
    COALESCE(jsonb_object_agg(question_key, response_value ORDER BY question_key), '{}'::jsonb) AS know_me_responses,
    MAX(updated_at) AS updated_at
  FROM public.know_me_responses
  GROUP BY user_id
),
saved_cards AS (
  SELECT
    user_id,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', id,
          'product_card_key', product_card_key,
          'subcategory_label', subcategory_label,
          'card_title', card_title,
          'field_values', field_values,
          'image_url', image_url,
          'created_at', created_at,
          'updated_at', updated_at
        )
        ORDER BY updated_at DESC
      ),
      '[]'::jsonb
    ) AS saved_product_cards,
    MAX(updated_at) AS updated_at
  FROM public.saved_product_cards
  GROUP BY user_id
),
connection_members AS (
  SELECT
    uc.inviter_id AS user_id,
    jsonb_build_object(
      'id', uc.id,
      'connection_user_id', uc.invitee_id,
      'invitee_email', uc.invitee_email,
      'display_label', uc.display_label,
      'photo_url', uc.photo_url,
      'status', uc.status,
      'role', 'owner',
      'updated_at', uc.updated_at
    ) AS connection_payload,
    uc.updated_at
  FROM public.user_connections uc
  UNION ALL
  SELECT
    uc.invitee_id AS user_id,
    jsonb_build_object(
      'id', uc.id,
      'connection_user_id', uc.inviter_id,
      'invitee_email', uc.invitee_email,
      'display_label', uc.display_label,
      'photo_url', uc.photo_url,
      'status', uc.status,
      'role', 'connection',
      'updated_at', uc.updated_at
    ) AS connection_payload,
    uc.updated_at
  FROM public.user_connections uc
  WHERE uc.invitee_id IS NOT NULL
),
connections AS (
  SELECT
    user_id,
    COALESCE(jsonb_agg(connection_payload ORDER BY updated_at DESC), '[]'::jsonb) AS user_connections,
    MAX(updated_at) AS updated_at
  FROM connection_members
  GROUP BY user_id
)
SELECT
  u.user_id,
  COALESCE(pc.profile_core, '{}'::jsonb) AS profile_core,
  COALESCE(od.onboarding_responses, '{}'::jsonb) AS onboarding_responses,
  COALESCE(km.know_me_responses, '{}'::jsonb) AS know_me_responses,
  COALESCE(sc.saved_product_cards, '[]'::jsonb) AS saved_product_cards,
  COALESCE(cn.user_connections, '[]'::jsonb) AS user_connections,
  jsonb_build_object(
    'profile_core', COALESCE(pc.profile_core, '{}'::jsonb),
    'onboarding_responses', COALESCE(od.onboarding_responses, '{}'::jsonb),
    'know_me_responses', COALESCE(km.know_me_responses, '{}'::jsonb),
    'saved_product_cards', COALESCE(sc.saved_product_cards, '[]'::jsonb),
    'user_connections', COALESCE(cn.user_connections, '[]'::jsonb)
  ) AS snapshot_payload,
  GREATEST(
    COALESCE(pc.updated_at, '-infinity'::timestamptz),
    COALESCE(od.updated_at, '-infinity'::timestamptz),
    COALESCE(km.updated_at, '-infinity'::timestamptz),
    COALESCE(sc.updated_at, '-infinity'::timestamptz),
    COALESCE(cn.updated_at, '-infinity'::timestamptz)
  ) AS updated_at
FROM all_users u
LEFT JOIN profile_core pc ON pc.user_id = u.user_id
LEFT JOIN onboarding_data od ON od.user_id = u.user_id
LEFT JOIN know_me_data km ON km.user_id = u.user_id
LEFT JOIN saved_cards sc ON sc.user_id = u.user_id
LEFT JOIN connections cn ON cn.user_id = u.user_id;

DROP FUNCTION IF EXISTS public.infer_card_entry_section(text, text, text);
DROP FUNCTION IF EXISTS public.connection_can_view_card_entry(uuid, uuid);
DROP FUNCTION IF EXISTS public.get_connection_visible_card_entries(uuid, uuid, uuid);
DROP FUNCTION IF EXISTS public.share_all_card_entries_with_connection(uuid, uuid, uuid);
DROP FUNCTION IF EXISTS public.unshare_all_card_entries_with_connection(uuid, uuid, uuid);
DROP FUNCTION IF EXISTS public.set_connection_card_share(uuid, uuid, uuid, boolean);

CREATE OR REPLACE FUNCTION public.infer_saved_product_card_section(
  p_product_card_key text,
  p_subcategory_label text,
  p_card_title text
)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  WITH normalized AS (
    SELECT lower(
      concat_ws(
        ' ',
        coalesce(p_product_card_key, ''),
        coalesce(p_subcategory_label, ''),
        coalesce(p_card_title, '')
      )
    ) AS text_value
  )
  SELECT CASE
    WHEN text_value ~ '(food|drink|coffee|tea|taco|restaurant|snack|grocery|meal|milk|pizza|kitchen)' THEN 'food'
    WHEN text_value ~ '(wish|gift|favorite|favourite|save|saved|memory|anniversary|birthday|occasion)' THEN 'favorites'
    WHEN text_value ~ '(skin|makeup|hygiene|personal|tooth|shampoo|conditioner|pads|razor|soap|care)' THEN 'personal'
    WHEN text_value ~ '(style|fit|top|bottom|shoe|footwear|outfit|shirt|jacket|jean|dress|closet|size|brand|accessor)' THEN 'style'
    ELSE 'everyday'
  END
  FROM normalized;
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_profile_field(
  p_owner_user_id uuid,
  p_viewer_id uuid,
  p_field_key text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_connection_profile_fields scpf
    JOIN public.user_connections uc
      ON uc.id = scpf.user_connection_id
    WHERE scpf.owner_user_id = p_owner_user_id
      AND scpf.connection_user_id = p_viewer_id
      AND scpf.field_key = p_field_key
      AND scpf.is_shared = true
      AND uc.status = 'accepted'
  );
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_derived_feature(
  p_owner_user_id uuid,
  p_viewer_id uuid,
  p_feature_key text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_connection_derivations scd
    JOIN public.user_connections uc
      ON uc.id = scd.user_connection_id
    WHERE scd.owner_user_id = p_owner_user_id
      AND scd.connection_user_id = p_viewer_id
      AND scd.feature_key = p_feature_key
      AND scd.is_shared = true
      AND uc.status = 'accepted'
  );
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_saved_product_card(
  p_saved_product_card_id uuid,
  p_viewer_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_saved_product_cards sspc
    JOIN public.saved_product_cards spc
      ON spc.id = sspc.saved_product_card_id
    JOIN public.user_connections uc
      ON uc.id = sspc.user_connection_id
    WHERE sspc.saved_product_card_id = p_saved_product_card_id
      AND sspc.connection_user_id = p_viewer_id
      AND uc.status = 'accepted'
      AND spc.user_id = sspc.owner_user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.set_connection_profile_field_share(
  p_user_connection_id uuid,
  p_connection_user_id uuid,
  p_field_key text,
  p_is_shared boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_field_key NOT IN ('display_name', 'avatar_url', 'birthday', 'anniversary') THEN
    RAISE EXCEPTION 'Invalid field key';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.shared_connection_profile_fields (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    field_key,
    is_shared
  )
  VALUES (
    p_user_connection_id,
    viewer_user_id,
    p_connection_user_id,
    p_field_key,
    p_is_shared
  )
  ON CONFLICT (user_connection_id, owner_user_id, connection_user_id, field_key) DO UPDATE
  SET
    is_shared = EXCLUDED.is_shared,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_derived_feature_share(
  p_user_connection_id uuid,
  p_connection_user_id uuid,
  p_feature_key text,
  p_is_shared boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_feature_key NOT IN ('your_vibe', 'for_you_recommendations', 'ai_conversation_access') THEN
    RAISE EXCEPTION 'Invalid feature key';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.shared_connection_derivations (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    feature_key,
    is_shared
  )
  VALUES (
    p_user_connection_id,
    viewer_user_id,
    p_connection_user_id,
    p_feature_key,
    p_is_shared
  )
  ON CONFLICT (user_connection_id, owner_user_id, connection_user_id, feature_key) DO UPDATE
  SET
    is_shared = EXCLUDED.is_shared,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_kind_preference(
  p_user_connection_id uuid,
  p_connection_user_id uuid,
  p_connection_kind text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_connection_kind NOT IN ('significant_other', 'wife', 'husband', 'girlfriend', 'boyfriend', 'parent', 'family', 'friend', 'coworker', 'custom') THEN
    RAISE EXCEPTION 'Invalid connection kind';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.connection_access_settings (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    connection_kind
  )
  VALUES (
    p_user_connection_id,
    viewer_user_id,
    p_connection_user_id,
    p_connection_kind
  )
  ON CONFLICT (user_connection_id, owner_user_id, connection_user_id) DO UPDATE
  SET
    connection_kind = EXCLUDED.connection_kind,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.share_saved_product_card_with_connection(
  p_user_connection_id uuid,
  p_connection_user_id uuid,
  p_saved_product_card_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.saved_product_cards spc
    WHERE spc.id = p_saved_product_card_id
      AND spc.user_id = viewer_user_id
  ) THEN
    RAISE EXCEPTION 'Saved product card not found';
  END IF;

  INSERT INTO public.shared_saved_product_cards (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    saved_product_card_id
  )
  VALUES (
    p_user_connection_id,
    viewer_user_id,
    p_connection_user_id,
    p_saved_product_card_id
  )
  ON CONFLICT DO NOTHING;
END;
$$;

CREATE OR REPLACE FUNCTION public.unshare_saved_product_card_with_connection(
  p_user_connection_id uuid,
  p_connection_user_id uuid,
  p_saved_product_card_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  DELETE FROM public.shared_saved_product_cards
  WHERE user_connection_id = p_user_connection_id
    AND owner_user_id = viewer_user_id
    AND connection_user_id = p_connection_user_id
    AND saved_product_card_id = p_saved_product_card_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.share_all_saved_product_cards_with_connection(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inserted_count integer := 0;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_owner_user_id THEN
    RAISE EXCEPTION 'Only the owner can bulk share';
  END IF;

  INSERT INTO public.shared_saved_product_cards (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    saved_product_card_id
  )
  SELECT
    p_user_connection_id,
    p_owner_user_id,
    p_connection_user_id,
    spc.id
  FROM public.saved_product_cards spc
  WHERE spc.user_id = p_owner_user_id
  ON CONFLICT DO NOTHING;

  GET DIAGNOSTICS inserted_count = ROW_COUNT;
  RETURN inserted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.unshare_all_saved_product_cards_with_connection(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer := 0;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_owner_user_id THEN
    RAISE EXCEPTION 'Only the owner can bulk unshare';
  END IF;

  DELETE FROM public.shared_saved_product_cards
  WHERE user_connection_id = p_user_connection_id
    AND owner_user_id = p_owner_user_id
    AND connection_user_id = p_connection_user_id;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_profile(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  display_name text,
  avatar_url text,
  birthday text,
  anniversary text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH relation AS (
    SELECT uc.id
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND uc.status = 'accepted'
      AND (
        (uc.inviter_id = p_owner_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = p_owner_user_id AND uc.inviter_id = p_connection_user_id)
      )
  )
  SELECT
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'display_name') THEN p.display_name ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'avatar_url') THEN p.avatar_url ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'birthday') THEN p.birthday ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'anniversary') THEN p.anniversary ELSE NULL END
  FROM public.profiles p
  JOIN relation r ON true
  WHERE p.user_id = p_owner_user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_visible_saved_product_cards(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  card_title text,
  subcategory_label text,
  product_card_key text,
  field_values jsonb,
  image_url text,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH relation AS (
    SELECT uc.id
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND uc.status = 'accepted'
      AND (
        (uc.inviter_id = p_owner_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = p_owner_user_id AND uc.inviter_id = p_connection_user_id)
      )
  )
  SELECT
    spc.id,
    spc.user_id,
    spc.card_title,
    spc.subcategory_label,
    spc.product_card_key,
    spc.field_values,
    spc.image_url,
    spc.updated_at
  FROM public.saved_product_cards spc
  JOIN relation r ON true
  WHERE spc.user_id = p_owner_user_id
    AND EXISTS (
      SELECT 1
      FROM public.shared_saved_product_cards sspc
      WHERE sspc.user_connection_id = p_user_connection_id
        AND sspc.owner_user_id = p_owner_user_id
        AND sspc.connection_user_id = p_connection_user_id
        AND sspc.saved_product_card_id = spc.id
    )
  ORDER BY spc.updated_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_vibe(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  persona_summary text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH relation AS (
    SELECT uc.id
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND uc.status = 'accepted'
      AND (
        (uc.inviter_id = p_owner_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = p_owner_user_id AND uc.inviter_id = p_connection_user_id)
      )
  )
  SELECT
    CASE
      WHEN public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'your_vibe')
      THEN kd.derivation_payload ->> 'persona_summary'
      ELSE NULL
    END AS persona_summary
  FROM public.knowledge_derivations kd
  JOIN relation r ON true
  WHERE kd.user_id = p_owner_user_id
    AND kd.derivation_key = 'your_vibe';
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_recommendations(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  id uuid,
  week_start date,
  generated_at timestamptz,
  products jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH relation AS (
    SELECT uc.id
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND uc.status = 'accepted'
      AND (
        (uc.inviter_id = p_owner_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = p_owner_user_id AND uc.inviter_id = p_connection_user_id)
      )
  )
  SELECT
    wr.id,
    wr.week_start,
    wr.generated_at,
    wr.products
  FROM public.user_weekly_recommendations wr
  JOIN relation r ON true
  WHERE wr.user_id = p_owner_user_id
    AND public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'for_you_recommendations')
  ORDER BY wr.week_start DESC, wr.generated_at DESC
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_outgoing_sharing_state(
  p_user_connection_id uuid,
  p_connection_user_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
  relation_exists boolean := false;
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  )
  INTO relation_exists;

  IF NOT relation_exists THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  RETURN jsonb_build_object(
    'profile_fields', jsonb_build_object(
      'display_name', COALESCE((SELECT scpf.is_shared FROM public.shared_connection_profile_fields scpf WHERE scpf.user_connection_id = p_user_connection_id AND scpf.owner_user_id = viewer_user_id AND scpf.connection_user_id = p_connection_user_id AND scpf.field_key = 'display_name' LIMIT 1), false),
      'avatar_url', COALESCE((SELECT scpf.is_shared FROM public.shared_connection_profile_fields scpf WHERE scpf.user_connection_id = p_user_connection_id AND scpf.owner_user_id = viewer_user_id AND scpf.connection_user_id = p_connection_user_id AND scpf.field_key = 'avatar_url' LIMIT 1), false),
      'birthday', COALESCE((SELECT scpf.is_shared FROM public.shared_connection_profile_fields scpf WHERE scpf.user_connection_id = p_user_connection_id AND scpf.owner_user_id = viewer_user_id AND scpf.connection_user_id = p_connection_user_id AND scpf.field_key = 'birthday' LIMIT 1), false),
      'anniversary', COALESCE((SELECT scpf.is_shared FROM public.shared_connection_profile_fields scpf WHERE scpf.user_connection_id = p_user_connection_id AND scpf.owner_user_id = viewer_user_id AND scpf.connection_user_id = p_connection_user_id AND scpf.field_key = 'anniversary' LIMIT 1), false)
    ),
    'derived_features', jsonb_build_object(
      'your_vibe', COALESCE((SELECT scd.is_shared FROM public.shared_connection_derivations scd WHERE scd.user_connection_id = p_user_connection_id AND scd.owner_user_id = viewer_user_id AND scd.connection_user_id = p_connection_user_id AND scd.feature_key = 'your_vibe' LIMIT 1), false),
      'for_you_recommendations', COALESCE((SELECT scd.is_shared FROM public.shared_connection_derivations scd WHERE scd.user_connection_id = p_user_connection_id AND scd.owner_user_id = viewer_user_id AND scd.connection_user_id = p_connection_user_id AND scd.feature_key = 'for_you_recommendations' LIMIT 1), false),
      'ai_conversation_access', COALESCE((SELECT scd.is_shared FROM public.shared_connection_derivations scd WHERE scd.user_connection_id = p_user_connection_id AND scd.owner_user_id = viewer_user_id AND scd.connection_user_id = p_connection_user_id AND scd.feature_key = 'ai_conversation_access' LIMIT 1), false)
    ),
    'shared_saved_product_card_ids', COALESCE((SELECT jsonb_agg(sspc.saved_product_card_id ORDER BY sspc.created_at DESC) FROM public.shared_saved_product_cards sspc WHERE sspc.user_connection_id = p_user_connection_id AND sspc.owner_user_id = viewer_user_id AND sspc.connection_user_id = p_connection_user_id), '[]'::jsonb),
    'connection_kind', COALESCE((SELECT cas.connection_kind FROM public.connection_access_settings cas WHERE cas.user_connection_id = p_user_connection_id AND cas.owner_user_id = viewer_user_id AND cas.connection_user_id = p_connection_user_id LIMIT 1), 'custom')
  );
END;
$$;

GRANT SELECT ON public.user_knowledge_derivations TO authenticated;
GRANT SELECT ON public.user_knowledge_facts TO authenticated;
GRANT SELECT ON public.user_knowledge_snapshots TO authenticated;

SELECT pg_notify('pgrst', 'reload schema');

-- Codebase classification: runtime catch-up migration for V2 knowledge center, saved product cards, and connection RPCs.
