import { useState, useEffect, useMemo, useRef } from "react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Loader2, Bookmark, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { trackAdEvent } from "@/lib/adTracking";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/usePagination";
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
  is_sponsored?: boolean;
  affiliate_url?: string | null;
  sponsored_id?: string | null;
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
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--swatch-teal)" }} />
      </div>
    );
  }

  const displayProducts = subscribed ? paginatedProducts : filtered.slice(0, PAGE_SIZE);

  return (
    <div className="h-full overflow-y-auto px-1 pb-6">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-4 md:pt-6 space-y-4">

        {/* ── Hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="card-design-sand rounded-[34px] p-5 md:p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.14), transparent 30%), linear-gradient(130deg, rgba(255,255,255,0.05), transparent 55%)" }} />
          <div className="relative grid gap-5 md:grid-cols-[minmax(0,1fr)_260px] md:items-end">

            {/* Left — title + persona */}
            <div className="min-w-0 max-w-[780px]">
              <p className="mb-2 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                Go Two / Recommendations
              </p>
              <h1 className="mb-3 text-[28px] md:text-[36px] leading-[0.96]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
                Curated Just For You
              </h1>
              {personalization?.persona_summary && (
                <p className="max-w-[42ch] text-[19px] md:text-[21px] leading-[1.36]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: "italic", color: "var(--swatch-teal)" }}>
                  {personalization.persona_summary}
                </p>
              )}
              {generatedLabel && (
                <p className="mt-3 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  {isCached ? `Saved · ${generatedLabel}` : `Fresh · ${generatedLabel}`}
                </p>
              )}
            </div>

            {/* Right — compact role rail */}
            <div
              className="rounded-[26px] p-4 md:p-5 backdrop-blur-md md:self-stretch"
              style={{
                background: "rgba(255,255,255,0.22)",
                border: "1px solid rgba(var(--swatch-teal-rgb), 0.16)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.42)",
              }}
            >
              <p className="mb-3 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                Think of the AI as your
              </p>
              <div className="space-y-2.5">
                {[
                  "Personal Style Strategist",
                  "Atmosphere Architect",
                  "Intentional Gift Connoisseur",
                ].map((label) => (
                  <div
                    key={label}
                    className="rounded-full px-3.5 py-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontStyle: "italic",
                      fontSize: 14,
                      background: "rgba(255,255,255,0.34)",
                      border: "1px solid rgba(var(--swatch-teal-rgb), 0.16)",
                      color: "var(--swatch-teal)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              {subscribed && (
                <button
                  onClick={() => fetchProducts(true)}
                  disabled={loading}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-opacity disabled:opacity-50"
                  style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.16)" }}
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} style={{ color: "var(--swatch-teal)" }} />
                  <span className="text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    {loading ? "Loading" : "Refresh"}
                  </span>
                </button>
              )}
            </div>

          </div>
        </motion.div>

        {/* ── Category pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 24 }}
          className="flex gap-2 flex-wrap"
        >
          {PILLARS.map(({ key, label }) => {
            const isActive = activePillar === key;
            return (
              <button
                key={key}
                onClick={() => setActivePillar(key)}
                className="px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.12em] transition-all"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 500,
                  background: isActive ? "var(--swatch-teal)" : "rgba(255,255,255,0.22)",
                  color: isActive ? "#fff" : "var(--swatch-antique-coin)",
                  border: isActive ? "1px solid var(--swatch-teal)" : "1px solid rgba(var(--swatch-teal-rgb), 0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Product grid ── */}
        {loading && products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--swatch-teal)" }} />
            <p className="text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
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
                className="grid md:grid-cols-2 gap-4"
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
                      onShare={() => product.affiliate_url ? undefined : handleShare(product)}
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
          <div className="card-design-sand rounded-[28px] p-8 text-center">
            <p className="text-[18px] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
              No picks in this category yet.
            </p>
            <p className="text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Try refreshing or answer more Know Me questions to sharpen the read.
            </p>
          </div>
        ) : !subscribed ? (
          <div className="card-design-sand rounded-[28px] p-8 text-center">
            <p className="text-[18px] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
              Your curated picks load here.
            </p>
            <p className="text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Upgrade to unlock the full weekly set and saving.
            </p>
          </div>
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
  const tracked = useRef(false);

  useEffect(() => {
    if (!product.is_sponsored || !product.sponsored_id || tracked.current) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackAdEvent(product.sponsored_id!, "impression", "blended");
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [product.is_sponsored, product.sponsored_id]);

  const handleAction = () => {
    if (product.is_sponsored && product.sponsored_id) {
      trackAdEvent(product.sponsored_id, "click", "blended");
    }
    if (product.affiliate_url) {
      window.open(product.affiliate_url, "_blank", "noopener");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 24 }}
      className="card-design-sand rounded-[28px] relative overflow-hidden flex flex-col"
    >
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(var(--swatch-teal-rgb), 0.10), transparent 70%)" }} />

      <div className="relative">
        <div className="relative h-[220px] overflow-hidden rounded-[24px] rounded-b-[18px]">
          <img src={getProductImage(product)} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,16,18,0.04) 0%, rgba(12,16,18,0.18) 100%)" }} />
          {(product.is_partner_pick || product.is_sponsored) && (
            <div className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", background: "rgba(255,255,255,0.82)", color: "var(--swatch-cedar-grove)", border: "1px solid rgba(255,255,255,0.7)" }}>
              {product.is_sponsored ? "Curated Pick" : "Partner Pick"}
            </div>
          )}
          <div className="absolute right-4 top-4 rounded-full px-3 py-1.5 text-[14px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, background: "rgba(255,255,255,0.86)", color: "var(--swatch-cedar-grove)", border: "1px solid rgba(255,255,255,0.74)" }}>
            {product.price}
          </div>
        </div>

        <div className="p-5 pt-4 flex flex-col gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              {product.brand}
            </p>
            <h3 className="mt-1 text-[22px] leading-[1.02]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
              {product.name}
            </h3>
          </div>

          <p className="text-[18px] leading-[1.18]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: "italic", color: "var(--swatch-teal)" }}>
            {product.hook}
          </p>

          <p className="text-[12px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
            {product.why}
          </p>

          <div className="mt-auto pt-1 flex items-center gap-2">
          <button
            onClick={onToggleSave}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.1em] transition-all"
            style={{
              fontFamily: "'Jost', sans-serif",
              background: isSaved ? "rgba(var(--swatch-teal-rgb), 0.14)" : "rgba(255,255,255,0.28)",
              color: isSaved ? "var(--swatch-teal)" : "var(--swatch-antique-coin)",
              border: isSaved ? "1px solid rgba(var(--swatch-teal-rgb), 0.3)" : "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <Bookmark className="h-3 w-3" />
            {isSaved ? "Saved" : "Save"}
          </button>

          <button
            onClick={product.affiliate_url ? handleAction : onShare}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.1em] transition-all"
            style={{
              fontFamily: "'Jost', sans-serif",
              background: "rgba(var(--swatch-cedar-grove-rgb), 0.08)",
              color: "var(--swatch-cedar-grove)",
              border: "1px solid rgba(var(--swatch-cedar-grove-rgb), 0.18)",
            }}
          >
            {product.affiliate_url ? <ExternalLink className="h-3 w-3" /> : <Share2 className="h-3 w-3" />}
            {product.affiliate_url ? "Open" : "Share"}
          </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Recommendations;
