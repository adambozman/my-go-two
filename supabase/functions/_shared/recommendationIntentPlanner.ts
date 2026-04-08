import {
  mergeDescriptorKeywords,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  type RecommendationIntent,
} from "./knowMeCatalog.ts";
import type { NormalizedRecommendationState, RecommendationCategory } from "./recommendationSignals.ts";

const CATEGORY_ORDER: RecommendationCategory[] = ["clothes", "food", "tech", "home"];
const CATEGORY_TARGET = 3;
const TOTAL_TARGET = CATEGORY_ORDER.length * CATEGORY_TARGET;

const CATEGORY_DEFAULTS: Record<RecommendationCategory, Array<{ primary: string; brand: string; descriptors: string[] }>> = {
  clothes: [
    { primary: "jeans", brand: "Madewell", descriptors: ["straight", "blue", "classic denim"] },
    { primary: "sweater", brand: "Sezane", descriptors: ["knit", "soft neutral", "elevated"] },
    { primary: "sneakers", brand: "Adidas", descriptors: ["everyday", "clean", "low profile"] },
    { primary: "jacket", brand: "Aritzia", descriptors: ["tailored", "light layer", "polished"] },
  ],
  food: [
    { primary: "coffee", brand: "Blue Bottle", descriptors: ["oat milk", "vanilla", "morning routine"] },
    { primary: "sushi", brand: "Nobu", descriptors: ["date night", "refined", "shared plates"] },
    { primary: "pasta", brand: "Eataly", descriptors: ["italian", "comfort", "quality ingredients"] },
    { primary: "tea", brand: "Harney & Sons", descriptors: ["calming", "daily ritual", "premium"] },
  ],
  tech: [
    { primary: "headphones", brand: "Sony", descriptors: ["wireless", "travel", "sound quality"] },
    { primary: "speaker", brand: "Sonos", descriptors: ["home audio", "clean design", "premium"] },
    { primary: "charger", brand: "Anker", descriptors: ["portable", "daily carry", "fast charging"] },
    { primary: "camera", brand: "Canon", descriptors: ["travel", "content", "lightweight"] },
  ],
  home: [
    { primary: "candle", brand: "Diptyque", descriptors: ["soft scent", "elevated", "giftable"] },
    { primary: "lamp", brand: "West Elm", descriptors: ["warm light", "modern", "living room"] },
    { primary: "blanket", brand: "Brooklinen", descriptors: ["cozy", "soft texture", "neutral"] },
    { primary: "rug", brand: "Ruggable", descriptors: ["washable", "patterned", "practical"] },
  ],
};

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
};

const normalizeCategory = (value: unknown): RecommendationCategory | null => {
  const text = cleanText(value).toLowerCase();
  return CATEGORY_ORDER.includes(text as RecommendationCategory) ? (text as RecommendationCategory) : null;
};

const buildIntentKey = (intent: RecommendationIntent) => [
  intent.category,
  normalizePrimaryKeyword(intent.primary_keyword ?? intent.name) ?? "",
  cleanText(intent.brand).toLowerCase(),
  cleanText(intent.name).toLowerCase(),
].join("::");

const buildNegativeKeywordSet = (state: NormalizedRecommendationState) =>
  new Set(mergeRecommendationKeywords([
    ...state.negativeKeywords,
    ...state.dislikes.flatMap((row) => [
      row.primary_keyword,
      ...(row.descriptor_keywords ?? []),
      row.brand,
      row.notes,
    ]),
  ]));

const intentConflictsWithNegatives = (intent: RecommendationIntent, negativeKeywords: Set<string>) => {
  const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name);
  const descriptors = mergeDescriptorKeywords(primaryKeyword, intent.keywords ?? [], [intent.brand, intent.name]);
  const haystack = mergeRecommendationKeywords([primaryKeyword, ...descriptors, intent.brand, intent.name]);
  return haystack.some((keyword) => negativeKeywords.has(keyword));
};

const toCardDrivenIntent = (
  state: NormalizedRecommendationState,
  category: RecommendationCategory,
  row: NormalizedRecommendationState["productCardKeywords"][number],
): RecommendationIntent => {
  const brand = row.brand_keywords[0] || state.recommendedBrands[0] || CATEGORY_DEFAULTS[category][0]?.brand || "Madewell";
  const descriptors = mergeDescriptorKeywords(
    row.primary_keyword,
    row.descriptor_keywords.slice(0, 5),
    [brand],
  ).slice(0, 5);
  return {
    brand,
    name: `${row.primary_keyword} pick`,
    price: "",
    category,
    hook: `Built from your saved ${row.primary_keyword} preferences.`,
    why: "This is based on your saved product cards, profile signals, and preference answers.",
    recommendation_kind: "generic",
    search_query: `${brand} ${row.primary_keyword} ${descriptors.slice(0, 2).join(" ")}`.trim(),
    primary_keyword: row.primary_keyword,
    keywords: descriptors,
  };
};

const getFallbackBrandForCategory = (state: NormalizedRecommendationState, category: RecommendationCategory) => {
  const categoryBrand = state.brandBankRows
    .filter((row) => row.category === category)
    .sort((a, b) => b.weight - a.weight)[0]?.brand;
  if (categoryBrand) return categoryBrand;
  return CATEGORY_DEFAULTS[category][0]?.brand || state.recommendedBrands[0] || "Madewell";
};

const createDefaultIntent = (
  state: NormalizedRecommendationState,
  category: RecommendationCategory,
  seed: { primary: string; brand: string; descriptors: string[] },
): RecommendationIntent => {
  const brand = getFallbackBrandForCategory(state, category) || seed.brand;
  const descriptors = mergeDescriptorKeywords(seed.primary, seed.descriptors, [brand]).slice(0, 5);
  return {
    brand,
    name: `${seed.primary} recommendation`,
    price: "",
    category,
    hook: `A ${seed.primary} direction shaped by your profile and category preferences.`,
    why: "This fills an uncovered category using your strongest saved signals and approved brands.",
    recommendation_kind: "generic",
    search_query: `${brand} ${seed.primary} ${descriptors.slice(0, 2).join(" ")}`.trim(),
    primary_keyword: seed.primary,
    keywords: descriptors,
  };
};

export const generateFallbackRecommendationIntents = (state: NormalizedRecommendationState): RecommendationIntent[] => {
  const results: RecommendationIntent[] = [];
  const seen = new Set<string>();
  const negativeKeywords = buildNegativeKeywordSet(state);

  for (const category of CATEGORY_ORDER) {
    const categoryRows = state.productCardKeywords.filter((row) => row.category === category && row.primary_keyword);
    for (const row of categoryRows) {
      const intent = toCardDrivenIntent(state, category, row);
      const key = buildIntentKey(intent);
      if (seen.has(key) || intentConflictsWithNegatives(intent, negativeKeywords)) continue;
      seen.add(key);
      results.push(intent);
      if (results.filter((entry) => entry.category === category).length >= CATEGORY_TARGET) break;
    }

    if (results.filter((entry) => entry.category === category).length >= CATEGORY_TARGET) continue;

    for (const seed of CATEGORY_DEFAULTS[category]) {
      const intent = createDefaultIntent(state, category, seed);
      const key = buildIntentKey(intent);
      if (seen.has(key) || intentConflictsWithNegatives(intent, negativeKeywords)) continue;
      seen.add(key);
      results.push(intent);
      if (results.filter((entry) => entry.category === category).length >= CATEGORY_TARGET) break;
    }
  }

  return results.slice(0, TOTAL_TARGET);
};

export const completeRecommendationIntentSet = (
  state: NormalizedRecommendationState,
  intents: RecommendationIntent[],
): RecommendationIntent[] => {
  const negativeKeywords = buildNegativeKeywordSet(state);
  const categoryCounts = new Map<RecommendationCategory, number>(CATEGORY_ORDER.map((category) => [category, 0]));
  const results: RecommendationIntent[] = [];
  const seen = new Set<string>();

  for (const intent of intents) {
    const category = normalizeCategory(intent.category);
    if (!category) continue;
    const key = buildIntentKey(intent);
    if (seen.has(key)) continue;
    if ((categoryCounts.get(category) ?? 0) >= CATEGORY_TARGET) continue;
    if (intentConflictsWithNegatives(intent, negativeKeywords)) continue;
    seen.add(key);
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
    results.push({ ...intent, category });
    if (results.length >= TOTAL_TARGET) return results;
  }

  const fallback = generateFallbackRecommendationIntents(state);
  for (const intent of fallback) {
    const category = normalizeCategory(intent.category);
    if (!category) continue;
    const key = buildIntentKey(intent);
    if (seen.has(key)) continue;
    if ((categoryCounts.get(category) ?? 0) >= CATEGORY_TARGET) continue;
    if (intentConflictsWithNegatives(intent, negativeKeywords)) continue;
    seen.add(key);
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
    results.push(intent);
    if (results.length >= TOTAL_TARGET) break;
  }

  return results.slice(0, TOTAL_TARGET);
};

