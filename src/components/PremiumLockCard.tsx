import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumLockCardProps {
  title: string;
  description: string;
  bullets?: string[];
  preview?: ReactNode;
  className?: string;
  compact?: boolean;
  onDismiss?: () => void;
}

export default function PremiumLockCard({
  title,
  description,
  bullets = [],
  preview,
  className,
  compact = false,
  onDismiss,
}: PremiumLockCardProps) {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/75 backdrop-blur-xl"
        style={{
          boxShadow: "0 20px 48px rgba(74,96,104,0.12), inset 0 1px 0 rgba(255,255,255,0.94)",
        }}>
        {preview && (
          <div className="relative border-b border-white/70 px-4 py-4 md:px-5"
            style={{ background: "linear-gradient(180deg, rgba(245,233,220,0.54) 0%, rgba(255,255,255,0.38) 100%)" }}>
            <div className="pointer-events-none select-none blur-[2px] opacity-70">
              {preview}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/78 via-white/18 to-transparent" />
          </div>
        )}

        <div className={compact ? "p-5" : "p-6 md:p-7"}>
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(45,104,112,0.14), rgba(212,84,58,0.14))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.92)",
              }}
            >
              <Crown className="h-5 w-5" style={{ color: "var(--swatch-cedar-grove)" }} />
            </div>
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{
                  background: "rgba(45,104,112,0.08)",
                  color: "var(--swatch-teal)",
                }}
              >
                <Lock className="h-3 w-3" />
                Premium
              </div>
              <h2
                className="text-[24px] leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)", fontWeight: 600 }}
              >
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                {description}
              </p>
            </div>
          </div>

          {bullets.length > 0 && (
            <div className="mt-5 space-y-2">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-2 rounded-2xl px-3 py-2.5"
                  style={{ background: "rgba(255,255,255,0.56)", border: "1px solid rgba(255,255,255,0.78)" }}>
                  <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: "var(--swatch-cedar-grove)" }} />
                  <span className="text-[13px] leading-snug" style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              className="rounded-full px-5"
              onClick={() => navigate("/dashboard/settings")}
              style={{ background: "var(--swatch-cedar-grove)", color: "white" }}
            >
              Upgrade to Premium
            </Button>
            {onDismiss && (
              <Button variant="outline" className="rounded-full px-5" onClick={onDismiss}>
                Maybe later
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
