CREATE OR REPLACE FUNCTION public.sync_recommendation_normalized_state(
  p_user_id uuid,
  p_signals jsonb DEFAULT '[]'::jsonb,
  p_product_card_keywords jsonb DEFAULT '[]'::jsonb,
  p_like_signals jsonb DEFAULT '[]'::jsonb,
  p_dislike_signals jsonb DEFAULT '[]'::jsonb,
  p_this_or_that_signal_rows jsonb DEFAULT '[]'::jsonb,
  p_keyword_bank_rows jsonb DEFAULT '[]'::jsonb,
  p_brand_bank_rows jsonb DEFAULT '[]'::jsonb,
  p_brand_location_rows jsonb DEFAULT '[]'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.user_preference_signals WHERE user_id = p_user_id;
  DELETE FROM public.user_product_card_keywords WHERE user_id = p_user_id;
  DELETE FROM public.user_like_signals WHERE user_id = p_user_id;
  DELETE FROM public.user_dislike_signals WHERE user_id = p_user_id;
  DELETE FROM public.this_or_that_v2_answer_signals WHERE user_id = p_user_id;

  INSERT INTO public.user_preference_signals (
    user_id, signal_type, signal_key, signal_value, signal_source, signal_strength, is_negative, recorded_at
  )
  SELECT
    p_user_id, entry.signal_type, entry.signal_key, entry.signal_value, entry.signal_source,
    entry.signal_strength, entry.is_negative, entry.recorded_at
  FROM jsonb_to_recordset(COALESCE(p_signals, '[]'::jsonb)) AS entry(
    signal_type text,
    signal_key text,
    signal_value jsonb,
    signal_source text,
    signal_strength integer,
    is_negative boolean,
    recorded_at timestamptz
  );

  INSERT INTO public.user_product_card_keywords (
    user_id, saved_product_card_id, product_card_key, primary_keyword, descriptor_keywords,
    brand_keywords, category, subcategory, negative_keywords, source_version
  )
  SELECT
    p_user_id,
    entry.saved_product_card_id,
    entry.product_card_key,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    COALESCE(entry.brand_keywords, '{}'::text[]),
    entry.category,
    entry.subcategory,
    COALESCE(entry.negative_keywords, '{}'::text[]),
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_product_card_keywords, '[]'::jsonb)) AS entry(
    saved_product_card_id uuid,
    product_card_key text,
    primary_keyword text,
    descriptor_keywords text[],
    brand_keywords text[],
    category text,
    subcategory text,
    negative_keywords text[],
    source_version text
  );

  INSERT INTO public.user_like_signals (
    user_id, like_type, primary_keyword, descriptor_keywords, brand, category, notes
  )
  SELECT
    p_user_id,
    entry.like_type,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    entry.brand,
    entry.category,
    entry.notes
  FROM jsonb_to_recordset(COALESCE(p_like_signals, '[]'::jsonb)) AS entry(
    like_type text,
    primary_keyword text,
    descriptor_keywords text[],
    brand text,
    category text,
    notes text
  );

  INSERT INTO public.user_dislike_signals (
    user_id, dislike_type, primary_keyword, descriptor_keywords, brand, category, notes
  )
  SELECT
    p_user_id,
    entry.dislike_type,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    entry.brand,
    entry.category,
    entry.notes
  FROM jsonb_to_recordset(COALESCE(p_dislike_signals, '[]'::jsonb)) AS entry(
    dislike_type text,
    primary_keyword text,
    descriptor_keywords text[],
    brand text,
    category text,
    notes text
  );

  INSERT INTO public.this_or_that_v2_answer_signals (
    answer_id, user_id, question_key, signal_polarity, signal_type, category_key, subgroup_key,
    recommendation_category, entity_type, entity_key, entity_label, primary_keyword,
    descriptor_keywords, brand, location_keys, tags, notes, source_version
  )
  SELECT
    entry.answer_id,
    p_user_id,
    entry.question_key,
    entry.signal_polarity,
    entry.signal_type,
    entry.category_key,
    entry.subgroup_key,
    entry.recommendation_category,
    entry.entity_type,
    entry.entity_key,
    entry.entity_label,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    entry.brand,
    COALESCE(entry.location_keys, '{}'::text[]),
    COALESCE(entry.tags, '{}'::text[]),
    entry.notes,
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_this_or_that_signal_rows, '[]'::jsonb)) AS entry(
    answer_id uuid,
    question_key text,
    signal_polarity text,
    signal_type text,
    category_key text,
    subgroup_key text,
    recommendation_category text,
    entity_type text,
    entity_key text,
    entity_label text,
    primary_keyword text,
    descriptor_keywords text[],
    brand text,
    location_keys text[],
    tags text[],
    notes text,
    source_version text
  );

  INSERT INTO public.recommendation_keyword_bank (
    primary_keyword, descriptor_keyword, category, weight, source_type, source_version
  )
  SELECT
    entry.primary_keyword,
    entry.descriptor_keyword,
    entry.category,
    entry.weight,
    entry.source_type,
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_keyword_bank_rows, '[]'::jsonb)) AS entry(
    primary_keyword text,
    descriptor_keyword text,
    category text,
    weight numeric,
    source_type text,
    source_version text
  )
  ON CONFLICT (primary_keyword, descriptor_keyword, category)
  DO UPDATE SET
    weight = EXCLUDED.weight,
    source_type = EXCLUDED.source_type,
    source_version = EXCLUDED.source_version,
    updated_at = now();

  INSERT INTO public.recommendation_brand_bank (
    brand, primary_keyword, descriptor_keywords, category, weight, source_type, source_version
  )
  SELECT
    entry.brand,
    entry.primary_keyword,
    COALESCE(entry.descriptor_keywords, '{}'::text[]),
    entry.category,
    entry.weight,
    entry.source_type,
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_brand_bank_rows, '[]'::jsonb)) AS entry(
    brand text,
    primary_keyword text,
    descriptor_keywords text[],
    category text,
    weight numeric,
    source_type text,
    source_version text
  )
  ON CONFLICT (brand, primary_keyword, category)
  DO UPDATE SET
    descriptor_keywords = EXCLUDED.descriptor_keywords,
    weight = EXCLUDED.weight,
    source_type = EXCLUDED.source_type,
    source_version = EXCLUDED.source_version,
    updated_at = now();

  INSERT INTO public.recommendation_brand_location_bank (
    location_key, brand, category, primary_keywords, weight, source_type, source_version
  )
  SELECT
    entry.location_key,
    entry.brand,
    entry.category,
    COALESCE(entry.primary_keywords, '{}'::text[]),
    entry.weight,
    entry.source_type,
    entry.source_version
  FROM jsonb_to_recordset(COALESCE(p_brand_location_rows, '[]'::jsonb)) AS entry(
    location_key text,
    brand text,
    category text,
    primary_keywords text[],
    weight numeric,
    source_type text,
    source_version text
  )
  ON CONFLICT (location_key, brand, category)
  DO UPDATE SET
    primary_keywords = EXCLUDED.primary_keywords,
    weight = EXCLUDED.weight,
    source_type = EXCLUDED.source_type,
    source_version = EXCLUDED.source_version,
    updated_at = now();
END;
$$;
