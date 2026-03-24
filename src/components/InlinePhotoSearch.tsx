import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Loader2, Search, Sparkles, Trash2, Upload, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { deleteImageUrl, OVERRIDE_CHANGED_EVENT, setImageUrl } from "@/lib/imageOverrides";

const ADMIN_EMAIL = "adam.bozman@gmail.com";
const UNSPLASH_KEY = "qrGolQ1Yn5Fn3HCqDQfFWRcwjVBrLwVYLBKjaMyxJfY";
const PEXELS_KEY = "psTr2m0l2jCIzAiXOVMN6aKVFSxfPvXDg4DonTB8TaHV06z2WxP3qgmZ";

interface Props {
  imageKey: string;
  label: string;
  onImageChanged?: () => void;
}

interface Photo {
  id: string;
  thumb: string;
  full: string;
  credit: string;
}

interface BankPhoto {
  id: string;
  image_url: string;
  filename: string | null;
}

type Tab = "bank" | "search" | "generate";

function cropAndUpload(sourceUrl: string) {
  const size = 1024;

  return new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas unavailable"));
        return;
      }

      let sx = 0;
      let sy = 0;
      let sw = img.width;
      let sh = img.height;

      if (img.width > img.height) {
        sw = img.height;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/jpeg", 0.92);
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = sourceUrl;
  });
}

export default function InlinePhotoSearch(props: Props) {
  const { user } = useAuth();
  if (user?.email !== ADMIN_EMAIL) return null;
  return <AdminPanel {...props} />;
}

function AdminPanel({ imageKey, label, onImageChanged }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("bank");
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingBank, setLoadingBank] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [bankPhotos, setBankPhotos] = useState<BankPhoto[]>([]);
  const [query, setQuery] = useState(label);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searching, setSearching] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase
      .from("category_images")
      .select("image_url")
      .eq("category_key", imageKey)
      .maybeSingle()
      .then(({ data }) => setHasImage(Boolean(data?.image_url)));

    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      if (detail.imageKey === imageKey) setHasImage(Boolean(detail.url));
    };

    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, [imageKey]);

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
  }, [loadBankPhotos, open]);

  useEffect(() => {
    if (!open) return;

    const handler = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const savePhoto = useCallback(async (sourceUrl: string, saveId: string) => {
    setSaving(saveId);
    try {
      const blob = await cropAndUpload(sourceUrl);
      const filename = `${imageKey}.jpg`;
      const { error } = await supabase.storage
        .from("category-images")
        .upload(filename, blob, { contentType: "image/jpeg", upsert: true });
      if (error) throw error;

      const { data } = supabase.storage.from("category-images").getPublicUrl(filename);
      await setImageUrl(imageKey, `${data.publicUrl}?t=${Date.now()}`);
      toast({ title: "Image set", description: label });
      setOpen(false);
      onImageChanged?.();
    } catch (error: any) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    } finally {
      setSaving(null);
    }
  }, [imageKey, label, onImageChanged, toast]);

  const removeFromBank = useCallback(async (photoId: string) => {
    const { error } = await supabase.from("category_bank_photos").delete().eq("id", photoId);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }

    setBankPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  }, [toast]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() || "jpg";
        const filename = `${imageKey}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
        const path = `bank/${filename}`;

        const { error: uploadError } = await supabase.storage
          .from("category-images")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from("category-images").getPublicUrl(path);
        await supabase
          .from("category_bank_photos")
          .insert({ category_key: imageKey, image_url: urlData.publicUrl, filename });
      }

      toast({ title: "Uploaded", description: `${files.length} photo(s) added` });
      loadBankPhotos();
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [imageKey, loadBankPhotos, toast]);

  const searchWeb = useCallback(async () => {
    setSearching(true);
    setPhotos([]);

    try {
      const [unsplash, pexels] = await Promise.all([
        fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=9&orientation=landscape`,
          { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } },
        ).then((response) => response.json()),
        fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=9&orientation=landscape`,
          { headers: { Authorization: PEXELS_KEY } },
        ).then((response) => response.json()),
      ]);

      const combined: Photo[] = [];
      for (let index = 0; index < 9; index += 1) {
        const unsplashPhoto = unsplash.results?.[index];
        const pexelsPhoto = pexels.photos?.[index];

        if (unsplashPhoto) {
          combined.push({
            id: `u-${unsplashPhoto.id}`,
            thumb: unsplashPhoto.urls.small,
            full: `${unsplashPhoto.urls.raw}&w=2030&h=1372&fit=crop`,
            credit: unsplashPhoto.user.name,
          });
        }

        if (pexelsPhoto) {
          combined.push({
            id: `p-${pexelsPhoto.id}`,
            thumb: pexelsPhoto.src.small,
            full: pexelsPhoto.src.large,
            credit: pexelsPhoto.photographer,
          });
        }
      }

      setPhotos(combined.slice(0, 12));
    } catch (error: any) {
      toast({ title: "Search failed", description: error.message, variant: "destructive" });
    } finally {
      setSearching(false);
    }
  }, [query, toast]);

  const generateImage = useCallback(async () => {
    if (!prompt.trim()) return;

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-category-image", {
        body: { categoryKey: imageKey, gender: "male", imagePrompt: prompt.trim() },
      });
      if (error) throw error;
      if (!data?.image_url) throw new Error(data?.error || "No image returned");

      window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, {
        detail: { imageKey, url: `${data.image_url}?t=${Date.now()}` },
      }));

      toast({ title: "Image generated", description: label });
      setOpen(false);
      onImageChanged?.();
    } catch (error: any) {
      toast({ title: "Generation failed", description: error.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  }, [imageKey, label, onImageChanged, prompt, toast]);

  const handleDelete = useCallback(async () => {
    setDeleting(true);
    try {
      await supabase.storage.from("category-images").remove([`${imageKey}.jpg`]);
      await deleteImageUrl(imageKey);
      toast({ title: "Image removed", description: label });
      setOpen(false);
      onImageChanged?.();
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } finally {
      setDeleting(false);
    }
  }, [imageKey, label, onImageChanged, toast]);

  const tabStyle = (current: Tab) => ({
    flex: 1,
    padding: "5px 0",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600 as const,
    border: "none",
    cursor: "pointer" as const,
    background: tab === current ? "#2d6870" : "rgba(45,104,112,0.08)",
    color: tab === current ? "#fff" : "#2d6870",
  });

  return (
    <>
      <button
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
          setQuery(label);
          setTab("bank");
          setPhotos([]);
          setPrompt("");
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 20,
          width: 32,
          height: 32,
          borderRadius: 999,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.background = "rgba(45,104,112,0.8)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.background = "rgba(0,0,0,0.45)";
        }}
      >
        <Camera style={{ width: 16, height: 16, color: "#fff" }} />
      </button>

      {open ? (
        <div
          ref={panelRef}
          onClick={(event) => event.stopPropagation()}
          style={{
            position: "absolute",
            bottom: 40,
            right: 4,
            zIndex: 30,
            width: 350,
            maxHeight: 520,
            overflowY: "auto",
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(16px)",
            borderRadius: 14,
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            border: "1px solid rgba(45,104,112,0.15)",
            padding: 12,
            scrollbarWidth: "none",
          }}
        >
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
            {hasImage ? (
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {deleting ? (
                  <Loader2 style={{ width: 12, height: 12, color: "#ef4444" }} className="animate-spin" />
                ) : (
                  <Trash2 style={{ width: 12, height: 12, color: "#ef4444" }} />
                )}
              </button>
            ) : null}
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <X style={{ width: 14, height: 14, color: "#666" }} />
            </button>
          </div>

          {tab === "bank" ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#2d6870", margin: 0 }}>
                  Photos for "{label}"
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: "pointer",
                    background: "rgba(45,104,112,0.08)",
                    border: "1px solid rgba(45,104,112,0.2)",
                    color: "#2d6870",
                  }}
                >
                  {uploading ? (
                    <Loader2 style={{ width: 10, height: 10 }} className="animate-spin" />
                  ) : (
                    <Upload style={{ width: 10, height: 10 }} />
                  )}
                  Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </div>

              {loadingBank ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                  <Loader2 style={{ width: 16, height: 16, color: "#2d6870" }} className="animate-spin" />
                </div>
              ) : bankPhotos.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 10 }}>
                  {bankPhotos.map((photo) => (
                    <div key={photo.id} style={{ position: "relative" }}>
                      <button
                        onClick={() => savePhoto(photo.image_url, photo.id)}
                        disabled={Boolean(saving)}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          overflow: "hidden",
                          aspectRatio: "3/2",
                          border: "2px solid transparent",
                          cursor: "pointer",
                          background: "#eee",
                          padding: 0,
                          display: "block",
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.borderColor = "#2d6870";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.borderColor = "transparent";
                        }}
                      >
                        <img src={photo.image_url} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        {saving === photo.id ? (
                          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Loader2 style={{ width: 16, height: 16, color: "#fff" }} className="animate-spin" />
                          </div>
                        ) : null}
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          removeFromBank(photo.id);
                        }}
                        style={{
                          position: "absolute",
                          top: 3,
                          right: 3,
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          background: "rgba(0,0,0,0.5)",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <X style={{ width: 10, height: 10, color: "#fff" }} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 12, color: "#999", textAlign: "center", padding: "12px 0", marginBottom: 8 }}>
                  No photos assigned yet
                </p>
              )}
            </div>
          ) : null}

          {tab === "search" ? (
            <>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") searchWeb();
                  }}
                  placeholder="Search photos..."
                  autoFocus
                  style={{
                    flex: 1,
                    fontSize: 13,
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: "1px solid rgba(45,104,112,0.2)",
                    background: "rgba(45,104,112,0.04)",
                    outline: "none",
                  }}
                />
                <button
                  onClick={searchWeb}
                  disabled={searching}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "#2d6870",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {searching ? (
                    <Loader2 style={{ width: 14, height: 14, color: "#fff" }} className="animate-spin" />
                  ) : (
                    <Search style={{ width: 14, height: 14, color: "#fff" }} />
                  )}
                </button>
              </div>
              {photos.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {photos.map((photo) => (
                    <button
                      key={photo.id}
                      onClick={() => savePhoto(photo.full, photo.id)}
                      disabled={Boolean(saving)}
                      style={{
                        position: "relative",
                        borderRadius: 8,
                        overflow: "hidden",
                        aspectRatio: "3/2",
                        border: "2px solid transparent",
                        cursor: "pointer",
                        background: "#eee",
                        padding: 0,
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.borderColor = "#2d6870";
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <img src={photo.thumb} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {saving === photo.id ? (
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Loader2 style={{ width: 16, height: 16, color: "#fff" }} className="animate-spin" />
                        </div>
                      ) : null}
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
          ) : null}

          {tab === "generate" ? (
            <div>
              <p style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>
                Describe the image you want for <strong>{label}</strong>
              </p>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder='e.g. "Man in casual linen shirt walking through a sunny city street"'
                autoFocus
                rows={3}
                style={{
                  width: "100%",
                  fontSize: 13,
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(45,104,112,0.2)",
                  background: "rgba(45,104,112,0.04)",
                  outline: "none",
                  resize: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={generateImage}
                disabled={generating || !prompt.trim()}
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: "10px 0",
                  borderRadius: 8,
                  background: generating ? "rgba(45,104,112,0.5)" : "#2d6870",
                  color: "#fff",
                  border: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: generating ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
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
              {generating ? (
                <p style={{ fontSize: 11, color: "#999", textAlign: "center", marginTop: 6 }}>
                  This may take 10-20 seconds
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
