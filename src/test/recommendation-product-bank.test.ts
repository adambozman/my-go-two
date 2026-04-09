import { describe, expect, it } from "vitest";
import {
  buildProductBankInsertFromExactScrape,
  hasExclusiveDescriptorConflict,
  isBankableExactProductScrape,
  reassessProductBankRow,
  scoreProductBankReuseCandidate,
} from "../../supabase/functions/_shared/recommendationProductBank.ts";
import type { RecommendationIntent } from "../../supabase/functions/_shared/recommendationCatalog.ts";

const jeansIntent: RecommendationIntent = {
  brand: "American Eagle",
  name: "Skinny Blue Jeans",
  price: "$59.95",
  category: "clothes",
  hook: "A clean denim pick.",
  why: "Matches daily style preferences.",
  recommendation_kind: "specific",
  search_query: "American Eagle skinny blue jeans",
  primary_keyword: "jeans",
  keywords: ["skinny", "blue jeans", "american eagle"],
};

describe("recommendation product bank admission", () => {
  it("builds a shared-bank row only for exact, complete product scrapes", () => {
    const bankInsert = buildProductBankInsertFromExactScrape({
      intent: jeansIntent,
      scraped: {
        image_url: "https://cdn.ae.com/pdp/skinny-blue-jeans.jpg",
        product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
        price: "$59.95",
        scraped_description: "Slim blue denim jeans with stretch.",
        scraped_product_title: "American Eagle Skinny Blue Jeans",
        product_match_confidence: 100,
        exact_match_confirmed: true,
      },
      sourceVersion: "recommendation-engine-v2",
      verifiedAt: "2026-04-08T00:00:00.000Z",
    });

    expect(bankInsert).toEqual({
      primary_keyword: "jeans",
      descriptor_keywords: expect.arrayContaining(["american eagle", "skinny", "blue jeans"]),
      keyword_signature: expect.stringContaining("clothes::jeans"),
      category: "clothes",
      brand: "American Eagle",
      product_title: "American Eagle Skinny Blue Jeans",
      product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
      product_image_url: "https://cdn.ae.com/pdp/skinny-blue-jeans.jpg",
      product_price_text: "$59.95",
      scraped_description: "Slim blue denim jeans with stretch.",
      search_query: "American Eagle skinny blue jeans",
      resolver_source: "firecrawl",
      source_version: "recommendation-engine-v2",
      match_confidence: 100,
      exact_match_confirmed: true,
      usage_count: 0,
      last_verified_at: "2026-04-08T00:00:00.000Z",
      bank_state: "exact_verified",
      bank_source: "engine-v2",
      image_status: "verified",
      image_verified_at: "2026-04-08T00:00:00.000Z",
      verification_notes: {
        exact_match_reasons: [],
        resolver_source: "firecrawl",
      },
      last_verification_error: null,
    });
  });

  it("rejects weak or incomplete scrapes from the shared product bank", () => {
    expect(
      isBankableExactProductScrape({
        image_url: "https://cdn.ae.com/pdp/skinny-blue-jeans.jpg",
        product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
        price: "$59.95",
        scraped_description: "Slim blue denim jeans with stretch.",
        scraped_product_title: null,
        product_match_confidence: 100,
        exact_match_confirmed: true,
      }),
    ).toBe(false);

    expect(
      buildProductBankInsertFromExactScrape({
        intent: jeansIntent,
        scraped: {
          image_url: null,
          product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
          price: "$59.95",
          scraped_description: null,
          scraped_product_title: "American Eagle Skinny Blue Jeans",
          product_match_confidence: 100,
          exact_match_confirmed: true,
        },
        sourceVersion: "recommendation-engine-v2",
      }),
    ).toBeNull();

    expect(
      buildProductBankInsertFromExactScrape({
        intent: jeansIntent,
        scraped: {
          image_url: "https://cdn.ae.com/pdp/skinny-blue-jeans.jpg",
          product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
          price: "$59.95",
          scraped_description: null,
          scraped_product_title: "American Eagle Skinny Blue Jeans",
          product_match_confidence: 84,
          exact_match_confirmed: true,
        },
        sourceVersion: "recommendation-engine-v2",
      }),
    ).toBeNull();
  });

  it("blocks reuse when same-bucket descriptors conflict on exact product variants", () => {
    expect(
      hasExclusiveDescriptorConflict(
        ["american eagle", "skinny", "blue jeans"],
        ["american eagle", "straight", "blue jeans"],
      ),
    ).toBe(true);

    const reuse = scoreProductBankReuseCandidate({
      category: "clothes",
      primaryKeyword: "jeans",
      descriptorKeywords: ["american eagle", "skinny", "blue jeans"],
      requestedBrand: "American Eagle",
      row: {
        primary_keyword: "jeans",
        descriptor_keywords: ["american eagle", "straight", "blue jeans"],
        keyword_signature: "clothes::jeans::american eagle::straight::blue jeans",
        category: "clothes",
        brand: "American Eagle",
        product_title: "American Eagle Straight Blue Jeans",
        match_confidence: 100,
      },
    });

    expect(reuse.descriptorConflict).toBe(true);
    expect(reuse.eligible).toBe(false);
  });

  it("reassesses bank rows into explicit verification states", () => {
    expect(
      reassessProductBankRow({
        primary_keyword: "jeans",
        descriptor_keywords: ["american eagle", "skinny", "blue jeans"],
        keyword_signature: "clothes::jeans::american eagle::skinny::blue jeans",
        category: "clothes",
        brand: "American Eagle",
        product_title: "American Eagle Skinny Blue Jeans",
        product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
        product_price_text: "$59.95",
        match_confidence: 0,
      }, "verified"),
    ).toMatchObject({
      bank_state: "exact_verified",
      exact_match_confirmed: true,
      last_verification_error: null,
    });

    expect(
      reassessProductBankRow({
        primary_keyword: "jeans",
        descriptor_keywords: ["american eagle", "skinny", "blue jeans"],
        keyword_signature: "clothes::jeans::american eagle::skinny::blue jeans",
        category: "clothes",
        brand: "American Eagle",
        product_title: "American Eagle Skinny Blue Jeans",
        product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
        product_price_text: "$59.95",
        match_confidence: 0,
      }, "http-404"),
    ).toMatchObject({
      bank_state: "image_failed",
      exact_match_confirmed: false,
      last_verification_error: "http-404",
    });
  });
});
