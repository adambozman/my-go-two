import { useState, useEffect, useMemo, useRef } from "react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Loader2, UtensilsCrossed, Shirt, Cpu, Home, Bookmark, Share2, Award, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { trackAdEvent } from "@/lib/adTracking";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import PremiumLockCard from "@/components/PremiumLockCard";

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
  { key: "all", label: "For You", icon: Award },
  { key: "food", label: "Food", icon: UtensilsCrossed },
  { key: "clothes", label: "Clothes", icon: Shirt },
  { key: "tech", label: "Tech", icon: Cpu },
  { key: "home", label: "Home", icon: Home },
] as const;

const PAGE_SIZE = 4;
const LOCKED_PREVIEW: Product[] = [
  {
    name: "Soft Wool Zip",
    brand: "Aurel",
    price: "$128",
    category: "clothes",
    hook: "A polished layer that still feels easy.",
    why: "Based on saved fit and texture preferences.",
    is_partner_pick: true,
  },
  {
    name: "Countertop Espresso Set",
    brand: "Forma",
    price: "$89",
    category: "home",
    hook: "A daily ritual upgrade with minimal footprint.",
    why: "Fits the home + coffee pattern in the profile.",
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
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activePillar]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const toggleSave = (id: string) => {
    setSavedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Removed from profile");
      } else {
        next.add(id);
        toast.success("Saved to your profile");
      }
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
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!personalization) {
    return (
      <div className="space-y-4 text-center py-12">
        <Award className="h-10 w-10 mx-auto text-primary" />
        <p className="text-muted-foreground text-sm">Complete your Know Me profile to unlock curated picks.</p>
      </div>
    );
  }

  if (!subscribed) {
    return (
      <div className="h-full overflow-y-auto pb-20">
        <PremiumLockCard
          title="Gift recommendations are Premium"
          description="Weekly picks should feel like a real advantage, so the AI-curated recommendation feed unlocks with Premium."
          bullets={[
            "Get a fresh set of recommendations once a week",
            "See picks generated from your saved profile data",
            "Use Premium alongside reminders and multiple connections",
          ]}
          preview={
            <div className="space-y-3">
              {LOCKED_PREVIEW.map((product, index) => (
                <ProductCard
                  key={`${product.brand}-${product.name}-${index}`}
                  product={product}
                  index={index}
                  isSaved={false}
                  onToggleSave={() => undefined}
                  onShare={() => undefined}
                />
              ))}
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="flex items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-lg font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
            Curated For You
          </h1>
          {personalization.persona_summary && (
            <p className="text-[11px] text-muted-foreground mt-0.5 max-w-[260px] leading-snug italic">
              {personalization.persona_summary}
            </p>
          )}
          {generatedLabel && (
            <p className="text-[11px] text-muted-foreground mt-1">
              {isCached ? `Saved this week · ${generatedLabel}` : `Fresh this week · ${generatedLabel}`}
            </p>
          )}
        </div>
        <button
          onClick={() => fetchProducts(true)}
          disabled={loading}
          className="p-2 rounded-full transition-colors hover:bg-secondary"
          style={{ color: "var(--swatch-antique-coin)" }}
          aria-label="Refresh recommendations"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
        {PILLARS.map(({ key, label, icon: Icon }) => {
          const isActive = activePillar === key;
          return (
            <button
              key={key}
              onClick={() => setActivePillar(key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0"
              style={{
                background: isActive ? "var(--swatch-viridian-odyssey)" : "var(--swatch-sand)",
                color: isActive ? "var(--swatch-cream-light)" : "var(--swatch-antique-coin)",
                border: `1px solid ${isActive ? "var(--swatch-viridian-odyssey)" : "var(--chip-border)"}`,
              }}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          );
        })}
      </div>

      {loading && products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Curating your picks…</p>
        </div>
      ) : filtered.length > 0 ? (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePillar}-${currentPage}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {paginatedProducts.map((product, i) => {
                const itemId = `${product.brand}-${product.name}`;
                const isSaved = savedItems.has(itemId);
                return (
                  <ProductCard
                    key={itemId + i}
                    product={product}
                    index={i}
                    isSaved={isSaved}
                    onToggleSave={() => toggleSave(itemId)}
                    onShare={() => handleShare(product)}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-6 space-y-2">
              <p className="text-center text-[11px] text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((page) => Math.max(1, page - 1));
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((page) => Math.min(totalPages, page + 1));
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : hasLoaded ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">Tap refresh to generate your curated picks.</p>
        </div>
      ) : null}
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--swatch-sand)",
        border: product.is_sponsored
          ? "1px solid rgba(212,84,58,0.15)"
          : product.is_partner_pick
            ? "1px solid rgba(45,104,112,0.25)"
            : "1px solid var(--chip-border)",
      }}
    >
      {product.is_sponsored ? (
        <div
          className="px-3 py-1 text-[10px] font-semibold tracking-wide uppercase flex items-center justify-between"
          style={{ background: "rgba(212,84,58,0.06)", color: "var(--swatch-antique-coin)", borderBottom: "1px solid rgba(212,84,58,0.10)" }}
        >
          <span>Curated Pick</span>
          {product.affiliate_url && (
            <button onClick={handleAction} className="flex items-center gap-0.5 opacity-60 hover:opacity-100">
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      ) : product.is_partner_pick ? (
        <div
          className="px-3 py-1 text-[10px] font-semibold tracking-wide uppercase"
          style={{ background: "rgba(45,104,112,0.08)", color: "var(--swatch-teal)", borderBottom: "1px solid rgba(45,104,112,0.12)" }}
        >
          ★ Partner Pick
        </div>
      ) : null}

      <div className="p-4 space-y-2.5">
        <p className="text-[13px] leading-relaxed italic text-muted-foreground">"{product.hook}"</p>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold truncate" style={{ color: "var(--swatch-viridian-odyssey)" }}>{product.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{product.brand}</p>
          </div>
          <span className="text-xs font-semibold shrink-0" style={{ color: "var(--swatch-cedar-grove)" }}>{product.price}</span>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
          {product.why}
        </p>

        <div className="pt-1 flex items-center justify-between gap-2">
          <button
            onClick={onToggleSave}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all"
            style={{
              background: isSaved ? "rgba(45,104,112,0.12)" : "rgba(255,255,255,0.55)",
              color: isSaved ? "var(--swatch-teal)" : "var(--swatch-antique-coin)",
              border: "1px solid rgba(45,104,112,0.12)",
            }}
          >
            <Bookmark className="h-3.5 w-3.5" />
            {isSaved ? "Saved" : "Save"}
          </button>

          <button
            onClick={product.affiliate_url ? handleAction : onShare}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all"
            style={{
              background: "rgba(212,84,58,0.08)",
              color: "var(--swatch-cedar-grove)",
              border: "1px solid rgba(212,84,58,0.12)",
            }}
          >
            {product.affiliate_url ? <ExternalLink className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {product.affiliate_url ? "Open" : "Share"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Recommendations;
