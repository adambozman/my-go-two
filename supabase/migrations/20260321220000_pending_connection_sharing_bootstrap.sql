CREATE TABLE IF NOT EXISTS public.shared_card_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_entry_id uuid NOT NULL REFERENCES public.card_entries(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, owner_user_id, connection_user_id, card_entry_id)
);

CREATE TABLE IF NOT EXISTS public.shared_profile_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  field_key text NOT NULL CHECK (
    field_key IN ('display_name', 'avatar_url', 'birthday', 'anniversary')
  ),
  is_shared boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, owner_user_id, connection_user_id, field_key)
);

CREATE TABLE IF NOT EXISTS public.shared_derived_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature_key text NOT NULL CHECK (
    feature_key IN ('your_vibe', 'for_you_recommendations', 'ai_conversation_access')
  ),
  is_shared boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, owner_user_id, connection_user_id, feature_key)
);

ALTER TABLE public.shared_card_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_profile_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_derived_features ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners can view shared card entries" ON public.shared_card_entries;
CREATE POLICY "Owners can view shared card entries"
ON public.shared_card_entries
FOR SELECT
USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id);

DROP POLICY IF EXISTS "Owners can insert shared card entries" ON public.shared_card_entries;
CREATE POLICY "Owners can insert shared card entries"
ON public.shared_card_entries
FOR INSERT
WITH CHECK (
  auth.uid() = owner_user_id
  AND EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = shared_card_entries.couple_id
      AND (
        (c.inviter_id = owner_user_id AND c.invitee_id = connection_user_id)
        OR
        (c.invitee_id = owner_user_id AND c.inviter_id = connection_user_id)
      )
  )
  AND EXISTS (
    SELECT 1
    FROM public.card_entries ce
    WHERE ce.id = shared_card_entries.card_entry_id
      AND ce.user_id = owner_user_id
  )
);

DROP POLICY IF EXISTS "Owners can delete shared card entries" ON public.shared_card_entries;
CREATE POLICY "Owners can delete shared card entries"
ON public.shared_card_entries
FOR DELETE
USING (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Connections can view shared profile fields" ON public.shared_profile_fields;
CREATE POLICY "Connections can view shared profile fields"
ON public.shared_profile_fields
FOR SELECT
USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id);

DROP POLICY IF EXISTS "Owners can insert shared profile fields" ON public.shared_profile_fields;
CREATE POLICY "Owners can insert shared profile fields"
ON public.shared_profile_fields
FOR INSERT
WITH CHECK (
  auth.uid() = owner_user_id
  AND EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = shared_profile_fields.couple_id
      AND (
        (c.inviter_id = owner_user_id AND c.invitee_id = connection_user_id)
        OR
        (c.invitee_id = owner_user_id AND c.inviter_id = connection_user_id)
      )
  )
);

DROP POLICY IF EXISTS "Owners can update shared profile fields" ON public.shared_profile_fields;
CREATE POLICY "Owners can update shared profile fields"
ON public.shared_profile_fields
FOR UPDATE
USING (auth.uid() = owner_user_id)
WITH CHECK (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Owners can delete shared profile fields" ON public.shared_profile_fields;
CREATE POLICY "Owners can delete shared profile fields"
ON public.shared_profile_fields
FOR DELETE
USING (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Connections can view shared derived features" ON public.shared_derived_features;
CREATE POLICY "Connections can view shared derived features"
ON public.shared_derived_features
FOR SELECT
USING (auth.uid() = owner_user_id OR auth.uid() = connection_user_id);

DROP POLICY IF EXISTS "Owners can insert shared derived features" ON public.shared_derived_features;
CREATE POLICY "Owners can insert shared derived features"
ON public.shared_derived_features
FOR INSERT
WITH CHECK (
  auth.uid() = owner_user_id
  AND EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = shared_derived_features.couple_id
      AND (
        (c.inviter_id = owner_user_id AND c.invitee_id = connection_user_id)
        OR
        (c.invitee_id = owner_user_id AND c.inviter_id = connection_user_id)
      )
  )
);

DROP POLICY IF EXISTS "Owners can update shared derived features" ON public.shared_derived_features;
CREATE POLICY "Owners can update shared derived features"
ON public.shared_derived_features
FOR UPDATE
USING (auth.uid() = owner_user_id)
WITH CHECK (auth.uid() = owner_user_id);

DROP POLICY IF EXISTS "Owners can delete shared derived features" ON public.shared_derived_features;
CREATE POLICY "Owners can delete shared derived features"
ON public.shared_derived_features
FOR DELETE
USING (auth.uid() = owner_user_id);

DROP TRIGGER IF EXISTS update_shared_profile_fields_updated_at ON public.shared_profile_fields;
CREATE TRIGGER update_shared_profile_fields_updated_at
  BEFORE UPDATE ON public.shared_profile_fields
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_shared_derived_features_updated_at ON public.shared_derived_features;
CREATE TRIGGER update_shared_derived_features_updated_at
  BEFORE UPDATE ON public.shared_derived_features
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.connection_context_preferences
  ADD COLUMN IF NOT EXISTS feed_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS for_them_enabled boolean NOT NULL DEFAULT true;

DROP POLICY IF EXISTS "Owners can insert connection context preferences" ON public.connection_context_preferences;
CREATE POLICY "Owners can insert connection context preferences"
ON public.connection_context_preferences
FOR INSERT
WITH CHECK (
  auth.uid() = owner_user_id
  AND EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = connection_context_preferences.couple_id
      AND (
        (c.inviter_id = owner_user_id AND c.invitee_id = connection_user_id)
        OR
        (c.invitee_id = owner_user_id AND c.inviter_id = connection_user_id)
      )
  )
);

CREATE OR REPLACE FUNCTION public.connection_can_view_profile_field(
  p_owner_user_id uuid,
  p_viewer_id uuid,
  p_field_key text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_profile_fields spf
    JOIN public.couples c
      ON c.id = spf.couple_id
    WHERE spf.owner_user_id = p_owner_user_id
      AND spf.connection_user_id = p_viewer_id
      AND spf.field_key = p_field_key
      AND spf.is_shared = true
      AND c.status = 'accepted'
  );
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_derived_feature(
  p_owner_user_id uuid,
  p_viewer_id uuid,
  p_feature_key text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_derived_features sdf
    JOIN public.couples c
      ON c.id = sdf.couple_id
    WHERE sdf.owner_user_id = p_owner_user_id
      AND sdf.connection_user_id = p_viewer_id
      AND sdf.feature_key = p_feature_key
      AND sdf.is_shared = true
      AND c.status = 'accepted'
  );
$$;

CREATE OR REPLACE FUNCTION public.share_all_card_entries_with_connection(
  p_couple_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inserted_count integer := 0;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_owner_user_id THEN
    RAISE EXCEPTION 'Only the owner can bulk share card entries';
  END IF;

  INSERT INTO public.shared_card_entries (
    couple_id,
    owner_user_id,
    connection_user_id,
    card_entry_id
  )
  SELECT
    p_couple_id,
    p_owner_user_id,
    p_connection_user_id,
    ce.id
  FROM public.card_entries ce
  WHERE ce.user_id = p_owner_user_id
  ON CONFLICT DO NOTHING;

  GET DIAGNOSTICS inserted_count = ROW_COUNT;
  RETURN inserted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.unshare_all_card_entries_with_connection(
  p_couple_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer := 0;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_owner_user_id THEN
    RAISE EXCEPTION 'Only the owner can bulk unshare card entries';
  END IF;

  DELETE FROM public.shared_card_entries
  WHERE couple_id = p_couple_id
    AND owner_user_id = p_owner_user_id
    AND connection_user_id = p_connection_user_id;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

NOTIFY pgrst, 'reload schema';
