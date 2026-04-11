import {
  normalizePrimaryKeyword,
  normalizeRecommendationKeywords,
} from "./recommendationCatalog.ts";
import { normalizeRecommendationCategoryKey } from "../../../src/lib/recommendationCategories.ts";

type JsonObject = Record<string, unknown>;

export type StructuredThisOrThatSignal = {
  signalKey: string;
  questionKey: string | null;
  questionId: string | null;
  categoryKey: string | null;
  subgroupKey: string | null;
  recommendationCategory: string | null;
  entityType: string | null;
  entityKey: string | null;
  entityLabel: string | null;
  primaryKeyword: string | null;
  descriptorKeywords: string[];
  brand: string | null;
  locationKeys: string[];
  tags: string[];
  polarity: "positive" | "negative";
  notes: string | null;
};

type StructuredThisOrThatOption = {
  optionId: string | null;
  optionKey: string | null;
  label: string | null;
  categoryKey: string | null;
  subgroupKey: string | null;
  entityType: string | null;
  entityKey: string | null;
  entityLabel: string | null;
  primaryKeyword: string | null;
  descriptorKeywords: string[];
  brand: string | null;
  locationKeys: string[];
  tags: string[];
  polarity: "positive" | "negative";
};

type StructuredThisOrThatAnswer = {
  signalKey: string;
  questionKey: string | null;
  questionId: string | null;
  categoryKey: string | null;
  subgroupKey: string | null;
  selectedOption: StructuredThisOrThatOption | null;
  rejectedOption: StructuredThisOrThatOption | null;
  recordRejectedAsNegative: boolean;
};

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
};

const toObject = (value: unknown): JsonObject =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};

const toArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const toStringArray = (value: unknown): string[] =>
  normalizeRecommendationKeywords(
    toArray(value)
      .map((entry) => cleanText(entry))
      .filter(Boolean),
  );

const normalizeRecommendationCategory = (value: unknown): string | null => {
  return normalizeRecommendationCategoryKey(value);
};

const normalizePolarity = (value: unknown): "positive" | "negative" => {
  const normalized = cleanText(value).toLowerCase();
  return normalized === "negative" || normalized === "dislike" ? "negative" : "positive";
};

const looksLikeStructuredThisOrThatAnswer = (value: unknown): boolean => {
  const record = toObject(value);
  if (!record || Object.keys(record).length === 0) return false;

  const answerType = cleanText(record.answer_type).toLowerCase();
  const version = cleanText(record.version).toLowerCase();

  return Boolean(
    answerType === "this_or_that_v2" ||
    version === "this_or_that_v2" ||
    version === "this-or-that-v2" ||
    record.selected_option ||
    record.selected_option_id ||
    record.selected_option_key ||
    record.question_id ||
    record.question_key,
  );
};

const coerceStructuredOption = (
  value: unknown,
  fallback: {
    categoryKey: string | null;
    subgroupKey: string | null;
  },
): StructuredThisOrThatOption | null => {
  const record = toObject(value);
  if (Object.keys(record).length === 0) return null;

  const categoryKey = cleanText(record.category_key || record.category || fallback.categoryKey).toLowerCase() || null;
  const subgroupKey = cleanText(record.subgroup_key || record.subgroup || fallback.subgroupKey).toLowerCase() || null;
  const entityType = cleanText(record.entity_type).toLowerCase() || null;
  const entityKey = cleanText(record.entity_key).toLowerCase() || null;
  const entityLabel = cleanText(record.entity_label || record.label) || null;
  const primaryKeyword =
    normalizePrimaryKeyword(String(record.primary_keyword || "") || (entityType === "product_type" ? entityKey || entityLabel : null));
  const descriptorKeywords = normalizeRecommendationKeywords([
    ...toStringArray(record.descriptor_keywords),
    ...toStringArray(record.tags),
    ...toStringArray(record.signal_tags),
  ]).filter((keyword) => keyword !== primaryKeyword);
  const brand =
    cleanText(record.brand).toLowerCase() ||
    (entityType === "brand" ? entityKey || normalizeRecommendationKeywords([entityLabel])[0] || "" : "") ||
    null;

  return {
    optionId: cleanText(record.option_id || record.id) || null,
    optionKey: cleanText(record.option_key || record.key) || null,
    label: entityLabel,
    categoryKey,
    subgroupKey,
    entityType,
    entityKey,
    entityLabel,
    primaryKeyword,
    descriptorKeywords,
    brand,
    locationKeys: toStringArray(record.location_keys),
    tags: normalizeRecommendationKeywords([
      ...toStringArray(record.tags),
      ...toStringArray(record.signal_tags),
    ]),
    polarity: normalizePolarity(record.preference_polarity || record.signal_polarity || record.polarity),
  };
};

const coerceStructuredAnswer = (
  signalKey: string,
  value: unknown,
): StructuredThisOrThatAnswer | null => {
  const record = toObject(value);
  if (!looksLikeStructuredThisOrThatAnswer(record)) return null;

  const categoryKey = cleanText(record.category_key || record.category).toLowerCase() || null;
  const subgroupKey = cleanText(record.subgroup_key || record.subgroup).toLowerCase() || null;

  return {
    signalKey,
    questionKey: cleanText(record.question_key) || null,
    questionId: cleanText(record.question_id) || null,
    categoryKey,
    subgroupKey,
    selectedOption: coerceStructuredOption(
      record.selected_option ?? {
        option_id: record.selected_option_id,
        option_key: record.selected_option_key,
        label: record.selected_label,
        category_key: categoryKey,
        subgroup_key: subgroupKey,
        entity_type: record.entity_type,
        entity_key: record.entity_key,
        entity_label: record.entity_label,
        primary_keyword: record.primary_keyword,
        descriptor_keywords: record.descriptor_keywords,
        brand: record.brand,
        location_keys: record.location_keys,
        tags: record.tags,
        signal_tags: record.signal_tags,
        preference_polarity: record.preference_polarity,
      },
      { categoryKey, subgroupKey },
    ),
    rejectedOption: coerceStructuredOption(record.rejected_option, { categoryKey, subgroupKey }),
    recordRejectedAsNegative: Boolean(record.record_rejected_as_negative),
  };
};

const collectStructuredAnswerCandidates = (
  combinedResponses: JsonObject,
  snapshotPayload: JsonObject,
): StructuredThisOrThatAnswer[] => {
  const rows: StructuredThisOrThatAnswer[] = [];
  const seen = new Set<string>();

  for (const [key, value] of Object.entries(combinedResponses)) {
    if (!looksLikeStructuredThisOrThatAnswer(value)) continue;
    const answer = coerceStructuredAnswer(key, value);
    if (!answer) continue;
    const dedupeKey = `${answer.questionKey ?? answer.questionId ?? key}::combined`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    rows.push(answer);
  }

  for (const rawRow of toArray(snapshotPayload.this_or_that_v2_answers)) {
    const row = toObject(rawRow);
    const signalKey =
      cleanText(row.question_key) ||
      cleanText(row.question_id) ||
      cleanText(row.id) ||
      "this_or_that_v2";
    const answer = coerceStructuredAnswer(signalKey, row.answer_payload ?? row);
    if (!answer) continue;
    if (!answer.questionKey && cleanText(row.question_key)) answer.questionKey = cleanText(row.question_key);
    if (!answer.questionId && cleanText(row.question_id)) answer.questionId = cleanText(row.question_id);
    const dedupeKey = `${answer.questionKey ?? answer.questionId ?? signalKey}::snapshot`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    rows.push(answer);
  }

  return rows;
};

const toSignal = (
  answer: StructuredThisOrThatAnswer,
  option: StructuredThisOrThatOption,
  polarity: "positive" | "negative",
): StructuredThisOrThatSignal => ({
  signalKey: answer.signalKey,
  questionKey: answer.questionKey,
  questionId: answer.questionId,
  categoryKey: option.categoryKey || answer.categoryKey,
  subgroupKey: option.subgroupKey || answer.subgroupKey,
  recommendationCategory: normalizeRecommendationCategory(option.categoryKey || answer.categoryKey),
  entityType: option.entityType,
  entityKey: option.entityKey,
  entityLabel: option.entityLabel,
  primaryKeyword: option.primaryKeyword,
  descriptorKeywords: option.descriptorKeywords,
  brand: option.brand,
  locationKeys: option.locationKeys,
  tags: option.tags,
  polarity,
  notes: [answer.questionKey, answer.questionId, option.optionKey, option.optionId].filter(Boolean).join(" | ") || null,
});

export const extractStructuredThisOrThatAnswerSignals = (
  combinedResponses: JsonObject,
  snapshotPayload: JsonObject = {},
): StructuredThisOrThatSignal[] => {
  const answers = collectStructuredAnswerCandidates(combinedResponses, snapshotPayload);
  const signals: StructuredThisOrThatSignal[] = [];

  for (const answer of answers) {
    if (answer.selectedOption) {
      signals.push(toSignal(answer, answer.selectedOption, answer.selectedOption.polarity));
    }

    if (answer.recordRejectedAsNegative && answer.rejectedOption) {
      signals.push(toSignal(answer, answer.rejectedOption, "negative"));
    }
  }

  return signals;
};
