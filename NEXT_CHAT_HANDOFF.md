# Next Chat Handoff

This is the single handoff document the next chat should read first.

It exists to preserve:

- product context
- user terminology
- hard rules
- current live `My Go Two` state
- what this chat established
- what still needs to be done

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

`Go Two` is a relationship and recommendation product, not a generic preference app.

Core purpose:

- users create `Go Two` lists
- users save exact product and preference cards
- users answer `Know Me` questions
- AI uses those saved preferences and answers to make recommendations
- trusted connections can search shared saved preferences so they know exactly what to buy, order, recommend, or avoid

Examples of what matters:

- brand
- color
- recipe
- store
- style
- vibe
- exact Starbucks or Dunkin order
- winter vs summer
- hot vs cold
- cocktail preference
- Taco Bell or restaurant order

This is a business-critical product surface. The standard is working, usable, user-ready code and live behavior, not just code that compiles.

## User Terminology

Use the user’s terms the way the user means them.

- `asset`:
  Any reusable global thing created to use repeatedly. Not automatically an image.

- `product card`:
  A real React component, not a screenshot and not a flat image.

- `beverage card`:
  The whole opened Beverages experience on screen.

- `Product card beverages`:
  The specific reusable right-side card asset.

- `collapse`:
  The strip state where only the preview strips remain visible and fill the stage.

- `preview strips`:
  The 8 image-only strips used in both collapsed and uncollapsed states. They are part of the intended scaffold, not temporary filler.

- `category strips`:
  The labeled strips like `Clothes`, `Personal`, `Health`, `Gifts`, `Dining`, `Beverages`, `Household`, `Entertainment`, `Travel`.

## Hard Rules

These rules are binding.

1. Do exactly what the user asks. Do not broaden the task.
2. Do not be “helpful” by changing extra things that were not requested.
3. On critical `My Go Two` issues, first send out two research agents:
   - one for runtime/data/loading
   - one for navigation/live behavior/state tracing
4. User-visible output is the source of truth.
5. A passing build does not mean the issue is solved if the live page still behaves badly.
6. Do not minimize runtime or rendering issues just because `npm run build` passes.
7. Do not create placeholder slabs, stand-in screens, invented fallback visuals, or made-up imagery unless explicitly asked.
8. Do not revive starter images or hidden fallback imagery for the strip.
9. Do not flatten React component assets into static images.
10. If the user says an asset is a component, treat it as code.
11. If the user says a file or asset should be deleted or unhooked, verify that it is actually gone before claiming consolidation or cleanup is complete.
12. Before answering that something was combined, cleaned, or removed, verify the real repo state.

## Current Live `My Go Two` Rules

These should not be broken.

1. Do not redesign `My Go Two` when making behavior fixes.
2. The 8 preview strips stay the 8 preview strips in both states.
3. In uncollapsed state, preview strips are larger than normal strips but do not grow on hover.
4. Only labeled category strips grow on hover.
5. In collapsed state, only the preview strips remain visible and fill the stage.
6. Collapse rotation happens only while collapsed.
7. Collapse rotation is 10 seconds per image.
8. The 5-image collapse bank is separate from the normal strip images.
9. Clicking a labeled category opens an in-place full-stage panel, not a popup, stretched strip, or route change.
10. The strip page must use assigned images only.
11. Do not reintroduce the deleted legacy `category-images/bank/...` upload flow.

## Current Important Files

Live `My Go Two` page:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx`

Live strip component:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx`

Strip image metadata:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.images.ts`

Strip data/loading path:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.data.ts`

Photo bank/editor page:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx`

Image assignment helper:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageOverrides.ts`

Storage resolution:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts`

Legacy image cleanup:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\legacyImageCleanup.ts`

Live logo component:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\GoTwoText.tsx`

Reusable product card asset base:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoProductCard.tsx`

Reusable beverages product card asset:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyProductCardBeverages.tsx`

## What This Chat Established

### 1. `My Go Two` loading problems were real runtime problems

The slowness and jank were not just perception issues.

Main causes identified in the strip system:

- heavy image/data loading on first render
- loader and stage timing getting out of sync
- timer-driven collapse/hover/open behavior fighting live loading
- earlier starter/fallback image behavior was wrong and should not return

### 2. `PNG` strip assets were a real issue for the transformed strip path

Two strip images appeared “missing” because transformed Supabase render URLs for those `PNG` assets were returning `400`.

The correct product answer is:

- use `JPG` for strip photography
- do not rely on `PNG` in that transformed strip pipeline unless there is a real reason

### 3. `--no-sandbox` is not a site-code line

The warning about:

- `You are using an unsupported command-line flag: --no-sandbox`

is coming from the external Playwright/Codex browser launcher, not from the app’s source code.

### 4. The current `DashboardTopBar.tsx` issue reported by the user does not reproduce in this checkout as a frontend build blocker

Current local checks:

- `npm run build` passes
- `npx tsc --noEmit` passes

There is a real type-shape concern in `navItems` because only one item has `end: true`, but in this checkout it is not currently blocking the frontend build.

### 5. Edge-function type errors are separate from the frontend

The `searchforaddprofile` and `ai-products` edge-function errors are dominated by reading from untyped `req.json()` / external JSON values without narrowing.

Those issues affect edge deployment/type-checking, not current frontend rendering.

### 6. Asset cleanup was not actually complete

The next chat must not assume cleanup happened just because it was discussed earlier.

What is true right now:

- `GoTwoTransparentNew.png` is still the live logo asset in use
- `GoTwoTransparent.png` is stale
- `gotwo-script-lockup.svg` is stale
- the four `dashboard/quick-*` JPGs are stale leftovers
- there are many additional repo-root screenshots/reference images and broad-glob asset folders that need explicit review and cleanup

## Asset Findings From This Chat

### Clearly active

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\GoTwoTransparentNew.png`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\fonts\Benedict-Regular.otf`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\fonts\Pierson-Regular.ttf`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\previews\bg-clean-linen.jpg`
- root `styles` JPGs used by `profileQuestions.ts`
- relationship stock photos used by `stockPhotos.ts`
- specific template images directly imported by `Recommendations.tsx`

### Clearly stale leftovers

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\GoTwoTransparent.png`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\logos\gotwo-script-lockup.svg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\dashboard\quick-gift-ideas.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\dashboard\quick-saved-items.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\dashboard\quick-their-brands.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\dashboard\quick-their-sizes.jpg`

### Dev-only / screenshot artifacts

There are many repo-root and tool-output screenshots that are not app assets, including files like:

- `desktop-mygotwo*.png`
- `mygotwo-coverflow-*.png`
- `output-mygotwo-*.png`
- `playwright-mygotwo-home.png`
- `tmp-mygotwo-*.png`
- files under `.playwright-cli`
- files under `output\playwright`

### Manual-review folders

These buckets need explicit cleanup review because they are not clearly direct live assets:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\spare`
- much of `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates`
- much of `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\styles\female`
- much of `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\styles\male`
- extra preview images under `src\assets\previews` other than `bg-clean-linen.jpg`

## Photo Gallery Findings

The current `PhotoGallery` page is overloaded and slower than it should be.

Main reasons:

- it loads the full `category_bank_photos` table at once
- it resolves storage URLs for every image before the page settles
- it also loads assigned slots in parallel
- it runs legacy cleanup on mount, which can trigger extra reload work
- every card shows too many controls
- the page is acting as uploader, bank browser, assignment tool, inspector, and deleter all at once

The correct direction is:

- split `PhotoGallery` into lighter parts
- reduce first-load data and image work
- reduce visible controls
- make slot assignment the main workflow instead of making every card a control panel

## What Still Needs To Be Done

### `My Go Two`

1. Keep tightening route-level startup work so the strip page settles faster.
2. Validate open-category behavior category by category.
3. Keep assigned-images-only behavior strict.
4. Keep loading/state behavior smooth and synchronized.

### Assets

1. Delete stale logo files and stale dashboard quick-action images.
2. Audit the repo-root screenshot/reference files and remove what should not live in the repo.
3. Review `spare`, `styles`, `templates`, and non-core preview folders and decide what is truly live versus leftover.

### Photo Gallery

1. Redesign the page structure so it is not one overloaded admin slab.
2. Reduce first-load image work.
3. Reduce button clutter.
4. Separate assignment workflow from bank browsing.

## Working Local App

Local app:

- `http://127.0.0.1:5180/`

Run:

```sh
npm run dev -- --host 127.0.0.1 --port 5180
```

Build:

```sh
npm run build
```

Type check:

```sh
npx tsc --noEmit
```

## Resume Rule

The next chat should start with this file.

Before changing code:

1. Read this file first.
2. Confirm the exact requested scope.
3. On critical `My Go Two` work, send out two research agents first.
4. Change only the thing requested.
5. Verify the actual repo state before claiming something was combined, deleted, cleaned up, or consolidated.
