/**
 * Photo Gallery — mirrors the app's exact image resolution logic.
 * Structure: Gender → Section → Category → Subcategory → Product
 * Delete a photo to block it. Pick from spare bank to replace any slot.
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight, X, RefreshCw, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTemplateImage, getProductImage } from "@/lib/imageResolver";
import { getOverride, setOverride, clearOverride } from "@/lib/imageOverrides";
import { supabase } from "@/integrations/supabase/client";
import { addToBlocklist, removeFromBlocklist, isPathBlocked, initBlocklist } from "@/data/imageBlocklist";
import { toast } from "sonner";
import type { Gender } from "@/lib/gender";

// ─── Spare bank glob ─────────────────────────────────────────────────────────
// Spare photos named: {image-key}-{n}.jpg e.g. clothing-tshirt-1.jpg
const spareGlob = import.meta.glob<string>(
  "/src/assets/spare/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

// Group spare photos by their base image key (strip trailing -N)
const SPARE_BY_KEY: Record<string, { path: string; url: string; name: string }[]> = {};
for (const [path, url] of Object.entries(spareGlob)) {
  const filename = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  // Strip trailing -1, -2, -3 etc to get base key
  const baseKey = filename.replace(/-\d+$/, "");
  if (!SPARE_BY_KEY[baseKey]) SPARE_BY_KEY[baseKey] = [];
  SPARE_BY_KEY[baseKey].push({ path, url, name: filename });
}

const ALL_SPARE_PHOTOS = Object.entries(spareGlob).map(([path, url]) => ({
  path,
  url,
  name: path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? path,
}));

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageSlot {
  label: string;
  imageKey: string;
  resolvedUrl: string;
  resolvedPath: string;
}

interface Subcategory {
  id: string;
  name: string;
  slot: ImageSlot;
  products: ImageSlot[];
}

interface Category {
  key: string;
  label: string;
  coverSlot: ImageSlot;
  subcategories: Subcategory[];
}

interface Section {
  key: string;
  label: string;
  categories: Category[];
}

const SECTION_LABELS: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};
const SECTION_ORDER = ["style-fit", "food-drink", "gifts-wishlist", "home-living", "entertainment"];
const GENDERS: { label: string; value: Gender }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-Binary", value: "non-binary" },
];
const MAIN_TABS = ["Male", "Female", "Non-Binary", "Spare Bank"] as const;
type TabName = typeof MAIN_TABS[number];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function urlToPath(url: string): string {
  const match = url.match(/src\/assets\/.+\.(jpg|jpeg|png|webp)/);
  return match ? "/" + match[0] : url;
}

function makeSlot(label: string, imageKey: string): ImageSlot {
  return { label, imageKey, resolvedUrl: "", resolvedPath: "" };
}

/** Batch-fetch image URLs from category_images for a list of keys */
async function fetchImageMap(keys: string[]): Promise<Record<string, string>> {
  if (keys.length === 0) return {};
  const { data } = await supabase
    .from("category_images")
    .select("category_key, image_url")
    .in("category_key", keys);
  const map: Record<string, string> = {};
  for (const row of data || []) map[row.category_key] = row.image_url;
  return map;
}

// ─── Spare Picker Modal ───────────────────────────────────────────────────────

const SparePicker = ({ slot, onPick, onClose }: {
  slot: ImageSlot;
  onPick: (url: string) => void;
  onClose: () => void;
}) => {
  const keyMatch = SPARE_BY_KEY[slot.imageKey]?.filter(p => !isPathBlocked(p.path)) ?? [];
  const others = ALL_SPARE_PHOTOS.filter(p => !isPathBlocked(p.path) && !p.name.startsWith(slot.imageKey));

  return (
  <div
    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="bg-background rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h2 className="font-semibold text-lg">Pick a Photo</h2>
          <p className="text-sm text-muted-foreground">For: {slot.label} ({slot.imageKey})</p>
        </div>
        <button onClick={onClose}><X className="w-5 h-5" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {keyMatch.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Matching: {slot.imageKey}</p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {keyMatch.map(photo => (
                <button key={photo.path} onClick={() => onPick(photo.url)}
                  className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                  style={{ aspectRatio: "3/4" }}>
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
        {others.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">All spares</p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {others.map(photo => (
                <button key={photo.path} onClick={() => onPick(photo.url)}
                  className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                  style={{ aspectRatio: "3/4" }}>
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
        {keyMatch.length === 0 && others.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-muted-foreground">
            <ImagePlus className="w-10 h-10 opacity-40" />
            <p className="text-sm">No spare photos available.</p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

// ─── Image card ───────────────────────────────────────────────────────────────

const ImageCard = ({
  slot,
  gender,
  onDelete,
  onPick,
}: {
  slot: ImageSlot;
  gender: Gender;
  onDelete: () => void;
  onPick: () => void;
}) => {
  const liveUrl = slot.resolvedUrl;
  const showImage = !!liveUrl;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative rounded-xl overflow-hidden bg-muted group cursor-pointer" style={{ aspectRatio: "3/4" }} onClick={onPick}>
        {showImage ? (
          <img src={liveUrl} alt={slot.label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted/60">
            <ImagePlus className="w-6 h-6 text-muted-foreground opacity-50" />
            <span className="text-[10px] text-muted-foreground">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
          <button
            onClick={e => { e.stopPropagation(); onPick(); }}
            className="flex items-center gap-1 px-2 py-1 bg-teal-700 text-white rounded-md text-[10px] font-medium"
          >
            <ImagePlus className="w-3 h-3" /> Pick
          </button>
          {showImage && (
            <button
              onClick={e => { e.stopPropagation(); onDelete(); }}
              className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded-md text-[10px] font-medium"
            >
              <X className="w-3 h-3" /> Delete
            </button>
          )}
        </div>
      </div>
      <p className="text-[11px] font-medium text-foreground truncate">{slot.label}</p>
      <p className="text-[10px] text-muted-foreground truncate">{slot.imageKey}</p>
    </div>
  );
};

// ─── Collapsible ──────────────────────────────────────────────────────────────

const Collapsible = ({ title, count, children, defaultOpen = false }: {
  title: string; count?: number; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-muted/40 hover:bg-muted/60 transition-colors text-left"
      >
        {open ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
        <span className="font-semibold text-sm">{title}</span>
        {count !== undefined && <span className="text-xs text-muted-foreground">({count})</span>}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PhotoGallery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabName>("Male");
  const [gender, setGender] = useState<Gender>("male");
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletedKeys, setDeletedKeys] = useState<Set<string>>(new Set());
  const [deletedPaths, setDeletedPaths] = useState<Map<string, string>>(new Map());
  const [version, setVersion] = useState(0);
  const [pickerSlot, setPickerSlot] = useState<ImageSlot | null>(null);
  // Uploaded photos from Supabase storage (not in the build)
  const [uploadedPhotos, setUploadedPhotos] = useState<{ path: string; url: string; name: string }[]>([]);

  useEffect(() => {
    initBlocklist().then(() => setVersion(v => v + 1));
  }, []);

  // Load uploaded spare photos from Supabase storage
  const loadUploadedPhotos = useCallback(async () => {
    const { data: files, error } = await supabase.storage.from("category-images").list("spare", { limit: 500 });
    if (error || !files) return;
    const photos = files
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f.name))
      .map(f => {
        const { data: urlData } = supabase.storage.from("category-images").getPublicUrl(`spare/${f.name}`);
        const name = f.name.replace(/\.[^.]+$/, "");
        return { path: `storage:spare/${f.name}`, url: urlData.publicUrl, name };
      });
    setUploadedPhotos(photos);
  }, []);

  useEffect(() => {
    loadUploadedPhotos();
  }, [loadUploadedPhotos, version]);

  useEffect(() => {
    const map: Record<TabName, Gender> = { "Male": "male", "Female": "female", "Non-Binary": "non-binary", "Spare Bank": "male" };
    setGender(map[activeTab] ?? "male");
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "Spare Bank") { setLoading(false); return; }

    async function load() {
      setLoading(true);
      const dbGender = gender === "non-binary" ? "non-binary" : gender;

      const { data: rows } = await supabase
        .from("category_registry" as any)
        .select("*")
        .eq("page", "mygotwo")
        .eq("is_active", true)
        .contains("genders", [dbGender])
        .order("sort_order");

      if (!rows) { setLoading(false); return; }

      // Collect all image keys first
      const allKeys: string[] = [];
      const sectionMap: Record<string, Category[]> = {};

      for (const row of rows as any[]) {
        const rawSubs: any[] = row.subcategories || [];
        const coverKey = row.image || row.key || "";
        if (coverKey) allKeys.push(coverKey);
        for (const sc of rawSubs) {
          allKeys.push(sc.image || sc.id);
          for (const p of sc.products || []) {
            allKeys.push(p.image || p.id);
          }
        }
      }

      // Batch-fetch all images from the database
      const imageMap = await fetchImageMap(allKeys);

      for (const row of rows as any[]) {
        const rawSubs: any[] = row.subcategories || [];
        const subcategories: Subcategory[] = rawSubs.map((sc: any) => {
          const scKey = sc.image || sc.id;
          const scSlot: ImageSlot = { label: sc.name, imageKey: scKey, resolvedUrl: imageMap[scKey] || "", resolvedPath: "" };
          const rawProducts: any[] = sc.products || [];
          const products: ImageSlot[] = rawProducts.map((p: any) => {
            const pKey = p.image || p.id;
            return { label: p.name, imageKey: pKey, resolvedUrl: imageMap[pKey] || "", resolvedPath: "" };
          });
          return { id: sc.id, name: sc.name, slot: scSlot, products };
        });

        const coverKey = row.image || row.key || "";

        sectionMap[row.section] = sectionMap[row.section] || [];
        sectionMap[row.section].push({
          key: row.key,
          label: row.label,
          coverSlot: { label: row.label, imageKey: coverKey, resolvedUrl: imageMap[coverKey] || "", resolvedPath: "" },
          subcategories,
        });
      }

      setSections(
        SECTION_ORDER.filter(k => sectionMap[k]).map(k => ({
          key: k,
          label: SECTION_LABELS[k] ?? k,
          categories: sectionMap[k],
        }))
      );
      setLoading(false);
    }
    load();
  }, [gender, version, activeTab]);

  const handleDelete = useCallback(async (_path: string, key: string) => {
    await deleteImageUrl(key);
    setVersion(v => v + 1);
    toast.success(`Deleted: ${key}`);
  }, []);

  const handlePick = useCallback(async (slot: ImageSlot, spareUrl: string) => {
    await setImageUrl(slot.imageKey, spareUrl);
    setPickerSlot(null);
    setVersion(v => v + 1);
    toast.success(`Assigned photo to ${slot.imageKey}`);
  }, []);

  const cardProps = (slot: ImageSlot) => ({
    slot,
    gender,
    onDelete: () => handleDelete(slot.resolvedPath, slot.imageKey),
    onPick: () => setPickerSlot(slot),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Image Bank</h1>
        {deletedKeys.size > 0 && (
          <>
            <Button onClick={handleGetAll} size="sm" className="gap-2 ml-2" style={{ background: "var(--swatch-teal)", color: "#fff" }}>
              <RefreshCw className="w-4 h-4" />
              Get Photos ({deletedKeys.size})
            </Button>
            <Button onClick={handlePhotosReplaced} size="sm" variant="outline" className="gap-2">
              ✓ Photos Replaced
            </Button>
          </>
        )}
        <div className="flex gap-2 ml-auto">
          {MAIN_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {tab}
              {tab === "Spare Bank" && ` (${ALL_SPARE_PHOTOS.filter(p => !isPathBlocked(p.path)).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Spare Bank tab */}
      {activeTab === "Spare Bank" && (
        <div className="p-4 space-y-4">
          {/* Upload button */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
              <ImagePlus className="w-4 h-4" />
              Upload Photos
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = e.target.files;
                  if (!files || files.length === 0) return;
                  let uploaded = 0;
                  for (const file of Array.from(files)) {
                    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
                    const nextNum = ALL_SPARE_PHOTOS.length + uploadedPhotos.length + uploaded + 1;
                    const filename = `spare-${String(nextNum).padStart(3, '0')}.${ext}`;
                    const { error } = await supabase.storage
                      .from("category-images")
                      .upload(`spare/${filename}`, file, { contentType: file.type, upsert: true });
                    if (error) {
                      toast.error(`Failed to upload ${file.name}: ${error.message}`);
                    } else {
                      uploaded++;
                    }
                  }
                  if (uploaded > 0) {
                    toast.success(`Uploaded ${uploaded} photo${uploaded > 1 ? 's' : ''}`);
                    await loadUploadedPhotos();
                  }
                  e.target.value = '';
                }}
              />
            </label>
            <span className="text-xs text-muted-foreground">
              Upload .jpg/.png/.webp files to add to the spare bank
            </span>
          </div>

          {/* Uploaded photos from storage */}
          {uploadedPhotos.filter(p => !isPathBlocked(p.path)).length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Uploaded Photos</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {uploadedPhotos.filter(p => !isPathBlocked(p.path)).map(photo => (
                  <div key={photo.path} className="flex flex-col gap-1 group">
                    <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                      <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={async () => {
                            // Delete from storage and blocklist it
                            await supabase.storage.from("category-images").remove([`spare/${photo.name}.${photo.url.split('.').pop()}`]);
                            await addToBlocklist(photo.path);
                            await loadUploadedPhotos();
                            toast.success(`Deleted: ${photo.name}`);
                          }}
                          className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded-md text-[10px] font-medium"
                        >
                          <X className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{photo.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Static spare photos from build */}
          {ALL_SPARE_PHOTOS.filter(p => !isPathBlocked(p.path)).length === 0 && uploadedPhotos.filter(p => !isPathBlocked(p.path)).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
              <ImagePlus className="w-12 h-12 opacity-30" />
              <p>No spare photos yet — upload some or copy the prompt below.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(SPARE_BY_KEY).sort(([a], [b]) => a.localeCompare(b)).map(([key, photos]) => {
                const visiblePhotos = photos.filter(p => !isPathBlocked(p.path));
                if (visiblePhotos.length === 0) return null;
                return (
                  <div key={key}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{key}</p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                      {visiblePhotos.map(photo => (
                        <div key={photo.path} className="flex flex-col gap-1 group">
                          <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                            <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <button
                                onClick={async () => {
                                  await addToBlocklist(photo.path);
                                  setVersion(v => v + 1);
                                  toast.success(`Deleted: ${photo.name}`);
                                }}
                                className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded-md text-[10px] font-medium"
                              >
                                <X className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate">{photo.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Lovable prompt */}
          <div className="p-4 rounded-xl border border-border bg-muted/30">
            <p className="text-sm font-medium mb-2">Fill the spare bank via Lovable</p>
            <p className="text-xs text-muted-foreground mb-2">Tell Lovable to download alternate photos for each image key. Name them <span className="font-mono bg-muted px-1 rounded">{"{image-key}-1.jpg"}</span>, <span className="font-mono bg-muted px-1 rounded">{"{image-key}-2.jpg"}</span> etc. into <span className="font-mono bg-muted px-1 rounded">src/assets/spare/</span></p>
            <button
              onClick={() => {
                const keys = ["clothing-tshirt","clothing-button-up","clothing-polo","clothing-hoodie","clothing-sweatshirt","clothing-sweater","clothing-jeans","clothing-chinos","clothing-shorts","clothing-sweatpants","clothing-dress-pants","clothing-jacket","clothing-coat","clothing-puffer","clothing-windbreaker","clothing-fleece","clothing-rain-jacket","clothing-basics","clothing-underwear","clothing-socks","clothing-undershirt","clothing-loungewear","clothing-pajamas","clothing-formal","clothing-suit","clothing-dress-shirt","clothing-blazer","clothing-tie","clothing-pocket-square","shoe-low-top","shoe-high-top","shoe-slip-on","shoe-running","shoe-training","shoe-basketball","shoe-athletic","shoe-chelsea","shoe-work-boots","shoe-chukka","shoe-loafers","shoe-casual","shoe-moccasins","shoe-dress","shoe-boots","shoe-sandals","shoe-heels","shoe-flats","shoe-sneakers","grooming-shampoo","grooming-conditioner","grooming-styling","grooming-hair-tools","grooming-hair-color","grooming-face-wash","grooming-moisturizer","grooming-serum","grooming-eye-cream","grooming-sunscreen","grooming-razor","grooming-shave-cream","grooming-beard-oil","grooming-beard-trimmer","grooming-aftershave","grooming-fragrance","grooming-deodorant","grooming-body-wash","grooming-lotion","grooming-soap","grooming-makeup","vibe-streetwear","vibe-smart-casual","vibe-heritage","vibe-old-money","vibe-minimalist","vibe-vintage","vibe-techwear","vibe-bohemian","vibe-athletic","vibe-rocker","vibe-coastal","vibe-business","vibe-aesthetic","accessory-sunglasses","accessory-watches","jewelry","jewelry-bracelets","jewelry-earrings","jewelry-necklaces","jewelry-watches","food-asian","food-burgers","food-chicken","food-mexican","food-pizza","favorite-restaurants","favorite-meals","coffee-hot","coffee-iced","coffee-espresso","coffee-tea","meal-breakfast","meal-lunch","meal-dinner","meal-dessert","scent-cologne","scent-perfume","scent-candles","scent-bodycare","anniversary-gifts","birthday-preferences","wish-list","event-concerts","event-sports","event-theater","travel-preferences"];
                const msg = `Please download 2 alternate spare photos for each of the following image keys into src/assets/spare/. Name them {key}-1.jpg and {key}-2.jpg. Use warm editorial GoTwo-brand lifestyle photography — no generic stock, no trees, no random nature. Each photo must be clearly relevant to its key name.\n\n${keys.map(k => `${k}-1.jpg, ${k}-2.jpg`).join("\n")}`;
                navigator.clipboard.writeText(msg).then(() => toast.success("Copied Lovable prompt"));
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground"
            >
              Copy Lovable Prompt
            </button>
          </div>
        </div>
      )}

      {/* Main gallery tabs */}
      {activeTab !== "Spare Bank" && (
        <div className="p-4 space-y-4">
          {loading && <p className="text-center text-muted-foreground py-16">Loading…</p>}
          {!loading && sections.map(section => (
            <Collapsible key={section.key} title={section.label} count={section.categories.length} defaultOpen>
              <div className="space-y-4">
                {section.categories.map(cat => (
                  <Collapsible key={cat.key} title={cat.label} count={cat.subcategories.length}>
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Category Cover</p>
                        <div className="w-28"><ImageCard {...cardProps(cat.coverSlot)} /></div>
                      </div>
                      {cat.subcategories.map(sc => (
                        <Collapsible key={sc.id} title={sc.name} count={sc.products.length}>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Subcategory Image</p>
                              <div className="w-28"><ImageCard {...cardProps(sc.slot)} /></div>
                            </div>
                            {sc.products.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Products</p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                  {sc.products.map((p, i) => <ImageCard key={i} {...cardProps(p)} />)}
                                </div>
                              </div>
                            )}
                          </div>
                        </Collapsible>
                      ))}
                    </div>
                  </Collapsible>
                ))}
              </div>
            </Collapsible>
          ))}
        </div>
      )}

      {/* Spare picker modal */}
      {pickerSlot && (
        <SparePicker
          slot={pickerSlot}
          onPick={(url) => handlePick(pickerSlot, url)}
          onClose={() => setPickerSlot(null)}
        />
      )}
    </div>
  );
}
