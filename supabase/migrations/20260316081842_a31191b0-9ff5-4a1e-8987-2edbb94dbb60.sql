
-- Sponsored products catalog (admin-managed)
CREATE TABLE public.sponsored_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  description text,
  price text,
  category text NOT NULL DEFAULT 'clothes',
  image_url text,
  affiliate_url text,
  utm_source text DEFAULT 'gotwo',
  utm_medium text DEFAULT 'app',
  utm_campaign text,
  hook text,
  why text,
  target_gender text[] DEFAULT '{male,female,non-binary}',
  target_price_tiers text[] DEFAULT '{budget,mid-range,premium,luxury}',
  target_style_keywords text[],
  placement text NOT NULL DEFAULT 'blended',
  priority integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Analytics: impressions and clicks
CREATE TABLE public.ad_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.sponsored_products(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  event_type text NOT NULL DEFAULT 'impression',
  placement text,
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsored_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_events ENABLE ROW LEVEL SECURITY;

-- Sponsored products: anyone can read active ones, only admin email can manage
CREATE POLICY "Anyone can read active sponsored products"
  ON public.sponsored_products FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admin can manage sponsored products"
  ON public.sponsored_products FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'adambozman@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'adambozman@gmail.com');

-- Ad events: users can insert their own, admin can read all
CREATE POLICY "Users can insert own ad events"
  ON public.ad_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can read all ad events"
  ON public.ad_events FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'adambozman@gmail.com');

-- Updated_at trigger
CREATE TRIGGER update_sponsored_products_updated_at
  BEFORE UPDATE ON public.sponsored_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
