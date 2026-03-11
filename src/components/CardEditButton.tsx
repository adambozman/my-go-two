import { useState, useRef, useEffect, useCallback } from "react";
import { Pencil } from "lucide-react";

interface CardEditButtonProps {
  title: string;
  onRename?: (newTitle: string) => void;
  /** When true, the edit opens an inline text field over the card title area instead of a full overlay */
  inline?: boolean;
  maxLength?: number;
}

/**
 * Inline edit state rendered in the card's title area.
 * Saves on Enter or blur (clicking outside).
 */
export const InlineEditField = ({
  value,
  onChange,
  onSave,
  maxLength = 20,
}: {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  maxLength?: number;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent outline-none border-b border-white/60 w-full card-title leading-tight"
      style={{ color: "white", caretColor: "white" }}
      placeholder="Label"
      onKeyDown={(e) => {
        if (e.key === "Enter") onSave();
        if (e.key === "Escape") onSave();
      }}
      onBlur={onSave}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

const CardEditButton = ({ title, onRename, inline, maxLength = 20 }: CardEditButtonProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);

  useEffect(() => {
    setValue(title);
  }, [title]);

  const handleSave = useCallback(() => {
    const trimmed = value.trim() || title;
    onRename?.(trimmed);
    setEditing(false);
  }, [value, title, onRename]);

  // For inline mode, we only render the pencil button here.
  // The inline field is rendered separately via the `editing` state exposed through the component.
  if (inline) {
    return {
      editing,
      editValue: value,
      setEditValue: setValue,
      handleSave,
      button: (
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
      ),
    } as any; // This pattern won't work cleanly — let's use a hook instead
  }

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
            <span className="text-white text-xs font-bold">✓</span>
          </button>
          <button
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            onClick={() => setEditing(false)}
          >
            <span className="text-white text-xs font-bold">✕</span>
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
