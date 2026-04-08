import type { Gender } from "@/lib/gender";

export type ThisOrThatV2AuthoredCategoryId =
  | "style-aesthetic"
  | "brands-shopping"
  | "colors-palette"
  | "food-dining"
  | "travel-trips"
  | "date-ideas-romance"
  | "home-living"
  | "love-language-relationships"
  | "hobbies-weekend"
  | "gifting-actually-want";

export interface ThisOrThatV2AuthoredOptionSeed {
  option_key: "A" | "B";
  label: string;
  primary_keyword: string;
  descriptor_keywords: string[];
  avoid_keywords?: string[];
  brand_keywords?: string[];
  location_keywords?: string[];
  weight?: number;
}

export interface ThisOrThatV2AuthoredQuestionSeed {
  question_id: string;
  source_category_id: ThisOrThatV2AuthoredCategoryId;
  prompt: string;
  supported_genders: Gender[];
  options: [ThisOrThatV2AuthoredOptionSeed, ThisOrThatV2AuthoredOptionSeed];
}

const q = (
  question_id: string,
  source_category_id: ThisOrThatV2AuthoredCategoryId,
  prompt: string,
  options: [ThisOrThatV2AuthoredOptionSeed, ThisOrThatV2AuthoredOptionSeed],
): ThisOrThatV2AuthoredQuestionSeed => ({
  question_id,
  source_category_id,
  prompt,
  supported_genders: ["male", "female", "non-binary"],
  options,
});

const a = (
  label: string,
  primary_keyword: string,
  descriptor_keywords: string[],
  extras: Omit<ThisOrThatV2AuthoredOptionSeed, "option_key" | "label" | "primary_keyword" | "descriptor_keywords"> = {},
): ThisOrThatV2AuthoredOptionSeed => ({
  option_key: "A",
  label,
  primary_keyword,
  descriptor_keywords,
  ...extras,
});

const b = (
  label: string,
  primary_keyword: string,
  descriptor_keywords: string[],
  extras: Omit<ThisOrThatV2AuthoredOptionSeed, "option_key" | "label" | "primary_keyword" | "descriptor_keywords"> = {},
): ThisOrThatV2AuthoredOptionSeed => ({
  option_key: "B",
  label,
  primary_keyword,
  descriptor_keywords,
  ...extras,
});

export const THIS_OR_THAT_V2_AUTHORED_DATASETS: Record<
  Gender,
  ThisOrThatV2AuthoredQuestionSeed[]
> = {
  male: [
    q("totv2-m-style-01", "style-aesthetic", "Which style lane feels more like you right now?", [
      a("Tailored Essentials", "style", ["tailored", "clean", "minimal", "sharp"]),
      b("Relaxed Streetwear", "style", ["relaxed", "streetwear", "oversized", "casual"]),
    ]),
    q("totv2-m-brand-01", "brands-shopping", "Which shopping mix feels closer to your closet?", [
      a("Classic Quality Basics", "brand preference", ["basics", "quality", "minimal", "timeless"], {
        brand_keywords: ["buck mason", "everlane", "uniqlo", "j.crew"],
      }),
      b("Outdoor Performance", "brand preference", ["outdoor", "performance", "technical", "active"], {
        brand_keywords: ["patagonia", "arc'teryx", "vuori", "the north face"],
      }),
    ]),
    q("totv2-m-color-01", "colors-palette", "Which palette feels more natural to you?", [
      a("Neutrals and Earth Tones", "color palette", ["neutrals", "earth tones", "camel", "olive"]),
      b("Black, White, and Cool Grays", "color palette", ["black", "white", "charcoal", "cool gray"]),
    ]),
    q("totv2-m-food-01", "food-dining", "Which dinner plan sounds better?", [
      a("Steakhouse and Red Wine", "dining preference", ["steakhouse", "red wine", "classic dinner"], {
        location_keywords: ["chicago", "austin", "nashville"],
      }),
      b("Sushi and Cocktails", "dining preference", ["sushi", "cocktails", "date spot", "modern"], {
        location_keywords: ["miami", "tokyo", "new york"],
      }),
    ]),
    q("totv2-m-travel-01", "travel-trips", "What kind of trip sounds better?", [
      a("Mountain Escape", "travel preference", ["mountains", "cabin", "outdoors", "hiking"], {
        location_keywords: ["aspen", "colorado", "montana", "utah"],
      }),
      b("City Weekend", "travel preference", ["city", "boutique hotel", "restaurants", "walkable"], {
        location_keywords: ["new york", "chicago", "london", "tokyo"],
      }),
    ]),
    q("totv2-m-date-01", "date-ideas-romance", "Which date night feels more like you?", [
      a("Reservation and Drinks", "experience preference", ["reservation", "cocktails", "night out", "dinner"]),
      b("Concert or Game Night", "experience preference", ["concert", "sports", "event", "energy"]),
    ]),
    q("totv2-m-home-01", "home-living", "What kind of home setup do you lean toward?", [
      a("Warm Leather and Wood", "home style", ["leather", "wood", "warm", "masculine"]),
      b("Clean Modern Lines", "home style", ["modern", "clean lines", "minimal", "black accents"]),
    ]),
    q("totv2-m-love-01", "love-language-relationships", "What lands better from someone close to you?", [
      a("Planned Quality Time", "relationship preference", ["quality time", "shared plans", "intentional"]),
      b("Thoughtful Practical Gifts", "relationship preference", ["thoughtful gifts", "practical", "useful"]),
    ]),
    q("totv2-m-hobby-01", "hobbies-weekend", "Which weekend sounds better?", [
      a("Golf, Gym, and a Nice Lunch", "hobby preference", ["golf", "fitness", "lunch spot", "active"]),
      b("Records, Coffee, and a Slow Morning", "hobby preference", ["vinyl", "coffee", "slow morning", "browsing"]),
    ]),
    q("totv2-m-gift-01", "gifting-actually-want", "What kind of gift would feel stronger?", [
      a("A Better Version of Something I Use", "gift preference", ["upgrade", "practical", "daily use"]),
      b("A Special Experience I Wouldn't Book Myself", "gift preference", ["experience", "special", "surprise"]),
    ]),
  ],
  female: [
    q("totv2-f-style-01", "style-aesthetic", "Which style lane feels more like you right now?", [
      a("Elevated Minimal", "style", ["elevated", "minimal", "clean", "polished"]),
      b("Romantic Statement", "style", ["romantic", "statement", "color", "feminine"]),
    ]),
    q("totv2-f-brand-01", "brands-shopping", "Which shopping mix feels closer to your closet?", [
      a("Polished Everyday Staples", "brand preference", ["staples", "polished", "capsule", "quality"], {
        brand_keywords: ["sezane", "everlane", "j.crew", "madewell"],
      }),
      b("Trend-Forward High Low", "brand preference", ["trend", "fashion", "high-low", "fun"], {
        brand_keywords: ["zara", "reformation", "anthropologie", "aerie"],
      }),
    ]),
    q("totv2-f-color-01", "colors-palette", "Which palette feels more natural to you?", [
      a("Soft Neutrals", "color palette", ["cream", "taupe", "blush", "soft neutrals"]),
      b("Rich Contrast", "color palette", ["black", "camel", "deep red", "contrast"]),
    ]),
    q("totv2-f-food-01", "food-dining", "Which dinner plan sounds better?", [
      a("Italian and Wine", "dining preference", ["italian", "wine bar", "cozy", "date night"], {
        location_keywords: ["chicago", "new york", "paris"],
      }),
      b("Sushi and Matcha Dessert", "dining preference", ["sushi", "dessert", "matcha", "modern"], {
        location_keywords: ["tokyo", "los angeles", "miami"],
      }),
    ]),
    q("totv2-f-travel-01", "travel-trips", "What kind of trip sounds better?", [
      a("Coastal Resort Weekend", "travel preference", ["coastal", "resort", "spa", "sunny"], {
        location_keywords: ["miami", "amalfi", "malibu", "tulum"],
      }),
      b("Walkable City Getaway", "travel preference", ["city", "shopping", "cafes", "boutique hotel"], {
        location_keywords: ["paris", "new york", "london", "copenhagen"],
      }),
    ]),
    q("totv2-f-date-01", "date-ideas-romance", "Which date night feels more like you?", [
      a("Wine Bar and Dressed Up Dinner", "experience preference", ["wine bar", "dinner", "dress up", "romantic"]),
      b("Market, Coffee, and Wandering", "experience preference", ["market", "coffee", "wandering", "casual romance"]),
    ]),
    q("totv2-f-home-01", "home-living", "What kind of home setup do you lean toward?", [
      a("Light, Airy, and Layered", "home style", ["airy", "light", "layered", "textured"]),
      b("Moody and Collected", "home style", ["moody", "collected", "vintage", "warm"]),
    ]),
    q("totv2-f-love-01", "love-language-relationships", "What lands better from someone close to you?", [
      a("Consistent Thoughtful Check-Ins", "relationship preference", ["consistency", "check-ins", "thoughtful"]),
      b("Planned Time That Feels Intentional", "relationship preference", ["quality time", "intentional", "planned"]),
    ]),
    q("totv2-f-hobby-01", "hobbies-weekend", "Which weekend sounds better?", [
      a("Pilates, Matcha, and a Great Lunch", "hobby preference", ["pilates", "matcha", "lunch", "wellness"]),
      b("Books, Art, and a Slow Cafe Morning", "hobby preference", ["books", "art", "cafe", "slow morning"]),
    ]),
    q("totv2-f-gift-01", "gifting-actually-want", "What kind of gift would feel stronger?", [
      a("A Beautiful Thing I Will Use Often", "gift preference", ["beautiful", "useful", "everyday", "design"]),
      b("A Memorable Experience With Some Romance", "gift preference", ["experience", "romantic", "memorable"]),
    ]),
  ],
  "non-binary": [
    q("totv2-nb-style-01", "style-aesthetic", "Which style lane feels more like you right now?", [
      a("Sharp Androgynous Minimal", "style", ["androgynous", "sharp", "minimal", "clean"]),
      b("Expressive Creative Layering", "style", ["expressive", "creative", "layered", "playful"]),
    ]),
    q("totv2-nb-brand-01", "brands-shopping", "Which shopping mix feels closer to your closet?", [
      a("Utility, Structure, and Everyday Uniforms", "brand preference", ["utility", "structure", "uniform", "practical"], {
        brand_keywords: ["cos", "uniqlo", "wildfang", "rains"],
      }),
      b("Color, Shape, and Identity Expression", "brand preference", ["color", "shape", "identity", "expression"], {
        brand_keywords: ["big bud press", "tomboyx", "lucy and yak", "aritzia"],
      }),
    ]),
    q("totv2-nb-color-01", "colors-palette", "Which palette feels more natural to you?", [
      a("Monochrome and Cool Tones", "color palette", ["monochrome", "cool tones", "silver", "charcoal"]),
      b("Warm Color Pops", "color palette", ["warm", "color pop", "gold", "green"]),
    ]),
    q("totv2-nb-food-01", "food-dining", "Which dinner plan sounds better?", [
      a("Small Plates and Natural Wine", "dining preference", ["small plates", "natural wine", "trendy", "shared plates"], {
        location_keywords: ["brooklyn", "portland", "chicago"],
      }),
      b("Noodles, Dumplings, and Late Night Tea", "dining preference", ["noodles", "dumplings", "late night", "tea"], {
        location_keywords: ["tokyo", "osaka", "new york"],
      }),
    ]),
    q("totv2-nb-travel-01", "travel-trips", "What kind of trip sounds better?", [
      a("Design-Led City Stay", "travel preference", ["design", "city", "gallery", "boutique stay"], {
        location_keywords: ["copenhagen", "tokyo", "berlin", "new york"],
      }),
      b("Nature Reset With Strong Views", "travel preference", ["nature", "reset", "views", "quiet"], {
        location_keywords: ["sedona", "big sur", "iceland", "utah"],
      }),
    ]),
    q("totv2-nb-date-01", "date-ideas-romance", "Which date night feels more like you?", [
      a("Gallery, Cocktails, and Talking for Hours", "experience preference", ["gallery", "cocktails", "conversation", "city"]),
      b("Record Store, Walk, and Casual Dinner", "experience preference", ["record store", "walk", "casual dinner", "low-key"]),
    ]),
    q("totv2-nb-home-01", "home-living", "What kind of home setup do you lean toward?", [
      a("Minimal, Graphic, and Intentional", "home style", ["minimal", "graphic", "intentional", "modern"]),
      b("Collected, Cozy, and Eclectic", "home style", ["eclectic", "cozy", "collected", "color"]),
    ]),
    q("totv2-nb-love-01", "love-language-relationships", "What lands better from someone close to you?", [
      a("Feeling Seen and Understood", "relationship preference", ["seen", "understood", "affirmation", "depth"]),
      b("Shared Time That Feels Safe and Easy", "relationship preference", ["shared time", "safe", "easy", "comfort"]),
    ]),
    q("totv2-nb-hobby-01", "hobbies-weekend", "Which weekend sounds better?", [
      a("Thrifting, Coffee, and a Creative Project", "hobby preference", ["thrifting", "coffee", "creative", "project"]),
      b("Workout, Cooking, and a Movie Night", "hobby preference", ["workout", "cooking", "movie night", "reset"]),
    ]),
    q("totv2-nb-gift-01", "gifting-actually-want", "What kind of gift would feel stronger?", [
      a("Something Useful That Still Feels Designed", "gift preference", ["useful", "designed", "intentional", "everyday"]),
      b("Something Personal That Feels One Of A Kind", "gift preference", ["personal", "one of a kind", "meaningful", "special"]),
    ]),
  ],
};

export const getThisOrThatV2AuthoredQuestions = (
  gender: Gender,
  categoryId?: ThisOrThatV2AuthoredCategoryId,
): ThisOrThatV2AuthoredQuestionSeed[] => {
  const dataset = THIS_OR_THAT_V2_AUTHORED_DATASETS[gender] ?? [];
  if (!categoryId) return dataset;
  return dataset.filter((question) => question.source_category_id === categoryId);
};
