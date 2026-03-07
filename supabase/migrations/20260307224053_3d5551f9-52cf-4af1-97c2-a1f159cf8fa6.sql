
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Couples table
CREATE TABLE public.couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  invitee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.couples ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own couples" ON public.couples FOR SELECT USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);
CREATE POLICY "Users can create couples" ON public.couples FOR INSERT WITH CHECK (auth.uid() = inviter_id);
CREATE POLICY "Users can update own couples" ON public.couples FOR UPDATE USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);
CREATE TRIGGER update_couples_updated_at BEFORE UPDATE ON public.couples FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Lists table
CREATE TABLE public.lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'list',
  is_shared BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.lists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own lists" ON public.lists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Partners can view shared lists" ON public.lists FOR SELECT USING (
  is_shared = true AND EXISTS (
    SELECT 1 FROM public.couples
    WHERE status = 'accepted'
    AND ((inviter_id = lists.user_id AND invitee_id = auth.uid())
      OR (invitee_id = lists.user_id AND inviter_id = auth.uid()))
  )
);
CREATE POLICY "Users can insert own lists" ON public.lists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own lists" ON public.lists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own lists" ON public.lists FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_lists_updated_at BEFORE UPDATE ON public.lists FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Card templates (before cards)
CREATE TABLE public.card_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT DEFAULT 'file',
  default_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_system BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.card_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view templates" ON public.card_templates FOR SELECT USING (true);

-- Cards table
CREATE TABLE public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id UUID NOT NULL REFERENCES public.lists(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT,
  fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  template_id UUID REFERENCES public.card_templates(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own cards" ON public.cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Partners can view shared cards" ON public.cards FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.lists l
    WHERE l.id = cards.list_id AND l.is_shared = true
    AND EXISTS (
      SELECT 1 FROM public.couples
      WHERE status = 'accepted'
      AND ((inviter_id = l.user_id AND invitee_id = auth.uid())
        OR (invitee_id = l.user_id AND inviter_id = auth.uid()))
    )
  )
);
CREATE POLICY "Users can insert own cards" ON public.cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cards" ON public.cards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cards" ON public.cards FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_cards_updated_at BEFORE UPDATE ON public.cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default templates
INSERT INTO public.card_templates (name, category, icon, default_fields) VALUES
('Coffee Order', 'food-drink', 'coffee', '[{"label":"Drink","type":"text","value":""},{"label":"Size","type":"select","options":["Small","Medium","Large"],"value":""},{"label":"Milk","type":"select","options":["Whole","Oat","Almond","Skim","None"],"value":""},{"label":"Extras","type":"text","value":""},{"label":"Notes","type":"text","value":""}]'),
('Salad Preferences', 'food-drink', 'salad', '[{"label":"Base","type":"text","value":""},{"label":"Protein","type":"text","value":""},{"label":"Toppings","type":"text","value":""},{"label":"Dressing","type":"text","value":""},{"label":"Allergies","type":"text","value":""}]'),
('Clothing Sizes', 'fashion', 'shirt', '[{"label":"Top Size","type":"select","options":["XS","S","M","L","XL","XXL"],"value":""},{"label":"Bottom Size","type":"text","value":""},{"label":"Shoe Size","type":"text","value":""},{"label":"Preferred Brands","type":"text","value":""},{"label":"Style Notes","type":"text","value":""}]'),
('Date Ideas', 'experiences', 'heart', '[{"label":"Activity","type":"text","value":""},{"label":"Location","type":"text","value":""},{"label":"Best Time","type":"text","value":""},{"label":"Budget","type":"select","options":["$","$$","$$$","$$$$"],"value":""},{"label":"Notes","type":"text","value":""}]'),
('Gift Ideas', 'gifts', 'gift', '[{"label":"Item","type":"text","value":""},{"label":"Where to Buy","type":"text","value":""},{"label":"Price Range","type":"text","value":""},{"label":"Priority","type":"select","options":["Would love","Nice to have","Dream gift"],"value":""},{"label":"Notes","type":"text","value":""}]');
