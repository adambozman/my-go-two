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
    funnySubtext: "Fashion is art and you're the canvas 🎨",
    options: [
      { id: "minimal", label: "Minimal", emoji: "⬜" },
      { id: "sporty", label: "Sporty", emoji: "🏃" },
      { id: "classic", label: "Classic", emoji: "👔" },
      { id: "trendy", label: "Trendy", emoji: "🔥" },
      { id: "elegant", label: "Elegant", emoji: "✨" },
      { id: "street", label: "Streetwear", emoji: "🧢" },
      { id: "casual", label: "Casual", emoji: "👕" },
      { id: "boho", label: "Boho", emoji: "🌸" },
    ],
  },
  {
    id: "fav-colors",
    category: "style",
    type: "pill-select",
    title: "Favorite colors to wear?",
    subtitle: "What's always in your closet?",
    funnySubtext: "All black is a valid answer 🖤",
    options: [
      { id: "black", label: "Black", emoji: "🖤" },
      { id: "white", label: "White", emoji: "🤍" },
      { id: "navy", label: "Navy", emoji: "💙" },
      { id: "grey", label: "Grey", emoji: "🩶" },
      { id: "earth", label: "Earth Tones", emoji: "🤎" },
      { id: "pastels", label: "Pastels", emoji: "🩷" },
      { id: "brights", label: "Bright Colors", emoji: "🌈" },
      { id: "red", label: "Red", emoji: "❤️" },
      { id: "green", label: "Green", emoji: "💚" },
    ],
  },
  {
    id: "avoid-colors",
    category: "style",
    type: "pill-select",
    title: "Colors you never wear?",
    subtitle: "The ones that sit in the closet with tags on",
    funnySubtext: "We all have our no-go zone 🙅",
    options: [
      { id: "neon", label: "Neon", emoji: "💛" },
      { id: "orange", label: "Orange", emoji: "🧡" },
      { id: "pink", label: "Pink", emoji: "💗" },
      { id: "yellow", label: "Yellow", emoji: "💛" },
      { id: "purple", label: "Purple", emoji: "💜" },
      { id: "brown", label: "Brown", emoji: "🤎" },
      { id: "white", label: "White", emoji: "🤍" },
      { id: "red", label: "Red", emoji: "❤️" },
    ],
  },
  {
    id: "jewelry-metal",
    category: "style",
    type: "single-select",
    title: "Gold or silver?",
    subtitle: "For jewelry, watches, accessories",
    funnySubtext: "This one matters more than you think 💍",
    multiSelect: false,
    options: [
      { id: "gold", label: "Gold", emoji: "🥇" },
      { id: "silver", label: "Silver", emoji: "🥈" },
      { id: "rose-gold", label: "Rose Gold", emoji: "🌹" },
      { id: "mixed", label: "I mix it up", emoji: "✨" },
    ],
  },
  {
    id: "clothing-fit",
    category: "style",
    type: "single-select",
    title: "Fitted or relaxed clothing?",
    subtitle: "How do you like your clothes to feel?",
    funnySubtext: "Comfort vs. silhouette — the eternal debate 👖",
    multiSelect: false,
    options: [
      { id: "fitted", label: "Fitted", emoji: "👔" },
      { id: "relaxed", label: "Relaxed / Oversized", emoji: "🧸" },
      { id: "depends", label: "Depends on the item", emoji: "🤷" },
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
    funnySubtext: "We promise not to judge your 2am choices 🌮",
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
    funnySubtext: "Safety first, snacks second 🥜",
    options: [
      { id: "none", label: "None", emoji: "✅" },
      { id: "gluten", label: "Gluten-free", emoji: "🌾" },
      { id: "dairy", label: "Dairy-free", emoji: "🥛" },
      { id: "nuts", label: "Nut allergy", emoji: "🥜" },
      { id: "vegan", label: "Vegan", emoji: "🌱" },
      { id: "vegetarian", label: "Vegetarian", emoji: "🥬" },
      { id: "shellfish", label: "Shellfish", emoji: "🦐" },
      { id: "keto", label: "Keto", emoji: "🥩" },
    ],
  },
  {
    id: "coffee-order",
    category: "food",
    type: "free-input",
    title: "What's your coffee order?",
    subtitle: "The exact order you'd rattle off at the counter",
    funnySubtext: "Don't talk to me before this ☕",
    placeholder: "e.g. Iced oat milk latte with vanilla...",
  },
  {
    id: "fast-food",
    category: "food",
    type: "image-grid",
    title: "Your go-to fast food spots?",
    subtitle: "No shame — pick your drive-thru spots",
    funnySubtext: "The app knows your order by heart 🍟",
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
    funnySubtext: "Table for two, obviously 🕯️",
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
    funnySubtext: "Your partner NEEDS to know this 💝",
    multiSelect: false,
    options: [
      { id: "thoughtfulness", label: "Thoughtfulness", emoji: "💭" },
      { id: "practicality", label: "Practicality", emoji: "🔧" },
      { id: "surprise", label: "The surprise factor", emoji: "🎉" },
      { id: "luxury", label: "Luxury / quality", emoji: "👑" },
    ],
  },
  {
    id: "gift-type",
    category: "gifts",
    type: "single-select",
    title: "Experiences or physical gifts?",
    subtitle: "What makes you light up more?",
    funnySubtext: "Memories vs. things — the ultimate debate 🤔",
    multiSelect: false,
    options: [
      { id: "experiences", label: "Experiences", emoji: "🎭" },
      { id: "physical", label: "Physical gifts", emoji: "🎁" },
      { id: "both", label: "Both equally", emoji: "💯" },
    ],
  },
  {
    id: "gesture-style",
    category: "gifts",
    type: "single-select",
    title: "Big gestures or small consistent ones?",
    subtitle: "How do you prefer to be spoiled?",
    funnySubtext: "Grand entrance or steady stream of love? 💐",
    multiSelect: false,
    options: [
      { id: "big", label: "Go big or go home", emoji: "🎆" },
      { id: "small", label: "Small & consistent", emoji: "🌸" },
      { id: "mix", label: "A healthy mix", emoji: "⚖️" },
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
    funnySubtext: "Besides doom-scrolling, obviously 📱",
    options: [
      { id: "brunch", label: "Brunch", emoji: "🥞" },
      { id: "gym", label: "Gym / Workout", emoji: "💪" },
      { id: "shopping", label: "Shopping", emoji: "🛍️" },
      { id: "outdoors", label: "Outdoors", emoji: "🌲" },
      { id: "cooking", label: "Cooking", emoji: "👨‍🍳" },
      { id: "gaming", label: "Gaming", emoji: "🎮" },
      { id: "netflix", label: "Netflix", emoji: "📺" },
      { id: "spa", label: "Self-care / Spa", emoji: "🧖" },
      { id: "sports", label: "Sports", emoji: "⚽" },
      { id: "reading", label: "Reading", emoji: "📚" },
    ],
  },
  {
    id: "date-night",
    category: "lifestyle",
    type: "pill-select",
    title: "Ideal date night?",
    subtitle: "Planning starts right here",
    funnySubtext: "Your partner is literally taking notes 📝",
    options: [
      { id: "fancy-dinner", label: "Fancy dinner", emoji: "🍽️" },
      { id: "movie", label: "Movie night", emoji: "🎬" },
      { id: "adventure", label: "Outdoor adventure", emoji: "🌲" },
      { id: "cozy-in", label: "Cozy night in", emoji: "🏠" },
      { id: "concert", label: "Live music / show", emoji: "🎶" },
      { id: "wine-tasting", label: "Wine / cocktails", emoji: "🍷" },
      { id: "comedy", label: "Comedy show", emoji: "😂" },
      { id: "dancing", label: "Dancing", emoji: "💃" },
    ],
  },
  {
    id: "travel-pref",
    category: "lifestyle",
    type: "pill-select",
    title: "Travel preferences?",
    subtitle: "Dream trip vibes",
    funnySubtext: "Passport? Packed. Bank account? We'll see 🌍",
    options: [
      { id: "beach", label: "Beach", emoji: "🏖️" },
      { id: "city", label: "City", emoji: "🌃" },
      { id: "mountains", label: "Mountains", emoji: "🏔️" },
      { id: "international", label: "International", emoji: "🌍" },
      { id: "road-trip", label: "Road trip", emoji: "🚗" },
      { id: "resort", label: "All-inclusive resort", emoji: "🏨" },
      { id: "adventure", label: "Adventure / backpack", emoji: "🎒" },
      { id: "staycation", label: "Staycation", emoji: "🛋️" },
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
    funnySubtext: "One more pair won't hurt… right? 👟",
    options: [
      { id: "sneakers", label: "Sneakers", emoji: "👟" },
      { id: "boots", label: "Boots", emoji: "🥾" },
      { id: "sandals", label: "Sandals", emoji: "🩴" },
      { id: "heels", label: "Heels", emoji: "👠" },
      { id: "loafers", label: "Loafers", emoji: "👞" },
      { id: "flats", label: "Flats", emoji: "🥿" },
      { id: "athletic", label: "Athletic / running", emoji: "🏃" },
    ],
  },
  {
    id: "top-fit-brands",
    category: "fit",
    type: "free-input",
    title: "Which brands fit you best?",
    subtitle: "The ones where your usual size always works",
    funnySubtext: "No more guessing games with returns 📏",
    placeholder: "e.g. Levi's 32x30, Nike M, Zara S...",
  },
  {
    id: "between-sizes",
    category: "fit",
    type: "single-select",
    title: "Are you in-between sizes?",
    subtitle: "Helps prevent sizing mistakes",
    funnySubtext: "The struggle is real 😤",
    multiSelect: false,
    options: [
      { id: "no", label: "No, I'm pretty standard", emoji: "✅" },
      { id: "yes-up", label: "Yes, I usually size up", emoji: "⬆️" },
      { id: "yes-down", label: "Yes, I usually size down", emoji: "⬇️" },
      { id: "depends", label: "Depends on the brand", emoji: "🤷" },
    ],
  },
  {
    id: "body-type",
    category: "fit",
    type: "single-select",
    title: "How would you describe your build?",
    subtitle: "Helps with fit recommendations",
    funnySubtext: "Every body is a good body 💪",
    multiSelect: false,
    options: [
      { id: "petite", label: "Petite", emoji: "🌸" },
      { id: "regular", label: "Regular", emoji: "👤" },
      { id: "tall", label: "Tall", emoji: "📏" },
      { id: "athletic", label: "Athletic", emoji: "💪" },
      { id: "curvy", label: "Curvy", emoji: "✨" },
      { id: "plus", label: "Plus size", emoji: "🌟" },
    ],
  },
];

export const getQuestionsForGender = (gender: string): OnboardingQuestion[] => {
  const normalizedGender = gender.toLowerCase() as "male" | "female" | "non-binary";
  return onboardingQuestions.filter(
    (q) => !q.gender || q.gender.includes(normalizedGender)
  );
};
