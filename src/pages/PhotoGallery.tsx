import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Undo2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  isPathBlocked,
  addToBlocklist,
  removeFromBlocklist,
  initBlocklist,
} from "@/data/imageBlocklist";

/* ─── Glob each gender bank at build time ─── */

const maleTemplateGlob = import.meta.glob<string>(
  "/src/assets/templates/male/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);
const rootTemplateGlob = import.meta.glob<string>(
  "/src/assets/templates/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);
const maleGlob = import.meta.glob<string>(
  "/src/assets/**/male/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);
const femaleGlob = import.meta.glob<string>(
  [
    "/src/assets/styles/female/**/*.{jpg,jpeg,png,webp}",
    "/src/assets/categories/female/**/*.{jpg,jpeg,png,webp}",
  ],
  { eager: true, import: "default" },
);
const nonBinaryGlob = import.meta.glob<string>(
  "/src/assets/**/non-binary/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

/* ─── Category prefix map ─── */

const PREFIX_GROUPS: { prefix: string; label: string }[] = [
  { prefix: "clothing-", label: "Clothing" },
  { prefix: "shoe-", label: "Footwear" },
  { prefix: "grooming-", label: "Grooming" },
  { prefix: "scent-", label: "Scents & Fragrance" },
  { prefix: "vibe-", label: "Vibe" },
  { prefix: "accessory-", label: "Accessories" },
  { prefix: "jewelry-", label: "Jewelry" },
  { prefix: "food-", label: "Food" },
  { prefix: "coffee-", label: "Coffee & Drinks" },
  { prefix: "grocery-", label: "Grocery" },
  { prefix: "meal-", label: "Meals" },
  { prefix: "fast-food-", label: "Fast Food" },
  { prefix: "favorite-", label: "Favorites" },
  { prefix: "dietary-", label: "Dietary" },
  { prefix: "event-", label: "Entertainment & Events" },
  { prefix: "flowers-", label: "Flowers & Plants" },
  { prefix: "home-", label: "Home & Living" },
  { prefix: "kitchen-", label: "Kitchen" },
  { prefix: "tech-", label: "Tech & Gadgets" },
  { prefix: "gaming-", label: "Gaming" },
  { prefix: "sports-", label: "Sports" },
  { prefix: "travel-", label: "Travel" },
  { prefix: "wellness-", label: "Wellness" },
  { prefix: "nightlife-", label: "Nightlife & Social" },
  { prefix: "music-", label: "Music" },
  { prefix: "books-", label: "Books & Podcasts" },
  { prefix: "garage-", label: "Garage & Tools" },
  { prefix: "measure-", label: "Measurements" },
  { prefix: "anniversary-", label: "Special Occasions" },
  { prefix: "birthday-", label: "Special Occasions" },
  { prefix: "brand-", label: "Brand Preferences" },
  { prefix: "specific-", label: "Specific Products" },
  { prefix: "wish-", label: "Wishlist" },
  { prefix: "date-", label: "Date Ideas" },
];

function getCategory(filename: string): string {
  const name = filename.replace(/\.[^.]+$/, ""); // strip extension
  for (const { prefix, label } of PREFIX_GROUPS) {
    if (name.startsWith(prefix)) return label;
  }
  return "Other";
}

/* ─── Types ─── */

interface GalleryImage {
  path: string;
  url: string;
  filename: string;
  key: string; // image key without extension
  category: string;
}

const TABS = ["Male", "Female / Shared", "Non-Binary"] as const;
type TabName = (typeof TABS)[number];

/* ─── Helpers ─── */

function globToImages(glob: Record<string, string>): GalleryImage[] {
  return Object.entries(glob).map(([path, url]) => {
    const parts = path.split("/");
    const filename = parts[parts.length - 1];
    const key = filename.replace(/\.[^.]+$/, "");
    return { path, url, filename, key, category: getCategory(filename) };
  });
}

/* ─── Component ─── */

export default function PhotoGallery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabName>("Male");
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    initBlocklist().then(() => {
      setLoading(false);
      setVersion((v) => v + 1);
    });
  }, []);

  const handleBulkGenerate = useCallback(async () => {
    setGenerating(true);
    setGenProgress({ completed: 0, total: 0 });
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const resp = await fetch(
        `https://${projectId}.supabase.co/functions/v1/bulk-generate-category-images`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      if (!resp.ok) { toast.error("Bulk generation failed: " + resp.status); setGenerating(false); return; }
      const reader = resp.body?.getReader();
      if (!reader) { setGenerating(false); return; }
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line);
            if (msg.type === "progress") setGenProgress({ completed: msg.completed, total: msg.total });
            else if (msg.type === "done") toast.success(`Done! ${msg.total_success} generated, ${msg.total_failed} failed`);
          } catch {}
        }
      }
    } catch (e: any) { toast.error("Bulk generation error: " + e.message); }
    setGenerating(false);
  }, []);

  const allImages = useMemo<Record<TabName, GalleryImage[]>>(() => ({
    "Male": [
      ...globToImages(maleGlob),
      ...globToImages(maleTemplateGlob),
    ],
    "Female / Shared": [
      ...globToImages(femaleGlob),
      ...globToImages(rootTemplateGlob),
    ],
    "Non-Binary": globToImages(nonBinaryGlob),
  }), []);

  const filtered = useMemo(() => {
    void version;
    const images = allImages[activeTab].filter((img) => !isPathBlocked(img.path));
    // Deduplicate by path
    const seen = new Set<string>();
    const unique = images.filter(img => { if (seen.has(img.path)) return false; seen.add(img.path); return true; });
    const groups: Record<string, GalleryImage[]> = {};
    for (const img of unique) {
      (groups[img.category] ??= []).push(img);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [allImages, activeTab, version]);

  const totalVisible = useMemo(
    () => filtered.reduce((sum, [, imgs]) => sum + imgs.length, 0),
    [filtered],
  );

  const handleDelete = useCallback(async (img: GalleryImage) => {
    const ok = await addToBlocklist(img.path);
    if (ok) {
      setVersion((v) => v + 1);
      toast.success("Image permanently blocked", {
        description: img.filename,
        action: {
          label: "Undo",
          onClick: async () => {
            await removeFromBlocklist(img.path);
            setVersion((v) => v + 1);
            toast.info("Image restored");
          },
        },
      });
    } else {
      toast.error("Failed to block image");
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading blocklist…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Bulk generate bar */}
      <div className="sticky top-0 z-40 bg-background border-b border-border px-4 py-2 flex items-center gap-3">
        <Button onClick={handleBulkGenerate} disabled={generating} size="sm" className="gap-2">
          <ImagePlus className="w-4 h-4" />
          {generating ? `Generating... ${genProgress.completed}/${genProgress.total}` : "Generate All Category Images"}
        </Button>
      </div>

      {/* Header */}
      <div className="sticky top-[49px] z-30 bg-background/90 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Image Bank</h1>
        <span className="text-sm text-muted-foreground ml-auto">
          {totalVisible} images · {activeTab}
        </span>
      </div>

      {/* Tabs */}
      <div className="sticky top-[98px] z-20 bg-background/90 backdrop-blur border-b border-border px-4 py-2 flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab} ({allImages[tab].filter((i) => !isPathBlocked(i.path)).length})
          </button>
        ))}
      </div>

      {/* Grouped image grid */}
      <div className="p-4 space-y-8">
        {filtered.map(([category, images]) => (
          <section key={category}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {category}
              <span className="ml-2 text-xs font-normal">({images.length})</span>
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {images.map((img) => (
                <div
                  key={img.path}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-destructive/50 transition-colors"
                >
                  <img src={img.url} alt={img.key} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(img)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive text-destructive-foreground rounded-md text-xs font-medium hover:bg-destructive/90 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white leading-tight block truncate">{img.key}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        {totalVisible === 0 && (
          <p className="text-center text-muted-foreground py-16">No images in this bank.</p>
        )}
      </div>
    </div>
  );
}
