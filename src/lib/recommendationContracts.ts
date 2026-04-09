export interface RecommendationExplanation {
  decision?: string;
  input_level?: string;
  input_score?: number;
  match_reasons?: string[];
  resolver_source?: string | null;
  bank_state?: string | null;
  bank_source?: string | null;
  image_status?: string | null;
}

export interface RecommendationProduct {
  name: string;
  brand: string;
  price: string;
  category: string;
  hook: string;
  why: string;
  is_connection_pick?: boolean;
  affiliate_url: string | null;
  search_url: string | null;
  product_query: string | null;
  image_url: string | null;
  source_kind: string | null;
  source_version: string | null;
  exact_match_confirmed: boolean;
  match_confidence: number | null;
  resolver_source: string | null;
  recommendation_match_confidence: number | null;
  recommendation_match_reasons: string[] | null;
  explanation: RecommendationExplanation | null;
}

export interface RecommendationEngineResponse {
  products: RecommendationProduct[];
  cached: boolean;
  generated_at: string | null;
  week_start: string | null;
  generation_version: string | null;
  input_snapshot_summary: Record<string, unknown> | null;
}

export interface SharedRecommendationsContract {
  id: string | null;
  week_start: string | null;
  generated_at: string | null;
  products: RecommendationProduct[];
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asString = (value: unknown, field: string) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Malformed recommendation payload: invalid ${field}`);
  }

  return value;
};

const asNullableString = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0 ? value : null;

const asNullableNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

const parseExplanation = (value: unknown): RecommendationExplanation | null => {
  if (!isObject(value)) return null;

  return {
    decision: asNullableString(value.decision),
    input_level: asNullableString(value.input_level),
    input_score: asNullableNumber(value.input_score) ?? undefined,
    match_reasons: Array.isArray(value.match_reasons)
      ? value.match_reasons.filter((item): item is string => typeof item === "string" && item.length > 0)
      : undefined,
    resolver_source: asNullableString(value.resolver_source),
    bank_state: asNullableString(value.bank_state),
    bank_source: asNullableString(value.bank_source),
    image_status: asNullableString(value.image_status),
  };
};

export const parseRecommendationProduct = (value: unknown): RecommendationProduct => {
  if (!isObject(value)) {
    throw new Error("Malformed recommendation payload: product is not an object");
  }

  return {
    name: asString(value.name, "product.name"),
    brand: asString(value.brand, "product.brand"),
    price: asString(value.price, "product.price"),
    category: asString(value.category, "product.category"),
    hook: asString(value.hook, "product.hook"),
    why: asString(value.why, "product.why"),
    is_connection_pick: Boolean(value.is_connection_pick),
    affiliate_url: asNullableString(value.affiliate_url),
    search_url: asNullableString(value.search_url),
    product_query: asNullableString(value.product_query),
    image_url: asNullableString(value.image_url),
    source_kind: asNullableString(value.source_kind),
    source_version: asNullableString(value.source_version),
    exact_match_confirmed: Boolean(value.exact_match_confirmed),
    match_confidence: asNullableNumber(value.match_confidence),
    resolver_source: asNullableString(value.resolver_source),
    recommendation_match_confidence: asNullableNumber(value.recommendation_match_confidence),
    recommendation_match_reasons: Array.isArray(value.recommendation_match_reasons)
      ? value.recommendation_match_reasons.filter(
          (item): item is string => typeof item === "string" && item.length > 0,
        )
      : null,
    explanation: parseExplanation(value.explanation),
  };
};

export const parseRecommendationEngineResponse = (value: unknown): RecommendationEngineResponse => {
  if (!isObject(value)) {
    throw new Error("Malformed recommendation payload: response is not an object");
  }

  if (!Array.isArray(value.products)) {
    throw new Error("Malformed recommendation payload: products array missing");
  }

  return {
    products: value.products.map(parseRecommendationProduct),
    cached: Boolean(value.cached),
    generated_at: asNullableString(value.generated_at),
    week_start: asNullableString(value.week_start),
    generation_version: asNullableString(value.generation_version),
    input_snapshot_summary: isObject(value.input_snapshot_summary) ? value.input_snapshot_summary : null,
  };
};

export const parseSharedRecommendationsRecord = (
  value: unknown,
): SharedRecommendationsContract | null => {
  if (!isObject(value) || !Array.isArray(value.products)) return null;

  const products = value.products
    .map((product) => {
      try {
        return parseRecommendationProduct(product);
      } catch {
        return null;
      }
    })
    .filter((product): product is RecommendationProduct => Boolean(product));

  if (products.length === 0) return null;

  return {
    id: asNullableString(value.id),
    week_start: asNullableString(value.week_start),
    generated_at: asNullableString(value.generated_at),
    products,
  };
};
