import { describe, expect, it } from "vitest";
import { harperWeeklyFixture, rowanConnectionFixture } from "./recommendation-flow.fixtures";
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
  },
  "Mejuri Thin Dome Ring": {
    image_url: "https://cdn.mejuri.com/pdp/thin-dome-ring.jpg",
    product_url: "https://mejuri.com/us/en/products/thin-dome-ring",
    price: "$78",
    scraped_description:
      "Minimal gold dome ring with a polished profile designed for stacking and everyday wear.",
  },
  "Lunya Washable Silk Tee Set": {
    image_url: "https://cdn.lunya.co/pdp/washable-silk-tee-set.jpg",
    product_url: "https://lunya.co/products/washable-silk-tee-set",
    price: "$198",
    scraped_description:
      "Washable silk sleep set with a relaxed tee silhouette and soft, elevated finish.",
  },
  "Bellroy Lite Daypack": {
    image_url: "https://cdn.bellroy.com/pdp/lite-daypack.jpg",
    product_url: "https://bellroy.com/products/lite-daypack",
    price: "$129",
    scraped_description:
      "Lightweight daypack with clean organization, travel-friendly carry, and a minimal shell.",
  },
};

const createHarness = () =>
  new RecommendationFlowHarness({
    generateIntents: (context) =>
      context.source === "weekly"
        ? harperWeeklyFixture.weeklyIntents
        : rowanConnectionFixture.connectionIntents,
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
    bankSnapshot.forEach((entry) => {
      expect(isProductOnlyBankRecord(entry)).toBe(true);
      expect(Object.prototype.hasOwnProperty.call(entry, "user_id")).toBe(false);
      expect(entry.intent_keywords).not.toBeNull();
      expect(entry.keyword_signature).toContain(entry.category);
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

describe("agent 2: connection recommendation flow", () => {
  it("reuses seeded shared-bank product data and only scrapes misses behind it", async () => {
    const harness = createHarness();
    await harness.runWeekly({
      userId: harperWeeklyFixture.userId,
      weekStartKey: harperWeeklyFixture.weekStartKey,
      knowledgeResponses: harperWeeklyFixture.knowledgeResponses,
      sharedCards: harperWeeklyFixture.sharedCards,
      yourVibe: harperWeeklyFixture.yourVibe,
    });

    const connectionRun = await harness.runConnection({
      userId: rowanConnectionFixture.userId,
      connectionUserId: harperWeeklyFixture.userId,
      recommendationKind: "gift",
      knowledgeResponses: rowanConnectionFixture.knowledgeResponses,
      sharedCards: rowanConnectionFixture.sharedCards,
      yourVibe: rowanConnectionFixture.yourVibe,
    });

    expect(connectionRun.cacheHit).toBe(false);
    expect(connectionRun.products).toHaveLength(rowanConnectionFixture.connectionIntents.length);
    expect(connectionRun.aiCalls).toBe(2);
    expect(connectionRun.firecrawlCalls).toBe(harperWeeklyFixture.weeklyIntents.length + 1);
    expect(connectionRun.bankHits).toBe(1);
    expect(connectionRun.bankMisses).toBe(1);

    const [reusedProduct, scrapedProduct] = connectionRun.products;
    expect(reusedProduct.affiliate_url).toBe("https://www.ae.com/us/en/p/skinny-blue-jeans");
    expect(reusedProduct.image_url).toBe("https://cdn.ae.com/pdp/skinny-blue-jeans.jpg");
    expect(reusedProduct.price).toBe("$59.95");
    expect(reusedProduct.source_kind).toBe("specific-product");
    expect(scrapedProduct.affiliate_url).toBe("https://bellroy.com/products/lite-daypack");
    expect(scrapedProduct.image_url).toBe("https://cdn.bellroy.com/pdp/lite-daypack.jpg");

    const bankSnapshot = harness.snapshotBank();
    expect(bankSnapshot).toHaveLength(harperWeeklyFixture.weeklyIntents.length + 1);
    expect(bankSnapshot.some((entry) => entry.brand === "American Eagle" && entry.usage_count >= 1)).toBe(true);
    expect(bankSnapshot.some((entry) => entry.brand === "Bellroy" && entry.resolver_source === "firecrawl")).toBe(true);
  });
});
