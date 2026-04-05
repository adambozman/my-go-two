/**
 * Template subtypes — utility types and legacy compatibility helpers.
 * All category data now lives in the category_registry table.
 * Runtime gender gating has been retired, so the helpers now return the full input.
 */

export interface SubtypeItem {
  id: string;
  name: string;
  image: string;
  gender?: string[];
  fields: { label: string; type: "text" | "select"; value: string; options?: string[] }[];
}

export interface SubcategoryGroup {
  id: string;
  name: string;
  image: string;
  products: SubtypeItem[];
  gender?: string[];
}

/** Runtime gender gating is retired; preserve the full subtype list. */
export function filterSubtypesByGender(
  items: SubtypeItem[],
  _gender: string,
): SubtypeItem[] {
  return items;
}

/** Runtime gender gating is retired; preserve the full subcategory list. */
export function filterSubcategoriesByGender(
  groups: SubcategoryGroup[],
  _gender: string,
): SubcategoryGroup[] {
  return groups;
}
// Codebase classification: runtime legacy compatibility utilities for template metadata.
