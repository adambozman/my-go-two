CREATE OR REPLACE FUNCTION public.get_connection_shared_recommendations(
  p_user_connection_id uuid,
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
    SELECT uc.id
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND uc.status = 'accepted'
      AND (
        (uc.inviter_id = p_owner_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = p_owner_user_id AND uc.inviter_id = p_connection_user_id)
      )
  )
  SELECT
    wr.id,
    wr.week_start,
    wr.generated_at,
    wr.products
  FROM public.user_weekly_recommendations wr
  JOIN relation r ON true
  WHERE wr.user_id = p_owner_user_id
    AND public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'for_you_recommendations')
  ORDER BY wr.week_start DESC, wr.generated_at DESC
  LIMIT 1;
$$;
