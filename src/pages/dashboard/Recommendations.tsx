import { useState, useEffect, useMemo, useRef } from "react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Loader2, Bookmark, Share2, Award, ExternalLink, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { trackAdEvent } from "@/lib/adTracking";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/usePagination";

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
}

const PILLARS = [
  { key: "all",           label: "For You" },
  { key: "style-fit",     label: "Style & Fit" },
  { key: "food-drink",    label: "Food & Drink" },
  { key: "gifts-wishlist",label: "Gifts & Wishlist" },
  { key: "home-living",   label: "Home & Living" },
  { key: "entertainment", label: "Entertainment" },
] as const;

const PAGE_SIZE = 4;

const LOCKED_PREVIEW: Product[] = [
  {
    name: "Sofi Wool Zip",
    brand: "Aurel",
    price: "$128",
    category: "style-fit",
    hook: "A polished layer that still feels easy.",
    why: "Based on saved fit and texture preferences.",
    is_partner_pick: true,
  },
  {
    name: "Countertop Espresso Set",
    brand: "Forma",
    price: "$89",
    category: "home-living",
    hook: "A daily ritual upgrade with minimal footprint.",
    why: "Fits the home + coffee pattern in the profile.",
    is_partner_pick: false,
  },
  {
    name: "Tasting Menu Night",
    brand: "Luma Table",
    price: "$72",
    category: "food-drink",
    hook: "A date-night pick with a little ceremony.",
    why: "Leans into shared dining and occasion-driven gifting.",
    is_partner_pick: true,
  },
  {
    name: "Pocket Film Camera",
    brand: "Northline",
    price: "$149",
    category: "entertainment",
    hook: "Playful enough to feel personal, useful enough to keep using.",
    why: "Matches memory-making and travel-friendly signals.",
    is_partner_pick: false,
  },
];

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
    if (!subscribed) return;
    if (!personalizationLoading && personalization && !hasLoaded) {
      fetchProducts();
    }
  }, [personalizationLoading, personalization, hasLoaded, subscribed]);

  const filtered = useMemo(() => {
    if (activePillar === "all") return products;
    return products.filter((p) => p.category === activePillar);
  }, [products, activePillar]);

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

  const previewProducts = LOCKED_PREVIEW.filter((p) =>
    activePillar === "all" ? true : p.category === activePillar
  );

  const displayProducts = subscribed ? paginatedProducts : previewProducts;

  return (
    <div className="h-full overflow-y-auto px-1 pb-6">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-4 md:pt-6 space-y-4">

        {/* ── Hero row ── */}
        <div className="grid lg:grid-cols-12 gap-4">

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="lg:col-span-8 card-design-overlay-teal rounded-[34px] p-6 md:p-7 relative overflow-hidden"
            style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.14), transparent 30%), linear-gradient(130deg, rgba(255,255,255,0.05), transparent 55%)" }} />
            <div className="relative flex flex-col h-full gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                    Go Two / Recommendations
                  </p>
                  <h1 className="text-[44px] md:text-[56px] leading-[0.9] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                    Curated<br />For You
                  </h1>
                </div>

                {/* Refresh */}
                {subscribed && (
                  <button
                    onClick={() => fetchProducts(true)}
                    disabled={loading}
                    className="rounded-[20px] px-4 py-3 backdrop-blur-md inline-flex items-center gap-2 flex-shrink-0 transition-opacity disabled:opacity-50"
                    style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} style={{ color: "var(--swatch-teal)" }} />
                    <span className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                      {loading ? "Loading" : "Refresh"}
                    </span>
                  </button>
                )}
              </div>

              {/* Persona summary */}
              {personalization?.persona_summary && (
                <p className="text-[18px] leading-snug max-w-[52ch]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: "italic", color: "var(--swatch-viridian-odyssey)" }}>
                  {personalization.persona_summary}
                </p>
              )}

              <div className="flex items-center gap-3 flex-wrap mt-auto">
                {/* Freshness */}
                {generatedLabel && (
                  <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    {isCached ? `Saved · ${generatedLabel}` : `Fresh · ${generatedLabel}`}
                  </span>
                )}

                {/* Partial access pill */}
                {!subscribed && (
                  <div className="rounded-[16px] px-3 py-1.5 backdrop-blur-md inline-flex items-center gap-2" style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                    <span className="text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                      Preview mode
                    </span>
                    <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                      · Premium unlocks the live weekly feed
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Side stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, type: "spring", stiffness: 260, damping: 24 }}
            className="lg:col-span-4 card-design-overlay-teal rounded-[34px] p-5 md:p-6 relative overflow-hidden flex flex-col justify-between"
            style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
          >
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }} />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                How it works
              </p>
              <p className="text-[28px] leading-[1.0] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                Built from your profile, not a trending feed.
              </p>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                Every pick is generated from your Know Me answers. The more you fill in, the sharper the read.
              </p>
            </div>
            <div className="relative mt-5 rounded-[20px] px-4 py-3 backdrop-blur-md inline-flex items-center gap-2 self-start" style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
              <span className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                {subscribed ? `${products.length} picks this week` : "Preview — 4 picks"}
              </span>
              <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--swatch-teal)" }} />
            </div>
          </motion.div>
        </div>

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
                  background: isActive ? "var(--swatch-viridian-odyssey)" : "rgba(255,255,255,0.22)",
                  color: isActive ? "#fff" : "var(--swatch-antique-coin)",
                  border: isActive ? "1px solid var(--swatch-viridian-odyssey)" : "1px solid rgba(var(--swatch-teal-rgb), 0.2)",
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
                key={`${activePillar}-${currentPage}-${subscribed ? "live" : "preview"}`}
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
          <div className="card-design-overlay-teal rounded-[28px] p-8 text-center" style={{ boxShadow: "0 14px 34px rgba(30,74,82,0.08)" }}>
            <p className="text-[18px] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
              No picks in this category yet.
            </p>
            <p className="text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Try refreshing or answer more Know Me questions to sharpen the read.
            </p>
          </div>
        ) : !subscribed ? (
          <div className="card-design-overlay-teal rounded-[28px] p-8 text-center" style={{ boxShadow: "0 14px 34px rgba(30,74,82,0.08)" }}>
            <p className="text-[18px] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
              Preview picks appear here.
            </p>
            <p className="text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Select a category above to filter.
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
      className="card-design-overlay-teal rounded-[28px] p-5 relative overflow-hidden flex flex-col"
      style={{ boxShadow: "0 14px 34px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.48)" }}
    >
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(var(--swatch-teal-rgb), 0.10), transparent 70%)" }} />

      <div className="relative flex flex-col flex-1 gap-3">
        {/* Eyebrow */}
        {(product.is_partner_pick || product.is_sponsored) && (
          <p className="text-[9px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
            {product.is_sponsored ? "Curated Pick" : "★ Partner Pick"}
          </p>
        )}

        {/* Hook — big Cormorant italic */}
        <p className="text-[20px] leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontStyle: "italic", color: "var(--swatch-viridian-odyssey)" }}>
          "{product.hook}"
        </p>

        {/* Name / brand / price */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
              {product.name}
            </h3>
            <p className="text-[11px] mt-0.5" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              {product.brand}
            </p>
          </div>
          <span className="text-[15px] flex-shrink-0 mt-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-cedar-grove)" }}>
            {product.price}
          </span>
        </div>

        {/* Why */}
        <p className="text-[12px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
          {product.why}
        </p>

        {/* Actions */}
        <div className="mt-auto pt-2 flex items-center gap-2">
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
    </motion.div>
  );
}

export default Recommendations;
