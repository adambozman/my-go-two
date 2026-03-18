import { useEffect, useMemo, useRef, useState } from "react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowUpRight,
  Bookmark,
  ClipboardList,
  ExternalLink,
  Loader2,
  RefreshCw,
  Share2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { trackAdEvent } from "@/lib/adTracking";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/usePagination";
import { Link } from "react-router-dom";

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
  { key: "all", label: "For You", matches: ["food", "clothes", "tech", "home"] },
  { key: "clothes", label: "Style & Fit", matches: ["clothes"] },
  { key: "food", label: "Food & Drink", matches: ["food"] },
  { key: "home", label: "Home & Living", matches: ["home"] },
  { key: "tech", label: "Tech & Gear", matches: ["tech"] },
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
  {
    name: "Tasting Menu Night",
    brand: "Luma Table",
    price: "$72",
    category: "food",
    hook: "A date-night pick with a little ceremony.",
    why: "Leans into shared dining and occasion-driven gifting.",
    is_partner_pick: true,
  },
  {
    name: "Pocket Film Camera",
    brand: "Northline",
    price: "$149",
    category: "tech",
    hook: "Playful enough to feel personal, useful enough to keep using.",
    why: "Matches memory-making and travel-friendly signals.",
    is_partner_pick: false,
  },
];

const CATEGORY_INTROS: Record<string, { title: string; body: string }> = {
  all: {
    title: "A blended read across style, home, food, and useful little obsessions.",
    body: "These picks are shaped by your strongest signals first, then balanced so the mix still feels like a person instead of an algorithm.",
  },
  clothes: {
    title: "Tailored around silhouette, finish, and what makes a look feel right on you.",
    body: "Style picks lean on your saved fit cues, materials, and brand language before they chase trend.",
  },
  food: {
    title: "Built from appetite, ritual, and the way you like a night to feel.",
    body: "Food and drink suggestions pull from comfort patterns, occasion cues, and whether your taste skews casual, hosting, or experience-first.",
  },
  home: {
    title: "Chosen for the atmosphere you seem to want to live inside.",
    body: "Home picks favor practical upgrades with personality, especially where routine, hosting, or aesthetic consistency show up in your answers.",
  },
  tech: {
    title: "Useful where it matters, personal where it counts.",
    body: "Tech and gear recommendations stay focused on everyday delight, portability, and products that feel like they belong in your real life.",
  },
};

const categoryLabelMap: Record<string, string> = {
  clothes: "Style & Fit",
  food: "Food & Drink",
  home: "Home & Living",
  tech: "Tech & Gear",
};

const categoryAccentMap: Record<string, { glow: string; tint: string; border: string }> = {
  clothes: {
    glow: "radial-gradient(circle at top left, rgba(45,104,112,0.18), transparent 58%)",
    tint: "rgba(45,104,112,0.08)",
    border: "rgba(45,104,112,0.18)",
  },
  food: {
    glow: "radial-gradient(circle at top left, rgba(212,84,58,0.18), transparent 58%)",
    tint: "rgba(212,84,58,0.08)",
    border: "rgba(212,84,58,0.18)",
  },
  home: {
    glow: "radial-gradient(circle at top left, rgba(232,212,190,0.42), transparent 62%)",
    tint: "rgba(232,212,190,0.28)",
    border: "rgba(212,84,58,0.12)",
  },
  tech: {
    glow: "radial-gradient(circle at top left, rgba(74,96,104,0.18), transparent 58%)",
    tint: "rgba(74,96,104,0.08)",
    border: "rgba(74,96,104,0.18)",
  },
};

const formatTitle = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const normalizePhrase = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[a-z]/, (letter) => letter.toUpperCase());

const buildTasteSignals = (source: {
  style_keywords?: string[];
  gift_categories?: string[];
  recommended_brands?: string[];
  color_palette?: string[];
}) => {
  const keywords = (source.style_keywords ?? []).map(normalizePhrase).filter(Boolean);
  const gifts = (source.gift_categories ?? []).map(formatTitle).filter(Boolean);
  const brands = (source.recommended_brands ?? []).map(normalizePhrase).filter(Boolean);
  const colors = (source.color_palette ?? []).map(normalizePhrase).filter(Boolean);

  return [...keywords, ...gifts, ...brands, ...colors].filter((value, index, array) => array.indexOf(value) === index).slice(0, 6);
};

const buildRoleLabels = (source: {
  gift_categories?: string[];
  style_keywords?: string[];
  image_themes?: string[];
}) => {
  const roles = [
    "Personal Style Strategist",
    "Atmosphere Architect",
    "Intentional Gift Connoisseur",
  ];

  const giftText = (source.gift_categories ?? []).join(" ").toLowerCase();
  const styleText = (source.style_keywords ?? []).join(" ").toLowerCase();
  const imageText = (source.image_themes ?? []).join(" ").toLowerCase();

  if (/(travel|trip|weekend)/.test(giftText + styleText + imageText)) {
    roles[1] = "Travel Mood Editor";
  } else if (/(home|hosting|space|interior)/.test(giftText + imageText)) {
    roles[1] = "Home Rhythm Curator";
  }

  if (/(classic|tailored|polished|timeless|preppy|old money)/.test(styleText)) {
    roles[0] = "Taste Profile Editor";
  } else if (/(sport|casual|athletic|street)/.test(styleText)) {
    roles[0] = "Lifestyle Matchmaker";
  }

  return roles;
};

const buildHeroSummary = (personaSummary?: string) => {
  if (personaSummary && personaSummary.trim().length > 0) return normalizePhrase(personaSummary);
  return "The system is still building a sharper read on your taste, but it already has enough to start curating picks with a point of view.";
};

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
    } catch (error: any) {
      console.error("Products error:", error);
      if (error?.status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (error?.status === 402) toast.error("AI credits exhausted.");
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

  const activePillarConfig = useMemo(
    () => PILLARS.find((pillar) => pillar.key === activePillar) || PILLARS[0],
    [activePillar],
  );

  const filtered = useMemo(() => {
    if (activePillar === "all") return products;
    return products.filter((product) =>
      (activePillarConfig.matches as readonly string[]).includes(product.category),
    );
  }, [products, activePillar, activePillarConfig]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems: paginatedProducts } = usePagination({
    items: filtered,
    pageSize: PAGE_SIZE,
    resetKeys: [activePillar],
  });

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

  const previewProducts = LOCKED_PREVIEW.filter((product) =>
    activePillar === "all"
      ? true
      : (activePillarConfig.matches as readonly string[]).includes(product.category),
  );

  const displayProducts = subscribed ? paginatedProducts : previewProducts;
  const heroSummary = buildHeroSummary(personalization?.persona_summary);
  const tasteSignals = buildTasteSignals(personalization ?? {});
  const roleLabels = buildRoleLabels(personalization ?? {});
  const activeIntro = CATEGORY_INTROS[activePillar] ?? CATEGORY_INTROS.all;
  const recommendationCount = filtered.length || previewProducts.length;
  const featuredBrand =
    personalization?.recommended_brands?.find(Boolean) ||
    displayProducts[0]?.brand ||
    "A sharper mix";
  const spotlightProduct = displayProducts[0];
  const supportingProducts = displayProducts.slice(1);
  const profileHighlights = [
    {
      label: "Taste leaning",
      value: tasteSignals[0] || featuredBrand,
      note: "The strongest signal shaping this page first.",
    },
    {
      label: "Current lane",
      value: activePillarConfig.label,
      note: activeIntro.body,
    },
    {
      label: "Output style",
      value: subscribed ? "Live recommendations" : "Preview mode",
      note: subscribed ? "Pulled from your current profile read." : "A taste sample before the full feed unlocks.",
    },
  ];

  if (personalizationLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--swatch-teal)" }} />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-1 pb-8">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 pt-4 md:px-6 md:pt-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          className="surface-card-warm-glow relative overflow-hidden rounded-[34px] p-5 md:p-7"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background: `
                radial-gradient(circle at 16% 22%, rgba(255,255,255,0.86), transparent 32%),
                radial-gradient(circle at 85% 30%, rgba(240,214,185,0.34), transparent 28%),
                radial-gradient(circle at 62% 78%, rgba(245,226,204,0.42), transparent 30%)
              `,
            }}
          />

          <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_312px]">
            <div className="min-w-0">
              <p className="surface-eyebrow-coral">Go Two / Recommendations</p>
              <h1 className="surface-heading-lg mt-4 text-[40px] leading-[0.95] md:text-[52px]">
                Know Me,
                <br />
                then curate better.
              </h1>
              <p
                className="mt-5 max-w-[860px] text-[27px] leading-[1.2] md:text-[33px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "var(--swatch-viridian-odyssey)",
                }}
              >
                {heroSummary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="surface-pill inline-flex items-center gap-2 rounded-full px-4 py-2">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--swatch-cedar-grove)" }} />
                  <span
                    className="text-[11px] uppercase tracking-[0.14em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
                  >
                    {featuredBrand}
                  </span>
                </div>
                {generatedLabel && (
                  <div className="surface-pill inline-flex items-center rounded-full px-4 py-2">
                    <span
                      className="text-[11px] uppercase tracking-[0.14em]"
                      style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
                    >
                      {isCached ? `Saved read · ${generatedLabel}` : `Fresh read · ${generatedLabel}`}
                    </span>
                  </div>
                )}
                <div className="surface-pill inline-flex items-center rounded-full px-4 py-2">
                  <span
                    className="text-[11px] uppercase tracking-[0.14em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
                  >
                    {recommendationCount} curated picks
                  </span>
                </div>
              </div>

              {tasteSignals.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {tasteSignals.map((signal) => (
                    <div
                      key={signal}
                      className="rounded-full px-4 py-2"
                      style={{
                        background: "rgba(255,255,255,0.42)",
                        border: "1px solid rgba(255,255,255,0.72)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.84)",
                      }}
                    >
                      <span
                        className="text-[12px]"
                        style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)" }}
                      >
                        {signal}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside
              className="rounded-[28px] p-5 md:p-6"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(248,239,230,0.32) 100%)",
                border: "1px solid rgba(255,255,255,0.72)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.92), 0 18px 36px rgba(240,213,184,0.20)",
              }}
            >
              <p className="surface-eyebrow-coral">Think of the AI as your</p>
              <div className="mt-6 flex flex-col gap-3">
                {roleLabels.map((label, index) => (
                  <div
                    key={label}
                    className={`surface-pill w-fit rounded-full px-4 py-2.5 ${index % 2 === 1 ? "ml-5" : ""}`}
                  >
                    <span
                      className="text-[15px]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontWeight: 600,
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[22px] p-4" style={{ background: "rgba(255,255,255,0.34)" }}>
                <p className="surface-eyebrow-teal">Read of the moment</p>
                <p
                  className="mt-2 text-[19px] leading-[1.15]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: "var(--swatch-viridian-odyssey)",
                  }}
                >
                  {activeIntro.title}
                </p>
                <p className="surface-body mt-3 text-[13px]">{activeIntro.body}</p>
              </div>

              {subscribed && (
                <button
                  onClick={() => fetchProducts(true)}
                  disabled={loading}
                  className="surface-button-soft-glow mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} style={{ color: "var(--swatch-teal)" }} />
                  <span
                    className="text-[11px] uppercase tracking-[0.14em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}
                  >
                    {loading ? "Refreshing" : "Refresh picks"}
                  </span>
                </button>
              )}
            </aside>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 240, damping: 24 }}
          className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]"
        >
          <div className="surface-card-warm-glow rounded-[30px] p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="surface-eyebrow-coral">Filter the read</p>
                <p
                  className="mt-2 text-[24px] leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: "var(--swatch-viridian-odyssey)",
                  }}
                >
                  Shift the lens, not the vibe.
                </p>
              </div>

              <Link
                to="/dashboard/questionnaires"
                className="surface-button-soft-glow inline-flex items-center gap-2 rounded-full px-4 py-2"
              >
                <ClipboardList className="h-3.5 w-3.5" style={{ color: "var(--swatch-teal)" }} />
                <span
                  className="text-[11px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}
                >
                  Update Know Me
                </span>
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {PILLARS.map(({ key, label }) => {
                const isActive = activePillar === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActivePillar(key)}
                    className="rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.14em] transition-all"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 600,
                      background: isActive ? "var(--swatch-viridian-odyssey)" : "rgba(255,255,255,0.56)",
                      color: isActive ? "#fff" : "var(--swatch-antique-coin)",
                      border: isActive
                        ? "1px solid var(--swatch-viridian-odyssey)"
                        : "1px solid rgba(255,255,255,0.72)",
                      boxShadow: isActive
                        ? "0 16px 30px rgba(45,104,112,0.18)"
                        : "inset 0 1px 0 rgba(255,255,255,0.84), 0 10px 24px rgba(240,213,184,0.14)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {profileHighlights.map((highlight) => (
              <div key={highlight.label} className="card-inset-white rounded-[24px] px-4 py-4">
                <p className="surface-eyebrow-teal">{highlight.label}</p>
                <p
                  className="mt-2 text-[20px] leading-[1.05]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: "var(--swatch-viridian-odyssey)",
                  }}
                >
                  {highlight.value}
                </p>
                <p className="surface-body mt-2 text-[12px]">{highlight.note}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {loading && products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--swatch-teal)" }} />
            <p
              className="text-[13px]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
            >
              Curating your picks...
            </p>
          </div>
        ) : displayProducts.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePillar}-${currentPage}-${subscribed ? "live" : "preview"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 xl:grid-cols-[minmax(0,1.18fr)_minmax(330px,0.82fr)]"
              >
                <div className="min-w-0">
                  {spotlightProduct && (
                    <SpotlightRecommendationCard
                      product={spotlightProduct}
                      isSaved={savedItems.has(`${spotlightProduct.brand}-${spotlightProduct.name}`)}
                      onToggleSave={() =>
                        subscribed
                          ? toggleSave(`${spotlightProduct.brand}-${spotlightProduct.name}`)
                          : toast("Upgrade to save picks")
                      }
                      onShare={() => (spotlightProduct.affiliate_url ? undefined : handleShare(spotlightProduct))}
                    />
                  )}
                </div>

                <div className="grid gap-4">
                  {supportingProducts.map((product, index) => {
                    const itemId = `${product.brand}-${product.name}`;
                    const isSaved = savedItems.has(itemId);
                    return (
                      <SupportingRecommendationCard
                        key={`${itemId}-${index}`}
                        product={product}
                        index={index}
                        isSaved={isSaved}
                        onToggleSave={() => (subscribed ? toggleSave(itemId) : toast("Upgrade to save picks"))}
                        onShare={() => (product.affiliate_url ? undefined : handleShare(product))}
                      />
                    );
                  })}

                  <div className="surface-card-warm-glow rounded-[28px] p-5">
                    <p className="surface-eyebrow-coral">How this page works</p>
                    <p
                      className="mt-3 text-[23px] leading-[1.08]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 600,
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      The page should feel curated, not bulk-generated.
                    </p>
                    <p className="surface-body mt-3 text-[13px]">
                      One recommendation takes the lead, supporting picks orbit around it, and every lane should read like part of the same taste profile instead of isolated product cards.
                    </p>
                  </div>
                </div>
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
          <div className="surface-card-warm-glow rounded-[28px] p-8 text-center">
            <p
              className="text-[24px]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                color: "var(--swatch-viridian-odyssey)",
              }}
            >
              Nothing in this lane yet.
            </p>
            <p
              className="mt-3 text-[13px]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
            >
              Refresh the mix or answer a few more Know Me prompts so the system has a stronger point of view.
            </p>
          </div>
        ) : !subscribed ? (
          <div className="surface-card-warm-glow rounded-[28px] p-8 text-center">
            <p
              className="text-[24px]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                color: "var(--swatch-viridian-odyssey)",
              }}
            >
              Preview picks live here.
            </p>
            <p
              className="mt-3 text-[13px]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
            >
              Use the category rail above to shift the lens and see the tone of each recommendation bucket.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

function SpotlightRecommendationCard({
  product,
  isSaved,
  onToggleSave,
  onShare,
}: {
  product: Product;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);
  const accent = categoryAccentMap[product.category] ?? categoryAccentMap.home;

  useEffect(() => {
    if (!product.is_sponsored || !product.sponsored_id || tracked.current) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackAdEvent(product.sponsored_id!, "impression", "blended");
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
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
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="surface-card-warm-glow relative flex min-h-[420px] flex-col overflow-hidden rounded-[34px] p-6 md:p-7"
    >
      <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: accent.glow }} />
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-[7px]"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(212,84,58,0.32) 52%, rgba(45,104,112,0.24) 100%)" }}
      />

      <div className="relative flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 max-w-[42rem]">
            <p className="surface-eyebrow-coral">
              {product.is_sponsored ? "Curated pick" : product.is_partner_pick ? "Partner pick" : categoryLabelMap[product.category] ?? "For you"}
            </p>
            <p
              className="mt-4 text-[30px] leading-[1.02] md:text-[42px]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontStyle: "italic",
                color: "var(--swatch-viridian-odyssey)",
              }}
            >
              {product.hook}
            </p>
          </div>

          <span
            className="shrink-0 rounded-full px-4 py-2 text-[24px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "var(--swatch-cedar-grove)",
              background: "rgba(255,255,255,0.46)",
              border: `1px solid ${accent.border}`,
            }}
          >
            {product.price}
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <h3
              className="text-[34px] leading-[0.98]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                color: "var(--swatch-viridian-odyssey)",
              }}
            >
              {product.name}
            </h3>
            <p
              className="mt-2 text-[12px] uppercase tracking-[0.12em]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
            >
              {product.brand}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <div
                className="rounded-full px-4 py-2"
                style={{ background: accent.tint, border: `1px solid ${accent.border}` }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}
                >
                  {categoryLabelMap[product.category] ?? "For you"}
                </span>
              </div>
              <div className="surface-pill rounded-full px-4 py-2">
                <span
                  className="text-[11px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
                >
                  {product.is_partner_pick ? "Partner-weighted" : "Profile-led"}
                </span>
              </div>
            </div>
          </div>

          <div className="card-inset-white rounded-[24px] px-4 py-4">
            <p className="surface-eyebrow-teal">Why it fits</p>
            <p className="surface-body mt-3 text-[13px] leading-[1.6]">{product.why}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <button
            onClick={onToggleSave}
            className="surface-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] transition-all"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: isSaved ? "var(--swatch-teal)" : "var(--swatch-antique-coin)",
              border: isSaved ? "1px solid rgba(var(--swatch-teal-rgb), 0.22)" : undefined,
            }}
          >
            <Bookmark className="h-3.5 w-3.5" />
            {isSaved ? "Saved" : "Save"}
          </button>

          <button
            onClick={product.affiliate_url ? handleAction : onShare}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] transition-all"
            style={{
              fontFamily: "'Jost', sans-serif",
              background: "rgba(212,84,58,0.08)",
              color: "var(--swatch-cedar-grove)",
              border: "1px solid rgba(212,84,58,0.14)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.52)",
            }}
          >
            {product.affiliate_url ? <ExternalLink className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {product.affiliate_url ? "Open" : "Share"}
          </button>

          {product.affiliate_url && (
            <div className="ml-auto hidden items-center gap-2 rounded-full px-3 py-2 md:inline-flex">
              <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--swatch-teal)" }} />
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}
              >
                View partner link
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function SupportingRecommendationCard({
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
  const accent = categoryAccentMap[product.category] ?? categoryAccentMap.home;

  useEffect(() => {
    if (!product.is_sponsored || !product.sponsored_id || tracked.current) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackAdEvent(product.sponsored_id!, "impression", "blended");
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
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
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 240, damping: 24 }}
      className="surface-card-warm-glow relative overflow-hidden rounded-[28px] p-5"
    >
      <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: accent.glow }} />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <p className="surface-eyebrow-coral">
            {product.is_sponsored ? "Curated pick" : product.is_partner_pick ? "Partner pick" : categoryLabelMap[product.category] ?? "For you"}
          </p>
          <span
            className="shrink-0 text-[19px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "var(--swatch-cedar-grove)",
            }}
          >
            {product.price}
          </span>
        </div>

        <p
          className="max-w-[22rem] text-[24px] leading-[1.04]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontStyle: "italic",
            color: "var(--swatch-viridian-odyssey)",
          }}
        >
          {product.hook}
        </p>

        <div>
          <h3
            className="text-[26px] leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "var(--swatch-viridian-odyssey)",
            }}
          >
            {product.name}
          </h3>
          <p
            className="mt-1 text-[12px] uppercase tracking-[0.12em]"
            style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
          >
            {product.brand}
          </p>
        </div>

        <p className="surface-body max-w-[28rem] text-[13px] leading-[1.55]">{product.why}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={onToggleSave}
            className="surface-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em]"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: isSaved ? "var(--swatch-teal)" : "var(--swatch-antique-coin)",
              border: isSaved ? "1px solid rgba(var(--swatch-teal-rgb), 0.22)" : undefined,
            }}
          >
            <Bookmark className="h-3.5 w-3.5" />
            {isSaved ? "Saved" : "Save"}
          </button>

          <button
            onClick={product.affiliate_url ? handleAction : onShare}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em]"
            style={{
              fontFamily: "'Jost', sans-serif",
              background: "rgba(212,84,58,0.08)",
              color: "var(--swatch-cedar-grove)",
              border: "1px solid rgba(212,84,58,0.14)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.52)",
            }}
          >
            {product.affiliate_url ? <ExternalLink className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {product.affiliate_url ? "Open" : "Share"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default Recommendations;
