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

export interface ThisOrThatV2AuthoredBrandBankEntry {
  brand: string;
  dnaTags: string[];
}

export interface ThisOrThatV2AuthoredBrandBankCategory {
  id: string;
  title: string;
  brands: ThisOrThatV2AuthoredBrandBankEntry[];
}

export interface ThisOrThatV2AuthoredBrandBankQuestion {
  id: string;
  prompt: string;
  categoryA: string;
  categoryB: string;
  tagsForA: string[];
  tagsForB: string[];
}

export interface ThisOrThatV2AuthoredBank {
  categories: ThisOrThatV2AuthoredBrandBankCategory[];
  questions: ThisOrThatV2AuthoredBrandBankQuestion[];
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
    q("totv2-m-style-02", "style-aesthetic", "Which closet upgrade feels more like you?", [
      a("Rugged Heritage Layers", "style", ["heritage", "rugged", "workwear", "textured"]),
      b("Refined European Basics", "style", ["refined", "european", "sleek", "fitted"]),
    ]),
    q("totv2-m-brand-01", "brands-shopping", "Which shopping mix feels closer to your closet?", [
      a("Classic Quality Basics", "brand preference", ["basics", "quality", "minimal", "timeless"], {
        brand_keywords: ["buck mason", "everlane", "uniqlo", "j.crew"],
      }),
      b("Outdoor Performance", "brand preference", ["outdoor", "performance", "technical", "active"], {
        brand_keywords: ["patagonia", "arc'teryx", "vuori", "the north face"],
      }),
    ]),
    q("totv2-m-brand-02", "brands-shopping", "Which menswear mix feels more like you?", [
      a("Denim and American Classics", "brand preference", ["denim", "american", "classic", "casual"], {
        brand_keywords: ["levi's", "madewell men", "j.crew", "banana republic"],
      }),
      b("Modern Athletic Essentials", "brand preference", ["athletic", "performance", "clean", "versatile"], {
        brand_keywords: ["lululemon", "vuori", "nike", "alo"],
      }),
    ]),
    q("totv2-m-color-01", "colors-palette", "Which palette feels more natural to you?", [
      a("Neutrals and Earth Tones", "color palette", ["neutrals", "earth tones", "camel", "olive"]),
      b("Black, White, and Cool Grays", "color palette", ["black", "white", "charcoal", "cool gray"]),
    ]),
    q("totv2-m-color-02", "colors-palette", "Which accent set feels better on you?", [
      a("Navy, Forest, and Rust", "color palette", ["navy", "forest", "rust", "warm contrast"]),
      b("Monochrome Stone and Slate", "color palette", ["stone", "slate", "monochrome", "quiet tones"]),
    ]),
    q("totv2-m-food-01", "food-dining", "Which dinner plan sounds better?", [
      a("Steakhouse and Red Wine", "dining preference", ["steakhouse", "red wine", "classic dinner"], {
        location_keywords: ["chicago", "austin", "nashville"],
      }),
      b("Sushi and Cocktails", "dining preference", ["sushi", "cocktails", "date spot", "modern"], {
        location_keywords: ["miami", "tokyo", "new york"],
      }),
    ]),
    q("totv2-m-food-02", "food-dining", "Which everyday meal plan sounds better?", [
      a("Burgers, Beer, and Game-Day Spots", "dining preference", ["burgers", "beer", "sports bar", "casual"], {
        location_keywords: ["dallas", "chicago", "denver"],
      }),
      b("Pasta, Espresso, and Neighborhood Italian", "dining preference", ["pasta", "espresso", "italian", "neighborhood spot"], {
        location_keywords: ["new york", "chicago", "boston"],
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
    q("totv2-m-travel-02", "travel-trips", "Which getaway sounds stronger right now?", [
      a("Golf Resort or Desert Sun", "travel preference", ["golf", "resort", "sunny", "desert"], {
        location_keywords: ["scottsdale", "palm springs", "cabo"],
      }),
      b("Cold-Weather City With Great Food", "travel preference", ["cold weather", "food city", "winter style", "urban"], {
        location_keywords: ["chicago", "montreal", "copenhagen"],
      }),
    ]),
    q("totv2-m-date-01", "date-ideas-romance", "Which date night feels more like you?", [
      a("Reservation and Drinks", "experience preference", ["reservation", "cocktails", "night out", "dinner"]),
      b("Concert or Game Night", "experience preference", ["concert", "sports", "event", "energy"]),
    ]),
    q("totv2-m-date-02", "date-ideas-romance", "Which kind of night out feels better?", [
      a("Chef's Counter and a Late Drink", "experience preference", ["chef's counter", "late drink", "curated", "city night"]),
      b("Comedy Show and Casual Dinner", "experience preference", ["comedy", "casual dinner", "low pressure", "fun"]),
    ]),
    q("totv2-m-home-01", "home-living", "What kind of home setup do you lean toward?", [
      a("Warm Leather and Wood", "home style", ["leather", "wood", "warm", "masculine"]),
      b("Clean Modern Lines", "home style", ["modern", "clean lines", "minimal", "black accents"]),
    ]),
    q("totv2-m-home-02", "home-living", "Which space feels more like you?", [
      a("Hotel-Like Calm", "home style", ["hotel-like", "calm", "neutral bedding", "quiet luxury"]),
      b("Collected Lounge Energy", "home style", ["collected", "lounge", "records", "ambient lighting"]),
    ]),
    q("totv2-m-love-01", "love-language-relationships", "What lands better from someone close to you?", [
      a("Planned Quality Time", "relationship preference", ["quality time", "shared plans", "intentional"]),
      b("Thoughtful Practical Gifts", "relationship preference", ["thoughtful gifts", "practical", "useful"]),
    ]),
    q("totv2-m-love-02", "love-language-relationships", "What kind of care reads stronger to you?", [
      a("Consistency and Follow-Through", "relationship preference", ["consistency", "follow-through", "reliable", "steady"]),
      b("Encouragement and Vocal Support", "relationship preference", ["encouragement", "support", "affirmation", "verbal"]),
    ]),
    q("totv2-m-hobby-01", "hobbies-weekend", "Which weekend sounds better?", [
      a("Golf, Gym, and a Nice Lunch", "hobby preference", ["golf", "fitness", "lunch spot", "active"]),
      b("Records, Coffee, and a Slow Morning", "hobby preference", ["vinyl", "coffee", "slow morning", "browsing"]),
    ]),
    q("totv2-m-hobby-02", "hobbies-weekend", "Which reset day sounds better?", [
      a("Pickup Game and Recovery Session", "hobby preference", ["basketball", "recovery", "active", "training"]),
      b("Bookstore, Espresso, and a Long Walk", "hobby preference", ["bookstore", "espresso", "long walk", "quiet city"]),
    ]),
    q("totv2-m-gift-01", "gifting-actually-want", "What kind of gift would feel stronger?", [
      a("A Better Version of Something I Use", "gift preference", ["upgrade", "practical", "daily use"]),
      b("A Special Experience I Wouldn't Book Myself", "gift preference", ["experience", "special", "surprise"]),
    ]),
    q("totv2-m-gift-02", "gifting-actually-want", "Which gift lands harder?", [
      a("A Great Jacket, Watch Strap, or Everyday Upgrade", "gift preference", ["style upgrade", "wearable", "daily upgrade"]),
      b("A Reservation, Event, or Weekend Plan", "gift preference", ["reservation", "event", "weekend plan", "experience"]),
    ]),
  ],
  female: [
    q("totv2-f-style-01", "style-aesthetic", "Which style lane feels more like you right now?", [
      a("Elevated Minimal", "style", ["elevated", "minimal", "clean", "polished"]),
      b("Romantic Statement", "style", ["romantic", "statement", "color", "feminine"]),
    ]),
    q("totv2-f-style-02", "style-aesthetic", "Which wardrobe mood feels stronger?", [
      a("Quiet Luxury Staples", "style", ["quiet luxury", "tailored", "neutral", "refined"]),
      b("Playful Texture and Print", "style", ["playful", "texture", "print", "fashion-forward"]),
    ]),
    q("totv2-f-brand-01", "brands-shopping", "Which shopping mix feels closer to your closet?", [
      a("Polished Everyday Staples", "brand preference", ["staples", "polished", "capsule", "quality"], {
        brand_keywords: ["sezane", "everlane", "j.crew", "madewell"],
      }),
      b("Trend-Forward High Low", "brand preference", ["trend", "fashion", "high-low", "fun"], {
        brand_keywords: ["zara", "reformation", "anthropologie", "aerie"],
      }),
    ]),
    q("totv2-f-brand-02", "brands-shopping", "Which brand mix feels more like your saved cart?", [
      a("Clean Tailoring and Elevated Basics", "brand preference", ["tailoring", "elevated basics", "polished", "premium"], {
        brand_keywords: ["aritzia", "sezane", "club monaco", "cos"],
      }),
      b("Wellness and Soft Everyday Dressing", "brand preference", ["wellness", "soft", "comfort", "easy"], {
        brand_keywords: ["alo", "lululemon", "free people", "spanx"],
      }),
    ]),
    q("totv2-f-color-01", "colors-palette", "Which palette feels more natural to you?", [
      a("Soft Neutrals", "color palette", ["cream", "taupe", "blush", "soft neutrals"]),
      b("Rich Contrast", "color palette", ["black", "camel", "deep red", "contrast"]),
    ]),
    q("totv2-f-color-02", "colors-palette", "Which finish feels more like your style?", [
      a("Champagne, Sage, and Warm White", "color palette", ["champagne", "sage", "warm white", "glow"]),
      b("Espresso, Ink, and Deep Berry", "color palette", ["espresso", "ink", "deep berry", "dramatic"]),
    ]),
    q("totv2-f-food-01", "food-dining", "Which dinner plan sounds better?", [
      a("Italian and Wine", "dining preference", ["italian", "wine bar", "cozy", "date night"], {
        location_keywords: ["chicago", "new york", "paris"],
      }),
      b("Sushi and Matcha Dessert", "dining preference", ["sushi", "dessert", "matcha", "modern"], {
        location_keywords: ["tokyo", "los angeles", "miami"],
      }),
    ]),
    q("totv2-f-food-02", "food-dining", "Which daytime plan feels better?", [
      a("Beautiful Brunch and Shopping", "dining preference", ["brunch", "shopping", "girls day", "sparkling"], {
        location_keywords: ["new york", "dallas", "chicago"],
      }),
      b("Cafe Lunch and a Wellness Stop", "dining preference", ["cafe lunch", "wellness", "fresh", "light"], {
        location_keywords: ["los angeles", "miami", "austin"],
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
    q("totv2-f-travel-02", "travel-trips", "Which trip mood feels stronger?", [
      a("Spa Reset and Slow Luxury", "travel preference", ["spa", "reset", "luxury", "slow travel"], {
        location_keywords: ["sedona", "scottsdale", "california coast"],
      }),
      b("Culture Weekend With Great Restaurants", "travel preference", ["culture", "restaurants", "gallery", "shopping"], {
        location_keywords: ["paris", "mexico city", "new york"],
      }),
    ]),
    q("totv2-f-date-01", "date-ideas-romance", "Which date night feels more like you?", [
      a("Wine Bar and Dressed Up Dinner", "experience preference", ["wine bar", "dinner", "dress up", "romantic"]),
      b("Market, Coffee, and Wandering", "experience preference", ["market", "coffee", "wandering", "casual romance"]),
    ]),
    q("totv2-f-date-02", "date-ideas-romance", "Which kind of date feels stronger?", [
      a("Flowers, a Reservation, and a Memorable Night", "experience preference", ["flowers", "reservation", "memorable", "romantic"]),
      b("Picnic, Walk, and Something Low-Key", "experience preference", ["picnic", "walk", "low-key", "soft romance"]),
    ]),
    q("totv2-f-home-01", "home-living", "What kind of home setup do you lean toward?", [
      a("Light, Airy, and Layered", "home style", ["airy", "light", "layered", "textured"]),
      b("Moody and Collected", "home style", ["moody", "collected", "vintage", "warm"]),
    ]),
    q("totv2-f-home-02", "home-living", "Which room energy feels more like you?", [
      a("Soft Hotel Suite Calm", "home style", ["hotel suite", "soft", "calm", "cream"]),
      b("Collected Vintage Charm", "home style", ["collected", "vintage", "charm", "character"]),
    ]),
    q("totv2-f-love-01", "love-language-relationships", "What lands better from someone close to you?", [
      a("Consistent Thoughtful Check-Ins", "relationship preference", ["consistency", "check-ins", "thoughtful"]),
      b("Planned Time That Feels Intentional", "relationship preference", ["quality time", "intentional", "planned"]),
    ]),
    q("totv2-f-love-02", "love-language-relationships", "What kind of care feels biggest?", [
      a("Being Remembered In Small Details", "relationship preference", ["remembered details", "observant", "thoughtful", "care"]),
      b("Feeling Chosen In Real Time", "relationship preference", ["chosen", "present", "time together", "secure"]),
    ]),
    q("totv2-f-hobby-01", "hobbies-weekend", "Which weekend sounds better?", [
      a("Pilates, Matcha, and a Great Lunch", "hobby preference", ["pilates", "matcha", "lunch", "wellness"]),
      b("Books, Art, and a Slow Cafe Morning", "hobby preference", ["books", "art", "cafe", "slow morning"]),
    ]),
    q("totv2-f-hobby-02", "hobbies-weekend", "Which free day sounds more like you?", [
      a("Farmer's Market and a Long Walk", "hobby preference", ["farmer's market", "long walk", "fresh flowers", "easy day"]),
      b("Museum, Boutique Stops, and Coffee", "hobby preference", ["museum", "boutique", "coffee", "city day"]),
    ]),
    q("totv2-f-gift-01", "gifting-actually-want", "What kind of gift would feel stronger?", [
      a("A Beautiful Thing I Will Use Often", "gift preference", ["beautiful", "useful", "everyday", "design"]),
      b("A Memorable Experience With Some Romance", "gift preference", ["experience", "romantic", "memorable"]),
    ]),
    q("totv2-f-gift-02", "gifting-actually-want", "Which gift would hit harder?", [
      a("Jewelry, Fragrance, or a Bag I'll Reach For", "gift preference", ["jewelry", "fragrance", "bag", "wearable gift"]),
      b("A Stay, Reservation, or Planned Escape", "gift preference", ["stay", "reservation", "escape", "experience gift"]),
    ]),
  ],
  "non-binary": [
    q("totv2-nb-style-01", "style-aesthetic", "Which style lane feels more like you right now?", [
      a("Sharp Androgynous Minimal", "style", ["androgynous", "sharp", "minimal", "clean"]),
      b("Expressive Creative Layering", "style", ["expressive", "creative", "layered", "playful"]),
    ]),
    q("totv2-nb-style-02", "style-aesthetic", "Which closet energy feels more like you?", [
      a("Uniform Dressing With Strong Shape", "style", ["uniform dressing", "structured", "shape", "pared back"]),
      b("Artful Mixing and Color Play", "style", ["artful", "mixed textures", "color play", "experimental"]),
    ]),
    q("totv2-nb-brand-01", "brands-shopping", "Which shopping mix feels closer to your closet?", [
      a("Utility, Structure, and Everyday Uniforms", "brand preference", ["utility", "structure", "uniform", "practical"], {
        brand_keywords: ["cos", "uniqlo", "wildfang", "rains"],
      }),
      b("Color, Shape, and Identity Expression", "brand preference", ["color", "shape", "identity", "expression"], {
        brand_keywords: ["big bud press", "tomboyx", "lucy and yak", "aritzia"],
      }),
    ]),
    q("totv2-nb-brand-02", "brands-shopping", "Which brand group feels closer to your saved looks?", [
      a("Minimal Utility and Technical Layers", "brand preference", ["minimal utility", "technical", "weather-ready", "clean"], {
        brand_keywords: ["rains", "cos", "arcteryx", "uniqlo"],
      }),
      b("Queer-Friendly Color and Comfort", "brand preference", ["queer-friendly", "comfort", "expressive", "playful"], {
        brand_keywords: ["tomboyx", "big bud press", "lucy and yak", "girlfriend collective"],
      }),
    ]),
    q("totv2-nb-color-01", "colors-palette", "Which palette feels more natural to you?", [
      a("Monochrome and Cool Tones", "color palette", ["monochrome", "cool tones", "silver", "charcoal"]),
      b("Warm Color Pops", "color palette", ["warm", "color pop", "gold", "green"]),
    ]),
    q("totv2-nb-color-02", "colors-palette", "Which finish feels better in your world?", [
      a("Graphite, Ink, and Frost", "color palette", ["graphite", "ink", "frost", "cool minimal"]),
      b("Moss, Amber, and Clay", "color palette", ["moss", "amber", "clay", "warm creative"]),
    ]),
    q("totv2-nb-food-01", "food-dining", "Which dinner plan sounds better?", [
      a("Small Plates and Natural Wine", "dining preference", ["small plates", "natural wine", "trendy", "shared plates"], {
        location_keywords: ["brooklyn", "portland", "chicago"],
      }),
      b("Noodles, Dumplings, and Late Night Tea", "dining preference", ["noodles", "dumplings", "late night", "tea"], {
        location_keywords: ["tokyo", "osaka", "new york"],
      }),
    ]),
    q("totv2-nb-food-02", "food-dining", "Which outing sounds better?", [
      a("Cafe Lunch and a Bookshop Stop", "dining preference", ["cafe lunch", "bookshop", "slow city", "casual"], {
        location_keywords: ["portland", "brooklyn", "austin"],
      }),
      b("Spicy Dinner and a Late Show", "dining preference", ["spicy food", "late show", "night out", "energy"], {
        location_keywords: ["new york", "chicago", "berlin"],
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
    q("totv2-nb-travel-02", "travel-trips", "Which getaway feels stronger?", [
      a("Creative City With Great Vintage", "travel preference", ["creative city", "vintage", "music", "walkable"], {
        location_keywords: ["berlin", "mexico city", "brooklyn"],
      }),
      b("Cabin Reset and Dark Sky Nights", "travel preference", ["cabin", "dark sky", "quiet", "nature"], {
        location_keywords: ["upstate new york", "montana", "oregon coast"],
      }),
    ]),
    q("totv2-nb-date-01", "date-ideas-romance", "Which date night feels more like you?", [
      a("Gallery, Cocktails, and Talking for Hours", "experience preference", ["gallery", "cocktails", "conversation", "city"]),
      b("Record Store, Walk, and Casual Dinner", "experience preference", ["record store", "walk", "casual dinner", "low-key"]),
    ]),
    q("totv2-nb-date-02", "date-ideas-romance", "Which kind of connection time feels better?", [
      a("A Thoughtful Plan With Strong Atmosphere", "experience preference", ["thoughtful plan", "atmosphere", "curated", "special"]),
      b("An Easy Wandering Day With No Rush", "experience preference", ["wandering", "day date", "no rush", "comfort"]),
    ]),
    q("totv2-nb-home-01", "home-living", "What kind of home setup do you lean toward?", [
      a("Minimal, Graphic, and Intentional", "home style", ["minimal", "graphic", "intentional", "modern"]),
      b("Collected, Cozy, and Eclectic", "home style", ["eclectic", "cozy", "collected", "color"]),
    ]),
    q("totv2-nb-home-02", "home-living", "Which room mood feels better?", [
      a("Gallery-Like Calm", "home style", ["gallery-like", "calm", "editorial", "open space"]),
      b("Layered Color and Personal Objects", "home style", ["layered color", "personal objects", "warm", "lived-in"]),
    ]),
    q("totv2-nb-love-01", "love-language-relationships", "What lands better from someone close to you?", [
      a("Feeling Seen and Understood", "relationship preference", ["seen", "understood", "affirmation", "depth"]),
      b("Shared Time That Feels Safe and Easy", "relationship preference", ["shared time", "safe", "easy", "comfort"]),
    ]),
    q("totv2-nb-love-02", "love-language-relationships", "What kind of care matters more?", [
      a("Real Curiosity About Who I Am", "relationship preference", ["curiosity", "identity", "being known", "depth"]),
      b("Reliability That Feels Grounding", "relationship preference", ["reliability", "grounding", "stable", "safe"]),
    ]),
    q("totv2-nb-hobby-01", "hobbies-weekend", "Which weekend sounds better?", [
      a("Thrifting, Coffee, and a Creative Project", "hobby preference", ["thrifting", "coffee", "creative", "project"]),
      b("Workout, Cooking, and a Movie Night", "hobby preference", ["workout", "cooking", "movie night", "reset"]),
    ]),
    q("totv2-nb-hobby-02", "hobbies-weekend", "Which free day feels more like you?", [
      a("Museum, Design Store, and Coffee", "hobby preference", ["museum", "design store", "coffee", "city wandering"]),
      b("Long Run, Grocery Haul, and Cooking at Home", "hobby preference", ["long run", "groceries", "cooking", "routine"]),
    ]),
    q("totv2-nb-gift-01", "gifting-actually-want", "What kind of gift would feel stronger?", [
      a("Something Useful That Still Feels Designed", "gift preference", ["useful", "designed", "intentional", "everyday"]),
      b("Something Personal That Feels One Of A Kind", "gift preference", ["personal", "one of a kind", "meaningful", "special"]),
    ]),
    q("totv2-nb-gift-02", "gifting-actually-want", "Which gift lands better?", [
      a("A Designed Everyday Object I'll Keep Using", "gift preference", ["designed object", "everyday", "useful", "keepsake"]),
      b("A Ticket, Stay, or Shared Plan", "gift preference", ["ticket", "stay", "shared plan", "experience"]),
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

export const getThisOrThatV2AuthoredBank = (
  gender: Gender,
  categoryId: ThisOrThatV2AuthoredCategoryId,
): ThisOrThatV2AuthoredBank | null => {
  const questions = getThisOrThatV2AuthoredQuestions(gender, categoryId);
  if (questions.length === 0) return null;

  const categoriesByLabel = new Map<string, ThisOrThatV2AuthoredBrandBankCategory>();

  for (const question of questions) {
    for (const option of question.options) {
      if (categoriesByLabel.has(option.label)) continue;
      categoriesByLabel.set(option.label, {
        id: `${categoryId}-${option.option_key.toLowerCase()}-${question.question_id}`,
        title: option.label,
        brands: (option.brand_keywords ?? []).map((brand) => ({
          brand,
          dnaTags: option.descriptor_keywords,
        })),
      });
    }
  }

  return {
    categories: Array.from(categoriesByLabel.values()),
    questions: questions.map((question) => ({
      id: question.question_id,
      prompt: question.prompt,
      categoryA: question.options[0].label,
      categoryB: question.options[1].label,
      tagsForA: question.options[0].descriptor_keywords,
      tagsForB: question.options[1].descriptor_keywords,
    })),
  };
};
