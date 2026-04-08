import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

interface KnowMeCategoryCardProps {
  name: string;
  imageUrl: string | null;
  questionCount: number;
  category: string;
  gradientFallback?: string;
  onClick: () => void;
  index: number;
  isHero?: boolean;
}

const CATEGORY_EMOJI: Record<string, string> = {
  style: "✦",
  sizing: "◇",
  colors: "◈",
  products: "▣",
  brands: "❖",
  lifestyle: "☼",
  gifting: "♡",
  "love-language": "♥",
  dates: "★",
  food: "◉",
  wellness: "❋",
  home: "⬡",
};

const KnowMeCategoryCard = ({
  name,
  imageUrl,
  questionCount,
  category,
  gradientFallback,
  onClick,
  index,
  isHero = false,
}: KnowMeCategoryCardProps) => {
  const accent = CATEGORY_EMOJI[category] || "◆";

  if (isHero) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, type: "spring", stiffness: 260, damping: 24 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="relative w-full rounded-3xl overflow-hidden text-left group col-span-2"
        style={{ height: 280 }}
      >
        {/* Image / gradient bg */}
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" draggable={false} />
        ) : (
          <div className="absolute inset-0" style={{ background: gradientFallback || "linear-gradient(135deg, #d4a574, #8b6f5a)" }} />
        )}

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />

        {/* Decorative accent top-right */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span
            className="px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "'Jost', sans-serif",
            }}
          >
            <Sparkles className="w-3 h-3" />
            {questionCount} questions
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/50 text-[11px] uppercase tracking-[0.15em] mb-1.5" style={{ fontFamily: "'Jost', sans-serif" }}>
            {accent} {category.replace("-", " ")}
          </p>
          <h3
            className="text-white text-[28px] leading-[1.1] mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {name}
          </h3>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all group-hover:gap-3"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "'Jost', sans-serif",
            }}
          >
            Start quiz
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </motion.button>
    );
  }

  // Standard card
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 + 0.1, type: "spring", stiffness: 280, damping: 24 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative w-full rounded-2xl overflow-hidden text-left group"
      style={{
        height: index % 3 === 0 ? 200 : 170,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" draggable={false} />
      ) : (
        <div className="absolute inset-0" style={{ background: gradientFallback || "linear-gradient(135deg, #d4a574, #8b6f5a)" }} />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

      {/* Question count pill */}
      <div className="absolute top-3 right-3">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
          style={{
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.9)",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          {questionCount}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-end justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-white/40 text-[9px] uppercase tracking-[0.15em] mb-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>
            {accent} {category.replace("-", " ")}
          </p>
          <h4
            className="text-white text-[15px] leading-tight truncate"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            {name}
          </h4>
        </div>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-2 transition-transform group-hover:translate-x-0.5"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <ChevronRight className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </motion.button>
  );
};

export default KnowMeCategoryCard;
