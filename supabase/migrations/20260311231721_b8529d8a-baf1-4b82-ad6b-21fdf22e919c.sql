-- Sharing permissions table: one row per couple, per user direction
-- Each user in a couple has their own permissions object controlling what they share
CREATE TABLE public.sharing_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id uuid NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  partner_id uuid NOT NULL,
  user_email text NOT NULL,
  partner_email text NOT NULL,
  sizes boolean NOT NULL DEFAULT true,
  brands boolean NOT NULL DEFAULT true,
  saved_items boolean NOT NULL DEFAULT true,
  food_preferences boolean NOT NULL DEFAULT true,
  gift_ideas boolean NOT NULL DEFAULT true,
  wish_list boolean NOT NULL DEFAULT true,
  occasions boolean NOT NULL DEFAULT true,
  memories boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (couple_id, user_id)
);

-- Enable RLS
ALTER TABLE public.sharing_permissions ENABLE ROW LEVEL SECURITY;

-- Users can view their own permissions or permissions targeting them as partner
CREATE POLICY "Users can view own sharing permissions"
  ON public.sharing_permissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = partner_id);

-- Users can insert their own sharing permissions
CREATE POLICY "Users can insert own sharing permissions"
  ON public.sharing_permissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own sharing permissions
CREATE POLICY "Users can update own sharing permissions"
  ON public.sharing_permissions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own sharing permissions
CREATE POLICY "Users can delete own sharing permissions"
  ON public.sharing_permissions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Auto-update updated_at timestamp
CREATE TRIGGER update_sharing_permissions_updated_at
  BEFORE UPDATE ON public.sharing_permissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for instant permission changes
ALTER PUBLICATION supabase_realtime ADD TABLE public.sharing_permissions;

-- Auto-create sharing permission rows when a couple is accepted
CREATE OR REPLACE FUNCTION public.auto_create_sharing_permissions()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only create when status changes to 'accepted' and both user IDs are present
  IF NEW.status = 'accepted' AND NEW.invitee_id IS NOT NULL THEN
    -- Create permissions for inviter -> invitee direction
    INSERT INTO public.sharing_permissions (couple_id, user_id, partner_id, user_email, partner_email)
    VALUES (NEW.id, NEW.inviter_id, NEW.invitee_id, 
      COALESCE((SELECT email FROM auth.users WHERE id = NEW.inviter_id), ''),
      NEW.invitee_email)
    ON CONFLICT (couple_id, user_id) DO NOTHING;

    -- Create permissions for invitee -> inviter direction
    INSERT INTO public.sharing_permissions (couple_id, user_id, partner_id, user_email, partner_email)
    VALUES (NEW.id, NEW.invitee_id, NEW.inviter_id,
      NEW.invitee_email,
      COALESCE((SELECT email FROM auth.users WHERE id = NEW.inviter_id), ''))
    ON CONFLICT (couple_id, user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_couple_accepted_create_permissions
  AFTER INSERT OR UPDATE ON public.couples
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_create_sharing_permissions();

-- Function to get active sharing categories for a connection
-- Returns only categories where the partner has granted permission
CREATE OR REPLACE FUNCTION public.get_shared_categories(p_couple_id uuid, p_viewer_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    jsonb_build_object(
      'sizes', sp.sizes,
      'brands', sp.brands,
      'saved_items', sp.saved_items,
      'food_preferences', sp.food_preferences,
      'gift_ideas', sp.gift_ideas,
      'wish_list', sp.wish_list,
      'occasions', sp.occasions,
      'memories', sp.memories
    ),
    '{}'::jsonb
  )
  FROM public.sharing_permissions sp
  WHERE sp.couple_id = p_couple_id
    AND sp.partner_id = p_viewer_id
$$;