import { useState, useEffect, useMemo, useRef } from "react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Loader2, Bookmark, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/usePagination";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import clothingJacketImage from "@/assets/templates/clothing-jacket.jpg";
import dressShirtImage from "@/assets/templates/clothing-dress-shirt.jpg";
import espressoImage from "@/assets/templates/coffee-espresso.jpg";
import homeDecorImage from "@/assets/templates/home-decor.jpg";
import cameraImage from "@/assets/templates/tech-camera.jpg";
import headphonesImage from "@/assets/templates/tech-headphones.jpg";
import thoughtfulGiftImage from "@/assets/styles/thoughtful-gift.jpg";
import luxuriousGiftImage from "@/assets/styles/luxurious-gift.jpg";

interface Product {
  name: string;
  brand: string;
  price: string;
  category: string;
  hook: string;
  why: string;
  is_partner_pick: boolean;
  affiliate_url?: string | null;
  search_url?: string | null;
  product_query?: string | null;
  image_url?: string | null;
  source_kind?: string;
  source_version?: string;
}

const PILLARS = [
  { key: "all", label: "For You", matches: ["food", "clothes", "tech", "home"] },
  { key: "clothes", label: "Style & Fit", matches: ["clothes"] },
  { key: "food", label: "Food & Drink", matches: ["food"] },
  { key: "home", label: "Home & Living", matches: ["home"] },
  { key: "tech", label: "Tech & Gear", matches: ["tech"] },
] as const;

const PAGE_SIZE = 4;

const PRODUCT_IMAGE_BANK: Record<Product["category"], string[]> = {
  clothes: [clothingJacketImage, dressShirtImage],
  food: [espressoImage, thoughtfulGiftImage],
  home: [homeDecorImage, luxuriousGiftImage],
  tech: [cameraImage, headphonesImage],
};

const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  "uniqlo:supima cotton crew neck t-shirt": dressShirtImage,
  "buck mason:pima curved hem tee": clothingJacketImage,
  "everlane:the organic cotton oxford": dressShirtImage,
  "cos:relaxed cotton overshirt": clothingJacketImage,
  "vince:cashmere crew": clothingJacketImage,
  "patagonia:better sweater jacket": clothingJacketImage,
  "lululemon:abc classic-fit trouser": dressShirtImage,
  "ralph lauren:custom fit mesh polo": dressShirtImage,
  "todd snyder:made in l.a. jersey tee": clothingJacketImage,
  "aimé leon dore:uniform crewneck tee": clothingJacketImage,
  "blue bottle:whole bean coffee subscription": espressoImage,
  "omsom:starter sauce set": thoughtfulGiftImage,
  "fishwife:smoked salmon trio": thoughtfulGiftImage,
  "brightland:artist capsule olive oil set": thoughtfulGiftImage,
  "nespresso:vertuo pop+": espressoImage,
  "parachute:linen sheet set": luxuriousGiftImage,
  "dyson:purifier cool gen1": homeDecorImage,
  "our place:cast iron always pan": homeDecorImage,
  "brooklinen:super-plush bath towels": luxuriousGiftImage,
  "sony:wh-1000xm5 headphones": headphonesImage,
  "anker:prime 20k power bank": headphonesImage,
  "logitech:mx mechanical mini": cameraImage,
  "gopro:hero13 black": cameraImage,
  "apple:apple watch se": headphonesImage,
};

function getProductImage(product: Product) {
  if (product.image_url) return product.image_url;
  const key = `${product.brand}:${product.name}`.toLowerCase();
  const override = PRODUCT_IMAGE_OVERRIDES[key];
  if (override) return override;
  const bank = PRODUCT_IMAGE_BANK[product.category] || PRODUCT_IMAGE_BANK.clothes;
  const seed = `${product.brand}-${product.name}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return bank[hash % bank.length];
}

const Recommendations = () => {
  const { personalization, loading: personalizationLoading } = usePersonalization();
  const { subscribed } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activePillar, setActivePillar] = useState<string>("all");
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);

  const fetchProducts = async (forceRefresh = false) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-products", {
        body: forceRefresh ? { force_refresh: true } : {},
      });
      if (error) throw error;
      if (data?.products) {
        setProducts(data.products);
        setGeneratedAt(data.generated_at ?? null);
        setIsCached(Boolean(data.cached));
        setCurrentPage(1);
      }
    } catch (e: any) {
      console.error("Products error:", e);
      if (e?.status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (e?.status === 402) toast.error("AI credits exhausted.");
      else toast.error("Failed to load recommendations");
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    if (!personalizationLoading && personalization && !hasLoaded) {
      fetchProducts();
    }
  }, [personalizationLoading, personalization, hasLoaded]);

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

  const toggleSave = (id: string) => {
    setSavedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast("Removed from profile"); }
      else { next.add(id); toast.success("Saved to your profile"); }
      return next;
    });
  };

  const handleShare = (product: Product) => {
    toast.success(`Ready to share ${product.name} with your partner`);
  };

  const generatedLabel = generatedAt
    ? new Date(generatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : null;

  if (personalizationLoading) {
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
                {personalization?.persona_summary && (
                  <p className="surface-heading-md max-w-[32ch] leading-[1.4]">
                    {personalization.persona_summary}
                  </p>
                )}
                {generatedLabel && (
                  <p className="surface-meta mt-3">
                    {isCached ? `Saved · ${generatedLabel}` : `Fresh · ${generatedLabel}`}
                  </p>
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
                  const itemId = `${product.brand}-${product.name}`;
                  const isSaved = savedItems.has(itemId);
                  return (
                    <ProductCard
                      key={itemId + i}
                      product={product}
                      index={i}
                      isSaved={isSaved}
                      onToggleSave={() => subscribed ? toggleSave(itemId) : toast("Upgrade to save picks")}
                      onShare={() => (product.affiliate_url || product.search_url) ? undefined : handleShare(product)}
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
  onToggleSave,
  onShare,
}: {
  product: Product;
  index: number;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleAction = () => {
    if (product.affiliate_url) {
      window.open(product.affiliate_url, "_blank", "noopener");
      return;
    }
    if (product.search_url) {
      window.open(product.search_url, "_blank", "noopener");
    }
  };

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
          <img src={getProductImage(product)} alt={product.name} className="h-full w-full object-cover" />
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
            {product.is_partner_pick && (
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
            <Button onClick={onToggleSave} variant="outline" size="sm" className="gap-1.5">
              <Bookmark className="h-3 w-3" />
              {isSaved ? "Saved" : "Save"}
            </Button>

            <Button
              onClick={product.affiliate_url || product.search_url ? handleAction : onShare}
              variant={product.affiliate_url || product.search_url ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
            >
              {product.affiliate_url || product.search_url ? <ExternalLink className="h-3 w-3" /> : <Share2 className="h-3 w-3" />}
              {product.affiliate_url ? "View Product" : product.search_url ? "Search Brand" : "Share"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default Recommendations;
