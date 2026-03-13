import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

interface GoTwoCardProps {
  image: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const GoTwoCard = ({ image, label, isActive = true, onClick }: GoTwoCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
      style={{ width: CAROUSEL_LAYOUT.cardWidth }}
    >
      {/* Card image with label pill overlay */}
      <div
        className="relative flex-shrink-0 overflow-hidden w-full"
        style={{
          height: CAROUSEL_LAYOUT.cardHeight,
          borderRadius: CAROUSEL_LAYOUT.borderRadius,
          boxShadow: isActive
            ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
            : "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #c8bfb4 0%, #a89d92 100%)",
            }}
          />
        )}

        {/* Bottom-left pill label */}
        <div
          className="absolute bottom-3 left-3"
        >
          <span
            className="px-3 py-1 font-semibold truncate block"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15,
              letterSpacing: "0.02em",
              color: "#fff",
              background: "rgba(45,104,112,0.45)",
              borderRadius: 999,
              backdropFilter: "blur(6px)",
              maxWidth: 220,
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoTwoCard;
