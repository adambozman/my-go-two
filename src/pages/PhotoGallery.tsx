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
import { addToBlocklist, isPathBlocked, initBlocklist } from "@/data/imageBlocklist";
import { toast } from "sonner";
import type { Gender } from "@/lib/gender";

// ─── Spare bank glob ─────────────────────────────────────────────────────────

const spareGlob = import.meta.glob<string>(
  "/src/assets/spare/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const SPARE_PHOTOS = Object.entries(spareGlob).map(([path, url]) => ({
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

function makeSlot(label: string, imageKey: string, gender: Gender, fallback = ""): ImageSlot {
  const override = getOverride(imageKey);
  const url = override || getProductImage(imageKey, gender, fallback);
  return { label, imageKey, resolvedUrl: url, resolvedPath: urlToPath(url) };
}

// ─── Spare Picker Modal ───────────────────────────────────────────────────────

const SparePicker = ({ slot, onPick, onClose }: {
  slot: ImageSlot;
  onPick: (url: string) => void;
  onClose: () => void;
}) => (
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
        {SPARE_PHOTOS.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-muted-foreground">
            <ImagePlus className="w-10 h-10 opacity-40" />
            <p className="text-sm">No spare photos yet.</p>
            <p className="text-xs text-center max-w-xs">Tell Lovable: "Download 100 warm editorial lifestyle photos to src/assets/spare/ named spare-001.jpg through spare-100.jpg"</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {SPARE_PHOTOS.map(photo => (
              <button
                key={photo.path}
                onClick={() => onPick(photo.url)}
                className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                style={{ aspectRatio: "3/4" }}
              >
                <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

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
  // Always resolve live — never use stale baked-in URL
  const override = getOverride(slot.imageKey);
  const liveUrl = override || getProductImage(slot.imageKey, gender, "");
  const livePath = urlToPath(liveUrl);
  const blocked = isPathBlocked(livePath);
  const hasOverride = !!override;
  const showImage = !!liveUrl && !blocked;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative rounded-xl overflow-hidden bg-muted group cursor-pointer" style={{ aspectRatio: "3/4" }} onClick={onPick}>
        {showImage ? (
          <img src={liveUrl} alt={slot.label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted/60">
            <ImagePlus className="w-6 h-6 text-muted-foreground opacity-50" />
            <span className="text-[10px] text-muted-foreground">{blocked ? "Deleted" : "No image"}</span>
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
          {hasOverride && (
            <button
              onClick={e => { e.stopPropagation(); clearOverride(slot.imageKey); window.location.reload(); }}
              className="flex items-center gap-1 px-2 py-1 bg-gray-600 text-white rounded-md text-[10px] font-medium"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
        {hasOverride && (
          <div className="absolute top-1 right-1 bg-teal-600 rounded-full w-3 h-3" title="Custom photo assigned" />
        )}
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
  const [version, setVersion] = useState(0);
  const [pickerSlot, setPickerSlot] = useState<ImageSlot | null>(null);

  useEffect(() => {
    initBlocklist().then(() => setVersion(v => v + 1));
  }, []);

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

      const sectionMap: Record<string, Category[]> = {};

      for (const row of rows as any[]) {
        const rawSubs: any[] = row.subcategories || [];
        const subcategories: Subcategory[] = rawSubs.map((sc: any) => {
          const scSlot = makeSlot(sc.name, sc.image || sc.id, gender);
          const rawProducts: any[] = sc.products || [];
          const products: ImageSlot[] = rawProducts.map((p: any) =>
            makeSlot(p.name, p.image || p.id, gender, scSlot.resolvedUrl)
          );
          return { id: sc.id, name: sc.name, slot: scSlot, products };
        });

        const coverKey = rawSubs[0]?.image || rawSubs[0]?.id || "";
        const coverUrl = coverKey ? getTemplateImage(coverKey, gender) : "";

        sectionMap[row.section] = sectionMap[row.section] || [];
        sectionMap[row.section].push({
          key: row.key,
          label: row.label,
          coverSlot: { label: row.label, imageKey: coverKey, resolvedUrl: coverUrl, resolvedPath: urlToPath(coverUrl) },
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

  const handleDelete = useCallback(async (path: string, key: string) => {
    await addToBlocklist(path);
    setDeletedKeys(prev => new Set([...prev, key]));
    setVersion(v => v + 1);
    toast.success(`Deleted: ${key}`);
  }, []);

  const handleGetAll = useCallback(() => {
    if (deletedKeys.size === 0) { toast.info("No deleted photos yet."); return; }
    const msg = `Please download new replacement photos for the following image keys and save them as .jpg files in both src/assets/templates/ and src/assets/templates/male/. Use warm, editorial, on-brand lifestyle photography matching the GoTwo aesthetic. Do NOT reuse previously downloaded photos for these keys.\n\nKeys to replace:\n${[...deletedKeys].map(k => `- ${k}`).join("\n")}`;
    navigator.clipboard.writeText(msg).then(() => {
      toast.success(`Copied ${deletedKeys.size} keys — paste into Lovable`);
    }).catch(() => toast.info([...deletedKeys].join(", ")));
  }, [deletedKeys]);

  const handlePick = useCallback((slot: ImageSlot, spareUrl: string) => {
    setOverride(slot.imageKey, spareUrl);
    setPickerSlot(null);
    setVersion(v => v + 1);
    toast.success(`Assigned spare photo to ${slot.imageKey}`);
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
          <Button onClick={handleGetAll} size="sm" className="gap-2 ml-2" style={{ background: "var(--swatch-teal)", color: "#fff" }}>
            <RefreshCw className="w-4 h-4" />
            Get Photos ({deletedKeys.size})
          </Button>
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
              {tab === "Spare Bank" && ` (${SPARE_PHOTOS.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Spare Bank tab */}
      {activeTab === "Spare Bank" && (
        <div className="p-4">
          <div className="mb-4 p-4 rounded-xl border border-border bg-muted/30">
            <p className="text-sm font-medium mb-1">How to fill the spare bank</p>
            <p className="text-xs text-muted-foreground">Tell Lovable: <span className="font-mono bg-muted px-1 rounded">"Download 100 warm editorial lifestyle photos to src/assets/spare/ named spare-001.jpg through spare-100.jpg. Use the GoTwo brand aesthetic — warm tones, lifestyle, editorial."</span></p>
          </div>
          {SPARE_PHOTOS.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
              <ImagePlus className="w-12 h-12 opacity-30" />
              <p>No spare photos yet — tell Lovable to fill this bank.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {SPARE_PHOTOS.map(photo => (
                <div key={photo.path} className="flex flex-col gap-1">
                  <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">{photo.name}</p>
                </div>
              ))}
            </div>
          )}
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
