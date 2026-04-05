import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";

export interface CoverFlowState {
  name: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
  section: string;
  categoryId: string;
}

export interface SavedProductCard {
  id: string;
  user_id: string;
  product_card_key: string;
  subcategory_label: string;
  card_title: string;
  field_values: Record<string, string>;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface MyGoTwoRootItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
  sourceId: string;
  sectionKey: string;
}

export type MyGoTwoFlowLevel = 1 | 2 | 3 | 4;

export type MyGoTwoFlowItemKind =
  | "category"
  | "subcategory"
  | "product"
  | "saved-product-card"
  | "create-saved-product-card";

export interface MyGoTwoFlowItem extends MyGoTwoRootItem {
  level: MyGoTwoFlowLevel;
  kind: MyGoTwoFlowItemKind;
  parentId?: string;
}

// Codebase classification: runtime My Go Two type contracts.
