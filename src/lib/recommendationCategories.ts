export const RECOMMENDATION_CATEGORY_KEYS = [
  "clothes",
  "food",
  "tech",
  "home",
  "personal",
  "gifts",
  "entertainment",
  "travel",
] as const;

export type RecommendationCategory = (typeof RECOMMENDATION_CATEGORY_KEYS)[number];

export type RecommendationCategoryMeta = {
  key: RecommendationCategory;
  label: string;
  filterLabel: string;
  baselinePriority: number;
};

export const RECOMMENDATION_CATEGORY_REGISTRY: RecommendationCategoryMeta[] = [
  { key: "clothes", label: "Style & Fit", filterLabel: "Style & Fit", baselinePriority: 1 },
  { key: "food", label: "Food & Drink", filterLabel: "Food & Drink", baselinePriority: 2 },
  { key: "tech", label: "Tech & Gear", filterLabel: "Tech & Gear", baselinePriority: 3 },
  { key: "home", label: "Home & Living", filterLabel: "Home & Living", baselinePriority: 4 },
  { key: "personal", label: "Personal Care", filterLabel: "Personal Care", baselinePriority: 5 },
  { key: "gifts", label: "Gifts", filterLabel: "Gifts", baselinePriority: 6 },
  { key: "entertainment", label: "Entertainment", filterLabel: "Entertainment", baselinePriority: 7 },
  { key: "travel", label: "Travel", filterLabel: "Travel", baselinePriority: 8 },
] as const;

export const RECOMMENDATION_CATEGORY_ORDER: RecommendationCategory[] =
  RECOMMENDATION_CATEGORY_REGISTRY.map((entry) => entry.key);

export const RECOMMENDATION_CATEGORY_ALIAS_MAP: Record<string, RecommendationCategory> = {
  clothes: "clothes",
  clothing: "clothes",
  apparel: "clothes",
  fashion: "clothes",
  style: "clothes",
  wardrobe: "clothes",
  "style & aesthetic": "clothes",
  "brands & shopping": "clothes",
  "colors & palette": "clothes",
  "style lens": "clothes",
  "brand signals": "clothes",
  "color read": "clothes",
  "style-fit": "clothes",
  "style-aesthetic": "clothes",
  "brands-shopping": "clothes",
  "colors-palette": "clothes",

  food: "food",
  dining: "food",
  restaurant: "food",
  restaurants: "food",
  beverage: "food",
  beverages: "food",
  drink: "food",
  drinks: "food",
  cuisine: "food",
  "food & dining": "food",
  "taste cues": "food",
  "your go-to orders": "food",
  "food-dining": "food",
  "food-drink": "food",
  "food-orders": "food",
  "go-to-orders": "food",

  tech: "tech",
  technology: "tech",
  electronics: "tech",
  gadgets: "tech",
  gear: "tech",

  home: "home",
  household: "home",
  decor: "home",
  living: "home",
  housing: "home",
  kitchen: "home",
  "home & living": "home",
  "home feel": "home",
  "home-living": "home",

  personal: "personal",
  health: "personal",
  wellness: "personal",
  beauty: "personal",
  skincare: "personal",
  grooming: "personal",
  fragrance: "personal",
  selfcare: "personal",
  "self-care": "personal",
  "personal-care": "personal",
  "lifestyle lens": "personal",
  "personal care": "personal",

  gifts: "gifts",
  gift: "gifts",
  gifting: "gifts",
  wishlist: "gifts",
  "gifting — what you actually want": "gifts",
  "gifting - what you actually want": "gifts",
  "gift instinct": "gifts",
  "gift-instinct": "gifts",
  "gift-ideas": "gifts",

  entertainment: "entertainment",
  fun: "entertainment",
  hobbies: "entertainment",
  hobby: "entertainment",
  weekend: "entertainment",
  gaming: "entertainment",
  music: "entertainment",
  movies: "entertainment",
  books: "entertainment",
  streaming: "entertainment",
  romance: "entertainment",
  relationships: "entertainment",
  "date ideas & romance": "entertainment",
  "love language & relationships": "entertainment",
  "connection read": "entertainment",
  "weekend rhythm": "entertainment",
  "hobbies-weekend": "entertainment",
  "date-ideas-romance": "entertainment",
  "love-language-relationships": "entertainment",

  travel: "travel",
  trips: "travel",
  vacation: "travel",
  getaway: "travel",
  places: "travel",
  hotel: "travel",
  hotels: "travel",
  airline: "travel",
  flight: "travel",
  flights: "travel",
  "travel & trips": "travel",
  "travel mood": "travel",
  "travel-mood": "travel",
  "travel-trips": "travel",
};

export const normalizeRecommendationCategoryKey = (value: unknown): RecommendationCategory | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  return RECOMMENDATION_CATEGORY_ALIAS_MAP[normalized] ?? null;
};

export const getRecommendationCategoryMeta = (category: RecommendationCategory) =>
  RECOMMENDATION_CATEGORY_REGISTRY.find((entry) => entry.key === category) ?? null;
