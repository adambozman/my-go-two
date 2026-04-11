import {
  RECOMMENDATION_CATEGORY_ORDER,
  getRecommendationCategoryMeta,
  type RecommendationCategory,
} from "../../../src/lib/recommendationCategories.ts";

export type RecommendationDecisionCategory = RecommendationCategory;

export type RecommendationDecisionCategorySupport = {
  category: RecommendationDecisionCategory;
  primaryEvidenceCount: number;
  derivedSupportCount: number;
  negativeSignalCount: number;
  score: number;
  state: "locked" | "emerging" | "qualified" | "strong";
  eligible: boolean;
};

export type RecommendationDecisionCategoryPlan = {
  category: RecommendationDecisionCategory;
  state: RecommendationDecisionCategorySupport["state"];
  score: number;
  totalTarget: number;
  aiTarget: number;
};

export type RecommendationDecisionHierarchy = {
  targetCount: number;
  mode: "popular-fallback" | "signal-hybrid";
  aiTargetCount: number;
  categories: RecommendationDecisionCategoryPlan[];
};

export const BASELINE_RECOMMENDATION_COUNT = 4;
const CATEGORY_ORDER: RecommendationDecisionCategory[] = RECOMMENDATION_CATEGORY_ORDER;

export const buildRecommendationDecisionHierarchy = (
  support: RecommendationDecisionCategorySupport[],
  targetCount = BASELINE_RECOMMENDATION_COUNT,
  options: { popularOnly?: boolean } = {},
): RecommendationDecisionHierarchy => {
  const clamped = Math.max(1, Math.min(BASELINE_RECOMMENDATION_COUNT, targetCount));
  const popularOnly = Boolean(options.popularOnly);
  const rankedSupport = support
    .slice()
    .sort((a, b) =>
      b.score - a.score ||
      (getRecommendationCategoryMeta(a.category)?.baselinePriority ?? 999) -
        (getRecommendationCategoryMeta(b.category)?.baselinePriority ?? 999),
    );

  const planMap = new Map<RecommendationDecisionCategory, RecommendationDecisionCategoryPlan>(
    CATEGORY_ORDER.map((category) => [
      category,
      { category, state: "locked", score: 0, totalTarget: 0, aiTarget: 0 },
    ]),
  );

  for (const entry of rankedSupport) {
    planMap.set(entry.category, {
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

  const orderedPlans = CATEGORY_ORDER.map((category) => planMap.get(category)!);
  let assigned = orderedPlans.reduce((sum, plan) => sum + plan.totalTarget, 0);

  if (assigned === 0) {
    const fallbackPlans = orderedPlans
      .slice()
      .sort((a, b) =>
        (getRecommendationCategoryMeta(a.category)?.baselinePriority ?? 999) -
          (getRecommendationCategoryMeta(b.category)?.baselinePriority ?? 999),
      );
    for (const plan of fallbackPlans.slice(0, Math.min(clamped, fallbackPlans.length))) {
      plan.totalTarget = 1;
    }
    assigned = orderedPlans.reduce((sum, plan) => sum + plan.totalTarget, 0);
  }

  const expansionOrder = [
    ...rankedSupport.map((entry) => planMap.get(entry.category)!),
    ...orderedPlans
      .filter((plan) => !rankedSupport.some((entry) => entry.category === plan.category))
      .sort((a, b) =>
        (getRecommendationCategoryMeta(a.category)?.baselinePriority ?? 999) -
          (getRecommendationCategoryMeta(b.category)?.baselinePriority ?? 999),
      ),
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
      if (!popularOnly && plan.state === "strong" && plan.aiTarget < Math.min(plan.totalTarget, cap)) {
        plan.aiTarget += 1;
      }
      assigned += 1;
      progressed = true;
      if (assigned >= clamped) break;
    }
    if (!progressed) break;
  }

  const aiTargetCount = orderedPlans.reduce((sum, plan) => sum + plan.aiTarget, 0);

  return {
    targetCount: clamped,
    mode: aiTargetCount > 0 ? "signal-hybrid" : "popular-fallback",
    aiTargetCount,
    categories: orderedPlans,
  };
};
