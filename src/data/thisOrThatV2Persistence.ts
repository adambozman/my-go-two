import {
  buildThisOrThatAnswerRecord,
  type ThisOrThatV2QuestionLike,
  type ThisOrThatV2AnswerRecord,
  type ThisOrThatV2DatasetKey,
} from "./thisOrThatV2";

export interface ThisOrThatAnswerUpsertPayload {
  user_id: string;
  question_key: string;
  selected_option_key: string;
  rejected_option_key: string;
  category_key: string;
  subgroup_key: string | null;
  recommendation_category: string;
  primary_keyword: string;
  descriptor_keywords: string[];
  brand: string | null;
  location_keys: string[];
  answer_payload: {
    question_prompt: string;
    bank_gender: ThisOrThatV2DatasetKey;
    selected_label: string;
    rejected_label: string;
    selected_payload: ThisOrThatV2AnswerRecord["selected_payload"];
    rejected_payload: ThisOrThatV2AnswerRecord["rejected_payload"];
    response_payload: ThisOrThatV2AnswerRecord["response_payload"];
  };
  response_source: "this_or_that_v2";
  source_version: string;
  answered_at: string;
  updated_at: string;
}

export const buildThisOrThatAnswerUpsertPayload = ({
  userId,
  categoryId,
  question,
  choice,
  answeredAt = new Date().toISOString(),
}: {
  userId: string;
  categoryId: string;
  question: ThisOrThatV2QuestionLike;
  choice: "A" | "B";
  answeredAt?: string;
}): ThisOrThatAnswerUpsertPayload => {
  const answerRecord = buildThisOrThatAnswerRecord(categoryId, question, choice);

  return {
    user_id: userId,
    question_key: answerRecord.question_id,
    selected_option_key: answerRecord.selected_option_key,
    rejected_option_key: answerRecord.rejected_option_key,
    category_key: answerRecord.my_go_two_category_slug,
    subgroup_key: answerRecord.selected_payload.subcategory_slug,
    recommendation_category: answerRecord.recommendation_category,
    primary_keyword: answerRecord.selected_payload.primary_keyword,
    descriptor_keywords: answerRecord.selected_payload.descriptor_keywords,
    brand: answerRecord.selected_payload.brand_keywords[0] ?? null,
    location_keys: answerRecord.selected_payload.location_keywords,
    answer_payload: {
      question_prompt: answerRecord.question_prompt,
      bank_gender: answerRecord.bank_gender,
      selected_label: answerRecord.selected_label,
      rejected_label: answerRecord.rejected_label,
      selected_payload: answerRecord.selected_payload,
      rejected_payload: answerRecord.rejected_payload,
      response_payload: answerRecord.response_payload,
    },
    response_source: "this_or_that_v2",
    source_version: answerRecord.source_version,
    answered_at: answeredAt,
    updated_at: answeredAt,
  };
};
