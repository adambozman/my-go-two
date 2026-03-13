import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { getStyleImage, getCategoryImage } from "@/data/genderImages";
import { getTemplateImage, getProductImage } from "@/data/templateImageResolver";

/* ─── Canonical ID lists (must match the resolver maps) ─── */

const STYLE_IDS = [
  "minimal", "classic", "sporty", "trendy", "edgy", "boho", "luxury", "laid-back",
  "polished", "casual", "creative", "professional", "chill", "budget", "balanced",
  "quality", "comfort", "fit", "brand", "price", "timeless", "dining", "traveling",
  "outdoors", "events", "staying-in", "fitness", "practical", "thoughtful",
  "luxurious", "experience", "surprise", "hippy", "preppy", "street", "elegant", "bougie",
];

const CATEGORY_IDS = ["shopping", "style", "food", "gifts", "lifestyle", "fit"];

const TEMPLATE_NAMES = [
  "Clothing Sizes", "Shoe Size", "Scents", "Grooming", "Measurements",
  "Fragrances", "Jewelry", "Brand Preferences", "Specific Product Versions",
  "Coffee Order", "Dietary Restrictions", "Fast Food Order", "Favorite Meals",
  "Grocery Specifics", "Anniversary Gifts", "Birthday Preferences", "Flowers",
  "Wish List Items", "Date Ideas", "Events", "Favorite Restaurants",
  "Travel Preferences", "Love Language", "Pet Peeves",
];

const PRODUCT_IDS = [
  "sneakers", "boots", "sandals", "tops", "bottoms", "outerwear", "activewear",
  "cologne", "perfume", "candle", "body-lotion", "body-wash", "essential-oil", "room-spray",
  "hair-care", "skin-care", "shaving", "shampoo", "conditioner", "hair-styling",
  "moisturizer", "cleanser", "sunscreen", "razor", "shaving-cream", "aftershave", "pre-shave",
  "body", "ring", "necklaces", "bracelets", "earrings", "watches",
  "daily-fragrance", "evening-fragrance", "body-mist", "fragrance-oil",
];

/* ─── types ─── */

interface ResolvedImage {
  id: string;
  label: string;
  url: string;
  tab: TabName;
}

const TABS = ["Styles", "Categories", "Templates", "Products"] as const;
type TabName = (typeof TABS)[number];

/* ─── component ─── */

export default function PhotoGallery() {
  const navigate = useNavigate();
  const { gender } = usePersonalization();
  const [activeTab, setActiveTab] = useState<TabName>("Styles");

  const images = useMemo<Record<TabName, ResolvedImage[]>>(() => {
    // Deduplicate by resolved URL within each tab
    const dedup = (items: ResolvedImage[]) => {
      const seen = new Set<string>();
      return items.filter((item) => {
        if (seen.has(item.url)) return false;
        seen.add(item.url);
        return true;
      });
    };

    return {
      Styles: dedup(
        STYLE_IDS.map((id) => ({
          id,
          label: id.replace(/-/g, " "),
          url: getStyleImage(id, gender),
          tab: "Styles" as TabName,
        }))
      ),
      Categories: dedup(
        CATEGORY_IDS.map((id) => ({
          id,
          label: id,
          url: getCategoryImage(id, gender),
          tab: "Categories" as TabName,
        }))
      ),
      Templates: dedup(
        TEMPLATE_NAMES.map((name) => ({
          id: name.toLowerCase().replace(/\s+/g, "-"),
          label: name,
          url: getTemplateImage(name, gender),
          tab: "Templates" as TabName,
        }))
      ),
      Products: dedup(
        PRODUCT_IDS.map((id) => ({
          id,
          label: id.replace(/-/g, " "),
          url: getProductImage(id, gender),
          tab: "Products" as TabName,
        }))
      ),
    };
  }, [gender]);

  const filtered = images[activeTab];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Photo Gallery</h1>
        <span className="text-sm text-muted-foreground">
          {filtered.length} images · {gender}
        </span>
      </div>

      {/* Tab filter */}
      <div className="sticky top-[57px] z-20 bg-background/90 backdrop-blur border-b border-border px-4 py-2 flex gap-2 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab} ({images[tab].length})
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {filtered.map((img) => (
          <div
            key={img.id}
            className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary/40 transition-colors"
          >
            <img
              src={img.url}
              alt={img.label}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Label overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-end opacity-0 hover:opacity-100">
              <span className="text-[11px] text-white px-2 py-1.5 leading-tight w-full bg-black/60">
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
