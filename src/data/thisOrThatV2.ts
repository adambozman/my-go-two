import type { Gender } from "@/lib/gender";
import {
  getThisOrThatV2AuthoredQuestions,
  type ThisOrThatV2AuthoredCategoryId,
  type ThisOrThatV2AuthoredQuestionSeed,
} from "./thisOrThatV2Authored";

export type ThisOrThatV2DatasetKey = "shared";

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

export type ThisOrThatV2SourceKind = "authored-v2";

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

export interface ThisOrThatV2CategoryDefinition {
  id: string;
  title: string;
  description: string;
  eyebrow: string;
  supportedGenders: Gender[];
  status: "live" | "coming-soon";
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
  dataset_gender: ThisOrThatV2DatasetKey;
  category_slug: ThisOrThatV2TopLevelCategorySlug;
  subcategory_slug: string;
  prompt: string;
  supported_genders: Gender[];
  weight: number;
  options: [ThisOrThatV2QuestionOptionScaffold, ThisOrThatV2QuestionOptionScaffold];
}

export interface ThisOrThatV2QuestionLike {
  id: string;
  prompt: string;
  categoryA: string;
  categoryB: string;
  tagsForA: string[];
  tagsForB: string[];
}

export interface ThisOrThatV2RuntimeQuestion extends ThisOrThatV2QuestionLike {
  source_kind: ThisOrThatV2SourceKind;
  dataset_gender: ThisOrThatV2DatasetKey;
  category_slug: ThisOrThatV2TopLevelCategorySlug;
  subcategory_slug: string;
}

export interface ThisOrThatV2DatasetCoverageRow {
  dataset: ThisOrThatV2DatasetKey;
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
  bank_gender: ThisOrThatV2DatasetKey;
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
    rationale: "Style, shopping, and fit-forward instinct questions should resolve into My Go Two clothes.",
  },
  {
    slug: "personal",
    label: "Personal",
    status: "live",
    rationale: "Personal taste, relationship, and identity-adjacent signals belong here when they are not direct purchase categories.",
  },
  {
    slug: "health",
    label: "Health",
    status: "planned",
    rationale: "Reserve the health bucket for future authored question sets.",
  },
  {
    slug: "gifts",
    label: "Gifts",
    status: "live",
    rationale: "Gift appetite and gift-style instincts should land in the same area as My Go Two gifts.",
  },
  {
    slug: "dining",
    label: "Dining",
    status: "live",
    rationale: "Food and dining taste cues align to the My Go Two dining surface.",
  },
  {
    slug: "beverages",
    label: "Beverages",
    status: "planned",
    rationale: "Hold a beverage bucket for later instead of forcing every drink signal into dining.",
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
    rationale: "Date ideas, hobbies, and weekend rhythm currently fit best under entertainment.",
  },
  {
    slug: "travel",
    label: "Travel",
    status: "live",
    rationale: "Trip and destination instincts should resolve directly to the My Go Two travel bucket.",
  },
];

export const THIS_OR_THAT_V2_CATEGORY_DEFINITIONS: ThisOrThatV2CategoryDefinition[] = [
  {
    id: "style-aesthetic",
    title: "Style & Aesthetic",
    description: "Fixed instinct prompts around visual taste, silhouettes, and overall vibe.",
    eyebrow: "Style lens",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "brands-shopping",
    title: "Brands & Shopping",
    description: "Quick picks about labels, stores, and the kinds of brands that feel like you.",
    eyebrow: "Brand signals",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "colors-palette",
    title: "Colors & Palette",
    description: "Preference prompts for tones, contrast, color energy, and what feels most natural.",
    eyebrow: "Color read",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "food-dining",
    title: "Food & Dining",
    description: "Taste cues around cravings, comfort meals, restaurants, and how you like to dine.",
    eyebrow: "Taste cues",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "travel-trips",
    title: "Travel & Trips",
    description: "Instinctive picks about destinations, travel mood, and what kind of getaway fits you.",
    eyebrow: "Travel mood",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "date-ideas-romance",
    title: "Date Ideas & Romance",
    description: "Chemistry, date-night energy, and the romantic experiences you lean toward.",
    eyebrow: "Romance cues",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "home-living",
    title: "Home & Living",
    description: "Signals about comfort, decor, routines, and what makes a space feel right.",
    eyebrow: "Home feel",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "love-language-relationships",
    title: "Love Language & Relationships",
    description: "Instinct questions for connection style, affection, and relationship patterns that fit.",
    eyebrow: "Connection read",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "hobbies-weekend",
    title: "Hobbies & Weekend",
    description: "Fast reads on downtime, interests, and the kind of weekend rhythm that feels good.",
    eyebrow: "Weekend rhythm",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "gifting-actually-want",
    title: "Gifting - what you actually want",
    description: "Gift instincts, wish-list clues, and what feels genuinely thoughtful.",
    eyebrow: "Gift instinct",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
  },
  {
    id: "food-orders",
    title: "Your Go-To Orders",
    description: "Your exact orders at the places you love so the people in your life always get it right.",
    eyebrow: "Go-to orders",
    supportedGenders: ["male", "female", "non-binary"],
    status: "coming-soon",
  },
];

export const THIS_OR_THAT_V2_CATEGORY_BLUEPRINTS: ThisOrThatV2CategoryBlueprint[] = [
  {
    source_category_id: "style-aesthetic",
    source_title: "Style & Aesthetic",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "clothes",
    subcategory_slug: "style-aesthetic",
    entity_kind: "aesthetic",
    weight: 0.92,
    notes: "Style prompts map directly into the clothes signal stack.",
  },
  {
    source_category_id: "brands-shopping",
    source_title: "Brands & Shopping",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "clothes",
    subcategory_slug: "brands-shopping",
    entity_kind: "brand-cluster",
    weight: 0.96,
    notes: "Shopping identity should preserve linked brand lists per option.",
  },
  {
    source_category_id: "colors-palette",
    source_title: "Colors & Palette",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "personal",
    subcategory_slug: "colors-palette",
    entity_kind: "palette",
    weight: 0.86,
    notes: "Palette answers should stay reusable across clothes, gifts, and personal recommendations.",
  },
  {
    source_category_id: "food-dining",
    source_title: "Food & Dining",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "dining",
    subcategory_slug: "food-dining",
    entity_kind: "taste-cluster",
    weight: 0.9,
    notes: "Dining questions should preserve cuisine and restaurant-style metadata.",
  },
  {
    source_category_id: "travel-trips",
    source_title: "Travel & Trips",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "travel",
    subcategory_slug: "travel-trips",
    entity_kind: "destination-cluster",
    weight: 0.88,
    notes: "Trip and destination choices feed travel preferences directly.",
  },
  {
    source_category_id: "date-ideas-romance",
    source_title: "Date Ideas & Romance",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "entertainment",
    subcategory_slug: "date-ideas-romance",
    entity_kind: "experience-cluster",
    weight: 0.87,
    notes: "Date ideas read most cleanly as entertainment-style experience preferences.",
  },
  {
    source_category_id: "home-living",
    source_title: "Home & Living",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "household",
    subcategory_slug: "home-living",
    entity_kind: "home-style",
    weight: 0.88,
    notes: "Home and living choices should strengthen household recommendations.",
  },
  {
    source_category_id: "love-language-relationships",
    source_title: "Love Language & Relationships",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "personal",
    subcategory_slug: "love-language-relationships",
    entity_kind: "relationship-signal",
    weight: 0.82,
    notes: "Relationship preferences are personal signals that also inform gifts.",
  },
  {
    source_category_id: "hobbies-weekend",
    source_title: "Hobbies & Weekend",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "entertainment",
    subcategory_slug: "hobbies-weekend",
    entity_kind: "interest-cluster",
    weight: 0.84,
    notes: "Hobby and weekend rhythm answers support entertainment recommendations.",
  },
  {
    source_category_id: "gifting-actually-want",
    source_title: "Gifting - what you actually want",
    source_status: "live",
    source_kind: "authored-v2",
    category_slug: "gifts",
    subcategory_slug: "gifting-actually-want",
    entity_kind: "gift-preference",
    weight: 0.95,
    notes: "This category should strongly influence gift recommendations and saved gift signals.",
  },
  {
    source_category_id: "food-orders",
    source_title: "Your Go-To Orders",
    source_status: "coming-soon",
    source_kind: "authored-v2",
    category_slug: "dining",
    subcategory_slug: "food-orders",
    entity_kind: "order-preference",
    weight: 0.97,
    notes: "Keep this as a dining scaffold for now; beverage-specific order banks can split later.",
  },
];

const CATEGORY_DEFINITION_BY_ID = new Map(
  THIS_OR_THAT_V2_CATEGORY_DEFINITIONS.map((category) => [category.id, category]),
);

const CATEGORY_BLUEPRINT_BY_ID = new Map(
  THIS_OR_THAT_V2_CATEGORY_BLUEPRINTS.map((blueprint) => [blueprint.source_category_id, blueprint]),
);

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

const buildQuestionScaffoldFromAuthoredSeed = (
  seed: ThisOrThatV2AuthoredQuestionSeed,
): ThisOrThatV2QuestionScaffold => {
  const category = CATEGORY_DEFINITION_BY_ID.get(seed.source_category_id);
  const blueprint = CATEGORY_BLUEPRINT_BY_ID.get(seed.source_category_id);

  if (!category || !blueprint) {
    throw new Error(`Unknown This or That v2 category: ${seed.source_category_id}`);
  }

  const optionA = seed.options[0];
  const optionB = seed.options[1];

  return {
    question_id: seed.question_id,
    source_category_id: seed.source_category_id,
    source_category_title: category.title,
    source_kind: "authored-v2",
    dataset_gender: "shared",
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
          primary_keyword: normalizeKeyword(optionA.primary_keyword || getPrimaryKeywordForEntityKind(blueprint, optionA.label)),
          descriptor_keywords: unique([...optionA.descriptor_keywords.map(normalizeKeyword), ...tokenize(optionA.label)]),
          avoid_keywords: unique(
            (optionA.avoid_keywords?.length ? optionA.avoid_keywords : [optionB.label, ...optionB.descriptor_keywords]).map(
              normalizeKeyword,
            ),
          ),
          brand_keywords: unique((optionA.brand_keywords ?? []).map(normalizeKeyword)),
          location_keywords: unique((optionA.location_keywords ?? []).map(normalizeKeyword)),
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
          primary_keyword: normalizeKeyword(optionB.primary_keyword || getPrimaryKeywordForEntityKind(blueprint, optionB.label)),
          descriptor_keywords: unique([...optionB.descriptor_keywords.map(normalizeKeyword), ...tokenize(optionB.label)]),
          avoid_keywords: unique(
            (optionB.avoid_keywords?.length ? optionB.avoid_keywords : [optionA.label, ...optionA.descriptor_keywords]).map(
              normalizeKeyword,
            ),
          ),
          brand_keywords: unique((optionB.brand_keywords ?? []).map(normalizeKeyword)),
          location_keywords: unique((optionB.location_keywords ?? []).map(normalizeKeyword)),
          weight: optionB.weight ?? blueprint.weight,
        },
      },
    ],
  };
};

export const getThisOrThatV2CategoryDefinitions = () => THIS_OR_THAT_V2_CATEGORY_DEFINITIONS;

export function getThisOrThatV2RuntimeQuestions(
  categoryId?: string,
): ThisOrThatV2RuntimeQuestion[];
export function getThisOrThatV2RuntimeQuestions(
  legacyDataset: Gender,
  categoryId?: string,
): ThisOrThatV2RuntimeQuestion[];
export function getThisOrThatV2RuntimeQuestions(
  arg1?: string,
  arg2?: string,
): ThisOrThatV2RuntimeQuestion[] {
  const categoryId =
    arg1 === "male" || arg1 === "female" || arg1 === "non-binary"
      ? arg2
      : arg1;
  const scaffolds = buildThisOrThatV2QuestionScaffolds();
  return scaffolds
    .filter((scaffold) => !categoryId || scaffold.source_category_id === categoryId)
    .map((scaffold) => ({
      id: scaffold.question_id,
      prompt: scaffold.prompt,
      categoryA: scaffold.options[0].label,
      categoryB: scaffold.options[1].label,
      tagsForA: scaffold.options[0].metadata.descriptor_keywords,
      tagsForB: scaffold.options[1].metadata.descriptor_keywords,
      source_kind: scaffold.source_kind,
      dataset_gender: scaffold.dataset_gender,
      category_slug: scaffold.category_slug,
      subcategory_slug: scaffold.subcategory_slug,
    }));
}

export const buildThisOrThatV2QuestionScaffolds = (
): ThisOrThatV2QuestionScaffold[] =>
  THIS_OR_THAT_V2_CATEGORY_DEFINITIONS.flatMap((category) =>
    getThisOrThatV2AuthoredQuestions(
      category.id as ThisOrThatV2AuthoredCategoryId,
    ).map((question) => buildQuestionScaffoldFromAuthoredSeed(question)),
  );

export const buildThisOrThatV2DatasetCoverage = (
): ThisOrThatV2DatasetCoverageRow[] =>
  THIS_OR_THAT_V2_CATEGORY_DEFINITIONS.map((category) => {
    const authoredQuestions = getThisOrThatV2AuthoredQuestions(
      category.id as ThisOrThatV2AuthoredCategoryId,
    );
    const blueprint = CATEGORY_BLUEPRINT_BY_ID.get(category.id);

    return {
      dataset: "shared",
      source_category_id: category.id,
      source_category_title: category.title,
      question_count: authoredQuestions.length,
      status: category.status,
      top_level_category: blueprint?.category_slug ?? null,
      source_kind: authoredQuestions.length > 0 ? "authored-v2" : "none",
    };
  });

export const THIS_OR_THAT_V2_LIVE_SHARED_QUESTION_SCAFFOLD =
  buildThisOrThatV2QuestionScaffolds();

export const THIS_OR_THAT_V2_DATASET_COVERAGE =
  buildThisOrThatV2DatasetCoverage();

export const THIS_OR_THAT_V2_CONTENT_SOURCES = {
  runtimeFile: "src/data/thisOrThatV2.ts",
  contentContractFile: "src/data/thisOrThatV2.ts",
  authoredDatasetFile: "src/data/thisOrThatV2Authored.ts",
  topLevelMyGoTwoSlugs: THIS_OR_THAT_V2_TOP_LEVEL_CATEGORIES.map((category) => category.slug),
  datasetCoverage: THIS_OR_THAT_V2_DATASET_COVERAGE,
} as const;

export const buildThisOrThatV2RuntimeQuestionBank = (
): Record<string, ThisOrThatV2RuntimeQuestion[]> => {
  const bank: Record<string, ThisOrThatV2RuntimeQuestion[]> = {};

  for (const scaffold of buildThisOrThatV2QuestionScaffolds()) {
    const existing = bank[scaffold.source_category_id] ?? [];
    existing.push({
      id: scaffold.question_id,
      prompt: scaffold.prompt,
      categoryA: scaffold.options[0].label,
      categoryB: scaffold.options[1].label,
      tagsForA: scaffold.options[0].metadata.descriptor_keywords,
      tagsForB: scaffold.options[1].metadata.descriptor_keywords,
      source_kind: scaffold.source_kind,
      dataset_gender: scaffold.dataset_gender,
      category_slug: scaffold.category_slug,
      subcategory_slug: scaffold.subcategory_slug,
    });
    bank[scaffold.source_category_id] = existing;
  }

  return bank;
};

export function buildThisOrThatAnswerRecord(
  categoryId: string,
  question: ThisOrThatV2QuestionLike,
  choice: "A" | "B",
): ThisOrThatV2AnswerRecord;
export function buildThisOrThatAnswerRecord(
  categoryId: string,
  legacyDataset: Gender,
  question: ThisOrThatV2QuestionLike,
  choice: "A" | "B",
): ThisOrThatV2AnswerRecord;
export function buildThisOrThatAnswerRecord(
  categoryId: string,
  arg2: Gender | ThisOrThatV2QuestionLike,
  arg3: ThisOrThatV2QuestionLike | "A" | "B",
  arg4?: "A" | "B",
): ThisOrThatV2AnswerRecord {
  const category = CATEGORY_DEFINITION_BY_ID.get(categoryId);
  if (!category) {
    throw new Error(`Unknown This or That category: ${categoryId}`);
  }

  const question =
    typeof arg2 === "string"
      ? (arg3 as ThisOrThatV2QuestionLike)
      : arg2;
  const choice =
    typeof arg2 === "string"
      ? (arg4 as "A" | "B")
      : (arg3 as "A" | "B");

  const scaffold = buildThisOrThatV2QuestionScaffolds().find(
    (entry) => entry.source_category_id === categoryId && entry.question_id === question.id,
  );

  if (!scaffold) {
    throw new Error(`Unknown This or That question: ${categoryId}/${question.id}`);
  }

  const selected = scaffold.options.find((option) => option.option_key === choice)!;
  const rejected = scaffold.options.find((option) => option.option_key !== choice)!;

  return {
    category_id: categoryId,
    question_id: scaffold.question_id,
    question_prompt: scaffold.prompt,
    bank_gender: "shared",
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
      source_kind: scaffold.source_kind,
      weight: scaffold.weight,
    },
    source_version: "this-or-that-v2",
  };
}
