CREATE TABLE public.resolved_recommendation_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  recommendation_kind TEXT NOT NULL CHECK (recommendation_kind IN ('specific', 'generic', 'catalog')),
  link_kind TEXT NOT NULL CHECK (link_kind IN ('product', 'search')),
  link_url TEXT NOT NULL,
  search_query TEXT,
  price TEXT,
  image_url TEXT,
  source_version TEXT NOT NULL DEFAULT 'resolver-v1',
  resolver_source TEXT NOT NULL DEFAULT 'template',
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.resolved_recommendation_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view resolved recommendation catalog"
ON public.resolved_recommendation_catalog
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert resolved recommendation catalog"
ON public.resolved_recommendation_catalog
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update resolved recommendation catalog"
ON public.resolved_recommendation_catalog
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE INDEX idx_resolved_recommendation_catalog_brand
ON public.resolved_recommendation_catalog (brand);

CREATE INDEX idx_resolved_recommendation_catalog_category
ON public.resolved_recommendation_catalog (category);

CREATE TRIGGER update_resolved_recommendation_catalog_updated_at
BEFORE UPDATE ON public.resolved_recommendation_catalog
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
