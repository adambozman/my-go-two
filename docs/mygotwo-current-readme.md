# MyGoTwo Current Readme

Read this file before doing any `MyGoTwo` work.

This is the only current `MyGoTwo` doc. Older docs have been removed.

## What MyGoTwo Is Right Now

`/dashboard/my-go-two` is currently a test page for building reusable website assets.

It is not the old `MyGoTwo` system.

## Current Live Page

Live page entry:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx`

Live components on the page:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoWebHeader.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx`

## Current Purpose

Use this page to:

- build and test website assets
- assign banked images to strip slots
- verify real website image rendering

Do not treat it like the old level 1/2/3/4 feature.

## Current Asset Files

Active strip asset:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx`

Default strip data:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.images.ts`

Saved reusable code assets still kept on disk:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoWebCoverflowStage.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoProductCard.tsx`

These are assets. They are not the live page unless explicitly imported.

## Current Strip Categories

The strip gallery currently alternates category labels and image-only strips:

1. Clothes
2. image only
3. Personal
4. image only
5. Health
6. image only
7. Gifts
8. image only
9. Dining
10. image only
11. Beverages
12. image only
13. Household
14. image only
15. Entertainment
16. image only
17. Travel
18. image only

## Current Image System

### Photo Bank

Bank UI:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx`

Bank database table:

- `category_bank_photos`

Bank storage bucket:

- `photo-bank`

Bank rows store storage refs, not public URLs.

### Strip Assignments

Current live assignment helper:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\websiteAssetAssignments.ts`

Current live assignment table in use:

- `category_images`

Current strip image bucket:

- `images-mygotwo-strip`

Current behavior:

- choose image from bank
- image is copied into `images-mygotwo-strip`
- strip assignment stores the storage ref for that copied strip image
- strip display resolves signed URLs from that private ref

## Current Avatar System

Avatar upload/remove paths now use:

- bucket `avatars-1`

Files:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\features\mygotwo\headerShared.ts`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\DashboardTopBar.tsx`

## Rules

- Do not revive the old level 1/2/3/4 `MyGoTwo` system.
- Do not keep dead code just because it still exists on disk.
- If a path is dead, delete it instead of rewiring it.
- If an asset is not imported by the live page, treat it as an asset, not live logic.
- Do not leave new work half-wired.
- Website behavior must use real persistence, not fake local-only state.
- Prefer private storage buckets over public ones.

## Current Known Direction

We are cleaning and rebuilding.

That means:

- old image logic should be deleted, not preserved
- old buckets should eventually be deleted after dead code is removed
- new asset systems should use:
  - `photo-bank`
  - `images-mygotwo-strip`
  - `avatars-1`

## Things To Go Over Before More Changes

1. Which old image code is still dead and should be deleted now.
2. Whether `category_images` should stay temporarily or be replaced next.
3. Which old storage buckets are still referenced by dead code only.
4. Whether the strip gallery should get a reusable grain overlay layer.
5. Whether the header should remain the current `MyGoTwo` header or become a neutral asset header later.

## Old Code That Should Be Treated As Suspect

If these are not intentionally reused, they should be reviewed for deletion:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\InlinePhotoSearch.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\CardEditButton.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\generate-card-image\index.ts`
- `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\generate-category-image\index.ts`

## Working Rule

Before changing `MyGoTwo`:

1. Read this file.
2. Confirm whether the work is:
   - live page code
   - saved asset code
   - dead old code to delete
3. If it is dead, delete it.
4. If it is live, wire it completely.
