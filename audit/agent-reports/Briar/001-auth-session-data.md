# 001 Auth + Session Data Flow

## Source Of Truth

- Supabase Auth session persisted in `localStorage` by the client in: [client.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/client.ts).
- In-app auth state derived from Supabase auth events + `getSession()` in: [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx).

## Tables / Buckets / Functions Touched

- Supabase Auth (implicit).
- `profiles` table update on first sign-in after signup (cached signup payload): [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx).
- Edge function `check-subscription` invoked from frontend: [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx).
- Function gateway config: [config.toml](/Users/adamb/Documents/GitHub/my-go-two/supabase/config.toml).

## Read/Write Path

1. App boot creates Supabase client with `persistSession: true` and `autoRefreshToken: true` storing session in `localStorage`: [client.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/client.ts).
2. `AuthProvider` subscribes to `supabase.auth.onAuthStateChange` and also calls `supabase.auth.getSession()` once:
   - sets `session`, `user`, `loading=false` in either path.
   - on `SIGNED_IN` it runs `applySignupData` to update `profiles` from `localStorage.gotwo_signup_data` then deletes that key: [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx).
3. When `session.access_token` exists:
   - `checkSubscription()` calls `supabase.functions.invoke("check-subscription")` with `Authorization: Bearer <access_token>` header.
   - Runs on session change and every 60s via `setInterval`: [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx).
4. Dev override short-circuits subscription checks for known dev IDs/emails and forces premium state: [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx).

## Transformations / Edge Cases

- Session persistence is fully delegated to Supabase client config; app state mirrors it.
- Signup data is stored as raw JSON in `localStorage` and parsed unsafely (caught and ignored). Data is written to `profiles.age` and `profiles.gender` with `normalizeGender(...)`.
- Subscription state is “best effort”: errors in the check are silently ignored; `subscribed` may remain stale until next interval.

## Duplication / Unused Layers

- There are two files: `src/contexts/auth-context.ts` (types + context) and `src/contexts/AuthContext.tsx` (provider implementation). This is fine, but increases the chance of future split-context import mistakes (some files import one, others the other).

## Strong Decisions

- `supabaseConfigError` pattern in [client.ts](/Users/adamb/Documents/GitHub/my-go-two/src/integrations/supabase/client.ts) prevents “crash at import time” by stubbing `fetch` when env is missing.
- `AuthProvider` sets `loading=false` in both event and initial session fetch paths, which reduces boot deadlocks.

## Weak Decisions / Risks

- `checkSubscription` runs on a fixed 60s interval for any logged-in user. This is a persistent background network cost and can amplify transient edge-function failures into noisy UX state.
- `supabase/config.toml` sets `verify_jwt=false` for `check-subscription` (and several other functions). If the function code does not enforce auth, it can become a data-leak or abuse vector. Even if function enforces auth, this config makes it easier to accidentally ship permissive behavior.
- Silent catch blocks in subscription checks can hide real failures (expired token, function errors, Stripe key issues).

## Improvement Ideas (Data/Process Focus)

- Make subscription checks event-driven where possible (refresh on sign-in, on demand, and occasionally), or cache results server-side with an expiry to avoid per-minute function hits.
- Audit `check-subscription` function implementation to ensure it validates user identity and does not accept arbitrary `Authorization` headers when `verify_jwt=false`.
- Consider storing subscription state in `profiles` (or a dedicated table) and refreshing it via webhook or scheduled job; the frontend would only read, not invoke Stripe-facing logic on a timer.

