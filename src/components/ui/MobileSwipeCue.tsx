import { motion } from "framer-motion";
import { ChevronRight, ChevronUp, Hand } from "lucide-react";

export default function MobileSwipeCue() {
  return (
    <div
      className="pointer-events-none mx-auto mb-4 flex w-fit items-center gap-3 rounded-full border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,244,236,0.90)_100%)] px-4 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
      aria-hidden="true"
    >
      <div className="relative h-8 w-14 shrink-0">
        <div className="absolute left-3 top-0 h-5 w-px bg-[linear-gradient(180deg,rgba(45,104,112,0.08)_0%,rgba(45,104,112,0.38)_100%)]" />
        <div className="absolute left-3 top-5 h-px w-8 bg-[linear-gradient(90deg,rgba(45,104,112,0.38)_0%,rgba(45,104,112,0.08)_100%)]" />
        <motion.div
          className="absolute left-0 top-0"
          animate={{
            x: [0, 0, 18, 18, 0],
            y: [12, -8, -8, 10, 12],
            rotate: [10, 0, 0, 8, 10],
            scale: [0.98, 1, 1, 1, 0.98],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            repeatDelay: 0.35,
            ease: "easeInOut",
          }}
        >
          <Hand className="h-6 w-6 text-[var(--swatch-teal)]" strokeWidth={1.8} />
        </motion.div>
        <motion.div
          className="absolute left-[18px] top-[-2px] text-[var(--swatch-teal)]"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.35, ease: "easeInOut" }}
        >
          <ChevronUp className="h-3.5 w-3.5" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          className="absolute left-[34px] top-[14px] text-[var(--swatch-teal)]"
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.35, ease: "easeInOut" }}
        >
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </motion.div>
      </div>
    </div>
  );
}
