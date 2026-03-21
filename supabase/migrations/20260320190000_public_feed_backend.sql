CREATE TABLE public.public_creator_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  creator_name text,
  creator_tag text,
  avatar_url text,
  bio text,
  is_public boolean NOT NULL DEFAULT false,
  access_tier text NOT NULL DEFAULT 'free' CHECK (
    access_tier IN ('free', 'premium', 'concierge')
  ),
  gate_key text NOT NULL DEFAULT 'public_creator_profile',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.public_creator_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view own public creator profile"
ON public.public_creator_profiles
FOR SELECT
USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Owners can insert own public creator profile"
ON public.public_creator_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owners can update own public creator profile"
ON public.public_creator_profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owners can delete own public creator profile"
ON public.public_creator_profiles
FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_public_creator_profiles_updated_at
  BEFORE UPDATE ON public.public_creator_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.public_creator_profiles;

CREATE TABLE public.public_creator_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  creator_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_tier text NOT NULL DEFAULT 'free' CHECK (
    access_tier IN ('free', 'premium', 'concierge')
  ),
  gate_key text NOT NULL DEFAULT 'public_follow',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (follower_user_id, creator_user_id),
  CHECK (follower_user_id <> creator_user_id)
);

ALTER TABLE public.public_creator_follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Followers can view own follows"
ON public.public_creator_follows
FOR SELECT
USING (auth.uid() = follower_user_id OR auth.uid() = creator_user_id);

CREATE POLICY "Followers can create own follows"
ON public.public_creator_follows
FOR INSERT
WITH CHECK (auth.uid() = follower_user_id);

CREATE POLICY "Followers can delete own follows"
ON public.public_creator_follows
FOR DELETE
USING (auth.uid() = follower_user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.public_creator_follows;

CREATE TABLE public.public_published_entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_kind text NOT NULL CHECK (entity_kind IN ('product', 'outfit')),
  title text NOT NULL,
  summary text,
  lead_image_url text,
  visibility text NOT NULL DEFAULT 'public' CHECK (visibility IN ('public')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  access_tier text NOT NULL DEFAULT 'free' CHECK (
    access_tier IN ('free', 'premium', 'concierge')
  ),
  gate_key text NOT NULL DEFAULT 'public_publish',
  popularity_score integer NOT NULL DEFAULT 0,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.public_published_entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view own published entities and public can view published ones"
ON public.public_published_entities
FOR SELECT
USING (
  auth.uid() = owner_user_id
  OR (visibility = 'public' AND status = 'published')
);

CREATE POLICY "Owners can insert own published entities"
ON public.public_published_entities
FOR INSERT
WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Owners can update own published entities"
ON public.public_published_entities
FOR UPDATE
USING (auth.uid() = owner_user_id)
WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Owners can delete own published entities"
ON public.public_published_entities
FOR DELETE
USING (auth.uid() = owner_user_id);

CREATE TRIGGER update_public_published_entities_updated_at
  BEFORE UPDATE ON public.public_published_entities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.public_published_entities;

CREATE TABLE public.public_published_entity_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  published_entity_id uuid NOT NULL REFERENCES public.public_published_entities(id) ON DELETE CASCADE,
  owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_entry_id uuid NOT NULL REFERENCES public.card_entries(id) ON DELETE CASCADE,
  role_key text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (published_entity_id, card_entry_id)
);

ALTER TABLE public.public_published_entity_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view own published entity cards and public can view public entity cards"
ON public.public_published_entity_cards
FOR SELECT
USING (
  auth.uid() = owner_user_id
  OR EXISTS (
    SELECT 1
    FROM public.public_published_entities ppe
    WHERE ppe.id = public_published_entity_cards.published_entity_id
      AND ppe.visibility = 'public'
      AND ppe.status = 'published'
  )
);

CREATE POLICY "Owners can insert own published entity cards"
ON public.public_published_entity_cards
FOR INSERT
WITH CHECK (
  auth.uid() = owner_user_id
  AND EXISTS (
    SELECT 1
    FROM public.public_published_entities ppe
    WHERE ppe.id = published_entity_id
      AND ppe.owner_user_id = owner_user_id
  )
  AND EXISTS (
    SELECT 1
    FROM public.card_entries ce
    WHERE ce.id = card_entry_id
      AND ce.user_id = owner_user_id
  )
);

CREATE POLICY "Owners can update own published entity cards"
ON public.public_published_entity_cards
FOR UPDATE
USING (auth.uid() = owner_user_id)
WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Owners can delete own published entity cards"
ON public.public_published_entity_cards
FOR DELETE
USING (auth.uid() = owner_user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.public_published_entity_cards;

CREATE TABLE public.public_entity_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  published_entity_id uuid NOT NULL REFERENCES public.public_published_entities(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type text NOT NULL CHECK (reaction_type IN ('like', 'love')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (published_entity_id, user_id, reaction_type)
);

ALTER TABLE public.public_entity_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public entity reactions"
ON public.public_entity_reactions
FOR SELECT
USING (true);

CREATE POLICY "Users can create own public entity reactions"
ON public.public_entity_reactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own public entity reactions"
ON public.public_entity_reactions
FOR DELETE
USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.public_entity_reactions;

CREATE OR REPLACE FUNCTION public.get_public_feed_items(
  p_limit integer DEFAULT 40,
  p_entity_kind text DEFAULT NULL,
  p_creator_user_id uuid DEFAULT NULL
)
RETURNS TABLE (
  published_entity_id uuid,
  entity_kind text,
  title text,
  summary text,
  lead_image_url text,
  owner_user_id uuid,
  creator_name text,
  creator_tag text,
  creator_avatar_url text,
  published_at timestamptz,
  card_count integer,
  like_count integer,
  love_count integer,
  viewer_liked boolean,
  viewer_loved boolean,
  viewer_follows boolean,
  meta jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH viewer AS (
    SELECT auth.uid() AS viewer_user_id
  ),
  filtered_entities AS (
    SELECT ppe.*
    FROM public.public_published_entities ppe
    WHERE ppe.visibility = 'public'
      AND ppe.status = 'published'
      AND (p_entity_kind IS NULL OR ppe.entity_kind = p_entity_kind)
      AND (p_creator_user_id IS NULL OR ppe.owner_user_id = p_creator_user_id)
  ),
  reaction_counts AS (
    SELECT
      per.published_entity_id,
      COUNT(*) FILTER (WHERE per.reaction_type = 'like')::integer AS like_count,
      COUNT(*) FILTER (WHERE per.reaction_type = 'love')::integer AS love_count
    FROM public.public_entity_reactions per
    GROUP BY per.published_entity_id
  ),
  card_counts AS (
    SELECT
      ppec.published_entity_id,
      COUNT(*)::integer AS card_count
    FROM public.public_published_entity_cards ppec
    GROUP BY ppec.published_entity_id
  )
  SELECT
    fe.id AS published_entity_id,
    fe.entity_kind,
    fe.title,
    fe.summary,
    fe.lead_image_url,
    fe.owner_user_id,
    COALESCE(pcp.creator_name, 'Creator') AS creator_name,
    pcp.creator_tag,
    pcp.avatar_url AS creator_avatar_url,
    fe.published_at,
    COALESCE(cc.card_count, 0) AS card_count,
    COALESCE(rc.like_count, 0) AS like_count,
    COALESCE(rc.love_count, 0) AS love_count,
    EXISTS (
      SELECT 1
      FROM public.public_entity_reactions per
      JOIN viewer v ON true
      WHERE per.published_entity_id = fe.id
        AND per.user_id = v.viewer_user_id
        AND per.reaction_type = 'like'
    ) AS viewer_liked,
    EXISTS (
      SELECT 1
      FROM public.public_entity_reactions per
      JOIN viewer v ON true
      WHERE per.published_entity_id = fe.id
        AND per.user_id = v.viewer_user_id
        AND per.reaction_type = 'love'
    ) AS viewer_loved,
    EXISTS (
      SELECT 1
      FROM public.public_creator_follows pcf
      JOIN viewer v ON true
      WHERE pcf.creator_user_id = fe.owner_user_id
        AND pcf.follower_user_id = v.viewer_user_id
    ) AS viewer_follows,
    jsonb_build_object(
      'visibility', fe.visibility,
      'status', fe.status,
      'access_tier', fe.access_tier,
      'gate_key', fe.gate_key,
      'popularity_score', fe.popularity_score
    ) AS meta
  FROM filtered_entities fe
  LEFT JOIN public.public_creator_profiles pcp
    ON pcp.user_id = fe.owner_user_id
  LEFT JOIN reaction_counts rc
    ON rc.published_entity_id = fe.id
  LEFT JOIN card_counts cc
    ON cc.published_entity_id = fe.id
  ORDER BY
    COALESCE(fe.published_at, fe.created_at) DESC,
    fe.popularity_score DESC,
    fe.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 40), 1);
$$;
