import { useState, useRef } from "react";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

interface GoTwoCardProps {
  image: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  cardWidth?: number;
  cardHeight?: number;
  borderRadius?: number;
}

const GoTwoCard = ({
  image,
  label,
  isActive = true,
  onClick,
  cardWidth = CAROUSEL_LAYOUT.cardWidth,
  cardHeight = CAROUSEL_LAYOUT.cardHeight,
  borderRadius = CAROUSEL_LAYOUT.borderRadius,
}: GoTwoCardProps) => {
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


      </div>
    </div>
  );
};

export default GoTwoCard;
