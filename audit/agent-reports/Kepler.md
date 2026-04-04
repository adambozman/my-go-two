# Kepler Repo Audit (Full-Stack, Adversarial)

Start time (captured via PowerShell `Get-Date`): `2026-04-03T07:31:10.0991503-05:00`

Hard constraints followed:
- No source-code/config/migration/package/app-behavior changes.
- Reports only written under `C:\Users\adamb\Documents\GitHub\my-go-two\audit\agent-reports\`.

Method:
- Treat the system as guilty until proven clean.
- For each traced event/process/layer: map trigger, entrypoints, touched files, touched data, state flow, backend/storage touchpoints, connection paths, good/bad code, risks, concrete improvements.

---

## 001. App Boot + Routing + Route Guards (Guilty Until Proven Innocent)

Trigger:
- User loads the web app or navigates between routes (public -> auth -> dashboard subtree).

Entrypoints:
- [main.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/main.tsx): mounts `<App />`.
- [App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx): defines all routes; wraps providers.
- [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx): guard + shell + top bar.
- [MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx): additional guard.

Touched files (routing + state owners):
- [App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx)
- [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- [auth-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts)
- [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)
- [MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx)

Touched data:
- Supabase auth session (localStorage persisted via supabase-js).
- LocalStorage keys: `gotwo_invite`, `gotwo_signup_data` (and in Connect page also `gotwo_invite_token`).

State flow:
- `AuthProvider` owns `user`, `session`, `loading`, `subscribed` and exposes them via [AuthContext](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts).
- Route-level guards rely on `useAuth()` `loading`/`user`.

Backend/storage touchpoints:
- `AuthProvider` calls `supabase.auth.onAuthStateChange` and `supabase.auth.getSession()`.
- `DashboardLayout` invokes edge function `searchforaddprofile` for invite linking.

How it connects:
- `App.tsx` uses `React.lazy` for many pages with a single `Suspense` fallback. Good: keeps bundle smaller. Bad: failures become "Loading..." with no diagnostics and can mask routing bugs.
- Dashboard subtree is guarded at `DashboardLayout` *and* individual pages like `MyGoTwo.tsx` also guard.

Good:
- Central `AuthProvider` exists and uses supabase auth events. That’s the right baseline.
- `vite.config.ts` manual chunking is reasonable and likely improves initial load for non-dashboard routes.

Bad (pressure-tested):
- Double-guarding (`DashboardLayout` and `MyGoTwo`) is a smell: it implies lack of trust in the shell guard and creates extra redirect edges. When auth state jitters (session refresh, slow storage read), you get "works by accident" behavior and "bounce to /login" reports.
- The Suspense fallback + per-route loading spinners creates layered, non-deterministic loading UX. When something is slow, you can’t tell which layer is holding the app.
- `AuthProvider` sets `loading=false` in multiple places (`onAuthStateChange` and `getSession()` promise). Race is likely harmless but does create timing-dependent renders where route guards can redirect before downstream providers finish fetching.

Risks:
- Auth/session race + guard duplication yields intermittent redirects and "login every N seconds" symptom reports even when tokens are fine.
- Any module-load-time exception in supabase client config (or thrown fetch wrapper) can hard-stop routing before guards render.

Concrete improvements:
- Pick one guard authority for dashboard subtree (prefer `DashboardLayout`) and make subpages assume authenticated context unless explicitly public within dashboard.
- Add an "auth resolved" state separate from `loading` (e.g., `status: 'booting'|'ready'|'signedOut'`) so guards aren’t guessing.
- Improve fallback diagnostics: on Suspense fallback, include route name + elapsed time so you can see where you’re stuck.

## 002. Auth: Login / Signup / Session / Reset Password / Subscription Side-Car

Trigger:
- User signs in, signs up, resets password, or page load rehydrates existing session.

Entrypoints:
- [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx): owns session lifecycle.
- [Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx): dev-login vs password login.
- [Signup.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Signup.tsx): signUp + local cache for profile data.
- `ForgotPassword` route (not opened here) + `resetPassword` in provider.

Touched files:
- [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- [auth-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts)
- [Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx)
- [Signup.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Signup.tsx)
- [client.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/client.ts)

Touched data:
- Supabase auth: session tokens in localStorage (`persistSession=true`).
- `profiles` table: updated with age/gender after signup via localStorage cache.
- `user_preferences` table: read for `onboarding_complete` routing.

State flow:
- AuthProvider:
  - subscribes to `supabase.auth.onAuthStateChange` and also calls `supabase.auth.getSession()`.
  - sets `loading=false` as soon as either returns; this is "race-to-ready".
  - triggers `applySignupData` on `SIGNED_IN`.
- Login:
  - dev path sets session via edge function return.
  - normal path calls `signIn(email,password)` -> supabase password auth.
  - then `navigateAfterLogin()` performs *another* `supabase.auth.getUser()` and reads `user_preferences.onboarding_complete`.

Backend/storage touchpoints:
- Edge: `check-subscription` called from AuthProvider every session change and also every 60s.

Good:
- Auth state is centralized and exposed via context.
- `supabaseConfigError` fail-fast wrapper prevents "blank screen with silent broken client" if env is missing (in theory).

Bad (pressure-tested):
- Subscription check is coupled into auth lifecycle and runs on a 60s interval. This is not "auth"; it’s monetization state. You’ve created a background polling engine tied to every authenticated session. Expect noisy network, rate limiting, extra latency, and confusing "subscribed flips" if Stripe or tokens are flaky.
- `checkSubscription` uses the access token and an edge function which itself is configured with `verify_jwt=false` in [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml). You are relying on internal logic for security rather than platform enforcement.
- Signup data caching in localStorage (`gotwo_signup_data`) only works on the same device/browser. It’s a brittle "eventually apply profile metadata" scheme.
- `Login.tsx` uses `supabase.auth.getUser()` after already authenticating. That’s redundant and a potential race if the session hasn’t propagated; it’s also a second network hit.

Risks:
- Intermittent "logged out / redirected" symptoms can be caused by token refresh events + guard duplication + background edge polling returning errors, even if the core session is fine.
- "Silent fail" patterns: AuthProvider catches errors in `checkSubscription` and discards them. That’s exactly how broken systems survive until users complain.

Concrete improvements:
- Decouple subscription state from core auth boot. Fetch subscription lazily on settings page open, and cache it (React Query) with a sane stale time, or use Stripe webhooks to write subscription status into your DB so the app reads it without calling Stripe.
- Add structured logging around auth transitions (`event`, `prev`, `next`, `ts`) gated to dev mode so "login bounce" is not a guessing game.
- Collapse redundant auth calls in Login: use the session you already have; don’t immediately re-fetch user unless required.

## 003. Dev Login Bypass (This Is a Loaded Gun)

Trigger:
- User enters a whitelisted dev email in the login form.

Entrypoints:
- [Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx): `DEV_EMAILS` gate -> invokes edge function.
- [dev-login edge function](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/dev-login/index.ts)

Touched data:
- Supabase auth admin API (service role): generates magiclink.
- Supabase auth verifyOtp (anon): exchanges token_hash for session.

State flow:
- Client calls `supabase.functions.invoke("dev-login", { body: { email }})` with **no Authorization header**.
- Edge function:
  - checks `email` against a hardcoded allowlist.
  - uses `SUPABASE_SERVICE_ROLE_KEY` to generate magic link.
  - uses `SUPABASE_ANON_KEY` to verify OTP and return a real session (access+refresh tokens).
- Client sets that session via `supabase.auth.setSession(...)`.

Backend/security posture:
- This function is an account-takeover endpoint for the allowlisted email if it is reachable from any untrusted environment.
- CORS is wide open (`Access-Control-Allow-Origin: *`).
- No additional secret header, no origin validation, no rate limiting, no environment gating, no "dev-only" kill switch.

Good (bare minimum):
- It is email allowlisted, so it is not a universal auth bypass.

Bad:
- The allowlist is the only guard. That means anyone who can call the function can mint a session for that email. Period.
- If this is deployed to any environment that matters, it’s a breach waiting to happen. This is not "sketchy"; it is intentionally a bypass.

Risks:
- If the allowlisted email is your real account, this becomes a permanent backdoor.
- If `verify_jwt=false` is set globally for functions (it is for many), you’re already in the habit of disabling platform enforcement. That habit makes endpoints like this more likely to slip into prod.

Concrete improvements (even if you don’t care today):
- Add an environment kill switch: require `Deno.env.get("DEV_LOGIN_ENABLED")==="true"` and default false.
- Require a shared secret header (not the anon key), and reject if missing.
- Tighten CORS: allow only localhost during dev.
- Log and rate limit attempts.

## 004. Connections: Invite Links, QR, Linking, Pending, and "Stored Invite" Side Effects

Trigger:
- User opens connection modal, searches for people, generates share invite link/QR, or clicks an invite link (`/connect?...`).

Entrypoints:
- [DashboardHome.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/DashboardHome.tsx): opens [AddConnectionModal](/Users/adamb/Documents/GitHub/my-go-two/src/components/home/AddConnectionModal.tsx).
- [SettingsPage.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/SettingsPage.tsx): connection settings + invites.
- [Connect.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Connect.tsx): invite landing/linking route.
- [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx): processes `gotwo_invite` on load.
- Edge monolith: [searchforaddprofile](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/searchforaddprofile/index.ts)

Touched data:
- `couples` table: connection records, status (`accepted`, pending flows).
- LocalStorage:
  - `gotwo_invite` is used (signup/login -> dashboard -> auto-link).
  - `gotwo_invite_token` is written in Connect but **never read anywhere else** (dead layer).

State flow (high level):
- A single edge function (`searchforaddprofile`) is the backend for:
  - user search
  - invite share token creation
  - invite email send
  - invite acceptance
  - link-by-token / link-by-inviter
  - seeding demo profiles
  - pending invites list
  - identity resolution
- Frontend flows are duplicated:
  - `/connect?invite=...` and `/connect?token=...` both attempt linking if user is already logged in.
  - If not logged in, Connect writes localStorage keys and redirects to login/signup.
  - DashboardLayout also reads `gotwo_invite` and triggers linking inside a dashboard shell effect.

Backend/storage touchpoints:
- `searchforaddprofile` uses both an "admin" supabase client (service role) and viewer clients; it performs writes and reads across many tables.
- CORS on edge functions is permissive.
- In [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml), `searchforaddprofile` has `verify_jwt=false` (platform JWT enforcement disabled).

Good:
- Consolidating the connection logic server-side is the right idea; you don’t want invite/link rules duplicated across multiple pages.
- Connect route handles "already logged in" vs "not logged in" flows; that’s correct UX.

Bad (pressure-tested):
- `searchforaddprofile` is an action-switch monolith. This is where systems go to die: one file grows endless branches and becomes impossible to reason about or secure consistently.
- Duplicated linking triggers:
  - Connect attempts linking based on URL params.
  - DashboardLayout also attempts linking based on localStorage.
  This creates potential double-link attempts and confusing user messaging.
- Dead state:
  - `gotwo_invite_token` is written but never used. That means you likely intended token-based linking via storage but only shipped inviteId.
- Privacy and fragility:
  - AddConnectionModal generates QR code images via a third-party QR service URL. That leaks the invite link to a third party by definition.

Risks:
- Disabling `verify_jwt` shifts all auth correctness into your own code paths. In a monolith edge function, that’s how one branch becomes an auth bypass.
- Side effects in DashboardLayout run on every dashboard mount. If linking fails, you silently discard and remove the invite anyway.

Concrete improvements:
- Split `searchforaddprofile` into multiple edge functions by responsibility (search vs linking vs invite messaging vs demo seed). If you refuse to split, at least split by modules and make action dispatch table-driven with shared auth guard.
- Remove or implement `gotwo_invite_token`. Dead code is deception.
- Ensure exactly one place performs auto-link after login. Prefer Connect route logic; avoid hidden linking in DashboardLayout.
- Replace QR generation with a local library render (you already use `qrcode.react` in SettingsPage) to eliminate third-party leak.

## 005. Subscription + Stripe: Check Status, Checkout, Portal (Inconsistent and Masking Failures)

Trigger:
- App boots (AuthProvider polls subscription).
- User opens subscription section in settings and clicks upgrade/manage.

Entrypoints:
- [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx): calls `check-subscription`.
- [SubscriptionSection.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/SubscriptionSection.tsx): calls `create-checkout` and `customer-portal`.
- Edge functions:
  - [check-subscription](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/check-subscription/index.ts)
  - [create-checkout](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/create-checkout/index.ts)
  - [customer-portal](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/customer-portal/index.ts)
- Config gate: [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml) sets `verify_jwt=false` for all three.

Touched data:
- Stripe customer and subscription objects (queried by email).
- App-side `subscribed`, `subscriptionEnd` state.

State flow:
- `check-subscription` is called:
  - on session change
  - every 60 seconds thereafter
- `create-checkout` expects `priceId` in body and requires `Authorization` bearer token header (client passes it).
- `customer-portal` requires auth header as well.

Backend touchpoints:
- All edge functions call Stripe directly.
- Two different Supabase auth strategies:
  - `check-subscription` uses service role key and server-side getUser(token).
  - `create-checkout` uses anon key and getUser(token).
  - `customer-portal` uses service role key and getUser(token).
  This inconsistency is a smell: the auth posture is not deliberate; it’s accidental.

Good:
- Some functions use structured JSON response helpers and return sensible 4xx/5xx codes.
- `create-checkout` supports returning to settings and uses origin fallback.

Bad (pressure-tested):
- `check-subscription` returns HTTP 200 with `{subscribed:false}` on auth errors (“likely expired token”). That is a lie: it conflates “unsubscribed” with “could not authenticate”. The UI will treat transient auth failure as downgrade.
- Polling Stripe by customer email every minute is wasteful and fragile. Email is not a stable customer key; customers can change emails; duplicates exist.
- `verify_jwt=false` means you’ve disabled platform JWT enforcement. You are relying on your own code to reject calls. With service role keys in play, the blast radius of a bug is huge.

Risks:
- Users get randomly shown as unsubscribed during transient auth/edge/Stripe errors (because you explicitly return unsubscribed on errors).
- Stripe rate limits and cost issues due to background polling.
- Security drift: inconsistent client choice (anon vs service role) increases the chance of an accidental privilege escalation.

Concrete improvements:
- Stop polling Stripe. Instead:
  - use Stripe webhooks to write subscription status into a `subscriptions` table
  - have the app read that table (or a secure RPC) with RLS.
- Distinguish “auth failed” from “unsubscribed” and surface it as a warning state, not a plan change.
- Turn `verify_jwt=true` for functions that require auth and enforce the token at the platform layer.
- Store Stripe customer id in your DB keyed by user id, do not list customers by email on every call.

## 006. Onboarding + Personalization (AI): Saved Answers -> AI -> UI Context (Fragile Sanitization)

Trigger:
- New user completes onboarding (or edits profile in onboarding edit mode).

Entrypoints:
- [Onboarding.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Onboarding.tsx)
- Personalization state holder: [PersonalizationContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/PersonalizationContext.tsx)
- Edge function: [personalize](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/personalize/index.ts)
- Shared catalog logic: `supabase/functions/_shared/knowMeCatalog.ts` (not opened fully here, but referenced).

Touched data:
- `profiles` table: gender, birthday, anniversary.
- `user_preferences` table:
  - `profile_answers` (json)
  - `ai_personalization` (json)
  - `onboarding_complete` boolean
- External AI gateway: `https://ai.gateway.lovable.dev/v1/chat/completions` using `LOVABLE_API_KEY`.

State flow:
- Onboarding persists:
  - profiles updates
  - user_preferences upsert with `profile_answers` and `onboarding_complete: true`
- Onboarding then invokes `personalize` and does `Promise.race(personalizationPromise, 30s timeout)`:
  - if AI is slow/fails, user still advances with “Profile saved… Personalization can catch up”.
  - then `refetchPersonalization()` from context to update UI.
- PersonalizationProvider:
  - derives gender from profiles, else from `profile_answers.identity`.
  - loads `user_preferences.profile_answers` + `ai_personalization`.
  - runs a custom “sanitize corrupted unicode” pass over `ai_personalization`.
  - subscribes to realtime profile updates for gender only.

Backend/storage touchpoints:
- Personalize function authenticates via Authorization header and then calls AI gateway.
- Writes `user_preferences` record (update, then fallback upsert).

Good:
- Onboarding is resilient to AI slowness; user isn’t blocked forever.
- Data model uses `user_preferences` as a single place to store onboarding answers and AI results. That’s sane.

Bad (pressure-tested):
- The sanitization in [PersonalizationContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/PersonalizationContext.tsx) is dangerously ad hoc:
  - It strips non-ASCII, trims, and then *empties strings* if they contain braces/brackets or certain substrings.
  - This will silently destroy valid personalization content. It’s data corruption disguised as “sanitization”.
- Personalize edge function parses tool call args with `JSON.parse` without schema validation. If AI output drifts, you get runtime exceptions or partial defaults.
- AI gateway dependency is hard; no caching or quota management beyond a few status-code branches in some functions.

Risks:
- Personalization quality will be unpredictable because the client sanitization can erase fields, producing empty UI even when DB data is fine.
- Debugging is painful: failures are caught and logged, but the UX tries to soldier on. That means you’ll miss regressions until users complain.

Concrete improvements:
- Replace “sanitize by deleting” with strict schema validation + “quarantine raw payload”:
  - store raw AI response separately (even just in logs) and validate into a typed shape.
  - if a field is invalid, omit it; do not rewrite valid text to empty based on heuristics.
- Add server-side caching and versioning for AI personalization:
  - a stable fingerprint of answers -> personalization result.
- Add explicit “personalization status” state: `pending|ready|failed` so the UI can explain, not guess.

## 007. My Go Two Strip Gallery: Preview Load, Full Load, Background Warm, and “Swap” Semantics

Trigger:
- Authenticated user navigates to `/dashboard/my-go-two`.
- Page mounts and kicks off strip asset hydration; also reacts to `OVERRIDE_CHANGED_EVENT` when Photo Gallery changes image mappings.

Entrypoints:
- Route: [MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx) (note: redundant auth guard).
- Main component: [MyGoTwoStripGalleryAsset.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx).
- Data loader/cache: [myGoTwoStripGallery.data.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts).
- Slot layout + keys + folder paths: [myGoTwoStripGallery.images.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts).
- Override writes + event: [imageOverrides.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/imageOverrides.ts).

Touched data:
- Table `category_images`: `category_key`, `gender`, `image_url`.
- Storage bucket(s): currently referenced by storage refs, typically `storage://photo-bank/...` in this checkout.

State flow (what “swap them in” means, concretely):
1. `MyGoTwoStripGalleryAsset` mounts and calls `hydrateGalleryAssets({ showLoader, force })`.
2. It first calls `loadMyGoTwoGalleryAssets({ quality: "preview" })`:
  - `myGoTwoStripGallery.data.ts` queries `category_images` for keys in `MYGOTWO_ASSIGNMENT_KEYS` and hard-codes `gender = "male"`.
  - It resolves strip URLs using a *small* transform (`width:72`, `quality:24`) and DOES NOT include collapse images.
  - It commits these preview URLs into React state (`commitAssets(...)`).
3. It then calls `loadMyGoTwoGalleryAssets({ quality: "full" })`:
  - resolves strip URLs with a larger transform (`width:240`, `quality:56`) and resolves card detail images (`1600x1200`).
  - it `preloadImageUrls(...)` the visible stage strip URLs and filters out failures (sets `strip.image = ""` if preload fails).
  - it commits the *full* strip URLs, replacing the preview ones. This replacement is the “swap”.
4. Only after full strip commit, it runs `warmCollapseAssets(...)` to load the repeating/collapse panorama assets in the background.
5. When Photo Gallery writes via `setImageUrl(...)`, it dispatches `OVERRIDE_CHANGED_EVENT`; `MyGoTwoStripGalleryAsset` listens and either:
  - fully rehydrates all assets (`hydrateGalleryAssets({ force:true })`) when detail is missing, or
  - resolves the specific override URL transform and merges it into cached assets (`mergeOverrideIntoGalleryAssets`).

Backend/storage touchpoints:
- Database reads through Supabase client (`.from("category_images").select(...).eq("gender","male").in(...)`).
- Image URL resolution uses Supabase Storage transforms via [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts) helpers:
  - public buckets: `getPublicUrl` with `transform`
  - private buckets: `createSignedUrl` with `transform` (only if bucket is recognized as private in code)

Good (pressure-tested):
- The preview->full staging is a legitimate performance strategy: you reduce initial bytes and get “something” on screen quickly.
- The loader includes a concrete preload gate and filters images that fail to load, preventing half-broken mosaics.
- There is a single slot-key schema for strip/card/collapse (`MYGOTWO_ASSIGNMENT_KEYS`), which is the correct abstraction for “upload image to slot”.

Bad (pressure-tested):
- Hidden assumption: bucket privacy. The code only signs URLs for buckets listed in `PRIVATE_BUCKETS` in [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts). That set DOES NOT include `photo-bank` or `images-mygotwo-strip`, but migrations define those as private (`public=false`). That means this flow only works if:
  - those buckets are actually public in the running Supabase project, or
  - images are stored in a public bucket, or
  - you are accidentally relying on a non-existent auth mechanism for `<img>` loads (you aren’t: tokens are in localStorage).
  If the bucket is private as declared, your “swap” is swapping in URLs that won’t load.
- The code hard-codes `gender = "male"` for all My Go Two strip assignments. If you want gender-specific strips, you’re lying to yourself about the data model.
- Redundant auth guarding here and in `DashboardLayout` increases the chance of “bounce to /login” during any session jitter. This page doesn’t sign out; it just aggressively redirects when `user` is momentarily `null`.

Risks:
- The “preview optimization” can become a permanent complexity tax: two transforms, two loads, caching, preload filtering, background warm. It’s easy to break by small refactors and hard to validate.
- If storage bucket privacy and URL resolution are mismatched, you’ll see intermittent blank strips, slow loads, and “works locally but not in prod” behavior.

Concrete improvements:
- Make bucket privacy a first-class contract:
  - derive private/public bucket knowledge from a single config (or at least keep `PRIVATE_BUCKETS` aligned with migrations).
- Make gender selection explicit:
  - either remove gender from this pipeline (single source of truth), or parameterize it from profile + provide fallback logic.
- Remove redundant guard in [MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx) and rely on dashboard shell guard to avoid flicker-driven redirects.

## 008. Photo Gallery (Dev Tooling): Upload, Assign, Delete, and the Manual Cleanup Queue

Trigger:
- User visits `/photo-gallery` to manage My Go Two image slots and the five repeating “Step 1” images.

Entrypoints:
- Route: [App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx) -> `/photo-gallery`.
- Page: [PhotoGallery.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/PhotoGallery.tsx).
- Assignment writing: [imageOverrides.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/imageOverrides.ts) -> `category_images`.
- Slot definitions: [myGoTwoStripGallery.images.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts).

Touched data:
- Table `category_images` (unique on `category_key, gender`):
  - reads current slot mapping
  - writes mapping on upload
  - deletes mapping on delete
- Storage bucket `photo-bank`:
  - uploads images to paths derived from `target.folder`
  - deletes storage objects when safe
- Cross-ref cleanup logic checks other `category_images` rows to decide whether a replaced file is still referenced.

State flow (end-to-end):
1. Auth gate: if `!user` it navigates away (page is implicitly “authenticated only”, but NOT enforced by route-level guard).
2. `loadAssignedSlots()` queries `category_images` for My Go Two slot keys and builds `assignedSlots`.
3. Upload:
  - user selects a slot target key; `createPhotoPath(target, file)` builds deterministic folder prefix (e.g. `mygotwo/categories/dining/small/...`).
  - it uploads into `photo-bank` bucket (`upsert:false`).
  - it writes `storage://photo-bank/<path>` to `category_images` via `setImageUrl(target.key, ref)`.
  - it attempts to remove the previously assigned storage object IF the old file is not used by any other slot; if removal fails, it enqueues a “manual cleanup” item.
4. Delete:
  - it deletes the row mapping via `deleteImageUrl(target.key)` (NOTE: gender is not specified; it will delete across genders for that key).
  - then attempts storage removal using the same “only if unused” logic; failures go into the manual cleanup list.
5. UI renders:
  - for each category group: shows “Small” and “Card” side by side (this matches the “two separate photos, no distortion” direction).
  - shows a separate box for the five repeat photos (`MYGOTWO_COLLAPSE_SLOT_TARGETS`).

Backend/storage touchpoints:
- No edge functions here: it’s direct Supabase client access to both DB and storage.
- Storage deletion uses `supabase.storage.from(bucket).remove([path])` after parsing a `storage://...` ref.

Good (pressure-tested):
- This page is much closer to the right mental model than earlier iterations: “upload -> storage; DB mapping points slots to storage refs”.
- The “manual cleanup list” is a pragmatic safety valve: it avoids doing destructive deletes when you can’t prove safety or permissions.
- Upload path structure is sane: folder prefixes encode intent (category + small/card/repeat), which is essential for later cleanup.

Bad (pressure-tested):
- The storage bucket and URL-resolution assumptions are brittle:
  - migrations create `photo-bank` as `public=false` (private), but the UI uses resolved display URLs that rely on public access unless the bucket is treated as private in [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts). It currently isn’t.
  - If this works in your environment, it is because the environment has drifted from the migrations (manual console toggles), or because the bucket privacy is not actually enforced as expected.
- `deleteImageUrl(imageKey)` deletes by `category_key` only, ignoring `gender`. That’s not “delete one assignment”, it’s “delete all genders’ assignment for that key”. If that’s intended, name it that way; otherwise, this is a footgun.
- Multiple parallel image assignment systems exist in schema history:
  - `category_images` + `category-images` bucket (public) (older)
  - `photo-bank` bucket (private) + `category_images` refs (current UI)
  - `website_asset_assignments` + `category_bank_photos` + `images-mygotwo-strip` bucket (newer migrations)
  - `dev_asset_image_overrides` (per-user overrides)
  This is classic “architecture by sedimentation”: it works until it doesn’t, and you can’t reason about source of truth.

Risks:
- Without an explicit “source of truth” document, you will keep building new “image bank” tables while old ones quietly persist, increasing operational cost and developer confusion.
- If bucket privacy is tightened (as migrations claim), this page will degrade into “uploads succeed, images don’t render”.

Concrete improvements:
- Declare the canonical system:
  - One storage bucket for dev assets, one mapping table for slot->ref (or one per domain), and deprecate the rest with a migration plan.
- Fix the bucket privacy contract:
  - either make `photo-bank` public (explicitly) OR add it to `PRIVATE_BUCKETS` and always use signed URLs for display.
- Make delete semantics explicit:
  - either delete only `(category_key, gender)` or explicitly delete all genders and document it in UI.

## 009. Storage Reference Resolution: “storage://” as Boundary, and Why It’s Still Lying

Trigger:
- Any UI that stores “storage refs” (e.g., `storage://bucket/path`) and later needs a browser-usable URL.

Entrypoints:
- Storage boundary: [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts).
- Used by:
  - My Go Two strip gallery loaders
  - Header avatar upload/read: [headerShared.ts](/Users/adamb/Documents/GitHub/my-go-two/src/features/mygotwo/headerShared.ts)
  - Photo Gallery display URL building: [PhotoGallery.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/PhotoGallery.tsx)

Touched data:
- Stored values in DB: `storage://...` refs and sometimes raw Supabase storage URLs.

State flow:
- `parseStorageRef` converts `storage://bucket/path` into `{bucket,path}`.
- `parseSupabaseStorageUrl` tries to reverse-engineer `.../storage/v1/object/{public|sign}/bucket/path`.
- `resolveStorageUrl(s)` groups by bucket:
  - if bucket is not listed in `PRIVATE_BUCKETS`, it returns a public URL (or transformed public URL).
  - if bucket is listed, it creates signed URLs and caches them.

Good:
- `storage://` indirection is the correct idea: it isolates your app from raw URL shapes.
- Signed URL caching is present and reduces churn.

Bad (pressure-tested):
- The private/public bucket list is a hand-maintained set. That’s a reliability trap.
- Migrations declare multiple buckets as private (`photo-bank`, `images-mygotwo-strip`), but code does not treat them as such. This is the definition of “works by accident”.

Risks:
- If you ever reapply migrations to a fresh environment, or if a teammate follows the schema, you will break image rendering in non-obvious ways.

Concrete improvements:
- Make “bucket privacy classification” discoverable:
  - simplest: include the bucket ids in code via a single constant that matches migrations and enforce it in CI via a small test script.
  - better: store bucket policy metadata in DB and fetch it once at boot (but don’t over-engineer).

## 010. Recommendations (“For You”): ai-products, Weekly Cache, and a Wide-Open Global Catalog

Trigger:
- User visits `/dashboard/recommendations`.
- User hits refresh (forces regeneration).

Entrypoints:
- UI page: [Recommendations.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/Recommendations.tsx).
- Edge function: [ai-products](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/ai-products/index.ts).
- Shared catalog logic: `supabase/functions/_shared/knowMeCatalog.ts` (used heavily by ai-products).
- Tables:
  - `weekly_recommendations` (per user)
  - `resolved_recommendation_catalog` (global)
  - `user_preferences` (inputs: answers + personalization)

Touched data:
- Reads `weekly_recommendations` (by `user_id`, `week_start`).
- Reads `user_preferences.profile_answers` and `user_preferences.ai_personalization`.
- Inserts/updates `weekly_recommendations` with `products` JSONB.
- Inserts/updates `resolved_recommendation_catalog` entries (fingerprint-based), including `usage_count`, `link_url`, `image_url`, and `resolver_source`.

State flow:
1. `Recommendations.tsx` calls `supabase.functions.invoke("ai-products", { body })`.
  - If it gets a 401, it calls `supabase.auth.refreshSession()` and retries once. That is a sane client behavior.
2. `ai-products` requires `Authorization` and uses an anon-key client with the auth header to `auth.getUser()`.
3. It computes a Monday UTC `week_start` key and returns cached `weekly_recommendations` if:
  - products exist, and
  - every product’s `source_version` matches `getCatalogVersion()`.
4. If uncached:
  - It builds fallback recs from the shared catalog (`getCatalogRecommendations`).
  - If `LOVABLE_API_KEY` exists, it asks the AI gateway to generate 12 “recommendation intents”.
  - It optionally enriches each intent via Firecrawl (`FIRECRAWL_API_KEY`), then upserts into `resolved_recommendation_catalog`.
  - It writes the final `products` into `weekly_recommendations`.

Backend/storage touchpoints:
- External:
  - AI gateway `ai.gateway.lovable.dev` (Gemini models)
  - Firecrawl API (search + scrape)
- DB:
  - direct table writes via the user-scoped Supabase client (not service role)

Good:
- Weekly cache model is coherent and cheap: one row per user/week, JSON blob.
- The function degrades to a deterministic fallback when AI keys are missing (catalog recommendations).
- The client retries on expired session (401) without user involvement.

Bad (pressure-tested, and this is severe):
- `resolved_recommendation_catalog` RLS is essentially “any authenticated user can do anything”:
  - Migration [20260318160000_resolved_recommendation_catalog.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260318160000_resolved_recommendation_catalog.sql) grants `SELECT/INSERT/UPDATE` to *all authenticated users* with `USING (true)` and `WITH CHECK (true)`.
  - That means any signed-in user can poison the shared catalog: swap product links, change images, inflate usage counts, or vandalize brands.
  - The edge function uses the anon key client, so it is not even a privileged write; it’s just “a user writing into a global table”.
- `verify_jwt=false` for `ai-products` in [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml) means the platform will not enforce JWT validity at the gateway layer. You are depending on your function code to always enforce auth. One bug and it’s public.

Risks:
- Integrity: global catalog can be silently corrupted by any authenticated user.
- Cost: Firecrawl + AI gateway calls can be abused by any authenticated user because there’s no server-side quota enforcement beyond “do you have a token”.
- Debuggability: `products` is a JSONB blob with mixed provenance (`source_kind/source_version/resolver_source` are present but not strongly enforced).

Concrete improvements:
- Lock down `resolved_recommendation_catalog`:
  - At minimum: restrict INSERT/UPDATE to `service_role` and expose a controlled RPC for incrementing `usage_count`.
  - If you want user contribution, define explicit allowed fields and moderation (do not allow arbitrary link_url edits).
- Turn `verify_jwt=true` for `ai-products` and keep the internal auth check anyway.
- Rate limit by user id (server-side): do not let a single user call Firecrawl 12x repeatedly.

## 011. Know Me (Questionnaires) + Style Chat: Local Question Bank, Profile Answer Writes, and AI Side-Channel

Trigger:
- User visits `/dashboard/questionnaires`.
- User answers a question, or opens “Style chat” and sends a prompt.

Entrypoints:
- UI: [Questionnaires.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/Questionnaires.tsx).
- Question bank: `src/data/knowMeQuestions.ts` (imported; this is the canonical question set in this checkout).
- Writes: `user_preferences.profile_answers` updates via Supabase client.
- Edge function: [style-chat](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/style-chat/index.ts).

Touched data:
- `user_preferences.profile_answers`: updated on every answer.
- `user_preferences.ai_personalization`: read and forwarded to style-chat (as context).

State flow:
1. The page derives “categories” and “sprints” from static data.
2. It reads existing `profile_answers` and computes progress/locks:
  - Free users are locked after `FREE_CATEGORY_LIMIT` questions per category and `FREE_THIS_OR_THAT_LIMIT` brand picks.
  - This gating depends on `useAuth().subscribed`, which is fed by the Stripe polling described in section 005 (fragile and can lie on auth errors).
3. On answer save it:
  - normalizes the answer shape (sometimes flattening single-item arrays),
  - updates `user_preferences.profile_answers`.
4. Style chat:
  - calls `supabase.functions.invoke("style-chat")` with `{ message, profile_answers, ai_personalization }`.
  - the function validates Authorization with anon client and calls AI gateway; returns `reply`.

Good:
- Answers are stored in one obvious place (`user_preferences.profile_answers`) as JSON. That is the right “single document” shape for personalization-driven AI.
- Style chat does not persist extra junk; it’s a stateless query layer.

Bad (pressure-tested):
- There is a whole edge function [ai-quizzes](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/ai-quizzes/index.ts) that generates question sets and stores them in `quiz_question_sets`, but it is NOT invoked anywhere in `src/`. That’s dead architecture.
- `style-chat` forwards the entire answer map + personalization JSON to an external model endpoint every time. That’s fine for dev, but it’s expensive and privacy-sensitive if this ever goes live. There’s no redaction boundary.
- The “subscribed” gate can flicker because `check-subscription` returns `{subscribed:false}` on auth errors (section 005). That means the questionnaire UI can randomly lock categories even for paid users during transient failures.

Risks:
- Feature drift: two competing sources of truth for “the question bank” (static file vs AI-generated sets) will guarantee future confusion unless you delete one.
- Privacy: shipping raw answers to third-party AI without explicit scoping or minimization will become a compliance story later.

Concrete improvements:
- Delete or fully wire `ai-quizzes`. Right now it’s dead weight and a future footgun.
- Treat “subscription status unknown” distinctly from “unsubscribed” and avoid locking flows on transient errors.
- If/when live: minimize payload to style-chat (send only the relevant answered category and a small summary).

## 012. Dashboard Home: Mega-Component, Hidden Work, and Home Search via Edge Function

Trigger:
- User visits `/dashboard` (home).
- User opens Home Search and queries.

Entrypoints:
- UI: [DashboardHome.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/DashboardHome.tsx).
- Edge function: [connection-data-search](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/connection-data-search/index.ts).
- DB tables:
  - `couples`, `profiles`, `notifications`, `card_entries` and multiple RPCs (`get_connection_feed`, occasion helpers, etc.).

Touched data/state:
- Connections directory and photos:
  - `couples.photo_url` is resolved via [resolveStorageUrl](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts) and displayed in avatars/cards.
- Home search:
  - Edge function queries your entries (direct table) and circle entries (RPC) and returns both arrays.

Bad (pressure-tested):
- `DashboardHome.tsx` is a god component. It owns:
  - connection load + photo assignment + blocklist init
  - activity feed
  - event calendar/milestones
  - home search modal + results shaping
  - multiple paywall branches
  This guarantees slow iteration and accidental coupling. The fact that it “works” is not a defense; it’s just accumulated luck.
- Home search UX is misleading:
  - clicking many result types navigates generically to `/dashboard/my-go-two`, not the actual matched item. That’s “search theater”.
- It calls `initBlocklist()` and assigns unique photos on load. That is extra boot-time work you probably don’t notice until the page feels sluggish.

Risks:
- Any performance regression in one sub-flow slows the entire dashboard because there is no isolation or staged hydration.

Concrete improvements:
- Split DashboardHome into feature modules with explicit loading boundaries:
  - connections directory
  - feed strip
  - search modal
  - calendar/milestones
- Make home search results deep-link to the actual matched card/template/group, not “go to My Go Two”.

## 013. Registry Sync (Admin-ish) + Destructive Edge Function (This Is a Time Bomb)

Trigger:
- Someone runs a category registry sync from the client.

Entrypoints:
- UI (currently not routed in [App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx)): [CategorySync.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/admin/CategorySync.tsx).
- Edge function: [sync-category-registry](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/sync-category-registry/index.ts).
- Data: `category_registry` table + seed file `src/data/categoryRegistrySeed.ts` (imported by CategorySync).

What it does (and why it’s dangerous):
- `sync-category-registry`:
  - uses the service role key
  - DOES NOT authenticate the caller at all
  - deletes *all rows* in `category_registry`
  - reinserts provided rows in batches
- `verify_jwt=false` for this function in [supabase/config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml).

Good:
- None, architecturally. “Bulk overwrite the registry” can be a valid admin operation, but not like this.

Bad (pressure-tested):
- This is an unauthenticated destructive endpoint with a service-role database client. If it is deployed, it is a public “wipe and replace” button.
- Even if the UI isn’t routed, the function can be called directly.

Concrete improvements:
- Require JWT at the platform layer (`verify_jwt=true`) and validate caller is an admin (explicit allowlist).
- Better: remove this from edge functions and treat registry as migration-owned data, not runtime-syncable content.

## 014. Edge Function Inventory: What’s Actually Wired vs Dead/Empty

Observed client-invoked edge functions (from `src`):
- `ai-products`, `check-subscription`, `connection-data-search`, `create-checkout`, `customer-portal`, `dev-login`, `personalize`, `searchforaddprofile`, `style-chat`, `sync-category-registry`.

Dead or suspicious:
- `ai-quizzes` exists but is not referenced anywhere in `src`.
- `bulk-generate-category-images/` and `generate-category-image/` directories are empty (no code). That’s dead deploy surface.

Risk:
- Every deployed function is an operational liability. Dead functions aren’t harmless; they’re unmonitored public endpoints unless you explicitly lock them down.

## 015. Public Feed: “Published Entities” + Follow + Reactions (Surprisingly Coherent, Still Needs Guardrails)

Trigger:
- User visits `/dashboard/public-feed`.
- User filters “All/Outfit/Product”, follows a creator, or toggles like/love.

Entrypoints:
- UI: [PublicFeed.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/PublicFeed.tsx).
- RPC (security definer):
  - `get_public_feed_items`
  - `follow_public_creator`
  - `unfollow_public_creator`
  - `toggle_public_entity_reaction`
- Migrations defining these:
  - [20260320190000_public_feed_backend.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260320190000_public_feed_backend.sql)
  - [20260321101500_feed_publish_helper_functions.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260321101500_feed_publish_helper_functions.sql)

Touched data:
- Tables:
  - `public_published_entities`, `public_published_entity_cards`
  - `public_creator_profiles`, `public_creator_follows`
  - `public_entity_reactions`

State flow:
1. UI calls `rpc("get_public_feed_items", { p_limit, p_entity_kind, p_creator_user_id })`.
2. Follow/unfollow is done via `rpc("follow_public_creator")` or `rpc("unfollow_public_creator")`.
3. Like/love is toggled via `rpc("toggle_public_entity_reaction")`, which performs delete-or-insert and returns counts.

Good:
- This is one of the cleaner subsystems:
  - Core operations are modeled as security-definer RPCs rather than letting the client write directly to all tables.
  - The feed function returns a stable “view model” including viewer flags and counts.

Bad (pressure-tested):
- UI assumes `lead_image_url` is browser-ready. If you ever move this into private buckets, it will break unless you standardize on `storage://` refs and URL resolution.
- “Public feed” is an entire product surface living alongside “relationship preference vault”, but boundaries are not explicitly documented. It’s easy to leak concepts across domains (e.g., using a shared `card_entries` row in public publishing without strict image/content constraints).

Risks:
- Policy drift risk: public systems tend to accrete permissions; without tests or docs they become swiss cheese.

Concrete improvements:
- Make the public feed domain boundaries explicit in one doc (what tables are canonical, what is user-editable, what is public).
- Normalize image references for public entities (either force public bucket URLs or store storage refs and resolve at read time).

## 016. RLS / Policy Posture: “Authenticated Can Do Anything” Is a Theme (And It Will Bite You)

Trigger:
- Any authenticated user interacts with globally-scoped tables (not per-user rows).

Findings (file-specific):
- `resolved_recommendation_catalog` is fully writable by any authenticated user.
  - Migration: [20260318160000_resolved_recommendation_catalog.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260318160000_resolved_recommendation_catalog.sql)
  - Policies: `SELECT/INSERT/UPDATE ... USING (true) WITH CHECK (true)`.
- `category_registry` is writable by any authenticated user.
  - Migration: [20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql)
- `category_images` is writable by any authenticated user.
  - Same migration file as above; later adds update/delete in [20260315172446_848cfbd8-a225-4236-ac8c-0a5fc3e24c6a.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260315172446_848cfbd8-a225-4236-ac8c-0a5fc3e24c6a.sql)
- `website_asset_assignments` is writable by any authenticated user.
  - Migration: [20260326051500_create_website_asset_assignments.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326051500_create_website_asset_assignments.sql)
- `image_blocklist` is writable by any authenticated user.
  - Migration: [20260313003801_448ea580-7e39-48ea-991a-7bdc3f2a789b.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260313003801_448ea580-7e39-48ea-991a-7bdc3f2a789b.sql)
- `category_bank_photos` can be deleted by any authenticated user, and read publicly.
  - Migration: [20260315174111_6060bd9a-297d-41e7-920f-7845eb1570a8.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260315174111_6060bd9a-297d-41e7-920f-7845eb1570a8.sql)

Good:
- Per-user tables like `weekly_recommendations` are correctly scoped with `auth.uid() = user_id` policies.
  - Migration: [20260316175025_d34dc734-c433-46d6-84fc-f842382d15c9.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260316175025_d34dc734-c433-46d6-84fc-f842382d15c9.sql)

Bad (pressure-tested):
- The policy posture suggests “this is dev, who cares”, but the app already has paywalls, Stripe, and “public feed”. That’s a contradiction.
- When you leave global tables wide open, edge functions stop being your perimeter. You’re basically saying “any user is an admin for shared data”.

Risks:
- Data poisoning and vandalism by any authenticated user.
- Future “why is the catalog broken” debugging nightmares because the attacker is just “someone signed in”, not an obvious admin path.

Concrete improvements:
- Decide which tables are globally authoritative and lock them down:
  - `service_role` only writes, with controlled RPCs for narrow operations.
- Add an explicit `is_admin` or role table and gate global writes on it.

## 017. My Go Two “Vault Cards”: card_entries as Source of Truth, Product Card Forms, and Duplicate Implementations

Trigger:
- User opens a category overlay in My Go Two and edits/saves a product card (e.g., beverages “Go-to order”).

Entrypoints:
- Product card asset(s):
  - [MyProductCardBeverages.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/MyProductCardBeverages.tsx)
  - [MyGoTwoProductCard.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/MyGoTwoProductCard.tsx)
- Data access layer:
  - [myGoTwoData.ts](/Users/adamb/Documents/GitHub/my-go-two/src/features/mygotwo/myGoTwoData.ts)
  - Types: [types.ts](/Users/adamb/Documents/GitHub/my-go-two/src/features/mygotwo/types.ts)
- DB table + policies:
  - `card_entries` created in [20260315185909_d488522c-9127-4f96-bbb5-f09fad9d822b.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260315185909_d488522c-9127-4f96-bbb5-f09fad9d822b.sql)

Touched data:
- `card_entries`:
  - `user_id`, `card_key`, `group_name`, `entry_name`, `field_values` (jsonb)
  - Partner read access is granted via RLS when `couples.status = 'accepted'`.

State flow:
1. UI builds a “product card” definition (fields + labels) based on template subtype data.
2. On save:
  - If entry exists: `updateMyGoTwoEntry` updates `entry_name` and `field_values`.
  - Else: `createMyGoTwoEntry` inserts a new `card_entries` row for the user + `card_key`.
3. RLS enforces:
  - owners can manage own entries
  - partners can `SELECT` entries for accepted couples

Good:
- `card_entries` is a clean “appendable preference record” concept. It’s one of the few places where the schema aligns well with product intent (“exact Starbucks order” etc).
- RLS policy for owner write access is correct (`auth.uid() = user_id`), and partner read access is explicit.

Bad (pressure-tested):
- Duplicate implementations:
  - [MyProductCardBeverages.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/MyProductCardBeverages.tsx) is a bespoke one-off that re-implements a specialized product card rather than composing [MyGoTwoProductCard.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/MyGoTwoProductCard.tsx).
  - This is how you end up with two behaviors for “saving a vault card” that diverge over time (different field normalization, different “notes” handling, different validation).
- Field key derivation depends on slugifying the *label text* (`slugFieldLabel`). That’s fragile:
  - If you change a label for UX reasons, you silently change the JSON key in storage and “lose” old data.
  - There is no schema versioning for `field_values`.
- Images are hinted at but not implemented:
  - `CardEntry` type includes `image_url?`, but `card_entries` table migration does not include it (at least in the base migration), and `MyGoTwoProductCard` shows a “Photo” placeholder without an upload pipeline.
  - This is a classic half-feature that invites ad hoc patches later.

Risks:
- Data drift and “why did my saved answers disappear” when labels change.
- Feature fragmentation as each category gets its own bespoke card component.

Concrete improvements:
- Make field keys stable:
  - store a stable field id per template, not a slug of the label.
- Choose one product-card implementation style (generic base + small overrides) and delete bespoke clones where possible.
- If card images are real: add a first-class `image_url` column and a single upload+ref boundary (reusing the `storage://` scheme).

## 018. Notifications: Paywalled UI, Realtime Subscription Scope, and a Misleading Insert Policy

Trigger:
- User visits `/dashboard/notifications`.
- Realtime notification insert/update/delete happens in Postgres.

Entrypoints:
- UI: [Notifications.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/Notifications.tsx).
- Header unread badge also reads notifications: [headerShared.ts](/Users/adamb/Documents/GitHub/my-go-two/src/features/mygotwo/headerShared.ts).
- Schema: [20260311062439_a3f5b09f-d58d-4fcc-90f0-883e7c40084f.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260311062439_a3f5b09f-d58d-4fcc-90f0-883e7c40084f.sql).

Touched data:
- `notifications` table: `user_id`, `type`, `title`, `body`, `is_read`, `created_at`.
- Realtime publication includes `notifications`.

State flow:
1. UI gates the entire page behind `subscribed`:
  - if not subscribed, it shows a Premium lock card and does not fetch notifications.
2. If subscribed:
  - it loads `notifications` by `user_id` and orders by `created_at desc`.
  - it subscribes to `postgres_changes` for `notifications` (no row filter) and refetches on any change event.
3. User actions:
  - mark one read: update by id
  - mark all read: update by `user_id` and `is_read=false`
  - delete: delete by id

Good:
- RLS for `SELECT/UPDATE/DELETE` is correctly scoped to `auth.uid() = user_id`.
- Realtime hook exists and keeps badge/page updated.

Bad (pressure-tested):
- Subscription gating here is product-hostile and operationally fragile:
  - any transient Stripe/auth failure flips `subscribed=false` (section 005), and suddenly the user is locked out of their own notification list.
  - even if you intend to paywall “premium notifications”, you should not hard-lock the entire surface; at minimum show read-only basics.
- Realtime subscription is unscoped:
  - it listens to all notification changes for all users, then refetches. That’s unnecessary churn and can create background noise.
- The migration policy is mislabeled:
  - `"Service can insert notifications"` is defined `TO authenticated WITH CHECK (auth.uid() = user_id)`. That does NOT allow a backend/service role to create notifications for other users; it only allows a user to insert their own notifications.
  - If you ever expected server-driven notifications, this schema won’t support it.

Risks:
- “Premium gating” will feel like data loss when subscription state flickers.
- Scalability: unfiltered realtime + refetch on every row change is fine for small scale but dumb at medium scale.

Concrete improvements:
- Separate “premium features” from “basic access to your data”. If paywalled, degrade gracefully.
- Add a filter to realtime subscriptions (`filter: user_id=eq.<id>`) or switch to client-side polling with backoff.
- If you want system notifications: create a service-role insert policy (or use an RPC) explicitly.

## 019. Connect / Invite Linking: Two Parameters, Two LocalStorage Keys, One Half-Wired Token Flow

Trigger:
- User visits `/connect?invite=<userId>` (QR invite id) or `/connect?token=<shareToken>`.
- User may or may not already be authenticated.

Entrypoints:
- UI: [Connect.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Connect.tsx).
- Edge function: `searchforaddprofile` actions:
  - `link-by-inviter`
  - `link-by-token`
- Post-login invite processing:
  - [Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx) stores `localStorage.gotwo_invite` on `/login?invite=...`.
  - [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx) consumes `localStorage.gotwo_invite` and invokes `link-by-inviter`.

Touched data/state:
- `localStorage` keys:
  - `gotwo_invite` (inviter id)
  - `gotwo_invite_token` (token string)
- Couples/linking occurs via edge function + DB RPCs (inside `searchforaddprofile`).

State flow (pressure-tested):
1. If user is already authenticated on `/connect`:
  - token path: calls `searchforaddprofile(action="link-by-token")`, then navigates to settings.
  - invite path: calls `searchforaddprofile(action="link-by-inviter")`, then navigates to settings.
2. If user is NOT authenticated on `/connect`:
  - it stores `gotwo_invite` and/or `gotwo_invite_token` and navigates to `/login` or `/signup`.
3. After auth:
  - `DashboardLayout` only processes `gotwo_invite`. There is no corresponding consumer for `gotwo_invite_token` in this checkout.

Good:
- The authenticated path is straightforward and uses a single edge function to centralize linking logic.

Bad (pressure-tested):
- The token invite flow is half-wired:
  - You store `gotwo_invite_token` in localStorage for unauthenticated users, but you never consume it after login.
  - That means `/connect?token=...` only works if the user is already signed in on that page. If they have to log in, the token is effectively dropped on the floor.
- Invite processing is duplicated across:
  - Connect page (immediate link)
  - Login page (store)
  - Dashboard layout (consume)
  This “sticky localStorage side channel” is inherently fragile and timing-dependent.

Risks:
- Users will perceive “connect links don’t work” depending on whether they were signed in when clicking the invite.
- Duplicate code paths increase the chance of “already connected” edge cases producing misleading toasts.

Concrete improvements:
- Pick one canonical flow:
  - Either: always route to `/connect` and have it be the one place that consumes both `invite` and `token` from URL and localStorage, OR
  - store both keys and have `DashboardLayout` consume both (`link-by-inviter` and `link-by-token`) post-auth.
- Avoid relying on localStorage as an inter-route message bus unless you also version/expire it (these keys can persist indefinitely).

## 020. OAuth Sign-In via Lovable Cloud Auth: Token Bridging into Supabase Session (Potential Session Instability)

Trigger:
- User clicks “Continue with Google” or “Continue with Apple” on Login/Signup.

Entrypoints:
- UI buttons:
  - [GoogleSignInButton.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/GoogleSignInButton.tsx)
  - [AppleSignInButton.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/AppleSignInButton.tsx)
- Auth bridge:
  - [src/integrations/lovable/index.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/lovable/index.ts)
- Supabase client:
  - [client.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/client.ts)

State flow:
1. Button calls `lovable.auth.signInWithOAuth(provider, { redirect_uri })`.
2. `createLovableAuth()` performs OAuth and returns either:
  - `{ redirected: true }` (browser redirect), or
  - `{ tokens, error }` for a non-redirect completion.
3. If not redirected and no error:
  - the code calls `supabase.auth.setSession(result.tokens)`.

Good:
- There is an explicit bridge: “external OAuth provider” -> “Supabase session”. That’s the right kind of boundary.

Bad (pressure-tested):
- You’re trusting a third-party token shape (`result.tokens`) to be valid for Supabase session persistence without validating required fields.
  - If tokens are missing refresh tokens, have short expiry, or are minted for the wrong audience/project, Supabase will appear to “randomly” sign users out as soon as refresh happens.
- Error handling returns a generic `{ error }` but does not surface which part failed (OAuth vs setSession).

Risks:
- This is a plausible root cause for “I have to log in every X seconds” reports, especially if token refresh fails.
- If `redirect_uri` is set to `window.location.origin`, you may lose deep-link context unless you explicitly preserve and replay it (ties back to the invite-token issues in section 019).

Concrete improvements:
- Validate token payload before calling `supabase.auth.setSession` and log missing fields in dev builds.
- Ensure OAuth callback flow preserves intended return path (e.g., pass state param or store redirect target).

## 021. Tooling Posture: Non-Strict TS, Strict-ish ESLint, and Config Drift (You’re Living on Vibes)

Trigger:
- Developer runs `npm run dev`, `npm run build`, `npm run lint`, or `npx tsc --noEmit`.

Entrypoints:
- [package.json](/Users/adamb/Documents/GitHub/my-go-two/package.json)
- [vite.config.ts](/Users/adamb/Documents/GitHub/my-go-two/vite.config.ts)
- [tsconfig.json](/Users/adamb/Documents/GitHub/my-go-two/tsconfig.json)
- [tsconfig.app.json](/Users/adamb/Documents/GitHub/my-go-two/tsconfig.app.json)
- [eslint.config.js](/Users/adamb/Documents/GitHub/my-go-two/eslint.config.js)

Observed posture:
- TypeScript is explicitly non-strict:
  - `strict: false`, `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`.
  - This means “tsc passes” does not mean “the code is safe”; it mostly means “it parses”.
- ESLint is stricter than TS in some ways (typescript-eslint recommended), which creates noisy failure modes:
  - `npm run lint` can fail while `tsc` passes (common in this repo).
- Vite dev server defaults to `host:"::"` and `port:8080`, while the handoff doc references `127.0.0.1:5180`.
  - That’s not fatal (CLI overrides), but it’s a smell: dev instructions and actual config are drifting.

Good:
- Manual chunking in Vite is reasonable and likely improves first-load (router/supabase/motion/radix split).

Bad (pressure-tested):
- Non-strict TS + heavy edge-function JSON parsing is a reliability disaster. Most bugs here will be runtime, not compile-time.
- Disabling HMR overlay (`hmr.overlay=false`) is a “hide the smoke alarm” move. It makes UX look nicer while masking crashes.

Risks:
- You will ship runtime bugs that could have been stopped by strict typing and basic narrowing.

Concrete improvements:
- Pick an intentional stance:
  - If this is a dev playground: relax lint rules to match TS and stop pretending lint is a gate.
  - If this is becoming a product: tighten TS over time (start with `strictNullChecks`) and add runtime schema validation where you parse JSON (edge functions).
- Align dev server docs with actual config (choose one port/host convention).

## 022. “Seed Demo Profiles” (searchforaddprofile): Publicly Callable Service-Role Mutations (Unacceptable Even for Dev)

Trigger:
- User clicks “Seed demo profiles” in Settings, OR anyone calls the edge function directly.

Entrypoints:
- UI button: [SettingsPage.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/SettingsPage.tsx) calls `searchforaddprofile(action="seed-demo-profiles")`.
- Edge function dispatcher: [searchforaddprofile/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/searchforaddprofile/index.ts).

Observed behavior (this is not hypothetical):
- If the request has NO `Authorization` header, the function still allows:
  - `actionName === "seed-demo-profiles"`:
    - it creates a service-role Supabase client
    - calls `ensureDemoProfiles(adminClient)`
    - returns `{ success: true }`
- If the request has an `Authorization` header, it *also* allows any authenticated user to run the same action.

Touched data:
- Whatever `ensureDemoProfiles` writes:
  - demo auth users (creates accounts)
  - profile rows
  - user_preferences
  - weekly_recommendations
  - card_entries
  - and potentially couples / invites

Good:
- None. This is a landmine.

Bad (pressure-tested):
- This is effectively an unauthenticated “create users + seed content” endpoint backed by the service role key.
- This is exactly the kind of thing that leads to:
  - mysterious DB bloat
  - spam accounts
  - polluted analytics
  - “why do we have weird demo users in prod” incidents

Risks:
- If deployed, this is trivially abusable.
- Even locally, it normalizes a disastrous posture: “dev conveniences can bypass auth”.

Concrete improvements:
- Hard-disable this action unless a strict server-side allowlist is met (dev-only secret, specific admin user id, or environment guard).
- Better: remove this from the edge function entirely and make seeding a one-off local script run by developers.

## 023. AI Image Generation (generate-card-image): Expensive, Unwired, and Storage Policy-Confused

Trigger:
- (Potential) user requests an AI-generated card image.

Entrypoints:
- Edge function: [generate-card-image/index.ts](/Users/adamb/Documents/GitHub/my-go-two/supabase/functions/generate-card-image/index.ts)
- Client: no references found in `src/` (currently unwired).

State flow:
1. Requires `Authorization` header; validates user via anon client `auth.getUser()`.
2. Calls AI gateway model `google/gemini-2.5-flash-image` requesting an image.
3. Extracts base64 image data from a `data:image/...;base64,...` payload.
4. Uploads bytes to storage bucket `card-images` using a service-role client.
5. Returns `getPublicUrl` for the uploaded file.

Bad (pressure-tested):
- Storage contract mismatch (again):
  - Code assumes it can use `getPublicUrl` for `card-images`.
  - App-side URL resolver [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts) classifies `card-images` as private and will generate signed URLs.
  - If the bucket is actually private, `getPublicUrl` links won’t load in `<img>` tags. If the bucket is public, your resolver is wasting effort signing.
  This inconsistency is a recurring pattern across buckets.
- This endpoint is expensive by design (image model + upload) and has no quota/rate limiting.
- It uses the service role key for storage writes; if this is deployed with `verify_jwt=false` anywhere, the blast radius is extreme.

Risk:
- Even unused, it’s deploy surface. If deployed, it’s a cost and abuse magnet.

Concrete improvements:
- Decide bucket policy and make it consistent in:
  - migrations (bucket public/private),
  - resolver (`PRIVATE_BUCKETS`),
  - edge functions (signed vs public URLs).
- Add server-side rate limiting and per-user quotas before wiring this to UI.
