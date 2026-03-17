-- First-party relationship calendar events created inside Go Two
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  connection_user_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'personal',
  source_type TEXT NOT NULL DEFAULT 'self',
  is_all_day BOOLEAN NOT NULL DEFAULT true,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT calendar_events_event_type_check CHECK (event_type IN ('personal', 'birthday', 'anniversary', 'reminder', 'custom')),
  CONSTRAINT calendar_events_source_type_check CHECK (source_type IN ('self', 'connection'))
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calendar events"
ON public.calendar_events
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calendar events"
ON public.calendar_events
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calendar events"
ON public.calendar_events
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own calendar events"
ON public.calendar_events
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_calendar_events_user_date
ON public.calendar_events(user_id, date);

CREATE INDEX IF NOT EXISTS idx_calendar_events_connection
ON public.calendar_events(connection_user_id);

CREATE TRIGGER update_calendar_events_updated_at
BEFORE UPDATE ON public.calendar_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
