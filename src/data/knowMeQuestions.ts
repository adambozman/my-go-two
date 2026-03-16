/**
 * Static Know Me question bank — 100 questions, 20 per section.
 * Gender-varied where relevant (options change, not the question itself).
 * Organized into 10 sprints of 10 questions (2 per section per sprint).
 */

import type { Gender } from "@/lib/gender";

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  section: "style-fit" | "food-drink" | "gifts-wishlist" | "home-living" | "entertainment";
  title: string;
  subtitle: string;
  type: "pill-select" | "single-select" | "color-grid";
  multiSelect: boolean;
  maxSelect?: number;
  options: QuizOption[];
  /** Gender-specific option overrides */
  genderOptions?: Partial<Record<Gender, QuizOption[]>>;
}

/* ── Helper ── */
const opt = (id: string, label: string): QuizOption => ({ id, label });

/* ═══════════════════════════════════════════════════════
   STYLE & FIT — 20 questions
   ═══════════════════════════════════════════════════════ */
const STYLE_FIT: QuizQuestion[] = [
  {
    id: "sf-01", section: "style-fit",
    title: "How would you describe your everyday style?",
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("casual", "Casual"), opt("classic", "Classic"), opt("trendy", "Trendy"), opt("minimalist", "Minimalist"), opt("sporty", "Sporty"), opt("bohemian", "Bohemian")],
  },
  {
    id: "sf-02", section: "style-fit",
    title: "What's your go-to color to wear?",
    subtitle: "Pick your favorite.",
    type: "single-select", multiSelect: false,
    options: [opt("black", "Black"), opt("navy", "Navy"), opt("white", "White"), opt("earth-tones", "Earth Tones"), opt("pastels", "Pastels"), opt("bold-colors", "Bold Colors")],
  },
  {
    id: "sf-03", section: "style-fit",
    title: "If someone is buying you a shirt, which colors should they AVOID?",
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("black", "Black"), opt("white", "White"), opt("red", "Red"), opt("navy", "Navy"), opt("green", "Green"), opt("beige", "Beige"), opt("yellow", "Yellow"), opt("gray", "Gray"), opt("purple", "Purple")],
  },
  {
    id: "sf-04", section: "style-fit",
    title: "What fit do you prefer in tops?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("slim", "Slim Fit"), opt("regular", "Regular Fit"), opt("relaxed", "Relaxed / Oversized"), opt("tailored", "Tailored")],
  },
  {
    id: "sf-05", section: "style-fit",
    title: "Which fabric feels most 'you'?",
    subtitle: "Pick your go-to.",
    type: "single-select", multiSelect: false,
    options: [opt("cotton", "Cotton"), opt("linen", "Linen"), opt("denim", "Denim"), opt("cashmere", "Cashmere/Wool"), opt("silk", "Silk/Satin"), opt("athletic", "Athletic/Tech Fabric")],
  },
  {
    id: "sf-06", section: "style-fit",
    title: "What's your shoe style?",
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("sneakers", "Sneakers"), opt("boots", "Boots"), opt("loafers", "Loafers"), opt("sandals", "Sandals"), opt("heels", "Heels"), opt("flats", "Flats")],
    genderOptions: {
      male: [opt("sneakers", "Sneakers"), opt("boots", "Boots"), opt("loafers", "Loafers"), opt("sandals", "Sandals"), opt("dress-shoes", "Dress Shoes"), opt("slides", "Slides")],
      female: [opt("sneakers", "Sneakers"), opt("boots", "Boots"), opt("loafers", "Loafers"), opt("sandals", "Sandals"), opt("heels", "Heels"), opt("flats", "Flats")],
    },
  },
  {
    id: "sf-07", section: "style-fit",
    title: "How do you feel about patterns?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("solids-only", "Solids Only"), opt("subtle", "Subtle Patterns"), opt("love-them", "Love Bold Patterns"), opt("stripes", "Stripes Are My Thing"), opt("florals", "Florals Always"), opt("plaid", "Plaid / Checks")],
  },
  {
    id: "sf-08", section: "style-fit",
    title: "What accessory do you reach for first?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("watch", "Watch"), opt("sunglasses", "Sunglasses"), opt("hat", "Hat / Cap"), opt("jewelry", "Jewelry"), opt("scarf", "Scarf"), opt("bag", "Bag / Tote")],
    genderOptions: {
      male: [opt("watch", "Watch"), opt("sunglasses", "Sunglasses"), opt("hat", "Hat / Cap"), opt("bracelet", "Bracelet"), opt("belt", "Belt"), opt("backpack", "Backpack")],
      female: [opt("watch", "Watch"), opt("sunglasses", "Sunglasses"), opt("earrings", "Earrings"), opt("necklace", "Necklace"), opt("scarf", "Scarf"), opt("handbag", "Handbag")],
    },
  },
  {
    id: "sf-09", section: "style-fit",
    title: "What's your dressing-up comfort level?",
    subtitle: "When the invite says 'smart casual'…",
    type: "single-select", multiSelect: false,
    options: [opt("overdress", "I'll overdress a little"), opt("exactly-right", "I'll hit exactly the mark"), opt("underdress", "I'll lean casual"), opt("skip", "I might skip the event")],
  },
  {
    id: "sf-10", section: "style-fit",
    title: "Which brand vibe resonates with you?",
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("luxury", "Luxury / Designer"), opt("high-street", "High Street"), opt("sustainable", "Sustainable / Ethical"), opt("vintage", "Vintage / Thrift"), opt("athletic", "Athletic / Performance"), opt("indie", "Indie / Local")],
  },
  {
    id: "sf-11", section: "style-fit",
    title: "What's your stance on jewelry?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("gold", "Gold all the way"), opt("silver", "Silver / Platinum"), opt("mixed", "I mix metals"), opt("minimal", "Minimal to none"), opt("statement", "Statement pieces"), opt("sentimental", "Only sentimental pieces")],
  },
  {
    id: "sf-12", section: "style-fit",
    title: "How often do you shop for clothes?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("weekly", "Weekly"), opt("monthly", "Monthly"), opt("seasonal", "Seasonally"), opt("rarely", "Only when needed"), opt("curated", "Big curated hauls")],
  },
  {
    id: "sf-13", section: "style-fit",
    title: "What's your ideal weekend outfit?",
    subtitle: "Pick what fits best.",
    type: "single-select", multiSelect: false,
    options: [opt("athleisure", "Athleisure"), opt("jeans-tee", "Jeans + Tee"), opt("sundress", "Sundress / Linen"), opt("loungewear", "Loungewear"), opt("put-together", "Still put-together"), opt("outdoorsy", "Outdoor / Adventure")],
    genderOptions: {
      male: [opt("athleisure", "Athleisure"), opt("jeans-tee", "Jeans + Tee"), opt("shorts-polo", "Shorts + Polo"), opt("loungewear", "Loungewear"), opt("put-together", "Still put-together"), opt("outdoorsy", "Outdoor / Adventure")],
      female: [opt("athleisure", "Athleisure"), opt("jeans-tee", "Jeans + Tee"), opt("sundress", "Sundress / Linen"), opt("loungewear", "Loungewear"), opt("put-together", "Still put-together"), opt("outdoorsy", "Outdoor / Adventure")],
    },
  },
  {
    id: "sf-14", section: "style-fit",
    title: "What's your fragrance preference?",
    subtitle: "Pick one family.",
    type: "single-select", multiSelect: false,
    options: [opt("woody", "Woody / Earthy"), opt("fresh", "Fresh / Clean"), opt("floral", "Floral"), opt("spicy", "Warm / Spicy"), opt("citrus", "Citrus"), opt("none", "I don't wear fragrance")],
  },
  {
    id: "sf-15", section: "style-fit",
    title: "Pick the jacket you'd grab first.",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("leather", "Leather Jacket"), opt("blazer", "Blazer"), opt("denim", "Denim Jacket"), opt("bomber", "Bomber"), opt("trench", "Trench Coat"), opt("puffer", "Puffer")],
  },
  {
    id: "sf-16", section: "style-fit",
    title: "Sunglasses shape preference?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("aviator", "Aviator"), opt("wayfarer", "Wayfarer"), opt("round", "Round"), opt("cat-eye", "Cat-Eye"), opt("sport", "Sport / Wrap"), opt("oversized", "Oversized")],
  },
  {
    id: "sf-17", section: "style-fit",
    title: "How important is comfort vs style?",
    subtitle: "Where do you fall?",
    type: "single-select", multiSelect: false,
    options: [opt("comfort-first", "Comfort first, always"), opt("lean-comfort", "Lean comfort, some style"), opt("balanced", "Perfect balance"), opt("lean-style", "Lean style, some comfort"), opt("style-first", "Style first, always")],
  },
  {
    id: "sf-18", section: "style-fit",
    title: "What do you feel best in for a night out?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("all-black", "All Black"), opt("statement-piece", "Statement Piece"), opt("classic-elegant", "Classic Elegant"), opt("edgy", "Edgy / Alternative"), opt("colorful", "Bright & Colorful"), opt("whatever-clean", "Whatever's Clean")],
  },
  {
    id: "sf-19", section: "style-fit",
    title: "How do you feel about secondhand clothing?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("love-it", "Love it — most of my wardrobe"), opt("selectively", "Selectively — for unique finds"), opt("open", "Open to it"), opt("prefer-new", "Prefer new"), opt("not-for-me", "Not for me")],
  },
  {
    id: "sf-20", section: "style-fit",
    title: "What's missing from your wardrobe?",
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("basics", "Quality Basics"), opt("outerwear", "Great Outerwear"), opt("formalwear", "Formalwear"), opt("activewear", "Activewear"), opt("accessories", "Accessories"), opt("shoes", "Shoes")],
  },
];

/* ═══════════════════════════════════════════════════════
   FOOD & DRINK — 20 questions
   ═══════════════════════════════════════════════════════ */
const FOOD_DRINK: QuizQuestion[] = [
  {
    id: "fd-01", section: "food-drink",
    title: "What's your ideal breakfast?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("full-spread", "Full Cooked Spread"), opt("pastry-coffee", "Pastry + Coffee"), opt("smoothie", "Smoothie / Açaí"), opt("eggs", "Eggs Any Way"), opt("skip", "I Skip Breakfast"), opt("cereal", "Cereal / Oatmeal")],
  },
  {
    id: "fd-02", section: "food-drink",
    title: "Pick your favorite cuisine.",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("italian", "Italian"), opt("japanese", "Japanese"), opt("mexican", "Mexican"), opt("thai", "Thai"), opt("french", "French"), opt("indian", "Indian"), opt("american", "American"), opt("mediterranean", "Mediterranean")],
  },
  {
    id: "fd-03", section: "food-drink",
    title: "How spicy do you like your food?",
    subtitle: "Be honest.",
    type: "single-select", multiSelect: false,
    options: [opt("no-spice", "No spice at all"), opt("mild", "Mild — just a hint"), opt("medium", "Medium — bring some heat"), opt("hot", "Hot — the hotter the better"), opt("extreme", "I want to suffer a little")],
  },
  {
    id: "fd-04", section: "food-drink",
    title: "What's your coffee order?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("black", "Black Coffee"), opt("latte", "Latte / Cappuccino"), opt("iced", "Iced Coffee"), opt("espresso", "Espresso"), opt("no-coffee", "I Don't Drink Coffee"), opt("tea", "Tea Person")],
  },
  {
    id: "fd-05", section: "food-drink",
    title: "Any dietary restrictions?",
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("none", "None"), opt("vegetarian", "Vegetarian"), opt("vegan", "Vegan"), opt("gluten-free", "Gluten-Free"), opt("dairy-free", "Dairy-Free"), opt("keto", "Keto / Low-Carb"), opt("halal", "Halal"), opt("kosher", "Kosher")],
  },
  {
    id: "fd-06", section: "food-drink",
    title: "Preferred way to eat?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("home-cook", "Cook at Home"), opt("order-in", "Order In"), opt("dine-out", "Dine Out"), opt("meal-prep", "Meal Prep"), opt("grab-go", "Grab & Go")],
  },
  {
    id: "fd-07", section: "food-drink",
    title: "What's your drink of choice?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("wine", "Wine"), opt("beer", "Beer / Cider"), opt("cocktails", "Cocktails"), opt("spirits", "Straight Spirits"), opt("non-alcoholic", "Non-Alcoholic"), opt("water-only", "Water — always")],
  },
  {
    id: "fd-08", section: "food-drink",
    title: "If wine, which type?",
    subtitle: "Pick your go-to.",
    type: "single-select", multiSelect: false,
    options: [opt("red", "Red"), opt("white", "White"), opt("rosé", "Rosé"), opt("sparkling", "Sparkling"), opt("natural", "Natural / Orange"), opt("no-wine", "Don't Drink Wine")],
  },
  {
    id: "fd-09", section: "food-drink",
    title: "Sweet tooth level?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("always", "Always dessert"), opt("sometimes", "Sometimes"), opt("rarely", "Rarely"), opt("savory", "I'm savory all the way"), opt("dark-chocolate", "Only dark chocolate")],
  },
  {
    id: "fd-10", section: "food-drink",
    title: "What's your snack personality?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("chips", "Chips / Crisps"), opt("fruit", "Fresh Fruit"), opt("nuts", "Nuts / Trail Mix"), opt("cheese", "Cheese & Crackers"), opt("candy", "Candy / Sweets"), opt("no-snack", "I Don't Snack")],
  },
  {
    id: "fd-11", section: "food-drink",
    title: "How adventurous are you with food?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("very", "I'll try anything once"), opt("somewhat", "Open but cautious"), opt("comfort", "Stick to what I know"), opt("picky", "Quite selective")],
  },
  {
    id: "fd-12", section: "food-drink",
    title: "What's your ideal date-night meal?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("fine-dining", "Fine Dining"), opt("cozy-bistro", "Cozy Bistro"), opt("home-cooked", "Home-Cooked"), opt("street-food", "Street Food Tour"), opt("sushi-bar", "Sushi Bar"), opt("steak-house", "Steak House")],
  },
  {
    id: "fd-13", section: "food-drink",
    title: "Morning beverage ritual?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("coffee-first", "Coffee before anything"), opt("tea-ritual", "Tea ritual"), opt("smoothie", "Smoothie / Juice"), opt("water-lemon", "Warm water + lemon"), opt("nothing", "Nothing — just go")],
  },
  {
    id: "fd-14", section: "food-drink",
    title: "Favorite comfort food?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("pasta", "Pasta"), opt("pizza", "Pizza"), opt("soup", "Soup / Stew"), opt("burger", "Burger & Fries"), opt("curry", "Curry & Rice"), opt("mac-cheese", "Mac & Cheese")],
  },
  {
    id: "fd-15", section: "food-drink",
    title: "How do you take your steak?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("rare", "Rare"), opt("medium-rare", "Medium Rare"), opt("medium", "Medium"), opt("well-done", "Well Done"), opt("no-steak", "I don't eat steak")],
  },
  {
    id: "fd-16", section: "food-drink",
    title: "Cooking skill level?",
    subtitle: "Be honest.",
    type: "single-select", multiSelect: false,
    options: [opt("chef", "Practically a chef"), opt("good", "Pretty good"), opt("basics", "I handle the basics"), opt("learning", "Still learning"), opt("disaster", "Kitchen disaster")],
  },
  {
    id: "fd-17", section: "food-drink",
    title: "Foods you absolutely can't stand?",
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("olives", "Olives"), opt("mushrooms", "Mushrooms"), opt("seafood", "Seafood"), opt("cilantro", "Cilantro"), opt("onions", "Raw Onions"), opt("spicy", "Anything Spicy"), opt("none", "I eat everything")],
  },
  {
    id: "fd-18", section: "food-drink",
    title: "What's your ideal weekend brunch?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("avocado-toast", "Avocado Toast"), opt("pancakes", "Pancakes / Waffles"), opt("eggs-benny", "Eggs Benedict"), opt("full-english", "Full English / American"), opt("light-bowl", "Light Grain Bowl"), opt("just-coffee", "Just Coffee & Pastry")],
  },
  {
    id: "fd-19", section: "food-drink",
    title: "Preferred ice cream flavor?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("vanilla", "Vanilla"), opt("chocolate", "Chocolate"), opt("strawberry", "Strawberry"), opt("mint-chip", "Mint Chip"), opt("cookie-dough", "Cookie Dough"), opt("unique", "Something Unique")],
  },
  {
    id: "fd-20", section: "food-drink",
    title: "Grocery shopping style?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("list-precise", "List & precise"), opt("browse-inspire", "Browse & get inspired"), opt("online-only", "Online delivery"), opt("farmers-market", "Farmers market"), opt("avoid", "I avoid it entirely")],
  },
];

/* ═══════════════════════════════════════════════════════
   GIFTS & WISHLIST — 20 questions
   ═══════════════════════════════════════════════════════ */
const GIFTS_WISHLIST: QuizQuestion[] = [
  {
    id: "gw-01", section: "gifts-wishlist",
    title: "What kind of gifts do you actually enjoy getting?",
    subtitle: "Pick up to two.",
    type: "pill-select", multiSelect: true, maxSelect: 2,
    options: [opt("experiences", "Experiences"), opt("practical", "Practical Items"), opt("luxury", "Small Luxuries"), opt("handmade", "Handmade / Personal"), opt("tech", "Tech & Gadgets"), opt("gift-cards", "Gift Cards")],
  },
  {
    id: "gw-02", section: "gifts-wishlist",
    title: "What's your love language?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("words", "Words of Affirmation"), opt("acts", "Acts of Service"), opt("gifts", "Receiving Gifts"), opt("quality-time", "Quality Time"), opt("touch", "Physical Touch")],
  },
  {
    id: "gw-03", section: "gifts-wishlist",
    title: "How do you feel about surprise gifts?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("love-them", "Love them!"), opt("depends", "Depends on the person"), opt("prefer-choosing", "I'd rather choose"), opt("anxious", "They make me a bit anxious"), opt("cash-preferred", "Just give me cash")],
  },
  {
    id: "gw-04", section: "gifts-wishlist",
    title: "Ideal price range for a 'nice' gift?",
    subtitle: "What feels right.",
    type: "single-select", multiSelect: false,
    options: [opt("under-50", "Under $50"), opt("50-100", "$50 – $100"), opt("100-250", "$100 – $250"), opt("250-500", "$250 – $500"), opt("over-500", "Over $500"), opt("doesnt-matter", "It's the thought that counts")],
  },
  {
    id: "gw-05", section: "gifts-wishlist",
    title: "What experience gift would thrill you?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("spa", "Spa / Wellness Day"), opt("concert", "Concert / Show"), opt("cooking-class", "Cooking Class"), opt("adventure", "Adventure Activity"), opt("trip", "Surprise Trip"), opt("dinner", "Fancy Dinner")],
  },
  {
    id: "gw-06", section: "gifts-wishlist",
    title: "Do you keep a wishlist?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("always-updated", "Yes, always updated"), opt("mental", "Mental list only"), opt("sometimes", "Sometimes, around holidays"), opt("never", "Never — surprise me")],
  },
  {
    id: "gw-07", section: "gifts-wishlist",
    title: "What's a gift that would disappoint you?",
    subtitle: "Pick any that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("generic", "Generic / Impersonal"), opt("clothing-wrong", "Clothing in the wrong style"), opt("knickknacks", "Knick-knacks / Clutter"), opt("regifted", "Obviously re-gifted"), opt("nothing", "Nothing disappoints me")],
  },
  {
    id: "gw-08", section: "gifts-wishlist",
    title: "Flowers: yes or no?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("love-them", "Love them"), opt("occasionally", "Occasionally nice"), opt("plants-better", "Prefer a plant"), opt("not-really", "Not really my thing"), opt("allergic", "Allergic!")],
  },
  {
    id: "gw-09", section: "gifts-wishlist",
    title: "If you could get a subscription, which one?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("streaming", "Streaming Service"), opt("book-box", "Book Box"), opt("food-box", "Food / Snack Box"), opt("beauty", "Beauty / Grooming"), opt("wine-spirits", "Wine / Spirits"), opt("fitness", "Fitness / Wellness")],
    genderOptions: {
      male: [opt("streaming", "Streaming Service"), opt("book-box", "Book Box"), opt("food-box", "Food / Snack Box"), opt("grooming", "Grooming Box"), opt("wine-spirits", "Wine / Spirits"), opt("fitness", "Fitness / Wellness")],
      female: [opt("streaming", "Streaming Service"), opt("book-box", "Book Box"), opt("food-box", "Food / Snack Box"), opt("beauty", "Beauty Box"), opt("wine-spirits", "Wine / Spirits"), opt("fitness", "Fitness / Wellness")],
    },
  },
  {
    id: "gw-10", section: "gifts-wishlist",
    title: "How do you react when you don't like a gift?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("gracious", "Gracious — they'll never know"), opt("honest", "Gently honest"), opt("return", "I return it quietly"), opt("keep-unused", "Keep it, never use it")],
  },
  {
    id: "gw-11", section: "gifts-wishlist",
    title: "What makes a gift feel personal?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("inside-joke", "References an inside joke"), opt("shows-listening", "Shows they listened"), opt("handwritten", "Handwritten note"), opt("effort", "Time & effort put in"), opt("matches-taste", "Matches my exact taste")],
  },
  {
    id: "gw-12", section: "gifts-wishlist",
    title: "How do you feel about gift cards?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("perfect", "Love them — practical"), opt("fine", "Totally fine"), opt("last-resort", "Last resort"), opt("impersonal", "Feels impersonal")],
  },
  {
    id: "gw-13", section: "gifts-wishlist",
    title: "Best holiday gift you've ever received?",
    subtitle: "What category was it?",
    type: "single-select", multiSelect: false,
    options: [opt("tech-gadget", "Tech / Gadget"), opt("jewelry-watch", "Jewelry / Watch"), opt("experience-trip", "Experience / Trip"), opt("clothing", "Clothing Item"), opt("sentimental", "Sentimental / Homemade"), opt("money", "Cash / Gift Card")],
  },
  {
    id: "gw-14", section: "gifts-wishlist",
    title: "How important is gift wrapping?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("very", "Love beautiful wrapping"), opt("nice-touch", "Nice touch, not essential"), opt("dont-care", "Don't care at all"), opt("eco", "Prefer eco-friendly wrapping")],
  },
  {
    id: "gw-15", section: "gifts-wishlist",
    title: "What tech gift would you love?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("headphones", "Wireless Headphones"), opt("smart-watch", "Smart Watch"), opt("tablet", "Tablet"), opt("smart-home", "Smart Home Device"), opt("no-tech", "I'm not a tech person")],
  },
  {
    id: "gw-16", section: "gifts-wishlist",
    title: "Do you prefer one big gift or several small ones?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("one-big", "One big, meaningful gift"), opt("several-small", "Several small things"), opt("mix", "A mix of both"), opt("no-preference", "No preference")],
  },
  {
    id: "gw-17", section: "gifts-wishlist",
    title: "How early should someone plan your birthday gift?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("months", "Months in advance"), opt("weeks", "A few weeks"), opt("last-minute", "Last minute is fine"), opt("no-birthday", "I don't celebrate my birthday")],
  },
  {
    id: "gw-18", section: "gifts-wishlist",
    title: "What's a charity cause you'd love a donation to?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("animals", "Animal Welfare"), opt("environment", "Environment"), opt("education", "Education"), opt("health", "Health / Medical"), opt("social-justice", "Social Justice"), opt("none", "I prefer physical gifts")],
  },
  {
    id: "gw-19", section: "gifts-wishlist",
    title: "What book genre would you love as a gift?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("fiction", "Fiction / Novels"), opt("self-help", "Self-Help"), opt("biography", "Biography"), opt("cooking", "Cookbooks"), opt("art-design", "Art / Design"), opt("no-books", "Not a book person")],
  },
  {
    id: "gw-20", section: "gifts-wishlist",
    title: "Would you rather receive something to wear, eat, do, or keep?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("wear", "Wear"), opt("eat", "Eat / Drink"), opt("do", "Do / Experience"), opt("keep", "Keep / Display")],
  },
];

/* ═══════════════════════════════════════════════════════
   HOME & LIVING — 20 questions
   ═══════════════════════════════════════════════════════ */
const HOME_LIVING: QuizQuestion[] = [
  {
    id: "hl-01", section: "home-living",
    title: "How would you describe your home aesthetic?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("modern-minimal", "Modern Minimal"), opt("cozy-warm", "Cozy & Warm"), opt("mid-century", "Mid-Century"), opt("bohemian", "Bohemian"), opt("industrial", "Industrial"), opt("traditional", "Traditional / Classic")],
  },
  {
    id: "hl-02", section: "home-living",
    title: "What's the vibe of your ideal living room?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("clean-airy", "Clean & Airy"), opt("layered-textured", "Layered & Textured"), opt("dark-moody", "Dark & Moody"), opt("colorful", "Bright & Colorful"), opt("earthy", "Earthy & Natural"), opt("eclectic", "Eclectic Mix")],
  },
  {
    id: "hl-03", section: "home-living",
    title: "Candles: yes, no, or obsessed?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("obsessed", "Obsessed"), opt("enjoy", "Enjoy them"), opt("occasionally", "Occasionally"), opt("not-really", "Not really"), opt("scent-sensitive", "Sensitive to scents")],
  },
  {
    id: "hl-04", section: "home-living",
    title: "Preferred candle / room scent?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("vanilla", "Vanilla / Sweet"), opt("woodsy", "Woodsy / Cedar"), opt("fresh-linen", "Fresh Linen"), opt("floral", "Floral"), opt("citrus", "Citrus"), opt("no-scent", "Unscented")],
  },
  {
    id: "hl-05", section: "home-living",
    title: "What room do you spend the most time in?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("living-room", "Living Room"), opt("bedroom", "Bedroom"), opt("kitchen", "Kitchen"), opt("office", "Home Office"), opt("outdoor", "Patio / Balcony"), opt("bathroom", "Bathroom (self-care)")],
  },
  {
    id: "hl-06", section: "home-living",
    title: "How do you feel about plants at home?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("jungle", "The more the better"), opt("few-easy", "A few easy ones"), opt("kill-them", "I kill every plant"), opt("fake-ok", "Fake plants are fine"), opt("none", "Not my thing")],
  },
  {
    id: "hl-07", section: "home-living",
    title: "Ideal bed setup?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("cloud-soft", "Cloud-soft, tons of pillows"), opt("firm-minimal", "Firm & Minimal"), opt("linen-natural", "Linen / Natural fabrics"), opt("luxury-hotel", "Luxury hotel style"), opt("weighted-blanket", "Weighted blanket always")],
  },
  {
    id: "hl-08", section: "home-living",
    title: "Kitchen appliance you can't live without?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("coffee-maker", "Coffee Machine"), opt("air-fryer", "Air Fryer"), opt("blender", "Blender"), opt("instant-pot", "Instant Pot"), opt("stand-mixer", "Stand Mixer"), opt("none", "Just a stove & pan")],
  },
  {
    id: "hl-09", section: "home-living",
    title: "How tidy are you, honestly?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("spotless", "Spotless — always"), opt("tidy", "Pretty tidy"), opt("organized-chaos", "Organized chaos"), opt("messy", "Messy but I know where things are"), opt("trying", "Actively trying to improve")],
  },
  {
    id: "hl-10", section: "home-living",
    title: "What art style do you prefer on your walls?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("abstract", "Abstract"), opt("photography", "Photography"), opt("prints", "Prints / Posters"), opt("painting", "Classical Paintings"), opt("minimal", "Minimal / Blank Walls"), opt("gallery-wall", "Gallery Wall Mix")],
  },
  {
    id: "hl-11", section: "home-living",
    title: "Morning routine length?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("under-15", "Under 15 min"), opt("15-30", "15–30 min"), opt("30-60", "30–60 min"), opt("over-60", "Over an hour"), opt("no-routine", "What routine?")],
  },
  {
    id: "hl-12", section: "home-living",
    title: "Ideal temperature at home?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("cool", "Cool — windows open"), opt("warm-cozy", "Warm & Cozy"), opt("ac-always", "AC always running"), opt("varies", "Varies by season"), opt("no-preference", "Whatever")],
  },
  {
    id: "hl-13", section: "home-living",
    title: "How do you feel about smart home tech?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("fully-smart", "Fully automated home"), opt("some", "Some devices"), opt("curious", "Curious but haven't started"), opt("prefer-manual", "Prefer manual / analog"), opt("privacy", "Privacy concerns")],
  },
  {
    id: "hl-14", section: "home-living",
    title: "Bathroom luxury you'd splurge on?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("rain-shower", "Rain Shower Head"), opt("heated-floors", "Heated Floors"), opt("bathtub", "Deep Soaking Tub"), opt("towels", "Premium Towels"), opt("skincare", "High-End Skincare"), opt("none", "Keep it basic")],
  },
  {
    id: "hl-15", section: "home-living",
    title: "What color palette for your home?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("neutral", "Neutrals / Beige / White"), opt("earth", "Earth Tones / Terracotta"), opt("cool-gray", "Cool Grays / Blues"), opt("bold", "Bold & Saturated"), opt("monochrome", "Black & White"), opt("pastels", "Soft Pastels")],
  },
  {
    id: "hl-16", section: "home-living",
    title: "How important is hosting / entertaining at home?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("love-it", "I host all the time"), opt("occasionally", "Occasionally"), opt("intimate", "Small, intimate gatherings only"), opt("rarely", "Rarely"), opt("never", "My space is private")],
  },
  {
    id: "hl-17", section: "home-living",
    title: "What's your reading spot?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("couch", "The Couch"), opt("bed", "In Bed"), opt("desk", "At a Desk"), opt("outdoor", "Outdoors"), opt("dont-read", "I don't read much"), opt("audiobooks", "Audiobooks — anywhere")],
  },
  {
    id: "hl-18", section: "home-living",
    title: "Laundry frequency?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("daily", "Daily"), opt("every-few", "Every few days"), opt("weekly", "Weekly"), opt("when-needed", "When the basket overflows"), opt("service", "I use a laundry service")],
  },
  {
    id: "hl-19", section: "home-living",
    title: "How do you wake up?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("natural", "Naturally — no alarm"), opt("one-alarm", "One alarm, right up"), opt("snooze", "Snooze 3+ times"), opt("sunrise-light", "Sunrise alarm / light"), opt("someone-wakes", "Someone wakes me")],
  },
  {
    id: "hl-20", section: "home-living",
    title: "Dream outdoor space?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("garden", "Lush Garden"), opt("rooftop", "Rooftop Terrace"), opt("pool", "Pool / Hot Tub"), opt("fire-pit", "Fire Pit Area"), opt("balcony", "Simple Balcony"), opt("none", "Indoor person")],
  },
];

/* ═══════════════════════════════════════════════════════
   ENTERTAINMENT — 20 questions
   ═══════════════════════════════════════════════════════ */
const ENTERTAINMENT: QuizQuestion[] = [
  {
    id: "en-01", section: "entertainment",
    title: "What's your go-to way to unwind?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("tv-movies", "TV / Movies"), opt("reading", "Reading"), opt("gaming", "Gaming"), opt("music", "Music"), opt("exercise", "Exercise"), opt("socializing", "Socializing")],
  },
  {
    id: "en-02", section: "entertainment",
    title: "Favorite movie genre?",
    subtitle: "Pick up to two.",
    type: "pill-select", multiSelect: true, maxSelect: 2,
    options: [opt("action", "Action / Thriller"), opt("comedy", "Comedy"), opt("drama", "Drama"), opt("romance", "Romance"), opt("sci-fi", "Sci-Fi / Fantasy"), opt("documentary", "Documentary"), opt("horror", "Horror"), opt("indie", "Indie / Art House")],
  },
  {
    id: "en-03", section: "entertainment",
    title: "Music taste?",
    subtitle: "Pick up to two.",
    type: "pill-select", multiSelect: true, maxSelect: 2,
    options: [opt("pop", "Pop"), opt("rock", "Rock / Alternative"), opt("hip-hop", "Hip-Hop / R&B"), opt("electronic", "Electronic"), opt("classical", "Classical / Jazz"), opt("country", "Country"), opt("indie", "Indie"), opt("latin", "Latin / Reggaeton")],
  },
  {
    id: "en-04", section: "entertainment",
    title: "Ideal weekend activity?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("brunch", "Brunch with friends"), opt("outdoors", "Outdoor adventure"), opt("museum", "Museum / Gallery"), opt("binge-watch", "Binge-watch"), opt("sports", "Play / Watch sports"), opt("nothing", "Absolutely nothing")],
  },
  {
    id: "en-05", section: "entertainment",
    title: "How do you feel about live events?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("love-them", "Love concerts & shows"), opt("occasionally", "Enjoy occasionally"), opt("prefer-small", "Prefer intimate venues"), opt("not-my-thing", "Not really my thing"), opt("festivals", "Festival lover!")],
  },
  {
    id: "en-06", section: "entertainment",
    title: "What's your ideal vacation?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("beach", "Beach / Resort"), opt("city", "City Exploration"), opt("adventure", "Adventure / Outdoors"), opt("cultural", "Cultural / Historical"), opt("road-trip", "Road Trip"), opt("staycation", "Staycation")],
  },
  {
    id: "en-07", section: "entertainment",
    title: "How do you consume content?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("streaming", "Streaming (Netflix, etc.)"), opt("podcasts", "Podcasts"), opt("social-media", "Social Media"), opt("books", "Books / Kindle"), opt("youtube", "YouTube"), opt("mix", "A bit of everything")],
  },
  {
    id: "en-08", section: "entertainment",
    title: "Are you a gamer?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("hardcore", "Hardcore gamer"), opt("casual", "Casual gamer"), opt("mobile", "Mobile games only"), opt("board-games", "Board / Card games"), opt("no", "Not a gamer")],
  },
  {
    id: "en-09", section: "entertainment",
    title: "Favorite type of podcast?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("true-crime", "True Crime"), opt("comedy", "Comedy / Chat"), opt("business", "Business / Self-Dev"), opt("news-politics", "News / Politics"), opt("storytelling", "Storytelling"), opt("no-podcasts", "Don't listen to podcasts")],
  },
  {
    id: "en-10", section: "entertainment",
    title: "Social media: love it or leave it?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("love-it", "Love it — always online"), opt("use-it", "Use it, not obsessed"), opt("lurker", "Lurker — rarely post"), opt("minimal", "Minimal usage"), opt("off-grid", "Trying to quit / Off grid")],
  },
  {
    id: "en-11", section: "entertainment",
    title: "Ideal date night?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("dinner-out", "Dinner Out"), opt("movie-night", "Movie Night In"), opt("activity", "Activity / Adventure"), opt("live-event", "Live Event"), opt("cook-together", "Cook Together"), opt("surprise", "Surprise Me")],
  },
  {
    id: "en-12", section: "entertainment",
    title: "How active are you?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("very", "Daily workout"), opt("regular", "3–4 times a week"), opt("casual", "Casually active"), opt("trying", "Trying to be more active"), opt("not-really", "Not very active")],
  },
  {
    id: "en-13", section: "entertainment",
    title: "Preferred exercise?",
    subtitle: "Pick up to two.",
    type: "pill-select", multiSelect: true, maxSelect: 2,
    options: [opt("gym", "Gym / Weights"), opt("running", "Running / Cardio"), opt("yoga", "Yoga / Pilates"), opt("sports", "Team Sports"), opt("swimming", "Swimming"), opt("hiking", "Hiking / Walking"), opt("cycling", "Cycling"), opt("dance", "Dance")],
  },
  {
    id: "en-14", section: "entertainment",
    title: "Night owl or early bird?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("early-bird", "Early Bird"), opt("night-owl", "Night Owl"), opt("depends", "Depends on the day"), opt("neither", "Neither — mid-day person")],
  },
  {
    id: "en-15", section: "entertainment",
    title: "How many books do you read a year?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("zero", "Zero"), opt("1-5", "1–5"), opt("5-15", "5–15"), opt("15-30", "15–30"), opt("30-plus", "30+"), opt("audio-counts", "Audiobooks count, right?")],
  },
  {
    id: "en-16", section: "entertainment",
    title: "Favorite way to watch sports?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("live-stadium", "Live at the stadium"), opt("bar", "At a bar with friends"), opt("home", "Home on the couch"), opt("dont-watch", "I don't watch sports")],
  },
  {
    id: "en-17", section: "entertainment",
    title: "What hobby have you always wanted to try?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("pottery", "Pottery / Ceramics"), opt("painting", "Painting"), opt("surfing", "Surfing"), opt("photography", "Photography"), opt("instrument", "Musical Instrument"), opt("martial-arts", "Martial Arts")],
  },
  {
    id: "en-18", section: "entertainment",
    title: "How do you feel about traveling?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("passport-ready", "Passport always ready"), opt("few-per-year", "A few trips a year"), opt("homebody", "Prefer being home"), opt("local-explore", "Local exploration"), opt("bucket-list", "Working through a bucket list")],
  },
  {
    id: "en-19", section: "entertainment",
    title: "Binge-watch style?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("whole-season", "Whole season in a day"), opt("few-episodes", "A few episodes at a time"), opt("one-per-day", "One per day — savor it"), opt("dont-binge", "I don't binge-watch")],
  },
  {
    id: "en-20", section: "entertainment",
    title: "What would you do with a free afternoon?",
    subtitle: "Pick one.",
    type: "single-select", multiSelect: false,
    options: [opt("nap", "Nap"), opt("explore", "Explore somewhere new"), opt("create", "Create something"), opt("socialize", "See friends / family"), opt("self-care", "Self-care ritual"), opt("learn", "Learn something new")],
  },
];

/* ═══════════════════════════════════════════════════════
   COMBINED BANK & SPRINT BUILDER
   ═══════════════════════════════════════════════════════ */

const ALL_QUESTIONS: QuizQuestion[] = [
  ...STYLE_FIT,
  ...FOOD_DRINK,
  ...GIFTS_WISHLIST,
  ...HOME_LIVING,
  ...ENTERTAINMENT,
];

export const SECTIONS = [
  { id: "style-fit", label: "Style & Fit", icon: "✦" },
  { id: "food-drink", label: "Food & Drink", icon: "◉" },
  { id: "gifts-wishlist", label: "Gifts & Wishlist", icon: "♡" },
  { id: "home-living", label: "Home & Living", icon: "⬡" },
  { id: "entertainment", label: "Entertainment", icon: "★" },
] as const;

export const SPRINT_NAMES = [
  "The First Impressions",
  "Everyday Essentials",
  "Taste & Flavor",
  "Gifts & Giving",
  "Home Comforts",
  "Weekend Vibes",
  "Deeper Preferences",
  "Lifestyle Lens",
  "Hidden Gems",
  "The Final Touches",
];

export interface Sprint {
  id: number;
  name: string;
  questions: QuizQuestion[];
}

/**
 * Build 10 sprints of 10 questions each (2 per section per sprint).
 * Resolves gender-specific options.
 */
export function buildSprints(gender: Gender): Sprint[] {
  const bySection: Record<string, QuizQuestion[]> = {};
  for (const q of ALL_QUESTIONS) {
    if (!bySection[q.section]) bySection[q.section] = [];
    // Resolve gender options
    const resolved: QuizQuestion = {
      ...q,
      options: q.genderOptions?.[gender] ?? q.options,
    };
    bySection[q.section].push(resolved);
  }

  const sprints: Sprint[] = [];
  for (let i = 0; i < 10; i++) {
    const questions: QuizQuestion[] = [];
    for (const sec of SECTIONS) {
      const pool = bySection[sec.id];
      if (pool) {
        questions.push(...pool.slice(i * 2, i * 2 + 2));
      }
    }
    sprints.push({
      id: i + 1,
      name: SPRINT_NAMES[i],
      questions,
    });
  }
  return sprints;
}

export function getTotalQuestionCount(): number {
  return ALL_QUESTIONS.length;
}
