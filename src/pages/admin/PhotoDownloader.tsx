import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { setOverride, getOverride } from "@/lib/imageOverrides";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, Check, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UNSPLASH_ACCESS_KEY = "qrGolQ1Yn5Fn3HCqDQfFWRcwjVBrLwVYLBKjaMyxJfY";
const TARGET_W = 1015;
const TARGET_H = 686;

interface Product {
  id: string;
  name: string;
  imageKey: string;
  subcategory: string;
  category: string;
}

interface UnsplashPhoto {
  id: string;
  urls: { small: string; regular: string; full: string; raw: string };
  alt_description: string | null;
  width: number;
  height: number;
  user: { name: string };
}

function buildSearchQuery(productName: string): string {
  return productName.replace(/-/g, " ");
}

/** Fetch image, crop center to 1015×686, return as Blob */
async function cropAndResize(imageUrl: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = TARGET_W;
      canvas.height = TARGET_H;
      const ctx = canvas.getContext("2d")!;

      const targetRatio = TARGET_W / TARGET_H;
      const imgRatio = img.width / img.height;

      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (imgRatio > targetRatio) {
        sw = img.height * targetRatio;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / targetRatio;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, TARGET_W, TARGET_H);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Canvas toBlob failed"))),
        "image/jpeg",
        0.92,
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

function ProductRow({ product }: { product: Product }) {
  const { toast } = useToast();
  const [query, setQuery] = useState(buildSearchQuery(product.name));
  const [results, setResults] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const currentOverride = getOverride(product.imageKey);

  const fetchPhotos = useCallback(async (pageNum = 1, append = false) => {
    append ? setLoadingMore(true) : setLoading(true);
    if (!append) setResults([]);
    try {
      const params = new URLSearchParams({
        query,
        per_page: "15",
        page: String(pageNum),
        orientation: "landscape",
      });
      const res = await fetch(
        `https://api.unsplash.com/search/photos?${params}`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } },
      );
      if (!res.ok) throw new Error(`Unsplash ${res.status}`);
      const data = await res.json();
      const newResults = data.results ?? [];
      setResults(prev => append ? [...prev, ...newResults] : newResults);
      setPage(pageNum);
      setHasMore(newResults.length === 15);
      setExpanded(true);
    } catch (e: any) {
      toast({ title: "Unsplash error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [query, toast]);

  const selectPhoto = useCallback(
    async (photo: UnsplashPhoto) => {
      setSaving(true);
      try {
        // Use raw URL with fit/crop params for best quality
        const downloadUrl = `${photo.urls.raw}&w=${TARGET_W * 2}&h=${TARGET_H * 2}&fit=crop&auto=format&q=90`;
        const blob = await cropAndResize(downloadUrl);

        const filename = `${product.imageKey}.jpg`;
        const { error } = await supabase.storage
          .from("category-images")
          .upload(filename, blob, {
            contentType: "image/jpeg",
            upsert: true,
          });

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from("category-images")
          .getPublicUrl(filename);

        // Set override so image resolver picks it up immediately
        setOverride(product.imageKey, urlData.publicUrl);
        setSaved(true);
        setExpanded(false);
        toast({ title: "Saved", description: `${product.name} → ${filename}` });
      } catch (e: any) {
        toast({ title: "Save failed", description: e.message, variant: "destructive" });
      } finally {
        setSaving(false);
      }
    },
    [product, toast],
  );

  return (
    <Card className="border-border/50">
      <CardHeader className="py-3 px-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          {/* Current image thumbnail */}
          <div className="w-16 h-11 rounded overflow-hidden bg-muted flex-shrink-0">
            {currentOverride ? (
              <img src={currentOverride} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                none
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium truncate">{product.name}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {product.category} → {product.subcategory} · <code className="text-[10px]">{product.imageKey}</code>
            </p>
          </div>
          {saved && <Check className="h-4 w-4 text-green-600 flex-shrink-0" />}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 px-4 pb-4 space-y-3">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-sm"
              onKeyDown={(e) => e.key === "Enter" && fetchPhotos()}
            />
            <Button size="sm" onClick={() => fetchPhotos(1, false)} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Fetch
            </Button>
          </div>

          {results.length > 0 && (
            <>
            <div className="grid grid-cols-3 gap-2">
              {results.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => selectPhoto(photo)}
                  disabled={saving}
                  className="relative rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all group"
                  style={{ aspectRatio: "1015/686" }}
                >
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description ?? ""}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    {saving ? (
                      <Loader2 className="h-5 w-5 text-white animate-spin opacity-0 group-hover:opacity-100" />
                    ) : (
                      <Download className="h-5 w-5 text-white opacity-0 group-hover:opacity-100" />
                    )}
                  </div>
                  <span className="absolute bottom-0.5 right-1 text-[9px] text-white/70">
                    {photo.user.name}
                  </span>
                </button>
              ))}
            </div>
            {hasMore && (
              <Button size="sm" variant="outline" className="w-full" onClick={() => fetchPhotos(page + 1, true)} disabled={loadingMore}>
                {loadingMore ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Load More
              </Button>
            )}
          </>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default function PhotoDownloader() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: rows, error } = await supabase
        .from("category_registry" as any)
        .select("*")
        .eq("section", "style-fit")
        .contains("genders", ["male"])
        .eq("is_active", true)
        .order("sort_order");

      if (error || !rows) {
        console.error("Failed to load categories:", error);
        setLoading(false);
        return;
      }

      const items: Product[] = [];
      for (const row of rows as any[]) {
        const subs: any[] = Array.isArray(row.subcategories) ? row.subcategories : [];
        for (const sub of subs) {
          const prods: any[] = Array.isArray(sub.products) ? sub.products : [];
          for (const p of prods) {
            if (p.image) {
              items.push({
                id: `${row.key}-${sub.id}-${p.id}`,
                name: p.name || p.id,
                imageKey: p.image,
                subcategory: sub.name || sub.id,
                category: row.label,
              });
            }
          }
        }
      }

      setProducts(items);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Photo Downloader</h1>
        <p className="text-sm text-muted-foreground">
          Search Unsplash and assign photos to products · Male / Style & Fit ·{" "}
          {products.length} products
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading products…
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
