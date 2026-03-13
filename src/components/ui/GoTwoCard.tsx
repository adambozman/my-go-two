import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

interface GoTwoCardProps {
  image: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

// Fix 6: Card has fixed dimensions — Framer Motion in GoTwoCoverFlow handles
// all scaling. No more fighting between CSS classes and motion transforms.
const GoTwoCard = ({ image, label, isActive = true, onClick }: GoTwoCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 overflow-hidden cursor-pointer"
      style={{
        width: CAROUSEL_LAYOUT.cardWidth,
        height: CAROUSEL_LAYOUT.cardHeight,
        borderRadius: CAROUSEL_LAYOUT.borderRadius,
        boxShadow: isActive
          ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
          : "0 4px 16px rgba(0,0,0,0.12)",
      }}
    >
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Frosted glass pill */}
      <div
        className="absolute bottom-3 left-3 px-[14px] py-[6px] rounded-full text-white text-[13px] font-semibold"
        style={{
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default GoTwoCard;
