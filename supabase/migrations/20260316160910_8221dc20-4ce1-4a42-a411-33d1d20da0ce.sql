-- Calendar sync accounts for user-owned external providers
CREATE TABLE IF NOT EXISTS public.calendar_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  provider TEXT NOT NULL,
  provider_account_email TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  scope TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT calendar_accounts_provider_check CHECK (provider IN ('google')),
  CONSTRAINT calendar_accounts_user_provider_unique UNIQUE (user_id, provider)
);

ALTER TABLE public.calendar_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calendar accounts"
ON public.calendar_accounts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calendar accounts"
ON public.calendar_accounts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calendar accounts"
ON public.calendar_accounts
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own calendar accounts"
ON public.calendar_accounts
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER update_calendar_accounts_updated_at
BEFORE UPDATE ON public.calendar_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Synced external events cached for dashboard rendering and two-way sync
CREATE TABLE IF NOT EXISTS public.external_calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  calendar_account_id UUID NOT NULL REFERENCES public.calendar_accounts(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  external_event_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_all_day BOOLEAN NOT NULL DEFAULT false,
  source_calendar_id TEXT,
  source_calendar_name TEXT,
  sync_status TEXT NOT NULL DEFAULT 'synced',
  last_synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT external_calendar_events_provider_check CHECK (provider IN ('google')),
  CONSTRAINT external_calendar_events_sync_status_check CHECK (sync_status IN ('synced', 'pending_create', 'pending_update', 'pending_delete', 'error')),
  CONSTRAINT external_calendar_events_unique UNIQUE (calendar_account_id, external_event_id)
);

ALTER TABLE public.external_calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own external calendar events"
ON public.external_calendar_events
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own external calendar events"
ON public.external_calendar_events
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own external calendar events"
ON public.external_calendar_events
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own external calendar events"
ON public.external_calendar_events
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_external_calendar_events_user_starts_at
ON public.external_calendar_events(user_id, starts_at);

CREATE INDEX IF NOT EXISTS idx_external_calendar_events_account_sync_status
ON public.external_calendar_events(calendar_account_id, sync_status);

CREATE TRIGGER update_external_calendar_events_updated_at
BEFORE UPDATE ON public.external_calendar_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();