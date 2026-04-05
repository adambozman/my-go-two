CREATE OR REPLACE FUNCTION public.get_connection_for_you_context(
  p_connection_user_id uuid,
  p_days_ahead integer DEFAULT 120
)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH viewer AS (
    SELECT auth.uid() AS viewer_user_id
  ),
  relation AS (
    SELECT
      uc.id AS user_connection_id,
      COALESCE(NULLIF(uc.display_label, ''), 'Connection') AS connection_label
    FROM public.user_connections uc
    JOIN viewer v ON true
    WHERE uc.status = 'accepted'
      AND (
        (uc.inviter_id = v.viewer_user_id AND uc.invitee_id = p_connection_user_id)
        OR
        (uc.invitee_id = v.viewer_user_id AND uc.inviter_id = p_connection_user_id)
      )
    LIMIT 1
  ),
  access_row AS (
    SELECT
      COALESCE(cas.connection_kind, 'custom') AS connection_kind,
      COALESCE(cas.gifting_enabled, true) AS gifting_enabled,
      COALESCE(cas.occasion_tracking_enabled, true) AS occasion_tracking_enabled,
      COALESCE(cas.access_tier, 'free') AS access_tier,
      COALESCE(
        cas.feature_gates,
        jsonb_build_object(
          'connection_context', true,
          'occasion_gifting', true,
          'deep_gifting', false
        )
      ) AS feature_gates
    FROM relation r
    LEFT JOIN public.connection_access_settings cas
      ON cas.user_connection_id = r.user_connection_id
     AND cas.owner_user_id = (SELECT viewer_user_id FROM viewer)
     AND cas.connection_user_id = p_connection_user_id
  ),
  shared_profile AS (
    SELECT sp.*
    FROM relation r
    JOIN viewer v ON true
    CROSS JOIN LATERAL public.get_connection_shared_profile(
      r.user_connection_id,
      p_connection_user_id,
      v.viewer_user_id
    ) sp
  ),
  shared_saved_product_cards AS (
    SELECT COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', spc.id,
          'card_title', spc.card_title,
          'subcategory_label', spc.subcategory_label,
          'product_card_key', spc.product_card_key,
          'field_values', spc.field_values,
          'image_url', spc.image_url,
          'updated_at', spc.updated_at
        )
        ORDER BY spc.updated_at DESC
      ),
      '[]'::jsonb
    ) AS cards
    FROM relation r
    JOIN viewer v ON true
    CROSS JOIN LATERAL public.get_connection_visible_saved_product_cards(
      r.user_connection_id,
      p_connection_user_id,
      v.viewer_user_id
    ) spc
  ),
  shared_vibe AS (
    SELECT COALESCE(
      (
        SELECT jsonb_build_object(
          'persona_summary', vibe.persona_summary,
          'updated_at', vibe.updated_at
        )
        FROM relation r
        JOIN viewer v ON true
        LEFT JOIN LATERAL public.get_connection_shared_vibe(
          r.user_connection_id,
          p_connection_user_id,
          v.viewer_user_id
        ) vibe ON true
        LIMIT 1
      ),
      '{}'::jsonb
    ) AS vibe
  ),
  shared_recommendations AS (
    SELECT COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', recommendation.id,
            'summary', recommendation.summary,
            'products', recommendation.products,
            'updated_at', recommendation.updated_at
          )
          ORDER BY recommendation.updated_at DESC
        )
        FROM relation r
        JOIN viewer v ON true
        LEFT JOIN LATERAL public.get_connection_shared_recommendations(
          r.user_connection_id,
          p_connection_user_id,
          v.viewer_user_id
        ) recommendation ON true
      ),
      '[]'::jsonb
    ) AS recommendations
  ),
  relevant_occasions AS (
    SELECT COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'occasion_type', o.occasion_type,
          'occasion_label', o.occasion_label,
          'occasion_date', o.occasion_date,
          'source_type', o.source_type,
          'metadata', o.metadata
        )
        ORDER BY o.occasion_date ASC, o.occasion_label ASC
      ),
      '[]'::jsonb
    ) AS occasions
    FROM public.get_connection_relevant_occasions(p_connection_user_id, p_days_ahead) o
  )
  SELECT jsonb_build_object(
    'connection_user_id', p_connection_user_id,
    'connection_label', COALESCE(NULLIF(r.connection_label, ''), NULLIF(sp.display_name, ''), 'Connection'),
    'connection_kind', ar.connection_kind,
    'gifting_enabled', ar.gifting_enabled,
    'occasion_tracking_enabled', ar.occasion_tracking_enabled,
    'access_tier', ar.access_tier,
    'feature_gates', ar.feature_gates,
    'profile', jsonb_build_object(
      'display_name', sp.display_name,
      'avatar_url', sp.avatar_url,
      'birthday', sp.birthday,
      'anniversary', sp.anniversary
    ),
    'derived', jsonb_build_object(
      'your_vibe', sv.vibe ->> 'persona_summary',
      'shared_recommendations', sr.recommendations
    ),
    'shared_saved_product_cards', sspc.cards,
    'upcoming_occasions', ro.occasions
  )
  FROM relation r
  JOIN access_row ar ON true
  LEFT JOIN shared_profile sp ON true
  JOIN shared_saved_product_cards sspc ON true
  JOIN shared_vibe sv ON true
  JOIN shared_recommendations sr ON true
  JOIN relevant_occasions ro ON true;
$$;

-- Codebase classification: schema migration for connection context payload renames.
