import type { Gender } from "@/lib/gender";
import {
  THIS_OR_THAT_CATEGORIES,
  getThisOrThatBank,
  type BrandBankCategory,
  type BrandBankQuestion,
  type ThisOrThatCategory,
} from "./knowMeQuestions";
import {
  getThisOrThatV2AuthoredQuestions,
  type ThisOrThatV2AuthoredCategoryId,
  type ThisOrThatV2AuthoredQuestionSeed,
} from "./thisOrThatV2Authored";

export type ThisOrThatV2TopLevelCategorySlug =
  | "clothes"
  | "personal"
  | "health"
  | "gifts"
  | "dining"
  | "beverages"
  | "household"
  | "entertainment"
  | "travel";

export type ThisOrThatV2EntityKind =
  | "aesthetic"
  | "brand-cluster"
  | "palette"
  | "taste-cluster"
  | "destination-cluster"
  | "experience-cluster"
  | "home-style"
  | "relationship-signal"
  | "interest-cluster"
  | "gift-preference"
  | "order-preference";

export type ThisOrThatV2SourceKind = "legacy-flat" | "bank-v1" | "authored-v2";

export interface ThisOrThatV2TopLevelCategoryBlueprint {
  slug: ThisOrThatV2TopLevelCategorySlug;
  label: string;
  status: "live" | "planned";
  rationale: string;
}

export interface ThisOrThatV2CategoryBlueprint {
  source_category_id: string;
  source_title: string;
  source_status: "live" | "coming-soon";
  source_kind: ThisOrThatV2SourceKind;
  category_slug: ThisOrThatV2TopLevelCategorySlug;
  subcategory_slug: string;
  entity_kind: ThisOrThatV2EntityKind;
  weight: number;
  notes: string;
}

export interface ThisOrThatV2OptionMetadata {
  category_slug: ThisOrThatV2TopLevelCategorySlug;
  subcategory_slug: string;
  entity_kind: ThisOrThatV2EntityKind;
  entity_slug: string;
  primary_keyword: string;
  descriptor_keywords: string[];
  avoid_keywords: string[];
  brand_keywords: string[];
  location_keywords: string[];
  weight: number;
}

export interface ThisOrThatV2QuestionOptionScaffold {
  option_key: "A" | "B";
  label: string;
  metadata: ThisOrThatV2OptionMetadata;
}

export interface ThisOrThatV2QuestionScaffold {
  question_id: string;
  source_category_id: string;
  source_category_title: string;
  source_kind: ThisOrThatV2SourceKind;
  dataset_gender: Gender;
  category_slug: ThisOrThatV2TopLevelCategorySlug;
  subcategory_slug: string;
  prompt: string;
  supported_genders: Gender[];
  weight: number;
  options: [ThisOrThatV2QuestionOptionScaffold, ThisOrThatV2QuestionOptionScaffold];
}

export interface ThisOrThatV2DatasetCoverageRow {
  gender: Gender;
  source_category_id: string;
  source_category_title: string;
  question_count: number;
  status: "live" | "coming-soon";
  top_level_category: ThisOrThatV2TopLevelCategorySlug | null;
  source_kind: ThisOrThatV2SourceKind | "none";
}

export interface ThisOrThatV2AnswerRecord {
  category_id: string;
  question_id: string;
  question_prompt: string;
  bank_gender: Gender;
  my_go_two_category_slug: ThisOrThatV2TopLevelCategorySlug;
  recommendation_category: ThisOrThatV2TopLevelCategorySlug;
  selected_option_key: "A" | "B";
  selected_label: string;
  selected_payload: ThisOrThatV2OptionMetadata;
  rejected_option_key: "A" | "B";
  rejected_label: string;
  rejected_payload: ThisOrThatV2OptionMetadata;
  response_payload: {
    category_slug: ThisOrThatV2TopLevelCategorySlug;
    subcategory_slug: string;
    selected: ThisOrThatV2QuestionOptionScaffold;
    rejected: ThisOrThatV2QuestionOptionScaffold;
    source_kind: ThisOrThatV2SourceKind;
    weight: number;
  };
  source_version: "this-or-that-v2";
}

export const THIS_OR_THAT_V2_TOP_LEVEL_CATEGORIES: ThisOrThatV2TopLevelCategoryBlueprint[] = [
  {
    slug: "clothes",
    label: "Clothes",
    status: "live",
    rationale:
      "Style, shopping, and fit-forward instinct questions should resolve into the same top-level bucket as My Go Two clothes.",
  },
  {
    slug: "personal",
    label: "Personal",
    status: "live",
    rationale:
      "Personal taste, relationships, and identity-adjacent signals belong here when they are not direct purchase categories.",
  },
  {
    slug: "health",
    label: "Health",
    status: "planned",
    rationale:
      "No live This or That health bank exists yet, but the v2 contract should reserve the bucket now.",
  },
  {
    slug: "gifts",
    label: "Gifts",
    status: "live",
    rationale:
      "Gift appetite and gift-style instincts should land in the same top-level area as My Go Two gifts.",
  },
  {
    slug: "dining",
    label: "Dining",
    status: "live",
    rationale: "Food and dining taste cues should align to the My Go Two dining surface.",
  },
  {
    slug: "beverages",
    label: "Beverages",
    status: "planned",
    rationale:
      "No dedicated beverage This or That bank is live yet, but beverage questions should not be forced into dining forever.",
  },
  {
    slug: "household",
    label: "Household",
    status: "live",
    rationale: "Home and living preference clusters align directly to the My Go Two household area.",
  },
  {
    slug: "entertainment",
    label: "Entertainment",
    status: "live",
    rationale:
      "Date ideas, hobbies, and weekend rhythm currently fit best under the live entertainment area.",
  },
  {
    slug: "travel",
    label: "Travel",
    status: "live",
    rationale: "Trip and destination instincts should resolve directly to the My Go Two travel bucket.",
  },
];

export const THIS_OR_THAT_V2_CATEGORY_BLUEPRINTS: ThisOrThatV2CategoryBlueprint[] = [
  {
    source_category_id: "style-aesthetic",
    source_title: "Style & Aesthetic",
    source_status: "live",
    source_kind: "legacy-flat",
    category_slug: "clothes",
    subcategory_slug: "style-aesthetic",
    entity_kind: "aesthetic",
    weight: 0.92,
    notes:
      "Legacy tot-* style prompts remain live and should become structured aesthetic signals under clothes.",
  },
  {
    source_category_id: "brands-shopping",
    source_title: "Brands & Shopping",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "clothes",
    subcategory_slug: "brands-shopping",
    entity_kind: "brand-cluster",
    weight: 0.96,
    notes:
      "Shopping identity is still clothes-first in the current live bank and should preserve linked brand lists per option.",
  },
  {
    source_category_id: "colors-palette",
    source_title: "Colors & Palette",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "personal",
    subcategory_slug: "colors-palette",
    entity_kind: "palette",
    weight: 0.86,
    notes:
      "Palette answers are broad preference signals and should stay reusable across clothes, gifts, and personal recommendations.",
  },
  {
    source_category_id: "food-dining",
    source_title: "Food & Dining",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "dining",
    subcategory_slug: "food-dining",
    entity_kind: "taste-cluster",
    weight: 0.9,
    notes:
      "Dining questions should preserve cuisine and restaurant-style metadata rather than collapsing to plain text.",
  },
  {
    source_category_id: "travel-trips",
    source_title: "Travel & Trips",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "travel",
    subcategory_slug: "travel-trips",
    entity_kind: "destination-cluster",
    weight: 0.9,
    notes:
      "Travel answers should retain destination and travel-mode keywords plus location-oriented metadata.",
  },
  {
    source_category_id: "date-ideas-romance",
    source_title: "Date Ideas & Romance",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "entertainment",
    subcategory_slug: "date-ideas-romance",
    entity_kind: "experience-cluster",
    weight: 0.88,
    notes:
      "Date content fits entertainment today and can be remapped later if My Go Two gets a dedicated romance branch.",
  },
  {
    source_category_id: "home-living",
    source_title: "Home & Living",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "household",
    subcategory_slug: "home-living",
    entity_kind: "home-style",
    weight: 0.88,
    notes: "Home and decor instincts should align directly with the household bucket.",
  },
  {
    source_category_id: "love-language-relationships",
    source_title: "Love Language & Relationships",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "personal",
    subcategory_slug: "love-language-relationships",
    entity_kind: "relationship-signal",
    weight: 0.84,
    notes:
      "Relationship-pattern questions are personal signals, not a direct commerce bucket.",
  },
  {
    source_category_id: "hobbies-weekend",
    source_title: "Hobbies & Weekend",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "entertainment",
    subcategory_slug: "hobbies-weekend",
    entity_kind: "interest-cluster",
    weight: 0.84,
    notes:
      "Hobby and weekend rhythm answers currently best support entertainment-style downstream recommendations.",
  },
  {
    source_category_id: "gifting-actually-want",
    source_title: "Gifting - what you actually want",
    source_status: "live",
    source_kind: "bank-v1",
    category_slug: "gifts",
    subcategory_slug: "gifting-actually-want",
    entity_kind: "gift-preference",
    weight: 0.95,
    notes:
      "This category should strongly influence gift recommendations and saved gift signals.",
  },
  {
    source_category_id: "food-orders",
    source_title: "Your Go-To Orders",
    source_status: "coming-soon",
    source_kind: "bank-v1",
    category_slug: "dining",
    subcategory_slug: "food-orders",
    entity_kind: "order-preference",
    weight: 0.97,
    notes:
      "Keep this as a dining scaffold for now; beverage-specific order banks can split into beverages later.",
  },
];

const CATEGORY_BLUEPRINT_BY_ID = new Map(
  THIS_OR_THAT_V2_CATEGORY_BLUEPRINTS.map((blueprint) => [blueprint.source_category_id, blueprint]),
);

const LOCATION_TOKEN_ALLOWLIST = new Set([
  "austin",
  "beach",
  "brooklyn",
  "chicago",
  "country",
  "desert",
  "italy",
  "japan",
  "las",
  "miami",
  "mountain",
  "mountains",
  "nashville",
  "new",
  "orleans",
  "osaka",
  "paris",
  "portland",
  "road",
  "snow",
  "surf",
  "tokyo",
  "travel",
  "vegas",
  "winter",
]);

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "from",
  "into",
  "more",
  "or",
  "the",
  "to",
  "with",
  "your",
]);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeKeyword = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const unique = (values: string[]) => Array.from(new Set(values.filter(Boolean)));

const tokenize = (value: string) =>
  normalizeKeyword(value)
    .split(" ")
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token));

const flattenBrandKeywords = (brandCategory: BrandBankCategory | undefined) =>
  unique(
    (brandCategory?.brands ?? []).map((entry) => normalizeKeyword(entry.brand)).filter(Boolean),
  );

const flattenDnaTags = (brandCategory: BrandBankCategory | undefined) =>
  unique(
    (brandCategory?.brands ?? [])
      .flatMap((entry) => entry.dnaTags.map((tag) => normalizeKeyword(tag)))
      .filter(Boolean),
  );

const extractLocationKeywords = (brandCategory: BrandBankCategory | undefined) =>
  unique(
    [
      ...(brandCategory?.brands ?? []).map((entry) => normalizeKeyword(entry.brand)),
      ...(brandCategory?.brands ?? []).flatMap((entry) => entry.dnaTags.map((tag) => normalizeKeyword(tag))),
    ]
      .flatMap((value) => value.split(" "))
      .filter((token) => LOCATION_TOKEN_ALLOWLIST.has(token)),
  );

const getPrimaryKeywordForEntityKind = (
  blueprint: ThisOrThatV2CategoryBlueprint,
  optionLabel: string,
): string => {
  switch (blueprint.entity_kind) {
    case "aesthetic":
      return "style";
    case "brand-cluster":
      return "brand preference";
    case "palette":
      return "color palette";
    case "taste-cluster":
      return "dining preference";
    case "destination-cluster":
      return "travel preference";
    case "experience-cluster":
      return "experience preference";
    case "home-style":
      return "home style";
    case "relationship-signal":
      return "relationship preference";
    case "interest-cluster":
      return "hobby preference";
    case "gift-preference":
      return "gift preference";
    case "order-preference":
      return "order preference";
    default:
      return normalizeKeyword(optionLabel);
  }
};

const buildOptionMetadata = (
  blueprint: ThisOrThatV2CategoryBlueprint,
  optionLabel: string,
  optionTags: string[],
  oppositeLabel: string,
  oppositeTags: string[],
  linkedCategory: BrandBankCategory | undefined,
): ThisOrThatV2OptionMetadata => {
  const entitySlug = slugify(optionLabel);
  const descriptorKeywords = unique([
    ...optionTags.map(normalizeKeyword),
    ...tokenize(optionLabel),
    ...flattenDnaTags(linkedCategory),
  ]);
  const avoidKeywords = unique([
    normalizeKeyword(oppositeLabel),
    ...oppositeTags.map(normalizeKeyword),
    ...tokenize(oppositeLabel),
  ]);
  const brandKeywords = flattenBrandKeywords(linkedCategory);
  const locationKeywords = extractLocationKeywords(linkedCategory);

  return {
    category_slug: blueprint.category_slug,
    subcategory_slug: blueprint.subcategory_slug,
    entity_kind: blueprint.entity_kind,
    entity_slug: entitySlug,
    primary_keyword: getPrimaryKeywordForEntityKind(blueprint, optionLabel),
    descriptor_keywords: descriptorKeywords,
    avoid_keywords: avoidKeywords,
    brand_keywords: brandKeywords,
    location_keywords: locationKeywords,
    weight: blueprint.weight,
  };
};

const buildQuestionScaffold = (
  category: ThisOrThatCategory,
  question: BrandBankQuestion,
  linkedCategoriesByTitle: Map<string, BrandBankCategory>,
  gender: Gender,
): ThisOrThatV2QuestionScaffold | null => {
  const blueprint = CATEGORY_BLUEPRINT_BY_ID.get(category.id);
  if (!blueprint) return null;

  const linkedCategoryA = linkedCategoriesByTitle.get(question.categoryA);
  const linkedCategoryB = linkedCategoriesByTitle.get(question.categoryB);

  return {
    question_id: question.id,
    source_category_id: category.id,
    source_category_title: category.title,
    source_kind: blueprint.source_kind,
    dataset_gender: gender,
    category_slug: blueprint.category_slug,
    subcategory_slug: blueprint.subcategory_slug,
    prompt: question.prompt,
    supported_genders: category.supportedGenders,
    weight: blueprint.weight,
    options: [
      {
        option_key: "A",
        label: question.categoryA,
        metadata: buildOptionMetadata(
          blueprint,
          question.categoryA,
          question.tagsForA,
          question.categoryB,
          question.tagsForB,
          linkedCategoryA,
        ),
      },
      {
        option_key: "B",
        label: question.categoryB,
        metadata: buildOptionMetadata(
          blueprint,
          question.categoryB,
          question.tagsForB,
          question.categoryA,
          question.tagsForA,
          linkedCategoryB,
        ),
      },
    ],
  };
};

const buildQuestionScaffoldFromAuthoredSeed = (
  category: ThisOrThatCategory,
  seed: ThisOrThatV2AuthoredQuestionSeed,
  gender: Gender,
): ThisOrThatV2QuestionScaffold | null => {
  const blueprint = CATEGORY_BLUEPRINT_BY_ID.get(category.id);
  if (!blueprint) return null;

  const optionA = seed.options[0];
  const optionB = seed.options[1];

  return {
    question_id: seed.question_id,
    source_category_id: category.id,
    source_category_title: category.title,
    source_kind: "authored-v2",
    dataset_gender: gender,
    category_slug: blueprint.category_slug,
    subcategory_slug: blueprint.subcategory_slug,
    prompt: seed.prompt,
    supported_genders: seed.supported_genders,
    weight: blueprint.weight,
    options: [
      {
        option_key: "A",
        label: optionA.label,
        metadata: {
          category_slug: blueprint.category_slug,
          subcategory_slug: blueprint.subcategory_slug,
          entity_kind: blueprint.entity_kind,
          entity_slug: slugify(optionA.label),
          primary_keyword: normalizeKeyword(optionA.primary_keyword),
          descriptor_keywords: unique(optionA.descriptor_keywords.map(normalizeKeyword)),
          avoid_keywords: unique(
            (optionA.avoid_keywords?.length
              ? optionA.avoid_keywords
              : [optionB.label, ...optionB.descriptor_keywords]
            ).map(normalizeKeyword),
          ),
          brand_keywords: unique(optionA.brand_keywords?.map(normalizeKeyword) ?? []),
          location_keywords: unique(optionA.location_keywords?.map(normalizeKeyword) ?? []),
          weight: optionA.weight ?? blueprint.weight,
        },
      },
      {
        option_key: "B",
        label: optionB.label,
        metadata: {
          category_slug: blueprint.category_slug,
          subcategory_slug: blueprint.subcategory_slug,
          entity_kind: blueprint.entity_kind,
          entity_slug: slugify(optionB.label),
          primary_keyword: normalizeKeyword(optionB.primary_keyword),
          descriptor_keywords: unique(optionB.descriptor_keywords.map(normalizeKeyword)),
          avoid_keywords: unique(
            (optionB.avoid_keywords?.length
              ? optionB.avoid_keywords
              : [optionA.label, ...optionA.descriptor_keywords]
            ).map(normalizeKeyword),
          ),
          brand_keywords: unique(optionB.brand_keywords?.map(normalizeKeyword) ?? []),
          location_keywords: unique(optionB.location_keywords?.map(normalizeKeyword) ?? []),
          weight: optionB.weight ?? blueprint.weight,
        },
      },
    ],
  };
};

export const buildThisOrThatV2QuestionScaffolds = (
  gender: Gender,
): ThisOrThatV2QuestionScaffold[] =>
  THIS_OR_THAT_CATEGORIES.flatMap((category) => {
    const authoredQuestions = getThisOrThatV2AuthoredQuestions(
      gender,
      category.id as ThisOrThatV2AuthoredCategoryId,
    );
    if (authoredQuestions.length > 0) {
      return authoredQuestions
        .map((question) => buildQuestionScaffoldFromAuthoredSeed(category, question, gender))
        .filter(
          (question): question is ThisOrThatV2QuestionScaffold => Boolean(question),
        );
    }

    const bank = getThisOrThatBank(category.id, gender);
    const linkedCategoriesByTitle = new Map(
      (bank?.categories ?? []).map((entry) => [entry.title, entry]),
    );

    return (bank?.questions ?? [])
      .map((question) =>
        buildQuestionScaffold(category, question, linkedCategoriesByTitle, gender),
      )
      .filter(
        (question): question is ThisOrThatV2QuestionScaffold => Boolean(question),
      );
  });

export const buildThisOrThatV2DatasetCoverage = (
  gender: Gender,
): ThisOrThatV2DatasetCoverageRow[] =>
  THIS_OR_THAT_CATEGORIES.map((category) => {
    const authoredQuestions = getThisOrThatV2AuthoredQuestions(
      gender,
      category.id as ThisOrThatV2AuthoredCategoryId,
    );
    const bank = getThisOrThatBank(category.id, gender);
    const blueprint = CATEGORY_BLUEPRINT_BY_ID.get(category.id);
    const questionCount = authoredQuestions.length > 0 ? authoredQuestions.length : bank?.questions.length ?? 0;
    const sourceKind: ThisOrThatV2DatasetCoverageRow["source_kind"] =
      authoredQuestions.length > 0
        ? "authored-v2"
        : bank?.questions.length
          ? blueprint?.source_kind ?? "bank-v1"
          : "none";

    return {
      gender,
      source_category_id: category.id,
      source_category_title: category.title,
      question_count: questionCount,
      status: category.status,
      top_level_category: blueprint?.category_slug ?? null,
      source_kind: sourceKind,
    };
  });

export const THIS_OR_THAT_V2_LIVE_MALE_QUESTION_SCAFFOLD =
  buildThisOrThatV2QuestionScaffolds("male");

export const THIS_OR_THAT_V2_LIVE_FEMALE_QUESTION_SCAFFOLD =
  buildThisOrThatV2QuestionScaffolds("female");

export const THIS_OR_THAT_V2_LIVE_NON_BINARY_QUESTION_SCAFFOLD =
  buildThisOrThatV2QuestionScaffolds("non-binary");

export const THIS_OR_THAT_V2_DATASET_COVERAGE = {
  male: buildThisOrThatV2DatasetCoverage("male"),
  female: buildThisOrThatV2DatasetCoverage("female"),
  "non-binary": buildThisOrThatV2DatasetCoverage("non-binary"),
} as const;

export const THIS_OR_THAT_V2_CONTENT_SOURCES = {
  runtimeV1File: "src/data/knowMeQuestions.ts",
  contentContractFile: "src/data/thisOrThatV2.ts",
  authoredDatasetFile: "src/data/thisOrThatV2Authored.ts",
  topLevelMyGoTwoSlugs: THIS_OR_THAT_V2_TOP_LEVEL_CATEGORIES.map(
    (category) => category.slug,
  ),
  datasetCoverage: THIS_OR_THAT_V2_DATASET_COVERAGE,
} as const;

export const buildThisOrThatAnswerRecord = (
  categoryId: string,
  gender: Gender,
  question: BrandBankQuestion,
  choice: "A" | "B",
): ThisOrThatV2AnswerRecord => {
  const category = THIS_OR_THAT_CATEGORIES.find((entry) => entry.id === categoryId);
  if (!category) {
    throw new Error(`Unknown This or That category: ${categoryId}`);
  }

  const blueprint = CATEGORY_BLUEPRINT_BY_ID.get(categoryId);
  if (!blueprint) {
    throw new Error(`Missing This or That v2 blueprint for category: ${categoryId}`);
  }

  const bank = getThisOrThatBank(categoryId, gender);
  const linkedCategoriesByTitle = new Map(
    (bank?.categories ?? []).map((entry) => [entry.title, entry]),
  );
  const scaffold = buildQuestionScaffold(category, question, linkedCategoriesByTitle, gender);

  const fallbackSelected = buildOptionMetadata(
    blueprint,
    choice === "A" ? question.categoryA : question.categoryB,
    choice === "A" ? question.tagsForA : question.tagsForB,
    choice === "A" ? question.categoryB : question.categoryA,
    choice === "A" ? question.tagsForB : question.tagsForA,
    undefined,
  );
  const fallbackRejected = buildOptionMetadata(
    blueprint,
    choice === "A" ? question.categoryB : question.categoryA,
    choice === "A" ? question.tagsForB : question.tagsForA,
    choice === "A" ? question.categoryA : question.categoryB,
    choice === "A" ? question.tagsForA : question.tagsForB,
    undefined,
  );

  const selected =
    scaffold?.options.find((option) => option.option_key === choice) ?? {
      option_key: choice,
      label: choice === "A" ? question.categoryA : question.categoryB,
      metadata: fallbackSelected,
    };
  const rejected =
    scaffold?.options.find((option) => option.option_key !== choice) ?? {
      option_key: choice === "A" ? "B" : "A",
      label: choice === "A" ? question.categoryB : question.categoryA,
      metadata: fallbackRejected,
    };

  return {
    category_id: categoryId,
    question_id: question.id,
    question_prompt: question.prompt,
    bank_gender: gender,
    my_go_two_category_slug: selected.metadata.category_slug,
    recommendation_category: selected.metadata.category_slug,
    selected_option_key: selected.option_key,
    selected_label: selected.label,
    selected_payload: selected.metadata,
    rejected_option_key: rejected.option_key,
    rejected_label: rejected.label,
    rejected_payload: rejected.metadata,
    response_payload: {
      category_slug: selected.metadata.category_slug,
      subcategory_slug: selected.metadata.subcategory_slug,
      selected,
      rejected,
      source_kind: scaffold?.source_kind ?? blueprint.source_kind,
      weight: scaffold?.weight ?? blueprint.weight,
    },
    source_version: "this-or-that-v2",
  };
};
