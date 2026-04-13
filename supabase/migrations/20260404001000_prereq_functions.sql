-- Prerequisite functions patch: adds utility functions that were in legacy skipped
-- migrations (20260320150000–20260326234412) and are required by 20260405120000.
-- All use CREATE OR REPLACE so they are safe to run multiple times.

-- next_annual_occurrence: returns the next upcoming calendar date for an annual event
CREATE OR REPLACE FUNCTION public.next_annual_occurrence(p_original_date date)
RETURNS date LANGUAGE plpgsql STABLE SET search_path = public AS $$
DECLARE
  current_year integer;
  candidate date;
  month_part integer;
  day_part integer;
BEGIN
  IF p_original_date IS NULL THEN RETURN NULL; END IF;
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  month_part := EXTRACT(MONTH FROM p_original_date);
  day_part := EXTRACT(DAY FROM p_original_date);
  candidate := make_date(current_year, month_part,
    LEAST(day_part, EXTRACT(DAY FROM (date_trunc('month', make_date(current_year, month_part, 1)) + interval '1 month - 1 day'))::int)
  );
  IF candidate < CURRENT_DATE THEN
    candidate := make_date(current_year+1, month_part,
      LEAST(day_part, EXTRACT(DAY FROM (date_trunc('month', make_date(current_year+1, month_part, 1)) + interval '1 month - 1 day'))::int)
    );
  END IF;
  RETURN candidate;
END;
$$;

-- get_connection_upcoming_occasions: modernized with user_connections (was `couples`)
-- Called by get_connection_relevant_occasions defined in 20260405120000.
CREATE OR REPLACE FUNCTION public.get_connection_upcoming_occasions(
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
  conn_profile AS (
    SELECT p.birthday, p.anniversary
    FROM public.profiles p
    WHERE p.user_id = p_connection_user_id
  ),
  profile_occasions AS (
    SELECT
      'birthday'::text AS occasion_type,
      'Birthday'::text AS occasion_label,
      public.next_annual_occurrence(cp.birthday::date) AS occasion_date,
      'shared_profile'::text AS source_type,
      jsonb_build_object('field_key', 'birthday') AS metadata
    FROM conn_profile cp
    WHERE cp.birthday IS NOT NULL

    UNION ALL

    SELECT
      'anniversary'::text AS occasion_type,
      'Anniversary'::text AS occasion_label,
      public.next_annual_occurrence(cp.anniversary::date) AS occasion_date,
      'shared_profile'::text AS source_type,
      jsonb_build_object('field_key', 'anniversary') AS metadata
    FROM conn_profile cp
    WHERE cp.anniversary IS NOT NULL
  ),
  calendar_occasions AS (
    SELECT
      ce.event_type AS occasion_type,
      ce.title AS occasion_label,
      ce.date AS occasion_date,
      'calendar'::text AS source_type,
      jsonb_build_object(
        'event_id', ce.id,
        'description', ce.description,
        'source_type', ce.source_type
      ) AS metadata
    FROM public.calendar_events ce
    JOIN viewer v ON v.viewer_user_id = ce.user_id
    WHERE ce.connection_user_id = p_connection_user_id
      AND ce.date >= CURRENT_DATE
      AND ce.date <= CURRENT_DATE + GREATEST(p_days_ahead, 1)
  )
  SELECT
    o.occasion_type,
    o.occasion_label,
    o.occasion_date,
    o.source_type,
    o.metadata
  FROM (
    SELECT * FROM profile_occasions
    UNION ALL
    SELECT * FROM calendar_occasions
  ) o
  WHERE o.occasion_date IS NOT NULL
    AND o.occasion_date <= CURRENT_DATE + GREATEST(p_days_ahead, 1)
  ORDER BY o.occasion_date ASC, o.occasion_label ASC;
$$;

-- normalize_connection_kind: maps legacy/slang names to canonical kinds
CREATE OR REPLACE FUNCTION public.normalize_connection_kind(p_connection_kind text)
RETURNS text LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT CASE COALESCE(NULLIF(BTRIM(p_connection_kind), ''), 'custom')
    WHEN 'wife' THEN 'significant_other'
    WHEN 'husband' THEN 'significant_other'
    WHEN 'girlfriend' THEN 'significant_other'
    WHEN 'boyfriend' THEN 'significant_other'
    ELSE COALESCE(NULLIF(BTRIM(p_connection_kind), ''), 'custom')
  END;
$$;

-- next_holiday_occurrence: returns the next calendar date for a fixed holiday
CREATE OR REPLACE FUNCTION public.next_holiday_occurrence(p_month integer, p_day integer)
RETURNS date LANGUAGE plpgsql STABLE SET search_path = public AS $$
DECLARE
  current_year integer;
  candidate date;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  candidate := make_date(current_year, p_month, p_day);
  IF candidate < CURRENT_DATE THEN
    candidate := make_date(current_year + 1, p_month, p_day);
  END IF;
  RETURN candidate;
END;
$$;

-- connection_kind_allows_occasion: returns true if a connection kind should show a given occasion
CREATE OR REPLACE FUNCTION public.connection_kind_allows_occasion(p_connection_kind text, p_occasion_type text)
RETURNS boolean LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT CASE
    WHEN public.normalize_connection_kind(p_connection_kind) = 'significant_other'
      THEN COALESCE(p_occasion_type, '') IN ('birthday', 'anniversary', 'christmas', 'valentines_day', 'reminder', 'custom')
    WHEN public.normalize_connection_kind(p_connection_kind) IN ('parent', 'family', 'friend', 'coworker', 'custom')
      THEN COALESCE(p_occasion_type, '') IN ('birthday', 'christmas', 'reminder', 'custom')
    ELSE false
  END;
$$;
