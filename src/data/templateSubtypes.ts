/**
 * Template subtypes — utility types and gender filtering functions.
 * All category data now lives in the category_registry table.
 * This file only exports types and filter utilities.
 */

import type { SubtypeItem } from "@/components/TemplateCoverFlow";

export interface SubcategoryGroup {
  id: string;
  name: string;
  image: string;
  products: SubtypeItem[];
  gender?: string[];
}

/** Filter subtypes by gender — removes items gated to other genders */
export function filterSubtypesByGender(
  items: SubtypeItem[],
  gender: string,
): SubtypeItem[] {
  return items.filter((item) => !item.gender || item.gender.includes(gender));
}

/** Filter subcategory groups by gender */
export function filterSubcategoriesByGender(
  groups: SubcategoryGroup[],
  gender: string,
): SubcategoryGroup[] {
  return groups.filter((g) => !g.gender || g.gender.includes(gender));
}
