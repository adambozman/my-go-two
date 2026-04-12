import { describe, expect, it } from "vitest";

import {
  getPopularPreferenceProfile,
  getSavedProductCardMetadata,
  normalizeProductCardFieldKey,
  POPULAR_PREFERENCE_BANK,
} from "../data/recommendationPreferenceMetadata";
import { RECOMMENDATION_CATEGORY_ORDER } from "../lib/recommendationCategories";

describe("recommendation preference metadata", () => {
  it("covers every live recommendation category with one shared fallback bank", () => {
    for (const category of RECOMMENDATION_CATEGORY_ORDER) {
      const profile = getPopularPreferenceProfile(category);
      expect(profile, category).toBeTruthy();
      expect(profile?.brands.length).toBeGreaterThanOrEqual(4);
      expect(profile?.styles.length).toBeGreaterThanOrEqual(4);
      expect(profile?.types.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("maps saved product card keys to explicit recommendation metadata", () => {
    expect(getSavedProductCardMetadata("clothing-tops")).toMatchObject({
      category: "clothes",
      primaryKeyword: "tops",
    });
    expect(getSavedProductCardMetadata("coffee-order")).toMatchObject({
      category: "food",
      primaryKeyword: "coffee",
    });
    expect(getSavedProductCardMetadata("wish-list")).toMatchObject({
      category: "gifts",
      primaryKeyword: "wishlist",
    });
  });

  it("normalizes field keys so metadata matchers are stable", () => {
    expect(normalizeProductCardFieldKey("Brands I Always Buy")).toBe("brands_i_always_buy");
    expect(normalizeProductCardFieldKey("Avoid details")).toBe("avoid_details");
  });

  it("ships non-empty preference banks instead of placeholder structures", () => {
    expect(POPULAR_PREFERENCE_BANK.personal.brands).toContain("mejuri");
    expect(POPULAR_PREFERENCE_BANK.tech.types).toContain("phones");
    expect(POPULAR_PREFERENCE_BANK.travel.styles).toContain("organized");
  });
});
