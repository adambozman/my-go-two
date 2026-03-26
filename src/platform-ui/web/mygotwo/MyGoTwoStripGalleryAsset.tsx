import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import { resolveStorageUrl, resolveStorageUrls } from "@/lib/storageRefs";
import {
  MYGOTWO_COLLAPSE_IMAGES,
  MYGOTWO_COLLAPSE_SLOT_TARGETS,
  MYGOTWO_STRIP_GALLERY_IMAGES,
  MYGOTWO_STRIP_SLOT_TARGETS,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

const PREVIEW_COLLAPSE_DELAY_MS = 5000;
const COLLAPSE_ROTATE_INTERVAL_MS = 10000;

type StripPresentation = {
  id: string;
  image: string;
  align?: string;
  label?: string;
  isPanoramaStrip: boolean;
  panoramaIndex: number;
};

const SLOT_KEYS = [
  ...MYGOTWO_STRIP_SLOT_TARGETS.map((target) => target.key),
  ...MYGOTWO_COLLAPSE_SLOT_TARGETS.map((target) => target.key),
];

type OverrideChangedDetail = {
  imageKey?: string;
  url?: string | null;
};

type StripCellProps = {
  strip: StripPresentation;
  hoveredCategoryId: string | null;
  previewCollapsed: boolean;
  hoveredId: string | null;
  activePanoramaUrl: string;
  panoramaStripCount: number;
  onHover: (id: string) => void;
};

const StripCell = memo(function StripCell({
  strip,
  hoveredCategoryId,
  previewCollapsed,
  hoveredId,
  activePanoramaUrl,
  panoramaStripCount,
  onHover,
}: StripCellProps) {
  const isHoveredCategory = strip.id === hoveredCategoryId;
  const categoryHoverActive = Boolean(hoveredCategoryId);
  const collapseCategoryStrip = Boolean(previewCollapsed && strip.label && !hoveredId);
  const showPanorama = strip.isPanoramaStrip;
  const expandPanoramaStrip = previewCollapsed && strip.isPanoramaStrip;

  return (
    <div
      aria-label={`Strip ${strip.id}`}
      onMouseEnter={() => onHover(strip.id)}
      className="relative h-full shrink-0 overflow-hidden transition-[flex-grow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
      style={{
        flexBasis: 0,
        flexGrow: collapseCategoryStrip
          ? 0.0001
          : expandPanoramaStrip
            ? 1.55
            : strip.isPanoramaStrip
              ? 1.35
              : isHoveredCategory
                ? 3.35
                : categoryHoverActive
                  ? 0.58
                  : 0.82,
        minWidth: collapseCategoryStrip
          ? "0px"
          : expandPanoramaStrip
            ? "clamp(12px, 2.4vw, 22px)"
            : strip.isPanoramaStrip
              ? "clamp(20px, 3.4vw, 34px)"
              : isHoveredCategory
                ? "clamp(60px, 10.5vw, 94px)"
                : "clamp(12px, 2.4vw, 22px)",
        contain: "layout paint style",
        transform: isHoveredCategory ? "translateY(-2px)" : "translateY(0)",
        opacity: collapseCategoryStrip ? 0 : 1,
        pointerEvents: collapseCategoryStrip ? "none" : "auto",
      }}
    >
      {showPanorama ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            backgroundImage: `url("${activePanoramaUrl}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${panoramaStripCount * 100}% 100%`,
            backgroundPosition:
              strip.panoramaIndex >= 0 && panoramaStripCount > 1
                ? `${(strip.panoramaIndex / (panoramaStripCount - 1)) * 100}% center`
                : "50% center",
            transform: "scale(1.02)",
          }}
        />
      ) : strip.image ? (
        <img
          aria-hidden="true"
          alt=""
          src={strip.image}
          decoding="async"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            objectPosition: `${strip.align ?? "50%"} center`,
            transform: isHoveredCategory ? "scale(1.015)" : "scale(1)",
          }}
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(23,18,14,0.18) 0%, rgba(23,18,14,0.08) 34%, rgba(23,18,14,0.24) 100%)",
          opacity: isHoveredCategory ? 0.48 : 0.7,
        }}
      />
      {strip.label ? (
        <span
          className="pointer-events-none absolute bottom-2 left-1/2 z-10 text-[9px] font-medium uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.42)] sm:bottom-3 sm:text-[10px] md:bottom-4 md:text-[12px] md:tracking-[0.2em]"
          style={{
            opacity: collapseCategoryStrip ? 0 : 1,
            transition: "opacity 260ms ease",
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
        style={{ opacity: collapseCategoryStrip ? 0 : 1, transition: "opacity 260ms ease" }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[1px] bg-white/85"
        style={{ opacity: collapseCategoryStrip ? 0 : 1, transition: "opacity 260ms ease" }}
      />
    </div>
  );
});

export default function MyGoTwoStripGalleryAsset() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);
  const [collapseImageIndex, setCollapseImageIndex] = useState(0);
  const [isInitialLoadPending, setIsInitialLoadPending] = useState(true);
  const [stripImages, setStripImages] = useState(() =>
    MYGOTWO_STRIP_GALLERY_IMAGES.map((strip) => ({
      ...strip,
      image: "",
    })),
  );
  const [collapseImages, setCollapseImages] = useState(() => [] as typeof MYGOTWO_COLLAPSE_IMAGES);
  const hoverTimerRef = useRef<number | null>(null);
  const collapseTimerRef = useRef<number | null>(null);
  const rotateTimerRef = useRef<number | null>(null);
  const assignmentSignatureRef = useRef("");
  const hasLoadedOnceRef = useRef(false);
  const stripImagesRef = useRef(stripImages);
  const collapseImagesRef = useRef(collapseImages);

  const commitAssignedImages = useCallback(
    (
      nextStripImages: typeof stripImages,
      nextCollapseImages: typeof collapseImages,
    ) => {
      const nextSignature = JSON.stringify({
        stripImages: nextStripImages.map((strip) => [strip.id, strip.image]),
        collapseImages: nextCollapseImages.map((image) => [image.id, image.image]),
      });

      if (assignmentSignatureRef.current === nextSignature) {
        return;
      }

      assignmentSignatureRef.current = nextSignature;
      stripImagesRef.current = nextStripImages;
      collapseImagesRef.current = nextCollapseImages;
      setStripImages(nextStripImages);
      setCollapseImages(nextCollapseImages);
    },
    [],
  );

  const loadAssignedImages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("category_images")
        .select("category_key, image_url")
        .eq("gender", "male")
        .in("category_key", SLOT_KEYS);

      if (error) {
        console.error("Failed to load My Go Two strip images:", error);
        return;
      }

      const rows = data ?? [];
      const rowsWithImages = rows.filter((row) => Boolean(row.image_url));
      const urls = await resolveStorageUrls(rowsWithImages.map((row) => row.image_url));
      const resolvedByKey = new Map<string, string>();

      rowsWithImages.forEach((row, index) => {
        const resolvedUrl = urls[index] ?? "";
        if (row.category_key && resolvedUrl) {
          resolvedByKey.set(row.category_key, resolvedUrl);
        }
      });

      const nextStripImages = MYGOTWO_STRIP_GALLERY_IMAGES.map((strip) => ({
        ...strip,
        image: resolvedByKey.get(`mygotwo-strip-${strip.id}`) || "",
      }));

      const assignedCollapseImages = MYGOTWO_COLLAPSE_IMAGES.map((image, index) => ({
        ...image,
        image: resolvedByKey.get(`mygotwo-collapse-${String(index + 1).padStart(2, "0")}`) || "",
      })).filter((image) => Boolean(image.image));

      commitAssignedImages(nextStripImages, assignedCollapseImages);
    } finally {
      if (!hasLoadedOnceRef.current) {
        hasLoadedOnceRef.current = true;
        window.requestAnimationFrame(() => {
          setIsInitialLoadPending(false);
        });
      }
    }
  }, [commitAssignedImages]);

  const strips = useMemo<StripPresentation[]>(() => {
    const panoramaIds = stripImages.filter((strip) => !strip.label).map((strip) => strip.id);
    const panoramaIdSet = new Set(panoramaIds);

    return stripImages.map((strip) => ({
      ...strip,
      isPanoramaStrip: panoramaIdSet.has(strip.id),
      panoramaIndex: panoramaIds.indexOf(strip.id),
    }));
  }, [stripImages]);

  const panoramaStripCount = useMemo(
    () => strips.filter((strip) => strip.isPanoramaStrip).length,
    [strips],
  );
  const hoveredStrip = useMemo(
    () => strips.find((strip) => strip.id === hoveredId) ?? null,
    [hoveredId, strips],
  );
  const hoveredCategoryId = hoveredStrip?.label ? hoveredStrip.id : null;

  const activePanoramaUrl =
    collapseImages.length > 0
      ? collapseImages[collapseImageIndex % collapseImages.length]?.image || ""
      : "";

  useEffect(() => {
    stripImagesRef.current = stripImages;
  }, [stripImages]);

  useEffect(() => {
    collapseImagesRef.current = collapseImages;
  }, [collapseImages]);

  useEffect(() => {
    void loadAssignedImages();

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<OverrideChangedDetail>).detail;
      const imageKey = detail?.imageKey ?? "";

      if (!imageKey || !SLOT_KEYS.includes(imageKey)) {
        void loadAssignedImages();
        return;
      }

      void (async () => {
        const resolvedUrl = detail?.url ? await resolveStorageUrl(detail.url, 3600) : "";

        if (imageKey.startsWith("mygotwo-strip-")) {
          const stripId = imageKey.slice("mygotwo-strip-".length);
          const nextStripImages = stripImagesRef.current.map((strip) =>
            strip.id === stripId ? { ...strip, image: resolvedUrl } : strip,
          );
          commitAssignedImages(nextStripImages, collapseImagesRef.current);
          return;
        }

        if (imageKey.startsWith("mygotwo-collapse-")) {
          const collapseId = `collapse-${imageKey.slice("mygotwo-collapse-".length)}`;
          const nextCollapseImages = resolvedUrl
            ? MYGOTWO_COLLAPSE_IMAGES.map((image) => {
                if (image.id === collapseId) {
                  return { ...image, image: resolvedUrl };
                }

                const existing = collapseImagesRef.current.find((current) => current.id === image.id);
                return existing ?? { ...image, image: "" };
              }).filter((image) => Boolean(image.image))
            : collapseImagesRef.current.filter((image) => image.id !== collapseId);
          commitAssignedImages(stripImagesRef.current, nextCollapseImages);
          return;
        }

        void loadAssignedImages();
      })();
    };

    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, [commitAssignedImages, loadAssignedImages]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        window.clearTimeout(hoverTimerRef.current);
      }
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current);
      }
      if (rotateTimerRef.current !== null) {
        window.clearInterval(rotateTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }

    if (hoveredId) {
      setPreviewCollapsed(false);
      return;
    }

    collapseTimerRef.current = window.setTimeout(() => {
      setPreviewCollapsed(true);
      collapseTimerRef.current = null;
    }, PREVIEW_COLLAPSE_DELAY_MS);

    return () => {
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current);
        collapseTimerRef.current = null;
      }
    };
  }, [hoveredId]);

  useEffect(() => {
    if (collapseImages.length === 0) {
      setCollapseImageIndex(0);
      return;
    }

    setCollapseImageIndex((current) => current % collapseImages.length);
  }, [collapseImages.length]);

  useEffect(() => {
    if (!previewCollapsed || collapseImages.length <= 1) {
      if (rotateTimerRef.current !== null) {
        window.clearInterval(rotateTimerRef.current);
        rotateTimerRef.current = null;
      }
      return;
    }

    rotateTimerRef.current = window.setInterval(() => {
      setCollapseImageIndex((current) => (current + 1) % collapseImages.length);
    }, COLLAPSE_ROTATE_INTERVAL_MS);

    return () => {
      if (rotateTimerRef.current !== null) {
        window.clearInterval(rotateTimerRef.current);
        rotateTimerRef.current = null;
      }
    };
  }, [collapseImages.length, previewCollapsed]);

  useEffect(() => {
    if (!previewCollapsed || collapseImages.length <= 1) {
      return;
    }

    const nextImage = collapseImages[(collapseImageIndex + 1) % collapseImages.length]?.image;
    if (!nextImage) {
      return;
    }

    const preloader = new window.Image();
    preloader.decoding = "async";
    preloader.src = nextImage;
  }, [collapseImageIndex, collapseImages, previewCollapsed]);

  const queueHoveredId = useCallback((nextId: string | null) => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
    }

    hoverTimerRef.current = window.setTimeout(() => {
      setHoveredId(nextId);
      hoverTimerRef.current = null;
    }, 90);
  }, []);

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
          className="relative flex h-full w-full items-stretch gap-[3px] overflow-hidden sm:gap-[4px] md:gap-[6px]"
          onMouseLeave={() => queueHoveredId(null)}
          style={{
            opacity: isInitialLoadPending ? 0 : 1,
            transition: "opacity 320ms ease",
          }}
        >
          {strips.map((strip) => (
            <StripCell
              key={strip.id}
              strip={strip}
              hoveredCategoryId={hoveredCategoryId}
              previewCollapsed={previewCollapsed}
              hoveredId={hoveredId}
              activePanoramaUrl={activePanoramaUrl}
              panoramaStripCount={panoramaStripCount}
              onHover={queueHoveredId}
            />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
          style={{
            opacity: isInitialLoadPending ? 1 : 0,
            background:
              "linear-gradient(135deg, rgba(248,242,233,0.96) 0%, rgba(244,236,228,0.92) 40%, rgba(248,242,233,0.96) 100%)",
          }}
        >
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0) 100%)",
              transform: "translateX(-18%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
