# Hypatia Rolling Audit (Full Repo)

Start time (Get-Date): `2026-04-03T07:30:58.6753047-05:00`

Constraints:
- No source-code, config, migration, package, or behavior changes.
- Reports only under `C:\Users\adamb\Documents\GitHub\my-go-two\audit\agent-reports\`.

Personality / lens: systems-architectural, structure-first. Focus on boundaries, ownership, source of truth, contracts, and dependency direction.

---

## Section 001: Repo Boundary Map (Initial Pass)

### Trigger
Audit kickoff; establish system boundaries and “source of truth” domains before tracing specific events.

### Entrypoints
- Frontend app: `src/` (Vite React).
- Backend/infra: `supabase/` (migrations, edge functions, config).

### Touched Files
- [NEXT_CHAT_HANDOFF.md](/Users/adamb/Documents/GitHub/my-go-two/NEXT_CHAT_HANDOFF.md)
- [src/integrations/supabase/client.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/client.ts)
- [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml)
- [supabase/migrations/*](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations)
- [supabase/functions/*](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions)

### Touched Data
- Supabase Auth session in browser `localStorage` (client SDK).
- Postgres schema defined by migrations.
- Supabase Storage buckets defined by migrations.

### State Flow
- React contexts: auth, personalization, top-bar.
- Data fetching via Supabase JS client in frontend + edge functions.

### Backend/Storage Touchpoints
- Edge functions invoked from client (`supabase.functions.invoke(...)`).
- Storage objects resolved via `storage://bucket/path` indirection.

### How It Connects
The app is a fairly typical “React SPA + Supabase backend” but with a notable architectural tension:
- The DB contains both “product” tables (profiles, connections, card entries, registries) and “dev tooling” tables for image banks/assignments.
- There are multiple image/bucket/assignment systems over time (legacy `category-images`, later `photo-bank`, plus “strip” specific buckets), which causes flow ambiguity unless contracts are explicit.

### Good
- Centralized storage reference resolution (`storageRefs.ts`) is a proper boundary: it isolates URL shape changes.
- `supabase/client.ts` includes a guardrail for missing env rather than crashing module import.

### Bad
- Policy boundary ambiguity: several edge functions set `verify_jwt = false` in `supabase/config.toml`, which shifts the auth boundary into each function implementation.
- Repo contains many screenshot artifacts and “historical iteration” assets; not a functional risk, but an entropy risk.

### Risks
- “Source of truth drift” between:
  - DB mapping tables vs storage buckets
  - runtime pages vs dev tooling
  - RLS policies vs app assumptions

### Concrete Improvements
- Explicitly document per-domain source of truth:
  - Auth/session
  - Subscription status
  - Image mapping for My Go Two
  - General image storage for connections/avatars/cards
- Normalize bucket policy and code classification (private vs public) into one auditable module.

---

## Section 002: Login + Onboarding Gate + Invite Linking (Full Event Trace)

### Trigger
- User visits `/login` and signs in (email/password or dev-login).
- Optional: user arrives with `?invite=<id>` (QR/invite flow) which should link them to a partner after auth.

### Entrypoints
- Route: [App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx)
  - `/login` -> [Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx)
  - `/dashboard/*` guarded by [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)
- Auth state provider: [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- Supabase client/session persistence: [client.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/client.ts)

### Touched Files
- [Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx)
- [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)
- [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- Supabase edge function invoked: `searchforaddprofile` (see `supabase/functions/searchforaddprofile/index.ts`)

### Touched Data
- Supabase Auth session persisted in browser `localStorage` (Supabase SDK).
- `user_preferences.onboarding_complete` (read in login post-auth navigation).
- `profiles` table (write during `applySignupData` if `gotwo_signup_data` exists).
- `localStorage.gotwo_invite` (write on `/login?invite=...`, read/consume after auth in dashboard layout).

### State Flow
1. `Login.tsx` stores `invite` param into `localStorage.gotwo_invite`.
2. Sign-in path:
   - normal sign-in uses `useAuth().signIn(...)` (Supabase password flow).
   - dev sign-in uses `supabase.functions.invoke("dev-login")` then `supabase.auth.setSession(...)`.
3. `navigateAfterLogin()` reads `supabase.auth.getUser()` and queries `user_preferences.onboarding_complete`:
   - routes to `/onboarding` or `/dashboard`.
4. `DashboardLayout` is a route guard:
   - if `!user`, redirects to `/login`.
   - after auth, it reads `localStorage.gotwo_invite` and calls `searchforaddprofile` with `{ action: "link-by-inviter", inviter_id: inviteId }`, then deletes `gotwo_invite`.

### Backend/Storage Touchpoints
- Edge function call: `searchforaddprofile` from the dashboard shell (post-auth).
- Critical boundary: whether `supabase.functions.invoke` includes the user JWT implicitly vs explicit headers.
- `supabase/config.toml` sets `verify_jwt=false` for `searchforaddprofile`, which means function-level auth checks are the true boundary.

### Good
- Invite consumption is idempotent-ish: it removes the key and ignores self-invites.
- Onboarding gate is centralized in login navigation (`user_preferences`), a reasonable “source of truth” pattern.

### Bad
- Ownership is split between:
  - `/login` storing invite state
  - dashboard layout consuming invite state
  - edge function implementing linking side effects
This is workable but creates temporal coupling between pages and a hidden “pending connection” state in localStorage.
- The auth boundary for partner linking is muddied:
  - `verify_jwt=false` (config)
  - callsite does not explicitly pass `Authorization` header
  - correctness depends on implicit SDK behavior and function internal checks

### Risks
- If `searchforaddprofile` trusts `inviter_id` without validating it against the authenticated user, this is a potential account-link abuse path.
- Local storage is a weak “queue” for critical linking actions; it can linger across sessions/browsers.

### Concrete Improvements
- Make the contract explicit: `searchforaddprofile` should require JWT and read the acting user from it; remove reliance on localStorage for linking-critical paths.
- Consider moving invite processing to a dedicated “post-login invocations” layer (single module) rather than embedding it in `DashboardLayout` (layout should not own side effects).
- If `verify_jwt=false` must remain, enforce auth in code and document it as an explicit boundary (not implicit).

---

## Section 003: Subscription Status + Stripe Edge Functions (Full Event Trace)

### Trigger
- User signs in or session refreshes, and the app wants to know if the user is premium.

### Entrypoints
- `AuthProvider` subscription checks: [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- Edge function: [check-subscription/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/check-subscription/index.ts)
- Checkout flows: [create-checkout/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/create-checkout/index.ts) and [customer-portal/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/customer-portal/index.ts)

### Touched Data
- Supabase Auth JWT (session access token).
- Stripe customer records keyed by email (lookup), Stripe subscriptions list (active).
- No explicit DB subscription cache; subscription status is computed per request.

### State Flow
1. `AuthProvider` calls `checkSubscription()`:
   - If dev user, short-circuits and sets subscribed.
   - Else, calls `supabase.functions.invoke("check-subscription", { headers: { Authorization: Bearer <access_token> }})`.
2. `checkSubscription` function:
   - Uses `SUPABASE_SERVICE_ROLE_KEY` to call `auth.getUser(token)` (validates token server-side).
   - Uses `STRIPE_SECRET_KEY` to look up customer by email, then active subscriptions.
   - Returns `{ subscribed, product_id, price_id, subscription_end }`.
3. The frontend re-runs this check every 60 seconds.

Checkout:
- `create-checkout`:
  - Requires Authorization header, validates user via Supabase auth getUser(token).
  - Requires payload `priceId`.
  - Creates Stripe Checkout Session and returns URL.
- `customer-portal`:
  - Validates user via service-role Supabase auth getUser(token).
  - Creates Billing Portal session and returns URL.

### Backend/Storage Touchpoints
- Stripe API access in edge functions.
- Supabase Auth validation of user JWT inside edge functions.
- `supabase/config.toml` sets `verify_jwt=false` for these functions (check-subscription, create-checkout, customer-portal).

### Good
- Edge functions validate user identity explicitly via `auth.getUser(token)` instead of trusting incoming email/userId in JSON.
- `create-checkout` and `customer-portal` include method guarding and structured JSON responses.
- The subscription function logs steps (helpful for debugging).

### Bad
- Source of truth is “Stripe live state every minute,” which is expensive and fragile.
- Identity coupling is via email lookup in Stripe, which can drift (email changes, duplicates).
- `verify_jwt=false` again shifts the boundary into function code; easy to regress if someone later removes `getUser(token)` checks.

### Risks
- Minute-level polling can induce rate limits or degrade UX in bad network conditions.
- If any edge function errors are swallowed in the frontend (current code is largely silent), users can oscillate between states without clarity.

### Concrete Improvements
- Establish a subscription cache table keyed by `user_id` updated via Stripe webhooks; the frontend would read this table rather than calling Stripe-facing functions on an interval.
- If keeping compute-on-demand: reduce polling frequency and trigger on relevant app actions (settings open, purchase flow).
- Enforce `verify_jwt=true` for Stripe functions and treat JWT verification as a platform boundary, not an app convention.

---

## Section 004: My Go Two Strip + Collapse + Card Images (Mapping Table + Storage Flow)

### Trigger
- User navigates to `/dashboard/my-go-two`.
- The system loads “strip images” (labeled categories), and “preview strips” (unlabeled panorama slices) which depend on the 5-image collapse bank.
- User uses `/photo-gallery` to upload and assign “Small” strip images, “Card” images, and the 5 repeat/collapse images.

### Entrypoints
- Route: [MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx) -> [MyGoTwoStripGalleryAsset.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx)
- Data loader: [myGoTwoStripGallery.data.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts)
- Slot metadata + key contract: [myGoTwoStripGallery.images.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts)
- Slot write helper: [imageOverrides.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/imageOverrides.ts)
- Dev editor route: [PhotoGallery.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/PhotoGallery.tsx)
- Storage URL boundary: [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)

### Touched Data
- Table: `category_images`
  - columns: `category_key`, `gender`, `image_url`
  - created in: [20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql)
  - update/delete policies added in: `20260315172446_...` (noted elsewhere)
- Bucket: `photo-bank` (uploads live assets used by My Go Two in current working tree)

Key-space contract (current):
- Category strip slots: `mygotwo-strip-01`, `mygotwo-strip-03`, ... (9 labeled categories only)
- Category card slots: `mygotwo-card-clothes`, `mygotwo-card-personal`, ... (9 categories)
- Repeat/collapse bank: `mygotwo-collapse-01`..`05`
- Unlabeled preview strips (8 strips) do not have independent assignment keys; they render slices of the active collapse image.

### State Flow (Read Path)
1. `MyGoTwoStripGalleryAsset` calls `loadMyGoTwoGalleryAssets({quality:"preview"})` then `quality:"full"`.
2. `myGoTwoStripGallery.data.ts` reads `category_images` filtered by:
   - `gender = "male"`
   - `category_key in MYGOTWO_ASSIGNMENT_KEYS`
3. It resolves:
   - strip small images with strip transform
   - card images with detail transform
   - collapse images with collapse transform
4. In the view:
   - Labeled strips render from `strip.image`.
   - The opened overlay background renders from `strip.detailImage || strip.image`.
   - Unlabeled strips are “panorama strips”: they use `background-image` with `panoramaBaseUrl`/`panoramaNextUrl`, sliced via `backgroundSize` and `backgroundPosition`.
   - `panoramaBaseUrl` comes from `collapseImages[collapseImageIndex].image`, so the 5-image bank feeds preview + collapse visuals.

### State Flow (Write Path)
1. `/photo-gallery` loads existing assignments from `category_images` for the `MYGOTWO_SLOT_TARGETS`.
2. Upload:
   - uploads file to `photo-bank/<folder>/<timestamp>-<uuid>-<slug>.<ext>`
   - builds `storage://photo-bank/<path>` and upserts into `category_images(category_key, gender, image_url)`
3. Delete:
   - deletes the row from `category_images` for that key
   - attempts to remove the underlying storage object if it is not referenced by any other slot
   - if storage delete fails, it queues a “manual cleanup” record

### Backend/Storage Touchpoints
- No edge functions involved; reads/writes go directly from browser to PostgREST + Storage APIs via supabase-js.
- Storage transform URLs are generated for public buckets via `getPublicUrl(..., { transform })`.

### Good (Architecturally Coherent Pieces)
- Clear separation between:
  - slot metadata (`myGoTwoStripGallery.images.ts`)
  - data loader (`myGoTwoStripGallery.data.ts`)
  - view orchestration/state machine (`MyGoTwoStripGalleryAsset.tsx`)
  - storage URL policy (`storageRefs.ts`)
- The 8 preview strips are consistently “unlabeled strips,” derived by `!strip.label` (matches the product rule that preview strips are fixed and separate from labeled categories).
- Collapse bank is a separate key-space (`mygotwo-collapse-*`) and is used as the panorama source, which keeps the preview strip surface stable.

### Bad (Boundary Violations / Redundancy)
- `category_images` is a global mapping table by `category_key + gender` with **broad RLS**:
  - `SELECT` is “Anyone can read category images.”
  - `UPDATE`/`DELETE` are allowed to any authenticated user (via later migration).
This makes the “source of truth” for My Go Two images globally writable by any signed-in user, which is a strong boundary violation if this is not strictly dev-only.
- The repo contains overlapping systems for “asset assignment”:
  - `category_images` (current runtime source of truth)
  - `category_bank_photos` + `website_asset_assignments` (historical/alternate pipeline)
  - `dev_asset_image_overrides` (appears intended for per-user overrides)
The existence of these tables indicates previous attempts to define ownership boundaries that are not currently enforced in the runtime path.

### Risks
- If the app goes live with current RLS, any authenticated user could overwrite global My Go Two images.
- Public-read `category_images` reveals asset refs/URLs; combined with a public bucket, this may leak assets not meant to be public.
- Transform pipeline sensitivity (e.g., `png` failures) can create “missing images” with minimal diagnosis.

### Concrete Improvements
- Make ownership explicit:
  - If My Go Two strip assets are global editorial assets, restrict updates to admin/service role; expose a controlled admin UI.
  - If assets are user-specific, move to a table keyed by `user_id` (or reuse `dev_asset_image_overrides`) and have the runtime read per-user mappings.
- Reduce redundant systems:
  - Decide whether `website_asset_assignments` and `category_bank_photos` are dead; if yes, deprecate with a documented migration path (don’t leave parallel “sources of truth” lying around).
- Encode contract in schema:
- Consider a constrained enum/type for `category_key` keys or a separate “assets” table to avoid accidental key collisions and enforce “allowed keys.”

---

## Section 005: Connections Domain (Couples, Sharing, Feed, Search) End-to-End Trace

### Trigger
- User connects with another user via invite/search/share token.
- User views a connection feed or a specific connection page.
- User searches across their own entries and/or their circle entries.

### Entrypoints
- Connection shell UI:
  - [ConnectionFeed.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/ConnectionFeed.tsx) calls RPC `get_connection_feed`.
  - [ConnectionPage.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/ConnectionPage.tsx) is the main detailed view (large, multi-query).
- Edge functions:
  - [searchforaddprofile/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/searchforaddprofile/index.ts) acts as a “connection gateway” for search, invites, linking, tokens, demo seeding.
  - [connection-data-search/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/connection-data-search/index.ts) powers cross-user entry search with visibility constraints.
- Schema + security backbone:
  - Base tables: `profiles`, `couples` created in: [20260307224053_3d5551f9-52cf-4af1-97c2-a1f159cf8fa6.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260307224053_3d5551f9-52cf-4af1-97c2-a1f159cf8fa6.sql)
  - Feed: [20260320184500_connection_feed_backend.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260320184500_connection_feed_backend.sql)

### Touched Data
- Primary relationship table: `couples`
  - `inviter_id`, `invitee_email`, `invitee_id`, `status`
- Sharing tables (implied by feed function):
  - `shared_card_entries`, `shared_profile_fields`, `shared_derived_features`
  - `connection_context_preferences`
- Content tables:
  - `card_entries` (shared entries referenced by `shared_card_entries`)
  - `profiles` (shared fields read for feed and display)
- RPC functions:
  - `get_connection_feed(...)` (security definer)
  - `get_connection_shared_profile(...)`
  - `get_connection_visible_card_entries(...)` (used by edge function `connection-data-search`)
  - A number of “issue token / link by token / create request” RPCs called by `searchforaddprofile`.

### State Flow (Connection Feed)
1. UI calls `supabase.rpc("get_connection_feed", { p_limit, p_couple_id })`: [ConnectionFeed.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/ConnectionFeed.tsx).
2. DB function `get_connection_feed` runs as `SECURITY DEFINER` and:
   - Computes viewer identity via `auth.uid()`.
   - Finds accepted couples for viewer.
   - Joins sharing tables to infer visible items.
   - Returns a unified feed of:
     - card events (shared_card_entries)
     - profile signal events (shared_profile_fields)
     - derived feature events (shared_derived_features + lateral functions)
     - occasion events (derived from `get_connection_relevant_occasions`)
3. UI resolves `image_url` values (if present) to display URLs via `resolveStorageUrl(...)`: [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts).

### State Flow (Search)
- Self search:
  - UI queries `card_entries` scoped to `user.id` directly: [Search.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Search.tsx).
- Circle search:
  - Edge function `connection-data-search`:
    - validates Authorization token using service role client
    - finds accepted couples
    - for each connection, calls RPC `get_connection_visible_card_entries(...)`
    - filters rows in function code with `matchesQuery(...)`

### State Flow (Linking / Invites / Discovery)
The edge function `searchforaddprofile` is a multi-action dispatcher:
- It requires `Authorization` in general, validates token via `adminClient.auth.getUser(token)`.
- It creates a `viewerClient` with anon key but with Authorization headers forwarded, to call viewer-scoped RPCs.
- It supports:
  - creating connection requests (RPC)
  - issuing share tokens (RPC)
  - linking by inviter id / by token
  - tracking invite events
  - resolving identity fields
  - sending invite emails (external lovable API key)
  - seeding demo profiles (special case)

### Backend/Storage Touchpoints
- Feed is mostly “DB as backend,” with a clean contract: UI calls `get_connection_feed`.
- Search uses both direct table access (self) and edge function (circle) that calls DB RPCs.
- Identity/search uses edge function and DB RPC `search_discoverable_users` (with fallback to admin-driven lookup).

### Good (Architectural)
- Strong boundary: “visibility and sharing logic lives in Postgres,” via security definer functions and controlled RPCs. This reduces client-side access control mistakes.
- The feed function has an explicit output contract and consolidates heterogeneous event types into a single queryable shape.
- The edge function `connection-data-search` uses server-side identity checks and server-side visibility RPC rather than attempting to mirror visibility rules in the client.

### Bad (Boundary Bloat / Coupling)
- `searchforaddprofile` is a “god edge function” that multiplexes many behaviors behind a freeform `action` string.
  - This increases coupling: changes to one behavior risk others.
  - It makes it difficult to reason about auth requirements per action, and difficult to apply `verify_jwt` consistently.
- Mixed “source of truth” locations:
  - Some search/discovery is via DB RPC (viewerClient)
  - Some fallback uses admin queries and manual merging
This indicates the system is still settling on a single boundary for discovery.

### Risks
- Large dispatcher functions are hard to secure over time: an innocuous new action can accidentally bypass intended checks.
- Using service role in edge functions increases blast radius; mistakes become catastrophic, so boundaries must be extremely explicit.
- `verify_jwt=false` in `supabase/config.toml` for `searchforaddprofile` means the platform will not enforce JWT; correctness rests entirely on `auth.getUser(token)` checks.

### Concrete Improvements
- Split `searchforaddprofile` into:
  - “discovery search” function
  - “invite/token issuance” function
  - “accept/link” function
  - “demo seed” function (dev-only)
This reduces coupling and allows per-function JWT policy and per-function env requirements.
- Keep DB contracts as the primary visibility source, and minimize fallback admin-query paths unless strictly necessary (and document when they are necessary).
- Adopt a typed request schema per action (even in edge functions) to prevent silent widening of accepted payloads.

---

## Section 006: Photo Gallery (My Go Two Slot Editor) End-to-End Trace

### Trigger
- Signed-in user visits `/photo-gallery` to upload and/or delete My Go Two images:
  - per-category "Small" strip image
  - per-category "Card" (opened overlay) image
  - 5 "Step 1 repeat" images for collapsed/preview rotation

### Entrypoints
- Route: [src/App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx) -> `/photo-gallery`
- Page: [src/pages/PhotoGallery.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/PhotoGallery.tsx)
- Slot contract: [src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts)
- Assignment read/write shim: [src/lib/imageOverrides.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/imageOverrides.ts)
- Storage ref boundary: [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)

### Touched Files
- [src/pages/PhotoGallery.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/PhotoGallery.tsx)
- [src/lib/imageOverrides.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/imageOverrides.ts)
- [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)
- [supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql) (category_images table)
- [supabase/migrations/20260326095000_private_storage_buckets.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326095000_private_storage_buckets.sql) (photo-bank bucket)

### Touched Data
- Table: `category_images`
  - `category_key` is the slot key (e.g., `mygotwo-strip-01`, `mygotwo-card-dining`, `mygotwo-collapse-01`)
  - `gender` is used as a partition key; PhotoGallery queries `gender = 'male'`
  - `image_url` is stored as a storage ref string (`storage://bucket/path`)
- Storage bucket: `photo-bank`
  - Upload path convention uses `target.folder/...` where `folder` comes from `MYGOTWO_*_SLOT_TARGETS`:
    - `mygotwo/categories/<slug>/small/...`
    - `mygotwo/categories/<slug>/card/...`
    - `mygotwo/repeat/<nn>/...`

### State Flow
1. Load:
   - `loadAssignedSlots()` selects `{ category_key, image_url, created_at }` from `category_images` for all MyGoTwo slot keys and resolves display URLs via `resolveStorageUrls(...)`.
2. Upload:
   - User chooses a slot (dropdown) and clicks Upload.
   - `createPhotoPath(...)` keeps the original file extension and generates a slugged path with timestamp + UUID.
   - File uploads to `supabase.storage.from("photo-bank").upload(path, file, ...)`.
   - The DB mapping is updated via `setImageUrl(target.key, makeStorageRef("photo-bank", path))` (upsert into `category_images`).
3. Delete:
   - `deleteImageUrl(target.key)` deletes the row in `category_images`.
   - `removeStorageFileIfUnused(...)` checks if the same `image_url` is used by other slots and, if not, attempts `supabase.storage.from(bucket).remove([path])`.
   - Failures or invalid refs are captured into a "Manual cleanup list" UI section.

### Backend/Storage Touchpoints
- Direct client-side writes:
  - Storage upload to `photo-bank`
  - Storage remove from bucket inferred from `storage://...`
  - DB upsert/delete in `category_images`

### How It Connects Through the App
- My Go Two runtime reads `category_images` (by slot keys) and resolves URLs for display (see Section 004).
- Photo Gallery is designed as a "direct slot editor" rather than a staging bank (explicit in its page copy).

### Good (Architectural)
- Clear contract for what a "slot" is: key-space lives in `myGoTwoStripGallery.images.ts`.
- Strong operational intent: upload directly into the live slot; delete attempts to clean up storage automatically; failures are tracked explicitly.

### Bad (Boundary / Ownership)
- `category_images` is global, not user-scoped.
  - Unless RLS locks it down to an admin role, any authenticated user can overwrite the global My Go Two experience.
- Upload keeps arbitrary extensions. The product rule in `NEXT_CHAT_HANDOFF.md` says JPG should be the standard for strip pipeline; the code currently allows PNG/WebP/etc.
- The "gender" column is a partition key but the slot system itself is not gender-aware in runtime. This suggests a half-migrated design.

### Risks
- Global editor pages become accidental production admin tools without proper access boundaries.
- Orphaned storage files accumulate when delete fails and the cleanup list is not acted on.

### Concrete Improvements
- Make ownership explicit:
  - Either lock `category_images` to a true admin boundary, or move My Go Two slot mappings to a user-scoped table keyed by `user_id`.
- Enforce file format and/or validate on upload:
  - Reject PNG for transforms if the transform pipeline is sensitive; or convert server-side.
- Consider representing slots as first-class DB rows (enum + FK) instead of freeform `category_key` strings.

---

## Section 007: Storage Ref Contract vs Bucket Privacy (Cross-Layer Drift)

### Trigger
- Any page resolves image URLs from stored refs (My Go Two, connections, avatars, cards, etc.).

### Entrypoints
- Storage boundary module: [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)
- Storage bucket definitions/policies: [supabase/migrations/20260326095000_private_storage_buckets.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326095000_private_storage_buckets.sql)

### Contract
- DB stores image fields as:
  - `storage://<bucket>/<path>` (preferred)
  - or legacy full Supabase storage URLs (best-effort parsed)
- Runtime resolves to:
  - public URL (for public buckets)
  - signed URL (for private buckets)
  - optionally signed URL with transform (for private buckets + transform)

### Observed Drift
- `storageRefs.ts` hardcodes `PRIVATE_BUCKETS` as:
  - `avatars`, `avatars-1`, `card-images`, `connection-photos`
- Repo migrations create additional private buckets:
  - `photo-bank` (used by PhotoGallery)
  - `images-mygotwo-strip` (historical/alternate MyGoTwo image path)

If these buckets are actually private in the deployed environment, current resolver logic will treat them as public and build "public" URLs (including transformed public URLs) that are unlikely to load.

### Good
- Signed URL caching and grouped `createSignedUrls` calls reduce latency.
- `toStorageRefIfPossible` provides an upgrade path from raw storage URLs to `storage://...`.

### Bad
- Manual, static privacy list is an architectural footgun: it will drift from DB/migrations.
- `parseSupabaseStorageUrl(...)` recognizes only `/object/public/...` and `/object/sign/...` URL shapes.

### Risks
- "It works locally" can mask "it fails in prod" if the Supabase project bucket flags/policies differ from migrations.
- Transform URLs are especially sensitive: a mistaken public transform URL will fail hard.

### Concrete Improvements
- Single source of truth for bucket privacy:
  - Option A: treat all buckets as private unless explicitly whitelisted as public.
  - Option B: maintain a DB table listing buckets + privacy and fetch it at startup (cached).
- Add an internal assertion/log: if a `storage://bucket/...` ref is resolved via public URL for a bucket that is configured private, warn loudly.

---

## Section 008: Onboarding -> Personalization -> Persistent User Profile (End-to-End)

### Trigger
- First login routes user to `/onboarding` when `user_preferences.onboarding_complete` is false.
- User completes onboarding profile questions and kicks off personalization.

### Entrypoints
- Login routing: [src/pages/Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx)
- Onboarding UI: [src/pages/Onboarding.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Onboarding.tsx)
- Personalization cache provider: [src/contexts/PersonalizationContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/PersonalizationContext.tsx)
- Edge function: [supabase/functions/personalize/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/personalize/index.ts)
- Shared bank constraints: [supabase/functions/_shared/knowMeCatalog.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/_shared/knowMeCatalog.ts)

### Touched Data
- `profiles`:
  - `gender`, `birthday`, `anniversary` are set by onboarding
- `user_preferences`:
  - `onboarding_complete` boolean
  - `profile_answers` jsonb map (extended in: [20260309140033_bb2f4241-ece5-43cf-a1d0-cb8e8d7c4ad4.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260309140033_bb2f4241-ece5-43cf-a1d0-cb8e8d7c4ad4.sql))
  - `ai_personalization` jsonb object

### State Flow
1. After auth, `Login.tsx` checks `user_preferences.onboarding_complete` and routes to `/onboarding` if not complete.
2. Onboarding form writes:
   - `profiles.update({ gender, birthday, anniversary })`
   - `user_preferences.upsert({ user_id, profile_answers: cleaned, onboarding_complete: true })`
3. Onboarding invokes `personalize` edge function (best-effort, with a 30s timeout race).
4. `PersonalizationProvider` reads:
   - authoritative `profiles.gender` first
   - falls back to `user_preferences.profile_answers.identity`
   - loads `user_preferences.ai_personalization` and stores it in context
   - includes an aggressive string sanitization pass for `ai_personalization`

### Backend/Storage Touchpoints
- `personalize` edge function:
  - requires `Authorization` header
  - calls Supabase auth to validate the user
  - calls Lovable AI gateway to generate structured personalization
  - writes `user_preferences.ai_personalization`

### Good
- Clear separation: raw answers in `profile_answers`, derived summary in `ai_personalization`.
- Bank constraints (`getBankPersonalization(...)`) reduce AI output drift and keep brands/stores controlled.
- Frontend treats `profiles.gender` as authoritative and uses realtime updates for it.

### Bad (Schema / Ownership)
- `user_preferences` includes many legacy-ish jsonb columns (`favorites`, `dislikes`, `brands`, etc.) plus `profile_answers`.
  - Current runtime strongly prefers `profile_answers`, so these older columns are likely redundant or drifting.
- Client-side sanitization of `ai_personalization` indicates the persisted derived data can be malformed; the system boundary is leaking.

### Risks
- Without a defined schema contract for `ai_personalization`, downstream code will rely on "best effort" keys.
- `verify_jwt = false` for `personalize` is not set in `supabase/config.toml`, but other AI functions are; enforcement is inconsistent across functions.

### Concrete Improvements
- Decide the canonical storage model for preferences:
  - Either formalize `profile_answers` as the only input store and deprecate older columns, or explicitly map older columns into it.
- Move `ai_personalization` sanitation to the edge function before persistence.
- Document which keys in `profile_answers` are "reserved" to avoid collisions between onboarding, Know Me, and other flows.

---

## Section 009: Questionnaires (Know Me + This-or-That + Style Chat) End-to-End

### Trigger
- User navigates to `/dashboard/questionnaires` to answer static question banks and optionally chat with the AI.

### Entrypoints
- UI: [src/pages/dashboard/Questionnaires.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/Questionnaires.tsx)
- Static bank: [src/data/knowMeQuestions.ts](/Users/adamb/Documents/GitHub/my-go-two/src/data/knowMeQuestions.ts)
- Context input store: [src/contexts/PersonalizationContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/PersonalizationContext.tsx)
- Edge function: [supabase/functions/style-chat/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/style-chat/index.ts)

### Touched Data
- `user_preferences.profile_answers` is updated as the single answer store for Know Me and This-or-That question IDs.
- `style-chat` does not persist anything; it is a pure request/response to AI gateway.

### State Flow
1. UI computes completion from `profileAnswers` (from PersonalizationContext) and local `selections`.
2. On save, UI updates `user_preferences.profile_answers` for the current question set.
3. Style Chat:
   - UI sends `{ message, profile_answers, ai_personalization }` to edge function.
   - Edge function validates user by Authorization header and forwards the payload into the AI gateway prompt.

### Backend/Storage Touchpoints
- DB update (client-side): `user_preferences.update({ profile_answers: cleaned })`
- AI gateway call (edge): `style-chat` -> Lovable AI gateway

### Good
- Single "answer map" in `profile_answers` avoids introducing a large per-question table and keeps reads simple.
- Static bank avoids cross-user global caching and reduces infra dependencies.

### Bad (Boundary / Coupling)
- `profile_answers` is now a catch-all map for multiple domains:
  - onboarding keys (e.g., `identity`, `birthday`)
  - Know Me keys (e.g., `sf-01`, `fd-04`)
  - This-or-That keys (e.g., `tot-*`)
This is workable but becomes fragile without a namespace or contract enforcement.
- Payloads to AI gateway include the full `profile_answers` and `ai_personalization` objects. The boundary is wide and can leak more than needed.

### Redundancy Watch
- `ai-quizzes` edge function generates global quizzes stored in `quiz_question_sets`, but the primary UX uses the static `knowMeQuestions.ts` bank.
  - This indicates either dead code or a partially abandoned direction.

### Concrete Improvements
- Define a namespacing convention in `profile_answers` or split into columns:
  - `onboarding_answers`, `know_me_answers`, `this_or_that_answers`
- Minimize data sent to the style-chat gateway:
  - send only the subset of answers needed for the current question or the persona summary instead of the full maps.
- If `ai-quizzes` is intended to be live, align frontend to read it; otherwise deprecate it.

---

## Section 010: Recommendations (Weekly Cache + AI Generation + External Scrape) End-to-End

### Trigger
- User opens `/dashboard/recommendations`.
- UI calls `ai-products` once personalization is available; user can "refresh" (force refresh).

### Entrypoints
- UI: [src/pages/dashboard/Recommendations.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/Recommendations.tsx)
- Edge function: [supabase/functions/ai-products/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/ai-products/index.ts)
- Cache table: [supabase/migrations/20260316175025_d34dc734-c433-46d6-84fc-f842382d15c9.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260316175025_d34dc734-c433-46d6-84fc-f842382d15c9.sql)
- Catalog/bank constraints: [supabase/functions/_shared/knowMeCatalog.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/_shared/knowMeCatalog.ts)

### Touched Data
- `weekly_recommendations` (per-user, per-week cache)
- `user_preferences.profile_answers`, `user_preferences.ai_personalization` (inputs)
- External dependencies (edge):
  - Lovable AI gateway (optional; requires `LOVABLE_API_KEY`)
  - Firecrawl (optional; requires API key)

### State Flow
1. UI invokes `ai-products` and retries once on 401 by calling `supabase.auth.refreshSession()`.
2. Edge function:
   - validates Authorization header via `supabase.auth.getUser()`
   - computes `week_start` key and checks `weekly_recommendations` cache
   - invalidates cache if `source_version` does not match current catalog version
   - otherwise returns cached results
3. On miss:
   - reads preference inputs from `user_preferences`
   - builds fallback catalog recommendations deterministically
   - optionally calls AI gateway for intents and optionally Firecrawl to pick product images/prices
   - writes new results into `weekly_recommendations`

### Good (Architectural)
- Cache-by-week is a sane boundary: avoids calling AI frequently and gives users a stable weekly set.
- "Catalog version" invalidation is explicit and prevents stale cached shapes.
- Intent sanitization is a real contract boundary in the edge function (filters categories/kinds and cleans strings).

### Bad (Complex Coupling)
- Edge function mixes:
  - deterministic bank catalog logic
  - AI intent generation
  - external scraping
  - persistence
This is high complexity in a single request path and will be hard to debug when one dependency flakes.

### Risks
- `verify_jwt = false` for `ai-products` in [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml) means platform JWT checks are off; correctness relies entirely on function code.
- Scraping in-request increases tail latency and can produce intermittent errors.

### Concrete Improvements
- Split "resolve product image URL" into a background job (or a separate function called after initial recommendations are saved).
- Formalize a product schema and store typed `source_kind/source_version` consistently.
- Keep `weekly_recommendations` as the single source of truth for "For You this week" and avoid re-derivation elsewhere.

---

## Section 011: Dashboard Home (Connections + Milestones + Home Search) End-to-End

### Trigger
- User lands on `/dashboard` (DashboardHome).

### Entrypoints
- UI: [src/pages/dashboard/DashboardHome.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/DashboardHome.tsx)
- Edge function search: [supabase/functions/connection-data-search/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/connection-data-search/index.ts)
- DB RPCs:
  - `get_connection_relevant_occasions`
  - `get_connection_feed` (preview subset)

### Touched Data
- `profiles` (display name, birthday, anniversary)
- `couples` (accepted connections)
- `card_entries` (for search)
- Connection visibility RPC:
  - `get_connection_visible_card_entries` (called from edge function)

### State Flow
1. Connections list:
   - reads accepted rows from `couples` and derives partner IDs
   - assigns stock photos when missing
2. Milestones:
   - for each partner, calls `get_connection_relevant_occasions` to compute upcoming dates
3. Home Search:
   - UI calls `supabase.functions.invoke("connection-data-search", { action: "home-search", query, scope })`
   - edge function uses service role to validate user and enumerates connections
   - for each connection, calls RPC `get_connection_visible_card_entries` and filters results by query

### Good
- Visibility boundary is server-side (edge + DB RPC), not client-side filtering.
- Search scope model ("self", "everyone", per-connection) is a coherent UX contract.

### Bad
- Edge search loops over connections sequentially; cost grows with number of connections and rows.
- `connection-data-search` uses service role; strict input validation is required long-term.

### Concrete Improvements
- Move "circle search" fully into Postgres as a single RPC that can join over accepted couples and shared entries with indexes.
- If edge must stay: parallelize per-connection work and add robust timeouts and limits.

---

## Section 012: Public Feed (Publishing + Reactions + Follows) End-to-End

### Trigger
- User navigates to `/dashboard/public-feed` to browse published entities and react/follow.

### Entrypoints
- UI: [src/pages/dashboard/PublicFeed.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/PublicFeed.tsx)
- Schema + RPC backbone: [supabase/migrations/20260320190000_public_feed_backend.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260320190000_public_feed_backend.sql)

### Touched Data
- `public_creator_profiles` (profile/identity for creators)
- `public_creator_follows` (follower graph)
- `public_published_entities` (published "product" or "outfit" entities)
- `public_published_entity_cards` (link to `card_entries`)
- `public_entity_reactions` (like/love)
- RPC: `get_public_feed_items(...)` (security definer, aggregated counts and viewer flags)

### State Flow
1. UI calls `get_public_feed_items(p_limit, p_entity_kind, p_creator_user_id)` and maps the row shape into view items.
2. UI toggles follow/unfollow via dedicated RPCs (not shown in the snippet, but referenced in UI).
3. UI toggles like/love via `toggle_public_entity_reaction` RPC and reloads the feed.

### Good
- DB-as-backend pattern is strong here:
  - aggregation, viewer flags, counts happen server-side in one query
  - RLS policies define base access
  - security definer function provides a single contract to the client

### Bad / Risks
- The domain is large; without a dedicated module boundary in code, it risks getting implemented inconsistently across pages.
- If public feed is intended to be visible without auth, current UI routes are under `/dashboard/*` and appear to assume auth.

### Concrete Improvements
- Treat public feed as its own bounded context:
  - one client module that owns all RPC calls + type mappings
  - explicit "publishing" workflow contracts (draft -> published -> archived)

---

## Section 013: Notifications (Realtime + RLS) End-to-End

### Trigger
- User opens `/dashboard/notifications` to view and clear notifications.

### Entrypoints
- UI: [src/pages/dashboard/Notifications.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/Notifications.tsx)
- Schema: [supabase/migrations/20260311062439_a3f5b09f-d58d-4fcc-90f0-883e7c40084f.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260311062439_a3f5b09f-d58d-4fcc-90f0-883e7c40084f.sql)

### Touched Data
- Table: `notifications`
  - RLS: user can select/update/delete where `auth.uid() = user_id`
  - Realtime publication includes the table

### State Flow
- UI fetches `notifications` ordered by created_at desc.
- UI subscribes to `postgres_changes` on `notifications` and refetches on any event.
- UI supports:
  - mark all read (bulk update)
  - mark one read
  - delete one

### Good
- Straightforward RLS and a simple realtime model.

### Bad
- The migration policy label says "Service can insert notifications" but the policy is `TO authenticated` with `auth.uid() = user_id`, which is not "service" and may be misleading as documentation.

### Concrete Improvements
- If notifications are to be inserted by backend services, add an explicit `TO service_role` insert policy and keep user insert blocked.

---

## Section 014: Connection Discovery + Share Tokens + Invite Linking (DB RPCs vs Edge Dispatcher)

### Trigger
- User searches for someone to connect with (name / phone).
- User generates a QR/link share token and sends an invite.
- Invitee opens `/connect?token=...` (or legacy `/connect?invite=<user_id>`) and links accounts.

### Entrypoints
- Invite landing route: [src/pages/Connect.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Connect.tsx)
- Add connection UX: [src/components/home/AddConnectionModal.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/home/AddConnectionModal.tsx)
- Settings connections UX: [src/pages/dashboard/SettingsPage.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/SettingsPage.tsx)
- Dashboard invite auto-process: [src/layouts/DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)
- Edge dispatcher: [supabase/functions/searchforaddprofile/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/searchforaddprofile/index.ts)
- DB contracts: [supabase/migrations/20260320183000_connection_discovery_and_entrypoints.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260320183000_connection_discovery_and_entrypoints.sql)
- Tracking table: [supabase/migrations/20260326070000_connection_invite_events.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326070000_connection_invite_events.sql)

### Touched Data
- Relationship:
  - `couples` (pending/accepted connection rows)
- Discovery controls:
  - `user_discovery_settings` (per-user flags)
  - `user_discovery_contacts` (phone normalization + uniqueness)
- Share tokens:
  - `connection_share_tokens` (token, channel, expires_at, used_count)
- Tracking:
  - `connection_invite_events` (event_type, channel, metadata)

### State Flow (Current Runtime)
1. Search:
   - AddConnectionModal calls `searchforaddprofile` with `{ action: "search", query }`.
   - DB contains `search_discoverable_users(...)` RPC that can do this, but the current UI routes through the edge dispatcher.
2. Share token:
   - SettingsPage uses `searchforaddprofile` action `create-connection-share-token`.
   - AddConnectionModal uses `searchforaddprofile` action `prepare-connection-share` and expects `{ share_token, invite_link, share_message }`.
   - DB contains `issue_connection_share_token(channel, days_valid)` which creates rows in `connection_share_tokens`.
3. Invite link open:
   - Invitee visits `/connect?token=...`; Connect.tsx calls `searchforaddprofile` action `link-by-token`.
   - DashboardLayout also processes stored `localStorage.gotwo_invite` and calls `searchforaddprofile` action `link-by-inviter`.
   - DB contains `create_connection_invite_from_token(token)` which creates `couples` pending rows and increments used_count.

### Backend/Storage Touchpoints
- Many of these behaviors already exist as DB RPCs (security definer), but are exercised through a single edge function dispatcher.
- `supabase/config.toml` sets `verify_jwt = false` for `searchforaddprofile`, so the auth boundary depends on explicit `getUser(token)` checks inside the edge function.

### Good (Architectural)
- The DB schema is surprisingly well-shaped for this domain:
  - explicit discovery settings and phone normalization
  - explicit token table with expiry and used_count
  - explicit RPCs for token issuance and token linking
- Tracking table (`connection_invite_events`) is a proper separation: analytics can evolve without mutating core relationship tables.

### Bad (Boundary Redundancy / Coupling)
- The system has two parallel "backends" for the same lifecycle:
  - DB RPCs implement discovery + token issuance + token linking
  - Edge function multiplexes a large set of actions that overlap the RPCs
This increases coupling and makes it harder to reason about the actual source of truth for each step.

### Risks
- Dispatcher growth risk: a new action can silently weaken security or correctness for unrelated invite flows.
- Mixed entrypoints (Connect.tsx, DashboardLayout invite effect, SettingsPage, AddConnectionModal) can cause duplicate linking attempts.

### Concrete Improvements
- Choose the primary boundary:
  - If DB RPCs are the contract, call them directly from the client for search/token/link and reserve edge functions for email sending + privileged operations.
  - If edge is the contract, shrink DB RPC surface to only what edge uses and document it.
- Split `searchforaddprofile` into smaller functions to reduce action coupling.

---

## Section 015: Settings Domain (Profile + User Settings + Connection Management)

### Trigger
- User visits `/dashboard/settings` to edit profile, notifications preferences, and manage connections.

### Entrypoints
- UI: [src/pages/dashboard/SettingsPage.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/SettingsPage.tsx)
- Profile avatar UI: [src/components/DashboardTopBar.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/DashboardTopBar.tsx)
- Schema: `profiles`, `user_settings`, `couples`, `connection_share_tokens`

### Touched Data
- `profiles`:
  - `display_name`, `gender`, `birthday`, `anniversary`, `avatar_url`
- `user_settings`:
  - booleans like `gift_reminders`, `partner_activity`, `recommendations`, `email_digests` (plus other columns not surfaced in UI)
- `couples`:
  - delete connection rows directly from client
- `avatars-1` storage bucket:
  - object path `user.id/avatar.<ext>`
  - profile stores `avatar_url` as `storage://avatars-1/<path>`

### State Flow
- SettingsPage:
  - reads profile from `profiles` and writes updates directly
  - reads and upserts `user_settings` directly (client-controlled)
  - lists connections from `couples` and deletes via `couples.delete()` (client-controlled)
  - routes connection-specific actions through `searchforaddprofile` (pending list, accept, send invite email, seed demo profiles, share token)
- DashboardTopBar:
  - uploads avatar into `avatars-1` with `upsert: true`
  - updates `profiles.avatar_url` to a storage ref
  - removes avatar by listing the user folder and deleting objects

### Good
- Avatar storage is properly user-scoped in storage policy (foldername[1] = auth.uid()) and `storageRefs.ts` treats `avatars-1` as private.
- SettingsPage separates "profile identity" (profiles) from "settings toggles" (user_settings).

### Bad / Risks
- Connection deletion from the client is a sharp edge: if `couples` RLS is permissive, it may allow unintended deletes; if it is strict, the UI will silently fail.
- `user_settings` contains more flags than UI uses; drift risk between schema and actual UX.

### Concrete Improvements
- Consolidate "user preference toggles" into a single bounded record:
  - either keep `user_settings` as the canonical toggle store and remove unused columns, or map them into a typed UI model.
- For dangerous operations (connection delete), consider a DB RPC that validates ownership and status transitions explicitly.

---

## Section 016: Calendar Subsystem (First-Party Events + External Sync Tables) End-to-End

### Trigger
- User lands on DashboardHome and views milestones/calendar.
- User creates a first-party calendar event in the modal calendar UI.

### Entrypoints
- Calendar UI: [src/components/home/EventCalendar.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/home/EventCalendar.tsx)
- Milestone derivation: [src/pages/dashboard/DashboardHome.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/DashboardHome.tsx)
- Schema:
  - [supabase/migrations/20260317190000_calendar_events.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260317190000_calendar_events.sql)
  - [supabase/migrations/20260316160910_8221dc20-4ce1-4a42-a411-33d1d20da0ce.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260316160910_8221dc20-4ce1-4a42-a411-33d1d20da0ce.sql)

### Touched Data
- Used in UI:
  - `calendar_events` (first-party events)
  - implicit milestone sources:
    - self: `profiles.birthday`, `profiles.anniversary`
    - connections: `get_connection_relevant_occasions` RPC
- Present in schema but not observed in frontend callsites:
  - `calendar_accounts`
  - `external_calendar_events`

### State Flow
1. DashboardHome computes milestone banners from:
   - self profile dates
   - connection relevant occasions (RPC per connection)
2. EventCalendar loads `calendar_events` for the current user and renders them into a month grid alongside milestones.
3. EventCalendar "Add event" persists a new row into `calendar_events` (client-side insert).

### Good
- Separation between:
  - derived/readonly milestones (from profiles/connection context)
  - first-party persisted events (calendar_events)
- RLS on `calendar_events` is owner-based and simple.

### Bad / Risks
- External calendar sync tables exist but appear unused from the frontend in this checkout; this is a maintenance burden and a likely source of confusion ("is calendar sync implemented or not?").
- Two concepts of "calendar events" exist:
  - derived milestones
  - persisted calendar_events
If not documented, users and developers will misinterpret which is editable and which is computed.

### Concrete Improvements
- Decide whether external calendar sync is in-scope:
  - If yes, add a clear UI entrypoint and a single integration module.
  - If no, deprecate the tables/functions to reduce schema surface area.

---

## Section 017: Admin Category Registry Sync (Seed Push) End-to-End (Auth Boundary Failure)

### Trigger
- Operator visits `/admin/category-sync` (or equivalent admin route) and presses "Push Updates" to overwrite `category_registry` in Supabase.

### Entrypoints
- Admin UI: [src/pages/admin/CategorySync.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/admin/CategorySync.tsx)
- Seed payload: [src/data/categoryRegistrySeed.ts](/Users/adamb/Documents/GitHub/my-go-two/src/data/categoryRegistrySeed.ts)
- Edge function: [supabase/functions/sync-category-registry/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/sync-category-registry/index.ts)
- Function auth config: [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml)
- Schema source-of-truth: [supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql)

### Touched Data (Source of Truth)
- Table: `category_registry`
  - Rows define MyGoTwo and dashboard cards, including nested JSON shapes (`fields`, `subcategories`).
- Seed: hardcoded JSON in `CATEGORY_REGISTRY_SEED` (frontend) that must match DB schema expectations.

### State Flow
1. Admin presses "Push Updates".
2. `CategorySync.tsx` strips an `image` field (comment notes "column may not exist") and calls:
   - `supabase.functions.invoke("sync-category-registry", { body: { rows: seedToInsert } })`
3. Edge function:
   - parses `{ rows }` from JSON.
   - creates a Supabase client using **service role** key.
   - deletes all existing `category_registry` rows (via `.delete().neq("key","")`).
   - inserts rows back in batches of 10.

### Backend/Storage Touchpoints
- Supabase edge function with `SUPABASE_SERVICE_ROLE_KEY` executes destructive DB writes.

### Architectural Good
- "Catalog shape" is centralized into a single seed structure, which is a tractable source-of-truth during early iteration.
- Batch inserts reduce payload-size risk and avoid a single huge insert statement.

### Architectural Bad (Hard Boundary Violation)
- [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml) explicitly sets:
  - `[functions.sync-category-registry] verify_jwt = false`
- [sync-category-registry/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/sync-category-registry/index.ts) performs **no manual Authorization checks**.

Net effect: this endpoint is effectively unauthenticated and can be invoked by anyone who can reach it, yet it has **service-role destructive capability** (wipe + replace the registry).

Additionally, the table itself is wide-open in its base migration:
- [20260313020827_...sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql) grants INSERT/UPDATE/DELETE to any authenticated user.

### Risks
- A single malicious or accidental call can erase `category_registry`, breaking MyGoTwo and any dashboard experiences that depend on registry cards.
- This is "environment-agnostic": if deployed, prod is exposed unless the function is firewalled elsewhere.
- Schema coupling risk: seed includes complex JSON; without versioning, partial/incompatible pushes can brick UX.

### Concrete Improvements
- Fix the auth boundary:
  - Set `verify_jwt = true` for this function and also manually check `Authorization` inside the function for defense-in-depth.
  - Gate by an explicit role/claim (or at minimum an email allowlist) before allowing the destructive write.
- Remove service-role from the path:
  - Prefer DB-side RPC that validates caller role and applies updates transactionally.
  - Or run these changes as migrations/seeds (CI/operator), not via runtime edge endpoint.
- Tighten `category_registry` RLS:
  - reads can remain public/authenticated depending on product goals, but writes should be admin-only.

---

## Section 018: Storage Bucket Privacy Evolution (Migrations) vs Resolver Contract (Observed Drift in Both Directions)

### Trigger
- Any feature that resolves `storage://...` refs or uses Supabase storage "public URLs" for display and transforms:
  - MyGoTwo strip images (PhotoGallery + gallery loader)
  - profile avatars
  - connection photos
  - card entry images

### Entrypoints
- Runtime resolver: [src/lib/storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts)
- Bucket policy migrations:
  - [supabase/migrations/20260320123000_lock_profile_storage_buckets.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260320123000_lock_profile_storage_buckets.sql)
  - [supabase/migrations/20260326095000_private_storage_buckets.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326095000_private_storage_buckets.sql)
  - [supabase/migrations/20260326234412_10d38189-d643-4881-b1f5-fe1a55226fb5.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326234412_10d38189-d643-4881-b1f5-fe1a55226fb5.sql)

### Touched Data
- Storage buckets (observed across migrations): `avatars`, `avatars-1`, `card-images`, `connection-photos`, `category-images`, `photo-bank`, `images-mygotwo-strip`.
- DB columns storing storage refs:
  - `profiles.avatar_url`
  - `card_entries.image_url`
  - `couples.photo_url`
  - `category_images.image_url`

### State Flow (Contract Expectation)
`storageRefs.ts` makes a design promise:
- "private bucket" => generate signed URL (optionally transformed)
- "public bucket" => generate public URL (optionally transformed via public transform endpoint)

### Observed Evolution (Why Static Lists Drift)
- `card-images` starts public (earlier migration), then is explicitly made private with owner-only select:
  - [20260320123000_lock_profile_storage_buckets.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260320123000_lock_profile_storage_buckets.sql)
- `photo-bank` is created as private in one migration:
  - [20260326095000_private_storage_buckets.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326095000_private_storage_buckets.sql)
  - but later explicitly made public again:
  - [20260326234412_...sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326234412_10d38189-d643-4881-b1f5-fe1a55226fb5.sql)

### Architectural Good
- Migrations show active intent to harden bucket privacy and reduce public exposure.
- The resolver’s caching and batching is a good performance boundary.

### Architectural Bad / Drift Points
- `PRIVATE_BUCKETS` is a static allowlist in code, but bucket privacy is dynamic across migrations and per-environment.
- Drift is not only "missing private buckets":
  - A bucket can also become public again (photo-bank), making the resolver’s "sign it" path unnecessary or inconsistent depending on environment state.

### Risks
- Inconsistent user experience across environments:
  - staging/prod buckets not matching local expectations can yield silent broken images.
- A future revival of the older `images-mygotwo-strip` pipeline could break immediately if the resolver treats it as public.

### Concrete Improvements
- Replace the static `PRIVATE_BUCKETS` list with a single source-of-truth:
  - default-private (opt-in public), or
  - fetch bucket config from backend at boot (cached) and resolve based on actual settings.
- Add a "bucket policy audit" dev tool:
  - a page that lists bucket ids, their `public` flag, and example resolved URLs for each bucket.

---

## Section 019: Sponsored Products + Ad Events (Admin Catalog + Client Tracking) End-to-End

### Trigger
- Admin manages "sponsored products" (create/edit/activate/deactivate) via `/admin/sponsored`.
- Any signed-in user sees sponsored products injected into recommendations or dedicated placements and triggers impression/click tracking.

### Entrypoints
- Admin UI: [src/pages/admin/SponsoredAdmin.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/admin/SponsoredAdmin.tsx)
- Client tracking lib: [src/lib/adTracking.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/adTracking.ts)
- Schema migration: [supabase/migrations/20260316081842_a31191b0-9ff5-4a1e-8987-2edbb94dbb60.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260316081842_a31191b0-9ff5-4a1e-8987-2edbb94dbb60.sql)

### Touched Data (Source of Truth)
- `sponsored_products`
  - catalog row with targeting attributes (`target_gender`, `target_price_tiers`, `target_style_keywords`)
  - placement (`blended|dedicated|both`) and `priority`
- `ad_events`
  - immutable event rows for `impression` and `click` events, with optional JSON `metadata`

### State Flow
1. Admin catalog management:
   - `SponsoredAdmin.tsx` uses a client-side `isAdmin` gate (`user?.email === "adambozman@gmail.com"`) for rendering UX.
   - Reads `sponsored_products` and (for analytics) reads `ad_events` and aggregates counts client-side.
   - Writes:
     - insert/update/delete on `sponsored_products`
     - updates `is_active` toggle
2. User tracking:
   - `trackAdEvent(...)` fetches current auth user and inserts into `ad_events` with `{ product_id, user_id, event_type, placement, metadata }`.
   - `buildAffiliateUrl(...)` appends UTM parameters to affiliate URLs.

### Backend/Storage Touchpoints
- No edge functions involved; all reads/writes are direct PostgREST with RLS enforcement.

### RLS / Boundary Contract
- [20260316081842_...sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260316081842_a31191b0-9ff5-4a1e-8987-2edbb94dbb60.sql) defines:
  - `sponsored_products`: authenticated users can read active rows; only users whose JWT email equals `adambozman@gmail.com` can manage.
  - `ad_events`: authenticated users can insert only rows where `auth.uid() = user_id`; admin can read all.

### Architectural Good
- The authoritative boundary is server-enforced (RLS), not just UI-gated.
- Append-only `ad_events` enables auditing and future metric recomputation.

### Architectural Bad / Coupling
- Analytics aggregation is performed in the browser by selecting all `ad_events`.
  - This scales poorly and is a classic "it works until it doesn’t" shape; an RPC aggregation would be a more bounded contract.
- The admin identity boundary relies on the email claim in JWT; if auth provider or claims change, access semantics drift.

### Risks
- If `ad_events` volume grows, admin analytics page becomes slow or fails (full table scan in client).
- `metadata` is flexible JSON; without a constrained schema/versioning, downstream analysis can become messy.

### Concrete Improvements
- Add a DB-side aggregation RPC for ad stats (by date range, product_id).
- Consider moving "admin role" to a dedicated table/claim rather than hardcoding an email string in both code and SQL.
- Adopt a small `metadata` contract (keys + types) and version it to keep analytics durable.

---

## Section 020: Schema Inventory + Ownership/RLS Patterns (Surface Area, Redundancy, Boundary Quality)

### Trigger
- Architectural audit pass focused on the DB/schema as the long-term contract surface: what exists, who owns it, and which tables are actually in the runtime read/write path.

### Entrypoints
- Migrations: [supabase/migrations](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations)
- Generated types: [src/integrations/supabase/types.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/types.ts)
- Frontend callsites (heuristic): `supabase.from("...")`, `supabase.rpc("...")`, `supabase.functions.invoke("...")`

### Observed Table Inventory (Created via migrations)
The repo’s migrations create at least these public tables (non-exhaustive domains grouped by intent):

Identity + preferences:
- `profiles`, `user_preferences`, `user_settings`

Connections + sharing:
- `couples`, `connection_share_tokens`
- `sharing_permissions`
- `shared_profile_fields`, `shared_card_entries`, `shared_derived_features`
- `connection_context_preferences`, `connection_recommendations`
- `notifications`

MyGoTwo / cards / entries:
- `card_entries`, `card_templates`, `custom_templates`
- legacy-ish: `lists`, `cards` (pre-dates `card_entries`)

AI + recommendation caching:
- `weekly_recommendations`, `resolved_recommendation_catalog`
- `ai_generated_quizzes`, `quiz_question_sets`

Public feed / publishing:
- `public_creator_profiles`, `public_creator_follows`
- `public_published_entities`, `public_published_entity_cards`, `public_entity_reactions`

Images / assets (multiple generations):
- `category_registry`
- `category_images` (current MyGoTwo strip source of truth)
- legacy: `category_bank_photos`, `image_blocklist`
- (plus `website_asset_assignments` via migration but not observed in frontend callsites)

Admin/monetization:
- `sponsored_products`, `ad_events`

Calendar:
- `calendar_events` (plus external sync tables exist but appear unused in frontend)

### Boundary / Ownership Patterns (What’s Coherent)
Strong (owner-scoped) RLS patterns exist in early foundational tables:
- `profiles`, `lists`, `cards` use `auth.uid() = user_id`-style ownership.
- Sharing is (mostly) expressed via explicit "sharing tables" and RPC boundaries (e.g., visible entries via RPC), which is directionally correct: derived visibility should not be reimplemented in many UI callsites.

### Boundary / Ownership Failures (What’s Not Coherent)
There are multiple tables that become effectively global writable sources-of-truth:
- `category_registry` base migration allows authenticated INSERT/UPDATE/DELETE with `USING (true)` / `WITH CHECK (true)`.
- `category_images` allows public SELECT and authenticated INSERT (and later migrations add update/delete for authenticated).
- `sync-category-registry` edge function (Section 017) can wipe/replace registry without auth checks.

These patterns violate "source of truth ownership": editorial/global assets should be admin-owned, not every authenticated user.

### Redundancy / Suspected Unused Layers
Several subsystems appear to exist in parallel:
- Legacy list/card model (`lists`, `cards`) vs current `card_entries` model used by MyGoTwo.
- Category image systems:
  - `category_bank_photos` + `category-images` bucket (legacy)
  - `website_asset_assignments` + `images-mygotwo-strip` bucket (historical/alternate)
  - `category_images` + `photo-bank` bucket (current MyGoTwo strip path)
- External calendar sync schema vs a UI that only uses first-party `calendar_events`.

### Risks
- Maintenance drift: unused tables/policies create false confidence ("this exists so it must work") and increase the chance of accidental coupling.
- Security drift: permissive RLS on "global tables" becomes a latent prod vulnerability if dev-only pages/functions ship.
- Contract drift: UI assumes certain JSON shapes in registry/entries; without versioning, changes are high-risk.

### Concrete Improvements
- Establish explicit "domains" and ownership:
  - user-owned data (profiles, preferences, entries)
  - connection-shared data (sharing_* tables + RPCs)
  - editorial/global assets (registry, strip images, sponsored products) with admin-only writes
- Deprecate or quarantine legacy tables:
  - If `lists`/`cards` are abandoned, document and remove from new feature work (optionally archive).
  - If `website_asset_assignments` pipeline is dead, delete or mark as deprecated in schema docs.
- Add a `SCHEMA.md` (or expand `NEXT_CHAT_HANDOFF.md`) that lists:
  - each table’s purpose
  - source-of-truth owner
  - read/write paths
  - invariants (unique keys, expected JSON shapes)
