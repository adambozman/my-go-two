import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useCategoryRegistry } from "@/hooks/useCategoryRegistry";
import GoTwoCoverFlow from "@/components/GoTwoCoverFlow";
import { Loader2 } from "lucide-react";

const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

const sectionOrder = ["style-fit", "food-drink", "gifts-wishlist", "home-living", "entertainment"];

const MyGoTwo = () => {
  const { user } = useAuth();
  const { gender, loading: genderLoading } = usePersonalization();
  const navigate = useNavigate();

  const { sections, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");

  const handleSelect = (categoryKey: string) => {
    // Navigate or drill down into the selected category
    console.log("Selected category:", categoryKey);
  };

  if (registryLoading || genderLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const orderedSections = sectionOrder
    .filter((key) => sections[key] && sections[key].length > 0)
    .map((key) => ({
      key,
      label: sectionLabels[key] ?? key,
      items: sections[key].map((cat) => ({
        id: cat.key,
        label: cat.label,
        image: cat.image,
      })),
    }));

  return (
    <div className="h-full overflow-y-auto pb-12">
      {orderedSections.map((section) => (
        <div key={section.key} className="mt-8 first:mt-4">
          <h2 className="section-header px-4 md:px-8 mb-4">{section.label}</h2>
          <GoTwoCoverFlow items={section.items} onSelect={handleSelect} />
        </div>
      ))}

      {orderedSections.length === 0 && (
        <p className="text-muted-foreground text-center mt-12">No categories found.</p>
      )}
    </div>
  );
};

export default MyGoTwo;
