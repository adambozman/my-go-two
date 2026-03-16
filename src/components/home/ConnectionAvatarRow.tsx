import { motion } from "framer-motion";
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
    <div className="flex gap-3 overflow-x-auto pb-1 px-1" style={{ scrollbarWidth: "none" }}>
      {/* Add button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onAdd}
        className="flex flex-col items-center gap-1 shrink-0"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center relative"
          style={{
            background: "linear-gradient(135deg, rgba(45,104,112,0.08), rgba(45,104,112,0.03))",
            border: "2px dashed rgba(45,104,112,0.30)",
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
      </motion.button>

      {entries.map((entry, i) => {
        const isPlaceholder = entry.isPlaceholder;
        const isAccepted = entry.status === "accepted";
        return (
          <motion.button
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onSelect(entry)}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <div
              className="w-16 h-16 rounded-full p-[2.5px]"
              style={{
                background: isPlaceholder
                  ? "linear-gradient(135deg, #8a9ea4, #b0bec5)"
                  : isAccepted
                  ? "linear-gradient(135deg, var(--swatch-cedar-grove), var(--swatch-teal))"
                  : "linear-gradient(135deg, var(--swatch-teal), var(--swatch-teal-mid))",
              }}
            >
              <Avatar className="w-full h-full border-[2.5px]" style={{ borderColor: "var(--swatch-sand)" }}>
                {entry.image ? (
                  <AvatarImage src={entry.image} alt={entry.name} className="object-cover" />
                ) : null}
                <AvatarFallback
                  className="text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, var(--swatch-viridian-odyssey), var(--swatch-teal))",
                    color: "#fff",
                  }}
                >
                  {entry.name[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </div>
            <span
              className="text-[10px] font-medium truncate max-w-[68px]"
              style={{
                color: isPlaceholder ? "var(--swatch-text-light)" : "var(--swatch-viridian-odyssey)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {entry.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
