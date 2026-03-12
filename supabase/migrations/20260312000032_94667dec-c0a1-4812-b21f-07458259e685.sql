
-- Add unique constraint for couple_id + user_id so upsert works
ALTER TABLE public.sharing_permissions
ADD CONSTRAINT sharing_permissions_couple_user_unique UNIQUE (couple_id, user_id);
