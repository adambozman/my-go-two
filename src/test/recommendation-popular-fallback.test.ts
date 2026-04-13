import { describe, expect, it } from "vitest";
import { selectPopularFallbackSeeds } from "../../supabase/functions/_shared/recommendationPopularFallback.ts";

describe("recommendation popular fallback", () => {
  it("prefers exact popular product-bank rows before trend candidates", () => {
    const seeds = selectPopularFallbackSeeds({
      categoryTargets: [{ category: "clothes", targetCount: 1 }],
      negativeKeywords: [],
      productBankRows: [
        {
          id: "bank-1",
          primary_keyword: "jacket",
          descriptor_keywords: ["olive", "corduroy", "earth tone"],
          category: "clothes",
          brand: "Todd Snyder",
          product_title: "Italian Corduroy Dylan Jacket in Olive",
          product_url: "https://www.toddsnyder.com/products/olive-corduroy-jacket",
          product_image_url: "https://cdn.example.com/olive-corduroy-jacket.jpg",
          product_price_text: "$200",
          resolver_source: "trend-pipeline",
          source_version: "recommendation-engine-v2",
          match_confidence: 97,
          exact_match_confirmed: true,
          usage_count: 12,
          last_verified_at: "2026-04-12T10:00:00.000Z",
          bank_state: "exact_verified",
          bank_source: "trend-ingested",
          image_status: "verified",
        },
      ],
      trendCandidateRows: [
        {
          source_platform: "TikTok Shop",
          brand: "Todd Snyder",
          product_title: "Italian Corduroy Dylan Jacket in Olive",
          primary_keyword: "jacket",
          descriptor_keywords: ["olive", "corduroy", "earth tone"],
          category: "clothes",
          product_url: "https://www.toddsnyder.com/products/olive-corduroy-jacket",
          image_url: "https://cdn.example.com/olive-corduroy-jacket.jpg",
          price_text: "$200",
          trend_score: 91,
          candidate_state: "approved_exact",
          observed_at: "2026-04-12T10:00:00.000Z",
        },
      ],
      targetCount: 1,
    });

    expect(seeds).toHaveLength(1);
    expect(seeds[0]).toMatchObject({
      source: "product-bank",
      category: "clothes",
      brand: "Todd Snyder",
      exact_match_confirmed: true,
    });
  });

  it("selects approved trend candidates without requiring exact-product bank rows", () => {
    const seeds = selectPopularFallbackSeeds({
      categoryTargets: [
        { category: "clothes", targetCount: 1 },
        { category: "personal", targetCount: 1 },
      ],
      negativeKeywords: [],
      productBankRows: [],
      trendCandidateRows: [
        {
          source_platform: "TikTok Shop",
          brand: "Todd Snyder",
          product_title: "Italian Corduroy Dylan Jacket in Olive",
          primary_keyword: "jacket",
          descriptor_keywords: ["olive", "corduroy", "earth tone"],
          category: "clothes",
          product_url: "https://www.toddsnyder.com/products/olive-corduroy-jacket",
          image_url: "https://cdn.example.com/olive-corduroy-jacket.jpg",
          price_text: "$200",
          trend_score: 91,
          candidate_state: "approved_exact",
          observed_at: "2026-04-12T10:00:00.000Z",
        },
        {
          source_platform: "YouTube",
          brand: "Sol de Janeiro",
          product_title: "Cheirosa 62 Perfume Mist",
          primary_keyword: "body mist",
          descriptor_keywords: ["warm scent", "everyday", "popular"],
          category: "personal",
          product_url: "https://www.soldejaneiro.com/products/cheirosa-62",
          image_url: "https://cdn.example.com/cheirosa-62.jpg",
          price_text: "$38",
          trend_score: 77,
          candidate_state: "promoted",
          observed_at: "2026-04-11T10:00:00.000Z",
        },
      ],
      targetCount: 2,
    });

    expect(seeds).toHaveLength(2);
    expect(seeds[0]).toMatchObject({
      source: "trend-candidate",
      category: "clothes",
      brand: "Todd Snyder",
      exact_match_confirmed: true,
    });
    expect(seeds[1]).toMatchObject({
      source: "trend-candidate",
      category: "personal",
      brand: "Sol de Janeiro",
      exact_match_confirmed: true,
    });
  });

  it("filters out trend candidates that conflict with negative keywords", () => {
    const seeds = selectPopularFallbackSeeds({
      categoryTargets: [{ category: "clothes", targetCount: 1 }],
      negativeKeywords: ["skinny"],
      productBankRows: [],
      trendCandidateRows: [
        {
          source_platform: "TikTok Shop",
          brand: "American Eagle",
          product_title: "Skinny Blue Jeans",
          primary_keyword: "jeans",
          descriptor_keywords: ["skinny", "blue jeans"],
          category: "clothes",
          product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
          image_url: "https://cdn.example.com/skinny-blue-jeans.jpg",
          price_text: "$59.95",
          trend_score: 88,
          candidate_state: "approved_exact",
          observed_at: "2026-04-12T10:00:00.000Z",
        },
      ],
      targetCount: 1,
    });

    expect(seeds).toHaveLength(0);
  });
});

// Codebase classification: runtime recommendation popular-fallback tests.
