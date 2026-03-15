import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Camera, Loader2, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { setImageUrl, deleteImageUrl, OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";

const UNSPLASH_KEY = "qrGolQ1Yn5Fn3HCqDQfFWRcwjVBrLwVYLBKjaMyxJfY";
const PEXELS_KEY = "psTr2m0l2jCIzAiXOVMN6aKVFSxfPvXDg4DonTB8TaHV06z2WxP3qgmZ";
const W = 1015, H = 686;

async function cropAndResize(url: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext("2d")!;
      const r = W / H, ir = img.width / img.height;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (ir > r) { sw = img.height * r; sx = (img.width - sw) / 2; }
      else { sh = img.width / r; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error("toBlob failed")), "image/jpeg", 0.92);
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = url;
  });
}

interface Photo { id: string | number; thumb: string; full: string; credit: string; }

interface InlinePhotoSearchProps {
  imageKey: string;
  label: string;
  onImageChanged?: () => void;
}

export default function InlinePhotoSearch({ imageKey, label, onImageChanged }: InlinePhotoSearchProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(label);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const [hasImage, setHasImage] = useState(false);
  useEffect(() => {
    supabase.from("category_images").select("image_url").eq("category_key", imageKey).maybeSingle()
      .then(({ data }) => setHasImage(!!data?.image_url));
    const handler = (e: any) => { if (e.detail?.imageKey === imageKey) setHasImage(!!e.detail?.url); };
    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, [imageKey]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const search = useCallback(async () => {
    setLoading(true);
    setPhotos([]);
    try {
      const [u, px] = await Promise.all([
        fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&orientation=landscape`, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }).then(r => r.json()),
        fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6&orientation=landscape`, { headers: { Authorization: PEXELS_KEY } }).then(r => r.json()),
      ]);
      const combined: Photo[] = [];
      const uP = u.results || [], pP = px.photos || [];
      for (let i = 0; i < 6; i++) {
        if (uP[i]) combined.push({ id: uP[i].id, thumb: uP[i].urls.small, full: `${uP[i].urls.raw}&w=2030&h=1372&fit=crop`, credit: uP[i].user.name });
        if (pP[i]) combined.push({ id: pP[i].id, thumb: pP[i].src.small, full: pP[i].src.large, credit: pP[i].photographer });
      }
      setPhotos(combined.slice(0, 12));
    } catch (e: any) {
      toast({ title: "Search failed", description: e.message, variant: "destructive" });
    } finally { setLoading(false); }
  }, [query, toast]);

  const pick = useCallback(async (photo: Photo) => {
    setSaving(String(photo.id));
    try {
      const blob = await cropAndResize(photo.full);
      const filename = `${imageKey}.jpg`;
      const { error } = await supabase.storage.from("category-images").upload(filename, blob, { contentType: "image/jpeg", upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("category-images").getPublicUrl(filename);
      const cacheBustedUrl = `${data.publicUrl}?t=${Date.now()}`;
      await setImageUrl(imageKey, cacheBustedUrl);
      toast({ title: "Image saved", description: label });
      setOpen(false);
      setPhotos([]);
      onImageChanged?.();
    } catch (e: any) {
      toast({ title: "Failed to save", description: e.message, variant: "destructive" });
    } finally { setSaving(null); }
  }, [imageKey, label, toast, onImageChanged]);

  const handleDelete = useCallback(async () => {
    setDeleting(true);
    try {
      await supabase.storage.from("category-images").remove([`${imageKey}.jpg`]);
      await deleteImageUrl(imageKey);
      toast({ title: "Image removed", description: label });
      setOpen(false);
      onImageChanged?.();
    } catch (e: any) {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    } finally { setDeleting(false); }
  }, [imageKey, label, toast, onImageChanged]);

  return (
    <>
      {/* Camera button */}
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(true); setQuery(label); setPhotos([]); }}
        style={{
          position: "absolute", top: 8, right: 8, zIndex: 20,
          width: 32, height: 32, borderRadius: 999,
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(45,104,112,0.8)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.45)")}
      >
        <Camera style={{ width: 16, height: 16, color: "#fff" }} />
      </button>

      {/* Search panel */}
      {open && (
        <div
          ref={panelRef}
          onClick={e => e.stopPropagation()}
          style={{
            position: "absolute", bottom: 40, right: 4, zIndex: 30,
            width: 340, maxHeight: 420, overflowY: "auto",
            background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)",
            borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            border: "1px solid rgba(45,104,112,0.15)", padding: 12,
            scrollbarWidth: "none",
          }}
        >
          {/* Search bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()}
              placeholder="Search photos..."
              autoFocus
              style={{
                flex: 1, fontSize: 13, padding: "6px 10px", borderRadius: 8,
                border: "1px solid rgba(45,104,112,0.2)", background: "rgba(45,104,112,0.04)", outline: "none",
              }}
            />
            <button onClick={search} disabled={loading}
              style={{ width: 30, height: 30, borderRadius: 8, background: "#2d6870", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {loading ? <Loader2 style={{ width: 14, height: 14, color: "#fff" }} className="animate-spin" /> : <Search style={{ width: 14, height: 14, color: "#fff" }} />}
            </button>
            {hasImage && (
              <button onClick={handleDelete} disabled={deleting}
                style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                {deleting ? <Loader2 style={{ width: 14, height: 14, color: "#ef4444" }} className="animate-spin" /> : <Trash2 style={{ width: 14, height: 14, color: "#ef4444" }} />}
              </button>
            )}
            <button onClick={() => setOpen(false)}
              style={{ width: 30, height: 30, borderRadius: 8, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X style={{ width: 16, height: 16, color: "#666" }} />
            </button>
          </div>

          {/* Results grid */}
          {photos.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {photos.map(photo => (
                <button key={photo.id} onClick={() => pick(photo)} disabled={!!saving}
                  style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "1015/686", border: "2px solid transparent", cursor: "pointer", background: "#eee" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#2d6870")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}>
                  <img src={photo.thumb} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {saving === String(photo.id) && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Loader2 style={{ width: 16, height: 16, color: "#fff" }} className="animate-spin" />
                    </div>
                  )}
                  <span style={{ position: "absolute", bottom: 1, right: 2, fontSize: 7, color: "rgba(255,255,255,0.7)" }}>{photo.credit}</span>
                </button>
              ))}
            </div>
          )}

          {photos.length === 0 && !loading && (
            <p style={{ fontSize: 12, color: "#999", textAlign: "center", padding: "16px 0" }}>
              Search for a photo to assign to "{label}"
            </p>
          )}
        </div>
      )}
    </>
  );
}
