
-- Allow users to delete their own connections
CREATE POLICY "Users can delete own couples"
ON public.couples
FOR DELETE
TO public
USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);

-- Add cascade delete for sharing_permissions when a couple is deleted
ALTER TABLE public.sharing_permissions
DROP CONSTRAINT IF EXISTS sharing_permissions_couple_id_fkey;

ALTER TABLE public.sharing_permissions
ADD CONSTRAINT sharing_permissions_couple_id_fkey
FOREIGN KEY (couple_id) REFERENCES public.couples(id) ON DELETE CASCADE;
