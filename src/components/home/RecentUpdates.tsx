import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface RecentUpdate {
  id: string;
  person: string;
  action: string;
  category: string;
  timestamp: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function RecentUpdates({ updates }: { updates: RecentUpdate[] }) {
  if (updates.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-design-overlay-teal relative overflow-hidden rounded-[30px] p-5"
      style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
    >
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }} />
      <div className="relative">
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.16em]"
          style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}
        >
          Recent Activity
        </p>
        <p
          className="mb-5 text-[30px] leading-[0.96]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}
        >
          What changed most recently.
        </p>

        <div className="space-y-3">
          {updates.map((u) => (
            <div
              key={u.id}
              className="rounded-[24px] px-4 py-3 backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px]"
                  style={{ background: "rgba(var(--swatch-teal-rgb), 0.12)", color: "var(--swatch-teal)" }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-[13px] leading-tight"
                    style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
                  >
                    <span className="font-semibold">{u.person}</span>{" "}
                    <span style={{ color: "var(--swatch-antique-coin)" }}>{u.action}</span>
                  </p>
                  <p
                    className="mt-1 text-[10px]"
                    style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
                  >
                    {u.category} · {timeAgo(u.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
