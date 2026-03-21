-- Dynamic read-only data quality checks.
-- Outputs rows with issue_type, severity, table_name, column_name, details, count_value.
-- Fails (exit code 1) only when severity='fail'.
DO
$$
DECLARE
  rec record;
BEGIN
  CREATE TEMP TABLE dq_results (
    issue_type text,
    severity text,
    table_name text,
    column_name text,
    details text,
    count_value bigint
  );

  -- 1) NOT NULL columns that currently contain NULLs
  FOR rec IN
    SELECT table_schema, table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND is_nullable = 'NO'
      AND column_default IS NULL -- ignore generated defaults (typically handled)
  LOOP
    EXECUTE format('SELECT count(*) FROM %I.%I WHERE %I IS NULL', rec.table_schema, rec.table_name, rec.column_name)
    INTO rec.count_value;
    IF rec.count_value > 0 THEN
      INSERT INTO dq_results VALUES ('null_violation', 'fail', rec.table_name, rec.column_name,
        'NOT NULL column contains NULLs', rec.count_value);
    END IF;
  END LOOP;

  -- 2) Orphan foreign keys: rows whose FK value has no matching parent
  FOR rec IN
    SELECT
      tc.table_name,
      kcu.column_name,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
    FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
  LOOP
    EXECUTE format(
      'SELECT count(*) FROM %I.%I child LEFT JOIN %I.%I parent ON child.%I = parent.%I WHERE child.%I IS NOT NULL AND parent.%I IS NULL',
      'public', rec.table_name, 'public', rec.foreign_table_name, rec.column_name, rec.foreign_column_name, rec.column_name, rec.foreign_column_name
    ) INTO rec.count_value;
    IF rec.count_value > 0 THEN
      INSERT INTO dq_results VALUES ('orphan_fk', 'fail', rec.table_name, rec.column_name,
        format('No parent in %s.%s', rec.foreign_table_name, rec.foreign_column_name), rec.count_value);
    END IF;
  END LOOP;

  -- 3) Stale updated_at columns: rows not touched in N days (default 90). Skip tables smaller than 10 rows.
  FOR rec IN
    SELECT table_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND column_name = 'updated_at'
  LOOP
    EXECUTE format('SELECT count(*) FROM %I.%I', 'public', rec.table_name) INTO rec.count_value;
    IF rec.count_value < 10 THEN
      CONTINUE;
    END IF;
    EXECUTE format(
      'SELECT count(*) FROM %I.%I WHERE updated_at < NOW() - (%L || '' days'')::interval',
      'public', rec.table_name, COALESCE(current_setting(''staleness.days'', true), '90')
    ) INTO rec.count_value;
    IF rec.count_value > 0 THEN
      INSERT INTO dq_results VALUES ('stale_rows', 'warn', rec.table_name, 'updated_at',
        format('Rows older than %s days', COALESCE(current_setting(''staleness.days'', true), '90')), rec.count_value);
    END IF;
  END LOOP;

  -- 4) Tables with zero rows (potentially missing data)
  FOR rec IN
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  LOOP
    EXECUTE format('SELECT count(*) FROM %I.%I', 'public', rec.table_name) INTO rec.count_value;
    IF rec.count_value = 0 THEN
      INSERT INTO dq_results VALUES ('empty_table', 'warn', rec.table_name, NULL, 'Table has zero rows', 0);
    END IF;
  END LOOP;

  -- Output
  RAISE NOTICE 'issue_type,severity,table_name,column_name,details,count_value';
  FOR rec IN SELECT * FROM dq_results LOOP
    RAISE NOTICE '%', format('%s,%s,%s,%s,%s,%s',
      rec.issue_type, rec.severity, rec.table_name, COALESCE(rec.column_name, ''),
      replace(rec.details, ',', ';'), rec.count_value);
  END LOOP;

  IF EXISTS (SELECT 1 FROM dq_results WHERE severity = 'fail') THEN
    RAISE EXCEPTION 'Failing data quality findings detected';
  END IF;
END;
$$;
