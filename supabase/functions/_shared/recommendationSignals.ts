import {
  getBankKnowledgeDerivation,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  normalizeRecommendationKeywords,
} from "./recommendationCatalog.ts";
import type { KnowledgeDerivationRow, KnowledgeSnapshotRow } from "./knowledgeCenter.ts";
import { getCombinedKnowledgeResponses, getKnowledgeDerivationPayload, toRecord, toRecordArray, toStringArray } from "./knowledgeCenter.ts";
import { extractStructuredThisOrThatAnswerSignals, type StructuredThisOrThatSignal } from "./thisOrThatV2.ts";
import { THIS_OR_THAT } from "../../../src/data/knowMeQuestions.ts";
import {
  normalizeRecommendationCategoryKey,
  RECOMMENDATION_CATEGORY_ORDER,
  type RecommendationCategory,
} from "../../../src/lib/recommendationCategories.ts";

type JsonObject = Record<string, unknown>;

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

export interface UserThisOrThatAnswerRow {
  id?: string;
  user_id: string;
  category_id?: string;
  category_key?: string | null;
  question_id?: string;
  question_key?: string;
  question_prompt?: string;
  bank_gender?: string;
  my_go_two_category_slug?: string;
  recommendation_category?: string | null;
  selected_option_key?: string;
  selected_label?: string;
  selected_payload?: JsonObject;
  rejected_option_key?: string;
  rejected_label?: string;
  rejected_payload?: JsonObject;
  response_payload?: JsonObject;
  answer_payload?: JsonObject;
  subgroup_key?: string | null;
  primary_keyword?: string | null;
  descriptor_keywords?: string[] | null;
  brand?: string | null;
  location_keys?: string[] | null;
  source_version: string;
}

export interface UserThisOrThatSignalRow {
  answer_id: string;
  user_id: string;
  question_key: string;
  signal_polarity: string;
  signal_type: string;
  category_key: string | null;
  subgroup_key: string | null;
  recommendation_category: string | null;
  entity_type: string | null;
  entity_key: string | null;
  entity_label: string | null;
  primary_keyword: string | null;
  descriptor_keywords: string[];
  brand: string | null;
  location_keys: string[];
  tags: string[];
  notes: string | null;
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
  thisOrThatAnswers: UserThisOrThatAnswerRow[];
  thisOrThatSignalRows: UserThisOrThatSignalRow[];
  productCardKeywords: UserProductCardKeywordRow[];
  likes: UserLikeSignalRow[];
  dislikes: UserDislikeSignalRow[];
  keywordBankRows: RecommendationKeywordBankRow[];
  brandBankRows: RecommendationBrandBankRow[];
  brandLocationRows: RecommendationBrandLocationBankRow[];
}

export interface RecommendationInputStrength {
  score: number;
  level: "sparse" | "emerging" | "solid" | "rich";
  targetRecommendationCount: number;
  personalizationEnabled: boolean;
  directSignalCount: number;
  structuredSignalCount: number;
  primaryEvidenceCount: number;
  derivedSupportCount: number;
  negativeSignalCount: number;
  supportedBrandCount: number;
  categoryCoverageCount: number;
}

export interface RecommendationMatchAssessment {
  confidence: number;
  reasons: string[];
}

export interface RecommendationCategorySupport {
  category: RecommendationCategory;
  primaryEvidenceCount: number;
  derivedSupportCount: number;
  negativeSignalCount: number;
  score: number;
  state: "locked" | "emerging" | "qualified" | "strong";
  eligible: boolean;
}

const SOURCE_VERSION = "recommendation-v2";
const THIS_OR_THAT_LOOKUP = new Map(THIS_OR_THAT.map((item) => [item.id, item]));
const QUESTION_WORDS = new Set(["would", "do", "are", "team"]);
const PRODUCT_CARD_DESCRIPTOR_STOP_WORDS = new Set([
  "and",
  "brand",
  "brands",
  "color",
  "colors",
  "detail",
  "details",
  "favorite",
  "favourite",
  "favorites",
  "favourites",
  "field",
  "notes",
]);

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
};

const normalizeRecommendationCategory = (value: unknown): RecommendationCategory | null => {
  return normalizeRecommendationCategoryKey(value);
};

const resolveRecommendationCategory = (
  value: unknown,
  ...fallbackValues: Array<unknown>
): RecommendationCategory | null => {
  const direct = normalizeRecommendationCategory(value);
  if (direct) return direct;
  return inferCategoryFromText(value, ...fallbackValues);
};

const toObject = (value: unknown): JsonObject =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonObject) : {};

const toTextArray = (value: unknown) =>
  Array.isArray(value)
    ? value.map((entry) => cleanText(entry)).filter(Boolean)
    : typeof value === "string"
      ? [cleanText(value)].filter(Boolean)
      : [];

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
        .filter((token) => token.length >= 3 && !PRODUCT_CARD_DESCRIPTOR_STOP_WORDS.has(token));
      return [entry.toLowerCase(), ...tokens];
    }),
  );

const extractProductCardDescriptorKeywords = (...values: Array<unknown>) => {
  const descriptors = new Set<string>();

  for (const value of values) {
    for (const phrase of splitPhrases(value)) {
      const normalizedPhrase = cleanText(phrase).toLowerCase();
      const phraseTokens = normalizedPhrase
        .split(/\s+/)
        .map((token) => token.trim())
        .filter(Boolean);

      const meaningfulTokens = phraseTokens.filter((token) =>
        token.length >= 3 && !PRODUCT_CARD_DESCRIPTOR_STOP_WORDS.has(token)
      );

      if (
        meaningfulTokens.length >= 2 &&
        phraseTokens.every((token) => !PRODUCT_CARD_DESCRIPTOR_STOP_WORDS.has(token))
      ) {
        descriptors.add(normalizedPhrase);
      }

      for (const token of meaningfulTokens) descriptors.add(token);
    }
  }

  return normalizeRecommendationKeywords(Array.from(descriptors));
};

const inferCategoryFromText = (...values: Array<unknown>): RecommendationCategory | null => {
  const haystack = values.map((value) => cleanText(value).toLowerCase()).join(" ");
  if (!haystack) return null;

  const checks: Array<[RecommendationCategory, string[]]> = [
    ["clothes", ["shirt", "jean", "pants", "dress", "sneaker", "shoe", "coat", "hoodie", "style", "fit", "wear", "jacket"]],
    ["food", ["coffee", "tea", "restaurant", "meal", "food", "drink", "snack", "cocktail", "grocery", "cuisine", "sushi"]],
    ["tech", ["tech", "headphones", "camera", "laptop", "phone", "speaker", "gaming", "device", "charger"]],
    ["home", ["home", "decor", "bedding", "candle", "kitchen", "rug", "lamp", "furniture", "bath", "living"]],
    ["personal", ["skincare", "beauty", "wellness", "grooming", "fragrance", "body wash", "self care", "serum", "moisturizer"]],
    ["gifts", ["gift", "gifting", "wishlist", "flowers", "gift set", "personalized", "thoughtful"]],
    ["entertainment", ["movie", "music", "book", "streaming", "concert", "game", "gaming", "vinyl", "puzzle", "weekend"]],
    ["travel", ["travel", "trip", "vacation", "getaway", "hotel", "flight", "airline", "weekender", "passport", "packing"]],
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

const mapThisOrThatCategory = (value: string): RecommendationCategory | null =>
  resolveRecommendationCategory(value);

const normalizeAnswerChoice = (answer: unknown, option: string) => {
  const normalizedAnswer = cleanText(answer).toLowerCase();
  const normalizedOption = cleanText(option).toLowerCase();
  if (!normalizedAnswer || !normalizedOption) return false;
  return normalizedAnswer === normalizedOption;
};

const extractPromptBrands = (prompt: string) => {
  const matches = cleanText(prompt).match(/\b[A-Z][A-Za-z&']+(?:\s+[A-Z][A-Za-z&']+)*\b/g) ?? [];
  return normalizeRecommendationKeywords(
    matches
      .map((match) =>
        match
          .split(/\s+/)
          .filter((part) => !QUESTION_WORDS.has(part.toLowerCase()))
          .join(" "),
      )
      .filter(Boolean),
  );
};

type ThisOrThatPreferenceSummary = {
  positiveKeywords: string[];
  negativeKeywords: string[];
  positiveBrands: string[];
  negativeBrands: string[];
  likes: Array<{
    like_type: string;
    primary_keyword: string | null;
    descriptor_keywords: string[];
    brand: string | null;
    category: string | null;
    notes: string | null;
  }>;
  dislikes: Array<{
    dislike_type: string;
    primary_keyword: string | null;
    descriptor_keywords: string[];
    brand: string | null;
    category: string | null;
    notes: string | null;
  }>;
};

const buildStructuredThisOrThatSummary = (
  structuredSignals: StructuredThisOrThatSignal[],
): ThisOrThatPreferenceSummary => {
  const positiveKeywords = new Set<string>();
  const negativeKeywords = new Set<string>();
  const positiveBrands = new Set<string>();
  const negativeBrands = new Set<string>();
  const likes: ThisOrThatPreferenceSummary["likes"] = [];
  const dislikes: ThisOrThatPreferenceSummary["dislikes"] = [];

  for (const signal of structuredSignals) {
    const targetKeywords = signal.polarity === "negative" ? negativeKeywords : positiveKeywords;
    const keywordBundle = mergeRecommendationKeywords([
      signal.primaryKeyword,
      ...signal.descriptorKeywords,
      ...signal.tags,
      signal.entityType === "brand" ? null : signal.entityKey,
    ]);

    for (const keyword of keywordBundle) targetKeywords.add(keyword);

    if (signal.brand) {
      if (signal.polarity === "negative") negativeBrands.add(signal.brand);
      else positiveBrands.add(signal.brand);
      targetKeywords.add(signal.brand);
    }

    const row = {
      primary_keyword: signal.primaryKeyword,
      descriptor_keywords: mergeRecommendationKeywords([
        ...signal.descriptorKeywords,
        ...signal.tags,
        signal.entityType === "brand" ? null : signal.entityKey,
      ]).filter((keyword) => keyword !== signal.primaryKeyword),
      brand: signal.brand,
      category: signal.recommendationCategory,
      notes: signal.notes ?? signal.questionKey ?? signal.questionId ?? signal.signalKey,
    };

    if (signal.polarity === "negative") {
      dislikes.push({
        dislike_type: "this_or_that_v2_structured",
        primary_keyword: row.primary_keyword,
        descriptor_keywords: row.descriptor_keywords,
        brand: row.brand,
        category: row.category,
        notes: row.notes,
      });
    } else {
      likes.push({
        like_type: "this_or_that_v2_structured",
        primary_keyword: row.primary_keyword,
        descriptor_keywords: row.descriptor_keywords,
        brand: row.brand,
        category: row.category,
        notes: row.notes,
      });
    }
  }

  return {
    positiveKeywords: normalizeRecommendationKeywords(Array.from(positiveKeywords)),
    negativeKeywords: normalizeRecommendationKeywords(Array.from(negativeKeywords)),
    positiveBrands: normalizeRecommendationKeywords(Array.from(positiveBrands)),
    negativeBrands: normalizeRecommendationKeywords(Array.from(negativeBrands)),
    likes,
    dislikes,
  };
};

const mergeThisOrThatSummaries = (
  base: ThisOrThatPreferenceSummary,
  addition: ThisOrThatPreferenceSummary,
): ThisOrThatPreferenceSummary => ({
  positiveKeywords: normalizeRecommendationKeywords([
    ...base.positiveKeywords,
    ...addition.positiveKeywords,
  ]),
  negativeKeywords: normalizeRecommendationKeywords([
    ...base.negativeKeywords,
    ...addition.negativeKeywords,
  ]),
  positiveBrands: normalizeRecommendationKeywords([
    ...base.positiveBrands,
    ...addition.positiveBrands,
  ]),
  negativeBrands: normalizeRecommendationKeywords([
    ...base.negativeBrands,
    ...addition.negativeBrands,
  ]),
  likes: [...base.likes, ...addition.likes],
  dislikes: [...base.dislikes, ...addition.dislikes],
});

const extractThisOrThatV2Preferences = (
  answers: UserThisOrThatAnswerRow[],
): ThisOrThatPreferenceSummary => {
  const positiveKeywords = new Set<string>();
  const negativeKeywords = new Set<string>();
  const positiveBrands = new Set<string>();
  const negativeBrands = new Set<string>();
  const likes: ThisOrThatPreferenceSummary["likes"] = [];
  const dislikes: ThisOrThatPreferenceSummary["dislikes"] = [];

  for (const answer of answers) {
    const answerPayload = toObject(answer.answer_payload);
    const selectedPayload = toObject(answer.selected_payload ?? answerPayload.selected_payload);
    const rejectedPayload = toObject(answer.rejected_payload ?? answerPayload.rejected_payload);
    const category = resolveRecommendationCategory(
      answer.recommendation_category,
      selectedPayload.primary_keyword,
      selectedPayload.descriptor_keywords,
      selectedPayload.brand_keywords,
      selectedPayload.tags,
      selectedPayload.entity_label,
      answer.question_prompt,
    );
    const selectedPrimaryKeyword = cleanText(selectedPayload.primary_keyword) || null;
    const rejectedPrimaryKeyword = cleanText(rejectedPayload.primary_keyword) || null;
    const selectedDescriptors = normalizeRecommendationKeywords(
      toTextArray(selectedPayload.descriptor_keywords ?? answer.descriptor_keywords),
    );
    const rejectedDescriptors = normalizeRecommendationKeywords(toTextArray(rejectedPayload.descriptor_keywords));
    const selectedBrands = normalizeRecommendationKeywords(
      toTextArray(selectedPayload.brand_keywords ?? answer.brand),
    );
    const rejectedBrands = normalizeRecommendationKeywords(toTextArray(rejectedPayload.brand_keywords));
    const selectedAvoids = normalizeRecommendationKeywords(toTextArray(selectedPayload.avoid_keywords));

    const positiveBundle = mergeRecommendationKeywords([
      selectedPrimaryKeyword,
      ...selectedDescriptors,
      ...selectedBrands,
    ]);
    const negativeBundle = mergeRecommendationKeywords([
      rejectedPrimaryKeyword,
      ...rejectedDescriptors,
      ...rejectedBrands,
      ...selectedAvoids,
    ]);

    for (const keyword of positiveBundle) positiveKeywords.add(keyword);
    for (const keyword of negativeBundle) negativeKeywords.add(keyword);
    for (const brand of selectedBrands) positiveBrands.add(brand);
    for (const brand of rejectedBrands) negativeBrands.add(brand);

    const noteKey = cleanText(answer.question_id ?? answer.question_key);
    const selectedLikeBrands = selectedBrands.length > 0 ? selectedBrands : [null];
    const rejectedDislikeBrands = rejectedBrands.length > 0 ? rejectedBrands : [null];

    for (const brand of selectedLikeBrands) {
      likes.push({
        like_type: "this_or_that_v2",
        primary_keyword: selectedPrimaryKeyword,
        descriptor_keywords: selectedDescriptors,
        brand,
        category,
        notes: noteKey,
      });
    }

    for (const brand of rejectedDislikeBrands) {
      dislikes.push({
        dislike_type: "this_or_that_v2",
        primary_keyword: rejectedPrimaryKeyword,
        descriptor_keywords: mergeRecommendationKeywords([...rejectedDescriptors, ...selectedAvoids]),
        brand,
        category,
        notes: noteKey,
      });
    }
  }

  return {
    positiveKeywords: normalizeRecommendationKeywords(Array.from(positiveKeywords)),
    negativeKeywords: normalizeRecommendationKeywords(Array.from(negativeKeywords)),
    positiveBrands: normalizeRecommendationKeywords(Array.from(positiveBrands)),
    negativeBrands: normalizeRecommendationKeywords(Array.from(negativeBrands)),
    likes,
    dislikes,
  };
};

const extractThisOrThatPreferences = (
  responses: JsonObject,
  thisOrThatAnswers: UserThisOrThatAnswerRow[] = [],
  snapshotPayload: JsonObject = {},
): ThisOrThatPreferenceSummary => {
  const positiveKeywords = new Set<string>();
  const negativeKeywords = new Set<string>();
  const positiveBrands = new Set<string>();
  const negativeBrands = new Set<string>();
  const likes: ThisOrThatPreferenceSummary["likes"] = [];
  const dislikes: ThisOrThatPreferenceSummary["dislikes"] = [];

  const v2Preferences = extractThisOrThatV2Preferences(thisOrThatAnswers);
  for (const keyword of v2Preferences.positiveKeywords) positiveKeywords.add(keyword);
  for (const keyword of v2Preferences.negativeKeywords) negativeKeywords.add(keyword);
  for (const brand of v2Preferences.positiveBrands) positiveBrands.add(brand);
  for (const brand of v2Preferences.negativeBrands) negativeBrands.add(brand);
  likes.push(...v2Preferences.likes);
  dislikes.push(...v2Preferences.dislikes);

  for (const [key, answer] of Object.entries(responses)) {
    if (!key.startsWith("tot-")) continue;
    const question = THIS_OR_THAT_LOOKUP.get(key);
    if (!question) continue;

    const category = mapThisOrThatCategory(question.category);
    const prompt = cleanText(question.prompt);
    const optionA = cleanText(question.optionA);
    const optionB = cleanText(question.optionB);
    const yesNoPrompt = optionA.toLowerCase() === "yes" && optionB.toLowerCase() === "no";

    const brands = extractPromptBrands(prompt);

    if (yesNoPrompt && brands.length > 0) {
      if (normalizeAnswerChoice(answer, optionA)) {
        for (const brand of brands) {
          positiveBrands.add(brand);
          positiveKeywords.add(brand);
          likes.push({
            like_type: "this_or_that_brand",
            primary_keyword: null,
            descriptor_keywords: [],
            brand,
            category,
            notes: key,
          });
        }
      }

      if (normalizeAnswerChoice(answer, optionB)) {
        for (const brand of brands) {
          negativeBrands.add(brand);
          negativeKeywords.add(brand);
          dislikes.push({
            dislike_type: "this_or_that_brand",
            primary_keyword: null,
            descriptor_keywords: [],
            brand,
            category,
            notes: key,
          });
        }
      }

      continue;
    }

    const preferMatch = yesNoPrompt
      ? prompt.match(/prefer\s+(.+?)\s+over\s+(.+?)(?:\?|$)/i)
      : null;

    const chosenOption = preferMatch
      ? normalizeAnswerChoice(answer, optionA)
        ? preferMatch[1]
        : normalizeAnswerChoice(answer, optionB)
          ? preferMatch[2]
          : null
      : normalizeAnswerChoice(answer, optionA)
        ? optionA
        : normalizeAnswerChoice(answer, optionB)
          ? optionB
          : null;

    if (!chosenOption) continue;

    const normalizedChoice = cleanText(chosenOption).toLowerCase();
    if (!normalizedChoice) continue;

    positiveKeywords.add(normalizedChoice);
    for (const token of keywordTokens(normalizedChoice)) positiveKeywords.add(token);

    likes.push({
      like_type: "this_or_that_choice",
      primary_keyword: null,
      descriptor_keywords: mergeRecommendationKeywords([normalizedChoice]),
      brand: null,
      category,
      notes: key,
    });
  }

  const baseSummary: ThisOrThatPreferenceSummary = {
    positiveKeywords: normalizeRecommendationKeywords(Array.from(positiveKeywords)),
    negativeKeywords: normalizeRecommendationKeywords(Array.from(negativeKeywords)),
    positiveBrands: normalizeRecommendationKeywords(Array.from(positiveBrands)),
    negativeBrands: normalizeRecommendationKeywords(Array.from(negativeBrands)),
    likes,
    dislikes,
  };

  const structuredSignals = extractStructuredThisOrThatAnswerSignals(responses, snapshotPayload);
  if (structuredSignals.length === 0) return baseSummary;

  return mergeThisOrThatSummaries(baseSummary, buildStructuredThisOrThatSummary(structuredSignals));
};

const extractNegativePreferenceKeywords = (
  responses: JsonObject,
  thisOrThatAnswers: UserThisOrThatAnswerRow[] = [],
  snapshotPayload: JsonObject = {},
) => {
  const negatives = new Set<string>();
  const thisOrThatPreferences = extractThisOrThatPreferences(responses, thisOrThatAnswers, snapshotPayload);

  for (const [key, value] of Object.entries(responses)) {
    if (!/(avoid|dislike|hate|turnoff|turn off|pet[-\s]?peeve|no go|allerg|sensitive)/i.test(key)) continue;
    for (const phrase of splitPhrases(value)) {
      negatives.add(phrase.toLowerCase());
      for (const token of keywordTokens(phrase)) negatives.add(token);
    }
  }

  for (const keyword of thisOrThatPreferences.negativeKeywords) negatives.add(keyword);
  for (const brand of thisOrThatPreferences.negativeBrands) negatives.add(brand);

  return normalizeRecommendationKeywords(Array.from(negatives));
};

const extractPositivePreferenceKeywords = (
  responses: JsonObject,
  thisOrThatAnswers: UserThisOrThatAnswerRow[] = [],
  snapshotPayload: JsonObject = {},
) => {
  const positives = new Set<string>();
  const thisOrThatPreferences = extractThisOrThatPreferences(responses, thisOrThatAnswers, snapshotPayload);

  for (const [key, value] of Object.entries(responses)) {
    if (/(favorite|favourite|love|likes|preferred|best|go-to|go to|preference)/i.test(key)) {
      for (const phrase of splitPhrases(value)) {
        positives.add(phrase.toLowerCase());
        for (const token of keywordTokens(phrase)) positives.add(token);
      }
    }
  }

  for (const keyword of thisOrThatPreferences.positiveKeywords) positives.add(keyword);
  for (const brand of thisOrThatPreferences.positiveBrands) positives.add(brand);

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
  thisOrThatAnswers: UserThisOrThatAnswerRow[],
  snapshotPayload: JsonObject,
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

  for (const answer of thisOrThatAnswers) {
    signals.push({
      user_id: userId,
      signal_type: "this_or_that_v2_answer",
      signal_key: cleanText(answer.question_id ?? answer.question_key),
      signal_value: toObject(answer.response_payload ?? answer.answer_payload),
      signal_source: "this_or_that_v2_answers",
      signal_strength: 85,
      is_negative: false,
      recorded_at: now,
    });
  }

  for (const signal of extractStructuredThisOrThatAnswerSignals(combinedResponses, snapshotPayload)) {
    signals.push({
      user_id: userId,
      signal_type: "this_or_that_v2_structured",
      signal_key: signal.questionKey ?? signal.questionId ?? signal.signalKey,
      signal_value: {
        question_key: signal.questionKey,
        question_id: signal.questionId,
        category_key: signal.categoryKey,
        subgroup_key: signal.subgroupKey,
        recommendation_category: signal.recommendationCategory,
        entity_type: signal.entityType,
        entity_key: signal.entityKey,
        entity_label: signal.entityLabel,
        primary_keyword: signal.primaryKeyword,
        descriptor_keywords: signal.descriptorKeywords,
        brand: signal.brand,
        location_keys: signal.locationKeys,
        tags: signal.tags,
        polarity: signal.polarity,
      },
      signal_source: "this_or_that_v2_answers",
      signal_strength: signal.polarity === "negative" ? 82 : 80,
      is_negative: signal.polarity === "negative",
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

  for (const keyword of extractNegativePreferenceKeywords(combinedResponses, thisOrThatAnswers, snapshotPayload)) {
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

const toThisOrThatSignalRows = (
  userId: string,
  answers: UserThisOrThatAnswerRow[],
  combinedResponses: JsonObject,
  snapshotPayload: JsonObject,
): UserThisOrThatSignalRow[] => {
  const rows = new Map<string, UserThisOrThatSignalRow>();

  const addRow = (
    answerId: string,
    questionId: string,
    categoryId: string,
    signalKind: string,
    signalKey: string,
    signalValue: JsonObject,
    weight: number,
    isNegative: boolean,
  ) => {
    const normalizedKey = cleanText(signalKey).toLowerCase();
    if (!normalizedKey) return;
    const rowKey = `${questionId}::${signalKind}::${normalizedKey}::${isNegative ? "neg" : "pos"}`;
    const recommendationCategory = resolveRecommendationCategory(
      signalValue.recommendation_category || signalValue.category_slug,
      signalValue.primary_keyword,
      signalValue.descriptor_keywords,
      signalValue.brand_keywords,
      signalValue.brand,
      signalValue.tags,
      signalValue.entity_label,
    );
    const subgroupKey =
      cleanText(signalValue.subcategory_slug || signalValue.subgroup_key) || null;
    const entityType =
      cleanText(signalValue.entity_kind || signalValue.entity_type) || null;
    const entityKey =
      cleanText(signalValue.entity_slug || signalValue.entity_key) || null;
    const entityLabel = cleanText(signalValue.entity_label || signalValue.label) || null;
    const primaryKeyword = cleanText(signalValue.primary_keyword) || null;
    const descriptorKeywords = normalizeRecommendationKeywords(
      toTextArray(signalValue.descriptor_keywords),
    );
    const tags = normalizeRecommendationKeywords([
      ...toTextArray(signalValue.tags),
      ...toTextArray(signalValue.avoid_keywords),
    ]);
    const normalizedBrands = normalizeRecommendationKeywords(
      toTextArray(signalValue.brand_keywords ?? signalValue.brand),
    );
    const brand =
      signalKind === "brand_keyword"
        ? normalizedKey
        : normalizedBrands[0] ?? null;
    const locationKeys = normalizeRecommendationKeywords(
      toTextArray(signalValue.location_keywords ?? signalValue.location_keys),
    );
    rows.set(rowKey, {
      answer_id: answerId,
      user_id: userId,
      question_key: questionId,
      signal_polarity: isNegative ? "negative" : "positive",
      signal_type: signalKind,
      category_key: categoryId || cleanText(signalValue.category_key || signalValue.my_go_two_category_slug) || null,
      subgroup_key: subgroupKey,
      recommendation_category: recommendationCategory,
      entity_type: entityType,
      entity_key: entityKey,
      entity_label: entityLabel,
      primary_keyword: primaryKeyword,
      descriptor_keywords: descriptorKeywords,
      brand,
      location_keys: locationKeys,
      tags,
      notes: `${signalKind}:${normalizedKey}:weight=${weight}`,
      source_version: SOURCE_VERSION,
    });
  };

  for (const [index, answer] of answers.entries()) {
    const answerPayload = toObject(answer.answer_payload);
    const selectedPayload = toObject(answer.selected_payload ?? answerPayload.selected_payload);
    const rejectedPayload = toObject(answer.rejected_payload ?? answerPayload.rejected_payload);
    const questionKey = cleanText(answer.question_id ?? answer.question_key);
    const answerId = cleanText(answer.id) || `${userId}:${questionKey || `this-or-that-${index}`}`;
    const categoryKey = cleanText(answer.category_id ?? answer.category_key);
    const selectedPrimaryKeyword = cleanText(selectedPayload.primary_keyword);
    const rejectedPrimaryKeyword = cleanText(rejectedPayload.primary_keyword);
    const selectedDescriptors = normalizeRecommendationKeywords(
      toTextArray(selectedPayload.descriptor_keywords ?? answer.descriptor_keywords),
    );
    const rejectedDescriptors = normalizeRecommendationKeywords(toTextArray(rejectedPayload.descriptor_keywords));
    const selectedBrands = normalizeRecommendationKeywords(
      toTextArray(selectedPayload.brand_keywords ?? answer.brand),
    );
    const rejectedBrands = normalizeRecommendationKeywords(toTextArray(rejectedPayload.brand_keywords));
    const selectedAvoids = normalizeRecommendationKeywords(toTextArray(selectedPayload.avoid_keywords));
    const selectedCategory =
      cleanText(selectedPayload.subcategory_slug || answer.subgroup_key) || categoryKey;
    const selectedEntity = cleanText(selectedPayload.entity_slug);
    const selectedMyGoTwo =
      cleanText(selectedPayload.my_go_two_category_slug) ||
      cleanText(answer.my_go_two_category_slug) ||
      categoryKey;
    const selectedWeight = Number(selectedPayload.weight ?? 1) || 1;

    if (selectedPrimaryKeyword) {
      addRow(answerId, questionKey, categoryKey, "primary_keyword", selectedPrimaryKeyword, selectedPayload, selectedWeight, false);
    }
    for (const descriptor of selectedDescriptors) {
      addRow(answerId, questionKey, categoryKey, "descriptor_keyword", descriptor, selectedPayload, selectedWeight, false);
    }
    for (const brand of selectedBrands) {
      addRow(answerId, questionKey, categoryKey, "brand_keyword", brand, selectedPayload, selectedWeight, false);
    }
    if (selectedCategory) {
      addRow(answerId, questionKey, categoryKey, "subcategory", selectedCategory, selectedPayload, selectedWeight, false);
    }
    if (selectedEntity) {
      addRow(answerId, questionKey, categoryKey, "entity", selectedEntity, selectedPayload, selectedWeight, false);
    }
    if (selectedMyGoTwo) {
      addRow(answerId, questionKey, categoryKey, "my_go_two_category", selectedMyGoTwo, selectedPayload, selectedWeight, false);
    }

    if (rejectedPrimaryKeyword) {
      addRow(answerId, questionKey, categoryKey, "primary_keyword", rejectedPrimaryKeyword, rejectedPayload, selectedWeight, true);
    }
    for (const descriptor of mergeRecommendationKeywords([...rejectedDescriptors, ...selectedAvoids])) {
      addRow(answerId, questionKey, categoryKey, "descriptor_keyword", descriptor, rejectedPayload, selectedWeight, true);
    }
    for (const brand of rejectedBrands) {
      addRow(answerId, questionKey, categoryKey, "brand_keyword", brand, rejectedPayload, selectedWeight, true);
    }
  }

  for (const signal of extractStructuredThisOrThatAnswerSignals(combinedResponses, snapshotPayload)) {
    const signalPayload: JsonObject = {
      question_key: signal.questionKey,
      question_id: signal.questionId,
      category_key: signal.categoryKey,
      subgroup_key: signal.subgroupKey,
      entity_type: signal.entityType,
      entity_key: signal.entityKey,
      entity_label: signal.entityLabel,
      primary_keyword: signal.primaryKeyword,
      descriptor_keywords: signal.descriptorKeywords,
      brand: signal.brand,
      tags: signal.tags,
      location_keys: signal.locationKeys,
    };
    const questionId = signal.questionId ?? signal.questionKey ?? signal.signalKey;
    const categoryId = signal.categoryKey ?? "this_or_that_v2";

    if (signal.primaryKeyword) {
      addRow(`structured-${questionId}`, questionId, categoryId, "primary_keyword", signal.primaryKeyword, signalPayload, 1, signal.polarity === "negative");
    }
    for (const descriptor of signal.descriptorKeywords) {
      addRow(`structured-${questionId}`, questionId, categoryId, "descriptor_keyword", descriptor, signalPayload, 0.9, signal.polarity === "negative");
    }
    for (const tag of signal.tags) {
      addRow(`structured-${questionId}`, questionId, categoryId, "tag_keyword", tag, signalPayload, 0.75, signal.polarity === "negative");
    }
    if (signal.brand) {
      addRow(`structured-${questionId}`, questionId, categoryId, "brand_keyword", signal.brand, signalPayload, 1, signal.polarity === "negative");
    }
    if (signal.entityKey && signal.entityType !== "brand") {
      addRow(`structured-${questionId}`, questionId, categoryId, "entity", signal.entityKey, signalPayload, 0.85, signal.polarity === "negative");
    }
  }

  return Array.from(rows.values());
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
    const descriptorKeywords = extractProductCardDescriptorKeywords(
      subcategoryLabel,
      cardTitle,
      ...Object.values(fieldValues),
    ).filter((keyword) =>
      keyword !== primaryKeyword && !PRODUCT_CARD_DESCRIPTOR_STOP_WORDS.has(keyword)
    );
    const negativeKeywords = mergeRecommendationKeywords(
      Object.entries(fieldValues)
        .filter(([key]) => /(avoid|dislike|hate|allerg|sensitive|no go)/i.test(key))
        .flatMap(([, value]) => splitPhrases(value)),
    );
    const explicitBrandValues = Object.entries(fieldValues)
      .filter(([key]) => /(brand|brands|store|stores|retailer|retailers|shop|shops)/i.test(key))
      .flatMap(([, value]) => splitPhrases(value));
    const brandKeywords = explicitBrandValues.length > 0
      ? mergeRecommendationKeywords(explicitBrandValues)
      : extractBrandKeywords(subcategoryLabel, cardTitle);

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
  thisOrThatAnswers: UserThisOrThatAnswerRow[],
  snapshotPayload: JsonObject,
) => {
  const likes: UserLikeSignalRow[] = [];
  const dislikes: UserDislikeSignalRow[] = [];
  const thisOrThatPreferences = extractThisOrThatPreferences(combinedResponses, thisOrThatAnswers, snapshotPayload);

  for (const keyword of extractPositivePreferenceKeywords(combinedResponses, thisOrThatAnswers, snapshotPayload)) {
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

  for (const keyword of extractNegativePreferenceKeywords(combinedResponses, thisOrThatAnswers, snapshotPayload)) {
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

  for (const like of thisOrThatPreferences.likes) {
    likes.push({
      user_id: userId,
      like_type: like.like_type,
      primary_keyword: like.primary_keyword,
      descriptor_keywords: like.descriptor_keywords,
      brand: like.brand,
      category: like.category,
      notes: like.notes,
    });
  }

  for (const dislike of thisOrThatPreferences.dislikes) {
    dislikes.push({
      user_id: userId,
      dislike_type: dislike.dislike_type,
      primary_keyword: dislike.primary_keyword,
      descriptor_keywords: dislike.descriptor_keywords,
      brand: dislike.brand,
      category: dislike.category,
      notes: dislike.notes,
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
  thisOrThatSignalRows: UserThisOrThatSignalRow[],
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

  for (const row of thisOrThatSignalRows) {
    if (row.signal_polarity !== "positive" || !row.recommendation_category) continue;
    const category = normalizeRecommendationCategory(row.recommendation_category);
    if (!category || !row.primary_keyword) continue;

    if (row.signal_type === "primary_keyword") {
      for (const descriptor of row.descriptor_keywords) {
        addRow(row.primary_keyword, descriptor, category, "this_or_that_v2", 0.95);
      }
      for (const descriptor of row.tags) {
        addRow(row.primary_keyword, descriptor, category, "this_or_that_v2_tag", 0.75);
      }
    } else if (row.signal_type === "descriptor_keyword") {
      addRow(row.primary_keyword, row.entity_key ?? row.descriptor_keywords[0] ?? "", category, "this_or_that_v2", 0.85);
    } else if (row.signal_type === "tag_keyword") {
      addRow(row.primary_keyword, row.entity_key ?? row.tags[0] ?? "", category, "this_or_that_v2_tag", 0.7);
    }
  }

  return Array.from(rows.values());
};

const toBrandBankRows = (
  productCardKeywords: UserProductCardKeywordRow[],
  recommendedBrands: string[],
  thisOrThatSignalRows: UserThisOrThatSignalRow[],
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

  for (const row of thisOrThatSignalRows) {
    if (row.signal_polarity !== "positive" || row.signal_type !== "brand_keyword" || !row.brand) continue;
    const category = normalizeRecommendationCategory(row.recommendation_category);
    const primaryKeyword = normalizePrimaryKeyword(row.primary_keyword ?? row.entity_label ?? row.entity_key ?? "");
    if (!category || !primaryKeyword) continue;
    rows.set(`${row.brand}::${primaryKeyword}::${category}`, {
      brand: row.brand,
      primary_keyword: primaryKeyword,
      descriptor_keywords: mergeRecommendationKeywords([
        ...row.descriptor_keywords,
        ...row.tags,
        row.entity_label,
      ]),
      category,
      weight: 0.9,
      source_type: "this_or_that_v2",
      source_version: SOURCE_VERSION,
    });
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
  thisOrThatAnswers: UserThisOrThatAnswerRow[] = [],
): NormalizedRecommendationState => {
  const combinedResponses = getCombinedKnowledgeResponses(snapshot);
  const snapshotPayload = toRecord(snapshot?.snapshot_payload);
  const profileCore = toRecord(snapshot?.profile_core);
  const yourVibe = getKnowledgeDerivationPayload(derivations, "your_vibe");
  const bankKnowledge = getBankKnowledgeDerivation(combinedResponses, yourVibe);
  const thisOrThatPreferences = extractThisOrThatPreferences(combinedResponses, thisOrThatAnswers, snapshotPayload);
  const recommendedBrands = mergeRecommendationKeywords([
    ...toStringArray(yourVibe.recommended_brands),
    ...bankKnowledge.recommended_brands,
    ...bankKnowledge.recommended_stores,
    ...thisOrThatPreferences.positiveBrands,
  ]);
  const recommendedStores = mergeRecommendationKeywords([
    ...toStringArray(yourVibe.recommended_stores),
    ...bankKnowledge.recommended_stores,
  ]);
  const locationKeys = extractLocationKeys(profileCore);
  const signals = toSignalRows(userId, snapshot, derivations, combinedResponses, thisOrThatAnswers, snapshotPayload);
  const thisOrThatSignalRows = toThisOrThatSignalRows(userId, thisOrThatAnswers, combinedResponses, snapshotPayload);
  const productCardKeywords = toProductCardKeywordRows(userId, snapshot);
  const { likes, dislikes } = toLikeAndDislikeRows(userId, combinedResponses, productCardKeywords, thisOrThatAnswers, snapshotPayload);
  const keywordBankRows = toKeywordBankRows(productCardKeywords, likes, thisOrThatSignalRows);
  const brandBankRows = toBrandBankRows(productCardKeywords, recommendedBrands, thisOrThatSignalRows);
  const brandLocationRows = toBrandLocationRows(locationKeys, brandBankRows);

  return {
    combinedResponses,
    profileCore,
    yourVibe,
    negativeKeywords: extractNegativePreferenceKeywords(combinedResponses, thisOrThatAnswers, snapshotPayload),
    positiveKeywords: extractPositivePreferenceKeywords(combinedResponses, thisOrThatAnswers, snapshotPayload),
    recommendedBrands,
    recommendedStores,
    locationKeys,
    signals,
    thisOrThatAnswers,
    thisOrThatSignalRows,
    productCardKeywords,
    likes,
    dislikes,
    keywordBankRows,
    brandBankRows,
    brandLocationRows,
  };
};

export const buildRecommendationSignalSummary = (state: NormalizedRecommendationState) => {
  const inputStrength = buildRecommendationInputStrength(state);
  const categorySupport = buildRecommendationCategorySupport(state);
  const prioritizedBrands = Array.from(new Set(
    state.brandBankRows
      .slice()
      .sort((a, b) => b.weight - a.weight)
      .map((row) => row.brand),
  ));

  return {
    signal_count: state.signals.length,
    this_or_that_answer_count: state.thisOrThatAnswers.length,
    this_or_that_signal_count: state.thisOrThatSignalRows.length,
    product_card_keyword_count: state.productCardKeywords.length,
    like_count: state.likes.length,
    dislike_count: state.dislikes.length,
    keyword_bank_seed_count: state.keywordBankRows.length,
    brand_bank_seed_count: state.brandBankRows.length,
    location_bank_seed_count: state.brandLocationRows.length,
    input_strength_score: inputStrength.score,
    input_strength_level: inputStrength.level,
    recommendation_mode: inputStrength.personalizationEnabled ? "personalized-hybrid" : "popular-fallback",
    recommendation_target_count: inputStrength.targetRecommendationCount,
    direct_signal_count: inputStrength.directSignalCount,
    structured_signal_count: inputStrength.structuredSignalCount,
    negative_signal_count: inputStrength.negativeSignalCount,
    supported_brand_count: inputStrength.supportedBrandCount,
    category_coverage_count: inputStrength.categoryCoverageCount,
    category_states: categorySupport.map((entry) => ({
      category: entry.category,
      state: entry.state,
      score: entry.score,
      primary_evidence_count: entry.primaryEvidenceCount,
      negative_signal_count: entry.negativeSignalCount,
    })),
    recommended_brands: prioritizedBrands.slice(0, 12),
    location_keys: state.locationKeys,
  };
};

const buildPrimarySupportedBrands = (state: NormalizedRecommendationState) =>
  Array.from(new Set([
    ...state.productCardKeywords.flatMap((row) => row.brand_keywords),
    ...state.likes.map((row) => cleanText(row.brand).toLowerCase()).filter(Boolean),
    ...state.thisOrThatSignalRows
      .filter((row) => row.signal_type === "brand_keyword" && row.signal_polarity === "positive")
      .map((row) => cleanText(row.brand).toLowerCase())
      .filter(Boolean),
  ]));

const buildDerivedSupportedBrands = (state: NormalizedRecommendationState) =>
  Array.from(new Set([
    ...toStringArray(state.yourVibe.recommended_brands),
    ...toStringArray(state.yourVibe.recommended_stores),
    ...state.brandBankRows.map((row) => cleanText(row.brand).toLowerCase()).filter(Boolean),
  ]));

export const buildRecommendationCategorySupport = (
  state: NormalizedRecommendationState,
): RecommendationCategorySupport[] => {
  const categories: RecommendationCategory[] = RECOMMENDATION_CATEGORY_ORDER;

  return categories.map((category) => {
    const primaryEvidenceCount =
      state.productCardKeywords.filter((row) => row.category === category).length * 3 +
      state.likes.filter((row) => row.category === category).length * 2 +
      state.thisOrThatAnswers.filter((row) =>
        resolveRecommendationCategory(
          row.recommendation_category,
          row.primary_keyword,
          row.descriptor_keywords,
          row.brand,
          row.selected_label,
          row.question_prompt,
        ) === category
      ).length * 2 +
      state.thisOrThatSignalRows
        .filter((row) =>
          resolveRecommendationCategory(
            row.recommendation_category,
            row.primary_keyword,
            row.descriptor_keywords,
            row.brand,
            row.tags,
            row.entity_label,
          ) === category && row.signal_polarity === "positive"
        )
        .reduce((sum, row) => {
          if (row.signal_type === "brand_keyword") return sum + 2;
          if (row.signal_type === "primary_keyword") return sum + 2;
          if (row.signal_type === "descriptor_keyword") return sum + 1;
          return sum + 0.5;
        }, 0);

    const negativeSignalCount =
      state.dislikes.filter((row) => row.category === category).length * 2 +
      state.thisOrThatSignalRows
        .filter((row) =>
          resolveRecommendationCategory(
            row.recommendation_category,
            row.primary_keyword,
            row.descriptor_keywords,
            row.brand,
            row.tags,
            row.entity_label,
          ) === category && row.signal_polarity === "negative"
        )
        .reduce((sum, row) => {
          if (row.signal_type === "brand_keyword") return sum + 2;
          if (row.signal_type === "primary_keyword") return sum + 2;
          if (row.signal_type === "descriptor_keyword") return sum + 1;
          return sum + 0.5;
        }, 0);

    const derivedSupportCount =
      state.brandBankRows.filter((row) => row.category === category).length > 0 ? 1 : 0;

    const score = Math.max(0, primaryEvidenceCount + derivedSupportCount - negativeSignalCount);
    const stateLevel =
      primaryEvidenceCount >= 10 ? "strong" :
      primaryEvidenceCount >= 7 ? "qualified" :
      primaryEvidenceCount >= 4 ? "emerging" :
      "locked";

    return {
      category,
      primaryEvidenceCount,
      derivedSupportCount,
      negativeSignalCount,
      score,
      state: stateLevel,
      eligible: stateLevel === "qualified" || stateLevel === "strong",
    };
  });
};

export const buildRecommendationInputStrength = (
  state: NormalizedRecommendationState,
): RecommendationInputStrength => {
  const primarySupportedBrands = buildPrimarySupportedBrands(state);
  const derivedSupportedBrands = buildDerivedSupportedBrands(state);
  const categorySupport = buildRecommendationCategorySupport(state);
  const directSignalCount = Object.keys(state.combinedResponses).length + state.productCardKeywords.length;
  const structuredSignalCount =
    state.thisOrThatAnswers.length +
    state.likes.length +
    state.dislikes.length;
  const primaryEvidenceCount = directSignalCount + structuredSignalCount;
  const derivedSupportCount =
    Math.min(state.brandBankRows.length, 6) +
    Math.min(derivedSupportedBrands.length, 6);
  const negativeSignalCount = state.dislikes.length + state.negativeKeywords.length;
  const supportedBrandCount = primarySupportedBrands.length;
  const categoryCoverageCount = categorySupport
    .filter((entry) => entry.eligible)
    .length;
  const strongCategoryCount = categorySupport.filter((entry) => entry.state === "strong").length;
  const qualifiedCategoryCount = categorySupport.filter((entry) => entry.state === "qualified").length;

  const score = Math.min(
    100,
    Math.round(
      Math.min(primaryEvidenceCount, 20) * 3 +
      Math.min(derivedSupportCount, 10) * 0.5 +
      Math.min(negativeSignalCount, 8) * 1.5 +
      Math.min(supportedBrandCount, 8) * 2.5 +
      Math.min(categoryCoverageCount, 4) * 8,
    ),
  );

  const personalizationEnabled = (strongCategoryCount + qualifiedCategoryCount) >= 1;
  const targetRecommendationCount = 4;

  if (score >= 80) {
    return {
      score,
      level: "rich",
      targetRecommendationCount,
      personalizationEnabled,
      directSignalCount,
      structuredSignalCount,
      primaryEvidenceCount,
      derivedSupportCount,
      negativeSignalCount,
      supportedBrandCount,
      categoryCoverageCount,
    };
  }

  if (score >= 58) {
    return {
      score,
      level: "solid",
      targetRecommendationCount,
      personalizationEnabled,
      directSignalCount,
      structuredSignalCount,
      primaryEvidenceCount,
      derivedSupportCount,
      negativeSignalCount,
      supportedBrandCount,
      categoryCoverageCount,
    };
  }

  if (score >= 32) {
    return {
      score,
      level: "emerging",
      targetRecommendationCount,
      personalizationEnabled,
      directSignalCount,
      structuredSignalCount,
      primaryEvidenceCount,
      derivedSupportCount,
      negativeSignalCount,
      supportedBrandCount,
      categoryCoverageCount,
    };
  }

  return {
    score,
    level: "sparse",
    targetRecommendationCount,
    personalizationEnabled: false,
    directSignalCount,
    structuredSignalCount,
    primaryEvidenceCount,
    derivedSupportCount,
    negativeSignalCount,
    supportedBrandCount,
    categoryCoverageCount,
  };
};

export const buildRecommendationMatchAssessment = (
  state: NormalizedRecommendationState,
  intent: {
    category: string;
    brand: string;
    primary_keyword?: string | null;
    keywords?: string[] | null;
  },
): RecommendationMatchAssessment => {
  const reasons: string[] = [];
  const category = cleanText(intent.category).toLowerCase();
  const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? "");
  const descriptorKeywords = normalizeRecommendationKeywords(intent.keywords ?? []);
  const positiveKeywordSet = new Set(state.positiveKeywords);
  const negativeKeywordSet = new Set(state.negativeKeywords);
  const inputStrength = buildRecommendationInputStrength(state);
  const categorySupport = buildRecommendationCategorySupport(state).find((entry) => entry.category === category);
  const primarySupportedBrands = new Set(buildPrimarySupportedBrands(state));
  const derivedSupportedBrands = new Set(buildDerivedSupportedBrands(state));

  let score = inputStrength.primaryEvidenceCount * 2.2 + inputStrength.categoryCoverageCount * 6;

  if (primarySupportedBrands.has(cleanText(intent.brand).toLowerCase())) {
    score += 22;
    reasons.push("brand-aligned");
  } else if (derivedSupportedBrands.has(cleanText(intent.brand).toLowerCase())) {
    score += 8;
    reasons.push("brand-derived-support");
  } else {
    score -= 16;
    reasons.push("brand-not-yet-proven");
  }

  if (primaryKeyword && positiveKeywordSet.has(primaryKeyword)) {
    score += 16;
    reasons.push("primary-keyword-supported");
  }

  const descriptorMatches = descriptorKeywords.filter((keyword) => positiveKeywordSet.has(keyword));
  if (descriptorMatches.length > 0) {
    score += Math.min(18, descriptorMatches.length * 6);
    reasons.push(`descriptor-match:${descriptorMatches.slice(0, 3).join(",")}`);
  }

  const categorySignalCount =
    state.productCardKeywords.filter((row) => row.category === category).length +
    state.likes.filter((row) => row.category === category).length +
    state.thisOrThatSignalRows.filter((row) =>
      resolveRecommendationCategory(
        row.recommendation_category,
        row.primary_keyword,
        row.descriptor_keywords,
        row.brand,
        row.tags,
        row.entity_label,
      ) === category
    ).length;
  if (categorySignalCount > 0) {
    score += Math.min(16, categorySignalCount * 3);
    reasons.push("category-supported");
  } else {
    score -= 10;
    reasons.push("category-thin");
  }

  if (categorySupport?.state === "locked") {
    score -= 22;
    reasons.push("category-locked");
  } else if (categorySupport?.state === "emerging") {
    score -= 10;
    reasons.push("category-emerging");
  } else if (categorySupport?.state === "qualified") {
    score += 8;
    reasons.push("category-qualified");
  } else if (categorySupport?.state === "strong") {
    score += 14;
    reasons.push("category-strong");
  }

  if (
    !primarySupportedBrands.has(cleanText(intent.brand).toLowerCase()) &&
    !(primaryKeyword && positiveKeywordSet.has(primaryKeyword)) &&
    descriptorMatches.length === 0
  ) {
    score -= 14;
    reasons.push("low-direct-support");
  }

  if (!categorySupport?.eligible) {
    score = Math.min(score, 54);
    reasons.push("category-below-threshold");
  }

  if (
    [primaryKeyword, cleanText(intent.brand).toLowerCase(), ...descriptorKeywords].some((keyword) =>
      keyword && negativeKeywordSet.has(keyword),
    )
  ) {
    score -= 35;
    reasons.push("negative-signal-conflict");
  }

  return {
    confidence: Math.max(0, Math.min(100, Math.round(score))),
    reasons: reasons.slice(0, 4),
  };
};
