import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { setOverride, getOverride, clearOverride } from "@/lib/imageOverrides";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Check, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface Product { id: string; name: string; imageKey: string; subcategory: string; category: string; }
interface Photo { id: string | number; thumb: string; full: string; credit: string; }

function ProductRow({ product }: { product: Product }) {
  const { toast } = useToast();
  const [query, setQuery] = useState(product.name);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState(!!getOverride(product.imageKey));
  const [deleting, setDeleting] = useState(false);
  const override = getOverride(product.imageKey);

  const handleDelete = useCallback(async () => {
    if (!override) return;
    setDeleting(true);
    try {
      const filename = `${product.imageKey}.jpg`;
      await supabase.storage.from("category-images").remove([filename]);
      clearOverride(product.imageKey);
      setSaved(false);
      toast({ title: "Deleted", description: product.name });
    } catch (e: any) {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    } finally { setDeleting(false); }
  }, [override, product, toast]);

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
      const filename = `${product.imageKey}.jpg`;
      const { error } = await supabase.storage.from("category-images").upload(filename, blob, { contentType: "image/jpeg", upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("category-images").getPublicUrl(filename);
      setOverride(product.imageKey, data.publicUrl);
      setSaved(true);
      setPhotos([]);
      toast({ title: "Saved", description: product.name });
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally { setSaving(null); }
  }, [product, toast]);

  return (
    <div style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", padding: "10px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 48, height: 32, borderRadius: 4, overflow: "hidden", background: "var(--color-background-secondary)", flexShrink: 0 }}>
          {override ? <img src={override} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>{product.name}</span>
          {saved && <Check style={{ display: "inline", width: 12, height: 12, marginLeft: 4, color: "#1D9E75" }} />}
          <br />
          <code style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>{product.imageKey}</code>
        </div>
        <Input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} style={{ width: 180, fontSize: 12, height: 30 }} />
        <Button size="sm" onClick={search} disabled={loading} style={{ height: 30, padding: "0 10px" }}>
          {loading ? <Loader2 style={{ width: 12, height: 12 }} className="animate-spin" /> : <Search style={{ width: 12, height: 12 }} />}
        </Button>
      </div>
      {photos.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, marginTop: 8 }}>
          {photos.map(photo => (
            <button key={photo.id} onClick={() => pick(photo)} disabled={!!saving}
              style={{ position: "relative", borderRadius: 4, overflow: "hidden", aspectRatio: "1015/686", border: "2px solid transparent", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#2d6870")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}>
              <img src={photo.thumb} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {saving === String(photo.id) && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Loader2 style={{ width: 16, height: 16, color: "#fff" }} className="animate-spin" />
                </div>
              )}
              <span style={{ position: "absolute", bottom: 2, right: 3, fontSize: 8, color: "rgba(255,255,255,0.7)" }}>{photo.credit}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PhotoDownloader() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("style-fit");

  const SECTIONS = [
    { id: "style-fit", label: "Style & Fit" },
    { id: "food-drink", label: "Food & Drink" },
    { id: "gifts-wishlist", label: "Gifts & Wishlist" },
    { id: "home-living", label: "Home & Living" },
    { id: "entertainment", label: "Entertainment" },
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: rows } = await supabase
        .from("category_registry" as any)
        .select("*")
        .eq("section", section)
        .contains("genders", ["male"])
        .eq("is_active", true)
        .order("sort_order");

      const items: Product[] = [];
      for (const row of (rows as any[]) || []) {
        for (const sub of (row.subcategories || [])) {
          if ((sub.products || []).length > 0) {
            for (const p of sub.products) {
              if (p.image) items.push({ id: `${row.key}-${sub.id}-${p.id}`, name: p.name, imageKey: p.image, subcategory: sub.name, category: row.label });
            }
          } else if (sub.image) {
            items.push({ id: `${row.key}-${sub.id}`, name: sub.name, imageKey: sub.image, subcategory: row.label, category: row.label });
          }
        }
      }
      setProducts(items);
      setLoading(false);
    }
    load();
  }, [section]);

  const grouped: Record<string, Record<string, Product[]>> = {};
  for (const p of products) {
    if (!grouped[p.category]) grouped[p.category] = {};
    if (!grouped[p.category][p.subcategory]) grouped[p.category][p.subcategory] = [];
    grouped[p.category][p.subcategory].push(p);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background-primary)", padding: "24px 32px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Photo Downloader</h1>
      <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 16 }}>{products.length} slots · Male</p>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            style={{ padding: "4px 12px", borderRadius: 999, fontSize: 12, border: "1px solid", cursor: "pointer", background: section === s.id ? "#2d6870" : "transparent", color: section === s.id ? "#fff" : "var(--color-text-secondary)", borderColor: section === s.id ? "#2d6870" : "var(--color-border-tertiary)" }}>
            {s.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-text-secondary)" }}>
          <Loader2 style={{ width: 14, height: 14 }} className="animate-spin" /> Loading...
        </div>
      ) : (
        Object.entries(grouped).map(([cat, subs]) => (
          <div key={cat} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "#2d6870", textTransform: "uppercase", letterSpacing: "0.08em" }}>{cat}</h2>
            {Object.entries(subs).map(([sub, prods]) => (
              <div key={sub} style={{ marginBottom: 8 }}>
                {sub !== cat && <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 4, fontWeight: 500 }}>{sub}</p>}
                {prods.map(p => <ProductRow key={p.id} product={p} />)}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
