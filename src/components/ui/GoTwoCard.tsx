import { cn } from "@/lib/utils";

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
      className={cn(
        "relative flex-shrink-0 overflow-hidden rounded-[16px] cursor-pointer transition-all duration-300",
        isActive
          ? "w-[260px] h-[360px] md:w-[300px] md:h-[420px] opacity-100"
          : "w-[120px] h-[200px] md:w-[160px] md:h-[260px] opacity-50"
      )}
      style={{
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
