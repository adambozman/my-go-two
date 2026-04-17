import { describe, expect, it } from "vitest";
import { getThisOrThatV2RuntimeQuestions } from "../data/thisOrThatV2";
import { buildThisOrThatAnswerUpsertPayload } from "../data/thisOrThatV2Persistence";

describe("This or That v2 persistence payload", () => {
  it("writes the full structured payload for a live travel answer", () => {
    const question = getThisOrThatV2RuntimeQuestions("travel-trips")[0];

    expect(question).toBeTruthy();

    const payload = buildThisOrThatAnswerUpsertPayload({
      userId: "user-1",
      categoryId: "travel-trips",
      question: question!,
      choice: "A",
      answeredAt: "2026-04-09T12:00:00.000Z",
    });

    expect(payload.user_id).toBe("user-1");
    expect(payload.category_key).toBe("travel");
    expect(payload.recommendation_category).toBe("travel");
    expect(payload.subgroup_key).toBeTruthy();
    expect(payload.answered_at).toBe("2026-04-09T12:00:00.000Z");
    expect(payload.updated_at).toBe("2026-04-09T12:00:00.000Z");
  });

  it("persists brand_keywords for brand-vs-brand questions", () => {
    const question = getThisOrThatV2RuntimeQuestions("brands-shopping")[0];

    expect(question).toBeTruthy();

    const payload = buildThisOrThatAnswerUpsertPayload({
      userId: "user-1",
      categoryId: "brands-shopping",
      question: question!,
      choice: "A",
      answeredAt: "2026-04-09T12:00:00.000Z",
    });

    // The brand field should be populated from brand_keywords
    expect(payload.brand).toBeTruthy();
    expect(payload.answer_payload.selected_payload.brand_keywords.length).toBeGreaterThan(0);
  });
});
