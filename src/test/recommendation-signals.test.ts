import { describe, expect, it } from "vitest";
import {
  buildNormalizedRecommendationState,
  buildRecommendationSignalSummary,
  buildRecommendationInputStrength,
  buildRecommendationMatchAssessment,
  buildRecommendationCategorySupport,
  type UserThisOrThatAnswerRow,
} from "../../supabase/functions/_shared/recommendationSignals";
import type { KnowledgeDerivationRow, KnowledgeSnapshotRow } from "../../supabase/functions/_shared/knowledgeCenter";
import { buildThisOrThatAnswerRecord, getThisOrThatV2RuntimeQuestions } from "../data/thisOrThatV2";

const snapshot: KnowledgeSnapshotRow = {
  user_id: "test-user-1",
  profile_core: {
    city: "Chicago",
    state: "Illinois",
    gender: "female",
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

const thisOrThatAnswers = [
  buildThisOrThatAnswerRecord(
    "brands-shopping",
    "male",
    getThisOrThatV2RuntimeQuestions("male", "brands-shopping")[0]!,
    "A",
  ),
  buildThisOrThatAnswerRecord(
    "travel-trips",
    "male",
    getThisOrThatV2RuntimeQuestions("male", "travel-trips")[0]!,
    "A",
  ),
  buildThisOrThatAnswerRecord(
    "food-dining",
    "female",
    getThisOrThatV2RuntimeQuestions("female", "food-dining")[0]!,
    "A",
  ),
  buildThisOrThatAnswerRecord(
    "home-living",
    "female",
    getThisOrThatV2RuntimeQuestions("female", "home-living")[0]!,
    "A",
  ),
];

describe("recommendation signal normalization", () => {
  it("normalizes profile, answers, saved cards, likes, dislikes, and bank rows", () => {
    const state = buildNormalizedRecommendationState("test-user-1", snapshot, derivations, thisOrThatAnswers as UserThisOrThatAnswerRow[]);

    expect(state.signals.length).toBeGreaterThan(6);
    expect(state.locationKeys).toEqual(expect.arrayContaining(["chicago", "illinois"]));
    expect(state.recommendedBrands).toEqual(
      expect.arrayContaining(["aritzia", "sezane", "mejuri", "uniqlo"]),
    );

    expect(state.negativeKeywords).toEqual(
      expect.arrayContaining(["skinny jeans", "skinny", "tight denim", "neon"]),
    );

    expect(state.positiveKeywords).toEqual(
      expect.arrayContaining(["thoughtful", "brand preference", "travel preference", "dining preference"]),
    );

    expect(state.productCardKeywords).toHaveLength(2);

    const clothingCard = state.productCardKeywords.find((row) => row.saved_product_card_id === "card-1");
    expect(clothingCard).toBeTruthy();
    expect(clothingCard?.primary_keyword).toBe("tops");
    expect(clothingCard?.category).toBe("clothes");
    expect(clothingCard?.brand_keywords).toEqual(expect.arrayContaining(["aritzia", "sezane"]));
    expect(clothingCard?.descriptor_keywords).toEqual(expect.arrayContaining(["fitted", "knits", "polished", "everyday"]));
    expect(clothingCard?.negative_keywords).toEqual(expect.arrayContaining(["oversized logos", "neon trim"]));

    const coffeeCard = state.productCardKeywords.find((row) => row.saved_product_card_id === "card-2");
    expect(coffeeCard).toBeTruthy();
    expect(coffeeCard?.primary_keyword).toBe("coffee");
    expect(coffeeCard?.category).toBe("food");
    expect(coffeeCard?.descriptor_keywords).toEqual(expect.arrayContaining(["oat milk", "vanilla latte", "daily order", "morning ritual"]));
    expect(coffeeCard?.negative_keywords).toEqual(expect.arrayContaining(["dark roast", "extra sweet syrup"]));

    expect(state.likes.length).toBeGreaterThan(0);
    expect(state.dislikes.length).toBeGreaterThan(0);
    expect(state.thisOrThatAnswers).toHaveLength(4);
    expect(state.thisOrThatAnswers.some((row) => row.recommendation_category === "travel")).toBe(true);
    expect(
      state.thisOrThatSignalRows.some(
        (row) => row.signal_type === "brand_keyword" && row.brand === "uniqlo" && row.signal_polarity === "positive",
      ),
    ).toBe(true);
    expect(
      state.thisOrThatSignalRows.some(
        (row) =>
          row.signal_type === "descriptor_keyword" &&
          row.descriptor_keywords.includes("outdoor") &&
          row.signal_polarity === "negative",
      ),
    ).toBe(true);
    expect(state.likes.some((row) => row.like_type === "this_or_that_v2" && row.category === "clothes")).toBe(true);
    expect(state.likes.some((row) => row.like_type === "this_or_that_v2" && row.category === "food")).toBe(true);
    expect(state.likes.some((row) => row.like_type === "this_or_that_v2" && row.category === "home")).toBe(true);
    expect(state.likes.some((row) => row.like_type === "product_card_brand" && row.brand === "aritzia")).toBe(true);
    expect(state.likes.some((row) => row.like_type === "product_card_brand" && row.brand === "sezane")).toBe(true);
    expect(state.dislikes.some((row) => row.dislike_type === "this_or_that_v2" && row.descriptor_keywords.includes("outdoor"))).toBe(true);
    expect(state.keywordBankRows.some((row) => row.category === "food")).toBe(true);
    expect(state.brandBankRows.some((row) => row.brand === "aritzia")).toBe(true);
    expect(
      state.keywordBankRows.some(
        (row) =>
          row.source_type === "popular_style_bank" &&
          row.category === "clothes" &&
          row.primary_keyword === "tops",
      ),
    ).toBe(true);
    expect(
      state.brandBankRows.some(
        (row) =>
          row.source_type === "popular_brand_bank" &&
          row.category === "food" &&
          row.primary_keyword === "coffee" &&
          row.brand === "sweetgreen",
      ),
    ).toBe(true);
    expect(
      state.keywordBankRows.some(
        (row) =>
          row.source_type === "this_or_that_v2" &&
          row.category === "clothes" &&
          row.primary_keyword === "brand preference" &&
          row.descriptor_keyword === "basics",
      ),
    ).toBe(true);
    expect(
      state.brandBankRows.some(
        (row) =>
          row.source_type === "this_or_that_v2" &&
          row.category === "clothes" &&
          row.brand === "uniqlo" &&
          row.primary_keyword === "brand preference",
      ),
    ).toBe(true);
    expect(
      state.keywordBankRows.some(
        (row) =>
          row.source_type === "this_or_that_v2" &&
          row.category === "food" &&
          row.primary_keyword === "dining preference",
      ),
    ).toBe(true);
    expect(
      state.keywordBankRows.some(
        (row) =>
          row.source_type === "this_or_that_v2" &&
          row.category === "home" &&
          row.primary_keyword === "home style",
      ),
    ).toBe(true);
    expect(state.brandLocationRows.some((row) => row.location_key === "chicago")).toBe(true);
  });

  it("builds a stable summary for weekly-generation metadata", () => {
    const state = buildNormalizedRecommendationState("test-user-1", snapshot, derivations, thisOrThatAnswers as UserThisOrThatAnswerRow[]);
    const summary = buildRecommendationSignalSummary(state);
    const inputStrength = buildRecommendationInputStrength(state);

    expect(summary.signal_count).toBe(state.signals.length);
    expect(summary.this_or_that_answer_count).toBe(4);
    expect(summary.this_or_that_signal_count).toBe(state.thisOrThatSignalRows.length);
    expect(summary.product_card_keyword_count).toBe(2);
    expect(summary.dislike_count).toBe(state.dislikes.length);
    expect(summary.recommendation_target_count).toBe(inputStrength.targetRecommendationCount);
    expect(summary.input_strength_level).toBe(inputStrength.level);
    expect(summary.recommended_brands).toEqual(expect.arrayContaining(["aritzia", "sezane"]));
    expect(summary.location_keys).toEqual(expect.arrayContaining(["chicago", "illinois"]));
  });

  it("scores input strength and recommendation fit separately from exact-product confidence", () => {
    const state = buildNormalizedRecommendationState("test-user-1", snapshot, derivations, thisOrThatAnswers as UserThisOrThatAnswerRow[]);
    const inputStrength = buildRecommendationInputStrength(state);
    const supportedMatch = buildRecommendationMatchAssessment(state, {
      category: "clothes",
      brand: "Aritzia",
      primary_keyword: "tops",
      keywords: ["ivory", "camel", "aritzia"],
    });
    const unsupportedMatch = buildRecommendationMatchAssessment(state, {
      category: "clothes",
      brand: "Todd Snyder",
      primary_keyword: "corduroy jacket",
      keywords: ["olive", "italian", "earth tone"],
    });

    expect(inputStrength.score).toBeGreaterThanOrEqual(58);
    expect(inputStrength.targetRecommendationCount).toBe(4);
    expect(inputStrength.personalizationEnabled).toBe(true);
    expect(supportedMatch.confidence).toBeGreaterThanOrEqual(unsupportedMatch.confidence);
    expect(supportedMatch.reasons).toContain("brand-aligned");
    expect(unsupportedMatch.reasons).toContain("brand-derived-support");
    expect(unsupportedMatch.reasons).not.toContain("brand-aligned");
  });

  it("uses structured this or that answers without needing flat tot answer heuristics", () => {
    const state = buildNormalizedRecommendationState("test-user-1", snapshot, derivations, [
      {
        user_id: "test-user-1",
        question_id: "totv2-f-brand-01",
        question_key: "totv2-f-brand-01",
        question_prompt: "Which shopping mix feels most like your closet?",
        recommendation_category: "clothes",
        descriptor_keywords: ["athleisure"],
        brand: "lululemon",
        selected_payload: {
          primary_keyword: "brand preference",
          descriptor_keywords: ["athleisure"],
          brand_keywords: ["lululemon"],
          avoid_keywords: ["h m"],
        },
        rejected_payload: {
          primary_keyword: "brand preference",
          descriptor_keywords: ["fast fashion"],
          brand_keywords: ["h m"],
        },
        answer_payload: {
          selected_payload: {
            primary_keyword: "brand preference",
            descriptor_keywords: ["athleisure"],
            brand_keywords: ["lululemon"],
            avoid_keywords: ["h m"],
          },
          rejected_payload: {
            primary_keyword: "brand preference",
            descriptor_keywords: ["fast fashion"],
            brand_keywords: ["h m"],
          },
        },
        source_version: "this-or-that-v2",
      },
    ]);

    expect(
      state.likes.filter((row) => row.like_type === "this_or_that_v2" && row.brand === "lululemon"),
    ).toHaveLength(1);
  });

  it("lets strong negatives keep a category below the ai threshold", () => {
    const state = buildNormalizedRecommendationState("test-user-1", {
      ...snapshot,
      onboarding_responses: {
        ...snapshot.onboarding_responses,
        "avoid-colors": ["neon", "ivory"],
      },
      know_me_responses: {
        ...snapshot.know_me_responses,
        "pet-peeves": "skinny jeans, tight denim, fitted knits, silk tanks, cardigans",
      },
    }, derivations, []);

    const clothesSupport = buildRecommendationCategorySupport(state).find((entry) => entry.category === "clothes");

    expect(clothesSupport).toBeTruthy();
    expect(clothesSupport?.eligible).toBe(false);
    expect(["locked", "emerging"]).toContain(clothesSupport?.state ?? "");
  });
});
