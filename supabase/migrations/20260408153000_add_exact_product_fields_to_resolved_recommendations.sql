ALTER TABLE public.resolved_recommendation_catalog
ADD COLUMN IF NOT EXISTS scraped_product_title text,
ADD COLUMN IF NOT EXISTS product_match_confidence integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS exact_match_confirmed boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_resolved_recommendation_catalog_exact_match
ON public.resolved_recommendation_catalog (exact_match_confirmed, link_kind);
