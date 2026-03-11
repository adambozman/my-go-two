import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";

interface CardEditButtonProps {
  title: string;
  onRename?: (newTitle: string) => void;
  maxLength?: number;
}

const CardEditButton = ({ title, onRename, maxLength }: CardEditButtonProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);

  useEffect(() => {
    if (editing) setValue(title);
  }, [editing, title]);

  if (editing) {
    return (
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl p-4"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-white/90 text-gray-900 outline-none"
          placeholder="Card name"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") { onRename?.(value.trim() || title); setEditing(false); }
            else if (e.key === "Escape") setEditing(false);
          }}
          onBlur={() => { onRename?.(value.trim() || title); setEditing(false); }}
        />
      </div>
    );
  }

  return (
    <button
      className="absolute z-10 flex items-center justify-center rounded-full"
      style={{ top: 8, right: 8, width: 28, height: 28, background: "rgba(255,255,255,0.8)" }}
      onClick={(e) => { e.stopPropagation(); setEditing(true); }}
    >
      <Pencil className="w-[14px] h-[14px]" style={{ color: "#2D6870" }} />
    </button>
  );
};

export default CardEditButton;
