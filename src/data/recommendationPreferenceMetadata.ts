import type { RecommendationCategory } from "@/lib/recommendationCategories";
import type { Gender } from "@/lib/gender";

export type PopularPreferenceProfile = {
  brands: string[];
  styles: string[];
  types: string[];
};

export type SavedProductCardMetadata = {
  key: string;
  category: RecommendationCategory;
  primaryKeyword: string;
  subcategory?: string;
  descriptorSeeds: string[];
  typeKeywords: string[];
  styleKeywords: string[];
  brandFieldMatchers: string[];
  descriptorFieldMatchers: string[];
  negativeFieldMatchers: string[];
};

const categoryProfile = (
  brands: string[],
  styles: string[],
  types: string[],
): PopularPreferenceProfile => ({
  brands,
  styles,
  types,
});

export const POPULAR_PREFERENCE_BANK: Record<Gender, Record<RecommendationCategory, PopularPreferenceProfile>> = {
  male: {
    clothes: categoryProfile(
      ["uniqlo", "buck mason", "j crew", "todd snyder", "new balance", "nike"],
      ["tailored", "minimal", "rugged", "sporty", "preppy", "elevated casual"],
      ["overshirts", "sneakers", "tees", "knits", "chinos", "jackets"],
    ),
    food: categoryProfile(
      ["sweetgreen", "blue bottle", "whole foods", "erewhon", "starbucks", "shake shack"],
      ["high-protein", "coffee-forward", "comfort food", "clean eating", "weeknight takeout"],
      ["coffee orders", "meal bowls", "sushi", "burgers", "groceries", "restaurant picks"],
    ),
    tech: categoryProfile(
      ["apple", "sony", "anker", "logitech", "bose", "gopro"],
      ["portable", "clean setup", "performance", "travel-ready", "daily carry"],
      ["phones", "headphones", "chargers", "smartwatch", "camera", "desk setup"],
    ),
    home: categoryProfile(
      ["parachute", "our place", "brooklinen", "dyson", "crate and barrel", "west elm"],
      ["warm minimal", "hotel-like", "functional", "clean", "cozy"],
      ["bedding", "cookware", "lighting", "bath", "decor", "cleaning gear"],
    ),
    personal: categoryProfile(
      ["cerave", "kiehl's", "aesop", "philips sonicare", "necessaire", "the ordinary"],
      ["fresh", "clean", "groomed", "low-maintenance", "skin-first"],
      ["skincare", "grooming", "fragrance", "oral care", "body care", "wellness"],
    ),
    gifts: categoryProfile(
      ["uncommon goods", "etsy", "urbanstems", "sugarfina", "mejuri", "lego"],
      ["thoughtful", "useful", "experience-led", "personal", "elevated"],
      ["gift sets", "flowers", "accessories", "experiences", "books", "gadgets"],
    ),
    entertainment: categoryProfile(
      ["spotify", "a24", "barnes and noble", "lego", "criterion", "nintendo"],
      ["cozy", "creative", "immersive", "collector", "weekend-ready"],
      ["books", "vinyl", "games", "movies", "puzzles", "concert picks"],
    ),
    travel: categoryProfile(
      ["away", "patagonia", "bellroy", "calpak", "rei", "cabeau"],
      ["practical", "outdoorsy", "carry-on", "weekend trip", "organized"],
      ["luggage", "backpacks", "travel accessories", "outerwear", "hotel picks", "getaways"],
    ),
  },
  female: {
    clothes: categoryProfile(
      ["aritzia", "reformation", "sezane", "madewell", "free people", "adidas"],
      ["polished", "romantic", "minimal", "soft tailoring", "trend-aware", "feminine"],
      ["tops", "dresses", "sneakers", "denim", "knitwear", "bags"],
    ),
    food: categoryProfile(
      ["sweetgreen", "blue bottle", "whole foods", "starbucks", "joe and the juice", "trader joe's"],
      ["coffee-forward", "fresh", "dinner-out", "brunch", "clean eating", "comfort food"],
      ["coffee orders", "restaurant picks", "sushi", "pasta", "groceries", "treats"],
    ),
    tech: categoryProfile(
      ["apple", "sony", "anker", "kindle", "dyson", "logitech"],
      ["clean", "daily-use", "travel-ready", "well-designed", "creative"],
      ["phones", "headphones", "chargers", "kindles", "hair tools", "desk setup"],
    ),
    home: categoryProfile(
      ["parachute", "brooklinen", "our place", "anthropologie", "west elm", "voluspa"],
      ["cozy", "elevated", "hotel-like", "soft", "warm minimal"],
      ["bedding", "candles", "cookware", "bath", "decor", "serving pieces"],
    ),
    personal: categoryProfile(
      ["mejuri", "glossier", "sephora", "sol de janeiro", "cerave", "the ordinary"],
      ["fresh", "glowy", "clean", "skin-first", "soft luxury"],
      ["fragrance", "jewelry", "skincare", "body care", "makeup", "wellness"],
    ),
    gifts: categoryProfile(
      ["mejuri", "urbanstems", "uncommon goods", "etsy", "lunya", "sugarfina"],
      ["thoughtful", "romantic", "useful", "beautiful", "personal"],
      ["jewelry", "flowers", "sleepwear", "gift sets", "experiences", "home treats"],
    ),
    entertainment: categoryProfile(
      ["spotify", "barnes and noble", "a24", "criterion", "lego", "masterclass"],
      ["cozy", "romantic", "creative", "slow weekend", "curated"],
      ["books", "vinyl", "movies", "games", "classes", "shows"],
    ),
    travel: categoryProfile(
      ["away", "calpak", "baggu", "paravel", "cabeau", "beis"],
      ["organized", "carry-on", "city break", "relaxed luxury", "weekend-ready"],
      ["luggage", "weekender bags", "packing cubes", "travel accessories", "getaways", "hotel picks"],
    ),
  },
  "non-binary": {
    clothes: categoryProfile(
      ["uniqlo", "cos", "aritzia", "madewell", "nike", "new balance"],
      ["clean", "androgynous", "relaxed", "creative", "functional", "modern"],
      ["layers", "tops", "sneakers", "jackets", "knitwear", "pants"],
    ),
    food: categoryProfile(
      ["sweetgreen", "blue bottle", "trader joe's", "whole foods", "joe and the juice", "starbucks"],
      ["fresh", "coffee-forward", "vegetarian-friendly", "comfort food", "casual hang"],
      ["coffee orders", "tea orders", "restaurant picks", "groceries", "bowls", "snacks"],
    ),
    tech: categoryProfile(
      ["apple", "sony", "anker", "logitech", "bellroy", "kindle"],
      ["clean", "portable", "useful", "creative", "minimal setup"],
      ["phones", "headphones", "chargers", "bags", "reading tech", "audio gear"],
    ),
    home: categoryProfile(
      ["muji", "our place", "parachute", "west elm", "brooklinen", "voluspa"],
      ["cozy", "clean", "functional", "warm", "minimal"],
      ["decor", "bedding", "cookware", "lighting", "bath", "organization"],
    ),
    personal: categoryProfile(
      ["aesop", "necessaire", "glossier", "the ordinary", "cerave", "philips sonicare"],
      ["fresh", "clean", "skin-first", "low-key", "wellness"],
      ["skincare", "fragrance", "body care", "oral care", "wellness", "jewelry"],
    ),
    gifts: categoryProfile(
      ["etsy", "uncommon goods", "urbanstems", "lego", "sugarfina", "mejuri"],
      ["thoughtful", "practical", "personal", "creative", "experience-led"],
      ["gift sets", "flowers", "games", "accessories", "experiences", "home gifts"],
    ),
    entertainment: categoryProfile(
      ["spotify", "criterion", "barnes and noble", "a24", "nintendo", "masterclass"],
      ["creative", "cozy", "curated", "immersive", "weekend-ready"],
      ["books", "vinyl", "movies", "games", "shows", "classes"],
    ),
    travel: categoryProfile(
      ["away", "baggu", "bellroy", "calpak", "rei", "cabeau"],
      ["organized", "outdoorsy", "city break", "weekend-ready", "functional"],
      ["luggage", "bags", "travel accessories", "layers", "getaways", "packing tools"],
    ),
  },
};

export const SAVED_PRODUCT_CARD_METADATA: Record<string, SavedProductCardMetadata> = {
  "brand-preferences": {
    key: "brand-preferences",
    category: "clothes",
    primaryKeyword: "brand preference",
    subcategory: "favorite brands",
    descriptorSeeds: ["brand affinity", "closet staples", "favorite labels"],
    typeKeywords: ["brands", "stores", "retailers"],
    styleKeywords: ["everyday staples", "signature style"],
    brandFieldMatchers: ["brand", "brands", "store", "stores", "retailer", "retailers"],
    descriptorFieldMatchers: ["notes", "style", "vibe", "fit", "silhouette"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "birthday-preferences": {
    key: "birthday-preferences",
    category: "gifts",
    primaryKeyword: "birthday gift",
    subcategory: "birthday preferences",
    descriptorSeeds: ["birthday gifts", "celebration style", "gift energy"],
    typeKeywords: ["gifts", "experiences", "plans"],
    styleKeywords: ["thoughtful", "useful", "celebratory"],
    brandFieldMatchers: ["brand", "brands", "store", "stores"],
    descriptorFieldMatchers: ["best_gift_energy", "perfect_plan", "notes", "plan", "energy"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "clothing-tops": {
    key: "clothing-tops",
    category: "clothes",
    primaryKeyword: "tops",
    subcategory: "tops",
    descriptorSeeds: ["tops", "closet staples", "favorite silhouettes"],
    typeKeywords: ["tops", "tanks", "knits", "cardigans"],
    styleKeywords: ["polished", "layered", "fitted", "everyday"],
    brandFieldMatchers: ["brand", "brands", "label", "store"],
    descriptorFieldMatchers: ["favorite_silhouettes", "silhouette", "material", "fabric", "color", "colors", "notes"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "coffee-order": {
    key: "coffee-order",
    category: "food",
    primaryKeyword: "coffee",
    subcategory: "coffee order",
    descriptorSeeds: ["coffee order", "beverage ritual", "morning drink"],
    typeKeywords: ["coffee", "latte", "cold brew", "espresso"],
    styleKeywords: ["morning ritual", "cafe", "daily order"],
    brandFieldMatchers: ["brand", "brands", "coffee_shop", "shop", "store"],
    descriptorFieldMatchers: ["drink", "go_two_order", "size", "milk", "sweetness", "favorites", "notes"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "coffee-tea": {
    key: "coffee-tea",
    category: "food",
    primaryKeyword: "tea and coffee",
    subcategory: "beverage preference",
    descriptorSeeds: ["beverage preference", "tea and coffee", "favorite drinks"],
    typeKeywords: ["coffee", "tea", "matcha", "pour-over"],
    styleKeywords: ["cafe", "ritual", "bright", "calm"],
    brandFieldMatchers: ["brand", "brands", "shop", "store"],
    descriptorFieldMatchers: ["favorites", "drink", "order", "notes"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "favorite-meals": {
    key: "favorite-meals",
    category: "food",
    primaryKeyword: "favorite meals",
    subcategory: "meals",
    descriptorSeeds: ["favorite meals", "comfort meals", "go-to dishes"],
    typeKeywords: ["meals", "comfort food", "recipes", "cuisine"],
    styleKeywords: ["comfort", "weeknight", "home cooked", "restaurant-inspired"],
    brandFieldMatchers: ["brand", "brands", "restaurant", "restaurants"],
    descriptorFieldMatchers: ["favorite", "comfort", "dish", "cuisine", "order", "notes"],
    negativeFieldMatchers: ["avoid", "dislike", "allergy", "sensitive", "no_go"],
  },
  "favorite-restaurants": {
    key: "favorite-restaurants",
    category: "food",
    primaryKeyword: "restaurants",
    subcategory: "restaurants",
    descriptorSeeds: ["favorite restaurants", "dining picks", "go-to spots"],
    typeKeywords: ["restaurants", "dining", "cuisine", "orders"],
    styleKeywords: ["date night", "casual favorite", "celebratory dinner"],
    brandFieldMatchers: ["favorite_spots", "favorite_restaurants", "restaurant", "restaurants", "spot", "spots"],
    descriptorFieldMatchers: ["favorite_cuisine", "go_to_order", "dish", "occasion", "notes"],
    negativeFieldMatchers: ["avoid", "dislike", "allergy", "sensitive", "no_go"],
  },
  "grocery-specifics": {
    key: "grocery-specifics",
    category: "food",
    primaryKeyword: "groceries",
    subcategory: "grocery specifics",
    descriptorSeeds: ["grocery staples", "must-have items", "pantry staples"],
    typeKeywords: ["groceries", "staples", "snacks", "produce"],
    styleKeywords: ["weekly staples", "healthy snacks", "fridge basics"],
    brandFieldMatchers: ["brands_i_always_buy", "brand", "brands", "preferred_store", "store", "stores"],
    descriptorFieldMatchers: ["must_have_items", "staples", "snacks", "notes"],
    negativeFieldMatchers: ["avoid", "dislike", "allergy", "sensitive", "no_go"],
  },
  "jewelry-necklaces": {
    key: "jewelry-necklaces",
    category: "personal",
    primaryKeyword: "necklaces",
    subcategory: "jewelry",
    descriptorSeeds: ["jewelry preference", "layered necklaces", "everyday jewelry"],
    typeKeywords: ["necklaces", "chains", "pendants"],
    styleKeywords: ["delicate", "layered", "fine jewelry", "everyday sparkle"],
    brandFieldMatchers: ["brand", "brands", "designer", "store"],
    descriptorFieldMatchers: ["metal", "style", "notes", "stone", "length"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "scent-perfume": {
    key: "scent-perfume",
    category: "personal",
    primaryKeyword: "fragrance",
    subcategory: "scent",
    descriptorSeeds: ["fragrance preference", "signature scent", "daily fragrance"],
    typeKeywords: ["perfume", "body mist", "fragrance"],
    styleKeywords: ["clean", "fresh", "close to skin", "layered scent"],
    brandFieldMatchers: ["brand", "brands", "fragrance_house", "store"],
    descriptorFieldMatchers: ["notes", "intensity", "style", "vibe"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "shoe-sneakers": {
    key: "shoe-sneakers",
    category: "clothes",
    primaryKeyword: "sneakers",
    subcategory: "shoes",
    descriptorSeeds: ["sneakers", "everyday shoes", "footwear preference"],
    typeKeywords: ["sneakers", "trainers", "court shoes"],
    styleKeywords: ["clean", "minimal branding", "everyday", "comfortable"],
    brandFieldMatchers: ["brand", "brands", "label", "store"],
    descriptorFieldMatchers: ["material", "notes", "color", "colors", "fit", "style"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "tech-headphones": {
    key: "tech-headphones",
    category: "tech",
    primaryKeyword: "headphones",
    subcategory: "audio",
    descriptorSeeds: ["audio gear", "headphone preference", "daily listening"],
    typeKeywords: ["headphones", "earbuds", "speakers"],
    styleKeywords: ["portable", "noise-canceling", "daily carry", "clean setup"],
    brandFieldMatchers: ["brand", "brands", "store", "maker"],
    descriptorFieldMatchers: ["device", "devices", "notes", "features", "style"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "tech-phone": {
    key: "tech-phone",
    category: "tech",
    primaryKeyword: "phones and devices",
    subcategory: "tech",
    descriptorSeeds: ["daily tech", "device setup", "phone preference"],
    typeKeywords: ["phones", "earbuds", "tablets", "readers"],
    styleKeywords: ["clean setup", "practical", "daily-use", "simple gear"],
    brandFieldMatchers: ["brand", "brands", "device", "devices", "maker"],
    descriptorFieldMatchers: ["notes", "features", "use_case"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "travel-mountain": {
    key: "travel-mountain",
    category: "travel",
    primaryKeyword: "mountain trip",
    subcategory: "travel",
    descriptorSeeds: ["travel preference", "weekend trip", "mountain getaway"],
    typeKeywords: ["trips", "bags", "layers", "outdoor gear"],
    styleKeywords: ["outdoorsy", "cozy", "active day calm evening", "cabin"],
    brandFieldMatchers: ["brand", "brands", "airline", "hotel", "store"],
    descriptorFieldMatchers: ["ideal_trip", "pace", "notes", "packing", "destination"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
  "wish-list": {
    key: "wish-list",
    category: "gifts",
    primaryKeyword: "wishlist",
    subcategory: "wish list",
    descriptorSeeds: ["wishlist", "most wanted", "gift clues"],
    typeKeywords: ["wishlist items", "gift ideas", "upgrades"],
    styleKeywords: ["most wanted", "useful upgrade", "dream item", "gift-ready"],
    brandFieldMatchers: ["brand", "brands", "store", "stores"],
    descriptorFieldMatchers: ["most_wanted", "price_comfort", "why", "notes"],
    negativeFieldMatchers: ["avoid", "dislike", "no_go"],
  },
};

export function normalizeProductCardFieldKey(value: string | null | undefined) {
  return (value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export function getSavedProductCardMetadata(productCardKey: string | null | undefined) {
  const normalizedKey = (productCardKey ?? "").trim().toLowerCase();
  return SAVED_PRODUCT_CARD_METADATA[normalizedKey] ?? null;
}

export function getPopularPreferenceProfile(
  gender: Gender,
  category: RecommendationCategory | null | undefined,
) {
  if (!category) return null;
  return POPULAR_PREFERENCE_BANK[gender]?.[category] ?? null;
}
