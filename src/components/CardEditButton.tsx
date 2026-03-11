import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";

interface CardEditButtonProps {
  title: string;
  onRename?: (newTitle: string) => void;
}

const CardEditButton = ({ title, onRename }: CardEditButtonProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setValue(title);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [editing, title]);

  if (editing) {
    return (
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl p-4"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-white/90 text-gray-900 outline-none"
          placeholder="Card name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRename?.(value);
              setEditing(false);
            } else if (e.key === "Escape") {
              setEditing(false);
            }
          }}
        />
        <div className="flex gap-2">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "var(--swatch-teal)" }}
            onClick={() => { onRename?.(value); setEditing(false); }}
          >
            <Check className="w-4 h-4 text-white" />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            onClick={() => setEditing(false)}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className="absolute z-10 flex items-center justify-center rounded-full"
      style={{
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        background: "rgba(255,255,255,0.8)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
    >
      <Pencil className="w-[14px] h-[14px]" style={{ color: "#2D6870" }} />
    </button>
  );
};

export default CardEditButton;
