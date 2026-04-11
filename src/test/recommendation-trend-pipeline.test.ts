import { describe, expect, it } from "vitest";
import {
  buildTrendPromotionArtifacts,
  normalizeTrendCandidateInput,
  verifyTrendCandidateForPromotion,
} from "../../supabase/functions/_shared/recommendationTrendPipeline.ts";

describe("recommendation trend pipeline", () => {
  it("normalizes raw trend candidates into staged rows", () => {
    const candidate = normalizeTrendCandidateInput({
      source_platform: "TikTok Shop",
      source_category: "clothes",
      source_url: "https://shop.example.com/products/olive-corduroy-jacket",
      brand: "Todd Snyder",
      product_title: "Italian Corduroy Dylan Jacket in Olive",
      primary_keyword: "jacket",
      descriptor_keywords: ["olive", "corduroy", "earth tone"],
      trend_score: 74,
      location_keys: ["Austin", "Texas"],
    });

    expect(candidate).toMatchObject({
      source_platform: "tiktok shop",
      category: "clothes",
      brand: "Todd Snyder",
      primary_keyword: "jacket",
      trend_score: 74,
      candidate_state: "staged",
    });
    expect(candidate?.descriptor_keywords).toEqual(
      expect.arrayContaining(["olive", "corduroy", "earth tone", "todd snyder"]),
    );
    expect(candidate?.normalized_payload.location_keys).toEqual(["austin", "texas"]);
  });

  it("builds promotion artifacts for approved exact trend candidates", () => {
    const candidate = normalizeTrendCandidateInput({
      source_platform: "TikTok Shop",
      category: "clothes",
      source_url: "https://www.toddsnyder.com/products/todd-snyder-olive-corduroy-dylan-jacket",
      product_url: "https://www.toddsnyder.com/products/todd-snyder-olive-corduroy-dylan-jacket",
      brand: "Todd Snyder",
      product_title: "Todd Snyder Italian Corduroy Dylan Jacket in Olive",
      primary_keyword: "jacket",
      descriptor_keywords: ["olive", "corduroy"],
      image_url: "https://cdn.example.com/products/olive-corduroy-jacket.jpg",
      price_text: "$200",
      trend_score: 91,
      location_keys: ["Chicago"],
      candidate_state: "approved_exact",
    });

    expect(candidate).not.toBeNull();
    const verification = verifyTrendCandidateForPromotion(candidate!, "verified");
    const artifacts = buildTrendPromotionArtifacts(candidate!, verification);

    expect(artifacts.keywordRows.length).toBeGreaterThan(0);
    expect(artifacts.brandRow).toMatchObject({
      brand: "Todd Snyder",
      primary_keyword: "jacket",
      category: "clothes",
      source_type: "trend-ingested",
    });
    expect(artifacts.brandLocationRows).toEqual([
      expect.objectContaining({
        location_key: "chicago",
        brand: "Todd Snyder",
      }),
    ]);
    expect(artifacts.productBankRow).toMatchObject({
      bank_source: "trend-ingested",
      bank_state: "exact_verified",
      resolver_source: "tiktok shop",
      product_title: "Todd Snyder Italian Corduroy Dylan Jacket in Olive",
      product_price_text: "$200",
    });
  });
});
