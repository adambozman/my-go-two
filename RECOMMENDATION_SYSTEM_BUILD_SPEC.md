# Recommendation System Build Spec

This document turns the overhaul plan into an implementation spec.

Use this file when building the replacement recommendation system.

This is intentionally more concrete than `RECOMMENDATION_SYSTEM_OVERHAUL_PLAN.md`.

## Intent

Build a new recommendation system beside the current one, then cut over.

The new system must:

1. use real user inputs instead of prompt-only guesswork
2. keep shared exact product data separate from user data
3. keep weekly user output separate from the shared product bank
4. remove frontend recommendation image-bank behavior from the final product flow
5. support exact reuse by primary keyword bucket plus descriptor narrowing

## Current Inputs To Preserve

These are the real live inputs already in the repo and should feed the new system.

### Profile and lifecycle facts

Current sources:

- `profiles`
- `user_preferences.profile_answers`
- `public.user_knowledge_snapshots`

Signals to preserve:

- birthday
- anniversary
- location
- gender only where needed for existing product/category logic
- core profile answers

### Onboarding answers

Current storage:

- `public.onboarding_responses`

Examples already present:

- identity
- birthday
- anniversary
- style-personality
- daily-vibe
- spending-mindset
- purchase-values
- free-time
- gift-preference
- aesthetic-lean

### Know Me answers

Current storage:

- `public.know_me_responses`

This includes both traditional Know Me prompts and the current This or That bank.

### This or That

Current source of questions:

- `src/data/knowMeQuestions.ts`

Current runtime surface:

- `src/pages/dashboard/KnowMePage.tsx`

Current storage path:

- stored through `know_me_responses`

Important reality:

- This or That exists already, but it is not yet normalized specifically for recommendation signals.

### Saved product cards

Current storage:

- `public.saved_product_cards`

Current access layers:

- `src/lib/knowledgeCenter.ts`
- `src/contexts/KnowledgeCenterContext.tsx`
- `src/features/mygotwo/myGoTwoData.ts`

Important reality:

- saved product cards already feed the Knowledge Center snapshot
- current field values are useful but not consistently normalized into recommendation keywords

### Derived vibe and guidance

Current storage:

- `public.knowledge_derivations`
- especially derivation key `your_vibe`

Current use:

- `recommended_brands`
- `recommended_stores`
- `image_themes`
- `color_palette`
- `gift_categories`
- `price_tier`
- `style_keywords`
- `persona_summary`

Important reality:

- these are guidance signals, not final recommendation output

### Connection-specific context

Current source:

- `public.get_connection_for_you_context`

Important reality:

- this is for connection gifting context and should become a consumer of the new system, not the design center for the weekly self-recommendation engine

## Missing Or Incomplete Inputs

These are explicitly unfinished and should be treated as planned build work.

### Likes / dislikes

Current reality:

- there are partial negative-signal extractions from onboarding and Know Me text
- there is no clean explicit likes/dislikes system yet

This must be added as first-class data.

### Product-card keywords

Current reality:

- saved product cards store `field_values`
- recommendation keywords are inferred from card text and card titles
- there is not yet a structured keyword contract for every card

This must be normalized.

### Category cards

Current reality:

- planned but not complete

The new recommendation engine should leave room for them from the start.

## New Canonical Layers

The replacement system should use these layers.

## Layer 1: User Preference Signal Tables

These tables are user-owned and recommendation-facing.

### `user_preference_signals`

Purpose:

- one normalized row per user per signal

Columns:

- `id uuid primary key`
- `user_id uuid not null`
- `signal_type text not null`
- `signal_key text not null`
- `signal_value jsonb not null`
- `signal_source text not null`
- `signal_strength integer not null default 50`
- `is_negative boolean not null default false`
- `recorded_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Examples:

- `signal_type = 'profile_fact'`, `signal_key = 'birthday'`
- `signal_type = 'onboarding_answer'`, `signal_key = 'gift-preference'`
- `signal_type = 'this_or_that'`, `signal_key = 'tot-03'`
- `signal_type = 'product_card_keyword'`, `signal_key = 'coffee-order:latte'`
- `signal_type = 'dislike'`, `signal_key = 'skinny'`

Indexes:

- `(user_id, signal_type)`
- `(user_id, signal_key)`
- `(user_id, is_negative)`

### `user_product_card_keywords`

Purpose:

- normalized keyword rows extracted from saved product cards

Columns:

- `id uuid primary key`
- `user_id uuid not null`
- `saved_product_card_id uuid not null`
- `product_card_key text not null`
- `primary_keyword text null`
- `descriptor_keywords text[] not null default '{}'`
- `brand_keywords text[] not null default '{}'`
- `category text null`
- `subcategory text null`
- `negative_keywords text[] not null default '{}'`
- `source_version text not null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Rules:

- one product card can produce one or more normalized keyword rows
- this table is user-owned
- this table is not the shared bank

### `user_like_signals`

Purpose:

- explicit positive user preferences

Columns:

- `id uuid primary key`
- `user_id uuid not null`
- `like_type text not null`
- `primary_keyword text null`
- `descriptor_keywords text[] not null default '{}'`
- `brand text null`
- `category text null`
- `notes text null`
- `created_at timestamptz not null default now()`

### `user_dislike_signals`

Purpose:

- explicit negative user preferences that must block recommendation reuse

Columns:

- `id uuid primary key`
- `user_id uuid not null`
- `dislike_type text not null`
- `primary_keyword text null`
- `descriptor_keywords text[] not null default '{}'`
- `brand text null`
- `category text null`
- `notes text null`
- `created_at timestamptz not null default now()`

Rule:

- dislikes are hard blockers, not weak hints

## Layer 2: Shared Keyword Intelligence Tables

These tables are website-level, product-independent guidance.

### `recommendation_keyword_bank`

Purpose:

- primary keyword catalog and descriptor relationships

Columns:

- `id uuid primary key`
- `primary_keyword text not null`
- `descriptor_keyword text not null`
- `category text not null`
- `weight numeric not null default 1`
- `source_type text not null`
- `source_version text not null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Examples:

- `jeans` + `skinny`
- `jeans` + `bootcut`
- `coffee` + `oatmilk`
- `lamp` + `brass`

Unique key:

- `(primary_keyword, descriptor_keyword, category)`

### `recommendation_brand_bank`

Purpose:

- map brands to primary keywords and descriptor contexts

Columns:

- `id uuid primary key`
- `brand text not null`
- `primary_keyword text not null`
- `descriptor_keywords text[] not null default '{}'`
- `category text not null`
- `weight numeric not null default 1`
- `source_type text not null`
- `source_version text not null`
- `created_at timestamptz not null default now()`

Examples:

- `American Eagle` + `jeans` + `{"skinny","blue","casual"}`
- `H&M` + `jeans` + `{"skinny","black","budget"}`

### `recommendation_brand_location_bank`

Purpose:

- location-aware brand relevance

Columns:

- `id uuid primary key`
- `location_key text not null`
- `brand text not null`
- `category text not null`
- `primary_keywords text[] not null default '{}'`
- `weight numeric not null default 1`
- `source_type text not null`
- `source_version text not null`
- `created_at timestamptz not null default now()`

Examples:

- Chicago-specific local restaurant brands
- region-specific coffee chains
- store availability by geography

## Layer 3: Shared Exact Product Bank

This is the real shared reusable product layer.

### `recommendation_product_bank`

Purpose:

- exact reusable product rows only

Columns:

- `id uuid primary key`
- `primary_keyword text not null`
- `descriptor_keywords text[] not null default '{}'`
- `keyword_signature text not null`
- `category text not null`
- `brand text not null`
- `product_title text not null`
- `product_url text not null`
- `product_url_hash text not null`
- `product_image_url text not null`
- `product_price_text text not null`
- `product_currency text null`
- `scraped_description text null`
- `scraped_features jsonb not null default '[]'::jsonb`
- `search_query text null`
- `resolver_source text not null`
- `source_version text not null`
- `match_confidence numeric not null`
- `exact_match_confirmed boolean not null default false`
- `usage_count integer not null default 0`
- `last_verified_at timestamptz null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Rules:

- no user id
- no user profile data
- no fallback rows pretending to be exact
- only exact confirmed product rows can live here

Unique candidates:

- `(product_url_hash)`
- `(primary_keyword, brand, product_title)`

Indexes:

- `(category, primary_keyword)`
- `gin(descriptor_keywords)`
- `(keyword_signature)`
- `(exact_match_confirmed, category, primary_keyword)`

### Relationship to `resolved_recommendation_catalog`

Short term:

- keep `resolved_recommendation_catalog` alive as the bridge table

Long term:

- either migrate its exact-confirmed rows into `recommendation_product_bank`
- or rename and simplify it into that role during cutover

Do not decide this blindly in code. Make the migration path explicit first.

## Layer 4: User Weekly Output

### `user_weekly_recommendations`

Purpose:

- final user-facing once-per-week recommendation set

Short term:

- current `weekly_recommendations` can remain the bridge table

Long term options:

1. keep `weekly_recommendations` and tighten payload shape
2. rename it to `user_weekly_recommendations`

Required payload shape:

- `user_id`
- `week_start`
- `products`
- `generation_version`
- `input_snapshot_summary`
- `generated_at`

Rules:

- this is not the shared product bank
- it is the materialized weekly output only

## Input Normalization Contracts

### This or That v2 contract

Every answer must be able to yield recommendation-ready signals.

Required normalized output:

- `question_id`
- `category_id`
- `selected_option`
- `primary_keywords text[]`
- `descriptor_keywords text[]`
- `brand_keywords text[]`
- `negative_keywords text[]`
- `category_keywords text[]`

Not every answer must produce every field, but every answer must support the structure.

### Product Cards v2 contract

Every saved product card should support recommendation metadata.

Required metadata shape:

- `primary_keyword`
- `descriptor_keywords`
- `brand_keywords`
- `category`
- `subcategory`
- `negative_keywords`
- `signal_strength`

Rule:

- recommendation logic should not have to scrape meaning from freeform card labels forever

### Likes / Dislikes contract

Required shape:

- explicit type
- optional primary keyword
- optional descriptor keywords
- optional brand
- optional category
- optional freeform note

Rule:

- dislikes block reuse and selection

## New Recommendation Flow

This is the target runtime flow for self recommendations.

1. Frontend requests recommendations.
2. Backend checks user weekly cache for the current week.
3. If present, return it.
4. If absent, load normalized user preference signals.
5. Build recommendation intents using:
   - onboarding answers
   - Know Me answers
   - This or That answers
   - saved product card keywords
   - birthdays / anniversary / location
   - explicit likes
   - explicit dislikes
   - derived keyword-bank guidance
6. For each intent:
   - require exact `primary_keyword`
   - use descriptor keywords to narrow within that bucket
   - exclude disliked brands / descriptors / primary keywords
7. Check `recommendation_product_bank`.
8. If exact reusable row exists, use it.
9. If not, run exact search + Firecrawl scrape.
10. Save only exact confirmed results into the shared product bank.
11. Build the weekly output set.
12. Save the result into `weekly_recommendations` or `user_weekly_recommendations`.
13. Return final cards.

## Connection Recommendation Flow

This should be rebuilt after the self recommendation path is stable.

Target behavior:

1. Load connection-visible preference signals.
2. Load connection-visible saved product card keywords.
3. Load relevant occasion context.
4. Generate gifting intents.
5. Reuse exact shared product-bank rows where valid.
6. Run Firecrawl only on misses.
7. Materialize connection-specific output separately from self weekly output.

Important rule:

- connection gifting should consume the same shared product bank, not build a second one

## What Should Be Reused

Reuse where it helps:

- `public.onboarding_responses`
- `public.know_me_responses`
- `public.knowledge_derivations`
- `public.saved_product_cards`
- `public.user_knowledge_snapshots`
- `public.user_knowledge_derivations`
- `exactProductScraper.ts` ideas and Firecrawl logic
- the current weekly cache table as a bridge if needed

## What Should Not Be Carried Forward As-Is

These are bridge components, not the final design:

- frontend recommendation image banks
- `knowMeCatalog.ts` as the long-term recommendation architecture center
- mixed fallback + exact-product semantics in one table without explicit ownership
- prompt-only inference from raw card titles as the permanent product-card strategy
- shared weekly recommendations as the long-term basis for connection gifting logic

## Build Sequence

### Step 1: Schema

Add the new tables:

- `user_preference_signals`
- `user_product_card_keywords`
- `user_like_signals`
- `user_dislike_signals`
- `recommendation_keyword_bank`
- `recommendation_brand_bank`
- `recommendation_brand_location_bank`
- `recommendation_product_bank`

### Step 2: Input normalizers

Build normalizers for:

- onboarding responses
- Know Me responses
- This or That answers
- saved product cards
- likes / dislikes

### Step 3: Shared-bank population

Build write paths for:

- keyword-bank seeding
- brand-bank seeding
- location-brand seeding
- exact product-bank upsert after Firecrawl confirmation

### Step 4: New recommendation edge function

Create a new function instead of endlessly patching the old one.

Suggested name:

- `supabase/functions/recommendation-engine-v2/index.ts`

### Step 5: Parallel verification

Run old and new outputs side by side for:

- cold start
- warm bank hit
- dislike blocking
- location-aware brand picks
- exact product scrape
- weak scrape rejection
- weekly cache reuse

### Step 6: Frontend cutover

Switch `Recommendations.tsx` to the new function only after the outputs are trusted.

### Step 7: Legacy deletion

Only after cutover:

- retire old frontend image-bank logic
- retire old recommendation fallback flows
- simplify or replace `knowMeCatalog.ts`
- decommission legacy resolver-only paths no longer needed

## Verification Checklist

The new system is not ready until these are true:

1. The same user gets one weekly set, not multiple conflicting generations.
2. The shared bank stores no user-identifying data.
3. Exact product rows always have:
   - exact link
   - exact image
   - exact price
   - exact title
   - scraped description
4. A `jeans` request never reuses a non-`jeans` primary bucket.
5. `jeans + skinny + american eagle` and `jeans + skinny + h&m` can coexist as separate rows.
6. A dislike like `skinny` blocks `skinny jeans` reuse even if the primary keyword is still `jeans`.
7. No final exact-product card relies on a frontend placeholder image bank.
8. Connection gifting reuses the shared product bank without leaking owner-private user data.
