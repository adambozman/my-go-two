CREATE OR REPLACE FUNCTION public.get_connection_outgoing_sharing_state(
  p_couple_id uuid,
  p_connection_user_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
  relation_exists boolean := false;
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = p_couple_id
      AND (
        (c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id)
        OR
        (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id)
      )
  )
  INTO relation_exists;

  IF NOT relation_exists THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  RETURN jsonb_build_object(
    'profile_fields',
    jsonb_build_object(
      'display_name', COALESCE((
        SELECT spf.is_shared
        FROM public.shared_profile_fields spf
        WHERE spf.couple_id = p_couple_id
          AND spf.owner_user_id = viewer_user_id
          AND spf.connection_user_id = p_connection_user_id
          AND spf.field_key = 'display_name'
        LIMIT 1
      ), false),
      'avatar_url', COALESCE((
        SELECT spf.is_shared
        FROM public.shared_profile_fields spf
        WHERE spf.couple_id = p_couple_id
          AND spf.owner_user_id = viewer_user_id
          AND spf.connection_user_id = p_connection_user_id
          AND spf.field_key = 'avatar_url'
        LIMIT 1
      ), false),
      'birthday', COALESCE((
        SELECT spf.is_shared
        FROM public.shared_profile_fields spf
        WHERE spf.couple_id = p_couple_id
          AND spf.owner_user_id = viewer_user_id
          AND spf.connection_user_id = p_connection_user_id
          AND spf.field_key = 'birthday'
        LIMIT 1
      ), false),
      'anniversary', COALESCE((
        SELECT spf.is_shared
        FROM public.shared_profile_fields spf
        WHERE spf.couple_id = p_couple_id
          AND spf.owner_user_id = viewer_user_id
          AND spf.connection_user_id = p_connection_user_id
          AND spf.field_key = 'anniversary'
        LIMIT 1
      ), false)
    ),
    'derived_features',
    jsonb_build_object(
      'your_vibe', COALESCE((
        SELECT sdf.is_shared
        FROM public.shared_derived_features sdf
        WHERE sdf.couple_id = p_couple_id
          AND sdf.owner_user_id = viewer_user_id
          AND sdf.connection_user_id = p_connection_user_id
          AND sdf.feature_key = 'your_vibe'
        LIMIT 1
      ), false),
      'for_you_recommendations', COALESCE((
        SELECT sdf.is_shared
        FROM public.shared_derived_features sdf
        WHERE sdf.couple_id = p_couple_id
          AND sdf.owner_user_id = viewer_user_id
          AND sdf.connection_user_id = p_connection_user_id
          AND sdf.feature_key = 'for_you_recommendations'
        LIMIT 1
      ), false),
      'ai_conversation_access', COALESCE((
        SELECT sdf.is_shared
        FROM public.shared_derived_features sdf
        WHERE sdf.couple_id = p_couple_id
          AND sdf.owner_user_id = viewer_user_id
          AND sdf.connection_user_id = p_connection_user_id
          AND sdf.feature_key = 'ai_conversation_access'
        LIMIT 1
      ), false)
    ),
    'shared_card_entry_ids',
    COALESCE((
      SELECT jsonb_agg(sce.card_entry_id ORDER BY sce.created_at DESC)
      FROM public.shared_card_entries sce
      WHERE sce.couple_id = p_couple_id
        AND sce.owner_user_id = viewer_user_id
        AND sce.connection_user_id = p_connection_user_id
    ), '[]'::jsonb),
    'connection_kind',
    COALESCE((
      SELECT ccp.connection_kind
      FROM public.connection_context_preferences ccp
      WHERE ccp.couple_id = p_couple_id
        AND ccp.owner_user_id = viewer_user_id
        AND ccp.connection_user_id = p_connection_user_id
      LIMIT 1
    ), 'custom')
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_profile_field_share(
  p_couple_id uuid,
  p_connection_user_id uuid,
  p_field_key text,
  p_is_shared boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_field_key NOT IN ('display_name', 'avatar_url', 'birthday', 'anniversary') THEN
    RAISE EXCEPTION 'Invalid field key';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = p_couple_id
      AND (
        (c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id)
        OR
        (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.shared_profile_fields (
    couple_id,
    owner_user_id,
    connection_user_id,
    field_key,
    is_shared
  )
  VALUES (
    p_couple_id,
    viewer_user_id,
    p_connection_user_id,
    p_field_key,
    p_is_shared
  )
  ON CONFLICT (couple_id, owner_user_id, connection_user_id, field_key)
  DO UPDATE SET
    is_shared = EXCLUDED.is_shared,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_derived_feature_share(
  p_couple_id uuid,
  p_connection_user_id uuid,
  p_feature_key text,
  p_is_shared boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_feature_key NOT IN ('your_vibe', 'for_you_recommendations', 'ai_conversation_access') THEN
    RAISE EXCEPTION 'Invalid feature key';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = p_couple_id
      AND (
        (c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id)
        OR
        (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.shared_derived_features (
    couple_id,
    owner_user_id,
    connection_user_id,
    feature_key,
    is_shared
  )
  VALUES (
    p_couple_id,
    viewer_user_id,
    p_connection_user_id,
    p_feature_key,
    p_is_shared
  )
  ON CONFLICT (couple_id, owner_user_id, connection_user_id, feature_key)
  DO UPDATE SET
    is_shared = EXCLUDED.is_shared,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_card_share(
  p_couple_id uuid,
  p_connection_user_id uuid,
  p_card_entry_id uuid,
  p_is_shared boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = p_couple_id
      AND (
        (c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id)
        OR
        (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.card_entries ce
    WHERE ce.id = p_card_entry_id
      AND ce.user_id = viewer_user_id
  ) THEN
    RAISE EXCEPTION 'Card entry not found for current user';
  END IF;

  IF p_is_shared THEN
    INSERT INTO public.shared_card_entries (
      couple_id,
      owner_user_id,
      connection_user_id,
      card_entry_id
    )
    VALUES (
      p_couple_id,
      viewer_user_id,
      p_connection_user_id,
      p_card_entry_id
    )
    ON CONFLICT (couple_id, owner_user_id, connection_user_id, card_entry_id)
    DO NOTHING;
  ELSE
    DELETE FROM public.shared_card_entries
    WHERE couple_id = p_couple_id
      AND owner_user_id = viewer_user_id
      AND connection_user_id = p_connection_user_id
      AND card_entry_id = p_card_entry_id;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_kind_preference(
  p_couple_id uuid,
  p_connection_user_id uuid,
  p_connection_kind text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_connection_kind NOT IN ('significant_other', 'wife', 'husband', 'girlfriend', 'boyfriend', 'parent', 'family', 'friend', 'coworker', 'custom') THEN
    RAISE EXCEPTION 'Invalid connection kind';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.couples c
    WHERE c.id = p_couple_id
      AND (
        (c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id)
        OR
        (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.connection_context_preferences (
    couple_id,
    owner_user_id,
    connection_user_id,
    connection_kind
  )
  VALUES (
    p_couple_id,
    viewer_user_id,
    p_connection_user_id,
    p_connection_kind
  )
  ON CONFLICT (couple_id, owner_user_id, connection_user_id)
  DO UPDATE SET
    connection_kind = EXCLUDED.connection_kind,
    updated_at = now();
END;
$$;

NOTIFY pgrst, 'reload schema';
