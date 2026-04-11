# Next Chat Handoff

This is the primary operator handoff for this repo.

Read this file first.

It consolidates the repo rules, product constraints, live working paths, login path, important files, verified realities, and the minimum context needed to work safely without bouncing through the audit folder.

<<<<<<< HEAD
## 2026-04-08 Current Delta

This section is append-only. Do not remove earlier sections unless the work is truly finished.

### Latest product-language rules

- Never write `Go-To` again. Use `Go Two`.
- The Beverage saved card header should read `My Go Two / Vault`, not `Saved Product Card`.
- `vault` is still experience copy, not a runtime or schema noun.
- Keep the canonical runtime/product nouns from the refactor work:
  - `Onboarding`
  - `Know Me`
  - `Saved Product Card`
  - `Connection`
  - `Knowledge Center`

### Latest UI rules added after the original handoff

- Cards, pills, and assets must use the existing shared visual system.
- Do not invent custom field boxes, custom bordered slabs, or one-off button treatments when shared card/pill classes already exist.
- If the user says something is not in the product style, stop patching around it and align to the shared `surface-*`, `pill-*`, and existing card treatments.
- Browser-visible output is still the source of truth. Do not treat `npm run build` as proof that a visual issue is fixed.
- If a browser or local Vite instance is already running, reuse it. Do not open a second browser or start another Vite instance just to check the page.

### Knowledge Center / naming-cutover status

This work is not finished.

What is true right now:

- The repo contains the new Knowledge Center migration and naming direction.
- The repo also contains runtime work that points at the new naming model.
- Live Supabase schema drift is still an active risk if the migration has not actually been applied.

Important migration files:

- `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260405120000_knowledge_center_cutover.sql`
- `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260405153000_seed_test_profiles.sql`

Important runtime files tied to the cutover:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\contexts\KnowledgeCenterContext.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\integrations\supabase\runtime-types.ts`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\integrations\supabase\client.ts`

Known live-schema problem from recent chats:

- local/browser runs showed 404 / missing-relation behavior for:
  - `user_knowledge_snapshots`
  - `user_knowledge_derivations`
  - `user_connections`
- A schema cache refresh alone is not enough if the tables/views were never created.
- Do not claim the Knowledge Center migration is done unless the live Supabase project actually has the new relations.

### Demo / fake profile status

This work is not finished and the next chat must not collapse it into a single completed statement.

What is true right now:

- The repo still has legacy demo-profile logic in:
  - `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\searchforaddprofile\index.ts`
- That path still supported `abby.demo@gotwo.local` during local browser checks.
- A separate SQL seed for replacement test profiles exists in:
  - `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260405153000_seed_test_profiles.sql`
- That SQL seed was created for:
  - `harper.test@gotwo.local`
  - `rowan.test@gotwo.local`
- That seed was not confirmed as pushed/applied in the live project.

Therefore:

- Do not claim the old fake profiles were fully deleted.
- Do not claim the new fake profiles are live until the SQL is actually applied and verified.

### Beverage saved-card state as of 2026-04-08

Current file:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyProductCardBeverages.tsx`

The latest local code state is:

- header copy uses `My Go Two / Vault`
- title remains `Beverage`
- the description is now:
  - `Your drink, your way, down to the last detail. The exact order, the exact place, the way you always take it. Tagged and searchable so nothing gets lost and nobody has to guess.`
- the order field label is `Go Two Order`
- all extra Beverage dropdown fields were removed
- only `Keywords` remains under the order field
- the separate `Add Photo` and `Take Photo` buttons were removed
- the snapshot box itself remains the upload trigger

Important warning:

- The final 2026-04-08 Beverage edits were type-checked and built successfully.
- Those final edits were not browser-verified after the last patch set.
- The next chat should visually verify the Beverage card before claiming it matches the user's screenshots.

### My Go Two / Photo Gallery state added after the original handoff

- The strip renderer was previously overpatched and then restored back toward the original narrow strip layout.
- The user did not want the strip layout redesigned; the problem was image treatment and crop/readability, not replacing the strip concept.
- Photo Gallery guidance was shifted toward aspect-ratio-first previews, but this whole area is still sensitive and not user-approved as complete.
- Do not assume the My Go Two image/upload flow is finished just because parts of it compile.

### Tooling note for the next chat

- Built-in Playwright MCP browser automation can fail on this machine with a permission error trying to create `C:\Windows\System32\.playwright-mcp`.
- CLI fallback worked through:
  - `npx --package @playwright/cli playwright-cli ...`
- When using browser automation, keep artifacts under:
  - `C:\Users\adamb\Documents\GitHub\my-go-two\output\playwright`

### Ongoing codebase rule

- The user asked for a short descriptive classification line at the end of touched code files.
- Several touched runtime files already end with classification footer comments.
- Future chats should preserve that practice on newly edited runtime files.

## Product Context
=======
Source material consolidated into this handoff:
>>>>>>> 495927ef830082e70405199fbec87c1979705368

- `.lovable/plan.md`
- `CRITICAL_ISSUES_FIX_PLAN.md`
- `RECOMMENDATION_INTELLIGENCE_OVERHAUL_PLAN.md`
- `RECOMMENDATION_SYSTEM_OVERHAUL_PLAN.md`
- `RECOMMENDATION_SYSTEM_BUILD_SPEC.md`
- `MY_GO_TWO_OVERHAUL_PLAN.md`
- `LINT_AUDIT.md`
- `audit/agent-reports/Atlas/INDEX.md`
- `audit/agent-reports/Briar/001-auth-session-data.md`
- `audit/agent-reports/Briar/002-storage-ref-and-bucket-policies.md`
- `audit/agent-reports/Briar/INDEX.md`
- `audit/agent-reports/Coda/001-app-shell-routing.md`
- `audit/agent-reports/Coda/002-auth-session-routing-guards.md`
- `audit/agent-reports/Coda/INDEX.md`
- `audit/agent-reports/Hypatia.md`
- `audit/agent-reports/Hypatia_FINAL_SELF.md`
- `audit/agent-reports/Hypatia_REVIEW_OF_Laplace.md`
- `audit/agent-reports/Kepler.md`
- `audit/agent-reports/Kepler_FINAL_SELF.md`
- `audit/agent-reports/Laplace.md`
- `audit/agent-reports/Laplace_FINAL_SELF.md`
- `src/assets/spare/README.md`
- `src/assets/templates/non-binary/README.md`
- `src/platform-ui/README.md`

## Purpose

`Go Two` is a relationship and recommendation product.

Core loop:

1. Users create and maintain `Go Two` preference cards and lists.
2. Users answer `Know Me` questions.
3. AI uses saved preferences and answers to recommend products, gifts, restaurants, and decisions.
4. Trusted connections can search shared preferences and act on exact saved details.

Examples of meaningful saved information:

- exact coffee order
- color and brand preferences
- fit, size, and style preferences
- home, travel, and gift preferences
- seasonal and context-specific preferences

This is not a generic demo app. Product behavior matters more than abstract cleanup.

## Non-Negotiable Rules

These rules came up repeatedly across the handoff and audits and should be treated as binding.

1. Do exactly what the user asked. Do not broaden scope.
2. User-visible behavior is the source of truth.
3. A passing build is not proof that a live behavior issue is solved.
4. Do not redesign `My Go Two` while fixing behavior or performance.
5. Do not invent placeholder UI, fallback imagery, or temporary fake visuals unless explicitly requested.
6. Do not revive deleted image-bank flows.
7. If the user says an asset is a component, treat it as code, not a screenshot.
8. Before claiming cleanup/removal/consolidation, verify the repo state.
9. On critical `My Go Two` issues, first split research into two tracks:
   - runtime/data/loading
   - navigation/live behavior/state tracing
10. Prefer the existing local running app and existing browser session instead of repeatedly launching new servers and windows.

## Product Terminology

Use the user's terms consistently.

- `asset`: any reusable global thing, not automatically an image
- `product card`: a real React component
- `beverage card`: the opened Beverages experience
- `Product card beverages`: the specific reusable right-side beverage card asset
- `preview strips`: the 8 image-only strips that form the scaffold
- `category strips`: the labeled strips such as `Clothes`, `Personal`, `Health`, `Gifts`, `Dining`, `Beverages`, `Household`, `Entertainment`, `Travel`
- `collapse`: the state where only preview strips remain visible and fill the stage
- `card image` / `detail image`: the larger opened-category image, separate from the narrow strip image

## Current Live `My Go Two` Rules

These are the current live behavior constraints and should not be broken during refactors or fixes.

1. The 8 preview strips remain part of both states.
2. In the uncollapsed state, preview strips are larger than normal strips.
3. Preview strips do not grow on hover.
4. Only labeled category strips grow on hover.
5. In the collapsed state, only the preview strips remain visible and fill the stage.
6. Collapse rotation happens only while collapsed.
7. Collapse rotation is 10 seconds per image.
8. The 5-image collapse bank is separate from the normal strip images.
9. Clicking a labeled category opens an in-place full-stage panel, not a popup or route change.
10. The strip page must render assigned images only.
11. Do not reintroduce the old `category-images/bank/...` upload flow.
12. Separate strip images and card/detail images are valid and already supported by the current architecture.

## Live Working Paths

Most important live pages:

- Landing: `src/pages/Landing.tsx`
- Login: `src/pages/Login.tsx`
- Signup: `src/pages/Signup.tsx`
- Dashboard shell: `src/layouts/DashboardLayout.tsx`
- Dashboard home: `src/pages/dashboard/DashboardHome.tsx`
- My Go Two: `src/pages/dashboard/MyGoTwo.tsx`
- Recommendations: `src/pages/dashboard/Recommendations.tsx`
- Settings: `src/pages/dashboard/SettingsPage.tsx`
- Questionnaires: `src/pages/dashboard/Questionnaires.tsx`
- Photo Gallery: `src/pages/PhotoGallery.tsx`

Most important `My Go Two` implementation files:

- `src/pages/dashboard/MyGoTwo.tsx`
- `src/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset.tsx`
- `src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts`
- `src/platform-ui/web/mygotwo/myGoTwoStripGallery.images.ts`
- `src/lib/imageOverrides.ts`
- `src/lib/storageRefs.ts`
- `src/pages/PhotoGallery.tsx`

Most important auth/invite files:

- `src/contexts/AuthContext.tsx`
- `src/contexts/auth-context.ts`
- `src/pages/Login.tsx`
- `src/pages/Signup.tsx`
- `src/pages/Connect.tsx`
- `src/layouts/DashboardLayout.tsx`
- `supabase/functions/dev-login/index.ts`
- `supabase/functions/searchforaddprofile/index.ts`

Most important recommendation/billing files:

- `src/pages/dashboard/Recommendations.tsx`
- `supabase/functions/recommendation-engine-v2/index.ts`
- `supabase/functions/recommendation-bank-maintenance/index.ts`
- `supabase/functions/recommendation-trend-pipeline/index.ts`
- `supabase/functions/_shared/recommendationSignals.ts`
- `supabase/functions/_shared/recommendationIntentPlanner.ts`
- `supabase/functions/_shared/recommendationProductBank.ts`
- `supabase/functions/_shared/recommendationTrendPipeline.ts`
- `supabase/functions/check-subscription/index.ts`
- `supabase/functions/create-checkout/index.ts`
- `supabase/functions/customer-portal/index.ts`
- `RECOMMENDATION_EXECUTION_CHECKLIST.md`

Most important `Know Me` / `This or That` files:

- `src/pages/dashboard/KnowMePage.tsx`
- `src/data/knowMeQuestions.ts`
- `src/data/thisOrThatV2.ts`
- `src/data/thisOrThatV2Authored.ts`
- `src/data/thisOrThatV2Persistence.ts`

## Local Run And Login

Package scripts:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm test`

Current working local app URL used in this environment:

- `http://127.0.0.1:5180/`

Preferred local workflow:

1. Reuse the existing local app/browser session when it is already running.
2. Do not keep spawning new browser windows and Vite instances for routine checks.
3. Visually verify real pages after meaningful changes, especially `My Go Two`, dashboard, and any touched user path.

Documented dev login path from code:

1. Open `/login`.
2. Use `adam.bozman@gmail.com`.
3. `Login.tsx` detects that allowlisted email and calls the `dev-login` edge.
4. `supabase/functions/dev-login/index.ts` generates a magic link server-side and returns a session.
5. The client calls `supabase.auth.setSession(...)`.
6. Post-login routing resolves to `/onboarding` or `/dashboard`.

Important auth note:

- The current `dev-login` flow uses server-generated magic-link verification and does not rotate passwords anymore.
- That change exists specifically to stop repeated dev-session invalidation.

## Verified Current Truths

These are the important current realities established across the docs and repo inspection.

### Auth and routing

- `DashboardLayout.tsx` is the main dashboard auth gate.
- Some leaf pages still duplicate auth redirect behavior, especially `MyGoTwo.tsx`.
- Duplicate guarding is considered a likely contributor to bounce/login instability.
- `check-subscription` is coupled too closely to auth/session boot and also runs on an interval.

### Invite/connect flow

- `gotwo_invite` is consumed after login.
- `gotwo_invite_token` is stored but not fully and cleanly consumed post-login.
- Token invites are therefore structurally incomplete in some logged-out entry paths.

### My Go Two image system

- The live runtime source of truth is `category_images` plus `storage://bucket/path` refs.
- `PhotoGallery.tsx` is currently the live operator editor for slot assignments.
- The loader already supports separate strip and detail/card images.
- The collapse bank is separate from category strip/card images.

### Storage resolution

- `storageRefs.ts` is the browser URL boundary.
- Bucket privacy handling is currently hard-coded via `PRIVATE_BUCKETS`.
- Audits repeatedly flagged policy drift between migrations and that hard-coded list.
- `photo-bank` and `images-mygotwo-strip` are frequent drift-risk buckets.

### Recommendations

- The frontend recommendations page is a viewer for a weekly cached backend generation path.
- The live recommendations page is on `recommendation-engine-v2`; do not add a second product-generation runtime path.
- `recommendation-engine-v2` now separates recommendation-fit confidence from exact-product confidence.
- Sparse profiles now return fewer stronger picks instead of forcing a full 12-card set.
- `recommendation_product_bank` now carries row state, image verification state, source metadata, and reverification notes.
- migrated bank rows should start as `review_required` until `recommendation-bank-maintenance` re-verifies them.
- `recommendation-bank-maintenance` is the trusted cleanup/rescore path for existing bank rows.
- `recommendation-trend-pipeline` stages trend candidates first and only promotes approved rows into the shared banks.
- `resolved_recommendation_catalog` still exists, but the v2 direction is to treat `recommendation_product_bank` as the exact-product reuse layer.

### Know Me / This or That

- `KnowMePage.tsx` uses the authored v2 runtime bank from `src/data/thisOrThatV2.ts`.
- `src/data/knowMeQuestions.ts` is now only the main non-This-or-That quiz bank.
- Flat `tot-*` parsing is removed from recommendation normalization.
- This-or-That recommendation signals should come from structured `this_or_that_v2_answers` payloads and the v2 authored dataset.
- Do not rebuild helper aliases that read the removed flat question bank.

### Public feed and connections

- Connection safety is mostly handled via SQL RPCs and explicit share tables.
- Public feed backend design is comparatively coherent, but the frontend still reloads too much and assumes raw image URLs.

### Tooling

- `npm run lint` currently passes.
- `npm run build` currently passes.
- Targeted recommendation and This-or-That contract tests cover the v2 signal pipeline, but live browser/runtime checks are still required before claiming user-facing behavior is fixed.
- `LINT_AUDIT.md` is stale and should not be trusted as current status.

## Asset And Cleanup Status

The repo had real cleanup work completed, but cleanup is not "done" in the broad sense.

### Safe cleanup already completed

- retired carousel test routes/pages removed
- dead `CategorySync` route/file removed from runtime
- repo-root screenshot and capture clutter removed
- several clearly unused template/preview assets removed
- several orphaned utilities/components removed

### Active asset buckets that are not safe to bulk-delete

- `src/assets/previews`
- `src/assets/templates`
- `src/assets/styles`
- `src/assets/spare`

These are still connected to live code or active data systems and need file-by-file review only.

### Future-project assets intentionally retained

- `src/lib/quotes.ts`
- `src/hooks/useRotatingQuote.ts`

These are reserved for future work and not part of the live flow right now.

## High-Risk Areas To Treat Carefully

These are the places where the docs consistently say "do not freestyle".

1. `My Go Two` startup/load path
2. auth/session lifecycle
3. invite/connect handoff
4. storage bucket privacy assumptions
5. shared/global writable tables
6. `PhotoGallery.tsx` because it edits live slot mappings
7. `searchforaddprofile` because it is a large multi-action edge function

## Known Architectural Problems

These are documented repeatedly across the audits.

1. Duplicate auth guards create redirect/bounce risk.
2. Edge auth strategy is inconsistent across functions.
3. `searchforaddprofile` is doing too much.
4. `DashboardHome.tsx`, `SettingsPage.tsx`, `Questionnaires.tsx`, and `PhotoGallery.tsx` are too large and mix too many responsibilities.
5. Some shared/global tables are too broadly writable.
6. Storage bucket privacy and frontend resolver behavior are not derived from one source of truth.
7. Several flows still contain demo/test/dev assumptions that need to stay clearly isolated.
8. Source files contain some corrupted unicode copy that should be cleaned up before launch-quality polish.

## Current Do-Not-Touch Blindly List

Do not blindly delete or rework these without tracing active usage first.

- `src/pages/dashboard/MyGoTwo.tsx`
- `src/platform-ui/web/mygotwo/*`
- `src/pages/PhotoGallery.tsx`
- `src/lib/storageRefs.ts`
- `src/contexts/AuthContext.tsx`
- `src/layouts/DashboardLayout.tsx`
- `src/pages/Connect.tsx`
- `supabase/functions/searchforaddprofile/index.ts`
- `supabase/config.toml`
- `supabase/migrations/*` touching shared/global tables or storage buckets

## Verification Standard

When making changes:

1. Check the relevant live page visually, not just by build output.
2. Use the existing local app/session when available.
3. Keep `My Go Two` rules intact.
4. Keep login/invite flows intact.
5. Run lint/build when touching code paths that can affect them.
6. Do not claim cleanup or behavior fixes until the actual repo and the actual page agree.

## What Still Needs To Be Done

See `CRITICAL_ISSUES_FIX_PLAN.md` for the consolidated fix plan.

For the recommendation rebuild specifically, use:

- `RECOMMENDATION_SYSTEM_OVERHAUL_PLAN.md`
- `RECOMMENDATION_SYSTEM_BUILD_SPEC.md`

The shortest version is:

1. finish `My Go Two` startup/load/state work
2. simplify and harden auth/session behavior
3. complete invite token handoff
4. harden edge auth and shared/global table ownership
5. simplify `PhotoGallery.tsx`
6. clean up large overloaded dashboard pages and product surfaces without breaking behavior

## Archive Note

The original audit and planning docs still exist as source material and historical detail.

Use this handoff first.

Use `CRITICAL_ISSUES_FIX_PLAN.md` second.
