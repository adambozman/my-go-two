import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import { resolveStorageUrls } from "@/lib/storageRefs";
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

export default function MyGoTwoStripGalleryAsset() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);
  const [collapseImageIndex, setCollapseImageIndex] = useState(0);
  const [stripImages, setStripImages] = useState(() => MYGOTWO_STRIP_GALLERY_IMAGES);
  const [collapseImages, setCollapseImages] = useState(() => MYGOTWO_COLLAPSE_IMAGES);
  const hoverTimerRef = useRef<number | null>(null);
  const collapseTimerRef = useRef<number | null>(null);
  const rotateTimerRef = useRef<number | null>(null);

  const loadAssignedImages = useCallback(async () => {
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
    const urls = await resolveStorageUrls(rows.map((row) => row.image_url));
    const resolvedByKey = new Map<string, string>();

    rows.forEach((row, index) => {
      const resolvedUrl = urls[index] ?? "";
      if (row.category_key && resolvedUrl) {
        resolvedByKey.set(row.category_key, resolvedUrl);
      }
    });

    setStripImages(
      MYGOTWO_STRIP_GALLERY_IMAGES.map((strip) => ({
        ...strip,
        image: resolvedByKey.get(`mygotwo-strip-${strip.id}`) || strip.image,
      })),
    );

    setCollapseImages(
      MYGOTWO_COLLAPSE_IMAGES.map((image, index) => ({
        ...image,
        image: resolvedByKey.get(`mygotwo-collapse-${String(index + 1).padStart(2, "0")}`) || image.image,
      })),
    );
  }, []);

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

  const activePanoramaUrl =
    collapseImages[collapseImageIndex % collapseImages.length]?.image || "";

  useEffect(() => {
    void loadAssignedImages();

    const handler = () => {
      void loadAssignedImages();
    };

    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, [loadAssignedImages]);

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
            opacity: 1,
            transition: "opacity 320ms ease",
          }}
        >
          {strips.map((strip) => {
            const isHovered = strip.id === hoveredId;
            const collapseCategoryStrip = Boolean(previewCollapsed && strip.label && !hoveredId);
            const showPanorama = previewCollapsed && strip.isPanoramaStrip;

            return (
              <div
                key={strip.id}
                aria-label={`Strip ${strip.id}`}
                onMouseEnter={() => queueHoveredId(strip.id)}
                className="relative h-full shrink-0 overflow-hidden transition-[flex-grow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                style={{
                  flexBasis: 0,
                  flexGrow: collapseCategoryStrip
                    ? 0.0001
                    : showPanorama
                      ? 1.55
                      : isHovered
                        ? 3.35
                        : hoveredId
                          ? 0.58
                          : 1,
                  minWidth: collapseCategoryStrip
                    ? "0px"
                    : showPanorama
                      ? "clamp(12px, 2.4vw, 22px)"
                      : isHovered
                        ? "clamp(60px, 10.5vw, 94px)"
                        : "clamp(12px, 2.4vw, 22px)",
                  contain: "layout paint style",
                  transform: isHovered ? "translateY(-2px)" : "translateY(0)",
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
                      transform: isHovered ? "scale(1.015)" : "scale(1)",
                    }}
                  />
                ) : null}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(23,18,14,0.18) 0%, rgba(23,18,14,0.08) 34%, rgba(23,18,14,0.24) 100%)",
                    opacity: isHovered ? 0.48 : 0.7,
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
          })}
        </div>
      </div>
    </section>
  );
}
