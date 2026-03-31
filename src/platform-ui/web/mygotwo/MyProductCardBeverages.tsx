import MyGoTwoProductCard from "@/platform-ui/web/mygotwo/MyGoTwoProductCard";
import type { CardEntry } from "@/features/mygotwo/types";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";

type MyProductCardBeveragesProps = {
  userId: string;
  activeEntry: CardEntry | null;
  onSaved: (entryId?: string) => Promise<void> | void;
  compact?: boolean;
  interactive?: boolean;
};

const BEVERAGES_PRODUCT: SubtypeItem = {
  id: "beverages-featured-product-card",
  name: "Favorite Drink",
  image: "",
  fields: [
    {
      label: "Go-to order",
      type: "text",
      value: "",
    },
    {
      label: "Favorite place",
      type: "text",
      value: "",
    },
    {
      label: "How I take it",
      type: "text",
      value: "",
    },
    {
      label: "Avoid",
      type: "text",
      value: "",
    },
    {
      label: "Notes",
      type: "text",
      value: "",
    },
  ],
};

const BEVERAGES_SUBCATEGORY: SubcategoryGroup = {
  id: "beverages-featured",
  name: "Featured",
  image: "",
  products: [BEVERAGES_PRODUCT],
};

export default function MyProductCardBeverages({
  userId,
  activeEntry,
  onSaved,
  compact = false,
  interactive = true,
}: MyProductCardBeveragesProps) {
  return (
    <MyGoTwoProductCard
      userId={userId}
      categoryLabel="Beverages"
      subcategory={BEVERAGES_SUBCATEGORY}
      product={BEVERAGES_PRODUCT}
      activeEntry={activeEntry}
      onSaved={onSaved}
      compact={compact}
      interactive={interactive}
    />
  );
}
