CREATE TABLE public.ai_generated_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quizzes JSONB NOT NULL DEFAULT '[]'::jsonb,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.ai_generated_quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own quizzes"
  ON public.ai_generated_quizzes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quizzes"
  ON public.ai_generated_quizzes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quizzes"
  ON public.ai_generated_quizzes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);