import {
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  normalizeRecommendationKeywords,
} from "./recommendationCatalog.ts";
import {
  normalizeRecommendationCategoryKey,
  type RecommendationCategory,
} from "../../../src/lib/recommendationCategories.ts";

export type ProductBankFallbackRow = {
  id?: string;
  primary_keyword: string;
  descriptor_keywords: string[] | null;
  category: RecommendationCategory;
  brand: string;
  product_title: string;
  product_url: string;
  product_image_url: string;
  product_price_text: string;
  resolver_source: string;
  source_version: string;
  match_confidence: number;
  exact_match_confirmed: boolean;
  usage_count: number;
  last_verified_at?: string | null;
  bank_state?: string | null;
  bank_source?: string | null;
  image_status?: string | null;
};

export type TrendCandidateFallbackRow = {
  id?: string;
  source_platform: string;
  brand: string;
  product_title: string;
  primary_keyword?: string | null;
  descriptor_keywords?: string[] | null;
  category?: string | null;
  product_url?: string | null;
  image_url?: string | null;
  price_text?: string | null;
  trend_score?: number | null;
  candidate_state?: string | null;
  observed_at?: string | null;
};

export type PopularFallbackCategoryTarget = {
  category: RecommendationCategory;
  targetCount: number;
};

export type PopularFallbackSeed = {
  source: "product-bank" | "trend-candidate";
  dedupe_key: string;
  category: RecommendationCategory;
  primary_keyword: string;
  descriptor_keywords: string[];
  brand: string;
  product_title: string;
  product_url: string | null;
  image_url: string | null;
  price_text: string | null;
  source_label: string | null;
  resolver_source: string | null;
  exact_match_confirmed: boolean;
  match_confidence: number | null;
  bank_state?: string | null;
  image_status?: string | null;
};

const cleanText = (value: unknown) =>
  typeof value === "string" ? value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim() : "";

const normalizeUrl = (value: unknown) => {
  const url = cleanText(value);
  if (!/^https?:\/\//i.test(url)) return "";

  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
};

const toTimestamp = (value: string | null | undefined) => {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const hasNegativeKeywordConflict = ({
  primaryKeyword,
  descriptorKeywords,
  brand,
  productTitle,
  negativeKeywords,
}: {
  primaryKeyword: string | null;
  descriptorKeywords: string[];
  brand: string;
  productTitle: string;
  negativeKeywords: string[];
}) => {
  const negatives = new Set(normalizeRecommendationKeywords(negativeKeywords));
  if (negatives.size === 0) return false;

  const haystack = mergeRecommendationKeywords([
    primaryKeyword,
    ...descriptorKeywords,
    brand,
    productTitle,
  ]);

  return haystack.some((keyword) => negatives.has(keyword));
};

export const selectPopularFallbackSeeds = ({
  categoryTargets,
  negativeKeywords,
  productBankRows,
  trendCandidateRows,
  targetCount,
}: {
  categoryTargets: PopularFallbackCategoryTarget[];
  negativeKeywords: string[];
  productBankRows: ProductBankFallbackRow[];
  trendCandidateRows: TrendCandidateFallbackRow[];
  targetCount: number;
}) => {
  const scopedTargets = new Map(
    categoryTargets
      .filter((entry) => entry.targetCount > 0)
      .map((entry) => [entry.category, entry.targetCount]),
  );

  if (scopedTargets.size === 0 || targetCount <= 0) {
    return [] as PopularFallbackSeed[];
  }

  const categoryCounts = new Map<RecommendationCategory, number>();
  const seenKeys = new Set<string>();
  const seeds: PopularFallbackSeed[] = [];

  const canUseCategory = (category: RecommendationCategory) => {
    const limit = scopedTargets.get(category) ?? 0;
    const used = categoryCounts.get(category) ?? 0;
    return used < limit;
  };

  const noteSeed = (seed: PopularFallbackSeed) => {
    if (seeds.length >= targetCount) return;
    if (!canUseCategory(seed.category)) return;
    if (seenKeys.has(seed.dedupe_key)) return;

    seeds.push(seed);
    seenKeys.add(seed.dedupe_key);
    categoryCounts.set(seed.category, (categoryCounts.get(seed.category) ?? 0) + 1);
  };

  const sortedProductBankRows = productBankRows
    .filter((row) => scopedTargets.has(row.category))
    .filter((row) => cleanText(row.product_url).length > 0)
    .filter((row) =>
      !hasNegativeKeywordConflict({
        primaryKeyword: row.primary_keyword,
        descriptorKeywords: row.descriptor_keywords ?? [],
        brand: row.brand,
        productTitle: row.product_title,
        negativeKeywords,
      }),
    )
    .sort((a, b) => {
      const aTrend = cleanText(a.bank_source) === "trend-ingested" ? 1 : 0;
      const bTrend = cleanText(b.bank_source) === "trend-ingested" ? 1 : 0;
      if (bTrend !== aTrend) return bTrend - aTrend;
      if ((b.match_confidence ?? 0) !== (a.match_confidence ?? 0)) {
        return (b.match_confidence ?? 0) - (a.match_confidence ?? 0);
      }
      if ((b.usage_count ?? 0) !== (a.usage_count ?? 0)) {
        return (b.usage_count ?? 0) - (a.usage_count ?? 0);
      }
      return toTimestamp(b.last_verified_at) - toTimestamp(a.last_verified_at);
    });

  for (const row of sortedProductBankRows) {
    noteSeed({
      source: "product-bank",
      dedupe_key: normalizeUrl(row.product_url) || [
        "product-bank",
        row.category,
        cleanText(row.brand).toLowerCase(),
        cleanText(row.product_title).toLowerCase(),
      ].join("::"),
      category: row.category,
      primary_keyword: normalizePrimaryKeyword(row.primary_keyword ?? row.product_title) ?? "",
      descriptor_keywords: row.descriptor_keywords ?? [],
      brand: row.brand,
      product_title: row.product_title,
      product_url: row.product_url,
      image_url: row.product_image_url,
      price_text: row.product_price_text,
      source_label: row.bank_source ?? "engine-v2",
      resolver_source: row.resolver_source,
      exact_match_confirmed: Boolean(row.exact_match_confirmed),
      match_confidence: row.match_confidence,
      bank_state: row.bank_state ?? "exact_verified",
      image_status: row.image_status ?? "verified",
    });
  }

  if (seeds.length >= targetCount) {
    return seeds.slice(0, targetCount);
  }

  const sortedTrendCandidates = trendCandidateRows
    .map((row) => {
      const category = normalizeRecommendationCategoryKey(row.category);
      const candidateState = cleanText(row.candidate_state).toLowerCase();
      const approvalRank =
        candidateState === "approved_exact" || candidateState === "promoted" ? 2 :
        candidateState === "approved" ? 1 :
        0;

      return {
        row,
        category,
        approvalRank,
      };
    })
    .filter((entry): entry is { row: TrendCandidateFallbackRow; category: RecommendationCategory; approvalRank: number } =>
      Boolean(entry.category && entry.approvalRank > 0 && scopedTargets.has(entry.category)),
    )
    .filter((entry) =>
      !hasNegativeKeywordConflict({
        primaryKeyword: normalizePrimaryKeyword(entry.row.primary_keyword ?? entry.row.product_title),
        descriptorKeywords: entry.row.descriptor_keywords ?? [],
        brand: entry.row.brand,
        productTitle: entry.row.product_title,
        negativeKeywords,
      }),
    )
    .sort((a, b) => {
      if (b.approvalRank !== a.approvalRank) return b.approvalRank - a.approvalRank;
      if ((Number(b.row.trend_score) || 0) !== (Number(a.row.trend_score) || 0)) {
        return (Number(b.row.trend_score) || 0) - (Number(a.row.trend_score) || 0);
      }
      return toTimestamp(b.row.observed_at) - toTimestamp(a.row.observed_at);
    });

  for (const { row, category, approvalRank } of sortedTrendCandidates) {
    const productUrl = cleanText(row.product_url) || null;
    const dedupeKey = normalizeUrl(productUrl) || [
      "trend-candidate",
      category,
      cleanText(row.source_platform).toLowerCase(),
      cleanText(row.brand).toLowerCase(),
      cleanText(row.product_title).toLowerCase(),
    ].join("::");

    noteSeed({
      source: "trend-candidate",
      dedupe_key: dedupeKey,
      category,
      primary_keyword: normalizePrimaryKeyword(row.primary_keyword ?? row.product_title) ?? "",
      descriptor_keywords: row.descriptor_keywords ?? [],
      brand: row.brand,
      product_title: row.product_title,
      product_url: productUrl,
      image_url: cleanText(row.image_url) || null,
      price_text: cleanText(row.price_text) || null,
      source_label: cleanText(row.source_platform) || "trend-candidate",
      resolver_source: cleanText(row.source_platform) || "trend-candidate",
      exact_match_confirmed: approvalRank >= 2 && Boolean(productUrl),
      match_confidence: Number.isFinite(Number(row.trend_score)) ? Number(row.trend_score) : null,
    });
  }

  return seeds.slice(0, targetCount);
};

// Codebase classification: runtime recommendation popular-fallback selector.
