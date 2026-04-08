ALTER TABLE public.resolved_recommendation_catalog
ADD COLUMN IF NOT EXISTS intent_keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS keyword_signature text,
ADD COLUMN IF NOT EXISTS scraped_description text;

CREATE INDEX IF NOT EXISTS idx_resolved_recommendation_catalog_keyword_signature
ON public.resolved_recommendation_catalog (keyword_signature);
