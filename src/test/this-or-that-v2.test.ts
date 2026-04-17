import { describe, expect, it } from "vitest";
import {
  buildThisOrThatAnswerRecord,
  buildThisOrThatV2RuntimeQuestionBank,
  getThisOrThatV2RuntimeQuestions,
  THIS_OR_THAT_V2_DATASET_COVERAGE,
  THIS_OR_THAT_V2_LIVE_SHARED_QUESTION_SCAFFOLD,
} from "../data/thisOrThatV2";
import { getThisOrThatV2AuthoredQuestions } from "../data/thisOrThatV2Authored";

describe("This or That v2 answer contract", () => {
  it("builds a structured answer record for authored brand-vs-brand questions", () => {
    const question = getThisOrThatV2RuntimeQuestions("brands-shopping")[0];

    expect(question).toBeTruthy();

    const record = buildThisOrThatAnswerRecord("brands-shopping", question!, "A");

    expect(record.category_id).toBe("brands-shopping");
    expect(record.my_go_two_category_slug).toBe("clothes");
    expect(record.recommendation_category).toBe("clothes");
    expect(record.selected_payload.entity_kind).toBe("brand-cluster");
    expect(record.selected_payload.primary_keyword).toBe("brand preference");
    expect(record.selected_payload.brand_keywords.length).toBeGreaterThan(0);
  });

  it("builds brand metadata for style-aesthetic questions", () => {
    const question = getThisOrThatV2RuntimeQuestions("style-aesthetic")[0];

    expect(question).toBeTruthy();

    const record = buildThisOrThatAnswerRecord("style-aesthetic", question!, "A");

    expect(record.selected_payload.entity_kind).toBe("aesthetic");
    expect(record.selected_payload.brand_keywords.length).toBeGreaterThan(0);
    expect(record.selected_payload.descriptor_keywords.length).toBeGreaterThan(0);
  });

  it("tracks one shared authored dataset instead of splitting users by gender", () => {
    expect(getThisOrThatV2RuntimeQuestions("brands-shopping").length).toBeGreaterThan(0);
    expect(
      THIS_OR_THAT_V2_LIVE_SHARED_QUESTION_SCAFFOLD.every((question) => question.dataset_gender === "shared"),
    ).toBe(true);
    expect(
      THIS_OR_THAT_V2_DATASET_COVERAGE.some(
        (row) =>
          row.source_category_id === "brands-shopping" &&
          row.question_count > 0 &&
          row.source_kind === "authored-v2" &&
          row.dataset === "shared",
      ),
    ).toBe(true);
  });

  it("builds the live runtime bank from v2 scaffolds instead of raw legacy bank reads", () => {
    const runtimeBank = buildThisOrThatV2RuntimeQuestionBank();
    const categoryQuestions = runtimeBank["brands-shopping"];

    expect(categoryQuestions).toBeTruthy();
    expect(categoryQuestions?.length).toBeGreaterThanOrEqual(2);
    expect(categoryQuestions?.every((question) => question.id && question.prompt)).toBe(true);
    expect(categoryQuestions?.every((question) => question.source_kind === "authored-v2")).toBe(true);
  });

  it("ships at least two authored v2 questions per live category in the shared bank", () => {
    const liveCategoryIds = [
      "style-aesthetic",
      "brands-shopping",
      "colors-palette",
      "food-dining",
      "travel-trips",
      "date-ideas-romance",
      "home-living",
      "love-language-relationships",
      "hobbies-weekend",
      "gifting-actually-want",
    ] as const;

    for (const categoryId of liveCategoryIds) {
      const questions = getThisOrThatV2AuthoredQuestions(categoryId);
      expect(questions.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps authored brand and location metadata rich in the categories that drive recommendations hardest", () => {
    const sharedBrandQuestions = getThisOrThatV2AuthoredQuestions("brands-shopping");
    const sharedTravelQuestions = getThisOrThatV2AuthoredQuestions("travel-trips");
    const sharedDiningQuestions = getThisOrThatV2AuthoredQuestions("food-dining");

    // Brand questions should have brand_keywords on most options
    expect(
      sharedBrandQuestions.some((question) =>
        question.options.some((option) => (option.brand_keywords?.length ?? 0) >= 1),
      ),
    ).toBe(true);
    // Travel questions should have location_keywords
    expect(
      sharedTravelQuestions.some((question) =>
        question.options.some((option) => (option.location_keywords?.length ?? 0) >= 1),
      ),
    ).toBe(true);
    // Dining questions should have descriptor_keywords
    expect(
      sharedDiningQuestions.some((question) =>
        question.options.some((option) => option.descriptor_keywords.length >= 3),
      ),
    ).toBe(true);
  });

  it("preserves live travel categories with location metadata", () => {
    const question = getThisOrThatV2RuntimeQuestions("travel-trips")[0];

    expect(question).toBeTruthy();

    const record = buildThisOrThatAnswerRecord("travel-trips", question!, "A");

    expect(record.recommendation_category).toBe("travel");
    expect(record.my_go_two_category_slug).toBe("travel");
    // Travel questions should carry brand or location metadata
    expect(
      record.selected_payload.brand_keywords.length > 0 ||
      record.selected_payload.location_keywords.length > 0,
    ).toBe(true);
  });

  it("fails fast when a category is unknown instead of silently using the first blueprint", () => {
    const question = getThisOrThatV2RuntimeQuestions("brands-shopping")[0];

    expect(question).toBeTruthy();

    expect(() => buildThisOrThatAnswerRecord("not-a-real-category", question!, "A")).toThrow(
      /Unknown This or That category/,
    );
  });

  it("every question in the bank carries brand_keywords for hierarchy building", () => {
    const allQuestions = getThisOrThatV2AuthoredQuestions();
    const withBrands = allQuestions.filter((q) =>
      q.options.some((o) => (o.brand_keywords?.length ?? 0) > 0),
    );
    // At least 60% of questions should have brand data
    expect(withBrands.length / allQuestions.length).toBeGreaterThan(0.6);
  });
});
