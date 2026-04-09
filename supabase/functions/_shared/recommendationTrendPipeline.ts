import {
  buildKeywordSignature,
  looksLikeProductPageUrl,
  mergeDescriptorKeywords,
  normalizePrimaryKeyword,
  normalizeRecommendationKeywords,
  type RecommendationCategory,
} from "./recommendationCatalog.ts";
import type {
  RecommendationBrandBankRow,
  RecommendationBrandLocationBankRow,
  RecommendationKeywordBankRow,
} from "./recommendationSignals.ts";
import type { ProductBankInsert } from "./recommendationProductBank.ts";
import { scoreExactProductMatch } from "./exactProductScraper.ts";

type TrendCandidateState = "staged" | "approved" | "approved_exact" | "promoted" | "reviewed";

export type TrendCandidateInput = {
  source_platform: string;
  source_category?: string | null;
  source_url?: string | null;
  external_candidate_id?: string | null;
  brand?: string | null;
  product_title?: string | null;
  primary_keyword?: string | null;
  descriptor_keywords?: string[] | null;
  category?: string | null;
  product_url?: string | null;
  image_url?: string | null;
  price_text?: string | null;
  trend_score?: number | null;
  location_keys?: string[] | null;
  observed_at?: string | null;
  candidate_state?: TrendCandidateState | null;
};

export type TrendCandidateRow = {
  id?: string;
  source_platform: string;
  source_category: string | null;
  source_url: string | null;
  external_candidate_id: string | null;
  brand: string;
  product_title: string;
  primary_keyword: string;
  descriptor_keywords: string[];
  category: RecommendationCategory;
  product_url: string;
  image_url: string | null;
  price_text: string | null;
  trend_score: number;
  candidate_state: string;
  normalized_payload: Record<string, unknown>;
  promotion_notes: Record<string, unknown>;
  observed_at: string;
};

export type TrendPromotionArtifacts = {
  keywordRows: RecommendationKeywordBankRow[];
  brandRow: RecommendationBrandBankRow | null;
  brandLocationRows: RecommendationBrandLocationBankRow[];
  productBankRow: ProductBankInsert | null;
};

export type TrendExactVerification = {
  image_status: string;
  image_verified: boolean;
  exact_confirmed: boolean;
  match_confidence: number;
};

const SOURCE_VERSION = "recommendation-trend-v1";
const ALLOWED_CATEGORIES = new Set<RecommendationCategory>(["clothes", "food", "tech", "home"]);

const cleanText = (value: unknown) =>
  typeof value === "string" ? value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim() : "";

const normalizeCategory = (value: unknown): RecommendationCategory | null => {
  const normalized = cleanText(value).toLowerCase() as RecommendationCategory;
  return ALLOWED_CATEGORIES.has(normalized) ? normalized : null;
};

const normalizeUrl = (value: unknown) => {
  const text = cleanText(value);
  return /^https?:\/\//i.test(text) ? text : "";
};

const normalizeLocationKeys = (value: unknown) =>
  normalizeRecommendationKeywords(Array.isArray(value) ? value.map((entry) => cleanText(entry)) : []);

export const normalizeTrendCandidateInput = (input: TrendCandidateInput): TrendCandidateRow | null => {
  const sourcePlatform = cleanText(input.source_platform).toLowerCase();
  const brand = cleanText(input.brand);
  const productTitle = cleanText(input.product_title);
  const productUrl = normalizeUrl(input.product_url || input.source_url);
  const category = normalizeCategory(input.category || input.source_category);
  const primaryKeyword = normalizePrimaryKeyword(input.primary_keyword || productTitle);

  if (!sourcePlatform || !brand || !productTitle || !productUrl || !category || !primaryKeyword) return null;

  const descriptorKeywords = mergeDescriptorKeywords(
    primaryKeyword,
    input.descriptor_keywords ?? [],
    [brand, productTitle],
  );
  const trendScore = Number.isFinite(Number(input.trend_score)) ? Number(input.trend_score) : 50;
  const locationKeys = normalizeLocationKeys(input.location_keys);
  const observedAt = cleanText(input.observed_at) || new Date().toISOString();
  const candidateState = cleanText(input.candidate_state) || "staged";

  return {
    source_platform: sourcePlatform,
    source_category: cleanText(input.source_category) || category,
    source_url: normalizeUrl(input.source_url) || productUrl,
    external_candidate_id: cleanText(input.external_candidate_id) || null,
    brand,
    product_title: productTitle,
    primary_keyword: primaryKeyword,
    descriptor_keywords: descriptorKeywords,
    category,
    product_url: productUrl,
    image_url: normalizeUrl(input.image_url) || null,
    price_text: cleanText(input.price_text) || null,
    trend_score: trendScore,
    candidate_state: candidateState,
    normalized_payload: {
      location_keys: locationKeys,
      source_version: SOURCE_VERSION,
      primary_keyword: primaryKeyword,
      descriptor_keywords: descriptorKeywords,
    },
    promotion_notes: {},
    observed_at: observedAt,
  };
};

export const buildTrendPromotionArtifacts = (
  candidate: TrendCandidateRow,
  exactVerification?: TrendExactVerification,
  promotedAt = new Date().toISOString(),
): TrendPromotionArtifacts => {
  const keywordRows = candidate.descriptor_keywords.map((descriptorKeyword) => ({
    primary_keyword: candidate.primary_keyword,
    descriptor_keyword: descriptorKeyword,
    category: candidate.category,
    weight: Math.max(1, Math.round(candidate.trend_score / 10)),
    source_type: "trend-ingested",
    source_version: SOURCE_VERSION,
  }));

  const brandRow: RecommendationBrandBankRow | null = candidate.brand
    ? {
        brand: candidate.brand,
        primary_keyword: candidate.primary_keyword,
        descriptor_keywords: candidate.descriptor_keywords,
        category: candidate.category,
        weight: Math.max(1, Math.round(candidate.trend_score / 10)),
        source_type: "trend-ingested",
        source_version: SOURCE_VERSION,
      }
    : null;

  const locationKeys = normalizeLocationKeys(candidate.normalized_payload.location_keys);
  const brandLocationRows = locationKeys.map((locationKey) => ({
    location_key: locationKey,
    brand: candidate.brand,
    category: candidate.category,
    primary_keywords: [candidate.primary_keyword],
    weight: Math.max(1, Math.round(candidate.trend_score / 10)),
    source_type: "trend-ingested",
    source_version: SOURCE_VERSION,
  }));

  const canPromoteExact =
    candidate.candidate_state === "approved_exact" &&
    Boolean(candidate.image_url) &&
    Boolean(candidate.price_text) &&
    Boolean(exactVerification?.image_verified) &&
    Boolean(exactVerification?.exact_confirmed);

  const productBankRow: ProductBankInsert | null = canPromoteExact
    ? {
        primary_keyword: candidate.primary_keyword,
        descriptor_keywords: candidate.descriptor_keywords,
        keyword_signature: buildKeywordSignature(
          candidate.category,
          candidate.primary_keyword,
          candidate.descriptor_keywords,
        ) ?? [candidate.category, candidate.primary_keyword, ...candidate.descriptor_keywords].join("::"),
        category: candidate.category,
        brand: candidate.brand,
        product_title: candidate.product_title,
        product_url: candidate.product_url,
        product_image_url: candidate.image_url!,
        product_price_text: candidate.price_text!,
        scraped_description: null,
        search_query: `${candidate.brand} ${candidate.product_title}`.trim(),
        resolver_source: candidate.source_platform,
        source_version: SOURCE_VERSION,
        match_confidence: Math.max(85, Math.round(exactVerification?.match_confidence ?? candidate.trend_score)),
        exact_match_confirmed: true,
        usage_count: 0,
        last_verified_at: promotedAt,
        bank_state: "exact_verified",
        bank_source: "trend-ingested",
        image_status: exactVerification?.image_status ?? "verified",
        image_verified_at: promotedAt,
        verification_notes: {
          promotion_source: candidate.source_platform,
          promoted_from_trend_candidate: true,
        },
        last_verification_error: null,
      }
    : null;

  return {
    keywordRows,
    brandRow,
    brandLocationRows,
    productBankRow,
  };
};

export const verifyTrendCandidateForPromotion = (
  candidate: TrendCandidateRow,
  imageStatus: string,
): TrendExactVerification => {
  const imageVerified = imageStatus === "verified";
  const exact = scoreExactProductMatch({
    brand: candidate.brand,
    productName: candidate.product_title,
    title: candidate.product_title,
    url: candidate.product_url,
    hasPrice: Boolean(candidate.price_text),
    hasConfidentImage: imageVerified,
  });

  return {
    image_status: imageStatus,
    image_verified: imageVerified,
    exact_confirmed: exact.exact && looksLikeProductPageUrl(candidate.product_url),
    match_confidence: exact.confidence,
  };
};
