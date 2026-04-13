
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  date date NOT NULL,
  event_type text NOT NULL DEFAULT 'personal',
  source_type text NOT NULL DEFAULT 'self',
  connection_user_id uuid,
  is_all_day boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own calendar events" ON public.calendar_events;
CREATE POLICY "Users can view own calendar events"
ON public.calendar_events FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own calendar events" ON public.calendar_events;
CREATE POLICY "Users can insert own calendar events"
ON public.calendar_events FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own calendar events" ON public.calendar_events;
CREATE POLICY "Users can update own calendar events"
ON public.calendar_events FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own calendar events" ON public.calendar_events;
CREATE POLICY "Users can delete own calendar events"
ON public.calendar_events FOR DELETE
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_calendar_events_user_date ON public.calendar_events (user_id, date);
