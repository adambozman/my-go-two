DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'user_settings'
      AND column_name = 'partner_activity'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'user_settings'
      AND column_name = 'connection_activity'
  ) THEN
    ALTER TABLE public.user_settings RENAME COLUMN partner_activity TO connection_activity;
  END IF;
END $$;

-- Codebase classification: schema migration for runtime user settings naming.
