import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface DirectoryEntry {
  id: string;
  name: string;
  image: string;
  status: string;
  lastSync?: string;
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

/** Large image-forward connection card for the feed */
export function ConnectionFeedCard({
  entry,
  onSelect,
  index,
}: {
  entry: DirectoryEntry;
  onSelect: (entry: DirectoryEntry, rect: DOMRect) => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 260, damping: 28 }}
      className="w-full rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform"
      style={{
        background: "rgba(255,255,255,0.70)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onSelect(entry, rect);
      }}
    >
      {/* Image area */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        {entry.image ? (
          <img
            src={entry.image}
            alt={entry.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--swatch-teal), var(--swatch-teal))",
            }}
          >
            <span className="text-4xl font-bold" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cormorant Garamond', serif" }}>
              {entry.name[0]?.toUpperCase()}
            </span>
          </div>
        )}
        {/* Gradient overlay at bottom of image */}
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }}
        />
        {/* Name overlay on image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
          <Avatar className="w-8 h-8 border-2 border-white/50 shrink-0">
            {entry.image ? (
              <AvatarImage src={entry.image} alt={entry.name} />
            ) : null}
            <AvatarFallback
              className="text-[10px] font-bold"
              style={{ background: "var(--swatch-cedar-grove)", color: "#fff" }}
            >
              {entry.name[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <span
            className="text-[15px] font-semibold text-white drop-shadow-sm truncate"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {entry.name}
          </span>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          {entry.isPlaceholder ? (
            <span className="text-[11px] font-medium" style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}>
              Tap to set up connection
            </span>
          ) : entry.lastSync ? (
            <span className="text-[11px]" style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}>
              Synced {timeSince(entry.lastSync)}
            </span>
          ) : (
            <span
              className="text-[11px] font-medium capitalize"
              style={{
                color: entry.status === "accepted" ? "var(--swatch-teal)" : "var(--swatch-text-light)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {entry.status}
            </span>
          )}
        </div>
        <ChevronRight className="w-4 h-4" style={{ color: "var(--swatch-text-light)" }} />
      </div>
    </motion.button>
  );
}

/** Kept for backward-compat but no longer primary */
export function ConnectionDirectory({
  entries,
  onSelect,
}: {
  entries: DirectoryEntry[];
  onSelect: (entry: DirectoryEntry, rect: DOMRect) => void;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
        >
          Your People
        </h2>
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
        >
          {entries.length} connection{entries.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <ConnectionFeedCard key={entry.id} entry={entry} onSelect={onSelect} index={i} />
        ))}
      </div>
    </section>
  );
}
