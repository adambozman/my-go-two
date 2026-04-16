import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { CardEditTrigger, useCardOverrides } from "@/components/CardEditor";
import MyProductCardBeverages from "@/platform-ui/web/mygotwo/MyProductCardBeverages";
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
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "vault")!,
    subtitle: "Your most important info, locked in", defaultBg: "var(--swatch-teal)",
    left: 56, top: 0, width: 44, height: 22 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "wishlist")!,
    subtitle: "What to get them every time", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 27.5, top: 24, width: 24, height: 45 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "dining")!,
    subtitle: "Orders, cravings, drinks & restaurants", defaultBg: "var(--swatch-teal)",
    left: 53, top: 24, width: 20, height: 76 },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "health")!,
    subtitle: "Supplements, fitness & wellness", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
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
    const done = () => { if (--remaining <= 0) { clearTimeout(timer); resolve(); } };
    const timer = setTimeout(resolve, 4000);

    unique.forEach((url) => {
      const img = new Image();
      img.onload = () => {
        if (typeof img.decode === "function") {
          img.decode().then(done, done);
        } else { done(); }
      };
      img.onerror = done;
      img.src = url;
      if (img.complete && img.naturalWidth > 0) {
        if (typeof img.decode === "function") {
          img.decode().then(done, done);
        } else { done(); }
      }
    });
  });
}

/* ─── overlay content per category ─── */
const CATEGORY_OVERLAY_CONTENT: Record<string, { title: string; description: string }> = {
  Clothes: {
    title: "Lock In\nYour\nLook",
    description: "The fits, the brands, the pieces you reach for every time.\n\nBuild your wardrobe DNA once. Lock it in the vault. Share it with your person.",
  },
  Personal: {
    title: "Your\nEveryday\nRoutine",
    description: "Grooming, skincare, the products you swear by.\n\nLock in your daily lineup so nobody has to guess what you actually use.",
  },
  "My Vault": {
    title: "Your\nVault",
    description: "Your most important info, stored and protected.\n\nLock it in the vault. Share it with your person.",
  },
  Wishlist: {
    title: "Always\nKnow\nWhat\nTo Get",
    description: "Wishlists, price ranges, and the things that actually matter.\n\nNever guess again. Lock it in the vault. Share it with your person.",
  },
  "Dining & Beverages": {
    title: "Your\nGo-To\nOrders\n& Drinks",
    description: "The restaurants, the cravings, the guilty pleasures — and the drinks.\n\nThe exact order, the exact place, the perfect pour. Tagged and searchable so nothing gets lost.",
  },
  Health: {
    title: "Feel\nYour\nBest",
    description: "Supplements, workouts, and wellness picks.\n\nTrack what keeps you at your peak. Lock it in the vault.",
  },
  Household: {
    title: "Home\nEssentials\nLocked In",
    description: "The brands, the products, the things that keep your space running.\n\nNever rebuy the wrong thing. Lock it in the vault.",
  },
  Entertainment: {
    title: "Your\nMedia\nPicks",
    description: "Shows, music, podcasts, and the stuff you're into right now.\n\nShare your taste. Lock it in the vault.",
  },
  Travel: {
    title: "Your\nTravel\nStyle",
    description: "Airlines, hotels, destinations, and how you like to move.\n\nLock in your preferences. Share them with your person.",
  },
};

/* ─── category detail view: single rounded box, sharp image bg, card on top ─── */
function CategoryDetailView({
  category,
  imageUrl,
  onBack,
}: {
  category: CategoryCardMeta;
  imageUrl: string | null;
  onBack: () => void;
}) {
  const { user } = useAuth();
  const content = CATEGORY_OVERLAY_CONTENT[category.target.label] ?? {
    title: category.target.label,
    description: category.subtitle,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: OVERLAY_TRANSITION_MS / 1000 }}
      className="mx-auto max-w-[1280px] px-3 pt-4 sm:px-4 md:px-6 md:pt-6"
    >
      {/* ONE rounded box — sharp image bg, title on left, product card on top right */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 20,
          height: "calc(100vh - 120px)",
        }}
      >
        {/* background: sharp category image (not blurred), slightly darkened */}
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.1)" }} />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: category.defaultBg, opacity: 0.85 }} />
        )}

        {/* back button — top left inside the box */}
        <div className="absolute top-5 left-5 z-30">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] backdrop-blur-sm transition-colors duration-200"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.5)",
              background: "rgba(23,18,14,0.3)",
            }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </button>
        </div>

        {/* title + description — left side, vertically centered */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{
            height: "100%",
            maxWidth: "55%",
            padding: "80px 48px",
          }}
        >
          <div className="text-center max-w-[480px]">
            <h2
              className="text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.92] tracking-[-0.04em] whitespace-pre-line"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#fff",
                textShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              {content.title}
            </h2>
            <p
              className="mt-8 text-[0.95rem] leading-[1.85] whitespace-pre-line"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(255,255,255,0.88)",
                textShadow: "0 4px 16px rgba(0,0,0,0.25)",
              }}
            >
              {content.description}
            </p>
          </div>
        </div>

        {/* product card — positions itself absolutely top-right inside this box */}
        <MyProductCardBeverages
          userId={user?.id ?? ""}
          activeSavedProductCard={null}
          onSaved={() => undefined}
        />
      </div>
    </motion.div>
  );
}

/* ─── main component ─── */
export default function MyGoTwoStripGalleryAsset() {
  const { overrides, loading: overridesLoading, refresh: refreshOverrides } = useCardOverrides();
  const [activeCategory, setActiveCategory] = useState<CategoryCardMeta | null>(null);
  const [imagesReady, setImagesReady] = useState(false);

  const imageUrls = useMemo(() => {
    return CATEGORY_CARDS
      .map((card) => overrides[`mgt-${card.target.slug}`]?.image_url)
      .filter(Boolean) as string[];
  }, [overrides]);

  useEffect(() => {
    if (overridesLoading) return;
    if (imageUrls.length === 0) { setImagesReady(true); return; }
    let cancelled = false;
    setImagesReady(false);
    preloadImages(imageUrls).then(() => { if (!cancelled) setImagesReady(true); });
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
  const isRevealed = !overridesLoading && imagesReady;

  return (
    <section
      aria-label="My Go Two categories"
      className="relative h-full overflow-x-hidden overflow-y-auto px-1 pb-6"
    >
      <AnimatePresence mode="wait">
        {activeCategory ? (
          <CategoryDetailView
            key={activeCategory.target.slug}
            category={activeCategory}
            imageUrl={activeImageUrl}
            onBack={handleOverlayBack}
          />
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-[1280px] px-3 pt-4 sm:px-4 md:px-6 md:pt-6"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Codebase classification: runtime My Go Two gallery surface.
