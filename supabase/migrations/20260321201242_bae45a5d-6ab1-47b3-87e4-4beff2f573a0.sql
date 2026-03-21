
-- =====================================================
-- CONSOLIDATED MIGRATION: Missing schema objects
-- =====================================================

-- 1. connection_share_tokens table
CREATE TABLE IF NOT EXISTS public.connection_share_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(24), 'hex'),
  channel text NOT NULL DEFAULT 'qr',
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  used_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.connection_share_tokens ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'connection_share_tokens' AND policyname = 'Users can view own connection share tokens') THEN
    CREATE POLICY "Users can view own connection share tokens" ON public.connection_share_tokens FOR SELECT USING (auth.uid() = owner_user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'connection_share_tokens' AND policyname = 'Users can insert own connection share tokens') THEN
    CREATE POLICY "Users can insert own connection share tokens" ON public.connection_share_tokens FOR INSERT WITH CHECK (auth.uid() = owner_user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'connection_share_tokens' AND policyname = 'Users can update own connection share tokens') THEN
    CREATE POLICY "Users can update own connection share tokens" ON public.connection_share_tokens FOR UPDATE USING (auth.uid() = owner_user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'connection_share_tokens' AND policyname = 'Users can delete own connection share tokens') THEN
    CREATE POLICY "Users can delete own connection share tokens" ON public.connection_share_tokens FOR DELETE USING (auth.uid() = owner_user_id);
  END IF;
END $$;

-- updated_at trigger for connection_share_tokens
DROP TRIGGER IF EXISTS update_connection_share_tokens_updated_at ON public.connection_share_tokens;
CREATE TRIGGER update_connection_share_tokens_updated_at
  BEFORE UPDATE ON public.connection_share_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 2. search_discoverable_users RPC
CREATE OR REPLACE FUNCTION public.search_discoverable_users(
  p_query text,
  p_limit integer DEFAULT 10
)
RETURNS TABLE (
  user_id uuid,
  display_name text,
  discovery_avatar_url text,
  match_type text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH normalized_input AS (
    SELECT
      NULLIF(BTRIM(COALESCE(p_query, '')), '') AS raw_query,
      NULLIF(regexp_replace(BTRIM(COALESCE(p_query, '')), '\D', '', 'g'), '') AS phone_query
  )
  SELECT
    p.user_id,
    COALESCE(NULLIF(BTRIM(p.display_name), ''), 'User') AS display_name,
    CASE
      WHEN COALESCE(uds.share_avatar_in_discovery, false) THEN p.avatar_url
      ELSE NULL
    END AS discovery_avatar_url,
    CASE
      WHEN COALESCE(uds.allow_phone_discovery, false)
        AND ni.phone_query IS NOT NULL
        AND udc.phone_search_normalized = ni.phone_query
      THEN 'phone'
      ELSE 'name'
    END AS match_type
  FROM public.profiles p
  CROSS JOIN normalized_input ni
  LEFT JOIN public.user_discovery_settings uds
    ON uds.user_id = p.user_id
  LEFT JOIN public.user_discovery_contacts udc
    ON udc.user_id = p.user_id
  WHERE (
      (
        COALESCE(uds.allow_name_discovery, true)
        AND ni.raw_query IS NOT NULL
        AND p.display_name ILIKE '%' || ni.raw_query || '%'
      )
      OR (
        COALESCE(uds.allow_phone_discovery, false)
        AND ni.phone_query IS NOT NULL
        AND udc.phone_search_normalized = ni.phone_query
      )
    )
    AND (auth.uid() IS NULL OR p.user_id <> auth.uid())
  ORDER BY
    CASE
      WHEN p.display_name ILIKE ni.raw_query THEN 0
      WHEN p.display_name ILIKE ni.raw_query || '%' THEN 1
      ELSE 2
    END,
    p.display_name ASC NULLS LAST
  LIMIT GREATEST(COALESCE(p_limit, 10), 1);
$$;

-- 3. create_connection_request RPC
CREATE OR REPLACE FUNCTION public.create_connection_request(
  p_target_user_id uuid
)
RETURNS TABLE (
  couple_id uuid,
  request_status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
  existing_couple public.couples%ROWTYPE;
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_target_user_id IS NULL THEN
    RAISE EXCEPTION 'Target user is required';
  END IF;
  IF viewer_user_id = p_target_user_id THEN
    RAISE EXCEPTION 'Cannot connect to yourself';
  END IF;

  SELECT *
  INTO existing_couple
  FROM public.couples c
  WHERE (
      (c.inviter_id = viewer_user_id AND c.invitee_id = p_target_user_id)
      OR
      (c.inviter_id = p_target_user_id AND c.invitee_id = viewer_user_id)
    )
  ORDER BY c.created_at DESC
  LIMIT 1;

  IF existing_couple.id IS NOT NULL THEN
    RETURN QUERY
    SELECT
      existing_couple.id,
      CASE
        WHEN existing_couple.status = 'accepted' THEN 'already_connected'
        ELSE 'pending_exists'
      END;
    RETURN;
  END IF;

  INSERT INTO public.couples (inviter_id, invitee_id, status)
  VALUES (viewer_user_id, p_target_user_id, 'pending')
  RETURNING id INTO couple_id;

  request_status := 'invite_sent';
  RETURN NEXT;
END;
$$;

-- 4. issue_connection_share_token RPC
CREATE OR REPLACE FUNCTION public.issue_connection_share_token(
  p_channel text DEFAULT 'qr',
  p_days_valid integer DEFAULT 30
)
RETURNS TABLE (
  token text,
  channel text,
  expires_at timestamptz
)
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

  INSERT INTO public.connection_share_tokens (owner_user_id, channel, expires_at)
  VALUES (
    viewer_user_id,
    COALESCE(NULLIF(BTRIM(p_channel), ''), 'qr'),
    now() + make_interval(days => GREATEST(COALESCE(p_days_valid, 30), 1))
  )
  RETURNING
    connection_share_tokens.token,
    connection_share_tokens.channel,
    connection_share_tokens.expires_at
  INTO token, channel, expires_at;

  RETURN NEXT;
END;
$$;

-- 5. create_connection_invite_from_token RPC
CREATE OR REPLACE FUNCTION public.create_connection_invite_from_token(
  p_token text
)
RETURNS TABLE (
  couple_id uuid,
  result text,
  inviter_id uuid,
  invitee_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_user_id uuid := auth.uid();
  viewer_email text;
  token_row public.connection_share_tokens%ROWTYPE;
  existing_couple public.couples%ROWTYPE;
BEGIN
  IF viewer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT * INTO token_row
  FROM public.connection_share_tokens cst
  WHERE cst.token = p_token AND cst.is_active = true AND cst.expires_at >= now()
  ORDER BY cst.created_at DESC LIMIT 1;

  IF token_row.id IS NULL THEN
    RAISE EXCEPTION 'Invalid or expired connection token';
  END IF;

  IF token_row.owner_user_id = viewer_user_id THEN
    RAISE EXCEPTION 'Cannot use your own connection token';
  END IF;

  SELECT email INTO viewer_email FROM auth.users WHERE id = viewer_user_id;

  SELECT * INTO existing_couple
  FROM public.couples c
  WHERE (
      (c.inviter_id = token_row.owner_user_id AND c.invitee_id = viewer_user_id)
      OR (c.inviter_id = viewer_user_id AND c.invitee_id = token_row.owner_user_id)
    )
  ORDER BY c.created_at DESC LIMIT 1;

  IF existing_couple.id IS NOT NULL THEN
    UPDATE public.connection_share_tokens SET used_count = used_count + 1 WHERE id = token_row.id;
    RETURN QUERY SELECT existing_couple.id,
      CASE WHEN existing_couple.status = 'accepted' THEN 'already_connected' ELSE 'pending_exists' END,
      existing_couple.inviter_id, existing_couple.invitee_id;
    RETURN;
  END IF;

  INSERT INTO public.couples (inviter_id, invitee_id, invitee_email, status)
  VALUES (token_row.owner_user_id, viewer_user_id, viewer_email, 'pending')
  RETURNING couples.id, couples.inviter_id, couples.invitee_id
  INTO couple_id, inviter_id, invitee_id;

  UPDATE public.connection_share_tokens SET used_count = used_count + 1 WHERE id = token_row.id;
  result := 'invite_sent';
  RETURN NEXT;
END;
$$;

-- 6. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
