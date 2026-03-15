
CREATE TABLE public.card_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  card_key text NOT NULL,
  group_name text NOT NULL,
  entry_name text NOT NULL,
  field_values jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_card_entries_user_key ON public.card_entries(user_id, card_key);

ALTER TABLE public.card_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own entries" ON public.card_entries FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Partners can view entries" ON public.card_entries FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM couples
    WHERE couples.status = 'accepted'
      AND ((couples.inviter_id = card_entries.user_id AND couples.invitee_id = auth.uid())
        OR (couples.invitee_id = card_entries.user_id AND couples.inviter_id = auth.uid()))
  ));

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.card_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
