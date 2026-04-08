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

const cleanText = (value: string | null | undefined) => (value ?? "").trim();

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
