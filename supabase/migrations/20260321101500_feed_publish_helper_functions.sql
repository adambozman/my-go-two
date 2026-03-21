CREATE OR REPLACE FUNCTION public.get_connection_feed_preview(
  p_limit integer DEFAULT 6
)
RETURNS TABLE (
  feed_item_id text,
  couple_id uuid,
  connection_user_id uuid,
  connection_label text,
  item_kind text,
  title text,
  subtitle text,
  body text,
  image_url text,
  section text,
  event_at timestamptz,
  meta jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM public.get_connection_feed(GREATEST(COALESCE(p_limit, 6), 1), NULL);
$$;

CREATE OR REPLACE FUNCTION public.publish_public_product(
  p_card_entry_id uuid,
  p_title text DEFAULT NULL,
  p_summary text DEFAULT NULL,
  p_lead_image_url text DEFAULT NULL
)
RETURNS public.public_published_entities
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_card public.card_entries%ROWTYPE;
  v_entity public.public_published_entities%ROWTYPE;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT *
  INTO v_card
  FROM public.card_entries ce
  WHERE ce.id = p_card_entry_id
    AND ce.user_id = v_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Card entry not found';
  END IF;

  INSERT INTO public.public_published_entities (
    owner_user_id,
    entity_kind,
    title,
    summary,
    lead_image_url,
    visibility,
    status,
    published_at
  )
  VALUES (
    v_user_id,
    'product',
    COALESCE(NULLIF(BTRIM(p_title), ''), v_card.entry_name),
    NULLIF(BTRIM(p_summary), ''),
    COALESCE(NULLIF(BTRIM(p_lead_image_url), ''), v_card.image_url),
    'public',
    'published',
    now()
  )
  RETURNING *
  INTO v_entity;

  INSERT INTO public.public_published_entity_cards (
    published_entity_id,
    owner_user_id,
    card_entry_id,
    role_key,
    sort_order
  )
  VALUES (
    v_entity.id,
    v_user_id,
    v_card.id,
    'product',
    0
  )
  ON CONFLICT (published_entity_id, card_entry_id) DO NOTHING;

  RETURN v_entity;
END;
$$;

CREATE OR REPLACE FUNCTION public.publish_public_outfit(
  p_title text,
  p_card_entry_ids uuid[],
  p_summary text DEFAULT NULL,
  p_lead_image_url text DEFAULT NULL,
  p_role_keys text[] DEFAULT NULL
)
RETURNS public.public_published_entities
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_entity public.public_published_entities%ROWTYPE;
  v_card_count integer;
  v_invalid_count integer;
  v_effective_lead_image_url text;
  v_idx integer;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NULLIF(BTRIM(COALESCE(p_title, '')), '') IS NULL THEN
    RAISE EXCEPTION 'Title is required';
  END IF;

  IF COALESCE(array_length(p_card_entry_ids, 1), 0) = 0 THEN
    RAISE EXCEPTION 'At least one card is required';
  END IF;

  SELECT COUNT(*)
  INTO v_card_count
  FROM public.card_entries ce
  WHERE ce.id = ANY(p_card_entry_ids)
    AND ce.user_id = v_user_id;

  v_invalid_count := COALESCE(array_length(p_card_entry_ids, 1), 0) - COALESCE(v_card_count, 0);
  IF v_invalid_count > 0 THEN
    RAISE EXCEPTION 'One or more cards are invalid';
  END IF;

  v_effective_lead_image_url := NULLIF(BTRIM(COALESCE(p_lead_image_url, '')), '');
  IF v_effective_lead_image_url IS NULL THEN
    SELECT ce.image_url
    INTO v_effective_lead_image_url
    FROM public.card_entries ce
    WHERE ce.id = p_card_entry_ids[1]
      AND ce.user_id = v_user_id;
  END IF;

  INSERT INTO public.public_published_entities (
    owner_user_id,
    entity_kind,
    title,
    summary,
    lead_image_url,
    visibility,
    status,
    published_at
  )
  VALUES (
    v_user_id,
    'outfit',
    BTRIM(p_title),
    NULLIF(BTRIM(p_summary), ''),
    v_effective_lead_image_url,
    'public',
    'published',
    now()
  )
  RETURNING *
  INTO v_entity;

  FOR v_idx IN 1..COALESCE(array_length(p_card_entry_ids, 1), 0) LOOP
    INSERT INTO public.public_published_entity_cards (
      published_entity_id,
      owner_user_id,
      card_entry_id,
      role_key,
      sort_order
    )
    VALUES (
      v_entity.id,
      v_user_id,
      p_card_entry_ids[v_idx],
      CASE
        WHEN p_role_keys IS NOT NULL AND array_length(p_role_keys, 1) >= v_idx
          THEN NULLIF(BTRIM(COALESCE(p_role_keys[v_idx], '')), '')
        ELSE NULL
      END,
      v_idx - 1
    )
    ON CONFLICT (published_entity_id, card_entry_id) DO NOTHING;
  END LOOP;

  RETURN v_entity;
END;
$$;

CREATE OR REPLACE FUNCTION public.unpublish_public_entity(
  p_published_entity_id uuid
)
RETURNS public.public_published_entities
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_entity public.public_published_entities%ROWTYPE;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  UPDATE public.public_published_entities ppe
  SET
    status = 'archived',
    published_at = NULL,
    updated_at = now()
  WHERE ppe.id = p_published_entity_id
    AND ppe.owner_user_id = v_user_id
  RETURNING *
  INTO v_entity;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Published entity not found';
  END IF;

  RETURN v_entity;
END;
$$;

CREATE OR REPLACE FUNCTION public.follow_public_creator(
  p_creator_user_id uuid
)
RETURNS public.public_creator_follows
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_follow public.public_creator_follows%ROWTYPE;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_creator_user_id = v_user_id THEN
    RAISE EXCEPTION 'Cannot follow yourself';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.public_creator_profiles pcp
    WHERE pcp.user_id = p_creator_user_id
      AND pcp.is_public = true
  ) THEN
    RAISE EXCEPTION 'Creator is not public';
  END IF;

  INSERT INTO public.public_creator_follows (
    follower_user_id,
    creator_user_id
  )
  VALUES (
    v_user_id,
    p_creator_user_id
  )
  ON CONFLICT (follower_user_id, creator_user_id) DO UPDATE
    SET creator_user_id = EXCLUDED.creator_user_id
  RETURNING *
  INTO v_follow;

  RETURN v_follow;
END;
$$;

CREATE OR REPLACE FUNCTION public.unfollow_public_creator(
  p_creator_user_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  DELETE FROM public.public_creator_follows
  WHERE follower_user_id = v_user_id
    AND creator_user_id = p_creator_user_id;

  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION public.toggle_public_entity_reaction(
  p_published_entity_id uuid,
  p_reaction_type text
)
RETURNS TABLE (
  is_active boolean,
  like_count integer,
  love_count integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_deleted_count integer := 0;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_reaction_type NOT IN ('like', 'love') THEN
    RAISE EXCEPTION 'Invalid reaction type';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.public_published_entities ppe
    WHERE ppe.id = p_published_entity_id
      AND ppe.visibility = 'public'
      AND ppe.status = 'published'
  ) THEN
    RAISE EXCEPTION 'Published entity not found';
  END IF;

  DELETE FROM public.public_entity_reactions
  WHERE published_entity_id = p_published_entity_id
    AND user_id = v_user_id
    AND reaction_type = p_reaction_type;

  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;

  IF v_deleted_count = 0 THEN
    INSERT INTO public.public_entity_reactions (
      published_entity_id,
      user_id,
      reaction_type
    )
    VALUES (
      p_published_entity_id,
      v_user_id,
      p_reaction_type
    );
  END IF;

  RETURN QUERY
  SELECT
    (v_deleted_count = 0) AS is_active,
    COUNT(*) FILTER (WHERE per.reaction_type = 'like')::integer AS like_count,
    COUNT(*) FILTER (WHERE per.reaction_type = 'love')::integer AS love_count
  FROM public.public_entity_reactions per
  WHERE per.published_entity_id = p_published_entity_id;
END;
$$;
