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
