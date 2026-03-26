CREATE TABLE IF NOT EXISTS public.website_asset_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_key text NOT NULL UNIQUE,
  bank_photo_id uuid NOT NULL REFERENCES public.category_bank_photos(id) ON DELETE CASCADE,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.website_asset_assignments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read website asset assignments" ON public.website_asset_assignments;
CREATE POLICY "Authenticated users can read website asset assignments"
ON public.website_asset_assignments
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage website asset assignments" ON public.website_asset_assignments;
CREATE POLICY "Authenticated users can manage website asset assignments"
ON public.website_asset_assignments
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP TRIGGER IF EXISTS set_website_asset_assignments_updated_at ON public.website_asset_assignments;
CREATE TRIGGER set_website_asset_assignments_updated_at
BEFORE UPDATE ON public.website_asset_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
