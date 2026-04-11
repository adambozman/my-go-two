import {
  mergeDescriptorKeywords,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  type RecommendationIntent,
} from "./recommendationCatalog.ts";
import {
  buildRecommendationCategorySupport,
  type NormalizedRecommendationState,
} from "./recommendationSignals.ts";
import {
  BASELINE_RECOMMENDATION_COUNT,
  buildRecommendationDecisionHierarchy,
  type RecommendationDecisionCategoryPlan,
} from "./recommendationDecisionHierarchy.ts";
import {
  normalizeRecommendationCategoryKey,
  RECOMMENDATION_CATEGORY_ORDER,
  type RecommendationCategory,
} from "../../../src/lib/recommendationCategories.ts";

const CATEGORY_ORDER: RecommendationCategory[] = RECOMMENDATION_CATEGORY_ORDER;
const MAX_TARGET = BASELINE_RECOMMENDATION_COUNT;
type RecommendationCategoryPlan = RecommendationDecisionCategoryPlan;

const CATEGORY_DEFAULTS: Record<RecommendationCategory, Array<{ primary: string; brand: string; descriptors: string[] }>> = {
  clothes: [
    { primary: "jeans", brand: "Levi's", descriptors: ["straight", "blue", "classic denim"] },
    { primary: "sweater", brand: "Uniqlo", descriptors: ["knit", "soft neutral", "everyday"] },
    { primary: "sneakers", brand: "Adidas", descriptors: ["everyday", "clean", "low profile"] },
    { primary: "jacket", brand: "Patagonia", descriptors: ["light layer", "practical", "everyday"] },
  ],
  food: [
    { primary: "coffee", brand: "Starbucks", descriptors: ["morning routine", "popular", "daily"] },
    { primary: "salad", brand: "Sweetgreen", descriptors: ["fresh", "lunch", "popular"] },
    { primary: "sushi", brand: "Nobu", descriptors: ["shared plates", "date night", "popular"] },
    { primary: "pasta", brand: "Eataly", descriptors: ["comfort", "italian", "weekend"] },
  ],
  tech: [
    { primary: "headphones", brand: "Sony", descriptors: ["wireless", "travel", "sound quality"] },
    { primary: "speaker", brand: "JBL", descriptors: ["portable", "popular", "audio"] },
    { primary: "charger", brand: "Anker", descriptors: ["portable", "daily carry", "fast charging"] },
    { primary: "watch", brand: "Apple", descriptors: ["everyday", "popular", "fitness"] },
  ],
  home: [
    { primary: "candle", brand: "Target", descriptors: ["soft scent", "popular", "giftable"] },
    { primary: "lamp", brand: "IKEA", descriptors: ["warm light", "practical", "living room"] },
    { primary: "blanket", brand: "Brooklinen", descriptors: ["cozy", "soft texture", "neutral"] },
    { primary: "rug", brand: "Ruggable", descriptors: ["washable", "patterned", "practical"] },
  ],
  personal: [
    { primary: "moisturizer", brand: "CeraVe", descriptors: ["daily", "popular", "skin barrier"] },
    { primary: "body mist", brand: "Sol de Janeiro", descriptors: ["warm scent", "popular", "everyday"] },
    { primary: "serum", brand: "The Ordinary", descriptors: ["skincare", "routine", "practical"] },
    { primary: "electric toothbrush", brand: "Philips Sonicare", descriptors: ["wellness", "daily", "personal care"] },
  ],
  gifts: [
    { primary: "gift set", brand: "Uncommon Goods", descriptors: ["thoughtful", "popular", "giftable"] },
    { primary: "flowers", brand: "UrbanStems", descriptors: ["occasion", "delivery", "popular"] },
    { primary: "custom mug", brand: "Etsy", descriptors: ["personalized", "thoughtful", "gift"] },
    { primary: "candy box", brand: "Sugarfina", descriptors: ["sweet", "shareable", "giftable"] },
  ],
  entertainment: [
    { primary: "board game", brand: "Target", descriptors: ["popular", "group night", "fun"] },
    { primary: "book", brand: "Barnes & Noble", descriptors: ["popular", "cozy", "weekend"] },
    { primary: "vinyl", brand: "Urban Outfitters", descriptors: ["music", "collector", "fun"] },
    { primary: "lego set", brand: "LEGO", descriptors: ["creative", "popular", "weekend"] },
  ],
  travel: [
    { primary: "weekender bag", brand: "Away", descriptors: ["carry on", "popular", "travel"] },
    { primary: "packing cubes", brand: "Baggu", descriptors: ["organized", "travel", "practical"] },
    { primary: "travel organizer", brand: "Calpak", descriptors: ["portable", "popular", "trip ready"] },
    { primary: "neck pillow", brand: "Cabeau", descriptors: ["flight", "comfort", "travel"] },
  ],
};

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
};

const normalizeCategory = (value: unknown): RecommendationCategory | null => {
  return normalizeRecommendationCategoryKey(value);
};

export const buildRecommendationCategoryPlan = (
  state: NormalizedRecommendationState,
  targetCount: number,
  options: { popularOnly?: boolean } = {},
) => {
  const support = buildRecommendationCategorySupport(state);
  return buildRecommendationDecisionHierarchy(support, targetCount, options).categories;
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
    ]),
  ]));

const getPersonalizedCategories = (
  state: NormalizedRecommendationState,
  targetCount: number,
  options: { popularOnly?: boolean } = {},
) => {
  const plans = buildRecommendationCategoryPlan(state, targetCount, options);
  return new Set(
    plans
      .filter((plan) => !options.popularOnly && plan.aiTarget > 0)
      .map((plan) => plan.category),
  );
};

const buildPositiveKeywordSet = (state: NormalizedRecommendationState) =>
  new Set(mergeRecommendationKeywords([
    ...state.positiveKeywords,
    ...state.likes.flatMap((row) => [
      row.primary_keyword,
      ...(row.descriptor_keywords ?? []),
      row.brand,
    ]),
  ]));

const getCategoryLikeBrands = (state: NormalizedRecommendationState, category: RecommendationCategory) =>
  Array.from(new Set(
    state.likes
      .filter((row) => row.category === category && row.brand)
      .map((row) => cleanText(row.brand).toLowerCase())
      .filter(Boolean),
  ));

const getCategoryPositiveDescriptors = (state: NormalizedRecommendationState, category: RecommendationCategory) =>
  mergeRecommendationKeywords([
    ...state.likes
      .filter((row) => row.category === category)
      .flatMap((row) => row.descriptor_keywords ?? []),
    ...state.productCardKeywords
      .filter((row) => row.category === category)
      .flatMap((row) => row.descriptor_keywords.slice(0, 3)),
  ]);

const mergePrioritizedDescriptors = (
  primaryKeyword: string | null,
  preferred: string[],
  seed: string[],
  brand: string,
) => {
  const normalizedPrimary = normalizePrimaryKeyword(primaryKeyword);
  const preferredSet = new Set(mergeRecommendationKeywords(preferred));
  const merged = mergeDescriptorKeywords(normalizedPrimary, preferred, seed, [brand]);
  const preferredDescriptors = merged.filter((descriptor) => preferredSet.has(descriptor));
  const otherDescriptors = merged.filter((descriptor) => !preferredSet.has(descriptor));
  return [...preferredDescriptors, ...otherDescriptors].slice(0, 5);
};

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
  const categoryLikeBrand = getCategoryLikeBrands(state, category)[0];
  const brand = categoryLikeBrand || row.brand_keywords[0] || state.recommendedBrands[0] || CATEGORY_DEFAULTS[category][0]?.brand || "Madewell";
  const descriptors = mergePrioritizedDescriptors(
    row.primary_keyword,
    getCategoryPositiveDescriptors(state, category),
    row.descriptor_keywords,
    brand,
  );
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

const getFallbackBrandForCategory = (
  state: NormalizedRecommendationState,
  category: RecommendationCategory,
  personalized: boolean,
) => {
  if (!personalized) return CATEGORY_DEFAULTS[category][0]?.brand || "Target";
  const likedBrand = getCategoryLikeBrands(state, category)[0];
  if (likedBrand) return likedBrand;
  const categoryBrand = state.brandBankRows
    .filter((row) => row.category === category)
    .sort((a, b) => b.weight - a.weight)[0]?.brand;
  if (categoryBrand) return categoryBrand;
  return state.recommendedBrands[0] || CATEGORY_DEFAULTS[category][0]?.brand || "Madewell";
};

const scoreDefaultSeed = (
  state: NormalizedRecommendationState,
  category: RecommendationCategory,
  seed: { primary: string; brand: string; descriptors: string[] },
) => {
  const positiveKeywords = buildPositiveKeywordSet(state);
  const haystack = mergeRecommendationKeywords([seed.primary, seed.brand, ...seed.descriptors]);
  let score = 0;
  for (const keyword of haystack) {
    if (positiveKeywords.has(keyword)) score += 10;
  }
  if (getCategoryLikeBrands(state, category).includes(cleanText(seed.brand).toLowerCase())) score += 20;
  if (state.recommendedBrands.includes(cleanText(seed.brand).toLowerCase())) score += 5;
  return score;
};

const createDefaultIntent = (
  state: NormalizedRecommendationState,
  category: RecommendationCategory,
  seed: { primary: string; brand: string; descriptors: string[] },
  personalized: boolean,
): RecommendationIntent => {
  const brand = getFallbackBrandForCategory(state, category, personalized) || seed.brand;
  const descriptors = mergePrioritizedDescriptors(
    seed.primary,
    personalized ? getCategoryPositiveDescriptors(state, category) : [],
    seed.descriptors,
    brand,
  );
  return {
    brand,
    name: `${seed.primary} recommendation`,
    price: "",
    category,
    hook: personalized
      ? `A ${seed.primary} direction shaped by your profile and category preferences.`
      : `A current popular ${seed.primary} pick while this category is still learning.`,
    why: personalized
      ? "This fills an uncovered category using your strongest saved signals and approved brands."
      : "This stays broad and popular until you add enough signals in this category.",
    recommendation_kind: "generic",
    search_query: `${brand} ${seed.primary} ${descriptors.slice(0, 2).join(" ")}`.trim(),
    primary_keyword: seed.primary,
    keywords: descriptors,
  };
};

export const generateFallbackRecommendationIntents = (
  state: NormalizedRecommendationState,
  targetCount = MAX_TARGET,
  options: { popularOnly?: boolean } = {},
): RecommendationIntent[] => {
  const results: RecommendationIntent[] = [];
  const seen = new Set<string>();
  const negativeKeywords = buildNegativeKeywordSet(state);
  const popularOnly = Boolean(options.popularOnly);
  const personalizedCategories = getPersonalizedCategories(state, targetCount, options);
  const categoryPlans = buildRecommendationCategoryPlan(state, targetCount, { popularOnly });
  const categoryTargets = new Map(categoryPlans.map((plan) => [plan.category, plan.totalTarget]));

  for (const category of CATEGORY_ORDER) {
    if ((categoryTargets.get(category) ?? 0) === 0) continue;
    const allowPersonalization = personalizedCategories.has(category);
    const categoryRows = state.productCardKeywords.filter((row) => row.category === category && row.primary_keyword);
    if (allowPersonalization) {
      for (const row of categoryRows) {
        const intent = toCardDrivenIntent(state, category, row);
        const key = buildIntentKey(intent);
        if (seen.has(key) || intentConflictsWithNegatives(intent, negativeKeywords)) continue;
        seen.add(key);
        results.push(intent);
        if (results.filter((entry) => entry.category === category).length >= (categoryTargets.get(category) ?? 0)) break;
      }
    }

    if (results.filter((entry) => entry.category === category).length >= (categoryTargets.get(category) ?? 0)) continue;

    const rankedSeeds = CATEGORY_DEFAULTS[category]
      .slice()
      .sort((a, b) => scoreDefaultSeed(state, category, b) - scoreDefaultSeed(state, category, a));

    for (const seed of rankedSeeds) {
      const intent = createDefaultIntent(state, category, seed, allowPersonalization);
      const key = buildIntentKey(intent);
      if (seen.has(key) || intentConflictsWithNegatives(intent, negativeKeywords)) continue;
      seen.add(key);
      results.push(intent);
      if (results.filter((entry) => entry.category === category).length >= (categoryTargets.get(category) ?? 0)) break;
    }
  }

  if (results.length < targetCount) {
    const recoveryCategories = CATEGORY_ORDER
      .slice()
      .sort((a, b) => {
        const aCount = results.filter((entry) => entry.category === a).length;
        const bCount = results.filter((entry) => entry.category === b).length;
        return aCount - bCount || CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b);
      });

    for (const category of recoveryCategories) {
      const allowPersonalization = personalizedCategories.has(category);
      const rankedSeeds = CATEGORY_DEFAULTS[category]
        .slice()
        .sort((a, b) => scoreDefaultSeed(state, category, b) - scoreDefaultSeed(state, category, a));

      for (const seed of rankedSeeds) {
        const intent = createDefaultIntent(state, category, seed, allowPersonalization);
        const key = buildIntentKey(intent);
        if (seen.has(key) || intentConflictsWithNegatives(intent, negativeKeywords)) continue;
        seen.add(key);
        results.push(intent);
        if (results.length >= targetCount) {
          return results.slice(0, targetCount);
        }
      }
    }
  }

  return results.slice(0, targetCount);
};

export const completeRecommendationIntentSet = (
  state: NormalizedRecommendationState,
  intents: RecommendationIntent[],
  targetCount = MAX_TARGET,
): RecommendationIntent[] => {
  const negativeKeywords = buildNegativeKeywordSet(state);
  const categoryCounts = new Map<RecommendationCategory, number>(CATEGORY_ORDER.map((category) => [category, 0]));
  const categoryPlans = buildRecommendationCategoryPlan(state, targetCount);
  const aiTargets = new Map(categoryPlans.map((plan) => [plan.category, plan.aiTarget]));
  const totalTargets = new Map(categoryPlans.map((plan) => [plan.category, plan.totalTarget]));
  const results: RecommendationIntent[] = [];
  const seen = new Set<string>();

  for (const intent of intents) {
    const category = normalizeCategory(intent.category);
    if (!category) continue;
    const key = buildIntentKey(intent);
    if (seen.has(key)) continue;
    if ((categoryCounts.get(category) ?? 0) >= (aiTargets.get(category) ?? 0)) continue;
    if (intentConflictsWithNegatives(intent, negativeKeywords)) continue;
    seen.add(key);
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
    results.push({ ...intent, category });
    if (results.length >= targetCount) return results;
  }

  const fallback = generateFallbackRecommendationIntents(state, targetCount);
  for (const intent of fallback) {
    const category = normalizeCategory(intent.category);
    if (!category) continue;
    const key = buildIntentKey(intent);
    if (seen.has(key)) continue;
    if ((categoryCounts.get(category) ?? 0) >= (totalTargets.get(category) ?? 0)) continue;
    if (intentConflictsWithNegatives(intent, negativeKeywords)) continue;
    seen.add(key);
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
    results.push(intent);
    if (results.length >= targetCount) break;
  }

  return results.slice(0, targetCount);
};
