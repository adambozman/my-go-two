# This or That v2 Content Contract

This file owns the v2 content contract and content scaffolding for This or That.

Scope:

- content shape
- top-level category alignment
- option metadata contract
- live-vs-planned scaffolding

Out of scope:

- persistence
- recommendation runtime
- page wiring

## Source Files

Current live runtime source:

- `src/data/knowMeQuestions.ts`

v2 content scaffold source:

- `src/data/thisOrThatV2.ts`

## Top-Level Alignment

This or That v2 should align to the live My Go Two top-level category slugs:

- `clothes`
- `personal`
- `health`
- `gifts`
- `dining`
- `beverages`
- `household`
- `entertainment`
- `travel`

These match the live My Go Two strip/category model instead of inventing a separate top-level taxonomy.

## Category Mapping

Current live and planned This or That categories map as follows:

- `style-aesthetic` -> `clothes`
- `brands-shopping` -> `clothes`
- `colors-palette` -> `personal`
- `food-dining` -> `dining`
- `travel-trips` -> `travel`
- `date-ideas-romance` -> `entertainment`
- `home-living` -> `household`
- `love-language-relationships` -> `personal`
- `hobbies-weekend` -> `entertainment`
- `gifting-actually-want` -> `gifts`
- `food-orders` -> `dining` for now

Reserved top-level buckets with no live bank yet:

- `health`
- `beverages`

## v2 Option Metadata Contract

Every option scaffold in v2 should carry:

- `category_slug`
- `subcategory_slug`
- `entity_kind`
- `entity_slug`
- `primary_keyword`
- `descriptor_keywords`
- `avoid_keywords`
- `brand_keywords`
- `location_keywords`
- `weight`

The contract is exported from:

- `src/data/thisOrThatV2.ts`

## Content Rules

1. Store metadata on each option, not only on the question.
2. Preserve the opposite side as `avoid_keywords` scaffolding so future persistence can block conflicts cleanly.
3. Carry linked bank brand lists into `brand_keywords` when a This or That option represents a bank category rather than a single brand.
4. Carry destination and place cues into `location_keywords` when the linked bank content includes them.
5. Keep `weight` on the content blueprint so future persistence and recommendation code can use the same authored value.

## Live vs Legacy

The current live content is mixed:

- `style-aesthetic` still draws from the legacy flat `tot-*` bank
- most other live categories draw from the newer bank-backed `male-*` question sets

The v2 scaffold keeps both sources visible through:

- `source_kind = 'legacy-flat'`
- `source_kind = 'bank-v1'`

## Scaffolding Exports

`src/data/thisOrThatV2.ts` exports:

- `THIS_OR_THAT_V2_TOP_LEVEL_CATEGORIES`
- `THIS_OR_THAT_V2_CATEGORY_BLUEPRINTS`
- `buildThisOrThatV2QuestionScaffolds(gender)`
- `THIS_OR_THAT_V2_LIVE_MALE_QUESTION_SCAFFOLD`
- `THIS_OR_THAT_V2_LIVE_FEMALE_QUESTION_SCAFFOLD`
- `THIS_OR_THAT_V2_LIVE_NON_BINARY_QUESTION_SCAFFOLD`
- `THIS_OR_THAT_V2_CONTENT_SOURCES`

This is scaffolding only. It does not change runtime behavior.
