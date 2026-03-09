export interface QuestionOption {
  id: string;
  label: string;
  emoji: string;
  image: string; // unsplash photo ID
}

export interface OnboardingQuestion {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  funnySubtext: string;
  options: QuestionOption[];
  gender?: ("male" | "female" | "non-binary")[];
}

export const onboardingCategories = [
  { id: "food", name: "Food & Drink", icon: "🍕", color: "#D9654F" },
  { id: "brands", name: "Brands", icon: "🛍️", color: "#2F5F6D" },
  { id: "places", name: "Dream Destinations", icon: "✈️", color: "#6B6D62" },
  { id: "vibes", name: "Your Vibe", icon: "✨", color: "#D9654F" },
  { id: "activities", name: "Fun Stuff", icon: "🎉", color: "#2F5F6D" },
];

export const onboardingQuestions: OnboardingQuestion[] = [
  // ── FOOD & DRINK ──
  {
    id: "cuisine",
    category: "food",
    title: "What's your go-to cuisine?",
    subtitle: "Pick all that make your stomach growl",
    funnySubtext: "We promise not to judge your 2am choices 🌮",
    options: [
      { id: "italian", label: "Italian", emoji: "🍝", image: "1498579150354-977475b7ea0b" },
      { id: "mexican", label: "Mexican", emoji: "🌮", image: "1565299585323-38d6b0865b47" },
      { id: "japanese", label: "Japanese", emoji: "🍣", image: "1579871494447-9811cf80d66c" },
      { id: "chinese", label: "Chinese", emoji: "🥡", image: "1525755662778-989d0524087e" },
      { id: "indian", label: "Indian", emoji: "🍛", image: "1585937421612-70a008356fbe" },
      { id: "thai", label: "Thai", emoji: "🍜", image: "1562565652-a0d8f0c59eb4" },
      { id: "american", label: "American", emoji: "🍔", image: "1568901346375-23c9450c58cd" },
      { id: "mediterranean", label: "Mediterranean", emoji: "🥙", image: "1540189549336-e6e99c3679fe" },
    ],
  },
  {
    id: "drinks",
    category: "food",
    title: "What's your drink of choice?",
    subtitle: "Select your liquid happiness",
    funnySubtext: "Hydration is important… right? 🍹",
    options: [
      { id: "coffee", label: "Coffee", emoji: "☕", image: "1509042239860-f550ce710b93" },
      { id: "tea", label: "Tea", emoji: "🍵", image: "1556679343-67e923b9bbb3" },
      { id: "wine", label: "Wine", emoji: "🍷", image: "1510812431401-41d2bd2722f3" },
      { id: "cocktails", label: "Cocktails", emoji: "🍸", image: "1514362545857-3bc16c8c7f1b" },
      { id: "beer", label: "Beer", emoji: "🍺", image: "1535958636474-b021ee887b13" },
      { id: "smoothies", label: "Smoothies", emoji: "🥤", image: "1505252585461-04db1eb84625" },
      { id: "boba", label: "Boba Tea", emoji: "🧋", image: "1558857563-b371033873b8" },
      { id: "water", label: "Just Water", emoji: "💧", image: "1548839140-29a749e1cf4d" },
    ],
  },
  {
    id: "treats",
    category: "food",
    title: "Pick your guilty pleasures",
    subtitle: "No judgment zone — pick freely",
    funnySubtext: "Calories don't count during questionnaires 🍩",
    options: [
      { id: "chocolate", label: "Chocolate", emoji: "🍫", image: "1481391319762-47dff72954d9" },
      { id: "ice-cream", label: "Ice Cream", emoji: "🍦", image: "1497034825429-c343d7c6a68f" },
      { id: "pizza", label: "Pizza", emoji: "🍕", image: "1565299624946-b28f40a0ae38" },
      { id: "sushi", label: "Sushi", emoji: "🍱", image: "1579871494447-9811cf80d66c" },
      { id: "tacos", label: "Tacos", emoji: "🌮", image: "1551504734-5ee1c4a1479b" },
      { id: "donuts", label: "Donuts", emoji: "🍩", image: "1551024601-bec78aea704b" },
      { id: "fries", label: "Fries", emoji: "🍟", image: "1573080496219-bb080dd4f877" },
    ],
  },

  // ── BRANDS ──
  {
    id: "fashion-brands",
    category: "brands",
    title: "Fashion brands you love?",
    subtitle: "Tap the ones in your closet",
    funnySubtext: "Your wallet is already nervous 💸",
    options: [
      { id: "nike", label: "Nike", emoji: "✓", image: "1542291026-7eec264c27ff" },
      { id: "adidas", label: "Adidas", emoji: "⚡", image: "1518002171953-a080ee817e1f" },
      { id: "zara", label: "Zara", emoji: "🖤", image: "1445205170230-053b83016050" },
      { id: "lululemon", label: "Lululemon", emoji: "🧘", image: "1518611012118-696072aa579a" },
      { id: "gucci", label: "Gucci", emoji: "👑", image: "1490427712608-588e68359dbd" },
      { id: "hm", label: "H&M", emoji: "🛍️", image: "1441986300917-64674bd600d8" },
      { id: "northface", label: "North Face", emoji: "🏔️", image: "1551698618-1dfe5d97d256" },
      { id: "patagonia", label: "Patagonia", emoji: "🌿", image: "1544022613-e10091be5b62" },
    ],
  },
  {
    id: "beauty-brands",
    category: "brands",
    title: "Beauty & grooming brands?",
    subtitle: "Select your must-haves",
    funnySubtext: "Looking good is a full-time job 💅",
    options: [
      { id: "sephora", label: "Sephora", emoji: "💄", image: "1596462502278-27bfdc403348" },
      { id: "glossier", label: "Glossier", emoji: "✨", image: "1522335789203-aabd1fc54bc9" },
      { id: "fenty", label: "Fenty", emoji: "💎", image: "1512496015851-a90fb38ba796" },
      { id: "dove", label: "Dove", emoji: "🕊️", image: "1556228578-8c89e6adf883" },
      { id: "olaplex", label: "Olaplex", emoji: "💇", image: "1527799820374-dcf8d9d4a388" },
      { id: "bath-body", label: "Bath & Body Works", emoji: "🕯️", image: "1602607663766-7dfad3154e0a" },
      { id: "dyson", label: "Dyson", emoji: "💨", image: "1522338242042-2d1bcfea46e7" },
    ],
    gender: ["female", "non-binary"],
  },
  {
    id: "tech-brands",
    category: "brands",
    title: "Tech brands you're loyal to?",
    subtitle: "Pick your team",
    funnySubtext: "This might start arguments 📱",
    options: [
      { id: "apple", label: "Apple", emoji: "🍎", image: "1611186871348-b1ce696e52c9" },
      { id: "samsung", label: "Samsung", emoji: "📱", image: "1610945415295-d9f7e33ebf3a" },
      { id: "sony", label: "Sony", emoji: "🎮", image: "1606144042614-b2417e99c4e3" },
      { id: "bose", label: "Bose", emoji: "🎧", image: "1505740420928-5e560c06d30e" },
      { id: "tesla", label: "Tesla", emoji: "⚡", image: "1560958089-b8a1929cea89" },
      { id: "google", label: "Google", emoji: "🔍", image: "1573804633927-bfcbcd909acd" },
      { id: "xbox", label: "Xbox", emoji: "🎮", image: "1621259182978-fbf93132d53d" },
      { id: "playstation", label: "PlayStation", emoji: "🕹️", image: "1606144042614-b2417e99c4e3" },
    ],
  },

  // ── PLACES ──
  {
    id: "vacation-style",
    category: "places",
    title: "Your dream vacation vibe?",
    subtitle: "Where does your soul wanna go?",
    funnySubtext: "Passport? Packed. Bank account? We'll see 🌍",
    options: [
      { id: "beach", label: "Beach Paradise", emoji: "🏖️", image: "1507525428034-b723cf961d3e" },
      { id: "mountains", label: "Mountains", emoji: "🏔️", image: "1464822759023-fed622ff2c3b" },
      { id: "city", label: "Big City", emoji: "🌃", image: "1480714378408-67cf0d13bc1b" },
      { id: "countryside", label: "Countryside", emoji: "🌾", image: "1500382017468-9049fed747ef" },
      { id: "tropical", label: "Tropical Island", emoji: "🌴", image: "1559128010-7c1ad6e1b6a5" },
      { id: "ski", label: "Ski Resort", emoji: "⛷️", image: "1551524559-8af4e6624178" },
      { id: "safari", label: "Safari", emoji: "🦁", image: "1516426122078-c23e76319801" },
      { id: "cruise", label: "Cruise", emoji: "🚢", image: "1548574505023-1cf4d1ce4407" },
    ],
  },
  {
    id: "dream-cities",
    category: "places",
    title: "Cities on your bucket list?",
    subtitle: "Pick the ones calling your name",
    funnySubtext: "Manifesting these right now ✨",
    options: [
      { id: "paris", label: "Paris", emoji: "🗼", image: "1502602898657-3e91760cbb34" },
      { id: "tokyo", label: "Tokyo", emoji: "🗾", image: "1540959733332-eab4deabeeaf" },
      { id: "nyc", label: "New York", emoji: "🗽", image: "1496442226666-8d4d0e62e6e9" },
      { id: "london", label: "London", emoji: "🇬🇧", image: "1513635269975-59663e0ac1ad" },
      { id: "bali", label: "Bali", emoji: "🌺", image: "1537996194471-e657df975ab4" },
      { id: "dubai", label: "Dubai", emoji: "🏙️", image: "1512453979834-a075f197512f" },
      { id: "rome", label: "Rome", emoji: "🏛️", image: "1499856871958-5b9627545d1a" },
      { id: "miami", label: "Miami", emoji: "🌴", image: "1533106497176-45ae19e68ba2" },
    ],
  },

  // ── VIBES ──
  {
    id: "weekend-vibe",
    category: "vibes",
    title: "Perfect weekend looks like…",
    subtitle: "Pick everything that sounds amazing",
    funnySubtext: "There are no wrong answers (except 'work') 😅",
    options: [
      { id: "brunch", label: "Brunch Date", emoji: "🥞", image: "1504674900247-0877df9cc836" },
      { id: "netflix", label: "Netflix Binge", emoji: "📺", image: "1616046229478-9901c5536a45" },
      { id: "shopping", label: "Shopping Spree", emoji: "🛍️", image: "1483985988355-763728e1935b" },
      { id: "hiking", label: "Hiking", emoji: "🥾", image: "1551632811-561732d1e306" },
      { id: "cooking", label: "Cooking Together", emoji: "👨‍🍳", image: "1556910103-1c02745aae4d" },
      { id: "concert", label: "Live Music", emoji: "🎶", image: "1470229722913-5180ce5f1572" },
      { id: "spa", label: "Spa Day", emoji: "🧖", image: "1544161515-4ab6ce6db874" },
      { id: "gaming", label: "Gaming", emoji: "🎮", image: "1612287230202-1ff1d85d1bdf" },
    ],
  },
  {
    id: "love-language",
    category: "vibes",
    title: "How do you show love?",
    subtitle: "Pick what feels most like you",
    funnySubtext: "Your partner definitely needs to know this 💕",
    options: [
      { id: "gifts", label: "Gift Giving", emoji: "🎁", image: "1513885535751-8b9238bd345a" },
      { id: "quality-time", label: "Quality Time", emoji: "⏰", image: "1516589178581-6cd7833ae3b2" },
      { id: "words", label: "Words of Affirmation", emoji: "💌", image: "1518199266791-5375a83190b7" },
      { id: "touch", label: "Physical Touch", emoji: "🤗", image: "1516589178581-6cd7833ae3b2" },
      { id: "acts", label: "Acts of Service", emoji: "🛠️", image: "1556909114-f6e7ad7d3136" },
    ],
  },

  // ── ACTIVITIES ──
  {
    id: "hobbies",
    category: "activities",
    title: "Hobbies that make you happy?",
    subtitle: "The more the merrier",
    funnySubtext: "Besides doom-scrolling, obviously 📱",
    options: [
      { id: "fitness", label: "Working Out", emoji: "💪", image: "1534438327276-14e5300c3a48" },
      { id: "reading", label: "Reading", emoji: "📚", image: "1507842217343-583bb7270b66" },
      { id: "photography", label: "Photography", emoji: "📷", image: "1452587925148-ce544e77e70d" },
      { id: "art", label: "Art & Design", emoji: "🎨", image: "1513364776144-60967b0f800f" },
      { id: "music", label: "Playing Music", emoji: "🎸", image: "1511379938547-c1f69419868d" },
      { id: "gardening", label: "Gardening", emoji: "🌱", image: "1416879595882-3373a0480b5b" },
      { id: "travel", label: "Traveling", emoji: "✈️", image: "1488646953014-85cb44e25828" },
      { id: "sports", label: "Sports", emoji: "⚽", image: "1461896836934- voices-7b8339" },
    ],
  },
  {
    id: "date-night",
    category: "activities",
    title: "Ideal date night?",
    subtitle: "Planning starts here",
    funnySubtext: "Your partner is taking notes 📝",
    options: [
      { id: "dinner", label: "Fancy Dinner", emoji: "🍽️", image: "1414235077428-338989a2e8c0" },
      { id: "movie", label: "Movie Night", emoji: "🎬", image: "1489599849927-2ee91cdd3ec0" },
      { id: "adventure", label: "Outdoor Adventure", emoji: "🌲", image: "1530521954074-e64f6810b32d" },
      { id: "stayin", label: "Cozy Night In", emoji: "🏠", image: "1616046229478-9901c5536a45" },
      { id: "comedy", label: "Comedy Show", emoji: "😂", image: "1585699324551-f6c309eedeca" },
      { id: "dancing", label: "Dancing", emoji: "💃", image: "1504609813442-a8924e83f76e" },
      { id: "wine-tasting", label: "Wine Tasting", emoji: "🍷", image: "1506377247377-2a5b3b417ebb" },
    ],
  },
];

export const getQuestionsForGender = (gender: string): OnboardingQuestion[] => {
  const normalizedGender = gender.toLowerCase() as "male" | "female" | "non-binary";
  return onboardingQuestions.filter(
    (q) => !q.gender || q.gender.includes(normalizedGender)
  );
};
