
CREATE TABLE public.category_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  label text NOT NULL,
  section text NOT NULL,
  page text NOT NULL CHECK (page IN ('mygotwo','dashboard')),
  genders text[] NOT NULL,
  image_prompt_male text,
  image_prompt_female text,
  image_prompt_nonbinary text,
  sort_order integer NOT NULL DEFAULT 0,
  fields jsonb NOT NULL DEFAULT '[]',
  subcategories jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.category_registry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read registry" ON public.category_registry FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert registry" ON public.category_registry FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update registry" ON public.category_registry FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete registry" ON public.category_registry FOR DELETE TO authenticated USING (true);

CREATE TABLE public.category_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_key text NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male','female','non-binary')),
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(category_key, gender)
);

ALTER TABLE public.category_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read category images" ON public.category_images FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert category images" ON public.category_images FOR INSERT TO authenticated WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('category-images', 'category-images', true);

CREATE POLICY "Public read category images storage" ON storage.objects FOR SELECT USING (bucket_id = 'category-images');
CREATE POLICY "Authenticated upload category images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'category-images');
CREATE POLICY "Authenticated update category images" ON storage.objects FOR UPDATE USING (bucket_id = 'category-images');
