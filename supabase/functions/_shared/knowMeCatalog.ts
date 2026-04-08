export type CatalogBankKey = "universal";
export type RecommendationCategory = "clothes" | "food" | "tech" | "home";
export type PriceTier = "budget" | "mid-range" | "premium" | "luxury";
export type RecommendationKind = "specific" | "generic" | "catalog";
export type ResolverLinkKind = "product" | "search";

export interface CatalogProduct {
  brand: string;
  name: string;
  price: string;
  category: RecommendationCategory;
  bankTags: string[];
  answerTags: string[];
  priceTier: PriceTier;
  isConnectionPick?: boolean;
  productUrl?: string;
  searchUrl?: string;
  imageUrl?: string;
  recommendationKind?: RecommendationKind;
}

export interface RecommendationIntent {
  brand: string;
  name: string;
  price: string;
  category: RecommendationCategory;
  hook: string;
  why: string;
  recommendation_kind: RecommendationKind;
  search_query?: string | null;
  primary_keyword?: string | null;
  keywords?: string[] | null;
}

export interface ResolvedCatalogEntry {
  fingerprint: string;
  brand: string;
  product_name: string;
  category: RecommendationCategory;
  recommendation_kind: RecommendationKind;
  primary_keyword: string | null;
  descriptor_keywords: string[] | null;
  link_kind: ResolverLinkKind;
  link_url: string;
  search_query: string | null;
  price: string;
  image_url: string | null;
  intent_keywords: string[] | null;
  keyword_signature: string | null;
  scraped_description: string | null;
  scraped_product_title: string | null;
  product_match_confidence: number;
  exact_match_confirmed: boolean;
  source_version: string;
  resolver_source: string;
}

export interface KeywordBankCandidate {
  fingerprint: string;
  brand: string;
  product_name: string;
  category: RecommendationCategory;
  recommendation_kind: RecommendationKind;
  primary_keyword: string | null;
  descriptor_keywords: string[] | null;
  intent_keywords: string[] | null;
}

type KnowledgeResponses = Record<string, unknown>;
type KnowledgeDerivation = Record<string, unknown>;

const CATALOG_VERSION = "know-me-catalog-v3";

const siteSearch = (baseUrl: string, query: string) =>
  `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${new URLSearchParams({ q: query }).toString()}`;

const BRAND_SEARCH_TEMPLATES: Record<string, (query: string) => string> = {
  "uniqlo": (query) => siteSearch("https://www.uniqlo.com/us/en/search/", query),
  "buck mason": (query) => siteSearch("https://www.buckmason.com/search", query),
  "everlane": (query) => siteSearch("https://www.everlane.com/search", query),
  "cos": (query) => siteSearch("https://www.cos.com/en_usd/search.html", query),
  "vince": (query) => siteSearch("https://www.vince.com/search", query),
  "patagonia": (query) => siteSearch("https://www.patagonia.com/search/", query),
  "lululemon": (query) => siteSearch("https://shop.lululemon.com/search", query),
  "ralph lauren": (query) => `https://www.ralphlauren.com/search?q=${encodeURIComponent(query)}`,
  "todd snyder": (query) => siteSearch("https://www.toddsnyder.com/search", query),
  "aimé leon dore": (query) => siteSearch("https://www.aimeleondore.com/search", query),
  "blue bottle": (query) => siteSearch("https://bluebottlecoffee.com/us/eng/search", query),
  "omsom": (query) => siteSearch("https://omsom.com/search", query),
  "fishwife": (query) => siteSearch("https://eatfishwife.com/search", query),
  "brightland": (query) => siteSearch("https://brightland.co/search", query),
  "nespresso": (query) => siteSearch("https://www.nespresso.com/us/en/search", query),
  "parachute": (query) => siteSearch("https://www.parachutehome.com/search", query),
  "dyson": (query) => siteSearch("https://www.dyson.com/search-results", query),
  "our place": (query) => siteSearch("https://fromourplace.com/search", query),
  "brooklinen": (query) => siteSearch("https://www.brooklinen.com/search", query),
  "sony": (query) => siteSearch("https://electronics.sony.com/search", query),
  "anker": (query) => siteSearch("https://www.anker.com/search", query),
  "logitech": (query) => siteSearch("https://www.logitech.com/en-us/search.html", query),
  "gopro": (query) => siteSearch("https://gopro.com/en/us/search", query),
  "apple": (query) => `https://www.apple.com/us/search/${encodeURIComponent(query)}`,
};

const BRAND_BANK: Record<CatalogBankKey, Array<{ brand: string; tags: string[] }>> = {
  universal: [
    { brand: "Uniqlo", tags: ["essentials", "basics", "affordable", "minimal", "casual"] },
    { brand: "Buck Mason", tags: ["american-basics", "rugged", "tailored", "casual"] },
    { brand: "Everlane", tags: ["sustainable", "basics", "transparent", "minimal"] },
    { brand: "COS", tags: ["architectural", "minimal", "elevated", "professional"] },
    { brand: "Vince", tags: ["quiet-luxury", "knits", "relaxed", "elegant"] },
    { brand: "Patagonia", tags: ["outdoors", "ethical", "gorpcore", "traveling"] },
    { brand: "Arc'teryx", tags: ["technical", "performance", "high-end-outdoors", "outdoors"] },
    { brand: "Nike", tags: ["athletic", "sneakers", "performance", "fitness"] },
    { brand: "Adidas", tags: ["sportswear", "retro-sneakers", "athletic", "casual"] },
    { brand: "Lululemon", tags: ["athleisure", "premium", "gym-to-street", "fitness"] },
    { brand: "Ralph Lauren", tags: ["prep", "heritage", "polo", "preppy"] },
    { brand: "J.Crew", tags: ["modern-prep", "suiting", "casual-classics", "preppy"] },
    { brand: "Todd Snyder", tags: ["designer-prep", "menswear", "polished", "preppy"] },
    { brand: "Banana Republic", tags: ["travel-heritage", "tailored", "modern", "professional"] },
    { brand: "Abercrombie & Fitch", tags: ["modern-casual", "90s-fits", "laid-back", "casual"] },
    { brand: "Bonobos", tags: ["fit-specialist", "office-wear", "chinos", "professional"] },
    { brand: "Massimo Dutti", tags: ["refined", "european", "affordable-luxury", "elegant"] },
    { brand: "Aimé Leon Dore", tags: ["luxury-streetwear", "prep", "street", "bougie"] },
    { brand: "Kith", tags: ["boutique-streetwear", "lifestyle", "curated", "street"] },
    { brand: "Mr Porter", tags: ["luxury-retailer", "menswear", "premier", "luxury"] },
    { brand: "Ssense", tags: ["avant-garde", "high-fashion", "boutique", "edgy"] },
    { brand: "Huckberry", tags: ["rugged", "outdoor-lifestyle", "curated", "outdoors"] },
  ],
} as const;

const STORE_BANK: Record<CatalogBankKey, Array<{ brand: string; tags: string[] }>> = {
  universal: [
    { brand: "Mr Porter", tags: ["luxury", "designer", "refined", "elegant"] },
    { brand: "Ssense", tags: ["street", "edgy", "fashion", "luxury"] },
    { brand: "Huckberry", tags: ["outdoors", "rugged", "traveling", "casual"] },
    { brand: "End Clothing", tags: ["street", "designer", "curated", "fashion"] },
    { brand: "Grailed", tags: ["vintage", "designer", "rare-find", "street"] },
  ],
} as const;

const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    brand: "Uniqlo",
    name: "Supima Cotton Crew Neck T-Shirt",
    price: "$25",
    category: "clothes",
    bankTags: ["essentials", "basics", "affordable", "minimal"],
    answerTags: ["minimal", "casual", "budget", "balanced"],
    priceTier: "budget",
    productUrl: "https://www.uniqlo.com/us/en/search/?q=Supima%20Cotton%20Crew%20Neck%20T-Shirt",
    recommendationKind: "specific",
  },
  {
    brand: "Buck Mason",
    name: "Pima Curved Hem Tee",
    price: "$55",
    category: "clothes",
    bankTags: ["american-basics", "rugged", "tailored"],
    answerTags: ["casual", "timeless", "fit", "quality"],
    priceTier: "mid-range",
    searchUrl: siteSearch("https://www.buckmason.com/search", "Pima Curved Hem Tee"),
    recommendationKind: "generic",
  },
  {
    brand: "Everlane",
    name: "The Organic Cotton Oxford",
    price: "$88",
    category: "clothes",
    bankTags: ["sustainable", "basics", "minimal"],
    answerTags: ["minimal", "professional", "timeless"],
    priceTier: "mid-range",
    productUrl: "https://www.everlane.com/search?q=organic+cotton+oxford",
    recommendationKind: "specific",
  },
  {
    brand: "COS",
    name: "Relaxed Cotton Overshirt",
    price: "$135",
    category: "clothes",
    bankTags: ["architectural", "minimal", "elevated"],
    answerTags: ["minimal", "creative", "elegant", "quality"],
    priceTier: "premium",
    productUrl: "https://www.cos.com/en_usd/search.html?q=overshirt",
    recommendationKind: "specific",
  },
  {
    brand: "Vince",
    name: "Cashmere Crew",
    price: "$295",
    category: "clothes",
    bankTags: ["quiet-luxury", "knits", "relaxed"],
    answerTags: ["luxury", "elegant", "bougie", "quality"],
    priceTier: "luxury",
    searchUrl: siteSearch("https://www.vince.com/search", "cashmere crew"),
    recommendationKind: "generic",
  },
  {
    brand: "Patagonia",
    name: "Better Sweater Jacket",
    price: "$159",
    category: "clothes",
    bankTags: ["outdoors", "ethical", "gorpcore"],
    answerTags: ["outdoors", "traveling", "fitness", "casual"],
    priceTier: "premium",
    productUrl: "https://www.patagonia.com/search/?q=better+sweater+jacket",
    recommendationKind: "specific",
  },
  {
    brand: "Lululemon",
    name: "ABC Classic-Fit Trouser",
    price: "$128",
    category: "clothes",
    bankTags: ["athleisure", "premium", "gym-to-street"],
    answerTags: ["athletic", "fitness", "polished", "comfort"],
    priceTier: "premium",
    productUrl: "https://shop.lululemon.com/search?Ntt=ABC%20Classic-Fit%20Trouser",
    recommendationKind: "specific",
  },
  {
    brand: "Ralph Lauren",
    name: "Custom Fit Mesh Polo",
    price: "$110",
    category: "clothes",
    bankTags: ["prep", "heritage", "polo"],
    answerTags: ["preppy", "polished", "classic", "professional"],
    priceTier: "premium",
    productUrl: "https://www.ralphlauren.com/search?q=custom%20fit%20mesh%20polo",
    recommendationKind: "specific",
  },
  {
    brand: "Todd Snyder",
    name: "Made in L.A. Jersey Tee",
    price: "$78",
    category: "clothes",
    bankTags: ["designer-prep", "menswear", "polished"],
    answerTags: ["preppy", "elegant", "quality", "timeless"],
    priceTier: "mid-range",
    searchUrl: siteSearch("https://www.toddsnyder.com/search", "Made in L.A. Jersey Tee"),
    recommendationKind: "generic",
  },
  {
    brand: "Aimé Leon Dore",
    name: "Uniform Crewneck Tee",
    price: "$95",
    category: "clothes",
    bankTags: ["luxury-streetwear", "prep", "street"],
    answerTags: ["street", "bougie", "creative", "trend"],
    priceTier: "premium",
    searchUrl: siteSearch("https://www.aimeleondore.com/search", "uniform crewneck tee"),
    recommendationKind: "generic",
  },
  {
    brand: "Blue Bottle",
    name: "Whole Bean Coffee Subscription",
    price: "$27",
    category: "food",
    bankTags: ["coffee-led", "morning-ritual", "cafe"],
    answerTags: ["dining", "staying-in", "thoughtful", "practical"],
    priceTier: "budget",
    searchUrl: siteSearch("https://bluebottlecoffee.com/us/eng/search", "coffee subscription"),
    recommendationKind: "generic",
  },
  {
    brand: "Omsom",
    name: "Starter Sauce Set",
    price: "$39",
    category: "food",
    bankTags: ["east-asian-specialties", "bold", "weeknight-cooking"],
    answerTags: ["dining", "creative", "events", "staying-in"],
    priceTier: "budget",
    searchUrl: siteSearch("https://omsom.com/search", "starter sauce set"),
    recommendationKind: "generic",
  },
  {
    brand: "Fishwife",
    name: "Smoked Salmon Trio",
    price: "$36",
    category: "food",
    bankTags: ["coastal", "refined", "curated"],
    answerTags: ["thoughtful", "elegant", "dining", "luxurious"],
    priceTier: "budget",
    searchUrl: siteSearch("https://eatfishwife.com/search", "smoked salmon trio"),
    recommendationKind: "generic",
  },
  {
    brand: "Brightland",
    name: "Artist Capsule Olive Oil Set",
    price: "$74",
    category: "food",
    bankTags: ["shared-plates", "refined", "hosting"],
    answerTags: ["events", "dining", "elegant", "quality"],
    priceTier: "mid-range",
    searchUrl: siteSearch("https://brightland.co/search", "olive oil set"),
    recommendationKind: "generic",
  },
  {
    brand: "Nespresso",
    name: "Vertuo Pop+",
    price: "$129",
    category: "home",
    bankTags: ["morning-ritual", "coffee-led", "counterpiece"],
    answerTags: ["staying-in", "dining", "practical", "quality"],
    priceTier: "premium",
    isConnectionPick: true,
    productUrl: "https://www.nespresso.com/us/en/search?text=Vertuo%20Pop",
    recommendationKind: "specific",
  },
  {
    brand: "Parachute",
    name: "Linen Sheet Set",
    price: "$269",
    category: "home",
    bankTags: ["linen-bedding", "relaxed-luxury", "textured"],
    answerTags: ["minimal", "elegant", "staying-in", "luxurious"],
    priceTier: "luxury",
    productUrl: "https://www.parachutehome.com/search?q=linen%20sheet%20set",
    recommendationKind: "specific",
  },
  {
    brand: "Dyson",
    name: "Purifier Cool Gen1",
    price: "$429",
    category: "home",
    bankTags: ["clean-air", "wellness", "utility"],
    answerTags: ["staying-in", "quality", "practical", "luxury"],
    priceTier: "luxury",
    productUrl: "https://www.dyson.com/search-results?query=Purifier%20Cool%20Gen1",
    recommendationKind: "specific",
  },
  {
    brand: "Our Place",
    name: "Cast Iron Always Pan",
    price: "$155",
    category: "home",
    bankTags: ["kitchen-essential", "hosting", "daily-ritual"],
    answerTags: ["dining", "events", "thoughtful", "quality"],
    priceTier: "premium",
    productUrl: "https://fromourplace.com/search?q=cast%20iron%20always%20pan",
    recommendationKind: "specific",
  },
  {
    brand: "Brooklinen",
    name: "Super-Plush Bath Towels",
    price: "$99",
    category: "home",
    bankTags: ["spa-touch", "comfort-luxury", "small-upgrade"],
    answerTags: ["staying-in", "luxurious", "thoughtful", "comfort"],
    priceTier: "mid-range",
    productUrl: "https://www.brooklinen.com/search?q=super-plush%20bath%20towels",
    recommendationKind: "specific",
  },
  {
    brand: "Sony",
    name: "WH-1000XM5 Headphones",
    price: "$399",
    category: "tech",
    bankTags: ["noise-canceling-headphones", "travel", "focus"],
    answerTags: ["traveling", "events", "fitness", "luxurious"],
    priceTier: "luxury",
    isConnectionPick: true,
    productUrl: "https://electronics.sony.com/search?query=WH-1000XM5",
    recommendationKind: "specific",
  },
  {
    brand: "Anker",
    name: "Prime 20K Power Bank",
    price: "$130",
    category: "tech",
    bankTags: ["portable-power-bank", "travel-tech", "fast-charge"],
    answerTags: ["traveling", "practical", "events", "quality"],
    priceTier: "premium",
    productUrl: "https://www.anker.com/search?keyword=Prime%2020K%20Power%20Bank",
    recommendationKind: "specific",
  },
  {
    brand: "Logitech",
    name: "MX Mechanical Mini",
    price: "$149",
    category: "tech",
    bankTags: ["mechanical-keyboard", "desk-setup", "tactile"],
    answerTags: ["professional", "creative", "practical", "quality"],
    priceTier: "premium",
    productUrl: "https://www.logitech.com/en-us/search.html?q=MX%20Mechanical%20Mini",
    recommendationKind: "specific",
  },
  {
    brand: "GoPro",
    name: "HERO13 Black",
    price: "$399",
    category: "tech",
    bankTags: ["action-camera", "sports", "travel-content"],
    answerTags: ["outdoors", "traveling", "fitness", "events"],
    priceTier: "luxury",
    productUrl: "https://gopro.com/en/us/search?q=HERO13%20Black",
    recommendationKind: "specific",
  },
  {
    brand: "Apple",
    name: "Apple Watch SE",
    price: "$249",
    category: "tech",
    bankTags: ["smart-watch", "fitness-tracking", "connected"],
    answerTags: ["fitness", "athletic", "traveling", "practical"],
    priceTier: "premium",
    productUrl: "https://www.apple.com/us/search/Apple%20Watch%20SE",
    recommendationKind: "specific",
  },
];

const PRICE_ORDER: Record<PriceTier, number> = {
  budget: 0,
  "mid-range": 1,
  premium: 2,
  luxury: 3,
};

const CATEGORY_TARGETS: Record<RecommendationCategory, string[]> = {
  clothes: ["style-personality", "daily-vibe", "aesthetic-lean", "purchase-values"],
  food: ["free-time", "gift-preference"],
  home: ["free-time", "purchase-values", "gift-preference"],
  tech: ["free-time", "purchase-values", "gift-preference"],
};

const normalizeText = (value: unknown): string =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

export const normalizeLoose = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const PRODUCT_URL_POSITIVE_PATTERNS = [
  /\/product(?:s)?\//i,
  /\/p\//i,
  /\/dp\//i,
  /\/item\//i,
  /\/sku\//i,
  /\/buy\//i,
];

const PRODUCT_URL_NEGATIVE_PATTERNS = [
  /\/search(?:\/|$|\?)/i,
  /\/search-results(?:\/|$|\?)/i,
  /\/collections?(?:\/|$)/i,
  /\/categories?(?:\/|$)/i,
  /\/category(?:\/|$)/i,
  /\/browse(?:\/|$)/i,
  /\/shop(?:\/|$)\?/i,
  /[?&](?:q|query|keyword|search|text|Ntt)=/i,
];

export const looksLikeProductPageUrl = (url: string | null | undefined) => {
  const value = (url ?? "").trim();
  if (!value) return false;
  if (PRODUCT_URL_NEGATIVE_PATTERNS.some((pattern) => pattern.test(value))) return false;
  return PRODUCT_URL_POSITIVE_PATTERNS.some((pattern) => pattern.test(value));
};

const NEGATIVE_SIGNAL_KEY_PATTERN = /(avoid|dislike|hate|turnoff|turn off|pet peeve|no go)/i;

const splitKeywordPhrases = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap((item) => splitKeywordPhrases(item));
  }

  if (typeof value !== "string") return [];

  return value
    .split(/[;,/|]+/)
    .map((part) => normalizeLoose(part))
    .filter(Boolean);
};

const toArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(normalizeText).filter(Boolean);
  const single = normalizeText(value);
  return single ? [single] : [];
};

const pushUnique = (list: string[], value: string) => {
  if (value && !list.includes(value)) list.push(value);
};

const mapSpendingMindsetToTier = (knowledgeResponses: KnowledgeResponses, knowledgeDerivation?: KnowledgeDerivation): PriceTier => {
  const explicitTier = normalizeText(knowledgeDerivation?.price_tier);
  if (explicitTier === "budget" || explicitTier === "mid-range" || explicitTier === "premium" || explicitTier === "luxury") {
    return explicitTier;
  }

  const mindset = toArray(knowledgeResponses["spending-mindset"])[0];
  if (mindset === "budget") return "budget";
  if (mindset === "balanced") return "mid-range";
  if (mindset === "quality") return "premium";
  if (mindset === "luxury-first") return "luxury";
  return "mid-range";
};

const collectSignals = (knowledgeResponses: KnowledgeResponses, knowledgeDerivation?: KnowledgeDerivation): string[] => {
  const signals: string[] = [];
  const keys = [
    "style-personality",
    "daily-vibe",
    "spending-mindset",
    "purchase-values",
    "free-time",
    "gift-preference",
    "aesthetic-lean",
  ];

  for (const key of keys) {
    for (const value of toArray(knowledgeResponses[key])) pushUnique(signals, value);
  }

  for (const value of toArray(knowledgeDerivation?.style_keywords)) pushUnique(signals, value);
  return signals;
};

const scoreTags = (candidateTags: string[], signals: string[]) =>
  candidateTags.reduce((score, tag) => (signals.includes(tag.toLowerCase()) ? score + 1 : score), 0);

export const getCatalogVersion = () => CATALOG_VERSION;

export const buildRecommendationFingerprint = (
  category: RecommendationCategory,
  brand: string,
  name: string,
  recommendationKind: RecommendationKind,
) => [category, normalizeLoose(brand), normalizeLoose(name), recommendationKind].join("::");

export const normalizeRecommendationKeywords = (
  keywords: Array<string | null | undefined>,
): string[] =>
  Array.from(
    new Set(
      keywords
        .map((keyword) => normalizeLoose(keyword ?? ""))
        .filter((keyword) => keyword.length >= 2),
    ),
  ).sort();

export const normalizePrimaryKeyword = (keyword: string | null | undefined) => {
  const normalized = normalizeLoose(keyword ?? "");
  return normalized || null;
};

export const normalizeDescriptorKeywords = (
  keywords: Array<string | null | undefined>,
  primaryKeyword: string | null | undefined,
): string[] => {
  const normalizedPrimaryKeyword = normalizePrimaryKeyword(primaryKeyword);
  return normalizeRecommendationKeywords(keywords).filter((keyword) => keyword !== normalizedPrimaryKeyword);
};

const expandRecommendationKeywordSet = (
  keywords: Array<string | null | undefined>,
): string[] => {
  const normalized = normalizeRecommendationKeywords(keywords);
  const expanded = normalized.flatMap((keyword) => {
    const tokens = keyword.split(/\s+/).filter((token) => token.length >= 3);
    return [keyword, ...tokens];
  });
  return normalizeRecommendationKeywords(expanded);
};

export const extractNegativePreferenceKeywords = (
  knowledgeResponses: Record<string, unknown>,
): string[] => {
  const negatives: string[] = [];

  for (const [key, value] of Object.entries(knowledgeResponses)) {
    if (!NEGATIVE_SIGNAL_KEY_PATTERN.test(key)) continue;

    for (const phrase of splitKeywordPhrases(value)) {
      negatives.push(phrase);
      for (const token of phrase.split(/\s+/).filter((token) => token.length >= 3)) {
        negatives.push(token);
      }
    }
  }

  return normalizeRecommendationKeywords(negatives);
};

export const buildKeywordSignature = (
  category: RecommendationCategory,
  primaryKeyword: string | null | undefined,
  descriptorKeywords: Array<string | null | undefined>,
) => {
  const normalizedPrimaryKeyword = normalizePrimaryKeyword(primaryKeyword);
  if (!normalizedPrimaryKeyword) return null;
  const normalizedDescriptors = normalizeDescriptorKeywords(descriptorKeywords, normalizedPrimaryKeyword);
  return [category, normalizedPrimaryKeyword, ...normalizedDescriptors].join("::");
};

export const mergeRecommendationKeywords = (
  ...keywordSets: Array<Array<string | null | undefined> | null | undefined>
): string[] => expandRecommendationKeywordSet(keywordSets.flatMap((set) => set ?? []));

export const mergeDescriptorKeywords = (
  primaryKeyword: string | null | undefined,
  ...keywordSets: Array<Array<string | null | undefined> | null | undefined>
): string[] =>
  normalizeDescriptorKeywords(
    mergeRecommendationKeywords(...keywordSets),
    primaryKeyword,
  );

export const scoreKeywordBankCandidate = (
  requestedCategory: RecommendationCategory,
  requestedDescriptorKeywords: Array<string | null | undefined>,
  primaryKeyword: string | null | undefined,
  negativeKeywords: Array<string | null | undefined>,
  candidate: KeywordBankCandidate,
): number => {
  if (candidate.category !== requestedCategory) return -1;

  const normalizedPrimaryKeyword = normalizeLoose(primaryKeyword ?? "");
  const candidatePrimaryKeyword = normalizePrimaryKeyword(candidate.primary_keyword);
  if (!normalizedPrimaryKeyword || !candidatePrimaryKeyword) return -1;
  if (normalizedPrimaryKeyword !== candidatePrimaryKeyword) return -1;

  const requestedDescriptors = mergeDescriptorKeywords(primaryKeyword, requestedDescriptorKeywords);
  const candidateDescriptors = mergeDescriptorKeywords(
    candidatePrimaryKeyword,
    candidate.descriptor_keywords,
    candidate.intent_keywords,
  );
  const normalizedNegativeKeywords = mergeDescriptorKeywords(primaryKeyword, negativeKeywords);

  if (normalizedNegativeKeywords.includes(normalizedPrimaryKeyword)) return -1;
  if (normalizedNegativeKeywords.some((keyword) => candidateDescriptors.includes(keyword))) return -1;
  if (requestedDescriptors.length === 0 || candidateDescriptors.length === 0) return -1;

  const requestedSet = new Set(requestedDescriptors);
  const candidateSet = new Set(candidateDescriptors);
  const overlap = requestedDescriptors.filter((keyword) => candidateSet.has(keyword));
  if (overlap.length === 0) return -1;

  const overlapRatio = overlap.length / Math.min(requestedSet.size, candidateSet.size);
  let score = overlapRatio * 100;

  const candidateBrand = normalizeLoose(candidate.brand);
  if (requestedSet.has(candidateBrand)) score += 20;

  const requestedNameTerms = requestedDescriptors.filter((keyword) => !["food", "clothes", "tech", "home"].includes(keyword));
  const candidateNameTerms = normalizeLoose(candidate.product_name).split(/\s+/).filter(Boolean);
  const sharedNameTerms = requestedNameTerms.filter((term) => candidateNameTerms.includes(term));
  score += sharedNameTerms.length * 8;

  return score;
};

export const getSeedCatalogBrands = () =>
  Array.from(new Set(PRODUCT_CATALOG.map((product) => product.brand)));

export const findSeedCatalogProduct = (brand: string, name: string) =>
  PRODUCT_CATALOG.find((product) =>
    normalizeLoose(product.brand) === normalizeLoose(brand) &&
    normalizeLoose(product.name) === normalizeLoose(name)
  ) ?? null;

const buildFallbackSearchUrl = (brand: string, name: string) => {
  const template = BRAND_SEARCH_TEMPLATES[normalizeLoose(brand)];
  const query = `${brand} ${name}`.trim();
  if (template) return template(query);
  return `https://www.google.com/search?q=${encodeURIComponent(`${brand} ${name} official`)}`;
};

export const resolveIntentToCatalogEntry = (intent: RecommendationIntent): ResolvedCatalogEntry => {
  const seedProduct = findSeedCatalogProduct(intent.brand, intent.name);
  const recommendationKind = intent.recommendation_kind;
  const searchQuery = intent.search_query?.trim() || `${intent.brand} ${intent.name}`.trim();
  const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name);
  const descriptorKeywords = mergeDescriptorKeywords(
    primaryKeyword,
    intent.keywords ?? [],
    [intent.brand],
  );
  const normalizedKeywords = mergeRecommendationKeywords([
    primaryKeyword,
    ...descriptorKeywords,
  ]);
  const seedProductUrl = seedProduct?.productUrl ?? null;
  const seedProductIsExact = looksLikeProductPageUrl(seedProductUrl);
  const linkUrl = seedProductIsExact
    ? seedProductUrl!
    : seedProduct?.searchUrl || seedProductUrl || buildFallbackSearchUrl(intent.brand, searchQuery);
  const linkKind: ResolverLinkKind = seedProductIsExact ? "product" : "search";

  return {
    fingerprint: buildRecommendationFingerprint(intent.category, intent.brand, intent.name, recommendationKind),
    brand: intent.brand,
    product_name: intent.name,
    category: intent.category,
    recommendation_kind: recommendationKind,
    primary_keyword: primaryKeyword,
    descriptor_keywords: descriptorKeywords,
    link_kind: linkKind,
    link_url: linkUrl,
    search_query: linkKind === "search" ? searchQuery : null,
    price: intent.price,
    image_url: seedProduct?.imageUrl ?? null,
    intent_keywords: normalizedKeywords,
    keyword_signature: buildKeywordSignature(intent.category, primaryKeyword, descriptorKeywords),
    scraped_description: null,
    scraped_product_title: seedProductIsExact ? intent.name : null,
    product_match_confidence: seedProductIsExact ? 100 : 0,
    exact_match_confirmed: seedProductIsExact,
    source_version: CATALOG_VERSION,
    resolver_source: seedProduct ? "seed-catalog" : "brand-search-template",
  };
};

export const getBankKnowledgeDerivation = (
  knowledgeResponses: KnowledgeResponses,
  knowledgeDerivation?: KnowledgeDerivation,
) => {
  const bankKey: CatalogBankKey = "universal";
  const signals = collectSignals(knowledgeResponses, knowledgeDerivation);

  const recommended_brands = [...BRAND_BANK[bankKey]]
    .map((entry) => ({
      brand: entry.brand,
      score: scoreTags(entry.tags.map((tag) => tag.toLowerCase()), signals),
    }))
    .sort((a, b) => b.score - a.score || a.brand.localeCompare(b.brand))
    .slice(0, 10)
    .map((entry) => entry.brand);

  const recommended_stores = [...STORE_BANK[bankKey]]
    .map((entry) => ({
      brand: entry.brand,
      score: scoreTags(entry.tags.map((tag) => tag.toLowerCase()), signals),
    }))
    .sort((a, b) => b.score - a.score || a.brand.localeCompare(b.brand))
    .slice(0, 5)
    .map((entry) => entry.brand);

  return { recommended_brands, recommended_stores };
};

const getCategorySignals = (category: RecommendationCategory, knowledgeResponses: KnowledgeResponses, allSignals: string[]) => {
  const categorySignals = [...allSignals];
  for (const key of CATEGORY_TARGETS[category]) {
    for (const value of toArray(knowledgeResponses[key])) pushUnique(categorySignals, value);
  }
  return categorySignals;
};

const buildHook = (product: CatalogProduct, matchedSignals: string[]) => {
  if (matchedSignals.includes("preppy")) return `A polished ${product.category === "clothes" ? "piece" : "pick"} that fits your preppy lean without feeling stiff.`;
  if (matchedSignals.includes("minimal")) return `A clean-lined ${product.category === "clothes" ? "staple" : "upgrade"} that matches your minimal side.`;
  if (matchedSignals.includes("athletic") || matchedSignals.includes("fitness")) return `Built for the active rhythm already showing up in your profile.`;
  if (matchedSignals.includes("traveling")) return `Easy to keep in rotation if your lifestyle leans travel-heavy.`;
  if (matchedSignals.includes("thoughtful")) return `Feels considered instead of generic, which fits how you like things chosen.`;
  return `A real ${product.category} recommendation pulled from the same Know Me source system as your profile.`;
};

const buildWhy = (product: CatalogProduct, matchedSignals: string[]) => {
  const detail = matchedSignals.slice(0, 2).join(" + ");
  if (detail) return `Matched on ${detail} signals and kept inside your ${product.priceTier} comfort zone.`;
  return `Selected from the curated catalog because its tags line up with the strongest profile signals we have so far.`;
};

const buildSearchQuery = (product: CatalogProduct) => `${product.brand} ${product.name}`;

const withinTier = (candidate: PriceTier, target: PriceTier) => {
  return PRICE_ORDER[candidate] <= PRICE_ORDER[target];
};

export const getCatalogRecommendations = (
  knowledgeResponses: KnowledgeResponses,
  knowledgeDerivation?: KnowledgeDerivation,
) => {
  const allSignals = collectSignals(knowledgeResponses, knowledgeDerivation);
  const targetTier = mapSpendingMindsetToTier(knowledgeResponses, knowledgeDerivation);
  const bankKnowledgeDerivation = getBankKnowledgeDerivation(knowledgeResponses, knowledgeDerivation);
  const preferredBrands = new Set(bankKnowledgeDerivation.recommended_brands.map((brand) => brand.toLowerCase()));

  const byCategory = (["clothes", "food", "tech", "home"] as RecommendationCategory[]).flatMap((category) => {
    const categorySignals = getCategorySignals(category, knowledgeResponses, allSignals);
    const picks = PRODUCT_CATALOG
      .filter((product) => product.category === category)
      .map((product) => {
        const matchedSignals = [
          ...product.answerTags.filter((tag) => categorySignals.includes(tag)),
          ...product.bankTags.filter((tag) => categorySignals.includes(tag.toLowerCase())),
        ];
        let score = matchedSignals.length * 3;
        if (preferredBrands.has(product.brand.toLowerCase())) score += 6;
        if (withinTier(product.priceTier, targetTier)) score += 3;
        else score -= 4;
        if (product.isConnectionPick) score += 1;
        return {
          ...product,
          score,
          matchedSignals,
        };
      })
      .sort((a, b) => b.score - a.score || a.brand.localeCompare(b.brand))
      .slice(0, 3)
      .map((product, index) => ({
        name: product.name,
        brand: product.brand,
        price: product.price,
        category: product.category,
        hook: buildHook(product, product.matchedSignals),
        why: buildWhy(product, product.matchedSignals),
        is_connection_pick: Boolean(product.isConnectionPick || index === 0),
        is_sponsored: false,
        affiliate_url: product.productUrl ?? null,
        search_url: product.productUrl ? null as string | null : (product.searchUrl ?? null as string | null),
        product_query: buildSearchQuery(product),
        sponsored_id: null as string | null,
        image_url: product.imageUrl ?? null,
        source_kind: product.productUrl ? "specific-product" : "brand-search",
        source_version: CATALOG_VERSION,
      }));

    return picks;
  });

  return {
    products: byCategory,
    priceTier: targetTier,
    bankKnowledgeDerivation,
  };
};
// Codebase classification: runtime Know Me catalog and recommendation bank.

