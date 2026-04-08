# Next Chat Handoff

This is the single handoff document the next chat should read first.

It exists to preserve:

- product context
- user terminology
- hard rules
- current live `My Go Two` state
- what this chat established
- what still needs to be done

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
- `GoTwoTransparent.png`, `gotwo-script-lockup.svg`, and the four `dashboard/quick-*` JPGs were verified unused and deleted on April 8, 2026
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

### Deleted stale leftovers

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\GoTwoTransparent.png`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\logos\gotwo-script-lockup.svg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\dashboard\quick-gift-ideas.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\dashboard\quick-saved-items.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\dashboard\quick-their-brands.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\dashboard\quick-their-sizes.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\previews\bg-bold-shapes.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\previews\bg-geometric.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\previews\bg-grain-spots.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\accessory-backpack.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\accessory-bag.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\accessory-belt.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\accessory-hat.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\accessory-sunglasses.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\accessory-wallet.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\accessory-watches.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\flowers.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\flowers-lilies.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\flowers-orchid.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\flowers-plants.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\flowers-roses.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\flowers-sunflowers.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\flowers-tulips.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\date-ideas.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\date-indoor.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\date-outdoor.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\date-romantic.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-comedy.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-concerts.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-gallery.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-movies.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-museum.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-nightlife.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-sports.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-theater-live.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\event-theater.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\nightlife-bar.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\nightlife-club.jpg`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates\nightlife-karaoke.jpg`

### Deleted dev-only / screenshot artifacts

These non-app screenshots and generated capture folders were deleted on April 8, 2026 after verifying they were not imported by runtime code:

- repo-root `desktop-mygotwo*.png`
- repo-root `mygotwo-coverflow-*.png`
- repo-root `output-mygotwo-*.png`
- repo-root `playwright-mygotwo-home.png`
- repo-root `tmp-mygotwo-*.png`
- `.playwright-cli`
- `output\playwright`

### Manual-review folders

These buckets were reviewed again. They are active asset buckets in the current app, so they should not be bulk-deleted:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\spare`
  is included in the active `imageBlocklist` build-time glob
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\templates`
  is included in the active `imageBlocklist` build-time glob and specific files are imported directly by `Recommendations.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\styles`
  is included in the active `imageBlocklist` build-time glob and root style images are imported directly by `profileQuestions.ts`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\assets\previews`
  is included in the active `imageBlocklist` build-time glob and `bg-clean-linen.jpg` is imported by `src\index.css`

Safe cleanup direction:

- review these buckets file by file, not folder by folder
- verify direct imports and `imageBlocklist` coverage before deleting any individual asset

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

1. Done: deleted stale logo files and stale dashboard quick-action images after verifying zero live references.
2. Done: deleted repo-root screenshot/reference artifacts and Playwright capture folders after verifying they were not runtime assets.
3. Done: verified that `spare`, `styles`, `templates`, and `previews` are active asset buckets and should not be bulk-deleted.
4. Done: deleted the three unreferenced extra preview backgrounds after confirming only `bg-clean-linen.jpg` is used in repo code.
5. Done: deleted the unreferenced `accessory-*` and `flowers*` template JPGs after confirming they had zero code imports.
6. Done: deleted the unreferenced `date-*`, `event-*`, and `nightlife-*` template JPGs after confirming they had zero code imports and did not feed the live recommendations route.
7. Review the remaining active asset buckets file by file to find truly unused individual assets.
8. Done: deleted `output\diagnostics\rg-copy.exe` after verifying it had no runtime references and was just generated tooling output.
9. Done: ignored local dev-run log artifacts such as `vite-dev*.log` and `output/*.log` so local browser/server checks do not keep polluting repo status.
10. Done: deleted orphaned dead-code files `src\data\publicFeed.ts`, `src\lib\adTracking.ts`, and `src\lib\imagePositions.ts` after confirming they had zero references anywhere in `src`.
11. New caution: some additional zero-reference files still need manual review before deletion because they are mentioned in the `My Go Two` handoff path or may be intentional future-use utilities.
12. Done: deleted orphaned shadcn wrappers `src\components\ui\command.tsx` and `src\components\ui\drawer.tsx` after confirming they had zero imports anywhere in `src`.

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
