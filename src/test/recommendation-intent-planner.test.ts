import { describe, expect, it } from "vitest";
import {
  buildNormalizedRecommendationState,
  type UserThisOrThatAnswerRow,
} from "../../supabase/functions/_shared/recommendationSignals";
import {
  buildRecommendationCategoryPlan,
  completeRecommendationIntentSet,
  generateFallbackRecommendationIntents,
} from "../../supabase/functions/_shared/recommendationIntentPlanner";
import type { KnowledgeDerivationRow, KnowledgeSnapshotRow } from "../../supabase/functions/_shared/knowledgeCenter";
import type { RecommendationIntent } from "../../supabase/functions/_shared/recommendationCatalog";
import { buildThisOrThatAnswerRecord, getThisOrThatV2RuntimeQuestions } from "../data/thisOrThatV2";

const snapshot: KnowledgeSnapshotRow = {
  user_id: "planner-user-1",
  profile_core: {
    city: "Chicago",
    state: "Illinois",
  },
  onboarding_responses: {
    "gift-preference": "thoughtful",
    "avoid-brands": ["Shein"],
  },
  know_me_responses: {
    "pet-peeves": "skinny jeans, neon",
  },
  saved_product_cards: [
    {
      id: "card-1",
      product_card_key: "clothing-tops",
      subcategory_label: "Favorite tops",
      card_title: "Silk tanks and fitted knits",
      field_values: {
        Brand: "Aritzia, Sezane",
        Colors: "Ivory, camel",
      },
    },
    {
      id: "card-2",
      product_card_key: "coffee-order",
      subcategory_label: "Coffee order",
      card_title: "Oat milk vanilla latte",
      field_values: {
        Drink: "Vanilla latte",
        Milk: "Oat milk",
      },
    },
  ],
  user_connections: [],
  snapshot_payload: {},
  updated_at: new Date().toISOString(),
};

const derivations: KnowledgeDerivationRow[] = [
  {
    id: "derivation-1",
    user_id: "planner-user-1",
    derivation_key: "your_vibe",
    derivation_payload: {
      recommended_brands: ["Aritzia", "Sezane", "Mejuri"],
      recommended_stores: ["Nordstrom", "Anthropologie"],
    },
    source_snapshot: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

describe("recommendation intent planner", () => {
  it("caps fallback output and only uses the categories the profile actually supports", () => {
    const state = buildNormalizedRecommendationState("planner-user-1", snapshot, derivations);
    const intents = generateFallbackRecommendationIntents(state);

    expect(intents).toHaveLength(4);

    const counts = intents.reduce<Record<string, number>>((acc, intent) => {
      acc[intent.category] = (acc[intent.category] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts.clothes).toBeGreaterThanOrEqual(1);
    expect(counts.food).toBeGreaterThanOrEqual(1);
    expect((counts.tech ?? 0) + (counts.home ?? 0)).toBeGreaterThanOrEqual(1);
    expect(intents.some((intent) => intent.primary_keyword === "jeans")).toBe(false);
    expect(intents.some((intent) => intent.keywords?.includes("skinny"))).toBe(false);
    expect(
      intents.some(
        (intent) =>
          intent.category === "clothes" &&
          intent.why.includes("stays broad and popular"),
      ),
    ).toBe(true);
    expect(intents.some((intent) => intent.category === "clothes" && intent.keywords?.includes("brand"))).toBe(false);
    expect(intents.some((intent) => intent.category === "clothes" && intent.keywords?.includes("and"))).toBe(false);
  });

  it("keeps sparse profiles in a smaller popular fallback mode", () => {
    const sparseState = buildNormalizedRecommendationState("planner-user-2", {
      user_id: "planner-user-2",
      profile_core: {},
      onboarding_responses: {},
      know_me_responses: {},
      saved_product_cards: [],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    }, []);

    const intents = generateFallbackRecommendationIntents(sparseState, 4, { popularOnly: true });

    expect(intents).toHaveLength(4);
    expect(new Set(intents.map((intent) => intent.category)).size).toBe(4);
  });

  it("fills an under-complete ai response back only to the supported lower cap without violating dislikes", () => {
    const state = buildNormalizedRecommendationState("planner-user-1", snapshot, derivations);
    const aiIntents: RecommendationIntent[] = [
      {
        brand: "Aritzia",
        name: "Contour Knit Tank",
        price: "$58",
        category: "clothes",
        hook: "A polished daily top.",
        why: "Built from saved tops preferences.",
        recommendation_kind: "specific",
        search_query: "Aritzia contour knit tank",
        primary_keyword: "tank top",
        keywords: ["aritzia", "knit", "ivory"],
      },
      {
        brand: "American Eagle",
        name: "Skinny Jeans",
        price: "$60",
        category: "clothes",
        hook: "A classic denim fit.",
        why: "Denim is often useful.",
        recommendation_kind: "specific",
        search_query: "American Eagle skinny jeans",
        primary_keyword: "jeans",
        keywords: ["american eagle", "skinny", "blue"],
      },
      {
        brand: "Blue Bottle",
        name: "Vanilla Latte Beans",
        price: "$24",
        category: "food",
        hook: "Coffee grounded in your saved order.",
        why: "Matches the oat milk vanilla latte signal.",
        recommendation_kind: "specific",
        search_query: "Blue Bottle vanilla latte coffee",
        primary_keyword: "coffee",
        keywords: ["blue bottle", "vanilla", "oat milk"],
      },
    ];

    const completed = completeRecommendationIntentSet(state, aiIntents);

    expect(completed).toHaveLength(4);
    expect(completed.some((intent) => intent.name === "Skinny Jeans")).toBe(false);
    expect(completed.some((intent) => intent.category === "food")).toBe(true);
  });

  it("fills a sparse ai response back only to the requested lower target", () => {
    const sparseState = buildNormalizedRecommendationState("planner-user-3", {
      user_id: "planner-user-3",
      profile_core: { city: "Chicago" },
      onboarding_responses: {},
      know_me_responses: {},
      saved_product_cards: [],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    }, []);

    const completed = completeRecommendationIntentSet(sparseState, [
      {
        brand: "Sony",
        name: "Wireless Headphones",
        price: "$199",
        category: "tech",
        hook: "A clean audio pick.",
        why: "Useful everyday tech.",
        recommendation_kind: "generic",
        search_query: "Sony wireless headphones",
        primary_keyword: "headphones",
        keywords: ["wireless", "travel", "audio"],
      },
    ], 4);

    expect(completed).toHaveLength(4);
  });

  it("keeps non-qualified categories on broad popular defaults even if they have a thin local signal", () => {
    const mixedState = buildNormalizedRecommendationState("planner-user-5", {
      user_id: "planner-user-5",
      profile_core: { city: "Chicago" },
      onboarding_responses: {},
      know_me_responses: {},
      saved_product_cards: [
        {
          id: "card-food-1",
          product_card_key: "coffee-order",
          subcategory_label: "Coffee order",
          card_title: "Oat milk vanilla latte",
          field_values: {
            Drink: "Vanilla latte",
            Milk: "Oat milk",
          },
        },
        {
          id: "card-tech-1",
          product_card_key: "tech-headphones",
          subcategory_label: "Favorite headphones",
          card_title: "Bang & Olufsen listening setup",
          field_values: {
            Brand: "Bang & Olufsen",
            Style: "premium over-ear",
          },
        },
      ],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    }, []);

    const techSupport = buildRecommendationCategoryPlan(mixedState, 4).find((entry) => entry.category === "tech");
    expect(techSupport?.state).not.toBe("qualified");
    expect(techSupport?.state).not.toBe("strong");
    expect(techSupport?.aiTarget ?? 0).toBe(0);

    const intents = generateFallbackRecommendationIntents(mixedState, 4);
    const techIntent = intents.find((intent) => intent.category === "tech");

    expect(techIntent).toBeTruthy();
    expect(techIntent?.brand).not.toBe("Bang & Olufsen");
    expect(techIntent?.why).toContain("stays broad and popular");
  });

  it("unlocks ai for a qualified category even when the rest of the profile is thin", () => {
    const foodOnlyState = buildNormalizedRecommendationState("planner-user-4", {
      user_id: "planner-user-4",
      profile_core: { city: "Chicago" },
      onboarding_responses: {},
      know_me_responses: {},
      saved_product_cards: [
        {
          id: "card-food-1",
          product_card_key: "coffee-order",
          subcategory_label: "Coffee order",
          card_title: "Oat milk vanilla latte",
          field_values: {
            Drink: "Vanilla latte",
            Milk: "Oat milk",
          },
        },
      ],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    }, [], [
      { user_id: "planner-user-1", ...buildThisOrThatAnswerRecord(
        "food-dining",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "food-dining")[0]!,
        "A",
      ) } as UserThisOrThatAnswerRow,
      { user_id: "planner-user-1", ...buildThisOrThatAnswerRecord(
        "food-dining",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "food-dining")[1]!,
        "A",
      ) } as UserThisOrThatAnswerRow,
    ]);

    const plan = buildRecommendationCategoryPlan(foodOnlyState, 4);
    const foodPlan = plan.find((entry) => entry.category === "food");

    expect(foodPlan?.state === "qualified" || foodPlan?.state === "strong").toBe(true);
    expect(foodPlan?.aiTarget).toBeGreaterThan(0);
  });

  it("lets richer this or that brand answers unlock clothes without product cards", () => {
    const thisOrThatAnswers = [
      buildThisOrThatAnswerRecord(
        "brands-shopping",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "brands-shopping")[0]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "brands-shopping",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "brands-shopping")[1]!,
        "A",
      ),
    ];

    const signalDrivenState = buildNormalizedRecommendationState("planner-user-6", {
      user_id: "planner-user-6",
      profile_core: { city: "Chicago" },
      onboarding_responses: {},
      know_me_responses: {},
      saved_product_cards: [],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    }, [], thisOrThatAnswers as UserThisOrThatAnswerRow[]);

    const plan = buildRecommendationCategoryPlan(signalDrivenState, 4);
    const clothesPlan = plan.find((entry) => entry.category === "clothes");

    expect(clothesPlan?.state === "qualified" || clothesPlan?.state === "strong").toBe(true);
    expect((clothesPlan?.aiTarget ?? 0) >= 1).toBe(true);

    const intents = generateFallbackRecommendationIntents(signalDrivenState, 4);
    const clothesIntent = intents.find((intent) => intent.category === "clothes");

    expect(clothesIntent).toBeTruthy();
    expect(["sezane", "everlane", "j.crew", "madewell", "aritzia", "club monaco", "cos", "buck mason"]).toContain(
      clothesIntent?.brand.toLowerCase(),
    );
  });

  it("maps dining and home this or that answers into food and home readiness without product cards", () => {
    const thisOrThatAnswers = [
      buildThisOrThatAnswerRecord(
        "food-dining",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "food-dining")[0]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "food-dining",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "food-dining")[1]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "home-living",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "home-living")[0]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "home-living",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "home-living")[1]!,
        "A",
      ),
    ];

    const signalDrivenState = buildNormalizedRecommendationState("planner-user-7", {
      user_id: "planner-user-7",
      profile_core: { city: "Chicago" },
      onboarding_responses: {},
      know_me_responses: {},
      saved_product_cards: [],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    }, [], thisOrThatAnswers as UserThisOrThatAnswerRow[]);

    const plan = buildRecommendationCategoryPlan(signalDrivenState, 4);
    const foodPlan = plan.find((entry) => entry.category === "food");
    const homePlan = plan.find((entry) => entry.category === "home");

    expect(foodPlan?.state === "qualified" || foodPlan?.state === "strong").toBe(true);
    expect(homePlan?.state === "qualified" || homePlan?.state === "strong").toBe(true);

    const intents = generateFallbackRecommendationIntents(signalDrivenState, 4);
    expect(intents.some((intent) => intent.category === "food")).toBe(true);
    expect(intents.some((intent) => intent.category === "home")).toBe(true);
  });

  it("treats personal, gifts, entertainment, and travel as first-class readiness buckets", () => {
    const thisOrThatAnswers = [
      buildThisOrThatAnswerRecord(
        "colors-palette",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "colors-palette")[0]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "colors-palette",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "colors-palette")[1]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "gifting-actually-want",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "gifting-actually-want")[0]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "gifting-actually-want",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "gifting-actually-want")[1]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "hobbies-weekend",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "hobbies-weekend")[0]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "hobbies-weekend",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "hobbies-weekend")[1]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "travel-trips",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "travel-trips")[0]!,
        "A",
      ),
      buildThisOrThatAnswerRecord(
        "travel-trips",
        "female",
        getThisOrThatV2RuntimeQuestions("female", "travel-trips")[1]!,
        "A",
      ),
    ];

    const signalDrivenState = buildNormalizedRecommendationState("planner-user-8", {
      user_id: "planner-user-8",
      profile_core: { city: "Chicago" },
      onboarding_responses: {},
      know_me_responses: {},
      saved_product_cards: [],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    }, [], thisOrThatAnswers as UserThisOrThatAnswerRow[]);

    const plan = buildRecommendationCategoryPlan(signalDrivenState, 4);
    const personalPlan = plan.find((entry) => entry.category === "personal");
    const giftsPlan = plan.find((entry) => entry.category === "gifts");
    const entertainmentPlan = plan.find((entry) => entry.category === "entertainment");
    const travelPlan = plan.find((entry) => entry.category === "travel");

    expect(personalPlan?.state).not.toBe("locked");
    expect(giftsPlan?.state).not.toBe("locked");
    expect(entertainmentPlan?.state).not.toBe("locked");
    expect(travelPlan?.state).not.toBe("locked");

    const intents = generateFallbackRecommendationIntents(signalDrivenState, 4);
    expect(intents).toHaveLength(4);
    expect(
      intents.filter((intent) =>
        ["personal", "gifts", "entertainment", "travel"].includes(intent.category),
      ).length,
    ).toBeGreaterThanOrEqual(2);
  });
});
