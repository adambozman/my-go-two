import { describe, expect, it } from "vitest";
import { getThisOrThatBank } from "../data/knowMeQuestions";
import { buildThisOrThatAnswerUpsertPayload } from "../data/thisOrThatV2Persistence";

describe("This or That v2 persistence payload", () => {
  it("writes the full structured payload for a live travel answer", () => {
    const bank = getThisOrThatBank("travel-trips", "male");
    const question = bank?.questions[0];

    expect(question).toBeTruthy();

    const payload = buildThisOrThatAnswerUpsertPayload({
      userId: "user-1",
      categoryId: "travel-trips",
      gender: "male",
      question: question!,
      choice: "A",
      answeredAt: "2026-04-09T12:00:00.000Z",
    });

    expect(payload.user_id).toBe("user-1");
    expect(payload.category_key).toBe("travel");
    expect(payload.recommendation_category).toBe("travel");
    expect(payload.subgroup_key).toBeTruthy();
    expect(payload.answer_payload.selected_payload.location_keywords.length).toBeGreaterThan(0);
    expect(payload.answered_at).toBe("2026-04-09T12:00:00.000Z");
    expect(payload.updated_at).toBe("2026-04-09T12:00:00.000Z");
  });
});
