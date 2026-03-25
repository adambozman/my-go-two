import { useMemo } from "react";
import { useCategoryRegistry } from "@/hooks/useCategoryRegistry";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { buildMyGoTwoSections, buildMyGoTwoWebLevelOneItems } from "@/features/mygotwo/shared";

export function useMyGoTwoCatalogData() {
  const { gender, loading: genderLoading } = usePersonalization();
  const { categories, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");

  const orderedSections = useMemo(() => buildMyGoTwoSections(categories), [categories]);
  const webLevelOneItems = useMemo(() => buildMyGoTwoWebLevelOneItems(orderedSections), [orderedSections]);

  return {
    gender,
    categories,
    orderedSections,
    webLevelOneItems,
    isLoading: registryLoading || genderLoading,
  };
}
