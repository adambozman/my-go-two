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

// ─────────────────────────────────────────────────────────────
// TOURNAMENT QUESTION BANK
// Every question is brand-vs-brand, product-vs-product, or
// concrete-preference-vs-concrete-preference. The goal is to
// build ranked hierarchies the AI can sell to companies.
// ─────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════
// CLOTHES — STYLE & AESTHETIC
// ══════════════════════════════════════════════════════════════
const STYLE_AESTHETIC: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-style-01", "style-aesthetic", "Which brand fits your everyday style?", [
    a("Zara", "brand preference", ["fast fashion", "trendy", "european", "affordable"], {
      brand_keywords: ["zara"],
    }),
    b("H&M", "brand preference", ["basics", "affordable", "scandinavian", "versatile"], {
      brand_keywords: ["h&m"],
    }),
  ]),
  q("tot-style-02", "style-aesthetic", "Which closet staple brand do you reach for?", [
    a("Uniqlo", "brand preference", ["minimal", "quality basics", "japanese", "functional"], {
      brand_keywords: ["uniqlo"],
    }),
    b("Gap", "brand preference", ["american", "classic", "casual", "denim"], {
      brand_keywords: ["gap"],
    }),
  ]),
  q("tot-style-03", "style-aesthetic", "Which premium basics brand feels more like you?", [
    a("Everlane", "brand preference", ["transparent", "minimal", "ethical", "clean"], {
      brand_keywords: ["everlane"],
    }),
    b("COS", "brand preference", ["architectural", "scandinavian", "refined", "modern"], {
      brand_keywords: ["cos"],
    }),
  ]),
  q("tot-style-04", "style-aesthetic", "Which athletic brand do you wear outside the gym?", [
    a("Nike", "brand preference", ["athletic", "iconic", "streetwear", "swoosh"], {
      brand_keywords: ["nike"],
    }),
    b("Adidas", "brand preference", ["athletic", "retro", "three stripes", "european sport"], {
      brand_keywords: ["adidas"],
    }),
  ]),
  q("tot-style-05", "style-aesthetic", "Which outdoor brand would you wear daily?", [
    a("Patagonia", "brand preference", ["outdoor", "sustainable", "rugged", "pacific northwest"], {
      brand_keywords: ["patagonia"],
    }),
    b("The North Face", "brand preference", ["outdoor", "technical", "urban outdoor", "adventure"], {
      brand_keywords: ["the north face"],
    }),
  ]),
  q("tot-style-06", "style-aesthetic", "Which elevated casual brand do you lean toward?", [
    a("J.Crew", "brand preference", ["preppy", "american classic", "colorful", "tailored casual"], {
      brand_keywords: ["j.crew"],
    }),
    b("Banana Republic", "brand preference", ["polished", "workwear", "refined casual", "neutral"], {
      brand_keywords: ["banana republic"],
    }),
  ]),
  q("tot-style-07", "style-aesthetic", "Which athleisure brand do you prefer?", [
    a("Lululemon", "brand preference", ["premium athleisure", "yoga", "performance", "quality"], {
      brand_keywords: ["lululemon"],
    }),
    b("Vuori", "brand preference", ["coastal athleisure", "relaxed", "sustainable", "california"], {
      brand_keywords: ["vuori"],
    }),
  ]),
  q("tot-style-08", "style-aesthetic", "Which denim brand do you trust?", [
    a("Levi's", "brand preference", ["heritage denim", "american", "classic", "iconic"], {
      brand_keywords: ["levi's"],
    }),
    b("Madewell", "brand preference", ["modern denim", "soft wash", "everyday", "relaxed"], {
      brand_keywords: ["madewell"],
    }),
  ]),
  q("tot-style-09", "style-aesthetic", "Which trend-forward brand catches your eye?", [
    a("Reformation", "brand preference", ["sustainable chic", "vintage inspired", "feminine", "la style"], {
      brand_keywords: ["reformation"],
    }),
    b("Aritzia", "brand preference", ["elevated basics", "canadian", "clean tailoring", "polished"], {
      brand_keywords: ["aritzia"],
    }),
  ]),
  q("tot-style-10", "style-aesthetic", "Which luxury-adjacent brand fits your vibe?", [
    a("Sézane", "brand preference", ["french", "romantic", "effortless chic", "parisian"], {
      brand_keywords: ["sezane"],
    }),
    b("Club Monaco", "brand preference", ["modern classic", "urban", "polished", "smart casual"], {
      brand_keywords: ["club monaco"],
    }),
  ]),
];

// ══════════════════════════════════════════════════════════════
// CLOTHES — BRANDS & SHOPPING
// ══════════════════════════════════════════════════════════════
const BRANDS_SHOPPING: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-brand-01", "brands-shopping", "Which performance brand do you prefer?", [
    a("Arc'teryx", "brand preference", ["technical", "outdoor premium", "shell jackets", "mountain"], {
      brand_keywords: ["arc'teryx"],
    }),
    b("Alo Yoga", "brand preference", ["yoga", "wellness", "studio to street", "lifestyle"], {
      brand_keywords: ["alo"],
    }),
  ]),
  q("tot-brand-02", "brands-shopping", "Which shoe brand do you default to?", [
    a("New Balance", "brand preference", ["retro running", "dad shoe", "comfort", "heritage"], {
      brand_keywords: ["new balance"],
    }),
    b("Nike", "brand preference", ["performance", "air max", "iconic", "athletic"], {
      brand_keywords: ["nike"],
    }),
  ]),
  q("tot-brand-03", "brands-shopping", "Where do you shop for everyday basics?", [
    a("Target", "brand preference", ["affordable", "all-in-one", "good enough", "accessible"], {
      brand_keywords: ["target"],
    }),
    b("Amazon", "brand preference", ["convenience", "fast delivery", "variety", "price driven"], {
      brand_keywords: ["amazon"],
    }),
  ]),
  q("tot-brand-04", "brands-shopping", "Which lifestyle brand do you vibe with more?", [
    a("Anthropologie", "brand preference", ["bohemian", "eclectic", "home and fashion", "curated"], {
      brand_keywords: ["anthropologie"],
    }),
    b("Free People", "brand preference", ["boho", "free spirit", "festival", "layered"], {
      brand_keywords: ["free people"],
    }),
  ]),
  q("tot-brand-05", "brands-shopping", "Which comfort brand do you reach for?", [
    a("Spanx", "brand preference", ["shapewear", "comfort tech", "polished", "smoothing"], {
      brand_keywords: ["spanx"],
    }),
    b("Girlfriend Collective", "brand preference", ["sustainable", "inclusive", "activewear", "recycled"], {
      brand_keywords: ["girlfriend collective"],
    }),
  ]),
  q("tot-brand-06", "brands-shopping", "Which sneaker brand defines your style?", [
    a("Converse", "brand preference", ["classic", "chuck taylor", "casual", "timeless"], {
      brand_keywords: ["converse"],
    }),
    b("Vans", "brand preference", ["skate", "old skool", "casual", "youth culture"], {
      brand_keywords: ["vans"],
    }),
  ]),
  q("tot-brand-07", "brands-shopping", "Which workwear brand feels more like you?", [
    a("Buck Mason", "brand preference", ["american heritage", "quality essentials", "clean", "rugged"], {
      brand_keywords: ["buck mason"],
    }),
    b("Bonobos", "brand preference", ["modern fit", "smart casual", "office ready", "color range"], {
      brand_keywords: ["bonobos"],
    }),
  ]),
  q("tot-brand-08", "brands-shopping", "Which fast fashion retailer do you shop at more?", [
    a("Zara", "brand preference", ["european trend", "runway inspired", "fast", "polished"], {
      brand_keywords: ["zara"],
    }),
    b("Shein", "brand preference", ["ultra affordable", "trend chasing", "volume", "micro trends"], {
      brand_keywords: ["shein"],
    }),
  ]),
];

// ══════════════════════════════════════════════════════════════
// PERSONAL — COLORS & PALETTE
// ══════════════════════════════════════════════════════════════
const COLORS_PALETTE: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-color-01", "colors-palette", "Which everyday palette do you wear more?", [
    a("All Black Everything", "color palette", ["black", "monochrome", "sleek", "urban"]),
    b("Earth Tones", "color palette", ["olive", "camel", "rust", "warm neutrals"]),
  ]),
  q("tot-color-02", "colors-palette", "Which accent color do you gravitate toward?", [
    a("Navy Blue", "color palette", ["navy", "classic", "trustworthy", "versatile"]),
    b("Burgundy", "color palette", ["burgundy", "rich", "deep", "statement"]),
  ]),
  q("tot-color-03", "colors-palette", "Which neutral base do you prefer?", [
    a("Crisp White", "color palette", ["white", "clean", "bright", "fresh"]),
    b("Warm Cream", "color palette", ["cream", "soft", "warm", "organic"]),
  ]),
  q("tot-color-04", "colors-palette", "Which pop of color do you like?", [
    a("Forest Green", "color palette", ["forest green", "nature", "rich", "grounding"]),
    b("Burnt Orange", "color palette", ["burnt orange", "warm", "energetic", "sunset"]),
  ]),
  q("tot-color-05", "colors-palette", "Which metal finish do you prefer?", [
    a("Gold", "color palette", ["gold", "warm metal", "classic", "luxe"]),
    b("Silver", "color palette", ["silver", "cool metal", "modern", "sleek"]),
  ]),
  q("tot-color-06", "colors-palette", "Which vibe does your wardrobe have?", [
    a("Pastels and Soft Tones", "color palette", ["pastel", "blush", "lavender", "soft"]),
    b("Bold and Saturated", "color palette", ["bold", "saturated", "cobalt", "red"]),
  ]),
];

// ══════════════════════════════════════════════════════════════
// DINING — FOOD & DINING
// ══════════════════════════════════════════════════════════════
const FOOD_DINING: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-food-01", "food-dining", "Which coffee shop do you prefer?", [
    a("Starbucks", "brand preference", ["starbucks", "convenient", "familiar", "customizable"], {
      brand_keywords: ["starbucks"],
    }),
    b("Local Coffee Shop", "brand preference", ["local", "independent", "craft", "community"], {
      brand_keywords: ["local coffee"],
    }),
  ]),
  q("tot-food-02", "food-dining", "Which fast casual restaurant do you pick?", [
    a("Chipotle", "brand preference", ["chipotle", "build your own", "mexican", "fast casual"], {
      brand_keywords: ["chipotle"],
    }),
    b("Sweetgreen", "brand preference", ["sweetgreen", "salads", "healthy", "clean eating"], {
      brand_keywords: ["sweetgreen"],
    }),
  ]),
  q("tot-food-03", "food-dining", "Which burger spot do you crave?", [
    a("Five Guys", "brand preference", ["five guys", "loaded", "fries", "classic burger"], {
      brand_keywords: ["five guys"],
    }),
    b("Shake Shack", "brand preference", ["shake shack", "smash burger", "shack sauce", "elevated fast food"], {
      brand_keywords: ["shake shack"],
    }),
  ]),
  q("tot-food-04", "food-dining", "Which pizza style do you prefer?", [
    a("New York Slice", "dining preference", ["new york", "thin crust", "foldable", "classic"], {
      location_keywords: ["new york"],
    }),
    b("Detroit Deep Dish", "dining preference", ["detroit", "deep dish", "crispy edges", "cheese crust"], {
      location_keywords: ["detroit", "chicago"],
    }),
  ]),
  q("tot-food-05", "food-dining", "Which delivery app do you use most?", [
    a("DoorDash", "brand preference", ["doordash", "delivery", "convenience", "dashpass"], {
      brand_keywords: ["doordash"],
    }),
    b("Uber Eats", "brand preference", ["uber eats", "delivery", "variety", "ride and food"], {
      brand_keywords: ["uber eats"],
    }),
  ]),
  q("tot-food-06", "food-dining", "Which breakfast spot do you prefer?", [
    a("Chick-fil-A", "brand preference", ["chick-fil-a", "chicken biscuit", "drive-thru", "southern"], {
      brand_keywords: ["chick-fil-a"],
    }),
    b("Panera Bread", "brand preference", ["panera", "bakery cafe", "soups", "clean menu"], {
      brand_keywords: ["panera"],
    }),
  ]),
  q("tot-food-07", "food-dining", "Which cuisine do you crave more often?", [
    a("Italian", "dining preference", ["italian", "pasta", "wine", "olive oil"]),
    b("Japanese", "dining preference", ["japanese", "sushi", "ramen", "umami"]),
  ]),
  q("tot-food-08", "food-dining", "Which treat do you reach for?", [
    a("Crumbl Cookies", "brand preference", ["crumbl", "cookies", "rotating flavors", "viral treats"], {
      brand_keywords: ["crumbl"],
    }),
    b("Nothing Bundt Cakes", "brand preference", ["nothing bundt cakes", "bundt cake", "frosting", "celebration"], {
      brand_keywords: ["nothing bundt cakes"],
    }),
  ]),
];

// ══════════════════════════════════════════════════════════════
// TRAVEL — TRAVEL & TRIPS
// ══════════════════════════════════════════════════════════════
const TRAVEL_TRIPS: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-travel-01", "travel-trips", "Which airline do you prefer?", [
    a("Delta", "brand preference", ["delta", "reliable", "sky miles", "comfort"], {
      brand_keywords: ["delta"],
    }),
    b("Southwest", "brand preference", ["southwest", "no fees", "bags fly free", "casual"], {
      brand_keywords: ["southwest"],
    }),
  ]),
  q("tot-travel-02", "travel-trips", "Which hotel chain would you book?", [
    a("Marriott", "brand preference", ["marriott", "bonvoy", "consistent", "business travel"], {
      brand_keywords: ["marriott"],
    }),
    b("Hilton", "brand preference", ["hilton", "honors", "variety", "global"], {
      brand_keywords: ["hilton"],
    }),
  ]),
  q("tot-travel-03", "travel-trips", "Where would you rather stay?", [
    a("Airbnb", "brand preference", ["airbnb", "unique stays", "local feel", "kitchen"], {
      brand_keywords: ["airbnb"],
    }),
    b("Hotel", "brand preference", ["hotel", "room service", "amenities", "no cleanup"]),
  ]),
  q("tot-travel-04", "travel-trips", "Which getaway sounds better right now?", [
    a("Beach Vacation", "travel preference", ["beach", "sun", "ocean", "resort"], {
      location_keywords: ["cancun", "maui", "bahamas"],
    }),
    b("Mountain Cabin", "travel preference", ["mountains", "cabin", "hiking", "cozy"], {
      location_keywords: ["aspen", "colorado", "smoky mountains"],
    }),
  ]),
  q("tot-travel-05", "travel-trips", "Which weekend trip sounds better?", [
    a("Nashville", "travel preference", ["nashville", "music", "hot chicken", "broadway"], {
      location_keywords: ["nashville"],
    }),
    b("Austin", "travel preference", ["austin", "bbq", "live music", "weird"], {
      location_keywords: ["austin"],
    }),
  ]),
  q("tot-travel-06", "travel-trips", "Which international trip calls to you?", [
    a("Paris", "travel preference", ["paris", "cafes", "art", "romance"], {
      location_keywords: ["paris"],
    }),
    b("Tokyo", "travel preference", ["tokyo", "food", "culture", "energy"], {
      location_keywords: ["tokyo"],
    }),
  ]),
  q("tot-travel-07", "travel-trips", "Which ride-share do you use most?", [
    a("Uber", "brand preference", ["uber", "ride share", "uberpool", "global"], {
      brand_keywords: ["uber"],
    }),
    b("Lyft", "brand preference", ["lyft", "ride share", "friendly", "us focused"], {
      brand_keywords: ["lyft"],
    }),
  ]),
  q("tot-travel-08", "travel-trips", "Which luggage brand would you pick?", [
    a("Away", "brand preference", ["away", "direct to consumer", "charging port", "modern travel"], {
      brand_keywords: ["away"],
    }),
    b("Samsonite", "brand preference", ["samsonite", "durable", "classic", "trusted"], {
      brand_keywords: ["samsonite"],
    }),
  ]),
];

// ══════════════════════════════════════════════════════════════
// ENTERTAINMENT — DATE IDEAS & ROMANCE
// ══════════════════════════════════════════════════════════════
const DATE_IDEAS: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-date-01", "date-ideas-romance", "Which streaming service do you watch most?", [
    a("Netflix", "brand preference", ["netflix", "binge", "originals", "mainstream"], {
      brand_keywords: ["netflix"],
    }),
    b("Hulu", "brand preference", ["hulu", "next day tv", "ads option", "disney bundle"], {
      brand_keywords: ["hulu"],
    }),
  ]),
  q("tot-date-02", "date-ideas-romance", "Which date night vibe do you prefer?", [
    a("Nice Dinner Out", "experience preference", ["restaurant", "reservation", "dressed up", "wine"]),
    b("Cooking Together at Home", "experience preference", ["home cooking", "cozy", "teamwork", "casual"]),
  ]),
  q("tot-date-03", "date-ideas-romance", "Which concert venue do you prefer?", [
    a("Intimate Small Venue", "experience preference", ["small venue", "intimate", "close to stage", "raw"]),
    b("Big Arena Show", "experience preference", ["arena", "production", "energy", "spectacle"]),
  ]),
  q("tot-date-04", "date-ideas-romance", "Which social media do you scroll most?", [
    a("Instagram", "brand preference", ["instagram", "photos", "reels", "visual"], {
      brand_keywords: ["instagram"],
    }),
    b("TikTok", "brand preference", ["tiktok", "short video", "trends", "discovery"], {
      brand_keywords: ["tiktok"],
    }),
  ]),
  q("tot-date-05", "date-ideas-romance", "Which music streaming service do you use?", [
    a("Spotify", "brand preference", ["spotify", "playlists", "wrapped", "discover weekly"], {
      brand_keywords: ["spotify"],
    }),
    b("Apple Music", "brand preference", ["apple music", "lossless", "apple ecosystem", "curated"], {
      brand_keywords: ["apple music"],
    }),
  ]),
  q("tot-date-06", "date-ideas-romance", "Which weekend activity do you pick?", [
    a("Brunch and Shopping", "experience preference", ["brunch", "shopping", "mimosas", "social"]),
    b("Hike and Coffee After", "experience preference", ["hike", "coffee", "nature", "active"]),
  ]),
];

// ══════════════════════════════════════════════════════════════
// HOUSEHOLD — HOME & LIVING
// ══════════════════════════════════════════════════════════════
const HOME_LIVING: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-home-01", "home-living", "Which furniture store do you shop at?", [
    a("IKEA", "brand preference", ["ikea", "affordable", "scandinavian", "flat pack"], {
      brand_keywords: ["ikea"],
    }),
    b("West Elm", "brand preference", ["west elm", "mid century", "modern", "elevated"], {
      brand_keywords: ["west elm"],
    }),
  ]),
  q("tot-home-02", "home-living", "Which candle brand do you prefer?", [
    a("Yankee Candle", "brand preference", ["yankee candle", "classic scents", "strong throw", "traditional"], {
      brand_keywords: ["yankee candle"],
    }),
    b("Boy Smells", "brand preference", ["boy smells", "modern", "gender neutral", "design forward"], {
      brand_keywords: ["boy smells"],
    }),
  ]),
  q("tot-home-03", "home-living", "Which cleaning brand do you trust?", [
    a("Mrs. Meyer's", "brand preference", ["mrs meyers", "plant derived", "garden scents", "clean label"], {
      brand_keywords: ["mrs. meyer's"],
    }),
    b("Fabuloso", "brand preference", ["fabuloso", "lavender", "multi purpose", "value"], {
      brand_keywords: ["fabuloso"],
    }),
  ]),
  q("tot-home-04", "home-living", "Which home decor store do you browse?", [
    a("Pottery Barn", "brand preference", ["pottery barn", "classic", "comfortable", "traditional"], {
      brand_keywords: ["pottery barn"],
    }),
    b("CB2", "brand preference", ["cb2", "modern", "bold", "design forward"], {
      brand_keywords: ["cb2"],
    }),
  ]),
  q("tot-home-05", "home-living", "Which bedding brand would you choose?", [
    a("Brooklinen", "brand preference", ["brooklinen", "luxe basics", "soft sheets", "dtc"], {
      brand_keywords: ["brooklinen"],
    }),
    b("Parachute", "brand preference", ["parachute", "linen", "california", "organic feel"], {
      brand_keywords: ["parachute"],
    }),
  ]),
  q("tot-home-06", "home-living", "Which smart home ecosystem do you prefer?", [
    a("Amazon Alexa", "brand preference", ["alexa", "echo", "smart home", "voice control"], {
      brand_keywords: ["amazon alexa"],
    }),
    b("Google Home", "brand preference", ["google home", "nest", "assistant", "smart speakers"], {
      brand_keywords: ["google home"],
    }),
  ]),
  q("tot-home-07", "home-living", "Which kitchen appliance brand do you trust?", [
    a("KitchenAid", "brand preference", ["kitchenaid", "stand mixer", "baking", "classic"], {
      brand_keywords: ["kitchenaid"],
    }),
    b("Dyson", "brand preference", ["dyson", "innovation", "design", "premium tech"], {
      brand_keywords: ["dyson"],
    }),
  ]),
  q("tot-home-08", "home-living", "Which vacuum brand do you prefer?", [
    a("Dyson", "brand preference", ["dyson", "cordless", "powerful", "design"], {
      brand_keywords: ["dyson"],
    }),
    b("Shark", "brand preference", ["shark", "affordable", "effective", "practical"], {
      brand_keywords: ["shark"],
    }),
  ]),
];

// ══════════════════════════════════════════════════════════════
// PERSONAL — LOVE LANGUAGE & RELATIONSHIPS
// ══════════════════════════════════════════════════════════════
const LOVE_LANGUAGE: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-love-01", "love-language-relationships", "Which gesture means more to you?", [
    a("Planned Quality Time", "relationship preference", ["quality time", "date night", "undivided attention", "intentional"]),
    b("A Thoughtful Gift", "relationship preference", ["gifts", "thoughtful", "remembered", "meaningful"]),
  ]),
  q("tot-love-02", "love-language-relationships", "Which makes you feel most loved?", [
    a("Words of Affirmation", "relationship preference", ["words", "compliments", "encouragement", "verbal love"]),
    b("Physical Touch", "relationship preference", ["touch", "hugs", "closeness", "physical affection"]),
  ]),
  q("tot-love-03", "love-language-relationships", "Which act hits harder?", [
    a("They Handle Something You Hate Doing", "relationship preference", ["acts of service", "help", "taking care of", "practical love"]),
    b("They Plan a Surprise for You", "relationship preference", ["surprise", "planning", "effort", "romantic"]),
  ]),
  q("tot-love-04", "love-language-relationships", "Which communication style do you prefer?", [
    a("Good Morning Texts Every Day", "relationship preference", ["consistent texts", "daily contact", "routine", "connection"]),
    b("Long Phone Calls a Few Times a Week", "relationship preference", ["phone calls", "deep conversation", "voice", "quality over quantity"]),
  ]),
  q("tot-love-05", "love-language-relationships", "Which anniversary gift would you prefer?", [
    a("A Trip Somewhere New", "relationship preference", ["travel gift", "experience", "adventure", "shared memory"]),
    b("Jewelry or a Watch", "relationship preference", ["jewelry", "watch", "keepsake", "wearable reminder"]),
  ]),
  q("tot-love-06", "love-language-relationships", "How do you prefer to spend a Sunday?", [
    a("Doing Nothing Together", "relationship preference", ["quality time", "lazy day", "cozy", "no plans"]),
    b("Getting Out and Being Active", "relationship preference", ["active together", "exploring", "energy", "shared activity"]),
  ]),
];

// ══════════════════════════════════════════════════════════════
// ENTERTAINMENT — HOBBIES & WEEKEND
// ══════════════════════════════════════════════════════════════
const HOBBIES_WEEKEND: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-hobby-01", "hobbies-weekend", "Which fitness brand do you work out with?", [
    a("Peloton", "brand preference", ["peloton", "cycling", "at home fitness", "community"], {
      brand_keywords: ["peloton"],
    }),
    b("CrossFit Gym", "brand preference", ["crossfit", "functional fitness", "community", "intense"], {
      brand_keywords: ["crossfit"],
    }),
  ]),
  q("tot-hobby-02", "hobbies-weekend", "Which weekend morning sounds better?", [
    a("Farmers Market and Cooking", "hobby preference", ["farmers market", "cooking", "fresh ingredients", "slow morning"]),
    b("Sleep In and Order Brunch", "hobby preference", ["sleep in", "brunch delivery", "lazy morning", "recharge"]),
  ]),
  q("tot-hobby-03", "hobbies-weekend", "Which podcast platform do you use?", [
    a("Spotify", "brand preference", ["spotify podcasts", "discovery", "playlists", "integrated"], {
      brand_keywords: ["spotify"],
    }),
    b("Apple Podcasts", "brand preference", ["apple podcasts", "curated", "apple ecosystem", "classic"], {
      brand_keywords: ["apple podcasts"],
    }),
  ]),
  q("tot-hobby-04", "hobbies-weekend", "Which gaming system do you prefer?", [
    a("PlayStation", "brand preference", ["playstation", "ps5", "exclusives", "single player"], {
      brand_keywords: ["playstation"],
    }),
    b("Nintendo Switch", "brand preference", ["nintendo", "switch", "portable", "mario zelda"], {
      brand_keywords: ["nintendo"],
    }),
  ]),
  q("tot-hobby-05", "hobbies-weekend", "Which bookstore do you prefer?", [
    a("Barnes & Noble", "brand preference", ["barnes noble", "browsing", "cafe", "in store"], {
      brand_keywords: ["barnes & noble"],
    }),
    b("Amazon Kindle", "brand preference", ["kindle", "digital", "instant", "library in pocket"], {
      brand_keywords: ["amazon kindle"],
    }),
  ]),
  q("tot-hobby-06", "hobbies-weekend", "Which workout do you prefer?", [
    a("Yoga or Pilates", "hobby preference", ["yoga", "pilates", "flexibility", "mindful movement"]),
    b("Weights and Lifting", "hobby preference", ["lifting", "weights", "strength", "gym"]),
  ]),
];

// ══════════════════════════════════════════════════════════════
// GIFTS — GIFTING
// ══════════════════════════════════════════════════════════════
const GIFTING: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-gift-01", "gifting-actually-want", "Which gift would you rather receive?", [
    a("A Yeti Tumbler", "brand preference", ["yeti", "drinkware", "durable", "outdoor"], {
      brand_keywords: ["yeti"],
    }),
    b("A Stanley Cup", "brand preference", ["stanley", "tumbler", "viral", "hydration"], {
      brand_keywords: ["stanley"],
    }),
  ]),
  q("tot-gift-02", "gifting-actually-want", "Which fragrance house do you prefer?", [
    a("Le Labo", "brand preference", ["le labo", "niche fragrance", "santal", "artisanal"], {
      brand_keywords: ["le labo"],
    }),
    b("Jo Malone", "brand preference", ["jo malone", "classic", "layerable", "british"], {
      brand_keywords: ["jo malone"],
    }),
  ]),
  q("tot-gift-03", "gifting-actually-want", "Which type of gift do you actually want?", [
    a("An Upgrade to Something I Already Use", "gift preference", ["upgrade", "practical", "daily use", "better version"]),
    b("An Experience I Wouldn't Book Myself", "gift preference", ["experience", "surprise", "memorable", "special"]),
  ]),
  q("tot-gift-04", "gifting-actually-want", "Which subscription would you love as a gift?", [
    a("A Coffee Subscription", "brand preference", ["coffee subscription", "monthly beans", "specialty", "ritual"], {
      brand_keywords: ["trade coffee", "blue bottle"],
    }),
    b("A Wine or Spirits Club", "brand preference", ["wine club", "spirits", "curated bottles", "tasting"], {
      brand_keywords: ["winc", "flaviar"],
    }),
  ]),
  q("tot-gift-05", "gifting-actually-want", "Which tech gift would you want?", [
    a("AirPods", "brand preference", ["airpods", "apple", "wireless", "daily carry"], {
      brand_keywords: ["apple airpods"],
    }),
    b("A Nice Bluetooth Speaker", "brand preference", ["bluetooth speaker", "sonos", "jbl", "shared music"], {
      brand_keywords: ["sonos", "jbl"],
    }),
  ]),
  q("tot-gift-06", "gifting-actually-want", "Which skincare brand would you want as a gift?", [
    a("Kiehl's", "brand preference", ["kiehls", "classic skincare", "pharmacy", "trusted"], {
      brand_keywords: ["kiehl's"],
    }),
    b("Glossier", "brand preference", ["glossier", "minimal skincare", "dewy", "millennial beauty"], {
      brand_keywords: ["glossier"],
    }),
  ]),
];

// ══════════════════════════════════════════════════════════════
// BEVERAGES (mapped through food-dining for now)
// Adds hot/cold, brand-specific drink preferences
// ══════════════════════════════════════════════════════════════
const BEVERAGES_VIA_DINING: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-bev-01", "food-dining", "Hot or iced coffee?", [
    a("Hot Coffee", "beverage preference", ["hot coffee", "warm", "classic", "morning ritual"]),
    b("Iced Coffee", "beverage preference", ["iced coffee", "cold brew", "refreshing", "year round cold"]),
  ]),
  q("tot-bev-02", "food-dining", "Which energy drink brand do you grab?", [
    a("Red Bull", "brand preference", ["red bull", "energy", "wings", "classic energy"], {
      brand_keywords: ["red bull"],
    }),
    b("Celsius", "brand preference", ["celsius", "fitness energy", "healthy energy", "no sugar"], {
      brand_keywords: ["celsius"],
    }),
  ]),
  q("tot-bev-03", "food-dining", "Which water brand do you buy?", [
    a("Liquid Death", "brand preference", ["liquid death", "tallboy", "edgy water", "canned"], {
      brand_keywords: ["liquid death"],
    }),
    b("Smart Water", "brand preference", ["smart water", "electrolytes", "clean", "vapor distilled"], {
      brand_keywords: ["smart water"],
    }),
  ]),
  q("tot-bev-04", "food-dining", "Which soda do you pick?", [
    a("Coca-Cola", "brand preference", ["coca-cola", "classic", "iconic", "original"], {
      brand_keywords: ["coca-cola"],
    }),
    b("Pepsi", "brand preference", ["pepsi", "sweeter", "bold", "challenger"], {
      brand_keywords: ["pepsi"],
    }),
  ]),
];

// ══════════════════════════════════════════════════════════════
// PERSONAL CARE (mapped through home-living)
// ══════════════════════════════════════════════════════════════
const PERSONAL_CARE_VIA_HOME: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-care-01", "home-living", "Which shampoo brand do you use?", [
    a("Olaplex", "brand preference", ["olaplex", "bond repair", "salon quality", "damage repair"], {
      brand_keywords: ["olaplex"],
    }),
    b("Native", "brand preference", ["native", "clean ingredients", "natural", "gentle"], {
      brand_keywords: ["native"],
    }),
  ]),
  q("tot-care-02", "home-living", "Which deodorant brand do you trust?", [
    a("Native", "brand preference", ["native deodorant", "aluminum free", "clean", "natural"], {
      brand_keywords: ["native"],
    }),
    b("Dove", "brand preference", ["dove", "gentle", "moisturizing", "trusted"], {
      brand_keywords: ["dove"],
    }),
  ]),
  q("tot-care-03", "home-living", "Which toothpaste brand do you prefer?", [
    a("Crest", "brand preference", ["crest", "whitening", "classic", "dentist recommended"], {
      brand_keywords: ["crest"],
    }),
    b("Sensodyne", "brand preference", ["sensodyne", "sensitive teeth", "gentle", "clinical"], {
      brand_keywords: ["sensodyne"],
    }),
  ]),
];

// ══════════════════════════════════════════════════════════════
// TECH (mapped through hobbies-weekend)
// ══════════════════════════════════════════════════════════════
const TECH_VIA_HOBBIES: ThisOrThatV2AuthoredQuestionSeed[] = [
  q("tot-tech-01", "hobbies-weekend", "Which phone ecosystem are you in?", [
    a("iPhone", "brand preference", ["iphone", "apple", "ios", "airdrop"], {
      brand_keywords: ["apple iphone"],
    }),
    b("Android", "brand preference", ["android", "samsung", "pixel", "customizable"], {
      brand_keywords: ["samsung", "google pixel"],
    }),
  ]),
  q("tot-tech-02", "hobbies-weekend", "Which laptop brand do you prefer?", [
    a("MacBook", "brand preference", ["macbook", "apple", "m-chip", "creative"], {
      brand_keywords: ["apple macbook"],
    }),
    b("Windows PC", "brand preference", ["windows", "dell", "microsoft", "versatile"], {
      brand_keywords: ["dell", "microsoft surface"],
    }),
  ]),
  q("tot-tech-03", "hobbies-weekend", "Which smartwatch do you wear?", [
    a("Apple Watch", "brand preference", ["apple watch", "health tracking", "notifications", "apple ecosystem"], {
      brand_keywords: ["apple watch"],
    }),
    b("Fitbit", "brand preference", ["fitbit", "fitness tracker", "sleep tracking", "affordable"], {
      brand_keywords: ["fitbit"],
    }),
  ]),
];

// ──────────────────────────────────────────────────────────────
// Aggregate all questions into a single shared dataset
// ──────────────────────────────────────────────────────────────
const SHARED_THIS_OR_THAT_V2_AUTHORED_DATASET = Array.from(
  new Map(
    [
      ...STYLE_AESTHETIC,
      ...BRANDS_SHOPPING,
      ...COLORS_PALETTE,
      ...FOOD_DINING,
      ...BEVERAGES_VIA_DINING,
      ...TRAVEL_TRIPS,
      ...DATE_IDEAS,
      ...HOME_LIVING,
      ...PERSONAL_CARE_VIA_HOME,
      ...LOVE_LANGUAGE,
      ...HOBBIES_WEEKEND,
      ...TECH_VIA_HOBBIES,
      ...GIFTING,
    ].map((question) => [question.question_id, question]),
  ).values(),
);

export const getThisOrThatV2AuthoredQuestions = (
  categoryId?: ThisOrThatV2AuthoredCategoryId,
): ThisOrThatV2AuthoredQuestionSeed[] => {
  const dataset = SHARED_THIS_OR_THAT_V2_AUTHORED_DATASET;
  if (!categoryId) return dataset;
  return dataset.filter((question) => question.source_category_id === categoryId);
};
