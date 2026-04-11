CREATE TABLE IF NOT EXISTS public.this_or_that_v2_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_key text NOT NULL UNIQUE,
  prompt text NOT NULL,
  category_key text NOT NULL,
  subgroup_key text,
  recommendation_category text,
  answer_type text NOT NULL DEFAULT 'this_or_that_v2',
  selection_mode text NOT NULL DEFAULT 'single',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  source_version text NOT NULL DEFAULT 'this_or_that_v2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.this_or_that_v2_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public.this_or_that_v2_questions(id) ON DELETE CASCADE,
  option_key text NOT NULL,
  option_label text NOT NULL,
  category_key text,
  subgroup_key text,
  recommendation_category text,
  entity_type text,
  entity_key text,
  entity_label text,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  brand text,
  location_keys text[] NOT NULL DEFAULT '{}'::text[],
  tags text[] NOT NULL DEFAULT '{}'::text[],
  signal_tags text[] NOT NULL DEFAULT '{}'::text[],
  preference_polarity text NOT NULL DEFAULT 'positive',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  source_version text NOT NULL DEFAULT 'this_or_that_v2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT this_or_that_v2_options_question_option_unique UNIQUE (question_id, option_key)
);

CREATE TABLE IF NOT EXISTS public.this_or_that_v2_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id uuid REFERENCES public.this_or_that_v2_questions(id) ON DELETE SET NULL,
  question_key text NOT NULL,
  selected_option_id uuid REFERENCES public.this_or_that_v2_options(id) ON DELETE SET NULL,
  selected_option_key text,
  rejected_option_id uuid REFERENCES public.this_or_that_v2_options(id) ON DELETE SET NULL,
  rejected_option_key text,
  category_key text,
  subgroup_key text,
  recommendation_category text,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  brand text,
  location_keys text[] NOT NULL DEFAULT '{}'::text[],
  answer_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  response_source text NOT NULL DEFAULT 'this_or_that_v2',
  source_version text NOT NULL DEFAULT 'this_or_that_v2',
  answered_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT this_or_that_v2_answers_user_question_unique UNIQUE (user_id, question_key)
);

CREATE TABLE IF NOT EXISTS public.this_or_that_v2_answer_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id uuid NOT NULL REFERENCES public.this_or_that_v2_answers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  signal_polarity text NOT NULL DEFAULT 'positive',
  signal_type text NOT NULL DEFAULT 'entity',
  category_key text,
  subgroup_key text,
  recommendation_category text,
  entity_type text,
  entity_key text,
  entity_label text,
  primary_keyword text,
  descriptor_keywords text[] NOT NULL DEFAULT '{}'::text[],
  brand text,
  location_keys text[] NOT NULL DEFAULT '{}'::text[],
  tags text[] NOT NULL DEFAULT '{}'::text[],
  notes text,
  source_version text NOT NULL DEFAULT 'this_or_that_v2',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_this_or_that_v2_questions_category
  ON public.this_or_that_v2_questions (category_key, subgroup_key, is_active, sort_order);

CREATE INDEX IF NOT EXISTS idx_this_or_that_v2_options_question
  ON public.this_or_that_v2_options (question_id, is_active, sort_order);

CREATE INDEX IF NOT EXISTS idx_this_or_that_v2_options_lookup
  ON public.this_or_that_v2_options (category_key, subgroup_key, entity_type, entity_key);

CREATE INDEX IF NOT EXISTS idx_this_or_that_v2_answers_user_answered
  ON public.this_or_that_v2_answers (user_id, answered_at DESC);

CREATE INDEX IF NOT EXISTS idx_this_or_that_v2_answers_user_category
  ON public.this_or_that_v2_answers (user_id, category_key, subgroup_key, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_this_or_that_v2_answers_payload
  ON public.this_or_that_v2_answers USING gin (answer_payload);

CREATE INDEX IF NOT EXISTS idx_this_or_that_v2_answer_signals_user_category
  ON public.this_or_that_v2_answer_signals (user_id, recommendation_category, signal_polarity);

CREATE INDEX IF NOT EXISTS idx_this_or_that_v2_answer_signals_lookup
  ON public.this_or_that_v2_answer_signals (user_id, primary_keyword, brand);

ALTER TABLE public.this_or_that_v2_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.this_or_that_v2_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.this_or_that_v2_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.this_or_that_v2_answer_signals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view This or That v2 questions" ON public.this_or_that_v2_questions;
CREATE POLICY "Authenticated users can view This or That v2 questions"
  ON public.this_or_that_v2_questions
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can view This or That v2 options" ON public.this_or_that_v2_options;
CREATE POLICY "Authenticated users can view This or That v2 options"
  ON public.this_or_that_v2_options
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users manage their This or That v2 structured answers" ON public.this_or_that_v2_answers;
CREATE POLICY "Users manage their This or That v2 structured answers"
  ON public.this_or_that_v2_answers
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their This or That v2 structured answer signals" ON public.this_or_that_v2_answer_signals;
CREATE POLICY "Users manage their This or That v2 structured answer signals"
  ON public.this_or_that_v2_answer_signals
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_this_or_that_v2_questions_updated_at ON public.this_or_that_v2_questions;
CREATE TRIGGER update_this_or_that_v2_questions_updated_at
BEFORE UPDATE ON public.this_or_that_v2_questions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_this_or_that_v2_options_updated_at ON public.this_or_that_v2_options;
CREATE TRIGGER update_this_or_that_v2_options_updated_at
BEFORE UPDATE ON public.this_or_that_v2_options
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_this_or_that_v2_answers_updated_at ON public.this_or_that_v2_answers;
CREATE TRIGGER update_this_or_that_v2_answers_updated_at
BEFORE UPDATE ON public.this_or_that_v2_answers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_this_or_that_v2_answer_signals_updated_at ON public.this_or_that_v2_answer_signals;
CREATE TRIGGER update_this_or_that_v2_answer_signals_updated_at
BEFORE UPDATE ON public.this_or_that_v2_answer_signals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

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
  SELECT user_id FROM public.this_or_that_v2_answers
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
this_or_that_v2_data AS (
  SELECT
    a.user_id,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', a.id,
          'question_id', a.question_id,
          'question_key', a.question_key,
          'selected_option_id', a.selected_option_id,
          'selected_option_key', a.selected_option_key,
          'rejected_option_id', a.rejected_option_id,
          'rejected_option_key', a.rejected_option_key,
          'category_key', a.category_key,
          'subgroup_key', a.subgroup_key,
          'recommendation_category', a.recommendation_category,
          'primary_keyword', a.primary_keyword,
          'descriptor_keywords', to_jsonb(a.descriptor_keywords),
          'brand', a.brand,
          'location_keys', to_jsonb(a.location_keys),
          'answer_payload', a.answer_payload,
          'response_source', a.response_source,
          'source_version', a.source_version,
          'answered_at', a.answered_at,
          'updated_at', a.updated_at
        )
        ORDER BY COALESCE(a.answered_at, a.updated_at, a.created_at) DESC
      ),
      '[]'::jsonb
    ) AS this_or_that_v2_answers,
    MAX(COALESCE(a.updated_at, a.answered_at, a.created_at)) AS updated_at
  FROM public.this_or_that_v2_answers a
  GROUP BY a.user_id
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
    'this_or_that_v2_answers', COALESCE(tv2.this_or_that_v2_answers, '[]'::jsonb),
    'user_connections', COALESCE(cn.user_connections, '[]'::jsonb)
  ) AS snapshot_payload,
  GREATEST(
    COALESCE(pc.updated_at, '-infinity'::timestamptz),
    COALESCE(od.updated_at, '-infinity'::timestamptz),
    COALESCE(km.updated_at, '-infinity'::timestamptz),
    COALESCE(sc.updated_at, '-infinity'::timestamptz),
    COALESCE(tv2.updated_at, '-infinity'::timestamptz),
    COALESCE(cn.updated_at, '-infinity'::timestamptz)
  ) AS updated_at
FROM all_users u
LEFT JOIN profile_core pc ON pc.user_id = u.user_id
LEFT JOIN onboarding_data od ON od.user_id = u.user_id
LEFT JOIN know_me_data km ON km.user_id = u.user_id
LEFT JOIN saved_cards sc ON sc.user_id = u.user_id
LEFT JOIN this_or_that_v2_data tv2 ON tv2.user_id = u.user_id
LEFT JOIN connections cn ON cn.user_id = u.user_id;
