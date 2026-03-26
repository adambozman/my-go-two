# MyGoTwo Rewiring Handoff

This doc explains what was changed, what is live now, and what still needs to be done.

This is a rewiring handoff, not a product spec.

## What We Were Doing

We were not rebuilding the old `MyGoTwo` feature.

We were actively rewiring `MyGoTwo` away from:

- old categories
- old level 1/2/3/4 flow
- old public image buckets
- old image assignment logic

The goal was to turn `/dashboard/my-go-two` into a working asset test page while cleaning out old logic.

## Important Context

The old `MyGoTwo` system is not the live feature anymore.

The live page is currently:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx`

It renders:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoWebHeader.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx`

## What Was Rewired

### 1. MyGoTwo page reset

The old level-driven `MyGoTwo` flow was removed from the live page.

The page is now a test surface for website assets.

### 2. Strip gallery asset

We created a full-page strip-gallery asset:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx`

Default strip content lives in:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\myGoTwoStripGallery.images.ts`

The strip gallery:

- fills most of the viewport
- uses alternating labeled/image-only strips
- grows the focused strip on hover
- includes a dev image icon on each strip
- allows bank image selection

### 3. PhotoGallery overhaul

`PhotoGallery` was rebuilt into a dev image bank:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx`

It no longer aggregates app/user photos.

It now:

- uploads images
- lists banked images
- searches them
- copies refs
- deletes them

### 4. Private bucket rewiring

We started moving away from the old public buckets.

Current new buckets in use:

- `photo-bank`
- `images-mygotwo-strip`
- `avatars-1`

### 5. Avatar rewiring

Avatar paths were rewired from old `avatars` to `avatars-1` in:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\features\mygotwo\headerShared.ts`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\DashboardTopBar.tsx`

### 6. Storage-ref handling

Private bucket support was added to:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\storageRefs.ts`

This now resolves signed URLs for:

- `photo-bank`
- `images-mygotwo-strip`
- `avatars-1`

## What Is Live Right Now

### Live page shell

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\dashboard\MyGoTwo.tsx`

### Live strip asset

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoStripGalleryAsset.tsx`

### Live bank UI

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\pages\PhotoGallery.tsx`

### Live assignment helper

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\lib\websiteAssetAssignments.ts`

## Current Persistence Model

### Bank upload path

Bank uploads now go to:

- bucket: `photo-bank`
- table: `category_bank_photos`

Bank rows store storage refs, not public URLs.

### Strip assignment path

Current strip assignment helper still uses:

- table: `category_images`

Why:

- it already exists in the live database
- the newer neutral assignment table was created in code/migrations, but not applied to the live DB from this environment

Current strip save behavior:

1. pick image from bank
2. copy that image into `images-mygotwo-strip`
3. store that copied strip image ref through the assignment helper
4. resolve signed URLs for live display

## Why This Matters

The other chat should not assume:

- the old level system is still the feature
- public image buckets are still the intended path
- localStorage is the current persistence model

This work was explicitly about rewiring away from all of that.

## What Still Needs To Be Done

### 1. Replace `category_images`

Right now the strip assignment helper still uses `category_images` because it exists live.

The intended end state is a neutral assignment table, not old category semantics.

The migration file already created in repo:

- `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\migrations\20260326051500_create_website_asset_assignments.sql`

But it was not applied to the live DB in this environment.

So the next real step is:

- create/apply the real neutral assignment table in the live database
- then switch the helper off `category_images`

### 2. Delete dead old image logic

These should be reviewed as dead/suspect old code:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\InlinePhotoSearch.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\components\CardEditButton.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\generate-card-image\index.ts`
- `C:\Users\adamb\Documents\GitHub\my-go-two\supabase\functions\generate-category-image\index.ts`

These are tied to old image logic and old buckets.

### 3. Delete old buckets only after deleting dead code

The old buckets should be deleted only after the dead code that points at them is removed.

The whole point is cleanup, not preserving old logic.

### 4. Keep the saved assets, not the old system

Saved reusable code assets still on disk:

- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoWebCoverflowStage.tsx`
- `C:\Users\adamb\Documents\GitHub\my-go-two\src\platform-ui\web\mygotwo\MyGoTwoProductCard.tsx`

These are assets, not active page logic.

## What Not To Do

- Do not revive the old `MyGoTwo` level flow.
- Do not preserve dead bucket code just because it still compiles.
- Do not treat local-only behavior as acceptable website behavior.
- Do not confuse saved assets with old connected feature logic.

## Short Version

We were doing a rewiring cleanup.

We:

- reset the live page
- built a strip asset page
- rebuilt `PhotoGallery` into a bank
- moved to private buckets
- rewired avatars
- rewired strip image flow toward real website content

What remains:

- finish replacing `category_images`
- delete dead old image code
- then delete old buckets
