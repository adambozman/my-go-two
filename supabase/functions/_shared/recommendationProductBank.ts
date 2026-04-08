import {
  buildKeywordSignature,
  mergeDescriptorKeywords,
  normalizePrimaryKeyword,
  type RecommendationIntent,
} from "./knowMeCatalog.ts";
import type { ExactProductScrapeResult } from "./exactProductScraper.ts";

export const MIN_EXACT_PRODUCT_BANK_CONFIDENCE = 85;

export type ProductBankInsert = {
  primary_keyword: string;
  descriptor_keywords: string[];
  keyword_signature: string;
  category: RecommendationIntent["category"];
  brand: string;
  product_title: string;
  product_url: string;
  product_image_url: string;
  product_price_text: string;
  scraped_description: string | null;
  search_query: string | null;
  resolver_source: string;
  source_version: string;
  match_confidence: number;
  exact_match_confirmed: true;
  usage_count: number;
  last_verified_at: string;
};

export type ProductBankCandidateLike = {
  primary_keyword: string;
  descriptor_keywords: string[] | null;
  keyword_signature: string;
  category: RecommendationIntent["category"];
  brand: string;
  product_title: string;
  match_confidence: number;
};

const cleanText = (value: string | null | undefined) => (value ?? "").trim();
const normalizePhrase = (value: string | null | undefined) =>
  cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const EXCLUSIVE_DESCRIPTOR_GROUPS = [
  ["skinny", "skinny fit", "straight", "straight fit", "bootcut", "boot cut", "wide leg", "wide-leg", "flare", "relaxed", "slim", "tapered", "baggy", "boyfriend", "mom jeans", "mom fit"],
  ["gold", "silver", "rose gold"],
  ["mini", "midi", "maxi"],
];

const normalizeKeywordTokens = (keywords: Array<string | null | undefined>) =>
  Array.from(
    new Set(
      keywords
        .flatMap((keyword) => cleanText(keyword).toLowerCase().split(/[^a-z0-9]+/g))
        .filter((token) => token.length >= 2),
    ),
  );

export const hashDescriptorOverlap = (needles: string[], haystack: string[]) => {
  const needleSet = new Set(needles);
  const haystackSet = new Set(haystack);
  let matches = 0;
  for (const keyword of needleSet) {
    if (haystackSet.has(keyword)) matches += 1;
  }
  return matches;
};

export const scoreProductBankBrandFit = (requestedBrand: string, candidateBrand: string) => {
  const requested = normalizeKeywordTokens([requestedBrand]);
  const candidate = normalizeKeywordTokens([candidateBrand]);
  if (!requested.length || !candidate.length) return 0;
  if (requested.join(" ") === candidate.join(" ")) return 25;
  const overlap = hashDescriptorOverlap(requested, candidate);
  return overlap > 0 ? 10 + overlap * 5 : 0;
};

export const hasExclusiveDescriptorConflict = (
  requestedDescriptorKeywords: string[],
  candidateDescriptorKeywords: string[],
) => {
  const requested = new Set(requestedDescriptorKeywords.map(normalizePhrase).filter(Boolean));
  const candidate = new Set(candidateDescriptorKeywords.map(normalizePhrase).filter(Boolean));

  for (const group of EXCLUSIVE_DESCRIPTOR_GROUPS) {
    const normalizedGroup = group.map(normalizePhrase).filter(Boolean);
    const requestedMatches = normalizedGroup.filter((keyword) => requested.has(keyword));
    const candidateMatches = normalizedGroup.filter((keyword) => candidate.has(keyword));
    if (requestedMatches.length && candidateMatches.length) {
      const shared = requestedMatches.filter((keyword) => candidateMatches.includes(keyword));
      if (shared.length === 0) return true;
    }
  }

  return false;
};

export const scoreProductBankReuseCandidate = ({
  category,
  primaryKeyword,
  descriptorKeywords,
  requestedBrand,
  row,
}: {
  category: RecommendationIntent["category"];
  primaryKeyword: string;
  descriptorKeywords: string[];
  requestedBrand: string;
  row: ProductBankCandidateLike;
}) => {
  const exactSignature = Boolean(
    buildKeywordSignature(category, primaryKeyword, descriptorKeywords) &&
      row.keyword_signature === buildKeywordSignature(category, primaryKeyword, descriptorKeywords),
  );
  const rowDescriptors = row.descriptor_keywords ?? [];
  const overlap = hashDescriptorOverlap(descriptorKeywords, rowDescriptors);
  const brandFit = scoreProductBankBrandFit(requestedBrand, row.brand);
  const descriptorConflict = hasExclusiveDescriptorConflict(descriptorKeywords, rowDescriptors);
  const confidence = Math.min(Number(row.match_confidence) || 0, 100);
  const score = (exactSignature ? 1000 : 0) + (overlap * 30) + brandFit + Math.round(confidence * 0.2);

  return {
    overlap,
    brandFit,
    descriptorConflict,
    exactSignature,
    score,
    eligible: !descriptorConflict && brandFit > 0 && (exactSignature || overlap >= 2 || (overlap >= 1 && brandFit >= 25)),
  };
};

export const isBankableExactProductScrape = (
  scraped: ExactProductScrapeResult | null | undefined,
) => {
  if (!scraped?.exact_match_confirmed) return false;
  if (!cleanText(scraped.product_url)) return false;
  if (!cleanText(scraped.image_url)) return false;
  if (!cleanText(scraped.price)) return false;
  if (!cleanText(scraped.scraped_product_title)) return false;
  return (scraped.product_match_confidence ?? 0) >= MIN_EXACT_PRODUCT_BANK_CONFIDENCE;
};

export const buildProductBankInsertFromExactScrape = ({
  intent,
  scraped,
  sourceVersion,
  resolverSource = "firecrawl",
  verifiedAt = new Date().toISOString(),
}: {
  intent: RecommendationIntent;
  scraped: ExactProductScrapeResult;
  sourceVersion: string;
  resolverSource?: string;
  verifiedAt?: string;
}): ProductBankInsert | null => {
  if (!isBankableExactProductScrape(scraped)) return null;

  const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name);
  const descriptorKeywords = mergeDescriptorKeywords(primaryKeyword, intent.keywords ?? [], [intent.brand]);

  return {
    primary_keyword: primaryKeyword,
    descriptor_keywords: descriptorKeywords,
    keyword_signature: buildKeywordSignature(intent.category, primaryKeyword, descriptorKeywords),
    category: intent.category,
    brand: intent.brand,
    product_title: cleanText(scraped.scraped_product_title) || intent.name,
    product_url: cleanText(scraped.product_url),
    product_image_url: cleanText(scraped.image_url),
    product_price_text: cleanText(scraped.price),
    scraped_description: cleanText(scraped.scraped_description) || null,
    search_query: cleanText(intent.search_query) || null,
    resolver_source: resolverSource,
    source_version: sourceVersion,
    match_confidence: scraped.product_match_confidence,
    exact_match_confirmed: true,
    usage_count: 0,
    last_verified_at: verifiedAt,
  };
};
