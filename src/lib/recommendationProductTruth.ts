type RecommendationProductLike = {
  name: string;
  brand: string;
  image_url?: string | null;
  affiliate_url?: string | null;
  source_kind?: string | null;
  exact_match_confirmed?: boolean | null;
  explanation?: {
    bank_state?: string | null;
    image_status?: string | null;
  } | null;
};

const TITLE_STOP_WORDS = new Set([
  "the", "and", "with", "for", "from", "this", "that", "your", "our", "new",
  "men", "mens", "women", "womens", "unisex", "size", "color", "colour",
]);

const IMAGE_URL_STOP_WORDS = new Set([
  ...TITLE_STOP_WORDS,
  "image", "images", "img", "cdn", "product", "products", "main", "hero", "primary",
  "front", "back", "side", "large", "medium", "small", "default", "zoom",
  "jpg", "jpeg", "png", "webp", "avif", "https", "http", "www", "com",
]);

const normalizeLoose = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalizeLoose(value)
    .split(/\s+/)
    .filter((token) => token.length >= 2 && !TITLE_STOP_WORDS.has(token));

const tokenizeImageUrl = (value: string) =>
  normalizeLoose(value)
    .split(/\s+/)
    .filter((token) => token.length >= 3 && !IMAGE_URL_STOP_WORDS.has(token));

const cleanText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export const scoreRecommendationProductImageSemanticFit = (product: RecommendationProductLike) => {
  const imageUrl = cleanText(product.image_url);
  if (!imageUrl) {
    return {
      brandMatches: 0,
      productMatches: 0,
      totalMatches: 0,
    };
  }

  const imageTokens = new Set(tokenizeImageUrl(imageUrl));
  const brandTokens = tokenize(product.brand).filter((token) => token.length >= 3);
  const productTokens = tokenize(product.name)
    .filter((token) => token.length >= 4 && !brandTokens.includes(token));

  const brandMatches = brandTokens.filter((token) => imageTokens.has(token)).length;
  const productMatches = productTokens.filter((token) => imageTokens.has(token)).length;

  return {
    brandMatches,
    productMatches,
    totalMatches: brandMatches + productMatches,
  };
};

export const hasTrustedRecommendationProductImage = (product: RecommendationProductLike) => {
  const imageUrl = cleanText(product.image_url);
  if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) return false;
  if (!cleanText(product.affiliate_url)) return false;
  if (product.source_kind === "brand-search") return false;

  const bankState = cleanText(product.explanation?.bank_state);
  const imageStatus = cleanText(product.explanation?.image_status);
  if (bankState && !["exact_verified", "catalog_verified"].includes(bankState)) return false;
  if (imageStatus && imageStatus !== "verified") return false;
  if (product.source_kind === "specific-product" && !product.exact_match_confirmed) return false;

  const semantic = scoreRecommendationProductImageSemanticFit(product);
  return semantic.totalMatches >= 2 && (semantic.brandMatches > 0 || semantic.productMatches >= 2);
};
