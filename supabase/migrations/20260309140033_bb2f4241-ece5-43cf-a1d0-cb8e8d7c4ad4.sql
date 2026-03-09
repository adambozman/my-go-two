
ALTER TABLE public.user_preferences 
ADD COLUMN IF NOT EXISTS profile_answers jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS ai_personalization jsonb DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.user_preferences.profile_answers IS 'Stores the 8 core profile questions (identity, style personality, daily vibe, etc.)';
COMMENT ON COLUMN public.user_preferences.ai_personalization IS 'AI-generated personalization data based on profile answers (recommended brands, image themes, etc.)';
