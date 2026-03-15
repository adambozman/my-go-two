import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Camera, Loader2, X, Trash2, Sparkles, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { setImageUrl, deleteImageUrl, OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import { useAuth } from "@/contexts/AuthContext";
import { getSpareBank, type LocalPhoto } from "@/lib/localImageLibrary";

const ADMIN_EMAIL = "adam.bozman@gmail.com";
const UNSPLASH_KEY = "qrGolQ1Yn5Fn3HCqDQfFWRcwjVBrLwVYLBKjaMyxJfY";
const PEXELS_KEY = "psTr2m0l2jCIzAiXOVMN6aKVFSxfPvXDg4DonTB8TaHV06z2WxP3qgmZ";

interface Photo { id: string; thumb: string; full: string; credit: string; }

interface Props {
  imageKey: string;
  label: string;
  onImageChanged?: () => void;
}

type Tab = "bank" | "search" | "generate";

export default function InlinePhotoSearch(props: Props) {
  const { user } = useAuth();
  if (user?.email !== ADMIN_EMAIL) return null;
  return <AdminPanel {...props} />;
}

// ── Crop helper ──────────────────────────────────────────────
function cropAndUpload(sourceUrl: string) {
  const W = 1015, H = 686;
  return new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = W; c.height = H;
      const ctx = c.getContext("2d")!;
      const r = W / H, ir = img.width / img.height;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (ir > r) { sw = img.height * r; sx = (img.width - sw) / 2; }
      else { sh = img.width / r; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      c.toBlob(b => b ? resolve(b) : reject(new Error("toBlob failed")), "image/jpeg", 0.92);
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = sourceUrl;
  });
}

// ── DB type for category bank photos ─────────────────────────
interface BankPhoto {
  id: string;
  image_url: string;
  filename: string | null;
}

// ── Main admin panel ─────────────────────────────────────────
function AdminPanel({ imageKey, label, onImageChanged }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("bank");
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Category-specific bank photos (from DB)
  const [bankPhotos, setBankPhotos] = useState<BankPhoto[]>([]);
  const [loadingBank, setLoadingBank] = useState(false);

  // Spare bank expand
  const [showSpare, setShowSpare] = useState(false);
  const [sparePhotos] = useState<LocalPhoto[]>(() => getSpareBank());
  const [addingToBank, setAddingToBank] = useState<string | null>(null);

  // Web search state
  const [query, setQuery] = useState(label);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searching, setSearching] = useState(false);

  // AI generate state
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  // Has existing image?
  const [hasImage, setHasImage] = useState(false);
  useEffect(() => {
    supabase.from("category_images").select("image_url").eq("category_key", imageKey).maybeSingle()
      .then(({ data }) => setHasImage(!!data?.image_url));
    const handler = (e: any) => { if (e.detail?.imageKey === imageKey) setHasImage(!!e.detail?.url); };
    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, [imageKey]);

  // Load category bank photos when panel opens
  const loadBankPhotos = useCallback(async () => {
    setLoadingBank(true);
    const { data } = await supabase
      .from("category_bank_photos")
      .select("id, image_url, filename")
      .eq("category_key", imageKey)
      .order("created_at", { ascending: false });
    setBankPhotos(data ?? []);
    setLoadingBank(false);
  }, [imageKey]);

  useEffect(() => {
    if (open) loadBankPhotos();
  }, [open, loadBankPhotos]);

  // Outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // ── Save a photo as the category image ──
  const savePhoto = useCallback(async (sourceUrl: string, saveId: string) => {
    setSaving(saveId);
    try {
      const blob = await cropAndUpload(sourceUrl);
      const filename = `${imageKey}.jpg`;
      const { error } = await supabase.storage.from("category-images").upload(filename, blob, { contentType: "image/jpeg", upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("category-images").getPublicUrl(filename);
      await setImageUrl(imageKey, `${data.publicUrl}?t=${Date.now()}`);
      toast({ title: "✓ Image set", description: label });
      setOpen(false);
      onImageChanged?.();
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally { setSaving(null); }
  }, [imageKey, label, toast, onImageChanged]);

  // ── Add a spare photo to this category's bank (silently) ──
  const addToBankOnly = useCallback(async (photo: LocalPhoto) => {
    try {
      await supabase
        .from("category_bank_photos")
        .insert({ category_key: imageKey, image_url: photo.url, filename: photo.filename });
    } catch { /* ignore duplicates */ }
    loadBankPhotos();
  }, [imageKey, loadBankPhotos]);

  // ── Pick a spare photo: add to bank + set as card image ──
  const pickSparePhoto = useCallback(async (photo: LocalPhoto) => {
    setAddingToBank(photo.id);
    try {
      addToBankOnly(photo);
      await savePhoto(photo.url, photo.id);
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally { setAddingToBank(null); }
  }, [addToBankOnly, savePhoto, toast]);

  // ── Remove a photo from this category's bank ──
  const removeFromBank = useCallback(async (photoId: string) => {
    const { error } = await supabase.from("category_bank_photos").delete().eq("id", photoId);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    } else {
      setBankPhotos(prev => prev.filter(p => p.id !== photoId));
    }
  }, [toast]);

  // ── Web search ──
  const searchWeb = useCallback(async () => {
    setSearching(true);
    setPhotos([]);
    try {
      const [u, px] = await Promise.all([
        fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=9&orientation=landscape`, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }).then(r => r.json()),
        fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=9&orientation=landscape`, { headers: { Authorization: PEXELS_KEY } }).then(r => r.json()),
      ]);
      const combined: Photo[] = [];
      for (let i = 0; i < 9; i++) {
        const uP = u.results || [];
        const pP = px.photos || [];
        if (uP[i]) combined.push({ id: `u-${uP[i].id}`, thumb: uP[i].urls.small, full: `${uP[i].urls.raw}&w=2030&h=1372&fit=crop`, credit: uP[i].user.name });
        if (pP[i]) combined.push({ id: `p-${pP[i].id}`, thumb: pP[i].src.small, full: pP[i].src.large, credit: pP[i].photographer });
      }
      setPhotos(combined.slice(0, 12));
    } catch (e: any) {
      toast({ title: "Search failed", description: e.message, variant: "destructive" });
    } finally { setSearching(false); }
  }, [query, toast]);

  // ── AI Generate ──
  const generateImage = useCallback(async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-category-image", {
        body: { categoryKey: imageKey, gender: "male", imagePrompt: prompt.trim() },
      });
      if (error) throw error;
      if (data?.image_url) {
        window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, { detail: { imageKey, url: `${data.image_url}?t=${Date.now()}` } }));
        toast({ title: "✓ Image generated", description: label });
        setOpen(false);
        onImageChanged?.();
      } else {
        throw new Error(data?.error || "No image returned");
      }
    } catch (e: any) {
      toast({ title: "Generation failed", description: e.message, variant: "destructive" });
    } finally { setGenerating(false); }
  }, [prompt, imageKey, label, toast, onImageChanged]);

  // ── Delete ──
  const handleDelete = useCallback(async () => {
    setDeleting(true);
    try {
      await supabase.storage.from("category-images").remove([`${imageKey}.jpg`]);
      await deleteImageUrl(imageKey);
      toast({ title: "✓ Image removed", description: label });
      setOpen(false);
      onImageChanged?.();
    } catch (e: any) {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    } finally { setDeleting(false); }
  }, [imageKey, label, toast, onImageChanged]);

  const tabStyle = (t: Tab) => ({
    flex: 1, padding: "5px 0", borderRadius: 6, fontSize: 11, fontWeight: 600 as const,
    border: "none", cursor: "pointer" as const,
    background: tab === t ? "#2d6870" : "rgba(45,104,112,0.08)",
    color: tab === t ? "#fff" : "#2d6870",
  });

  return (
    <>
      {/* Camera button */}
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(true); setQuery(label); setTab("bank"); setPhotos([]); setPrompt(""); setShowSpare(false); }}
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

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          onClick={e => e.stopPropagation()}
          style={{
            position: "absolute", bottom: 40, right: 4, zIndex: 30,
            width: 350, maxHeight: 520, overflowY: "auto",
            background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)",
            borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            border: "1px solid rgba(45,104,112,0.15)", padding: 12,
            scrollbarWidth: "none",
          }}
        >
          {/* Tab bar + delete + close */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 3, flex: 1 }}>
              <button onClick={() => setTab("bank")} style={tabStyle("bank")}>Bank</button>
              <button onClick={() => setTab("search")} style={tabStyle("search")}>Search</button>
              <button onClick={() => setTab("generate")} style={tabStyle("generate")}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                  <Sparkles style={{ width: 10, height: 10 }} /> AI
                </span>
              </button>
            </div>
            {hasImage && (
              <button onClick={handleDelete} disabled={deleting}
                style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                {deleting ? <Loader2 style={{ width: 12, height: 12, color: "#ef4444" }} className="animate-spin" /> : <Trash2 style={{ width: 12, height: 12, color: "#ef4444" }} />}
              </button>
            )}
            <button onClick={() => setOpen(false)}
              style={{ width: 28, height: 28, borderRadius: 6, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <X style={{ width: 14, height: 14, color: "#666" }} />
            </button>
          </div>

          {/* ── BANK TAB ── */}
          {tab === "bank" && (
            <div>
              {/* Category-specific photos */}
              <p style={{ fontSize: 11, fontWeight: 600, color: "#2d6870", marginBottom: 6 }}>
                Photos for "{label}"
              </p>

              {loadingBank ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                  <Loader2 style={{ width: 16, height: 16, color: "#2d6870" }} className="animate-spin" />
                </div>
              ) : bankPhotos.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 10 }}>
                  {bankPhotos.map(photo => (
                    <div key={photo.id} style={{ position: "relative" }}>
                      <button onClick={() => savePhoto(photo.image_url, photo.id)} disabled={!!saving}
                        style={{ width: "100%", borderRadius: 8, overflow: "hidden", aspectRatio: "3/2", border: "2px solid transparent", cursor: "pointer", background: "#eee", padding: 0, display: "block" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "#2d6870")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}>
                        <img src={photo.image_url} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        {saving === photo.id && (
                          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Loader2 style={{ width: 16, height: 16, color: "#fff" }} className="animate-spin" />
                          </div>
                        )}
                      </button>
                      {/* Remove from bank */}
                      <button onClick={(e) => { e.stopPropagation(); removeFromBank(photo.id); }}
                        style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: 4, background: "rgba(0,0,0,0.5)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <X style={{ width: 10, height: 10, color: "#fff" }} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 12, color: "#999", textAlign: "center", padding: "12px 0", marginBottom: 8 }}>
                  No photos assigned yet — add from the spare bank below
                </p>
              )}

              {/* Expandable spare bank */}
              <button
                onClick={() => setShowSpare(!showSpare)}
                style={{
                  width: "100%", padding: "8px 10px", borderRadius: 8,
                  background: "rgba(45,104,112,0.06)", border: "1px solid rgba(45,104,112,0.15)",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                  fontSize: 12, fontWeight: 600, color: "#2d6870",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Plus style={{ width: 12, height: 12 }} /> Add from Spare Bank ({sparePhotos.length})
                </span>
                {showSpare ? <ChevronUp style={{ width: 12, height: 12 }} /> : <ChevronDown style={{ width: 12, height: 12 }} />}
              </button>

              {showSpare && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 8 }}>
                  {sparePhotos.map(photo => {
                    const alreadyAdded = bankPhotos.some(bp => bp.image_url === photo.url);
                    return (
                      <button key={photo.id}
                        onClick={() => !alreadyAdded && pickSparePhoto(photo)}
                        disabled={!!addingToBank || alreadyAdded}
                        style={{
                          position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "3/2",
                          border: alreadyAdded ? "2px solid #2d6870" : "2px solid transparent",
                          cursor: alreadyAdded ? "default" : "pointer", background: "#eee", padding: 0,
                          opacity: alreadyAdded ? 0.5 : 1,
                        }}
                        onMouseEnter={e => { if (!alreadyAdded) e.currentTarget.style.borderColor = "#2d6870"; }}
                        onMouseLeave={e => { if (!alreadyAdded) e.currentTarget.style.borderColor = "transparent"; }}>
                        <img src={photo.url} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        {addingToBank === photo.id && (
                          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Loader2 style={{ width: 16, height: 16, color: "#fff" }} className="animate-spin" />
                          </div>
                        )}
                        {alreadyAdded && (
                          <div style={{ position: "absolute", inset: 0, background: "rgba(45,104,112,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 9, color: "#fff", fontWeight: 700, background: "rgba(0,0,0,0.4)", padding: "2px 6px", borderRadius: 4 }}>Added</span>
                          </div>
                        )}
                        {!alreadyAdded && (
                          <div style={{ position: "absolute", bottom: 3, right: 3, width: 18, height: 18, borderRadius: 4, background: "rgba(45,104,112,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Plus style={{ width: 10, height: 10, color: "#fff" }} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── SEARCH TAB ── */}
          {tab === "search" && (
            <>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && searchWeb()}
                  placeholder="Search photos..."
                  autoFocus
                  style={{
                    flex: 1, fontSize: 13, padding: "6px 10px", borderRadius: 8,
                    border: "1px solid rgba(45,104,112,0.2)", background: "rgba(45,104,112,0.04)", outline: "none",
                  }}
                />
                <button onClick={searchWeb} disabled={searching}
                  style={{ width: 30, height: 30, borderRadius: 8, background: "#2d6870", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  {searching ? <Loader2 style={{ width: 14, height: 14, color: "#fff" }} className="animate-spin" /> : <Search style={{ width: 14, height: 14, color: "#fff" }} />}
                </button>
              </div>
              {photos.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {photos.map(photo => (
                    <button key={photo.id} onClick={() => savePhoto(photo.full, photo.id)} disabled={!!saving}
                      style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "3/2", border: "2px solid transparent", cursor: "pointer", background: "#eee", padding: 0 }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "#2d6870")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}>
                      <img src={photo.thumb} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {saving === photo.id && (
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Loader2 style={{ width: 16, height: 16, color: "#fff" }} className="animate-spin" />
                        </div>
                      )}
                      <span style={{ position: "absolute", bottom: 2, right: 3, fontSize: 7, color: "rgba(255,255,255,0.7)" }}>{photo.credit}</span>
                    </button>
                  ))}
                </div>
              ) : !searching ? (
                <p style={{ fontSize: 12, color: "#999", textAlign: "center", padding: "16px 0" }}>
                  Type a search term and press Enter
                </p>
              ) : null}
            </>
          )}

          {/* ── GENERATE TAB ── */}
          {tab === "generate" && (
            <div>
              <p style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>
                Describe the image you want for <strong>{label}</strong>
              </p>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder={`e.g. "Man in casual linen shirt walking through a sunny city street"`}
                autoFocus
                rows={3}
                style={{
                  width: "100%", fontSize: 13, padding: "8px 10px", borderRadius: 8,
                  border: "1px solid rgba(45,104,112,0.2)", background: "rgba(45,104,112,0.04)",
                  outline: "none", resize: "none", fontFamily: "inherit",
                }}
              />
              <button
                onClick={generateImage}
                disabled={generating || !prompt.trim()}
                style={{
                  width: "100%", marginTop: 8, padding: "10px 0", borderRadius: 8,
                  background: generating ? "rgba(45,104,112,0.5)" : "#2d6870",
                  color: "#fff", border: "none", fontSize: 13, fontWeight: 600,
                  cursor: generating ? "wait" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}
              >
                {generating ? (
                  <>
                    <Loader2 style={{ width: 14, height: 14 }} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles style={{ width: 14, height: 14 }} />
                    Generate Image
                  </>
                )}
              </button>
              {generating && (
                <p style={{ fontSize: 11, color: "#999", textAlign: "center", marginTop: 6 }}>
                  This may take 10-20 seconds
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
