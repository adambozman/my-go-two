import { useState, useEffect } from "react";
import { Pencil, Check } from "lucide-react";

const STOCK_PHOTOS = [
  { id: "female", label: "Female", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=625&fit=crop&q=80" },
  { id: "male", label: "Male", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&q=80" },
  { id: "couple", label: "Couple", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=625&fit=crop&q=80" },
  { id: "family", label: "Family", url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&h=625&fit=crop&q=80" },
  { id: "friends", label: "Friends", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=625&fit=crop&q=80" },
];

interface CardEditButtonProps {
  title: string;
  onRename?: (newTitle: string) => void;
  onSaveConnection?: (newTitle: string, newImage: string) => void;
  currentImage?: string;
  maxLength?: number;
  isConnection?: boolean;
}

const CardEditButton = ({ title, onRename, onSaveConnection, currentImage, maxLength, isConnection }: CardEditButtonProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [selectedPhoto, setSelectedPhoto] = useState(currentImage || "");

  useEffect(() => {
    if (editing) {
      setValue(title);
      setSelectedPhoto(currentImage || "");
    }
  }, [editing, title, currentImage]);

  if (editing && isConnection) {
    return (
      <div
        className="absolute inset-0 z-20 flex flex-col rounded-2xl p-4 overflow-y-auto"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Label field */}
        <label className="text-[11px] font-medium text-white/60 mb-1 tracking-wide uppercase">Display Label</label>
        <input
          value={value}
          maxLength={maxLength || 20}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-white/90 text-gray-900 outline-none mb-3"
          placeholder="What do you call them?"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Escape") setEditing(false);
          }}
        />

        {/* Photo grid */}
        <label className="text-[11px] font-medium text-white/60 mb-1.5 tracking-wide uppercase">Photo</label>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {STOCK_PHOTOS.map((photo) => {
            const isSelected = selectedPhoto === photo.url;
            return (
              <button
                key={photo.id}
                className="relative rounded-lg overflow-hidden aspect-square"
                onClick={() => setSelectedPhoto(photo.url)}
              >
                <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(45,104,112,0.45)" }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#2D6870" }}>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Save button */}
        <button
          className="w-full rounded-lg py-2 text-sm font-semibold text-white mt-auto"
          style={{ background: "#2D6870" }}
          onClick={() => {
            const finalLabel = value.trim() || title;
            const finalPhoto = selectedPhoto || currentImage || "";
            onSaveConnection?.(finalLabel, finalPhoto);
            setEditing(false);
          }}
        >
          Save
        </button>
      </div>
    );
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
