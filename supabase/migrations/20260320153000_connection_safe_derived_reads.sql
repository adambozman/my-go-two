CREATE OR REPLACE FUNCTION public.connection_uses_explicit_derived_shares(
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
    FROM public.shared_derived_features sdf
    WHERE sdf.couple_id = p_couple_id
      AND sdf.owner_user_id = p_owner_user_id
      AND sdf.connection_user_id = p_connection_user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_vibe(
  p_couple_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  persona_summary text
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
    CASE
      WHEN public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'your_vibe')
      THEN up.ai_personalization ->> 'persona_summary'
      ELSE NULL
    END AS persona_summary
  FROM public.user_preferences up
  JOIN relation r ON true
  WHERE up.user_id = p_owner_user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_recommendations(
  p_couple_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  id uuid,
  week_start date,
  generated_at timestamptz,
  products jsonb
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
    wr.id,
    wr.week_start,
    wr.generated_at,
    wr.products
  FROM public.weekly_recommendations wr
  JOIN relation r ON true
  WHERE wr.user_id = p_owner_user_id
    AND public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'for_you_recommendations')
  ORDER BY wr.week_start DESC, wr.generated_at DESC
  LIMIT 1;
$$;
