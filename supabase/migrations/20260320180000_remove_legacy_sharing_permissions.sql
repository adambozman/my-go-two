DROP POLICY IF EXISTS "Partners can view shared entries" ON public.card_entries;

CREATE POLICY "Connections can view explicitly shared entries"
ON public.card_entries
FOR SELECT
USING (
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1
    FROM public.shared_card_entries sce
    JOIN public.couples c
      ON c.id = sce.couple_id
    WHERE sce.card_entry_id = card_entries.id
      AND sce.owner_user_id = card_entries.user_id
      AND sce.connection_user_id = auth.uid()
      AND c.status = 'accepted'
      AND (
        (c.inviter_id = card_entries.user_id AND c.invitee_id = auth.uid())
        OR
        (c.invitee_id = card_entries.user_id AND c.inviter_id = auth.uid())
      )
  )
);

DROP FUNCTION IF EXISTS public.get_shared_categories(uuid, uuid);
DROP TRIGGER IF EXISTS on_couple_accepted_create_permissions ON public.couples;
DROP FUNCTION IF EXISTS public.auto_create_sharing_permissions();
DROP TABLE IF EXISTS public.sharing_permissions;
