import { supabase } from "@/integrations/supabase/client";
import { resolveStorageUrl, resolveStorageUrlsWithTransform } from "@/lib/storageRefs";
import {
  MYGOTWO_COLLAPSE_IMAGES,
  MYGOTWO_COLLAPSE_SLOT_TARGETS,
  MYGOTWO_STRIP_GALLERY_IMAGES,
  MYGOTWO_STRIP_SLOT_TARGETS,
  type MyGoTwoCollapseImage,
  type MyGoTwoStripGalleryImage,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

export type MyGoTwoGalleryAssets = {
  stripImages: MyGoTwoStripGalleryImage[];
  collapseImages: MyGoTwoCollapseImage[];
};

const SLOT_KEYS = [
  ...MYGOTWO_STRIP_SLOT_TARGETS.map((target) => target.key),
  ...MYGOTWO_COLLAPSE_SLOT_TARGETS.map((target) => target.key),
];

const STRIP_IMAGE_TRANSFORM = {
  width: 360,
  height: 1600,
  resize: "cover" as const,
  quality: 68,
};

const COLLAPSE_IMAGE_TRANSFORM = {
  width: 1800,
  height: 1100,
  resize: "cover" as const,
  quality: 72,
};

let cachedAssets: MyGoTwoGalleryAssets | null = null;
let inflightAssetPromise: Promise<MyGoTwoGalleryAssets> | null = null;

export function createEmptyMyGoTwoGalleryAssets(): MyGoTwoGalleryAssets {
  return {
    stripImages: MYGOTWO_STRIP_GALLERY_IMAGES.map((strip) => ({ ...strip })),
    collapseImages: [],
  };
}

export function getCachedMyGoTwoGalleryAssets() {
  return cachedAssets
    ? {
        stripImages: cachedAssets.stripImages.map((strip) => ({ ...strip })),
        collapseImages: cachedAssets.collapseImages.map((image) => ({ ...image })),
      }
    : null;
}

function setCachedAssets(nextAssets: MyGoTwoGalleryAssets) {
  cachedAssets = {
    stripImages: nextAssets.stripImages.map((strip) => ({ ...strip })),
    collapseImages: nextAssets.collapseImages.map((image) => ({ ...image })),
  };
}

async function fetchAssignedAssets() {
  const { data, error } = await supabase
    .from("category_images")
    .select("category_key, image_url")
    .eq("gender", "male")
    .in("category_key", SLOT_KEYS);

  if (error) {
    throw error;
  }

  const rows = data ?? [];
  const rowsWithImages = rows.filter((row) => Boolean(row.image_url));
  const stripRows = rowsWithImages.filter((row) => row.category_key?.startsWith("mygotwo-strip-"));
  const collapseRows = rowsWithImages.filter((row) =>
    row.category_key?.startsWith("mygotwo-collapse-"),
  );
  const [stripUrls, collapseUrls] = await Promise.all([
    resolveStorageUrlsWithTransform(
      stripRows.map((row) => row.image_url),
      STRIP_IMAGE_TRANSFORM,
    ),
    resolveStorageUrlsWithTransform(
      collapseRows.map((row) => row.image_url),
      COLLAPSE_IMAGE_TRANSFORM,
    ),
  ]);
  const resolvedByKey = new Map<string, string>();

  stripRows.forEach((row, index) => {
    const resolvedUrl = stripUrls[index] ?? "";
    if (row.category_key && resolvedUrl) {
      resolvedByKey.set(row.category_key, resolvedUrl);
    }
  });

  collapseRows.forEach((row, index) => {
    const resolvedUrl = collapseUrls[index] ?? "";
    if (row.category_key && resolvedUrl) {
      resolvedByKey.set(row.category_key, resolvedUrl);
    }
  });

  return {
    stripImages: MYGOTWO_STRIP_GALLERY_IMAGES.map((strip) => ({
      ...strip,
      image: resolvedByKey.get(`mygotwo-strip-${strip.id}`) || "",
    })),
    collapseImages: MYGOTWO_COLLAPSE_IMAGES.map((image, index) => ({
      ...image,
      image: resolvedByKey.get(`mygotwo-collapse-${String(index + 1).padStart(2, "0")}`) || "",
    })).filter((image) => Boolean(image.image)),
  };
}

export async function loadMyGoTwoGalleryAssets(options?: { force?: boolean }) {
  if (!options?.force && cachedAssets) {
    return getCachedMyGoTwoGalleryAssets() ?? createEmptyMyGoTwoGalleryAssets();
  }

  if (inflightAssetPromise) {
    return inflightAssetPromise;
  }

  inflightAssetPromise = fetchAssignedAssets()
    .then((nextAssets) => {
      setCachedAssets(nextAssets);
      return getCachedMyGoTwoGalleryAssets() ?? createEmptyMyGoTwoGalleryAssets();
    })
    .finally(() => {
      inflightAssetPromise = null;
    });

  return inflightAssetPromise;
}

export async function preloadImageUrls(urls: string[]) {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));

  const results = await Promise.all(
    uniqueUrls.map(
      (url) =>
        new Promise<[string, boolean]>((resolve) => {
          const image = new window.Image();
          let settled = false;

          const complete = (didLoad: boolean) => {
            if (settled) return;
            settled = true;
            resolve([url, didLoad]);
          };

          image.onload = () => complete(true);
          image.onerror = () => complete(false);
          image.src = url;

          if (image.complete) {
            complete(image.naturalWidth > 0);
          }
        }),
    ),
  );

  return new Set(results.filter(([, didLoad]) => didLoad).map(([url]) => url));
}

export function getVisibleStageStripUrls(assets: MyGoTwoGalleryAssets) {
  return assets.stripImages.map((strip) => strip.image).filter(Boolean);
}

export function applyLoadedUrlFilter(
  assets: MyGoTwoGalleryAssets,
  loadedUrls: Set<string>,
): MyGoTwoGalleryAssets {
  return {
    stripImages: assets.stripImages.map((strip) =>
      strip.image && !loadedUrls.has(strip.image)
        ? { ...strip, image: "" }
        : strip,
    ),
    collapseImages: assets.collapseImages.filter((image) => loadedUrls.has(image.image)),
  };
}

export async function resolveOverrideImageUrl(value?: string | null) {
  return resolveStorageUrl(value, 3600);
}

export function mergeOverrideIntoGalleryAssets(
  currentAssets: MyGoTwoGalleryAssets,
  imageKey: string,
  resolvedUrl: string,
): MyGoTwoGalleryAssets {
  if (imageKey.startsWith("mygotwo-strip-")) {
    const stripId = imageKey.slice("mygotwo-strip-".length);
    const nextAssets = {
      ...currentAssets,
      stripImages: currentAssets.stripImages.map((strip) =>
        strip.id === stripId ? { ...strip, image: resolvedUrl } : strip,
      ),
    };
    setCachedAssets(nextAssets);
    return nextAssets;
  }

  if (imageKey.startsWith("mygotwo-collapse-")) {
    const collapseId = `collapse-${imageKey.slice("mygotwo-collapse-".length)}`;
    const nextCollapseImages = resolvedUrl
      ? MYGOTWO_COLLAPSE_IMAGES.map((image) => {
          if (image.id === collapseId) {
            return { ...image, image: resolvedUrl };
          }

          const existing = currentAssets.collapseImages.find((current) => current.id === image.id);
          return existing ?? { ...image, image: "" };
        }).filter((image) => Boolean(image.image))
      : currentAssets.collapseImages.filter((image) => image.id !== collapseId);

    const nextAssets = {
      ...currentAssets,
      collapseImages: nextCollapseImages,
    };
    setCachedAssets(nextAssets);
    return nextAssets;
  }

  return currentAssets;
}
