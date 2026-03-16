import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface SmartBannerProps {
  title: string;
  subtitle: string;
  onAction?: () => void;
  actionLabel?: string;
}

export function SmartBanner({ title, subtitle, onAction, actionLabel }: SmartBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex items-center gap-3.5 px-4 py-4 rounded-2xl relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--swatch-viridian-odyssey) 0%, var(--swatch-teal) 100%)",
        boxShadow: "0 14px 34px rgba(30,74,82,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
        style={{ background: "rgba(255,255,255,0.06)", filter: "blur(20px)" }}
      />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative z-10"
        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
      >
        <Sparkles className="w-5 h-5" style={{ color: "#fff" }} />
      </div>
      <div className="flex-1 min-w-0 relative z-10">
        <p
          className="text-[13px] font-semibold truncate"
          style={{ color: "#fff", fontFamily: "'Jost', sans-serif" }}
        >
          {title}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
          {subtitle}
        </p>
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-xl text-[11px] font-semibold active:scale-95 transition-transform relative z-10"
          style={{
            background: "rgba(255,255,255,0.20)",
            color: "#fff",
            fontFamily: "'Jost', sans-serif",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {actionLabel || "View"}
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}
