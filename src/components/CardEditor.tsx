import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Check, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useImageBank, type ImageBankItem } from "@/hooks/useImageBank";
import { useDevMode } from "@/contexts/dev-mode-context";
import { toast } from "sonner";

/* ─── types ─── */
export type CardOverride = {
  card_id: string;
  image_url: string | null;
  heading: string | null;
  subheading: string | null;
  description: string | null;
};

/* ─── hook: fetch all overrides once ─── */
export function useCardOverrides() {
  const [overrides, setOverrides] = useState<Record<string, CardOverride>>({});
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const { data } = await supabase.from("card_overrides").select("*");
      if (cancelled) return;
      if (data) {
        const map: Record<string, CardOverride> = {};
        for (const row of data) map[row.card_id] = row as CardOverride;
        setOverrides(map);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [version]);

  const refresh = () => setVersion((v) => v + 1);
  return { overrides, loading, refresh };
}

/* ─── edit button: shows on cards when dev mode is on ─── */
export function CardEditTrigger({
  cardId,
  override,
  onSaved,
  fields = ["image_url", "heading", "subheading", "description"],
}: {
  cardId: string;
  override?: CardOverride;
  onSaved: () => void;
  fields?: (keyof Omit<CardOverride, "card_id">)[];
}) {
  const { isDevMode } = useDevMode();
  const [open, setOpen] = useState(false);

  if (!isDevMode) return null;

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        className="absolute top-2 left-2 z-30 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: "rgba(217,101,79,0.9)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
      >
        <Pencil className="w-3.5 h-3.5 text-white" />
      </button>
      {open && createPortal(
        <CardEditorModal
          cardId={cardId}
          initial={override}
          fields={fields}
          onClose={() => setOpen(false)}
          onSaved={() => { onSaved(); setOpen(false); }}
        />,
        document.body
      )}
    </>
  );
}

/* ─── modal ─── */
function CardEditorModal({
  cardId,
  initial,
  fields,
  onClose,
  onSaved,
}: {
  cardId: string;
  initial?: CardOverride;
  fields: (keyof Omit<CardOverride, "card_id">)[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const { images } = useImageBank();
  const [selectedImage, setSelectedImage] = useState(initial?.image_url ?? "");
  const [heading, setHeading] = useState(initial?.heading ?? "");
  const [subheading, setSubheading] = useState(initial?.subheading ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const payload: Record<string, unknown> = { card_id: cardId };
    if (fields.includes("image_url")) payload.image_url = selectedImage || null;
    if (fields.includes("heading")) payload.heading = heading || null;
    if (fields.includes("subheading")) payload.subheading = subheading || null;
    if (fields.includes("description")) payload.description = description || null;

    const { error } = await supabase
      .from("card_overrides")
      .upsert(payload as never, { onConflict: "card_id" });

    setSaving(false);
    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Card updated");
      onSaved();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClose(); }}
    >
      <div
        className="relative w-[90vw] max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-5"
        style={{ background: "var(--swatch-cream-light)", boxShadow: "0 16px 48px rgba(0,0,0,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
            Edit: {cardId}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5">
            <X className="w-5 h-5" style={{ color: "var(--swatch-teal)" }} />
          </button>
        </div>

        {/* Image picker */}
        {fields.includes("image_url") && (
          <div className="mb-4">
            <label className="text-[10px] uppercase tracking-[0.1em] mb-2 block" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Image
            </label>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto rounded-xl p-2" style={{ background: "rgba(0,0,0,0.03)" }}>
              {/* No image option */}
              <button
                onClick={() => setSelectedImage("")}
                className="aspect-[4/3] rounded-lg border-2 flex items-center justify-center text-[10px]"
                style={{
                  borderColor: !selectedImage ? "var(--swatch-cedar-grove)" : "transparent",
                  background: "rgba(0,0,0,0.05)",
                  color: "var(--swatch-antique-coin)",
                }}
              >
                None
              </button>
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className="aspect-[4/3] rounded-lg overflow-hidden border-2"
                  style={{ borderColor: selectedImage === img.url ? "var(--swatch-cedar-grove)" : "transparent" }}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text fields */}
        {fields.includes("heading") && (
          <Field label="Heading" value={heading} onChange={setHeading} />
        )}
        {fields.includes("subheading") && (
          <Field label="Subheading" value={subheading} onChange={setSubheading} />
        )}
        {fields.includes("description") && (
          <Field label="Description" value={description} onChange={setDescription} multiline />
        )}

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-[11px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "'Jost', sans-serif", background: "var(--swatch-teal)", color: "#fff" }}
        >
          <Check className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean;
}) {
  const shared = {
    className: "w-full rounded-xl px-3 py-2 text-[13px] outline-none",
    style: { fontFamily: "'Jost', sans-serif", background: "rgba(0,0,0,0.04)", color: "var(--swatch-teal)", border: "1px solid rgba(0,0,0,0.06)" } as React.CSSProperties,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
  };

  return (
    <div className="mb-3">
      <label className="text-[10px] uppercase tracking-[0.1em] mb-1 block" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
        {label}
      </label>
      {multiline ? <textarea rows={3} {...shared} /> : <input type="text" {...shared} />}
    </div>
  );
}
