import { ArrowUpRight } from "lucide-react";

export interface RecentUpdate {
  id: string;
  person: string;
  action: string;
  category: string;
  timestamp: string; // ISO
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
    <section className="space-y-2.5">
      <h2
        className="text-[11px] font-semibold uppercase tracking-[0.14em] px-1"
        style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
      >
        Recent Activity
      </h2>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.60)",
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
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
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(45,104,112,0.08)" }}
            >
              <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "var(--swatch-teal)" }} />
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
      </div>
    </section>
  );
}
