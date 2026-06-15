-- ============================================================
-- P0 security hardening — audit 2026-06-14
-- Authorization fixes for connection-read RPCs and taste-signal functions.
-- Idempotent. REVIEW and test on a Supabase preview branch before applying to prod.
-- ============================================================

-- 1) IDOR fix (audit H1): bind auth.uid() in the client-callable connection profile reader.
--    ConnectionPage.tsx calls this directly with p_connection_user_id = the caller, so the
--    gate below blocks any third party who is not a party to the connection.
CREATE OR REPLACE FUNCTION public.get_connection_shared_profile(
  p_user_connection_id uuid,
  p_owner_user_id uuid,
  p_connection_user_id uuid
)
RETURNS TABLE (
  display_name text,
  avatar_url text,
  birthday text,
  anniversary text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH relation AS (
    SELECT uc.id
    FROM public.user_connections uc
    WHERE uc.id = p_user_connection_id
      AND uc.status = 'accepted'
      AND auth.uid() IN (p_owner_user_id, p_connection_user_id)   -- P0 IDOR gate: caller must be a party
      AND (
        (uc.inviter_id = p_owner_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = p_owner_user_id AND uc.inviter_id = p_connection_user_id)
      )
  )
  SELECT
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'display_name') THEN p.display_name ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'avatar_url') THEN p.avatar_url ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'birthday') THEN p.birthday ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'anniversary') THEN p.anniversary ELSE NULL END
  FROM public.profiles p
  JOIN relation r ON true
  WHERE p.user_id = p_owner_user_id;
$$;

-- 2) IDOR fix (audit H1): revoke direct PostgREST access to the edge-only / internal readers.
--    These are invoked server-side (service_role) by edge functions, or internally by other
--    SECURITY DEFINER functions (which execute as the owner), so revoking from
--    PUBLIC/anon/authenticated closes direct RPC abuse without breaking any real caller.
REVOKE EXECUTE ON FUNCTION public.get_connection_visible_saved_product_cards(uuid, uuid, uuid) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.get_connection_visible_saved_product_cards(uuid, uuid, uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.connection_can_view_profile_field(uuid, uuid, text) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.connection_can_view_profile_field(uuid, uuid, text) TO service_role;

REVOKE EXECUTE ON FUNCTION public.connection_can_view_derived_feature(uuid, uuid, text) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.connection_can_view_derived_feature(uuid, uuid, text) TO service_role;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_connection_visible_card_entries') THEN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION public.get_connection_visible_card_entries(uuid, uuid, uuid) FROM PUBLIC, anon, authenticated';
    EXECUTE 'GRANT  EXECUTE ON FUNCTION public.get_connection_visible_card_entries(uuid, uuid, uuid) TO service_role';
  END IF;
END $$;

-- 3) Escalation fix (audit H2): pin search_path on the taste-signal SECURITY DEFINER funcs.
--    They are called only server-side with the service-role key, so no auth.uid() gate is
--    needed; the missing search_path was the actual privilege-escalation vector.
ALTER FUNCTION public.upsert_taste_signal(uuid, text, text, text, text, text, jsonb) SET search_path = public;
ALTER FUNCTION public.get_user_taste_summary(uuid, integer) SET search_path = public;
ALTER FUNCTION public.match_questions_to_user(uuid, integer, text[]) SET search_path = public;

-- 4) Storage buckets photo-bank / images-mygotwo-strip (audit H3) — intentionally NOT changed here.
--    They are written DIRECTLY by authenticated users (PhotoGallery.tsx) with non-per-user
--    paths, so naive folder-scoping or service-role-only writes would break uploads. The
--    correct fix routes writes through an authorized edge function (or admin gate) AND needs
--    an app change. Tracked separately — do NOT "fix" this with a naive storage policy.
