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
  it("builds a full 12-intent fallback set balanced across categories", () => {
    const state = buildNormalizedRecommendationState("planner-user-1", snapshot, derivations);
    const intents = generateFallbackRecommendationIntents(state);

    expect(intents).toHaveLength(12);

    const counts = intents.reduce<Record<string, number>>((acc, intent) => {
      acc[intent.category] = (acc[intent.category] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts.clothes).toBe(3);
    expect(counts.food).toBe(3);
    expect(counts.tech).toBe(3);
    expect(counts.home).toBe(3);
    expect(intents.some((intent) => intent.primary_keyword === "jeans")).toBe(false);
    expect(intents.some((intent) => intent.keywords?.includes("skinny"))).toBe(false);
    expect(intents.some((intent) => intent.category === "tech" && intent.brand === "apple")).toBe(true);
    expect(intents.some((intent) => intent.category === "clothes" && intent.keywords?.includes("camel"))).toBe(true);
    expect(intents.some((intent) => intent.category === "clothes" && intent.keywords?.includes("brand"))).toBe(false);
    expect(intents.some((intent) => intent.category === "clothes" && intent.keywords?.includes("and"))).toBe(false);
  });

  it("fills an under-complete ai response back to a balanced 12-intent set without violating dislikes", () => {
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

    expect(completed).toHaveLength(12);
    expect(completed.some((intent) => intent.name === "Skinny Jeans")).toBe(false);

    const counts = completed.reduce<Record<string, number>>((acc, intent) => {
      acc[intent.category] = (acc[intent.category] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts.clothes).toBe(3);
    expect(counts.food).toBe(3);
    expect(counts.tech).toBe(3);
    expect(counts.home).toBe(3);
  });
});
