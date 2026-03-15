import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface KnowMeCategoryCardProps {
  name: string;
  imageUrl: string | null;
  questionCount: number;
  gradientFallback?: string;
  onClick: () => void;
  index: number;
}

const KnowMeCategoryCard = ({ name, imageUrl, questionCount, gradientFallback, onClick, index }: KnowMeCategoryCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 30 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative w-full rounded-2xl overflow-hidden text-left group"
      style={{ aspectRatio: "3 / 2" }}
    >
      {/* Background */}
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: gradientFallback || "linear-gradient(135deg, #d4a574 0%, #8b6f5a 100%)" }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        <div>
          <h4
            className="text-white text-base leading-tight mb-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
          >
            {name}
          </h4>
          <p className="text-white/70 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
            {questionCount} question{questionCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
          style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </motion.button>
  );
};

export default KnowMeCategoryCard;
