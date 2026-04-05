import { supabase } from "@/integrations/supabase/client";
import {
  resolveStorageUrlWithTransform,
  resolveStorageUrl,
  resolveStorageUrlsWithTransform,
} from "@/lib/storageRefs";
import {
  MYGOTWO_ASSIGNMENT_KEYS,
  MYGOTWO_COLLAPSE_IMAGES,
  MYGOTWO_COLLAPSE_SLOT_TARGETS,
  MYGOTWO_STRIP_GALLERY_IMAGES,
  getMyGoTwoCategoryTargetByCardKey,
  getMyGoTwoCategoryTargetByStripId,
  getMyGoTwoCategoryTargetByStripKey,
  type MyGoTwoCollapseImage,
  type MyGoTwoStripGalleryImage,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

export type MyGoTwoGalleryAssets = {
  stripImages: MyGoTwoStripGalleryImage[];
  collapseImages: MyGoTwoCollapseImage[];
};

type AssignedAssetRow = {
  category_key: string | null;
  image_url: string | null;
};

const SLOT_KEYS = MYGOTWO_ASSIGNMENT_KEYS;

const STRIP_PREVIEW_TRANSFORM = {
  width: 72,
  height: 1400,
  resize: "cover" as const,
  quality: 24,
};

const STRIP_IMAGE_TRANSFORM = {
  width: 240,
  height: 1600,
  resize: "cover" as const,
  quality: 56,
};

const STRIP_DETAIL_IMAGE_TRANSFORM = {
  width: 1600,
  height: 1200,
  resize: "cover" as const,
  quality: 72,
};

const COLLAPSE_IMAGE_TRANSFORM = {
  width: 1280,
  height: 1100,
  resize: "cover" as const,
  quality: 62,
};

async function resolveGalleryRowUrls(
  rows: Array<{ image_url: string | null }>,
  transform: typeof STRIP_IMAGE_TRANSFORM,
) {
  return resolveStorageUrlsWithTransform(
    rows.map((row) => row.image_url),
    transform,
  );
}

let cachedAssets: MyGoTwoGalleryAssets | null = null;
let inflightAssetPromise: Promise<MyGoTwoGalleryAssets> | null = null;
let cachedRows: AssignedAssetRow[] | null = null;
let inflightRowsPromise: Promise<AssignedAssetRow[]> | null = null;

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

function cloneRows(rows: AssignedAssetRow[]) {
  return rows.map((row) => ({ ...row }));
}

async function fetchAssignedRows(options?: { force?: boolean }) {
  if (!options?.force && cachedRows) {
    return cloneRows(cachedRows);
  }

  if (inflightRowsPromise) {
    return inflightRowsPromise.then(cloneRows);
  }

  inflightRowsPromise = Promise.resolve(
    supabase
      .from("category_images")
      .select("category_key, image_url")
      .eq("gender", "male")
      .in("category_key", SLOT_KEYS)
  )
    .then(({ data, error }) => {
      if (error) {
        throw error;
      }

      const rows = (data ?? []).filter((row) => Boolean(row.image_url));
      cachedRows = cloneRows(rows);
      return cloneRows(rows);
    })
    .finally(() => {
      inflightRowsPromise = null;
    });

  return inflightRowsPromise.then(cloneRows);
}

async function buildAssignedAssets(
  rows: AssignedAssetRow[],
  options: {
    stripTransform: typeof STRIP_IMAGE_TRANSFORM;
    includeCollapse: boolean;
  },
) {
  const stripRows = rows.filter((row) =>
    row.category_key ? Boolean(getMyGoTwoCategoryTargetByStripKey(row.category_key)) : false,
  );
  const cardRows = rows.filter((row) =>
    row.category_key ? Boolean(getMyGoTwoCategoryTargetByCardKey(row.category_key)) : false,
  );
  const collapseRows = rows.filter((row) =>
    row.category_key?.startsWith("mygotwo-collapse-"),
  );
  const [stripUrls, cardUrls, collapseUrls] = await Promise.all([
    resolveGalleryRowUrls(stripRows, options.stripTransform),
    resolveGalleryRowUrls(cardRows, STRIP_DETAIL_IMAGE_TRANSFORM),
    options.includeCollapse
      ? resolveGalleryRowUrls(collapseRows, COLLAPSE_IMAGE_TRANSFORM)
      : Promise.resolve([]),
  ]);
  const stripResolvedByKey = new Map<string, string>();
  const cardResolvedByKey = new Map<string, string>();
  const collapseResolvedByKey = new Map<string, string>();

  stripRows.forEach((row, index) => {
    const resolvedStripUrl = stripUrls[index] ?? "";
    if (row.category_key) {
      if (resolvedStripUrl) {
        stripResolvedByKey.set(row.category_key, resolvedStripUrl);
      }
    }
  });

  cardRows.forEach((row, index) => {
    const resolvedCardUrl = cardUrls[index] ?? "";
    if (row.category_key && resolvedCardUrl) {
      cardResolvedByKey.set(row.category_key, resolvedCardUrl);
    }
  });

  collapseRows.forEach((row, index) => {
    const resolvedUrl = collapseUrls[index] ?? "";
    if (row.category_key && resolvedUrl) {
      collapseResolvedByKey.set(row.category_key, resolvedUrl);
    }
  });

  return {
    stripImages: MYGOTWO_STRIP_GALLERY_IMAGES.map((strip) => {
      const categoryTarget = getMyGoTwoCategoryTargetByStripId(strip.id);

      if (!categoryTarget) {
        return {
          ...strip,
          image: "",
          detailImage: "",
        };
      }

      const stripImage = stripResolvedByKey.get(categoryTarget.stripKey) || "";
      const detailImage =
        cardResolvedByKey.get(categoryTarget.cardKey) || stripImage;

      return {
        ...strip,
        image: stripImage,
        detailImage,
      };
    }),
    collapseImages: options.includeCollapse
      ? MYGOTWO_COLLAPSE_IMAGES.map((image, index) => ({
          ...image,
          image: collapseResolvedByKey.get(`mygotwo-collapse-${String(index + 1).padStart(2, "0")}`) || "",
        })).filter((image) => Boolean(image.image))
      : [],
  };
}

export async function loadMyGoTwoGalleryAssets(options?: {
  force?: boolean;
  quality?: "preview" | "full";
}) {
  const quality = options?.quality ?? "full";

  if (!options?.force && cachedAssets) {
    return getCachedMyGoTwoGalleryAssets() ?? createEmptyMyGoTwoGalleryAssets();
  }

  if (quality === "preview") {
    const rows = await fetchAssignedRows({ force: options?.force });
    return buildAssignedAssets(rows, {
      stripTransform: STRIP_PREVIEW_TRANSFORM,
      includeCollapse: false,
    });
  }

  if (inflightAssetPromise) {
    return inflightAssetPromise;
  }

  inflightAssetPromise = fetchAssignedRows({ force: options?.force })
    .then((rows) =>
      buildAssignedAssets(rows, {
        stripTransform: STRIP_IMAGE_TRANSFORM,
        includeCollapse: true,
      }),
    )
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

          image.onload = () => {
            if (typeof image.decode === "function") {
              image.decode().catch(() => undefined).finally(() => {
                complete(image.naturalWidth > 0);
              });
              return;
            }

            complete(image.naturalWidth > 0);
          };
          image.onerror = () => complete(false);
          image.src = url;

          if (image.complete) {
            if (image.naturalWidth <= 0) {
              complete(false);
              return;
            }

            if (typeof image.decode === "function") {
              image.decode().catch(() => undefined).finally(() => {
                complete(true);
              });
              return;
            }

            complete(true);
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
        ? { ...strip, image: "", detailImage: strip.detailImage || "" }
        : strip,
    ),
    collapseImages: assets.collapseImages.filter((image) => loadedUrls.has(image.image)),
  };
}

export async function resolveOverrideImageUrl(value?: string | null) {
  return resolveStorageUrl(value, 3600);
}

export async function resolveMyGoTwoOverrideImageUrl(
  imageKey: string,
  value?: string | null,
) {
  if (!value) {
    return "";
  }

  if (getMyGoTwoCategoryTargetByStripKey(imageKey)) {
    return resolveStorageUrlWithTransform(value, STRIP_IMAGE_TRANSFORM, 3600);
  }

  if (getMyGoTwoCategoryTargetByCardKey(imageKey)) {
    return resolveStorageUrlWithTransform(value, STRIP_DETAIL_IMAGE_TRANSFORM, 3600);
  }

  if (imageKey.startsWith("mygotwo-collapse-")) {
    return resolveStorageUrlWithTransform(value, COLLAPSE_IMAGE_TRANSFORM, 3600);
  }

  return resolveStorageUrl(value, 3600);
}

export function mergeOverrideIntoGalleryAssets(
  currentAssets: MyGoTwoGalleryAssets,
  imageKey: string,
  resolvedUrl: string,
): MyGoTwoGalleryAssets {
  const stripTarget = getMyGoTwoCategoryTargetByStripKey(imageKey);
  if (stripTarget) {
    const nextAssets = {
      ...currentAssets,
      stripImages: currentAssets.stripImages.map((strip) =>
        strip.id === stripTarget.id
          ? {
              ...strip,
              image: resolvedUrl,
              detailImage: strip.detailImage || resolvedUrl,
            }
          : strip,
      ),
    };
    setCachedAssets(nextAssets);
    return nextAssets;
  }

  const cardTarget = getMyGoTwoCategoryTargetByCardKey(imageKey);
  if (cardTarget) {
    const nextAssets = {
      ...currentAssets,
      stripImages: currentAssets.stripImages.map((strip) =>
        strip.id === cardTarget.id
          ? {
              ...strip,
              detailImage: resolvedUrl || strip.image,
            }
          : strip,
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
