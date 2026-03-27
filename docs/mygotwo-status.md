# MyGoTwo Status

This is the current working document for `My Go Two`.

It replaces the older current-readme doc.

## What MyGoTwo Is Now

`/dashboard/my-go-two` is a live website surface built around the strip gallery.

Live page:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx`

Live components on that page:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoWebHeader.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx`

This is not the old level 1/2/3/4 MyGoTwo flow.

## User Lingo

Use these terms the way the user uses them.

- `collapse` or `callopse`:
  The strip state where only the preview strips remain visible and fill the stage.

- `uncollapsed`:
  The normal strip wall state before collapse.

- `preview strips`:
  The 8 image-only strips that make up the panorama/collapse view.
  They are not temporary stand-ins.
  They are part of the actual strip scaffold.

- `category strips`:
  The labeled strips like `Clothes`, `Personal`, `Health`, `Gifts`, `Dining`, `Beverages`, `Household`, `Entertainment`, `Travel`.

- `asset`:
  Saved reusable code that exists in the repo but is not necessarily live.
  An asset is not the live page unless it is explicitly imported and rendered.

- `product card`:
  A real React component, not a screenshot and not a flat image.

- `test`:
  A visual or experimental implementation the user liked and wanted turned into proper code.
  It should be rebuilt correctly, not merely wired directly as a throwaway if that breaks the real page.

- `bank`:
  The live photo source the user uploads to and selects from.

- `the truth`:
  If the user changes a strip image or a collapse image in the editor, that saved image becomes the live source of truth.

## Do Not Misread Assets

This repo contains reusable code assets that are still React components.

Important example:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoProductCard.tsx`

If a future chat finds this file, it must understand:

1. it is a React component
2. it should not be treated like a screenshot or static image
3. if used, it should be rendered as code, not converted into a flat picture

Important asset files still on disk:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoProductCard.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoWebCoverflowStage.tsx`

These are assets, not automatically live page logic.
Do not confuse:

- saved asset component
- live page component
- dead old code

## What We Did

### Strip system

- kept the strip gallery as the live `My Go Two` surface
- kept the 8 preview strips as the 8 preview strips
- added collapse-only rotation using a 5-image collapse bank
- set collapse rotation to 10 seconds per image
- kept hover growth on labeled category strips only
- changed click-open behavior so a category opens as a real full-stage panel, not a stretched strip
- increased the outer container corner radius
- increased strip label text size
- improved first-load behavior so the loader waits for assigned strip images to decode before reveal
- removed duplicate startup fetches in the strip load path
- fixed the open-category view so it renders as a real full-stage panel in the same container instead of stretching one strip across the row
- fixed collapsed panorama rendering so hidden category strips do not leave gap space at the edges

### Image system

- confirmed the live image path is:
  - `photo-bank` bucket
  - `category_bank_photos` table
  - `category_images` table
- changed `photo-bank` handling to direct public delivery
- kept `category_images` as the live slot assignment table because it is what the current live system uses
- added cleanup for broken legacy rows that pointed at dead `category-images/bank/...` URLs
- changed `photo-bank` handling so public bank images resolve directly instead of being treated like private signed-only assets

### Cleanup

- deleted dead legacy frontend and function paths tied to the old image flow:
  - `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\InlinePhotoSearch.tsx`
  - `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\localImageLibrary.ts`
  - `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\CreateCustomCardSheet.tsx`
  - `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\generate-category-image\index.ts`
  - `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\bulk-generate-category-images\index.ts`
- removed dead function registrations from:
  - `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\config.toml`
- kept:
  - `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageResolver.ts`
  because onboarding still uses it

### Local workflow

- current local Vite instance should run on:
  - `http://127.0.0.1:5180/`
- old extra Vite windows should not be left running

## Specific Lessons From This Chat

These are the exact mistakes the next chat should avoid.

1. Do not overreach.
   If the user asks for a narrow behavior fix, do not redesign surrounding layout, state shape, or feature model.

2. Do not claim something is fixed without matching the screenshot and behavior.
   The correct move is to compare the result to the user’s screenshots and stated rules before declaring success.

3. Do not confuse cause.
   Several earlier problems were blamed on lazy loading when the real issue was wrong wiring or wrong behavior in the strip component.

4. Do not treat the preview strips like temporary filler.
   They are part of the intended scaffold in both collapsed and uncollapsed states.

5. Do not make the open-category state by stretching a strip.
   It must be a separate full-stage panel state rendered in the same container.

6. Do not revive old starter images.
   The strip must show assigned images only.

7. Do not assume a bucket or table is dead just because the name sounds legacy.
   `category_images` is still live.

8. Do not assume a file is live just because it exists.
   Assets and dead code both remain on disk.
   Verify imports and routes.

9. Do not leave old local dev servers open.
   Keep only the current Vite instance.

10. Do not flatten a React component into an image.
    If the user asks for the asset product card, use the component as code.

11. Do not replace “coded correctly” with “wired directly.”
    If the user likes a test, the goal is to implement that behavior properly, not to hook the live route to the rough experiment in a way that breaks the real page.

12. When the user says “the truth,” that means the saved assignment should be the only live source.
    No hidden fallback layer.

## Live Image Rules

These rules should not be broken:

1. Do not reintroduce starter image fallback for the strip.
2. Do not reintroduce the deleted `category-images/bank/...` upload path.
3. `photo-bank` is the live source for uploaded bank images.
4. `category_bank_photos` is the live bank table.
5. `category_images` is still the live slot assignment table until explicitly replaced.
6. Do not store dead direct URLs when a valid `photo-bank` ref/public path should be used.

## Live Strip Rules

These rules should not be broken:

1. Do not redesign the strip when fixing behavior.
2. The 8 preview strips stay the 8 preview strips in both states.
3. In uncollapsed state, preview strips are larger than normal strips but do not grow on hover.
4. Only labeled category strips grow on hover.
5. In collapsed state, only the preview strips remain visible and fill the stage.
6. Collapse rotation happens only while collapsed.
7. Collapse rotation is 10 seconds per image.
8. The 5-image collapse bank is separate from the normal strip images.
9. Clicking a labeled category opens an in-place full-stage panel, not a popup, stretched strip, or route change.
10. Changes should be narrow. Do not change structure or behavior that was not requested.
11. In uncollapsed state, the preview strips are wider than normal strips but they do not themselves grow on hover.
12. Only category strips grow on hover.
13. In collapsed state, the preview strips must actually reach the rounded container edges.
14. Do not flatten React assets into images when the requested thing is a component.

## What Still Needs To Be Done

1. `My Go Two` still needs more load cleanup at the route level.
   The strip load path is better, but the dashboard still does too much before the page settles.

2. The click-open category state still needs complete visual validation.
   Corners, overlays, and full-panel behavior should be checked category by category.

3. The upload path in `PhotoGallery` is still slower than it should be.
   It still does too much reload work after upload.

4. Broken legacy rows must stay out of live data.
   `category_bank_photos` and `category_images` should continue to reject or clean dead legacy values.

5. The current live assignment model should be reviewed before any future table migration.
   `category_images` is still live even though the name is legacy.

6. The overall dashboard request volume is still too high before `My Go Two` settles.
7. Future chats still need to verify whether any remaining old image references exist in live data after upload and assignment changes.
8. If `MyGoTwoProductCard.tsx` is needed later, it must be integrated as a real component path, not as a static visual substitute.

## Files That Matter Right Now

Live strip page:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx`

Live strip component:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx`

Live strip defaults:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.images.ts`

Live photo bank:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx`

Live assignment helper:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\imageOverrides.ts`

Live storage resolution:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts`

Live legacy cleanup:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\legacyImageCleanup.ts`

## Working Rule

Before changing `My Go Two`:

1. Read this file.
2. Confirm whether the requested change is:
   - live strip behavior
   - live image flow
   - dead code deletion
   - saved asset component work
3. Change only the thing requested.
4. Do not broaden the task.
