CREATE OR REPLACE FUNCTION public.infer_card_entry_section(
  p_card_key text,
  p_group_name text,
  p_entry_name text
)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  WITH normalized AS (
    SELECT lower(
      concat_ws(
        ' ',
        coalesce(p_card_key, ''),
        coalesce(p_group_name, ''),
        coalesce(p_entry_name, '')
      )
    ) AS text_value
  )
  SELECT CASE
    WHEN text_value ~ '(food|drink|coffee|tea|taco|restaurant|snack|grocery|meal|milk|pizza|kitchen)'
      THEN 'food'
    WHEN text_value ~ '(wish|gift|favorite|favourite|save|saved|memory|anniversary|birthday|occasion)'
      THEN 'favorites'
    WHEN text_value ~ '(skin|makeup|hygiene|personal|tooth|shampoo|conditioner|pads|razor|soap|care)'
      THEN 'personal'
    WHEN text_value ~ '(style|fit|top|bottom|shoe|footwear|outfit|shirt|jacket|jean|dress|closet|size|brand|accessor)'
      THEN 'style'
    ELSE 'everyday'
  END
  FROM normalized;
$$;

DROP POLICY IF EXISTS "Partners can view entries" ON public.card_entries;

CREATE POLICY "Partners can view shared entries"
ON public.card_entries
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.couples c
    JOIN public.sharing_permissions sp
      ON sp.couple_id = c.id
     AND sp.user_id = card_entries.user_id
     AND sp.partner_id = auth.uid()
    WHERE c.status = 'accepted'
      AND (
        (c.inviter_id = card_entries.user_id AND c.invitee_id = auth.uid())
        OR
        (c.invitee_id = card_entries.user_id AND c.inviter_id = auth.uid())
      )
      AND CASE public.infer_card_entry_section(
        card_entries.card_key,
        card_entries.group_name,
        card_entries.entry_name
      )
        WHEN 'style' THEN (sp.sizes OR sp.brands)
        WHEN 'food' THEN sp.food_preferences
        WHEN 'favorites' THEN (
          sp.gift_ideas
          OR sp.wish_list
          OR sp.occasions
          OR sp.memories
          OR sp.saved_items
        )
        WHEN 'personal' THEN (sp.brands OR sp.saved_items OR sp.sizes)
        ELSE (
          sp.sizes
          OR sp.brands
          OR sp.saved_items
          OR sp.food_preferences
          OR sp.gift_ideas
          OR sp.wish_list
          OR sp.occasions
          OR sp.memories
        )
      END
  )
);
