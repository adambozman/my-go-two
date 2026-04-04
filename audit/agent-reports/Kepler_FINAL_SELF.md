# Kepler Final Self Audit (Full Repo, Adversarial)

Start time reference (from rolling audit): `2026-04-03T07:31:10-05:00`

Scope constraints honored:
- No source code/config/migration changes performed for this final.
- Synthesis is based on the traced flows and artifacts already documented in `Kepler.md`.

## Executive Summary

This repo works today largely because several critical boundaries are loose, inconsistent, or silently bypassed. The same patterns show up repeatedly: “global tables writable by any authenticated user,” “edge functions using service role with weak/no auth,” “bucket privacy declared one way in migrations and assumed differently in UI,” and “client-side heuristics that delete/warp data to hide upstream instability.”

If this stays a dev-only prototype, you can keep shipping by brute force. If you want “user-ready, business-critical behavior,” you must harden the boundaries: auth/session truth, storage privacy truth, global data ownership, and deletion/seed/sync endpoints. Right now, the architecture is *guilty until proven clean*; it’s overly permissive and relies on luck and environment drift.

## Strongest Findings (Highest Signal)

1. **Unauthenticated destructive service-role endpoints exist.**
   - `sync-category-registry` deletes and reinserts the entire `category_registry` with a service-role client and no auth checks.
   - `searchforaddprofile(action="seed-demo-profiles")` executes with a service-role client even when no `Authorization` header is present.
   These are public “wipe/seed the database” buttons if deployed.

2. **RLS posture includes “authenticated users can do anything” across shared tables.**
   - `resolved_recommendation_catalog`, `category_registry`, `category_images`, `website_asset_assignments`, `image_blocklist`, `category_bank_photos` are effectively mutable by any authenticated user (and some are publicly readable).
   This enables data poisoning and vandalism by any logged-in user.

3. **Storage privacy contract is inconsistent across migrations vs runtime URL resolution.**
   - Migrations create `photo-bank` and `images-mygotwo-strip` as private (`public=false`).
   - Runtime resolver treats only a hard-coded set of buckets as private and signs URLs only for those.
   - My Go Two + Photo Gallery depend on images loading in `<img>` tags; that fails if buckets are truly private and you don’t sign.
   If your environment “works,” it likely works due to drift (manual bucket public toggles), not because the system is sound.

4. **Subscription state is derived from a fragile polling function that lies on auth failures.**
   - `check-subscription` returns HTTP 200 with `{ subscribed:false }` when auth fails (“likely expired token”), conflating “could not authenticate” with “unsubscribed.”
   - Frontend polls this every 60 seconds.
   Subscription is used as a gate for major UI surfaces (Know Me locks, notifications page), so transient auth issues can feel like constant re-login / paywall flicker.

5. **Client-side “sanitization” risks silent data corruption.**
   - Personalization client sanitization is heuristic and can blank out valid AI payloads to hide strange characters rather than validating schema.
   This is “data loss disguised as robustness.”

6. **Connect / invite token flow is half-wired and depends on localStorage as an inter-route message bus.**
   - `gotwo_invite_token` is stored but not consumed post-login in this checkout.
   This causes “invite works only if already logged in” behavior.

## Best Code/Processes (After Pressure-Testing)

1. **Public feed domain uses security-definer RPCs with a coherent view model.**
   - `get_public_feed_items`, `toggle_public_entity_reaction`, follow/unfollow functions provide a stable contract.
   This is closer to a maintainable boundary than most other subsystems here.

2. **`storage://bucket/path` abstraction is the right direction.**
   - Central parsing and resolution is a good boundary idea; the failure is in keeping bucket policy consistent.

3. **`card_entries` as the “vault preference record” is a good fit to product intent.**
   - RLS for owner management and partner read access (accepted couples) is a sane baseline.

4. **My Go Two “preview -> full” staged loading is a legitimate performance technique.**
   - It reduces first-byte weight and gives rapid perceived load.
   The problem is the complexity and the bucket policy mismatch, not the concept.

## Worst Code/Processes

1. **Service-role edge functions with missing/weak auth and `verify_jwt=false`.**
   - `sync-category-registry` and `seed-demo-profiles` are the worst offenders.
   - Several other functions explicitly disable platform JWT verification.

2. **Global shared tables writable by any authenticated user.**
   - `resolved_recommendation_catalog` is a shared “truth” table and is currently open for user writes.
   - Registry/images/assignments/blocklist/bank deletes are too open for anything that aspires to be stable.

3. **Architecture-by-sedimentation in image systems.**
   - Multiple overlapping schemas: `category_images`, `category_bank_photos`, `website_asset_assignments`, `dev_asset_image_overrides`, plus multiple buckets.
   This guarantees confusion and inconsistent behavior over time.

4. **God components and duplicated guard logic.**
   - `DashboardHome.tsx` owns too many unrelated responsibilities.
   - `DashboardLayout` guard + `MyGoTwo` guard is redundant and increases redirect flicker.

## Architecture Strengths

- **Clear product primitives exist** (vault entries, onboarding answers, AI personalization, connections, public publishing).
- **Supabase is leveraged in multiple correct ways** (RLS, realtime, RPC functions, edge functions).
- **There are emerging boundaries** (storage refs, feed RPCs, catalog helpers).

## Architecture Weaknesses

- **Boundary inconsistency** is the defining flaw:
  - auth boundary sometimes in client, sometimes in edge, sometimes in DB.
  - storage privacy boundary differs by layer.
  - “admin” behavior leaks into user-accessible surfaces.
- **Over-reliance on JSONB blobs** without schema validation encourages runtime drift and client heuristics.
- **Dev tooling and product features are entangled** (Photo Gallery / registry sync / demo seeding).

## Dangerous Coupling

- `subscribed` gate is derived from a flaky polling function and drives access/locks across multiple major pages.
- LocalStorage keys (`gotwo_invite`, `gotwo_invite_token`, `gotwo_signup_data`) are used as cross-route state, causing timing-dependent flows.
- Bucket policy is coupled to a hard-coded `PRIVATE_BUCKETS` list in code; migrations can silently invalidate runtime assumptions.
- `searchforaddprofile` multiplexes many actions in one function; changes to one action risk others, and auth requirements per action become murky.

## Redundant Systems (Entropy Drivers)

- **Two question-bank strategies**:
  - static `src/data/knowMeQuestions.ts` (wired)
  - edge `ai-quizzes` + `quiz_question_sets` (unwired/dead)
- **Multiple image banks / assignment schemes**:
  - `category_images` vs `website_asset_assignments` vs `dev_asset_image_overrides` vs `category_bank_photos`
- **Multiple auth “fast paths”**:
  - dev-login + demo seeding + token linking + invite linking, each with special cases.

## Security Risks (Concrete)

1. **Unauthenticated service-role mutation endpoints**:
   - `sync-category-registry` (delete all registry, insert new)
   - `seed-demo-profiles` action in `searchforaddprofile` (creates users/content)
2. **`verify_jwt=false` across multiple functions** increases blast radius of any auth bug.
3. **Global data poisoning**:
   - `resolved_recommendation_catalog` writable by any authenticated user (links/images/usage_count).
   - registry/images/assignments/blocklist/bank delete policies are too permissive.
4. **OAuth token bridging risk**:
   - `lovable` OAuth tokens are injected into Supabase session with minimal validation. Token refresh instability can manifest as frequent sign-outs.

## Reliability / Runtime Risks

- Auth/session “bounce to /login” is plausible under:
  - redundant route guards that act on transient `user=null`,
  - token refresh instability (OAuth bridge, Supabase refresh),
  - subscription polling that changes UI state frequently,
  - heavy initial loads in Dashboard/My Go Two.
- DashboardHome is a single performance failure domain: many async tasks coupled into one component lifecycle.
- My Go Two staged loader is complex: preview load + full load + preload filter + background warm. Small regressions can blank out imagery.

## Data / Storage Risks

- **Bucket privacy mismatch** is a systemic risk:
  - private buckets require signed URLs, but multiple flows assume public URLs.
- **Deletion semantics are unclear**:
  - some deletes remove “by key” without gender scoping; other systems attempt cleanup but fall back to manual lists.
- **Schema sedimentation** means stale tables/buckets can remain referenced accidentally.

## Highest-Value Improvements (Ranked)

1. **Kill or lock down the two catastrophic endpoints immediately**:
   - `sync-category-registry` must require JWT + admin gating at minimum (prefer: remove from edge and treat registry as migration-owned).
   - `seed-demo-profiles` must be dev-only with strict allowlist/secret or moved to local scripts.

2. **Fix global table write permissions (RLS) for shared “truth” tables**:
   - `resolved_recommendation_catalog`: restrict writes to service role or controlled RPC only.
   - `category_registry`, `website_asset_assignments`, `image_blocklist`, `category_bank_photos`: decide ownership and enforce it.

3. **Make storage privacy a single source of truth**:
   - Align migrations, `storageRefs.ts` private bucket classification, and edge function URL output (public vs signed).
   - Stop returning public URLs for private buckets; stop signing for public buckets.

4. **Stop subscription polling as the gatekeeper of user experience**:
   - Replace Stripe polling with webhook-driven DB state (or at least treat “auth failed” as a separate `unknown` status).
   - Ensure subscription state changes don’t hard-lock core pages on transient failures.

5. **Collapse duplicate/half-wired invite flows**:
   - Make one canonical consumer of `invite` and `token` (either Connect or DashboardLayout).
   - Expire localStorage invite data; remove “sticky” indefinite keys.

6. **Replace destructive sanitization with schema validation**:
   - Validate AI personalization into a typed structure; quarantine raw payload rather than blanking fields.

7. **De-sediment the image systems**:
   - Pick one mapping table + one bucket for My Go Two slots (strip/card/repeat).
   - Deprecate/remove old bank/assignment tables in a controlled migration plan.

8. **Reduce “god component” load and isolate failures**:
   - Split `DashboardHome` into modules with independent loading boundaries and error surfaces.
   - Remove redundant guards and centralize auth gating.

## What I Am Least Certain About

1. **The real root cause of “re-login every 12 seconds” / “bounce to login”**:
   - I can identify plausible mechanisms (OAuth token bridging, guard duplication, auth refresh issues, subscription polling side effects), but without runtime logs from the user’s environment (network responses, Supabase auth events, token refresh errors), I cannot attribute it to one cause.

2. **Actual bucket privacy state in your live Supabase project**:
   - Migrations say `photo-bank`/`images-mygotwo-strip` are private, but the UI likely “works” today. That implies environment drift or inconsistent deployment. Without inspecting the actual Supabase project settings, the diagnosis is probabilistic.

3. **Which legacy image/assignment tables are still actively used in production data**:
   - I see multiple schemas and code paths; I can’t confirm which are populated/relied upon without querying the database or observing runtime behavior.

