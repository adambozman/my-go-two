CREATE TABLE IF NOT EXISTS public.dev_asset_image_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  asset_key text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT dev_asset_image_overrides_user_asset_unique UNIQUE (user_id, asset_key)
);

ALTER TABLE public.dev_asset_image_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own dev asset overrides" ON public.dev_asset_image_overrides;
CREATE POLICY "Users manage own dev asset overrides"
ON public.dev_asset_image_overrides
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_dev_asset_image_overrides_updated_at ON public.dev_asset_image_overrides;
CREATE TRIGGER set_dev_asset_image_overrides_updated_at
BEFORE UPDATE ON public.dev_asset_image_overrides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
