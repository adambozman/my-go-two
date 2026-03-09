export interface QuestionOption {
  id: string;
  label: string;
  emoji: string;
  image: string;
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
  { id: "shopping", name: "Shopping", icon: "🛍️", color: "#2F5F6D" },
  { id: "dining", name: "Dining", icon: "🍽️", color: "#D9654F" },
  { id: "style", name: "Style & Fashion", icon: "👗", color: "#6B6D62" },
  { id: "beauty", name: "Beauty & Grooming", icon: "✨", color: "#D9654F" },
  { id: "lifestyle", name: "Lifestyle", icon: "💫", color: "#2F5F6D" },
];

export const onboardingQuestions: OnboardingQuestion[] = [
  // ── SHOPPING: WHERE DO YOU SHOP? ──
  {
    id: "clothing-store",
    category: "shopping",
    title: "Where do you buy clothes?",
    subtitle: "Pick all the stores you actually shop at",
    funnySubtext: "Your bank statement already knows 💳",
    options: [
      { id: "zara", label: "Zara", emoji: "🖤", image: "1441986300917-64674bd600d8" },
      { id: "hm", label: "H&M", emoji: "🛍️", image: "1567401893414-76b7b1e5a7a5" },
      { id: "target", label: "Target", emoji: "🎯", image: "1572883454114-efb6cbe0d31b" },
      { id: "nordstrom", label: "Nordstrom", emoji: "👔", image: "1441984904996-b133b5880093" },
      { id: "american-eagle", label: "American Eagle", emoji: "🦅", image: "1489987707025-afc232f7ea0f" },
      { id: "old-navy", label: "Old Navy", emoji: "⚓", image: "1558618666-fcd25c85f82e" },
      { id: "forever21", label: "Forever 21", emoji: "💜", image: "1483985988355-763728e1935b" },
      { id: "shein", label: "SHEIN", emoji: "📦", image: "1558171813-4c2ab4ef9793" },
      { id: "walmart", label: "Walmart", emoji: "🏪", image: "1534723452862-4c874018d66d" },
      { id: "amazon", label: "Amazon", emoji: "📦", image: "1523474253046-8cd2748b5fd2" },
    ],
  },
  {
    id: "premium-brands",
    category: "shopping",
    title: "Any premium brands you love?",
    subtitle: "The ones you save up for or splurge on",
    funnySubtext: "Treat yourself — you deserve it 👑",
    options: [
      { id: "nike", label: "Nike", emoji: "✓", image: "1542291026-7eec264c27ff" },
      { id: "adidas", label: "Adidas", emoji: "⚡", image: "1518002171953-a080ee817e1f" },
      { id: "lululemon", label: "Lululemon", emoji: "🧘", image: "1518611012118-696072aa579a" },
      { id: "northface", label: "North Face", emoji: "🏔️", image: "1551698618-1dfe5d97d256" },
      { id: "gucci", label: "Gucci", emoji: "👑", image: "1490427712608-588e68359dbd" },
      { id: "coach", label: "Coach", emoji: "👜", image: "1548036328-c011a4ef5b88" },
      { id: "patagonia", label: "Patagonia", emoji: "🌿", image: "1544022613-e10091be5b62" },
      { id: "ralph-lauren", label: "Ralph Lauren", emoji: "🐎", image: "1507680434567-5739c80be1ac" },
    ],
  },
  {
    id: "shoe-store",
    category: "shopping",
    title: "Where do you buy shoes?",
    subtitle: "Sneakers, boots, heels — where do you go?",
    funnySubtext: "One more pair won't hurt… right? 👟",
    options: [
      { id: "foot-locker", label: "Foot Locker", emoji: "👟", image: "1460353581996-997a927a4391" },
      { id: "nike-store", label: "Nike Store", emoji: "✓", image: "1542291026-7eec264c27ff" },
      { id: "dsw", label: "DSW", emoji: "👠", image: "1543163521-1bf539c55dd2" },
      { id: "nordstrom-rack", label: "Nordstrom Rack", emoji: "🏷️", image: "1441984904996-b133b5880093" },
      { id: "zappos", label: "Zappos", emoji: "📦", image: "1549298916-b41d501d3772" },
      { id: "new-balance", label: "New Balance", emoji: "🏃", image: "1539185441755-769473a23570" },
      { id: "converse", label: "Converse", emoji: "⭐", image: "1525966222134-fcfa99b8ae77" },
      { id: "vans", label: "Vans", emoji: "🛹", image: "1494496195158-c3becb4f2475" },
    ],
  },

  // ── DINING: WHERE DO YOU EAT? ──
  {
    id: "fast-food",
    category: "dining",
    title: "Your go-to fast food?",
    subtitle: "No shame — pick your drive-thru spots",
    funnySubtext: "The app knows your order by heart 🍟",
    options: [
      { id: "chick-fil-a", label: "Chick-fil-A", emoji: "🐔", image: "1568901346375-23c9450c58cd" },
      { id: "mcdonalds", label: "McDonald's", emoji: "🍟", image: "1619881589116-53b2b2e1ab4f" },
      { id: "chipotle", label: "Chipotle", emoji: "🌯", image: "1565299585323-38d6b0865b47" },
      { id: "starbucks", label: "Starbucks", emoji: "☕", image: "1509042239860-f550ce710b93" },
      { id: "wendys", label: "Wendy's", emoji: "🍔", image: "1568901346375-23c9450c58cd" },
      { id: "taco-bell", label: "Taco Bell", emoji: "🌮", image: "1551504734-5ee1c4a1479b" },
      { id: "dunkin", label: "Dunkin'", emoji: "🍩", image: "1551024601-bec78aea704b" },
      { id: "panera", label: "Panera", emoji: "🥖", image: "1540914124281-342587941389" },
      { id: "popeyes", label: "Popeyes", emoji: "🍗", image: "1626645738196-c2a7c87a8f58" },
      { id: "subway", label: "Subway", emoji: "🥪", image: "1509722747041-616f39b57569" },
    ],
  },
  {
    id: "restaurant-type",
    category: "dining",
    title: "Dinner out — what type of restaurant?",
    subtitle: "Where are you making a reservation?",
    funnySubtext: "Table for two, obviously 🕯️",
    options: [
      { id: "steakhouse", label: "Steakhouse", emoji: "🥩", image: "1544025162-d76694265947" },
      { id: "italian", label: "Italian", emoji: "🍝", image: "1498579150354-977475b7ea0b" },
      { id: "sushi", label: "Sushi Bar", emoji: "🍣", image: "1579871494447-9811cf80d66c" },
      { id: "mexican", label: "Mexican", emoji: "🌮", image: "1565299585323-38d6b0865b47" },
      { id: "seafood", label: "Seafood", emoji: "🦞", image: "1559339352-11d035aa65de" },
      { id: "thai", label: "Thai", emoji: "🍜", image: "1562565652-a0d8f0c59eb4" },
      { id: "bbq", label: "BBQ", emoji: "🍖", image: "1529193591184-b1d58069ecdd" },
      { id: "brunch", label: "Brunch Spot", emoji: "🥞", image: "1504674900247-0877df9cc836" },
    ],
  },
  {
    id: "coffee-spot",
    category: "dining",
    title: "Where do you get your coffee?",
    subtitle: "Morning ritual — where do you go?",
    funnySubtext: "Don't talk to me before this ☕",
    options: [
      { id: "starbucks-coffee", label: "Starbucks", emoji: "☕", image: "1509042239860-f550ce710b93" },
      { id: "dunkin-coffee", label: "Dunkin'", emoji: "🍩", image: "1551024601-bec78aea704b" },
      { id: "local-cafe", label: "Local Café", emoji: "🏠", image: "1501339847302-ac426a4a7cbb" },
      { id: "dutch-bros", label: "Dutch Bros", emoji: "🧡", image: "1495474472287-4d71bcdd2085" },
      { id: "peets", label: "Peet's Coffee", emoji: "🫘", image: "1442512595331-e89e73c16ba7" },
      { id: "home-brew", label: "I make my own", emoji: "🏡", image: "1495474472287-4d71bcdd2085" },
    ],
  },

  // ── STYLE & FASHION ──
  {
    id: "style-vibe",
    category: "style",
    title: "How would you describe your style?",
    subtitle: "Pick what feels like you",
    funnySubtext: "Fashion is art and you're the canvas 🎨",
    options: [
      { id: "casual", label: "Casual & Comfy", emoji: "👕", image: "1489987707025-afc232f7ea0f" },
      { id: "streetwear", label: "Streetwear", emoji: "🧢", image: "1523398002811-999ca8dec234" },
      { id: "minimalist", label: "Minimalist", emoji: "⬜", image: "1507680434567-5739c80be1ac" },
      { id: "preppy", label: "Preppy", emoji: "👔", image: "1507680434567-5739c80be1ac" },
      { id: "athletic", label: "Athleisure", emoji: "💪", image: "1518611012118-696072aa579a" },
      { id: "boho", label: "Boho", emoji: "🌸", image: "1469334031218-e382a71b716b" },
      { id: "glam", label: "Glam", emoji: "✨", image: "1490427712608-588e68359dbd" },
      { id: "vintage", label: "Vintage", emoji: "🕰️", image: "1558618666-fcd25c85f82e" },
    ],
  },
  {
    id: "jewelry-store",
    category: "style",
    title: "Where do you buy jewelry or accessories?",
    subtitle: "Sparkle sources only ✨",
    funnySubtext: "Treat yourself to something shiny 💍",
    options: [
      { id: "pandora", label: "Pandora", emoji: "💎", image: "1515562141207-7a88fb7ce338" },
      { id: "kay", label: "Kay Jewelers", emoji: "💍", image: "1515562141207-7a88fb7ce338" },
      { id: "tiffany", label: "Tiffany & Co.", emoji: "🩵", image: "1535632066927-ab7c9ab60908" },
      { id: "mejuri", label: "Mejuri", emoji: "🌙", image: "1611591437281-460bfbe1220a" },
      { id: "amazon-jewelry", label: "Amazon", emoji: "📦", image: "1523474253046-8cd2748b5fd2" },
      { id: "etsy", label: "Etsy", emoji: "🎨", image: "1513364776144-60967b0f800f" },
      { id: "target-jewelry", label: "Target", emoji: "🎯", image: "1572883454114-efb6cbe0d31b" },
    ],
    gender: ["female", "non-binary"],
  },

  // ── BEAUTY & GROOMING ──
  {
    id: "beauty-store",
    category: "beauty",
    title: "Where do you shop for beauty products?",
    subtitle: "Where does self-care start?",
    funnySubtext: "Went in for one thing, left with a bag 🛍️",
    options: [
      { id: "sephora", label: "Sephora", emoji: "💄", image: "1596462502278-27bfdc403348" },
      { id: "ulta", label: "Ulta", emoji: "💅", image: "1522335789203-aabd1fc54bc9" },
      { id: "target-beauty", label: "Target", emoji: "🎯", image: "1572883454114-efb6cbe0d31b" },
      { id: "amazon-beauty", label: "Amazon", emoji: "📦", image: "1523474253046-8cd2748b5fd2" },
      { id: "bath-body", label: "Bath & Body Works", emoji: "🕯️", image: "1602607663766-7dfad3154e0a" },
      { id: "drugstore", label: "Drugstore (CVS/Walgreens)", emoji: "💊", image: "1556228578-8c89e6adf883" },
      { id: "glossier", label: "Glossier", emoji: "✨", image: "1522335789203-aabd1fc54bc9" },
    ],
    gender: ["female", "non-binary"],
  },
  {
    id: "grooming-brands",
    category: "beauty",
    title: "Grooming brands you use?",
    subtitle: "Pick your daily lineup",
    funnySubtext: "Looking sharp takes the right tools 🪒",
    options: [
      { id: "gillette", label: "Gillette", emoji: "🪒", image: "1585683739946-4ebcfac00e2a" },
      { id: "old-spice", label: "Old Spice", emoji: "🧴", image: "1556228578-8c89e6adf883" },
      { id: "dollar-shave", label: "Dollar Shave Club", emoji: "💈", image: "1585683739946-4ebcfac00e2a" },
      { id: "manscaped", label: "Manscaped", emoji: "✂️", image: "1585683739946-4ebcfac00e2a" },
      { id: "axe", label: "Axe", emoji: "🧴", image: "1556228578-8c89e6adf883" },
      { id: "dove-men", label: "Dove Men+", emoji: "🕊️", image: "1556228578-8c89e6adf883" },
      { id: "harry", label: "Harry's", emoji: "🪒", image: "1585683739946-4ebcfac00e2a" },
    ],
    gender: ["male"],
  },

  // ── LIFESTYLE ──
  {
    id: "tech-brands",
    category: "lifestyle",
    title: "Tech brands you're loyal to?",
    subtitle: "Pick your ecosystem",
    funnySubtext: "This might start arguments 📱",
    options: [
      { id: "apple", label: "Apple", emoji: "🍎", image: "1611186871348-b1ce696e52c9" },
      { id: "samsung", label: "Samsung", emoji: "📱", image: "1610945415295-d9f7e33ebf3a" },
      { id: "sony", label: "Sony", emoji: "🎮", image: "1606144042614-b2417e99c4e3" },
      { id: "bose", label: "Bose", emoji: "🎧", image: "1505740420928-5e560c06d30e" },
      { id: "tesla", label: "Tesla", emoji: "⚡", image: "1560958089-b8a1929cea89" },
      { id: "google", label: "Google", emoji: "🔍", image: "1573804633927-bfcbcd909acd" },
    ],
  },
  {
    id: "home-store",
    category: "lifestyle",
    title: "Where do you shop for home stuff?",
    subtitle: "Candles, decor, furniture — where?",
    funnySubtext: "Adulting requires a good throw pillow 🛋️",
    options: [
      { id: "ikea", label: "IKEA", emoji: "🪑", image: "1555041469-a586c61ea9bc" },
      { id: "target-home", label: "Target", emoji: "🎯", image: "1572883454114-efb6cbe0d31b" },
      { id: "homegoods", label: "HomeGoods/TJ Maxx", emoji: "🏠", image: "1556909114-f6e7ad7d3136" },
      { id: "wayfair", label: "Wayfair", emoji: "🛋️", image: "1556909114-f6e7ad7d3136" },
      { id: "pottery-barn", label: "Pottery Barn", emoji: "🏡", image: "1556909114-f6e7ad7d3136" },
      { id: "amazon-home", label: "Amazon", emoji: "📦", image: "1523474253046-8cd2748b5fd2" },
      { id: "walmart-home", label: "Walmart", emoji: "🏪", image: "1534723452862-4c874018d66d" },
      { id: "cb2", label: "CB2/Crate & Barrel", emoji: "🍷", image: "1555041469-a586c61ea9bc" },
    ],
  },
  {
    id: "grocery-store",
    category: "lifestyle",
    title: "Where do you get groceries?",
    subtitle: "Weekly haul — where do you go?",
    funnySubtext: "Went for milk, left with $200 of snacks 🛒",
    options: [
      { id: "whole-foods", label: "Whole Foods", emoji: "🥑", image: "1542838132-92c53300491e" },
      { id: "trader-joes", label: "Trader Joe's", emoji: "🌻", image: "1542838132-92c53300491e" },
      { id: "kroger", label: "Kroger", emoji: "🛒", image: "1542838132-92c53300491e" },
      { id: "costco", label: "Costco", emoji: "📦", image: "1534723452862-4c874018d66d" },
      { id: "walmart-grocery", label: "Walmart", emoji: "🏪", image: "1534723452862-4c874018d66d" },
      { id: "aldi", label: "Aldi", emoji: "💰", image: "1542838132-92c53300491e" },
      { id: "publix", label: "Publix", emoji: "🟢", image: "1542838132-92c53300491e" },
      { id: "instacart", label: "Instacart/Delivery", emoji: "🚗", image: "1556742049-0cfed4f6a45d" },
    ],
  },
];

export const getQuestionsForGender = (gender: string): OnboardingQuestion[] => {
  const normalizedGender = gender.toLowerCase() as "male" | "female" | "non-binary";
  return onboardingQuestions.filter(
    (q) => !q.gender || q.gender.includes(normalizedGender)
  );
};
