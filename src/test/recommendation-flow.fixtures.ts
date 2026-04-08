import type { RecommendationIntent } from "../../supabase/functions/_shared/knowMeCatalog.ts";

export type RecommendationFlowFixture = {
  userId: string;
  weekStartKey: string;
  knowledgeResponses: Record<string, unknown>;
  sharedCards: Array<Record<string, unknown>>;
  yourVibe: Record<string, unknown>;
  weeklyIntents: RecommendationIntent[];
  connectionIntents: RecommendationIntent[];
};

const harperKnowledgeResponses = {
  "style-personality": ["classic", "minimal", "luxury"],
  "daily-vibe": ["polished", "professional"],
  "spending-mindset": "quality",
  "purchase-values": ["fit", "timeless", "comfort"],
  "free-time": ["dining", "traveling", "events"],
  "gift-preference": "thoughtful",
  "aesthetic-lean": ["elegant", "minimal"],
  "sf-01": ["classic", "minimalist", "trendy"],
  "sf-02": "navy",
  "sf-04": "tailored",
  "sf-05": "linen",
  "sf-06": ["sneakers", "boots", "heels"],
  "sf-10": ["luxury", "sustainable", "high-street"],
  "sf-11": "gold",
  "sf-13": "put-together",
  "sf-14": "fresh",
} as const;

const harperSharedCards = [
  {
    product_card_key: "clothing-tops",
    subcategory_label: "Favorite tops",
    card_title: "Silk tanks and fitted knits",
    field_values: {
      "Favorite silhouettes": "Silk shell, ribbed knit, slim cardigan",
      Colors: "Ivory, navy, camel",
      "Avoid details": "Oversized logos, neon trim",
    },
  },
  {
    product_card_key: "shoe-sneakers",
    subcategory_label: "Sneakers",
    card_title: "Clean white everyday sneakers",
    field_values: {
      Brand: "Veja, New Balance",
      Material: "Smooth leather or suede accents",
      Notes: "Minimal branding and a slim profile",
    },
  },
  {
    product_card_key: "wish-list",
    subcategory_label: "Wish list",
    card_title: "Weekend bag and silk pajamas",
    field_values: {
      "Most wanted": "Structured weekend bag, silk sleep set",
      "Price comfort": "$100-$350",
      "Why": "Both would get used constantly",
    },
  },
] as const;

const harperYourVibe = {
  persona_summary:
    "Harper is a polished, quietly luxe test profile with a strong point of view around refined basics, fresh beauty, special dinners, and gifts that feel intentional instead of loud.",
  recommended_brands: ["Aritzia", "Reformation", "Sezane", "Mejuri", "Jenni Kayne"],
  recommended_stores: ["Nordstrom", "Shopbop", "Anthropologie"],
  image_themes: ["coastal hotel", "soft tailoring", "elevated neutrals"],
  color_palette: ["ivory", "navy", "camel", "soft black"],
  gift_categories: ["fine jewelry", "luxury sleepwear", "dining experiences"],
  price_tier: "premium",
  style_keywords: ["polished", "minimal", "soft luxury", "romantic", "refined"],
} as const;

const rowanKnowledgeResponses = {
  "style-personality": ["sporty", "edgy", "laid-back"],
  "daily-vibe": ["creative", "chill"],
  "spending-mindset": "balanced",
  "purchase-values": ["comfort", "price", "trend"],
  "free-time": ["outdoors", "fitness", "staying-in"],
  "gift-preference": "experience",
  "aesthetic-lean": ["street", "boho"],
  "sf-01": ["minimalist", "sporty", "bohemian"],
  "sf-02": "earth-tones",
  "sf-04": "relaxed",
  "sf-05": "athletic",
  "sf-06": ["sneakers", "boots"],
  "sf-10": ["athletic", "vintage", "indie"],
  "sf-11": "mixed",
  "sf-13": "outdoorsy",
  "sf-17": "balanced",
} as const;

const rowanSharedCards = [
  {
    product_card_key: "brand-preferences",
    subcategory_label: "Favorite brands",
    card_title: "Functional everyday staples",
    field_values: {
      Brands: "Patagonia, Muji, Uniqlo, Bellroy",
      Notes: "Practical, durable, clean lines",
    },
  },
  {
    product_card_key: "travel-mountain",
    subcategory_label: "Trips",
    card_title: "Cabins, trails, and cold mornings",
    field_values: {
      "Ideal trip": "Cabin stay with hiking and a fire pit",
      Pace: "Active day, calm evening",
      "Avoid": "Crowded party destinations",
    },
  },
  {
    product_card_key: "wish-list",
    subcategory_label: "Wish list",
    card_title: "Travel gear and a better reading lamp",
    field_values: {
      "Most wanted": "Compact daypack, smart lamp, new hiking layers",
      "Price comfort": "$50-$200",
      "Why": "Useful upgrades get used right away",
    },
  },
] as const;

const rowanYourVibe = {
  persona_summary:
    "Rowan is a creative, outdoors-leaning test profile who blends practical gear, warm home comfort, subtle tech, and experience-first gifting into one flexible personality.",
  recommended_brands: ["Patagonia", "REI", "Muji", "Uniqlo", "Bellroy"],
  recommended_stores: ["REI", "Apple", "Muji", "Everlane"],
  image_themes: ["trail weekend", "earth tones", "cozy fire pit"],
  color_palette: ["olive", "stone", "black", "warm rust"],
  gift_categories: ["travel gear", "smart home", "outdoor experiences"],
  price_tier: "mid-range",
  style_keywords: ["functional", "creative", "relaxed", "modern", "outdoor"],
} as const;

const weeklyIntents: RecommendationIntent[] = [
  {
    brand: "American Eagle",
    name: "Skinny Blue Jeans",
    price: "$59.95",
    category: "clothes",
    hook: "A clean everyday denim pick that matches the rest of the wardrobe.",
    why: "The profile leans polished but still wants versatile denim that can be dressed up or down.",
    recommendation_kind: "specific",
    search_query: "American Eagle skinny blue jeans",
    keywords: ["american eagle", "skinny blue jeans", "blue jeans", "denim", "clothes"],
  },
  {
    brand: "Mejuri",
    name: "Thin Dome Ring",
    price: "$78",
    category: "clothes",
    hook: "A subtle gold piece that fits the refined daily stack.",
    why: "This keeps the recommendation aligned with polished, minimal jewelry signals.",
    recommendation_kind: "specific",
    search_query: "Mejuri thin dome ring gold",
    keywords: ["mejuri", "thin dome ring", "gold ring", "jewelry", "minimal"],
  },
  {
    brand: "Lunya",
    name: "Washable Silk Tee Set",
    price: "$198",
    category: "home",
    hook: "Comfort that still feels intentionally elevated.",
    why: "The profile likes luxury sleepwear and practical items with a premium finish.",
    recommendation_kind: "specific",
    search_query: "Lunya washable silk tee set",
    keywords: ["lunya", "silk tee set", "sleepwear", "luxury", "home"],
  },
];

const connectionIntents: RecommendationIntent[] = [
  {
    brand: "American Eagle",
    name: "Skinny Blue Jeans",
    price: "$59.95",
    category: "clothes",
    hook: "A giftable denim pick that fits the shared style signals.",
    why: "The connection context surfaces denim and casual staples as a reliable shared fit.",
    recommendation_kind: "specific",
    search_query: "American Eagle skinny blue jeans",
    keywords: ["blue jeans", "denim", "skinny blue jeans", "american eagle", "clothes"],
  },
  {
    brand: "Bellroy",
    name: "Lite Daypack",
    price: "$129",
    category: "tech",
    hook: "A practical carry piece for travel and daily use.",
    why: "This is a functional connection pick that fits the outdoors, travel, and gear signals.",
    recommendation_kind: "generic",
    search_query: "Bellroy Lite Daypack",
    keywords: ["bellroy", "daypack", "travel bag", "practical", "tech"],
  },
];

export const harperWeeklyFixture: RecommendationFlowFixture = {
  userId: "6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01",
  weekStartKey: "2026-04-06",
  knowledgeResponses: harperKnowledgeResponses as Record<string, unknown>,
  sharedCards: harperSharedCards as unknown as Array<Record<string, unknown>>,
  yourVibe: harperYourVibe as Record<string, unknown>,
  weeklyIntents,
  connectionIntents,
};

export const rowanConnectionFixture: RecommendationFlowFixture = {
  userId: "7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02",
  weekStartKey: "2026-04-06",
  knowledgeResponses: rowanKnowledgeResponses as Record<string, unknown>,
  sharedCards: rowanSharedCards as unknown as Array<Record<string, unknown>>,
  yourVibe: rowanYourVibe as Record<string, unknown>,
  weeklyIntents,
  connectionIntents,
};
