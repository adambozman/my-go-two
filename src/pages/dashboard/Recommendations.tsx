import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useKnowledgeCenter } from "@/contexts/knowledge-center-context";
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

const RECOMMENDATION_V2_VERSION_PREFIX = "recommendation-engine-v2";

type RecommendationFavorite = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  hook: string;
  why: string;
  image_url: string | null;
  affiliate_url: string | null;
  search_url: string | null;
  product_query: string | null;
  display_price: string;
  match_label: string;
  source_kind: string | null;
  resolver_source: string | null;
  exact_match_confirmed: boolean;
  match_confidence: number | null;
  saved_at: string;
};

type RecommendationShareRecord = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  hook: string;
  why: string;
  image_url: string | null;
  affiliate_url: string | null;
  search_url: string | null;
  product_query: string | null;
  display_price: string;
  match_label: string;
  source_kind: string | null;
  resolver_source: string | null;
  exact_match_confirmed: boolean;
  match_confidence: number | null;
  shared_at: string;
  share_count: number;
  last_share_method: "native" | "clipboard";
};

type FavoritesPayload = {
  recommendations?: Record<string, RecommendationFavorite>;
  shared_recommendations?: Record<string, RecommendationShareRecord>;
  [key: string]: unknown;
};

type RpcError = { message?: string; status?: number } | null;

type UserPreferencesFavoriteWriter = {
  from: (table: "user_preferences") => {
    upsert: (
      values: {
        user_id: string;
        favorites: Record<string, unknown>;
        updated_at: string;
      },
      options: { onConflict: string },
    ) => Promise<{ error: RpcError }>;
  };
};

const userPreferencesFavoriteWriter = supabase as unknown as UserPreferencesFavoriteWriter;

const getRpcStatus = (error: unknown) =>
  typeof error === "object" && error !== null && "status" in error
    ? Number((error as { status?: unknown }).status)
    : undefined;

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Failed to load recommendations";

const PAGE_SIZE = 4;

function hasResolvedProductImage(product: Product) {
  return hasTrustedRecommendationProductImage(product);
}

function getProductImage(product: Product) {
  return hasResolvedProductImage(product) ? product.image_url! : null;
}

function toRecommendationFavorite(product: Product): RecommendationFavorite {
  return {
    id: getRecommendationStableId(product),
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    hook: product.hook,
    why: product.why,
    image_url: product.image_url ?? null,
    affiliate_url: product.affiliate_url ?? null,
    search_url: product.search_url ?? null,
    product_query: product.product_query ?? null,
    display_price: getRecommendationDisplayPrice(product),
    match_label: getRecommendationMatchLabel(product),
    source_kind: product.source_kind ?? null,
    resolver_source: product.resolver_source ?? null,
    exact_match_confirmed: Boolean(product.exact_match_confirmed),
    match_confidence: product.match_confidence ?? null,
    saved_at: new Date().toISOString(),
  };
}

function toRecommendationShareRecord(
  product: Product,
  method: "native" | "clipboard",
  previous?: RecommendationShareRecord,
): RecommendationShareRecord {
  return {
    id: getRecommendationStableId(product),
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    hook: product.hook,
    why: product.why,
    image_url: product.image_url ?? null,
    affiliate_url: product.affiliate_url ?? null,
    search_url: product.search_url ?? null,
    product_query: product.product_query ?? null,
    display_price: getRecommendationDisplayPrice(product),
    match_label: getRecommendationMatchLabel(product),
    source_kind: product.source_kind ?? null,
    resolver_source: product.resolver_source ?? null,
    exact_match_confirmed: Boolean(product.exact_match_confirmed),
    match_confidence: product.match_confidence ?? null,
    shared_at: new Date().toISOString(),
    share_count: (previous?.share_count ?? 0) + 1,
    last_share_method: method,
  };
}

function isFavoritesPayload(value: unknown): value is FavoritesPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const DEV_USER_IDS = ["e78cff1c-54e3-4365-b172-461b7b6f25e6"];

const Recommendations = () => {
  const { knowledgeDerivations, loading: knowledgeLoading } = useKnowledgeCenter();
  const { subscribed, subscriptionLoading, user } = useAuth();
  const yourVibe = useMemo(() => getYourVibeDerivation(knowledgeDerivations), [knowledgeDerivations]);
  const isDev = user && DEV_USER_IDS.includes(user.id);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activePillar, setActivePillar] = useState<string>("all");
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [savingItems, setSavingItems] = useState<Set<string>>(new Set());
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

  const fetchProducts = useCallback(
    async (forceRefresh = false) => {
    setLoading(true);
    setLoadErrorMessage(null);
    try {
      const activeFunction = RECOMMENDATION_V2_VERSION_PREFIX;
      let { data, error } = await supabase.functions.invoke(activeFunction, {
        body: forceRefresh ? { force_refresh: true } : {},
      });

      // If session expired, refresh and retry once
      if (error && getRpcStatus(error) === 401) {
        await supabase.auth.refreshSession();
        const retry = await supabase.functions.invoke(activeFunction, {
          body: forceRefresh ? { force_refresh: true } : {},
        });
        data = retry.data;
        error = retry.error;
      }

      if (error) throw error;
      const response = parseRecommendationEngineResponse(data);
      setProducts(response.products);
      setGeneratedAt(response.generated_at);
      setIsCached(response.cached);
      setGenerationVersion(response.generation_version ?? activeFunction);
      setInputSnapshotSummary(response.input_snapshot_summary);
      setCurrentPage(1);
    } catch (error: unknown) {
      console.error("Products error:", error);
      const status = getRpcStatus(error);
      const message =
        status === 429
          ? "Recommendation refresh is rate-limited right now. Try again shortly."
          : status === 402
            ? "Recommendation generation is unavailable right now."
            : status === 404
              ? "The rebuilt recommendation engine is not deployed yet."
            : getErrorMessage(error);
      setLoadErrorMessage(message);
      toast.error(hasLoadedProducts ? `${message} Showing your last saved weekly set.` : message);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, [hasLoadedProducts, setCurrentPage]);

  useEffect(() => {
    if (!knowledgeLoading && !hasLoaded) {
      fetchProducts();
    }
  }, [fetchProducts, knowledgeLoading, hasLoaded]);

  useEffect(() => {
    if (!user) {
      setSavedItems(new Set());
      setSavingItems(new Set());
      setSharingItems(new Set());
      return;
    }

    let cancelled = false;

    const loadSavedRecommendations = async () => {
      const { data, error } = await supabase
        .from("user_preferences")
        .select("favorites")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Failed to load saved recommendations:", error);
        return;
      }

      const favorites = isFavoritesPayload(data?.favorites) ? data.favorites : null;
      const recommendations = favorites?.recommendations;

      if (!recommendations || typeof recommendations !== "object") {
        setSavedItems(new Set());
        return;
      }

      setSavedItems(new Set(Object.keys(recommendations)));
    };

    void loadSavedRecommendations();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const toggleSave = useCallback(async (product: Product) => {
    if (!user) return;

    const id = getRecommendationStableId(product);
    const wasSaved = savedItems.has(id);

    setSavedItems((prev) => {
      const next = new Set(prev);
      if (wasSaved) next.delete(id);
      else next.add(id);
      return next;
    });
    setSavingItems((prev) => new Set(prev).add(id));

    try {
      const { data: existingRow, error: loadError } = await supabase
        .from("user_preferences")
        .select("favorites")
        .eq("user_id", user.id)
        .maybeSingle();

      if (loadError) throw loadError;

      const favorites: Record<string, unknown> = isFavoritesPayload(existingRow?.favorites)
        ? { ...(existingRow.favorites as Record<string, unknown>) }
        : {};
      const recommendations = isFavoritesPayload(favorites.recommendations)
        ? { ...(favorites.recommendations as Record<string, RecommendationFavorite>) }
        : {};

      if (wasSaved) {
        delete recommendations[id];
      } else {
        recommendations[id] = toRecommendationFavorite(product);
      }

      favorites.recommendations = recommendations;

      const { error: saveError } = await userPreferencesFavoriteWriter.from("user_preferences").upsert(
        {
          user_id: user.id,
          favorites,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

      if (saveError) throw saveError;

      if (wasSaved) {
        toast("Removed from saved picks");
      } else {
        toast.success("Saved to your profile");
      }
    } catch (error: unknown) {
      setSavedItems((prev) => {
        const next = new Set(prev);
        if (wasSaved) next.add(id);
        else next.delete(id);
        return next;
      });
      toast.error(getErrorMessage(error));
    } finally {
      setSavingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, [savedItems, user]);

  const persistShareActivity = useCallback(async (
    product: Product,
    method: "native" | "clipboard",
  ) => {
    if (!user) return;

    const id = getRecommendationStableId(product);
    const { data: existingRow, error: loadError } = await supabase
      .from("user_preferences")
      .select("favorites")
      .eq("user_id", user.id)
      .maybeSingle();

    if (loadError) throw loadError;

    const favorites: Record<string, unknown> = isFavoritesPayload(existingRow?.favorites)
      ? { ...(existingRow.favorites as Record<string, unknown>) }
      : {};
    const sharedRecommendations = isFavoritesPayload(favorites.shared_recommendations)
      ? { ...(favorites.shared_recommendations as Record<string, RecommendationShareRecord>) }
      : {};

    sharedRecommendations[id] = toRecommendationShareRecord(
      product,
      method,
      sharedRecommendations[id],
    );
    favorites.shared_recommendations = sharedRecommendations;

    const { error: saveError } = await userPreferencesFavoriteWriter.from("user_preferences").upsert(
      {
        user_id: user.id,
        favorites,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    if (saveError) throw saveError;
  }, [user]);

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
        await persistShareActivity(product, "native");
        toast.success("Shared from your share sheet");
        return;
      }

      await navigator.clipboard.writeText(shareText);
      await persistShareActivity(product, "clipboard");
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
  }, [persistShareActivity]);

  const generatedLabel = generatedAt
    ? new Date(generatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : null;
  const isGuestPreview = !subscribed && filtered.length > PAGE_SIZE;

  if (knowledgeLoading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const displayProducts = subscribed ? paginatedProducts : filtered.slice(0, PAGE_SIZE);

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6">
      <div className="mx-auto max-w-[1280px] space-y-4 px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
        {/* ── Category pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, type: "spring", stiffness: 260, damping: 24 }}
          className="flex gap-2 flex-wrap"
        >
          {pillars.map(({ key, label }) => {
            const isActive = activePillar === key;
            return (
              <button key={key} onClick={() => setActivePillar(key)} type="button">
                <Pill variant={isActive ? "active" : "default"}>{label}</Pill>
              </button>
            );
          })}
        </motion.div>

        {/* ── Hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative"
        >
          <Card variant="sand" className="relative overflow-hidden p-5 md:p-6">
            <div className="relative">

              {/* Left — title + persona */}
              <div className="min-w-0 max-w-[780px]">
                <p className="surface-eyebrow-coral mb-2">Go Two / Recommendations</p>
                <h1 className="surface-heading-lg mb-3">
                  Curated Just For You
                </h1>
                {yourVibe?.persona_summary && (
                  <p className="surface-heading-md max-w-[32ch] leading-[1.4]">
                    {yourVibe.persona_summary}
                  </p>
                )}
                {generatedLabel && (
                  <p className="surface-meta mt-3">
                    {isCached ? `Saved · ${generatedLabel}` : `Fresh · ${generatedLabel}`}
                  </p>
                )}
                {isUsingRebuiltEngine && (
                  <p className="surface-meta mt-1">
                    Powered by the rebuilt recommendation engine
                  </p>
                )}
                {isGuestPreview && (
                  <p className="surface-meta mt-1">
                    Showing 4 preview picks from this week&apos;s set
                  </p>
                )}
                {isUsingRebuiltEngine && recommendationTargetCount && recommendationTargetCount < 12 && (
                  <p className="surface-meta mt-1">
                    Profile still learning · showing {recommendationTargetCount} stronger picks while more taste data builds
                    {recommendationInputLevel ? ` (${recommendationInputLevel})` : ""}
                  </p>
                )}
                {isDev && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 gap-1.5 text-xs opacity-60 hover:opacity-100"
                    disabled={loading}
                    onClick={() => fetchProducts(true)}
                  >
                    {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                    Dev Refresh
                  </Button>
                )}
              </div>

              {/* Right — compact role rail */}
              {subscribed && (
                <Button
                  onClick={() => fetchProducts(true)}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                  <span>{loading ? "Loading" : "Refresh"}</span>
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {loadErrorMessage && hasLoadedProducts && (
          <Card variant="sand" className="border border-amber-200/80 bg-amber-50/70 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="surface-heading-md">Showing your last saved recommendations.</p>
                <p className="surface-body">{loadErrorMessage}</p>
              </div>
              <Button
                onClick={() => fetchProducts(true)}
                disabled={loading}
                variant="outline"
                size="sm"
                className="gap-1.5 self-start sm:self-auto"
              >
                {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                Try Again
              </Button>
            </div>
          </Card>
        )}

        {/* ── Product grid ── */}
        {loading && products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="surface-body">
              Curating your picks…
            </p>
          </div>
        ) : displayProducts.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePillar}-${currentPage}-${subscribed ? "live" : "guest"}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 lg:grid-cols-2"
              >
                {displayProducts.map((product, i) => {
                  const itemId = getRecommendationStableId(product);
                  const isSaved = savedItems.has(itemId);
                  const isSaving = savingItems.has(itemId);
                  const isSharing = sharingItems.has(itemId);
                  return (
                    <ProductCard
                      key={itemId}
                      product={product}
                      index={i}
                      isSaved={isSaved}
                      saveLoading={isSaving}
                      shareLoading={isSharing}
                      showDiagnostics={Boolean(isDev)}
                      onToggleSave={() => subscribed ? void toggleSave(product) : toast("Upgrade to save picks")}
                      onShare={() => void handleShare(product)}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {subscribed && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                label={`Page ${currentPage} of ${totalPages}`}
              />
            )}
          </>
        ) : loadErrorMessage && !hasLoadedProducts ? (
          <Card variant="sand" className="p-8 text-center">
            <p className="surface-heading-md mb-2">
              Recommendations are temporarily unavailable.
            </p>
            <p className="surface-body">
              {loadErrorMessage}
            </p>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => fetchProducts(true)}
                disabled={loading}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                Try Again
              </Button>
            </div>
          </Card>
        ) : !subscribed ? (
          <Card variant="sand" className="p-8 text-center">
            <p className="surface-heading-md mb-2">
              Your curated picks load here.
            </p>
            <p className="surface-body">
              Upgrade to unlock the full weekly set and saving.
            </p>
          </Card>
        ) : hasLoaded ? (
          <Card variant="sand" className="p-8 text-center">
            <p className="surface-heading-md mb-2">
              No picks in this category yet.
            </p>
            <p className="surface-body">
              Try refreshing or answer more Know Me questions to sharpen the read.
            </p>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

function ProductCard({
  product,
  index,
  isSaved,
  saveLoading,
  shareLoading,
  showDiagnostics,
  onToggleSave,
  onShare,
}: {
  product: Product;
  index: number;
  isSaved: boolean;
  saveLoading: boolean;
  shareLoading: boolean;
  showDiagnostics: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const productImage = getProductImage(product);
  const productDestination = getRecommendationDestination(product);
  const productMatchLabel = getRecommendationMatchLabel(product);
  const productActionLabel = getRecommendationActionLabel(product);
  const productDisplayPrice = getRecommendationDisplayPrice(product);
  const [imageFailed, setImageFailed] = useState(false);
  const imageSuppressedByTrust = Boolean(product.image_url) && !productImage;
  const showProductImage = Boolean(productImage) && !imageFailed;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 24 }}
      className="relative"
    >
      <Card variant="sand" className="relative flex h-full flex-col overflow-hidden">
        <div className="relative h-[200px] overflow-hidden sm:h-[220px]">
          {showProductImage ? (
            <img
              src={productImage}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[linear-gradient(135deg,#f3ecdf_0%,#ece3d1_100%)] p-4">
              <div className="max-w-[80%] rounded-2xl bg-white/70 px-3 py-2 backdrop-blur-sm">
                <p className="surface-meta">{product.brand}</p>
                <p className="surface-heading-md mt-1">{product.name}</p>
                <p className="surface-meta mt-2">
                  {productMatchLabel}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 pt-4 flex flex-col gap-3">
          <div className="min-w-0">
            <p className="surface-meta">
              {product.brand}
            </p>
            <h3 className="surface-heading-md mt-1">
              {product.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="surface-meta">
              {productMatchLabel}
            </p>
            <p className="surface-meta">{productDisplayPrice}</p>
          </div>

          <p className="surface-heading-md leading-[1.18]">
            {product.hook}
          </p>

          <p className="surface-body leading-relaxed">
            {product.why}
          </p>

          {showDiagnostics && (product.recommendation_match_confidence || product.explanation) ? (
            <details className="rounded-2xl border border-white/60 bg-white/45 px-3 py-2 text-left">
              <summary className="cursor-pointer text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Recommendation Notes
              </summary>
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                {typeof product.recommendation_match_confidence === "number" ? (
                  <p>Match confidence: {product.recommendation_match_confidence}</p>
                ) : null}
                {product.explanation?.input_level ? (
                  <p>
                    Input level: {product.explanation.input_level}
                    {typeof product.explanation.input_score === "number" ? ` (${product.explanation.input_score})` : ""}
                  </p>
                ) : null}
                {product.explanation?.decision ? <p>Decision: {product.explanation.decision}</p> : null}
                {product.explanation?.bank_state ? <p>Bank state: {product.explanation.bank_state}</p> : null}
                {product.explanation?.image_status ? <p>Image status: {product.explanation.image_status}</p> : null}
                {imageSuppressedByTrust ? <p>Display image: withheld by truth guard</p> : null}
                {imageFailed ? <p>Display image: failed to load in browser</p> : null}
                {product.recommendation_match_reasons?.length ? (
                  <p>Reasons: {product.recommendation_match_reasons.join(", ")}</p>
                ) : null}
              </div>
            </details>
          ) : null}

          <div className="mt-auto pt-1 flex items-center gap-2">
            {productDestination && productActionLabel ? (
              <Button
                onClick={() => {
                  window.open(productDestination, "_blank", "noopener,noreferrer");
                }}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <ExternalLink className="h-3 w-3" />
                {productActionLabel}
              </Button>
            ) : null}

            <Button onClick={onToggleSave} variant="outline" size="sm" className="gap-1.5" disabled={saveLoading}>
              {saveLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Bookmark className="h-3 w-3" />}
              {isSaved ? "Saved" : "Save"}
            </Button>

            <Button
              onClick={onShare}
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={shareLoading}
            >
              {shareLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Share2 className="h-3 w-3" />}
              Share
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default Recommendations;
