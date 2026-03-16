import { ChevronRight, RefreshCw } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface DirectoryEntry {
  id: string;
  name: string;
  image: string;
  status: string;
  lastSync?: string; // ISO timestamp
  isPlaceholder?: boolean;
}

function timeSince(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function ConnectionDirectory({
  entries,
  onSelect,
}: {
  entries: DirectoryEntry[];
  onSelect: (entry: DirectoryEntry, rect: DOMRect) => void;
}) {
  return (
    <section className="space-y-2">
      <h2
        className="text-[11px] font-semibold uppercase tracking-[0.12em] px-1"
        style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
      >
        Your People
      </h2>
      <div className="space-y-1">
        {entries.map((entry) => (
          <button
            key={entry.id}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all active:scale-[0.98]"
            style={{
              background: entry.isPlaceholder
                ? "rgba(255,255,255,0.35)"
                : "rgba(255,255,255,0.60)",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onSelect(entry, rect);
            }}
          >
            <Avatar className="w-10 h-10 shrink-0">
              {entry.image ? (
                <AvatarImage src={entry.image} alt={entry.name} />
              ) : null}
              <AvatarFallback
                className="text-xs font-semibold"
                style={{ background: "var(--swatch-viridian-odyssey)", color: "#fff" }}
              >
                {entry.name[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 text-left">
              <p
                className="text-[14px] font-medium truncate"
                style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
              >
                {entry.name}
              </p>
              {entry.lastSync && !entry.isPlaceholder ? (
                <div className="flex items-center gap-1 mt-0.5">
                  <RefreshCw className="w-2.5 h-2.5" style={{ color: "var(--swatch-text-light)" }} />
                  <span className="text-[10px]" style={{ color: "var(--swatch-text-light)" }}>
                    Synced {timeSince(entry.lastSync)}
                  </span>
                </div>
              ) : entry.isPlaceholder ? (
                <span className="text-[10px]" style={{ color: "var(--swatch-text-light)" }}>
                  Tap to set up
                </span>
              ) : (
                <span
                  className="text-[10px] capitalize"
                  style={{ color: entry.status === "accepted" ? "var(--swatch-teal)" : "var(--swatch-text-light)" }}
                >
                  {entry.status}
                </span>
              )}
            </div>

            <ChevronRight className="w-4 h-4 shrink-0" style={{ color: "var(--swatch-text-light)" }} />
          </button>
        ))}
      </div>
    </section>
  );
}
