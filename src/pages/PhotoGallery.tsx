/**
 * Photo Gallery — mirrors the app's exact image resolution logic.
 * Structure: Gender → Section → Category → Subcategory → Product
 * Delete a photo to block it. "Get Photo" flags it for Lovable to replace.
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTemplateImage, getProductImage } from "@/lib/imageResolver";
import { supabase } from "@/integrations/supabase/client";
import { addToBlocklist, isPathBlocked, initBlocklist } from "@/data/imageBlocklist";
import { toast } from "sonner";
import type { Gender } from "@/lib/gender";

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function urlToPath(url: string): string {
  // Extract the src/assets/... path from the resolved URL
  const match = url.match(/src\/assets\/.+\.(jpg|jpeg|png|webp)/);
  return match ? "/" + match[0] : url;
}

function makeSlot(label: string, imageKey: string, gender: Gender, fallback = ""): ImageSlot {
  const url = getProductImage(imageKey, gender, fallback);
  return { label, imageKey, resolvedUrl: url, resolvedPath: urlToPath(url) };
}

// ─── Image card ───────────────────────────────────────────────────────────────

const ImageCard = ({
  slot,
  onDelete,
  onGet,
  blocked,
}: {
  slot: ImageSlot;
  onDelete: () => void;
  onGet: () => void;
  blocked: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <div className="relative rounded-xl overflow-hidden bg-muted group" style={{ aspectRatio: "3/4" }}>
      {slot.resolvedUrl && !blocked ? (
        <img src={slot.resolvedUrl} alt={slot.label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-muted">
          <span className="text-[10px] text-muted-foreground text-center px-1">
            {blocked ? "Deleted" : "No image"}
          </span>
        </div>
      )}
      {/* Action overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
        {!blocked && slot.resolvedUrl && (
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded-md text-[10px] font-medium"
          >
            <X className="w-3 h-3" /> Delete
          </button>
        )}
        <button
          onClick={onGet}
          className="flex items-center gap-1 px-2 py-1 bg-teal-700 text-white rounded-md text-[10px] font-medium"
        >
          <RefreshCw className="w-3 h-3" /> Get Photo
        </button>
      </div>
    </div>
    <p className="text-[11px] font-medium text-foreground truncate">{slot.label}</p>
    <p className="text-[10px] text-muted-foreground truncate">{slot.imageKey}</p>
  </div>
);

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
  const [gender, setGender] = useState<Gender>("male");
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  const [version, setVersion] = useState(0);

  useEffect(() => {
    initBlocklist().then(() => setVersion(v => v + 1));
  }, []);

  useEffect(() => {
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

          // Products: if sc has products array use it, otherwise treat sc itself as a product
          const rawProducts: any[] = sc.products || [];
          const products: ImageSlot[] = rawProducts.length > 0
            ? rawProducts.map((p: any) => makeSlot(p.name, p.image || p.id, gender, scSlot.resolvedUrl))
            : []; // no products = goes straight to form

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
  }, [gender, version]);

  const handleDelete = useCallback(async (path: string, key: string) => {
    await addToBlocklist(path);
    setBlocked(prev => new Set([...prev, path]));
    toast.success(`Deleted: ${key}`, { description: "Tell Lovable to replace this image key." });
  }, []);

  const handleGet = useCallback((slot: ImageSlot) => {
    const msg = `Please download a new photo for image key "${slot.imageKey}" and save it to src/assets/templates/${slot.imageKey}.jpg (and src/assets/templates/male/${slot.imageKey}.jpg for male). Use warm editorial lifestyle photography matching the GoTwo brand aesthetic.`;
    navigator.clipboard.writeText(msg).then(() => {
      toast.success("Copied to clipboard — paste into Lovable");
    }).catch(() => {
      toast.info(`Image key: ${slot.imageKey}`);
    });
  }, []);

  const isBlocked = (slot: ImageSlot) => blocked.has(slot.resolvedPath) || isPathBlocked(slot.resolvedPath);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Image Bank</h1>
        <div className="flex gap-2 ml-auto">
          {GENDERS.map(g => (
            <button
              key={g.value}
              onClick={() => setGender(g.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                gender === g.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {loading && <p className="text-center text-muted-foreground py-16">Loading…</p>}

        {!loading && sections.map(section => (
          <Collapsible key={section.key} title={section.label} count={section.categories.length} defaultOpen>
            <div className="space-y-4">
              {section.categories.map(cat => (
                <Collapsible key={cat.key} title={cat.label} count={cat.subcategories.length}>
                  <div className="space-y-6">

                    {/* Category cover */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Category Cover</p>
                      <div className="w-28">
                        <ImageCard
                          slot={cat.coverSlot}
                          blocked={isBlocked(cat.coverSlot)}
                          onDelete={() => handleDelete(cat.coverSlot.resolvedPath, cat.coverSlot.imageKey)}
                          onGet={() => handleGet(cat.coverSlot)}
                        />
                      </div>
                    </div>

                    {/* Subcategories */}
                    {cat.subcategories.map(sc => (
                      <Collapsible key={sc.id} title={sc.name} count={sc.products.length}>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Subcategory Image</p>
                            <div className="w-28">
                              <ImageCard
                                slot={sc.slot}
                                blocked={isBlocked(sc.slot)}
                                onDelete={() => handleDelete(sc.slot.resolvedPath, sc.slot.imageKey)}
                                onGet={() => handleGet(sc.slot)}
                              />
                            </div>
                          </div>

                          {sc.products.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Products</p>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                {sc.products.map((p, i) => (
                                  <ImageCard
                                    key={i}
                                    slot={p}
                                    blocked={isBlocked(p)}
                                    onDelete={() => handleDelete(p.resolvedPath, p.imageKey)}
                                    onGet={() => handleGet(p)}
                                  />
                                ))}
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
    </div>
  );
}
