import {
  mergeDescriptorKeywords,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  type RecommendationIntent,
} from "./recommendationCatalog.ts";
import {
  buildRecommendationCategorySupport,
  type NormalizedRecommendationState,
  type RecommendationCategory,
  type RecommendationCategorySupport,
} from "./recommendationSignals.ts";

const CATEGORY_ORDER: RecommendationCategory[] = ["clothes", "food", "tech", "home"];
const MAX_TARGET = 4;
type RecommendationCategoryPlan = {
  category: RecommendationCategory;
  state: RecommendationCategorySupport["state"];
  score: number;
  totalTarget: number;
  aiTarget: number;
};

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
};

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
};

const normalizeCategory = (value: unknown): RecommendationCategory | null => {
  const text = cleanText(value).toLowerCase();
  return CATEGORY_ORDER.includes(text as RecommendationCategory) ? (text as RecommendationCategory) : null;
};

export const buildRecommendationCategoryPlan = (
  state: NormalizedRecommendationState,
  targetCount: number,
  options: { popularOnly?: boolean } = {},
) => {
  const clamped = Math.max(1, Math.min(MAX_TARGET, targetCount));
  const popularOnly = Boolean(options.popularOnly);
  const support = buildRecommendationCategorySupport(state)
    .slice()
    .sort((a, b) => b.score - a.score || CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));

  const plans = new Map<RecommendationCategory, RecommendationCategoryPlan>(
    CATEGORY_ORDER.map((category) => [
      category,
      { category, state: "locked", score: 0, totalTarget: 0, aiTarget: 0 },
    ]),
  );

  for (const entry of support) {
    plans.set(entry.category, {
      category: entry.category,
      state: entry.state,
      score: entry.score,
      totalTarget:
        entry.state === "strong" ? 1 :
        entry.state === "qualified" ? 1 :
        entry.state === "emerging" ? 0 :
        0,
      aiTarget:
        popularOnly ? 0 :
        entry.state === "strong" ? 1 :
        entry.state === "qualified" ? 1 :
        0,
    });
  }

  const orderedPlans = CATEGORY_ORDER.map((category) => plans.get(category)!);
  let assigned = orderedPlans.reduce((sum, plan) => sum + plan.totalTarget, 0);

  if (assigned === 0) {
    for (const plan of orderedPlans.slice(0, Math.min(clamped, CATEGORY_ORDER.length))) {
      plan.totalTarget = 1;
    }
    assigned = orderedPlans.reduce((sum, plan) => sum + plan.totalTarget, 0);
  }

  const expansionOrder = [
    ...support.map((entry) => plans.get(entry.category)!),
    ...orderedPlans.filter((plan) => !support.some((entry) => entry.category === plan.category)),
  ];
  while (assigned < clamped) {
    let progressed = false;
    for (const plan of expansionOrder) {
      const cap =
        plan.state === "strong" ? 2 :
        plan.state === "qualified" ? 1 :
        1;
      if (plan.totalTarget >= cap) continue;
      plan.totalTarget += 1;
      if (!popularOnly && plan.aiTarget < Math.min(plan.totalTarget, cap) && plan.state === "strong") {
        plan.aiTarget += 1;
      }
      assigned += 1;
      progressed = true;
      if (assigned >= clamped) break;
    }
    if (!progressed) break;
  }

  return orderedPlans;
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

const buildPositiveKeywordSet = (state: NormalizedRecommendationState) =>
  new Set(mergeRecommendationKeywords([
    ...state.positiveKeywords,
    ...state.likes.flatMap((row) => [
      row.primary_keyword,
      ...(row.descriptor_keywords ?? []),
      row.brand,
      row.notes,
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

const getFallbackBrandForCategory = (state: NormalizedRecommendationState, category: RecommendationCategory) => {
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
): RecommendationIntent => {
  const brand = getFallbackBrandForCategory(state, category) || seed.brand;
  const descriptors = mergePrioritizedDescriptors(
    seed.primary,
    getCategoryPositiveDescriptors(state, category),
    seed.descriptors,
    brand,
  );
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

export const generateFallbackRecommendationIntents = (
  state: NormalizedRecommendationState,
  targetCount = MAX_TARGET,
  options: { popularOnly?: boolean } = {},
): RecommendationIntent[] => {
  const results: RecommendationIntent[] = [];
  const seen = new Set<string>();
  const negativeKeywords = buildNegativeKeywordSet(state);
  const popularOnly = Boolean(options.popularOnly);
  const categoryPlans = buildRecommendationCategoryPlan(state, targetCount, { popularOnly });
  const categoryTargets = new Map(categoryPlans.map((plan) => [plan.category, plan.totalTarget]));

  for (const category of CATEGORY_ORDER) {
    if ((categoryTargets.get(category) ?? 0) === 0) continue;
    const categoryRows = state.productCardKeywords.filter((row) => row.category === category && row.primary_keyword);
    if (!popularOnly) {
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
      const intent = createDefaultIntent(state, category, seed);
      const key = buildIntentKey(intent);
      if (seen.has(key) || intentConflictsWithNegatives(intent, negativeKeywords)) continue;
      seen.add(key);
      results.push(intent);
      if (results.filter((entry) => entry.category === category).length >= (categoryTargets.get(category) ?? 0)) break;
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
