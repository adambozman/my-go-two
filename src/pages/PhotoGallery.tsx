/**
 * Photo Gallery — mirrors the app's exact image resolution logic.
 * Structure: Gender → Section → Category → Subcategory → Product
 * Each node shows the actual image the app resolves for it.
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTemplateImage, getProductImage } from "@/lib/imageResolver";
import { supabase } from "@/integrations/supabase/client";
import type { Gender } from "@/lib/gender";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  image: string;
  resolvedImage: string;
}

interface Subcategory {
  id: string;
  name: string;
  image: string;
  resolvedImage: string;
  products: Product[];
}

interface Category {
  key: string;
  label: string;
  section: string;
  resolvedImage: string;
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

// ─── Image card ───────────────────────────────────────────────────────────────

const ImageCard = ({ label, imageKey, src }: { label: string; imageKey: string; src: string }) => (
  <div className="flex flex-col gap-1">
    <div
      className="relative rounded-xl overflow-hidden bg-muted"
      style={{ aspectRatio: "3/4" }}
    >
      {src ? (
        <img src={src} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-xs text-muted-foreground text-center px-2">No image</span>
        </div>
      )}
    </div>
    <p className="text-[11px] font-medium text-foreground truncate">{label}</p>
    <p className="text-[10px] text-muted-foreground truncate">{imageKey}</p>
  </div>
);

// ─── Collapsible section ──────────────────────────────────────────────────────

const Collapsible = ({ title, count, children, defaultOpen = false }: {
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span className="font-semibold text-sm">{title}</span>
          <span className="text-xs text-muted-foreground">({count})</span>
        </div>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function PhotoGallery() {
  const navigate = useNavigate();
  const [gender, setGender] = useState<Gender>("male");
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const dbGender = gender === "male" ? "male" : gender === "female" ? "female" : "non-binary";

      const { data: rows } = await supabase
        .from("category_registry" as any)
        .select("*")
        .eq("page", "mygotwo")
        .eq("is_active", true)
        .contains("genders", [dbGender])
        .order("sort_order");

      if (!rows) { setLoading(false); return; }

      // Build section → category → subcategory → product tree
      const sectionMap: Record<string, Category[]> = {};

      for (const row of rows as any[]) {
        const subcategories: Subcategory[] = (row.subcategories || []).map((sc: any) => {
          const scResolved = getProductImage(sc.image || sc.id, gender, "");
          const products: Product[] = (sc.products || []).map((p: any) => ({
            id: p.id,
            name: p.name,
            image: p.image || p.id,
            resolvedImage: getProductImage(p.image || p.id, gender, scResolved),
          }));
          return {
            id: sc.id,
            name: sc.name,
            image: sc.image || sc.id,
            resolvedImage: scResolved,
            products,
          };
        });

        // Category image comes from first subcategory image
        const catImageKey = subcategories[0]?.image || "";
        const catResolved = catImageKey ? getTemplateImage(catImageKey, gender) : "";

        const cat: Category = {
          key: row.key,
          label: row.label,
          section: row.section,
          resolvedImage: catResolved,
          subcategories,
        };

        if (!sectionMap[row.section]) sectionMap[row.section] = [];
        sectionMap[row.section].push(cat);
      }

      const built: Section[] = SECTION_ORDER
        .filter(k => sectionMap[k])
        .map(k => ({
          key: k,
          label: SECTION_LABELS[k] ?? k,
          categories: sectionMap[k],
        }));

      setSections(built);
      setLoading(false);
    }

    load();
  }, [gender]);

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
                gender === g.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {loading && (
          <p className="text-center text-muted-foreground py-16">Loading image bank…</p>
        )}

        {!loading && sections.map(section => (
          <Collapsible key={section.key} title={section.label} count={section.categories.length} defaultOpen={true}>
            <div className="space-y-6">
              {section.categories.map(cat => (
                <Collapsible key={cat.key} title={cat.label} count={cat.subcategories.length} defaultOpen={false}>
                  <div className="space-y-6">
                    {/* Category level image */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Category Cover
                      </p>
                      <div className="w-32">
                        <ImageCard label={cat.label} imageKey={cat.subcategories[0]?.image || "—"} src={cat.resolvedImage} />
                      </div>
                    </div>

                    {/* Subcategories */}
                    {cat.subcategories.map(sc => (
                      <Collapsible key={sc.id} title={sc.name} count={sc.products.length} defaultOpen={false}>
                        <div className="space-y-4">
                          {/* Subcategory image */}
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                              Subcategory Image
                            </p>
                            <div className="w-28">
                              <ImageCard label={sc.name} imageKey={sc.image} src={sc.resolvedImage} />
                            </div>
                          </div>

                          {/* Products */}
                          {sc.products.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                Products
                              </p>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                {sc.products.map(p => (
                                  <ImageCard key={p.id} label={p.name} imageKey={p.image} src={p.resolvedImage} />
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
