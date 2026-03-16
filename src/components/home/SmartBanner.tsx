import { Sparkles, ArrowRight } from "lucide-react";

interface SmartBannerProps {
  title: string;
  subtitle: string;
  onAction?: () => void;
  actionLabel?: string;
}

export function SmartBanner({ title, subtitle, onAction, actionLabel }: SmartBannerProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-4 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, var(--swatch-viridian-odyssey) 0%, var(--swatch-teal) 100%)",
        boxShadow: "0 4px 20px rgba(30,74,82,0.25)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(255,255,255,0.15)" }}
      >
        <Sparkles className="w-4.5 h-4.5" style={{ color: "#fff" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-semibold truncate"
          style={{ color: "#fff", fontFamily: "'Jost', sans-serif" }}
        >
          {title}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.70)" }}>
          {subtitle}
        </p>
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-xl text-[11px] font-semibold active:scale-95 transition-transform"
          style={{
            background: "rgba(255,255,255,0.20)",
            color: "#fff",
            fontFamily: "'Jost', sans-serif",
            backdropFilter: "blur(8px)",
          }}
        >
          {actionLabel || "View"}
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
