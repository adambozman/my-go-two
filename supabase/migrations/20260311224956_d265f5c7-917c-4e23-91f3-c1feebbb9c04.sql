
-- Add display_label and photo_url columns to couples table
ALTER TABLE public.couples
  ADD COLUMN IF NOT EXISTS display_label text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS photo_url text DEFAULT NULL;

-- Create trigger function to auto-link new users to existing connection invitations
CREATE OR REPLACE FUNCTION public.auto_link_connections()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- When a new user signs up, link them to any pending invitations matching their email
  UPDATE public.couples
  SET invitee_id = NEW.id
  WHERE invitee_email = NEW.email
    AND invitee_id IS NULL;
  RETURN NEW;
END;
$$;

-- Attach trigger to auth.users on insert
CREATE TRIGGER on_auth_user_created_link_connections
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_link_connections();
