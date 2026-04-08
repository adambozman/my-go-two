import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useKnowledgeCenter } from "@/contexts/knowledge-center-context";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Loader2, Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/usePagination";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { getYourVibeDerivation } from "@/lib/knowledgeCenter";
// ── Clothes bank (8 diverse images) ──
import clothingJacketImage from "@/assets/templates/clothing-jacket.jpg";
import dressShirtImage from "@/assets/templates/clothing-dress-shirt.jpg";
import clothingSweaterImage from "@/assets/templates/clothing-sweater.jpg";
import clothingPoloImage from "@/assets/templates/clothing-polo.jpg";
import clothingBlazerImage from "@/assets/templates/clothing-blazer.jpg";
import clothingTshirtImage from "@/assets/templates/clothing-tshirt.jpg";
import clothingCoatImage from "@/assets/templates/clothing-coat.jpg";
import clothingHoodieImage from "@/assets/templates/clothing-hoodie.jpg";

// ── Food bank (8 diverse images) ──
import espressoImage from "@/assets/templates/coffee-espresso.jpg";
import coffeeHotImage from "@/assets/templates/coffee-hot.jpg";
import foodItalianImage from "@/assets/templates/food-italian.jpg";
import foodSushiImage from "@/assets/templates/food-sushi.jpg";
import foodMexicanImage from "@/assets/templates/food-mexican.jpg";
import groceryProduceImage from "@/assets/templates/grocery-produce.jpg";
import favoriteMealsImage from "@/assets/templates/favorite-meals.jpg";
import diningImage from "@/assets/styles/dining.jpg";

// ── Home bank (8 diverse images) ──
import homeDecorImage from "@/assets/templates/home-decor.jpg";
import homeBeddingImage from "@/assets/templates/home-bedding.jpg";
import homeLightingImage from "@/assets/templates/home-lighting.jpg";
import homeFurnitureImage from "@/assets/templates/home-furniture.jpg";
import homeArtImage from "@/assets/templates/home-art.jpg";
import kitchenCookwareImage from "@/assets/templates/kitchen-cookware.jpg";
import homeRugImage from "@/assets/templates/home-rug.jpg";
import homeSofaImage from "@/assets/templates/home-sofa.jpg";

// ── Tech bank (8 diverse images) ──
import cameraImage from "@/assets/templates/tech-camera.jpg";
import headphonesImage from "@/assets/templates/tech-headphones.jpg";
import gamingConsoleImage from "@/assets/templates/gaming-console.jpg";
import gamingPcImage from "@/assets/templates/gaming-pc.jpg";
import booksImage from "@/assets/templates/books-reading.jpg";
import fitnessImage from "@/assets/styles/fitness.jpg";
import qualityImage from "@/assets/styles/quality.jpg";
import practicalGiftImage from "@/assets/styles/practical-gift.jpg";

interface Product {
  name: string;
  brand: string;
  price: string;
  category: string;
  hook: string;
  why: string;
  is_connection_pick?: boolean;
  affiliate_url?: string | null;
  search_url?: string | null;
  product_query?: string | null;
  image_url?: string | null;
  source_kind?: string;
  source_version?: string;
}

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

const getRpcStatus = (error: unknown) =>
  typeof error === "object" && error !== null && "status" in error
    ? Number((error as { status?: unknown }).status)
    : undefined;

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Failed to load recommendations";

const PILLARS = [
  { key: "all", label: "For You", matches: ["food", "clothes", "tech", "home"] },
  { key: "clothes", label: "Style & Fit", matches: ["clothes"] },
  { key: "food", label: "Food & Drink", matches: ["food"] },
  { key: "home", label: "Home & Living", matches: ["home"] },
  { key: "tech", label: "Tech & Gear", matches: ["tech"] },
] as const;

const PAGE_SIZE = 4;

const PRODUCT_IMAGE_BANK: Record<Product["category"], string[]> = {
  clothes: [
    clothingJacketImage, dressShirtImage, clothingSweaterImage, clothingPoloImage,
    clothingBlazerImage, clothingTshirtImage, clothingCoatImage, clothingHoodieImage,
  ],
  food: [
    espressoImage, coffeeHotImage, foodItalianImage, foodSushiImage,
    foodMexicanImage, groceryProduceImage, favoriteMealsImage, diningImage,
  ],
  home: [
    homeDecorImage, homeBeddingImage, homeLightingImage, homeFurnitureImage,
    homeArtImage, kitchenCookwareImage, homeRugImage, homeSofaImage,
  ],
  tech: [
    cameraImage, headphonesImage, gamingConsoleImage, gamingPcImage,
    booksImage, fitnessImage, qualityImage, practicalGiftImage,
  ],
};

function getFallbackImage(product: Product) {
  const bank = PRODUCT_IMAGE_BANK[product.category] || PRODUCT_IMAGE_BANK.clothes;
  const seed = `${product.brand}-${product.name}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return bank[hash % bank.length];
}

function hasResolvedProductImage(product: Product) {
  return Boolean(
    product.source_kind === "specific-product" &&
    product.affiliate_url &&
    product.image_url &&
    /^https?:\/\//i.test(product.image_url),
  );
}

function getProductImage(product: Product) {
  if (hasResolvedProductImage(product)) return product.image_url!;
  return getFallbackImage(product);
}

function getProductId(product: Product) {
  return `${product.category}:${product.brand}:${product.name}`.toLowerCase();
}

function toRecommendationFavorite(product: Product): RecommendationFavorite {
  return {
    id: getProductId(product),
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
    saved_at: new Date().toISOString(),
  };
}

function toRecommendationShareRecord(
  product: Product,
  method: "native" | "clipboard",
  previous?: RecommendationShareRecord,
): RecommendationShareRecord {
  return {
    id: getProductId(product),
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

  const activePillarConfig = useMemo(
    () => PILLARS.find((pillar) => pillar.key === activePillar) || PILLARS[0],
    [activePillar],
  );

  const filtered = useMemo(() => {
    if (activePillar === "all") return products;
    return products.filter((p) => (activePillarConfig.matches as readonly string[]).includes(p.category));
  }, [products, activePillar, activePillarConfig]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems: paginatedProducts } = usePagination({
    items: filtered,
    pageSize: PAGE_SIZE,
    resetKeys: [activePillar],
  });

  const fetchProducts = useCallback(
    async (forceRefresh = false) => {
    setLoading(true);
    try {
      let { data, error } = await supabase.functions.invoke("ai-products", {
        body: forceRefresh ? { force_refresh: true } : {},
      });

      // If session expired, refresh and retry once
      if (error && getRpcStatus(error) === 401) {
        await supabase.auth.refreshSession();
        const retry = await supabase.functions.invoke("ai-products", {
          body: forceRefresh ? { force_refresh: true } : {},
        });
        data = retry.data;
        error = retry.error;
      }

      if (error) throw error;
      if (data?.products) {
        setProducts(data.products);
        setGeneratedAt(data.generated_at ?? null);
        setIsCached(Boolean(data.cached));
        setCurrentPage(1);
      }
    } catch (error: unknown) {
      console.error("Products error:", error);
      const status = getRpcStatus(error);
      if (status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (status === 402) toast.error("AI credits exhausted.");
      else toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, [setCurrentPage]);

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

    const id = getProductId(product);
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

      const favorites = isFavoritesPayload(existingRow?.favorites) ? { ...existingRow.favorites } : {};
      const recommendations = isFavoritesPayload(favorites.recommendations)
        ? { ...(favorites.recommendations as Record<string, RecommendationFavorite>) }
        : {};

      if (wasSaved) {
        delete recommendations[id];
      } else {
        recommendations[id] = toRecommendationFavorite(product);
      }

      favorites.recommendations = recommendations;

      const { error: saveError } = await supabase.from("user_preferences").upsert(
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

    const id = getProductId(product);
    const { data: existingRow, error: loadError } = await supabase
      .from("user_preferences")
      .select("favorites")
      .eq("user_id", user.id)
      .maybeSingle();

    if (loadError) throw loadError;

    const favorites = isFavoritesPayload(existingRow?.favorites) ? { ...existingRow.favorites } : {};
    const sharedRecommendations = isFavoritesPayload(favorites.shared_recommendations)
      ? { ...(favorites.shared_recommendations as Record<string, RecommendationShareRecord>) }
      : {};

    sharedRecommendations[id] = toRecommendationShareRecord(
      product,
      method,
      sharedRecommendations[id],
    );
    favorites.shared_recommendations = sharedRecommendations;

    const { error: saveError } = await supabase.from("user_preferences").upsert(
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
    const id = getProductId(product);
    const productUrl = product.affiliate_url || product.search_url || null;
    const shareText = [
      `${product.brand} ${product.name}`,
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
          text: `${product.hook}\n\n${product.why}`,
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
          {PILLARS.map(({ key, label }) => {
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
                  const itemId = getProductId(product);
                  const isSaved = savedItems.has(itemId);
                  const isSaving = savingItems.has(itemId);
                  const isSharing = sharingItems.has(itemId);
                  return (
                    <ProductCard
                      key={itemId + i}
                      product={product}
                      index={i}
                      isSaved={isSaved}
                      saveLoading={isSaving}
                      shareLoading={isSharing}
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
        ) : hasLoaded ? (
          <Card variant="sand" className="p-8 text-center">
            <p className="surface-heading-md mb-2">
              No picks in this category yet.
            </p>
            <p className="surface-body">
              Try refreshing or answer more Know Me questions to sharpen the read.
            </p>
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
  onToggleSave,
  onShare,
}: {
  product: Product;
  index: number;
  isSaved: boolean;
  saveLoading: boolean;
  shareLoading: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
          <img
            src={getProductImage(product)}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              const fallback = getFallbackImage(product);
              if ((e.target as HTMLImageElement).src !== fallback) {
                (e.target as HTMLImageElement).src = fallback;
              }
            }}
          />
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
                      {product.is_connection_pick && (
              <p className="surface-meta">
                {product.source_kind === "specific-product" ? "Exact Match" : "Search Match"}
              </p>
            )}
            <p className="surface-meta">{product.price}</p>
          </div>

          <p className="surface-heading-md leading-[1.18]">
            {product.hook}
          </p>

          <p className="surface-body leading-relaxed">
            {product.why}
          </p>

          <div className="mt-auto pt-1 flex items-center gap-2">
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

// Codebase classification: runtime recommendations page.
// Codebase classification: runtime recommendations page.
