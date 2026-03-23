import { motion } from "framer-motion";

interface StackedCardPreviewProps {
  images: string[];
  cardWidth: number;
}

const STACK_CONFIG = [
  { offsetX: -0.28, offsetY: -0.12, size: 0.22, rotate: -8, z: 1 },
  { offsetX: 0,     offsetY: -0.16, size: 0.24, rotate: 0,  z: 2 },
  { offsetX: 0.28,  offsetY: -0.12, size: 0.22, rotate: 8,  z: 1 },
];

const SPRING = { type: "spring" as const, stiffness: 300, damping: 28 };

export default function StackedCardPreview({ images, cardWidth }: StackedCardPreviewProps) {
  if (!images.length) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {STACK_CONFIG.map((cfg, i) => {
        const img = images[i % images.length];
        if (!img) return null;
        const size = cardWidth * cfg.size;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...SPRING, delay: i * 0.05 }}
            className="absolute overflow-hidden"
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              left: `calc(50% + ${cardWidth * cfg.offsetX}px - ${size / 2}px)`,
              top: cardWidth * cfg.offsetY - size / 2,
              zIndex: cfg.z,
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
              rotate: cfg.rotate,
            }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        );
      })}
    </div>
  );
}
