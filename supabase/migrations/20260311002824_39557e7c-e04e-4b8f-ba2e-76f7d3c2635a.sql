
-- Custom templates table for user-created cards
CREATE TABLE public.custom_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  category text NOT NULL,
  name text NOT NULL,
  image_url text,
  default_fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own custom templates"
  ON public.custom_templates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own custom templates"
  ON public.custom_templates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own custom templates"
  ON public.custom_templates FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own custom templates"
  ON public.custom_templates FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Storage bucket for card images
INSERT INTO storage.buckets (id, name, public)
VALUES ('card-images', 'card-images', true);

CREATE POLICY "Users can upload card images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'card-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view card images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'card-images');
