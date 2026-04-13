// profileQuestions.ts — Onboarding v3
// 7-screen architecture: static baseline questions + AI-driven screens (vibe, generated spend items, brand grid)
// Screens 1–2 are fully static. Screens 3, 5, 6 are AI-generated and served from cache (onboarding_vibe_cache,
// onboarding_spend_cache, onboarding_brand_cache). Onboarding.tsx fetches AI screens via the
// onboarding-ai-generator edge function and merges them into the question array at runtime.

export type QuestionType =
  | "image-grid"        // visual card grid, single or multi select
  | "pill-select"       // pill/chip list, multi select
  | "single-select"     // vertical radio list, single select
  | "rank-select"       // drag-or-tap ordered ranking
  | "spend-select"      // horizontal dollar-range tap buttons
  | "multi-select"      // checkbox-style list, multi select
  | "free-input"        // text input
  | "date-input"        // date picker
  | "ai-vibe"           // AI-generated: rendered by Onboarding.tsx using cached vibe options
  | "ai-spend-items"    // AI-generated: rendered as spend-select rows per item
  | "ai-brand-grid";    // AI-generated: rendered as pill-select brand chips

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;    // shown under label for spend-select and single-select
  emoji?: string;
  image?: string;
}

export interface SpendItem {
  id: string;             // e.g. "tshirt", "jeans"
  label: string;          // e.g. "A t-shirt"
  ranges: SpendRange[];
}

export interface SpendRange {
  id: string;             // e.g. "under_25"
  label: string;          // e.g. "Under $25"
  value: number;          // midpoint dollar value stored to DB e.g. 12
}

export interface OnboardingQuestion {
  id: string;
  screen: number;         // 1–7
  category: string;
  type: QuestionType;
  title: string;
  subtitle: string;
  multiSelect?: boolean;
  required?: boolean;
  placeholder?: string;
  options?: QuestionOption[];
  spendItems?: SpendItem[];   // for spend-select and ai-spend-items
  maxRank?: number;           // for rank-select — how many items user picks
}

// ─── STATIC SPEND RANGES (reused across spend questions) ──────────────────────

const CLOTHING_RANGES: SpendRange[] = [
  { id: "under_25",  label: "Under $25",  value: 12  },
  { id: "25_75",     label: "$25 – $75",  value: 50  },
  { id: "75_150",    label: "$75 – $150", value: 112 },
  { id: "150_plus",  label: "$150+",      value: 200 },
];

const DINING_RANGES: SpendRange[] = [
  { id: "under_20",  label: "Under $20",   value: 10  },
  { id: "20_50",     label: "$20 – $50",   value: 35  },
  { id: "50_100",    label: "$50 – $100",  value: 75  },
  { id: "100_plus",  label: "$100+",       value: 150 },
];

const TV_RANGES: SpendRange[] = [
  { id: "under_300",  label: "Under $300",   value: 150  },
  { id: "300_800",    label: "$300 – $800",  value: 550  },
  { id: "800_1500",   label: "$800 – $1,500",value: 1150 },
  { id: "1500_plus",  label: "$1,500+",      value: 2500 },
];

const SHOES_RANGES: SpendRange[] = [
  { id: "under_50",  label: "Under $50",   value: 25  },
  { id: "50_120",    label: "$50 – $120",  value: 85  },
  { id: "120_250",   label: "$120 – $250", value: 185 },
  { id: "250_plus",  label: "$250+",       value: 350 },
];

// ─── STATIC PROFILE QUESTIONS (Screens 1 & 2) ─────────────────────────────────
// These are shown to every user, in this order, before any AI-generated screen.

export const staticProfileQuestions: OnboardingQuestion[] = [
  // ── Screen 1: Basics ─────────────────────────────────────────────────────────
  {
    id: "age_range",
    screen: 1,
    category: "basics",
    type: "single-select",
    title: "How old are you?",
    subtitle: "This shapes everything — the AI uses it to show you trends that actually apply to you",
    required: true,
    options: [
      { id: "13_17", label: "13 – 17" },
      { id: "18_24", label: "18 – 24" },
      { id: "25_34", label: "25 – 34" },
      { id: "35_44", label: "35 – 44" },
      { id: "45_54", label: "45 – 54" },
      { id: "55_plus", label: "55+" },
    ],
  },
  {
    id: "gender",
    screen: 1,
    category: "basics",
    type: "single-select",
    title: "How do you identify?",
    subtitle: "Used only to personalize style and product suggestions — never used to restrict options",
    required: false,
    options: [
      { id: "man",        label: "Man" },
      { id: "woman",      label: "Woman" },
      { id: "nonbinary",  label: "Non-binary" },
      { id: "prefer_not", label: "Prefer not to say" },
    ],
  },

  // ── Screen 2: Category Priority ───────────────────────────────────────────────
  {
    id: "category_priority",
    screen: 2,
    category: "priorities",
    type: "rank-select",
    title: "What matters most to you?",
    subtitle: "Pick your top 3 — the recommendation engine starts here",
    required: true,
    multiSelect: true,
    maxRank: 3,
    options: [
      { id: "clothes",      label: "Clothes",       emoji: "👕" },
      { id: "personal",     label: "Personal Care",  emoji: "✨" },
      { id: "health",       label: "Health",         emoji: "💪" },
      { id: "gifts",        label: "Gifts",          emoji: "🎁" },
      { id: "dining",       label: "Dining",         emoji: "🍽️" },
      { id: "beverages",    label: "Beverages",      emoji: "☕" },
      { id: "household",    label: "Household",      emoji: "🏠" },
      { id: "entertainment",label: "Entertainment",  emoji: "🎮" },
      { id: "travel",       label: "Travel",         emoji: "✈️" },
    ],
  },

  // ── Screen 3: Vibe (AI-generated — placeholder, Onboarding.tsx replaces at runtime) ──
  // The actual options are fetched from onboarding_vibe_cache keyed on age_range + gender.
  // If cache miss, onboarding-ai-generator calls Gemini, saves to cache, returns options.
  // Onboarding.tsx swaps this placeholder's options with the cached AI result.
  {
    id: "style_vibe",
    screen: 3,
    category: "taste",
    type: "ai-vibe",
    title: "What's your vibe?",
    subtitle: "Pick the one that feels most like you right now",
    required: false,
    multiSelect: false,
    // options injected at runtime by Onboarding.tsx from onboarding_vibe_cache
  },

  // ── Screen 4: Spend Anchors — Fixed Baseline (everyone answers) ──────────────
  {
    id: "spend_baseline",
    screen: 4,
    category: "spend",
    type: "spend-select",
    title: "What do you usually spend on these?",
    subtitle: "Be honest — this is what makes your recommendations actually match your life",
    required: false,
    spendItems: [
      {
        id: "tshirt",
        label: "A t-shirt",
        ranges: CLOTHING_RANGES,
      },
      {
        id: "pants",
        label: "A pair of jeans or pants",
        ranges: CLOTHING_RANGES,
      },
      {
        id: "shoes",
        label: "A pair of shoes",
        ranges: SHOES_RANGES,
      },
      {
        id: "dinner_out",
        label: "A nice dinner out (per person)",
        ranges: DINING_RANGES,
      },
      {
        id: "tv",
        label: "A TV",
        ranges: TV_RANGES,
      },
    ],
  },

  // ── Screen 5: AI-Generated Spend Items (based on top categories from Screen 2) ──
  // The items shown here are chosen by the AI based on category_priority.
  // Fetched from onboarding_spend_cache keyed on top_3_categories (sorted, joined).
  // Rendered as additional spend-select rows alongside or after the fixed baseline.
  {
    id: "spend_generated",
    screen: 5,
    category: "spend",
    type: "ai-spend-items",
    title: "A few more for your priorities",
    subtitle: "Based on what you care about most",
    required: false,
    // spendItems injected at runtime by Onboarding.tsx from onboarding_spend_cache
  },

  // ── Screen 6: Brand Affinity (AI-curated options, everyone answers) ───────────
  // Brand options fetched from onboarding_brand_cache keyed on age_range + gender + top_category + spend_tier.
  // spend_tier is derived from Screen 4 answers: avg of tshirt + shoes ranges → budget/mid/premium/luxury.
  {
    id: "brand_affinity",
    screen: 6,
    category: "taste",
    type: "ai-brand-grid",
    title: "Which of these do you actually buy from?",
    subtitle: "Pick everything that applies — up to 5",
    required: false,
    multiSelect: true,
    // options injected at runtime by Onboarding.tsx from onboarding_brand_cache
  },

  // ── Screen 7: Shopping Behavior + Subscriptions ───────────────────────────────
  {
    id: "shopping_behavior",
    screen: 7,
    category: "behavior",
    type: "multi-select",
    title: "How do you usually shop?",
    subtitle: "Pick everything that applies",
    required: false,
    multiSelect: true,
    options: [
      { id: "online_mostly",      label: "Online mostly",                    description: "Amazon, brand sites, direct" },
      { id: "instore_mostly",     label: "In-store mostly",                  description: "Malls, Target, specialty shops" },
      { id: "mix",                label: "Mix of both",                      description: "Depends on the category" },
      { id: "research_then_buy",  label: "Research online, buy in-store",    description: "I like to touch it before I buy it" },
      { id: "impulse",            label: "I buy on impulse",                 description: "If I want it I get it" },
      { id: "deal_hunter",        label: "I wait for sales or deals",        description: "Never pay full price" },
    ],
  },
  {
    id: "subscription_habits",
    screen: 7,
    category: "behavior",
    type: "multi-select",
    title: "What do you pay for regularly?",
    subtitle: "Pick everything you currently use or subscribe to",
    required: false,
    multiSelect: true,
    options: [
      { id: "amazon_prime",   label: "Amazon Prime" },
      { id: "doordash",       label: "DoorDash / Uber Eats / Grubhub" },
      { id: "grocery_del",    label: "Grocery delivery (Instacart, etc.)" },
      { id: "meal_kit",       label: "Meal kit (HelloFresh, etc.)" },
      { id: "streaming",      label: "Streaming services" },
      { id: "sub_box",        label: "Subscription box (beauty, clothing, food)" },
      { id: "none",           label: "None of these" },
    ],
  },
  {
    id: "gift_personality",
    screen: 7,
    category: "gifting",
    type: "single-select",
    title: "When someone gives you a gift, what actually makes you happy?",
    subtitle: "This powers gift recommendations for people connected to you",
    required: false,
    multiSelect: false,
    options: [
      { id: "splurge",      label: "Something I'd never buy myself",  description: "A real treat" },
      { id: "practical",    label: "Something I actually need",        description: "Useful > impressive" },
      { id: "experience",   label: "A shared experience",              description: "Dinner, show, trip" },
      { id: "thoughtful",   label: "Something personal and thoughtful",description: "It's the meaning" },
      { id: "surprise",     label: "Surprise me",                      description: "I trust your taste" },
    ],
  },
];

// All static questions, exported for Onboarding.tsx.
// AI-driven questions (type: ai-vibe, ai-spend-items, ai-brand-grid) are included here
// as structural placeholders; Onboarding.tsx fetches and injects options at runtime.
export const profileQuestions = staticProfileQuestions;

// ─── CACHE KEY HELPERS ─────────────────────────────────────────────────────────
// Used by Onboarding.tsx and the onboarding-ai-generator edge function to build
// deterministic cache keys for each AI-generated screen.

export const buildVibeCacheKey = (ageRange: string, gender: string): string =>
  `${ageRange}__${gender}`;

export const buildSpendCacheKey = (topCategories: string[]): string =>
  [...topCategories].slice(0, 3).sort().join("__");

export const buildBrandCacheKey = (
  ageRange: string,
  gender: string,
  topCategory: string,
  spendTier: "budget" | "mid" | "premium" | "luxury",
): string => `${ageRange}__${gender}__${topCategory}__${spendTier}`;

// ─── SPEND TIER DERIVATION ─────────────────────────────────────────────────────
// Derives a spend tier from the baseline spend answers (Screen 4).
// Used as part of the brand cache key.

export const deriveSpendTier = (
  baselineAnswers: Record<string, string>,
): "budget" | "mid" | "premium" | "luxury" => {
  // Extract midpoint values for clothing items (tshirt + shoes)
  const clothingItems = ["tshirt", "shoes"];
  const rangeMap: Record<string, number> = {
    // clothing ranges
    under_25: 12, "25_75": 50, "75_150": 112, "150_plus": 200,
    // shoe ranges
    under_50: 25, "50_120": 85, "120_250": 185, "250_plus": 350,
  };

  const values: number[] = [];
  for (const item of clothingItems) {
    const key = `spend_baseline__${item}`;
    const rangeId = baselineAnswers[key];
    if (rangeId && rangeMap[rangeId] !== undefined) {
      values.push(rangeMap[rangeId]);
    }
  }

  if (values.length === 0) return "mid";
  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  if (avg < 40)  return "budget";
  if (avg < 120) return "mid";
  if (avg < 220) return "premium";
  return "luxury";
};
