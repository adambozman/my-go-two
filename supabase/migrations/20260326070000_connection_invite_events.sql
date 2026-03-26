CREATE TABLE IF NOT EXISTS public.connection_invite_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL,
  invitee_user_id uuid NULL,
  token_id uuid NULL REFERENCES public.connection_share_tokens(id) ON DELETE SET NULL,
  couple_id uuid NULL REFERENCES public.couples(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  channel text NOT NULL DEFAULT 'link',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS connection_invite_events_owner_idx
  ON public.connection_invite_events(owner_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS connection_invite_events_event_type_idx
  ON public.connection_invite_events(event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS connection_invite_events_token_idx
  ON public.connection_invite_events(token_id, created_at DESC);

ALTER TABLE public.connection_invite_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'connection_invite_events'
      AND policyname = 'Users can view own connection invite events'
  ) THEN
    CREATE POLICY "Users can view own connection invite events"
    ON public.connection_invite_events
    FOR SELECT
    USING (auth.uid() = owner_user_id);
  END IF;
END $$;
