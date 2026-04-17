-- ============================================================
-- user_taste_signals: Per-user consolidated taste/signal bank
-- ============================================================
-- One row per unique signal per user. Strength increments on
-- repeated confirmation. Every AI function reads from this table.
-- Every interaction on the site writes to it.
--
-- signal_type: 'brand' | 'keyword' | 'style' | 'vibe' | 'category' | 'product'
-- signal_key: lowercase normalized tag, e.g. 'nike', 'minimalist', 'coffee'
-- polarity: 'positive' (they like it) or 'negative' (they rejected it)
-- strength: starts at 1, incremented each time the signal is reinforced
-- category: top-level category slug (clothes, dining, personal, etc.)
-- sources: array of source types that contributed this signal
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_taste_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_type text NOT NULL,        -- brand | keyword | style | vibe | category | product
  signal_key text NOT NULL,         -- lowercase normalized, e.g. 'nike', 'streetwear'
  polarity text NOT NULL DEFAULT 'positive',  -- positive | negative
  strength integer NOT NULL DEFAULT 1,
  category text,                    -- top-level: clothes, personal, dining, etc.
  sources text[] NOT NULL DEFAULT '{}'::text[],  -- ['this_or_that', 'onboarding', 'quiz', ...]
  last_source text,                 -- most recent source that contributed
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,   -- flexible extra data
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- One signal_key per type per polarity per category per user
  CONSTRAINT user_taste_signals_unique
    UNIQUE (user_id, signal_type, signal_key, polarity, category)
);

-- Indexes for fast reads by AI functions
CREATE INDEX IF NOT EXISTS idx_taste_signals_user_type
  ON public.user_taste_signals (user_id, signal_type, polarity);

CREATE INDEX IF NOT EXISTS idx_taste_signals_user_category
  ON public.user_taste_signals (user_id, category, polarity);

CREATE INDEX IF NOT EXISTS idx_taste_signals_key_lookup
  ON public.user_taste_signals (user_id, signal_key, polarity);

CREATE INDEX IF NOT EXISTS idx_taste_signals_strength
  ON public.user_taste_signals (user_id, strength DESC);

-- RLS: users can read/write only their own signals
ALTER TABLE public.user_taste_signals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their taste signals" ON public.user_taste_signals;
CREATE POLICY "Users manage their taste signals"
  ON public.user_taste_signals
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role needs full access for edge functions
DROP POLICY IF EXISTS "Service role full access to taste signals" ON public.user_taste_signals;
CREATE POLICY "Service role full access to taste signals"
  ON public.user_taste_signals
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Auto-update updated_at
DROP TRIGGER IF EXISTS update_user_taste_signals_updated_at ON public.user_taste_signals;
CREATE TRIGGER update_user_taste_signals_updated_at
BEFORE UPDATE ON public.user_taste_signals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- upsert_taste_signal: Idempotent signal writer
-- ============================================================
-- If the signal already exists, increment strength and append source.
-- If new, insert with strength 1.
-- ============================================================

CREATE OR REPLACE FUNCTION public.upsert_taste_signal(
  p_user_id uuid,
  p_signal_type text,
  p_signal_key text,
  p_polarity text DEFAULT 'positive',
  p_category text DEFAULT NULL,
  p_source text DEFAULT 'unknown',
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_taste_signals (
    user_id, signal_type, signal_key, polarity, category,
    strength, sources, last_source, metadata
  )
  VALUES (
    p_user_id,
    lower(trim(p_signal_type)),
    lower(trim(p_signal_key)),
    lower(trim(p_polarity)),
    CASE WHEN p_category IS NOT NULL THEN lower(trim(p_category)) ELSE NULL END,
    1,
    ARRAY[p_source],
    p_source,
    p_metadata
  )
  ON CONFLICT (user_id, signal_type, signal_key, polarity, category)
  DO UPDATE SET
    strength = public.user_taste_signals.strength + 1,
    sources = (
      SELECT array_agg(DISTINCT s)
      FROM unnest(public.user_taste_signals.sources || ARRAY[p_source]) AS s
    ),
    last_source = p_source,
    metadata = public.user_taste_signals.metadata || p_metadata,
    updated_at = now();
END;
$$;

-- ============================================================
-- get_user_taste_summary: Quick read for AI prompt building
-- ============================================================
-- Returns aggregated signals grouped by type for a given user.
-- Only returns signals with strength >= min_strength.
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_user_taste_summary(
  p_user_id uuid,
  p_min_strength integer DEFAULT 1
)
RETURNS TABLE (
  signal_type text,
  polarity text,
  signals jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    uts.signal_type,
    uts.polarity,
    jsonb_agg(
      jsonb_build_object(
        'key', uts.signal_key,
        'strength', uts.strength,
        'category', uts.category
      )
      ORDER BY uts.strength DESC
    ) AS signals
  FROM public.user_taste_signals uts
  WHERE uts.user_id = p_user_id
    AND uts.strength >= p_min_strength
  GROUP BY uts.signal_type, uts.polarity;
$$;

-- ============================================================
-- match_questions_to_user: Score shared bank questions by relevance
-- ============================================================
-- Joins question option tags against user taste signals to find
-- questions the user has signal for. Returns question IDs ordered
-- by relevance score (more matching tags = higher score).
-- ============================================================

CREATE OR REPLACE FUNCTION public.match_questions_to_user(
  p_user_id uuid,
  p_limit integer DEFAULT 20,
  p_exclude_keys text[] DEFAULT '{}'::text[]
)
RETURNS TABLE (
  question_id uuid,
  question_key text,
  relevance_score bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  WITH user_positive_tags AS (
    SELECT signal_key
    FROM public.user_taste_signals
    WHERE user_id = p_user_id
      AND polarity = 'positive'
      AND strength >= 1
  ),
  user_negative_tags AS (
    SELECT signal_key
    FROM public.user_taste_signals
    WHERE user_id = p_user_id
      AND polarity = 'negative'
      AND strength >= 2  -- only strong negatives filter out
  ),
  -- already answered by this user
  answered AS (
    SELECT question_key
    FROM public.this_or_that_v2_answers
    WHERE user_id = p_user_id
  ),
  scored AS (
    SELECT
      q.id AS question_id,
      q.question_key,
      -- Score: count how many option tags match positive signals
      (
        SELECT count(*)
        FROM public.this_or_that_v2_options o,
             unnest(o.signal_tags) AS tag
        WHERE o.question_id = q.id
          AND o.is_active = true
          AND tag IN (SELECT signal_key FROM user_positive_tags)
      ) AS pos_score,
      -- Penalty: count negative signal matches
      (
        SELECT count(*)
        FROM public.this_or_that_v2_options o,
             unnest(o.signal_tags) AS tag
        WHERE o.question_id = q.id
          AND o.is_active = true
          AND tag IN (SELECT signal_key FROM user_negative_tags)
      ) AS neg_score
    FROM public.this_or_that_v2_questions q
    WHERE q.is_active = true
      AND q.question_key NOT IN (SELECT question_key FROM answered)
      AND q.question_key != ALL(p_exclude_keys)
  )
  SELECT
    scored.question_id,
    scored.question_key,
    (scored.pos_score - scored.neg_score) AS relevance_score
  FROM scored
  WHERE scored.pos_score > 0  -- at least one positive tag match
  ORDER BY (scored.pos_score - scored.neg_score) DESC, random()
  LIMIT p_limit;
$$;
