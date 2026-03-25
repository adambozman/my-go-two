import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import type { SubtypeItem } from "@/data/templateSubtypes";
import { useMyGoTwoImageField } from "@/features/mygotwo/useMyGoTwoImageField";

interface MobileEntryCardProps {
  subtype: SubtypeItem;
  subcategoryName?: string;
  categoryName?: string;
  entryName: string;
  values: Record<string, string>;
  imageUrl?: string;
  saving: boolean;
  isEditing: boolean;
  onEntryNameChange: (name: string) => void;
  onChange: (fieldLabel: string, value: string) => void;
  onImageChange: (imageUrl: string) => void;
  onSave: () => void;
  onDelete: () => void;
}

function MobileTagInput({
  value,
  fieldLabel,
  onChange,
}: {
  value: string;
  fieldLabel: string;
  onChange: (value: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const raw = typeof value === "string" ? value : String(value ?? "");
  const tags = raw.split(",").filter((tag) => tag.trim());

  useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus();
  }, [adding]);

  const addTag = () => {
    if (!draft.trim()) return;
    onChange([...tags, draft.trim()].join(", "));
    setDraft("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag, index) => (
        <button
          key={`${tag}-${index}`}
          type="button"
          className="rounded-full border border-[rgba(68,58,40,0.1)] bg-[rgba(26,26,26,0.04)] px-3 py-1.5 text-[13px] text-[#1a1a1a]"
          style={{ fontFamily: "'Jost', sans-serif" }}
          onClick={() => {
            const next = [...tags];
            next.splice(index, 1);
            onChange(next.join(", "));
          }}
        >
          {tag.trim()} x
        </button>
      ))}
      {adding ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
            if (event.key === "Escape") {
              setAdding(false);
              setDraft("");
            }
          }}
          onBlur={() => {
            if (draft.trim()) addTag();
            setAdding(false);
          }}
          placeholder={`Add ${fieldLabel.toLowerCase()}...`}
          className="w-28 rounded-xl border border-[rgba(68,58,40,0.18)] bg-transparent px-3 py-2 text-[13px] text-[#1a1a1a] outline-none"
          style={{ fontFamily: "'Jost', sans-serif" }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="rounded-xl border border-dashed border-[rgba(68,58,40,0.22)] bg-transparent px-3 py-2 text-xs text-[rgba(68,58,40,0.34)]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          + add
        </button>
      )}
    </div>
  );
}

export default function MobileEntryCard({
  subtype,
  subcategoryName,
  categoryName,
  entryName,
  values,
  imageUrl,
  saving,
  isEditing,
  onEntryNameChange,
  onChange,
  onImageChange,
  onSave,
  onDelete,
}: MobileEntryCardProps) {
  const { fileInputRef, resolvedImageUrl, uploadingImage, handleImageUpload } = useMyGoTwoImageField(imageUrl, onImageChange);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#eee7d6]" style={{ fontFamily: "'Jost', sans-serif" }}>
      <div className="flex items-center justify-between px-5 pb-2 pt-5">
        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d4543a]">
          {subcategoryName ? [categoryName, subcategoryName].filter(Boolean).join(" · ") : (categoryName || "")}
        </span>
        <span
          className="text-[10px] italic text-[rgba(26,26,26,0.16)]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {isEditing ? "edit" : "01"}
        </span>
      </div>

      <div className="relative flex gap-4 px-5 pb-4">
        <div className="min-w-0 flex-1">
          <textarea
            value={entryName}
            onChange={(event) => onEntryNameChange(event.target.value)}
            placeholder={subtype.name}
            className="h-36 w-full resize-none bg-transparent text-[40px] font-bold leading-[0.95] tracking-[-0.02em] text-[#1a1a1a] outline-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          />
          <div className="flex gap-2 pt-2">
            <div className="h-0.5 w-6 rounded-full bg-[#d4543a]" />
            <div className="h-0.5 w-2 rounded-full bg-[rgba(212,84,58,0.28)]" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl"
          style={{
            background: resolvedImageUrl ? `center / cover no-repeat url(${resolvedImageUrl})` : "#cbc2b5",
            cursor: uploadingImage ? "wait" : "pointer",
          }}
          disabled={uploadingImage}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: resolvedImageUrl ? "rgba(26,26,26,0.12)" : "transparent" }}
          >
            {uploadingImage ? (
              <Loader2 className="h-6 w-6 animate-spin text-white/90" />
            ) : (
              <Camera className="h-6 w-6 text-white/90" />
            )}
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="px-5 pb-3">
        <div className="h-px bg-[rgba(68,58,40,0.14)]" />
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {(subtype.fields || []).map((field, index) => (
          <div
            key={field.label}
            className="mb-3 pb-3"
            style={{ borderBottom: index < subtype.fields.length - 1 ? "1px solid rgba(68,58,40,0.1)" : "none" }}
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[rgba(68,58,40,0.34)]">
              {field.label}
            </p>

            {field.type === "select" && field.options ? (
              <div className="flex flex-wrap gap-2">
                {field.options.map((option) => {
                  const selected = values[field.label] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onChange(field.label, selected ? "" : option)}
                      className="rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                      style={{
                        border: selected ? "1.5px solid #d4543a" : "1px solid rgba(68,58,40,0.18)",
                        background: selected ? "#d4543a" : "transparent",
                        color: selected ? "#fff" : "#1a1a1a",
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            ) : field.label.toLowerCase() === "notes" ? (
              <textarea
                value={values[field.label] || ""}
                onChange={(event) => onChange(field.label, event.target.value)}
                placeholder="Add a note..."
                rows={3}
                className="min-h-20 w-full resize-none bg-transparent text-sm leading-6 text-[#1a1a1a] outline-none"
              />
            ) : (
              <MobileTagInput
                value={values[field.label] || ""}
                fieldLabel={field.label}
                onChange={(value) => onChange(field.label, value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-5 pb-5 pt-4">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="h-11 flex-1 rounded-full bg-[#d4543a] text-sm font-bold text-white"
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Save Card"}
        </button>
        {isEditing ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(26,26,26,0.12)] text-[#1a1a1a]"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
