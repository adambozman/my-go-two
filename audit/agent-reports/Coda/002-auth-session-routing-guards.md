# 002 Auth + Session + Route Guards

**Entrypoints / Primary Files**

- [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx)
- [auth-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts)
- [Login.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Login.tsx)
- [Signup.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Signup.tsx)
- [ForgotPassword.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/ForgotPassword.tsx)
- [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx)
- (Leaf guards also exist in some pages like [MyGoTwo.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/MyGoTwo.tsx))

## Flow Summary

1. `AuthProvider` subscribes to Supabase `onAuthStateChange` and also calls `getSession()` on mount.
2. Provider sets `{ user, session, loading }` and exposes `signIn/signUp/signOut/resetPassword`.
3. `/dashboard/*` is guarded in [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx): `loading` shows a loader; missing `user` redirects to `/login`.
4. Some dashboard leaf routes repeat the guard pattern (example: `MyGoTwo` redirects to `/login` when `!user`).

## State Owners

- **AuthProvider** owns:
  - `user`, `session`, `loading`
  - subscription state: `subscribed`, `subscriptionLoading`, `subscriptionEnd`
- **DashboardLayout** owns:
  - the gating decision for all nested dashboard routes
  - invite-link side effect (see below)
- **Login/Signup** own:
  - form state and their own transient `loading` states
  - localStorage-based invite + signup caches

## Async / Loading Behavior

- `AuthProvider` sets `loading=false` in two places:
  - `onAuthStateChange` callback
  - `getSession()` promise resolution
  This is generally fine but can cause short-lived “loading flip” behavior as both paths resolve.

- `checkSubscription()` runs:
  - when `session.access_token` changes
  - and then every 60 seconds while a session exists
  If the `check-subscription` function is slow/unavailable, the app keeps trying. Failures are silent.

## Data Dependencies

- Auth: Supabase Auth session.
- Subscription status: `supabase.functions.invoke("check-subscription", Authorization Bearer session.access_token)`
- Invite linking: [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx) calls `supabase.functions.invoke("searchforaddprofile", body: { action: "link-by-inviter", inviter_id })` without explicit Authorization header.
- Signup profile enrichment:
  - [Signup.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/Signup.tsx) caches `gotwo_signup_data`
  - [AuthContext.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/AuthContext.tsx) reads it on `SIGNED_IN` and updates `profiles`

## UX Strengths

- Clear dashboard gating: loader then redirect.
- Dev login shortcut reduces friction in non-live environments.
- Password recovery flow supports both “send email” and “set new password” states.

## UX Risks

- **Double guarding**: dashboard layout redirects, and some leaf routes also redirect. That can amplify “momentary null user” glitches into actual navigation.
- **Silent subscription check failures** can make the UI inconsistent (e.g., user sees free state) with no explanation.
- Invite linking runs as an unconditional side effect when a user exists; if the edge function or RLS changes, it can fail silently and/or add startup latency.

## Maintainability Strengths

- Auth surface area is centralized in the provider.
- `AuthContextType` is typed in [auth-context.ts](/Users/adamb/Documents/GitHub/my-go-two/src/contexts/auth-context.ts).

## Maintainability Problems

- Two-file context pattern (`AuthContext.tsx` provider vs `auth-context.ts` context shape) is fine, but the similar filenames and mixed casing raise the risk of import mistakes across the codebase.
- Subscription logic is embedded in AuthProvider; UI features that depend on it will re-render with auth changes even if they don’t need subscription state.

## Improvement Ideas (No Code Changes)

- Make the dashboard layout the single source of truth for auth gating; leaf routes should assume authenticated context and focus on feature UX.
- Consider debouncing or backing off the 60s subscription polling (or switching to server-sent updates) to reduce background network noise.
- Add explicit tracing/logging (even just `console.debug`) for auth transitions and guard redirects during development to pinpoint “why did I get sent to /login?” scenarios.

