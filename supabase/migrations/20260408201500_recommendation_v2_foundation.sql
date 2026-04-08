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

CREATE INDEX IF NOT EXISTS idx_user_preference_signals_user_type
  ON public.user_preference_signals (user_id, signal_type);

CREATE INDEX IF NOT EXISTS idx_user_preference_signals_user_negative
  ON public.user_preference_signals (user_id, is_negative);

CREATE INDEX IF NOT EXISTS idx_user_product_card_keywords_user_id
  ON public.user_product_card_keywords (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_like_signals_user_id
  ON public.user_like_signals (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_dislike_signals_user_id
  ON public.user_dislike_signals (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_recommendation_keyword_bank_lookup
  ON public.recommendation_keyword_bank (category, primary_keyword, descriptor_keyword);

CREATE INDEX IF NOT EXISTS idx_recommendation_brand_bank_lookup
  ON public.recommendation_brand_bank (category, primary_keyword, brand);

CREATE INDEX IF NOT EXISTS idx_recommendation_brand_location_bank_lookup
  ON public.recommendation_brand_location_bank (location_key, category, brand);

CREATE INDEX IF NOT EXISTS idx_recommendation_product_bank_primary_bucket
  ON public.recommendation_product_bank (category, primary_keyword, exact_match_confirmed);

CREATE INDEX IF NOT EXISTS idx_recommendation_product_bank_keyword_signature
  ON public.recommendation_product_bank (keyword_signature);

CREATE INDEX IF NOT EXISTS idx_recommendation_product_bank_descriptor_keywords
  ON public.recommendation_product_bank USING gin (descriptor_keywords);

CREATE INDEX IF NOT EXISTS idx_user_weekly_recommendations_user_week
  ON public.user_weekly_recommendations (user_id, week_start DESC);

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
