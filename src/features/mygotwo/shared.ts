import type { CategoryItem } from "@/hooks/useCategoryRegistry";
import type { MyGoTwoRootItem } from "@/features/mygotwo/types";

export const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "personal": "Personal",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

export const sectionOrder = ["style-fit", "food-drink", "personal", "gifts-wishlist", "home-living", "entertainment"];

export const BRANDED_CARD_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%232d6870'/%3E%3Cstop offset='100%25' stop-color='%231e4a52'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' rx='24' fill='url(%23g)'/%3E%3C/svg%3E";
export const NEW_ENTRY_ID = "__new_entry__";
export const ENTRY_PAGE_SIZE = 5;

export const normalizeImageValue = (value?: string | null) => {
  if (!value) return "";
  return value.includes("/") ? value : "";
};

export const getNewEntryId = (groupName: string) => `${NEW_ENTRY_ID}::${groupName}`;

export interface MyGoTwoSectionItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
}

export interface MyGoTwoSection {
  key: string;
  label: string;
  items: MyGoTwoSectionItem[];
}

export function buildMyGoTwoSections(categories: CategoryItem[]): MyGoTwoSection[] {
  const sections = categories.reduce<Record<string, CategoryItem[]>>((acc, item) => {
    (acc[item.section] ||= []).push(item);
    return acc;
  }, {});

  const customKeys = Object.keys(sections).filter((key) => !sectionOrder.includes(key));
  const orderedKeys = [...sectionOrder, ...customKeys];

  return orderedKeys.map((key) => ({
    key,
    label: sectionLabels[key] ?? key,
    items: (sections[key] || []).map((cat) => ({
      id: cat.key,
      label: cat.label,
      image: cat.image,
      imageKey: cat.imageKey,
    })),
  }));
}

export function buildMyGoTwoWebLevelOneItems(sections: MyGoTwoSection[]): MyGoTwoRootItem[] {
  return sections.flatMap((section) =>
    section.items.map((item) => ({
      id: `${section.key}::${item.id}`,
      label: item.label,
      image: item.image,
      imageKey: item.imageKey,
      sourceId: item.id,
      sectionKey: section.key,
    })),
  );
}
