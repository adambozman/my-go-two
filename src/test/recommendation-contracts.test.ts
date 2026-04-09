import { describe, expect, it } from "vitest";
import {
  parseRecommendationEngineResponse,
  parseSharedRecommendationsRecord,
} from "../lib/recommendationContracts";

const validProduct = {
  name: "Thin Dome Ring",
  brand: "Mejuri",
  price: "$78",
  category: "personal",
  hook: "Minimal everyday jewelry.",
  why: "Matches your saved gold jewelry lean.",
  affiliate_url: "https://mejuri.com/us/en/products/thin-dome-ring",
  search_url: null,
  product_query: "Mejuri Thin Dome Ring",
  image_url: "https://cdn.mejuri.com/pdp/thin-dome-ring.jpg",
  source_kind: "specific-product",
  source_version: "recommendation-engine-v2",
  exact_match_confirmed: true,
  match_confidence: 100,
  resolver_source: "firecrawl",
  recommendation_match_confidence: 92,
  explanation: {
    decision: "qualified",
    input_level: "solid",
    input_score: 71,
    match_reasons: ["saved product card", "brand overlap"],
    bank_state: "exact_verified",
    image_status: "verified",
  },
};

describe("recommendation contracts", () => {
  it("parses a valid recommendation engine response", () => {
    const parsed = parseRecommendationEngineResponse({
      products: [validProduct],
      cached: true,
      generated_at: "2026-04-09T10:00:00.000Z",
      week_start: "2026-04-06",
      generation_version: "recommendation-engine-v2",
      input_snapshot_summary: { recommendation_target_count: 4 },
    });

    expect(parsed.products).toHaveLength(1);
    expect(parsed.products[0]?.name).toBe("Thin Dome Ring");
    expect(parsed.generation_version).toBe("recommendation-engine-v2");
  });

  it("fails fast when the products array is missing", () => {
    expect(() => parseRecommendationEngineResponse({ cached: false })).toThrow(/products array missing/);
  });

  it("drops malformed shared recommendation products instead of trusting them", () => {
    const parsed = parseSharedRecommendationsRecord({
      id: "row-1",
      week_start: "2026-04-06",
      generated_at: "2026-04-09T10:00:00.000Z",
      products: [
        validProduct,
        { brand: "Broken Product" },
      ],
    });

    expect(parsed).not.toBeNull();
    expect(parsed?.products).toHaveLength(1);
    expect(parsed?.products[0]?.brand).toBe("Mejuri");
  });
});
