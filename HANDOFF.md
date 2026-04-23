# Go Two — Master Handoff

**April 2026 · Single source of truth for all Codex sessions.**

This file replaces all prior planning docs:
- `NEXT_CHAT_HANDOFF.md`
- `CRITICAL_ISSUES_FIX_PLAN.md`
- `MY_GO_TWO_OVERHAUL_PLAN.md`
- `RECOMMENDATION_SYSTEM_OVERHAUL_PLAN.md`
- `RECOMMENDATION_SYSTEM_BUILD_SPEC.md`
- `RECOMMENDATION_EXECUTION_CHECKLIST.md`
- `RECOMMENDATION_DECISION_HIERARCHY.md`
- `RECOMMENDATION_INTELLIGENCE_OVERHAUL_PLAN.md`
- `THIS_OR_THAT_V2_CONTENT_CONTRACT.md`
- `LINT_AUDIT.md`

All of those files are now superseded. Read this one.

---

## Current State Snapshot

### Infrastructure

| Area | Status | Notes |
|---|---|---|
| Supabase project | ✅ Done | xpxedmasobzrjigtxtms — all 96 migrations, all 20 edge functions |
| Vercel deployment | ✅ Done | https://my-go-two.vercel.app — SPA rewrite working |
| Custom domain mygotwo.com | ⏳ Pending | GoDaddy DNS not yet pointed at Vercel |
| Lovable — removed | ✅ Done | Zero Lovable dependencies remain anywhere |
| Google Gemini AI pipeline | ✅ Done | All edge functions use direct Gemini API |
| Google + Apple OAuth | ⏳ Pending | Code wired, providers not enabled in Supabase Auth dashboard |

### Product

| Area | Status | Notes |
|---|---|---|
| Onboarding — new architecture | ✅ Done | 7-screen flow, AI generator, 3 new cache tables |
| Vibe derivation | ✅ Done | Consumes new signals, outputs persona + price_tier |
| Recommendation engine v2 | ✅ Done | Confidence scoring, spend anchors, Gemini function calling |
| This or That v2 → rec engine | ⏳ Pending | Signal handoff to rec engine incomplete |
| Product cards — 8 of 9 categories | ❌ Broken | templateSubtypes.ts is a shell. Only Beverages works. |
| imageResolver.ts | ❌ Broken | Deleted by Codex. Card images don't load. |
| Freemium gate | ⏳ Pending | No gate exists. All AI runs freely right now. |
| Stripe | ⏳ Pending | STRIPE_SECRET_KEY not set. No checkout. |

---

## Infrastructure Reference

### Endpoints

| Key | Value |
|---|---|
| GitHub | adambozman/my-go-two (public, main branch) |
| Production URL | https://my-go-two.vercel.app |
| Custom domain (pending) | https://mygotwo.com |
| Supabase project ref | xpxedmasobzrjigtxtms |
| Supabase URL | https://xpxedmasobzrjigtxtms.supabase.co |
| Supabase publishable key | sb_publishable_TTzwQKzlVYvlhHwMGMBWNw_J1eOQKvS |
| Gemini key name | GoTwo (restricted to Gemini API) |
| Google project ID | gen-lang-client-0257090988 |

### Supabase Secrets

| Secret | Status |
|---|---|
| GEMINI_API_KEY | ✅ Set |
| SUPABASE_ANON_KEY / SERVICE_ROLE_KEY / URL | ✅ Auto-set |
| SITE_URL | ❌ NOT SET — set to https://mygotwo.com after DNS goes live |
| FIRECRAWL_API_KEY | ❌ NOT SET |
| STRIPE_SECRET_KEY | ❌ NOT SET |

### Custom Domain — Steps Remaining

1. Vercel → project settings → Domains → add `mygotwo.com` and `www.mygotwo.com`
2. Vercel shows required DNS records (A record for apex, CNAME for www)
3. GoDaddy DNS manager → add those records
4. Set `SITE_URL = https://mygotwo.com` as Supabase secret
5. Supabase Auth → URL Configuration → add `https://mygotwo.com` and `https://www.mygotwo.com` to Redirect URLs

### Dev Login

1. Open `/login`
2. Use `adam.bozman@gmail.com`
3. Login.tsx detects dev email → calls `dev-login` edge function
4. `dev-login` generates magic-link session server-side
5. Client calls `supabase.auth.setSession(...)` → routes to `/onboarding` or `/dashboard`

> **Do not change dev-login to password-based.** It was switched to magic-link specifically to stop session invalidation.

---

## What Was Built — April 2026

### Supabase Migration
- New project `xpxedmasobzrjigtxtms` — all 96 migrations, two patch files added:
  - `20260404000000_prereq_patch_missing_tables.sql`
  - `20260404001000_prereq_functions.sql`

### Lovable — Completely Removed

| Removed | Replacement |
|---|---|
| `src/integrations/lovable/index.ts` | Deleted entirely |
| `@lovable.dev/cloud-auth-js` | Removed from package.json |
| `lovable-tagger` | Removed from package.json |
| `componentTagger()` in vite.config.ts | Removed |
| GoogleSignInButton — Lovable OAuth | `supabase.auth.signInWithOAuth` directly |
| AppleSignInButton — Lovable OAuth | `supabase.auth.signInWithOAuth` directly |
| searchforaddprofile — Lovable email API | Supabase Auth admin API |
| All edge functions — ai.gateway.lovable.dev | Direct Google Gemini via `gemini.ts` |

### Google Gemini Pipeline

Shared helper: `supabase/functions/_shared/gemini.ts`

Gemini auth source of truth: Supabase edge-function secret `GEMINI_API_KEY` only (no embedded fallbacks).

Exports: `callGemini`, `callGeminiWithTool`, `callGeminiForImage`

| Edge function | Model |
|---|---|
| recommendation-engine-v2, vibe derivation, ai-card-fields, ai-autofill, ai-quizzes, style-chat | gemini-2.5-flash-preview-04-17 |
| trending-feed | gemini-2.0-flash-lite |
| generate-card-image | gemini-2.0-flash-preview-image-generation |
| onboarding-ai-generator | gemini-1.5-flash |

### New Onboarding Architecture
- `src/lib/profileQuestions.ts` — 7-screen architecture, new question types
- 3 new tables: `onboarding_response_cache`, `onboarding_ai_cache`, `onboarding_session_state`
- `onboarding-ai-generator` — cache-first, Gemini on miss
- `generateYourVibeDerivation` — updated signal intake
- `recommendation-engine-v2` — spend anchors, price_tier, Gemini function calling

### Vercel Deployment
- `vercel.json` created and committed (was missing — caused /login 404)
- VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY set in Vercel project settings
- Auto-deploys on push to main

---

## What to Build Next

### 1 — Custom domain (quick)
Complete GoDaddy DNS config per steps above.

### 2 — Product card overhaul
- Define field schemas for all 9 categories in `templateSubtypes.ts`
- Rebuild `imageResolver.ts` — product card images must load
- Wire `ai-card-fields` and `ai-autofill` to card creation UI

### 3 — Freemium gate
> ⚠️ Do not expose AI features publicly until this exists. Real API costs on every call.

- Define subscription tiers (free / premium)
- Add subscription check to shared edge function layer
- Gate: recommendation-engine-v2, ai-card-fields, ai-autofill, ai-quizzes, style-chat, generate-card-image, onboarding-ai-generator
- Build upgrade/paywall UI
- Connect Stripe

### 4 — Google + Apple OAuth
- Supabase Auth dashboard → Providers → enable Google (Client ID + Secret)
- Supabase Auth dashboard → Providers → enable Apple (App ID + Service ID + key)
- Test full round-trip end to end

### 5 — My Go Two category system overhaul (after 1–3)
Target direction:
- Broad category families — not hyper-specific subtype trees
- Reusable entry types inside each family
- Gender parity through imagery and option ordering — not separate hardcoded universes
- Female and non-binary coverage to true parity with male

Phases: A) Inventory and pruning → B) Taxonomy spec → C) Data model plan → D) Male cleanup → E) Female + non-binary completion

---

## Recommendation System — Current State

### Built and deployed
- `recommendation-engine-v2` — confidence scoring, sparse-profile throttling, explainability payloads, Gemini function calling
- Shared helpers: `recommendationSignals.ts`, `recommendationIntentPlanner.ts`, `exactProductScraper.ts`, `recommendationProductBank.ts`, `recommendationTrendPipeline.ts`
- `recommendation-bank-maintenance` — cleanup/rescore path
- `recommendation-trend-pipeline` — staged trend ingestion
- Live page: prefers v2, falls back to `ai-products`

### Still needed
- This or That v2 answer signals → rec engine (persistence layer exists, handoff incomplete)
- Product card signals → rec engine
- Likes / dislikes signals → rec engine
- Retire `ai-products` and `ai-connection-products` only after full v2 verification

### Pipeline stage order (never skip or reverse)
1. Collect user evidence
2. Normalize signals
3. Score input strength (sparse profiles → fewer recs)
4. Decide eligible categories
5. Generate intents (AI only uses eligible categories + supported signals)
6. Reuse shared product bank
7. Resolve exact product (search + scrape)
8. Verify product truth (image + link + price all confirmed)
9. Assemble response
10. Persist (signals, bank rows, and weekly cache separately)

---

## This or That v2 — Content Contract

Categories align to 9 live My Go Two slugs: `clothes`, `personal`, `health`, `gifts`, `dining`, `beverages`, `household`, `entertainment`, `travel`

**Option metadata contract:** `category_slug`, `subcategory_slug`, `entity_kind`, `entity_slug`, `primary_keyword`, `descriptor_keywords`, `avoid_keywords`, `brand_keywords`, `location_keywords`, `weight`

**Rules:**
- Store metadata on each option, not only the question
- Opposite side of each choice populates `avoid_keywords`
- Gender is first-class — do not silently reuse male content for female/non-binary

**Files:**
- `src/data/thisOrThatV2.ts` — blueprints, scaffolding, coverage report
- `src/data/thisOrThatV2Authored.ts` — authored content
- `src/data/thisOrThatV2Persistence.ts` — answer storage

---

## Known Issues

### User-visible broken
- **Product cards 8/9 empty** — `templateSubtypes.ts` has no field definitions
- **imageResolver.ts deleted** — card images do not load
- **Rec engine empty results** — prompt + filtering issue, not fully resolved
- **Google/Apple OAuth buttons fail** — providers not enabled

### Auth
- Duplicate auth guards in leaf pages (MyGoTwo.tsx and others) — likely login bounce contributor
- Auth and subscription state too coupled — should resolve separately
- Enable auth diagnostics: `localStorage.gotwo_debug_auth = "1"`

### Invite / connect
- `gotwo_invite` (inviter-based) — working
- `gotwo_invite_token` (token-based) — needs full retest on logged-out entry paths

### Storage
- `storageRefs.ts` uses hard-coded `PRIVATE_BUCKETS` list — needs single source of truth
- `photo-bank` and `images-mygotwo-strip` are drift-risk buckets

### Security
- `check-subscription`, `searchforaddprofile`, `sync-category-registry` need JWT classification decisions
- `resolved_recommendation_catalog` writes are service-role only — do not reopen client write access

---

## Non-Negotiable Rules

### Build
- Do exactly what was asked. Do not broaden scope.
- User-visible behavior is the source of truth, not build output.
- Verify real pages visually after meaningful changes.
- Reuse the existing local app/browser session — do not spawn new servers.

### My Go Two (inviolable)
- 8 preview strips in both states
- Only labeled category strips grow on hover
- Collapse state: preview strips only, filling the stage, rotating every 10 seconds
- Collapse bank (5 images) is separate from category strip images
- Clicking a category opens an in-place full-stage panel — not a popup or route change
- Strip page renders assigned images only
- Do not redesign the strip concept — only fix behavior

### Code
- Use the existing shared visual system — no custom one-off field boxes
- Do not invent placeholder UI or fake visuals
- Do not revive deleted image-bank flows
- Verify repo state before claiming cleanup is done

### High-risk files — do not modify without tracing active usage
- `src/pages/dashboard/MyGoTwo.tsx`
- `src/platform-ui/web/mygotwo/*`
- `src/pages/PhotoGallery.tsx`
- `src/lib/storageRefs.ts`
- `src/contexts/AuthContext.tsx`
- `src/layouts/DashboardLayout.tsx`
- `src/pages/Connect.tsx`
- `supabase/functions/searchforaddprofile/index.ts`
- `supabase/config.toml`
- `supabase/migrations/*` (shared/global tables and storage buckets)

---

## Key Files Quick Reference

### Pages
| File | What it is |
|---|---|
| `src/pages/Landing.tsx` | Marketing landing page |
| `src/pages/Login.tsx` | Login + dev login detection |
| `src/layouts/DashboardLayout.tsx` | Dashboard shell and main auth gate |
| `src/pages/dashboard/MyGoTwo.tsx` | My Go Two stage |
| `src/pages/dashboard/Recommendations.tsx` | Recommendations |
| `src/pages/PhotoGallery.tsx` | Operator image slot editor |
| `src/pages/Connect.tsx` | Invite / connection handoff |

### AI Edge Functions
| File | What it is |
|---|---|
| `supabase/functions/_shared/gemini.ts` | Shared Gemini client |
| `supabase/functions/_shared/generateYourVibeDerivation.ts` | Vibe derivation |
| `supabase/functions/recommendation-engine-v2/index.ts` | Main rec engine |
| `supabase/functions/onboarding-ai-generator/index.ts` | Onboarding AI |
| `supabase/functions/ai-card-fields/index.ts` | Card field suggestions |
| `supabase/functions/ai-autofill/index.ts` | Card autofill |

### This or That / Know Me
| File | What it is |
|---|---|
| `src/lib/profileQuestions.ts` | Onboarding 7-screen architecture |
| `src/data/thisOrThatV2.ts` | v2 scaffolding + coverage report |
| `src/data/thisOrThatV2Authored.ts` | Authored content |
| `src/data/thisOrThatV2Persistence.ts` | Answer storage |
| `src/data/knowMeQuestions.ts` | Non-This-or-That Know Me bank |

---

## Product Terminology

| Term | Use |
|---|---|
| Go Two | The product. Never "Go-To". |
| Onboarding | First 6–10 question flow |
| Know Me | Ongoing preference question bank |
| This or That | Core swipe-style preference capture |
| Saved Product Card | A structured preference entry (never "vault" in runtime/schema) |
| Connection | A linked person who can see shared preferences |
| Knowledge Center | The derived intelligence layer |
| vault | Experience copy only — not a schema noun |
