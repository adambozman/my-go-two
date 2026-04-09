import { describe, expect, it } from "vitest";
import {
  hasTrustedRecommendationProductImage,
  scoreRecommendationProductImageSemanticFit,
} from "../lib/recommendationProductTruth";

describe("recommendation product truth", () => {
  it("accepts product images whose url strongly matches brand and product identity", () => {
    const product = {
      name: "Thin Dome Ring",
      brand: "Mejuri",
      image_url: "https://cdn.mejuri.com/pdp/thin-dome-ring.jpg",
      affiliate_url: "https://mejuri.com/us/en/products/thin-dome-ring",
      source_kind: "specific-product",
      exact_match_confirmed: true,
      explanation: {
        bank_state: "exact_verified",
        image_status: "verified",
      },
    };

    expect(scoreRecommendationProductImageSemanticFit(product)).toEqual({
      brandMatches: 1,
      productMatches: 3,
      totalMatches: 4,
    });
    expect(hasTrustedRecommendationProductImage(product)).toBe(true);
  });

  it("rejects suspicious product images even if they are remote and loadable-looking", () => {
    const product = {
      name: "Italian Corduroy Dylan Jacket in Olive",
      brand: "Todd Snyder",
      image_url: "https://cdn.example.com/editorial/fabric-texture-closeup-hero.jpg",
      affiliate_url: "https://www.toddsnyder.com/products/italian-corduroy-dylan-jacket-olive",
      source_kind: "specific-product",
      exact_match_confirmed: true,
      explanation: {
        bank_state: "exact_verified",
        image_status: "verified",
      },
    };

    expect(scoreRecommendationProductImageSemanticFit(product)).toEqual({
      brandMatches: 0,
      productMatches: 0,
      totalMatches: 0,
    });
    expect(hasTrustedRecommendationProductImage(product)).toBe(false);
  });
});
