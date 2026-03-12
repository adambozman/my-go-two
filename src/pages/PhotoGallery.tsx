import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

/* ─── image bank definition ─── */

interface ImageEntry {
  path: string;
  file: string;
  bank: string;
}

// Helper to convert Vite glob imports into ImageEntry[]
function globToEntries(
  glob: Record<string, { default: string }>,
  bank: string,
  stripPrefix: string
): ImageEntry[] {
  return Object.entries(glob).map(([key, mod]) => ({
    path: mod.default,
    file: key.replace(stripPrefix, ""),
    bank,
  }));
}

const stockGlob = import.meta.glob<{ default: string }>(
  "/src/assets/stock/*.jpg",
  { eager: true }
);
const stylesGlob = import.meta.glob<{ default: string }>(
  "/src/assets/styles/**/*.jpg",
  { eager: true }
);
const categoriesGlob = import.meta.glob<{ default: string }>(
  "/src/assets/categories/**/*.jpg",
  { eager: true }
);
const templatesGlob = import.meta.glob<{ default: string }>(
  "/src/assets/templates/**/*.jpg",
  { eager: true }
);
const dashboardGlob = import.meta.glob<{ default: string }>(
  "/src/assets/dashboard/*.jpg",
  { eager: true }
);
const previewsGlob = import.meta.glob<{ default: string }>(
  "/src/assets/previews/*.jpg",
  { eager: true }
);

const ALL_BANKS = ["Stock", "Styles", "Categories", "Templates", "Dashboard", "Previews"] as const;
type BankName = (typeof ALL_BANKS)[number];

function buildImageBank(): ImageEntry[] {
  return [
    ...globToEntries(stockGlob, "Stock", "/src/assets/stock/"),
    ...globToEntries(stylesGlob, "Styles", "/src/assets/styles/"),
    ...globToEntries(categoriesGlob, "Categories", "/src/assets/categories/"),
    ...globToEntries(templatesGlob, "Templates", "/src/assets/templates/"),
    ...globToEntries(dashboardGlob, "Dashboard", "/src/assets/dashboard/"),
    ...globToEntries(previewsGlob, "Previews", "/src/assets/previews/"),
  ];
}

/* ─── component ─── */

export default function PhotoGallery() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeBank, setActiveBank] = useState<BankName | "All">("All");
  const [showDeletedList, setShowDeletedList] = useState(false);

  const allImages = useMemo(() => buildImageBank(), []);

  const filtered = useMemo(
    () =>
      activeBank === "All"
        ? allImages
        : allImages.filter((img) => img.bank === activeBank),
    [allImages, activeBank]
  );

  const toggleSelect = (path: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      // Persist to localStorage for cross-session review
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "photoGalleryDeleteQueue",
          JSON.stringify(Array.from(next))
        );
      }
      return next;
    });
  };

  const clearSelection = () => {
    setSelected(new Set());
    localStorage.removeItem("photoGalleryDeleteQueue");
  };

  // Restore from localStorage on mount
  useState(() => {
    try {
      const stored = localStorage.getItem("photoGalleryDeleteQueue");
      if (stored) setSelected(new Set(JSON.parse(stored)));
    } catch {}
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Photo Gallery</h1>
          <span className="text-sm text-muted-foreground">
            {filtered.length} images
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm font-medium text-destructive">
                {selected.size} flagged
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeletedList(true)}
              >
                <Trash2 className="w-4 h-4 mr-1" /> View Flagged
              </Button>
              <Button size="sm" variant="ghost" onClick={clearSelection}>
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bank filter tabs */}
      <div className="sticky top-[57px] z-20 bg-background/90 backdrop-blur border-b border-border px-4 py-2 flex gap-2 overflow-x-auto">
        {["All", ...ALL_BANKS].map((bank) => (
          <button
            key={bank}
            onClick={() => setActiveBank(bank as BankName | "All")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeBank === bank
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {bank}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {filtered.map((img) => {
          const isSelected = selected.has(img.path);
          return (
            <motion.button
              key={img.path}
              onClick={() => toggleSelect(img.path)}
              whileTap={{ scale: 0.95 }}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                isSelected
                  ? "border-destructive ring-2 ring-destructive/30"
                  : "border-transparent hover:border-primary/40"
              }`}
            >
              <img
                src={img.path}
                alt={img.file}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Bank badge */}
              <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
                {img.bank}
              </span>
              {/* Selected check */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* File name on hover */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <span className="text-[11px] text-white text-center px-1 break-all leading-tight">
                  {img.file}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Flagged images panel */}
      <AnimatePresence>
        {showDeletedList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center"
            onClick={() => setShowDeletedList(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[70vh] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Flagged Off-Brand ({selected.size})
                </h2>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      clearSelection();
                      setShowDeletedList(false);
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowDeletedList(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {Array.from(selected).map((path) => {
                  const entry = allImages.find((i) => i.path === path);
                  return (
                    <div
                      key={path}
                      className="flex items-center gap-3 p-2 rounded-lg bg-muted"
                    >
                      <img
                        src={path}
                        alt=""
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {entry?.file || path}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry?.bank}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleSelect(path)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
