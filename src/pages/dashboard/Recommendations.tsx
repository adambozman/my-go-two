import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useUserProfile } from "@/contexts/user-profile-context";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Loader2, Bookmark, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/usePagination";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { getYourVibeDerivation } from "@/lib/knowledgeCenter";
import {
  parseRecommendationEngineResponse,
  type RecommendationProduct as Product,
} from "@/lib/recommendationContracts";
import { hasTrustedRecommendationProductImage } from "@/lib/recommendationProductTruth";
import {
  getRecommendationActionLabel,
  getRecommendationDestination,
  getRecommendationDisplayPrice,
  getRecommendationMatchLabel,
  getRecommendationStableId,
} from "@/lib/recommendationPresentation";
import {
  RECOMMENDATION_CATEGORY_REGISTRY,
  type RecommendationCategory,
} from "@/lib/recommendationCategories";
import GoTwoInline from "@/components/GoTwoInline";
import { useRotatingQuote } from "@/hooks/useRotatingQuote";
import { GOTWO_LOGO_SENTINEL, INSPIRATIONAL_QUOTES } from "@/lib/quotes";

const RECOMMENDATION_V2_VERSION_PREFIX = "recommendation-engine-v2";

const getRpcStatus = (error: unknown): number | undefined => {
  if (!error || typeof error !== "object") return undefined;
  // supabase-js FunctionsHttpError puts status on context
  const e = error as Record<string, unknown>;
  if (typeof e.status === "number") return e.status;
  if (e.context && typeof e.context === "object" && "status" in (e.context as Record<string, unknown>)) {
    return Number((e.context as Record<string, unknown>).status);
  }
  return undefined;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Supabase functions.invoke wraps the raw status text
    if (error.message.includes("non-2xx")) return "Could not reach the recommendation engine. Please try again.";
    return error.message;
  }
  return "Failed to load recommendations";
};

const PAGE_SIZE = 8;

function hasResolvedProductImage(product: Product) {
  return hasTrustedRecommendationProductImage(product);
}

function getProductImage(product: Product) {
  return hasResolvedProductImage(product) ? product.image_url! : null;
}

const Recommendations = () => {
  const { knowledgeDerivations } = useUserProfile();
  const { subscribed, subscriptionLoading, user, session } = useAuth();
  const yourVibe = useMemo(() => getYourVibeDerivation(knowledgeDerivations), [knowledgeDerivations]);
  const { index: quoteIndex, quote: activeQuote } = useRotatingQuote();
  const latestRequestIdRef = useRef(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activePillar, setActivePillar] = useState<string>("all");
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [sharingItems, setSharingItems] = useState<Set<string>>(new Set());
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);
  const [generationVersion, setGenerationVersion] = useState<string | null>(null);
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [inputSnapshotSummary, setInputSnapshotSummary] = useState<Record<string, unknown> | null>(null);
  const isUsingRebuiltEngine = Boolean(
    generationVersion && generationVersion.startsWith(RECOMMENDATION_V2_VERSION_PREFIX),
  );
  const recommendationTargetCount = typeof inputSnapshotSummary?.recommendation_target_count === "number"
    ? inputSnapshotSummary.recommendation_target_count
    : null;
  const recommendationInputLevel = typeof inputSnapshotSummary?.recommendation_input_level === "string"
    ? inputSnapshotSummary.recommendation_input_level
    : null;
  const hasLoadedProducts = products.length > 0;
  const availableRecommendationCategories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((product) => product.category)
            .filter((category): category is RecommendationCategory =>
              RECOMMENDATION_CATEGORY_REGISTRY.some((entry) => entry.key === category),
            ),
        ),
      ),
    [products],
  );

  const pillars = useMemo(() => {
    const categoryPills = RECOMMENDATION_CATEGORY_REGISTRY
      .filter((entry) => availableRecommendationCategories.includes(entry.key))
      .map((entry) => ({
        key: entry.key,
        label: entry.filterLabel,
        matches: [entry.key],
      }));

    return [
      {
        key: "all",
        label: "For You",
        matches: availableRecommendationCategories.length > 0
          ? availableRecommendationCategories
          : RECOMMENDATION_CATEGORY_REGISTRY.map((entry) => entry.key),
      },
      ...categoryPills,
    ];
  }, [availableRecommendationCategories]);

  const activePillarConfig = useMemo(
    () => pillars.find((pillar) => pillar.key === activePillar) || pillars[0],
    [activePillar, pillars],
  );

  useEffect(() => {
    if (!pillars.some((pillar) => pillar.key === activePillar)) {
      setActivePillar("all");
    }
  }, [activePillar, pillars]);

  const filtered = useMemo(() => {
    if (activePillar === "all") return products;
    return products.filter((p) => activePillarConfig.matches.includes(p.category as RecommendationCategory));
  }, [products, activePillar, activePillarConfig]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems: paginatedProducts } = usePagination({
    items: filtered,
    pageSize: PAGE_SIZE,
    resetKeys: [activePillar],
  });

  useEffect(() => {
    latestRequestIdRef.current += 1;
    setProducts([]);
    setGeneratedAt(null);
    setIsCached(false);
    setGenerationVersion(null);
    setInputSnapshotSummary(null);
    setLoadErrorMessage(null);
    setHasLoaded(false);
    setLoading(false);
    setActivePillar("all");
    setSavedItems(new Set());
    setSharingItems(new Set());
    setCurrentPage(1);
  }, [user?.id, setCurrentPage]);

  const fetchProducts = useCallback(
    async (forceRefresh = false) => {
      if (!user) {
        setLoading(false);
        setHasLoaded(false);
        return;
      }

      const requestId = latestRequestIdRef.current + 1;
      latestRequestIdRef.current = requestId;
      const activeUserId = user.id;
      setLoading(true);
      setLoadErrorMessage(null);
      try {
        const activeFunction = RECOMMENDATION_V2_VERSION_PREFIX;

        // Use the access token from React context (already kept in sync by
        // onAuthStateChange).  This avoids calling getSession() which can
        // internally trigger _callRefreshToken → token rotation → session
        // destruction if a concurrent refresh is in flight.
        const accessToken = session?.access_token;
        if (!accessToken) {
          throw new Error("No active session — please sign in again.");
        }

        const result = await supabase.functions.invoke(activeFunction, {
          body: forceRefresh ? { force_refresh: true } : {},
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { data, error } = result;
        if (error) throw error;
        const response = parseRecommendationEngineResponse(data);
        if (latestRequestIdRef.current !== requestId || user.id !== activeUserId) {
          return;
        }
        const nextProducts = response.products;
        if (nextProducts.length > 0) {
          setProducts(nextProducts);
        }
        setGeneratedAt(response.generated_at);
        setIsCached(response.cached);
        setGenerationVersion(response.generation_version ?? activeFunction);
        setInputSnapshotSummary(response.input_snapshot_summary);
        setCurrentPage(1);

        if (nextProducts.length === 0) {
          const emptyMessage = "The recommendation engine returned no usable products.";
          setLoadErrorMessage(emptyMessage);
          if (hasLoadedProducts) {
            toast.error(`${emptyMessage} Keeping the current V2 set on screen.`);
          }
          return;
        }
      } catch (error: unknown) {
        if (latestRequestIdRef.current !== requestId) {
          return;
        }
        console.error("Products error:", error);
        const status = getRpcStatus(error);
        const message =
          status === 401 || status === 403
            ? "Your session expired. Please sign out and sign back in."
            : status === 429
              ? "Recommendation refresh is rate-limited right now. Try again shortly."
              : status === 402
                ? "Recommendation generation is unavailable right now."
                : status === 404
                  ? "The rebuilt recommendation engine is not deployed yet."
                  : getErrorMessage(error);
        setLoadErrorMessage(message);
        toast.error(hasLoadedProducts ? `${message} Keeping the current V2 set on screen.` : message);
      } finally {
        if (latestRequestIdRef.current === requestId) {
          setLoading(false);
          setHasLoaded(true);
        }
      }
    },
    [hasLoadedProducts, setCurrentPage, user],
  );

  useEffect(() => {
    if (user && !hasLoaded) {
      fetchProducts();
    }
  }, [fetchProducts, hasLoaded, user]);

  useEffect(() => {
    if (!user) {
      setSavedItems(new Set());
      setSharingItems(new Set());
    }
  }, [user]);

  const toggleSave = useCallback(async (product: Product) => {
    const id = getRecommendationStableId(product);

    setSavedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    toast.success(savedItems.has(id) ? "Removed from this session" : "Saved for this session");
  }, [savedItems]);

  const handleShare = useCallback(async (product: Product) => {
    const id = getRecommendationStableId(product);
    const productUrl = getRecommendationDestination(product);
    const matchLabel = getRecommendationMatchLabel(product);
    const displayPrice = getRecommendationDisplayPrice(product);
    const shareSummary = `${product.brand} ${product.name}\n${matchLabel}\n${displayPrice}`;
    const shareText = [
      shareSummary,
      product.hook,
      product.why,
      productUrl,
    ]
      .filter(Boolean)
      .join("\n\n");

    setSharingItems((prev) => new Set(prev).add(id));

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: `${product.brand} ${product.name}`,
          text: `${shareSummary}\n\n${product.hook}\n\n${product.why}`,
          url: productUrl ?? undefined,
        });
        toast.success("Shared from your share sheet");
        return;
      }

      await navigator.clipboard.writeText(shareText);
      toast.success(productUrl ? "Share details copied to clipboard" : "Recommendation copied to clipboard");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Could not share recommendation";
      if (message.toLowerCase().includes("abort")) {
        return;
      }
      toast.error(message);
    } finally {
        setSharingItems((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
    }
  }, []);

  const generatedLabel = generatedAt
    ? new Date(generatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : null;
  const isGuestPreview = !subscribed && filtered.length > PAGE_SIZE;
  const hasEngineEmptyFailure = loadErrorMessage === "The recommendation engine returned no usable products.";

  if (subscriptionLoading || (user && loading && !hasLoaded)) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const displayProducts = subscribed ? paginatedProducts : filtered.slice(0, PAGE_SIZE);

  /* ────────────────────────────────────────────────────────────
     Category labels for supplementary tiles
     ──────────────────────────────────────────────────────────── */
  const categoryLabels = RECOMMENDATION_CATEGORY_REGISTRY.slice(0, 4).map((e) => e.filterLabel);

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6">
      <div className="mx-auto max-w-[1280px] px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
        {loadErrorMessage && hasLoadedProducts && (
          <Card variant="sand" className="border border-amber-200/80 bg-amber-50/70 p-4 mb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="surface-heading-md">Showing your current recommendations.</p>
                <p className="surface-body">{loadErrorMessage}</p>
              </div>
              <Button onClick={() => fetchProducts(true)} disabled={loading} variant="outline" size="sm" className="gap-1.5 self-start sm:self-auto">
                {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                Try Again
              </Button>
            </div>
          </Card>
        )}

        {/* ── Bento grid ── */}
        {loading && products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="surface-body">Curating your picks…</p>
          </div>
        ) : displayProducts.length > 0 ? (
          <>
            {/*
              MOSAIC-FIRST: 8 tiles, grid-template-areas, perfect rectangle.
              6 cols × 5 rows.  Every cell filled.  All tiles unique shape.

              hero(3×1)  prod1(2×2)  brand(1×1)
              prod2(2×3) stats(1×1)  quote(1×3)
              prod3(3×2)             prod4(6×1)
            */}
            <style dangerouslySetInnerHTML={{ __html: `
              @media (min-width: 768px) {
                .bento-mosaic {
                  grid-template-columns: repeat(6, 1fr) !important;
                  grid-template-rows: repeat(5, 120px) !important;
                  grid-template-areas:
                    "hero  hero  hero  prod1 prod1 brand"
                    "prod2 prod2 stats prod1 prod1 quote"
                    "prod2 prod2 prod3 prod3 prod3 quote"
                    "prod2 prod2 prod3 prod3 prod3 quote"
                    "prod4 prod4 prod4 prod4 prod4 prod4" !important;
                }
                .bento-mosaic [data-area] { grid-area: attr(data-area); }
                .bento-area-hero  { grid-area: hero !important; }
                .bento-area-prod1 { grid-area: prod1 !important; }
                .bento-area-brand { grid-area: brand !important; }
                .bento-area-prod2 { grid-area: prod2 !important; }
                .bento-area-stats { grid-area: stats !important; }
                .bento-area-quote { grid-area: quote !important; }
                .bento-area-prod3 { grid-area: prod3 !important; }
                .bento-area-prod4 { grid-area: prod4 !important; }
              }
            `}} />
            <motion.div
              key={`${activePillar}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bento-mosaic grid grid-cols-2 gap-1 md:gap-1.5"
            >
              {/* hero: 3×1 — curated intro with personality */}
              <div
                className="bento-area-hero col-span-2 rounded-xl overflow-hidden flex flex-col justify-center p-4 md:p-5"
                style={{ background: "linear-gradient(135deg, var(--swatch-teal) 0%, #00687a 100%)" }}
              >
                <p className="text-[9px] uppercase tracking-[0.15em] mb-1" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.6)" }}>
                  Curated for you
                </p>
                <h2 className="text-[22px] md:text-[28px] leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                  Picked by AI.<br />Made for you.
                </h2>
              </div>

              {/* prod1: 2×2 — first product */}
              {displayProducts[0] ? (
                <ProductCard product={displayProducts[0]} index={0} layoutClass="bento-area-prod1" isSaved={savedItems.has(getRecommendationStableId(displayProducts[0]))} shareLoading={sharingItems.has(getRecommendationStableId(displayProducts[0]))} onToggleSave={() => subscribed ? void toggleSave(displayProducts[0]) : toast("Upgrade to save picks")} onShare={() => void handleShare(displayProducts[0])} />
              ) : <div className="bento-area-prod1" />}

              {/* brand: 1×1 — ad tile */}
              <div
                className="bento-area-brand rounded-xl overflow-hidden flex flex-col items-center justify-center p-2 text-center cursor-pointer"
                style={{ background: "linear-gradient(135deg, #ef8555 0%, #eb4b3f 100%)" }}
              >
                <p className="text-[16px] font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                  #BookTok
                </p>
                <p className="text-[8px] uppercase tracking-[0.1em] mt-1" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>
                  Trending Reads
                </p>
              </div>

              {/* prod2: 2×3 — second product (tall) */}
              {displayProducts[1] ? (
                <ProductCard product={displayProducts[1]} index={1} layoutClass="bento-area-prod2" isSaved={savedItems.has(getRecommendationStableId(displayProducts[1]))} shareLoading={sharingItems.has(getRecommendationStableId(displayProducts[1]))} onToggleSave={() => subscribed ? void toggleSave(displayProducts[1]) : toast("Upgrade to save picks")} onShare={() => void handleShare(displayProducts[1])} />
              ) : <div className="bento-area-prod2" />}

              {/* stats: 1×1 — ad tile */}
              <div
                className="bento-area-stats rounded-xl overflow-hidden flex flex-col items-center justify-center p-2 text-center cursor-pointer"
                style={{ background: "var(--swatch-teal)" }}
              >
                <p className="text-[14px] font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                  #CleanGirl
                </p>
                <p className="text-[8px] uppercase tracking-[0.1em] mt-1" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>
                  Aesthetic
                </p>
              </div>

              {/* quote: 1×3 — tall ad strip */}
              <div
                className="bento-area-quote rounded-xl overflow-hidden flex flex-col items-center justify-center p-3 text-center cursor-pointer"
                style={{ background: "var(--swatch-sand)" }}
              >
                <p className="text-[18px] font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                  #TravelTok
                </p>
                <p className="text-[9px] uppercase tracking-[0.1em] mt-1.5" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  Top Destinations
                </p>
              </div>

              {/* prod3: 3×2 — third product (wide) */}
              {displayProducts[2] ? (
                <ProductCard product={displayProducts[2]} index={2} layoutClass="col-span-2 bento-area-prod3" isSaved={savedItems.has(getRecommendationStableId(displayProducts[2]))} shareLoading={sharingItems.has(getRecommendationStableId(displayProducts[2]))} onToggleSave={() => subscribed ? void toggleSave(displayProducts[2]) : toast("Upgrade to save picks")} onShare={() => void handleShare(displayProducts[2])} />
              ) : <div className="bento-area-prod3" />}

              {/* prod4 area: 6×1 — rotating quote bar */}
              <div
                className="bento-area-prod4 col-span-2 rounded-xl overflow-hidden flex items-center justify-center px-6 text-center"
                style={{ background: "#fff" }}
              >
                <p className="text-[14px] md:text-[16px] leading-[1.3]" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600, color: "var(--swatch-teal)" }}>
                  "{INSPIRATIONAL_QUOTES[quoteIndex % INSPIRATIONAL_QUOTES.length].text}"
                </p>
                <p className="text-[10px] ml-4 shrink-0" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  — {INSPIRATIONAL_QUOTES[quoteIndex % INSPIRATIONAL_QUOTES.length].author}
                </p>
              </div>

              {/* No overflow below the mosaic — the grid ends at prod4 */}
            </motion.div>

            {subscribed && totalPages > 1 && (
              <div className="mt-4">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  label={`Page ${currentPage} of ${totalPages}`}
                />
              </div>
            )}
          </>
        ) : loadErrorMessage && !hasLoadedProducts ? (
          <Card variant="sand" className="p-8 text-center">
            <p className="surface-heading-md mb-2">
              {hasEngineEmptyFailure ? "V2 returned an empty set." : "Recommendations are temporarily unavailable."}
            </p>
            <p className="surface-body">{hasEngineEmptyFailure ? "The engine returned zero usable products." : loadErrorMessage}</p>
            <div className="mt-4 flex justify-center">
              <Button onClick={() => fetchProducts(true)} disabled={loading} variant="outline" size="sm" className="gap-1.5">
                {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                Try Again
              </Button>
            </div>
          </Card>
        ) : !subscribed ? (
          <Card variant="sand" className="p-8 text-center">
            <p className="surface-heading-md mb-2">Your curated picks load here.</p>
            <p className="surface-body">Upgrade to unlock the full weekly set and saving.</p>
          </Card>
        ) : hasLoaded && user ? (
          <Card variant="sand" className="p-8 text-center">
            <p className="surface-heading-md mb-2">Recommendations did not resolve correctly.</p>
            <p className="surface-body">V2 should always return picks or a fallback set. Refresh to retry the engine.</p>
            <div className="mt-4 flex justify-center">
              <Button onClick={() => fetchProducts(true)} disabled={loading} variant="outline" size="sm" className="gap-1.5">
                {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                Try Again
              </Button>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

function ProductCard({
  product,
  index,
  layoutClass,
  isSaved,
  shareLoading,
  onToggleSave,
  onShare,
}: {
  product: Product;
  index: number;
  layoutClass: string;
  isSaved: boolean;
  shareLoading: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const productImage = getProductImage(product);
  const productDestination = getRecommendationDestination(product);
  const productActionLabel = getRecommendationActionLabel(product);
  const productDisplayPrice = getRecommendationDisplayPrice(product);
  const [imageFailed, setImageFailed] = useState(false);
  const showProductImage = Boolean(productImage) && !imageFailed;

  /* Bento tile: image fills the entire card, text overlays at bottom.
     No separate footer — everything is inside the tile.  Actions on hover. */
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 260, damping: 24 }}
      className={`group/card relative rounded-xl overflow-hidden cursor-pointer min-h-[90px] ${layoutClass}`}
      onClick={() => {
        if (productDestination) window.open(productDestination, "_blank", "noopener,noreferrer");
      }}
    >
      {/* Full-bleed image or typographic fallback */}
      {showProductImage ? (
        <img
          src={productImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(145deg, var(--swatch-sand) 0%, var(--swatch-cream) 100%)" }}
        />
      )}

      {/* Bottom gradient scrim + text overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{
          background: showProductImage
            ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 65%)"
            : "none",
        }}
      >
        <div className="p-3 md:p-4">
          <p
            className="text-[10px] uppercase tracking-[0.08em] mb-0.5"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: showProductImage ? "rgba(255,255,255,0.75)" : "var(--swatch-cedar-grove)",
            }}
          >
            {product.brand}
          </p>
          <h3
            className="text-[15px] md:text-[17px] leading-[1.1] font-semibold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: showProductImage ? "#fff" : "var(--swatch-teal)",
            }}
          >
            {product.name}
          </h3>
          {productDisplayPrice && (
            <p
              className="text-[11px] mt-1"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: showProductImage ? "rgba(255,255,255,0.8)" : "var(--swatch-antique-coin)",
              }}
            >
              {productDisplayPrice}
            </p>
          )}
          {productDestination && productActionLabel && (
            <span
              className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.1em] mt-1.5 px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: showProductImage ? "#fff" : "var(--swatch-teal)",
                background: showProductImage ? "rgba(255,255,255,0.15)" : "rgba(47,95,109,0.1)",
                backdropFilter: "blur(4px)",
              }}
            >
              {productActionLabel}
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
      </div>

      {/* Hover actions — appear on mouseover */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          className="w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.7)" }}
        >
          <Bookmark className="h-3.5 w-3.5" style={{ color: isSaved ? "var(--swatch-cedar-grove)" : "var(--swatch-teal)" }} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onShare(); }}
          className="w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.7)" }}
          disabled={shareLoading}
        >
          {shareLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Share2 className="h-3.5 w-3.5" style={{ color: "var(--swatch-teal)" }} />}
        </button>
      </div>
    </motion.div>
  );
}

export default Recommendations;

// Codebase classification: runtime dashboard recommendations viewer.

// Codebase classification: runtime recommendations page.
