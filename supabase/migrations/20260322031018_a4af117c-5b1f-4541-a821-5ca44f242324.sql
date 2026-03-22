
-- Stage 2: Base helper functions (no cross-dependencies)

CREATE OR REPLACE FUNCTION public.infer_card_entry_section(p_card_key text, p_group_name text, p_entry_name text)
RETURNS text LANGUAGE sql IMMUTABLE AS $$
  WITH normalized AS (SELECT lower(concat_ws(' ', coalesce(p_card_key,''), coalesce(p_group_name,''), coalesce(p_entry_name,''))) AS text_value)
  SELECT CASE
    WHEN text_value ~ '(food|drink|coffee|tea|taco|restaurant|snack|grocery|meal|milk|pizza|kitchen)' THEN 'food'
    WHEN text_value ~ '(wish|gift|favorite|favourite|save|saved|memory|anniversary|birthday|occasion)' THEN 'favorites'
    WHEN text_value ~ '(skin|makeup|hygiene|personal|tooth|shampoo|conditioner|pads|razor|soap|care)' THEN 'personal'
    WHEN text_value ~ '(style|fit|top|bottom|shoe|footwear|outfit|shirt|jacket|jean|dress|closet|size|brand|accessor)' THEN 'style'
    ELSE 'everyday'
  END FROM normalized;
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_profile_field(p_owner_user_id uuid, p_viewer_id uuid, p_field_key text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.shared_profile_fields spf JOIN public.couples c ON c.id = spf.couple_id
    WHERE spf.owner_user_id = p_owner_user_id AND spf.connection_user_id = p_viewer_id AND spf.field_key = p_field_key AND spf.is_shared = true AND c.status = 'accepted');
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_derived_feature(p_owner_user_id uuid, p_viewer_id uuid, p_feature_key text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.shared_derived_features sdf JOIN public.couples c ON c.id = sdf.couple_id
    WHERE sdf.owner_user_id = p_owner_user_id AND sdf.connection_user_id = p_viewer_id AND sdf.feature_key = p_feature_key AND sdf.is_shared = true AND c.status = 'accepted');
$$;

CREATE OR REPLACE FUNCTION public.connection_can_view_card_entry(p_card_entry_id uuid, p_viewer_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.shared_card_entries sce JOIN public.card_entries ce ON ce.id = sce.card_entry_id JOIN public.couples c ON c.id = sce.couple_id
    WHERE sce.card_entry_id = p_card_entry_id AND sce.connection_user_id = p_viewer_id AND c.status = 'accepted' AND ce.user_id = sce.owner_user_id);
$$;

CREATE OR REPLACE FUNCTION public.normalize_connection_kind(p_connection_kind text)
RETURNS text LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT CASE COALESCE(NULLIF(BTRIM(p_connection_kind), ''), 'custom')
    WHEN 'wife' THEN 'significant_other' WHEN 'husband' THEN 'significant_other' WHEN 'girlfriend' THEN 'significant_other' WHEN 'boyfriend' THEN 'significant_other'
    ELSE COALESCE(NULLIF(BTRIM(p_connection_kind), ''), 'custom') END;
$$;

CREATE OR REPLACE FUNCTION public.next_annual_occurrence(p_original_date date)
RETURNS date LANGUAGE plpgsql STABLE SET search_path = public AS $$
DECLARE current_year integer; candidate date; month_part integer; day_part integer;
BEGIN
  IF p_original_date IS NULL THEN RETURN NULL; END IF;
  current_year := EXTRACT(YEAR FROM CURRENT_DATE); month_part := EXTRACT(MONTH FROM p_original_date); day_part := EXTRACT(DAY FROM p_original_date);
  candidate := make_date(current_year, month_part, LEAST(day_part, EXTRACT(DAY FROM (date_trunc('month', make_date(current_year, month_part, 1)) + interval '1 month - 1 day'))::int));
  IF candidate < CURRENT_DATE THEN candidate := make_date(current_year+1, month_part, LEAST(day_part, EXTRACT(DAY FROM (date_trunc('month', make_date(current_year+1, month_part, 1)) + interval '1 month - 1 day'))::int)); END IF;
  RETURN candidate;
END;
$$;

CREATE OR REPLACE FUNCTION public.next_holiday_occurrence(p_month integer, p_day integer)
RETURNS date LANGUAGE plpgsql STABLE SET search_path = public AS $$
DECLARE current_year integer; candidate date;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  candidate := make_date(current_year, p_month, p_day);
  IF candidate < CURRENT_DATE THEN candidate := make_date(current_year+1, p_month, p_day); END IF;
  RETURN candidate;
END;
$$;

CREATE OR REPLACE FUNCTION public.connection_kind_allows_occasion(p_connection_kind text, p_occasion_type text)
RETURNS boolean LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT CASE
    WHEN public.normalize_connection_kind(p_connection_kind) = 'significant_other' THEN COALESCE(p_occasion_type,'') IN ('birthday','anniversary','christmas','valentines_day','reminder','custom')
    WHEN public.normalize_connection_kind(p_connection_kind) IN ('parent','family','friend','coworker','custom') THEN COALESCE(p_occasion_type,'') IN ('birthday','christmas','reminder','custom')
    ELSE false END;
$$;

-- Write RPCs
CREATE OR REPLACE FUNCTION public.set_connection_profile_field_share(p_couple_id uuid, p_connection_user_id uuid, p_field_key text, p_is_shared boolean)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF p_field_key NOT IN ('display_name','avatar_url','birthday','anniversary') THEN RAISE EXCEPTION 'Invalid field key'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.couples c WHERE c.id = p_couple_id AND ((c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id))) THEN RAISE EXCEPTION 'Connection not found'; END IF;
  INSERT INTO public.shared_profile_fields (couple_id, owner_user_id, connection_user_id, field_key, is_shared) VALUES (p_couple_id, viewer_user_id, p_connection_user_id, p_field_key, p_is_shared)
  ON CONFLICT (couple_id, owner_user_id, connection_user_id, field_key) DO UPDATE SET is_shared = EXCLUDED.is_shared, updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_derived_feature_share(p_couple_id uuid, p_connection_user_id uuid, p_feature_key text, p_is_shared boolean)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF p_feature_key NOT IN ('your_vibe','for_you_recommendations','ai_conversation_access') THEN RAISE EXCEPTION 'Invalid feature key'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.couples c WHERE c.id = p_couple_id AND ((c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id))) THEN RAISE EXCEPTION 'Connection not found'; END IF;
  INSERT INTO public.shared_derived_features (couple_id, owner_user_id, connection_user_id, feature_key, is_shared) VALUES (p_couple_id, viewer_user_id, p_connection_user_id, p_feature_key, p_is_shared)
  ON CONFLICT (couple_id, owner_user_id, connection_user_id, feature_key) DO UPDATE SET is_shared = EXCLUDED.is_shared, updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_card_share(p_couple_id uuid, p_connection_user_id uuid, p_card_entry_id uuid, p_is_shared boolean)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.couples c WHERE c.id = p_couple_id AND ((c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id))) THEN RAISE EXCEPTION 'Connection not found'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.card_entries ce WHERE ce.id = p_card_entry_id AND ce.user_id = viewer_user_id) THEN RAISE EXCEPTION 'Card entry not found'; END IF;
  IF p_is_shared THEN
    INSERT INTO public.shared_card_entries (couple_id, owner_user_id, connection_user_id, card_entry_id) VALUES (p_couple_id, viewer_user_id, p_connection_user_id, p_card_entry_id) ON CONFLICT DO NOTHING;
  ELSE
    DELETE FROM public.shared_card_entries WHERE couple_id = p_couple_id AND owner_user_id = viewer_user_id AND connection_user_id = p_connection_user_id AND card_entry_id = p_card_entry_id;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_connection_kind_preference(p_couple_id uuid, p_connection_user_id uuid, p_connection_kind text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE viewer_user_id uuid := auth.uid();
BEGIN
  IF viewer_user_id IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF p_connection_kind NOT IN ('significant_other','wife','husband','girlfriend','boyfriend','parent','family','friend','coworker','custom') THEN RAISE EXCEPTION 'Invalid connection kind'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.couples c WHERE c.id = p_couple_id AND ((c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id))) THEN RAISE EXCEPTION 'Connection not found'; END IF;
  INSERT INTO public.connection_context_preferences (couple_id, owner_user_id, connection_user_id, connection_kind) VALUES (p_couple_id, viewer_user_id, p_connection_user_id, p_connection_kind)
  ON CONFLICT (couple_id, owner_user_id, connection_user_id) DO UPDATE SET connection_kind = EXCLUDED.connection_kind, updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.share_all_card_entries_with_connection(p_couple_id uuid, p_owner_user_id uuid, p_connection_user_id uuid)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE inserted_count integer := 0;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_owner_user_id THEN RAISE EXCEPTION 'Only the owner can bulk share'; END IF;
  INSERT INTO public.shared_card_entries (couple_id, owner_user_id, connection_user_id, card_entry_id)
  SELECT p_couple_id, p_owner_user_id, p_connection_user_id, ce.id FROM public.card_entries ce WHERE ce.user_id = p_owner_user_id ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS inserted_count = ROW_COUNT; RETURN inserted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.unshare_all_card_entries_with_connection(p_couple_id uuid, p_owner_user_id uuid, p_connection_user_id uuid)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE deleted_count integer := 0;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_owner_user_id THEN RAISE EXCEPTION 'Only the owner can bulk unshare'; END IF;
  DELETE FROM public.shared_card_entries WHERE couple_id = p_couple_id AND owner_user_id = p_owner_user_id AND connection_user_id = p_connection_user_id;
  GET DIAGNOSTICS deleted_count = ROW_COUNT; RETURN deleted_count;
END;
$$;

-- Read RPCs (level 1 - no cross-function deps)
CREATE OR REPLACE FUNCTION public.get_connection_shared_profile(p_couple_id uuid, p_owner_user_id uuid, p_connection_user_id uuid)
RETURNS TABLE (display_name text, avatar_url text, birthday text, anniversary text) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH relation AS (SELECT c.id FROM public.couples c WHERE c.id = p_couple_id AND c.status = 'accepted'
    AND ((c.inviter_id = p_owner_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = p_owner_user_id AND c.inviter_id = p_connection_user_id)))
  SELECT
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'display_name') THEN p.display_name ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'avatar_url') THEN p.avatar_url ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'birthday') THEN p.birthday ELSE NULL END,
    CASE WHEN public.connection_can_view_profile_field(p_owner_user_id, p_connection_user_id, 'anniversary') THEN p.anniversary ELSE NULL END
  FROM public.profiles p JOIN relation r ON true WHERE p.user_id = p_owner_user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_visible_card_entries(p_couple_id uuid, p_owner_user_id uuid, p_connection_user_id uuid)
RETURNS TABLE (id uuid, user_id uuid, entry_name text, group_name text, card_key text, field_values jsonb, image_url text, updated_at timestamptz) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH relation AS (SELECT c.id FROM public.couples c WHERE c.id = p_couple_id AND c.status = 'accepted'
    AND ((c.inviter_id = p_owner_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = p_owner_user_id AND c.inviter_id = p_connection_user_id)))
  SELECT ce.id, ce.user_id, ce.entry_name, ce.group_name, ce.card_key, ce.field_values, ce.image_url, ce.updated_at
  FROM public.card_entries ce JOIN relation r ON true WHERE ce.user_id = p_owner_user_id
    AND EXISTS (SELECT 1 FROM public.shared_card_entries sce WHERE sce.couple_id = p_couple_id AND sce.owner_user_id = p_owner_user_id AND sce.connection_user_id = p_connection_user_id AND sce.card_entry_id = ce.id)
  ORDER BY ce.updated_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_vibe(p_couple_id uuid, p_owner_user_id uuid, p_connection_user_id uuid)
RETURNS TABLE (persona_summary text) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH relation AS (SELECT c.id FROM public.couples c WHERE c.id = p_couple_id AND c.status = 'accepted'
    AND ((c.inviter_id = p_owner_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = p_owner_user_id AND c.inviter_id = p_connection_user_id)))
  SELECT CASE WHEN public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'your_vibe') THEN up.ai_personalization ->> 'persona_summary' ELSE NULL END
  FROM public.user_preferences up JOIN relation r ON true WHERE up.user_id = p_owner_user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_shared_recommendations(p_couple_id uuid, p_owner_user_id uuid, p_connection_user_id uuid)
RETURNS TABLE (id uuid, week_start date, generated_at timestamptz, products jsonb) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH relation AS (SELECT c.id FROM public.couples c WHERE c.id = p_couple_id AND c.status = 'accepted'
    AND ((c.inviter_id = p_owner_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = p_owner_user_id AND c.inviter_id = p_connection_user_id)))
  SELECT wr.id, wr.week_start, wr.generated_at, wr.products FROM public.weekly_recommendations wr JOIN relation r ON true
  WHERE wr.user_id = p_owner_user_id AND public.connection_can_view_derived_feature(p_owner_user_id, p_connection_user_id, 'for_you_recommendations')
  ORDER BY wr.week_start DESC, wr.generated_at DESC LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_connection_outgoing_sharing_state(p_couple_id uuid, p_connection_user_id uuid)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE viewer_user_id uuid := auth.uid(); relation_exists boolean := false;
BEGIN
  IF viewer_user_id IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT EXISTS (SELECT 1 FROM public.couples c WHERE c.id = p_couple_id AND ((c.inviter_id = viewer_user_id AND c.invitee_id = p_connection_user_id) OR (c.invitee_id = viewer_user_id AND c.inviter_id = p_connection_user_id))) INTO relation_exists;
  IF NOT relation_exists THEN RAISE EXCEPTION 'Connection not found'; END IF;
  RETURN jsonb_build_object(
    'profile_fields', jsonb_build_object(
      'display_name', COALESCE((SELECT spf.is_shared FROM public.shared_profile_fields spf WHERE spf.couple_id = p_couple_id AND spf.owner_user_id = viewer_user_id AND spf.connection_user_id = p_connection_user_id AND spf.field_key = 'display_name' LIMIT 1), false),
      'avatar_url', COALESCE((SELECT spf.is_shared FROM public.shared_profile_fields spf WHERE spf.couple_id = p_couple_id AND spf.owner_user_id = viewer_user_id AND spf.connection_user_id = p_connection_user_id AND spf.field_key = 'avatar_url' LIMIT 1), false),
      'birthday', COALESCE((SELECT spf.is_shared FROM public.shared_profile_fields spf WHERE spf.couple_id = p_couple_id AND spf.owner_user_id = viewer_user_id AND spf.connection_user_id = p_connection_user_id AND spf.field_key = 'birthday' LIMIT 1), false),
      'anniversary', COALESCE((SELECT spf.is_shared FROM public.shared_profile_fields spf WHERE spf.couple_id = p_couple_id AND spf.owner_user_id = viewer_user_id AND spf.connection_user_id = p_connection_user_id AND spf.field_key = 'anniversary' LIMIT 1), false)),
    'derived_features', jsonb_build_object(
      'your_vibe', COALESCE((SELECT sdf.is_shared FROM public.shared_derived_features sdf WHERE sdf.couple_id = p_couple_id AND sdf.owner_user_id = viewer_user_id AND sdf.connection_user_id = p_connection_user_id AND sdf.feature_key = 'your_vibe' LIMIT 1), false),
      'for_you_recommendations', COALESCE((SELECT sdf.is_shared FROM public.shared_derived_features sdf WHERE sdf.couple_id = p_couple_id AND sdf.owner_user_id = viewer_user_id AND sdf.connection_user_id = p_connection_user_id AND sdf.feature_key = 'for_you_recommendations' LIMIT 1), false),
      'ai_conversation_access', COALESCE((SELECT sdf.is_shared FROM public.shared_derived_features sdf WHERE sdf.couple_id = p_couple_id AND sdf.owner_user_id = viewer_user_id AND sdf.connection_user_id = p_connection_user_id AND sdf.feature_key = 'ai_conversation_access' LIMIT 1), false)),
    'shared_card_entry_ids', COALESCE((SELECT jsonb_agg(sce.card_entry_id ORDER BY sce.created_at DESC) FROM public.shared_card_entries sce WHERE sce.couple_id = p_couple_id AND sce.owner_user_id = viewer_user_id AND sce.connection_user_id = p_connection_user_id), '[]'::jsonb),
    'connection_kind', COALESCE((SELECT ccp.connection_kind FROM public.connection_context_preferences ccp WHERE ccp.couple_id = p_couple_id AND ccp.owner_user_id = viewer_user_id AND ccp.connection_user_id = p_connection_user_id LIMIT 1), 'custom'));
END;
$$;

NOTIFY pgrst, 'reload schema';
