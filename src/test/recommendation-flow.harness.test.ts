import { describe, expect, it } from "vitest";
import { dislikeKnowledgeResponses, harperWeeklyFixture } from "./recommendation-flow.fixtures";
import {
  isProductOnlyBankRecord,
  RecommendationFlowHarness,
  type ScrapedProduct,
} from "./recommendation-flow.harness";
import type { RecommendationIntent } from "../../supabase/functions/_shared/knowMeCatalog.ts";

const SCRAPE_FIXTURES: Record<string, ScrapedProduct> = {
  "American Eagle Skinny Blue Jeans": {
    image_url: "https://cdn.ae.com/pdp/skinny-blue-jeans.jpg",
    product_url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
    price: "$59.95",
    scraped_description:
      "Slim blue denim jeans with stretch fabric, a classic five-pocket build, and a clean daily fit.",
    scraped_product_title: "American Eagle Skinny Blue Jeans",
    product_match_confidence: 100,
    exact_match_confirmed: true,
  },
  "Mejuri Thin Dome Ring": {
    image_url: "https://cdn.mejuri.com/pdp/thin-dome-ring.jpg",
    product_url: "https://mejuri.com/us/en/products/thin-dome-ring",
    price: "$78",
    scraped_description:
      "Minimal gold dome ring with a polished profile designed for stacking and everyday wear.",
    scraped_product_title: "Mejuri Thin Dome Ring",
    product_match_confidence: 100,
    exact_match_confirmed: true,
  },
  "Lunya Washable Silk Tee Set": {
    image_url: "https://cdn.lunya.co/pdp/washable-silk-tee-set.jpg",
    product_url: "https://lunya.co/products/washable-silk-tee-set",
    price: "$198",
    scraped_description:
      "Washable silk sleep set with a relaxed tee silhouette and soft, elevated finish.",
    scraped_product_title: "Lunya Washable Silk Tee Set",
    product_match_confidence: 100,
    exact_match_confirmed: true,
  },
  "Bellroy Lite Daypack": {
    image_url: "https://cdn.bellroy.com/pdp/lite-daypack.jpg",
    product_url: "https://bellroy.com/products/lite-daypack",
    price: "$129",
    scraped_description:
      "Lightweight daypack with clean organization, travel-friendly carry, and a minimal shell.",
    scraped_product_title: "Bellroy Lite Daypack",
    product_match_confidence: 100,
    exact_match_confirmed: true,
  },
  "American Eagle Straight Blue Jeans": {
    image_url: "https://cdn.ae.com/pdp/straight-blue-jeans.jpg",
    product_url: "https://www.ae.com/us/en/p/straight-blue-jeans",
    price: "$64.95",
    scraped_description:
      "Straight blue denim jeans with stretch fabric, five-pocket styling, and an easy everyday fit.",
    scraped_product_title: "American Eagle Straight Blue Jeans",
    product_match_confidence: 100,
    exact_match_confirmed: true,
  },
  "H&M Skinny Blue Jeans": {
    image_url: "https://image.hm.com/pdp/skinny-blue-jeans.jpg",
    product_url: "https://www2.hm.com/en_us/productpage.skinny-blue-jeans.html",
    price: "$39.99",
    scraped_description:
      "Skinny blue jeans with stretch denim, a close fit, and a clean H&M everyday wash.",
    scraped_product_title: "H&M Skinny Blue Jeans",
    product_match_confidence: 100,
    exact_match_confirmed: true,
  },
};

const createHarness = () =>
  new RecommendationFlowHarness({
    generateIntents: () => harperWeeklyFixture.weeklyIntents,
    scrapeProduct: (intent: RecommendationIntent) =>
      SCRAPE_FIXTURES[`${intent.brand} ${intent.name}`] ?? null,
  });

describe("agent 1: weekly recommendation flow", () => {
  it("seeds the shared bank on first load and hits the weekly cache on repeat access", async () => {
    const harness = createHarness();
    const firstRun = await harness.runWeekly({
      userId: harperWeeklyFixture.userId,
      weekStartKey: harperWeeklyFixture.weekStartKey,
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    expect(firstRun.cacheHit).toBe(false);
    expect(firstRun.products).toHaveLength(harperWeeklyFixture.weeklyIntents.length);
    expect(firstRun.aiCalls).toBe(1);
    expect(firstRun.firecrawlCalls).toBe(harperWeeklyFixture.weeklyIntents.length);
    expect(firstRun.bankHits).toBe(0);
    expect(firstRun.bankMisses).toBe(harperWeeklyFixture.weeklyIntents.length);

    const bankSnapshot = harness.snapshotBank();
    expect(bankSnapshot).toHaveLength(harperWeeklyFixture.weeklyIntents.length);
    const americanEagleRecord = bankSnapshot.find((entry) => entry.brand === "American Eagle");
    expect(americanEagleRecord).toBeTruthy();
    expect(americanEagleRecord?.exact_match_confirmed).toBe(true);
    expect(americanEagleRecord?.product_match_confidence).toBe(100);
    expect(americanEagleRecord?.scraped_product_title).toBe("American Eagle Skinny Blue Jeans");
    expect(americanEagleRecord?.link_url).toBe("https://www.ae.com/us/en/p/skinny-blue-jeans");
    expect(americanEagleRecord?.price).toBe("$59.95");
    expect(americanEagleRecord?.image_url).toBe("https://cdn.ae.com/pdp/skinny-blue-jeans.jpg");
    expect(americanEagleRecord?.scraped_description).toMatch(/denim/i);
    expect(americanEagleRecord?.primary_keyword).toBe("jeans");
    expect(americanEagleRecord?.descriptor_keywords).toEqual(expect.arrayContaining(["american eagle", "skinny", "blue jeans"]));
    expect(americanEagleRecord?.intent_keywords).toEqual(expect.arrayContaining(["jeans", "american eagle", "blue jeans"]));
    bankSnapshot.forEach((entry) => {
      expect(isProductOnlyBankRecord(entry)).toBe(true);
      expect(Object.prototype.hasOwnProperty.call(entry, "user_id")).toBe(false);
      expect(entry.primary_keyword).toBeTruthy();
      expect(entry.descriptor_keywords).not.toBeNull();
      expect(entry.intent_keywords).not.toBeNull();
      expect(entry.keyword_signature).toContain(`${entry.category}::${entry.primary_keyword}`);
      expect(entry.scraped_description).toMatch(/(denim|ring|silk)/i);
    });

    const secondRun = await harness.runWeekly({
      userId: harperWeeklyFixture.userId,
      weekStartKey: harperWeeklyFixture.weekStartKey,
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    expect(secondRun.cacheHit).toBe(true);
    expect(secondRun.aiCalls).toBe(1);
    expect(secondRun.firecrawlCalls).toBe(harperWeeklyFixture.weeklyIntents.length);
    expect(secondRun.products).toEqual(firstRun.products);
  });
});

describe("agent 2: second weekly user journey", () => {
  it("reuses the seeded shared bank without re-scraping exact matches", async () => {
    const harness = createHarness();
    await harness.runWeekly({
      userId: harperWeeklyFixture.userId,
      weekStartKey: harperWeeklyFixture.weekStartKey,
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    const secondWeeklyRun = await harness.runWeekly({
      userId: "later-user-1",
      weekStartKey: "2026-04-13",
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    expect(secondWeeklyRun.cacheHit).toBe(false);
    expect(secondWeeklyRun.products).toHaveLength(harperWeeklyFixture.weeklyIntents.length);
    expect(secondWeeklyRun.aiCalls).toBe(2);
    expect(secondWeeklyRun.firecrawlCalls).toBe(harperWeeklyFixture.weeklyIntents.length);
    expect(secondWeeklyRun.bankHits).toBe(harperWeeklyFixture.weeklyIntents.length);
    expect(secondWeeklyRun.bankMisses).toBe(0);

    const [reusedProduct, reusedRing, reusedSleepSet] = secondWeeklyRun.products;
    expect(reusedProduct.affiliate_url).toBe("https://www.ae.com/us/en/p/skinny-blue-jeans");
    expect(reusedProduct.image_url).toBe("https://cdn.ae.com/pdp/skinny-blue-jeans.jpg");
    expect(reusedProduct.price).toBe("$59.95");
    expect(reusedProduct.source_kind).toBe("specific-product");
    expect(reusedRing.source_kind).toBe("specific-product");
    expect(reusedSleepSet.source_kind).toBe("specific-product");

    const bankSnapshot = harness.snapshotBank();
    expect(bankSnapshot).toHaveLength(harperWeeklyFixture.weeklyIntents.length);
    expect(bankSnapshot.some((entry) => entry.brand === "American Eagle" && entry.usage_count === 1)).toBe(true);
    expect(bankSnapshot.every((entry) => entry.exact_match_confirmed)).toBe(true);
  });
});

describe("exact bank identity reuse", () => {
  it("renders the exact saved product identity when a bank hit is reused", async () => {
    const harness = new RecommendationFlowHarness({
      generateIntents: (context) =>
        context.userId === "seed-user"
          ? [harperWeeklyFixture.weeklyIntents[1]]
          : [
              {
                ...harperWeeklyFixture.weeklyIntents[1],
                name: "Minimal Gold Ring",
                search_query: "Mejuri minimal gold ring",
                keywords: ["mejuri", "gold", "minimal"],
              },
            ],
      scrapeProduct: (intent: RecommendationIntent) =>
        SCRAPE_FIXTURES[`${intent.brand} ${intent.name}`] ?? null,
    });

    await harness.runWeekly({
      userId: "seed-user",
      weekStartKey: "2026-04-06",
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    const reused = await harness.runWeekly({
      userId: "reuse-user",
      weekStartKey: "2026-04-13",
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    expect(reused.bankHits).toBe(1);
    expect(reused.products[0]?.name).toBe("Thin Dome Ring");
    expect(reused.products[0]?.brand).toBe("Mejuri");
    expect(reused.products[0]?.affiliate_url).toBe("https://mejuri.com/us/en/products/thin-dome-ring");
    expect(reused.products[0]?.image_url).toBe("https://cdn.mejuri.com/pdp/thin-dome-ring.jpg");
    expect(reused.products[0]?.price).toBe("$78");
  });
});

describe("exact product confidence", () => {
  it("keeps search fallback when scrape confidence is not exact", async () => {
    const harness = new RecommendationFlowHarness({
      generateIntents: () => [harperWeeklyFixture.weeklyIntents[0]],
      scrapeProduct: () => ({
        image_url: null,
        product_url: null,
        price: null,
        scraped_description: null,
        scraped_product_title: "American Eagle Denim Collection",
        product_match_confidence: 54,
        exact_match_confirmed: false,
      }),
    });

    const run = await harness.runWeekly({
      userId: harperWeeklyFixture.userId,
      weekStartKey: "2026-04-13",
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    expect(run.products[0]?.affiliate_url).toBeNull();
    expect(run.products[0]?.image_url).toBeNull();
    expect(run.products[0]?.source_kind).toBe("brand-search");
    expect(harness.snapshotBank()[0]?.exact_match_confirmed).toBe(false);
    expect(harness.snapshotBank()[0]?.product_match_confidence).toBe(54);
  });
});

describe("dislike-aware jeans routing", () => {
  it("uses the keyword bank for exact matches and falls back to a straight-cut jeans recommendation when skinny is disliked", async () => {
    const harness = new RecommendationFlowHarness({
      generateIntents: (context) => {
        if (context.source !== "weekly") {
          return [];
        }

        const petPeeves = context.knowledgeResponses["pet-peeves"];
        const dislikesSkinny = String(Array.isArray(petPeeves) ? petPeeves.join(" ") : petPeeves ?? "")
          .toLowerCase()
          .includes("skinny");

        if (dislikesSkinny) {
          return [
            {
              brand: "American Eagle",
              name: "Straight Blue Jeans",
              price: "$64.95",
              category: "clothes",
              hook: "A clean everyday denim pick that avoids skinny cuts.",
              why: "The later user likes jeans but explicitly dislikes skinny fits.",
              recommendation_kind: "specific",
              search_query: "American Eagle straight blue jeans",
              primary_keyword: "jeans",
              keywords: ["american eagle", "straight blue jeans", "blue jeans", "denim", "clothes"],
            },
          ];
        }

        return [harperWeeklyFixture.weeklyIntents[0]];
      },
      scrapeProduct: (intent: RecommendationIntent) =>
        SCRAPE_FIXTURES[`${intent.brand} ${intent.name}`] ?? null,
    });

    const firstRun = await harness.runWeekly({
      userId: "agent-1",
      weekStartKey: "2026-04-06",
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    expect(firstRun.cacheHit).toBe(false);
    expect(firstRun.bankHits).toBe(0);
    expect(firstRun.bankMisses).toBe(1);
    expect(firstRun.products[0]?.name).toBe("Skinny Blue Jeans");
    expect(firstRun.products[0]?.affiliate_url).toBe("https://www.ae.com/us/en/p/skinny-blue-jeans");

    const secondRun = await harness.runWeekly({
      userId: "agent-2",
      weekStartKey: "2026-04-13",
      knowledgeResponses: dislikeKnowledgeResponses as Record<string, unknown>,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    expect(secondRun.cacheHit).toBe(false);
    expect(secondRun.bankHits).toBe(0);
    expect(secondRun.bankMisses).toBe(1);
    expect(secondRun.products[0]?.name).toBe("Straight Blue Jeans");
    expect(secondRun.products[0]?.affiliate_url).toBe("https://www.ae.com/us/en/p/straight-blue-jeans");
    expect(secondRun.products[0]?.image_url).toBe("https://cdn.ae.com/pdp/straight-blue-jeans.jpg");
    expect(secondRun.products[0]?.source_kind).toBe("specific-product");

    const bankSnapshot = harness.snapshotBank();
    const skinnyBank = bankSnapshot.find((entry) => entry.product_name === "Skinny Blue Jeans");
    const straightBank = bankSnapshot.find((entry) => entry.product_name === "Straight Blue Jeans");

    expect(skinnyBank?.exact_match_confirmed).toBe(true);
    expect(skinnyBank?.product_match_confidence).toBe(100);
    expect(skinnyBank?.link_url).toBe("https://www.ae.com/us/en/p/skinny-blue-jeans");
    expect(skinnyBank?.image_url).toBe("https://cdn.ae.com/pdp/skinny-blue-jeans.jpg");
    expect(skinnyBank?.scraped_description).toMatch(/denim/i);
    expect(skinnyBank?.primary_keyword).toBe("jeans");
    expect(skinnyBank?.descriptor_keywords).toEqual(expect.arrayContaining(["american eagle", "skinny", "blue jeans"]));
    expect(skinnyBank?.intent_keywords).toEqual(expect.arrayContaining(["jeans", "american eagle", "blue jeans"]));

    expect(straightBank?.exact_match_confirmed).toBe(true);
    expect(straightBank?.product_match_confidence).toBe(100);
    expect(straightBank?.link_url).toBe("https://www.ae.com/us/en/p/straight-blue-jeans");
    expect(straightBank?.image_url).toBe("https://cdn.ae.com/pdp/straight-blue-jeans.jpg");
    expect(straightBank?.scraped_description).toMatch(/denim/i);
    expect(straightBank?.primary_keyword).toBe("jeans");
    expect(straightBank?.descriptor_keywords).toEqual(expect.arrayContaining(["american eagle", "straight", "blue jeans"]));
    expect(straightBank?.intent_keywords).toEqual(expect.arrayContaining(["jeans", "american eagle", "blue jeans"]));
  });
});

describe("primary keyword bucket brand separation", () => {
  it("does not reuse a saved jeans product across different brands when descriptor overlap is otherwise similar", async () => {
    const harness = new RecommendationFlowHarness({
      generateIntents: (context) =>
        context.userId === "seed-brand-user"
          ? [harperWeeklyFixture.weeklyIntents[0]]
          : [
              {
                ...harperWeeklyFixture.weeklyIntents[0],
                brand: "H&M",
                name: "Skinny Blue Jeans",
                search_query: "H&M skinny blue jeans",
                keywords: ["h&m", "skinny", "blue jeans", "denim", "clothes"],
              },
            ],
      scrapeProduct: (intent: RecommendationIntent) =>
        SCRAPE_FIXTURES[`${intent.brand} ${intent.name}`] ?? null,
    });

    await harness.runWeekly({
      userId: "seed-brand-user",
      weekStartKey: "2026-04-06",
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    const secondRun = await harness.runWeekly({
      userId: "hm-user",
      weekStartKey: "2026-04-13",
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    expect(secondRun.bankHits).toBe(0);
    expect(secondRun.bankMisses).toBe(1);
    expect(secondRun.firecrawlCalls).toBe(2);
    expect(secondRun.products[0]?.brand).toBe("H&M");
    expect(secondRun.products[0]?.affiliate_url).toBe("https://www2.hm.com/en_us/productpage.skinny-blue-jeans.html");
    expect(secondRun.products[0]?.image_url).toBe("https://image.hm.com/pdp/skinny-blue-jeans.jpg");

    const bankSnapshot = harness.snapshotBank();
    expect(bankSnapshot.some((entry) => entry.brand === "American Eagle" && entry.product_name === "Skinny Blue Jeans")).toBe(true);
    expect(bankSnapshot.some((entry) => entry.brand === "H&M" && entry.product_name === "Skinny Blue Jeans")).toBe(true);
  });
});
