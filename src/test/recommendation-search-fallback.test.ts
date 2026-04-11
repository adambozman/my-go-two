import { describe, expect, it } from "vitest";
import { buildSearchFallbackResponseProduct } from "../../supabase/functions/_shared/recommendationSearchFallback";
import { buildNormalizedRecommendationState, buildRecommendationInputStrength } from "../../supabase/functions/_shared/recommendationSignals";
import type { KnowledgeDerivationRow, KnowledgeSnapshotRow } from "../../supabase/functions/_shared/knowledgeCenter";

const emptySnapshot = { snapshot_payload: {} } as KnowledgeSnapshotRow;
const emptyDerivations: KnowledgeDerivationRow[] = [];

describe("recommendation search fallback", () => {
  it("returns an honest search-only product instead of catalog truth", () => {
    const state = buildNormalizedRecommendationState("user-1", emptySnapshot, emptyDerivations, []);
    (state as any).inputStrength = buildRecommendationInputStrength(state);

    const product = buildSearchFallbackResponseProduct({
      state,
      intent: {
        brand: "Todd Snyder",
        name: "Italian Corduroy Dylan Jacket in Olive",
        price: "",
        category: "clothes",
        hook: "Classic corduroy in earth tones.",
        why: "Aligns with your Italian style edge and earth-tone color palette.",
        recommendation_kind: "generic",
        search_query: "Todd Snyder Italian Corduroy Dylan Jacket in Olive",
        primary_keyword: "jacket",
        keywords: ["olive", "corduroy", "earth tone"],
      },
      generationVersion: "recommendation-engine-v2",
    });

    expect(product.source_kind).toBe("brand-search");
    expect(product.affiliate_url).toBeNull();
    expect(product.image_url).toBeNull();
    expect(product.search_url).toContain("google.com/search");
    expect(product.resolver_source).toBe("engine-search-fallback");
  });
});
