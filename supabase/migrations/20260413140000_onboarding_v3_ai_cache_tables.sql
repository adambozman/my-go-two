-- Migration: onboarding_v3_ai_cache_tables
-- Creates three cache tables for AI-generated onboarding screens.
-- The onboarding-ai-generator edge function checks these tables first;
-- only calls Gemini on a cache miss, then writes the result back.
--
-- Cache invalidation: updated_at + ttl_days. Frontend/edge function
-- treats a row as stale if (now() - updated_at) > ttl_days.

-- ─── 1. onboarding_vibe_cache ────────────────────────────────────────────────
-- Screen 3: AI-generated style vibe options.
-- Cache key: age_range + gender (e.g. "25_34__woman")
-- ~30 possible combinations. Refreshed every 90 days (trend cycle).

create table if not exists public.onboarding_vibe_cache (
  id            uuid primary key default gen_random_uuid(),
  cache_key     text not null unique,          -- buildVibeCacheKey(age_range, gender)
  age_range     text not null,                 -- e.g. "25_34"
  gender        text not null,                 -- e.g. "woman"
  vibe_options  jsonb not null,                -- array of {id, label, description, keywords[]}
  ttl_days      integer not null default 90,   -- how long before regeneration
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.onboarding_vibe_cache is
  'Cached AI-generated style vibe options for onboarding Screen 3. Keyed on age_range + gender. TTL 90 days.';

comment on column public.onboarding_vibe_cache.vibe_options is
  'JSON array: [{id: string, label: string, description: string, keywords: string[]}]. '
  'label is the trend name (e.g. "Quiet Luxury"). description is 1-sentence AI copy. '
  'keywords feed the recommendation engine for image theme and brand filtering.';

-- ─── 2. onboarding_spend_cache ───────────────────────────────────────────────
-- Screen 5: AI-generated supplemental spend items based on top 3 categories.
-- Cache key: sorted top_3 categories joined with __ (e.g. "clothes__dining__entertainment")
-- Finite set. Refreshed every 180 days (spend patterns are stable).

create table if not exists public.onboarding_spend_cache (
  id              uuid primary key default gen_random_uuid(),
  cache_key       text not null unique,        -- buildSpendCacheKey(topCategories)
  top_categories  text[] not null,             -- e.g. ["clothes", "dining", "entertainment"]
  spend_items     jsonb not null,              -- array of SpendItem objects
  ttl_days        integer not null default 180,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.onboarding_spend_cache is
  'Cached AI-generated spend anchor items for onboarding Screen 5. Keyed on top 3 category combination. TTL 180 days.';

comment on column public.onboarding_spend_cache.spend_items is
  'JSON array matching SpendItem interface: [{id, label, ranges: [{id, label, value}]}]. '
  '3–4 items chosen by AI based on category context (e.g. "A bottle of wine" for beverages).';

-- ─── 3. onboarding_brand_cache ───────────────────────────────────────────────
-- Screen 6: AI-curated brand grid options.
-- Cache key: age_range + gender + top_category + spend_tier
-- More combinations but still finite. Refreshed every 90 days.

create table if not exists public.onboarding_brand_cache (
  id              uuid primary key default gen_random_uuid(),
  cache_key       text not null unique,        -- buildBrandCacheKey(age_range, gender, topCategory, spendTier)
  age_range       text not null,
  gender          text not null,
  top_category    text not null,               -- user's #1 ranked category
  spend_tier      text not null,               -- "budget" | "mid" | "premium" | "luxury"
  brand_options   jsonb not null,              -- array of {id, label, category, tier}
  ttl_days        integer not null default 90,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.onboarding_brand_cache is
  'Cached AI-curated brand options for onboarding Screen 6. Keyed on age + gender + top category + spend tier. TTL 90 days.';

comment on column public.onboarding_brand_cache.brand_options is
  'JSON array: [{id: string, label: string, category: string, tier: string}]. '
  '15–20 brands plausible for this profile. User picks up to 5.';

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- These are shared read caches — all authenticated users can read, only service role can write.

alter table public.onboarding_vibe_cache  enable row level security;
alter table public.onboarding_spend_cache enable row level security;
alter table public.onboarding_brand_cache enable row level security;

-- Authenticated users: read-only
create policy "authenticated users can read vibe cache"
  on public.onboarding_vibe_cache for select
  to authenticated using (true);

create policy "authenticated users can read spend cache"
  on public.onboarding_spend_cache for select
  to authenticated using (true);

create policy "authenticated users can read brand cache"
  on public.onboarding_brand_cache for select
  to authenticated using (true);

-- Service role: full access (edge function uses service role key to write)
create policy "service role full access vibe cache"
  on public.onboarding_vibe_cache for all
  to service_role using (true);

create policy "service role full access spend cache"
  on public.onboarding_spend_cache for all
  to service_role using (true);

create policy "service role full access brand cache"
  on public.onboarding_brand_cache for all
  to service_role using (true);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
create index if not exists idx_vibe_cache_key  on public.onboarding_vibe_cache  (cache_key);
create index if not exists idx_spend_cache_key on public.onboarding_spend_cache (cache_key);
create index if not exists idx_brand_cache_key on public.onboarding_brand_cache (cache_key);
