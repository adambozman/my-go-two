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

### Image system

- confirmed the live image path is:
  - `photo-bank` bucket
  - `category_bank_photos` table
  - `category_images` table
- changed `photo-bank` handling to direct public delivery
- kept `category_images` as the live slot assignment table because it is what the current live system uses
- added cleanup for broken legacy rows that pointed at dead `category-images/bank/...` URLs

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
3. Change only the thing requested.
4. Do not broaden the task.
