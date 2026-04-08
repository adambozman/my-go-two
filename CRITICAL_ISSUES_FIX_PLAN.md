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
- Done: Settings now exposes the native invite share sheet alongside QR/email so the existing link flow can be sent through text/phone/WhatsApp on supported devices.
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

## P1: Recommendations Trust And Persistence

### Why this matters

Recommendations are user-facing and currently have "demo-feeling" gaps.

### Current documented gaps

1. `save` is local-only
2. `share` is toast-only
3. `resolved_recommendation_catalog` is too writable
4. product image behavior is mixed between resolved URLs and local banks

### Fixes required

1. Decide what save/share really means and persist it.
2. Tighten the global catalog ownership boundary.
3. Keep weekly caching, but make the trust boundary real.
4. Normalize how recommendation images are sourced.

### Files

- `src/pages/dashboard/Recommendations.tsx`
- `supabase/functions/ai-products/index.ts`
- recommendation-related migrations

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
