CREATE OR REPLACE FUNCTION public.connection_uses_explicit_profile_field_shares(
  p_couple_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT true;
$$;

CREATE OR REPLACE FUNCTION public.connection_uses_explicit_card_shares(
  p_couple_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT true;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_profile(
  p_couple_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  display_name text,
  avatar_url text,
  birthday text,
  anniversary text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH relation AS (
    SELECT c.id
    FROM public.couples c
    WHERE c.id = p_couple_id
      AND c.status = 'accepted'
      AND (
        (c.inviter_id = p_owner_user_id AND c.invitee_id = p_connection_user_id)
        OR
        (c.invitee_id = p_owner_user_id AND c.inviter_id = p_connection_user_id)
      )
  )
  SELECT
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'display_name') THEN p.display_name ELSE NULL END AS display_name,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'avatar_url') THEN p.avatar_url ELSE NULL END AS avatar_url,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'birthday') THEN p.birthday ELSE NULL END AS birthday,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'anniversary') THEN p.anniversary ELSE NULL END AS anniversary
  FROM public.profiles p
  JOIN relation r ON true
  WHERE p.user_id = p_owner_user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_visible_card_entries(
  p_couple_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  entry_name text,
  group_name text,
  card_key text,
  field_values jsonb,
  image_url text,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH relation AS (
    SELECT c.id
    FROM public.couples c
    WHERE c.id = p_couple_id
      AND c.status = 'accepted'
      AND (
        (c.inviter_id = p_owner_user_id AND c.invitee_id = p_connection_user_id)
        OR
        (c.invitee_id = p_owner_user_id AND c.inviter_id = p_connection_user_id)
      )
  )
  SELECT
    ce.id,
    ce.user_id,
    ce.entry_name,
    ce.group_name,
    ce.card_key,
    ce.field_values,
    ce.image_url,
    ce.updated_at
  FROM public.card_entries ce
  JOIN relation r ON true
  WHERE ce.user_id = p_owner_user_id
    AND EXISTS (
      SELECT 1
      FROM public.shared_card_entries sce
      WHERE sce.couple_id = p_couple_id
        AND sce.owner_user_id = p_owner_user_id
        AND sce.connection_user_id = p_connection_user_id
        AND sce.card_entry_id = ce.id
    )
  ORDER BY ce.updated_at DESC;
$$;
