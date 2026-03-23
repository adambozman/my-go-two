import { useState, useRef, forwardRef } from "react";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

interface GoTwoCardProps {
  image: string;
  label: string;
  sectionTitle?: string;
  isActive?: boolean;
  onClick?: () => void;
  cardWidth?: number;
  cardHeight?: number;
  borderRadius?: number;
}

const GoTwoCard = forwardRef<HTMLDivElement, GoTwoCardProps>(
  ({
    image,
    label,
    isActive = true,
    onClick,
    cardWidth = CAROUSEL_LAYOUT.cardWidth,
    cardHeight = CAROUSEL_LAYOUT.cardHeight,
    borderRadius = CAROUSEL_LAYOUT.borderRadius,
  }, ref) => {
    const [hintVisible, setHintVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
      if (!isActive) return;
      setHintVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setHintVisible(false), 3000);
    };

    const handleMouseLeave = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setHintVisible(false);
    };

    return (
      <div
        ref={ref}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col items-center cursor-pointer"
        style={{ width: cardWidth }}
      >
        <div
          className="relative flex-shrink-0 overflow-hidden w-full"
          style={{
            height: cardHeight,
            borderRadius,
            boxShadow: isActive
              ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
              : "0 4px 16px rgba(0,0,0,0.12)",
          }}
        >
          {image ? (
            <img src={image} alt={label} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(160deg, #c8bfb4 0%, #a89d92 100%)" }}
            />
          )}

          {/* Hover hint — desktop only, active card only */}
          {isActive && (
            <div
              className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none"
              style={{
                opacity: hintVisible ? 1 : 0,
                transition: "opacity 0.4s ease",
                background: "rgba(0,0,0,0.18)",
                borderRadius,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 17,
                  fontStyle: "italic",
                  letterSpacing: "0.03em",
                  color: "#fff",
                  textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                  padding: "10px 20px",
                  background: "rgba(45,104,112,0.38)",
                  borderRadius: 999,
                  backdropFilter: "blur(8px)",
                }}
              >
                Select to explore
              </span>
            </div>
          )}

          {/* Bottom-left pill label */}
          <div className="absolute bottom-4 left-4">
            <span
              className="px-4 py-1.5 font-bold truncate block"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17,
                letterSpacing: "0.03em",
                color: "#fff",
                background: "rgba(0,0,0,0.45)",
                borderRadius: 999,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.2)",
                maxWidth: 240,
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              {label}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

GoTwoCard.displayName = "GoTwoCard";

export default GoTwoCard;
