insert into public.user_weekly_recommendations (
  user_id,
  week_start,
  generation_version,
  products,
  input_snapshot_summary,
  generated_at,
  updated_at
)
select
  wr.user_id,
  wr.week_start,
  'recommendation-engine-v2-seed',
  wr.products,
  jsonb_build_object(
    'source_kind', 'test-profile-seed',
    'seed_origin', 'weekly_recommendations',
    'recommendation_target_count', jsonb_array_length(coalesce(wr.products, '[]'::jsonb)),
    'recommendation_input_level', 'seeded-profile'
  ),
  wr.generated_at,
  coalesce(wr.updated_at, wr.generated_at)
from public.weekly_recommendations wr
where wr.user_id in (
  '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01'::uuid,
  '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02'::uuid
)
on conflict (user_id, week_start) do update
set
  generation_version = excluded.generation_version,
  products = excluded.products,
  input_snapshot_summary = excluded.input_snapshot_summary,
  generated_at = excluded.generated_at,
  updated_at = excluded.updated_at;
