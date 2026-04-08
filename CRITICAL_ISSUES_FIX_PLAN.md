# Fix It Plan

This is the consolidated fix plan for the repo.

It replaces the scattered "what still needs to happen" material from the audit and planning docs with one prioritized implementation list.

Read `NEXT_CHAT_HANDOFF.md` first, then use this file to choose and sequence work.

## Scope

This document covers:

- launch-critical issues
- product-critical behavior issues
- security and ownership fixes
- structural cleanup that is still important after launch blockers

This document does not treat already-isolated dev/test leftovers as equal priority to live product and data integrity problems.

## Priority Order

Work in this order unless the user explicitly redirects.

### P0: Protect live product behavior

1. `My Go Two` startup/load/state stabilization
2. auth/session guard simplification and login-bounce prevention
3. invite/connect completion, especially token handoff
4. edge auth standardization for active functions
5. ownership hardening for shared/global tables

### P1: Fix live operator and user flows

6. `PhotoGallery.tsx` simplification and source-of-truth clarity
7. storage bucket privacy vs resolver alignment
8. recommendations trust/persistence gaps
9. dashboard/settings/questionnaires overload reduction

### P2: Cleanup and durability

10. stale or misleading docs and status files
11. corrupted unicode/user-facing copy cleanup
12. tests for critical flows
13. rationalize dead/legacy schema and function surfaces

## P0: My Go Two Startup, Loading, And State

### Why this is first

This is the most protected surface in the repo and the handoff repeatedly treats it as business-critical.

### What must be preserved

1. 8 preview strips remain in both states
2. only labeled category strips grow on hover
3. collapsed state shows only preview strips
4. rotation only runs while collapsed
5. 5-image collapse bank stays separate
6. clicking a category opens an in-place full-stage panel
7. assigned images only
8. separate strip image and detail/card image support

### Fixes required

1. Tighten route-level startup so the stage settles faster.
2. Validate preview-to-full swap behavior category by category.
3. Keep loader exit tied to a real usable stage, not "everything is done".
4. Keep collapse warm-loading from fighting initial interactivity.
5. Audit state transitions between hover, collapse, open category, and background asset warm-up.
6. Ensure failed transformed images are diagnosable, not silently mysterious.

### Progress

- Done: removed the redundant page-level auth gate from `src/pages/dashboard/MyGoTwo.tsx` so the dashboard shell is the single guard authority.
- Done: changed the stage hydrator to keep already-loaded preview strips visible when a full transformed strip image misses.
- Done: added strip-level diagnostics when a full transformed image falls back instead of silently blanking.
- Done: added a dev-only runtime notice for `My Go Two` strip fallback events so local verification exposes transform failures without changing the production stage behavior.
- Done: centralized the active `My Go Two` gender key so the stage loader and the live slot editor query the same source instead of duplicating `"male"` in separate files.
- Remaining: category-by-category visual validation and any further loader tuning that shows up during real browser review.

### Files

- `src/pages/dashboard/MyGoTwo.tsx`
- `src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx`
- `src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts`
- `src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts`

## P0: Auth, Session, And Guard Lifecycle

### Why this is critical

The audits consistently point here as the likely source of login bounce and route instability.

### Problems to solve

1. duplicated guarding between `DashboardLayout` and leaf pages
2. auth boot mixed with subscription state
3. multiple auth entrypoints:
   - native Supabase auth
   - Lovable OAuth bridge
   - dev login
4. interval-based subscription checks adding noise to auth lifecycle

### Fixes required

1. Make one dashboard guard authority.
2. Remove redundant leaf-route redirects where safe.
3. Separate "auth resolved" from "subscription known".
4. Keep dev login stable and avoid session invalidation regressions.
5. Add temporary diagnostic logging around:
   - auth state changes
   - redirect decisions
   - refresh failures
   - subscription check outcomes
6. Re-test login, refresh, and route transitions visually in the real dashboard.

### Progress

- Done: removed the redundant `My Go Two` leaf guard so the dashboard shell owns that route.
- Done: stabilized subscription state for cache-hit/dev-override/sign-out paths so stale `subscriptionLoading` does not linger across session changes.
- Done: replaced the 60-second global subscription poll with explicit refresh plus foreground revalidation when the app becomes active again.
- Done: added opt-in auth diagnostics in `AuthContext` behind `localStorage.gotwo_debug_auth = "1"` so login/session/subscription churn can be traced without changing live behavior by default.
- Done: extended the opt-in auth diagnostics into `Login.tsx` and `DashboardLayout.tsx` so redirect decisions and invite handoff outcomes are traceable during real browser testing.
- Done: Google and Apple OAuth now return to the current auth entry URL instead of always dropping users at the site root, which preserves invite/deep-link context through the external auth round-trip.
- Done: `/login` and `/signup` now redirect already-authenticated users back into the real post-auth flow instead of leaving them stranded on an auth-entry page, using a shared destination resolver.
- Done: frontend dev-login and dev-subscription override checks now use one shared allowlist helper so those protected operator paths do not drift between `Login.tsx` and `AuthContext.tsx`.
- Done: auth completion, invite completion, and sign-out redirects now replace browser history entries so back-navigation does not bounce users into stale `/login` or `/connect` pages after session state changes.
- Done: the notifications page now waits for subscription resolution before showing the Premium lock state, so subscribed users do not get a false locked screen during auth/subscription settle.
- Done: the recommendations page now waits for subscription resolution before choosing between guest and Premium behavior, preventing a brief false downgraded state for subscribed users.
- Done: the `Know Me` page now holds its existing loading state until subscription resolution finishes, so paid users do not briefly fall into free-tier question limits during auth settle.
- Done: dashboard-home connection gating now waits for subscription resolution before showing the multi-connection Premium lock or opening the add flow, preventing both false locks and false temporary access while auth settles.
- Remaining: wider auth/subscription lifecycle separation and visual pass across login/refresh transitions.

### Files

- `src/contexts/AuthContext.tsx`
- `src/contexts/auth-context.ts`
- `src/layouts/DashboardLayout.tsx`
- `src/pages/Login.tsx`
- `src/integrations/lovable/index.ts`
- `src/integrations/supabase/client.ts`
- `supabase/functions/check-subscription/index.ts`
- `supabase/functions/dev-login/index.ts`

## P0: Invite / Connect Completion

### Why this is critical

This is a core product loop and is currently incomplete for token-based logged-out flows.

### Current documented issue

- `gotwo_invite` is consumed post-login
- `gotwo_invite_token` is stored but not cleanly consumed post-login

### Fixes required

1. Choose one canonical post-login invite processing path.
2. Support both inviter-based and token-based handoff cleanly.
3. Expire and clean localStorage invite keys intentionally.
4. Re-test:
   - logged in + inviter link
   - logged out + inviter link
   - logged in + token link
   - logged out + token link
5. Keep user messaging explicit when invite processing is pending or failed.

### Progress

- Done: `DashboardLayout` now consumes both `gotwo_invite` and `gotwo_invite_token`, prefers token handoff first, and clears invite keys intentionally after processing.
- Done: post-login token handoff now shows the correct pending-invite messaging and surfaces invalid/expired token errors instead of silently swallowing them.
- Done: `Login.tsx` and `Signup.tsx` now persist direct `?token=` invite entries into `gotwo_invite_token` so token-based handoff survives auth entry routes instead of only working through `/connect`.
- Done: login now routes pending-invite sign-ins into the dashboard shell (`/dashboard/settings`) so the stored invite/token handoff actually executes instead of getting stranded on onboarding first.
- Done: Settings now exposes the native invite share sheet alongside QR/email so the existing link flow can be sent through text/phone/WhatsApp on supported devices.
- Done: `DashboardLayout` now skips duplicate invite handoff re-processing for the same stored invite/token payload, which avoids accidental double-link attempts while auth/layout state is settling.
- Remaining: full visual retest across all inviter/token logged-in/logged-out entry combinations.

### Files

- `src/pages/Connect.tsx`
- `src/pages/Login.tsx`
- `src/layouts/DashboardLayout.tsx`
- `supabase/functions/searchforaddprofile/index.ts`

## P0: Edge Auth Strategy

### Why this is critical

The repo mixes platform JWT verification, manual auth checks, `verify_jwt = false`, and service-role operations.

### Active risk pattern

- a missed check can expose a destructive or expensive endpoint
- service-role functions amplify mistakes

### Fixes required

1. Default active functions to verified JWT unless there is a deliberate exception.
2. Standardize one internal auth/validation wrapper pattern.
3. Classify functions as:
   - public by design
   - authenticated user
   - admin/operator only
   - dev/test only
4. Audit every function using `verify_jwt = false`.
5. Tighten CORS for production-sensitive endpoints.
6. Remove or explicitly quarantine empty and unwired edge surfaces.

### Highest-risk functions

- `supabase/functions/searchforaddprofile/index.ts`
- `supabase/functions/sync-category-registry/index.ts`
- `supabase/functions/check-subscription/index.ts`
- `supabase/functions/create-checkout/index.ts`
- `supabase/functions/customer-portal/index.ts`
- `supabase/functions/ai-products/index.ts`

### Files

- `supabase/config.toml`
- `supabase/functions/*`

### Progress

- Done: `ai-products`, `create-checkout`, and `customer-portal` now require verified JWTs at the platform layer in `supabase/config.toml`, matching their already-authenticated caller flows instead of leaving them publicly invokable by mistake.
- Remaining: `check-subscription`, `searchforaddprofile`, `sync-category-registry`, `ai-quizzes`, and `trending-feed` still need explicit classification and hardening decisions before changing their JWT mode.

## P0: Shared / Global Table Ownership

### Why this is critical

Several tables behave like shared editorial or global truth but are too writable for that role.

### Most important ownership fixes

1. `resolved_recommendation_catalog`
2. `category_registry`
3. `category_images`
4. any other global/editorial assignment tables still in live use

### Fixes required

1. Decide the owner for each shared/global table.
2. Restrict writes to service-role or controlled admin/RPC paths where appropriate.
3. Keep broad reads only where product truly needs them.
4. Verify a normal authenticated user cannot mutate shared/global truth accidentally.

### Files and areas

- `supabase/migrations/*`
- `supabase/functions/ai-products/index.ts`
- `supabase/functions/sync-category-registry/index.ts`
- runtime flows consuming those tables

## P1: Photo Gallery Simplification

### Why this matters

`PhotoGallery.tsx` edits live `My Go Two` slot assignments and is overloaded enough to confuse operators.

### Current good direction

- `category_images` is the live slot-mapping table
- `storage://bucket/path` is the storage contract
- separate strip and card/detail images are valid

### Fixes required

1. Simplify the operator experience around slot assignment.
2. Reduce first-load image work.
3. Reduce button clutter.
4. Separate assignment workflow from bank browsing/debug controls.
5. Make delete semantics explicit and safe.
6. Keep manual cleanup support, but move it behind clearer operator intent.
7. Make gender handling explicit in helpers instead of silently broad.

### Files

- `src/pages/PhotoGallery.tsx`
- `src/lib/imageOverrides.ts`
- `src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts`
- `src/lib/storageRefs.ts`

## P1: Storage Policy And Resolver Alignment

### Why this matters

The audits repeatedly flagged drift between bucket privacy in migrations and frontend resolver assumptions.

### Known issue shape

- frontend uses `PRIVATE_BUCKETS`
- migrations and runtime bucket privacy can drift
- the result is environment-dependent broken images

### Fixes required

1. Make bucket privacy classification come from one source of truth.
2. Align `storageRefs.ts` with actual active bucket policy.
3. Verify `photo-bank` and `images-mygotwo-strip` behavior explicitly.
4. Add better diagnostics for failed storage ref resolution.
5. Stop relying on "works locally" when bucket privacy is inconsistent.

### Files

- `src/lib/storageRefs.ts`
- storage-related migrations in `supabase/migrations`

## P1: Recommendation System Replacement

### Why this matters

The current recommendation stack is functional enough to keep the live product running, but it is not the long-term architecture.

It currently mixes:

- user preference inputs
- keyword and brand guidance
- curated fallback catalog logic
- exact product resolution
- shared reusable product memory
- weekly user caches
- connection-specific reuse rules
- frontend display fallback behavior

That makes it too easy to keep patching a system that should instead be replaced cleanly.

### Source of truth

Use `RECOMMENDATION_SYSTEM_OVERHAUL_PLAN.md` as the architecture and sequencing guide for this work.

Treat the current recommendation stack as a bridge system until the replacement is built and verified.

### Replacement goals

1. Use all meaningful user input:
   - This or That answers
   - Know Me answers
   - product cards
   - birthday / anniversary / location
   - explicit likes
   - explicit dislikes
   - future category cards
2. Remove frontend image-bank behavior from the final recommendation product flow.
3. Separate keyword intelligence from exact reusable product records.
4. Keep user-specific weekly output separate from the shared product bank.
5. Store only exact confirmed product rows in the shared reusable bank.

### Replacement layers

1. user preference signals
2. recommendation keyword bank
3. recommendation product bank
4. user weekly recommendation output

### Progress

- Done: full top-to-bottom recommendation-path research across frontend, edge functions, helpers, migrations, Knowledge Center inputs, connection context, Firecrawl resolver, and shared/global table roles.
- Done: recommendation saves now persist in `user_preferences.favorites.recommendations`, load back on refresh, and rollback cleanly on failed writes instead of behaving like local-only demo state.
- Done: recommendation share now uses the native share sheet when available and falls back to copying a real share message to the clipboard, so it no longer acts like a toast-only placeholder.
- Done: successful recommendation shares now also persist lightweight share history in `user_preferences.favorites.shared_recommendations`, so the action leaves a durable user-owned artifact instead of disappearing after the device handoff.
- Done: `resolved_recommendation_catalog` writes now run through service-role edge-function clients, and authenticated-user insert/update policies are removed so the shared catalog is no longer directly writable from the client.
- Done: created `RECOMMENDATION_SYSTEM_OVERHAUL_PLAN.md` as the replacement architecture plan.
- Remaining: schema design, input-system contracts, replacement engine implementation, staged cutover, and post-cutover deletion of legacy recommendation code.

### Fixes required

1. Finish the architecture/spec work.
2. Normalize the unfinished input systems:
   - This or That v2
   - Product Cards v2
   - Likes / Dislikes
   - future Category Cards support
3. Build the new keyword-bank and exact-product-bank schema.
4. Build the new recommendation engine beside the current one.
5. Run parallel verification.
6. Cut the frontend over only after the new engine is verified.
7. Delete legacy recommendation code only after cutover.

### Important constraints

1. Do not keep broadening the current recommender with more permanent logic if that same work belongs in the replacement system.
2. Do not delete the live recommender before the replacement exists.
3. Do not treat the current keyword/brand guidance banks as the final exact-product bank.
4. Do not treat `weekly_recommendations` as the shared reusable product bank.

### Files

- `src/pages/dashboard/Recommendations.tsx`
- `supabase/functions/ai-products/index.ts`
- `supabase/functions/ai-connection-products/index.ts`
- `supabase/functions/_shared/knowledgeCenter.ts`
- `supabase/functions/_shared/knowMeCatalog.ts`
- `supabase/functions/_shared/exactProductScraper.ts`
- recommendation-related migrations
- `RECOMMENDATION_SYSTEM_OVERHAUL_PLAN.md`

## P1: Large Overloaded Product Surfaces

### Why this matters

Several pages are too large and mix too many responsibilities, which raises regression risk.

### Main targets

1. `src/pages/dashboard/DashboardHome.tsx`
2. `src/pages/dashboard/SettingsPage.tsx`
3. `src/pages/dashboard/Questionnaires.tsx`
4. `src/pages/dashboard/ConnectionPage.tsx`
5. `src/pages/PhotoGallery.tsx`

### Fixes required

1. Split large pages into bounded feature modules.
2. Reduce boot-time work on dashboard home.
3. Deep-link searches to actual matched destinations instead of generic landings.
4. Separate settings concerns:
   - account
   - connections
   - notifications
   - billing
5. Reduce chatty writes and full refetch loops where possible.

## P1: User-Facing Trust Problems

These are not always "security critical", but they hurt product trust and should be fixed.

1. Dashboard home demo milestones and placeholder-feeling stock photo behavior
2. non-persistent recommendation actions
3. corrupted unicode copy in user-facing text
4. premium gating that can hide notifications based on unstable subscription state

### Progress

- Done: fixed corrupted user-facing copy on the live Settings, Signup, Forgot Password, Recommendations, and Know Me category-card surfaces so broken placeholder bullets, back-nav labels, timestamp separators, recommendation meta text, and category accents no longer render as mojibake.
- Remaining: internal/admin mojibake still exists in `SponsoredAdmin.tsx` and should be cleaned separately without changing runtime behavior.

## P2: Docs And Status File Cleanup

### Problems

1. too many docs were required to understand the repo
2. some docs are stale, especially `LINT_AUDIT.md`
3. historical audits contain valid detail but are not good operator starting points

### Fixes required

1. Keep `NEXT_CHAT_HANDOFF.md` as the primary operator doc.
2. Keep this file as the unified fix plan.
3. Update or retire stale status docs.
4. If future design/history screenshots remain, keep them in one intentional location with a README.

## P2: Testing And Verification Gaps

### Current issue

Tooling is green, but critical flows are barely tested.

### High-value tests to add

1. auth routing:
   - login -> onboarding vs dashboard
   - session refresh stability
2. invite/connect handoff:
   - inviter and token links
3. My Go Two:
   - preview strips
   - collapse behavior
   - category open behavior
4. Photo Gallery:
   - slot assignment updates live rendering
5. storage ref resolution:
   - public vs private bucket behavior

## P2: Legacy Surface Rationalization

These are not the first fixes, but they should be cleaned deliberately.

1. old or duplicate schema layers around assets
2. empty or unwired edge function directories
3. historical admin tooling that is no longer part of the active runtime
4. duplicate or bespoke card implementations that drift from the generic path

## Completed / Already Handled

These items no longer need to stay on the active fix list.

1. dev login password-reset session invalidation was fixed by switching to magic-link session generation
2. legacy carousel test route/page was removed
3. several dead repo-root screenshots and generated artifacts were removed
4. several clearly unused assets/utilities/components were removed
5. broad active asset buckets were reviewed enough to confirm they are not safe bulk-delete targets

## Working Rule For Future Changes

For any implementation in this plan:

1. change the smallest safe surface first
2. keep the live user-facing behavior intact
3. verify visually on the real page
4. run lint/build when code paths justify it
5. update `NEXT_CHAT_HANDOFF.md` when a material rule or status changes
