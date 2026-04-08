import {
  getBankKnowledgeDerivation,
  getSeedCatalogBrands,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  normalizeRecommendationKeywords,
} from "./knowMeCatalog.ts";
import type { KnowledgeDerivationRow, KnowledgeSnapshotRow } from "./knowledgeCenter.ts";
import { getCombinedKnowledgeResponses, getKnowledgeDerivationPayload, toRecord, toRecordArray } from "./knowledgeCenter.ts";

type JsonObject = Record<string, unknown>;

export type RecommendationCategory = "clothes" | "food" | "tech" | "home";

export interface UserPreferenceSignalRow {
  user_id: string;
  signal_type: string;
  signal_key: string;
  signal_value: unknown;
  signal_source: string;
  signal_strength: number;
  is_negative: boolean;
  recorded_at: string;
}

export interface UserProductCardKeywordRow {
  user_id: string;
  saved_product_card_id: string;
  product_card_key: string;
  primary_keyword: string | null;
  descriptor_keywords: string[];
  brand_keywords: string[];
  category: string | null;
  subcategory: string | null;
  negative_keywords: string[];
  source_version: string;
}

export interface UserLikeSignalRow {
  user_id: string;
  like_type: string;
  primary_keyword: string | null;
  descriptor_keywords: string[];
  brand: string | null;
  category: string | null;
  notes: string | null;
}

export interface UserDislikeSignalRow {
  user_id: string;
  dislike_type: string;
  primary_keyword: string | null;
  descriptor_keywords: string[];
  brand: string | null;
  category: string | null;
  notes: string | null;
}

export interface RecommendationKeywordBankRow {
  primary_keyword: string;
  descriptor_keyword: string;
  category: string;
  weight: number;
  source_type: string;
  source_version: string;
}

export interface RecommendationBrandBankRow {
  brand: string;
  primary_keyword: string;
  descriptor_keywords: string[];
  category: string;
  weight: number;
  source_type: string;
  source_version: string;
}

export interface RecommendationBrandLocationBankRow {
  location_key: string;
  brand: string;
  category: string;
  primary_keywords: string[];
  weight: number;
  source_type: string;
  source_version: string;
}

export interface NormalizedRecommendationState {
  combinedResponses: JsonObject;
  profileCore: JsonObject;
  yourVibe: JsonObject;
  negativeKeywords: string[];
  positiveKeywords: string[];
  recommendedBrands: string[];
  recommendedStores: string[];
  locationKeys: string[];
  signals: UserPreferenceSignalRow[];
  productCardKeywords: UserProductCardKeywordRow[];
  likes: UserLikeSignalRow[];
  dislikes: UserDislikeSignalRow[];
  keywordBankRows: RecommendationKeywordBankRow[];
  brandBankRows: RecommendationBrandBankRow[];
  brandLocationRows: RecommendationBrandLocationBankRow[];
}

const SOURCE_VERSION = "recommendation-v2";

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
};

const splitPhrases = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => splitPhrases(entry));
  }
  const text = cleanText(value);
  if (!text) return [];
  return text
    .split(/[;,/|]/)
    .map((entry) => cleanText(entry))
    .filter(Boolean);
};

const keywordTokens = (value: unknown) =>
  normalizeRecommendationKeywords(
    splitPhrases(value).flatMap((entry) => {
      const tokens = entry
        .split(/\s+/)
        .map((token) => cleanText(token).toLowerCase())
        .filter((token) => token.length >= 3);
      return [entry.toLowerCase(), ...tokens];
    }),
  );

const inferCategoryFromText = (...values: Array<unknown>): RecommendationCategory | null => {
  const haystack = values.map((value) => cleanText(value).toLowerCase()).join(" ");
  if (!haystack) return null;

  const checks: Array<[RecommendationCategory, string[]]> = [
    ["clothes", ["shirt", "jean", "pants", "dress", "sneaker", "shoe", "coat", "hoodie", "style", "fit", "wear", "jacket"]],
    ["food", ["coffee", "tea", "restaurant", "meal", "food", "drink", "snack", "cocktail", "grocery", "cuisine", "sushi"]],
    ["tech", ["tech", "headphones", "camera", "laptop", "phone", "speaker", "gaming", "device", "charger"]],
    ["home", ["home", "decor", "bedding", "candle", "kitchen", "rug", "lamp", "furniture", "bath", "living"]],
  ];

  for (const [category, terms] of checks) {
    if (terms.some((term) => haystack.includes(term))) return category;
  }

  return null;
};

const inferPrimaryKeywordFromCard = (
  productCardKey: string,
  cardTitle: string,
  subcategoryLabel: string,
  fieldValues: Record<string, unknown>,
) => {
  const keyTail = cleanText(productCardKey.split("__").pop() ?? productCardKey)
    .split("-")
    .filter(Boolean)
    .join(" ");
  const title = cleanText(cardTitle);
  const subcategory = cleanText(subcategoryLabel);
  const firstFieldLabel = cleanText(Object.keys(fieldValues)[0] ?? "");

  const candidates = [keyTail, title, subcategory, firstFieldLabel]
    .map((candidate) => normalizePrimaryKeyword(candidate))
    .filter(Boolean);

  return candidates[0] ?? null;
};

const extractBrandKeywords = (...values: Array<unknown>) => {
  const text = values.map((value) => cleanText(value)).join(" ");
  const matches = text.match(/\b[A-Z][A-Za-z&']+(?:\s+[A-Z][A-Za-z&']+)*\b/g) ?? [];
  return normalizeRecommendationKeywords(matches);
};

const extractNegativePreferenceKeywords = (responses: JsonObject) => {
  const negatives = new Set<string>();

  for (const [key, value] of Object.entries(responses)) {
    if (!/(avoid|dislike|hate|turnoff|turn off|pet[-\s]?peeve|no go|allerg|sensitive)/i.test(key)) continue;
    for (const phrase of splitPhrases(value)) {
      negatives.add(phrase.toLowerCase());
      for (const token of keywordTokens(phrase)) negatives.add(token);
    }
  }

  return normalizeRecommendationKeywords(Array.from(negatives));
};

const extractPositivePreferenceKeywords = (responses: JsonObject) => {
  const positives = new Set<string>();

  for (const [key, value] of Object.entries(responses)) {
    if (/(favorite|favourite|love|likes|preferred|best|go-to|go to)/i.test(key)) {
      for (const phrase of splitPhrases(value)) {
        positives.add(phrase.toLowerCase());
        for (const token of keywordTokens(phrase)) positives.add(token);
      }
    }
  }

  return normalizeRecommendationKeywords(Array.from(positives));
};

const extractLocationKeys = (profileCore: JsonObject) => {
  const raw = [
    cleanText(profileCore.city),
    cleanText(profileCore.state),
    cleanText(profileCore.location),
    cleanText(profileCore.country),
  ].filter(Boolean);

  return normalizeRecommendationKeywords(raw);
};

const toSignalRows = (
  userId: string,
  snapshot: KnowledgeSnapshotRow | null,
  derivations: KnowledgeDerivationRow[],
  combinedResponses: JsonObject,
) => {
  const now = new Date().toISOString();
  const signals: UserPreferenceSignalRow[] = [];
  const profileCore = toRecord(snapshot?.profile_core);

  for (const [key, value] of Object.entries(profileCore)) {
    if (value === null || value === undefined || value === "") continue;
    signals.push({
      user_id: userId,
      signal_type: "profile_fact",
      signal_key: key,
      signal_value: value,
      signal_source: "profile_core",
      signal_strength: 90,
      is_negative: false,
      recorded_at: now,
    });
  }

  for (const [key, value] of Object.entries(toRecord(snapshot?.onboarding_responses))) {
    signals.push({
      user_id: userId,
      signal_type: "onboarding_answer",
      signal_key: key,
      signal_value: value,
      signal_source: "onboarding_responses",
      signal_strength: 70,
      is_negative: /(avoid|dislike|hate)/i.test(key),
      recorded_at: now,
    });
  }

  for (const [key, value] of Object.entries(toRecord(snapshot?.know_me_responses))) {
    signals.push({
      user_id: userId,
      signal_type: key.startsWith("tot-") ? "this_or_that" : "know_me_answer",
      signal_key: key,
      signal_value: value,
      signal_source: "know_me_responses",
      signal_strength: key.startsWith("tot-") ? 65 : 75,
      is_negative: /(avoid|dislike|hate)/i.test(key),
      recorded_at: now,
    });
  }

  for (const derivation of derivations) {
    signals.push({
      user_id: userId,
      signal_type: "knowledge_derivation",
      signal_key: derivation.derivation_key,
      signal_value: derivation.derivation_payload ?? {},
      signal_source: "knowledge_derivations",
      signal_strength: 60,
      is_negative: false,
      recorded_at: now,
    });
  }

  for (const keyword of extractNegativePreferenceKeywords(combinedResponses)) {
    signals.push({
      user_id: userId,
      signal_type: "negative_keyword",
      signal_key: keyword,
      signal_value: keyword,
      signal_source: "normalized_responses",
      signal_strength: 95,
      is_negative: true,
      recorded_at: now,
    });
  }

  return signals;
};

const toProductCardKeywordRows = (userId: string, snapshot: KnowledgeSnapshotRow | null) => {
  const cards = toRecordArray<Record<string, unknown>>(snapshot?.saved_product_cards);
  const rows: UserProductCardKeywordRow[] = [];

  for (const card of cards) {
    const fieldValues = toRecord(card.field_values);
    const productCardKey = cleanText(card.product_card_key);
    const cardTitle = cleanText(card.card_title);
    const subcategoryLabel = cleanText(card.subcategory_label);
    const category = inferCategoryFromText(productCardKey, cardTitle, subcategoryLabel);
    const primaryKeyword = inferPrimaryKeywordFromCard(productCardKey, cardTitle, subcategoryLabel, fieldValues);
    const descriptorKeywords = mergeRecommendationKeywords([
      subcategoryLabel,
      cardTitle,
      ...Object.keys(fieldValues),
      ...Object.values(fieldValues).flatMap((value) => splitPhrases(value)),
    ]).filter((keyword) => keyword !== primaryKeyword);
    const negativeKeywords = mergeRecommendationKeywords(
      Object.entries(fieldValues)
        .filter(([key]) => /(avoid|dislike|hate|allerg|sensitive|no go)/i.test(key))
        .flatMap(([, value]) => splitPhrases(value)),
    );
    const brandKeywords = extractBrandKeywords(subcategoryLabel, cardTitle, ...Object.values(fieldValues));

    rows.push({
      user_id: userId,
      saved_product_card_id: cleanText(card.id),
      product_card_key: productCardKey,
      primary_keyword: primaryKeyword,
      descriptor_keywords: descriptorKeywords,
      brand_keywords: brandKeywords,
      category,
      subcategory: subcategoryLabel || null,
      negative_keywords: negativeKeywords,
      source_version: SOURCE_VERSION,
    });
  }

  return rows.filter((row) => row.saved_product_card_id && row.primary_keyword);
};

const toLikeAndDislikeRows = (
  userId: string,
  combinedResponses: JsonObject,
  productCardKeywords: UserProductCardKeywordRow[],
) => {
  const likes: UserLikeSignalRow[] = [];
  const dislikes: UserDislikeSignalRow[] = [];

  for (const keyword of extractPositivePreferenceKeywords(combinedResponses)) {
    likes.push({
      user_id: userId,
      like_type: "normalized_response",
      primary_keyword: null,
      descriptor_keywords: [keyword],
      brand: null,
      category: null,
      notes: keyword,
    });
  }

  for (const keyword of extractNegativePreferenceKeywords(combinedResponses)) {
    dislikes.push({
      user_id: userId,
      dislike_type: "normalized_response",
      primary_keyword: null,
      descriptor_keywords: [keyword],
      brand: null,
      category: null,
      notes: keyword,
    });
  }

  for (const card of productCardKeywords) {
    if (card.primary_keyword) {
      likes.push({
        user_id: userId,
        like_type: "product_card",
        primary_keyword: card.primary_keyword,
        descriptor_keywords: card.descriptor_keywords,
        brand: card.brand_keywords[0] ?? null,
        category: card.category,
        notes: card.product_card_key,
      });
    }

    for (const negativeKeyword of card.negative_keywords) {
      dislikes.push({
        user_id: userId,
        dislike_type: "product_card",
        primary_keyword: card.primary_keyword,
        descriptor_keywords: [negativeKeyword],
        brand: null,
        category: card.category,
        notes: card.product_card_key,
      });
    }
  }

  return { likes, dislikes };
};

const toKeywordBankRows = (
  productCardKeywords: UserProductCardKeywordRow[],
  likes: UserLikeSignalRow[],
) => {
  const rows = new Map<string, RecommendationKeywordBankRow>();

  const addRow = (primaryKeyword: string | null, descriptorKeyword: string, category: string | null, sourceType: string, weight: number) => {
    if (!primaryKeyword || !descriptorKeyword || !category) return;
    const key = `${category}::${primaryKeyword}::${descriptorKeyword}`;
    rows.set(key, {
      primary_keyword: primaryKeyword,
      descriptor_keyword: descriptorKeyword,
      category,
      weight,
      source_type: sourceType,
      source_version: SOURCE_VERSION,
    });
  };

  for (const row of productCardKeywords) {
    for (const descriptor of row.descriptor_keywords) {
      addRow(row.primary_keyword, descriptor, row.category, "product_card", 1);
    }
  }

  for (const like of likes) {
    for (const descriptor of like.descriptor_keywords) {
      addRow(like.primary_keyword, descriptor, like.category, "explicit_like", 0.8);
    }
  }

  return Array.from(rows.values());
};

const toBrandBankRows = (
  productCardKeywords: UserProductCardKeywordRow[],
  recommendedBrands: string[],
) => {
  const rows = new Map<string, RecommendationBrandBankRow>();

  for (const row of productCardKeywords) {
    for (const brand of row.brand_keywords) {
      if (!row.primary_keyword || !row.category) continue;
      rows.set(`${brand}::${row.primary_keyword}::${row.category}`, {
        brand,
        primary_keyword: row.primary_keyword,
        descriptor_keywords: row.descriptor_keywords,
        category: row.category,
        weight: 1,
        source_type: "product_card",
        source_version: SOURCE_VERSION,
      });
    }
  }

  for (const brand of recommendedBrands) {
    const brandKey = cleanText(brand);
    if (!brandKey) continue;
    for (const row of productCardKeywords.slice(0, 12)) {
      if (!row.primary_keyword || !row.category) continue;
      rows.set(`${brandKey}::${row.primary_keyword}::${row.category}`, {
        brand: brandKey,
        primary_keyword: row.primary_keyword,
        descriptor_keywords: row.descriptor_keywords,
        category: row.category,
        weight: 0.6,
        source_type: "knowledge_derivation",
        source_version: SOURCE_VERSION,
      });
    }
  }

  return Array.from(rows.values());
};

const toBrandLocationRows = (
  locationKeys: string[],
  brandBankRows: RecommendationBrandBankRow[],
) => {
  const rows = new Map<string, RecommendationBrandLocationBankRow>();

  for (const locationKey of locationKeys) {
    for (const row of brandBankRows) {
      const key = `${locationKey}::${row.brand}::${row.category}`;
      const existing = rows.get(key);
      rows.set(key, {
        location_key: locationKey,
        brand: row.brand,
        category: row.category,
        primary_keywords: mergeRecommendationKeywords([
          ...(existing?.primary_keywords ?? []),
          row.primary_keyword,
        ]),
        weight: existing ? Math.max(existing.weight, row.weight) : row.weight,
        source_type: "location_plus_brand",
        source_version: SOURCE_VERSION,
      });
    }
  }

  return Array.from(rows.values());
};

export const buildNormalizedRecommendationState = (
  userId: string,
  snapshot: KnowledgeSnapshotRow | null,
  derivations: KnowledgeDerivationRow[],
): NormalizedRecommendationState => {
  const combinedResponses = getCombinedKnowledgeResponses(snapshot);
  const profileCore = toRecord(snapshot?.profile_core);
  const yourVibe = getKnowledgeDerivationPayload(derivations, "your_vibe");
  const bankKnowledge = getBankKnowledgeDerivation(combinedResponses, yourVibe);
  const recommendedBrands = mergeRecommendationKeywords([
    ...bankKnowledge.recommended_brands,
    ...bankKnowledge.recommended_stores,
    ...getSeedCatalogBrands(),
  ]);
  const recommendedStores = mergeRecommendationKeywords(bankKnowledge.recommended_stores);
  const locationKeys = extractLocationKeys(profileCore);
  const signals = toSignalRows(userId, snapshot, derivations, combinedResponses);
  const productCardKeywords = toProductCardKeywordRows(userId, snapshot);
  const { likes, dislikes } = toLikeAndDislikeRows(userId, combinedResponses, productCardKeywords);
  const keywordBankRows = toKeywordBankRows(productCardKeywords, likes);
  const brandBankRows = toBrandBankRows(productCardKeywords, recommendedBrands);
  const brandLocationRows = toBrandLocationRows(locationKeys, brandBankRows);

  return {
    combinedResponses,
    profileCore,
    yourVibe,
    negativeKeywords: extractNegativePreferenceKeywords(combinedResponses),
    positiveKeywords: extractPositivePreferenceKeywords(combinedResponses),
    recommendedBrands,
    recommendedStores,
    locationKeys,
    signals,
    productCardKeywords,
    likes,
    dislikes,
    keywordBankRows,
    brandBankRows,
    brandLocationRows,
  };
};

export const buildRecommendationSignalSummary = (state: NormalizedRecommendationState) => ({
  signal_count: state.signals.length,
  product_card_keyword_count: state.productCardKeywords.length,
  like_count: state.likes.length,
  dislike_count: state.dislikes.length,
  keyword_bank_seed_count: state.keywordBankRows.length,
  brand_bank_seed_count: state.brandBankRows.length,
  location_bank_seed_count: state.brandLocationRows.length,
  recommended_brands: state.recommendedBrands.slice(0, 12),
  location_keys: state.locationKeys,
});
