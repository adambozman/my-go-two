export interface QuestionOption {
  id: string;
  label: string;
  emoji?: string;
  image?: string; // unsplash photo ID — only for image-grid type
  localImage?: string; // local imported image path
}

export type QuestionType = "image-grid" | "pill-select" | "single-select" | "free-input";

export interface OnboardingQuestion {
  id: string;
  category: string;
  type: QuestionType;
  title: string;
  subtitle: string;
  funnySubtext: string;
  options?: QuestionOption[];
  placeholder?: string; // for free-input type
  multiSelect?: boolean; // default true for image-grid/pill-select
  gender?: ("male" | "female" | "non-binary")[];
}

export const onboardingCategories = [
  { id: "shopping", name: "Shopping Behavior" },
  { id: "style", name: "Style Identity" },
  { id: "food", name: "Food Preferences" },
  { id: "gifts", name: "Gift Psychology" },
  { id: "lifestyle", name: "Activities & Lifestyle" },
  { id: "fit", name: "Fit & Sizing" },
];

export const onboardingQuestions: OnboardingQuestion[] = [
  // ═══════════════════════════════════
  // 1. SHOPPING BEHAVIOR
  // ═══════════════════════════════════
  {
    id: "clothing-stores",
    category: "shopping",
    type: "image-grid",
    title: "Where do you usually shop for clothes?",
    subtitle: "Pick all the stores you actually walk into or order from",
    funnySubtext: "Your bank statement already knows 💳",
    options: [
      { id: "zara", label: "Zara", image: "1441986300917-64674bd600d8" },
      { id: "hm", label: "H&M", image: "1567401893414-76b7b1e5a7a5" },
      { id: "target", label: "Target", image: "1572883454114-efb6cbe0d31b" },
      { id: "nordstrom", label: "Nordstrom", image: "1441984904996-b133b5880093" },
      { id: "american-eagle", label: "American Eagle", image: "1489987707025-afc232f7ea0f" },
      { id: "old-navy", label: "Old Navy", image: "1558618666-fcd25c85f82e" },
      { id: "nike", label: "Nike", image: "1542291026-7eec264c27ff" },
      { id: "shein", label: "SHEIN", image: "1558171813-4c2ab4ef9793" },
      { id: "walmart", label: "Walmart", image: "1534723452862-4c874018d66d" },
      { id: "amazon", label: "Amazon", image: "1523474253046-8cd2748b5fd2" },
    ],
  },
  {
    id: "shop-channel",
    category: "shopping",
    type: "single-select",
    title: "Do you shop mostly online or in-store?",
    subtitle: "How do you prefer to buy?",
    funnySubtext: "No wrong answer… unless you say 'I don't shop' 😅",
    multiSelect: false,
    options: [
      { id: "online", label: "Mostly online", emoji: "📦" },
      { id: "in-store", label: "Mostly in-store", emoji: "🏬" },
      { id: "both", label: "50/50 mix", emoji: "🔄" },
    ],
  },
  {
    id: "price-range",
    category: "shopping",
    type: "single-select",
    title: "What price range feels normal for you?",
    subtitle: "No judgment — just helps us suggest better",
    funnySubtext: "Your wallet wants us to know this 💸",
    multiSelect: false,
    options: [
      { id: "budget", label: "Budget-friendly", emoji: "💰" },
      { id: "mid", label: "Mid-range", emoji: "⚖️" },
      { id: "premium", label: "Premium", emoji: "✨" },
      { id: "luxury", label: "Luxury", emoji: "👑" },
    ],
  },
  {
    id: "fav-brands",
    category: "shopping",
    type: "free-input",
    title: "What brands fit you best?",
    subtitle: "Type the brands you keep coming back to",
    funnySubtext: "The ones you're loyal to no matter what 🏷️",
    placeholder: "e.g. Nike, Levi's, Coach, Zara...",
  },
  {
    id: "avoid-brands",
    category: "shopping",
    type: "free-input",
    title: "Any brands you avoid?",
    subtitle: "Brands that just aren't your thing",
    funnySubtext: "We all have that one brand we won't touch 🚫",
    placeholder: "e.g. Ed Hardy, Crocs, Fast fashion...",
  },

  // ═══════════════════════════════════
  // 2. STYLE IDENTITY
  // ═══════════════════════════════════
  {
    id: "style-vibe",
    category: "style",
    type: "pill-select",
    title: "Which best describes your style?",
    subtitle: "Pick all that resonate with you",
    funnySubtext: "Fashion is art and you're the canvas",
    options: [
      { id: "minimal", label: "Minimal", image: "1507003211169-0a1dd7228f2d" },
      { id: "sporty", label: "Sporty", image: "1571019614242-c5c5dee9f50b" },
      { id: "classic", label: "Classic", image: "1507679799987-c73779587ccf" },
      { id: "trendy", label: "Trendy", image: "1552374196-c4e7ffc6e126" },
      { id: "elegant", label: "Elegant", image: "1490114538077-0a7f8cb49891" },
      { id: "street", label: "Streetwear", image: "1523398002811-999ca8dec234" },
      { id: "casual", label: "Casual", image: "1521572163474-6864f9cf17ab" },
      { id: "boho", label: "Boho", image: "1509631179647-0177331693ae" },
    ],
  },
  {
    id: "fav-colors",
    category: "style",
    type: "pill-select",
    title: "Favorite colors to wear?",
    subtitle: "What's always in your closet?",
    funnySubtext: "All black is a valid answer",
    options: [
      { id: "black", label: "Black", image: "1558618666-fcd25c85f82e" },
      { id: "white", label: "White", image: "1523381210434-271e8be1f52b" },
      { id: "navy", label: "Navy", image: "1507003211169-0a1dd7228f2d" },
      { id: "grey", label: "Grey", image: "1515886657613-9f3515b0c78f" },
      { id: "earth", label: "Earth Tones", image: "1509631179647-0177331693ae" },
      { id: "pastels", label: "Pastels", image: "1490114538077-0a7f8cb49891" },
      { id: "brights", label: "Bright Colors", image: "1552374196-c4e7ffc6e126" },
      { id: "red", label: "Red", image: "1558171813-4c2ab4ef9793" },
      { id: "green", label: "Green", image: "1556905055-8f358a7a47b2" },
    ],
  },
  {
    id: "avoid-colors",
    category: "style",
    type: "pill-select",
    title: "Colors you never wear?",
    subtitle: "The ones that sit in the closet with tags on",
    funnySubtext: "We all have our no-go zone",
    options: [
      { id: "neon", label: "Neon", image: "1552374196-c4e7ffc6e126" },
      { id: "orange", label: "Orange", image: "1557682250-33bd709cbe85" },
      { id: "pink", label: "Pink", image: "1490114538077-0a7f8cb49891" },
      { id: "yellow", label: "Yellow", image: "1551488831-00ddcb6c6bd3" },
      { id: "purple", label: "Purple", image: "1550684848-fac1c5b4e853" },
      { id: "brown", label: "Brown", image: "1509631179647-0177331693ae" },
      { id: "white", label: "White", image: "1523381210434-271e8be1f52b" },
      { id: "red", label: "Red", image: "1558171813-4c2ab4ef9793" },
    ],
  },
  {
    id: "jewelry-metal",
    category: "style",
    type: "single-select",
    title: "Gold or silver?",
    subtitle: "For jewelry, watches, accessories",
    funnySubtext: "This one matters more than you think",
    multiSelect: false,
    options: [
      { id: "gold", label: "Gold", image: "1515562141207-7a88fb7ce338" },
      { id: "silver", label: "Silver", image: "1548036328-c896dce10629" },
      { id: "rose-gold", label: "Rose Gold", image: "1573408301185-9146fe634ad0" },
      { id: "mixed", label: "I mix it up", image: "1611085583191-a3b181a88401" },
    ],
  },
  {
    id: "clothing-fit",
    category: "style",
    type: "single-select",
    title: "Fitted or relaxed clothing?",
    subtitle: "How do you like your clothes to feel?",
    funnySubtext: "Comfort vs. silhouette — the eternal debate",
    multiSelect: false,
    options: [
      { id: "fitted", label: "Fitted", image: "1507679799987-c73779587ccf" },
      { id: "relaxed", label: "Relaxed / Oversized", image: "1521572163474-6864f9cf17ab" },
      { id: "depends", label: "Depends on the item", image: "1441986300917-64674bd600d8" },
    ],
  },

  // ═══════════════════════════════════
  // 3. FOOD PREFERENCES
  // ═══════════════════════════════════
  {
    id: "fav-cuisines",
    category: "food",
    type: "image-grid",
    title: "Your favorite cuisines?",
    subtitle: "Pick everything that makes you hungry",
    funnySubtext: "We promise not to judge your 2am choices",
    options: [
      { id: "italian", label: "Italian", image: "1498579150354-977475b7ea0b" },
      { id: "mexican", label: "Mexican", image: "1565299585323-38d6b0865b47" },
      { id: "japanese", label: "Japanese", image: "1579871494447-9811cf80d66c" },
      { id: "chinese", label: "Chinese", image: "1525755662778-989d0524087e" },
      { id: "indian", label: "Indian", image: "1585937421612-70a008356fbe" },
      { id: "thai", label: "Thai", image: "1562565652-a0d8f0c59eb4" },
      { id: "american", label: "American", image: "1568901346375-23c9450c58cd" },
      { id: "korean", label: "Korean", image: "1498579150354-977475b7ea0b" },
      { id: "mediterranean", label: "Mediterranean", image: "1540189549336-e6e99c3679fe" },
      { id: "bbq", label: "BBQ", image: "1529193591184-b1d58069ecdd" },
    ],
  },
  {
    id: "allergies",
    category: "food",
    type: "pill-select",
    title: "Any allergies or dietary restrictions?",
    subtitle: "Important for accurate recommendations",
    funnySubtext: "Safety first, snacks second",
    options: [
      { id: "none", label: "None", image: "1504674900247-0877df9cc836" },
      { id: "gluten", label: "Gluten-free", image: "1509440159596-0249088772ff" },
      { id: "dairy", label: "Dairy-free", image: "1563636619-e9143da7973b" },
      { id: "nuts", label: "Nut allergy", image: "1563890680-abe1889b3a3e" },
      { id: "vegan", label: "Vegan", image: "1512621776951-a57141f2eefd" },
      { id: "vegetarian", label: "Vegetarian", image: "1540420773420-3366772f4999" },
      { id: "shellfish", label: "Shellfish", image: "1559737558-2f5a35f4523b" },
      { id: "keto", label: "Keto", image: "1432139509613-5c4255a1d4b5" },
    ],
  },
  {
    id: "coffee-order",
    category: "food",
    type: "free-input",
    title: "What's your coffee order?",
    subtitle: "The exact order you'd rattle off at the counter",
    funnySubtext: "Don't talk to me before this",
    placeholder: "e.g. Iced oat milk latte with vanilla...",
  },
  {
    id: "fast-food",
    category: "food",
    type: "image-grid",
    title: "Your go-to fast food spots?",
    subtitle: "No shame — pick your drive-thru spots",
    funnySubtext: "The app knows your order by heart",
    options: [
      { id: "chick-fil-a", label: "Chick-fil-A", image: "1568901346375-23c9450c58cd" },
      { id: "chipotle", label: "Chipotle", image: "1565299585323-38d6b0865b47" },
      { id: "starbucks", label: "Starbucks", image: "1509042239860-f550ce710b93" },
      { id: "mcdonalds", label: "McDonald's", image: "1619881589116-53b2b2e1ab4f" },
      { id: "taco-bell", label: "Taco Bell", image: "1551504734-5ee1c4a1479b" },
      { id: "panera", label: "Panera", image: "1540914124281-342587941389" },
      { id: "dunkin", label: "Dunkin'", image: "1551024601-bec78aea704b" },
      { id: "wendys", label: "Wendy's", image: "1568901346375-23c9450c58cd" },
    ],
  },
  {
    id: "fav-restaurants",
    category: "food",
    type: "free-input",
    title: "Restaurants you love?",
    subtitle: "Your top spots — chain or local",
    funnySubtext: "Table for two, obviously",
    placeholder: "e.g. Olive Garden, that Thai place on 5th...",
  },

  // ═══════════════════════════════════
  // 4. GIFT PSYCHOLOGY
  // ═══════════════════════════════════
  {
    id: "gift-value",
    category: "gifts",
    type: "single-select",
    title: "When receiving a gift, what matters most?",
    subtitle: "This helps the AI recommend perfectly",
    funnySubtext: "Your partner NEEDS to know this",
    multiSelect: false,
    options: [
      { id: "thoughtfulness", label: "Thoughtfulness", image: "1513201099705-a9746e1e201f" },
      { id: "practicality", label: "Practicality", image: "1586495777744-4413f21062fa" },
      { id: "surprise", label: "The surprise factor", image: "1549465220-1a8b9238cd48" },
      { id: "luxury", label: "Luxury / quality", image: "1515562141207-7a88fb7ce338" },
    ],
  },
  {
    id: "gift-type",
    category: "gifts",
    type: "single-select",
    title: "Experiences or physical gifts?",
    subtitle: "What makes you light up more?",
    funnySubtext: "Memories vs. things — the ultimate debate",
    multiSelect: false,
    options: [
      { id: "experiences", label: "Experiences", image: "1501281668745-f7f57925c3b4" },
      { id: "physical", label: "Physical gifts", image: "1549465220-1a8b9238cd48" },
      { id: "both", label: "Both equally", image: "1513201099705-a9746e1e201f" },
    ],
  },
  {
    id: "gesture-style",
    category: "gifts",
    type: "single-select",
    title: "Big gestures or small consistent ones?",
    subtitle: "How do you prefer to be spoiled?",
    funnySubtext: "Grand entrance or steady stream of love?",
    multiSelect: false,
    options: [
      { id: "big", label: "Go big or go home", image: "1502602898657-3e91760cbb34" },
      { id: "small", label: "Small & consistent", image: "1490750967868-88aa4f44bacd" },
      { id: "mix", label: "A healthy mix", image: "1513201099705-a9746e1e201f" },
    ],
  },

  // ═══════════════════════════════════
  // 5. ACTIVITIES & LIFESTYLE
  // ═══════════════════════════════════
  {
    id: "weekend-activity",
    category: "lifestyle",
    type: "pill-select",
    title: "Favorite weekend activities?",
    subtitle: "What recharges your battery?",
    funnySubtext: "Besides doom-scrolling, obviously",
    options: [
      { id: "brunch", label: "Brunch", image: "1504674900247-0877df9cc836" },
      { id: "gym", label: "Gym / Workout", image: "1534438327276-14e5300c3a48" },
      { id: "shopping", label: "Shopping", image: "1441986300917-64674bd600d8" },
      { id: "outdoors", label: "Outdoors", image: "1501785888108-9e92fb50e838" },
      { id: "cooking", label: "Cooking", image: "1556910103-1c02745aae4d" },
      { id: "gaming", label: "Gaming", image: "1538481199705-c710c4e965fc" },
      { id: "netflix", label: "Netflix", image: "1522869635100-9f4c5e86aa37" },
      { id: "spa", label: "Self-care / Spa", image: "1544161515-4ab6ce6db874" },
      { id: "sports", label: "Sports", image: "1461896836934-bd45ba24d0c8" },
      { id: "reading", label: "Reading", image: "1507003211169-0a1dd7228f2d" },
    ],
  },
  {
    id: "date-night",
    category: "lifestyle",
    type: "pill-select",
    title: "Ideal date night?",
    subtitle: "Planning starts right here",
    funnySubtext: "Your partner is literally taking notes",
    options: [
      { id: "fancy-dinner", label: "Fancy dinner", image: "1414235077428-338989a2e8c0" },
      { id: "movie", label: "Movie night", image: "1489599849927-2ee91cede3ba" },
      { id: "adventure", label: "Outdoor adventure", image: "1501785888108-9e92fb50e838" },
      { id: "cozy-in", label: "Cozy night in", image: "1522869635100-9f4c5e86aa37" },
      { id: "concert", label: "Live music / show", image: "1459749411175-04bf5292ceea" },
      { id: "wine-tasting", label: "Wine / cocktails", image: "1510812431401-41d2bd2722f3" },
      { id: "comedy", label: "Comedy show", image: "1485095329183-d0797cdc5676" },
      { id: "dancing", label: "Dancing", image: "1504609773096-104ff2c73ba4" },
    ],
  },
  {
    id: "travel-pref",
    category: "lifestyle",
    type: "pill-select",
    title: "Travel preferences?",
    subtitle: "Dream trip vibes",
    funnySubtext: "Passport? Packed. Bank account? We'll see",
    options: [
      { id: "beach", label: "Beach", image: "1507525428034-b723cf961d3e" },
      { id: "city", label: "City", image: "1480714378408-67cf0d13bc1b" },
      { id: "mountains", label: "Mountains", image: "1464822759023-fed622ff2c3b" },
      { id: "international", label: "International", image: "1502602898657-3e91760cbb34" },
      { id: "road-trip", label: "Road trip", image: "1469854523086-cc02fe5d8800" },
      { id: "resort", label: "All-inclusive resort", image: "1520250497591-112f2f40a3f4" },
      { id: "adventure", label: "Adventure / backpack", image: "1501785888108-9e92fb50e838" },
      { id: "staycation", label: "Staycation", image: "1522869635100-9f4c5e86aa37" },
    ],
  },

  // ═══════════════════════════════════
  // 6. FIT & SIZING
  // ═══════════════════════════════════
  {
    id: "shoe-types",
    category: "fit",
    type: "pill-select",
    title: "Shoe types you wear most?",
    subtitle: "What's in heavy rotation?",
    funnySubtext: "One more pair won't hurt… right?",
    options: [
      { id: "sneakers", label: "Sneakers", image: "1542291026-7eec264c27ff" },
      { id: "boots", label: "Boots", image: "1520639888713-7851133b1ed0" },
      { id: "sandals", label: "Sandals", image: "1562183241-b937e95e8cd0" },
      { id: "heels", label: "Heels", image: "1543163521-1bf539c55dd2" },
      { id: "loafers", label: "Loafers", image: "1614252235316-8c857d38b5f4" },
      { id: "flats", label: "Flats", image: "1515347619252-60a4bf4fff4f" },
      { id: "athletic", label: "Athletic / running", image: "1571019614242-c5c5dee9f50b" },
    ],
  },
  {
    id: "top-fit-brands",
    category: "fit",
    type: "free-input",
    title: "Which brands fit you best?",
    subtitle: "The ones where your usual size always works",
    funnySubtext: "No more guessing games with returns",
    placeholder: "e.g. Levi's 32x30, Nike M, Zara S...",
  },
  {
    id: "between-sizes",
    category: "fit",
    type: "single-select",
    title: "Are you in-between sizes?",
    subtitle: "Helps prevent sizing mistakes",
    funnySubtext: "The struggle is real",
    multiSelect: false,
    options: [
      { id: "no", label: "No, I'm pretty standard", image: "1441984904996-b133b5880093" },
      { id: "yes-up", label: "Yes, I usually size up", image: "1489987707025-afc232f7ea0f" },
      { id: "yes-down", label: "Yes, I usually size down", image: "1558618666-fcd25c85f82e" },
      { id: "depends", label: "Depends on the brand", image: "1441986300917-64674bd600d8" },
    ],
  },
  {
    id: "body-type",
    category: "fit",
    type: "single-select",
    title: "How would you describe your build?",
    subtitle: "Helps with fit recommendations",
    funnySubtext: "Every body is a good body",
    multiSelect: false,
    options: [
      { id: "petite", label: "Petite", image: "1490114538077-0a7f8cb49891" },
      { id: "regular", label: "Regular", image: "1507003211169-0a1dd7228f2d" },
      { id: "tall", label: "Tall", image: "1507679799987-c73779587ccf" },
      { id: "athletic", label: "Athletic", image: "1534438327276-14e5300c3a48" },
      { id: "curvy", label: "Curvy", image: "1509631179647-0177331693ae" },
      { id: "plus", label: "Plus size", image: "1521572163474-6864f9cf17ab" },
    ],
  },
];

export const getQuestionsForGender = (gender: string): OnboardingQuestion[] => {
  const normalizedGender = gender.toLowerCase() as "male" | "female" | "non-binary";
  return onboardingQuestions.filter(
    (q) => !q.gender || q.gender.includes(normalizedGender)
  );
};
