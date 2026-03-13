CREATE TABLE public.image_blocklist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.image_blocklist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view blocklist" ON public.image_blocklist FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert blocklist" ON public.image_blocklist FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete blocklist" ON public.image_blocklist FOR DELETE TO authenticated USING (true);