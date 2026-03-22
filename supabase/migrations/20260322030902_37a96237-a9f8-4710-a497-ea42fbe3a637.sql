
-- Stage 1: Tables, RLS, triggers only

CREATE TABLE IF NOT EXISTS public.shared_card_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL,
  connection_user_id uuid NOT NULL,
  card_entry_id uuid NOT NULL REFERENCES public.card_entries(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, owner_user_id, connection_user_id, card_entry_id)
);

CREATE TABLE IF NOT EXISTS public.shared_profile_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL,
  connection_user_id uuid NOT NULL,
  field_key text NOT NULL CHECK (field_key IN ('display_name', 'avatar_url', 'birthday', 'anniversary')),
  is_shared boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, owner_user_id, connection_user_id, field_key)
);

CREATE TABLE IF NOT EXISTS public.shared_derived_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL,
  connection_user_id uuid NOT NULL,
  feature_key text NOT NULL CHECK (feature_key IN ('your_vibe', 'for_you_recommendations', 'ai_conversation_access')),
  is_shared boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, owner_user_id, connection_user_id, feature_key)
);

CREATE TABLE IF NOT EXISTS public.connection_context_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL,
  connection_user_id uuid NOT NULL,
  connection_kind text NOT NULL DEFAULT 'custom' CHECK (connection_kind IN ('significant_other','wife','husband','girlfriend','boyfriend','parent','family','friend','coworker','custom')),
  gifting_enabled boolean NOT NULL DEFAULT true,
  occasion_tracking_enabled boolean NOT NULL DEFAULT true,
  access_tier text NOT NULL DEFAULT 'free' CHECK (access_tier IN ('free','premium','concierge')),
  feature_gates jsonb NOT NULL DEFAULT '{"connection_context":true,"occasion_gifting":true,"deep_gifting":false}'::jsonb,
  feed_enabled boolean NOT NULL DEFAULT true,
  for_them_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, owner_user_id, connection_user_id)
);

CREATE TABLE IF NOT EXISTS public.connection_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  viewer_user_id uuid NOT NULL,
  connection_user_id uuid NOT NULL,
  recommendation_scope text NOT NULL DEFAULT 'for_you' CHECK (recommendation_scope IN ('for_you')),
  recommendation_kind text NOT NULL DEFAULT 'gift' CHECK (recommendation_kind IN ('gift','occasion','general')),
  occasion_type text,
  occasion_date date,
  access_tier text NOT NULL DEFAULT 'free' CHECK (access_tier IN ('free','premium','concierge')),
  gate_key text NOT NULL DEFAULT 'connection_gifting',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','ready','archived')),
  source_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.shared_card_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_profile_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_derived_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_context_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners can view shared card entries" ON public.shared_card_entries;
CREATE POLICY "Owners can view shared card entries" ON public.shared_card_entries FOR SELECT USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id);
DROP POLICY IF EXISTS "Owners can insert shared card entries" ON public.shared_card_entries;
CREATE POLICY "Owners can insert shared card entries" ON public.shared_card_entries FOR INSERT WITH CHECK (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners can delete shared card entries" ON public.shared_card_entries;
CREATE POLICY "Owners can delete shared card entries" ON public.shared_card_entries FOR DELETE USING (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Connections can view shared profile fields" ON public.shared_profile_fields;
CREATE POLICY "Connections can view shared profile fields" ON public.shared_profile_fields FOR SELECT USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id);
DROP POLICY IF EXISTS "Owners can insert shared profile fields" ON public.shared_profile_fields;
CREATE POLICY "Owners can insert shared profile fields" ON public.shared_profile_fields FOR INSERT WITH CHECK (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners can update shared profile fields" ON public.shared_profile_fields;
CREATE POLICY "Owners can update shared profile fields" ON public.shared_profile_fields FOR UPDATE USING (auth.uid() = owner_user_id) WITH CHECK (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners can delete shared profile fields" ON public.shared_profile_fields;
CREATE POLICY "Owners can delete shared profile fields" ON public.shared_profile_fields FOR DELETE USING (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Connections can view shared derived features" ON public.shared_derived_features;
CREATE POLICY "Connections can view shared derived features" ON public.shared_derived_features FOR SELECT USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id);
DROP POLICY IF EXISTS "Owners can insert shared derived features" ON public.shared_derived_features;
CREATE POLICY "Owners can insert shared derived features" ON public.shared_derived_features FOR INSERT WITH CHECK (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners can update shared derived features" ON public.shared_derived_features;
CREATE POLICY "Owners can update shared derived features" ON public.shared_derived_features FOR UPDATE USING (auth.uid() = owner_user_id) WITH CHECK (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners can delete shared derived features" ON public.shared_derived_features;
CREATE POLICY "Owners can delete shared derived features" ON public.shared_derived_features FOR DELETE USING (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Owners can view connection context preferences" ON public.connection_context_preferences;
CREATE POLICY "Owners can view connection context preferences" ON public.connection_context_preferences FOR SELECT USING (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners can insert connection context preferences" ON public.connection_context_preferences;
CREATE POLICY "Owners can insert connection context preferences" ON public.connection_context_preferences FOR INSERT WITH CHECK (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners can update connection context preferences" ON public.connection_context_preferences;
CREATE POLICY "Owners can update connection context preferences" ON public.connection_context_preferences FOR UPDATE USING (auth.uid() = owner_user_id) WITH CHECK (auth.uid() = owner_user_id);
DROP POLICY IF EXISTS "Owners can delete connection context preferences" ON public.connection_context_preferences;
CREATE POLICY "Owners can delete connection context preferences" ON public.connection_context_preferences FOR DELETE USING (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Viewers can view connection recommendations" ON public.connection_recommendations;
CREATE POLICY "Viewers can view connection recommendations" ON public.connection_recommendations FOR SELECT USING (auth.uid() = viewer_user_id);
DROP POLICY IF EXISTS "Viewers can insert connection recommendations" ON public.connection_recommendations;
CREATE POLICY "Viewers can insert connection recommendations" ON public.connection_recommendations FOR INSERT WITH CHECK (auth.uid() = viewer_user_id);
DROP POLICY IF EXISTS "Viewers can update connection recommendations" ON public.connection_recommendations;
CREATE POLICY "Viewers can update connection recommendations" ON public.connection_recommendations FOR UPDATE USING (auth.uid() = viewer_user_id) WITH CHECK (auth.uid() = viewer_user_id);
DROP POLICY IF EXISTS "Viewers can delete connection recommendations" ON public.connection_recommendations;
CREATE POLICY "Viewers can delete connection recommendations" ON public.connection_recommendations FOR DELETE USING (auth.uid() = viewer_user_id);

DROP TRIGGER IF EXISTS update_shared_profile_fields_updated_at ON public.shared_profile_fields;
CREATE TRIGGER update_shared_profile_fields_updated_at BEFORE UPDATE ON public.shared_profile_fields FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_shared_derived_features_updated_at ON public.shared_derived_features;
CREATE TRIGGER update_shared_derived_features_updated_at BEFORE UPDATE ON public.shared_derived_features FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_connection_context_preferences_updated_at ON public.connection_context_preferences;
CREATE TRIGGER update_connection_context_preferences_updated_at BEFORE UPDATE ON public.connection_context_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
DROP TRIGGER IF EXISTS update_connection_recommendations_updated_at ON public.connection_recommendations;
CREATE TRIGGER update_connection_recommendations_updated_at BEFORE UPDATE ON public.connection_recommendations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_connection_recommendations_viewer_connection ON public.connection_recommendations (viewer_user_id, connection_user_id, updated_at DESC);

NOTIFY pgrst, 'reload schema';
