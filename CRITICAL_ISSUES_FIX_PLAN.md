# Critical Issues Fix Plan

This is the second handoff-adjacent document.

It exists to isolate the real critical issues from the broader repo audit noise.

This document intentionally uses product context:
- demo/test utilities are not treated as launch blockers if they are clearly isolated, clearly named, and removed or disabled before launch
- `seed-demo-profiles` falls into that bucket and is not the point of this plan
- this plan focuses only on issues that matter to launch stability, data integrity, security posture, and real product behavior

The main handoff document is still:
- [NEXT_CHAT_HANDOFF.md](/Users/adamb/Documents/GitHub/my-go-two/NEXT_CHAT_HANDOFF.md)

## Scope

This plan covers only the critical issues discussed after the repo-wide audits:

1. image system update / source-of-truth cleanup
2. `resolved_recommendation_catalog`
3. edge auth strategy
4. auth/session lifecycle
5. incomplete invite/connect flow
6. shared table ownership boundaries

## Not Critical In This Plan

These may still be worth cleaning up, but they are not treated as launch-critical here:

- `seed-demo-profiles` if it stays a clearly isolated test/demo utility and is deleted or disabled before launch
- general repo artifact cleanup
- empty function folders
- old screenshots in repo root
- broader schema cleanup not currently wired into live flows
- test/dev tools that are clearly dev-only

## Critical Issue 1: Image System Update

### Problem

The repo has too many overlapping image and asset assignment systems:

- `category_images`
- `category_bank_photos`
- `website_asset_assignments`
- `dev_asset_image_overrides`
- multiple buckets and historical image flows

The current live `My Go Two` path is understandable, but the overall system is still too easy to misread or update incorrectly.

### Why It Is Critical

- operators can easily fix the wrong layer
- image behavior can differ by environment because storage assumptions are not centralized enough
- launch-time debugging becomes slower because there is not one obvious source of truth

### Current Preferred Direction

For live `My Go Two` image wiring:

- storage file is the actual image source
- `category_images` is the active mapping table
- `storage://bucket/path` is the image reference contract

### Fix Plan

1. Declare one live image system for `My Go Two`.
   - Keep `category_images` as the active slot-mapping table.
   - Keep `storage://...` refs as the storage contract.
2. Mark every other image assignment path as one of:
   - legacy
   - unused
   - future
3. Add a short internal contract doc section that names:
   - active table
   - active bucket(s)
   - active runtime loader
   - inactive legacy systems
4. Remove runtime dependence on any legacy table that is no longer needed.
5. Keep the separate `Small` / `Card` / repeat-image model now that the editor supports it.

### Files / Areas

- [src/pages/PhotoGallery.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/PhotoGallery.tsx)
- [src/lib/imageOverrides.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/imageOverrides.ts)
- [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)
- [src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts)
- [src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts)
- related legacy migrations under [supabase/migrations](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations)

## Critical Issue 2: `resolved_recommendation_catalog`

### Problem

The audit flagged `resolved_recommendation_catalog` as too open for mutation relative to its role as a shared/global recommendation cache.

### Why It Is Critical

- if it is a shared/global recommendation resolution layer, it should not be easy for ordinary authenticated traffic to poison it
- recommendation quality and trust degrade fast if the cache layer is writable too broadly

### Fix Plan

1. Decide what `resolved_recommendation_catalog` is:
   - shared/global cache
   - per-user helper
   - internal recommendation resolution store
2. If it is shared/global, restrict writes to:
   - service role only
   - or one tightly controlled edge/RPC path
3. Leave read access as broad only if that is truly needed.
4. Route all writes through one controlled backend layer.
5. Add one verification query/check during testing to confirm a normal authenticated user cannot mutate the global catalog directly.

### Files / Areas

- [supabase/migrations](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations)
- [supabase/functions/ai-products/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/ai-products/index.ts)
- recommendation frontend flows in [src/pages/dashboard/Recommendations.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/Recommendations.tsx)

## Critical Issue 3: Edge Auth Strategy

### Problem

The repo mixes:

- platform-level verification
- `verify_jwt = false`
- custom/manual auth checks inside functions

That means security behavior is inconsistent across edge functions.

### Why It Is Critical

- a single missed auth check becomes a public mutation path
- service-role usage makes mistakes much more dangerous
- launch confidence is low when each function has its own security style

### Fix Plan

1. Create one edge auth policy decision:
   - default to verified JWT
   - only disable platform verification when there is a very explicit reason
2. Standardize one internal guard pattern for every edge function:
   - CORS
   - env access
   - auth parsing
   - explicit authorization rules
   - error shape
3. Audit every function currently using `verify_jwt = false`.
4. Split functions into:
   - public by design
   - authenticated user
   - admin/operator only
   - dev/test only
5. For admin/operator/dev functions, require explicit gates, not assumptions.

### Files / Areas

- [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml)
- all active functions under [supabase/functions](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions)
- especially:
  - [searchforaddprofile/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/searchforaddprofile/index.ts)
  - [sync-category-registry/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/sync-category-registry/index.ts)
  - [check-subscription/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/check-subscription/index.ts)
  - [create-checkout/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/create-checkout/index.ts)
  - [customer-portal/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/customer-portal/index.ts)

## Critical Issue 4: Auth / Session Lifecycle

### Problem

The frontend auth/session lifecycle appears too fragile:

- duplicated or layered guarding
- session boot and redirect timing
- subscription polling tied into auth
- OAuth session bridging as another variable

### Why It Is Critical

- this is the area most likely connected to the login bounce / repeated sign-in symptom
- even if the backend auth is valid, poor frontend lifecycle handling can make the app feel broken

### Fix Plan

1. Make one route-guard authority for dashboard auth.
   - avoid duplicated guard behavior where possible
2. Separate auth boot from subscription state.
   - auth should settle first
   - subscription should not be the thing destabilizing route access
3. Audit OAuth bridge flow carefully.
   - verify token/session shape
   - verify refresh behavior
   - verify redirect return path behavior
4. Add temporary diagnostic logging for:
   - auth state changes
   - redirect decisions
   - session refresh failures
   - subscription check outcomes
5. Re-test the exact bounce flow after simplifying guard responsibility.

### Files / Areas

- [src/contexts/AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- [src/contexts/auth-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts)
- [src/layouts/DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)
- [src/pages/Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx)
- [src/integrations/lovable/index.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/lovable/index.ts)
- [src/integrations/supabase/client.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/client.ts)

## Critical Issue 5: Incomplete Invite / Connect Flow

### Problem

The invite/connect system is structurally incomplete:

- `gotwo_invite` is consumed
- `gotwo_invite_token` is stored but not cleanly consumed after login

### Why It Is Critical

- users can hit inconsistent connection outcomes depending on where they enter the flow and whether they are already logged in
- broken connection onboarding undermines a core product loop

### Fix Plan

1. Pick one canonical post-login invite processing path.
2. Support both:
   - inviter-based flow
   - token-based flow
3. Remove any localStorage handoff key that is not truly used.
4. Add explicit expiration/cleanup for invite handoff keys.
5. Re-test all four cases:
   - logged in + inviter link
   - logged out + inviter link
   - logged in + token link
   - logged out + token link

### Files / Areas

- [src/pages/Connect.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Connect.tsx)
- [src/pages/Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx)
- [src/layouts/DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)
- [supabase/functions/searchforaddprofile/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/searchforaddprofile/index.ts)

## Critical Issue 6: Shared Table Ownership Boundaries

### Problem

Some shared/editorial tables are being treated too much like ordinary user-editable data.

This is related to edge auth, but it is its own problem: even if edge auth improves, the table ownership model still needs to be correct.

### Why It Is Critical

- global or editorial truth should not be broadly writable
- if those tables define live app behavior, their ownership rules need to reflect that

### Fix Plan

1. Identify every table that is:
   - user-owned
   - connection-shared
   - global/editorial
   - admin/operator managed
2. Tighten RLS to match that ownership model.
3. Move global/editorial writes through one controlled admin/backend path.
4. Confirm that live app behavior uses the intended ownership model and not leftover broad permissions.

### Most Likely Tables To Review First

- `category_registry`
- `category_images`
- `resolved_recommendation_catalog`
- any asset assignment table that still participates in live flows

### Files / Areas

- [src/integrations/supabase/types.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/types.ts)
- related policy migrations under [supabase/migrations](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations)

## Recommended Fix Order

If this is handled as a focused launch-stability sprint, the order should be:

1. edge auth strategy
2. shared table ownership boundaries
3. `resolved_recommendation_catalog`
4. auth/session lifecycle
5. invite/connect flow
6. image system update / cleanup

Reason:
- auth and ownership mistakes can cause the highest damage
- session lifecycle affects whether the app even feels usable
- image system cleanup is important, but safer once the security and flow boundaries are clearer

## Verification Checklist

A fix is not complete until these are true:

- ordinary authenticated traffic cannot mutate global/editorial data directly unless intended
- edge functions have a consistent auth posture
- login and dashboard navigation no longer bounce unexpectedly
- inviter link and token link both work whether the user starts logged in or logged out
- `My Go Two` and `PhotoGallery` are using one declared active image wiring system
- recommendation catalog writes are controlled and intentional

## Resume Rule

If the next chat resumes from this document:

1. use this file for critical-only planning
2. use [NEXT_CHAT_HANDOFF.md](/Users/adamb/Documents/GitHub/my-go-two/NEXT_CHAT_HANDOFF.md) for full product and My Go Two context
3. do not treat demo/test utilities as critical launch blockers unless they are still exposed in live launch paths
