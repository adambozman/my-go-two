import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { CardEditTrigger, useCardOverrides, type CardOverride } from "@/components/CardEditor";
import { supabase } from "@/integrations/supabase/client";
import type { SavedProductCard } from "@/features/mygotwo/types";
import {
  MYGOTWO_CATEGORY_TARGETS,
  type MyGoTwoCategoryTarget,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

const OVERLAY_TRANSITION_MS = 280;

type CategoryCardMeta = {
  target: MyGoTwoCategoryTarget;
  subtitle: string;
  defaultBg: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

const CATEGORY_CARDS: CategoryCardMeta[] = [
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "clothes")!,
    subtitle: "Lock in your daily look", defaultBg: "var(--swatch-teal)",
    left: 0, top: 0, width: 26, height: 45 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "personal")!,
    subtitle: "Routines, grooming & self-care", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 27.5, top: 0, width: 27, height: 22 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "health")!,
    subtitle: "Supplements, fitness & wellness", defaultBg: "var(--swatch-teal)",
    left: 56, top: 0, width: 44, height: 22 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "gifts")!,
    subtitle: "What to get them every time", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 27.5, top: 24, width: 24, height: 45 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "dining")!,
    subtitle: "Orders, cravings & restaurants", defaultBg: "var(--swatch-teal)",
    left: 53, top: 24, width: 20, height: 76 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "beverages")!,
    subtitle: "Your perfect pour, locked in", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 74.5, top: 24, width: 25.5, height: 22 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "household")!,
    subtitle: "Home essentials & brands", defaultBg: "var(--swatch-teal)",
    left: 0, top: 47.5, width: 26, height: 22 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "entertainment")!,
    subtitle: "Shows, music & media picks", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 74.5, top: 48.5, width: 25.5, height: 51.5 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "travel")!,
    subtitle: "Hotels, airlines & destinations", defaultBg: "var(--swatch-teal)",
    left: 0, top: 72, width: 51.5, height: 28 },
];

/* ─── preload images and return when all are decoded ─── */
function preloadImages(urls: string[]): Promise<void> {
  const unique = Array.from(new Set(urls.filter(Boolean)));
  if (unique.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    let remaining = unique.length;
    const done = () => { if (--remaining <= 0) resolve(); };

    // Safety timeout — never block longer than 4s
    const timer = setTimeout(resolve, 4000);

    unique.forEach((url) => {
      const img = new Image();
      img.onload = () => {
        if (typeof img.decode === "function") {
          img.decode().then(done, done);
        } else {
          done();
        }
      };
      img.onerror = done;
      img.src = url;

      // If already cached by the browser
      if (img.complete && img.naturalWidth > 0) {
        if (typeof img.decode === "function") {
          img.decode().then(done, done);
        } else {
          done();
        }
      }
    });

    // Clean up timer when all load
    const origResolve = resolve;
    // (timer cleaned up naturally via closure)
  });
}

/* ─── category overlay content ─── */
const CATEGORY_OVERLAY_CONTENT: Record<string, { title: string; description: string }> = {
  Clothes: {
    title: "Lock In Your Look",
    description: "The fits, the brands, the staples.\nBuild your wardrobe DNA once. Share it with your person.",
  },
  Personal: {
    title: "Your Everyday Routine",
    description: "Grooming, skincare, the products you swear by.\nLock in your daily lineup.",
  },
  Health: {
    title: "Feel Your Best",
    description: "Supplements, workouts, and wellness picks.\nTrack what keeps you at your peak.",
  },
  Gifts: {
    title: "Always Know What to Get",
    description: "Wishlists, price ranges, and the things that actually matter.\nNever guess again.",
  },
  Dining: {
    title: "Your Go-To Orders",
    description: "The restaurants, the cravings, the guilty pleasures.\nLock in every order.",
  },
  Beverages: {
    title: "Lock In Your Perfect Pour",
    description: "Cold brew kings, oat milk queens, and everyone in between.\nBuild your drink list once. Lock it in the vault.",
  },
  Household: {
    title: "Home Essentials",
    description: "The brands, the products, the things that keep your space running.\nNever rebuy the wrong thing.",
  },
  Entertainment: {
    title: "Your Media Picks",
    description: "Shows, music, podcasts, and the stuff you're into right now.\nShare your taste.",
  },
  Travel: {
    title: "Your Travel Style",
    description: "Airlines, hotels, destinations, and how you like to move.\nLock in your preferences.",
  },
};

/* ─── map category slug → product_card_key prefixes ─── */
const CATEGORY_CARD_KEY_PREFIXES: Record<string, string[]> = {
  clothes: ["clothing", "shoe", "jewelry", "brand", "fashion"],
  personal: ["scent", "grooming", "skincare", "routine"],
  health: ["supplement", "fitness", "workout", "wellness"],
  gifts: ["birthday", "wish-list", "gift", "anniversary"],
  dining: ["favorite-restaurants", "favorite-meals", "fast-food", "grocery", "cooking", "dietary"],
  beverages: ["coffee", "tea", "beverage", "drink"],
  household: ["home", "cleaning", "kitchen", "decor"],
  entertainment: ["movies", "music", "gaming", "books", "podcast", "sports", "comedy", "nightlife"],
  travel: ["travel", "hotel", "airline", "destination", "vacation"],
};

/* ─── hook: fetch saved product cards for a category ─── */
function useCategoryCards(slug: string, userId: string | undefined) {
  const [cards, setCards] = useState<SavedProductCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    const prefixes = CATEGORY_CARD_KEY_PREFIXES[slug] ?? [];
    if (prefixes.length === 0) { setLoading(false); return; }

    (async () => {
      setLoading(true);
      const orFilter = prefixes.map((p) => `product_card_key.ilike.${p}%`).join(",");
      const { data } = await supabase
        .from("saved_product_cards")
        .select("*")
        .eq("user_id", userId)
        .or(orFilter)
        .order("created_at", { ascending: true });
      setCards((data as SavedProductCard[]) ?? []);
      setLoading(false);
    })();
  }, [slug, userId]);

  return { cards, loading };
}

/* ─── saved product card tile (read-only) ─── */
function SavedCardTile({ card }: { card: SavedProductCard }) {
  const fields = Object.entries(card.field_values ?? {});
  return (
    <div
      className="shrink-0 w-[320px] sm:w-[360px] rounded-[24px] border px-6 py-5 snap-center"
      style={{
        background: "#f3eddc",
        borderColor: "rgba(190, 183, 171, 0.54)",
        boxShadow: "0 12px 40px rgba(34, 31, 27, 0.14)",
      }}
    >
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em]"
        style={{ fontFamily: "'Jost', sans-serif", color: "#db623f" }}>
        {card.subcategory_label}
      </p>
      <h3 className="text-[28px] leading-[0.94] tracking-[-0.04em] mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#1b1a18" }}>
        {card.card_title}
      </h3>
      <div className="h-px w-full mb-4" style={{ background: "rgba(182,174,163,0.54)" }} />
      <div className="space-y-3">
        {fields.slice(0, 4).map(([key, value]) => (
          <div key={key} className="border-b pb-3" style={{ borderColor: "rgba(182,174,163,0.4)" }}>
            <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.22em]"
              style={{ fontFamily: "'Jost', sans-serif", color: "#b0a691" }}>
              {key.replace(/_/g, " ")}
            </p>
            <p className="text-[13px] leading-[1.4]"
              style={{ fontFamily: "'Jost', sans-serif", color: "#46413a" }}>
              {value || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── full-screen category overlay ─── */
function CategoryOverlay({
  category,
  imageUrl,
  isVisible,
  onBack,
}: {
  category: CategoryCardMeta;
  imageUrl: string | null;
  isVisible: boolean;
  onBack: () => void;
}) {
  const { user } = useAuth();
  const content = CATEGORY_OVERLAY_CONTENT[category.target.label] ?? {
    title: category.target.label,
    description: category.subtitle,
  };
  const { cards, loading } = useCategoryCards(category.target.slug, user?.id);

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: OVERLAY_TRANSITION_MS / 1000 }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      {imageUrl ? (
        <>
          <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(17,14,12,0.78) 0%, rgba(17,14,12,0.5) 40%, rgba(17,14,12,0.3) 60%, rgba(17,14,12,0.6) 100%)" }} />
        </>
      ) : (
        <>
          <div className="absolute inset-0" style={{ background: category.defaultBg }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(17,14,12,0.7) 0%, rgba(17,14,12,0.5) 26%, rgba(17,14,12,0.14) 52%, rgba(17,14,12,0.46) 100%)" }} />
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-start p-4 sm:p-5">
        <button type="button" onClick={onBack}
          className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/60 bg-[rgba(23,18,14,0.36)] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[rgba(23,18,14,0.52)]">
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>
      </div>

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="hidden md:flex flex-col justify-center w-[38%] pl-8 lg:pl-14 pr-6">
          <h2 className="max-w-[10ch] text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.92] tracking-[-0.045em] text-white drop-shadow-[0_16px_34px_rgba(0,0,0,0.48)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
            {content.title}
          </h2>
          <p className="mt-5 max-w-[24rem] whitespace-pre-line text-[0.95rem] leading-[1.8] text-white/85 drop-shadow-[0_10px_22px_rgba(0,0,0,0.42)]"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            {content.description}
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-hidden px-4 md:px-0">
          {loading ? (
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "transparent" }} />
          ) : cards.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 py-6 max-w-full scrollbar-hide">
              {cards.map((card) => <SavedCardTile key={card.id} card={card} />)}
            </div>
          ) : (
            <div className="text-center px-6">
              <h3 className="text-[clamp(2rem,3.5vw,3rem)] leading-[0.94] text-white mb-3 md:hidden"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                {content.title}
              </h3>
              <p className="text-white/70 text-[14px] max-w-[20rem] mx-auto whitespace-pre-line md:hidden"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                {content.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] text-white/80"
                style={{ fontFamily: "'Jost', sans-serif", borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}>
                No saved cards yet
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-14 left-0 right-0 z-10 md:hidden px-5 pt-2">
        <h2 className="text-[28px] leading-[0.94] text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
          {content.title}
        </h2>
      </div>
    </motion.div>
  );
}

/* ─── main component ─── */
export default function MyGoTwoStripGalleryAsset() {
  const { overrides, loading: overridesLoading, refresh: refreshOverrides } = useCardOverrides();
  const [activeCategory, setActiveCategory] = useState<CategoryCardMeta | null>(null);
  const [imagesReady, setImagesReady] = useState(false);

  // Collect all image URLs from overrides
  const imageUrls = useMemo(() => {
    return CATEGORY_CARDS
      .map((card) => overrides[`mgt-${card.target.slug}`]?.image_url)
      .filter(Boolean) as string[];
  }, [overrides]);

  // Once overrides arrive, preload every card image before revealing
  useEffect(() => {
    if (overridesLoading) return;

    if (imageUrls.length === 0) {
      // No images to load — reveal immediately
      setImagesReady(true);
      return;
    }

    let cancelled = false;
    setImagesReady(false);

    preloadImages(imageUrls).then(() => {
      if (!cancelled) setImagesReady(true);
    });

    return () => { cancelled = true; };
  }, [overridesLoading, imageUrls]);

  const handleCardClick = useCallback((card: CategoryCardMeta) => {
    setActiveCategory(card);
  }, []);

  const handleOverlayBack = useCallback(() => {
    setActiveCategory(null);
  }, []);

  const activeCardId = activeCategory ? `mgt-${activeCategory.target.slug}` : null;
  const activeImageUrl = activeCardId ? overrides[activeCardId]?.image_url ?? null : null;

  // Show state: blur while loading, then fade in
  const isRevealed = !overridesLoading && imagesReady;

  return (
    <section
      aria-label="My Go Two categories"
      className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6"
    >
      <div className="mx-auto max-w-[1280px] px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
        <div
          className="relative w-full"
          style={{
            paddingBottom: "85%",
            filter: isRevealed ? "none" : "blur(20px)",
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? "scale(1)" : "scale(1.02)",
            transition: "filter 0.5s ease-out, opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          {CATEGORY_CARDS.map((card) => {
            const cardId = `mgt-${card.target.slug}`;
            const ovr = overrides[cardId];
            const hasOvrImage = Boolean(ovr?.image_url);

            return (
              <motion.button
                key={card.target.slug}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleCardClick(card)}
                className="absolute overflow-hidden text-left group"
                style={{
                  borderRadius: 20,
                  background: hasOvrImage ? "transparent" : card.defaultBg,
                  left: `${card.left}%`,
                  top: `${card.top}%`,
                  width: `${card.width}%`,
                  height: `${card.height}%`,
                }}
              >
                <CardEditTrigger
                  cardId={cardId}
                  override={ovr}
                  onSaved={refreshOverrides}
                  fields={["image_url", "heading", "subheading"]}
                />

                {hasOvrImage && (
                  <>
                    <img
                      src={ovr!.image_url!}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)" }} />
                  </>
                )}

                <div className="relative z-[1] flex flex-col justify-end h-full p-5 md:p-6">
                  <p className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.65)" }}>
                    My Go Two
                  </p>
                  <h2 className="text-[22px] leading-[0.96] sm:text-[26px] md:text-[30px]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff", maxWidth: "14ch" }}>
                    {ovr?.heading || card.target.label}
                  </h2>
                  <p className="text-[11px] leading-relaxed mt-1.5 max-w-[28ch] sm:text-[12px]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)" }}>
                    {ovr?.subheading || card.subtitle}
                  </p>
                  <div className="flex items-center justify-end pt-2">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                      style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeCategory && (
          <CategoryOverlay
            key={activeCategory.target.slug}
            category={activeCategory}
            imageUrl={activeImageUrl}
            isVisible={true}
            onBack={handleOverlayBack}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Codebase classification: runtime My Go Two gallery surface.
