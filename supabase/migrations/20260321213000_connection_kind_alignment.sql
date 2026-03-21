ALTER TABLE public.connection_context_preferences
  DROP CONSTRAINT IF EXISTS connection_context_preferences_connection_kind_check;

ALTER TABLE public.connection_context_preferences
  ADD CONSTRAINT connection_context_preferences_connection_kind_check
  CHECK (
    connection_kind IN (
      'significant_other',
      'wife',
      'husband',
      'girlfriend',
      'boyfriend',
      'parent',
      'family',
      'friend',
      'coworker',
      'custom'
    )
  );

CREATE OR REPLACE FUNCTION public.normalize_connection_kind(p_connection_kind text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE COALESCE(NULLIF(BTRIM(p_connection_kind), ''), 'custom')
    WHEN 'wife' THEN 'significant_other'
    WHEN 'husband' THEN 'significant_other'
    WHEN 'girlfriend' THEN 'significant_other'
    WHEN 'boyfriend' THEN 'significant_other'
    ELSE COALESCE(NULLIF(BTRIM(p_connection_kind), ''), 'custom')
  END;
$$;

CREATE OR REPLACE FUNCTION public.connection_kind_allows_occasion(
  p_connection_kind text,
  p_occasion_type text
)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN public.normalize_connection_kind(p_connection_kind) = 'significant_other' THEN
      COALESCE(p_occasion_type, '') IN (
        'birthday',
        'anniversary',
        'christmas',
        'valentines_day',
        'reminder',
        'custom'
      )
    WHEN public.normalize_connection_kind(p_connection_kind) IN ('parent', 'family', 'friend', 'coworker', 'custom') THEN
      COALESCE(p_occasion_type, '') IN (
        'birthday',
        'christmas',
        'reminder',
        'custom'
      )
    ELSE false
  END;
$$;
