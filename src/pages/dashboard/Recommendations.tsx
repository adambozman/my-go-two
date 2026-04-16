import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useUserProfile } from "@/contexts/user-profile-context";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Loader2, Bookmark, Share2, ExternalLink, Sparkles } from "lucide-react";
import { useImageBank } from "@/hooks/useImageBank";
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
import { CardEditTrigger, useCardOverrides } from "@/components/CardEditor";

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
  const { images: heroImages } = useImageBank("hero");
  const defaultHeroImageUrl = heroImages.length > 0 ? heroImages[0].url : null;
  const { overrides, refresh: refreshOverrides } = useCardOverrides();
  const heroOverride = overrides["hero"];
  const heroImageUrl = heroOverride?.image_url || defaultHeroImageUrl;
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
              className="bento-mosaic grid grid-cols-2 gap-1.5 md:gap-2"
            >
              {/* hero: 3×1 — page intro */}
              <div
                className="bento-area-hero col-span-2 overflow-hidden relative"
                style={{ borderRadius: 20, background: "var(--swatch-teal)" }}
              >
                <CardEditTrigger cardId="hero" override={heroOverride} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
                {/* Background image from user's photo gallery — fills entire card */}
                {heroImageUrl && (
                  <img
                    src={heroImageUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                )}

                {/* Gradient scrim for text legibility */}
                <div className="absolute inset-0" style={{ background: heroImageUrl ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.1) 100%)" : "none" }} />

                {/* Floating pill badge top-right */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                    <Sparkles className="w-2.5 h-2.5" style={{ color: "var(--swatch-sonoma-chardonnay)" }} />
                    Curated
                  </span>
                </div>

                {/* Text overlay — centered, spread across the whole box */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5 py-5 md:px-8">
                  <h2 className="text-[24px] md:text-[32px] leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                    {heroOverride?.heading || "Handpicked for you"}
                  </h2>
                  <p className="text-[11px] md:text-[12px] leading-[1.5] mt-2 max-w-[44ch]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.85)" }}>
                    {heroOverride?.subheading || "Our AI learns what you love \u2014 your style, your taste, the details that make you, you \u2014 and finds products you\u2019ll actually want."}
                  </p>
                </div>
              </div>

              {/* prod1: 2×2 — first product */}
              {displayProducts[0] ? (
                <ProductCard product={displayProducts[0]} index={0} layoutClass="bento-area-prod1" isSaved={savedItems.has(getRecommendationStableId(displayProducts[0]))} shareLoading={sharingItems.has(getRecommendationStableId(displayProducts[0]))} onToggleSave={() => subscribed ? void toggleSave(displayProducts[0]) : toast("Upgrade to save picks")} onShare={() => void handleShare(displayProducts[0])} cardOverride={overrides[`product-${getRecommendationStableId(displayProducts[0])}`]} onOverrideSaved={refreshOverrides} />
              ) : <div className="bento-area-prod1" />}

              {/* brand: 1×1 — ad tile */}
              {(() => {
                const brandOverride = overrides["brand"];
                return (
                  <div
                    className="bento-area-brand overflow-hidden relative p-3 cursor-pointer"
                    style={{ borderRadius: 20, background: brandOverride?.image_url ? "transparent" : "linear-gradient(135deg, #ef8555 0%, #eb4b3f 100%)" }}
                  >
                    <CardEditTrigger cardId="brand" override={brandOverride} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
                    {brandOverride?.image_url && (
                      <img src={brandOverride.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    {/* Floating pill top-right */}
                    <span className="absolute top-2.5 right-2.5 inline-flex items-center rounded-full px-2 py-0.5 text-[7px] uppercase tracking-[0.1em] z-10" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.22)" }}>
                      Trending
                    </span>

                    <div className="flex flex-col items-center justify-center h-full gap-1.5 relative z-[1]">
                      {/* Icon spot */}
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                        <Bookmark className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.9)" }} />
                      </div>
                      <p className="text-[15px] font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                        {brandOverride?.heading || "#BookTok"}
                      </p>
                      {/* Inset sub-panel */}
                      <div className="rounded-lg px-2.5 py-1" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.16)" }}>
                        <p className="text-[7px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)" }}>
                          {brandOverride?.subheading || "Trending Reads"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* prod2: 2×3 — second product (tall) */}
              {displayProducts[1] ? (
                <ProductCard product={displayProducts[1]} index={1} layoutClass="bento-area-prod2" isSaved={savedItems.has(getRecommendationStableId(displayProducts[1]))} shareLoading={sharingItems.has(getRecommendationStableId(displayProducts[1]))} onToggleSave={() => subscribed ? void toggleSave(displayProducts[1]) : toast("Upgrade to save picks")} onShare={() => void handleShare(displayProducts[1])} cardOverride={overrides[`product-${getRecommendationStableId(displayProducts[1])}`]} onOverrideSaved={refreshOverrides} />
              ) : <div className="bento-area-prod2" />}

              {/* stats: 1×1 — ad tile */}
              {(() => {
                const statsOverride = overrides["stats"];
                return (
                  <div
                    className="bento-area-stats overflow-hidden relative p-3 cursor-pointer"
                    style={{ borderRadius: 20, background: statsOverride?.image_url ? "transparent" : "var(--swatch-teal)" }}
                  >
                    <CardEditTrigger cardId="stats" override={statsOverride} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
                    {statsOverride?.image_url && (
                      <img src={statsOverride.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    {/* Decorative orb */}
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)" }} />

                    {/* Floating pill top-right */}
                    <span className="absolute top-2.5 right-2.5 inline-flex items-center rounded-full px-2 py-0.5 text-[7px] uppercase tracking-[0.1em] z-10" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
                      Aesthetic
                    </span>

                    <div className="flex flex-col items-center justify-center h-full gap-1.5 relative z-[1]">
                      {/* Icon spot */}
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.14)" }}>
                        <Sparkles className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.85)" }} />
                      </div>
                      <p className="text-[14px] font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                        {statsOverride?.heading || "#CleanGirl"}
                      </p>
                      {/* Inset sub-panel */}
                      <div className="rounded-lg px-2.5 py-1" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <p className="text-[7px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>
                          {statsOverride?.subheading || "Curated Picks"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* quote: 1×3 — 4th product (tall strip) */}
              {displayProducts[3] ? (
                <ProductCard product={displayProducts[3]} index={3} layoutClass="bento-area-quote" isSaved={savedItems.has(getRecommendationStableId(displayProducts[3]))} shareLoading={sharingItems.has(getRecommendationStableId(displayProducts[3]))} onToggleSave={() => subscribed ? void toggleSave(displayProducts[3]) : toast("Upgrade to save picks")} onShare={() => void handleShare(displayProducts[3])} cardOverride={overrides[`product-${getRecommendationStableId(displayProducts[3])}`]} onOverrideSaved={refreshOverrides} />
              ) : <div className="bento-area-quote" />}

              {/* prod3: 3×2 — third product (wide) */}
              {displayProducts[2] ? (
                <ProductCard product={displayProducts[2]} index={2} layoutClass="col-span-2 bento-area-prod3" isSaved={savedItems.has(getRecommendationStableId(displayProducts[2]))} shareLoading={sharingItems.has(getRecommendationStableId(displayProducts[2]))} onToggleSave={() => subscribed ? void toggleSave(displayProducts[2]) : toast("Upgrade to save picks")} onShare={() => void handleShare(displayProducts[2])} cardOverride={overrides[`product-${getRecommendationStableId(displayProducts[2])}`]} onOverrideSaved={refreshOverrides} />
              ) : <div className="bento-area-prod3" />}

              {/* prod4 area: 6×1 — rotating quote bar */}
              {(() => {
                const quoteOverride = overrides["quote"];
                return (
                  <div
                    className="bento-area-prod4 col-span-2 overflow-hidden relative flex items-center px-4 md:px-6"
                    style={{ borderRadius: 20, background: quoteOverride?.image_url ? "transparent" : "linear-gradient(140deg, rgba(255,255,255,0.92) 0%, rgba(250,244,236,0.85) 42%, rgba(239,224,207,0.7) 100%)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.96), 0 8px 24px rgba(var(--swatch-cedar-grove-rgb), 0.06)" }}
                  >
                    <CardEditTrigger cardId="quote" override={quoteOverride} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
                    {quoteOverride?.image_url && (
                      <img src={quoteOverride.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    {/* Icon spot left */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3 md:mr-4 relative z-[1]" style={{ background: "rgba(var(--swatch-teal-rgb), 0.1)" }}>
                      <span className="text-[14px] leading-[1]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)", fontStyle: "italic" }}>“</span>
                    </div>

                    {/* Quote inset panel */}
                    <div className="flex-1 flex items-center gap-3 rounded-xl px-3 py-2 md:px-4 md:py-2.5 relative z-[1]" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.75)" }}>
                      <div className="w-0.5 h-6 rounded-full shrink-0" style={{ background: "var(--swatch-teal)", opacity: 0.35 }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] md:text-[15px] leading-[1.3] truncate" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600, color: "var(--swatch-teal)" }}>
                          "{quoteOverride?.heading || INSPIRATIONAL_QUOTES[quoteIndex % INSPIRATIONAL_QUOTES.length].text}"
                        </p>
                      </div>
                      <p className="text-[9px] shrink-0 uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                        — {quoteOverride?.subheading || INSPIRATIONAL_QUOTES[quoteIndex % INSPIRATIONAL_QUOTES.length].author}
                      </p>
                    </div>
                  </div>
                );
              })()}

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

/*
  ProductCard — rebuilt from real research:
  
  Sources studied:
  - Apple "Get to know iPhone" bento: text top 40%, image bottom 60% on solid bg
  - Bella Kitchenware: all product tiles use uniform #F5F0EA warm linen bg
  - Nike Shop: product on light gray, text below, zero dead space
  - Dribbble top shots (Giorgi, Syed Ali Abbas): off-white card (#F5F5F5) absorbs
    white-bg catalog photos naturally — product shown via object-contain
  - Couplet Coffee: bold colored bg per tile, product centered, price badge
  - SSENSE / Mr Porter: image-dominant, text strip below, no borders
  - Framer Lumier template: full-bleed image, dark gradient overlay at bottom
  
  Pattern chosen for Go Two:
  - Uniform warm sand bg on every product tile (brand-consistent, solves white-bg)
  - Product image centered via object-contain (full product visible, sand fills gaps)
  - Text strip pinned to bottom with sand-to-transparent gradient (not black)
  - Minimal: brand label + name + price. No separate footer zone = no dead space.
  - 20px border-radius matching existing card tokens
*/
function ProductCard({
  product,
  index,
  layoutClass,
  isSaved,
  shareLoading,
  onToggleSave,
  onShare,
  cardOverride,
  onOverrideSaved,
}: {
  product: Product;
  index: number;
  layoutClass: string;
  isSaved: boolean;
  shareLoading: boolean;
  onToggleSave: () => void;
  onShare: () => void;
  cardOverride?: import("@/components/CardEditor").CardOverride;
  onOverrideSaved?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const productImage = cardOverride?.image_url || getProductImage(product);
  const productDestination = getRecommendationDestination(product);
  const productActionLabel = getRecommendationActionLabel(product);
  const productDisplayPrice = getRecommendationDisplayPrice(product);
  const matchLabel = getRecommendationMatchLabel(product);
  const [imageFailed, setImageFailed] = useState(false);
  const showProductImage = Boolean(productImage) && !imageFailed;
  const cardId = `product-${getRecommendationStableId(product)}`;

  const CARD_BG = "var(--swatch-sand)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 260, damping: 24 }}
      className={`group/card relative overflow-hidden cursor-pointer ${layoutClass}`}
      style={{ borderRadius: 20, background: "var(--swatch-sand)" }}
      onClick={() => {
        if (productDestination) window.open(productDestination, "_blank", "noopener,noreferrer");
      }}
    >
      {/* Dev mode edit trigger */}
      {onOverrideSaved && (
        <CardEditTrigger cardId={cardId} override={cardOverride} onSaved={onOverrideSaved} fields={["image_url", "heading", "subheading"]} />
      )}

      {/* Product image — fills entire card, edge to edge */}
      {showProductImage ? (
        <img
          src={productImage!}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[28px] leading-[1] text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
            {product.brand}
          </p>
        </div>
      )}

      {/* Match pill badge — top-left, floats on image */}
      {matchLabel && (
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.1em]"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "var(--swatch-teal)",
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Sparkles className="w-2.5 h-2.5" style={{ color: "var(--swatch-cedar-grove)" }} />
            {matchLabel}
          </span>
        </div>
      )}

      {/* Save + Share buttons — top-right, float on image */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.88)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
        >
          <Bookmark className="h-3.5 w-3.5" style={{ color: isSaved ? "var(--swatch-cedar-grove)" : "var(--swatch-teal)" }} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onShare(); }}
          className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.88)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          disabled={shareLoading}
        >
          {shareLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Share2 className="h-3.5 w-3.5" style={{ color: "var(--swatch-teal)" }} />}
        </button>
      </div>

      {/* Bottom overlay — text directly on image with gradient scrim */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3.5 pb-3.5 pt-12"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)" }}
      >
        {/* Brand eyebrow */}
        <p
          className="text-[8px] uppercase tracking-[0.14em] mb-0.5"
          style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.75)" }}
        >
          {cardOverride?.subheading || product.brand}
        </p>

        {/* Product name */}
        <h3
          className="text-[15px] md:text-[17px] leading-[1.1] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}
        >
          {cardOverride?.heading || product.name}
        </h3>

        {/* Price + View Product button */}
        <div className="flex items-center justify-between mt-2">
          {productDisplayPrice ? (
            <p
              className="text-[14px] font-bold"
              style={{ fontFamily: "'Jost', sans-serif", color: "#fff" }}
            >
              {productDisplayPrice}
            </p>
          ) : <span />}
          {productDestination && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[8px] uppercase tracking-[0.1em]"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "#fff",
                background: "var(--swatch-teal)",
              }}
            >
              {productActionLabel || "View Product"}
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Recommendations;

// Codebase classification: runtime dashboard recommendations viewer.

// Codebase classification: runtime recommendations page.
