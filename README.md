# My Go Two

## What This Repo Is

This is the working website for Go Two.

The active image system for `My Go Two` is:

- `photo-bank` storage bucket
- `category_bank_photos` table
- `category_images` table
- `src/pages/PhotoGallery.tsx`
- `src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx`
- `src/lib/imageOverrides.ts`
- `src/lib/storageRefs.ts`

The current local Vite app runs with:

```sh
npm run dev -- --host 127.0.0.1 --port 5180
```

Local URL:

```txt
http://127.0.0.1:5180/
```

## Current Rules

These rules are intentional and should not be broken:

1. Do not redesign `My Go Two` when making behavior fixes.
2. The 8 preview strips stay the 8 preview strips in both states.
3. In uncollapsed state, the preview strips are larger than normal strips but do not grow on hover.
4. Only labeled category strips grow on hover.
5. In collapsed state, only the preview strips remain visible and fill the stage.
6. Collapse rotation happens only while collapsed.
7. Collapse rotation is 10 seconds per image.
8. The 5-image collapse bank is separate from the normal strip images.
9. Clicking a labeled category opens an in-place full-stage panel, not a stretched strip, popup, or route change.
10. The strip page must use assigned images only. Do not fall back to starter images.
11. `photo-bank` is the live source for uploaded bank images.
12. Do not reintroduce the deleted legacy `category-images/bank/...` upload flow.
13. Do not leave extra old Vite windows running. Use the current local server only.
14. On critical My Go Two issues, first send out two research agents before implementing:
   - one agent for the runtime/data/loading path
   - one agent for navigation/live-behavior tracing
15. User-visible output is the source of truth. Do not judge success by code shape alone.
16. A successful build does not mean the issue is solved if the live page still behaves badly.
17. Do not create placeholder-style loading slabs, default fallback screens, or generic stand-in UI unless that is explicitly requested.
18. Do not add starter/default imagery or other made-up visual content to smooth over a broken state.
19. Do not minimize a live rendering or runtime issue by saying it is "not a problem" because the build passes.
20. When the user refers to a reusable "asset", treat that as a reusable global thing, not automatically as an image file.

## Product Context

`Go Two` is not a generic preferences app.

It is a relationship and recommendation system built around saved personal patterns.

Core usage:

- users create `Go Two` lists and saved product cards
- users answer `Know Me` questions
- AI uses those saved preferences and answers to make recommendations
- connections can search shared saved cards to see exact real-world preferences

Examples of saved preference detail that matter:

- brand
- color
- recipe
- store
- style
- vibe
- seasonal preference
- hot or cold
- exact drink or food order

This matters because My Go Two cards are business-critical product records, not decorative forms.

## This Session

What this session established:

1. `My Go Two` loading problems were real runtime/code problems, not just perception problems.
2. The slow/blank/janky load path centered on `src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx`.
3. `legacyImageCleanup` was still sitting too close to startup work and needed to be moved off the first-paint path.
4. The first-load path should preload only the first visible image set first, then continue broader cleanup and refresh after first paint.
5. The current checked-in top navigation path does not intentionally open a new browser window:
   - `src/components/DashboardTopBar.tsx`
   - `src/platform-ui/web/mygotwo/MyGoTwoWebHeader.tsx`
6. The right-side beverage product card is a reusable asset and should be treated as the first category-specific card pattern, not as a one-off custom screen.

Mistakes from this session that should not be repeated:

1. Do not turn a loading fix into a generic centered placeholder slab.
2. Do not invent fallback/default visuals to hide broken loading behavior.
3. Do not rely on "the code looks right" when the live page looks wrong.
4. Do not treat runtime regressions as secondary just because `npm run build` passes.
5. Do not improvise design direction on business-critical product surfaces without explicit approval.
6. Do not confuse reusable assets with image placeholders.

## Why This Matters

This is not a hobby project.

This code is meant to become a working, user-ready product that real people can rely on at scale.

The standard for work in this repo is:

- working code
- usable code
- production-minded code
- user-ready behavior
- correct live rendering
- correct runtime behavior

The app is intended to support the business directly. It matters because this product is tied to the user's livelihood and family.

That means:

1. Do not ship "good enough" placeholders when the real product surface is what users will see.
2. Do not treat visual, runtime, or navigation bugs as small issues.
3. Do not optimize for fast code output over correct live behavior.
4. Every major surface should be built as if it will be used by thousands of real users.

## Unified Product And Execution Plan

This section replaces the separate working-plan file.

### Product Core

Go Two is a relationship-friction reduction system.

The core promise:

- save what matters once
- share it intentionally
- help people avoid preventable arguments, missed details, bad guesses, and emotional wear

Primary use case:

- couples

Secondary use cases:

- friends
- coworkers
- siblings
- parents

Brand concept:

- `Go` is coral
- `Two` is teal
- the contrast represents difference and complement

### Product Goal

The site is meant to let people:

- create `Go Two` lists
- save exact product and preference cards
- answer `Know Me` questions
- receive AI recommendations based on those preferences
- let trusted connections search shared saved preferences so they know exactly what to buy, order, recommend, or avoid

Examples of what the product should support:

- what someone gets at Starbucks or Dunkin
- what they get in winter or summer
- hot or cold drink preferences
- cocktail preferences
- Taco Bell or restaurant orders
- brand, color, recipe, store, style, and vibe preferences

### Current Read On The Codebase

What already exists:

- landing, signup, login, onboarding, and dashboard shell
- My Go Two card-entry system
- connection and linking system
- sharing permissions UI
- Know Me questionnaire system
- AI personalization
- weekly recommendation generation
- sponsored products admin surface

What is incomplete or mismatched:

- privacy and sharing are not enforced deeply enough in the data model
- recommendations are driven mostly by Know Me data, not the full Go Two memory graph
- gender-aware experience is only partially implemented
- sponsored blending exists structurally but is not fully wired into recommendations
- UI system is split between global patterns and legacy/local composition
- old and new data models still coexist in confusing ways

### Non-Negotiables

1. Trust first
- users must control what is shared and with whom
- the database should enforce sharing boundaries, not just the UI
- connection-facing logic must read only from explicit shared access

2. No accidental design drift
- the global design system defines fonts, colors, card treatment, button treatment, and shared UI language
- local files should mainly control layout, sizing, spacing, structure, and page-specific content

3. One source of truth
- preferences, cards, lists, personalization, recommendations, and monetization should read from a coherent model

4. Product before monetization
- ads and sponsors should support the product, not make it feel manipulative or low-trust

5. Couples first, but not couples only
- the system should support broader sharing without losing the relationship-centered product identity

6. User-ready over code-ready
- the app is not done because the code compiles
- it is done when the live behavior is correct, usable, and ready for real users

### Execution Phases

#### Phase 1: Trust And Data Safety

Goal:
- make the product safe and trustworthy before adding more intelligence or monetization

Primary areas:
- `supabase/migrations/*`
- `src/pages/dashboard/ConnectionPage.tsx`
- `src/pages/dashboard/DashboardHome.tsx`
- queries against `card_entries`, `lists`, and shared partner data

Definition of done:
- a connected person can only access data explicitly shared with them
- UI and database rules match
- search, feeds, and recommendations do not leak private data

#### Phase 2: Preference Graph And Source Of Truth

Goal:
- define what Go Two actually knows and where that truth lives

Primary areas:
- `supabase/functions/personalize/index.ts`
- `supabase/functions/ai-products/index.ts`
- `supabase/functions/_shared/knowMeCatalog.ts`
- `src/pages/dashboard/MyGoTwo.tsx`
- `src/contexts/PersonalizationContext.tsx`

Definition of done:
- there is one clear source of truth
- every major feature reads from it consistently
- we know what to migrate and what to keep

#### Phase 3: Make "For You" Truly Go Two-Powered

Goal:
- make recommendations reflect the whole product, not just the questionnaire

Definition of done:
- recommendations feel like they come from the user's actual saved life

#### Phase 4: Gender-Aware Experience Completion

Goal:
- make the gender-aware promise real without becoming reductive

Definition of done:
- male, female, and non-binary users all receive real tailored coverage

#### Phase 5: Monetization Integration

Goal:
- blend sponsored and affiliate systems into the product without breaking trust

Definition of done:
- monetization feels coordinated and intentional

#### Phase 6: UI And System Cleanup

Goal:
- make the app feel cohesive and reduce future design churn

Definition of done:
- pages follow one shared system and new work becomes safer

### Practical Work Order

1. Trust and privacy enforcement
2. Preference graph definition
3. Recommendation input refactor
4. Gender-aware completion
5. Monetization integration
6. UI cleanup and consistency passes

### Immediate Next Step

Start with Phase 1:

- audit every partner-readable query
- map current sharing categories to actual stored data
- identify where app logic currently enforces privacy but the database does not

### Resume Rule

If work resumes after a crash or context loss, restart from this file.

Do not jump ahead to monetization or visual polish before trust and data-model issues are stabilized.

## Still Needs To Be Done

1. `My Go Two` still needs more load cleanup around first paint and route-level startup work. The strip itself is better, but the dashboard route still does too much before the page settles.
2. The click-open category state needs full visual validation for every category so corners, overlays, and back behavior stay clean.
3. The strip label sizing and spacing may need more tuning now that the corner radius increased.
4. Photo upload flow is still slower than it should be because `PhotoGallery` reloads too much after upload.
5. Old broken rows should continue to be kept out of `category_images` and `category_bank_photos`.
6. The overall dashboard is still making many unrelated requests before `My Go Two` finishes settling.

## Deleted Legacy Path

These were removed because they were not part of the current working site flow:

- `src/components/InlinePhotoSearch.tsx`
- `src/lib/localImageLibrary.ts`
- `src/components/CreateCustomCardSheet.tsx`
- `supabase/functions/generate-category-image/index.ts`
- `supabase/functions/bulk-generate-category-images/index.ts`

`src/lib/imageResolver.ts` was kept because onboarding still uses it.

## Working Commands

Install:

```sh
npm i
```

Run local app:

```sh
npm run dev -- --host 127.0.0.1 --port 5180
```

Build:

```sh
npm run build
```

Tests:

```sh
npm run test
```
