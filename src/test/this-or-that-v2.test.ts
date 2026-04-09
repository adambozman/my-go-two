import { describe, expect, it } from "vitest";
import { getThisOrThatBank } from "../data/knowMeQuestions";
import {
  buildThisOrThatAnswerRecord,
  THIS_OR_THAT_V2_DATASET_COVERAGE,
  THIS_OR_THAT_V2_LIVE_FEMALE_QUESTION_SCAFFOLD,
  THIS_OR_THAT_V2_LIVE_MALE_QUESTION_SCAFFOLD,
  THIS_OR_THAT_V2_LIVE_NON_BINARY_QUESTION_SCAFFOLD,
} from "../data/thisOrThatV2";

describe("This or That v2 answer contract", () => {
  it("builds a structured answer record for bank-backed category questions", () => {
    const bank = getThisOrThatBank("brands-shopping", "male");
    const question = bank?.questions[0];

    expect(question).toBeTruthy();

    const record = buildThisOrThatAnswerRecord("brands-shopping", "male", question!, "A");

    expect(record.category_id).toBe("brands-shopping");
    expect(record.my_go_two_category_slug).toBe("clothes");
    expect(record.recommendation_category).toBe("clothes");
    expect(record.selected_label).toBe("Classic Quality Basics");
    expect(record.selected_payload.entity_kind).toBe("brand-cluster");
    expect(record.selected_payload.primary_keyword).toBe("brand preference");
    expect(record.selected_payload.descriptor_keywords).toEqual(
      expect.arrayContaining(["basics", "quality", "minimal"]),
    );
    expect(record.selected_payload.brand_keywords).toEqual(
      expect.arrayContaining(["buck mason", "everlane", "uniqlo"]),
    );
    expect(record.rejected_payload.descriptor_keywords).toEqual(
      expect.arrayContaining(["outdoor", "performance", "technical"]),
    );
  });

  it("builds an opposite-side avoid payload for legacy style questions", () => {
    const bank = getThisOrThatBank("style-aesthetic", "male");
    const question = bank?.questions[0];

    expect(question).toBeTruthy();

    const record = buildThisOrThatAnswerRecord("style-aesthetic", "male", question!, "A");

    expect(record.selected_payload.entity_kind).toBe("aesthetic");
    expect(record.selected_payload.primary_keyword).toBe("style");
    expect(record.selected_payload.descriptor_keywords).toEqual(expect.arrayContaining(["tailored", "minimal"]));
    expect(record.selected_payload.avoid_keywords).toEqual(
      expect.arrayContaining(["relaxed streetwear", "streetwear", "oversized"]),
    );
    expect(record.rejected_payload.descriptor_keywords).toEqual(
      expect.arrayContaining(["relaxed", "streetwear", "oversized"]),
    );
  });

  it("tracks dataset coverage by gender instead of flattening everyone into one authored bank", () => {
    expect(getThisOrThatBank("brands-shopping", "female")?.questions.length).toBeGreaterThan(0);
    expect(getThisOrThatBank("brands-shopping", "non-binary")?.questions.length).toBeGreaterThan(0);
    expect(
      THIS_OR_THAT_V2_LIVE_MALE_QUESTION_SCAFFOLD.every((question) => question.dataset_gender === "male"),
    ).toBe(true);
    expect(
      THIS_OR_THAT_V2_LIVE_FEMALE_QUESTION_SCAFFOLD.every((question) => question.dataset_gender === "female"),
    ).toBe(true);
    expect(
      THIS_OR_THAT_V2_LIVE_NON_BINARY_QUESTION_SCAFFOLD.every(
        (question) => question.dataset_gender === "non-binary",
      ),
    ).toBe(true);
    expect(
      THIS_OR_THAT_V2_DATASET_COVERAGE.male.some(
        (row) =>
          row.source_category_id === "brands-shopping" &&
          row.question_count > 0 &&
          row.source_kind === "authored-v2",
      ),
    ).toBe(true);
    expect(
      THIS_OR_THAT_V2_DATASET_COVERAGE.female.some(
        (row) =>
          row.source_category_id === "brands-shopping" &&
          row.question_count > 0 &&
          row.source_kind === "authored-v2",
      ),
    ).toBe(true);
    expect(
      THIS_OR_THAT_V2_DATASET_COVERAGE["non-binary"].some(
        (row) =>
          row.source_category_id === "brands-shopping" &&
          row.question_count > 0 &&
          row.source_kind === "authored-v2",
      ),
    ).toBe(true);
  });

  it("preserves live travel categories instead of collapsing them to null", () => {
    const bank = getThisOrThatBank("travel-trips", "male");
    const question = bank?.questions[0];

    expect(question).toBeTruthy();

    const record = buildThisOrThatAnswerRecord("travel-trips", "male", question!, "A");

    expect(record.recommendation_category).toBe("travel");
    expect(record.my_go_two_category_slug).toBe("travel");
    expect(record.selected_payload.location_keywords).toEqual(
      expect.arrayContaining(["aspen", "colorado", "montana", "utah"]),
    );
  });

  it("fails fast when a category is unknown instead of silently using the first blueprint", () => {
    const bank = getThisOrThatBank("brands-shopping", "male");
    const question = bank?.questions[0];

    expect(question).toBeTruthy();

    expect(() => buildThisOrThatAnswerRecord("not-a-real-category", "male", question!, "A")).toThrow(
      /Unknown This or That category/,
    );
  });
});
