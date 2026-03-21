CREATE OR REPLACE FUNCTION public.prepare_connection_recommendation(
  p_connection_user_id uuid,
  p_recommendation_kind text DEFAULT 'gift',
  p_occasion_type text DEFAULT NULL,
  p_occasion_date date DEFAULT NULL,
  p_gate_key text DEFAULT 'connection_gifting'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
  relation_row record;
  inserted_id uuid;
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_recommendation_kind NOT IN ('gift', 'occasion', 'general') THEN
    RAISE EXCEPTION 'Invalid recommendation kind';
  END IF;

  SELECT
    c.id AS couple_id
  INTO relation_row
  FROM public.couples c
  WHERE c.status = 'accepted'
    AND (
      (c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id)
      OR
      (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id)
    )
  LIMIT 1;

  IF relation_row.couple_id IS NULL THEN
    RAISE EXCEPTION 'Accepted connection not found';
  END IF;

  INSERT INTO public.connection_recommendations (
    couple_id,
    viewer_user_id,
    connection_user_id,
    recommendation_scope,
    recommendation_kind,
    occasion_type,
    occasion_date,
    access_tier,
    gate_key,
    status,
    source_snapshot,
    recommendations
  ) VALUES (
    relation_row.couple_id,
    viewer_user_id,
    p_connection_user_id,
    'for_you',
    p_recommendation_kind,
    p_occasion_type,
    p_occasion_date,
    'free',
    p_gate_key,
    'draft',
    '{}'::jsonb,
    '[]'::jsonb
  )
  RETURNING id INTO inserted_id;

  RETURN inserted_id;
END;
$$;
