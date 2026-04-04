# 001 App Shell + Routing

**Entrypoints**

- [main.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/main.tsx)
- [App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx)

**Route Table (High-Level)**

- Public: `/`, `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/onboarding`, `/connect`, `/photo-gallery`, `/carousel-test`
- Nested under `/dashboard`: index, `my-go-two`, `recommendations`, `questionnaires`, `settings`, `notifications`, `search`, `public-feed`, `connection-feed`, `connections/:connectionId`, `sponsored`
- Catch-all: `*` -> NotFound

**State Owners / Providers**

- Query cache: `QueryClientProvider` with a module-level `queryClient` instance.
- Auth: `AuthProvider` (Supabase session + subscription status).
- Personalization: `PersonalizationProvider` (depends on `useAuth()` user).
- Top bar: `TopBarProvider` (back button state).
- UI infra: `TooltipProvider`, plus two global toaster systems (`Toaster` and `Sonner`).

**Async / Loading Behavior**

- Most routes are `lazy()` loaded and wrapped in a single `<Suspense>` with a simple full-screen fallback (`RouteFallback`).
- This means initial navigation cost is dominated by:
  - route module download/parse
  - provider initialization work (`AuthProvider` + `PersonalizationProvider`)
  - any route-level auth guarding inside nested pages/layouts

**Data Dependencies**

- Auth and personalization providers perform client-side Supabase calls on mount and/or when `user` changes.
- React Query is available globally but not clearly the single standard; there are direct Supabase reads in contexts and pages.

**UX Strengths**

- Lazy-loaded routes keep initial bundle smaller (good for first paint).
- Centralized fallback provides a consistent “Loading…” state when code-splitting.

**UX Risks**

- “Everything behind one Suspense” means you can’t differentiate “route module loading” vs “data loading” vs “auth settling.” Users just see one loader.
- Two toaster systems can lead to duplicated patterns and inconsistent notifications.

**Maintainability Strengths**

- Provider layering is readable and explicit in [App.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/App.tsx).
- Nested routing under `/dashboard` is clean and keeps dashboard concerns grouped.

**Maintainability Problems**

- Duplicate naming pattern in contexts (`src/contexts/AuthContext.tsx` vs `src/contexts/auth-context.ts`) increases the chance of import mistakes and “split context” bugs.
- Route guards appear likely duplicated across layout and individual pages (needs checking in [DashboardLayout.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/layouts/DashboardLayout.tsx) and per-page code).

**Improvement Ideas (No Code Changes)**

- Consolidate route auth guarding into one place (prefer the dashboard layout) and keep leaf routes dumb.
- Consider per-route or per-section loading states rather than one global Suspense fallback for all dashboard routes.
- Decide whether the app standard is “React Query for reads” or “direct Supabase client reads,” then apply consistently (reduces duplicated caching/loading logic).

