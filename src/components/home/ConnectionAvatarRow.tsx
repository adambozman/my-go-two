import { Plus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { DirectoryEntry } from "./ConnectionDirectory";

interface ConnectionAvatarRowProps {
  entries: DirectoryEntry[];
  onSelect: (entry: DirectoryEntry) => void;
  onAdd: () => void;
}

export function ConnectionAvatarRow({ entries, onSelect, onAdd }: ConnectionAvatarRowProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 px-1" style={{ scrollbarWidth: "none" }}>
      {/* Add button */}
      <button
        onClick={onAdd}
        className="flex flex-col items-center gap-1.5 shrink-0"
      >
        <div
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
          style={{
            border: "2px dashed var(--swatch-text-light)",
            background: "rgba(255,255,255,0.4)",
          }}
        >
          <Plus className="w-5 h-5" style={{ color: "var(--swatch-teal)" }} />
        </div>
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
        >
          Add
        </span>
      </button>

      {entries.map((entry) => {
        const isPlaceholder = entry.isPlaceholder;
        const isAccepted = entry.status === "accepted";
        return (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className="flex flex-col items-center gap-1.5 shrink-0 active:scale-95 transition-transform"
          >
            <div
              className="w-[60px] h-[60px] rounded-full p-[2.5px]"
              style={{
                background: isPlaceholder
                  ? "var(--swatch-text-light)"
                  : isAccepted
                  ? "linear-gradient(135deg, var(--swatch-teal), var(--swatch-cedar-grove))"
                  : "var(--swatch-text-light)",
              }}
            >
              <Avatar className="w-full h-full border-2 border-[var(--swatch-sand)]">
                {entry.image ? (
                  <AvatarImage src={entry.image} alt={entry.name} className="object-cover" />
                ) : null}
                <AvatarFallback
                  className="text-sm font-semibold"
                  style={{ background: "var(--swatch-viridian-odyssey)", color: "#fff" }}
                >
                  {entry.name[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </div>
            <span
              className="text-[10px] font-medium truncate max-w-[64px]"
              style={{
                color: isPlaceholder ? "var(--swatch-text-light)" : "var(--swatch-viridian-odyssey)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {entry.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
