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
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
        >
          Recent Activity
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.65)",
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {updates.map((u, i) => (
          <div
            key={u.id}
            className="flex items-center gap-3 px-4 py-3.5"
            style={{
              borderTop: i > 0 ? "1px solid rgba(0,0,0,0.04)" : undefined,
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(45,104,112,0.08)" }}
            >
              <ArrowUpRight className="w-4 h-4" style={{ color: "var(--swatch-teal)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] leading-tight truncate" style={{ color: "var(--swatch-viridian-odyssey)" }}>
                <span className="font-semibold">{u.person}</span>{" "}
                <span style={{ color: "var(--swatch-antique-coin)" }}>{u.action}</span>
              </p>
              <p className="text-[10px] mt-1" style={{ color: "var(--swatch-text-light)" }}>
                {u.category} · {timeAgo(u.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
