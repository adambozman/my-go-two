ALTER TABLE public.recommendation_product_bank
  ADD COLUMN IF NOT EXISTS bank_state text NOT NULL DEFAULT 'review_required',
  ADD COLUMN IF NOT EXISTS bank_source text NOT NULL DEFAULT 'legacy-migration',
  ADD COLUMN IF NOT EXISTS image_status text NOT NULL DEFAULT 'unverified',
  ADD COLUMN IF NOT EXISTS image_verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS verification_notes jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS last_verification_error text;

CREATE INDEX IF NOT EXISTS idx_recommendation_product_bank_state
  ON public.recommendation_product_bank (bank_state, exact_match_confirmed, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_recommendation_product_bank_image_status
  ON public.recommendation_product_bank (image_status, updated_at DESC);

CREATE TABLE IF NOT EXISTS public.recommendation_trend_candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_platform text NOT NULL,
  source_category text,
  source_url text,
  external_candidate_id text,
  brand text NOT NULL,
  product_title text NOT NULL,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  category text,
  product_url text,
  product_url_hash text GENERATED ALWAYS AS (md5(COALESCE(product_url, brand || '::' || product_title))) STORED,
  image_url text,
  price_text text,
  trend_score numeric NOT NULL DEFAULT 0,
  candidate_state text NOT NULL DEFAULT 'staged',
  normalized_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  promotion_notes text,
  observed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT recommendation_trend_candidates_unique UNIQUE (source_platform, product_url_hash)
);

CREATE INDEX IF NOT EXISTS idx_recommendation_trend_candidates_state
  ON public.recommendation_trend_candidates (candidate_state, observed_at DESC);

CREATE INDEX IF NOT EXISTS idx_recommendation_trend_candidates_lookup
  ON public.recommendation_trend_candidates (category, primary_keyword, brand);

ALTER TABLE public.recommendation_trend_candidates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view recommendation trend candidates" ON public.recommendation_trend_candidates;
CREATE POLICY "Authenticated users can view recommendation trend candidates"
  ON public.recommendation_trend_candidates
  FOR SELECT
  TO authenticated
  USING (true);

DROP TRIGGER IF EXISTS update_recommendation_trend_candidates_updated_at ON public.recommendation_trend_candidates;
CREATE TRIGGER update_recommendation_trend_candidates_updated_at
BEFORE UPDATE ON public.recommendation_trend_candidates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
