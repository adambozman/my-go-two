# Recommendation Execution Checklist

This is the working checklist for the live recommendation rebuild.

Use this file as the execution tracker while implementing the next 10 recommendation fixes.

Status key:

- `[ ]` not started
- `[-]` in progress
- `[x]` completed

## Ground Rules

- Keep the live page stable while changing backend logic.
- Recommendation quality and exact-product quality are separate problems and must be scored separately.
- Sparse profiles must not be forced into a full 12-card weekly set.
- Exact product rows must not enter the shared bank unless the link, image, title, and price are verified strongly enough.
- All trend and social ingestion must stage first, not write directly into live recommendations.

## Execution Order

### 1. Recommendation Match Confidence

Status: `[x]`

Goal:

- Add a user-fit confidence score that explains how strongly a recommendation matches the user's real inputs.

Primary targets:

- `supabase/functions/_shared/recommendationSignals.ts`
- `supabase/functions/_shared/recommendationIntentPlanner.ts`
- `supabase/functions/recommendation-engine-v2/index.ts`
- `src/pages/dashboard/Recommendations.tsx`
- `src/test/recommendation-signals.test.ts`
- `src/test/recommendation-intent-planner.test.ts`

Deliverables:

- per-user input-strength scoring
- per-intent recommendation-fit scoring
- confidence included in recommendation payloads

### 2. Sparse-Profile Recommendation Count Throttling

Status: `[x]`

Goal:

- Stop forcing 12 recommendations when the user has weak or incomplete data.

Primary targets:

- `supabase/functions/_shared/recommendationIntentPlanner.ts`
- `supabase/functions/recommendation-engine-v2/index.ts`
- `src/pages/dashboard/Recommendations.tsx`
- `src/test/recommendation-intent-planner.test.ts`

Deliverables:

- adaptive recommendation count by profile depth
- lower-output mode for sparse profiles
- explicit low-signal state for the page

### 3. Exact Verification Hardening

Status: `[x]`

Goal:

- Tighten exact-product admission so image, price, title, and PDP link are verified more strictly before a product is called exact.

Primary targets:

- `supabase/functions/_shared/exactProductScraper.ts`
- `supabase/functions/_shared/recommendationProductBank.ts`
- `src/test/exact-product-scraper.test.ts`
- `src/test/recommendation-product-bank.test.ts`

Deliverables:

- stronger image verification
- stronger PDP verification
- clearer exact failure states

### 4. Product Bank Row States And Reverification

Status: `[x]`

Goal:

- Add explicit product-bank row states and reverification support so broken or stale rows can be downgraded or repaired.

Primary targets:

- `supabase/migrations/*`
- `supabase/functions/_shared/recommendationProductBank.ts`
- `supabase/functions/recommendation-engine-v2/index.ts`

Deliverables:

- bank row state fields
- stale / failed / exact / fallback row states
- reverification timestamps and reason tracking

### 5. Planner Weighting Rewrite

Status: `[x]`

Goal:

- Reduce seed-brand dominance and make user-owned signals carry more weight than defaults.

Primary targets:

- `supabase/functions/_shared/recommendationIntentPlanner.ts`
- `supabase/functions/_shared/recommendationSignals.ts`
- `supabase/functions/_shared/recommendationCatalog.ts`
- tests under `src/test`

Deliverables:

- heavier weighting for explicit user signals
- softer fallback behavior
- contradiction penalties

### 6. Product Bank And Brand Bank Redesign

Status: `[x]`

Goal:

- Extend the shared banks so they support product state, source tracking, trend staging, and better downstream filtering.

Primary targets:

- `supabase/migrations/*`
- `supabase/functions/recommendation-engine-v2/index.ts`
- `supabase/functions/_shared/recommendationProductBank.ts`
- `supabase/functions/_shared/recommendationCatalog.ts`

Deliverables:

- source metadata fields
- recommendation-fit confidence fields
- seed vs observed vs trend structure

### 7. Trend-Ingestion Staging Pipeline

Status: `[x]`

Goal:

- Create a staging path for continuously growing the product and brand banks from trend sources like social, TikTok Shop, retailer best sellers, or manual imports.

Primary targets:

- `supabase/migrations/*`
- new edge functions under `supabase/functions/`
- optional docs/tests

Deliverables:

- trend candidate staging tables
- ingestion / normalization function
- promotion rules into live banks

### 8. Explainability Payloads

Status: `[x]`

Goal:

- Make every recommendation internally explainable.

Primary targets:

- `supabase/functions/recommendation-engine-v2/index.ts`
- `src/pages/dashboard/Recommendations.tsx`
- tests under `src/test`

Deliverables:

- explanation payload per recommendation
- matched signals summary
- bank hit vs scrape info
- fit confidence reason data

### 9. Bank Cleanup And Re-score Path

Status: `[x]`

Goal:

- Add a trusted cleanup path for rescore, reverify, and state repair of existing bank rows.

Primary targets:

- new edge functions under `supabase/functions/`
- `supabase/functions/_shared/recommendationProductBank.ts`
- migrations if needed

Deliverables:

- rescore path for existing rows
- stale/broken row cleanup
- safe revalidation job path

### 10. Cutover Safeguards

Status: `[x]`

Goal:

- Keep the live product safe while the rebuilt engine becomes the real source of truth.

Primary targets:

- `src/pages/dashboard/Recommendations.tsx`
- `supabase/functions/recommendation-engine-v2/index.ts`
- `NEXT_CHAT_HANDOFF.md`
- `CRITICAL_ISSUES_FIX_PLAN.md`

Deliverables:

- explicit fallback behavior
- safer version/cutover reporting
- final deprecation path for legacy recommendation behavior

## Notes

- Recommendation count should scale with signal quality, not a hard constant.
- The current live trust gap is still strongest in exact-image admission and sparse-profile overreach.
- Trend ingestion must stay staged and reviewed before it influences the live weekly recommender.
- Completed implementation files include:
  - `supabase/functions/recommendation-engine-v2/index.ts`
  - `supabase/functions/_shared/recommendationSignals.ts`
  - `supabase/functions/_shared/recommendationIntentPlanner.ts`
  - `supabase/functions/_shared/exactProductScraper.ts`
  - `supabase/functions/_shared/recommendationProductBank.ts`
  - `supabase/functions/_shared/recommendationTrendPipeline.ts`
  - `supabase/functions/recommendation-bank-maintenance/index.ts`
  - `supabase/functions/recommendation-trend-pipeline/index.ts`
  - `supabase/migrations/20260409004000_recommendation_bank_states_and_trend_staging.sql`
- Live cutover remains protected:
  - the page still falls back to `ai-products` when `recommendation-engine-v2` is unavailable
  - dev-only diagnostics expose explainability without cluttering the customer view
  - trend candidates must stage first and only promote through the trusted pipeline
