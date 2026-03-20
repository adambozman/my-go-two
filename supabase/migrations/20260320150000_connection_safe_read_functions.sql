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
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_card_entries sce
    WHERE sce.couple_id = p_couple_id
      AND sce.owner_user_id = p_owner_user_id
      AND sce.connection_user_id = p_connection_user_id
  );
$$;

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
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_profile_fields spf
    WHERE spf.couple_id = p_couple_id
      AND spf.owner_user_id = p_owner_user_id
      AND spf.connection_user_id = p_connection_user_id
  );
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
  ),
  explicit_mode AS (
    SELECT public.connection_uses_explicit_profile_field_shares(
      p_couple_id,
      p_owner_user_id,
      p_connection_user_id
    ) AS uses_explicit
  ),
  legacy_permissions AS (
    SELECT sp.*
    FROM public.sharing_permissions sp
    JOIN relation r ON r.id = sp.couple_id
    WHERE sp.user_id = p_owner_user_id
      AND sp.partner_id = p_connection_user_id
    LIMIT 1
  )
  SELECT
    CASE
      WHEN em.uses_explicit THEN
        CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'display_name') THEN p.display_name ELSE NULL END
      ELSE
        CASE WHEN EXISTS (SELECT 1 FROM legacy_permissions lp WHERE lp.sizes OR lp.brands OR lp.saved_items OR lp.food_preferences OR lp.gift_ideas OR lp.wish_list OR lp.occasions OR lp.memories) THEN p.display_name ELSE NULL END
    END AS display_name,
    CASE
      WHEN em.uses_explicit THEN
        CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'avatar_url') THEN p.avatar_url ELSE NULL END
      ELSE
        CASE WHEN EXISTS (SELECT 1 FROM legacy_permissions lp WHERE lp.sizes OR lp.brands OR lp.saved_items OR lp.food_preferences OR lp.gift_ideas OR lp.wish_list OR lp.occasions OR lp.memories) THEN p.avatar_url ELSE NULL END
    END AS avatar_url,
    CASE
      WHEN em.uses_explicit THEN
        CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'birthday') THEN p.birthday ELSE NULL END
      ELSE
        CASE WHEN EXISTS (SELECT 1 FROM legacy_permissions lp WHERE lp.occasions) THEN p.birthday ELSE NULL END
    END AS birthday,
    CASE
      WHEN em.uses_explicit THEN
        CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'anniversary') THEN p.anniversary ELSE NULL END
      ELSE
        CASE WHEN EXISTS (SELECT 1 FROM legacy_permissions lp WHERE lp.occasions) THEN p.anniversary ELSE NULL END
    END AS anniversary
  FROM public.profiles p
  JOIN relation r ON true
  JOIN explicit_mode em ON true
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
  ),
  explicit_mode AS (
    SELECT public.connection_uses_explicit_card_shares(
      p_couple_id,
      p_owner_user_id,
      p_connection_user_id
    ) AS uses_explicit
  ),
  legacy_permissions AS (
    SELECT sp.*
    FROM public.sharing_permissions sp
    JOIN relation r ON r.id = sp.couple_id
    WHERE sp.user_id = p_owner_user_id
      AND sp.partner_id = p_connection_user_id
    LIMIT 1
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
  JOIN explicit_mode em ON true
  WHERE ce.user_id = p_owner_user_id
    AND (
      (
        em.uses_explicit
        AND EXISTS (
          SELECT 1
          FROM public.shared_card_entries sce
          WHERE sce.couple_id = p_couple_id
            AND sce.owner_user_id = p_owner_user_id
            AND sce.connection_user_id = p_connection_user_id
            AND sce.card_entry_id = ce.id
        )
      )
      OR
      (
        NOT em.uses_explicit
        AND EXISTS (
          SELECT 1
          FROM legacy_permissions lp
          WHERE CASE public.infer_card_entry_section(
            ce.card_key,
            ce.group_name,
            ce.entry_name
          )
            WHEN 'style' THEN (lp.sizes OR lp.brands)
            WHEN 'food' THEN lp.food_preferences
            WHEN 'favorites' THEN (
              lp.gift_ideas
              OR lp.wish_list
              OR lp.occasions
              OR lp.memories
              OR lp.saved_items
            )
            WHEN 'personal' THEN (lp.brands OR lp.saved_items OR lp.sizes)
            ELSE (
              lp.sizes
              OR lp.brands
              OR lp.saved_items
              OR lp.food_preferences
              OR lp.gift_ideas
              OR lp.wish_list
              OR lp.occasions
              OR lp.memories
            )
          END
        )
      )
    )
  ORDER BY ce.updated_at DESC;
$$;
