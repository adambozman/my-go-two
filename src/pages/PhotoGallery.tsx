import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  isPathBlocked,
  addToBlocklist,
  removeFromBlocklist,
  initBlocklist,
} from "@/data/imageBlocklist";

/* ─── Glob each gender bank at build time ─── */

const maleGlob = import.meta.glob<string>(
  "/src/assets/**/male/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);
const femaleGlob = import.meta.glob<string>(
  [
    "/src/assets/styles/female/**/*.{jpg,jpeg,png,webp}",
    "/src/assets/categories/female/**/*.{jpg,jpeg,png,webp}",
    "/src/assets/templates/!(male|neutral)/**/*.{jpg,jpeg,png,webp}",
    "/src/assets/templates/*.{jpg,jpeg,png,webp}",
  ],
  { eager: true, import: "default" },
);
const neutralGlob = import.meta.glob<string>(
  "/src/assets/**/neutral/**/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

/* ─── Types ─── */

interface GalleryImage {
  path: string;
  url: string;
  filename: string;
  subfolder: string;
}

const TABS = ["Male", "Female", "Neutral"] as const;
type TabName = (typeof TABS)[number];

/* ─── Helpers ─── */

function globToImages(glob: Record<string, string>): GalleryImage[] {
  return Object.entries(glob).map(([path, url]) => {
    const parts = path.split("/");
    const filename = parts[parts.length - 1];
    const assetIdx = parts.indexOf("assets");
    const subfolder =
      assetIdx >= 0
        ? parts.slice(assetIdx + 1, parts.length - 1).join("/")
        : "other";
    return { path, url, filename, subfolder };
  });
}

/* ─── Component ─── */

export default function PhotoGallery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabName>("Male");
  const [version, setVersion] = useState(0); // bump to force re-filter after DB write
  const [loading, setLoading] = useState(true);

  // Load blocklist from DB on mount
  useEffect(() => {
    initBlocklist().then(() => {
      setLoading(false);
      setVersion((v) => v + 1);
    });
  }, []);

  const allImages = useMemo<Record<TabName, GalleryImage[]>>(
    () => ({
      Male: globToImages(maleGlob),
      Female: globToImages(femaleGlob),
      Neutral: globToImages(neutralGlob),
    }),
    [],
  );

  const filtered = useMemo(() => {
    // version dependency forces recalculation after blocklist change
    void version;
    const images = allImages[activeTab].filter(
      (img) => !isPathBlocked(img.path),
    );
    const groups: Record<string, GalleryImage[]> = {};
    for (const img of images) {
      (groups[img.subfolder] ??= []).push(img);
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
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Image Bank</h1>
        <span className="text-sm text-muted-foreground ml-auto">
          {totalVisible} images · {activeTab} bank
        </span>
      </div>

      {/* Gender tabs */}
      <div className="sticky top-[57px] z-20 bg-background/90 backdrop-blur border-b border-border px-4 py-2 flex gap-2">
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
            {tab} (
            {allImages[tab].filter((i) => !isPathBlocked(i.path)).length})
          </button>
        ))}
      </div>

      {/* Grouped image grid */}
      <div className="p-4 space-y-8">
        {filtered.map(([subfolder, images]) => (
          <section key={subfolder}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {subfolder}
              <span className="ml-2 text-xs font-normal">
                ({images.length})
              </span>
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {images.map((img) => (
                <div
                  key={img.path}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-destructive/50 transition-colors"
                >
                  <img
                    src={img.url}
                    alt={img.filename}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay with delete */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(img)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive text-destructive-foreground rounded-md text-xs font-medium hover:bg-destructive/90 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                  {/* Filename strip */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white leading-tight block truncate">
                      {img.filename}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {totalVisible === 0 && (
          <p className="text-center text-muted-foreground py-16">
            No images in this bank.
          </p>
        )}
      </div>
    </div>
  );
}
