import {
  useCallback,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { CardEditTrigger, useCardOverrides } from "@/components/CardEditor";
import MyProductCardBeverages from "@/platform-ui/web/mygotwo/MyProductCardBeverages";
import {
  MYGOTWO_CATEGORY_TARGETS,
  type MyGoTwoCategoryTarget,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

const OVERLAY_TRANSITION_MS = 280;
const GAP = 10; // px between cards

type CategoryCardMeta = {
  target: MyGoTwoCategoryTarget;
  subtitle: string;
  defaultBg: string;
  /** position/size as % of the container */
  left: number;
  top: number;
  width: number;
  height: number;
};

/*
  Positions measured directly from the user's Canva mockup image.
  Each value is a percentage of the container.

  The mockup has a ~1% gap between cards. The positions below
  are pixel-traced from the actual image, then rounded to clean values.
*/
const CATEGORY_CARDS: CategoryCardMeta[] = [
  // Card 1 — top-left, tall
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "clothes")!,
    subtitle: "Lock in your daily look", defaultBg: "var(--swatch-teal)",
    left: 0, top: 0, width: 26, height: 45 },

  // Card 2 — top-center, short
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "personal")!,
    subtitle: "Routines, grooming & self-care", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 27.5, top: 0, width: 27, height: 22 },

  // Card 3 — top-right, wide short
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "health")!,
    subtitle: "Supplements, fitness & wellness", defaultBg: "var(--swatch-teal)",
    left: 56, top: 0, width: 44, height: 22 },

  // Card 4 — mid-center, tall
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "gifts")!,
    subtitle: "What to get them every time", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 27.5, top: 24, width: 24, height: 45 },

  // Card 5 — center, tallest
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "dining")!,
    subtitle: "Orders, cravings & restaurants", defaultBg: "var(--swatch-teal)",
    left: 53, top: 24, width: 20, height: 76 },

  // Card 6 — mid-right, small
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "beverages")!,
    subtitle: "Your perfect pour, locked in", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 74.5, top: 24, width: 25.5, height: 22 },

  // Card 7 — left, medium short
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "household")!,
    subtitle: "Home essentials & brands", defaultBg: "var(--swatch-teal)",
    left: 0, top: 47.5, width: 26, height: 22 },

  // Card 8 — right, tall
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "entertainment")!,
    subtitle: "Shows, music & media picks", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)",
    left: 74.5, top: 48.5, width: 25.5, height: 51.5 },

  // Card 9 — bottom-left, wide
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "travel")!,
    subtitle: "Hotels, airlines & destinations", defaultBg: "var(--swatch-teal)",
    left: 0, top: 72, width: 51.5, height: 28 },
];

/* ─── overlay content per category ─── */
const CATEGORY_OVERLAY_CONTENT: Record<string, { title: string; description: string }> = {
  Beverages: {
    title: "Lock In Your Perfect Pour",
    description:
      "Cold brew kings, oat milk queens, and everyone in between.\nMega ice. Four shots of vanilla (three is for quitters). ...\nBuild your drink list once. Lock it in the vault. Share it with your person.",
  },
};

/* ─── full-screen category overlay ─── */
function CategoryOverlay({
  category,
  isVisible,
  onBack,
}: {
  category: CategoryCardMeta;
  isVisible: boolean;
  onBack: () => void;
}) {
  const { user } = useAuth();
  const overlayContent = CATEGORY_OVERLAY_CONTENT[category.target.label] ?? null;

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: OVERLAY_TRANSITION_MS / 1000 }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <div className="absolute inset-0" style={{ background: category.defaultBg }} />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: overlayContent
            ? "linear-gradient(90deg, rgba(17,14,12,0.7) 0%, rgba(17,14,12,0.5) 26%, rgba(17,14,12,0.14) 52%, rgba(17,14,12,0.46) 100%), radial-gradient(circle at 26% 28%, rgba(17,14,12,0.1) 0%, rgba(17,14,12,0.04) 22%, transparent 44%)"
            : "linear-gradient(180deg, rgba(23,18,14,0.18) 0%, rgba(23,18,14,0.08) 34%, rgba(23,18,14,0.24) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-start p-4 sm:p-5">
        <button
          type="button"
          onClick={onBack}
          className="pointer-events-auto rounded-full border border-white/60 bg-[rgba(23,18,14,0.36)] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[rgba(23,18,14,0.52)]"
        >
          Back
        </button>
      </div>
      {overlayContent ? (
        <div className="absolute inset-0 z-10">
          <div
            className="pointer-events-none absolute left-5 top-[17%] sm:left-8 md:left-10 lg:left-14"
            style={{ right: "calc(clamp(480px, 37.5%, 560px) + clamp(0.875rem, 1.8vw, 1.5rem))" }}
          >
            <div className="mx-auto max-w-[min(31rem,72%)] text-center">
              <h2
                className="mx-auto max-w-[8ch] text-[clamp(3rem,5.2vw,4.85rem)] leading-[0.9] tracking-[-0.045em] text-white drop-shadow-[0_16px_34px_rgba(0,0,0,0.48)]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
              >
                {overlayContent.title}
              </h2>
              <p
                className="mx-auto mt-7 max-w-[24rem] whitespace-pre-line text-[1rem] leading-[1.85] text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.42)] sm:text-[1.06rem]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {overlayContent.description}
              </p>
            </div>
          </div>
          <div className="absolute inset-0">
            <MyProductCardBeverages
              userId={user?.id ?? ""}
              activeSavedProductCard={null}
              onSaved={() => undefined}
            />
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

/* ─── main component ─── */
export default function MyGoTwoStripGalleryAsset() {
  const { overrides, refresh: refreshOverrides } = useCardOverrides();
  const [activeCategory, setActiveCategory] = useState<CategoryCardMeta | null>(null);

  const handleCardClick = useCallback((card: CategoryCardMeta) => {
    setActiveCategory(card);
  }, []);

  const handleOverlayBack = useCallback(() => {
    setActiveCategory(null);
  }, []);

  return (
    <section
      aria-label="My Go Two categories"
      className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6"
    >
      <div className="mx-auto max-w-[1280px] px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full"
          style={{ paddingBottom: "85%" }}
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
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
                      }}
                    />
                  </>
                )}

                <div className="relative z-[1] flex flex-col justify-end h-full p-5 md:p-6">
                  <p
                    className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.65)" }}
                  >
                    My Go Two
                  </p>

                  <h2
                    className="text-[22px] leading-[0.96] sm:text-[26px] md:text-[30px]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      color: "#fff",
                      maxWidth: "14ch",
                    }}
                  >
                    {ovr?.heading || card.target.label}
                  </h2>
                  <p
                    className="text-[11px] leading-relaxed mt-1.5 max-w-[28ch] sm:text-[12px]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)" }}
                  >
                    {ovr?.subheading || card.subtitle}
                  </p>

                  <div className="flex items-center justify-end pt-2">
                    <div
                      className="rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                      style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeCategory && (
          <CategoryOverlay
            key={activeCategory.target.slug}
            category={activeCategory}
            isVisible={true}
            onBack={handleOverlayBack}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Codebase classification: runtime My Go Two gallery surface.
