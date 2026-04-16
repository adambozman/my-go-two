import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { CardEditTrigger, useCardOverrides } from "@/components/CardEditor";
import MyProductCardBeverages from "@/platform-ui/web/mygotwo/MyProductCardBeverages";
import {
  createEmptyMyGoTwoGalleryAssets,
  getCachedMyGoTwoGalleryAssets,
  loadMyGoTwoGalleryAssets,
  preloadImageUrls,
  getVisibleStageStripUrls,
  type MyGoTwoGalleryAssets,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.data";
import {
  MYGOTWO_CATEGORY_TARGETS,
  type MyGoTwoCategoryTarget,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

const OVERLAY_TRANSITION_MS = 280;

/* ─── category card metadata ─── */
type CategoryCardMeta = {
  target: MyGoTwoCategoryTarget;
  subtitle: string;
  defaultBg: string;
};

const CATEGORY_CARDS: CategoryCardMeta[] = [
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "clothes")!, subtitle: "Lock in your daily look", defaultBg: "var(--swatch-teal)" },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "personal")!, subtitle: "Routines, grooming & self-care", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)" },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "health")!, subtitle: "Supplements, fitness & wellness", defaultBg: "var(--swatch-teal)" },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "gifts")!, subtitle: "What to get them every time", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)" },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "dining")!, subtitle: "Orders, cravings & restaurants", defaultBg: "var(--swatch-teal)" },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "beverages")!, subtitle: "Your perfect pour, locked in", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)" },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "household")!, subtitle: "Home essentials & brands", defaultBg: "var(--swatch-teal)" },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "entertainment")!, subtitle: "Shows, music & media picks", defaultBg: "linear-gradient(135deg, #d4543a 0%, #c44430 100%)" },
  { target: MYGOTWO_CATEGORY_TARGETS.find((t) => t.slug === "travel")!, subtitle: "Hotels, airlines & destinations", defaultBg: "var(--swatch-teal)" },
];

/* ─── overlay content per category ─── */
type CategoryOverlayContent = {
  title: string;
  description: string;
};

const CATEGORY_OVERLAY_CONTENT: Record<string, CategoryOverlayContent> = {
  Beverages: {
    title: "Lock In Your Perfect Pour",
    description:
      "Cold brew kings, oat milk queens, and everyone in between.\nMega ice. Four shots of vanilla (three is for quitters). ...\nBuild your drink list once. Lock it in the vault. Share it with your person.",
  },
};

/* ─── full-screen category overlay (preserved from original) ─── */
function CategoryOverlay({
  category,
  imageUrl,
  isVisible,
  onBack,
}: {
  category: CategoryCardMeta;
  imageUrl: string;
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
      transition={{ duration: OVERLAY_TRANSITION_MS / 1000 }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={category.target.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: category.defaultBg }} />
      )}
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
            style={{
              right: "calc(clamp(480px, 37.5%, 560px) + clamp(0.875rem, 1.8vw, 1.5rem))",
            }}
          >
            <div className="mx-auto max-w-[min(31rem,72%)] text-center">
              <h2
                className="mx-auto max-w-[8ch] text-[clamp(3rem,5.2vw,4.85rem)] leading-[0.9] tracking-[-0.045em] text-white drop-shadow-[0_16px_34px_rgba(0,0,0,0.48)]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                }}
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

/* ─── main bento grid export ─── */
export default function MyGoTwoStripGalleryAsset() {
  const { user } = useAuth();
  const { overrides, refresh: refreshOverrides } = useCardOverrides();
  const [activeCategory, setActiveCategory] = useState<CategoryCardMeta | null>(null);
  const [galleryAssets, setGalleryAssets] = useState<MyGoTwoGalleryAssets>(
    () => getCachedMyGoTwoGalleryAssets() ?? createEmptyMyGoTwoGalleryAssets()
  );
  const bootRef = useRef(false);

  /* load images from the existing data layer */
  useEffect(() => {
    if (bootRef.current) return;
    bootRef.current = true;
    (async () => {
      try {
        const assets = await loadMyGoTwoGalleryAssets({ force: true, quality: "full" });
        const urls = getVisibleStageStripUrls(assets);
        await preloadImageUrls(urls);
        setGalleryAssets(assets);
      } catch (err) {
        console.error("Failed to load My Go Two gallery:", err);
      }
    })();
  }, []);

  /* build a slug→image map from the loaded assets */
  const imageBySlug = useMemo(() => {
    const map = new Map<string, { strip: string; detail: string }>();
    for (const target of MYGOTWO_CATEGORY_TARGETS) {
      const strip = galleryAssets.stripImages.find((s) => s.id === target.id);
      if (strip) {
        map.set(target.slug, {
          strip: strip.image || "",
          detail: strip.detailImage || strip.image || "",
        });
      }
    }
    return map;
  }, [galleryAssets]);

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
        {/* bento grid css */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 768px) {
            .mgt-bento {
              grid-template-columns: repeat(6, 1fr) !important;
              grid-template-rows: repeat(6, 100px) !important;
              grid-template-areas:
                "c1 c1 c1 c1 c2 c2"
                "c1 c1 c1 c1 c2 c2"
                "c3 c3 c4 c4 c5 c5"
                "c3 c3 c4 c4 c5 c5"
                "c6 c6 c6 c7 c7 c7"
                "c8 c8 c8 c9 c9 c9" !important;
            }
            .mgt-c1 { grid-area: c1 !important; }
            .mgt-c2 { grid-area: c2 !important; }
            .mgt-c3 { grid-area: c3 !important; }
            .mgt-c4 { grid-area: c4 !important; }
            .mgt-c5 { grid-area: c5 !important; }
            .mgt-c6 { grid-area: c6 !important; }
            .mgt-c7 { grid-area: c7 !important; }
            .mgt-c8 { grid-area: c8 !important; }
            .mgt-c9 { grid-area: c9 !important; }
          }
        `}} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mgt-bento grid grid-cols-2 gap-1.5 md:gap-2"
        >
          {CATEGORY_CARDS.map((card, idx) => {
            const cardId = `mgt-${card.target.slug}`;
            const ovr = overrides[cardId];
            const imgs = imageBySlug.get(card.target.slug);
            const hasOvrImage = Boolean(ovr?.image_url);
            const hasStripImage = Boolean(imgs?.strip);
            const showImage = hasOvrImage || hasStripImage;
            const imageSrc = ovr?.image_url || imgs?.strip || "";

            return (
              <motion.button
                key={card.target.slug}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleCardClick(card)}
                className={`mgt-c${idx + 1} col-span-1 overflow-hidden relative text-left group`}
                style={{
                  borderRadius: 20,
                  background: showImage ? "transparent" : card.defaultBg,
                  minHeight: idx < 2 ? 180 : 140,
                }}
              >
                <CardEditTrigger
                  cardId={cardId}
                  override={ovr}
                  onSaved={refreshOverrides}
                  fields={["image_url", "heading", "subheading"]}
                />

                {showImage && (
                  <>
                    <img
                      src={imageSrc}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
                      }}
                    />
                  </>
                )}

                <div className="relative z-[1] flex flex-col justify-between h-full p-5 md:p-6">
                  <div className="flex items-center justify-between">
                    <p
                      className="text-[10px] uppercase tracking-[0.16em]"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        color: showImage ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.65)",
                      }}
                    >
                      My Go Two
                    </p>
                  </div>

                  <div>
                    <h2
                      className="text-[24px] leading-[0.96] sm:text-[28px] md:text-[32px]"
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
                      className="text-[12px] leading-relaxed mt-2 max-w-[28ch] sm:text-[13px]"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {ovr?.subheading || card.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-end mt-auto pt-2">
                    <div
                      className="rounded-full w-9 h-9 flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* full-screen category overlay */}
      <AnimatePresence>
        {activeCategory && (
          <CategoryOverlay
            key={activeCategory.target.slug}
            category={activeCategory}
            imageUrl={
              overrides[`mgt-${activeCategory.target.slug}`]?.image_url ||
              imageBySlug.get(activeCategory.target.slug)?.detail ||
              ""
            }
            isVisible={true}
            onBack={handleOverlayBack}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Codebase classification: runtime My Go Two gallery surface.
