# Laplace Final Self Audit

## Executive Summary
This repo is a Vite + React SPA backed by Supabase (Postgres, Storage, Realtime, Edge Functions) with a clear product thesis: save exact preferences ("cards"), connect trusted people, and make those preferences actionable (My Go Two, sharing, recommendations). The strongest technical foundation is (1) the server-side access control model for connection visibility (SECURITY DEFINER RPCs), and (2) the storage ref contract (`storage://bucket/path`) that keeps DB values stable while the client resolves URLs.

The biggest practical risks are:
- Edge-function security posture (multiple `verify_jwt=false`, broad CORS, service-role usage, and at least one destructive service-role function with no auth check).
- Auth/session UX flakiness risk caused by duplicated route guards plus periodic subscription checks.
- User-facing "non-loops" in critical surfaces (Recommendations save/share not persisting; DashboardHome demo milestones/stock photos), which undermines user trust because actions do not change durable state.
- Drift and duplication across image systems (tables + bucket privacy rules + transform assumptions) that can create environment-dependent missing images and complicated operator workflow.

## Strongest Findings
- `sync-category-registry` is a destructive service-role edge function with no Authorization check in code, and it deletes the entire `category_registry` before reinserting. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\sync-category-registry\index.ts, C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml)
- Storage privacy drift is likely: migrations mark `photo-bank` and `images-mygotwo-strip` as private, but the frontend resolver does not treat them as private buckets, so it can generate public URLs that will not work in some environments. (C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts, C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260326095000_private_storage_buckets.sql)
- Auth guard duplication plus periodic subscription checks creates a real "kicked back to /login" UX risk if `user` is briefly null during transitions. Dashboard is guarded in the layout and in some leaf routes. (C:\Users\adamb\Documents\GitHub\my-go-two\src\layouts\DashboardLayout.tsx, C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx, C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
- Recommendations is not action-completing: "save" is a local Set and "share" is a toast. This reads like a demo rather than a usable product loop. (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Recommendations.tsx)
- My Go Two staged loading ("preview" then "full" then collapse warm) is implemented defensively (cancellation + preload filtering), but it introduces failure modes where images can swap to empty if full transforms fail; operators need visibility into those failures. (C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)
- The connection visibility layer is strong: SECURITY DEFINER RPCs provide a coherent, reusable enforcement point across connection feed/search/page. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260320150000_connection_safe_read_functions.sql)

## Best Code/Processes
- Connection safety RPC pattern (explicit shares vs legacy fallback) centralized server-side and reused by multiple UI surfaces.
- Storage ref contract with centralized resolution, caching, and batching for signed URLs. (C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts)
- My Go Two data layer uses inflight promise dedupe and has a clear split between metadata, loader, and presentation. (C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)
- My Go Two staged loading has solid safety mechanics: cancellation via `loadRunIdRef`, preload before commit, and deferred collapse warming. (C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)
- Onboarding is designed to not hard-block on AI: it races personalization against a timeout and proceeds. (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Onboarding.tsx)
- Public feed uses a single aggregated RPC that returns counts and viewer flags. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260320190000_public_feed_backend.sql)
- PhotoGallery is fundamentally the right operator model (direct slot editor) and it already acknowledges operational reality with a manual cleanup list for failed deletes. (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx)

## Worst Code/Processes
- Service-role destructive edge with no auth checks: `sync-category-registry`. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\sync-category-registry\index.ts)
- Mixed edge auth strategy (`verify_jwt=false` plus inconsistent in-function checks) plus broad CORS `*` across many functions. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml, C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\*)
- Global catalog table appears writable by any authenticated user (insert/update RLS), which is a poisoning/vector risk if treated as shared truth. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260318160000_resolved_recommendation_catalog.sql)
- Multiple overlapping image assignment systems/tables create cognitive load and drift (active `category_images` plus unused/legacy tables). (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260326051500_create_website_asset_assignments.sql, C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260325235900_dev_asset_image_overrides.sql)
- Per-connection fan-out in `connection-data-search` (N connections implies N server RPCs per search), which is latency-heavy and costly. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\connection-data-search\index.ts)
- Status docs drift: `LINT_AUDIT.md` claims lint fails, but `npm run lint` passes in this checkout. (C:\Users\adamb\Documents\GitHub\my-go-two\LINT_AUDIT.md)

## Architecture Strengths
- Server-side security and aggregation is correctly used where it matters (connections and public feed).
- DB-stored storage refs (`storage://...`) are the right contract for long-lived content mapping.
- Route-level code splitting exists and the largest UX-heavy pages are lazily loaded. (C:\Users\adamb\Documents\GitHub\my-go-two\src\App.tsx)

## Architecture Weaknesses
- Too many multi-purpose surfaces with lots of effects and mixed concerns (DashboardHome, Settings, ConnectionPage, Questionnaires). These regress easily.
- Typechecking boundaries are weak: frontend TS is permissive and does not include edge functions at all. (C:\Users\adamb\Documents\GitHub\my-go-two\tsconfig.app.json)
- Several key product loops are incomplete or fake (Recommendations actions, some dashboard demo data), which undermines end-to-end product behavior.
- Operator tooling is embedded as "just another route" (PhotoGallery) rather than a clearly separated operator surface with strict guardrails and auditability.

## Dangerous Coupling
- Auth/session state is coupled to periodic subscription checks; failures can silently flip `subscribed` and change UX gating without clear explanation. (C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
- Bucket privacy is coupled to a hard-coded frontend allowlist; a migration-only change can break images in one environment but not another. (C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts)
- My Go Two preview/full/collapse warm pipeline is coupled to asset transforms and file formats; transform failures manifest as missing strips or "swap to empty." (C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx)
- My Go Two and PhotoGallery hard-code `gender='male'` in queries; expanding gender support will require touching multiple layers unless centralized. (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx, C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)

## Redundant Systems
- Auth integration surface is split across direct Supabase auth, Lovable OAuth wrapper, and dev-login edge. (C:\Users\adamb\Documents\GitHub\my-go-two\src\integrations\lovable\index.ts, C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\dev-login\index.ts)
- Image/asset assignment systems overlap: `category_images`, `category_bank_photos`, `website_asset_assignments`, `dev_asset_image_overrides`, plus legacy URL cleanup. Only a subset is clearly live. (C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageOverrides.ts, C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\legacyImageCleanup.ts)
- Category registry exists as DB migrations and as static TS metadata; system is half-migrated. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260313150000_seed_category_registry.sql, C:\Users\adamb\Documents\GitHub\my-go-two\src\data\categoryRegistrySeed.ts)

## Security Risks
- `sync-category-registry` has no auth guard and uses service role. If reachable, it can wipe `category_registry`. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\sync-category-registry\index.ts)
- Many edge functions are configured with `verify_jwt=false` while also using `Access-Control-Allow-Origin: *`. Any missing in-code auth check becomes a public endpoint.
- `resolved_recommendation_catalog` RLS allows authenticated insert/update; if this table is relied upon for shared recommendation truth, it is vulnerable to malicious writes. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260318160000_resolved_recommendation_catalog.sql)
- Public route exposure for operator surfaces: `/photo-gallery` is not under the dashboard gate. It relies on auth checks in-component and on correct RLS/storage policy. (C:\Users\adamb\Documents\GitHub\my-go-two\src\App.tsx, C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx)

## Reliability/Runtime Risks
- Login loop risk: duplicate route guards combined with transient `user=null` windows during auth init and session refresh can hard-redirect to `/login`. (C:\Users\adamb\Documents\GitHub\my-go-two\src\layouts\DashboardLayout.tsx, C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx)
- Questionnaires saves are chatty: per-answer DB update plus full personalization refetch can feel slow and creates load. (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Questionnaires.tsx)
- Notifications realtime subscription is unfiltered (table-wide) and refetches on any change. That is noisy and can become expensive. (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Notifications.tsx)
- Connection-data-search edge does per-connection RPC fan-out; N connections implies N RPC calls per search request. (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\connection-data-search\index.ts)
- My Go Two staged swap risk: preview may succeed but full may fail, causing images to "pop out" (swap to empty). Operators need a visible failure list and remediation path. (C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)

## Data/Storage Risks
- Storage bucket privacy drift can produce environment-dependent broken images. (C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts)
- `deleteImageUrl(imageKey)` and legacy cleanup delete by `category_key` only; gender-scoped rows can be unintentionally wiped. (C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageOverrides.ts, C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\legacyImageCleanup.ts)
- My Go Two and PhotoGallery hard-code `gender='male'` in queries; future multi-gender support will regress unless centralized. (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx, C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)
- DashboardHome injects demo milestones and assigns stock photos to connections missing images; this creates fake data risk and harms trust. (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\DashboardHome.tsx)
- Transform/format assumptions matter: if certain formats fail transforms (historically observed with PNG in the strip pipeline), the runtime deliberately blanks URLs. Asset hygiene and deletion tooling are not optional. (C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)

## Highest-Value Improvements in Ranked Order
1. Lock down edge functions and service-role usage (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml; C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\sync-category-registry\index.ts). Make `verify_jwt=true` the default, tighten CORS, and require explicit in-function auth for every handler. Any destructive admin capability (especially `sync-category-registry`) should require an admin gate, not just "has a service role key."
2. Remove duplicated auth guards and instrument session transitions (C:\Users\adamb\Documents\GitHub\my-go-two\src\layouts\DashboardLayout.tsx; C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx; C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx). Make `DashboardLayout` the single gate and remove leaf redirects so "user briefly null" does not become a hard logout UX.
3. Make Recommendations real (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Recommendations.tsx). Persist save/share actions to durable tables so the app demonstrates a real loop: act, see state change later, share with a connection.
4. Consolidate the image/asset system around `category_images` + storage refs and make operator workflows first-class (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx; C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageOverrides.ts; C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts). Make all reads/writes/delete scopes `(category_key, gender, slot_type)` as needed. Add a visible, persistent "deletion queue" and a per-image transform failure list. Support the two-image model explicitly (strip image + detail image) with pairing UI so operators do not fight cropping/distortion.
5. Remove demo placeholders from authenticated UX (C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\DashboardHome.tsx). Replace demo milestones and stock-photo fallbacks with explicit empty states and prompts so users trust what they see.
6. Reduce backend fan-out hot paths (C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\connection-data-search\index.ts). Move search into a single server-side query/RPC per request and treat user input as data, not interpolated query strings.
7. Make My Go Two staged loading observable and consistent (C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts). The preview->full swap is reasonable progressive loading, but it needs operator-facing failure visibility and consistent behavior even when the loader is not shown.
8. Add minimal high-signal tests and edge validation (C:\Users\adamb\Documents\GitHub\my-go-two\vitest.config.ts; C:\Users\adamb\Documents\GitHub\my-go-two\scripts\audit-edge-functions.js). Add a small set of integration tests for auth stability, storage ref resolution, PhotoGallery assignment, and My Go Two loading invariants. Add a dedicated edge lint/typecheck path so edge code does not silently rot.
9. Clean up repo workflow noise (C:\Users\adamb\Documents\GitHub\my-go-two\LINT_AUDIT.md). Remove or auto-update drifting audit docs, and document the autopush hook risk (accidental remote pushes) so developer workflow matches reality.

## What You Are Least Certain About
- Which Supabase migrations and storage policies are actually applied in deployed environment(s). Several findings (bucket privacy drift, table availability, RLS behavior) are "high-risk if migrations are applied as written," but I did not query a live Supabase project.
- Whether `/photo-gallery` and `/carousel-test` being public routes is intentional for the current dev/operator workflow, or accidental exposure.
- The real end-to-end behavior of "My Go Two card entries" selection/editing across sessions; the adapter exists, but I did not run the UI flows interactively to confirm duplicate creation scenarios.
- How strictly the product wants to keep legacy sharing permissions alive versus completing migration to explicit shares, and how much UI should surface that distinction to users.
