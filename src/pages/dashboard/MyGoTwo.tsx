import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useCategoryRegistry, type CategoryItem } from "@/hooks/useCategoryRegistry";
import GoTwoCoverFlow from "@/components/GoTwoCoverFlow";
import TemplateCoverFlow, { type SubtypeItem, type SubcategoryGroup } from "@/components/TemplateCoverFlow";

const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

const sectionOrder = ["style-fit", "food-drink", "gifts-wishlist", "home-living", "entertainment"];

interface CoverFlowState {
  name: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
}

const MyGoTwo = () => {
  const { user } = useAuth();
  const { gender, loading: genderLoading } = usePersonalization();
  const navigate = useNavigate();
  const { sections, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");
  const [coverFlowState, setCoverFlowState] = useState<CoverFlowState | null>(null);

  const handleSelect = (categoryKey: string) => {
    // Find the category item across all sections
    for (const sectionKey of sectionOrder) {
      const items = sections[sectionKey] || [];
      const item = items.find((c) => c.key === categoryKey);
      if (item) {
        handleCategoryClick(item);
        return;
      }
    }
  };

  const handleCategoryClick = (item: CategoryItem) => {
    const subtypes = (item.fields as unknown as SubtypeItem[]) || [];
    const subcategories = item.subcategories as unknown as SubcategoryGroup[] | undefined;

    if (subtypes.length > 0 || (subcategories && subcategories.length > 0)) {
      setCoverFlowState({ name: item.label, subtypes, subcategories });
    }
  };

  const handleSubtypeSelect = (subtype: SubtypeItem, subcategoryName?: string) => {
    // TODO: navigate to field fill-out view
    console.log("Selected subtype:", subtype.name, subcategoryName);
    setCoverFlowState(null);
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
    <AnimatePresence mode="wait">
      {coverFlowState ? (
        <TemplateCoverFlow
          key="drilldown"
          templateName={coverFlowState.name}
          subtypes={coverFlowState.subtypes}
          subcategories={coverFlowState.subcategories}
          onBack={() => setCoverFlowState(null)}
          onSelect={handleSubtypeSelect}
          creating={false}
          gender={gender}
        />
      ) : (
        <div key="main" className="h-full overflow-y-auto pb-12">
          <p
            className="px-4 md:px-8 pt-2 pb-1 text-sm"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--swatch-teal)",
              fontStyle: "italic",
            }}
          >
            Everything about you, in one place.
          </p>
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
      )}
    </AnimatePresence>
  );
};

export default MyGoTwo;
