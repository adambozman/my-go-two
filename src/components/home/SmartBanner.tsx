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
      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(30,74,82,0.08) 0%, rgba(45,104,112,0.04) 100%)",
        border: "1px solid rgba(45,104,112,0.12)",
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "var(--swatch-viridian-odyssey)", color: "#fff" }}
      >
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-semibold truncate"
          style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
        >
          {title}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "var(--swatch-antique-coin)" }}>
          {subtitle}
        </p>
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold"
          style={{
            background: "var(--swatch-viridian-odyssey)",
            color: "var(--swatch-cream-light)",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          {actionLabel || "View"}
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
