import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useCategoryRegistry } from "@/hooks/useCategoryRegistry";
import GoTwoCoverFlow from "@/components/GoTwoCoverFlow";
import { Loader2 } from "lucide-react";

// Canonical display labels — keys come from the DB, labels are display names
const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
  "health-wellness": "Health & Wellness",
  "travel": "Travel",
};

// Preferred section render order — DB sections not in this list appear at end
const sectionOrder = [
  "style-fit",
  "food-drink",
  "gifts-wishlist",
  "home-living",
  "entertainment",
  "health-wellness",
  "travel",
];

const MyGoTwo = () => {
  const { user } = useAuth();
  const { gender, loading: genderLoading } = usePersonalization();
  const navigate = useNavigate();

  const { sections, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");

  const handleSelect = (categoryKey: string) => {
    console.log("Selected category:", categoryKey);
  };

  if (registryLoading || genderLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Merge DB section keys with preferred order — unknown sections append at end
  const dbSectionKeys = Object.keys(sections);
  const unknownKeys = dbSectionKeys.filter((k) => !sectionOrder.includes(k));
  const mergedOrder = [...sectionOrder, ...unknownKeys];

  const orderedSections = mergedOrder
    .filter((key) => sections[key] && sections[key].length > 0)
    .map((key) => ({
      key,
      label: sectionLabels[key] ?? key
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" & "),
      items: sections[key].map((cat) => ({
        id: cat.key,
        label: cat.label,
        image: cat.image,
      })),
    }));

  return (
    <div className="h-full overflow-y-auto pb-20">
      {orderedSections.map((section) => (
        <div key={section.key} className="mt-6 first:mt-4">
          {/* Section label centered above the coverflow */}
          <h2
            className="section-header text-center mb-5"
            style={{ letterSpacing: "0.12em", fontSize: 11 }}
          >
            {section.label}
          </h2>
          <GoTwoCoverFlow items={section.items} onSelect={handleSelect} />
        </div>
      ))}

      {orderedSections.length === 0 && (
        <p className="text-muted-foreground text-center mt-16 text-sm">
          No categories found. Check back soon.
        </p>
      )}
    </div>
  );
};

export default MyGoTwo;
