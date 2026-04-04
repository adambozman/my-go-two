# Laplace Rolling Audit

Start time (captured): 2026-04-03T07:30:35.7671477-05:00

Constraints:
- No source-code/config/migration/package/app-behavior changes.
- Reports only under `audit/agent-reports/`.

This file is append-only during the audit. Each section maps a fully traced event/process/layer: trigger, entrypoints, touched files/data, state flow, backend/storage touchpoints, how it connects, good/bad, risks, and concrete improvements.

---

## Section 001: App Shell + Routing + Provider Topology

Trigger:
- Browser loads the SPA, mounts React root, then the router selects the initial route.

Entrypoints:
- [src/main.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/main.tsx)
- [src/App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx)

Touched files:
- [src/main.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/main.tsx) mounts `<App />`.
- [src/App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx) defines route table + provider stack.
- Context providers used here (defined elsewhere):
  - [src/contexts/AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
  - [src/contexts/PersonalizationContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/PersonalizationContext.tsx)
  - [src/contexts/TopBarContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/TopBarContext.tsx)

Touched data:
- Auth/session (Supabase auth session; persisted in browser storage via supabase client defaults).
- Personalization reads `profiles` and `user_preferences` (details traced in a later section).

State flow:
- A single global provider stack wraps the whole app:
  - React Query client provider (global cache)
  - Auth provider (user/session/subscription state)
  - Personalization provider (depends on current `user`)
  - TopBar provider (back button UX state)
  - Tooltip + Toaster infrastructure
  - Router + Suspense for code-split routes

Backend/storage touchpoints:
- None in the shell itself, but the provider stack immediately triggers backend calls:
  - `supabase.auth.getSession()` and `supabase.auth.onAuthStateChange(...)` on mount (AuthProvider).

How it connects through the app:
- All dashboard pages are nested under `/dashboard` and rendered through the shared layout route.
- A single `<Suspense>` wraps all routes with one fallback; code-loading and data-loading states blend.

Good code/processes:
- Route-based code splitting is used across most pages, keeping the initial bundle smaller.
- Dashboard concerns are nested under one parent route, which is a good structure for consistent guard + shell.

Bad code/processes:
- One Suspense boundary for everything creates ‚Äúgeneric loading‚Äù UX; it obscures whether we‚Äôre waiting on:
  - route module download
  - auth settlement
  - data fetching inside the route
- Two toaster systems (`Toaster` + `Sonner`) implies duplicated patterns and potentially duplicated announcements.

Risks:
- If auth settlement lags or briefly produces `user=null`, nested guards may redirect and create perceived ‚Äúlogout loops.‚Äù
- Provider stack ordering is meaningful; Personalization depends on Auth, but both run async work at startup.

Concrete improvements:
- Separate code-split fallback (route load) from app ‚Äúauth settling / data‚Äù loaders: add more granular Suspense or route-level loading states.
- Decide on one notification/toaster path so UX and developer workflow are consistent (fewer duplicated patterns).

---

## Section 002: Auth + Session + Subscription Polling + Dashboard Guard

Trigger:
- User visits `/login` or any `/dashboard/*` route; auth provider initializes and guard decisions happen.

Entrypoints:
- Provider: [src/contexts/AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- Context type/hook: [src/contexts/auth-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts)
- Guard: [src/layouts/DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)

Touched files:
- [src/contexts/AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- [src/contexts/auth-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts)
- [src/layouts/DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)

Touched data:
- Supabase auth session and user object.
- Subscription status via edge function `check-subscription` (Stripe-backed, dev override exists).
- Invite linking via edge function `searchforaddprofile` using `localStorage.gotwo_invite`.

State flow:
- AuthProvider:
  - subscribes to `supabase.auth.onAuthStateChange` and also calls `supabase.auth.getSession()`.
  - sets `loading=false` when either path resolves (can flip twice on cold start).
  - derives `user` from `session?.user` and stores `session` separately.
  - runs `checkSubscription()` when `session.access_token` is present, and every 60s thereafter.
- DashboardLayout:
  - shows ‚ÄúLoading‚Ä¶‚Äù while `loading` true.
  - redirects to `/login` when `!user`.
  - runs invite-link effect when `user` exists.

Backend/storage touchpoints:
- Supabase auth:
  - `getSession`, `onAuthStateChange`, `signInWithPassword`, `signUp`, `signOut`.
- Edge function:
  - `check-subscription` invoked with Authorization bearer of `session.access_token`.
  - `searchforaddprofile` invoked without explicit Authorization header (relies on client auth or function policy).
- Postgres:
  - profiles update via cached signup data (age/gender).

How it connects through the app:
- Every dashboard route is gated at the layout. Some leaf pages also gate; double-guard can amplify flakiness.
- Subscription state is global and updates the whole app tree periodically.

Good code/processes:
- Centralizing auth state in one provider is correct.
- Dev override for subscription prevents Stripe from blocking dev UX.

Bad code/processes:
- Subscription polling every 60 seconds is heavy and silent-failure prone; it‚Äôs ‚Äúalways on‚Äù background load.
- Invite link side effect runs in the dashboard layout, adding backend work to the ‚Äúboot path‚Äù of every dashboard visit.
- Two parallel auth-init pathways means ‚Äútransient null user‚Äù windows are possible if downstream guards render during transitions.

Risks:
- Any brief `user=null` during navigation can hard redirect to `/login` (perceived logout).
- Silent failures on subscription check and invite linking hide operational problems; developers have little visibility.

Concrete improvements:
- Make dashboard layout the single guard. Remove redundant redirects in leaf routes to reduce bounce loops.
- Move invite processing off the critical render path (e.g., trigger after first paint, or behind a dedicated ‚Äúprocessing invite‚Äù UI state).
- Add observable dev logging around auth transitions and guard redirects (even `console.debug` gated by env) to diagnose bounce behavior quickly.

---

## Section 003: Personalization Provider (Gender + Profile Answers + AI Personalization)

Trigger:
- App mounts or auth user changes; personalization provider fetches profile + preference data.

Entrypoints:
- [src/contexts/PersonalizationContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/PersonalizationContext.tsx)
- [src/contexts/personalization-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/personalization-context.ts)
- Shared helper: [src/lib/gender.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/gender.ts) (normalizeGender; used but not inspected in this section)

Touched files:
- [src/contexts/PersonalizationContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/PersonalizationContext.tsx)
- [src/contexts/personalization-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/personalization-context.ts)

Touched data:
- `profiles.gender` (authoritative gender source)
- `user_preferences.profile_answers` (fallback gender via `identity`)
- `user_preferences.ai_personalization` (JSON blob: brands/stores/themes/palette/persona, etc.)
- Realtime: listens to `profiles` updates for the current `user_id`.

State flow:
- Source-of-truth flow:
  1. If no `user`, provider resets state and sets `loading=false`.
  2. Fetch `profiles.gender` via `.single()`. If present, normalize and set gender.
  3. Else fetch `user_preferences.profile_answers` and attempt `identity` fallback; normalize; set gender.
  4. Fetch `user_preferences.profile_answers, ai_personalization` and store answers.
  5. Sanitize `ai_personalization` aggressively and store it.
  6. Subscribe to realtime profile updates and apply gender changes live.

Backend/storage touchpoints:
- Supabase Postgres reads (profiles + user_preferences).
- Supabase realtime channel for `profiles` UPDATE events.

How it connects through the app:
- `gender` is a cross-cutting concern; it likely gates:
  - what categories show
  - what recommendations/questions appear
  - what content is considered relevant
- `profileAnswers` and `personalization` become implicit ‚Äúambient‚Äù state for downstream pages.

Good code/processes:
- Clear precedence: `profiles.gender` is authoritative; fallback to `profile_answers.identity` is pragmatic.
- Realtime update for gender reduces ‚Äústale UI‚Äù when user changes profile in another session.

Bad code/processes:
- The AI personalization sanitize function is doing substantial string munging inline; it‚Äôs fragile:
  - removing non-ascii can erase legitimate content
  - heuristics like ‚Äúcontains _keywords‚Äù or ‚Äúlength < 2‚Äù can drop data unexpectedly
- Two separate fetches to `user_preferences` (one for fallback gender, one for full payload) can cause:
  - extra network round trip
  - duplicated latency on boot

Risks:
- Sanitization might convert ‚Äúbad but recoverable‚Äù data into empty strings silently, losing operator visibility.
- Realtime subscription might add background noise if many profile updates exist; no throttling.

Concrete improvements:
- Consolidate `user_preferences` reads into one query to avoid redundant fetch.
- Move sanitization into a reusable helper with tests, and surface when data was dropped (debug telemetry).
- Consider deferring personalization fetch until after primary dashboard paint to reduce perceived startup delay.

---

## Section 004: Dashboard Top Bar (Nav + Notifications Realtime + Avatar Upload)

Trigger:
- Any `/dashboard/*` route renders the shared top bar.

Entrypoints:
- [src/components/DashboardTopBar.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/DashboardTopBar.tsx)
- Storage resolver: [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)
- Auth: [src/contexts/auth-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts)

Touched files:
- [src/components/DashboardTopBar.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/DashboardTopBar.tsx)

Touched data:
- `profiles.avatar_url`, `profiles.display_name` for the current user.
- `notifications` table for unread count.
- `avatars-1` storage bucket for avatar upload/delete.

State flow:
- On mount when `user` exists:
  - fetch profile (avatar + display name) and compute initials.
  - fetch unread notifications count.
  - subscribe to realtime postgres changes on `notifications` (event `*` on table) and refetch count.
- Separately resolve avatar URL from `avatarValue` via `resolveStorageUrl`.
- Upload flow:
  - upload to `avatars-1` at `${user.id}/avatar.${ext}` (upsert true)
  - write storage ref into `profiles.avatar_url`
  - update local state + toast
- Remove photo:
  - list user folder, remove all files, set `profiles.avatar_url` null.

Backend/storage touchpoints:
- Supabase Postgres read/write: `profiles`, `notifications`.
- Supabase realtime channel for notifications table changes.
- Supabase Storage list/upload/remove in `avatars-1`.

How it connects through the app:
- Top bar is a constant background process holder:
  - realtime channel remains active while on dashboard routes
  - provides global navigation + account actions

Good code/processes:
- Avatar storage ref abstraction is consistent: store a stable ref in DB and resolve to signed/public URL for display.
- Realtime-driven unread count is good UX when notifications are central.

Bad code/processes:
- Subscribing to `notifications` with `{ event: "*", table: "notifications" }` (no user_id filter) can cause extra events and refetches for changes unrelated to the current user, depending on realtime policy behavior.
- Count fetching uses `.select("*", { count: "exact", head: true })` which is correct but can still be frequent under high event volume.
- Mixed concerns: nav, profile fetch, notifications realtime, storage upload all in one component increases cognitive load.

Risks:
- Background realtime subscription + frequent refetch can impact performance/battery on mobile.
- If realtime policies allow too much, the client may get spammed by unrelated notification events.

Concrete improvements:
- Add a realtime filter by `user_id` if supported/needed, or throttle count refreshes.
- Split top bar into hooks (profile hook, notifications hook) to isolate side effects and improve maintainability.

---

## Section 005: Dashboard Home (Multi-Feature Hub + Search Modal + Connections Paywall)

Trigger:
- User visits `/dashboard` (index route).

Entrypoints:
- Page: [src/pages/dashboard/DashboardHome.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/DashboardHome.tsx)
- Home components: `GreetingHeader`, `EventCalendar`, `AddConnectionModal`, etc.
- Data sources: `couples`, `profiles`, multiple RPCs.

Touched files (primary):
- [src/pages/dashboard/DashboardHome.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/DashboardHome.tsx)
- Home child components under [src/components/home](/Users/adamb/Documents/GitHub/my-go-two/src/components/home) (not all opened in this section).
- Data utilities: [src/data/stockPhotos.ts](/Users/adamb/Documents/GitHub/my-go-two/src/data/stockPhotos.ts), [src/data/imageBlocklist.ts](/Users/adamb/Documents/GitHub/my-go-two/src/data/imageBlocklist.ts)

Touched data (high-level, from visible code):
- `profiles.display_name`
- `couples` and related connection data
- Search: an RPC (`supabase.rpc`) returning `my_entries` and `circle_entries`
- Potentially milestones, activity feed items, directory entries (likely via other RPCs / views)

State flow:
- This page is a ‚Äúhub‚Äù and owns many independent state machines:
  - connections list + resolved images
  - milestone list
  - home search modal open/close + query + scope + results
  - recent activity items
  - add-connection modal open/close
  - connections paywall open/close
- Search flow:
  - user types query, modal opens, triggers async search (RPC)
  - results render into two columns (‚ÄúYour results‚Äù and ‚ÄúYour circle‚Äù)
  - clicking a result navigates to `/dashboard/my-go-two` (does not deep-link into the specific entry)

Backend/storage touchpoints:
- Multiple Supabase Postgres reads and RPC calls; likely the heaviest dashboard page.
- Storage URL resolution for connection images via `resolveStorageUrl`.

How it connects through the app:
- The home page is where users likely start each session; therefore it‚Äôs the worst place to concentrate multiple async flows without careful loading states.

Good code/processes:
- The search modal is conceptually useful: immediate value, cross-owner search, and consistent UI.
- Using an RPC wrapper provides a typed-ish boundary (`RpcResult<T>`) instead of scattered selects for search.

Bad code/processes:
- Large ‚Äúkitchen sink‚Äù component makes developer workflow hard: changes in one area risk regressions in another.
- Loading UX can become inconsistent because many sub-features fetch independently; users see partial UI with shifting sections.
- Search result click always goes to `/dashboard/my-go-two` rather than the relevant detail; this is a UX ‚Äúdead end‚Äù if the result is about a specific card/entry.

Risks:
- Performance risk: many independent effects and queries can create waterfalls and re-render churn.
- Debugging risk: hard to reproduce issues because there are many stateful branches (paywall, modal, scope).

Concrete improvements:
- Break the home page into feature subcomponents that own their own effects and memoization boundaries.
- Introduce a structured loading strategy: show the ‚Äúfast shell‚Äù first, then hydrate secondary modules (search, activity, calendar).
- For search results, add deep-link metadata (route + id) so navigation goes to the right place instead of a generic page.

---

## Section 006: My Go Two (Stage Strips + Overlay + Loading/Timers)

Trigger:
- User navigates to `/dashboard/my-go-two` and interacts: hover strips, click category to open overlay, collapse rotation.

Entrypoints:
- Route page: [src/pages/dashboard/MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx)
- Main UI: [src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx)
- Data + caching: [src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts)
- Slot metadata: [src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts)
- Live overrides events: [src/lib/imageOverrides.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/imageOverrides.ts)

Touched files (primary):
- [src/pages/dashboard/MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx)
- [src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx)
- [src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts)
- [src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts)

Touched data:
- `category_images` table: keys for
  - `mygotwo-strip-XX` (category small images; 9 labeled categories)
  - `mygotwo-card-{slug}` (category overlay/card image)
  - `mygotwo-collapse-0X` (repeat/collapse images bank)
- Storage URLs via [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts) transforms.

State flow:
- Route guard:
  - [MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx) shows a loading screen if auth is loading, otherwise redirects when no `user`.
  - Note: this is a *second* guard layer in addition to [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx).
- Asset loading:
  - `loadMyGoTwoGalleryAssets({ quality: "preview" })` can load low-quality strip images first (no collapse).
  - Full load (`quality: "full"`) resolves strip + card transforms and collapse transforms.
  - Data layer caches:
    - `cachedRows` (DB rows)
    - `cachedAssets` (resolved URLs)
    - inflight promises to dedupe concurrent loads
- UI behavior:
  - weights are computed to implement expanded vs hover vs collapsed layout.
  - overlay uses `category.detailImage || category.image` for the background; this supports separate strip vs card images.
  - collapse rotation interval is 10s; transition/timer constants are in the UI file.
- Override propagation:
  - listens for `OVERRIDE_CHANGED_EVENT`, resolves override URL with appropriate transform (strip/card/collapse), then merges into cached assets.

Backend/storage touchpoints:
- Supabase select from `category_images` with `.in(category_key, SLOT_KEYS)` on load.
- Storage URL resolution uses `getPublicUrl` for public buckets and `createSignedUrl(s)` for private buckets.
- Transformed URL usage is heavy; performance depends on number of images and quality chosen.

Good code/processes:
- Clear separation between ‚Äúslot metadata‚Äù and ‚Äúdata loader‚Äù and ‚Äúpresentation‚Äù layers.
- Inflight promise dedupe prevents redundant DB fetches when multiple components request assets.
- Separate card (`detailImage`) vs strip (`image`) is a strong UX/quality decision because it avoids aspect-ratio distortion.

Bad code/processes:
- Double auth guarding (layout + page) increases the chance of redirect flakiness.
- Preview-vs-full complexity may not pay off unless the loader exits as soon as the stage is usable; otherwise it‚Äôs just extra work.
- Many timers and transitions in one component increases bug surface (hover/collapse/loader states can fight).

Risks:
- Performance risk on cold loads: resolving many transformed URLs + preloading may still create startup jank on slower devices.
- Operational risk: transformed URLs + image formats (e.g., PNG) can fail depending on storage transform support; needs strict ‚ÄúJPG for strip‚Äù discipline.

Concrete improvements:
- Remove leaf-route auth redirect and rely on dashboard layout gating (reduces login bounce loops).
- Make the loader exit tied to ‚Äúminimum viable stage‚Äù: as soon as the 8 preview strips (or equivalent stage baseline) are decoded, not after everything loads.
- Consider explicit instrumentation for the My Go Two loader lifecycle (timestamps) to make performance tuning deterministic.

---

## Section 007: Photo Gallery (Operator Workflow for Slot Upload/Replace/Delete)

Trigger:
- Operator visits `/photo-gallery` to upload images directly into live My Go Two slots.

Entrypoints:
- Page: [src/pages/PhotoGallery.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/PhotoGallery.tsx)
- Slot metadata: [src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts)
- Mapping writes: [src/lib/imageOverrides.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/imageOverrides.ts)
- Storage refs: [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)

Touched data:
- Storage bucket: `photo-bank` (uploads into `mygotwo/...` folders)
- DB table: `category_images` (writes mapping keys)

State flow:
- Loads current assignments:
  - reads `category_images` for all `MYGOTWO_SLOT_TARGETS` keys (strip/card/collapse).
  - resolves display URLs in batch.
- Upload:
  - user selects a target slot (category small vs card, or a repeat slot)
  - uploads a file to `photo-bank` using a deterministic folder from slot metadata
  - stores `storage://photo-bank/<path>` in `category_images` via `setImageUrl`
  - attempts to remove the replaced old storage file if no other slots reference it
- Delete:
  - clears the `category_images` mapping and removes the file if unused.
  - if removal fails, item is queued to ‚ÄúManual cleanup list.‚Äù

Backend/storage touchpoints:
- Postgres: `category_images` select/upsert/delete.
- Storage: `photo-bank` upload/remove.

Good code/processes:
- ‚ÄúDirect slot editor‚Äù matches operator mental model and avoids a staging/bank abstraction that can drift from runtime truth.
- Manual cleanup list is pragmatic: it acknowledges storage deletes can fail and provides a human action list.

Bad code/processes:
- The page is operator-only but not explicitly gated; it relies on auth being present. If it should be dev-only, it needs a clear guard and messaging.
- Cleanup logic depends on correct ‚Äúother usage‚Äù detection across slot keys; any future slot additions must update that logic.

Risks:
- Accidentally deleting a storage file that is still referenced by another mapping is the primary operator-risk; current logic mitigates but depends on the in-memory assigned map being current.
- Storage bucket policy is authenticated-only; if auth expires mid-operation, deletes/uploads can partially succeed.

Concrete improvements:
- Show a ‚Äúdry run‚Äù summary before destructive deletes (slot cleared + file removal) to prevent operator mistakes.
- Add a ‚Äúrecent changes‚Äù log (in-app) to make operator debugging easier when images don‚Äôt appear as expected.

---

## Section 008: Shared Storage Ref System (URL Resolution + Signing + Transforms)

Trigger:
- Any UI needs to render an image whose source-of-truth is a storage ref (`storage://bucket/path`) or a Supabase storage URL.

Entrypoints:
- [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)

Touched data:
- Storage buckets:
  - ‚Äúprivate‚Äù buckets sign URLs (set is hard-coded in code: avatars, avatars-1, card-images, connection-photos)
  - ‚Äúpublic‚Äù buckets use `getPublicUrl`
- Signed URL cache keyed by `bucket/path` or `bucket/path?transform=...`

State flow:
- `resolveStorageUrls`:
  - groups signing requests by bucket, uses `createSignedUrls` batching for private buckets.
  - caches signed URLs with expiration.
- `resolveStorageUrlsWithTransform`:
  - uses `createSignedUrl` (single) per unique private path+transform; caches results.
  - for public buckets, uses transformed public URL directly.

Backend/storage touchpoints:
- Storage API:
  - `getPublicUrl`
  - `createSignedUrl(s)`

Good code/processes:
- Storage refs are a strong contract: DB stores stable strings, UI resolves on demand.
- Batching signed URLs (non-transform path) is correct and reduces API calls.

Bad code/processes:
- Private bucket list is hard-coded; if backend adds/removes privacy, the frontend can drift.
- Transform signing path uses per-file signing rather than batching (depends on Supabase APIs; may be unavoidable).

Risks:
- A privacy mismatch (bucket becomes private but not in `PRIVATE_BUCKETS`) will ‚Äúwork locally‚Äù but fail in production.
- Transform URLs for certain formats may fail (observed with PNG in some pipelines); requires format discipline and monitoring.

Concrete improvements:
- Derive private/public behavior from config (env or server-provided) to avoid drift.
- Add lightweight error reporting when a resolved URL is empty to make ‚Äúmissing image‚Äù debugging easier.

---

Audit continuation timestamp (PowerShell `Get-Date`): Friday, April 3, 2026 7:35:39 AM (America/Chicago)

## Section 009: Auth Lifecycle + Login/Dev Login + Subscription Gate

Trigger:
- User visits `/login`, signs in (normal password or dev bypass), then navigates into `/dashboard/*`.

Entrypoints:
- Auth provider: [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
- Auth context contract: [src/contexts/auth-context.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\auth-context.ts)
- Login route: [src/pages/Login.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Login.tsx)
- Dashboard guard: [src/layouts/DashboardLayout.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\layouts\DashboardLayout.tsx)
- Dev session generator: [supabase/functions/dev-login/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\dev-login\index.ts)
- Subscription check: [supabase/functions/check-subscription/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\check-subscription\index.ts)

Touched data:
- Supabase Auth session tokens stored in `localStorage` (configured in [src/integrations/supabase/client.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\integrations\supabase\client.ts)).
- Stripe customer + subscription status (server-side) for non-dev users.
- Local feature flags:
  - `gotwo_invite` and `gotwo_invite_token` (connection flow; see later sections).
  - `gotwo_signup_data` (signup cached profile fields, applied on first SIGNED_IN).

State flow:
- `AuthProvider` starts with `{ user: null, loading: true }`, then:
  - subscribes to `supabase.auth.onAuthStateChange(...)` to update `{ session, user, loading }`.
  - calls `supabase.auth.getSession()` once to populate initial session.
  - on session change, runs `checkSubscription()`; also auto-refreshes subscription every 60 seconds.
- Login flow:
  - Normal: `supabase.auth.signInWithPassword` (via `useAuth().signIn`), then `navigateAfterLogin()`.
  - Dev bypass: calls edge function `dev-login` to mint `{ access_token, refresh_token }`, then `supabase.auth.setSession(...)`, then `navigateAfterLogin()`.
  - `navigateAfterLogin()` checks `user_preferences.onboarding_complete` to route to `/onboarding` vs `/dashboard`.
- Dashboard guard:
  - `DashboardLayout` redirects to `/login` if `useAuth().user` is null after `loading` settles.
  - Several leaf routes (e.g. [src/pages/dashboard/MyGoTwo.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx)) also duplicate this redirect.

Backend/storage touchpoints:
- Supabase Auth: get/set session, get user, refresh token.
- Stripe checks inside `check-subscription` use service role key and the caller's bearer token to resolve email, then query Stripe.

Good code/processes:
- Dev login is intentionally operator-optimized: a single email unlocks a server-generated session, avoiding password/OTP friction during development.
- Subscription status is treated as a separate state machine (`subscriptionLoading`, `subscriptionEnd`), which is the right model for product gating.
- `check-subscription` returning `{ subscribed:false }` on expired token (200) avoids a cascade of error UI in the client for the common "auth token expired" case.

Bad code/processes:
- Multiple independent auth redirects (layout + leaf pages) increase the chance of "bounce to login" loops if `user` becomes transiently null during refresh or during auth settling.
- Dev allowlists exist in multiple places:
  - `DEV_EMAILS` in [src/pages/Login.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Login.tsx)
  - `DEV_EMAILS` and `DEV_USER_IDS` in [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
  - `DEV_EMAILS` in [supabase/functions/dev-login/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\dev-login\index.ts)
  Drift risk: changing one list without the others changes UX in surprising ways.

Risks:
- The user-reported "having to login every 12 seconds" symptom is consistent with an auth state that temporarily drops `user` to null (even briefly). With redirect logic spread across the app, any transient null becomes a hard navigation to `/login`.
- `AuthProvider` calls `checkSubscription()` on every access token change plus a 60s interval. If `check-subscription` is slow or errors, it should not destabilize auth, but it can amplify perceived jank.

Concrete improvements:
- Consolidate auth gating to one place (ideally `DashboardLayout`) and remove redundant leaf-route redirects (or make them non-navigating placeholders).
- Centralize dev allowlist into a single source (e.g. one exported constant used by both frontend and edge functions) to prevent drift.
- Add explicit logging/instrumentation for auth transitions (SIGNED_IN, TOKEN_REFRESHED, SIGNED_OUT) so "why did I get kicked to login" can be diagnosed from one trace.

---

## Section 010: Connection Invite Linking (Connect/Login/DashboardLayout + searchforaddprofile)

Trigger:
- A user clicks a connection invite link (QR or email) with `?invite=<userId>` or `?token=<shareToken>`, then signs in/up and expects to be linked.

Entrypoints:
- Invite landing route: [src/pages/Connect.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Connect.tsx)
- Login captures invite query: [src/pages/Login.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Login.tsx)
- Post-login linking in dashboard shell: [src/layouts/DashboardLayout.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\layouts\DashboardLayout.tsx)
- Edge function multi-action backend: [supabase/functions/searchforaddprofile/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\searchforaddprofile\index.ts)

Touched data:
- Local storage:
  - `gotwo_invite` (inviter user id)
  - `gotwo_invite_token` (share token)
- DB tables (from edge function + settings page usage):
  - `couples` (invites + accepted relations)
  - connection share token tables (token row types are defined in the function; schema is in migrations)
  - connection invite events (tracked; see migrations)

State flow:
- `/connect` behavior:
  - If authenticated and `token` is present: invokes `searchforaddprofile` with `{ action:"link-by-token", token }`.
  - Else if authenticated and `inviteId` is present: invokes `searchforaddprofile` with `{ action:"link-by-inviter", inviter_id: inviteId }`.
  - If not authenticated: stores invite params in localStorage and navigates to `/login` or `/signup`.
- `/login` behavior:
  - If `invite` query param exists, stores it to localStorage as `gotwo_invite`.
  - After login, navigates to onboarding vs dashboard based on `user_preferences.onboarding_complete`.
- `DashboardLayout` behavior:
  - On mount (when `user` becomes available), checks localStorage `gotwo_invite` and invokes `searchforaddprofile` link-by-inviter, then clears the localStorage key.

Backend/storage touchpoints:
- The edge function `searchforaddprofile` is a "god function" for connection workflows:
  - `link-by-inviter`
  - `link-by-token`
  - `create-connection-share-token`
  - `prepare-connection-share`
  - `send-invite-email`
  - `accept-invite`, `accept-by-email`
  - plus user discovery search and demo profile seeding behavior

Good code/processes:
- The operator goal is clear: "user taps invite link and gets linked", and the system has multiple fallbacks (localStorage caching, both token and inviter-id paths).
- The backend action model is explicit: `actionName` routes behavior and is reasonably name-scoped.

Bad code/processes:
- Linking can happen in multiple places (Connect page and DashboardLayout). If a user hits both flows in one session, it relies on backend idempotency and localStorage cleanup being perfect.
- LocalStorage keys are write-only from the user's perspective; there is no UX surface that tells the operator "we detected an invite, linking now".

Risks:
- UX risk: if linking fails (network/RLS/token invalid), the user gets navigated to `/dashboard/settings` anyway, and the error may be only a toast or a silent failure.
- Maintainability risk: a single edge function handling search, invites, share tokens, event tracking, and demo seeding will be hard to safely change.

Concrete improvements:
- Collapse linking responsibilities into one post-auth step (ideally a single hook in `AuthProvider` or `DashboardLayout`) and treat `/connect` as "store params + explain what's happening" only.
- Make the backend action interface explicit and typed: a union of request/response shapes per action instead of `unknown` payload parsing.
- Add an in-app "pending invite detected" UI banner in settings until linking succeeds or is dismissed.

---

## Section 011: Onboarding + Personalization Pipeline (Profiles/User Preferences + personalize edge)

Trigger:
- User completes onboarding questions (or skips), and the app saves their "profile answers" and runs AI personalization.

Entrypoints:
- Onboarding UI: [src/pages/Onboarding.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Onboarding.tsx)
- Personalization provider: [src/contexts/PersonalizationContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\PersonalizationContext.tsx)
- Personalize edge function: [supabase/functions/personalize/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\personalize\index.ts)

Touched data:
- `profiles`: gender/birthday/anniversary updates.
- `user_preferences`:
  - `profile_answers` JSON blob (also used by Questionnaires).
  - `onboarding_complete` boolean gate for routing.
  - `ai_personalization` JSON blob (used by Recommendations, Trending feed, Style chat, etc).
- AI gateway: `https://ai.gateway.lovable.dev/...` requires `LOVABLE_API_KEY`.

State flow:
- Onboarding phases: `intro -> profile -> personalizing -> complete`.
- Save path:
  - Upsert `user_preferences` with `onboarding_complete:true` plus `profile_answers`.
  - Update `profiles` with normalized gender + optional dates.
  - Invoke `personalize` edge with `profile_answers` (client-side call).
  - Uses `Promise.race([personalizationPromise, timeout(30s)])` to avoid blocking UI longer than 30s.
  - Regardless of AI completion, it refetches personalization and transitions to `complete`.

Backend/storage touchpoints:
- Supabase PostgREST writes for `profiles` and `user_preferences`.
- Edge function hits AI gateway (Gemini model via Lovable) and parses tool-call JSON.

Good code/processes:
- Product-aware UX: it explicitly tells the user personalization may continue in the background if AI fails/slow.
- The 30s timeout prevents onboarding from becoming an indefinite spinner.

Bad code/processes:
- `Promise.race` does not cancel the in-flight AI request; it just stops awaiting it. The backend work may continue and the client can refetch stale data, producing confusing "saved" vs "personalized" timing.
- There is no explicit "AI personalization job status" recorded; consumers implicitly assume `ai_personalization` exists or not.

Risks:
- If `LOVABLE_API_KEY` is missing/misconfigured, onboarding still completes, but personalization-dependent pages may degrade silently.
- Because `user_preferences.profile_answers` is treated as a large blob, concurrent updates (onboarding + questionnaires) can overwrite each other unless carefully merged.

Concrete improvements:
- Store a `personalization_status` field and timestamps in `user_preferences` (or a dedicated table) so the UI can render deterministic states.
- Consider moving personalization invocation server-side (trigger/function) so onboarding UI only writes answers and observes status.
- Standardize all profile-answer updates as "patch merge" at the database layer (or stored procedures) to avoid JSON blob overwrite races.

---

## Section 012: Know Me Questionnaires + Style Chat (user_preferences.profile_answers as a Shared State Hub)

Trigger:
- User opens `/dashboard/questionnaires` and answers questions, optionally uses the "style chat" assistant.

Entrypoints:
- UI: [src/pages/dashboard/Questionnaires.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Questionnaires.tsx)
- Question banks: [src/data/knowMeQuestions.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\knowMeQuestions.ts)
- Edge chat: [supabase/functions/style-chat/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\style-chat\index.ts)

Touched data:
- `user_preferences.profile_answers` (JSON) is the single persisted store for:
  - onboarding answers
  - ongoing questionnaire answers
  - this-or-that brand bank answers
- `user_preferences.ai_personalization` is sent to style-chat for grounding.

State flow:
- The page builds a category dashboard from `profile_answers` and the question bank, then:
  - lets the user answer questions
  - persists by merging patch keys into the existing `profile_answers` object and writing it back to the DB
- Persist path in UI:
  - `persistProfileAnswers` calls `supabase.auth.getUser()` each time, then does a `user_preferences.update({ profile_answers })` for that `user_id`.
- Style chat path:
  - opens a dialog and sends `{ message, profile_answers, ai_personalization }` to `style-chat`.
  - errors surface as Sonner toasts with heuristics for 429/402.

Backend/storage touchpoints:
- PostgREST update to `user_preferences`.
- Edge function hits AI gateway with `LOVABLE_API_KEY`.

Good code/processes:
- The UX is product-shaped: it frames categories as progress sprints and exposes a style assistant that explains "why" behind questions.
- The free-tier locks are enforced in UI with clear messaging.

Bad code/processes:
- `user_preferences.update(...)` (not upsert) can be a silent no-op if the user row does not exist yet; the UI does not check affected row count.
- JSON blob rewrite pattern is inherently conflict-prone: if another part of the app writes `profile_answers` concurrently, one write can clobber the other.

Risks:
- "Saved" UX may lie if the update does not actually persist (row missing) or if later writes overwrite earlier answers.
- Performance risk: frequent full-blob JSON updates cause larger payloads over time.

Concrete improvements:
- Use upsert (or a stored procedure) for profile answer patches, and return the merged result from the DB.
- Introduce per-question or per-section storage (normalized tables) if this grows beyond a few dozen keys.
- Add a "last saved" timestamp and optimistic concurrency (updated_at compare) to prevent silent overwrites.

---

## Section 013: Recommendations (UI) + ai-products (Edge) + Ad Tracking

Trigger:
- User opens `/dashboard/recommendations`, expects a curated feed. Free users see a limited slice; Premium users can paginate.

Entrypoints:
- Recommendations page: [src/pages/dashboard/Recommendations.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Recommendations.tsx)
- Personalization state: [src/contexts/PersonalizationContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\PersonalizationContext.tsx)
- Auth/subscription state: [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
- Edge rec generator: [supabase/functions/ai-products/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\ai-products\index.ts)
- Shared catalog logic: [supabase/functions/_shared/knowMeCatalog.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\_shared\knowMeCatalog.ts)
- Sponsored analytics/admin: [src/pages/admin/SponsoredAdmin.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\admin\SponsoredAdmin.tsx)
- Ad event writer: [src/lib/adTracking.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\adTracking.ts)

Touched data:
- `user_preferences` (read) for `ai_personalization` and `profile_answers` (via PersonalizationContext).
- `weekly_recommendations` or recommendation cache tables (implied by edge function fingerprints; confirm in migration pass).
- `sponsored_products` and `ad_events` (admin + tracking).

State flow:
- Page waits for `usePersonalization().loading` to settle, then calls `supabase.functions.invoke("ai-products")`.
- If the edge returns 401, the page calls `supabase.auth.refreshSession()` and retries once.
- Product list is filtered by "pillar" category, paginated with `usePagination`.
- Save/share actions are currently UI-local state (`savedItems` Set, toasts) rather than persisted to DB.

Backend/storage touchpoints:
- `ai-products`:
  - reads auth, fetches user prefs, builds catalog intents, may call external Firecrawl APIs when configured.
  - relies on secrets like `LOVABLE_API_KEY` and optionally `FIRECRAWL_API_KEY`.
- Ad tracking inserts into `ad_events` (client-side) when invoked.

Good code/processes:
- The UI is product aware: it ties recommendations to the persona summary and uses pillar filters that match user mental models.
- The edge code does substantial input sanitization for AI outputs (`sanitizeIntents`, strict category/kind allowlists).
- Retry-on-401 is the right UX response for "token expired" without immediately punting the user to `/login`.

Bad code/processes:
- The Recommendations page is very large and mixes:
  - fetch orchestration
  - business gating (premium)
  - presentation
  - multiple static asset banks
  Developer workflow cost: hard to change safely.
- Client-side `refreshSession()` has cross-cutting effects (auth state changes). If other parts of the app aggressively redirect on transient auth nulls, this can manifest as "kicked to login".
- Tracking is client-side and best-effort only (no error surfaced); if RLS blocks inserts or user is missing, analytics silently undercount.

Risks:
- Performance risk: large bundle due to many imported JPG banks in [src/pages/dashboard/Recommendations.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Recommendations.tsx).
- Auth stability risk: any refresh/session failure during recommendation fetch can cascade into layout redirects.

Concrete improvements:
- Split Recommendations into "data hook" + "presentational" components; isolate `refreshSession` logic to a shared auth utility.
- Persist saved recommendations (or explicitly remove save UI until persistence exists) to avoid misleading UX.
- Move ad tracking to a server-side endpoint or add visible logging for local/dev so operator understands whether events are actually being recorded.

---

## Section 014: Search (Templates + Entries) and Query Safety

Trigger:
- User opens `/dashboard/search`, types a query, expects template and saved-entry matches.

Entrypoints:
- Search page: [src/pages/Search.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Search.tsx)

Touched data:
- `card_templates` (ilike match on `name`).
- `card_entries` (filtered to current user; `group_name` or `entry_name` ilike).

State flow:
- Debounced 300ms: on query change, runs two async queries in parallel.
- Results are stored in local state arrays; clicking any result navigates to `/dashboard/my-go-two` (not the specific entry/template).

Backend/storage touchpoints:
- Direct PostgREST reads (no RPC layer) for templates and entries.

Good code/processes:
- Simple, understandable UX and implementation; minimal moving parts.
- Uses generated types `Tables<...>` which improves correctness.

Bad code/processes:
- `.or(
  group_name.ilike.%${query}%,entry_name.ilike.%${query}%
)` directly interpolates user input into a PostgREST filter string. Certain characters (commas, parentheses) can break the query or produce unexpected behavior.
- Navigation is a dead end: clicking a specific match always lands on the general My Go Two page.

Risks:
- Reliability risk: special characters in the query can cause silent search failures.
- UX risk: user cannot actually "go to the thing" they searched for.

Concrete improvements:
- Escape/sanitize query text for PostgREST `.or(...)` strings, or move search into a dedicated RPC that accepts the query as a parameter.
- Deep-link into the matched entry/template (e.g. `/dashboard/my-go-two?open=<entryId>` or similar) so search is action-completing.

---

## Section 015: Settings (Account + Connection Ops + Subscription Checkout)

Trigger:
- User opens `/dashboard/settings` to edit identity, manage invites, set notifications, and manage subscription.

Entrypoints:
- Settings page: [src/pages/dashboard/SettingsPage.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\SettingsPage.tsx)
- Subscription UI: [src/components/SubscriptionSection.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\components\SubscriptionSection.tsx)
- Connection backend god-function: [supabase/functions/searchforaddprofile/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\searchforaddprofile\index.ts)
- Stripe checkout edges:
  - [supabase/functions/create-checkout/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\create-checkout\index.ts)
  - [supabase/functions/customer-portal/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\customer-portal\index.ts)

Touched data:
- `profiles` (display name, gender, dates).
- `user_settings` (toggles; upsert on conflict user_id).
- `couples` (invites + accepted + deletion).
- Share token + invite event tables (via searchforaddprofile actions).
- Stripe (checkout + billing portal sessions).

State flow:
- The Settings page is a multi-mode screen with many side effects:
  - fetch profile + user_settings + connections.
  - create and cache a share token when QR dialog opens.
  - invite flows: send email, copy link, accept pending invites.
  - demo seeding action.
- Subscription section uses `useAuth().session.access_token` to call:
  - `create-checkout` with `priceId` and `Authorization: Bearer ...`, opening Stripe checkout URL.
  - `customer-portal` similarly, opening billing portal URL.

Backend/storage touchpoints:
- Settings uses both direct PostgREST queries and the searchforaddprofile edge.
- Stripe edges require env vars: `STRIPE_SECRET_KEY` plus Supabase URL/keys.

Good code/processes:
- Operator workflow is centralized: settings is the "control room" for connections and billing.
- User settings toggles use upsert by `user_id`, which is the correct shape for a 1:1 settings row.

Bad code/processes:
- The Settings page is very large and mixes unrelated processes (identity editing, notifications, invites, billing, demo seeding) which increases regression surface.
- Many actions do not verify outcomes beyond "no error": e.g. deletes, updates, and demo seeds.

Risks:
- UX risk: if `searchforaddprofile` errors, the user may end up in a confusing partial state (token exists, invite not sent, etc.)
- Maintainability risk: this file is a high-churn hotspot; changes can easily break multiple flows.

Concrete improvements:
- Split settings into dedicated subroutes or feature modules (Account, Connections, Notifications, Billing).
- Standardize edge calls through a typed wrapper that returns `{ ok, data, error }` and logs.
- Add explicit "connection status" UI states (pending/outgoing/accepted) sourced from one RPC.

---

## Section 016: Connection Feed (RPC-driven, Image-heavy, Operator Filters)

Trigger:
- User opens `/dashboard/connection-feed` to see "updates from your people" across all accepted connections.

Entrypoints:
- UI: [src/pages/dashboard/ConnectionFeed.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\ConnectionFeed.tsx)
- Storage resolver: [src/lib/storageRefs.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts)
- Feed RPC: [supabase/migrations/20260320184500_connection_feed_backend.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260320184500_connection_feed_backend.sql)

Touched data:
- RPC `get_connection_feed(p_limit, p_couple_id)` reads:
  - `couples` (accepted relationships)
  - `shared_card_entries` + `card_entries`
  - `shared_profile_fields` + `profiles`
  - `shared_derived_features`
  - `connection_context_preferences`
- `image_url` fields are frequently storage refs resolved client-side.

State flow:
- Reads query param `coupleId` and sets `selectedCoupleId`.
- Calls `get_connection_feed` with a high limit (120).
- Derives connection filter list from rows returned, then lets the user filter by connection.
- Resolves all distinct `image_url` values via `resolveStorageUrl` in a follow-up effect.

Backend/storage touchpoints:
- DB: security definer RPC aggregates multiple sources.
- Storage: signed/public URL resolution for each unique image.

Good code/processes:
- "Feed" is a single RPC, which is the right shape for performance and for consistent access control.
- The UI is read-only and uses clear grouping labels and relative time labels.

Bad code/processes:
- Image resolution is fully client-side and happens after feed rows arrive; the perceived loading sequence is:
  1. feed text loads
  2. images pop in later
  This is acceptable, but without skeleton states can feel janky.
- RPC returns `meta jsonb` but the UI currently discards most of it; opportunity is underused.

Risks:
- High-cardinality image sets can produce many signing calls and decode overhead.
- If `image_url` is a raw public URL instead of a `storage://` ref, resolution behavior differs and the UI can exhibit mixed caching.

Concrete improvements:
- Consider returning already-resolved image URLs (or pre-signed URLs) from the RPC for feed thumbnails to reduce client work.
- Add a small image skeleton/placeholder per row while URLs resolve to avoid layout jumps.

---

## Section 017: Connection Page (Sharing Controls + Safe Reads + Heavy Parallel Fetch)

Trigger:
- User opens `/dashboard/connections/:connectionId` to manage what they share and view what the connection shared.

Entrypoints:
- UI: [src/pages/dashboard/ConnectionPage.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\ConnectionPage.tsx)
- Connection context migrations (safe reads + sharing state):
  - [supabase/migrations/20260320150000_connection_safe_read_functions.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260320150000_connection_safe_read_functions.sql)
  - [supabase/migrations/20260320153000_connection_safe_derived_reads.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260320153000_connection_safe_derived_reads.sql)
  - [supabase/migrations/20260321224500_connection_sharing_state_rpc.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260321224500_connection_sharing_state_rpc.sql)

Touched data:
- Direct reads/writes:
  - `couples`
  - `shared_profile_fields`
  - `shared_derived_features`
  - `shared_card_entries`
  - `connection_context_preferences`
  - `card_entries` (own entries)
- RPC reads (security definer):
  - `get_connection_shared_profile`
  - `get_connection_outgoing_sharing_state`
  - `get_connection_shared_vibe`
  - `get_connection_shared_recommendations`
  - `get_connection_feed`

State flow:
- `loadConnection()` performs:
  1. Validate the `couples` row includes the viewer (inviter or invitee).
  2. In parallel, fetch 10+ resources (profile rows, sharing fields, derived features, vibe, recommendations, shared cards, own entries, feed rows, preference row).
  3. Normalize the results into multiple local state atoms: incoming/outgoing profile share, incoming/outgoing derived share, shared card entry IDs, feed items, partner identity.
- UI allows toggling of share switches which writes to the `shared_*` tables.

Backend/storage touchpoints:
- Extensive PostgREST reads and writes.
- Multiple security definer RPCs to avoid leaking data outside sharing permissions.

Good code/processes:
- The "safe read" pattern (RPCs that enforce sharing) is the right architectural direction for a relationship product.
- Parallel fetching reduces worst-case latency compared to sequential requests.

Bad code/processes:
- The UI is extremely stateful; the number of independent state atoms increases rerender complexity and makes bugs hard to reproduce.
- The file disables lint and uses pervasive `any` casts around RPC calls. This undermines the safety benefits of typed contracts.
- Fetch fanout is very large; even with `Promise.all`, the number of round trips can stress mobile networks.

Risks:
- Performance risk: even small changes can trigger a full reload of the connection model, including re-resolving images.
- Data drift risk: if one of the RPCs is missing (schema cache errors), the UI has partial fallback logic; users may see inconsistent results depending on migration state.

Concrete improvements:
- Introduce a single backend RPC for the entire connection page view model (profile + feed + shares + derived) to reduce client fanout.
- Define typed RPC response types (generated) and remove `any` usage so refactors are safer.
- Add "progressive rendering": show connection header and primary shared profile immediately, then hydrate feed and share settings.

---

## Section 018: Public Feed (Discovery + Follow + Reactions)

Trigger:
- User opens `/dashboard/public-feed`, filters by type, then follows creators or reacts (like/love) to public entities.

Entrypoints:
- UI: [src/pages/dashboard/PublicFeed.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\PublicFeed.tsx)
- Feed RPC: [supabase/migrations/20260320190000_public_feed_backend.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260320190000_public_feed_backend.sql)
- Follow/reaction RPCs: [supabase/migrations/20260321101500_feed_publish_helper_functions.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260321101500_feed_publish_helper_functions.sql)

Touched data:
- `public_published_entities`, `public_published_entity_cards`.
- `public_entity_reactions`.
- `public_creator_profiles`, `public_creator_follows`.

State flow:
- Loads feed via `get_public_feed_items(p_limit, p_entity_kind, p_creator_user_id)`.
- Follow/unfollow uses security definer RPCs, then reloads the entire feed.
- Reactions use `toggle_public_entity_reaction(...)`, then reloads the entire feed.

Backend/storage touchpoints:
- Read model is computed in SQL with counts and viewer flags.
- Write model uses RPCs for follow/reaction.

Good code/processes:
- SQL-layer aggregation is strong: viewer flags and counts are computed server-side and returned as one row per entity.
- RLS policies in the migration indicate a deliberate public/private split, which is essential for a public discovery feature.

Bad code/processes:
- The UI reloads the entire feed after each follow/reaction. That is correct for consistency but wasteful; it can be replaced with local optimistic updates.
- The UI treats `coverImage` as a raw URL; if the system later moves to storage refs, this component needs to be refactored.

Risks:
- Performance risk: frequent full reloads can feel sluggish and can increase DB load.
- UX risk: no deep-linking or detail pages exist yet; the feed is read/act but not "go somewhere".

Concrete improvements:
- Apply optimistic updates for follow/reaction state and counts.
- Add a detail route per public entity, so feed actions lead somewhere.

---

## Section 019: Sponsored Admin + Analytics (Product Ops + RLS Assumptions)

Trigger:
- Operator opens `/dashboard/sponsored` to create sponsored products, toggle activeness, and view impressions/clicks.

Entrypoints:
- UI: [src/pages/admin/SponsoredAdmin.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\admin\SponsoredAdmin.tsx)
- Event tracking utility: [src/lib/adTracking.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\adTracking.ts)

Touched data:
- `sponsored_products` CRUD.
- `ad_events` read for analytics and insert for tracking.

State flow:
- Admin status is a simple email check (`user?.email === ...`).
- Analytics are computed client-side by selecting all `ad_events` and counting by product id.

Backend/storage touchpoints:
- Direct PostgREST reads for all ad_events (potentially large) and all sponsored_products.

Good code/processes:
- The admin UI is self-contained and operationally usable.

Bad code/processes:
- Client-side analytics by reading the entire `ad_events` table does not scale.
- Email-based admin gating is not a security boundary; it assumes RLS properly enforces access.

Risks:
- If RLS is permissive, non-admin users could potentially read ad event data.
- Large ad event tables will degrade admin performance rapidly.

Concrete improvements:
- Create a server-side aggregation RPC for ad stats.
- Use role-based authorization (JWT claims or a dedicated `is_admin` flag) rather than email matching.

---

## Section 020: Supabase Edge Function Security + Env/Secrets Coupling

Trigger:
- Any frontend feature invokes edge functions (AI, connections, billing).

Entrypoints:
- Supabase function config: [supabase/config.toml](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml)
- Representative edge functions:
  - [supabase/functions/ai-products/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\ai-products\index.ts)
  - [supabase/functions/personalize/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\personalize\index.ts)
  - [supabase/functions/style-chat/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\style-chat\index.ts)
  - [supabase/functions/trending-feed/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\trending-feed\index.ts)
  - [supabase/functions/searchforaddprofile/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\searchforaddprofile\index.ts)

Touched data:
- Secrets expected across functions:
  - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `LOVABLE_API_KEY`
  - `FIRECRAWL_API_KEY` (optional)

State flow:
- Many functions are configured with `verify_jwt = false` in [supabase/config.toml](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml) and then implement their own auth checks.
- `connection-data-search` has no explicit `verify_jwt` entry (default behavior differs), which can cause inconsistent runtime behavior between functions.

Good code/processes:
- Several edge functions implement good hygiene: required env getters, sanitizers, and explicit error status mapping for 429/402.

Bad code/processes:
- Mixed verification strategy (`verify_jwt` false vs default) makes it hard to reason about which functions are truly protected.
- There are empty function directories (e.g. `bulk-generate-category-images`, `generate-category-image`) which implies incomplete deployment surfaces.

Risks:
- Misconfigured secrets will surface as runtime failures in critical paths (onboarding personalization, recommendations, billing).
- If an edge function forgets to check auth while `verify_jwt` is false, it becomes publicly callable.

Concrete improvements:
- Standardize edge auth: either enable `verify_jwt` everywhere and trust the platform, or enforce a consistent internal guard wrapper.
- Add a simple "health" endpoint or admin-only diagnostic route that checks which env vars are configured in a given deployment.
- Delete or implement empty function directories to reduce confusion and deployment noise.

---

## Section 021: Image Systems Evolution (category_images vs category_bank_photos vs website_asset_assignments vs dev overrides)

Trigger:
- The app needs to render category strip images, card images, avatars, and other visuals; operators need a way to upload and assign.

Entrypoints:
- Assignment table + policies (initial): [supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql)
- Assignment manage policies (later): [supabase/migrations/20260315172446_848cfbd8-a225-4236-ac8c-0a5fc3e24c6a.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260315172446_848cfbd8-a225-4236-ac8c-0a5fc3e24c6a.sql)
- Bank table: [supabase/migrations/20260315174111_6060bd9a-297d-41e7-920f-7845eb1570a8.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260315174111_6060bd9a-297d-41e7-920f-7845eb1570a8.sql)
- Website assignment system (unused in src):
  - [supabase/migrations/20260326051500_create_website_asset_assignments.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260326051500_create_website_asset_assignments.sql)
  - [supabase/migrations/20260326113000_store_strip_image_refs.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260326113000_store_strip_image_refs.sql)
- Per-user dev override table (unused in src): [supabase/migrations/20260325235900_dev_asset_image_overrides.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260325235900_dev_asset_image_overrides.sql)
- Current assignment helper used by runtime: [src/lib/imageOverrides.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageOverrides.ts)
- Current operator UI: [src/pages/PhotoGallery.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx)
- Legacy cleanup helper: [src/lib/legacyImageCleanup.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\legacyImageCleanup.ts)

Touched data:
- `category_images`: (category_key, gender) -> image_url (now often a `storage://...` ref).
- `category_bank_photos`: (category_key) -> bank image_url list.
- `website_asset_assignments`: asset_key -> bank_photo_id -> image_url (appears unused in current frontend).
- `dev_asset_image_overrides`: per-user overrides (appears unused in current frontend).
- Storage buckets:
  - historical: `category-images` (public bucket; legacy "bank" paths)
  - current: `photo-bank` (used by PhotoGallery uploads)
  - other: private buckets like `avatars`, `card-images`, `connection-photos`.

State flow:
- Runtime My Go Two strip rendering reads `category_images` for a fixed set of slot keys and resolves URLs (see earlier Section 006/007).
- Operator edits call `setImageUrl` / `deleteImageUrl` in [src/lib/imageOverrides.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageOverrides.ts).
- Legacy cleanup deletes rows referencing the old public `category-images/bank/...` URLs.

Good code/processes:
- The `storage://bucket/path` reference strategy is a strong long-term contract, and migration utilities exist to move from raw URLs.
- PhotoGallery's "direct slot editor" approach aligns with operator intent (assign to the actual slot that renders).

Bad code/processes:
- There are multiple overlapping assignment systems in the DB:
  - `category_images` (actively used)
  - `category_bank_photos` (used mostly for cleanup and possibly earlier workflows)
  - `website_asset_assignments` (not referenced by src)
  - `dev_asset_image_overrides` (not referenced by src)
  This increases cognitive load and makes it hard to know what is source-of-truth.
- `deleteImageUrl(imageKey)` deletes by `category_key` only and ignores gender, potentially wiping multiple rows.
- `getImageUrl(imageKey)` does not filter by gender and can return an arbitrary gender row if multiple exist.

Risks:
- Operator risk: deleting mappings or files can cascade in unexpected ways if multiple genders or multiple systems are in play.
- Maintainability risk: unused tables/migrations create false affordances and confuse future changes.

Concrete improvements:
- Declare one system-of-record for website/category assets (likely `category_images` + storage refs) and deprecate unused tables (or explicitly document them as legacy).
- Make `imageOverrides` API gender-aware (required arg) and ensure delete only affects a single (key, gender) tuple.
- Add a single "asset assignment" README in `docs/` explaining intended flow and which tables/buckets are live.

---

## Section 022: Repo Operating Rules + Product Constraints (NEXT_CHAT_HANDOFF as a Process Artifact)

Trigger:
- Contributors/agents join the repo and need to understand product-specific constraints, especially around My Go Two and asset flows.

Entrypoints:
- Handoff document: [NEXT_CHAT_HANDOFF.md](C:\Users\adamb\Documents\GitHub\my-go-two\NEXT_CHAT_HANDOFF.md)
- My Go Two implementation files referenced there:
  - [src/pages/dashboard/MyGoTwo.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx)
  - [src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx)
  - [src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)
  - [src/pages/PhotoGallery.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx)

Touched data:
- Not a runtime flow, but this file encodes:
  - terminology that maps directly onto code (preview strips vs category strips vs collapse)
  - hard behavioral constraints (hover/rotation/collapse rules)
  - explicit "do not reintroduce" legacy flows

State flow:
- The doc functions as a human-layer "policy" that constrains what changes are acceptable.

Good code/processes:
- This is a high-signal artifact: it maps product behavior to specific files and sets clear no-go rules.

Bad code/processes:
- Several constraints are enforced only by convention, not by code. Without automated checks, regressions can slip in.

Risks:
- Contributor risk: agents can inadvertently revive legacy asset flows or alter My Go Two behavior while "fixing performance".

Concrete improvements:
- Encode key My Go Two behavior constraints as runtime assertions (dev-only) or as UI tests (Playwright) so the rules are enforceable.
- Keep NEXT_CHAT_HANDOFF current by linking it to the actual persisted asset source-of-truth and removing references to unused/legacy systems.

---

## Section 023: Signup + Cached Profile Data (gotwo_signup_data) + OAuth Token Bridging

Trigger:
- User creates an account via `/signup` or uses OAuth on login/signup, then expects their basic identity fields (age/gender) to be applied.

Entrypoints:
- Signup page: [src/pages/Signup.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Signup.tsx)
- Auth provider signup-data applier: [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
- OAuth button: [src/components/GoogleSignInButton.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\components\GoogleSignInButton.tsx)
- Lovable auth bridge: [src/integrations/lovable/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\integrations\lovable\index.ts)

Touched data:
- LocalStorage: `gotwo_signup_data` stores `{ age, gender }` after signup.
- DB: `profiles` updates (age, gender) are applied after first SIGNED_IN.
- Supabase Auth: email/password signup flow requires email confirmation before session exists.

State flow:
- `/signup`:
  - calls `supabase.auth.signUp(...)` via `useAuth().signUp`.
  - caches `{ age, gender }` to localStorage as `gotwo_signup_data`.
  - navigates user to `/login` with a "check your email" toast.
- `AuthProvider` listens for `SIGNED_IN` and runs `applySignupData(userId)`:
  - reads and parses `gotwo_signup_data`, writes to `profiles`, then clears the localStorage key.
- OAuth:
  - `lovable.auth.signInWithOAuth(...)` returns tokens and then calls `supabase.auth.setSession(result.tokens)`.

Good code/processes:
- The "apply signup data on first SIGNED_IN" model is pragmatic and avoids needing a custom server-side signup pipeline.
- OAuth bridging into Supabase session gives the app a single auth primitive after sign-in.

Bad code/processes:
- Profile data depends on localStorage surviving between signup and email confirmation. If a user switches devices/browsers, cached age/gender is lost.
- The app has multiple auth/token sources (Supabase native + Lovable OAuth + dev-login). This increases the number of ways auth state can desync.

Risks:
- If `applySignupData` fails (RLS/policy/schema mismatch), it is silently ignored, leaving partially configured profiles.
- If token bridging fails, the user may "appear logged in" on the provider but not have a Supabase session, triggering redirects.

Concrete improvements:
- Persist signup profile fields in `user_metadata` at signUp time (or a dedicated table keyed by email) so they survive across devices.
- Normalize all auth entrypoints to return the same postcondition: a durable Supabase session + a persisted profile row.

---

## Section 024: Password Reset + Recovery Mode (Auth Event-driven UX)

Trigger:
- User visits `/forgot-password` to request a reset link; later returns via the recovery link and sets a new password.

Entrypoints:
- Password reset/recovery UI: [src/pages/ForgotPassword.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\ForgotPassword.tsx)
- Auth context method used: [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)

Touched data:
- Supabase Auth recovery flow (PASSWORD_RECOVERY event).

State flow:
- Request reset:
  - calls `useAuth().resetPassword(email)` which uses `supabase.auth.resetPasswordForEmail(...)` with redirect to `/reset-password`.
  - UI flips to "sent" state.
- Recovery:
  - listens to `supabase.auth.onAuthStateChange` and sets `isRecovery` when event is `PASSWORD_RECOVERY`.
  - calls `supabase.auth.updateUser({ password })` and then navigates to `/dashboard`.

Good code/processes:
- Event-driven recovery mode is correct: it reacts to Supabase auth event rather than URL parsing.

Bad code/processes:
- `/reset-password` route is wired to the same component as `/forgot-password` (see [src/App.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\App.tsx)). This is functional but reduces clarity of the mental model.

Risks:
- If the recovery event does not fire (cookie/session issues), the user may see the wrong UI.

Concrete improvements:
- Split into explicit routes/components for request vs recovery to make UX and developer workflow clearer.
- Add visible diagnostics in dev mode when recovery event is not detected.

---

## Section 025: Tooling Health (Lint/Build/Test) + Bundle/Perf Signals

Trigger:
- Developers run local checks (`npm run lint`, `npm run build`, `npm test`) and rely on them to detect regressions.

Entrypoints:
- Tool scripts: [package.json](C:\Users\adamb\Documents\GitHub\my-go-two\package.json)
- Lint status tracker (may be stale): [LINT_AUDIT.md](C:\Users\adamb\Documents\GitHub\my-go-two\LINT_AUDIT.md)
- Build config: [vite.config.ts](C:\Users\adamb\Documents\GitHub\my-go-two\vite.config.ts)
- Tailwind config: [tailwind.config.ts](C:\Users\adamb\Documents\GitHub\my-go-two\tailwind.config.ts)
- Example tests: [src/test/example.test.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\test\example.test.ts)

Observed behavior (this checkout, local):
- `npm run lint`: passes (no lint errors printed).
- `npm run build`: passes, but emits warnings:
  - Browserslist/caniuse-lite data is stale.
  - Tailwind warns about ambiguous class `ease-[cubic-bezier(0.22,1,0.36,1)]`.
- `npm test`: passes, but there is only a single example test.

Touched data:
- Not a runtime feature, but build output reveals bundle distribution:
  - Large route chunks include `DashboardHome` (~105kB) and `Questionnaires` (~145kB) in the emitted assets list.

Good code/processes:
- Production build is healthy and code splitting is functioning (most pages are their own chunks).

Bad code/processes:
- The test suite does not cover critical flows (auth stability, My Go Two loader/timers, photo gallery assignments, connection sharing).
- [LINT_AUDIT.md](C:\Users\adamb\Documents\GitHub\my-go-two\LINT_AUDIT.md) appears out of date relative to the current `npm run lint` outcome.

Risks:
- With minimal tests, regressions in stateful flows will be caught by humans (or users) rather than CI.
- Large stateful pages (DashboardHome, Questionnaires, ConnectionPage) correlate with runtime jank and hard-to-debug UI behavior.

Concrete improvements:
- Add Playwright or Vitest tests for 3 high-risk flows:
  - auth session persistence across route changes
  - My Go Two initial load + collapse rotation timing invariants
  - PhotoGallery upload -> assignment -> My Go Two reflects assignment
- Keep [LINT_AUDIT.md](C:\Users\adamb\Documents\GitHub\my-go-two\LINT_AUDIT.md) synchronized with reality (or delete it if it no longer serves a purpose).
- Address the Tailwind ambiguous class warning in the component where it appears to reduce CSS ambiguity.

---

## Section 026: Repo Self-Audit Tooling (Edge Function Audit + SQL Data Quality Checks)

Trigger:
- Developers/operators need fast feedback on:
  - which edge functions are risky (verify_jwt disabled or missing auth guards)
  - whether database data quality is degraded (null violations, orphan FKs, empty tables)

Entrypoints:
- Edge function security audit script: [scripts/audit-edge-functions.js](C:\Users\adamb\Documents\GitHub\my-go-two\scripts\audit-edge-functions.js)
- Database data quality checks: [scripts/sql-checks/data_quality.sql](C:\Users\adamb\Documents\GitHub\my-go-two\scripts\sql-checks\data_quality.sql)

Touched data:
- Edge audit reads:
  - [supabase/config.toml](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml)
  - all files under [supabase/functions](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions)
- Data quality script queries information_schema and all public tables.

State flow:
- Edge audit:
  - parses function blocks and flags any `verify_jwt=false`.
  - heuristically scans function source for auth guard patterns.
  - flags permissive CORS (`Access-Control-Allow-Origin: "*"`).
  - exits non-zero when any "fail" issues exist.
- Data quality SQL:
  - builds a temp results table of findings.
  - raises an exception (hard fail) only for severity=fail.

Good code/processes:
- These scripts are aligned with real operational pain: auth holes and degraded DB integrity.
- They can be integrated into CI as "gates" without touching runtime code.

Bad code/processes:
- The edge audit is heuristic and may false-positive or false-negative (e.g. auth handled via shared wrapper or different strings).

Risks:
- If these scripts are not run regularly (or not in CI), repo drift can reintroduce dangerous defaults.

Concrete improvements:
- Add a documented "quality pipeline" in `docs/` describing when to run these scripts and what to do when they fail.
- Extend the edge audit to understand shared auth wrappers under `supabase/functions/_shared/` to reduce false positives.

---

## Section 027: My Go Two Card Entries (card_entries CRUD) and Wiring Gaps

Trigger:
- User fills in a "product card" (e.g., Beverages) and expects it to be saved and to appear in their My Go Two coverflow/vault.

Entrypoints:
- Card entry DB adapter: [src/features/mygotwo/myGoTwoData.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\features\mygotwo\myGoTwoData.ts)
- Card entry types: [src/features/mygotwo/types.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\features\mygotwo\types.ts)
- Beverages product card UI (persists entries): [src/platform-ui/web/mygotwo/MyProductCardBeverages.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyProductCardBeverages.tsx)
- Connection view reads card entries (own list): [src/pages/dashboard/ConnectionPage.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\ConnectionPage.tsx)

Touched data:
- `card_entries` table:
  - `user_id`, `card_key`, `group_name`, `entry_name`, `field_values`, `image_url`, timestamps.

State flow:
- Data adapter supports:
  - `fetchMyGoTwoEntries(userId, cardKey)`
  - `createMyGoTwoEntry({ userId, cardKey, groupName, entryName, fieldValues })`
  - `updateMyGoTwoEntry({ entryId, entryName, fieldValues })`
  - `deleteMyGoTwoEntry(entryId)`
- Beverages card save behavior:
  - If `activeEntry` is present: updates that entry.
  - Else: creates a new entry in `card_entries` and calls `onSaved(createdId)`.

Good code/processes:
- CRUD is clearly separated from UI and uses Supabase returning inserts (`.select('*').single()`) for created entries.
- Field values are normalized through `slugFieldLabel` to stable keys.

Bad code/processes:
- There is no visible integration point in the My Go Two stage that fetches existing entries and sets `activeEntry` for edits. The adapter exposes `fetchMyGoTwoEntries`, but it appears unused in the current UI wiring.
- If a card is rendered with `activeEntry=null` and `onSaved` does not update parent state, repeated saves can create duplicate entries, which is a user-facing data integrity issue.

Risks:
- UX risk: users think they're "updating" a card but are actually creating multiple near-identical entries.
- Maintainability risk: entry lifecycle (create/select/update/delete) needs a single owning state machine, otherwise each card type will implement its own partial logic.

Concrete improvements:
- Define a single "Card Entry Controller" hook/state machine per cardKey:
  - load entries
  - select active entry
  - save updates
  - create new
  - delete
  and pass `activeEntry` + callbacks into product-card components.
- Add a simple invariant check: if `activeEntry` is null but an entry already exists for (user, cardKey, groupName), prompt the user to edit existing instead of creating duplicates.

---

## Section 028: Storage Policy Drift vs Frontend Resolver (photo-bank/images-mygotwo-strip not treated as private)

Trigger:
- UI resolves `storage://bucket/path` refs into usable URLs (public or signed). This affects PhotoGallery and My Go Two strip assets.

Entrypoints:
- Resolver and private bucket list: [src/lib/storageRefs.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts)
- Private bucket policies migration: [supabase/migrations/20260326095000_private_storage_buckets.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260326095000_private_storage_buckets.sql)
- PhotoGallery uploads and display: [src/pages/PhotoGallery.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx)

Touched data:
- Storage buckets:
  - `photo-bank` (declared `public=false`, policies allow any authenticated select)
  - `images-mygotwo-strip` (declared `public=false`, policies allow any authenticated select)
  - `avatars-1` (declared `public=false`, policies restricted to own folder)

State flow:
- [src/lib/storageRefs.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts) decides:
  - if bucket is in `PRIVATE_BUCKETS`, sign URLs (`createSignedUrl(s)`)
  - otherwise use `getPublicUrl`
- Current `PRIVATE_BUCKETS` does NOT include `photo-bank` or `images-mygotwo-strip`.

Good code/processes:
- Centralizing signing/public URL behavior is correct; it avoids scattered storage logic.

Bad code/processes:
- The private/public source-of-truth is split between:
  - DB migrations/policies
  - a hard-coded frontend allowlist
  This creates a silent failure mode when a bucket is private but treated as public.

Risks:
- If migrations are applied as written (private buckets), `resolveStorageUrl(...)` for `storage://photo-bank/...` and `storage://images-mygotwo-strip/...` will produce non-working public URLs.
- This mismatch would manifest as "images missing" or "gallery loads but thumbnails are broken", and may be environment-dependent depending on whether migrations ran.

Concrete improvements:
- Add `photo-bank` and `images-mygotwo-strip` to `PRIVATE_BUCKETS` (or better: fetch bucket privacy from a server-provided config).
- Add a dev-only assertion: when `getPublicUrl` returns an empty/invalid URL for a storage ref, log the bucket name prominently so the operator can fix policy drift.

---

## Section 029: Edge Function Audit Script Output (Concrete Findings)

Trigger:
- Run `node scripts/audit-edge-functions.js` to get an automated snapshot of edge-function risk posture.

Entrypoints:
- Script: [scripts/audit-edge-functions.js](C:\Users\adamb\Documents\GitHub\my-go-two\scripts\audit-edge-functions.js)

Observed output (this checkout):
- Total issues flagged: 25.
- Blocking/fail findings include:
  - Multiple functions with `verify_jwt=false` in [supabase/config.toml](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml) (ai-quizzes, ai-products, trending-feed, check-subscription, create-checkout, customer-portal, searchforaddprofile, sync-category-registry).
  - A heuristic false-positive: `_shared/knowMeCatalog.ts` flagged as missing auth guard (it is a library module, not an HTTP handler).
- Warning findings include permissive CORS (`Access-Control-Allow-Origin: "*"`) across many functions.

How it connects through the app:
- The functions flagged are directly used by critical UX:
  - onboarding personalization
  - recommendations
  - billing
  - connection linking

Good code/processes:
- Having this script at all is a strong operational pattern; it prevents "security posture drift" from being purely tribal knowledge.

Bad code/processes:
- `verify_jwt=false` is overused: it forces every function to be perfectly self-guarded forever.

Risks:
- Any new function added with `verify_jwt=false` but missing an auth check becomes publicly callable.

Concrete improvements:
- Update the audit script to ignore `supabase/functions/_shared/**` files.
- Decide and document a single edge-function auth strategy (platform JWT verification vs internal guard wrapper).

---

## Section 030: Category Registry (DB as Source-of-Truth) vs Static Runtime Metadata (Drift Risk)

Trigger:
- The app needs category/subcategory definitions (fields, genders, labels) to drive card templates and user flows.

Entrypoints:
- DB schema migration: [supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql)
- Admin sync UI (not routed): [src/pages/admin/CategorySync.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\admin\CategorySync.tsx)
- Sync edge function (service role, destructive): [supabase/functions/sync-category-registry/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\sync-category-registry\index.ts)
- Seed placeholder: [src/data/categoryRegistrySeed.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\categoryRegistrySeed.ts)
- Static My Go Two strip metadata (used at runtime): [src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.images.ts)
- Types that claim DB is source-of-truth: [src/data/templateSubtypes.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\templateSubtypes.ts)

Touched data:
- `category_registry` table (key, label, section, fields JSON, gender allowlists, prompts).

State flow:
- Intended: category_registry drives category definitions.
- Actual in current frontend:
  - there is no hook/service that reads `category_registry` for My Go Two.
  - `CategorySync` seed is empty and the page is not wired to routes.
  - My Go Two uses static metadata for strips and relies on DB only for image assignments (`category_images`).
- Sync edge function behavior:
  - deletes all rows from `category_registry` and reinserts provided rows.
  - does not perform auth checks (and config has `verify_jwt=false`).

Good code/processes:
- Putting category definitions in a DB table is a good scaling strategy (multiple genders, schema evolution, admin tooling).

Bad code/processes:
- The system is half-migrated: code comments claim DB is source-of-truth, but runtime uses static TS metadata.
- `sync-category-registry` is a destructive admin operation exposed as a public edge function unless guarded.

Risks:
- Drift risk: multiple sources of truth (DB registry, static TS metadata) will diverge.
- Security risk: an unguarded destructive sync could wipe categories if exposed.

Concrete improvements:
- Either complete the migration (read category_registry in the app) or remove/deprecate unused registry tooling and comments to reduce false affordances.
- If keeping the sync function: require JWT verification and enforce admin-only authorization.
- Route-gate CategorySync behind explicit dev/admin routing if it must exist.

---

## Section 031: Add Connection Modal (Search + Invite Share Tokens + Growth Tracking)

Trigger:
- From Dashboard home, user opens "Add Connection" and tries to connect with another person by search, email invite, or share link/QR.

Entrypoints:
- Modal: [src/components/home/AddConnectionModal.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\components\home\AddConnectionModal.tsx)
- Backend: [supabase/functions/searchforaddprofile/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\searchforaddprofile\index.ts)

Touched data:
- Connections:
  - `couples` (create-connection-request, pending/accepted semantics)
  - discovery tables / RPCs (search; see edge function)
- Invite share tokens:
  - share token table (created via `prepare-connection-share`)
  - invite events table (tracked via `track-connection-invite-event`)

State flow:
- The modal supports three primary paths:
  1. Search:
     - invokes `searchforaddprofile` with `{ action:"search", query }`
     - optionally seeds demo profiles if query matches demo patterns and no results.
     - clicking a result invokes `{ action:"create-connection-request", target_user_id, ... }`.
  2. Invite by email/phone/username:
     - first calls `{ action:"prepare-connection-share" }` to mint a share token + invite link + suggested share message.
     - then calls `{ action:"send-invite-email" }` with invite target info and invite_link.
  3. Share link/QR:
     - preloads a share token when the QR tab opens.
     - copy/native share triggers `{ action:"track-connection-invite-event", event_type:"share_clicked", ... }` best-effort.

Backend/storage touchpoints:
- One edge function is responsible for:
  - search
  - creating connection requests
  - minting share tokens
  - sending invites
  - tracking invite events

Good code/processes:
- The UX is operator-friendly: it caches a share token per channel and avoids reminting repeatedly.
- Growth tracking is explicitly non-blocking (errors are swallowed).
- The UI includes helpful, product-aware error messaging for missing RPC/migration states.

Bad code/processes:
- The edge function interface is large and loosely typed; frontend repeatedly inspects `data?.error` patterns.
- Multiple invite targeting modes (email/phone/username) exist in UI, but the backend contract needs to be verified for each path.

Risks:
- If `prepare-connection-share` or `send-invite-email` fails, users may assume an invite was sent when it was not (depending on toast timing).
- Because this is a top-of-funnel feature, reliability issues here translate directly into lower activation.

Concrete improvements:
- Split `searchforaddprofile` into smaller, purpose-named functions (or at least smaller internal modules) so contracts are easier to test.
- Return typed discriminated unions for status (`already_connected`, `pending_exists`, `sent`) and rely less on string matching.
- Add a simple "Invite sent" record in the UI (and/or DB) so operators can see what happened without guessing.

---

## Section 032: Onboarding Flow (Profile Answers -> Profiles -> Personalization Edge -> User Preferences)

Trigger:
- User enters `/onboarding` either after signup or via Settings edit mode (`?edit=true`).

Entrypoints:
- UI: [src/pages/Onboarding.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Onboarding.tsx)
- Questions source: [src/data/profileQuestions.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\profileQuestions.ts)
- Personalization context (read + refetch):
  - [src/contexts/PersonalizationContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\PersonalizationContext.tsx)
  - [src/contexts/personalization-context.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\personalization-context.ts)
- Backend personalization edge:
  - [supabase/functions/personalize/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\personalize\index.ts)

Touched data:
- `profiles`:
  - `gender`, `birthday`, `anniversary` updated immediately during onboarding.
- `user_preferences`:
  - `profile_answers` (jsonb)
  - `onboarding_complete` (boolean)
  - `ai_personalization` (jsonb)

State flow:
- UI phases: `intro` -> `profile` -> `personalizing` -> `complete`.
- `answers` is local state built up as user moves through questions.
- On completion:
  1. Normalize identity/gender and optional dates.
  2. Persist to `profiles` (gender/birthday/anniversary).
  3. Upsert into `user_preferences` with `profile_answers` + `onboarding_complete`.
  4. Invoke `personalize` edge with `profile_answers`.
  5. Race the edge call against a 30s timeout; proceed to `complete` regardless.
  6. Refetch personalization context afterwards.

Backend/storage touchpoints:
- Edge function calls third-party AI gateway via `LOVABLE_API_KEY`.
- Edge function writes `ai_personalization` back into `user_preferences`.

Good code/processes:
- The `Promise.race([personalizationPromise, timeoutPromise])` is a strong UX decision: onboarding never hard-blocks on AI.
- Writes core profile fields (`profiles.gender`, dates) separately from preference json, which helps keep ìidentityî authoritative.

Bad code/processes:
- The system is effectively ìAI-optionalî, but downstream UX assumes `persona_summary` exists (many screens render it). When AI is unavailable, the fallback copy can feel generic and reduces perceived value.
- The edge function accepts and stores whatever JSON the model returns; the client then applies aggressive sanitization heuristics in [src/contexts/PersonalizationContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\PersonalizationContext.tsx). This indicates the stored data is frequently malformed (non-ASCII corruption, brace fragments) and the fix is happening too late.
- Multiple files show corrupted unicode (ì‚Äîî, ì‚Ä¶î) in user-facing strings. This is an actual live UX defect (copy quality) and not just lint.

Risks:
- Operator risk: if `LOVABLE_API_KEY` is unset in an environment, `personalize` returns 500 and the app relies on fallback behavior. Thatís fine, but it increases ìwhy does this feel empty?î reports.
- Data quality risk: storing malformed AI outputs into `user_preferences.ai_personalization` forces every client to defend itself. This compounds over time.

Concrete improvements:
- Move sanitization to the edge function before writing to DB (single source of truth for AI output hygiene) and store a `personalization_version` to evolve safely.
- Store an explicit `personalization_status` (ok/timeout/error) + `personalization_error_code` in `user_preferences` so the UI can render intentional fallback states.
- Fix text encoding in source (or via a CI check) so ì‚Äî/‚Ä¶î never ship.

---

## Section 033: ìKnow Meî Questionnaires (Free gating + JSON answer persistence + Style Chat Edge)

Trigger:
- User opens `/dashboard/questionnaires` and answers questions to improve personalization.

Entrypoints:
- UI: [src/pages/dashboard/Questionnaires.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Questionnaires.tsx)
- Data bank:
  - [src/data/knowMeQuestions.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\knowMeQuestions.ts)
- State providers:
  - [src/contexts/PersonalizationContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\PersonalizationContext.tsx)
  - [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
- Backend edge:
  - [supabase/functions/style-chat/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\style-chat\index.ts)

Touched data:
- `user_preferences.profile_answers` updated on every answer.
- `user_preferences.ai_personalization` is not directly changed here, but the UI depends on `personalization.persona_summary`.

State flow:
- The page builds ìcategoriesî from question banks and computes progress.
- Free tier gating:
  - `FREE_CATEGORY_LIMIT = 4` questions per category.
  - `FREE_THIS_OR_THAT_LIMIT = 8` total per live This-or-That category.
- Answer save path:
  1. Local `selections` updated.
  2. `persistProfileAnswers` reads current user id via `supabase.auth.getUser()`.
  3. Writes `user_preferences.update({ profile_answers: cleaned })`.
  4. Calls `refetch()` on personalization context to re-hydrate `profileAnswers`.

Style chat path:
- Sends `{ message, profile_answers, ai_personalization }` to `style-chat` edge.
- `style-chat`:
  - Requires Authorization header (session).
  - Requires `LOVABLE_API_KEY`.
  - Calls `https://ai.gateway.lovable.dev/...` and returns `reply`.
  - Has explicit 429 and 402 status handling.

Good code/processes:
- The state model is clear: `user_preferences.profile_answers` is the single persisted store.
- Free-tier gating is implemented as a predictable product rule (hard limits, explicit lock copy).
- `style-chat` has decent ìrate limit / creditsî error mapping.

Bad code/processes:
- Answer persistence is chatty: each click is a DB update + full context refetch. This is expensive (network + render) and can feel slow on mobile.
- The answer store is a single JSON blob; concurrency is last-write-wins. Multiple tabs/devices can clobber each other.
- UI copy contains corrupted unicode (ì‚Äîî), which reads low quality.

Risks:
- Performance risk: rapid answering can create a thundering herd of `update + refetch` requests.
- Reliability risk: if `user_preferences` row is missing (shouldnít be, but can happen), `.update().eq(user_id)` will fail silently in this UI path (it only toasts ìFailed to save answerî).

Concrete improvements:
- Batch answer writes: debounce or ìSave sectionî commit instead of updating per selection.
- Add optimistic local update of `profileAnswers` to avoid full refetch per answer (refetch on pause/end of section).
- Consider moving profile answers into a normalized table if the product needs per-question analytics, partial merges, or conflict resolution.

---

## Section 034: Recommendations (Frontend is a Viewer; Backend is a Weekly Cached Generator)

Trigger:
- User opens `/dashboard/recommendations` expecting usable recommendations.

Entrypoints:
- UI: [src/pages/dashboard/Recommendations.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Recommendations.tsx)
- Pagination hook: [src/hooks/usePagination.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\hooks\usePagination.ts)
- Backend edge: [supabase/functions/ai-products/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\ai-products\index.ts)
- DB schema:
  - [supabase/migrations/20260316175025_d34dc734-c433-46d6-84fc-f842382d15c9.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260316175025_d34dc734-c433-46d6-84fc-f842382d15c9.sql) (`weekly_recommendations`)
  - [supabase/migrations/20260318160000_resolved_recommendation_catalog.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260318160000_resolved_recommendation_catalog.sql) (`resolved_recommendation_catalog`)

Touched data:
- Edge reads `user_preferences.profile_answers` + `user_preferences.ai_personalization`.
- Edge writes:
  - `weekly_recommendations.products` per user/week.
  - `resolved_recommendation_catalog` (global cache keyed by fingerprint).

State flow (frontend):
- Waits for personalization context to load; then calls `ai-products`.
- Handles 401 by calling `supabase.auth.refreshSession()` and retrying once.
- Free gating is purely UI: unsubscribed users see only 4 items.
- ìSaveî toggle is local-only (`savedItems` Set) and does not persist anywhere.
- ìShareî is toast-only; no real partner-sharing mechanism.
- UI ships a static image bank imported from local assets; real product images are optional.

State flow (backend):
- Requires Authorization header; returns 401 if missing/expired.
- Computes `week_start` (UTC Monday) and returns cached products if `source_version` matches current catalog version.
- Generates fallback recommendations from local catalog logic.
- If `LOVABLE_API_KEY` is set, asks AI gateway for intents; resolves intents to catalog entries and optionally scrapes product detail pages using Firecrawl if `FIRECRAWL_API_KEY` is set.
- Upserts `weekly_recommendations` and returns `{ products, cached, generated_at }`.

Good code/processes:
- Weekly caching is a good cost-control strategy: users donít regenerate every visit.
- The backend has clear ìfeature flagsî via env vars (`LOVABLE_API_KEY`, `FIRECRAWL_API_KEY`).

Bad code/processes:
- The frontend experience is not action-completing: ìsave/shareî are fake interactions from a product perspective.
- `resolved_recommendation_catalog` RLS allows any authenticated user to insert/update all rows. This is a poisoning risk for a global catalog.
- The file contains visible encoding corruption in comments and UI strings (ì‚îÄî).

Risks:
- Trust risk: recommendations feel like a demo because the CTA actions do not change any persistent state.
- Security/data risk: global catalog writable by any authenticated user.
- Cost/perf risk: if weekly cache misses are common (catalog version bumps, force_refresh), the function can become expensive (AI + scraping).

Concrete improvements:
- Decide the real ìsaveî target: e.g. convert a recommendation into a `card_entry` in a specific group, or into a ìsaved recommendationsî table.
- Tighten RLS on `resolved_recommendation_catalog` (admin/service role writes; authenticated read-only) and write through the edge.
- Normalize how product images work: either always use `product_image_url` from resolver or always use the local bank as explicit ìillustrationî.

---

## Section 035: Notifications (Premium Gate + Client-side Deletes + Realtime Fan-out)

Trigger:
- User opens `/dashboard/notifications`.

Entrypoints:
- UI: [src/pages/dashboard/Notifications.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\Notifications.tsx)

Touched data:
- `notifications` table:
  - Read list for `user_id`.
  - Update `is_read`.
  - Delete rows.

State flow:
- If user is not subscribed: show PremiumLockCard.
- If subscribed:
  - Fetch all notifications by `user_id`, descending.
  - Subscribe to `postgres_changes` for `notifications` with no filter; on any event, refetch list.
  - Client provides actions: mark one read, mark all read, delete one.

Good code/processes:
- The UX is simple and understandable.
- Pagination is used for list density (`pageSize: 8`).

Bad code/processes:
- Realtime subscription is unfiltered (table-wide). Even though refetch queries by user, the client may refetch due to other usersí writes, creating pointless work.
- Writes ignore errors (delete/read). The UI assumes success.
- Copy strings include encoding corruption (ìLoading‚Ä¶î, ì‚Äîî).

Risks:
- Performance risk at scale: table-wide realtime channel with refetch on every change.
- UX risk: user taps delete/read and nothing happens server-side (RLS failure, offline), but UI optimistically changes anyway.

Concrete improvements:
- Add realtime filter: `{ filter: \`user_id=eq.${user.id}\` }`.
- Handle errors and revert optimistic updates when needed.
- Add ìempty stateî only after confirming fetch succeeded to avoid flashing.

---

## Section 036: Admin Surfaces (Sponsored Products + Ad Events + Category Sync)

Trigger:
- Operator uses admin screens to manage sponsored products and category registry.

Entrypoints:
- Sponsored admin UI: [src/pages/admin/SponsoredAdmin.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\admin\SponsoredAdmin.tsx)
- Ad event tracking: [src/lib/adTracking.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\adTracking.ts)
- Sponsored schema: [supabase/migrations/20260316081842_a31191b0-9ff5-4a1e-8987-2edbb94dbb60.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260316081842_a31191b0-9ff5-4a1e-8987-2edbb94dbb60.sql)

Category sync:
- UI: [src/pages/admin/CategorySync.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\admin\CategorySync.tsx)
- Seed data: [src/data/categoryRegistrySeed.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\categoryRegistrySeed.ts)
- Backend edge: [supabase/functions/sync-category-registry/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\sync-category-registry\index.ts)

Touched data:
- `sponsored_products` and `ad_events`.
- `category_registry` (full table delete + reinsert).

State flow (sponsored):
- UI gates by `user.email === 'adambozman@gmail.com'` (client-side convenience).
- Real enforcement relies on RLS policy checking `auth.jwt()->>'email'`.
- Analytics loads all `ad_events` then counts impressions/clicks in the browser.

State flow (category sync):
- UI calls edge with all seed rows.
- Edge uses `SUPABASE_SERVICE_ROLE_KEY` and deletes every row in `category_registry`, then reinserts in batches.

Good code/processes:
- The sponsored RLS policies are aligned with the intended admin model.

Bad code/processes:
- Sponsored analytics does a full-table read and client-side aggregation; this wonít scale.
- `sync-category-registry` edge is extremely destructive and has no auth guard in code (and uses CORS `*`). If exposed, it can wipe category registry.

Risks:
- Operator risk: a single click wipes category registry; no ìdry runî, no diff, no backup.
- Security risk: service-role edges must be extremely tightly controlled (verify_jwt true + internal allowlist). Code currently doesnít enforce.

Concrete improvements:
- Add an RPC for ad analytics aggregates (or at least a server-side grouped view) so admin UI loads bounded data.
- Lock `sync-category-registry` behind explicit admin checks and require an HMAC/admin secret (in addition to JWT).
- Prefer non-destructive sync: upsert by key, delete only rows missing from seed, keep historical IDs stable.

---

## Section 037: Auth + Session + Invite Handoff (Login/Signup/Dev Login/OAuth)

Trigger:
- User signs in (`/login`), signs up (`/signup`), or follows an invite link (`/connect?token=...`).

Entrypoints:
- Auth provider:
  - [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
  - [src/contexts/auth-context.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\auth-context.ts)
- Login UI:
  - [src/pages/Login.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Login.tsx)
- Signup UI:
  - [src/pages/Signup.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Signup.tsx)
- OAuth buttons:
  - [src/components/GoogleSignInButton.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\components\GoogleSignInButton.tsx)
  - [src/components/AppleSignInButton.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\components\AppleSignInButton.tsx)
  - [src/integrations/lovable/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\integrations\lovable\index.ts)
- Dev login edge:
  - [supabase/functions/dev-login/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\dev-login\index.ts)
- Invite entrypoint:
  - [src/pages/Connect.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Connect.tsx)
  - [src/layouts/DashboardLayout.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\layouts\DashboardLayout.tsx)

Touched data:
- Supabase auth session (localStorage) via [src/integrations/supabase/client.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\integrations\supabase\client.ts).
- `user_preferences.onboarding_complete` is used for post-login routing.
- `profiles` is updated on signup (cached signup data) and during onboarding.

State flow:
- Provider layer:
  - `AuthProvider` subscribes to `supabase.auth.onAuthStateChange` and calls `getSession()` on mount.
  - `loading` gates dashboard layout.
  - `checkSubscription()` is triggered on session changes, and repeats every 60s.
- Email/password login:
  - `useAuth().signIn` -> `navigateAfterLogin()` -> checks `user_preferences.onboarding_complete` and routes to `/onboarding` or `/dashboard`.
- Dev login path (for allowlisted emails):
  - `Login.tsx` calls `dev-login` edge -> receives `{ access_token, refresh_token }` -> `supabase.auth.setSession()` -> same `navigateAfterLogin()`.
- OAuth path:
  - Google/Apple buttons use `@lovable.dev/cloud-auth-js` to sign-in, then `supabase.auth.setSession(result.tokens)`.
- Invite handoff:
  - `/connect?invite=...` or `/connect?token=...` stores values in localStorage (`gotwo_invite`, `gotwo_invite_token`) if user isnít signed in.
  - After sign-in, [src/layouts/DashboardLayout.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\layouts\DashboardLayout.tsx) processes only `gotwo_invite` (inviter id) and invokes `searchforaddprofile` action `link-by-inviter`.

Backend/storage touchpoints:
- Dev login edge uses service role to generate a magic link then verifies OTP to create a session.
- Multiple edges depend on strict env presence (`SUPABASE_SERVICE_ROLE_KEY`, etc.) and all are CORS `*`.

Good code/processes:
- `navigateAfterLogin()` is product-aware: it routes unfinished users to onboarding.
- Dev login is intentionally designed to avoid password churn and token revocation.

Bad code/processes:
- Duplicate auth integration surface (direct supabase auth + Lovable OAuth wrapper + dev-login) increases debugging complexity.
- Invite token handoff is incomplete: `gotwo_invite_token` is stored, but `DashboardLayout` only processes `gotwo_invite` (inviter_id). Token-based invites rely on `/connect` running while already authed.
- The app uses multiple similarly named context files (`AuthContext.tsx` vs `auth-context.ts`) which is easy to import incorrectly and can create subtle bugs on case-sensitive filesystems.

Risks:
- UX risk: invite token stored but not processed if user signs in then lands directly in dashboard; user thinks connection is broken.
- Reliability risk: if any env config is missing, auth flows may fail late (e.g., dev-login, subscription checks), yielding confusing partial states.

Concrete improvements:
- Consolidate post-login invite processing: handle both `gotwo_invite` and `gotwo_invite_token` in one place (DashboardLayout or a dedicated hook).
- Add explicit instrumentation around session lifecycle (SIGNED_IN, TOKEN_REFRESHED, SIGNED_OUT) so ìkicked to loginî reports can be correlated.
- Enforce consistent import casing (lint rule / CI check) to prevent split-brain contexts.

---

## Section 038: Dashboard Home Search (Connection Circle Search via Service-role Edge + RPC)

Trigger:
- User types into dashboard ìhome searchî (searching both own entries and connection-visible entries).

Entrypoints:
- UI: [src/pages/dashboard/DashboardHome.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\DashboardHome.tsx)
- Edge function: [supabase/functions/connection-data-search/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\connection-data-search\index.ts)
- RPC used by edge:
  - `get_connection_visible_card_entries` (defined in connection security migrations; see earlier connection-safe SQL files).

Touched data:
- `couples` (accepted connections)
- `card_entries` (self)
- RPC output for connection-visible entries (partner)

State flow:
- Frontend gathers `{ action: 'home-search', query, scope, limit }` and invokes the edge.
- Edge authenticates via `supabase.auth.getUser(token)` then uses service role client for all reads.
- For self:
  - Direct `card_entries` read filtered by `.or(group_name.ilike... , entry_name.ilike...)`.
- For each connection:
  - Calls RPC `get_connection_visible_card_entries(p_couple_id, p_owner_user_id, p_connection_user_id)`.
  - Filters results in Deno (`matchesQuery`) and truncates.
- UI maps results into two buckets: ìYouî and ìCircleî.

Good code/processes:
- Centralizing circle visibility logic into an RPC is the right architecture; the edge becomes a coordinator.

Bad code/processes:
- Service role edge does query-string interpolation in `.or( ... %${rawQuery}% ...)` which can break on special characters and is hard to reason about.
- Per-connection RPC fan-out can be expensive for users with many connections.
- The edge returns errors by bailing out on the first failing connection RPC; a single connection failure can blank all search.

Risks:
- Performance risk: O(N connections) RPC calls per search.
- Reliability risk: certain query characters can break PostgREST `.or(...)` filters.

Concrete improvements:
- Move search into a single SQL RPC that accepts `p_query` as a parameter and returns both self + circle results with correct escaping.
- Return partial results on per-connection failures (best effort) and include an `errors[]` field for observability.
- Add server-side ranking (recently edited, shared relevance) so search results feel intentional.

---

## Section 039: Edge Functions Surface (verify_jwt config vs in-function auth, service role usage, and frontend call graph)

Trigger:
- Any call to `supabase.functions.invoke(...)` from the frontend, or direct invocation of edge endpoints.

Entrypoints:
- Supabase functions config: [supabase/config.toml](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml)
- Edge functions directory: [supabase/functions](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions)
- Frontend callsites (complete list from repo scan):
  - `searchforaddprofile`: DashboardLayout, SettingsPage, AddConnectionModal, ConnectionPage, Connect page
  - `connection-data-search`: DashboardHome
  - `personalize`: Onboarding
  - `style-chat`: Questionnaires
  - `ai-products`: Recommendations
  - `dev-login`: Login (dev bypass)
  - `check-subscription`, `create-checkout`, `customer-portal`: AuthProvider/SubscriptionSection/Settings
  - `sync-category-registry`: CategorySync admin screen

verify_jwt configuration:
- `verify_jwt = false` is set for:
  - ai-quizzes, ai-products, trending-feed
  - check-subscription, create-checkout, customer-portal
  - searchforaddprofile
  - sync-category-registry
- `connection-data-search` has no explicit entry (behavior depends on Supabase defaults; in practice the function code expects an Authorization header).

Observed auth patterns in function code:
- ìGood-ishî (explicit Authorization enforcement in code):
  - [supabase/functions/ai-products/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\ai-products\index.ts) returns 401 when Authorization missing and re-validates user.
  - [supabase/functions/style-chat/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\style-chat\index.ts) requires Authorization.
  - [supabase/functions/personalize/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\personalize\index.ts) requires Authorization.
  - [supabase/functions/create-checkout/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\create-checkout\index.ts) requires Authorization.
  - [supabase/functions/customer-portal/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\customer-portal\index.ts) requires Authorization.

- High-risk (service role + weak/absent guard):
  - [supabase/functions/sync-category-registry/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\sync-category-registry\index.ts)
    - Uses `SUPABASE_SERVICE_ROLE_KEY`.
    - Deletes entire `category_registry` and reinserts.
    - No Authorization check at all.
  - [supabase/functions/connection-data-search/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\connection-data-search\index.ts)
    - Uses service role key.
    - Does check Authorization token, but then performs powerful reads.
    - Performs query-string interpolation in `.or(ilike...)`.
  - [supabase/functions/check-subscription/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\check-subscription\index.ts)
    - Uses `SUPABASE_SERVICE_ROLE_KEY` to validate user token.
    - Returns `{ subscribed: false }` on auth failure instead of a 401, which is product-friendly but makes auth issues harder to detect.

Cross-cutting backend issues:
- Many functions have `Access-Control-Allow-Origin: *` and allow broad headers.
- Several functions parse untyped `req.json()` and then assume shapes; a subset attempt sanitization, but many do not.
- Several functions depend on third-party AI gateway keys (`LOVABLE_API_KEY`, optional `FIRECRAWL_API_KEY`).

Product/UX implications:
- `verify_jwt = false` combined with incomplete in-function checks can silently turn ìinternal admin toolingî into public destructive endpoints.
- Returning 200 unsubscribed on auth failure (check-subscription) prevents hard failures, but it can cause confusing premium gating when sessions are actually broken.

Concrete improvements:
- Set `verify_jwt = true` for every function by default, then explicitly allow unauthenticated functions only when needed.
- For any service-role function:
  - Require a validated user AND an admin allowlist check in code.
  - Consider an additional shared secret/HMAC for destructive operations.
- Standardize request validation (zod-style or manual guards) so edge handlers donít rely on ìshape luckî.
- Tighten CORS to known origins for production deployments.

---

## Section 040: Developer Workflow Reality Check (Build/Lint/Test Signals vs Repo Notes)

Trigger:
- Developer runs local checks or CI runs basic pipelines.

Entrypoints:
- Scripts: [package.json](C:\Users\adamb\Documents\GitHub\my-go-two\package.json)
- Repo note: [LINT_AUDIT.md](C:\Users\adamb\Documents\GitHub\my-go-two\LINT_AUDIT.md)
- Example tests: [src/test/example.test.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\test\example.test.ts)

Observed current behavior (this checkout):
- `npm run lint`: exits 0 (passes).
- `npm test` (`vitest run`): exits 0 (1 trivial test).

Good code/processes:
- Having a single command for lint and tests is correct and helps maintain velocity.

Bad code/processes:
- [LINT_AUDIT.md](C:\Users\adamb\Documents\GitHub\my-go-two\LINT_AUDIT.md) currently claims `npm run lint` fails with large error counts. In the current repo state, that file appears stale and therefore actively misleading.
- Test coverage signal is effectively nonexistent; ìtests passî means almost nothing because thereís only an example test.

Risks:
- Developer workflow risk: stale ìauditî docs cause people to chase ghosts or assume quality gates are worse than they are.
- Product risk: a codebase can ship UX regressions with green tests because there are no meaningful tests around auth, routing, storage resolution, or My Go Two strip behavior.

Concrete improvements:
- Keep `LINT_AUDIT.md` auto-updated or remove it; a drifting status file is worse than none.
- Add a few high-value integration tests:
  - auth routing (login -> onboarding vs dashboard)
  - storage ref resolution for strip assets
  - My Go Two strip rendering invariants (preview strips, collapse behavior)
  - PhotoGallery slot assignment writes `category_images` and triggers override change event

---

## Section 041: ìDeadî Surfaces (Unrouted pages, empty edge functions, and demo routes)

Trigger:
- Developer/operator expects a feature to exist because files exist in repo.

Entrypoints:
- Routes: [src/App.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\App.tsx)
- Admin pages folder: [src/pages/admin](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\admin)
- Edge functions folder: [supabase/functions](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions)

Observed ìdead or confusingî items:
- `CategorySync` UI exists but is not routed in [src/App.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\App.tsx).
  - File: [src/pages/admin/CategorySync.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\admin\CategorySync.tsx)
  - Impact: category registry sync is either unused, or operators must hit it via manual dev navigation/hardcoding.
- Demo/test route is shipped:
  - `/carousel-test` -> [src/pages/CarouselTest.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\CarouselTest.tsx)
- Edge function directories exist but are empty:
  - [supabase/functions/bulk-generate-category-images](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\bulk-generate-category-images)
  - [supabase/functions/generate-category-image](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\generate-category-image)

Product/UX impact:
- Repo shape implies capabilities that the app cannot actually deliver; this causes repeated ìwhy doesnít X workî confusion.

Developer workflow impact:
- Unrouted pages and empty function dirs increase maintenance surface and slow comprehension.

Concrete improvements:
- Establish an explicit ìOperator/Adminî route group with a single guarded entrypoint (even if dev-only) and route all admin tools there.
- Remove or clearly label demo routes (feature flag, env guard) so they canít be mistaken for real user-facing features.
- Delete empty edge function directories or add a README explaining the intended future plan.

---

## Section 042: Public Feed (Security-definer RPC backend + client refresh loops)

Trigger:
- User opens `/dashboard/public-feed` to browse public outfits/products, follow creators, and react.

Entrypoints:
- UI: [src/pages/dashboard/PublicFeed.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\PublicFeed.tsx)
- Backend schema + RPC:
  - [supabase/migrations/20260320190000_public_feed_backend.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260320190000_public_feed_backend.sql)
  - [supabase/migrations/20260321101500_feed_publish_helper_functions.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260321101500_feed_publish_helper_functions.sql)

Touched data:
- Public creator identity:
  - `public_creator_profiles`
- Social graph:
  - `public_creator_follows`
- Published feed objects:
  - `public_published_entities`
  - `public_published_entity_cards`
- Reactions:
  - `public_entity_reactions`

State flow (frontend):
- Uses `supabase.rpc(...)` (casted to a generic `rpc<T>` helper) to call:
  - `get_public_feed_items(p_limit, p_entity_kind, p_creator_user_id)` for list loads.
  - `follow_public_creator` / `unfollow_public_creator`.
  - `toggle_public_entity_reaction(p_published_entity_id, p_reaction_type)`.
- After every action, it calls `loadFeed()` again (full refresh). No optimistic update.

State flow (backend):
- The feed is powered by `SECURITY DEFINER` SQL (stable) aggregating:
  - reaction counts
  - card counts
  - viewer-specific flags (`viewer_liked`, `viewer_loved`, `viewer_follows`) via `auth.uid()`.
- RLS on base tables is mostly owner-scoped, with ìpublic can view published onesî behavior enforced on `public_published_entities`.

Good code/processes:
- The DB design is coherent for a social/discovery surface: normalized tables + aggregating RPC.
- `get_public_feed_items` returns both counts and viewer flags in one roundtrip, which is correct for performance.

Bad code/processes:
- Frontend refreshes the entire feed after any follow/reaction. For 40 items this is okay; at scale it becomes sluggish and expensive.
- `coverImage` is assumed to be a usable URL string; if itís a storage ref (`storage://...`), this page currently does not resolve it (unlike other parts of the app).

Risks:
- UX risk: no optimistic UI means reactions/follows feel laggy.
- Data/model risk: discovery relies on `lead_image_url` being consistently populated and accessible.

Concrete improvements:
- Add optimistic updates for follow/reaction toggles (update local item state + counts, then reconcile).
- Standardize image URL handling across the app: either always store public URLs for feed, or resolve storage refs consistently.
- Add pagination/infinite scroll when the feed grows, keeping the RPC stable but bounded.

---

## Section 043: Password Reset + Recovery (Supabase event-driven UI)

Trigger:
- User clicks ìForgot passwordî and requests a reset link.
- User opens the emailed recovery link and lands on `/reset-password`.

Entrypoints:
- Routes:
  - `/forgot-password` -> [src/pages/ForgotPassword.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\ForgotPassword.tsx)
  - `/reset-password` -> [src/pages/ForgotPassword.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\ForgotPassword.tsx)
  - (both wired in [src/App.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\App.tsx))
- Auth provider reset method: [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)

Touched data:
- Supabase auth state (PASSWORD_RECOVERY session) stored client-side.

State flow:
- Request link:
  - `ForgotPassword` calls `useAuth().resetPassword(email)`.
  - Provider calls `supabase.auth.resetPasswordForEmail(email, { redirectTo: <origin>/reset-password })`.
- Recovery link:
  - `ForgotPassword` subscribes to `supabase.auth.onAuthStateChange` and flips `isRecovery=true` when event is `PASSWORD_RECOVERY`.
  - UI switches from email capture form to ìset new passwordî form.
  - Submits via `supabase.auth.updateUser({ password })`.
  - On success, navigates to `/dashboard`.

Good code/processes:
- Reuses one page component for both ìrequest resetî and ìset new passwordî, which reduces surface area.
- Uses Supabaseís PASSWORD_RECOVERY event as the driver, which matches the platform behavior.

Bad code/processes:
- No explicit ìrecovery token missing/expiredî state; if the event never fires, the user is stuck on the request flow even if they expected the set-password screen.
- Source strings include encoding corruption in placeholders and copy.

Risks:
- UX risk: expired recovery link yields confusing behavior with no clear instruction.
- Security/UX risk: after setting password, it routes to `/dashboard` but does not explicitly verify onboarding state; could land users in an inconsistent first-run experience.

Concrete improvements:
- Add a visible ìThis link is expired, request a new oneî state if PASSWORD_RECOVERY is not detected within a short window.
- Route after password update using the same logic as login (`onboarding_complete` check).
- Fix encoding corruption in placeholders so the UI doesnít look broken.

---

## Section 044: Connection Safety Architecture (Explicit Shares vs Legacy Permissions via SECURITY DEFINER RPCs)

Trigger:
- User views a connectionís profile/entries/feed or searches within ìcircleî data.

Entrypoints:
- Core safety RPC definitions:
  - [supabase/migrations/20260320150000_connection_safe_read_functions.sql](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260320150000_connection_safe_read_functions.sql)
- Frontend consumers:
  - Connection page: [src/pages/dashboard/ConnectionPage.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\ConnectionPage.tsx)
  - Connection feed: [src/pages/dashboard/ConnectionFeed.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\ConnectionFeed.tsx)
  - Home search edge uses: `get_connection_visible_card_entries` (see Section 038)

Touched data:
- Relationship:
  - `couples` (must be accepted)
- New explicit share tables:
  - `shared_card_entries`
  - `shared_profile_fields`
  - `shared_derived_features`
- Legacy share table:
  - `sharing_permissions`
- Content:
  - `profiles`
  - `card_entries`

How it works:
- The RPC layer establishes a strict ìrelationî CTE that only exists if:
  - `couples.id` matches and `status = 'accepted'`
  - owner and connection user ids match inviter/invitee pairing
- The system supports two modes:
  1. Explicit mode: if there are any rows in `shared_*` tables for the couple+owner+connection, then visibility is determined by those explicit tables.
  2. Legacy mode: if there are no explicit rows, it falls back to `sharing_permissions` boolean buckets and infers which bucket a card belongs to.

Key RPCs:
- `get_connection_shared_profile(...)` returns only fields allowed by explicit shares or legacy permissions.
- `get_connection_visible_card_entries(...)` returns only entries allowed by explicit shares or legacy permissions.

Good code/processes:
- This is a strong pattern: security rules live server-side and are reused across UI surfaces.
- The explicit-vs-legacy toggle is pragmatic for migration: existing connections keep working while new connections can become more precise.

Bad code/processes:
- Dual-mode logic increases conceptual overhead and makes it harder to predict ìwhy canít I see X?î without tooling.
- Legacy mapping relies on string inference (`infer_card_entry_section`) which is brittle and can drift as new card types are added.

Risks:
- UX risk: users will experience ìinconsistent sharingî during migration unless the UI explains mode and what is shared.
- Maintenance risk: adding a new card type requires updating inference and legacy mapping, otherwise sharing becomes unpredictable.

Concrete improvements:
- Expose connection ìsharing modeî in UI (explicit vs legacy) and provide a one-click migration path.
- Add an audit/debug RPC that returns: which rule allowed/denied a specific entry for a specific viewer (operator-friendly troubleshooting).
- Gradually deprecate legacy permissions and migrate old connections to explicit rows.

---

## Section 045: Unused AI Edges (Future feature surface + auth/validation posture)

Trigger:
- Developer wires AI helpers into card creation, quiz generation, or connection recommendations.

Entrypoints:
- [supabase/functions/ai-quizzes/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\ai-quizzes\index.ts)
- [supabase/functions/ai-card-fields/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\ai-card-fields\index.ts)
- [supabase/functions/ai-autofill/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\ai-autofill\index.ts)
- [supabase/functions/ai-connection-products/index.ts](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\ai-connection-products\index.ts)
- Config: [supabase/config.toml](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml)

What these do (as written):
- `ai-quizzes`:
  - Generates a 100-question bank per gender and stores it globally in `quiz_question_sets` using service role.
  - Requires Authorization header in code (auth client), but `verify_jwt` is explicitly false in config.
- `ai-card-fields`:
  - Given a card title/category, asks AI to propose 5-8 fields for a product-centric card.
  - Does not enforce Authorization in code; relies on platform config.
- `ai-autofill`:
  - Given cardTitle + field descriptors, asks AI for suggested values.
  - Does not enforce Authorization in code.
  - Has better-than-average payload shape validation compared to other functions.
- `ai-connection-products`:
  - Appears to infer recommendation intents for a connection context and resolve them through the shared catalog.
  - (Not currently invoked by the frontend in this repo.)

Auth/validation posture risks:
- Several ìunusedî AI functions do not verify a user in code. If `verify_jwt` is ever disabled (or invoked from a permissive environment), they become public AI endpoints.
- `ai-quizzes` uses service role writes; with `verify_jwt=false`, the only protection is the in-function Authorization check. Thatís acceptable but fragile.

Product/operational considerations:
- These features overlap with the existing static question bank ([src/data/knowMeQuestions.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\knowMeQuestions.ts)) and the existing catalog-driven recommendation system. If all three paths exist, the app will have multiple sources of truth for ìwhat questions existî and ìhow cards are shapedî.

Concrete improvements (before wiring into UI):
- Require Authorization in every AI edge handler (even if verify_jwt is true) and return 401 consistently.
- Decide the single source of truth for Know Me questions: static bank vs AI-generated sets. If AI-generated, version + cache and ensure deterministic rollout.
- Add strict request schemas (and response schemas) so AI outputs do not corrupt DB state.
- Centralize AI gateway configuration and error mapping so 402/429 behaviors are consistent across the app.

---

## Section 046: Dashboard Home Hub (Connections + Milestones + Search + Demo/Fallback Behavior)

Trigger:
- User lands on `/dashboard` (index route) after login.

Entrypoints:
- UI: [src/pages/dashboard/DashboardHome.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\DashboardHome.tsx)
- Connection add modal: [src/components/home/AddConnectionModal.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\components\home\AddConnectionModal.tsx)
- Stock photo system:
  - [src/data/stockPhotos.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\stockPhotos.ts)
  - [src/data/imageBlocklist.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\data\imageBlocklist.ts)
- Milestone components:
  - [src/components/home/MilestoneCountdown.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\components\home\MilestoneCountdown.tsx)
  - [src/components/home/EventCalendar.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\components\home\EventCalendar.tsx)

Touched data:
- `profiles` (display_name and self dates)
- `couples` (both pending and accepted)
- RPC `get_connection_relevant_occasions` for partner milestone dates
- Storage refs for connection `photo_url` resolved via [src/lib/storageRefs.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts)

State flow:
- On mount (with user):
  - Loads `profiles.display_name`.
  - Loads all `couples` rows involving the user (no accepted-only filter).
  - Applies `assignUniquePhotos(...)` to connections missing `photo_url` using stock photos (after `initBlocklist`).
  - Loads milestones:
    - If no accepted couples, injects demo milestones (Birthday/Anniversary with generic partner labels).
    - Else loads own `profiles` dates and partner occasions via `get_connection_relevant_occasions`.
  - Resolves storage URLs for connection images.
  - Provides a home search drawer (Section 038) and an Add Connection modal.

Good code/processes:
- The hub makes an honest attempt to unify ìwhatís happeningî (connections + upcoming dates + search) into one place.
- Milestone computation is thoughtfully implemented (roll forward to next year, days-out math).

Bad code/processes:
- Demo fallback milestones are injected for users with no accepted couples. This can confuse real users (ìwhy does it say Wife?î) and can feel like fabricated data.
- Stock photo assignment for missing connection images is risky: it can make the app feel fake and can collide with user identity expectations.
- `loadConnections` fetches all couples (pending + accepted) but many downstream UX surfaces assume ìconnectionsî are accepted.

Risks:
- Trust risk: showing demo dates and stock photos can undermine product credibility.
- UX risk: the hub mixes real and placeholder data without clear labeling.

Concrete improvements:
- Replace demo milestones with an empty state that teaches the user how to add birthdays/anniversaries or connect with a partner.
- Only apply stock photos in explicit demo mode (feature flag) or clearly label them as placeholders.
- Split connections into ìpendingî and ìconnectedî in the hub UI to match the underlying data model.

---

## Section 047: Build Artifacts + Bundle Hotspots (Route chunks, vendor weight, warnings)

Trigger:
- User loads the app cold, or navigates between major routes.

Entrypoints:
- Build output: `npm run build` (Vite)
- Large routes (lazy loaded): [src/App.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\App.tsx)

Observed production chunk sizes (from `vite build`):
- Shared vendor:
  - `assets/vendor-*.js`: ~242.6 kB (gzip ~79.7 kB)
  - `assets/react-vendor-*.js`: ~182.8 kB (gzip ~56.9 kB)
  - `assets/supabase-*.js`: ~169.8 kB (gzip ~44.7 kB)
  - `assets/radix-*.js`: ~92.9 kB (gzip ~28.1 kB)
  - `assets/motion-*.js`: ~32.5 kB (gzip ~11.3 kB)
- Largest route chunks:
  - `Questionnaires-*.js`: ~144.6 kB (gzip ~39.5 kB)
  - `DashboardHome-*.js`: ~105.1 kB (gzip ~26.1 kB)
  - `ConnectionPage-*.js`: ~30.4 kB (gzip ~8.4 kB)
  - `SettingsPage-*.js`: ~30.0 kB (gzip ~7.2 kB)
  - `MyGoTwo-*.js`: ~29.9 kB (gzip ~9.0 kB)

Build warnings:
- Browserslist data is stale (caniuse-lite ~10 months old).
- Tailwind warns about ambiguous class `ease-[cubic-bezier(0.22,1,0.36,1)]`.

Product/UX implications:
- `Questionnaires` and `DashboardHome` are the heaviest user-facing route chunks; they correlate with the ìthis feels slow/jankyî reports because they do a lot of state + data + animation work.
- Supabase and Radix are sizable shared dependencies; thatís expected, but it raises the value of keeping route components lean.

Concrete improvements:
- Split `DashboardHome` and `Questionnaires` into smaller modules and lazy-load the heaviest subcomponents (calendar, directory, modals) only when opened.
- Move static image banks imported directly into route files (Recommendations) behind dynamic imports or treat them as remote assets to reduce JS churn.
- Resolve the Tailwind ambiguity by choosing a single easing token approach (or escaping as suggested) so build output stays clean and predictable.

---

## Section 048: Legacy Image Cleanup (DB deletes for old public storage URLs)

Trigger:
- The app needs to remove stale/broken image URLs that reference the legacy public bucket path `category-images/bank/...`.

Entrypoints:
- Helper: [src/lib/legacyImageCleanup.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\legacyImageCleanup.ts)

Touched data:
- `category_bank_photos` rows where `image_url` matches the legacy prefix.
- `category_images` rows where `image_url` matches the legacy prefix.

State flow:
- Builds a legacy prefix from `VITE_SUPABASE_URL`:
  - `${SUPABASE_URL}/storage/v1/object/public/category-images/bank/`
- Queries both tables for `LIKE <prefix>%`.
- Deletes matching rows:
  - `category_bank_photos` deletes by `id`.
  - `category_images` deletes by `category_key` (not `(category_key, gender)`).

Good code/processes:
- The intent is correct: remove DB pointers that will never resolve correctly.

Bad code/processes:
- `category_images` cleanup deletes by `category_key` only, which can wipe multiple gender rows and/or future variants.
- This performs destructive deletes with no ìdry runî mode and no operator visibility.

Risks:
- Operator risk: running cleanup can remove more assignments than intended.
- Migration risk: as the system evolves to support multiple genders or contexts, key-only deletes become increasingly dangerous.

Concrete improvements:
- Make all category_images deletes key+gender scoped.
- Add a reporting mode: return the rows that would be deleted before deleting.
- Persist cleanup operations in an audit table so deletions can be reviewed.

---

## Section 049: Repo Artifact Bloat (Screenshots, Playwright captures, and non-product assets)

Trigger:
- Developer clones/pulls the repo, reviews changes, or tries to understand ìwhat assets are realî.

Entrypoints:
- Root directory contains many large PNG screenshots (My Go Two iteration captures).
- Tool output directories:
  - [output](C:\Users\adamb\Documents\GitHub\my-go-two\output)
  - [.playwright-cli](C:\Users\adamb\Documents\GitHub\my-go-two\.playwright-cli)
- Git ignore rules: [.gitignore](C:\Users\adamb\Documents\GitHub\my-go-two\.gitignore)

Observed large non-product files (examples):
- Playwright captures:
  - `.playwright-cli/page-2026-04-02T10-*.png` (~2.0MB to ~3.7MB each)
- Root screenshots:
  - `output-mygotwo-*.png` (~1.7MB to ~3.1MB)
  - `mygotwo-coverflow-*.png` (~2.9MB to ~3.0MB)
  - `desktop-mygotwo-*.png` (~1.8MB to ~2.2MB)
- ìOutputî folder screenshots:
  - `output/playwright/*` (multi-MB)

Product/UX impact:
- Not directly user-facing, but these files strongly influence developer workflow and the risk of accidentally shipping or referencing stale assets.

Developer workflow impact:
- Repo becomes visually noisy: searching for ìthe real current designî becomes harder.
- PRs can become bloated if these files are ever modified/added.

Concrete improvements:
- Ensure all tool-output folders (`output/`, `.playwright-cli/`) are gitignored or moved to a consistent local-only location.
- If some screenshots are genuinely part of a design/history record, move them into a single `docs/` or `design/` folder with a short README explaining purpose and retention policy.
- Adopt a convention: ìassets in `src/assets/` are shippable; everything else is dev-only unless explicitly documented.î

---

## Section 050: Context + Import Hygiene (Multiple naming conventions, casing, and maintenance risk)

Trigger:
- Developer adds a new page/component and imports auth/personalization/topbar.

Entrypoints:
- Context definition files:
  - Auth: [src/contexts/auth-context.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\auth-context.ts) and provider [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)
  - Personalization: [src/contexts/personalization-context.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\personalization-context.ts) and provider [src/contexts/PersonalizationContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\PersonalizationContext.tsx)
  - Top bar: [src/contexts/top-bar-context.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\top-bar-context.ts) and provider [src/contexts/TopBarContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\TopBarContext.tsx)
- App wiring: [src/App.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\App.tsx)

Observed pattern:
- Hooks are imported from kebab-case modules (`@/contexts/auth-context`, `@/contexts/personalization-context`, `@/contexts/top-bar-context`).
- Providers are imported from PascalCase modules (`@/contexts/AuthContext`, etc.) in `App.tsx`.

Good code/processes:
- There is a consistent intent: one ìtypes + hookî module, and one provider implementation module.

Bad code/processes:
- The naming scheme is nonstandard and easy to misuse. A new contributor can easily import the wrong file and end up with:
  - circular imports
  - duplicated context values
  - or subtle build issues on case-sensitive environments.

Risks:
- Maintenance risk increases as the project grows: similar files with different conventions are hard to grep and reason about.

Concrete improvements:
- Consolidate each context into a single module (export provider + hook from one file) or add explicit barrel exports (e.g., `src/contexts/index.ts`) to make ìthe right importî obvious.
- Add an eslint rule or convention doc enforcing one canonical import path per context.

---

## Section 051: My Go Two Staged Image Loading (ìPreviewî then ìFullî then Collapse Warm)

Trigger:
- User opens `/dashboard/my-go-two` and the strip gallery mounts.

Entrypoints:
- Strip gallery UI: [src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx)
- Asset loader + transforms: [src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)

Touched data:
- `category_images` rows for `MYGOTWO_ASSIGNMENT_KEYS` (gender currently hard-coded to `male`).
- Storage URL resolution via transforms (preview/full/detail/collapse).

What ìswap them inî means (concrete):
- The gallery deliberately loads two different URL sets for the same assigned storage refs:
  1. Preview URLs (small width, low quality) for faster first paint.
  2. Full URLs (bigger width, higher quality) for the steady-state experience.
- The UI first commits preview URLs into React state, then later commits the full URLs into the same state object, causing the `<img src=...>` elements to update from preview to full. That is the ìswapî.

State flow:
- `hydrateGalleryAssets({ showLoader: true })`:
  1. Increments `loadRunIdRef` to cancel stale async runs.
  2. If showing loader:
     - Calls `loadMyGoTwoGalleryAssets({ quality: 'preview' })`.
     - `commitAssets({ stripImages: preview.stripImages, collapseImages: currentCollapse }, false)`.
  3. Calls `loadMyGoTwoGalleryAssets({ quality: 'full' })`.
  4. Preloads visible strip URLs via `preloadImageUrls(getVisibleStageStripUrls(fullAssets))`.
  5. Commits full stripImages, but blanks any image URLs that did not preload successfully (prevents broken images).
  6. Clears loader.
  7. Kicks off `warmCollapseAssets(...)` in the background:
     - Preloads collapse images and then commits collapseImages if loaded.

Good code/processes:
- Cancellation via `loadRunIdRef` avoids race-condition state corruption.
- Preloading + filtering is defensive: broken transformed URLs donít render as broken tiles.
- Collapse images are deferred so the stage can become interactive sooner.

Bad code/processes:
- Preview stage is only used when `showLoader` is true. If the loader isnít shown (or future changes toggle it), the preview benefit disappears.
- The pipeline currently depends on transformed URLs succeeding; certain formats (historically PNG) can fail transform and then the system intentionally blanks them.

Risks:
- UX risk: if preview loads but full fails, images can ìpop outî (swap to empty), which reads as broken.
- Complexity risk: staged loading interacts with hover/collapse timers; timing bugs become hard to debug.

Concrete improvements:
- Make preview/full swap behavior observable in dev builds (timing logs or a debug overlay) so itís diagnosable.
- Consider always doing preview first (even without loader), then full, to keep behavior consistent.
- Track per-image load failures and surface them in PhotoGallery/operator tooling for cleanup.

---

## Section 052: Git Auto-Push Hook (Developer Workflow + Risk Surface)

Trigger:
- Developer creates a git commit locally.

Entrypoints:
- Hook installer: [scripts/setup-autopush.ps1](C:\Users\adamb\Documents\GitHub\my-go-two\scripts\setup-autopush.ps1)
- Hook itself: [.githooks/post-commit](C:\Users\adamb\Documents\GitHub\my-go-two\.githooks\post-commit)

What it does:
- The repo can configure `core.hooksPath` to `.githooks`.
- After every commit, the `post-commit` hook:
  - Checks current branch.
  - Pushes to `origin` (or configured remote) if:
    - branch is `main`, or
    - `hooks.autopush.allBranches=true`.
  - Skips pushing if not ahead of upstream.

Good code/processes:
- This can reduce friction for a solo operator workflow where ìcommit == publishî.

Bad code/processes:
- Auto-push increases the blast radius of mistakes: a commit becomes remote immediately.
- It reduces the natural pause where a developer would review diff scope, tests, and commit message quality.

Risks:
- Workflow risk: accidental pushes of WIP, debug logs, or large asset changes.
- Collaboration risk: other agents/contributors may be surprised by remote changes appearing rapidly.

Concrete improvements:
- Document the hook prominently (README or NEXT_CHAT_HANDOFF) so every agent understands the default push behavior.
- Consider defaulting auto-push to a dedicated dev branch instead of `main`, or making it opt-in per developer.
- Enforce commit message templates and/or PR flow if multiple agents are committing.

---

## Section 053: Typechecking Boundaries (Frontend TS config vs Supabase edge code)

Trigger:
- Developer runs `npx tsc --noEmit` or `npm run build` and assumes ìtype-safeî.

Entrypoints:
- Frontend TS config: [tsconfig.app.json](C:\Users\adamb\Documents\GitHub\my-go-two\tsconfig.app.json)
- Edge functions live outside frontend TS include:
  - [supabase/functions](C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions)
- Edge audit helper: [scripts/audit-edge-functions.js](C:\Users\adamb\Documents\GitHub\my-go-two\scripts\audit-edge-functions.js)

Observed behavior:
- `tsconfig.app.json` includes only `src`.
- Compiler settings are permissive:
  - `strict: false`
  - `noImplicitAny: false`
  - `noUnusedLocals: false`
  - `skipLibCheck: true`

Product/engineering implications:
- A passing frontend build + typecheck does not validate edge function code at all.
- Even within `src`, permissive TS settings allow many classes of bugs to compile and ship (especially around JSON shapes, nullability, and unhandled errors).

Risks:
- Runtime bug risk increases as feature logic moves into large pages and untyped objects (e.g., personalization JSON, edge payloads, PostgREST responses).
- Deployment risk: edge functions can fail independently (type errors, missing env, runtime exceptions) while the frontend stays green.

Concrete improvements:
- Add a separate CI job for edge functions (Deno lint/typecheck or a script that validates imports and JSON shape guards).
- Gradually tighten TS settings for `src` (even if not fully strict): start with `noImplicitAny` and `strictNullChecks` for new files.
- Prefer generated Supabase types (`Tables<>`) consistently instead of `any`/manual casts.

---

## Section 054: PhotoGallery Operator Workflow (What it is now vs the simpler ìslot wiringî model)

Trigger:
- Operator opens `/photo-gallery` to upload/assign images for My Go Two strip slots and collapse bank.

Entrypoints:
- UI: [src/pages/PhotoGallery.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx)
- Slot definitions: [src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.images.ts)
- Assignment API: [src/lib/imageOverrides.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageOverrides.ts)
- Storage refs: [src/lib/storageRefs.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts)

Touched data:
- `category_images` table is the live system-of-record for slot wiring (key + gender -> image_url).
- Storage bucket currently used by PhotoGallery uploads: `photo-bank` (stored as `storage://photo-bank/<path>` refs).

What it does today (in practice):
- Loads all assignments for known slot keys (`MYGOTWO_SLOT_TARGETS`) from `category_images` (gender currently hard-coded to `male`).
- Provides per-slot upload (file input), storing file in storage, then calling `setImageUrl(slotKey, storageRef)`.
- Provides per-slot delete:
  - Clears `category_images` assignment and attempts to detect whether the underlying storage file is ìused elsewhereî.
  - If the file is still referenced by other slots, it queues a `manualCleanupItems[]` entry to prevent accidental shared deletes.

Whatís good about this model:
- It already aligns with the ìno middle-manî concept: the website renders directly from `category_images` assignments, and PhotoGallery is just an editor.

Where it feels too complicated (operator UX):
- The page is ìeverything, everywhereî: lots of slot cards, multiple upload controls, and a cleanup queue, which increases cognitive load.
- The data model is slot-centric only; it does not treat ìsmall strip imageî and ìfull card imageî as a paired asset concept even though the UI now supports `strip image` + `detailImage`.
- Gender handling is inconsistent across helpers, making future expansion risky.

A simpler model that matches your intent:
- Treat PhotoGallery as a two-step operator tool:
  1. Upload images into storage only (bucket + folder conventions).
  2. Assign a selected stored image ref to a specific slot key (strip slot, card slot, collapse slot).
- UI simplification idea:
  - One ìUploadî box with a dropdown that selects the target slot (e.g., Dining Strip, Dining Card, Collapse 01).
  - A grid that shows images grouped by category, with ìstrip vs cardî pairing (e.g., Dining 1 next to Dining 2).
  - A single ìAssign to slotî action, not multiple bespoke controls.

Key data model decision:
- Keep `category_images` as the single wiring table.
- Establish explicit naming/folder conventions so ìDining stripî and ìDining cardî are naturally paired:
  - Example: `photo-bank/dining/strip/<file>.jpg` and `photo-bank/dining/card/<file>.jpg`.
  - Or encode in filename: `dining-strip.jpg` and `dining-card.jpg`.

Deletion reality (important):
- Fully automatic deletion ìfrom everythingî is dangerous unless the system has a reference index.
- The existing `manualCleanupItems[]` approach is directionally correct: it surfaces a delete list for a human to confirm.

Concrete improvements:
- Make slot assignment the only first-class operation; hide the rest behind ìAdvancedî (cleanup list, raw storage paths, debug labels).
- Add an explicit ìpairingî UI for strip+card images per category (so you can upload both sizes and see them side by side).
- Move toward a reference-indexed deletion model:
  - A query that finds all `category_images` rows referencing the same storage ref.
  - If the ref is only used once, enable ìDelete from storageî safely.
  - If used multiple times, show the list and require manual confirmation.

---

## Section 056: Landing Page Promises vs Product Reality

Trigger:
- User opens `/` (marketing landing) and decides whether to sign up.

Entrypoints:
- UI: [src/pages/Landing.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Landing.tsx)

Touched data:
- None (static page).

UX flow:
- Presents a ìtimelineî story:
  - signup -> AI builds profile -> create GoTwo lists -> invite people -> control access -> AI powers decisions.
- CTAs drive to `/signup` and then onboarding.

Good code/processes:
- Lightweight: no data dependencies, avoids auth coupling.
- Clear narrative: it matches the intended product thesis.

Gaps vs current implementation (important):
- The landing promises ìcontrol who sees whatî and ìAI powers every decisionî. The repo has the backend foundations for this (connection safety RPCs, AI edges), but several user-facing actions are currently non-persistent or demo-like:
  - Recommendations ìsave/shareî are not real (Section 034).
  - DashboardHome uses demo milestones/stock photos (Section 046), which undermines trust for first-time users.

Risks:
- Expectation mismatch: users who buy into the landing narrative may feel let down if core actions donít change state.

Concrete improvements:
- Ensure the first post-signup session demonstrates at least one ìrealî loop:
  - create a card entry -> share it explicitly -> verify a connection can see it.
- Remove demo placeholders from the authenticated experience so the landingís confidence feels earned.

---

## Section 057: My Go Two ìZoomî Perception (Flex-grow + cropping) and the Two-Image Model (Strip vs Card)

Trigger:
- User hovers a labeled strip in My Go Two and perceives an aggressive ìzoomî/distortion.
- User opens a category panel/card view and sees more cropping.

Entrypoints:
- Strip layout + hover weights: [src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx)
- Asset model includes both `image` and `detailImage`:
  - Loader: [src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts](C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts)

What is happening (code-level):
- The strip interaction primarily changes layout weights (`flex-grow`) between strips.
- The images are rendered with `object-cover` or background-size cover semantics.
- When a container grows/shrinks while the image remains ìcoverî, the visible crop region changes. This reads as ìzoomingî even if no CSS `scale()` is applied.

Why it can look distorted:
- A tall, narrow strip using `cover` will aggressively crop; when its width changes, the crop shifts.
- If the same original image is used for both the small strip and the larger card/panel, the crop differences become obvious.

The two-image model (your proposed workflow) matches the current architecture:
- The gallery asset model already supports:
  - `strip image` (small strip)
  - `detailImage` (full card/panel)
- Today, the loader sets `detailImage` to the card-resolved image when available, else falls back to strip.

Product tradeoff (two separate images vs one big image):
- Two images can be better UX and performance if they are appropriately sized and cached:
  - The strip image can be small and heavily compressed.
  - The card image can be larger and loaded only when needed (on open).
- The downside is operational complexity (you must upload/manage two assets per category). This is solvable with pairing UI (Section 054).

Concrete improvements:
- Ensure the operator workflow explicitly supports uploading both variants per category and shows them side by side.
- Consider deferring `detailImage` loads until a category is opened (or at least preload only the first/most likely), to keep initial stage faster.
- Tune hover weights to reduce perceived motion if needed (smaller delta between base and hover `flex-grow`).

---

## Section 058: Signup -> Email Confirm -> First SIGNED_IN (localStorage handoff for profile fields)

Trigger:
- User signs up via `/signup` and confirms email, then signs in.

Entrypoints:
- Signup page: [src/pages/Signup.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\Signup.tsx)
- Auth provider: [src/contexts/AuthContext.tsx](C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\AuthContext.tsx)

Touched data:
- LocalStorage:
  - `gotwo_signup_data` stores `{ age, gender }` from the signup form.
- DB:
  - `profiles.age` and `profiles.gender` are updated on the first `SIGNED_IN` event.

State flow:
- `/signup`:
  1. Calls `useAuth().signUp(email, password, displayName)`.
  2. Stores `gotwo_signup_data` in localStorage.
  3. Navigates user to `/login` with ìcheck your emailî toast.
- `AuthProvider`:
  - On `supabase.auth.onAuthStateChange` event `SIGNED_IN`, it calls `applySignupData(userId)`:
    - Reads `gotwo_signup_data`.
    - Updates `profiles` with `age` and normalized `gender`.
    - Removes `gotwo_signup_data`.

Good code/processes:
- This avoids extra DB writes during the signup request itself and ensures profile data is tied to a real user id.

Bad code/processes:
- The handoff relies on localStorage persistence between signup and first sign-in. If the user confirms on a different device/browser, age/gender will never be applied.

Risks:
- UX risk: user sees a ìtell us about youî step at signup but later their profile shows defaults.

Concrete improvements:
- Persist signup metadata server-side at signup time (e.g., in `user_metadata` or a temp table keyed by email) so it survives cross-device confirmation.
- Add a lightweight ìcomplete profileî prompt on first dashboard load if `profiles.gender` or `profiles.age` are missing.
