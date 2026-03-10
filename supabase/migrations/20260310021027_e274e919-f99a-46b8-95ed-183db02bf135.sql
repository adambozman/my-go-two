ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS birthday date,
  ADD COLUMN IF NOT EXISTS anniversary date;