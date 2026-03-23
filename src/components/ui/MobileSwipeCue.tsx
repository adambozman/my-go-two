import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hand } from "lucide-react";

export default function MobileSwipeCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 4200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2"
          aria-hidden="true"
          initial={{ opacity: 0, y: 0, scale: 0.98 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            x: [0, 0, 0, 36, 36],
            y: [0, 20, -10, -10, 0],
            rotate: [0, 0, -8, 6, 0],
            scale: [0.98, 1, 1, 1, 0.96],
          }}
          exit={{ opacity: 0, y: -6 }}
          transition={{
            duration: 3.8,
            times: [0, 0.18, 0.48, 0.78, 1],
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                opacity: [0, 0.14, 0.18, 0.12, 0],
                scale: [0.88, 1, 1.08, 1.02, 0.96],
              }}
              transition={{ duration: 3.8, times: [0, 0.18, 0.48, 0.78, 1], ease: "easeInOut" }}
              style={{
                filter: "blur(12px)",
                background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(45,104,112,0.14) 55%, rgba(45,104,112,0) 72%)",
                width: 74,
                height: 74,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <motion.div
              className="relative"
              animate={{
                x: [0, 0, 0, 36, 36],
                y: [0, 20, -10, -10, 0],
                rotate: [0, 0, -8, 6, 0],
              }}
              transition={{ duration: 3.8, times: [0, 0.18, 0.48, 0.78, 1], ease: "easeInOut" }}
            >
              <Hand
                className="h-10 w-10 text-[var(--swatch-teal)]"
                strokeWidth={1.6}
                style={{
                  opacity: 0.92,
                  filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.8)) drop-shadow(0 4px 12px rgba(45,104,112,0.24))",
                }}
              />
            </motion.div>
            <motion.div
              className="absolute left-6 top-5 h-px w-16 origin-left"
              animate={{
                opacity: [0, 0.6, 0.7, 0.55, 0],
                scaleX: [0.15, 0.4, 0.8, 1, 1.1],
              }}
              transition={{ duration: 3.8, times: [0, 0.18, 0.48, 0.78, 1], ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, rgba(45,104,112,0.55) 0%, rgba(45,104,112,0.06) 100%)",
                filter: "blur(0.4px)",
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
