import type { RecommendationProduct } from "@/lib/recommendationContracts";

const normalizeUrl = (value: string | null | undefined) => {
  if (!value) return null;

  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`.toLowerCase();
  } catch {
    return value.trim().toLowerCase();
  }
};

export const isVerifiedExactRecommendation = (product: RecommendationProduct) =>
  product.source_kind === "specific-product" &&
  product.exact_match_confirmed &&
  product.explanation?.bank_state === "exact_verified" &&
  product.explanation?.image_status === "verified";

export const getRecommendationMatchLabel = (product: RecommendationProduct) => {
  if (isVerifiedExactRecommendation(product)) return "Exact Match";
  if (product.source_kind === "specific-product") return "Product Match";
  if (product.source_kind === "catalog-product") return "Catalog Match";
  return "Search Match";
};

export const getRecommendationDisplayPrice = (product: RecommendationProduct) => {
  if (product.source_kind === "brand-search") return "Price varies";
  return product.price?.trim() || "Price varies";
};

export const getRecommendationDestination = (product: RecommendationProduct) =>
  product.affiliate_url || product.search_url || null;

export const getRecommendationActionLabel = (product: RecommendationProduct) => {
  if (isVerifiedExactRecommendation(product) && product.affiliate_url) return "View Product";
  if (product.source_kind === "specific-product" && product.affiliate_url) return "View Product Match";
  if (product.source_kind === "catalog-product" && product.affiliate_url) return "View Catalog";
  if (product.search_url) return "Search Brand";
  return null;
};

export const getRecommendationStableId = (product: RecommendationProduct) => {
  const normalizedAffiliate = normalizeUrl(product.affiliate_url);
  const normalizedSearch = normalizeUrl(product.search_url);

  if (normalizedAffiliate) {
    return ["product", product.source_kind ?? "unknown", normalizedAffiliate].join(":");
  }

  if (normalizedSearch) {
    return ["search", product.category, normalizedSearch].join(":");
  }

  return [
    "fallback",
    product.category,
    product.brand.trim().toLowerCase(),
    product.name.trim().toLowerCase(),
  ].join(":");
};
