# Recommendation Intelligence Overhaul Plan

This plan replaces the current recommendation behavior with a category-aware, evidence-gated system.

The goal is not to make the system generate more recommendations.

The goal is to make the system earn the right to generate them.

## Core Rules

1. Legacy recommendation runtime must be retired.
2. The system must decide support separately for each category.
3. User-backed evidence must outrank seeded defaults, trend data, and derived hints.
4. Recommendation fit confidence is separate from exact-product confidence.
5. The engine must be allowed to say "not enough information yet."
6. Popular fallback is allowed only when personalization is not yet earned.
7. Exact product cards must only use verified link, image, title, and price.

## Target Behavior

The system should make decisions in this order:

1. Collect user evidence.
2. Score evidence by category.
3. Decide which categories are unlocked for AI personalization.
4. For locked categories, use popular fallback only.
5. For unlocked categories, generate AI intents.
6. Reuse verified shared product-bank rows when they truly match.
7. Scrape exact products only on qualified misses.
8. Verify product truth.
9. Assemble honest cards.
10. Persist results cleanly.

The important shift is this:

- Food may be unlocked while Travel is still locked.
- Gifts may be unlocked while Clothes is still weak.
- The engine should never act like full-profile personalization exists if only one category has enough evidence.

## Category-Aware Intelligence Model

Each recommendation category should have its own readiness score.

Proposed live category spine:

- clothes
- personal
- health
- gifts
- dining
- beverages
- household
- entertainment
- travel

Each category gets its own evidence profile:

- direct answer count
- structured keyword count
- positive keyword confidence
- negative keyword confidence
- explicit like/dislike coverage
- product-card support
- brand support
- location support where relevant
- contradiction penalties

Each category gets one of these states:

- `locked`
- `emerging`
- `qualified`
- `strong`

Suggested behavior:

- `locked`
  - no AI personalization
  - only popular fallback cards
  - no niche brands
  - no exact-product promises unless banked from global popularity logic
- `emerging`
  - limited AI support
  - broad keywords only
  - mainstream brands only
  - low card count
- `qualified`
  - full AI intent generation allowed for that category
  - descriptor logic active
  - verified bank reuse active
- `strong`
  - high-confidence personalization
  - richer brand and descriptor matching
  - stronger product-bank reuse allowed

## Threshold Model

The system needs two thresholds, not one.

### 1. Global Threshold

This determines whether the user has enough overall information for broad personalization.

Suggested minimum:

- meaningful answers across at least 2 categories
- at least 10 direct user evidence points
- at least 1 negative or avoid signal
- at least 1 explicit preference source beyond profile basics

If this is not met:

- AI should not generate a full personalized weekly set
- the user should see only a small popular set
- the page should clearly behave like a learning system

### 2. Per-Category Threshold

This determines whether a specific category is ready for personalization.

Suggested minimum per category:

- at least 4 direct category-backed signals for `emerging`
- at least 7 direct category-backed signals for `qualified`
- at least 10 direct category-backed signals plus conflict resolution for `strong`

Examples:

- User has answered lots of food prompts and restaurant/product cards:
  - Dining = `qualified`
  - Beverages = `emerging`
  - Travel = `locked`

- Result:
  - AI can personalize Dining
  - Beverages gets broad mainstream suggestions
  - Travel gets no personalized recommendations yet

## Signal Hierarchy

Signals should be weighted in this order:

1. Explicit dislikes and avoids
2. Explicit likes
3. Structured product-card keywords
4. This or That v2 structured answers
5. Category-card answers
6. Questions by Category
7. Profile facts and location
8. Derived support
9. Seed banks
10. Trend banks

Hard rule:

- Lower-tier signals may support a decision.
- Lower-tier signals may never override stronger direct evidence.

## Recommendation Count Rules

The system should stop forcing large weekly sets.

Suggested weekly counts:

- global locked: 2 to 4 popular cards
- global emerging: 4 to 6 mixed cards
- global qualified: 6 to 8 personalized cards
- global strong: 8 to 10 personalized cards

Per-category caps should also exist.

Example:

- if only Dining is qualified, it should not flood the whole page with Dining cards
- the page can show:
  - 3 Dining personalized cards
  - 1 to 2 broad popular cards from other categories

## Brand and Product Intelligence

The system needs three distinct banks.

### 1. Keyword Bank

Purpose:

- map categories to useful product, style, and descriptor keywords
- support brand and category reasoning

Contains:

- primary keywords
- descriptor keywords
- avoid/conflict keywords
- category mappings
- gender-aware relevance
- location-aware relevance

### 2. Brand Bank

Purpose:

- track which brands are reasonable for which categories and profiles

Contains:

- brand name
- category relevance
- keyword associations
- audience relevance
- location relevance
- popularity score
- trend freshness
- source

Important:

- gender-aware differences are allowed where they are real
- mainstream defaults should stay broad until direct user evidence narrows them

### 3. Product Bank

Purpose:

- store verified exact products only

Contains:

- category
- primary keyword
- descriptor keywords
- brand
- product title
- exact PDP URL
- exact product image URL
- exact price
- scraped description
- exact-product confidence
- bank source
- row state
- verification timestamps

## Trend and Popularity Growth

The system should continuously improve its brand and product coverage, but only through staged ingestion.

Sources may include:

- TikTok Shop trending products
- TikTok/social trend mentions
- retailer best sellers
- category-specific trending collections
- public popularity lists

These should feed a staging pipeline, not the live recommendation engine directly.

Trend ingestion stages:

1. ingest candidate products and brands
2. normalize names and categories
3. dedupe against existing brand and product banks
4. verify relevance to category
5. scrape exact PDP data
6. verify image/link/price/title truth
7. promote only good rows to the shared banks

Trend data should never bypass verification.

## Legacy Retirement Plan

Legacy recommendation code should not remain a runtime fallback.

The retirement sequence should be:

1. freeze legacy behavior
2. finish the new category-aware engine
3. deploy and validate the new engine remotely
4. remove frontend fallback to legacy
5. block new writes to legacy recommendation tables
6. migrate or archive any still-needed shared data
7. delete legacy recommendation runtime code

Legacy should remain only long enough to support migration and rollback.

It should not continue making live user recommendations.

## Execution Phases

### Phase 1: Scoring and Gating

- add per-category evidence scoring
- add global evidence scoring
- define category readiness states
- make recommendation count depend on confidence

### Phase 2: Planner Rewrite

- stop forcing unsupported categories
- plan recommendations by category readiness
- use popular fallback only for locked categories
- use AI only for unlocked categories

### Phase 3: Brand and Keyword Intelligence

- normalize keyword bank
- normalize brand bank
- map brands and keywords to categories
- add gender-aware and location-aware relevance

### Phase 4: Product Truth Rewrite

- harden exact-product scrape verification
- harden image verification
- reject texture, lifestyle, fabric, logo, and broken-image candidates
- downgrade weak bank rows

### Phase 5: Product-Bank Lifecycle

- add row states
- add reverification
- add stale-row cleanup
- add source labeling

### Phase 6: Frontend Honesty

- make card truth reflect verification truth
- stop showing exact product states for weak rows
- show category learning state when a category is still locked

### Phase 7: Legacy Shutdown

- deploy new engine
- switch the page to new engine only
- delete legacy runtime path

## Definition Of Done

This overhaul is done only when all of these are true:

- recommendations are category-aware
- AI turns on only where evidence exists
- sparse categories stay in popular fallback mode
- no live runtime depends on legacy recommendation code
- exact product cards require verified image, link, title, and price
- bad shared-bank rows are reverified or removed
- the page can explain why a recommendation appeared
- recommendation count scales with evidence instead of page expectations
