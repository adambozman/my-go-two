
CREATE TABLE public.quiz_question_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gender text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  generated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(gender)
);

ALTER TABLE public.quiz_question_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quiz sets" ON public.quiz_question_sets
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service can manage quiz sets" ON public.quiz_question_sets
  FOR ALL TO service_role USING (true) WITH CHECK (true);
