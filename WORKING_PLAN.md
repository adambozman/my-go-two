# Go Two Working Plan

This file is the durable working roadmap for the Go Two product and codebase.
It exists so the plan survives crashes, restarts, and context loss.

## Product Core

Go Two is a relationship-friction reduction system.

The core promise:
- Save what matters once.
- Share it intentionally.
- Help people avoid preventable arguments, missed details, bad guesses, and emotional wear.

Primary use case:
- Couples

Secondary use cases:
- Friends
- Coworkers
- Siblings
- Parents

Brand concept:
- "Go" is coral.
- "Two" is teal.
- The contrast represents difference and complement.
- The app should feel inclusive and not clumsy or stereotyped in wording or color use.

Personalization concept:
- On signup, the app identifies the user as male, female, or non-binary.
- The experience should adapt meaningfully by gender where appropriate.
- Current implementation is more complete for male than female or non-binary.

Monetization concept:
- The site tracks preferences, patterns, favorites, dislikes, brands, lifestyle, and buying signals.
- Revenue comes from highly coordinated, targeted advertising and recommendations.
- Sponsored products and affiliate links should eventually blend into the product carefully.
- The app must stay trustworthy even as monetization grows.

Marketing concept:
- Opposing TikTok channels, one aimed at men and one at women.
- Content should dramatize common relationship pain points so strongly that it becomes funny.
- Product positioning: stop arguments before they happen.

## Current Read On The Codebase

What already exists:
- Landing, signup, login, onboarding, dashboard shell
- My Go Two card-entry system
- Connection/linking system
- Sharing permissions UI
- Know Me questionnaire system
- AI personalization
- Weekly recommendation generation
- Sponsored products admin surface

What is incomplete or mismatched:
- Privacy and sharing are not enforced deeply enough in the data model
- Recommendations are driven mostly by Know Me data, not the full Go Two memory graph
- Gender-aware experience is only partially implemented
- Sponsored products exist structurally but are not actually blended into recommendations
- UI system is split between global patterns and legacy local page composition
- Old and new data models coexist in ways that can cause confusion

## Non-Negotiables

These should guide all future work:

1. Trust first
- Users must be able to control what is shared and with whom.
- The database should enforce sharing boundaries, not just the UI.

2. No accidental design drift
- Global design system defines font, color, card treatment, button treatment, and shared UI language.
- Local files should primarily control layout, sizing, spacing, structure, and page-specific content.

3. One source of truth
- Preferences, cards, lists, personalization, recommendations, and monetization should read from a coherent model.

4. Product before monetization
- Ads and sponsors should support the product, not make it feel manipulative or low-trust.

5. Couples first, but not couples only
- The system should support broader sharing without losing the relationship-centered product identity.

## Execution Phases

## Phase 1: Trust And Data Safety

Goal:
Make the product safe and trustworthy before adding more intelligence or monetization.

Problems to solve:
- Sharing permissions are represented in UI and app logic, but not enforced strongly enough at the query/RLS layer.
- Partner access to entries is broader than the product promise suggests.
- Search and feed flows can bypass the intended "share only what I allow" model.

Primary areas:
- `supabase/migrations/*`
- `src/pages/dashboard/ConnectionPage.tsx`
- `src/pages/dashboard/DashboardHome.tsx`
- any queries against `card_entries`, `lists`, and shared partner data

Tasks:
- Audit all partner-readable queries
- Define exactly which categories map to which stored content
- Enforce permission-aware access at the data layer
- Make connection search respect sharing permissions
- Finish the profile/connection photo flow using private storage with explicit sharing rules
- Migrate legacy public Supabase image URLs to private-safe storage refs
- Re-test connection feed and partner page against actual privacy rules
- Replace broad section sharing with connection-specific sharing:
  - `shared_card_entries` for per-product-card sharing
  - `shared_profile_fields` for per-field profile/calendar sharing
  - `shared_derived_features` for shareable derived outputs like `Your Vibe` and recommendation access
- Rebuild connection feed/search to read from explicit shared rows rather than inferred section access
- Add one-click bulk share/unshare on top of the explicit row model, not instead of it
- Build connection-aware recommendation logic behind `For You`:
  - recommendations stay "for me"
  - connections act as the context source behind the scenes
  - inputs should combine:
    - connection type (`mom`, `significant other`, `coworker`, etc.)
    - upcoming occasions
    - explicitly shared product cards
    - explicitly shared profile fields
    - explicitly shared derived outputs like `Your Vibe`
  - leave room for paywall/partial gating at the backend model layer

Definition of done:
- A connected person can only access data explicitly shared with them
- UI and database rules match
- Search, feeds, and recommendations do not leak private data

## Phase 2: Preference Graph And Source Of Truth

Goal:
Define what Go Two actually knows and where that truth lives.

Problems to solve:
- Data is split across `profile_answers`, `ai_personalization`, `card_entries`, and legacy `user_preferences` fields
- Some models look current while others look leftover
- Recommendations and future ads do not have one canonical graph to read from

Primary areas:
- `supabase/functions/personalize/index.ts`
- `supabase/functions/ai-products/index.ts`
- `supabase/functions/_shared/knowMeCatalog.ts`
- `src/pages/dashboard/MyGoTwo.tsx`
- `src/contexts/PersonalizationContext.tsx`
- schema around `user_preferences`, `card_entries`, `lists`, `profiles`

Tasks:
- Decide the canonical preference model
- Classify current data into:
  - profile identity
  - stable preferences
  - dynamic cards and lists
  - AI-derived summaries
  - monetization signals
- Mark legacy fields that should be migrated, derived, or retired
- Document the read/write flow for each major surface

Definition of done:
- There is one clear source of truth
- Every major feature reads from it consistently
- We know what to migrate and what to keep

## Phase 3: Make "For You" Truly Go Two-Powered

Goal:
Make recommendations reflect the whole product, not just the questionnaire.

Current reality:
- `For You` currently uses `profile_answers` and `ai_personalization`
- It does not truly use My Go Two memory, lists, favorites, dislikes, orders, or broader saved signals
- Sponsored blending is not active yet

Primary areas:
- `supabase/functions/ai-products/index.ts`
- `supabase/functions/_shared/knowMeCatalog.ts`
- recommendation-related schema
- `src/pages/dashboard/Recommendations.tsx`

Tasks:
- Define recommendation inputs from:
  - Know Me answers
  - My Go Two cards
  - saved likes/dislikes
  - favorites
  - brand preferences
  - practical recurring needs
- Add connection-aware gifting logic so `For You` can generate recommendations for me about a connection, based on what they shared and what occasion is coming up
- Separate fallback catalog logic from personalized signal logic
- Make recommendation explanations traceable and honest
- Keep weekly caching, but make inputs richer and more deterministic

Definition of done:
- Recommendations feel like they come from the user's actual saved life
- Not just from generic style questions

## Phase 4: Gender-Aware Experience Completion

Goal:
Make the gender-aware product promise real without becoming reductive.

Current reality:
- Male paths appear more developed
- Some gender routing currently collapses back to male behavior
- Image and category systems are partially migrated

Primary areas:
- `src/lib/gender.ts`
- `src/hooks/useCategoryRegistry.ts`
- `supabase/functions/_shared/knowMeCatalog.ts`
- onboarding/questionnaire/category/image systems

Tasks:
- Complete female and non-binary data banks
- Fix recommendation bank routing by gender
- Verify category coverage per gender
- Audit image and content differences for missing parity
- Keep wording inclusive while letting the experience adapt meaningfully

Definition of done:
- Male, female, and non-binary users all receive real tailored coverage
- No path silently falls back to male unless explicitly intended

## Phase 5: Monetization Integration

Goal:
Blend sponsored and affiliate systems into the product without breaking trust.

Current reality:
- Sponsored admin exists
- Sponsored table exists
- Affiliate-like fields exist in recommendations
- Live recommendation blending with sponsored inventory is not wired up

Primary areas:
- `src/pages/admin/SponsoredAdmin.tsx`
- `supabase/functions/ai-products/index.ts`
- `sponsored_products` and `weekly_recommendations`

Tasks:
- Define monetization rules:
  - what can be sponsored
  - how it is labeled
  - how targeting works
  - what signals can be used
- Blend sponsored content only after core recommendations are stable
- Add reporting and impression/click integrity
- Ensure sponsored logic respects trust and relationship context

Definition of done:
- Monetization feels coordinated and intentional
- It does not undermine the core product promise

## Phase 6: UI And System Cleanup

Goal:
Make the app feel cohesive and reduce future design churn.

Current reality:
- Some pages depend heavily on local visual composition
- Some newer pages use the global system more faithfully
- The visual language is present but uneven

Primary areas:
- landing/auth
- onboarding
- dashboard shell
- My Go Two
- For You
- shared UI components

Tasks:
- Audit where local UI is inventing shared design
- Reduce local visual overrides
- Keep only layout-specific page logic local
- Make the global system the real source of design truth

Definition of done:
- New work becomes safer because pages follow one shared system

## Practical Work Order

This is the recommended order to execute:

1. Trust and privacy enforcement
2. Preference graph definition
3. Recommendation input refactor
4. Gender-aware completion
5. Monetization integration
6. UI cleanup and consistency passes

## Immediate Next Step

Start with Phase 1.

Specifically:
- audit every partner-readable query
- map current sharing categories to actual stored data
- identify where app logic currently enforces privacy but the database does not

## Tracked Follow-Up

- `LINT_AUDIT.md` now tracks the current lint status and cleanup order
- current status:
  - build passes
  - lint fails with repo-wide cleanup issues
- when resumed, prioritize My Go Two and shared coverflow files first

## Notes For Future Sessions

If work resumes after a crash, restart from this file and continue phase by phase.

Do not jump ahead to monetization or visual polish before trust and data-model issues are stabilized.
