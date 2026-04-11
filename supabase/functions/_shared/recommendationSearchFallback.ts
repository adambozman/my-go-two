import type { RecommendationIntent } from "./recommendationCatalog.ts";
import {
  buildRecommendationInputStrength,
  buildRecommendationMatchAssessment,
  type NormalizedRecommendationState,
} from "./recommendationSignals.ts";
import { normalizePrimaryKeyword, normalizeRecommendationKeywords } from "./recommendationCatalog.ts";

const cleanText = (value: string | null | undefined) => (value ?? "").trim();

const buildFallbackStableId = (intent: RecommendationIntent) => {
  const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name) ?? cleanText(intent.name).toLowerCase();
  const brand = cleanText(intent.brand).toLowerCase();
  const descriptors = normalizeRecommendationKeywords(intent.keywords ?? []).slice(0, 3);
  return ["fallback", intent.category, primaryKeyword, brand, ...descriptors].join("::");
};

export const buildRecommendationSearchUrl = (brand: string, query: string) => {
  const text = cleanText(query) || cleanText(brand);
  return `https://www.google.com/search?q=${encodeURIComponent(text)}`;
};

export const buildSearchFallbackResponseProduct = ({
  state,
  intent,
  generationVersion,
}: {
  state: NormalizedRecommendationState;
  intent: RecommendationIntent;
  generationVersion: string;
}) => {
  const recommendationMatch = buildRecommendationMatchAssessment(state, intent);
  const inputStrength = buildRecommendationInputStrength(state);
  const productQuery = cleanText(intent.search_query) || `${intent.brand} ${intent.name}`.trim();

  return {
    stable_id: buildFallbackStableId(intent),
    name: intent.name,
    brand: intent.brand,
    price: cleanText(intent.price) || "Price varies",
    category: intent.category,
    hook: intent.hook,
    why: intent.why,
    is_connection_pick: false,
    affiliate_url: null,
    search_url: buildRecommendationSearchUrl(intent.brand, productQuery),
    product_query: productQuery,
    sponsored_id: null,
    image_url: null,
    source_kind: "brand-search",
    source_version: generationVersion,
    exact_match_confirmed: false,
    match_confidence: null,
    resolver_source: "engine-search-fallback",
    recommendation_match_confidence: recommendationMatch.confidence,
    recommendation_match_reasons: recommendationMatch.reasons,
    explanation: {
      decision: "search-fallback",
      input_level: inputStrength.level,
      input_score: inputStrength.score,
      match_reasons: recommendationMatch.reasons,
      resolver_source: "engine-search-fallback",
      bank_source: "engine-v2",
    },
  };
};
