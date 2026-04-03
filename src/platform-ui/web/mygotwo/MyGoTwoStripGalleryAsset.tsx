import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "@/contexts/auth-context";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import MyProductCardBeverages from "@/platform-ui/web/mygotwo/MyProductCardBeverages";
import {
  applyLoadedUrlFilter,
  createEmptyMyGoTwoGalleryAssets,
  getCachedMyGoTwoGalleryAssets,
  getVisibleStageStripUrls,
  loadMyGoTwoGalleryAssets,
  mergeOverrideIntoGalleryAssets,
  preloadImageUrls,
  resolveOverrideImageUrl,
  type MyGoTwoGalleryAssets,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.data";

const PREVIEW_COLLAPSE_DELAY_MS = 5000;
const COLLAPSE_ROTATE_INTERVAL_MS = 10000;
const PANORAMA_TRANSITION_MS = 700;
const STRIP_TRANSITION_MS = 180;
const HOVER_DELAY_MS = 0;
const OVERLAY_TRANSITION_MS = 220;
const LOADER_EXIT_MS = 220;
const RETURN_SETTLE_MS = 700;

const STRIP_WEIGHT_EXPANDED = {
  labeled: 0.76,
  panorama: 1.12,
};

const STRIP_WEIGHT_HOVER = {
  target: 2.1,
  otherLabeled: 0.54,
  panorama: 0.92,
};

const STRIP_WEIGHT_COLLAPSED = {
  labeled: 0.0001,
  panorama: 1.7,
};

type StripPresentation = {
  id: string;
  image: string;
  align?: string;
  label?: string;
  isPanoramaStrip: boolean;
  panoramaIndex: number;
};

type CategoryOverlayContent = {
  title: string;
  description: string;
};

type OverrideChangedDetail = {
  imageKey?: string;
  url?: string | null;
};

const CATEGORY_OVERLAY_CONTENT: Record<string, CategoryOverlayContent> = {
  Beverages: {
    title: "Lock In Your Perfect Pour",
    description:
      "Cold brew kings, oat milk queens, and everyone in between.\nMega ice. Four shots of vanilla (three is for quitters). ...\nBuild your drink list once. Lock it in the vault. Share it with your person.",
  },
};

function nowMs() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

function getStripFlexGrow(
  strip: StripPresentation,
  previewCollapsed: boolean,
  hoveredId: string | null,
  hoveredCategoryId: string | null,
) {
  if (previewCollapsed && !hoveredId) {
    return strip.label
      ? STRIP_WEIGHT_COLLAPSED.labeled
      : STRIP_WEIGHT_COLLAPSED.panorama;
  }

  if (hoveredCategoryId) {
    if (strip.id === hoveredCategoryId) {
      return STRIP_WEIGHT_HOVER.target;
    }

    return strip.label
      ? STRIP_WEIGHT_HOVER.otherLabeled
      : STRIP_WEIGHT_HOVER.panorama;
  }

  return strip.label
    ? STRIP_WEIGHT_EXPANDED.labeled
    : STRIP_WEIGHT_EXPANDED.panorama;
}

function CategoryOverlay({
  category,
  isVisible,
  onBack,
}: {
  category: StripPresentation;
  isVisible: boolean;
  onBack: () => void;
}) {
  const { user } = useAuth();
  const overlayContent = category.label ? CATEGORY_OVERLAY_CONTENT[category.label] : null;

  return (
    <div
      className="absolute inset-0 z-20 transition-[opacity,transform] ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(18px)",
        transitionDuration: `${OVERLAY_TRANSITION_MS}ms`,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {category.image ? (
        <img
          src={category.image}
          alt={category.label}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: `${category.align ?? "50%"} center` }}
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: overlayContent
            ? "linear-gradient(90deg, rgba(17,14,12,0.7) 0%, rgba(17,14,12,0.5) 26%, rgba(17,14,12,0.14) 52%, rgba(17,14,12,0.46) 100%), radial-gradient(circle at 26% 28%, rgba(17,14,12,0.1) 0%, rgba(17,14,12,0.04) 22%, transparent 44%)"
            : "linear-gradient(180deg, rgba(23,18,14,0.18) 0%, rgba(23,18,14,0.08) 34%, rgba(23,18,14,0.24) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-start p-4 sm:p-5">
        <button
          type="button"
          onClick={onBack}
          className="pointer-events-auto rounded-full border border-white/60 bg-[rgba(23,18,14,0.36)] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[rgba(23,18,14,0.52)]"
        >
          Back
        </button>
      </div>
      {overlayContent ? (
        <div className="absolute inset-0 z-10">
          <div
            className="pointer-events-none absolute left-5 top-[17%] sm:left-8 md:left-10 lg:left-14"
            style={{
              right: "calc(clamp(480px, 37.5%, 560px) + clamp(0.875rem, 1.8vw, 1.5rem))",
            }}
          >
            <div className="mx-auto max-w-[min(31rem,72%)] text-center">
              <h2
                className="mx-auto max-w-[8ch] text-[clamp(3rem,5.2vw,4.85rem)] leading-[0.9] tracking-[-0.045em] text-white drop-shadow-[0_16px_34px_rgba(0,0,0,0.48)]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                }}
              >
                {overlayContent.title}
              </h2>
              <p
                className="mx-auto mt-7 max-w-[24rem] whitespace-pre-line text-[1rem] leading-[1.85] text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.42)] sm:text-[1.06rem]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {overlayContent.description}
              </p>
            </div>
          </div>
          <div className="absolute inset-0">
            <MyProductCardBeverages
              userId={user?.id ?? ""}
              activeEntry={null}
              onSaved={() => undefined}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

type StripCellProps = {
  strip: StripPresentation;
  hoveredId: string | null;
  hoveredCategoryId: string | null;
  previewCollapsed: boolean;
  panoramaBaseUrl: string;
  panoramaNextUrl: string;
  isPanoramaTransitioning: boolean;
  panoramaStripCount: number;
  showLeftDivider: boolean;
  showRightDivider: boolean;
  onHover: (id: string | null) => void;
  onClick: (strip: StripPresentation) => void;
};

const StripCell = memo(function StripCell({
  strip,
  hoveredId,
  hoveredCategoryId,
  previewCollapsed,
  panoramaBaseUrl,
  panoramaNextUrl,
  isPanoramaTransitioning,
  panoramaStripCount,
  showLeftDivider,
  showRightDivider,
  onHover,
  onClick,
}: StripCellProps) {
  const isHoveredCategory = strip.id === hoveredCategoryId;
  const collapseCategoryStrip = Boolean(previewCollapsed && strip.label && !hoveredId);
  const flexGrow = getStripFlexGrow(strip, previewCollapsed, hoveredId, hoveredCategoryId);

  return (
    <div
      aria-label={`Strip ${strip.id}`}
      onMouseEnter={() => onHover(strip.id)}
      onClick={() => onClick(strip)}
      className="relative h-full shrink-0 overflow-hidden transition-[flex-grow,opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        flexBasis: 0,
        flexGrow,
        minWidth: collapseCategoryStrip ? "0px" : "10px",
        opacity: collapseCategoryStrip ? 0 : 1,
        transform: isHoveredCategory ? "translateY(-1px)" : "translateY(0)",
        transitionDuration: `${STRIP_TRANSITION_MS}ms`,
        pointerEvents: collapseCategoryStrip ? "none" : "auto",
        cursor: strip.label ? "pointer" : "default",
        willChange: "flex-grow, opacity, transform",
        contain: "paint",
      }}
    >
      {strip.isPanoramaStrip ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${panoramaBaseUrl}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${panoramaStripCount * 100}% 100%`,
              backgroundPosition:
                strip.panoramaIndex >= 0 && panoramaStripCount > 1
                  ? `${(strip.panoramaIndex / (panoramaStripCount - 1)) * 100}% center`
                  : "50% center",
            }}
          />
          {panoramaNextUrl ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                backgroundImage: `url("${panoramaNextUrl}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${panoramaStripCount * 100}% 100%`,
                backgroundPosition:
                  strip.panoramaIndex >= 0 && panoramaStripCount > 1
                    ? `${(strip.panoramaIndex / (panoramaStripCount - 1)) * 100}% center`
                    : "50% center",
                opacity: isPanoramaTransitioning ? 1 : 0,
                transitionDuration: `${PANORAMA_TRANSITION_MS}ms`,
              }}
            />
          ) : null}
        </>
      ) : strip.image ? (
        <img
          aria-hidden="true"
          alt=""
          src={strip.image}
          decoding="async"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover transition-transform ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            objectPosition: `${strip.align ?? "50%"} center`,
            transform: isHoveredCategory ? "scale(1.01)" : "scale(1)",
            transitionDuration: `${STRIP_TRANSITION_MS}ms`,
            willChange: "transform",
          }}
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(23,18,14,0.18) 0%, rgba(23,18,14,0.08) 34%, rgba(23,18,14,0.24) 100%)",
          opacity: isHoveredCategory ? 0.48 : 0.68,
          transitionDuration: `${STRIP_TRANSITION_MS}ms`,
        }}
      />
      {strip.label ? (
        <span
          className="pointer-events-none absolute bottom-2 left-1/2 z-10 text-[11px] font-medium uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.42)] sm:bottom-3 sm:text-[12px] md:bottom-4 md:text-[14px] md:tracking-[0.2em]"
          style={{
            opacity: collapseCategoryStrip ? 0 : 1,
            transition: `opacity ${STRIP_TRANSITION_MS}ms ease`,
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
        style={{
          opacity: collapseCategoryStrip || !showLeftDivider ? 0 : 1,
          transition: `opacity ${STRIP_TRANSITION_MS}ms ease`,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[1px] bg-white/85"
        style={{
          opacity: collapseCategoryStrip || !showRightDivider ? 0 : 1,
          transition: `opacity ${STRIP_TRANSITION_MS}ms ease`,
        }}
      />
    </div>
  );
});

export default function MyGoTwoStripGalleryAsset() {
  const cachedAssets = getCachedMyGoTwoGalleryAssets() ?? createEmptyMyGoTwoGalleryAssets();
  const hasCachedStage = cachedAssets.stripImages.some((strip) => Boolean(strip.image));
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [closingCategoryId, setClosingCategoryId] = useState<string | null>(null);
  const [collapseImageIndex, setCollapseImageIndex] = useState(0);
  const [panoramaBaseUrl, setPanoramaBaseUrl] = useState(cachedAssets.collapseImages[0]?.image || "");
  const [panoramaNextUrl, setPanoramaNextUrl] = useState("");
  const [isPanoramaTransitioning, setIsPanoramaTransitioning] = useState(false);
  const [isInitialLoadPending, setIsInitialLoadPending] = useState(!hasCachedStage);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const [stripImages, setStripImages] = useState(() => cachedAssets.stripImages);
  const [collapseImages, setCollapseImages] = useState(() => cachedAssets.collapseImages);
  const [returnHoldVersion, setReturnHoldVersion] = useState(0);
  const currentAssetsRef = useRef<MyGoTwoGalleryAssets>(cachedAssets);
  const hoverTimerRef = useRef<number | null>(null);
  const collapseTimerRef = useRef<number | null>(null);
  const rotateTimerRef = useRef<number | null>(null);
  const panoramaTransitionTimerRef = useRef<number | null>(null);
  const overlayTimerRef = useRef<number | null>(null);
  const returnHoverTimerRef = useRef<number | null>(null);
  const loaderExitTimerRef = useRef<number | null>(null);
  const loadRunIdRef = useRef(0);
  const returnHoldUntilRef = useRef(0);
  const bootHydratedRef = useRef(false);

  const commitAssets = useCallback((nextAssets: MyGoTwoGalleryAssets, nonUrgent = false) => {
    currentAssetsRef.current = nextAssets;

    const apply = () => {
      setStripImages(nextAssets.stripImages);
      setCollapseImages(nextAssets.collapseImages);
    };

    if (nonUrgent) {
      startTransition(apply);
      return;
    }

    apply();
  }, []);

  const clearLoader = useCallback(() => {
    if (!isInitialLoadPending) {
      return;
    }

    if (loaderExitTimerRef.current !== null) {
      window.clearTimeout(loaderExitTimerRef.current);
    }

    setIsLoaderExiting(true);
    loaderExitTimerRef.current = window.setTimeout(() => {
      setIsInitialLoadPending(false);
      setIsLoaderExiting(false);
      loaderExitTimerRef.current = null;
    }, LOADER_EXIT_MS);
  }, [isInitialLoadPending]);

  const warmCollapseAssets = useCallback(
    async (runId: number, assets: MyGoTwoGalleryAssets, alreadyLoadedUrls: Set<string>) => {
      const collapseLoadedUrls = await preloadImageUrls(assets.collapseImages.map((image) => image.image));
      if (runId !== loadRunIdRef.current) {
        return;
      }

      const loadedUrls = new Set([...alreadyLoadedUrls, ...collapseLoadedUrls]);
      const nextAssets = applyLoadedUrlFilter(assets, loadedUrls);
      commitAssets(nextAssets, true);
      setCollapseImageIndex((current) => (
        nextAssets.collapseImages.length > 0 ? current % nextAssets.collapseImages.length : 0
      ));
      setPanoramaBaseUrl((current) => current || nextAssets.collapseImages[0]?.image || "");
    },
    [commitAssets],
  );

  const hydrateGalleryAssets = useCallback(
    async ({
      force = false,
      showLoader = false,
    }: {
      force?: boolean;
      showLoader?: boolean;
    }) => {
      const runId = ++loadRunIdRef.current;

      if (showLoader) {
        setIsInitialLoadPending(true);
        setIsLoaderExiting(false);
      }

      try {
        if (showLoader) {
          const previewAssets = await loadMyGoTwoGalleryAssets({
            force,
            quality: "preview",
          });
          if (runId !== loadRunIdRef.current) {
            return;
          }

          commitAssets(
            {
              stripImages: previewAssets.stripImages,
              collapseImages: currentAssetsRef.current.collapseImages,
            },
            false,
          );
        }

        const assets = await loadMyGoTwoGalleryAssets({ force, quality: "full" });
        const loadedVisibleUrls = await preloadImageUrls(getVisibleStageStripUrls(assets));
        if (runId !== loadRunIdRef.current) {
          return;
        }

        const nextStripImages = assets.stripImages.map((strip) =>
          strip.image && !loadedVisibleUrls.has(strip.image)
            ? { ...strip, image: "" }
            : strip,
        );

        commitAssets(
          {
            stripImages: nextStripImages,
            collapseImages: currentAssetsRef.current.collapseImages,
          },
          !showLoader,
        );

        if (showLoader) {
          clearLoader();
        }

        void warmCollapseAssets(runId, assets, loadedVisibleUrls);
      } catch (error) {
        console.error("Failed to load My Go Two strip images:", error);
        if (showLoader) {
          clearLoader();
        }
      }
    },
    [clearLoader, commitAssets, warmCollapseAssets],
  );

  const strips = useMemo<StripPresentation[]>(() => {
    const panoramaIds = stripImages.filter((strip) => !strip.label).map((strip) => strip.id);
    const panoramaIdSet = new Set(panoramaIds);

    return stripImages.map((strip) => ({
      ...strip,
      isPanoramaStrip: panoramaIdSet.has(strip.id),
      panoramaIndex: panoramaIds.indexOf(strip.id),
    }));
  }, [stripImages]);

  const hoveredStrip = useMemo(
    () => strips.find((strip) => strip.id === hoveredId) ?? null,
    [hoveredId, strips],
  );
  const hoveredCategoryId = hoveredStrip?.label ? hoveredStrip.id : null;
  const panoramaStripCount = useMemo(
    () => strips.filter((strip) => strip.isPanoramaStrip).length,
    [strips],
  );
  const activeCategory = useMemo(
    () => strips.find((strip) => strip.id === activeCategoryId && strip.label) ?? null,
    [activeCategoryId, strips],
  );
  const closingCategory = useMemo(
    () => strips.find((strip) => strip.id === closingCategoryId && strip.label) ?? null,
    [closingCategoryId, strips],
  );
  const overlayCategory = activeCategory ?? closingCategory;
  const activePanoramaUrl =
    collapseImages.length > 0
      ? collapseImages[collapseImageIndex % collapseImages.length]?.image || ""
      : "";
  const showLoaderOverlay = isInitialLoadPending || isLoaderExiting;

  useEffect(() => {
    if (bootHydratedRef.current) {
      return;
    }

    bootHydratedRef.current = true;

    void hydrateGalleryAssets({
      force: !hasCachedStage,
      showLoader: !hasCachedStage,
    });
  }, [hasCachedStage, hydrateGalleryAssets]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<OverrideChangedDetail>).detail;
      const imageKey = detail?.imageKey ?? "";

      if (!imageKey) {
        void hydrateGalleryAssets({ force: true, showLoader: false });
        return;
      }

      void (async () => {
        const resolvedUrl = detail?.url ? await resolveOverrideImageUrl(detail.url) : "";
        let nextResolvedUrl = resolvedUrl;

        if (resolvedUrl) {
          const loadedUrls = await preloadImageUrls([resolvedUrl]);
          nextResolvedUrl = loadedUrls.has(resolvedUrl) ? resolvedUrl : "";
        }

        const nextAssets = mergeOverrideIntoGalleryAssets(
          currentAssetsRef.current,
          imageKey,
          nextResolvedUrl,
        );

        commitAssets(nextAssets, true);
        setPanoramaBaseUrl((current) => current || nextAssets.collapseImages[0]?.image || "");
      })();
    };

    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, [commitAssets, hydrateGalleryAssets]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) window.clearTimeout(hoverTimerRef.current);
      if (collapseTimerRef.current !== null) window.clearTimeout(collapseTimerRef.current);
      if (rotateTimerRef.current !== null) window.clearInterval(rotateTimerRef.current);
      if (panoramaTransitionTimerRef.current !== null) {
        window.clearTimeout(panoramaTransitionTimerRef.current);
      }
      if (overlayTimerRef.current !== null) window.clearTimeout(overlayTimerRef.current);
      if (returnHoverTimerRef.current !== null) window.clearTimeout(returnHoverTimerRef.current);
      if (loaderExitTimerRef.current !== null) window.clearTimeout(loaderExitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }

    if (
      isInitialLoadPending ||
      activeCategoryId ||
      closingCategoryId ||
      hoveredCategoryId ||
      collapseImages.length === 0
    ) {
      setPreviewCollapsed(false);
      return;
    }

    const holdRemaining = returnHoldUntilRef.current - nowMs();
    if (holdRemaining > 0) {
      setPreviewCollapsed(false);
      collapseTimerRef.current = window.setTimeout(() => {
        setReturnHoldVersion((current) => current + 1);
        collapseTimerRef.current = null;
      }, holdRemaining);
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
  }, [
    activeCategoryId,
    closingCategoryId,
    collapseImages.length,
    hoveredCategoryId,
    isInitialLoadPending,
    returnHoldVersion,
  ]);

  useEffect(() => {
    if (collapseImages.length === 0) {
      setCollapseImageIndex(0);
      return;
    }

    setCollapseImageIndex((current) => current % collapseImages.length);
  }, [collapseImages.length]);

  useEffect(() => {
    if (!activePanoramaUrl) {
      if (panoramaTransitionTimerRef.current !== null) {
        window.clearTimeout(panoramaTransitionTimerRef.current);
        panoramaTransitionTimerRef.current = null;
      }
      setPanoramaBaseUrl("");
      setPanoramaNextUrl("");
      setIsPanoramaTransitioning(false);
      return;
    }

    if (!panoramaBaseUrl) {
      setPanoramaBaseUrl(activePanoramaUrl);
      setPanoramaNextUrl("");
      setIsPanoramaTransitioning(false);
      return;
    }

    if (activePanoramaUrl === panoramaBaseUrl) {
      return;
    }

    if (panoramaTransitionTimerRef.current !== null) {
      window.clearTimeout(panoramaTransitionTimerRef.current);
      panoramaTransitionTimerRef.current = null;
    }

    setPanoramaNextUrl(activePanoramaUrl);
    setIsPanoramaTransitioning(true);

    panoramaTransitionTimerRef.current = window.setTimeout(() => {
      setPanoramaBaseUrl(activePanoramaUrl);
      setPanoramaNextUrl("");
      setIsPanoramaTransitioning(false);
      panoramaTransitionTimerRef.current = null;
    }, PANORAMA_TRANSITION_MS);
  }, [activePanoramaUrl, panoramaBaseUrl]);

  useEffect(() => {
    if (
      isInitialLoadPending ||
      !previewCollapsed ||
      collapseImages.length <= 1 ||
      activeCategoryId ||
      closingCategoryId
    ) {
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
  }, [activeCategoryId, closingCategoryId, collapseImages.length, isInitialLoadPending, previewCollapsed]);

  useEffect(() => {
    if (isInitialLoadPending || !previewCollapsed || collapseImages.length <= 1) {
      return;
    }

    const nextImage = collapseImages[(collapseImageIndex + 1) % collapseImages.length]?.image;
    if (!nextImage) {
      return;
    }

    const preloader = new window.Image();
    preloader.decoding = "async";
    preloader.src = nextImage;
  }, [collapseImageIndex, collapseImages, isInitialLoadPending, previewCollapsed]);

  const queueHoveredId = useCallback((nextId: string | null) => {
    if (isInitialLoadPending || activeCategoryId || closingCategoryId) {
      return;
    }

    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
    }

    if (HOVER_DELAY_MS <= 0) {
      setHoveredId(nextId);
      return;
    }

    hoverTimerRef.current = window.setTimeout(() => {
      setHoveredId(nextId);
      hoverTimerRef.current = null;
    }, HOVER_DELAY_MS);
  }, [activeCategoryId, closingCategoryId, isInitialLoadPending]);

  const handleStripClick = useCallback((strip: StripPresentation) => {
    if (isInitialLoadPending || !strip.label) {
      return;
    }

    if (overlayTimerRef.current !== null) {
      window.clearTimeout(overlayTimerRef.current);
      overlayTimerRef.current = null;
    }

    setPreviewCollapsed(false);
    setHoveredId(strip.id);
    setClosingCategoryId(null);
    setActiveCategoryId(strip.id);
  }, [isInitialLoadPending]);

  const handleOverlayBack = useCallback(() => {
    if (!activeCategoryId) {
      return;
    }

    if (overlayTimerRef.current !== null) {
      window.clearTimeout(overlayTimerRef.current);
      overlayTimerRef.current = null;
    }
    if (returnHoverTimerRef.current !== null) {
      window.clearTimeout(returnHoverTimerRef.current);
      returnHoverTimerRef.current = null;
    }

    const returningCategoryId = activeCategoryId;
    setActiveCategoryId(null);
    setClosingCategoryId(returningCategoryId);
    setHoveredId(returningCategoryId);
    setPreviewCollapsed(false);
    returnHoldUntilRef.current = nowMs() + RETURN_SETTLE_MS;
    setReturnHoldVersion((current) => current + 1);

    overlayTimerRef.current = window.setTimeout(() => {
      setClosingCategoryId(null);
      overlayTimerRef.current = null;
      returnHoverTimerRef.current = window.setTimeout(() => {
        setHoveredId(null);
        returnHoverTimerRef.current = null;
      }, STRIP_TRANSITION_MS + 80);
    }, OVERLAY_TRANSITION_MS);
  }, [activeCategoryId]);

  return (
    <section
      aria-label="Strip gallery asset"
      className="flex min-h-0 flex-1 items-stretch justify-center overflow-hidden py-3 sm:py-4 md:py-6"
    >
      <div
        className="relative h-full w-full overflow-hidden border border-[rgba(255,255,255,0.58)] shadow-[0_18px_44px_rgba(41,32,24,0.16)]"
        style={{
          maxWidth: "1480px",
          maxHeight: "min(900px, 100%)",
          minHeight: "clamp(360px, 56vh, 900px)",
          borderRadius: "44px",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden transition-[transform,filter] duration-500 ease-out"
          style={{
            transform: showLoaderOverlay ? "scale(1.001)" : "scale(1)",
            filter: showLoaderOverlay ? "saturate(0.98)" : "saturate(1)",
          }}
        >
          <div
            className="absolute inset-0 z-0 transition-opacity duration-300 ease-out"
            style={{
              opacity: activeCategory || closingCategory ? 0.34 : 1,
              pointerEvents: activeCategory || closingCategory ? "none" : "auto",
            }}
          >
            <div
              className="relative flex h-full w-full items-stretch gap-[3px] overflow-hidden sm:gap-[4px] md:gap-[6px]"
              onMouseLeave={() => queueHoveredId(null)}
            >
              {strips.map((strip, index) => (
                <StripCell
                  key={strip.id}
                  strip={strip}
                  hoveredId={hoveredId}
                  hoveredCategoryId={hoveredCategoryId}
                  previewCollapsed={previewCollapsed}
                  panoramaBaseUrl={panoramaBaseUrl}
                  panoramaNextUrl={panoramaNextUrl}
                  isPanoramaTransitioning={isPanoramaTransitioning}
                  panoramaStripCount={panoramaStripCount}
                  showLeftDivider={index > 0}
                  showRightDivider={index < strips.length - 1}
                  onHover={queueHoveredId}
                  onClick={handleStripClick}
                />
              ))}
            </div>
          </div>

          {overlayCategory ? (
            <CategoryOverlay
              category={overlayCategory}
              isVisible={Boolean(activeCategory)}
              onBack={handleOverlayBack}
            />
          ) : null}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity ease-out"
          style={{
            opacity: isInitialLoadPending ? 1 : isLoaderExiting ? 0 : 0,
            transitionDuration: `${LOADER_EXIT_MS}ms`,
            background:
              "linear-gradient(180deg, rgba(18,15,12,0.18) 0%, rgba(18,15,12,0.1) 100%)",
          }}
        >
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              background:
                "radial-gradient(circle at 50% 46%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 24%, rgba(255,255,255,0) 48%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 28%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 72%, rgba(255,255,255,0) 100%)",
              transform: "translateX(-18%)",
              animation: "mygotwo-loader-sheen 2.6s ease-in-out infinite",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="relative h-16 w-16 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.46)",
                  border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.72)",
                }}
              >
                <div
                  className="absolute inset-[9px] rounded-full border-t-2 border-r-2 animate-spin"
                  style={{
                    borderColor: "rgba(255,255,255,0.92)",
                    borderBottomColor: "transparent",
                    borderLeftColor: "transparent",
                  }}
                />
              </div>
              <div className="max-w-[22rem]">
                <p
                  className="text-[11px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  My Go Two
                </p>
                <p
                  className="mt-3 text-[36px] leading-[0.92]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    color: "#ffffff",
                    textShadow: "0 14px 34px rgba(0,0,0,0.22)",
                  }}
                >
                  Opening your vault
                </p>
                <p
                  className="mt-3 text-[14px] leading-[1.65]"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    color: "rgba(255,255,255,0.86)",
                    textShadow: "0 8px 18px rgba(0,0,0,0.22)",
                  }}
                >
                  Pulling your saved categories, staged strip images, and your locked-in preference deck.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  {["Clothes", "Personal", "Health", "Gifts", "Dining", "Beverages", "Travel"].map(
                    (label, index) => (
                      <span
                        key={label}
                        className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] animate-pulse"
                        style={{
                          animationDelay: `${index * 0.12}s`,
                          animationDuration: "1.8s",
                          fontFamily: "'Jost', sans-serif",
                          color: "rgba(var(--swatch-teal-rgb), 0.7)",
                          background: "rgba(255,255,255,0.56)",
                          border: "1px solid rgba(255,255,255,0.74)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                        }}
                      >
                        {label}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes mygotwo-loader-sheen {
            0% { transform: translateX(-32%); opacity: 0.18; }
            50% { transform: translateX(0%); opacity: 0.34; }
            100% { transform: translateX(32%); opacity: 0.18; }
          }
        `}</style>
      </div>
    </section>
  );
}
