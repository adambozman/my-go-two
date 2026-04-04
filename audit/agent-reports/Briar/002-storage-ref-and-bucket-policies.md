# 002 Storage Ref System + Bucket Policies

## Source Of Truth

- Storage objects live in Supabase Storage buckets; URL derivation is centralized in: [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts).
- Bucket policy + public/private posture is defined in migrations, notably: [20260326095000_private_storage_buckets.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326095000_private_storage_buckets.sql) and [20260326234412_10d38189-d643-4881-b1f5-fe1a55226fb5.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260326234412_10d38189-d643-4881-b1f5-fe1a55226fb5.sql).

## Buckets / Policies Touched

Buckets created/configured by migration:
- `avatars-1` (private) with foldername-based owner policies.
- `photo-bank` (initially private in migration, later updated to `public = true`).
- `images-mygotwo-strip` (private).

Policy patterns:
- Authenticated-only access for `photo-bank` objects (select/insert/update/delete) in the initial migration, but bucket later made public (`public=true`). This mix means the public bucket flag and RLS policies can be inconsistent if not understood.

## Read/Write Path In App Code

The app uses a custom `storage://<bucket>/<path>` canonical ref:
- Create: `makeStorageRef(bucket, path)`.
- Parse: `parseStorageRef(...)`.
- Resolve to usable URLs:
  - `resolveStorageUrls(...)` for normal/public URLs or signed URLs (private buckets).
  - `resolveStorageUrlsWithTransform(...)` for image transform URLs (public or signed, depending on bucket classification).

The “private bucket” decision is hard-coded:
- `PRIVATE_BUCKETS = { avatars, avatars-1, card-images, connection-photos }`: [storageRefs.ts](/Users/adamb/Documents/GitHub/my-go-two/src/lib/storageRefs.ts).

Callsite examples:
- Avatars: [DashboardTopBar.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/DashboardTopBar.tsx).
- Connection photos: [CardEditButton.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/components/CardEditButton.tsx), [ConnectionPage.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/dashboard/ConnectionPage.tsx).
- My Go Two strip/collapse transforms: [myGoTwoStripGallery.data.ts](/Users/adamb/Documents/GitHub/my-go-two/src/platform-ui/web/mygotwo/myGoTwoStripGallery.data.ts).
- Photo gallery uploads to `photo-bank`: [PhotoGallery.tsx](/Users/adamb/Documents/GitHub/my-go-two/src/pages/PhotoGallery.tsx).

## Transformations / Edge Cases

- Non-private buckets:
  - `resolveStorageUrls(...)` returns a **public URL** via `getPublicUrl`.
  - `resolveStorageUrlsWithTransform(...)` uses `getPublicUrl(path, { transform })`.
- Private buckets:
  - `resolveStorageUrls(...)` batches `createSignedUrls([...paths])`.
  - `resolveStorageUrlsWithTransform(...)` uses `createSignedUrl(path, { transform })` per unique (path+transform) to avoid rework; caches signed URLs in-memory.

Edge cases:
- The private/public decision is not derived from Supabase bucket metadata; it is derived from the static `PRIVATE_BUCKETS` set. If bucket posture changes in Supabase, app behavior can become wrong.
- Transformed public URLs can 400 depending on file type/transform compatibility. The repo handoff explicitly notes `PNG` issues in transformed strip pipeline (transform URLs returning 400).

## Duplication / Unused Layers

- There are multiple bucket concepts for “strip images”:
  - legacy `category-images` bucket created earlier: [20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql](/Users/adamb/Documents/GitHub/my-go-two/supabase/migrations/20260313020827_5995b294-13ff-44eb-b6b2-a52a5d4f2707.sql)
  - `images-mygotwo-strip` bucket added later.
  - `photo-bank` bucket used by PhotoGallery and now also used for My Go Two slots (current working tree).
This is a key area where “extra systems” accumulate.

## Strong Decisions

- Canonical `storage://` refs decouple DB records from raw Supabase URL shapes (public/signed/transform).
- In-memory caching keyed by `{bucket}/{path}` and `{bucket}/{path}?transform=...` reduces repeated signed URL creation within a single app lifetime.
- `resolveStorageUrls(...)` batches signed URL creation per bucket and deduplicates repeated paths by index list.

## Weak Decisions / Risks

- Static `PRIVATE_BUCKETS` is a long-term footgun: it’s easy to forget to update when bucket policies change, and it’s not enforced anywhere.
- `photo-bank` posture is ambiguous across migrations (private policies but later marked public). If policies drift, the code’s “public URL for non-private bucket” assumption may conflict with runtime access.
- Transforms on public URLs rely on Supabase transform endpoints; failures can manifest as “missing images” without good logging.

## Improvement Ideas (Data/Process Focus)

- Centralize bucket posture in one place that matches the migrations and is easy to audit (even if still static): e.g., export `BUCKET_ACCESS = {bucket: 'public'|'private'}` and reference it, rather than a set that silently omits buckets.
- Add lightweight diagnostics in callers that use transforms (e.g. My Go Two) to surface 400s and file-type mismatches earlier, or preflight uploads to prefer `jpg`.
- Decide whether `photo-bank` is truly public or private and align both bucket `public` flag and storage.objects policies; then align `storageRefs.ts` classification accordingly.

