// onboardingStaticSets.ts — Static onboarding data for Go Two
// Replaces AI-generated vibe, spend, and brand screens with pre-written sets.
// Keyed by demographic combo and spend tier for instant lookup.

import type { QuestionOption, SpendItem } from "./profileQuestions";

// ─────────────────────────────────────────────────────────────────────────────
// SPEND RANGE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

const CLOTHING_RANGES = [
  { id: "under_25",   label: "Under $25",   value: 12  },
  { id: "25_75",      label: "$25 – $75",   value: 50  },
  { id: "75_150",     label: "$75 – $150",  value: 112 },
  { id: "150_plus",   label: "$150+",       value: 200 },
];

const ACCESSORIES_RANGES = [
  { id: "under_20",   label: "Under $20",   value: 10  },
  { id: "20_60",      label: "$20 – $60",   value: 40  },
  { id: "60_150",     label: "$60 – $150",  value: 105 },
  { id: "150_plus",   label: "$150+",       value: 225 },
];

const BEAUTY_RANGES = [
  { id: "under_15",   label: "Under $15",   value: 8   },
  { id: "15_40",      label: "$15 – $40",   value: 27  },
  { id: "40_100",     label: "$40 – $100",  value: 70  },
  { id: "100_plus",   label: "$100+",       value: 150 },
];

const FRAGRANCE_RANGES = [
  { id: "under_30",   label: "Under $30",   value: 15  },
  { id: "30_75",      label: "$30 – $75",   value: 52  },
  { id: "75_200",     label: "$75 – $200",  value: 137 },
  { id: "200_plus",   label: "$200+",       value: 300 },
];

const HAIRCUT_RANGES = [
  { id: "under_20",   label: "Under $20",   value: 12  },
  { id: "20_50",      label: "$20 – $50",   value: 35  },
  { id: "50_100",     label: "$50 – $100",  value: 75  },
  { id: "100_plus",   label: "$100+",       value: 140 },
];

const HEALTH_RANGES = [
  { id: "under_20",   label: "Under $20",   value: 10  },
  { id: "20_50",      label: "$20 – $50",   value: 35  },
  { id: "50_100",     label: "$50 – $100",  value: 75  },
  { id: "100_plus",   label: "$100+",       value: 140 },
];

const GYM_RANGES = [
  { id: "under_20",   label: "Under $20/mo",  value: 10  },
  { id: "20_50",      label: "$20 – $50/mo",  value: 35  },
  { id: "50_100",     label: "$50 – $100/mo", value: 75  },
  { id: "100_plus",   label: "$100+/mo",      value: 140 },
];

const SHOES_RANGES = [
  { id: "under_50",   label: "Under $50",   value: 25  },
  { id: "50_120",     label: "$50 – $120",  value: 85  },
  { id: "120_250",    label: "$120 – $250", value: 185 },
  { id: "250_plus",   label: "$250+",       value: 350 },
];

const GIFT_RANGES = [
  { id: "under_25",   label: "Under $25",   value: 15  },
  { id: "25_75",      label: "$25 – $75",   value: 50  },
  { id: "75_150",     label: "$75 – $150",  value: 112 },
  { id: "150_plus",   label: "$150+",       value: 225 },
];

const SMALL_GIFT_RANGES = [
  { id: "under_15",   label: "Under $15",   value: 8   },
  { id: "15_30",      label: "$15 – $30",   value: 22  },
  { id: "30_60",      label: "$30 – $60",   value: 45  },
  { id: "60_plus",    label: "$60+",        value: 90  },
];

const COFFEE_RANGES = [
  { id: "under_4",    label: "Under $4",    value: 2   },
  { id: "4_7",        label: "$4 – $7",     value: 5   },
  { id: "7_12",       label: "$7 – $12",    value: 9   },
  { id: "12_plus",    label: "$12+",        value: 16  },
];

const TAKEOUT_RANGES = [
  { id: "under_10",   label: "Under $10",   value: 7   },
  { id: "10_20",      label: "$10 – $20",   value: 15  },
  { id: "20_40",      label: "$20 – $40",   value: 30  },
  { id: "40_plus",    label: "$40+",        value: 55  },
];

const DINING_RANGES = [
  { id: "under_20",   label: "Under $20",   value: 12  },
  { id: "20_50",      label: "$20 – $50",   value: 35  },
  { id: "50_100",     label: "$50 – $100",  value: 75  },
  { id: "100_plus",   label: "$100+",       value: 150 },
];

const BAR_RANGES = [
  { id: "under_20",   label: "Under $20",   value: 12  },
  { id: "20_50",      label: "$20 – $50",   value: 35  },
  { id: "50_100",     label: "$50 – $100",  value: 75  },
  { id: "100_plus",   label: "$100+",       value: 140 },
];

const WINE_RANGES = [
  { id: "under_12",   label: "Under $12",   value: 8   },
  { id: "12_25",      label: "$12 – $25",   value: 18  },
  { id: "25_60",      label: "$25 – $60",   value: 42  },
  { id: "60_plus",    label: "$60+",        value: 100 },
];

const ENERGY_RANGES = [
  { id: "under_10",   label: "Under $10/wk",  value: 6   },
  { id: "10_20",      label: "$10 – $20/wk",  value: 15  },
  { id: "20_35",      label: "$20 – $35/wk",  value: 27  },
  { id: "35_plus",    label: "$35+/wk",        value: 45  },
];

const WATER_RANGES = [
  { id: "under_5",    label: "Under $5/mo",    value: 3   },
  { id: "5_15",       label: "$5 – $15/mo",    value: 10  },
  { id: "15_30",      label: "$15 – $30/mo",   value: 22  },
  { id: "30_plus",    label: "$30+/mo",         value: 45  },
];

const CANDLE_RANGES = [
  { id: "under_10",   label: "Under $10",   value: 7   },
  { id: "10_25",      label: "$10 – $25",   value: 17  },
  { id: "25_60",      label: "$25 – $60",   value: 42  },
  { id: "60_plus",    label: "$60+",        value: 90  },
];

const CLEANING_RANGES = [
  { id: "under_15",   label: "Under $15/mo",  value: 8   },
  { id: "15_30",      label: "$15 – $30/mo",  value: 22  },
  { id: "30_60",      label: "$30 – $60/mo",  value: 45  },
  { id: "60_plus",    label: "$60+/mo",        value: 80  },
];

const BEDDING_RANGES = [
  { id: "under_30",   label: "Under $30",   value: 18  },
  { id: "30_80",      label: "$30 – $80",   value: 55  },
  { id: "80_200",     label: "$80 – $200",  value: 140 },
  { id: "200_plus",   label: "$200+",       value: 300 },
];

const KITCHEN_RANGES = [
  { id: "under_20",   label: "Under $20",   value: 12  },
  { id: "20_60",      label: "$20 – $60",   value: 40  },
  { id: "60_150",     label: "$60 – $150",  value: 105 },
  { id: "150_plus",   label: "$150+",       value: 225 },
];

const TICKET_RANGES = [
  { id: "under_30",   label: "Under $30",   value: 18  },
  { id: "30_80",      label: "$30 – $80",   value: 55  },
  { id: "80_200",     label: "$80 – $200",  value: 140 },
  { id: "200_plus",   label: "$200+",       value: 300 },
];

const STREAMING_RANGES = [
  { id: "under_15",   label: "Under $15/mo",   value: 8   },
  { id: "15_30",      label: "$15 – $30/mo",   value: 22  },
  { id: "30_60",      label: "$30 – $60/mo",   value: 45  },
  { id: "60_plus",    label: "$60+/mo",         value: 80  },
];

const GAME_RANGES = [
  { id: "under_20",   label: "Under $20",   value: 12  },
  { id: "20_40",      label: "$20 – $40",   value: 30  },
  { id: "40_70",      label: "$40 – $70",   value: 55  },
  { id: "70_plus",    label: "$70+",        value: 90  },
];

const BOOK_RANGES = [
  { id: "under_10",   label: "Under $10",   value: 6   },
  { id: "10_20",      label: "$10 – $20",   value: 15  },
  { id: "20_35",      label: "$20 – $35",   value: 27  },
  { id: "35_plus",    label: "$35+",        value: 50  },
];

const HOTEL_RANGES = [
  { id: "under_80",   label: "Under $80/night",   value: 55  },
  { id: "80_175",     label: "$80 – $175/night",  value: 127 },
  { id: "175_350",    label: "$175 – $350/night", value: 262 },
  { id: "350_plus",   label: "$350+/night",       value: 500 },
];

const FLIGHT_RANGES = [
  { id: "under_150",  label: "Under $150",   value: 90  },
  { id: "150_300",    label: "$150 – $300",  value: 225 },
  { id: "300_500",    label: "$300 – $500",  value: 400 },
  { id: "500_plus",   label: "$500+",        value: 700 },
];

const LUGGAGE_RANGES = [
  { id: "under_50",   label: "Under $50",   value: 30  },
  { id: "50_150",     label: "$50 – $150",  value: 100 },
  { id: "150_400",    label: "$150 – $400", value: 275 },
  { id: "400_plus",   label: "$400+",       value: 600 },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — VIBE SETS
// ─────────────────────────────────────────────────────────────────────────────

const VIBE_teen_neutral: QuestionOption[] = [
  { id: "trendy_explorer",   label: "Trendy Explorer",     description: "Always on the latest drops, always first to know"},
  { id: "chill_aesthetic",   label: "Chill Aesthetic",     description: "Soft tones, cozy fits, and a curated feed"},
  { id: "hype_sports",       label: "Hype Sports",         description: "Athlete energy — jerseys, kicks, and game day"},
  { id: "gamer_tech",        label: "Gamer / Tech Head",   description: "Setups, peripherals, and digital-first everything"},
  { id: "alt_edge",          label: "Alt / Edgy",          description: "Dark fits, vintage finds, standing out on purpose"},
  { id: "laid_back",         label: "Laid Back",           description: "Comfort over everything — basics done right"},
];

const VIBE_young_man: QuestionOption[] = [
  { id: "streetwear",        label: "Streetwear",          description: "Sneakers, hoodies, limited drops, and brand heat"},
  { id: "athletic_hustle",   label: "Athletic Hustler",    description: "Gym-to-everything fits, driven and performance-first"},
  { id: "clean_minimal",     label: "Clean Minimal",       description: "Neutral palette, quality basics, no loud logos"},
  { id: "business_casual",   label: "Business Casual",     description: "Sharp fits, elevated everyday looks, always put together"},
  { id: "outdoorsy",         label: "Outdoorsy",           description: "Trails, gear, and functional style over everything"},
  { id: "tech_forward",      label: "Tech Forward",        description: "Gadget enthusiast, early adopter, utility-first"},
];

const VIBE_young_woman: QuestionOption[] = [
  { id: "clean_girl",        label: "Clean Girl",          description: "Minimalist, dewy skin, slicked-back hair energy"},
  { id: "streetwear_queen",  label: "Streetwear Queen",    description: "Jordans, oversized fits, and vintage finds"},
  { id: "cottage_core",      label: "Cottage Core",        description: "Floral prints, cozy textures, soft romantic vibes"},
  { id: "glam_going_out",    label: "Glam / Going Out",    description: "Mini dresses, heels, full glam — you dress to impress"},
  { id: "athleisure",        label: "Athleisure",          description: "Lululemon energy — functional, sleek, and stylish"},
  { id: "dark_academia",     label: "Dark Academia",       description: "Blazers, turtlenecks, vintage books, and moody tones"},
];

const VIBE_young_nb: QuestionOption[] = [
  { id: "gender_fluid",      label: "Gender Fluid",        description: "Blends and bends — fashion without borders"},
  { id: "minimal_cool",      label: "Minimal Cool",        description: "Monochrome, clean lines, effortlessly unbothered"},
  { id: "alt_experimental",  label: "Alt / Experimental",  description: "Thrift-to-runway mashups, expressive and original"},
  { id: "cozy_casual",       label: "Cozy Casual",         description: "Comfort is non-negotiable — oversized and at ease"},
  { id: "streetwear_edge",   label: "Streetwear Edge",     description: "Drop culture, bold graphics, and layered looks"},
  { id: "wellness_first",    label: "Wellness First",      description: "Mindful living, clean products, and healthy routines"},
];

const VIBE_adult_man: QuestionOption[] = [
  { id: "smart_casual",      label: "Smart Casual",        description: "Always looks intentional — chinos, quality shirts, clean sneakers"},
  { id: "outdoorsy_dad",     label: "Outdoorsy",           description: "Patagonia, trail runners, weekend hikes"},
  { id: "minimalist_pro",    label: "Minimalist Pro",      description: "Capsule wardrobe, investment pieces, zero clutter"},
  { id: "urban_explorer",    label: "Urban Explorer",      description: "City-savvy, restaurant tabs, and elevated streetwear"},
  { id: "fitness_focused",   label: "Fitness Focused",     description: "Protein shakes, gym gear, and recovery everything"},
  { id: "homebody_quality",  label: "Homebody Quality",    description: "Invests in home comfort — good furniture, better coffee"},
];

const VIBE_adult_woman: QuestionOption[] = [
  { id: "polished_minimal",  label: "Polished Minimal",    description: "Quiet luxury — well-made pieces, nothing overdone"},
  { id: "wellness_ritual",   label: "Wellness Ritual",     description: "Skin routines, Pilates, and clean everything"},
  { id: "fashion_forward",   label: "Fashion Forward",     description: "Ahead of trends, loves a statement piece"},
  { id: "cozy_home_lover",   label: "Cozy Home Lover",     description: "Candles, throw blankets, and hosting energy"},
  { id: "career_driven",     label: "Career Driven",       description: "Sharp dressing, networking nights, always switched on"},
  { id: "adventure_seeker",  label: "Adventure Seeker",    description: "Passport full of stamps, gear over glam"},
];

const VIBE_adult_nb: QuestionOption[] = [
  { id: "quiet_luxury_nb",   label: "Quiet Luxury",        description: "Understated quality — no logos, just craft"},
  { id: "creative_class",    label: "Creative Class",      description: "Artists, designers, makers — aesthetic is everything"},
  { id: "wellness_centered", label: "Wellness Centered",   description: "Mindful, intentional, and deeply health-focused"},
  { id: "urban_culture",     label: "Urban Culture",       description: "Concert tickets, gallery openings, city living"},
  { id: "practical_smart",   label: "Practical & Smart",   description: "Research-driven buys, function over fashion"},
  { id: "comfort_aesthetic", label: "Comfort Aesthetic",   description: "Soft fabrics, great lighting, gentle life energy"},
];

const VIBE_mature_man: QuestionOption[] = [
  { id: "classic_refined",   label: "Classic & Refined",   description: "Timeless pieces, good leather, built to last"},
  { id: "active_outdoors",   label: "Active Outdoors",     description: "Golf, hiking, biking — stays moving, dresses for it"},
  { id: "home_entertainer",  label: "Home Entertainer",    description: "Quality kitchen gear, premium wine, hosting well"},
  { id: "tech_savvy_pro",    label: "Tech Savvy Pro",      description: "Stays current on gadgets, efficiency is everything"},
  { id: "traveler_explorer", label: "Traveler / Explorer", description: "Business class upgrades, loyalty programs, well-worn passport"},
  { id: "no_fuss_quality",   label: "No Fuss Quality",     description: "Fewer, better things — comfort and durability first"},
];

const VIBE_mature_woman: QuestionOption[] = [
  { id: "effortlessly_chic", label: "Effortlessly Chic",   description: "French-girl polish — looks great without trying"},
  { id: "wellness_expert",   label: "Wellness Expert",     description: "Skin, sleep, supplements — health is an investment"},
  { id: "home_luxury",       label: "Home Luxury",         description: "Beautiful spaces, fine linens, curated everything"},
  { id: "active_living",     label: "Active Living",       description: "Tennis, Pilates, walking groups — always moving"},
  { id: "experience_seeker", label: "Experience Seeker",   description: "Theater, travel, fine dining — life is for living"},
  { id: "understated_style", label: "Understated Style",   description: "Investment dressing — quality pieces worn for years"},
];

const VIBE_mature_nb: QuestionOption[] = [
  { id: "contemplative",     label: "Contemplative",       description: "Books, ideas, art, and a beautifully curated space"},
  { id: "active_wellness",   label: "Active Wellness",     description: "Movement, nutrition, and intentional self-care"},
  { id: "creative_spirit",   label: "Creative Spirit",     description: "Expressive, curious, and drawn to craft"},
  { id: "homebody_curator",  label: "Homebody Curator",    description: "Perfect at-home environment is the goal"},
  { id: "seasoned_traveler", label: "Seasoned Traveler",   description: "Knows where to go and how to pack for it"},
  { id: "invest_in_quality", label: "Invest in Quality",   description: "Buys once, buys right — no fast fashion, no waste"},
];

// Map every age__gender key to a vibe set
export const VIBE_SETS: Record<string, QuestionOption[]> = {
  // ── Teen (13–17) ─────────────────────────────────────────────────────────
  "13_17__man":          VIBE_teen_neutral,
  "13_17__woman":        VIBE_teen_neutral,
  "13_17__nonbinary":    VIBE_teen_neutral,
  "13_17__prefer_not":   VIBE_teen_neutral,

  // ── 18–24 ────────────────────────────────────────────────────────────────
  "18_24__man":          VIBE_young_man,
  "18_24__woman":        VIBE_young_woman,
  "18_24__nonbinary":    VIBE_young_nb,
  "18_24__prefer_not":   VIBE_young_nb,

  // ── 25–34 ────────────────────────────────────────────────────────────────
  "25_34__man":          VIBE_adult_man,
  "25_34__woman":        VIBE_adult_woman,
  "25_34__nonbinary":    VIBE_adult_nb,
  "25_34__prefer_not":   VIBE_adult_nb,

  // ── 35–44 ────────────────────────────────────────────────────────────────
  "35_44__man":          VIBE_adult_man,
  "35_44__woman":        VIBE_adult_woman,
  "35_44__nonbinary":    VIBE_adult_nb,
  "35_44__prefer_not":   VIBE_adult_nb,

  // ── 45–54 ────────────────────────────────────────────────────────────────
  "45_54__man":          VIBE_mature_man,
  "45_54__woman":        VIBE_mature_woman,
  "45_54__nonbinary":    VIBE_mature_nb,
  "45_54__prefer_not":   VIBE_mature_nb,

  // ── 55+ ──────────────────────────────────────────────────────────────────
  "55_plus__man":        VIBE_mature_man,
  "55_plus__woman":      VIBE_mature_woman,
  "55_plus__nonbinary":  VIBE_mature_nb,
  "55_plus__prefer_not": VIBE_mature_nb,
};

const DEFAULT_VIBE_SET: QuestionOption[] = VIBE_adult_nb;

export const getVibeOptions = (ageRange: string, gender: string): QuestionOption[] => {
  const key = `${ageRange}__${gender}`;
  return VIBE_SETS[key] ?? DEFAULT_VIBE_SET;
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — SPEND ITEM SETS BY CATEGORY
// ─────────────────────────────────────────────────────────────────────────────

export const SPEND_ITEMS_BY_CATEGORY: Record<string, SpendItem[]> = {
  clothes: [
    { id: "jacket",       label: "A jacket",                         ranges: CLOTHING_RANGES    },
    { id: "dress_shirt",  label: "A dress / button-down",            ranges: CLOTHING_RANGES    },
    { id: "activewear",   label: "Workout clothes",                  ranges: CLOTHING_RANGES    },
    { id: "accessories",  label: "An accessory (belt, hat, bag)",    ranges: ACCESSORIES_RANGES },
    { id: "jeans",        label: "A pair of jeans",                  ranges: CLOTHING_RANGES    },
  ],
  personal: [
    { id: "skincare",     label: "A skincare product",               ranges: BEAUTY_RANGES      },
    { id: "fragrance",    label: "A cologne / perfume",              ranges: FRAGRANCE_RANGES   },
    { id: "haircut",      label: "A haircut",                        ranges: HAIRCUT_RANGES     },
    { id: "makeup",       label: "A makeup / grooming item",         ranges: BEAUTY_RANGES      },
    { id: "hair_care",    label: "A shampoo / conditioner",          ranges: BEAUTY_RANGES      },
  ],
  health: [
    { id: "supplements",  label: "Monthly supplements",              ranges: HEALTH_RANGES      },
    { id: "gym",          label: "Gym / fitness monthly",            ranges: GYM_RANGES         },
    { id: "athletic_shoes",label: "Athletic shoes",                  ranges: SHOES_RANGES       },
    { id: "protein",      label: "Protein powder (monthly)",         ranges: HEALTH_RANGES      },
    { id: "wellness_app", label: "Wellness app subscription",        ranges: STREAMING_RANGES   },
  ],
  gifts: [
    { id: "birthday_gift",    label: "A birthday gift",              ranges: GIFT_RANGES        },
    { id: "holiday_gift",     label: "A holiday gift",               ranges: GIFT_RANGES        },
    { id: "just_because",     label: "A 'just because' gift",        ranges: SMALL_GIFT_RANGES  },
    { id: "wedding_gift",     label: "A wedding / shower gift",      ranges: GIFT_RANGES        },
    { id: "gift_wrap",        label: "Gift wrapping / packaging",    ranges: SMALL_GIFT_RANGES  },
  ],
  dining: [
    { id: "coffee_order",     label: "A coffee / drink order",       ranges: COFFEE_RANGES      },
    { id: "takeout",          label: "Takeout for one",              ranges: TAKEOUT_RANGES     },
    { id: "date_night",       label: "Date night dinner (per person)", ranges: DINING_RANGES   },
    { id: "bar_tab",          label: "A night out (drinks)",         ranges: BAR_RANGES         },
    { id: "lunch_out",        label: "Lunch out on a workday",       ranges: TAKEOUT_RANGES     },
  ],
  beverages: [
    { id: "daily_coffee",     label: "Daily coffee",                 ranges: COFFEE_RANGES      },
    { id: "wine_bottle",      label: "A bottle of wine",             ranges: WINE_RANGES        },
    { id: "energy_drink",     label: "Energy drinks (weekly)",       ranges: ENERGY_RANGES      },
    { id: "water_brand",      label: "Bottled water (monthly)",      ranges: WATER_RANGES       },
    { id: "craft_beer",       label: "Craft beer / six-pack",        ranges: BAR_RANGES         },
  ],
  household: [
    { id: "candle",           label: "A candle",                     ranges: CANDLE_RANGES      },
    { id: "cleaning_supplies",label: "Cleaning supplies (monthly)",  ranges: CLEANING_RANGES    },
    { id: "bedding",          label: "Bedding / sheets set",         ranges: BEDDING_RANGES     },
    { id: "kitchen_gadget",   label: "A kitchen gadget",             ranges: KITCHEN_RANGES     },
    { id: "diffuser_scent",   label: "A home fragrance / diffuser",  ranges: CANDLE_RANGES      },
  ],
  entertainment: [
    { id: "concert_ticket",   label: "A concert ticket",             ranges: TICKET_RANGES      },
    { id: "streaming",        label: "Streaming services (monthly total)", ranges: STREAMING_RANGES },
    { id: "video_game",       label: "A video game",                 ranges: GAME_RANGES        },
    { id: "book",             label: "A book",                       ranges: BOOK_RANGES        },
    { id: "movie_night",      label: "A movie / event ticket",       ranges: TICKET_RANGES      },
  ],
  travel: [
    { id: "hotel_night",      label: "A hotel night",                ranges: HOTEL_RANGES       },
    { id: "flight_domestic",  label: "A domestic flight (round trip)", ranges: FLIGHT_RANGES   },
    { id: "luggage",          label: "A piece of luggage",           ranges: LUGGAGE_RANGES     },
    { id: "travel_bag",       label: "A carry-on / backpack",        ranges: LUGGAGE_RANGES     },
    { id: "travel_accessories",label: "Travel accessories (adapter, pillow, etc.)", ranges: ACCESSORIES_RANGES },
  ],
};

/** Returns 6 spend items: first 2 from each of the top 3 categories. */
export const getSpendItems = (topCategories: string[]): SpendItem[] => {
  const cats = topCategories.length >= 3 ? topCategories.slice(0, 3) : ["clothes", "dining", "entertainment"].slice(0, 3 - topCategories.length);
  const resolved = topCategories.length >= 3 ? topCategories.slice(0, 3) : [...topCategories, ...cats.filter(c => !topCategories.includes(c))].slice(0, 3);

  const items: SpendItem[] = [];
  for (const cat of resolved) {
    const catItems = SPEND_ITEMS_BY_CATEGORY[cat];
    if (catItems) {
      items.push(...catItems.slice(0, 2));
    }
  }
  // fallback if empty
  if (items.length === 0) {
    return [
      ...SPEND_ITEMS_BY_CATEGORY["clothes"].slice(0, 2),
      ...SPEND_ITEMS_BY_CATEGORY["dining"].slice(0, 2),
      ...SPEND_ITEMS_BY_CATEGORY["entertainment"].slice(0, 2),
    ];
  }
  return items;
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — BRAND SETS (category × spend tier, 36 sets × 15 brands each)
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND_SETS: Record<string, QuestionOption[]> = {
  // ── CLOTHES ────────────────────────────────────────────────────────────────
  "clothes__budget": [
    { id: "hm",              label: "H&M" },
    { id: "zara",            label: "Zara" },
    { id: "uniqlo",          label: "Uniqlo" },
    { id: "old_navy",        label: "Old Navy" },
    { id: "target",          label: "Target" },
    { id: "shein",           label: "Shein" },
    { id: "forever21",       label: "Forever 21" },
    { id: "primark",         label: "Primark" },
    { id: "amazon_essentials",label: "Amazon Essentials" },
    { id: "gap",             label: "Gap" },
    { id: "walmart",         label: "Walmart" },
    { id: "thrift",          label: "Thrift / Secondhand" },
    { id: "ross",            label: "Ross" },
    { id: "marshalls",       label: "Marshalls / TJ Maxx" },
    { id: "asos",            label: "ASOS" },
  ],
  "clothes__mid": [
    { id: "levis",           label: "Levi's" },
    { id: "banana_republic", label: "Banana Republic" },
    { id: "jcrew",           label: "J.Crew" },
    { id: "madewell",        label: "Madewell" },
    { id: "abercrombie",     label: "Abercrombie & Fitch" },
    { id: "revolve",         label: "Revolve" },
    { id: "allbirds",        label: "Allbirds" },
    { id: "everlane",        label: "Everlane" },
    { id: "pacsun",          label: "PacSun" },
    { id: "urban_outfitters",label: "Urban Outfitters" },
    { id: "lucky_brand",     label: "Lucky Brand" },
    { id: "express",         label: "Express" },
    { id: "american_eagle",  label: "American Eagle" },
    { id: "anthropologie",   label: "Anthropologie" },
    { id: "free_people",     label: "Free People" },
  ],
  "clothes__premium": [
    { id: "nike",            label: "Nike" },
    { id: "adidas",          label: "Adidas" },
    { id: "ralph_lauren",    label: "Ralph Lauren" },
    { id: "coach",           label: "Coach" },
    { id: "theory",          label: "Theory" },
    { id: "allsaints",       label: "AllSaints" },
    { id: "reiss",           label: "Reiss" },
    { id: "ted_baker",       label: "Ted Baker" },
    { id: "club_monaco",     label: "Club Monaco" },
    { id: "rag_bone",        label: "Rag & Bone" },
    { id: "vince",           label: "Vince" },
    { id: "cos",             label: "COS" },
    { id: "apc",             label: "A.P.C." },
    { id: "frame",           label: "Frame" },
    { id: "ag_jeans",        label: "AG Jeans" },
  ],
  "clothes__luxury": [
    { id: "gucci",           label: "Gucci" },
    { id: "prada",           label: "Prada" },
    { id: "louis_vuitton",   label: "Louis Vuitton" },
    { id: "balenciaga",      label: "Balenciaga" },
    { id: "saint_laurent",   label: "Saint Laurent" },
    { id: "celine",          label: "Céline" },
    { id: "off_white",       label: "Off-White" },
    { id: "bottega_veneta",  label: "Bottega Veneta" },
    { id: "burberry",        label: "Burberry" },
    { id: "versace",         label: "Versace" },
    { id: "fendi",           label: "Fendi" },
    { id: "miu_miu",         label: "Miu Miu" },
    { id: "valentino",       label: "Valentino" },
    { id: "givenchy",        label: "Givenchy" },
    { id: "jacquemus",       label: "Jacquemus" },
  ],

  // ── PERSONAL CARE ─────────────────────────────────────────────────────────
  "personal__budget": [
    { id: "elf",             label: "e.l.f. Cosmetics" },
    { id: "cetaphil",        label: "Cetaphil" },
    { id: "noxzema",         label: "Noxzema" },
    { id: "dove",            label: "Dove" },
    { id: "axe",             label: "Axe" },
    { id: "old_spice",       label: "Old Spice" },
    { id: "nyx",             label: "NYX Professional" },
    { id: "tree_hut",        label: "Tree Hut" },
    { id: "suave",           label: "Suave" },
    { id: "wet_n_wild",      label: "Wet n Wild" },
    { id: "gillette",        label: "Gillette" },
    { id: "loreal_paris",    label: "L'Oréal Paris" },
    { id: "neutrogena",      label: "Neutrogena" },
    { id: "garnier",         label: "Garnier" },
    { id: "equate",          label: "Equate (Walmart)" },
  ],
  "personal__mid": [
    { id: "cerave",          label: "CeraVe" },
    { id: "the_ordinary",    label: "The Ordinary" },
    { id: "olaplex",         label: "Olaplex" },
    { id: "native",          label: "Native" },
    { id: "mario_badescu",   label: "Mario Badescu" },
    { id: "paula_choice",    label: "Paula's Choice" },
    { id: "drunk_elephant",  label: "Drunk Elephant" },
    { id: "jack_black",      label: "Jack Black" },
    { id: "bulldog",         label: "Bulldog Skincare" },
    { id: "lume",            label: "Lume Deodorant" },
    { id: "function_beauty", label: "Function of Beauty" },
    { id: "kristin_ess",     label: "Kristin Ess" },
    { id: "pattern_beauty",  label: "Pattern Beauty" },
    { id: "versed",          label: "Versed" },
    { id: "inkey_list",      label: "The INKEY List" },
  ],
  "personal__premium": [
    { id: "tatcha",          label: "Tatcha" },
    { id: "kiehl",           label: "Kiehl's" },
    { id: "sunday_riley",    label: "Sunday Riley" },
    { id: "fresh",           label: "Fresh" },
    { id: "aesop",           label: "Aesop" },
    { id: "ouai",            label: "OUAI" },
    { id: "goop",            label: "Goop" },
    { id: "skinceuticals",   label: "SkinCeuticals" },
    { id: "lamer",           label: "La Mer" },
    { id: "estee_lauder",    label: "Estée Lauder" },
    { id: "bobbi_brown",     label: "Bobbi Brown" },
    { id: "charlotte_tilbury",label: "Charlotte Tilbury" },
    { id: "jo_malone",       label: "Jo Malone" },
    { id: "dior_beauty",     label: "Dior Beauty" },
    { id: "nars",            label: "NARS" },
  ],
  "personal__luxury": [
    { id: "la_prairie",      label: "La Prairie" },
    { id: "sisley",          label: "Sisley Paris" },
    { id: "chanel_beauty",   label: "Chanel Beauty" },
    { id: "tom_ford_beauty", label: "Tom Ford Beauty" },
    { id: "byredo",          label: "Byredo" },
    { id: "creed",           label: "Creed" },
    { id: "le_labo",         label: "Le Labo" },
    { id: "serge_lutens",    label: "Serge Lutens" },
    { id: "maison_margiela", label: "Maison Margiela Replica" },
    { id: "acqua_parma",     label: "Acqua di Parma" },
    { id: "diptyque",        label: "Diptyque" },
    { id: "guerlain",        label: "Guerlain" },
    { id: "valmont",         label: "Valmont" },
    { id: "111skin",         label: "111SKIN" },
    { id: "augustinus_bader",label: "Augustinus Bader" },
  ],

  // ── HEALTH ────────────────────────────────────────────────────────────────
  "health__budget": [
    { id: "cvs_health",      label: "CVS Health" },
    { id: "equate_health",   label: "Equate (Walmart)" },
    { id: "spring_valley",   label: "Spring Valley" },
    { id: "nature_made",     label: "Nature Made" },
    { id: "la_fitness",      label: "LA Fitness" },
    { id: "planet_fitness",  label: "Planet Fitness" },
    { id: "champion",        label: "Champion" },
    { id: "hanes_sport",     label: "Hanes Sport" },
    { id: "bodytec",         label: "Aldi / Lidl Supplements" },
    { id: "myprotein_value", label: "MyProtein (basics)" },
    { id: "amazon_basics_health", label: "Amazon Basics Health" },
    { id: "kirkland",        label: "Kirkland (Costco)" },
    { id: "now_foods",       label: "NOW Foods" },
    { id: "target_up",       label: "Target Up&Up" },
    { id: "vitamin_shoppe_store", label: "Vitamin Shoppe Brand" },
  ],
  "health__mid": [
    { id: "garden_of_life",  label: "Garden of Life" },
    { id: "optimum_nutrition",label: "Optimum Nutrition" },
    { id: "ritual",          label: "Ritual Vitamins" },
    { id: "thrive_market",   label: "Thrive Market" },
    { id: "nikes_training",  label: "Nike Training" },
    { id: "under_armour",    label: "Under Armour" },
    { id: "new_balance",     label: "New Balance" },
    { id: "asics",           label: "ASICS" },
    { id: "brooks",          label: "Brooks Running" },
    { id: "ymca",            label: "YMCA" },
    { id: "crunch_fitness",  label: "Crunch Fitness" },
    { id: "nutrabolt",       label: "C4 / Nutrabolt" },
    { id: "legion_athletics",label: "Legion Athletics" },
    { id: "ghost_lifestyle", label: "Ghost" },
    { id: "gainful",         label: "Gainful" },
  ],
  "health__premium": [
    { id: "lululemon",       label: "Lululemon" },
    { id: "alo_yoga",        label: "Alo Yoga" },
    { id: "vuori",           label: "Vuori" },
    { id: "equinox",         label: "Equinox" },
    { id: "peloton",         label: "Peloton" },
    { id: "whoop",           label: "WHOOP" },
    { id: "on_running",      label: "On Running" },
    { id: "hoka",            label: "HOKA" },
    { id: "athletic_greens", label: "AG1 (Athletic Greens)" },
    { id: "seed",            label: "Seed Health" },
    { id: "thorne",          label: "Thorne" },
    { id: "momentous",       label: "Momentous" },
    { id: "hyperice",        label: "Hyperice" },
    { id: "theragun",        label: "Theragun" },
    { id: "eight_sleep",     label: "Eight Sleep" },
  ],
  "health__luxury": [
    { id: "goop_wellness",   label: "Goop Wellness" },
    { id: "biologique_recherche", label: "Biologique Recherche" },
    { id: "class_pass_plus", label: "ClassPass Elite" },
    { id: "soho_house_gym",  label: "Soho House / Private Club" },
    { id: "noble_panacea",   label: "Noble Panacea" },
    { id: "bala",            label: "Bala (luxury fitness)" },
    { id: "tracksmith",      label: "Tracksmith" },
    { id: "satisfy_running", label: "Satisfy Running" },
    { id: "goldsgym_platinum",label: "Life Time Fitness" },
    { id: "noom_premium",    label: "Noom / Calibrate" },
    { id: "levels_health",   label: "Levels Health" },
    { id: "whoop_premium",   label: "WHOOP Pro" },
    { id: "oura_ring",       label: "Oura Ring" },
    { id: "pendulum_health", label: "Pendulum" },
    { id: "bulletproof",     label: "Bulletproof" },
  ],

  // ── GIFTS ─────────────────────────────────────────────────────────────────
  "gifts__budget": [
    { id: "amazon_gifts",    label: "Amazon" },
    { id: "target_gifts",    label: "Target" },
    { id: "five_below",      label: "Five Below" },
    { id: "dollar_tree",     label: "Dollar Tree" },
    { id: "walmart_gifts",   label: "Walmart" },
    { id: "etsy_budget",     label: "Etsy (handmade, budget)" },
    { id: "hallmark",        label: "Hallmark" },
    { id: "tj_maxx_gifts",   label: "TJ Maxx" },
    { id: "marshalls_gifts", label: "Marshalls" },
    { id: "cards_against",   label: "Cards Against Humanity / party games" },
    { id: "bath_body_works", label: "Bath & Body Works" },
    { id: "funko_pop",       label: "Funko Pop" },
    { id: "papyrus",         label: "Papyrus Cards" },
    { id: "ross_gifts",      label: "Ross" },
    { id: "primark_gifts",   label: "Primark" },
  ],
  "gifts__mid": [
    { id: "etsy_mid",        label: "Etsy (custom / artisan)" },
    { id: "uncommon_goods",  label: "UncommonGoods" },
    { id: "anthropologie_gifts",label: "Anthropologie" },
    { id: "crate_barrel",    label: "Crate & Barrel" },
    { id: "williams_sonoma", label: "Williams Sonoma" },
    { id: "nordstrom_rack",  label: "Nordstrom Rack" },
    { id: "lush",            label: "Lush" },
    { id: "sephora_gifts",   label: "Sephora" },
    { id: "goldbelly",       label: "Goldbelly (food gifts)" },
    { id: "personalization_mall", label: "Personalization Mall" },
    { id: "lovepop",         label: "Lovepop Cards" },
    { id: "12th_tribe",      label: "12th Tribe" },
    { id: "brilliant_earth_gifts",label: "Mejuri" },
    { id: "terrain",         label: "Terrain (URBN)" },
    { id: "minted",          label: "Minted" },
  ],
  "gifts__premium": [
    { id: "nordstrom_gifts", label: "Nordstrom" },
    { id: "bloomingdales_gifts",label: "Bloomingdale's" },
    { id: "tiffany_gifts",   label: "Tiffany & Co." },
    { id: "godiva",          label: "Godiva" },
    { id: "wine_com",        label: "Wine.com / Vinebox" },
    { id: "harry_and_david", label: "Harry & David" },
    { id: "snif",            label: "Snif" },
    { id: "diptyque_gifts",  label: "Diptyque" },
    { id: "voluspa",         label: "Voluspa" },
    { id: "sugarfina",       label: "Sugarfina" },
    { id: "fortnum_mason",   label: "Fortnum & Mason" },
    { id: "erewhon_gift",    label: "Erewhon Gift Sets" },
    { id: "boll_branch",     label: "Boll & Branch" },
    { id: "parachute_gifts", label: "Parachute Home" },
    { id: "minted_premium",  label: "Minted (premium)" },
  ],
  "gifts__luxury": [
    { id: "cartier_gifts",   label: "Cartier" },
    { id: "hermes_gifts",    label: "Hermès" },
    { id: "louboutin_gifts", label: "Christian Louboutin" },
    { id: "chanel_gifts",    label: "Chanel" },
    { id: "byredo_gifts",    label: "Byredo" },
    { id: "la_maison",       label: "La Maison du Chocolat" },
    { id: "frrry",           label: "Dom Pérignon" },
    { id: "sothebys_wine",   label: "Sotheby's Wine" },
    { id: "nobu_experiences",label: "Nobu / luxury dining experience" },
    { id: "net_a_porter_gifts",label: "Net-a-Porter" },
    { id: "bergdorf",        label: "Bergdorf Goodman" },
    { id: "neiman_marcus",   label: "Neiman Marcus" },
    { id: "saks_gifts",      label: "Saks Fifth Avenue" },
    { id: "aesop_gift_sets", label: "Aesop Gift Sets" },
    { id: "gucci_gifts",     label: "Gucci" },
  ],

  // ── DINING ────────────────────────────────────────────────────────────────
  "dining__budget": [
    { id: "mcdonalds",       label: "McDonald's" },
    { id: "taco_bell",       label: "Taco Bell" },
    { id: "wendys",          label: "Wendy's" },
    { id: "burger_king",     label: "Burger King" },
    { id: "panda_express",   label: "Panda Express" },
    { id: "dominos",         label: "Domino's" },
    { id: "pizza_hut",       label: "Pizza Hut" },
    { id: "subway",          label: "Subway" },
    { id: "popeyes",         label: "Popeyes" },
    { id: "jack_in_box",     label: "Jack in the Box" },
    { id: "little_caesars",  label: "Little Caesars" },
    { id: "dunkin",          label: "Dunkin'" },
    { id: "five_guys",       label: "Five Guys" },
    { id: "chipotle",        label: "Chipotle" },
    { id: "wingstop",        label: "Wingstop" },
  ],
  "dining__mid": [
    { id: "cheesecake_factory",label: "Cheesecake Factory" },
    { id: "olive_garden",    label: "Olive Garden" },
    { id: "texas_roadhouse", label: "Texas Roadhouse" },
    { id: "applebees",       label: "Applebee's" },
    { id: "chilis",          label: "Chili's" },
    { id: "panera",          label: "Panera Bread" },
    { id: "sweetgreen",      label: "Sweetgreen" },
    { id: "shake_shack",     label: "Shake Shack" },
    { id: "first_watch",     label: "First Watch" },
    { id: "bj_restaurant",   label: "BJ's Restaurant" },
    { id: "outback",         label: "Outback Steakhouse" },
    { id: "cava",            label: "CAVA" },
    { id: "true_food",       label: "True Food Kitchen" },
    { id: "kura_sushi",      label: "Kura Sushi" },
    { id: "bonefish_grill",  label: "Bonefish Grill" },
  ],
  "dining__premium": [
    { id: "nobu",            label: "Nobu" },
    { id: "ocean_prime",     label: "Ocean Prime" },
    { id: "ruth_chris",      label: "Ruth's Chris" },
    { id: "capital_grille",  label: "Capital Grille" },
    { id: "flemings",        label: "Fleming's" },
    { id: "pelegrino",       label: "Local fine dining" },
    { id: "le_bernardin",    label: "Le Bernardin (NYC)" },
    { id: "db_bistro",        label: "DB Bistro" },
    { id: "bourbon_steak",   label: "Bourbon Steak" },
    { id: "girl_the_goat",   label: "Girl & the Goat" },
    { id: "lazy_bear",       label: "Lazy Bear" },
    { id: "night_market",    label: "Trendy chef-driven locals" },
    { id: "spago",           label: "Spago" },
    { id: "carbone",         label: "Carbone" },
    { id: "catch",           label: "Catch" },
  ],
  "dining__luxury": [
    { id: "elbulli_style",   label: "Michelin-starred tasting menus" },
    { id: "alinea",          label: "Alinea" },
    { id: "eleven_madison",  label: "Eleven Madison Park" },
    { id: "per_se",          label: "Per Se" },
    { id: "french_laundry",  label: "The French Laundry" },
    { id: "minibar",         label: "minibar by José Andrés" },
    { id: "osteria_francescana", label: "Osteria Francescana" },
    { id: "single_thread",   label: "SingleThread" },
    { id: "n_naka",          label: "n/naka" },
    { id: "omakase",         label: "High-end Omakase" },
    { id: "nobu_luxury",     label: "Nobu (private dining)" },
    { id: "cipriani",        label: "Cipriani" },
    { id: "rao",             label: "Rao's" },
    { id: "delmonico",       label: "Delmonico's" },
    { id: "spago_luxury",    label: "Spago (chef's table)" },
  ],

  // ── BEVERAGES ─────────────────────────────────────────────────────────────
  "beverages__budget": [
    { id: "folgers",         label: "Folgers" },
    { id: "maxwell_house",   label: "Maxwell House" },
    { id: "great_value",     label: "Great Value (Walmart)" },
    { id: "monster",         label: "Monster Energy" },
    { id: "red_bull_budget", label: "Red Bull (cans)" },
    { id: "bang",            label: "Bang Energy" },
    { id: "kirkland_coffee", label: "Kirkland Coffee (Costco)" },
    { id: "arizona_tea",     label: "Arizona Tea" },
    { id: "snapple",         label: "Snapple" },
    { id: "lipton",          label: "Lipton Tea" },
    { id: "gatorade",        label: "Gatorade" },
    { id: "powerade",        label: "Powerade" },
    { id: "walmart_water",   label: "Store-brand water" },
    { id: "soda_stream",     label: "SodaStream" },
    { id: "nestle_pure",     label: "Nestlé Pure Life" },
  ],
  "beverages__mid": [
    { id: "starbucks",       label: "Starbucks" },
    { id: "dunkin_bev",      label: "Dunkin'" },
    { id: "celsius",         label: "Celsius" },
    { id: "liquid_iv",       label: "Liquid I.V." },
    { id: "la_croix",        label: "LaCroix" },
    { id: "poppi",           label: "Poppi Prebiotic Soda" },
    { id: "olipop",          label: "OLIPOP" },
    { id: "bai",             label: "Bai" },
    { id: "chameleon_cold",  label: "Chameleon Cold Brew" },
    { id: "death_wish",      label: "Death Wish Coffee" },
    { id: "califia_farms",   label: "Califia Farms" },
    { id: "trader_joes_bev", label: "Trader Joe's" },
    { id: "topo_chico",      label: "Topo Chico" },
    { id: "perrier",         label: "Perrier" },
    { id: "san_pellegrino",  label: "San Pellegrino" },
  ],
  "beverages__premium": [
    { id: "blue_bottle",     label: "Blue Bottle Coffee" },
    { id: "verve_coffee",    label: "Verve Coffee" },
    { id: "intelligentsia",  label: "Intelligentsia" },
    { id: "stumptown",       label: "Stumptown Coffee" },
    { id: "atlas_coffee",    label: "Atlas Coffee Club" },
    { id: "trade_coffee",    label: "Trade Coffee" },
    { id: "four_sigmatic",   label: "Four Sigmatic" },
    { id: "olmeca_altos",    label: "High-end craft spirits" },
    { id: "waterloo_sparkling",label: "Waterloo Sparkling" },
    { id: "spindrift",       label: "Spindrift" },
    { id: "pressed_juicery", label: "Pressed Juicery" },
    { id: "suja_juice",      label: "Suja Juice" },
    { id: "hint_water",      label: "Hint Water" },
    { id: "waiakea",         label: "Waiakea Hawaiian Water" },
    { id: "rebbl",           label: "REBBL" },
  ],
  "beverages__luxury": [
    { id: "dom_perignon_bev",label: "Dom Pérignon" },
    { id: "krug",            label: "Krug Champagne" },
    { id: "dalmore",         label: "The Dalmore (Scotch)" },
    { id: "macallan",        label: "The Macallan" },
    { id: "clase_azul",      label: "Clase Azul Tequila" },
    { id: "pappy_van_winkle",label: "Pappy Van Winkle" },
    { id: "evian_couture",   label: "Evian Haute Couture" },
    { id: "voss_gold",       label: "VOSS Gold" },
    { id: "fiji_premium",    label: "Fiji Water" },
    { id: "rare_tea_co",     label: "Rare Tea Company" },
    { id: "beluga_vodka",    label: "Beluga Gold Line" },
    { id: "patron_high",     label: "Patrón El Alto" },
    { id: "chateau_petrus",  label: "Château Pétrus" },
    { id: "quintessa",       label: "Quintessa" },
    { id: "opus_one",        label: "Opus One" },
  ],

  // ── HOUSEHOLD ─────────────────────────────────────────────────────────────
  "household__budget": [
    { id: "ikea",            label: "IKEA" },
    { id: "walmart_home",    label: "Walmart" },
    { id: "target_home",     label: "Target" },
    { id: "amazon_home",     label: "Amazon" },
    { id: "dollar_general",  label: "Dollar General" },
    { id: "big_lots",        label: "Big Lots" },
    { id: "tuesday_morning", label: "Tuesday Morning" },
    { id: "wayfair_budget",  label: "Wayfair (budget)" },
    { id: "mainstays",       label: "Mainstays (Walmart)" },
    { id: "room_essentials", label: "Room Essentials (Target)" },
    { id: "bed_bath_beyond", label: "Bed Bath & Beyond" },
    { id: "overstock",       label: "Overstock" },
    { id: "five_below_home", label: "Five Below" },
    { id: "homegoods",       label: "HomeGoods" },
    { id: "aldi_home",       label: "ALDI Finds" },
  ],
  "household__mid": [
    { id: "west_elm",        label: "West Elm" },
    { id: "crate_barrel_home",label: "Crate & Barrel" },
    { id: "pottery_barn",    label: "Pottery Barn" },
    { id: "williams_sonoma_home", label: "Williams Sonoma" },
    { id: "parachute",       label: "Parachute Home" },
    { id: "boll_branch_home",label: "Boll & Branch" },
    { id: "casper",          label: "Casper" },
    { id: "brooklinen",      label: "Brooklinen" },
    { id: "leesa",           label: "Leesa" },
    { id: "our_place",       label: "Our Place" },
    { id: "great_jones",     label: "Great Jones" },
    { id: "magnolia_home",   label: "Magnolia Home" },
    { id: "threshold",       label: "Threshold (Target)" },
    { id: "the_citizenry",   label: "The Citizenry" },
    { id: "tuft_needle",     label: "Tuft & Needle" },
  ],
  "household__premium": [
    { id: "restoration_hardware", label: "RH / Restoration Hardware" },
    { id: "le_creuset",      label: "Le Creuset" },
    { id: "all_clad",        label: "All-Clad" },
    { id: "dyson",           label: "Dyson" },
    { id: "cuisinart",       label: "Cuisinart" },
    { id: "kitchenaid",      label: "KitchenAid" },
    { id: "breville",        label: "Breville" },
    { id: "nespresso",       label: "Nespresso" },
    { id: "thermomix",       label: "Thermomix" },
    { id: "diptyque_home",   label: "Diptyque" },
    { id: "voluspa_home",    label: "Voluspa" },
    { id: "flamingo_estate", label: "Flamingo Estate" },
    { id: "hay",             label: "HAY" },
    { id: "muuto",           label: "Muuto" },
    { id: "ferm_living",     label: "Ferm Living" },
  ],
  "household__luxury": [
    { id: "hermes_home",     label: "Hermès Home" },
    { id: "frette",          label: "Frette" },
    { id: "sferra",          label: "SFERRA" },
    { id: "duxiana",         label: "DUX Bed / DUXIANA" },
    { id: "savoir_beds",     label: "Savoir Beds" },
    { id: "christofle",      label: "Christofle" },
    { id: "bernardaud",      label: "Bernardaud" },
    { id: "riedel",          label: "Riedel (crystal)" },
    { id: "waterford",       label: "Waterford Crystal" },
    { id: "zwilling",        label: "Zwilling / Staub" },
    { id: "fornasetti",      label: "Fornasetti" },
    { id: "ligne_roset",     label: "Ligne Roset" },
    { id: "flexform",        label: "Flexform" },
    { id: "kelly_wearstler", label: "Kelly Wearstler" },
    { id: "ralph_lauren_home",label: "Ralph Lauren Home" },
  ],

  // ── ENTERTAINMENT ─────────────────────────────────────────────────────────
  "entertainment__budget": [
    { id: "netflix",         label: "Netflix" },
    { id: "spotify",         label: "Spotify" },
    { id: "youtube",         label: "YouTube (free / Premium)" },
    { id: "twitch",          label: "Twitch" },
    { id: "hulu",            label: "Hulu" },
    { id: "peacock",         label: "Peacock" },
    { id: "tubi",            label: "Tubi (free)" },
    { id: "pluto_tv",        label: "Pluto TV (free)" },
    { id: "crunchyroll",     label: "Crunchyroll" },
    { id: "redbox",          label: "Redbox" },
    { id: "libby_app",       label: "Libby (library)" },
    { id: "kanopy",          label: "Kanopy (library)" },
    { id: "kindle_unlimited_budget", label: "Kindle Unlimited" },
    { id: "bandcamp",        label: "Bandcamp" },
    { id: "soundcloud",      label: "SoundCloud" },
  ],
  "entertainment__mid": [
    { id: "disney_plus",     label: "Disney+" },
    { id: "hbo_max",         label: "Max (HBO Max)" },
    { id: "apple_tv",        label: "Apple TV+" },
    { id: "amazon_prime",    label: "Amazon Prime Video" },
    { id: "espn_plus",       label: "ESPN+" },
    { id: "paramount_plus",  label: "Paramount+" },
    { id: "apple_music",     label: "Apple Music" },
    { id: "tidal",           label: "TIDAL" },
    { id: "audible",         label: "Audible" },
    { id: "xbox_game_pass",  label: "Xbox Game Pass" },
    { id: "playstation_plus",label: "PlayStation Plus" },
    { id: "nintendo_switch",  label: "Nintendo Online" },
    { id: "ticketmaster",    label: "Ticketmaster" },
    { id: "fandango",        label: "Fandango" },
    { id: "amc_a_list",      label: "AMC A-List" },
  ],
  "entertainment__premium": [
    { id: "stubhub",         label: "StubHub" },
    { id: "seatgeek",        label: "SeatGeek" },
    { id: "live_nation_vip", label: "Live Nation VIP" },
    { id: "masterclass",     label: "MasterClass" },
    { id: "mubi",            label: "MUBI (arthouse film)" },
    { id: "criterion",       label: "Criterion Channel" },
    { id: "plex_pass",       label: "Plex Pass" },
    { id: "scribd",          label: "Scribd" },
    { id: "storytel",        label: "Storytel" },
    { id: "arcade1up",       label: "Arcade1Up" },
    { id: "imax",            label: "IMAX Experience" },
    { id: "dolby_cinema",    label: "Dolby Cinema" },
    { id: "escape_room_premium", label: "Premium Escape Rooms" },
    { id: "topgolf",         label: "Topgolf" },
    { id: "dave_busters",    label: "Dave & Buster's" },
  ],
  "entertainment__luxury": [
    { id: "private_concert", label: "Private / VIP concerts" },
    { id: "super_bowl_vip",  label: "Super Bowl / major event box seats" },
    { id: "broadway_premier",label: "Broadway / West End premieres" },
    { id: "formula1_paddock",label: "F1 Paddock Club" },
    { id: "art_basel",       label: "Art Basel" },
    { id: "soho_house",      label: "Soho House" },
    { id: "ms_yacht",        label: "Yacht charter / experiences" },
    { id: "private_screening",label: "Private film screenings" },
    { id: "altitude_ski_vip",label: "Ski lodge / luxury resort packages" },
    { id: "nba_courtside",   label: "NBA Courtside / floor seats" },
    { id: "metaverse_vip",   label: "High-end gaming / sim racing rigs" },
    { id: "la_philharmonic", label: "Symphony / opera (premium seats)" },
    { id: "premium_trivia",  label: "Executive gaming lounge memberships" },
    { id: "luma_events",     label: "Luma / exclusive invite-only events" },
    { id: "masterclass_gold",label: "MasterClass All-Access (gifted)" },
  ],

  // ── TRAVEL ────────────────────────────────────────────────────────────────
  "travel__budget": [
    { id: "spirit",          label: "Spirit Airlines" },
    { id: "frontier",        label: "Frontier Airlines" },
    { id: "allegiant",       label: "Allegiant Air" },
    { id: "hostelworld",     label: "Hostelworld" },
    { id: "motel6",          label: "Motel 6 / Super 8" },
    { id: "holiday_inn",     label: "Holiday Inn Express" },
    { id: "samsonite_budget",label: "Samsonite (entry)" },
    { id: "amazon_luggage",  label: "Amazon Basics Luggage" },
    { id: "airbnb_budget",   label: "Airbnb (shared / private room)" },
    { id: "couchsurfing",    label: "Couchsurfing" },
    { id: "megabus",         label: "Megabus / FlixBus" },
    { id: "vrbo_budget",     label: "VRBO (budget)" },
    { id: "kayak_deals",     label: "Kayak Last-Minute" },
    { id: "scott_cheap_flights",label: "Going (fmr. Scott's Cheap Flights)" },
    { id: "priceline",       label: "Priceline" },
  ],
  "travel__mid": [
    { id: "southwest",       label: "Southwest Airlines" },
    { id: "jetblue",         label: "JetBlue" },
    { id: "alaska_air",      label: "Alaska Airlines" },
    { id: "hilton",          label: "Hilton" },
    { id: "marriott",        label: "Marriott" },
    { id: "hyatt",           label: "Hyatt" },
    { id: "courtyard",       label: "Courtyard by Marriott" },
    { id: "away_luggage",    label: "Away Luggage" },
    { id: "samsonite_mid",   label: "Samsonite (mid-range)" },
    { id: "airbnb_whole",    label: "Airbnb (whole home)" },
    { id: "booking_com",     label: "Booking.com" },
    { id: "expedia",         label: "Expedia" },
    { id: "hopper",          label: "Hopper" },
    { id: "travelzoo",       label: "Travelzoo" },
    { id: "costco_travel",   label: "Costco Travel" },
  ],
  "travel__premium": [
    { id: "united",          label: "United Airlines (Business)" },
    { id: "delta",           label: "Delta Sky Club" },
    { id: "american",        label: "American Airlines (Flagship)" },
    { id: "westin",          label: "Westin" },
    { id: "sheraton",        label: "Sheraton" },
    { id: "kimpton",         label: "Kimpton Hotels" },
    { id: "renaissance",     label: "Renaissance Hotels" },
    { id: "w_hotels",        label: "W Hotels" },
    { id: "rimowa",          label: "RIMOWA" },
    { id: "tumi",            label: "Tumi" },
    { id: "beis",            label: "BÉIS Travel" },
    { id: "allbirds_travel", label: "Monos Luggage" },
    { id: "resy",            label: "Resy (booking hotspots)" },
    { id: "tablet_hotels",   label: "Tablet Hotels" },
    { id: "chase_sapphire",  label: "Chase Sapphire Reserve rewards" },
  ],
  "travel__luxury": [
    { id: "four_seasons",    label: "Four Seasons" },
    { id: "aman_resorts",    label: "Aman Resorts" },
    { id: "rosewood",        label: "Rosewood Hotels" },
    { id: "belmond",         label: "Belmond" },
    { id: "peninsula",       label: "The Peninsula" },
    { id: "mandarin_oriental",label: "Mandarin Oriental" },
    { id: "ritz_carlton",    label: "The Ritz-Carlton" },
    { id: "emirates_first",  label: "Emirates First Class" },
    { id: "singapore_suites",label: "Singapore Airlines Suites" },
    { id: "lufthansa_first", label: "Lufthansa First Class" },
    { id: "private_jet",     label: "NetJets / Private Aviation" },
    { id: "louis_vuitton_luggage",label: "Louis Vuitton Luggage" },
    { id: "globe_trotter",   label: "Globe-Trotter Luggage" },
    { id: "virtuoso",        label: "Virtuoso Travel Advisor" },
    { id: "abercrombie_kent",label: "Abercrombie & Kent" },
  ],
};

/** Returns 15 brand options for a given category and spend tier. Falls back to clothes__mid. */
export const getBrandOptions = (topCategory: string, spendTier: string): QuestionOption[] => {
  const key = `${topCategory}__${spendTier}`;
  return BRAND_SETS[key] ?? BRAND_SETS["clothes__mid"] ?? [];
};
