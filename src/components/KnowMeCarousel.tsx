import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSwipeCarousel } from "@/hooks/useSwipeCarousel";

export interface KnowMeCard {
  id: string;
  kind: "onboarding" | "ai" | "template";
  title: string;
  image: string;
  isDone?: boolean;
}

interface KnowMeCarouselProps {
  cards: KnowMeCard[];
  onCardClick: (card: KnowMeCard) => void;
  loading?: boolean;
}

const CARD_W = 280;
const CARD_H = 380;
const FLANK_W = 160;
const FLANK_H = 260;
const X_GAP = 180;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

const KnowMeCarousel = ({ cards, onCardClick, loading }: KnowMeCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2));
  const swipe = useSwipeCarousel(setActiveIndex, cards.length);

  if (cards.length === 0 && loading) {
    return (
      <div className="flex items-center justify-center h-[420px]">
        <Loader2 className="h-5 w-5 animate-spin" style={{ color: "var(--swatch-teal)" }} />
        <span className="text-xs text-muted-foreground ml-2">Loading cards...</span>
      </div>
    );
  }

  if (cards.length === 0) return null;

  return (
    <div className="relative flex items-center justify-center py-4">
      <div className="relative w-full h-[420px] overflow-hidden cursor-grab active:cursor-grabbing touch-none" onPointerDown={swipe.onPointerDown} onPointerUp={swipe.onPointerUp}>
        <div className="absolute inset-0 flex items-center justify-center">
          {cards.map((card, index) => {
            let offset = index - activeIndex;
            const half = cards.length / 2;
            if (offset > half) offset -= cards.length;
            if (offset < -half) offset += cards.length;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);
            if (absOffset > 2) return null;

            const xOffset = offset * X_GAP;
            const cardW = isActive ? CARD_W : FLANK_W;
            const cardH = isActive ? CARD_H : FLANK_H;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : 1.8;
            const opacity = isActive ? 1 : 0.5;

            return (
              <motion.div
                key={card.id}
                animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                transition={SPRING}
                className="absolute cursor-pointer"
                style={{ zIndex }}
                onClick={() => {
                  if (isActive) onCardClick(card);
                  else setActiveIndex(index);
                }}
              >
                <div
                  className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${isActive ? "ring-2 ring-primary shadow-2xl" : ""}`}
                  style={{ width: cardW, height: cardH }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="card-title leading-tight">{card.title}</h3>
                    </div>
                    {card.isDone && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--swatch-teal)" }}>
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KnowMeCarousel;
