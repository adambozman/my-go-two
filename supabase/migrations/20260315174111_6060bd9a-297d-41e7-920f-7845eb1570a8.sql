
CREATE TABLE public.category_bank_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_key text NOT NULL,
  image_url text NOT NULL,
  filename text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(category_key, image_url)
);

ALTER TABLE public.category_bank_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read category bank photos" ON public.category_bank_photos FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated can insert category bank photos" ON public.category_bank_photos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can delete category bank photos" ON public.category_bank_photos FOR DELETE TO authenticated USING (true);
