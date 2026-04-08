ALTER TABLE public.resolved_recommendation_catalog
ADD COLUMN IF NOT EXISTS primary_keyword text,
ADD COLUMN IF NOT EXISTS descriptor_keywords jsonb NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_resolved_recommendation_catalog_primary_keyword
ON public.resolved_recommendation_catalog (category, primary_keyword);

CREATE INDEX IF NOT EXISTS idx_resolved_recommendation_catalog_descriptor_keywords
ON public.resolved_recommendation_catalog
USING gin (descriptor_keywords);
