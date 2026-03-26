import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image as ImageIcon, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  makeStorageRef,
  parseStorageRef,
  resolveStorageUrl,
  resolveStorageUrls,
  toStorageRefIfPossible,
} from "@/lib/storageRefs";
import {
  getWebsiteAssetAssignments,
  setWebsiteAssetAssignment,
} from "@/lib/websiteAssetAssignments";
import { MYGOTWO_STRIP_GALLERY_IMAGES } from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

type BankPhoto = {
  id: string;
  image_url: string;
  filename: string | null;
  display_url: string;
};

function stripImageKey(id: string) {
  return `mygotwo-strip-${id}`;
}

const imagePreloadCache = new Map<string, Promise<void>>();
const STRIP_NOISE_TEXTURE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E";

async function preloadImage(url: string) {
  const cached = imagePreloadCache.get(url);
  if (cached) {
    await cached;
    return;
  }

  const preloadPromise = new Promise<void>((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      if (typeof image.decode === "function") {
        image.decode().then(resolve).catch(resolve);
        return;
      }
      resolve();
    };
    image.onerror = () => {
      imagePreloadCache.delete(url);
      reject(new Error(`Failed to preload image: ${url}`));
    };
    image.src = url;
  });

  imagePreloadCache.set(url, preloadPromise);
  await preloadPromise;
}

export default function MyGoTwoStripGalleryAsset() {
  const BANK_PAGE_SIZE = 10;
  const isDev = import.meta.env.DEV;
  const { user } = useAuth();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedStripId, setSelectedStripId] = useState<string | null>(null);
  const [loadingBank, setLoadingBank] = useState(false);
  const [loadingOverrides, setLoadingOverrides] = useState(false);
  const [bankPhotos, setBankPhotos] = useState<BankPhoto[]>([]);
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});
  const [assignedAssetKeys, setAssignedAssetKeys] = useState<Set<string>>(() => new Set());
  const [bankPage, setBankPage] = useState(0);
  const hoverTimerRef = useRef<number | null>(null);

  const strips = useMemo(() => MYGOTWO_STRIP_GALLERY_IMAGES, []);

  const loadOverrides = useCallback(async () => {
    if (!user) {
      setImageOverrides({});
      setAssignedAssetKeys(new Set());
      return;
    }

    setLoadingOverrides(true);
    try {
      const assignments = await getWebsiteAssetAssignments(
        strips.map((strip) => stripImageKey(strip.id)),
      );

      setAssignedAssetKeys(new Set(assignments.map((assignment) => assignment.assetKey)));

      const resolvedUrls = await resolveStorageUrls(
        assignments.map((assignment) => assignment.imageUrl),
      );
      const resolvedAssignments = assignments.map((assignment, index) => ({
        assetKey: assignment.assetKey,
        imageUrl: resolvedUrls[index] || "",
      }));

      await Promise.all(
        resolvedAssignments
          .filter((assignment) => assignment.imageUrl)
          .map(async (assignment) => {
            try {
              await preloadImage(assignment.imageUrl);
            } catch (error) {
              console.warn("strip override preload failed", error);
            }
          }),
      );

      const nextOverrides = resolvedAssignments.reduce<Record<string, string>>((accumulator, assignment) => {
        if (assignment.imageUrl) {
          accumulator[assignment.assetKey] = assignment.imageUrl;
        }
        return accumulator;
      }, {});

      setImageOverrides(nextOverrides);
    } catch (error) {
      console.warn("website asset assignments load failed", error);
      setImageOverrides({});
      setAssignedAssetKeys(new Set());
    } finally {
      setLoadingOverrides(false);
    }
  }, [strips, user]);

  const loadBank = useCallback(async () => {
    setLoadingBank(true);
    try {
      const { data, error } = await supabase
        .from("category_bank_photos")
        .select("id, image_url, filename")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      const rows = (data ?? []) as Array<{
        id: string;
        image_url: string;
        filename: string | null;
      }>;

      const resolvedUrls = await resolveStorageUrls(rows.map((photo) => photo.image_url));
      const resolvedRows = rows.map((photo, index) => ({
        ...photo,
        display_url: resolvedUrls[index] || "",
      }));

      setBankPhotos(resolvedRows);
    } catch (error) {
      console.warn("category bank load failed", error);
      setBankPhotos([]);
    } finally {
      setLoadingBank(false);
    }
  }, []);

  useEffect(() => {
    void loadOverrides();
    if (isDev) {
      void loadBank();
    }
  }, [isDev, loadBank, loadOverrides]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const assignPhoto = useCallback(
    async (photo: BankPhoto) => {
      if (!selectedStripId || !user) return;

      const assetKey = stripImageKey(selectedStripId);
      const previousImageUrl = imageOverrides[assetKey];
      const sourceRef = parseStorageRef(toStorageRefIfPossible(photo.image_url));
      const sourceUrl = await resolveStorageUrl(photo.image_url, 3600);

      if (!sourceUrl) return;

      const response = await fetch(sourceUrl);
      const blob = await response.blob();

      const sourceExt = sourceRef?.path.split(".").pop() || photo.filename?.split(".").pop() || "jpg";
      const targetPath = `${assetKey}/${Date.now()}.${sourceExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images-mygotwo-strip")
        .upload(targetPath, blob, { contentType: blob.type || "image/jpeg", upsert: false });

      if (uploadError) {
        console.warn("strip bucket upload failed", uploadError);
        return;
      }

      const targetRef = makeStorageRef("images-mygotwo-strip", targetPath);
      const targetUrl = await resolveStorageUrl(targetRef, 3600);
      if (!targetUrl) {
        return;
      }
      await preloadImage(targetUrl);
      const nextOverrides = {
        ...imageOverrides,
        [assetKey]: targetUrl,
      };

      setImageOverrides(nextOverrides);
      setAssignedAssetKeys((current) => {
        const next = new Set(current);
        next.add(assetKey);
        return next;
      });

      try {
        await setWebsiteAssetAssignment({
          assetKey,
          bankPhotoId: photo.id,
          imageUrl: targetRef,
        });
        setSelectedStripId(null);
      } catch (error) {
        const rollbackOverrides = { ...imageOverrides };
        if (previousImageUrl) {
          rollbackOverrides[assetKey] = previousImageUrl;
        } else {
          delete rollbackOverrides[assetKey];
        }
        setImageOverrides(rollbackOverrides);
        console.warn("website asset assignment save failed", error);
      }
    },
    [imageOverrides, selectedStripId, user],
  );

  const queueHoveredId = useCallback((nextId: string | null) => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
    }

    hoverTimerRef.current = window.setTimeout(() => {
      setHoveredId(nextId);
      hoverTimerRef.current = null;
    }, 90);
  }, []);

  const totalBankPages = Math.max(1, Math.ceil(bankPhotos.length / BANK_PAGE_SIZE));
  const visibleBankPhotos = bankPhotos.slice(
    bankPage * BANK_PAGE_SIZE,
    (bankPage + 1) * BANK_PAGE_SIZE,
  );

  useEffect(() => {
    setBankPage((current) => Math.min(current, totalBankPages - 1));
  }, [totalBankPages]);

  return (
    <section
      aria-label="Strip gallery asset"
      className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-3 sm:py-4 md:py-6"
    >
      <div
        className="h-full w-full overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.58)] shadow-[0_18px_44px_rgba(41,32,24,0.16)]"
        style={{
          maxWidth: "1480px",
          maxHeight: "min(900px, 100%)",
          minHeight: "clamp(360px, 56vh, 900px)",
        }}
      >
        <div
          className="flex h-full w-full items-stretch gap-[3px] overflow-hidden sm:gap-[4px] md:gap-[6px]"
          onMouseLeave={() => queueHoveredId(null)}
        >
          {strips.map((strip) => {
            const isHovered = strip.id === hoveredId;
            const isSelected = strip.id === selectedStripId;
            const imageKey = stripImageKey(strip.id);
            const hasSavedOverride = assignedAssetKeys.has(imageKey);
            const resolvedOverrideUrl = imageOverrides[imageKey];
            const imageUrl = resolvedOverrideUrl || (hasSavedOverride ? "" : strip.image);
            const showPlaceholder = hasSavedOverride && !resolvedOverrideUrl;

            return (
              <div
                key={strip.id}
                aria-label={`Strip ${strip.id}`}
                onMouseEnter={() => queueHoveredId(strip.id)}
                className="relative h-full shrink-0 overflow-hidden transition-[flex-grow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                style={{
                  flexBasis: 0,
                  flexGrow: isHovered ? 3.35 : hoveredId ? 0.58 : 1,
                  minWidth: isHovered ? "clamp(60px, 10.5vw, 94px)" : "clamp(12px, 2.4vw, 22px)",
                  contain: "layout paint style",
                  transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                {imageUrl ? (
                  <img
                    aria-hidden="true"
                    alt=""
                    src={imageUrl}
                    decoding="async"
                    loading="eager"
                    fetchPriority={isHovered ? "high" : "auto"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      objectPosition: `${strip.align ?? "50%"} center`,
                      transform: isHovered ? "scale(1.015)" : "scale(1)",
                    }}
                  />
                ) : null}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    background: showPlaceholder
                      ? "linear-gradient(180deg, rgba(248,242,233,0.92) 0%, rgba(231,220,206,0.92) 100%)"
                      : "linear-gradient(180deg, rgba(23,18,14,0.18) 0%, rgba(23,18,14,0.08) 34%, rgba(23,18,14,0.24) 100%)",
                    opacity: showPlaceholder ? 1 : isHovered ? 0.48 : 0.7,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{
                    backgroundImage: `url("${STRIP_NOISE_TEXTURE}")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                    opacity: showPlaceholder ? 0.1 : isHovered ? 0.14 : 0.18,
                  }}
                />
                {isDev ? (
                  <button
                    type="button"
                    aria-label={`Edit strip ${strip.id}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedStripId(strip.id);
                      setBankPage(0);
                    }}
                    className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border shadow-[0_6px_18px_rgba(41,32,24,0.14)] backdrop-blur-[12px]"
                    style={{
                      borderColor: isSelected ? "rgba(226,89,52,0.72)" : "rgba(255,255,255,0.6)",
                      background: isSelected
                        ? "rgba(226,89,52,0.92)"
                        : "rgba(248,242,233,0.86)",
                      color: isSelected ? "#fff7f1" : "#2c2925",
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                ) : null}
                {strip.label ? (
                  <span
                    className="pointer-events-none absolute bottom-2 left-1/2 z-10 text-[9px] font-medium uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.42)] sm:bottom-3 sm:text-[10px] md:bottom-4 md:text-[12px] md:tracking-[0.2em]"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "translateX(-50%) rotate(180deg)",
                    }}
                  >
                    {strip.label}
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[1px] bg-white/85"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 w-[1px] bg-white/85"
                />
              </div>
            );
          })}
        </div>
      </div>
      {isDev && selectedStripId ? (
        <div className="absolute bottom-6 right-6 z-30 w-[min(560px,calc(100vw-2rem))] rounded-[24px] border border-[rgba(255,255,255,0.58)] bg-[rgba(248,242,233,0.94)] p-4 shadow-[0_24px_60px_rgba(41,32,24,0.2)] backdrop-blur-[18px]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#2c2925]">Edit Strip {selectedStripId}</p>
              <p className="text-xs text-[#6d655d]">
                Choose a bank image to replace this strip.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => void loadBank()}
                disabled={loadingBank}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingBank ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setSelectedStripId(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid max-h-[48vh] grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-4">
            {loadingOverrides || loadingBank ? (
              <div className="col-span-full py-8 text-center text-sm text-[#6d655d]">Loading bank...</div>
            ) : bankPhotos.length === 0 ? (
              <div className="col-span-full py-8 text-center text-sm text-[#6d655d]">
                No bank images yet. Upload them in Photo Gallery first.
              </div>
            ) : (
              visibleBankPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => void assignPhoto(photo)}
                  className="overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.58)] bg-white/60 text-left shadow-[0_10px_24px_rgba(41,32,24,0.1)] transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="aspect-[4/5] bg-[#e8dfd2]">
                    <img src={photo.display_url} alt={photo.filename ?? photo.id} className="h-full w-full object-cover" />
                  </div>
                  <div className="px-2.5 py-2">
                    <p className="truncate text-[11px] font-medium text-[#2c2925]">
                      {photo.filename || photo.id}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
          {!loadingOverrides && !loadingBank && bankPhotos.length > BANK_PAGE_SIZE ? (
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs text-[#6d655d]">
                Page {bankPage + 1} of {totalBankPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBankPage((current) => Math.max(0, current - 1))}
                  disabled={bankPage === 0}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setBankPage((current) => Math.min(totalBankPages - 1, current + 1))
                  }
                  disabled={bankPage >= totalBankPages - 1}
                >
                  Next Page
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
