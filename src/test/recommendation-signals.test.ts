import { describe, expect, it } from "vitest";
import { buildNormalizedRecommendationState, buildRecommendationSignalSummary } from "../../supabase/functions/_shared/recommendationSignals";
import type { KnowledgeDerivationRow, KnowledgeSnapshotRow } from "../../supabase/functions/_shared/knowledgeCenter";

const snapshot: KnowledgeSnapshotRow = {
  user_id: "test-user-1",
  profile_core: {
    city: "Chicago",
    state: "Illinois",
    birthday: "1992-04-02",
    anniversary: "2020-10-10",
  },
  onboarding_responses: {
    "gift-preference": "thoughtful",
    "avoid-brands": ["Shein", "Fashion Nova"],
    "avoid-colors": ["neon"],
    "free-time": ["dining", "traveling"],
  },
  know_me_responses: {
    "tot-03": "Yes",
    "tot-07": "No",
    "pet-peeves": "skinny jeans, tight denim",
    "sf-10": ["luxury", "sustainable", "high-street"],
  },
  saved_product_cards: [
    {
      id: "card-1",
      product_card_key: "clothing-tops",
      subcategory_label: "Favorite tops",
      card_title: "Silk tanks and fitted knits",
      field_values: {
        "Favorite silhouettes": "Silk shell, ribbed knit, slim cardigan",
        Colors: "Ivory, navy, camel",
        Brand: "Aritzia, Sezane",
        "Avoid details": "Oversized logos, neon trim",
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
        "Avoid": "Dark roast, extra sweet syrup",
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
    user_id: "test-user-1",
    derivation_key: "your_vibe",
    derivation_payload: {
      recommended_brands: ["Aritzia", "Sezane", "Mejuri"],
      recommended_stores: ["Nordstrom", "Anthropologie"],
      image_themes: ["soft tailoring", "elevated neutrals"],
      color_palette: ["ivory", "navy", "camel"],
      gift_categories: ["fine jewelry", "luxury sleepwear"],
      price_tier: "premium",
      style_keywords: ["polished", "minimal", "refined"],
      persona_summary: "A quietly luxe profile with polished daily taste.",
    },
    source_snapshot: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

describe("recommendation signal normalization", () => {
  it("normalizes profile, answers, saved cards, likes, dislikes, and bank rows", () => {
    const state = buildNormalizedRecommendationState("test-user-1", snapshot, derivations);

    expect(state.signals.length).toBeGreaterThan(6);
    expect(state.locationKeys).toEqual(expect.arrayContaining(["chicago", "illinois"]));
    expect(state.recommendedBrands).toEqual(
      expect.arrayContaining(["aritzia", "sezane", "mejuri"]),
    );

    expect(state.negativeKeywords).toEqual(
      expect.arrayContaining(["skinny jeans", "skinny", "tight denim", "neon"]),
    );

    expect(state.positiveKeywords).toEqual(
      expect.arrayContaining(["thoughtful"]),
    );

    expect(state.productCardKeywords).toHaveLength(2);

    const clothingCard = state.productCardKeywords.find((row) => row.saved_product_card_id === "card-1");
    expect(clothingCard).toBeTruthy();
    expect(clothingCard?.primary_keyword).toBe("clothing tops");
    expect(clothingCard?.category).toBe("clothes");
    expect(clothingCard?.brand_keywords).toEqual(expect.arrayContaining(["aritzia", "sezane"]));
    expect(clothingCard?.negative_keywords).toEqual(expect.arrayContaining(["oversized logos", "neon trim"]));

    const coffeeCard = state.productCardKeywords.find((row) => row.saved_product_card_id === "card-2");
    expect(coffeeCard).toBeTruthy();
    expect(coffeeCard?.category).toBe("food");
    expect(coffeeCard?.descriptor_keywords).toEqual(expect.arrayContaining(["oat milk", "vanilla latte"]));
    expect(coffeeCard?.negative_keywords).toEqual(expect.arrayContaining(["dark roast", "extra sweet syrup"]));

    expect(state.likes.length).toBeGreaterThan(0);
    expect(state.dislikes.length).toBeGreaterThan(0);
    expect(state.keywordBankRows.some((row) => row.category === "food")).toBe(true);
    expect(state.brandBankRows.some((row) => row.brand === "aritzia")).toBe(true);
    expect(state.brandLocationRows.some((row) => row.location_key === "chicago")).toBe(true);
  });

  it("builds a stable summary for weekly-generation metadata", () => {
    const state = buildNormalizedRecommendationState("test-user-1", snapshot, derivations);
    const summary = buildRecommendationSignalSummary(state);

    expect(summary.signal_count).toBe(state.signals.length);
    expect(summary.product_card_keyword_count).toBe(2);
    expect(summary.dislike_count).toBe(state.dislikes.length);
    expect(summary.recommended_brands).toEqual(expect.arrayContaining(["aritzia", "sezane"]));
    expect(summary.location_keys).toEqual(expect.arrayContaining(["chicago", "illinois"]));
  });
});
