import { describe, expect, it } from "vitest";
import { buildNormalizedRecommendationState } from "../../supabase/functions/_shared/recommendationSignals";
import {
  completeRecommendationIntentSet,
  generateFallbackRecommendationIntents,
} from "../../supabase/functions/_shared/recommendationIntentPlanner";
import type { KnowledgeDerivationRow, KnowledgeSnapshotRow } from "../../supabase/functions/_shared/knowledgeCenter";
import type { RecommendationIntent } from "../../supabase/functions/_shared/recommendationCatalog";

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
    "tot-21": "Yes",
    "tot-54": "Neutrals",
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
    expect(intents.some((intent) => intent.category === "clothes" && intent.keywords?.includes("camel"))).toBe(true);
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
});
