import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { SubtypeItem } from "@/data/templateSubtypes";
import { makeStorageRef, resolveStorageUrl } from "@/lib/storageRefs";

const WebEntryTagInput = ({
  value,
  onChange,
  fieldLabel,
}: {
  value: string;
  onChange: (val: string) => void;
  fieldLabel: string;
}) => {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const raw = typeof value === "string" ? value : Array.isArray(value) ? value.join(", ") : String(value ?? "");
  const tags = raw.split(",").filter((t) => t.trim());

  useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus();
  }, [adding]);

  const addTag = () => {
    if (!draft.trim()) return;
    onChange([...tags, draft.trim()].join(", "));
    setDraft("");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          onClick={() => {
            const next = [...tags];
            next.splice(index, 1);
            onChange(next.join(", "));
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 13,
            background: "rgba(26,26,26,0.04)",
            color: "#1a1a1a",
            border: "1px solid rgba(68,58,40,0.1)",
            cursor: "pointer",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          {tag.trim()} x
        </span>
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
          style={{
            width: 100,
            padding: "6px 10px",
            borderRadius: 14,
            fontSize: 13,
            border: "1px solid rgba(68,58,40,0.18)",
            background: "transparent",
            outline: "none",
            fontFamily: "'Jost', sans-serif",
            color: "#1a1a1a",
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          style={{
            padding: "8px 14px",
            borderRadius: 12,
            fontSize: 12,
            border: "1px dashed rgba(68,58,40,0.22)",
            background: "transparent",
            color: "rgba(68,58,40,0.34)",
            fontFamily: "'Jost', sans-serif",
            cursor: "pointer",
          }}
        >
          + add
        </button>
      )}
    </div>
  );
};

const WebAutoFitTitle = ({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(46);
  const text = value || placeholder;
  const isPlaceholder = !value;

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;
    if (containerW === 0 || containerH === 0) return;

    let lo = 16;
    let hi = 60;
    let best = 16;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      measure.style.fontSize = `${mid}px`;
      measure.style.width = `${containerW}px`;
      const fits = measure.scrollHeight <= containerH && measure.scrollWidth <= containerW;
      if (fits) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    setFontSize(best);
  }, [text]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={measureRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          top: 0,
          left: 0,
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          fontFamily: "'Cormorant Garamond', serif",
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize,
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: isPlaceholder ? undefined : "#1a1a1a",
          fontFamily: "'Cormorant Garamond', serif",
          overflow: "hidden",
          boxSizing: "border-box",
          padding: 0,
        }}
      />
    </div>
  );
};

interface MyGoTwoWebProductCardProps {
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

export default function MyGoTwoWebProductCard({
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
}: MyGoTwoWebProductCardProps) {
  const { toast } = useToast();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [resolvedImageUrl, setResolvedImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    const loadImage = async () => {
      const resolved = await resolveStorageUrl(imageUrl);
      if (!cancelled) setResolvedImageUrl(resolved || "");
    };

    loadImage();
    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please choose an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please choose an image under 5MB.", variant: "destructive" });
      return;
    }

    setUploadingImage(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in to upload photos.");

      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("card-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      onImageChange(makeStorageRef("card-images", filePath));
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message || "Could not upload image.", variant: "destructive" });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#eee7d6",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <style>{`
        .mygotwo-web-title::placeholder { color: #1a1a1a; }
        .mygotwo-web-notes::placeholder { color: rgba(26,26,26,0.3); }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px 8px", flexShrink: 0 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "#d4543a", fontWeight: 700 }}>
          {subcategoryName ? [categoryName, subcategoryName].filter(Boolean).join(" · ") : (categoryName || "")}
        </span>
        <span style={{ fontSize: 10, color: "rgba(26,26,26,0.16)", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
          {isEditing ? "edit" : "01"}
        </span>
      </div>

      <div style={{ position: "relative", padding: "0 22px", flexShrink: 0, height: 206 }}>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            position: "absolute",
            top: 4,
            right: 22,
            width: 170,
            height: 190,
            borderRadius: 18,
            border: "none",
            padding: 0,
            overflow: "hidden",
            background: resolvedImageUrl ? `center / cover no-repeat url(${resolvedImageUrl})` : "#cbc2b5",
            cursor: uploadingImage ? "wait" : "pointer",
          }}
          aria-label="Upload image"
          disabled={uploadingImage}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: resolvedImageUrl ? "rgba(26,26,26,0.12)" : "transparent",
            }}
          >
            {uploadingImage ? (
              <Loader2 style={{ width: 24, height: 24, color: "rgba(255,255,255,0.92)", animation: "spin 1s linear infinite" }} />
            ) : (
              <Camera style={{ width: 24, height: 24, color: resolvedImageUrl ? "rgba(255,255,255,0.92)" : "rgba(26,26,26,0.42)" }} />
            )}
          </div>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageUpload} style={{ display: "none" }} />

        <div style={{ maxWidth: "calc(100% - 196px)", height: 176, paddingTop: 4 }}>
          <WebAutoFitTitle value={entryName} placeholder={subtype.name} onChange={onEntryNameChange} />
        </div>

        <div style={{ display: "flex", gap: 5, paddingTop: 10 }}>
          <div style={{ height: 2, width: 22, background: "#d4543a", borderRadius: 1 }} />
          <div style={{ height: 2, width: 8, background: "rgba(212,84,58,0.28)", borderRadius: 1 }} />
        </div>
      </div>

      <div style={{ padding: "2px 22px 8px", flexShrink: 0 }}>
        <div style={{ height: 1, background: "rgba(68,58,40,0.14)" }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "0 22px" }}>
        {(subtype.fields || []).map((field, index) => (
          <div
            key={field.label}
            style={{
              paddingBottom: field.label.toLowerCase() === "notes" ? 0 : 12,
              marginBottom: 12,
              borderBottom: index < subtype.fields.length - 1 ? "1px solid rgba(68,58,40,0.1)" : "none",
            }}
          >
            <p style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(68,58,40,0.34)", fontWeight: 700, margin: "0 0 8px" }}>
              {field.label}
            </p>

            {field.type === "select" && field.options ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {field.options.map((opt) => {
                  const selected = values[field.label] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange(field.label, selected ? "" : opt)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        border: selected ? "1.5px solid #d4543a" : "1px solid rgba(68,58,40,0.18)",
                        background: selected ? "#d4543a" : "transparent",
                        color: selected ? "#fff" : "#1a1a1a",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : field.label.toLowerCase() === "notes" ? (
              <textarea
                className="mygotwo-web-notes"
                value={values[field.label] || ""}
                onChange={(event) => onChange(field.label, event.target.value)}
                placeholder="Add a note..."
                rows={2}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  fontSize: 14,
                  color: "#1a1a1a",
                  lineHeight: 1.5,
                  fontFamily: "'Jost', sans-serif",
                  minHeight: 64,
                  paddingBottom: 8,
                }}
              />
            ) : (
              <WebEntryTagInput value={values[field.label] || ""} onChange={(val) => onChange(field.label, val)} fieldLabel={field.label} />
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 22px 16px", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          style={{
            flex: 1,
            height: 42,
            borderRadius: 999,
            border: "none",
            background: "#d4543a",
            color: "white",
            fontFamily: "'Jost', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            cursor: saving ? "wait" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Save Card"}
        </button>
        {isEditing ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              border: "1px solid rgba(26,26,26,0.12)",
              background: "transparent",
              color: "#1a1a1a",
              cursor: saving ? "wait" : "pointer",
            }}
          >
            <Trash2 style={{ width: 16, height: 16, margin: "0 auto" }} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
