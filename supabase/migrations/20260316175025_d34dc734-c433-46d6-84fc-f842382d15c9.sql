CREATE TABLE public.weekly_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  week_start DATE NOT NULL,
  products JSONB NOT NULL DEFAULT '[]'::jsonb,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT weekly_recommendations_user_week_unique UNIQUE (user_id, week_start)
);

ALTER TABLE public.weekly_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own weekly recommendations"
ON public.weekly_recommendations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own weekly recommendations"
ON public.weekly_recommendations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own weekly recommendations"
ON public.weekly_recommendations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own weekly recommendations"
ON public.weekly_recommendations
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX idx_weekly_recommendations_user_week_start
ON public.weekly_recommendations (user_id, week_start DESC);

CREATE TRIGGER update_weekly_recommendations_updated_at
BEFORE UPDATE ON public.weekly_recommendations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();