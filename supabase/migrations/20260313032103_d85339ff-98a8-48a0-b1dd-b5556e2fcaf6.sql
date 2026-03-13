ALTER TABLE public.category_registry 
ADD COLUMN IF NOT EXISTS is_system boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS created_by uuid,
ADD COLUMN IF NOT EXISTS is_shared boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS shared_count integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS parent_key text,
ADD COLUMN IF NOT EXISTS level integer NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS fill_in_fields jsonb;