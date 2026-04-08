import { describe, expect, it } from "vitest";
import { getThisOrThatBank } from "../data/knowMeQuestions";
import {
  buildThisOrThatAnswerRecord,
  THIS_OR_THAT_V2_DATASET_COVERAGE,
  THIS_OR_THAT_V2_LIVE_MALE_QUESTION_SCAFFOLD,
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
    expect(record.selected_label).toBe("Essentials & Basics");
    expect(record.selected_payload.entity_kind).toBe("brand-cluster");
    expect(record.selected_payload.primary_keyword).toBe("brand preference");
    expect(record.selected_payload.descriptor_keywords).toEqual(
      expect.arrayContaining(["basics", "minimal", "essentials"]),
    );
    expect(record.selected_payload.brand_keywords).toEqual(
      expect.arrayContaining(["uniqlo", "buck mason", "everlane"]),
    );
    expect(record.rejected_payload.descriptor_keywords).toEqual(
      expect.arrayContaining(["heritage", "rugged", "workwear"]),
    );
  });

  it("builds an opposite-side avoid payload for legacy style questions", () => {
    const bank = getThisOrThatBank("style-aesthetic", "male");
    const question = bank?.questions[1];

    expect(question).toBeTruthy();

    const record = buildThisOrThatAnswerRecord("style-aesthetic", "male", question!, "A");

    expect(record.selected_payload.entity_kind).toBe("aesthetic");
    expect(record.selected_payload.primary_keyword).toBe("style");
    expect(record.selected_payload.descriptor_keywords).toEqual(expect.arrayContaining(["neutrals"]));
    expect(record.selected_payload.avoid_keywords).toEqual(expect.arrayContaining(["colors"]));
    expect(record.rejected_payload.descriptor_keywords).toEqual(expect.arrayContaining(["colors"]));
  });

  it("tracks dataset coverage by gender instead of flattening everyone into one authored bank", () => {
    expect(
      THIS_OR_THAT_V2_LIVE_MALE_QUESTION_SCAFFOLD.every((question) => question.dataset_gender === "male"),
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
});
