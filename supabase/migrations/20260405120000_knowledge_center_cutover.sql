ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamptz;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'card_entries'
      AND column_name = 'card_key'
  ) THEN
    ALTER TABLE public.card_entries RENAME COLUMN card_key TO product_card_key;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'card_entries'
      AND column_name = 'group_name'
  ) THEN
    ALTER TABLE public.card_entries RENAME COLUMN group_name TO subcategory_label;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'card_entries'
      AND column_name = 'entry_name'
  ) THEN
    ALTER TABLE public.card_entries RENAME COLUMN entry_name TO card_title;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'card_entries'
  ) THEN
    ALTER TABLE public.card_entries RENAME TO saved_product_cards;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'shared_card_entries'
      AND column_name = 'couple_id'
  ) THEN
    ALTER TABLE public.shared_card_entries RENAME COLUMN couple_id TO user_connection_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'shared_card_entries'
      AND column_name = 'card_entry_id'
  ) THEN
    ALTER TABLE public.shared_card_entries RENAME COLUMN card_entry_id TO saved_product_card_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_card_entries'
  ) THEN
    ALTER TABLE public.shared_card_entries RENAME TO shared_saved_product_cards;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'couples'
  ) THEN
    ALTER TABLE public.couples RENAME TO user_connections;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'connection_context_preferences'
      AND column_name = 'couple_id'
  ) THEN
    ALTER TABLE public.connection_context_preferences RENAME COLUMN couple_id TO user_connection_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'connection_context_preferences'
  ) THEN
    ALTER TABLE public.connection_context_preferences RENAME TO connection_access_settings;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'shared_profile_fields'
      AND column_name = 'couple_id'
  ) THEN
    ALTER TABLE public.shared_profile_fields RENAME COLUMN couple_id TO user_connection_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_profile_fields'
  ) THEN
    ALTER TABLE public.shared_profile_fields RENAME TO shared_connection_profile_fields;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'shared_derived_features'
      AND column_name = 'couple_id'
  ) THEN
    ALTER TABLE public.shared_derived_features RENAME COLUMN couple_id TO user_connection_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'shared_derived_features'
  ) THEN
    ALTER TABLE public.shared_derived_features RENAME TO shared_connection_derivations;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.onboarding_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  response_value jsonb NOT NULL DEFAULT 'null'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);

CREATE TABLE IF NOT EXISTS public.know_me_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  response_value jsonb NOT NULL DEFAULT 'null'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);

CREATE TABLE IF NOT EXISTS public.knowledge_derivations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  derivation_key text NOT NULL,
  derivation_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_snapshot jsonb NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, derivation_key)
);

CREATE INDEX IF NOT EXISTS onboarding_responses_user_id_idx
  ON public.onboarding_responses (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS know_me_responses_user_id_idx
  ON public.know_me_responses (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS knowledge_derivations_user_id_idx
  ON public.knowledge_derivations (user_id, updated_at DESC);

ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.know_me_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_derivations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their onboarding responses" ON public.onboarding_responses;
CREATE POLICY "Users manage their onboarding responses"
  ON public.onboarding_responses
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their Know Me responses" ON public.know_me_responses;
CREATE POLICY "Users manage their Know Me responses"
  ON public.know_me_responses
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their knowledge derivations" ON public.knowledge_derivations;
CREATE POLICY "Users manage their knowledge derivations"
  ON public.knowledge_derivations
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

WITH onboarding_keys AS (
  SELECT unnest(ARRAY[
    'identity',
    'birthday',
    'anniversary',
    'style-personality',
    'daily-vibe',
    'spending-mindset',
    'purchase-values',
    'free-time',
    'gift-preference',
    'aesthetic-lean'
  ]) AS question_key
),
legacy_answers AS (
  SELECT
    up.user_id,
    key AS question_key,
    value AS response_value,
    COALESCE(up.updated_at, now()) AS recorded_at
  FROM public.user_preferences up
  CROSS JOIN LATERAL jsonb_each(COALESCE(to_jsonb(up.profile_answers), '{}'::jsonb)) AS answer(key, value)
)
INSERT INTO public.onboarding_responses (user_id, question_key, response_value, created_at, updated_at)
SELECT
  la.user_id,
  la.question_key,
  la.response_value,
  la.recorded_at,
  la.recorded_at
FROM legacy_answers la
JOIN onboarding_keys ok
  ON ok.question_key = la.question_key
ON CONFLICT (user_id, question_key) DO UPDATE
SET
  response_value = EXCLUDED.response_value,
  updated_at = EXCLUDED.updated_at;

WITH onboarding_keys AS (
  SELECT unnest(ARRAY[
    'identity',
    'birthday',
    'anniversary',
    'style-personality',
    'daily-vibe',
    'spending-mindset',
    'purchase-values',
    'free-time',
    'gift-preference',
    'aesthetic-lean'
  ]) AS question_key
),
legacy_answers AS (
  SELECT
    up.user_id,
    key AS question_key,
    value AS response_value,
    COALESCE(up.updated_at, now()) AS recorded_at
  FROM public.user_preferences up
  CROSS JOIN LATERAL jsonb_each(COALESCE(to_jsonb(up.profile_answers), '{}'::jsonb)) AS answer(key, value)
)
INSERT INTO public.know_me_responses (user_id, question_key, response_value, created_at, updated_at)
SELECT
  la.user_id,
  la.question_key,
  la.response_value,
  la.recorded_at,
  la.recorded_at
FROM legacy_answers la
LEFT JOIN onboarding_keys ok
  ON ok.question_key = la.question_key
WHERE ok.question_key IS NULL
ON CONFLICT (user_id, question_key) DO UPDATE
SET
  response_value = EXCLUDED.response_value,
  updated_at = EXCLUDED.updated_at;

INSERT INTO public.knowledge_derivations (
  user_id,
  derivation_key,
  derivation_payload,
  created_at,
  updated_at
)
SELECT
  up.user_id,
  'your_vibe',
  COALESCE(to_jsonb(up.ai_personalization), '{}'::jsonb),
  COALESCE(up.created_at, now()),
  COALESCE(up.updated_at, now())
FROM public.user_preferences up
WHERE up.ai_personalization IS NOT NULL
ON CONFLICT (user_id, derivation_key) DO UPDATE
SET
  derivation_payload = EXCLUDED.derivation_payload,
  updated_at = EXCLUDED.updated_at;

UPDATE public.profiles p
SET onboarding_completed_at = COALESCE(p.onboarding_completed_at, up.updated_at, now())
FROM public.user_preferences up
WHERE up.user_id = p.user_id
  AND COALESCE(up.onboarding_complete, false) = true
  AND p.onboarding_completed_at IS NULL;

CREATE OR REPLACE VIEW public.user_knowledge_derivations AS
SELECT
  kd.id,
  kd.user_id,
  kd.derivation_key,
  kd.derivation_payload,
  kd.source_snapshot,
  kd.created_at,
  kd.updated_at
FROM public.knowledge_derivations kd;

CREATE OR REPLACE VIEW public.user_knowledge_facts AS
WITH connection_members AS (
  SELECT
    uc.inviter_id AS user_id,
    'owner'::text AS membership_role,
    jsonb_build_object(
      'user_connection_id', uc.id,
      'connection_user_id', uc.invitee_id,
      'invitee_email', uc.invitee_email,
      'display_label', uc.display_label,
      'status', uc.status,
      'photo_url', uc.photo_url
    ) AS fact_value,
    uc.updated_at AS recorded_at
  FROM public.user_connections uc
  UNION ALL
  SELECT
    uc.invitee_id AS user_id,
    'connection'::text AS membership_role,
    jsonb_build_object(
      'user_connection_id', uc.id,
      'connection_user_id', uc.inviter_id,
      'invitee_email', uc.invitee_email,
      'display_label', uc.display_label,
      'status', uc.status,
      'photo_url', uc.photo_url
    ) AS fact_value,
    uc.updated_at AS recorded_at
  FROM public.user_connections uc
  WHERE uc.invitee_id IS NOT NULL
)
SELECT
  p.user_id,
  'profile_core'::text AS fact_source,
  'profile_core'::text AS fact_key,
  jsonb_build_object(
    'display_name', p.display_name,
    'avatar_url', p.avatar_url,
    'gender', p.gender,
    'birthday', p.birthday,
    'anniversary', p.anniversary,
    'onboarding_completed_at', p.onboarding_completed_at
  ) AS fact_value,
  COALESCE(p.updated_at, now()) AS recorded_at
FROM public.profiles p
UNION ALL
SELECT
  orr.user_id,
  'onboarding'::text AS fact_source,
  orr.question_key AS fact_key,
  orr.response_value AS fact_value,
  orr.updated_at AS recorded_at
FROM public.onboarding_responses orr
UNION ALL
SELECT
  kmr.user_id,
  'know_me'::text AS fact_source,
  kmr.question_key AS fact_key,
  kmr.response_value AS fact_value,
  kmr.updated_at AS recorded_at
FROM public.know_me_responses kmr
UNION ALL
SELECT
  spc.user_id,
  'saved_product_card'::text AS fact_source,
  spc.product_card_key AS fact_key,
  jsonb_build_object(
    'id', spc.id,
    'product_card_key', spc.product_card_key,
    'subcategory_label', spc.subcategory_label,
    'card_title', spc.card_title,
    'field_values', spc.field_values,
    'image_url', spc.image_url,
    'updated_at', spc.updated_at
  ) AS fact_value,
  spc.updated_at AS recorded_at
FROM public.saved_product_cards spc
UNION ALL
SELECT
  cm.user_id,
  'connection'::text AS fact_source,
  cm.membership_role AS fact_key,
  cm.fact_value,
  cm.recorded_at
FROM connection_members cm;

CREATE OR REPLACE VIEW public.user_knowledge_snapshots AS
WITH all_users AS (
  SELECT user_id FROM public.profiles
  UNION
  SELECT user_id FROM public.onboarding_responses
  UNION
  SELECT user_id FROM public.know_me_responses
  UNION
  SELECT user_id FROM public.saved_product_cards
  UNION
  SELECT user_id FROM public.knowledge_derivations
  UNION
  SELECT inviter_id AS user_id FROM public.user_connections
  UNION
  SELECT invitee_id AS user_id FROM public.user_connections WHERE invitee_id IS NOT NULL
),
profile_core AS (
  SELECT
    p.user_id,
    jsonb_build_object(
      'display_name', p.display_name,
      'avatar_url', p.avatar_url,
      'gender', p.gender,
      'birthday', p.birthday,
      'anniversary', p.anniversary,
      'onboarding_completed_at', p.onboarding_completed_at
    ) AS profile_core,
    COALESCE(p.updated_at, now()) AS updated_at
  FROM public.profiles p
),
onboarding_data AS (
  SELECT
    user_id,
    COALESCE(jsonb_object_agg(question_key, response_value ORDER BY question_key), '{}'::jsonb) AS onboarding_responses,
    MAX(updated_at) AS updated_at
  FROM public.onboarding_responses
  GROUP BY user_id
),
know_me_data AS (
  SELECT
    user_id,
    COALESCE(jsonb_object_agg(question_key, response_value ORDER BY question_key), '{}'::jsonb) AS know_me_responses,
    MAX(updated_at) AS updated_at
  FROM public.know_me_responses
  GROUP BY user_id
),
saved_cards AS (
  SELECT
    user_id,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', id,
          'product_card_key', product_card_key,
          'subcategory_label', subcategory_label,
          'card_title', card_title,
          'field_values', field_values,
          'image_url', image_url,
          'created_at', created_at,
          'updated_at', updated_at
        )
        ORDER BY updated_at DESC
      ),
      '[]'::jsonb
    ) AS saved_product_cards,
    MAX(updated_at) AS updated_at
  FROM public.saved_product_cards
  GROUP BY user_id
),
connection_members AS (
  SELECT
    uc.inviter_id AS user_id,
    jsonb_build_object(
      'id', uc.id,
      'connection_user_id', uc.invitee_id,
      'invitee_email', uc.invitee_email,
      'display_label', uc.display_label,
      'photo_url', uc.photo_url,
      'status', uc.status,
      'role', 'owner',
      'updated_at', uc.updated_at
    ) AS connection_payload,
    uc.updated_at
  FROM public.user_connections uc
  UNION ALL
  SELECT
    uc.invitee_id AS user_id,
    jsonb_build_object(
      'id', uc.id,
      'connection_user_id', uc.inviter_id,
      'invitee_email', uc.invitee_email,
      'display_label', uc.display_label,
      'photo_url', uc.photo_url,
      'status', uc.status,
      'role', 'connection',
      'updated_at', uc.updated_at
    ) AS connection_payload,
    uc.updated_at
  FROM public.user_connections uc
  WHERE uc.invitee_id IS NOT NULL
),
connections AS (
  SELECT
    user_id,
    COALESCE(jsonb_agg(connection_payload ORDER BY updated_at DESC), '[]'::jsonb) AS user_connections,
    MAX(updated_at) AS updated_at
  FROM connection_members
  GROUP BY user_id
)
SELECT
  u.user_id,
  COALESCE(pc.profile_core, '{}'::jsonb) AS profile_core,
  COALESCE(od.onboarding_responses, '{}'::jsonb) AS onboarding_responses,
  COALESCE(km.know_me_responses, '{}'::jsonb) AS know_me_responses,
  COALESCE(sc.saved_product_cards, '[]'::jsonb) AS saved_product_cards,
  COALESCE(cn.user_connections, '[]'::jsonb) AS user_connections,
  jsonb_build_object(
    'profile_core', COALESCE(pc.profile_core, '{}'::jsonb),
    'onboarding_responses', COALESCE(od.onboarding_responses, '{}'::jsonb),
    'know_me_responses', COALESCE(km.know_me_responses, '{}'::jsonb),
    'saved_product_cards', COALESCE(sc.saved_product_cards, '[]'::jsonb),
    'user_connections', COALESCE(cn.user_connections, '[]'::jsonb)
  ) AS snapshot_payload,
  GREATEST(
    COALESCE(pc.updated_at, '-infinity'::timestamptz),
    COALESCE(od.updated_at, '-infinity'::timestamptz),
    COALESCE(km.updated_at, '-infinity'::timestamptz),
    COALESCE(sc.updated_at, '-infinity'::timestamptz),
    COALESCE(cn.updated_at, '-infinity'::timestamptz)
  ) AS updated_at
FROM all_users u
LEFT JOIN profile_core pc ON pc.user_id = u.user_id
LEFT JOIN onboarding_data od ON od.user_id = u.user_id
LEFT JOIN know_me_data km ON km.user_id = u.user_id
LEFT JOIN saved_cards sc ON sc.user_id = u.user_id
LEFT JOIN connections cn ON cn.user_id = u.user_id;

DROP FUNCTION IF EXISTS public.infer_card_entry_section(text, text, text);
DROP FUNCTION IF EXISTS public.connection_can_view_card_entry(uuid, uuid);
DROP FUNCTION IF EXISTS public.get_connection_visible_card_entries(uuid, uuid, uuid);
DROP FUNCTION IF EXISTS public.share_all_card_entries_with_connection(uuid, uuid, uuid);
DROP FUNCTION IF EXISTS public.unshare_all_card_entries_with_connection(uuid, uuid, uuid);
DROP FUNCTION IF EXISTS public.set_connection_card_share(uuid, uuid, uuid, boolean);

CREATE OR REPLACE FUNCTION public.infer_saved_product_card_section(
  p_product_card_key text,
  p_subcategory_label text,
  p_card_title text
)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  WITH normalized AS (
    SELECT lower(
      concat_ws(
        ' ',
        coalesce(p_product_card_key, ''),
        coalesce(p_subcategory_label, ''),
        coalesce(p_card_title, '')
      )
    ) AS text_value
  )
  SELECT CASE
    WHEN text_value ~ '(food|drink|coffee|tea|taco|restaurant|snack|grocery|meal|milk|pizza|kitchen)' THEN 'food'
    WHEN text_value ~ '(wish|gift|favorite|favourite|save|saved|memory|anniversary|birthday|occasion)' THEN 'favorites'
    WHEN text_value ~ '(skin|makeup|hygiene|personal|tooth|shampoo|conditioner|pads|razor|soap|care)' THEN 'personal'
    WHEN text_value ~ '(style|fit|top|bottom|shoe|footwear|outfit|shirt|jacket|jean|dress|closet|size|brand|accessor)' THEN 'style'
    ELSE 'everyday'
  END
  FROM normalized;
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_profile_field(
  p_owner_user_id uuid,
  p_viewer_id uuid,
  p_field_key text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_connection_profile_fields scpf
    JOIN public.user_connections uc
      ON uc.id = scpf.user_connection_id
    WHERE scpf.owner_user_id = p_owner_user_id
      AND scpf.connection_user_id = p_viewer_id
      AND scpf.field_key = p_field_key
      AND scpf.is_shared = true
      AND uc.status = 'accepted'
  );
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_derived_feature(
  p_owner_user_id uuid,
  p_viewer_id uuid,
  p_feature_key text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_connection_derivations scd
    JOIN public.user_connections uc
      ON uc.id = scd.user_connection_id
    WHERE scd.owner_user_id = p_owner_user_id
      AND scd.connection_user_id = p_viewer_id
      AND scd.feature_key = p_feature_key
      AND scd.is_shared = true
      AND uc.status = 'accepted'
  );
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_saved_product_card(
  p_saved_product_card_id uuid,
  p_viewer_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.shared_saved_product_cards sspc
    JOIN public.saved_product_cards spc
      ON spc.id = sspc.saved_product_card_id
    JOIN public.user_connections uc
      ON uc.id = sspc.user_connection_id
    WHERE sspc.saved_product_card_id = p_saved_product_card_id
      AND sspc.connection_user_id = p_viewer_id
      AND uc.status = 'accepted'
      AND spc.user_id = sspc.owner_user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.set_connection_profile_field_share(
  p_user_connection_id uuid,
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
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.shared_connection_profile_fields (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    field_key,
    is_shared
  )
  VALUES (
    p_user_connection_id,
    viewer_user_id,
    p_connection_user_id,
    p_field_key,
    p_is_shared
  )
  ON CONFLICT (user_connection_id, owner_user_id, connection_user_id, field_key) DO UPDATE
  SET
    is_shared = EXCLUDED.is_shared,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_derived_feature_share(
  p_user_connection_id uuid,
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
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.shared_connection_derivations (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    feature_key,
    is_shared
  )
  VALUES (
    p_user_connection_id,
    viewer_user_id,
    p_connection_user_id,
    p_feature_key,
    p_is_shared
  )
  ON CONFLICT (user_connection_id, owner_user_id, connection_user_id, feature_key) DO UPDATE
  SET
    is_shared = EXCLUDED.is_shared,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_kind_preference(
  p_user_connection_id uuid,
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
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  INSERT INTO public.connection_access_settings (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    connection_kind
  )
  VALUES (
    p_user_connection_id,
    viewer_user_id,
    p_connection_user_id,
    p_connection_kind
  )
  ON CONFLICT (user_connection_id, owner_user_id, connection_user_id) DO UPDATE
  SET
    connection_kind = EXCLUDED.connection_kind,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.share_saved_product_card_with_connection(
  p_user_connection_id uuid,
  p_connection_user_id uuid,
  p_saved_product_card_id uuid
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
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  ) THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.saved_product_cards spc
    WHERE spc.id = p_saved_product_card_id
      AND spc.user_id = viewer_user_id
  ) THEN
    RAISE EXCEPTION 'Saved product card not found';
  END IF;

  INSERT INTO public.shared_saved_product_cards (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    saved_product_card_id
  )
  VALUES (
    p_user_connection_id,
    viewer_user_id,
    p_connection_user_id,
    p_saved_product_card_id
  )
  ON CONFLICT DO NOTHING;
END;
$$;

CREATE OR REPLACE FUNCTION public.unshare_saved_product_card_with_connection(
  p_user_connection_id uuid,
  p_connection_user_id uuid,
  p_saved_product_card_id uuid
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

  DELETE FROM public.shared_saved_product_cards
  WHERE user_connection_id = p_user_connection_id
    AND owner_user_id = viewer_user_id
    AND connection_user_id = p_connection_user_id
    AND saved_product_card_id = p_saved_product_card_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.share_all_saved_product_cards_with_connection(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inserted_count integer := 0;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_owner_user_id THEN
    RAISE EXCEPTION 'Only the owner can bulk share';
  END IF;

  INSERT INTO public.shared_saved_product_cards (
    user_connection_id,
    owner_user_id,
    connection_user_id,
    saved_product_card_id
  )
  SELECT
    p_user_connection_id,
    p_owner_user_id,
    p_connection_user_id,
    spc.id
  FROM public.saved_product_cards spc
  WHERE spc.user_id = p_owner_user_id
  ON CONFLICT DO NOTHING;

  GET DIAGNOSTICS inserted_count = ROW_COUNT;
  RETURN inserted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.unshare_all_saved_product_cards_with_connection(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer := 0;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_owner_user_id THEN
    RAISE EXCEPTION 'Only the owner can bulk unshare';
  END IF;

  DELETE FROM public.shared_saved_product_cards
  WHERE user_connection_id = p_user_connection_id
    AND owner_user_id = p_owner_user_id
    AND connection_user_id = p_connection_user_id;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_profile(
  p_user_connection_id uuid,
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
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'display_name') THEN p.display_name ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'avatar_url') THEN p.avatar_url ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'birthday') THEN p.birthday ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'anniversary') THEN p.anniversary ELSE NULL END
  FROM public.profiles p
  JOIN relation r ON true
  WHERE p.user_id = p_owner_user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_visible_saved_product_cards(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  card_title text,
  subcategory_label text,
  product_card_key text,
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
    spc.id,
    spc.user_id,
    spc.card_title,
    spc.subcategory_label,
    spc.product_card_key,
    spc.field_values,
    spc.image_url,
    spc.updated_at
  FROM public.saved_product_cards spc
  JOIN relation r ON true
  WHERE spc.user_id = p_owner_user_id
    AND EXISTS (
      SELECT 1
      FROM public.shared_saved_product_cards sspc
      WHERE sspc.user_connection_id = p_user_connection_id
        AND sspc.owner_user_id = p_owner_user_id
        AND sspc.connection_user_id = p_connection_user_id
        AND sspc.saved_product_card_id = spc.id
    )
  ORDER BY spc.updated_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_vibe(
  p_user_connection_id uuid,
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
    CASE
      WHEN public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'your_vibe')
      THEN kd.derivation_payload ->> 'persona_summary'
      ELSE NULL
    END AS persona_summary
  FROM public.knowledge_derivations kd
  JOIN relation r ON true
  WHERE kd.user_id = p_owner_user_id
    AND kd.derivation_key = 'your_vibe';
$$;

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
  FROM public.weekly_recommendations wr
  JOIN relation r ON true
  WHERE wr.user_id = p_owner_user_id
    AND public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'for_you_recommendations')
  ORDER BY wr.week_start DESC, wr.generated_at DESC
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_outgoing_sharing_state(
  p_user_connection_id uuid,
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
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND (
        (uc.inviter_id = viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
  )
  INTO relation_exists;

  IF NOT relation_exists THEN
    RAISE EXCEPTION 'Connection not found';
  END IF;

  RETURN jsonb_build_object(
    'profile_fields', jsonb_build_object(
      'display_name', COALESCE((SELECT scpf.is_shared FROM public.shared_connection_profile_fields scpf WHERE scpf.user_connection_id = p_user_connection_id AND scpf.owner_user_id = viewer_user_id AND scpf.connection_user_id = p_connection_user_id AND scpf.field_key = 'display_name' LIMIT 1), false),
      'avatar_url', COALESCE((SELECT scpf.is_shared FROM public.shared_connection_profile_fields scpf WHERE scpf.user_connection_id = p_user_connection_id AND scpf.owner_user_id = viewer_user_id AND scpf.connection_user_id = p_connection_user_id AND scpf.field_key = 'avatar_url' LIMIT 1), false),
      'birthday', COALESCE((SELECT scpf.is_shared FROM public.shared_connection_profile_fields scpf WHERE scpf.user_connection_id = p_user_connection_id AND scpf.owner_user_id = viewer_user_id AND scpf.connection_user_id = p_connection_user_id AND scpf.field_key = 'birthday' LIMIT 1), false),
      'anniversary', COALESCE((SELECT scpf.is_shared FROM public.shared_connection_profile_fields scpf WHERE scpf.user_connection_id = p_user_connection_id AND scpf.owner_user_id = viewer_user_id AND scpf.connection_user_id = p_connection_user_id AND scpf.field_key = 'anniversary' LIMIT 1), false)
    ),
    'derived_features', jsonb_build_object(
      'your_vibe', COALESCE((SELECT scd.is_shared FROM public.shared_connection_derivations scd WHERE scd.user_connection_id = p_user_connection_id AND scd.owner_user_id = viewer_user_id AND scd.connection_user_id = p_connection_user_id AND scd.feature_key = 'your_vibe' LIMIT 1), false),
      'for_you_recommendations', COALESCE((SELECT scd.is_shared FROM public.shared_connection_derivations scd WHERE scd.user_connection_id = p_user_connection_id AND scd.owner_user_id = viewer_user_id AND scd.connection_user_id = p_connection_user_id AND scd.feature_key = 'for_you_recommendations' LIMIT 1), false),
      'ai_conversation_access', COALESCE((SELECT scd.is_shared FROM public.shared_connection_derivations scd WHERE scd.user_connection_id = p_user_connection_id AND scd.owner_user_id = viewer_user_id AND scd.connection_user_id = p_connection_user_id AND scd.feature_key = 'ai_conversation_access' LIMIT 1), false)
    ),
    'shared_saved_product_card_ids', COALESCE((SELECT jsonb_agg(sspc.saved_product_card_id ORDER BY sspc.created_at DESC) FROM public.shared_saved_product_cards sspc WHERE sspc.user_connection_id = p_user_connection_id AND sspc.owner_user_id = viewer_user_id AND sspc.connection_user_id = p_connection_user_id), '[]'::jsonb),
    'connection_kind', COALESCE((SELECT cas.connection_kind FROM public.connection_access_settings cas WHERE cas.user_connection_id = p_user_connection_id AND cas.owner_user_id = viewer_user_id AND cas.connection_user_id = p_connection_user_id LIMIT 1), 'custom')
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_relevant_occasions(
  p_connection_user_id uuid,
  p_days_ahead integer DEFAULT 120
)
RETURNS TABLE (
  occasion_type text,
  occasion_label text,
  occasion_date date,
  source_type text,
  metadata jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH viewer AS (
    SELECT auth.uid() AS viewer_user_id
  ),
  relation AS (
    SELECT uc.id AS user_connection_id
    FROM public.user_connections uc
    JOIN viewer v ON true
    WHERE uc.status = 'accepted'
      AND (
        (uc.inviter_id = v.viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = v.viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
    LIMIT 1
  ),
  context_pref AS (
    SELECT COALESCE(cas.connection_kind, 'custom') AS connection_kind
    FROM relation r
    LEFT JOIN public.connection_access_settings cas
      ON cas.user_connection_id = r.user_connection_id
     AND cas.owner_user_id = (SELECT viewer_user_id FROM viewer)
     AND cas.connection_user_id = p_connection_user_id
  ),
  base_occasions AS (
    SELECT
      o.occasion_type,
      o.occasion_label,
      o.occasion_date,
      o.source_type,
      o.metadata
    FROM public.get_connection_upcoming_occasions(p_connection_user_id, p_days_ahead) o
  ),
  holiday_occasions AS (
    SELECT
      'christmas'::text AS occasion_type,
      'Christmas'::text AS occasion_label,
      public.next_holiday_occurrence(12, 25) AS occasion_date,
      'holiday'::text AS source_type,
      jsonb_build_object('scope', 'global') AS metadata
    UNION ALL
    SELECT
      'valentines_day'::text AS occasion_type,
      'Valentine''s Day'::text AS occasion_label,
      public.next_holiday_occurrence(2, 14) AS occasion_date,
      'holiday'::text AS source_type,
      jsonb_build_object('scope', 'global') AS metadata
  ),
  combined AS (
    SELECT * FROM base_occasions
    UNION ALL
    SELECT * FROM holiday_occasions
  )
  SELECT
    c.occasion_type,
    c.occasion_label,
    c.occasion_date,
    c.source_type,
    c.metadata
  FROM combined c
  CROSS JOIN context_pref cp
  WHERE c.occasion_date >= CURRENT_DATE
    AND c.occasion_date <= CURRENT_DATE + GREATEST(p_days_ahead, 1)
    AND public.connection_kind_allows_occasion(cp.connection_kind, c.occasion_type)
  ORDER BY c.occasion_date ASC, c.occasion_label ASC;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_feed(
  p_limit integer DEFAULT 40,
  p_user_connection_id uuid DEFAULT NULL
)
RETURNS TABLE (
  feed_item_id text,
  user_connection_id uuid,
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
  WITH viewer AS (
    SELECT auth.uid() AS viewer_user_id
  ),
  relations AS (
    SELECT
      uc.id AS user_connection_id,
      CASE
        WHEN uc.inviter_id = v.viewer_user_id THEN uc.invitee_id
        ELSE uc.inviter_id
      END AS connection_user_id,
      COALESCE(
        uc.display_label,
        sp.display_name,
        'Connection'
      ) AS connection_label,
      COALESCE(cas.feed_enabled, true) AS feed_enabled,
      COALESCE(cas.occasion_tracking_enabled, true) AS occasion_tracking_enabled
    FROM public.user_connections uc
    JOIN viewer v ON true
    LEFT JOIN public.connection_access_settings cas
      ON cas.user_connection_id = uc.id
     AND cas.owner_user_id = v.viewer_user_id
     AND cas.connection_user_id = CASE
        WHEN uc.inviter_id = v.viewer_user_id THEN uc.invitee_id
        ELSE uc.inviter_id
      END
    LEFT JOIN LATERAL public.get_connection_shared_profile(
      uc.id,
      CASE
        WHEN uc.inviter_id = v.viewer_user_id THEN uc.invitee_id
        ELSE uc.inviter_id
      END,
      v.viewer_user_id
    ) sp ON true
    WHERE uc.status = 'accepted'
      AND (
        uc.inviter_id = v.viewer_user_id
        OR uc.invitee_id = v.viewer_user_id
      )
      AND (p_user_connection_id IS NULL OR uc.id = p_user_connection_id)
  ),
  card_events AS (
    SELECT
      'card:' || spc.id::text AS feed_item_id,
      r.user_connection_id,
      r.connection_user_id,
      r.connection_label,
      'saved_product_card_update'::text AS item_kind,
      spc.card_title AS title,
      spc.subcategory_label AS subtitle,
      'Shared a saved product card'::text AS body,
      spc.image_url,
      public.infer_saved_product_card_section(spc.product_card_key, spc.subcategory_label, spc.card_title) AS section,
      GREATEST(spc.updated_at, sspc.created_at) AS event_at,
      jsonb_build_object(
        'saved_product_card_id', spc.id,
        'product_card_key', spc.product_card_key,
        'subcategory_label', spc.subcategory_label
      ) AS meta
    FROM relations r
    JOIN viewer v ON true
    JOIN public.shared_saved_product_cards sspc
      ON sspc.user_connection_id = r.user_connection_id
     AND sspc.owner_user_id = r.connection_user_id
     AND sspc.connection_user_id = v.viewer_user_id
    JOIN public.saved_product_cards spc
      ON spc.id = sspc.saved_product_card_id
    WHERE r.feed_enabled
  ),
  profile_events AS (
    SELECT
      'profile:' || scpf.id::text AS feed_item_id,
      r.user_connection_id,
      r.connection_user_id,
      r.connection_label,
      'profile_signal'::text AS item_kind,
      CASE scpf.field_key
        WHEN 'display_name' THEN 'Shared display name'
        WHEN 'avatar_url' THEN 'Shared profile photo'
        WHEN 'birthday' THEN 'Shared birthday'
        WHEN 'anniversary' THEN 'Shared anniversary'
        ELSE 'Shared profile update'
      END AS title,
      r.connection_label AS subtitle,
      CASE scpf.field_key
        WHEN 'display_name' THEN COALESCE(p.display_name, 'Display name shared')
        WHEN 'avatar_url' THEN 'A profile photo is now visible to you'
        WHEN 'birthday' THEN 'Birthday is now available in your connection view'
        WHEN 'anniversary' THEN 'Anniversary is now available in your connection view'
        ELSE 'Shared profile access changed'
      END AS body,
      CASE
        WHEN scpf.field_key = 'avatar_url' THEN p.avatar_url
        ELSE NULL
      END AS image_url,
      'profile'::text AS section,
      GREATEST(scpf.updated_at, scpf.created_at) AS event_at,
      jsonb_build_object('field_key', scpf.field_key) AS meta
    FROM relations r
    JOIN viewer v ON true
    JOIN public.shared_connection_profile_fields scpf
      ON scpf.user_connection_id = r.user_connection_id
     AND scpf.owner_user_id = r.connection_user_id
     AND scpf.connection_user_id = v.viewer_user_id
     AND scpf.is_shared = true
    JOIN public.profiles p
      ON p.user_id = r.connection_user_id
    WHERE r.feed_enabled
  ),
  derived_events AS (
    SELECT
      'derived:' || scd.id::text AS feed_item_id,
      r.user_connection_id,
      r.connection_user_id,
      r.connection_label,
      'derived_signal'::text AS item_kind,
      CASE scd.feature_key
        WHEN 'your_vibe' THEN 'Shared Your Vibe'
        WHEN 'for_you_recommendations' THEN 'Shared recommendation signals'
        WHEN 'ai_conversation_access' THEN 'Opened AI conversation access'
        ELSE 'Shared derived feature'
      END AS title,
      r.connection_label AS subtitle,
      CASE scd.feature_key
        WHEN 'your_vibe' THEN COALESCE(sv.persona_summary, 'Your Vibe is now visible to you')
        WHEN 'for_you_recommendations' THEN 'Recommendation results are available in this connection'
        WHEN 'ai_conversation_access' THEN 'AI conversation access has been enabled for this connection'
        ELSE 'A derived connection feature changed'
      END AS body,
      NULL::text AS image_url,
      'derived'::text AS section,
      GREATEST(scd.updated_at, scd.created_at) AS event_at,
      jsonb_build_object(
        'feature_key', scd.feature_key,
        'has_vibe', CASE WHEN scd.feature_key = 'your_vibe' AND sv.persona_summary IS NOT NULL THEN true ELSE false END,
        'recommendation_count', CASE
          WHEN scd.feature_key = 'for_you_recommendations'
            THEN CASE
              WHEN jsonb_typeof(sr.products) = 'array' THEN jsonb_array_length(sr.products)
              ELSE 0
            END
          ELSE 0
        END
      ) AS meta
    FROM relations r
    JOIN viewer v ON true
    JOIN public.shared_connection_derivations scd
      ON scd.user_connection_id = r.user_connection_id
     AND scd.owner_user_id = r.connection_user_id
     AND scd.connection_user_id = v.viewer_user_id
     AND scd.is_shared = true
    LEFT JOIN LATERAL public.get_connection_shared_vibe(
      r.user_connection_id,
      r.connection_user_id,
      v.viewer_user_id
    ) sv ON scd.feature_key = 'your_vibe'
    LEFT JOIN LATERAL public.get_connection_shared_recommendations(
      r.user_connection_id,
      r.connection_user_id,
      v.viewer_user_id
    ) sr ON scd.feature_key = 'for_you_recommendations'
    WHERE r.feed_enabled
  ),
  occasion_events AS (
    SELECT
      'occasion:' || r.user_connection_id::text || ':' || o.occasion_type || ':' || o.occasion_date::text AS feed_item_id,
      r.user_connection_id,
      r.connection_user_id,
      r.connection_label,
      'occasion'::text AS item_kind,
      o.occasion_label AS title,
      r.connection_label AS subtitle,
      CASE o.source_type
        WHEN 'shared_profile' THEN 'Upcoming shared profile milestone'
        WHEN 'calendar' THEN 'Upcoming connection calendar event'
        WHEN 'holiday' THEN 'Upcoming relevant holiday'
        ELSE 'Upcoming occasion'
      END AS body,
      NULL::text AS image_url,
      'calendar'::text AS section,
      o.occasion_date::timestamptz AS event_at,
      jsonb_build_object(
        'occasion_type', o.occasion_type,
        'occasion_date', o.occasion_date,
        'source_type', o.source_type,
        'metadata', o.metadata
      ) AS meta
    FROM relations r
    CROSS JOIN LATERAL public.get_connection_relevant_occasions(r.connection_user_id, 120) o
    WHERE r.feed_enabled
      AND r.occasion_tracking_enabled
  )
  SELECT
    feed.feed_item_id,
    feed.user_connection_id,
    feed.connection_user_id,
    feed.connection_label,
    feed.item_kind,
    feed.title,
    feed.subtitle,
    feed.body,
    feed.image_url,
    feed.section,
    feed.event_at,
    feed.meta
  FROM (
    SELECT * FROM card_events
    UNION ALL
    SELECT * FROM profile_events
    UNION ALL
    SELECT * FROM derived_events
    UNION ALL
    SELECT * FROM occasion_events
  ) feed
  ORDER BY
    CASE WHEN feed.item_kind = 'occasion' THEN 0 ELSE 1 END,
    CASE WHEN feed.item_kind = 'occasion' THEN feed.event_at END ASC NULLS LAST,
    CASE WHEN feed.item_kind <> 'occasion' THEN feed.event_at END DESC NULLS LAST
  LIMIT GREATEST(COALESCE(p_limit, 40), 1);
$$;

NOTIFY pgrst, 'reload schema';
