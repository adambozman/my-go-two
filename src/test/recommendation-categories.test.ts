import { describe, expect, it } from "vitest";
import {
  normalizeRecommendationCategoryKey,
  RECOMMENDATION_CATEGORY_ORDER,
} from "../lib/recommendationCategories";
import { getCatalogRecommendations } from "../../supabase/functions/_shared/recommendationCatalog";

describe("recommendation category contract", () => {
  it("normalizes legacy this or that ids, titles, and eyebrow labels", () => {
    expect(normalizeRecommendationCategoryKey("Style & Aesthetic")).toBe("clothes");
    expect(normalizeRecommendationCategoryKey("Taste cues")).toBe("food");
    expect(normalizeRecommendationCategoryKey("Home feel")).toBe("home");
    expect(normalizeRecommendationCategoryKey("Lifestyle Lens")).toBe("personal");
    expect(normalizeRecommendationCategoryKey("Gift instinct")).toBe("gifts");
    expect(normalizeRecommendationCategoryKey("Weekend rhythm")).toBe("entertainment");
    expect(normalizeRecommendationCategoryKey("Travel & Trips")).toBe("travel");
  });

  it("has seeded catalog fallback coverage for every active recommendation category", () => {
    const catalog = getCatalogRecommendations({});
    const categories = new Set(catalog.products.map((product) => product.category));

    RECOMMENDATION_CATEGORY_ORDER.forEach((category) => {
      expect(categories.has(category)).toBe(true);
    });
  });
});
