# Recommendation System Overhaul Plan

This document is the implementation plan for replacing the current recommendation system.

It exists because the current recommendation stack mixes too many responsibilities:

- keyword and brand guidance
- curated fallback products
- exact product resolution
- shared reusable product memory
- weekly user caches
- connection-specific recommendation reuse
- frontend image fallback behavior

The replacement system should separate those concerns cleanly.

This is a rebuild plan, not a patch plan.

## Product Goal

Build a recommendation engine that:

1. uses all meaningful user input
2. produces accurate product recommendations
3. stores exact reusable product data at the website level
4. keeps user-specific weekly output separate from the shared product bank
5. avoids fake imagery and fake exact-product behavior

## Non-Negotiable Rules

1. No frontend image banks in the final recommendation product flow.
2. No fake exact-product cards.
3. Exact product rows must store:
   - exact link
   - exact image
   - exact price
   - scraped description
   - product title
   - brand
   - keywords
4. Shared product-bank rows must store no user-identifying data.
5. User-specific weekly recommendations must remain a separate layer.
6. The replacement should be built beside the current system, then cut over.
7. Old recommendation code should only be deleted after the new system is verified.

## Current System: What Exists Now

The current system already has several useful pieces, but they are blended together.

### Frontend

- `src/pages/dashboard/Recommendations.tsx`

Role:

- renders the weekly recommendation cards
- calls `ai-products`
- falls back to local image banks when no exact image exists
- persists save/share activity in `user_preferences`

This page is not the recommendation engine. It is the viewer.

### User weekly cache

- `weekly_recommendations`
- migration: `supabase/migrations/20260316175025_d34dc734-c433-46d6-84fc-f842382d15c9.sql`

Role:

- stores the user-facing once-per-week materialized recommendation set

This is not the shared recommendation bank.

### Shared resolved product table

- `resolved_recommendation_catalog`
- base migration: `supabase/migrations/20260318160000_resolved_recommendation_catalog.sql`

Later fields added by:

- `supabase/migrations/20260408114000_add_keyword_bank_fields_to_resolved_recommendations.sql`
- `supabase/migrations/20260408153000_add_exact_product_fields_to_resolved_recommendations.sql`
- `supabase/migrations/20260408183000_add_primary_keyword_buckets_to_resolved_recommendations.sql`

Role:

- shared website-level reusable resolved product memory
- currently used for:
  - keyword matching
  - exact product reuse
  - Firecrawl-enriched product facts

This is the closest thing to the real shared product bank in the current system.

### Keyword / brand guidance banks

- `BRAND_BANK`
- `STORE_BANK`
- `PRODUCT_CATALOG`
- file: `supabase/functions/_shared/knowMeCatalog.ts`

Role:

- recommend brands and stores from user signals
- provide curated fallback catalog products
- shape AI recommendation intent generation

These are not the final reusable product bank.

### Knowledge Center data

Primary view and access layer:

- `src/contexts/KnowledgeCenterContext.tsx`
- `src/lib/knowledgeCenter.ts`
- `supabase/functions/_shared/knowledgeCenter.ts`

Main views:

- `public.user_knowledge_snapshots`
- `public.user_knowledge_derivations`
- defined in `supabase/migrations/20260405120000_knowledge_center_cutover.sql`

Role:

- combines:
  - profile data
  - onboarding answers
  - know me answers
  - saved product cards
  - user connections
  - derivations such as `your_vibe`

### Connection recommendation context

Main function:

- `public.get_connection_for_you_context`
- active shape in `supabase/migrations/20260405133000_connection_context_rename.sql`

Role:

- builds connection gifting context using:
  - shared saved product cards
  - shared vibe
  - shared recommendations
  - upcoming occasions

Important reality:

- `shared_recommendations` is not a separate recommendation bank
- it is permissioned access to the latest `weekly_recommendations`

### Exact product resolver

- `supabase/functions/_shared/exactProductScraper.ts`

Role:

- Firecrawl search
- product-page scrape
- image selection
- title/price/description extraction
- exact-product confidence scoring

## Target Replacement Architecture

The replacement system should be divided into explicit layers.

### Layer 1: User preference signals

Purpose:

- store and normalize everything known about a user that can influence recommendations

Data sources:

- profile core
- birthday
- anniversary
- location
- This or That answers
- Know Me answers
- likes
- dislikes
- product cards
- future category cards

Key principle:

- this layer stores user preference truth
- it does not store weekly recommendation output
- it does not store shared reusable product rows

### Layer 2: Recommendation keyword bank

Purpose:

- store reusable guidance knowledge for recommendation generation

This is where the product keyword intelligence belongs:

- primary product keywords
- descriptor keywords
- brands
- brand-to-keyword relationships
- keyword-to-category relationships
- keyword-to-location relationships
- location-specific brand relevance
- category relevance

Examples:

- `jeans` -> `american eagle`, `levi's`, `h&m`
- `coffee` -> regional cafes or chains by location
- `athleisure` -> favored brands in certain regions

Key principle:

- this is keyword intelligence only
- not user-specific
- not final recommendation output
- not exact scraped product rows

### Layer 3: Recommendation product bank

Purpose:

- store exact reusable product rows that can be safely reused across users

Each row must contain:

- primary keyword
- descriptor keywords
- category
- brand
- product title
- exact product URL
- exact product image
- exact product price
- scraped description
- exact-match confidence
- resolver source
- timestamps

Key principle:

- no user id
- no user profile data
- only reusable exact product facts

This is the true website-level reusable product bank.

### Layer 4: User weekly recommendation output

Purpose:

- store the user-facing once-per-week recommendation set

Key principle:

- this remains separate from the shared product bank
- this is the materialized output layer only

## Required Input Systems Before The New Engine Is Final

The recommendation engine cannot be truly correct until these source systems are finished and normalized.

### This or That v2

Requirements:

- answers must be stored in structured form
- answers must map to recommendation signals
- signals must be extractable without freeform prompt scraping

Each answer should be able to contribute:

- product keywords
- category preferences
- style signals
- brand tendencies
- avoid/dislike signals where relevant

### Product Cards v2

Requirements:

- every saved product card must support structured recommendation metadata

Each product card should be able to store:

- primary keyword
- descriptor keywords
- brand keywords
- category
- subcategory
- avoid signals
- preference strength if needed later

Current freeform card text should not remain the only recommendation input.

### Likes / Dislikes

Requirements:

- explicit product likes
- explicit product dislikes
- explicit style likes
- explicit style dislikes
- explicit category likes/dislikes

Rule:

- dislikes must act as hard blockers in recommendation reuse and selection

### Category Cards

These are planned but not finished.

The new system should be designed to consume them later without another recommendation rewrite.

## New Recommendation Flow

This should be the new weekly recommendation flow.

### Weekly user flow

1. User opens recommendations.
2. System checks `user_weekly_recommendations`.
3. If a current-week set exists, return it.
4. If not, load canonical user preference signals.
5. Build recommendation intents from:
   - This or That
   - product cards
   - likes
   - dislikes
   - birthday / anniversary / location
   - Know Me answers
   - category cards when available
6. Consult the keyword bank to guide:
   - brands
   - descriptors
   - regional product relevance
   - category weighting
7. For each intent:
   - require exact primary keyword match first
   - search the product bank inside that primary keyword bucket
   - use descriptor overlap to narrow within that bucket
   - reject rows that conflict with dislikes
8. If a matching exact product row exists, reuse it.
9. If not, run exact product resolution and Firecrawl scrape.
10. If the scrape passes exact confidence, save the row to the product bank.
11. Assemble the final weekly set.
12. Save the user-facing set to `user_weekly_recommendations`.

### Connection gifting flow

This should be rebuilt after or alongside the weekly replacement.

It should use:

- shared saved product cards
- shared recommendation-visible profile signals
- shared likes/dislikes when explicitly permitted
- occasion context

It should not depend on the legacy shared-weekly-recommendations shortcut as the main logic source forever.

## Data Model Proposal

These names are proposed implementation targets. Adjust only if there is a strong naming reason.

### Core input and signal tables

1. `user_preference_signals`
2. `this_or_that_v2_answers`
3. `user_product_card_keywords`
4. `user_like_signals`
5. `user_dislike_signals`
6. `user_category_card_signals`

### Shared guidance bank

1. `recommendation_keyword_bank`
2. `recommendation_brand_bank`
3. `recommendation_brand_location_bank`

### Shared reusable product bank

1. `recommendation_product_bank`

### User output cache

1. `user_weekly_recommendations`

## What Should Be Reused From The Current System

Safe reusable pieces:

1. Knowledge Center snapshot/derivation infrastructure
2. Firecrawl exact-product scrape helper
3. general once-a-week cache concept
4. service-role-only shared table writing pattern
5. connection access-control concepts

Reusable with refactor:

1. parts of `knowMeCatalog.ts` that belong in keyword-bank logic
2. parts of `ai-products` prompt assembly
3. parts of `ai-connection-products` context assembly

Should not remain in the final architecture:

1. frontend local recommendation image banks
2. mixed fallback/final-product semantics in the same flow
3. dependence on curated fallback product rows as if they are equivalent to exact reusable products
4. treating `shared_recommendations` as a long-term recommendation source for connection gifting

## Build Order

Build in this order.

### Phase A: Spec and schema

1. finalize new recommendation architecture
2. define new tables and views
3. define exact ownership boundaries
4. define migration and cutover rules

### Phase B: Input-system rebuild

1. This or That v2
2. Product Cards v2
3. Likes / Dislikes
4. future-safe category-card signal shape

### Phase C: Shared bank rebuild

1. keyword bank
2. brand/location bank
3. product bank

### Phase D: Engine rebuild

1. weekly recommendation engine v2
2. exact product lookup path
3. exact product scrape-and-save path
4. weekly materialization path

### Phase E: Connection rebuild

1. connection gifting engine v2
2. occasion-aware ranking
3. explicit shared-signal consumption only

### Phase F: Cutover and cleanup

1. run new engine beside old engine
2. compare outputs
3. switch frontend to new engine
4. verify
5. delete legacy recommendation system

## Verification Requirements

The rebuild is not done until these are verified.

### Weekly path

1. empty-bank cold start
2. shared-bank reuse
3. dislike blocking
4. location-aware brand guidance
5. exact scrape success
6. weak scrape rejection
7. once-a-week cache reuse

### Input path

1. This or That answers affect recommendation inputs
2. product card keywords affect recommendation inputs
3. likes influence ranking positively
4. dislikes block conflicting products
5. birthday / anniversary / location influence seasonal or occasion logic where relevant

### Shared bank behavior

1. product bank stores no user data
2. exact rows contain exact image/link/price/description
3. rows are reusable across users
4. descriptor overlap works only inside the exact primary keyword bucket

### Connection path

1. shared saved product cards influence connection gifting
2. explicit shared profile data influences gifting
3. occasion context changes ranking appropriately
4. no unauthorized data enters the connection prompt

## Deletion Plan For Legacy System

Do not delete first.

Delete only after cutover.

Legacy recommendation surfaces likely to retire or shrink after the new system is live:

1. recommendation-specific fallback catalog logic inside `supabase/functions/_shared/knowMeCatalog.ts`
2. local image-bank fallback logic inside `src/pages/dashboard/Recommendations.tsx`
3. old mixed shared resolver semantics inside `ai-products`
4. old mixed shared resolver semantics inside `ai-connection-products`
5. any obsolete migrations/tables only after data migration is complete and confirmed

## Immediate Next Deliverables

The next implementation docs/tasks should be:

1. schema proposal for the new recommendation tables
2. Product Cards v2 data contract
3. This or That v2 signal contract
4. Likes / Dislikes schema and UI entry plan
5. recommendation engine v2 service boundaries
6. cutover checklist from old engine to new engine
