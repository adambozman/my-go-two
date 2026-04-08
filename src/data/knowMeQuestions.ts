/**
 * Static Know Me question bank — 100 questions, 20 per section.
 * Gender-varied where relevant (options change, not the question itself).
 * Organized into 10 sprints of 10 questions (2 per section per sprint).
 */

import type { Gender } from "@/lib/gender";
import {
  getThisOrThatV2AuthoredBank,
  type ThisOrThatV2AuthoredCategoryId,
} from "./thisOrThatV2Authored";


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
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
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
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
    options: [opt("action", "Action / Thriller"), opt("comedy", "Comedy"), opt("drama", "Drama"), opt("romance", "Romance"), opt("sci-fi", "Sci-Fi / Fantasy"), opt("documentary", "Documentary"), opt("horror", "Horror"), opt("indie", "Indie / Art House")],
  },
  {
    id: "en-03", section: "entertainment",
    title: "Music taste?",
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
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
    subtitle: "Select all that apply.",
    type: "pill-select", multiSelect: true,
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

/* ═══════════════════════════════════════════════════════
   YES OR NO — Full-screen swipe cards with images
   ═══════════════════════════════════════════════════════ */
export interface ThisOrThatItem {
  id: string;
  prompt: string;
  category: string;
  image: string;
  /** legacy compat */
  optionA: string;
  optionB: string;
}

// This file remains the live This or That v1 runtime source.
// The authored v2 content contract and metadata scaffolding now live in:
// src/data/thisOrThatV2.ts

export interface ThisOrThatCategory {
  id: string;
  title: string;
  description: string;
  eyebrow: string;
  supportedGenders: Gender[];
  status: "live" | "coming-soon";
  promptIds: Partial<Record<Gender, string[]>>;
}

export interface BrandBankEntry {
  brand: string;
  dnaTags: string[];
}

export interface BrandBankCategory {
  id: string;
  title: string;
  brands: BrandBankEntry[];
}

export interface BrandBankQuestion {
  id: string;
  prompt: string;
  categoryA: string;
  categoryB: string;
  tagsForA: string[];
  tagsForB: string[];
}

export interface GenderedBrandBank {
  categories: BrandBankCategory[];
  questions: BrandBankQuestion[];
}

export type ThisOrThatBankMap = Partial<Record<Gender, GenderedBrandBank>>;

export const THIS_OR_THAT_CATEGORIES: ThisOrThatCategory[] = [
  {
    id: "style-aesthetic",
    title: "Style & Aesthetic",
    description: "Fixed instinct prompts around visual taste, silhouettes, and overall vibe.",
    eyebrow: "Style lens",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["tot-53", "tot-54", "tot-55", "tot-56", "tot-57", "tot-58", "tot-59", "tot-60", "tot-61", "tot-62"], female: [], "non-binary": [] },
  },
  {
    id: "brands-shopping",
    title: "Brands & Shopping",
    description: "Quick picks about labels, stores, and the kinds of brands that feel like you.",
    eyebrow: "Brand signals",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-br-01", "male-br-02", "male-br-03", "male-br-04", "male-br-05", "male-br-06", "male-br-07", "male-br-08", "male-br-09", "male-br-10"], female: [], "non-binary": [] },
  },
  {
    id: "colors-palette",
    title: "Colors & Palette",
    description: "Preference prompts for tones, contrast, color energy, and what feels most natural.",
    eyebrow: "Color read",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-color-01", "male-color-02", "male-color-03", "male-color-04", "male-color-05", "male-color-06", "male-color-07", "male-color-08", "male-color-09", "male-color-10"], female: [], "non-binary": [] },
  },
  {
    id: "food-dining",
    title: "Food & Dining",
    description: "Taste cues around cravings, comfort meals, restaurants, and how you like to dine.",
    eyebrow: "Taste cues",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-food-01", "male-food-02", "male-food-03", "male-food-04", "male-food-05", "male-food-06", "male-food-07", "male-food-08", "male-food-09", "male-food-10"], female: [], "non-binary": [] },
  },
  {
    id: "travel-trips",
    title: "Travel & Trips",
    description: "Instinctive picks about destinations, travel mood, and what kind of getaway fits you.",
    eyebrow: "Travel mood",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-trip-01", "male-trip-02", "male-trip-03", "male-trip-04", "male-trip-05", "male-trip-06", "male-trip-07", "male-trip-08", "male-trip-09", "male-trip-10"], female: [], "non-binary": [] },
  },
  {
    id: "date-ideas-romance",
    title: "Date Ideas & Romance",
    description: "Chemistry, date-night energy, and the romantic experiences you lean toward.",
    eyebrow: "Romance cues",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-date-01", "male-date-02", "male-date-03", "male-date-04", "male-date-05", "male-date-06", "male-date-07", "male-date-08", "male-date-09", "male-date-10"], female: [], "non-binary": [] },
  },
  {
    id: "home-living",
    title: "Home & Living",
    description: "Signals about comfort, décor, routines, and what makes a space feel right.",
    eyebrow: "Home feel",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-home-01", "male-home-02", "male-home-03", "male-home-04", "male-home-05", "male-home-06", "male-home-07", "male-home-08", "male-home-09", "male-home-10"], female: [], "non-binary": [] },
  },
  {
    id: "love-language-relationships",
    title: "Love Language & Relationships",
    description: "Instinct questions for connection style, affection, and the relationship patterns that fit.",
    eyebrow: "Connection read",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-love-01", "male-love-02", "male-love-03", "male-love-04", "male-love-05", "male-love-06", "male-love-07", "male-love-08", "male-love-09", "male-love-10"], female: [], "non-binary": [] },
  },
  {
    id: "hobbies-weekend",
    title: "Hobbies & Weekend",
    description: "Fast reads on downtime, interests, and the kind of weekend rhythm that feels good.",
    eyebrow: "Weekend rhythm",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-hobby-01", "male-hobby-02", "male-hobby-03", "male-hobby-04", "male-hobby-05", "male-hobby-06", "male-hobby-07", "male-hobby-08", "male-hobby-09", "male-hobby-10"], female: [], "non-binary": [] },
  },
  {
    id: "gifting-actually-want",
    title: "Gifting — what you actually want",
    description: "Gift instincts, wish-list clues, and what feels genuinely thoughtful.",
    eyebrow: "Gift instinct",
    supportedGenders: ["male", "female", "non-binary"],
    status: "live",
    promptIds: { male: ["male-gift-01", "male-gift-02", "male-gift-03", "male-gift-04", "male-gift-05", "male-gift-06", "male-gift-07", "male-gift-08", "male-gift-09", "male-gift-10"], female: [], "non-binary": [] },
  },
  {
    id: "food-orders",
    title: "Your Go-To Orders",
    description: "Your exact orders at the places you love — so the people in your life always get it right.",
    eyebrow: "Go-to orders",
    supportedGenders: ["male", "female", "non-binary"],
    status: "coming-soon",
    promptIds: { male: [], female: [], "non-binary": [] },
  },
];

export const getThisOrThatBank = (categoryId: string, gender: Gender): GenderedBrandBank | null => {
  const authoredBank = getThisOrThatV2AuthoredBank(
    gender,
    categoryId as ThisOrThatV2AuthoredCategoryId,
  );
  if (authoredBank) {
    return authoredBank;
  }

  if (categoryId === "style-aesthetic") {
    return {
      categories: [
        {
          id: "style-aesthetic",
          title: "Style & Aesthetic",
          brands: [],
        },
      ],
      questions: THIS_OR_THAT_CATEGORIES.find((category) => category.id === categoryId)?.promptIds[gender]?.map((id) => {
        const item = THIS_OR_THAT.find((entry) => entry.id === id);
        return item
          ? {
              id: item.id,
              prompt: item.prompt,
              categoryA: item.optionA,
              categoryB: item.optionB,
              tagsForA: [item.optionA.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
              tagsForB: [item.optionB.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
            }
          : null;
      }).filter(Boolean) as BrandBankQuestion[] ?? [],
    };
  }

  switch (categoryId) {
    case "brands-shopping":
      return BRANDS_RETAILERS_BANKS[gender] ?? null;
    case "colors-palette":
      return COLORS_PALETTE_BANKS[gender] ?? null;
    case "food-dining":
      return FOOD_DINING_BANKS[gender] ?? null;
    case "travel-trips":
      return TRAVEL_TRIP_BANKS[gender] ?? null;
    case "date-ideas-romance":
      return DATE_IDEAS_ROMANCE_BANKS[gender] ?? null;
    case "home-living":
      return HOME_LIVING_BANKS[gender] ?? null;
    case "love-language-relationships":
      return LOVE_LANGUAGE_RELATIONSHIPS_BANKS[gender] ?? null;
    case "hobbies-weekend":
      return HOBBIES_WEEKEND_BANKS[gender] ?? null;
    case "gifting-actually-want":
      return GIFTING_BANKS[gender] ?? null;
    default:
      return null;
  }
};

export const THIS_OR_THAT: ThisOrThatItem[] = [
  /* ── CLOTHING BRANDS (20) ── */
  { id: "tot-01", prompt: "Would you wear Nike?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-02", prompt: "Are you an Adidas person?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-03", prompt: "Do you like Lululemon?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-04", prompt: "Would you shop at Zara?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-05", prompt: "Are you into Patagonia?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-06", prompt: "Would you wear Ralph Lauren?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-07", prompt: "Do you like H&M?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-08", prompt: "Would you wear Gucci?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-09", prompt: "Are you a Levi's person?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-10", prompt: "Do you shop at Nordstrom?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-11", prompt: "Would you wear The North Face?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-12", prompt: "Are you into Uniqlo?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-13", prompt: "Do you like Calvin Klein?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-14", prompt: "Would you wear Prada?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-15", prompt: "Are you an Under Armour person?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-16", prompt: "Do you shop at Anthropologie?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-17", prompt: "Would you wear Tommy Hilfiger?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-18", prompt: "Are you into New Balance?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-19", prompt: "Do you like Allbirds?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-20", prompt: "Would you wear Burberry?", category: "Clothing Brands", image: "", optionA: "Yes", optionB: "No" },

  /* ── ELECTRONICS & TECH (12) ── */
  { id: "tot-21", prompt: "Are you Team Apple?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-22", prompt: "Would you buy a Samsung phone?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-23", prompt: "Do you want AirPods Max?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-24", prompt: "Are you a PlayStation person?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-25", prompt: "Would you use a Kindle?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-26", prompt: "Do you want a smart home setup?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-27", prompt: "Are you into mechanical keyboards?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-28", prompt: "Would you buy a drone?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-29", prompt: "Do you want an Apple Watch?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-30", prompt: "Are you a Bose or Sony headphones person?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-31", prompt: "Would you buy a VR headset?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-32", prompt: "Do you prefer laptop over desktop?", category: "Electronics", image: "", optionA: "Yes", optionB: "No" },

  /* ── CARS & DRIVING (10) ── */
  { id: "tot-33", prompt: "Would you drive a Tesla?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-34", prompt: "Are you a truck person?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-35", prompt: "Would you buy a BMW?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-36", prompt: "Do you prefer SUVs over sedans?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-37", prompt: "Would you go electric?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-38", prompt: "Are you into Jeeps?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-39", prompt: "Would you drive a sports car?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-40", prompt: "Do you care about car brands?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-41", prompt: "Would you buy a convertible?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },
  { id: "tot-42", prompt: "Are you a road trip person?", category: "Cars", image: "", optionA: "Yes", optionB: "No" },

  /* ── FOOD & DRINK (10) ── */
  { id: "tot-43", prompt: "Sweet or Savory?", category: "Food", image: "", optionA: "Sweet", optionB: "Savory" },
  { id: "tot-44", prompt: "Beer or Cocktails?", category: "Food", image: "", optionA: "Beer", optionB: "Cocktails" },
  { id: "tot-45", prompt: "Home Cooked or Takeout?", category: "Food", image: "", optionA: "Home Cooked", optionB: "Takeout" },
  { id: "tot-46", prompt: "Spicy or Mild?", category: "Food", image: "", optionA: "Spicy", optionB: "Mild" },
  { id: "tot-47", prompt: "Dine-In or Delivery?", category: "Food", image: "", optionA: "Dine-In", optionB: "Delivery" },
  { id: "tot-48", prompt: "Steak or Sushi?", category: "Food", image: "", optionA: "Steak", optionB: "Sushi" },
  { id: "tot-49", prompt: "Ice Cream or Chips?", category: "Food", image: "", optionA: "Ice Cream", optionB: "Chips" },
  { id: "tot-50", prompt: "Regular or Diet/Zero?", category: "Food", image: "", optionA: "Regular", optionB: "Diet/Zero" },
  { id: "tot-51", prompt: "Breakfast or Dinner?", category: "Food", image: "", optionA: "Breakfast", optionB: "Dinner" },
  { id: "tot-52", prompt: "Water or Soda?", category: "Food", image: "", optionA: "Water", optionB: "Soda" },

  /* ── STYLE & AESTHETICS (10) ── */
  { id: "tot-53", prompt: "Oversized or Tailored?", category: "Style", image: "", optionA: "Oversized", optionB: "Tailored" },
  { id: "tot-54", prompt: "Neutrals or Colors?", category: "Style", image: "", optionA: "Neutrals", optionB: "Colors" },
  { id: "tot-55", prompt: "Logos or Minimalist?", category: "Style", image: "", optionA: "Logos", optionB: "Minimalist" },
  { id: "tot-56", prompt: "Sneakers or Boots?", category: "Style", image: "", optionA: "Sneakers", optionB: "Boots" },
  { id: "tot-57", prompt: "Clean Shaven or Beard?", category: "Style", image: "", optionA: "Clean Shaven", optionB: "Beard" },
  { id: "tot-58", prompt: "Silver or Gold?", category: "Style", image: "", optionA: "Silver", optionB: "Gold" },
  { id: "tot-59", prompt: "Vintage or Brand New?", category: "Style", image: "", optionA: "Vintage", optionB: "Brand New" },
  { id: "tot-60", prompt: "Hoodie or Blazer?", category: "Style", image: "", optionA: "Hoodie", optionB: "Blazer" },
  { id: "tot-61", prompt: "Denim or Chinos?", category: "Style", image: "", optionA: "Denim", optionB: "Chinos" },
  { id: "tot-62", prompt: "Hat or No Hat?", category: "Style", image: "", optionA: "Hat", optionB: "No Hat" },

  /* ── LIFESTYLE & HABITS (10) ── */
  { id: "tot-63", prompt: "Morning Person or Night Owl?", category: "Lifestyle", image: "", optionA: "Morning Person", optionB: "Night Owl" },
  { id: "tot-64", prompt: "Coffee or Tea?", category: "Lifestyle", image: "", optionA: "Coffee", optionB: "Tea" },
  { id: "tot-65", prompt: "Gym or Outdoor Run?", category: "Lifestyle", image: "", optionA: "Gym", optionB: "Outdoor Run" },
  { id: "tot-66", prompt: "City Life or Country Living?", category: "Lifestyle", image: "", optionA: "City Life", optionB: "Country Living" },
  { id: "tot-67", prompt: "Phone Call or Text?", category: "Lifestyle", image: "", optionA: "Phone Call", optionB: "Text" },
  { id: "tot-68", prompt: "Work from Home or In-Office?", category: "Lifestyle", image: "", optionA: "Work from Home", optionB: "In-Office" },
  { id: "tot-69", prompt: "Android or iPhone?", category: "Lifestyle", image: "", optionA: "Android", optionB: "iPhone" },
  { id: "tot-70", prompt: "Early or Exactly on Time?", category: "Lifestyle", image: "", optionA: "Early", optionB: "Exactly on Time" },
  { id: "tot-71", prompt: "Organized Chaos or Perfectly Neat?", category: "Lifestyle", image: "", optionA: "Organized Chaos", optionB: "Perfectly Neat" },
  { id: "tot-72", prompt: "PC or Console?", category: "Lifestyle", image: "", optionA: "PC", optionB: "Console" },

  /* ── TRAVEL & LEISURE (10) ── */
  { id: "tot-73", prompt: "Mountains or Beach?", category: "Places", image: "", optionA: "Mountains", optionB: "Beach" },
  { id: "tot-74", prompt: "Road Trip or Flight?", category: "Places", image: "", optionA: "Road Trip", optionB: "Flight" },
  { id: "tot-75", prompt: "Planned Itinerary or Wing It?", category: "Places", image: "", optionA: "Planned Itinerary", optionB: "Wing It" },
  { id: "tot-76", prompt: "Luxury Hotel or Airbnb?", category: "Places", image: "", optionA: "Luxury Hotel", optionB: "Airbnb" },
  { id: "tot-77", prompt: "Winter or Summer?", category: "Places", image: "", optionA: "Winter", optionB: "Summer" },
  { id: "tot-78", prompt: "Solo Travel or Group Trip?", category: "Places", image: "", optionA: "Solo Travel", optionB: "Group Trip" },
  { id: "tot-79", prompt: "Active Vacation or Total Relaxation?", category: "Places", image: "", optionA: "Active Vacation", optionB: "Total Relaxation" },
  { id: "tot-80", prompt: "Big City or Small Town?", category: "Places", image: "", optionA: "Big City", optionB: "Small Town" },
  { id: "tot-81", prompt: "Museum or Stadium?", category: "Places", image: "", optionA: "Museum", optionB: "Stadium" },
  { id: "tot-82", prompt: "Camping or Glamping?", category: "Places", image: "", optionA: "Camping", optionB: "Glamping" },

  /* ── SOCIAL & RELATIONSHIPS (10) ── */
  { id: "tot-83", prompt: "Small Gathering or Big Party?", category: "Lifestyle", image: "", optionA: "Small Gathering", optionB: "Big Party" },
  { id: "tot-84", prompt: "Inside or Outside?", category: "Lifestyle", image: "", optionA: "Inside", optionB: "Outside" },
  { id: "tot-85", prompt: "Movie at Home or Movie Theater?", category: "Lifestyle", image: "", optionA: "Movie at Home", optionB: "Movie Theater" },
  { id: "tot-86", prompt: "Dogs or Cats?", category: "Lifestyle", image: "", optionA: "Dogs", optionB: "Cats" },
  { id: "tot-87", prompt: "Giver or Receiver?", category: "Lifestyle", image: "", optionA: "Giver", optionB: "Receiver" },
  { id: "tot-88", prompt: "Introvert or Extrovert?", category: "Lifestyle", image: "", optionA: "Introvert", optionB: "Extrovert" },
  { id: "tot-89", prompt: "Physical Touch or Quality Time?", category: "Lifestyle", image: "", optionA: "Physical Touch", optionB: "Quality Time" },
  { id: "tot-90", prompt: "Comedy or Horror?", category: "Lifestyle", image: "", optionA: "Comedy", optionB: "Horror" },
  { id: "tot-91", prompt: "Live Music or DJ/Club?", category: "Lifestyle", image: "", optionA: "Live Music", optionB: "DJ/Club" },
  { id: "tot-92", prompt: "Spontaneous or Calculated?", category: "Lifestyle", image: "", optionA: "Spontaneous", optionB: "Calculated" }
];

export const BRANDS_RETAILERS_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "essentials-basics",
        title: "Essentials & Basics",
        brands: [
          { brand: "Uniqlo", dnaTags: ["essentials", "basics", "affordable"] },
          { brand: "Buck Mason", dnaTags: ["american-basics", "rugged", "tailored"] },
          { brand: "Everlane", dnaTags: ["sustainable", "basics", "transparent"] },
          { brand: "COS", dnaTags: ["architectural", "minimal", "elevated"] },
          { brand: "Vince", dnaTags: ["quiet-luxury", "knits", "relaxed"] },
        ],
      },
      {
        id: "workwear-heritage",
        title: "Workwear & Heritage",
        brands: [
          { brand: "Carhartt / Carhartt WIP", dnaTags: ["workwear", "durable", "streetwear-crossover"] },
          { brand: "Levi’s", dnaTags: ["denim", "heritage", "standard-fit"] },
          { brand: "Filson", dnaTags: ["outdoor", "waxed-canvas", "heavy-duty"] },
          { brand: "Barbour", dnaTags: ["british-heritage", "waxed-jackets", "classic"] },
          { brand: "Taylor Stitch", dnaTags: ["rugged", "durable", "menswear"] },
          { brand: "Red Wing Shoes", dnaTags: ["heritage", "work-boots", "durable"] },
          { brand: "Brooks Brothers", dnaTags: ["formal-heritage", "american-classic", "preppy"] },
        ],
      },
      {
        id: "outdoors-gorpcore",
        title: "Outdoors & Gorpcore",
        brands: [
          { brand: "Patagonia", dnaTags: ["outdoors", "ethical", "gorpcore"] },
          { brand: "Arc'teryx", dnaTags: ["technical", "performance", "high-end-outdoors"] },
          { brand: "Huckberry", dnaTags: ["rugged", "outdoor-lifestyle", "curated"] },
          { brand: "Salomon", dnaTags: ["technical", "trail", "gorpcore-footwear"] },
        ],
      },
      {
        id: "athletic-athleisure",
        title: "Athletic & Athleisure",
        brands: [
          { brand: "Nike", dnaTags: ["athletic", "sneakers", "tech-fleece"] },
          { brand: "Adidas", dnaTags: ["sportswear", "retro-sneakers", "athletic"] },
          { brand: "Lululemon", dnaTags: ["athleisure", "premium", "gym-to-street"] },
          { brand: "New Balance", dnaTags: ["comfort", "heritage-sneakers", "dad-shoe"] },
          { brand: "Reigning Champ", dnaTags: ["premium-fleece", "gym-basics", "minimal"] },
          { brand: "On Running", dnaTags: ["performance-footwear", "modern", "technical"] },
          { brand: "Rhone", dnaTags: ["high-end-performance", "activewear", "polished"] },
          { brand: "Vuori", dnaTags: ["coastal", "performance", "soft"] },
        ],
      },
      {
        id: "prep-classic",
        title: "Prep & Classic",
        brands: [
          { brand: "Ralph Lauren", dnaTags: ["prep", "heritage", "polo"] },
          { brand: "J.Crew", dnaTags: ["modern-prep", "suiting", "casual-classics"] },
          { brand: "Todd Snyder", dnaTags: ["designer-prep", "menswear", "collaborative"] },
          { brand: "Banana Republic", dnaTags: ["travel-heritage", "tailored", "modern"] },
          { brand: "Abercrombie & Fitch", dnaTags: ["modern-casual", "90s-fits", "rebranded"] },
          { brand: "Bonobos", dnaTags: ["fit-specialist", "office-wear", "chinos"] },
          { brand: "Massimo Dutti", dnaTags: ["refined", "european", "affordable-luxury"] },
        ],
      },
      {
        id: "streetwear-hype",
        title: "Streetwear & Hype",
        brands: [
          { brand: "Supreme", dnaTags: ["hype", "limited-drops", "streetwear"] },
          { brand: "Stüssy", dnaTags: ["streetwear", "surf-skate", "original"] },
          { brand: "Fear of God (Essentials)", dnaTags: ["minimalist-streetwear", "oversized", "clean"] },
          { brand: "Aimé Leon Dore", dnaTags: ["luxury-streetwear", "prep", "queens"] },
          { brand: "Kith", dnaTags: ["boutique-streetwear", "lifestyle", "curated"] },
          { brand: "Vans", dnaTags: ["skate", "casual", "slip-ons"] },
          { brand: "Dickies", dnaTags: ["skate", "workwear", "durable-trousers"] },
        ],
      },
      {
        id: "designer-luxury",
        title: "Designer & Luxury",
        brands: [
          { brand: "Stone Island", dnaTags: ["technical-luxury", "italian", "badge-culture"] },
          { brand: "Common Projects", dnaTags: ["minimalist-luxury", "footwear", "clean"] },
          { brand: "Theory", dnaTags: ["minimalist", "modern-professional", "sharp"] },
          { brand: "AllSaints", dnaTags: ["edgy", "leather", "rock-and-roll"] },
          { brand: "Acne Studios", dnaTags: ["high-fashion", "minimalism", "scandi-cool"] },
          { brand: "Suitsupply", dnaTags: ["modern-tailoring", "custom-suiting", "sharp"] },
        ],
      },
      {
        id: "retailers-marketplaces",
        title: "Retailers & Marketplaces",
        brands: [
          { brand: "End Clothing", dnaTags: ["streetwear-retailer", "designer", "high-end"] },
          { brand: "Grailed", dnaTags: ["secondary-market", "designer", "vintage"] },
          { brand: "Mr Porter", dnaTags: ["luxury-retailer", "menswear", "premier"] },
          { brand: "Ssense", dnaTags: ["avant-garde", "high-fashion", "boutique"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-br-01",
        prompt: "Do you lean more clean basics or rugged heritage pieces?",
        categoryA: "Essentials & Basics",
        categoryB: "Workwear & Heritage",
        tagsForA: ["basics", "minimal", "elevated"],
        tagsForB: ["heritage", "durable", "rugged"],
      },
      {
        id: "male-br-02",
        prompt: "Would you rather shop for the trail or the gym-to-street wardrobe?",
        categoryA: "Outdoors & Gorpcore",
        categoryB: "Athletic & Athleisure",
        tagsForA: ["gorpcore", "technical", "outdoors"],
        tagsForB: ["athletic", "comfort", "performance"] },
      {
        id: "male-br-03",
        prompt: "Are you more classic prep or streetwear hype?",
        categoryA: "Prep & Classic",
        categoryB: "Streetwear & Hype",
        tagsForA: ["prep", "classic", "tailored"],
        tagsForB: ["streetwear", "hype", "drops"],
      },
      {
        id: "male-br-04",
        prompt: "Does your taste skew designer polish or specialty retailer discovery?",
        categoryA: "Designer & Luxury",
        categoryB: "Retailers & Marketplaces",
        tagsForA: ["luxury", "designer", "sharp"],
        tagsForB: ["discovery", "curated", "boutique"],
      },
      {
        id: "male-br-05",
        prompt: "Minimal essentials or polished prep?",
        categoryA: "Essentials & Basics",
        categoryB: "Prep & Classic",
        tagsForA: ["essentials", "clean", "quiet-luxury"],
        tagsForB: ["prep", "heritage", "classic"],
      },
      {
        id: "male-br-06",
        prompt: "Heavy-duty boots and waxed jackets or sleek tailoring and luxury sneakers?",
        categoryA: "Workwear & Heritage",
        categoryB: "Designer & Luxury",
        tagsForA: ["boots", "workwear", "heritage"],
        tagsForB: ["luxury", "minimalist-luxury", "tailoring"],
      },
      {
        id: "male-br-07",
        prompt: "Retro sneakers and performance gear or logo drops and oversized fits?",
        categoryA: "Athletic & Athleisure",
        categoryB: "Streetwear & Hype",
        tagsForA: ["sportswear", "performance", "comfort"],
        tagsForB: ["streetwear", "oversized", "hype"],
      },
      {
        id: "male-br-08",
        prompt: "Do you trust outdoor specialists more than broad fashion classics?",
        categoryA: "Outdoors & Gorpcore",
        categoryB: "Prep & Classic",
        tagsForA: ["technical", "ethical", "functional"],
        tagsForB: ["classic", "preppy", "polished"],
      },
      {
        id: "male-br-09",
        prompt: "Would you rather buy directly from a favorite brand or hunt through Grailed, Mr Porter, and Ssense?",
        categoryA: "Designer & Luxury",
        categoryB: "Retailers & Marketplaces",
        tagsForA: ["brand-loyal", "designer", "premium"],
        tagsForB: ["marketplace", "curated", "rare-find"],
      },
      {
        id: "male-br-10",
        prompt: "Do your purchases say more quiet refinement or visible subculture?",
        categoryA: "Essentials & Basics",
        categoryB: "Streetwear & Hype",
        tagsForA: ["quiet-luxury", "minimal", "refined"],
        tagsForB: ["subculture", "logo", "statement"],
      },
    ],
  },
};

export const COLORS_PALETTE_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "core-blues",
        title: "Core Blues",
        brands: [
          { brand: "Navy Blue", dnaTags: ["classic", "masculine", "staple"] },
          { brand: "Slate Blue", dnaTags: ["muted", "modern", "professional"] },
          { brand: "Indigo", dnaTags: ["denim", "deep", "heritage"] },
          { brand: "Midnight Blue", dnaTags: ["formal", "luxury", "dark"] },
          { brand: "Petrol Blue", dnaTags: ["moody", "professional", "alternative"] },
          { brand: "Sky Blue", dnaTags: ["classic", "shirting", "light"] },
          { brand: "Royal Blue", dnaTags: ["sporty", "high-energy", "bold"] },
          { brand: "Electric Blue", dnaTags: ["digital", "hype", "loud"] },
          { brand: "Cobalt", dnaTags: ["streetwear", "bright", "statement"] },
        ],
      },
      {
        id: "greys-blacks",
        title: "Greys, Black & Cool Neutrals",
        brands: [
          { brand: "Black", dnaTags: ["minimalist", "edgy", "sharp"] },
          { brand: "Charcoal Grey", dnaTags: ["formal", "sophisticated", "versatile"] },
          { brand: "Heather Grey", dnaTags: ["casual", "athletic", "soft"] },
          { brand: "Cool Grey", dnaTags: ["clean", "architectural", "modern"] },
          { brand: "Slate Grey", dnaTags: ["blue-toned", "modern", "refined"] },
          { brand: "Gunmetal", dnaTags: ["industrial", "masculine", "metallic"] },
          { brand: "Pewter", dnaTags: ["muted-metallic", "dark", "technical"] },
        ],
      },
      {
        id: "greens-earth",
        title: "Greens & Earth Tones",
        brands: [
          { brand: "Olive Green", dnaTags: ["military", "earthy", "rugged"] },
          { brand: "Forest Green", dnaTags: ["classic", "outdoorsy", "deep"] },
          { brand: "Sage Green", dnaTags: ["calming", "scandi", "modern"] },
          { brand: "Khaki", dnaTags: ["utility", "classic", "chino"] },
          { brand: "Terracotta", dnaTags: ["mediterranean", "clay", "warm"] },
          { brand: "Coyote Brown", dnaTags: ["tactical", "desert", "military"] },
          { brand: "Spruce", dnaTags: ["blue-green", "heritage", "moody"] },
        ],
      },
      {
        id: "warm-neutrals",
        title: "Warm Neutrals & Leather Tones",
        brands: [
          { brand: "Sand / Beige", dnaTags: ["summer", "desert", "essential"] },
          { brand: "Camel", dnaTags: ["elevated", "luxury", "outerwear"] },
          { brand: "Taupe", dnaTags: ["greige", "neutral", "refined"] },
          { brand: "Tan", dnaTags: ["rugged", "basics", "leather-adjacent"] },
          { brand: "Oatmeal", dnaTags: ["cozy", "textured", "soft"] },
          { brand: "Stone", dnaTags: ["bright", "architectural", "neutral"] },
          { brand: "Tobacco", dnaTags: ["leather", "corduroy", "rich"] },
          { brand: "Cognac", dnaTags: ["premium", "leather", "warm"] },
          { brand: "Espresso", dnaTags: ["dark-brown", "rich", "near-black"] },
          { brand: "Chocolate Brown", dnaTags: ["earthy", "70s", "heritage"] },
        ],
      },
      {
        id: "whites-creams",
        title: "Whites & Soft Light Neutrals",
        brands: [
          { brand: "White", dnaTags: ["crisp", "clean", "foundational"] },
          { brand: "Off-White / Cream", dnaTags: ["vintage", "soft", "elevated"] },
          { brand: "Ivory", dnaTags: ["luxury", "knitwear", "high-end"] },
        ],
      },
      {
        id: "reds-oranges-yellows",
        title: "Warm Accents",
        brands: [
          { brand: "Burgundy / Oxblood", dnaTags: ["rich", "autumnal", "footwear"] },
          { brand: "Rust / Burnt Orange", dnaTags: ["workwear", "warm", "accent"] },
          { brand: "Mustard Yellow", dnaTags: ["vintage", "grounded", "bold"] },
          { brand: "Maroon", dnaTags: ["collegiate", "sporty", "heritage"] },
          { brand: "Brick Red", dnaTags: ["rugged", "grounded", "workwear"] },
        ],
      },
      {
        id: "soft-colors",
        title: "Soft & Expressive Colors",
        brands: [
          { brand: "Dusty Rose", dnaTags: ["soft-boy", "modern-neutral", "gentle"] },
          { brand: "Mauve", dnaTags: ["muted", "trendy", "alternative"] },
          { brand: "Lavender", dnaTags: ["soft-pop", "modern", "playful"] },
          { brand: "Mint Green", dnaTags: ["preppy", "summer", "fresh"] },
        ],
      },
      {
        id: "jewel-metal-tech",
        title: "Jewel, Metallic & Tech Accents",
        brands: [
          { brand: "Emerald Green", dnaTags: ["luxury", "jewel-tone", "accent"] },
          { brand: "Teal", dnaTags: ["mid-century", "unique", "design-led"] },
          { brand: "Silver / Metallic", dnaTags: ["futuristic", "techwear", "reflective"] },
          { brand: "Copper", dnaTags: ["industrial", "metallic", "warm"] },
          { brand: "Bronze", dnaTags: ["heritage", "metal", "warm"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-color-01",
        prompt: "Do you lean more deep navy staples or all-black minimalism?",
        categoryA: "Core Blues",
        categoryB: "Greys, Black & Cool Neutrals",
        tagsForA: ["classic", "versatile", "masculine"],
        tagsForB: ["minimalist", "sharp", "architectural"],
      },
      {
        id: "male-color-02",
        prompt: "Olive and forest tones or sand and camel neutrals?",
        categoryA: "Greens & Earth Tones",
        categoryB: "Warm Neutrals & Leather Tones",
        tagsForA: ["earthy", "rugged", "outdoorsy"],
        tagsForB: ["elevated", "luxury", "summer"],
      },
      {
        id: "male-color-03",
        prompt: "Crisp white essentials or softer cream and ivory layers?",
        categoryA: "Whites & Soft Light Neutrals",
        categoryB: "Warm Neutrals & Leather Tones",
        tagsForA: ["clean", "crisp", "foundational"],
        tagsForB: ["soft", "textured", "quiet-luxury"],
      },
      {
        id: "male-color-04",
        prompt: "Rich oxblood accents or understated taupe and stone?",
        categoryA: "Warm Accents",
        categoryB: "Warm Neutrals & Leather Tones",
        tagsForA: ["autumnal", "heritage", "bold"],
        tagsForB: ["neutral", "refined", "elevated"],
      },
      {
        id: "male-color-05",
        prompt: "Muted sage and spruce or bright cobalt and electric blue?",
        categoryA: "Greens & Earth Tones",
        categoryB: "Core Blues",
        tagsForA: ["calming", "moody", "natural"],
        tagsForB: ["energetic", "sporty", "statement"],
      },
      {
        id: "male-color-06",
        prompt: "Soft dusty rose and lavender or silver and gunmetal tech tones?",
        categoryA: "Soft & Expressive Colors",
        categoryB: "Jewel, Metallic & Tech Accents",
        tagsForA: ["gentle", "soft-boy", "playful"],
        tagsForB: ["futuristic", "industrial", "techwear"],
      },
      {
        id: "male-color-07",
        prompt: "Charcoal tailoring or midnight blue formalwear?",
        categoryA: "Greys, Black & Cool Neutrals",
        categoryB: "Core Blues",
        tagsForA: ["formal", "sophisticated", "cool"],
        tagsForB: ["formal", "luxury", "classic"],
      },
      {
        id: "male-color-08",
        prompt: "Chocolate, tobacco, and cognac or olive, khaki, and coyote brown?",
        categoryA: "Warm Neutrals & Leather Tones",
        categoryB: "Greens & Earth Tones",
        tagsForA: ["leather", "rich", "heritage"],
        tagsForB: ["utility", "military", "rugged"],
      },
      {
        id: "male-color-09",
        prompt: "Would you rather add teal and emerald pops or keep everything stone, cream, and black?",
        categoryA: "Jewel, Metallic & Tech Accents",
        categoryB: "Greys, Black & Cool Neutrals",
        tagsForA: ["unique", "luxury", "design-led"],
        tagsForB: ["minimal", "clean", "controlled"],
      },
      {
        id: "male-color-10",
        prompt: "Preppy sky blue and mint or rugged rust and brick red?",
        categoryA: "Soft & Expressive Colors",
        categoryB: "Warm Accents",
        tagsForA: ["preppy", "fresh", "light"],
        tagsForB: ["rugged", "warm", "grounded"],
      },
    ],
  },
};

export const FOOD_DINING_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "smokehouse-comfort",
        title: "Smokehouse & Comfort Classics",
        brands: [
          { brand: "Texas BBQ", dnaTags: ["smoked", "hearty", "southern"] },
          { brand: "Classic Steakhouse", dnaTags: ["classic", "protein-forward", "formal-dining"] },
          { brand: "Smash Burgers", dnaTags: ["casual", "indulgent", "american-classic"] },
          { brand: "Hot Chicken", dnaTags: ["spicy", "southern", "bold"] },
          { brand: "Pub Grub", dnaTags: ["casual", "bar-food", "comfort"] },
          { brand: "Fried Chicken & Waffles", dnaTags: ["sweet-savory", "comfort", "soul-food"] },
          { brand: "Buffalo Wings", dnaTags: ["spicy", "game-day", "bar-food"] },
          { brand: "Chili Con Carne", dnaTags: ["slow-cooked", "hearty", "comfort"] },
          { brand: "Pulled Pork Sandwiches", dnaTags: ["smoky", "southern", "casual"] },
          { brand: "Philly Cheesesteak", dnaTags: ["hearty", "street-classic", "indulgent"] },
        ],
      },
      {
        id: "italian-euro-classics",
        title: "Italian & European Classics",
        brands: [
          { brand: "Neapolitan Pizza", dnaTags: ["wood-fired", "classic", "craft"] },
          { brand: "Artisanal Pasta", dnaTags: ["comfort", "slow-dining", "italian-classic"] },
          { brand: "French Bistro", dnaTags: ["bistro", "date-night", "continental"] },
          { brand: "Shrimp Scampi", dnaTags: ["garlicky", "seafood", "italian-american"] },
          { brand: "Clam Chowder", dnaTags: ["creamy", "coastal", "new-england"] },
          { brand: "Lobster Rolls", dnaTags: ["coastal", "buttered", "east-coast"] },
          { brand: "Gelato & Sorbet", dnaTags: ["dessert", "european", "refined"] },
          { brand: "Deep Dish Pizza", dnaTags: ["hearty", "regional-classic", "indulgent"] },
        ],
      },
      {
        id: "mexican-latin-street",
        title: "Mexican & Latin Street Favorites",
        brands: [
          { brand: "Street Tacos", dnaTags: ["street-food", "bold", "mexican-classic"] },
          { brand: "Breakfast Burrito", dnaTags: ["portable", "breakfast", "hearty"] },
          { brand: "Burritos", dnaTags: ["mission-style", "filling", "casual"] },
          { brand: "Torta", dnaTags: ["sandwich", "street-food", "mexican"] },
          { brand: "Ceviche", dnaTags: ["citrus", "fresh", "coastal-latin"] },
          { brand: "Brazilian Steakhouse", dnaTags: ["grilled", "protein-forward", "celebratory"] },
          { brand: "Acai Bowls", dnaTags: ["fresh", "wellness", "tropical"] },
        ],
      },
      {
        id: "east-asian-specialties",
        title: "East Asian Specialties",
        brands: [
          { brand: "Sushi & Sashimi", dnaTags: ["clean", "refined", "japanese"] },
          { brand: "Ramen", dnaTags: ["brothy", "comfort", "japanese"] },
          { brand: "Authentic Pho", dnaTags: ["brothy", "herbal", "vietnamese"] },
          { brand: "Korean BBQ", dnaTags: ["interactive", "grilled", "korean"] },
          { brand: "Dim Sum", dnaTags: ["shared-plates", "traditional", "chinese"] },
          { brand: "Poke Bowls", dnaTags: ["fresh", "fast-casual", "hawaiian"] },
          { brand: "Poke", dnaTags: ["clean", "fresh", "minimal"] },
          { brand: "Bento Boxes", dnaTags: ["variety", "structured", "japanese"] },
        ],
      },
      {
        id: "mediterranean-middle-eastern",
        title: "Mediterranean & Middle Eastern",
        brands: [
          { brand: "Mediterranean Mezze", dnaTags: ["shared-plates", "fresh", "mediterranean"] },
          { brand: "Greek Gyro", dnaTags: ["portable", "savory", "greek"] },
          { brand: "Shawarma", dnaTags: ["garlicky", "street-food", "middle-eastern"] },
          { brand: "Kebab Platters", dnaTags: ["grilled", "rice-based", "middle-eastern"] },
          { brand: "Tapas", dnaTags: ["social", "small-plates", "iberian"] },
          { brand: "Raw Bar", dnaTags: ["coastal", "refined", "seafood"] },
          { brand: "Charcuterie Boards", dnaTags: ["shared", "wine-bar", "curated"] },
        ],
      },
      {
        id: "south-southeast-asian",
        title: "South & Southeast Asian",
        brands: [
          { brand: "Thai Curry", dnaTags: ["spicy", "aromatic", "thai"] },
          { brand: "Chicken Tikka Masala", dnaTags: ["comfort", "creamy", "indian"] },
        ],
      },
      {
        id: "breakfast-deli-cafe",
        title: "Breakfast, Deli & Café Staples",
        brands: [
          { brand: "Deli Sandwiches", dnaTags: ["stacked", "classic", "city-lunch"] },
          { brand: "Southern Biscuits & Gravy", dnaTags: ["comfort", "southern", "hearty"] },
          { brand: "Gourmet Grilled Cheese", dnaTags: ["nostalgic", "comfort", "café"] },
          { brand: "Breakfast Sliders", dnaTags: ["mini", "brunch", "indulgent"] },
          { brand: "Bagels & Lox", dnaTags: ["classic", "brunch", "new-york"] },
          { brand: "Egg Benedict", dnaTags: ["brunch", "classic", "refined"] },
        ],
      },
      {
        id: "coastal-casual-specialties",
        title: "Coastal, Rotisserie & Regional Specials",
        brands: [
          { brand: "Seafood Boil", dnaTags: ["messy", "social", "cajun"] },
          { brand: "Rotisserie Chicken", dnaTags: ["casual", "shareable", "peruvian"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-food-01",
        prompt: "Do you crave smokehouse comfort or cleaner sushi-and-poke energy?",
        categoryA: "Smokehouse & Comfort Classics",
        categoryB: "East Asian Specialties",
        tagsForA: ["hearty", "smoked", "comfort"],
        tagsForB: ["clean", "fresh", "refined"],
      },
      {
        id: "male-food-02",
        prompt: "Street tacos and burritos or pasta and pizza done right?",
        categoryA: "Mexican & Latin Street Favorites",
        categoryB: "Italian & European Classics",
        tagsForA: ["street-food", "bold", "portable"],
        tagsForB: ["craft", "classic", "slow-dining"],
      },
      {
        id: "male-food-03",
        prompt: "Shared mezze and kebabs or spicy curry and tikka comfort?",
        categoryA: "Mediterranean & Middle Eastern",
        categoryB: "South & Southeast Asian",
        tagsForA: ["shared-plates", "grilled", "fresh"],
        tagsForB: ["spicy", "aromatic", "comfort"],
      },
      {
        id: "male-food-04",
        prompt: "Bagels, deli counters, and brunch staples or seafood boils and rotisserie spreads?",
        categoryA: "Breakfast, Deli & Café Staples",
        categoryB: "Coastal, Rotisserie & Regional Specials",
        tagsForA: ["brunch", "classic", "city-lunch"],
        tagsForB: ["shareable", "regional", "casual"],
      },
      {
        id: "male-food-05",
        prompt: "Would you rather book a steakhouse or a French bistro night?",
        categoryA: "Smokehouse & Comfort Classics",
        categoryB: "Italian & European Classics",
        tagsForA: ["protein-forward", "classic", "formal-dining"],
        tagsForB: ["date-night", "continental", "refined"],
      },
      {
        id: "male-food-06",
        prompt: "Korean BBQ and ramen or shawarma and mezze?",
        categoryA: "East Asian Specialties",
        categoryB: "Mediterranean & Middle Eastern",
        tagsForA: ["interactive", "brothy", "umami"],
        tagsForB: ["garlicky", "shared", "grilled"],
      },
      {
        id: "male-food-07",
        prompt: "Do you skew brunch comfort or wellness-leaning fresh bowls?",
        categoryA: "Breakfast, Deli & Café Staples",
        categoryB: "Mexican & Latin Street Favorites",
        tagsForA: ["brunch", "nostalgic", "comfort"],
        tagsForB: ["fresh", "wellness", "tropical"],
      },
      {
        id: "male-food-08",
        prompt: "Hot chicken and wings or pho and Thai curry heat?",
        categoryA: "Smokehouse & Comfort Classics",
        categoryB: "South & Southeast Asian",
        tagsForA: ["spicy", "fried", "bold"],
        tagsForB: ["spicy", "aromatic", "herbal"],
      },
      {
        id: "male-food-09",
        prompt: "Raw bar and charcuterie or tacos and tortas with a kick?",
        categoryA: "Mediterranean & Middle Eastern",
        categoryB: "Mexican & Latin Street Favorites",
        tagsForA: ["refined", "shared", "curated"],
        tagsForB: ["street-food", "casual", "bold"],
      },
      {
        id: "male-food-10",
        prompt: "Do your food instincts say indulgent comfort or clean precision?",
        categoryA: "Smokehouse & Comfort Classics",
        categoryB: "East Asian Specialties",
        tagsForA: ["indulgent", "hearty", "comfort"],
        tagsForB: ["precision", "clean", "minimal"],
      },
    ],
  },
};

export const TRAVEL_TRIP_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "casino-nightlife",
        title: "Casino, Betting & Nightlife",
        brands: [
          { brand: "Las Vegas Sportsbook", dnaTags: ["betting", "big-weekend", "sports-energy"] },
          { brand: "Atlantic City Poker", dnaTags: ["cards", "classic-casino", "east-coast"] },
          { brand: "Macau Gambling", dnaTags: ["high-stakes", "casino", "asia-luxury"] },
          { brand: "Lake Tahoe Casino/Ski", dnaTags: ["casino", "ski-weekend", "hybrid-trip"] },
          { brand: "Vegas Club Circuit", dnaTags: ["djs", "clubbing", "high-energy"] },
          { brand: "Berlin Techno Scene", dnaTags: ["industrial", "nightlife", "underground"] },
          { brand: "Ibiza Boat Party", dnaTags: ["party", "boat-life", "mediterranean"] },
          { brand: "NYC Speakeasy Run", dnaTags: ["hidden-bars", "city-night", "curated"] },
        ],
      },
      {
        id: "gaming-tech-fandom",
        title: "Gaming, Tech & Fandom Trips",
        brands: [
          { brand: "Tokyo Akihabara Tour", dnaTags: ["gaming", "anime", "tech-obsessed"] },
          { brand: "Silicon Valley Tech Tour", dnaTags: ["innovation", "campus-tour", "future-facing"] },
          { brand: "Seoul PC Bang", dnaTags: ["esports", "all-night", "high-tech"] },
          { brand: "Iceland Ring Road", dnaTags: ["camera-gear", "drones", "tech-roadtrip"] },
          { brand: "San Francisco VR Bar", dnaTags: ["vr", "interactive", "future-nightlife"] },
          { brand: "Toronto Gaming Con", dnaTags: ["convention", "gaming-culture", "community"] },
          { brand: "Dubai Luxury Mall", dnaTags: ["tech-shopping", "indoor-ski", "flashy"] },
          { brand: "Montreal Underground", dnaTags: ["indoor-city", "urban-exploration", "novelty"] },
        ],
      },
      {
        id: "snow-mountain-adventure",
        title: "Snow, Mountains & Alpine Weekends",
        brands: [
          { brand: "Whistler Blackcomb", dnaTags: ["snowboarding", "luxury-lodge", "mountain-dining"] },
          { brand: "Mammoth Mountain", dnaTags: ["spring-riding", "hot-springs", "adventure"] },
          { brand: "Hokkaido Snowboarding", dnaTags: ["powder", "japan", "snow-culture"] },
          { brand: "Aspen Après-Ski", dnaTags: ["alpine-luxury", "lounges", "social-scene"] },
        ],
      },
      {
        id: "food-drink-city-runs",
        title: "Food, Drink & City Crawls",
        brands: [
          { brand: "Austin BBQ Crawl", dnaTags: ["bbq", "roadtrip", "smokehouse"] },
          { brand: "New Orleans Food Run", dnaTags: ["creole", "late-night", "food-focused"] },
          { brand: "Chicago Pizza Tour", dnaTags: ["regional-food", "comparison-trip", "indulgent"] },
          { brand: "Portland Food Carts", dnaTags: ["casual-eats", "outdoor-food", "variety"] },
          { brand: "Nashville Honky Tonk", dnaTags: ["live-music", "bar-hop", "southern"] },
          { brand: "Osaka Street Food", dnaTags: ["street-food", "japan", "high-energy"] },
          { brand: "San Diego Craft Beer", dnaTags: ["brewery-tour", "beer-centric", "west-coast"] },
          { brand: "London Pub Crawl", dnaTags: ["pub-culture", "football", "classic-city"] },
          { brand: "Paris Bistro Tour", dnaTags: ["bistro", "wine", "romantic-city"] },
          { brand: "Seattle Coffee Tour", dnaTags: ["cafes", "roasteries", "slow-city"] },
          { brand: "Kentucky Bourbon Trail", dnaTags: ["distillery", "whiskey", "tasting-trip"] },
        ],
      },
      {
        id: "beach-water-tropical",
        title: "Beach, Boats & Tropical Water Trips",
        brands: [
          { brand: "Bermuda Beach & Golf", dnaTags: ["beach", "golf", "polished"] },
          { brand: "Cabo Deep Sea Fishing", dnaTags: ["sport-fishing", "boat-charter", "ocean"] },
          { brand: "Maui Surf Camp", dnaTags: ["surfing", "learn-something", "beach-chill"] },
          { brand: "Florida Keys Snorkeling", dnaTags: ["reef", "boat-stay", "tropical"] },
          { brand: "Lake Powell Houseboat", dnaTags: ["group-trip", "water-living", "summer"] },
          { brand: "Amsterdam Canal Boat", dnaTags: ["private-boat", "city-water", "social"] },
          { brand: "Outer Banks Beach House", dnaTags: ["beach-rental", "surf", "group-grilling"] },
        ],
      },
      {
        id: "wellness-nature-escape",
        title: "Wellness, Desert & Nature Escapes",
        brands: [
          { brand: "Utah Canyoneering", dnaTags: ["hiking", "slot-canyons", "adrenaline"] },
          { brand: "Joshua Tree Glamping", dnaTags: ["tech-free", "desert", "glamping"] },
          { brand: "Tulum Jungle Spa", dnaTags: ["wellness", "eco-luxury", "indoor-outdoor"] },
          { brand: "Sedona Jeep Tour", dnaTags: ["off-road", "red-rocks", "desert-adventure"] },
          { brand: "Costa Rica Ziplining", dnaTags: ["zipline", "jungle", "recovery-beach"] },
        ],
      },
      {
        id: "culture-design-luxury",
        title: "Culture, Design & Luxury Escapes",
        brands: [
          { brand: "Monaco Grand Prix", dnaTags: ["formula-1", "yachts", "luxury-spectacle"] },
          { brand: "Mall of America", dnaTags: ["mega-indoor", "shopping", "entertainment-complex"] },
          { brand: "NYC Museum Marathon", dnaTags: ["museums", "indoors", "culture-heavy"] },
          { brand: "Napa Valley Train", dnaTags: ["luxury-dining", "train-travel", "wine-country"] },
          { brand: "Miami Art Deco", dnaTags: ["design", "beach-clubs", "neon-night"] },
          { brand: "New Orleans Jazz Fest", dnaTags: ["festival", "live-music", "food-culture"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-trip-01",
        prompt: "Would you rather book a casino-fueled weekend or a gaming-and-tech deep dive?",
        categoryA: "Casino, Betting & Nightlife",
        categoryB: "Gaming, Tech & Fandom Trips",
        tagsForA: ["nightlife", "betting", "high-energy"],
        tagsForB: ["gaming", "tech", "future-facing"],
      },
      {
        id: "male-trip-02",
        prompt: "Snowboard-and-lodge escape or beach-and-boat getaway?",
        categoryA: "Snow, Mountains & Alpine Weekends",
        categoryB: "Beach, Boats & Tropical Water Trips",
        tagsForA: ["mountains", "snow", "apres-ski"],
        tagsForB: ["beach", "water", "boat-life"],
      },
      {
        id: "male-trip-03",
        prompt: "Food crawl through a city or a quieter desert-and-nature reset?",
        categoryA: "Food, Drink & City Crawls",
        categoryB: "Wellness, Desert & Nature Escapes",
        tagsForA: ["food-focused", "urban", "social"],
        tagsForB: ["nature", "wellness", "adventure"],
      },
      {
        id: "male-trip-04",
        prompt: "Luxury spectacle and culture or pure nightlife and tables?",
        categoryA: "Culture, Design & Luxury Escapes",
        categoryB: "Casino, Betting & Nightlife",
        tagsForA: ["luxury", "culture", "design-led"],
        tagsForB: ["casino", "clubs", "weekend-chaos"],
      },
      {
        id: "male-trip-05",
        prompt: "Akihabara and VR bars or BBQ trails and bourbon tastings?",
        categoryA: "Gaming, Tech & Fandom Trips",
        categoryB: "Food, Drink & City Crawls",
        tagsForA: ["fandom", "interactive", "innovation"],
        tagsForB: ["taste-driven", "regional", "indulgent"],
      },
      {
        id: "male-trip-06",
        prompt: "Whistler and Hokkaido powder or Tulum and Costa Rica recovery?",
        categoryA: "Snow, Mountains & Alpine Weekends",
        categoryB: "Wellness, Desert & Nature Escapes",
        tagsForA: ["snow-sport", "cold-weather", "mountain-energy"],
        tagsForB: ["tropical", "wellness", "outdoor-reset"],
      },
      {
        id: "male-trip-07",
        prompt: "Would you rather spend on Monaco and Napa or keep it social on houseboats and beach rentals?",
        categoryA: "Culture, Design & Luxury Escapes",
        categoryB: "Beach, Boats & Tropical Water Trips",
        tagsForA: ["premium", "curated", "high-end"],
        tagsForB: ["group-trip", "casual-fun", "summer-energy"],
      },
      {
        id: "male-trip-08",
        prompt: "Do your instincts lean hidden speakeasies and techno clubs or museums and design districts?",
        categoryA: "Casino, Betting & Nightlife",
        categoryB: "Culture, Design & Luxury Escapes",
        tagsForA: ["underground", "night-owl", "music-scene"],
        tagsForB: ["cultural", "architectural", "refined"],
      },
      {
        id: "male-trip-09",
        prompt: "Canyon trails and jeep tours or surf camps and snorkeling days?",
        categoryA: "Wellness, Desert & Nature Escapes",
        categoryB: "Beach, Boats & Tropical Water Trips",
        tagsForA: ["desert", "hiking", "off-road"],
        tagsForB: ["surf", "ocean", "sun-chasing"],
      },
      {
        id: "male-trip-10",
        prompt: "Do your trip ideas say adrenaline and stimulation or comfort and curation?",
        categoryA: "Gaming, Tech & Fandom Trips",
        categoryB: "Culture, Design & Luxury Escapes",
        tagsForA: ["stimulation", "novelty", "all-night"],
        tagsForB: ["curated", "elevated", "polished"],
      },
    ],
  },
};

export const DATE_IDEAS_ROMANCE_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "budget-playful",
        title: "Budget & Playful Dates",
        brands: [
          { brand: "Sunset Tailgate", dnaTags: ["low-cost", "scenic", "music-driven"] },
          { brand: "Thrift Store Challenge", dnaTags: ["playful", "competitive", "creative"] },
          { brand: "Local Arcade Bar", dnaTags: ["casual", "games", "nostalgic"] },
          { brand: "Drive-In Movie", dnaTags: ["nostalgic", "private", "cinematic"] },
          { brand: "Park Picnic & People Watching", dnaTags: ["classic", "conversation", "easygoing"] },
          { brand: "Art Walk / Open Gallery Night", dnaTags: ["culture", "walkable", "creative"] },
          { brand: "Cooking Challenge at Home", dnaTags: ["homebody", "competitive", "hands-on"] },
          { brand: "Record Store Browsing", dnaTags: ["music", "taste-sharing", "low-key"] },
          { brand: "Stargazing", dnaTags: ["romantic", "quiet", "outdoors"] },
          { brand: "Bookstore Date", dnaTags: ["intellectual", "coffee-adjacent", "soft"] },
        ],
      },
      {
        id: "active-social",
        title: "Active & Social Dates",
        brands: [
          { brand: "Topgolf / Driving Range", dnaTags: ["interactive", "sporty", "high-energy"] },
          { brand: "Sporting Event (Minor League/Local)", dnaTags: ["crowd-energy", "casual", "sports"] },
          { brand: "Axe Throwing / Escape Room", dnaTags: ["teamwork", "competitive", "activity-first"] },
          { brand: "Trivia Night", dnaTags: ["pub-date", "teamwork", "witty"] },
          { brand: "Bowling League Night", dnaTags: ["regular-routine", "playful", "retro"] },
          { brand: "Double Date Game Night", dnaTags: ["group-date", "games", "social"] },
          { brand: "Karaoke Private Room", dnaTags: ["high-energy", "private-fun", "performative"] },
          { brand: "Ice Skating", dnaTags: ["seasonal", "classic-romance", "active"] },
        ],
      },
      {
        id: "bars-music-nightlife",
        title: "Bars, Music & Nightlife",
        brands: [
          { brand: "The \"Secret\" Speakeasy", dnaTags: ["hidden", "intimate", "cool-factor"] },
          { brand: "Comedy Club", dnaTags: ["laughs", "easy-chemistry", "night-out"] },
          { brand: "Live Jazz or Blues Bar", dnaTags: ["elevated", "music-led", "moody"] },
          { brand: "Museum After-Hours", dnaTags: ["culture", "21-plus", "nightlife-lite"] },
          { brand: "Rooftop Bar", dnaTags: ["city-view", "cocktails", "date-night"] },
          { brand: "Outdoor Concert / Festival", dnaTags: ["live-music", "lawn-seats", "shared-energy"] },
          { brand: "Ghost Tour", dnaTags: ["storytelling", "walkable", "quirky"] },
        ],
      },
      {
        id: "food-craft-experience",
        title: "Food, Drink & Craft Experiences",
        brands: [
          { brand: "Dinner at a \"Hole in the Wall\"", dnaTags: ["foodie", "authentic", "low-key-great"] },
          { brand: "Private Chef Experience", dnaTags: ["luxury", "at-home", "curated"] },
          { brand: "Multi-Course Omakase", dnaTags: ["sushi", "refined", "high-end"] },
          { brand: "Wine Tasting Tour", dnaTags: ["vineyard", "tasting", "scenic"] },
          { brand: "Morning Farmers Market", dnaTags: ["day-date", "local", "slow-living"] },
          { brand: "Cooking Class", dnaTags: ["skill-building", "hands-on", "food-date"] },
          { brand: "DIY Pottery or Painting Class", dnaTags: ["creative", "take-home-memory", "expressive"] },
        ],
      },
      {
        id: "scenic-nature-getaways",
        title: "Scenic, Nature & Getaway Dates",
        brands: [
          { brand: "Botanical Garden Walk", dnaTags: ["quiet", "scenic", "photo-friendly"] },
          { brand: "Weekend Cabin Rental", dnaTags: ["private", "escape", "cozy-luxury"] },
          { brand: "Horseback Riding", dnaTags: ["scenic", "outdoors", "classic"] },
          { brand: "Chartered Sunset Sail", dnaTags: ["water", "private", "sunset-romance"] },
          { brand: "The \"Surprise\" Road Trip", dnaTags: ["spontaneous", "adventure", "shared-trust"] },
          { brand: "Botanical Garden Holiday Lights", dnaTags: ["seasonal", "romantic", "winter-glow"] },
          { brand: "Zoo or Aquarium", dnaTags: ["all-afternoon", "easygoing", "exploration"] },
        ],
      },
      {
        id: "luxury-flashy",
        title: "Luxury & Flashy Dates",
        brands: [
          { brand: "Courtside or Box Seats", dnaTags: ["vip", "sports-luxury", "status"] },
          { brand: "Helicopter City Tour", dnaTags: ["bucket-list", "spectacle", "city-view"] },
          { brand: "Vegas VIP Weekend", dnaTags: ["gambling", "show-night", "high-roller"] },
          { brand: "Designer Shopping Spree", dnaTags: ["fashion", "splurge", "taste-making"] },
          { brand: "Test Driving a Dream Car", dnaTags: ["adrenaline", "aspirational", "high-energy"] },
        ],
      },
      {
        id: "everyday-relationship-stage",
        title: "Everyday Intimacy & Relationship Rituals",
        brands: [
          { brand: "The \"No Phones\" Walk", dnaTags: ["presence", "intentional", "low-pressure"] },
          { brand: "Dog Park Date", dnaTags: ["pet-focused", "casual", "lifestyle-fit"] },
          { brand: "Coffee Shop Work Date", dnaTags: ["parallel-play", "busy-couple", "cozy"] },
          { brand: "Target Run & Starbucks", dnaTags: ["domestic", "married-energy", "errand-date"] },
          { brand: "Flea Market Hunting", dnaTags: ["vintage", "home-decor", "treasure-hunt"] },
          { brand: "The \"First Date\" Spot", dnaTags: ["anniversary", "sentimental", "full-circle"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-date-01",
        prompt: "Would you rather keep it playful and cheap or make it polished with cocktails and mood lighting?",
        categoryA: "Budget & Playful Dates",
        categoryB: "Bars, Music & Nightlife",
        tagsForA: ["playful", "low-pressure", "creative"],
        tagsForB: ["intimate", "night-out", "cool-factor"],
      },
      {
        id: "male-date-02",
        prompt: "Do you lean more activity-based competition or scenic quiet connection?",
        categoryA: "Active & Social Dates",
        categoryB: "Scenic, Nature & Getaway Dates",
        tagsForA: ["competitive", "interactive", "high-energy"],
        tagsForB: ["scenic", "romantic", "slow-time"],
      },
      {
        id: "male-date-03",
        prompt: "Foodie experience or flashy splurge?",
        categoryA: "Food, Drink & Craft Experiences",
        categoryB: "Luxury & Flashy Dates",
        tagsForA: ["curated", "taste-driven", "hands-on"],
        tagsForB: ["vip", "status", "spectacle"],
      },
      {
        id: "male-date-04",
        prompt: "Do your best dates feel more like shared routines or once-in-a-while escapes?",
        categoryA: "Everyday Intimacy & Relationship Rituals",
        categoryB: "Scenic, Nature & Getaway Dates",
        tagsForA: ["intentional", "domestic", "steady-connection"],
        tagsForB: ["escape", "adventure", "privacy"],
      },
      {
        id: "male-date-05",
        prompt: "Arcade bar and trivia night or bookstore and stargazing?",
        categoryA: "Active & Social Dates",
        categoryB: "Budget & Playful Dates",
        tagsForA: ["social", "teamwork", "banter"],
        tagsForB: ["quiet", "thoughtful", "soft-romance"],
      },
      {
        id: "male-date-06",
        prompt: "Omakase and wine tour or rooftop cocktails and jazz bar?",
        categoryA: "Food, Drink & Craft Experiences",
        categoryB: "Bars, Music & Nightlife",
        tagsForA: ["refined", "food-led", "curated"],
        tagsForB: ["moody", "music-led", "night-energy"],
      },
      {
        id: "male-date-07",
        prompt: "Would you rather rent the cabin or book the helicopter?",
        categoryA: "Scenic, Nature & Getaway Dates",
        categoryB: "Luxury & Flashy Dates",
        tagsForA: ["cozy", "private", "nature"],
        tagsForB: ["flashy", "aspirational", "big-gesture"],
      },
      {
        id: "male-date-08",
        prompt: "Do you show love better through presence in everyday life or through planning memorable experiences?",
        categoryA: "Everyday Intimacy & Relationship Rituals",
        categoryB: "Food, Drink & Craft Experiences",
        tagsForA: ["presence", "consistency", "real-life-romance"],
        tagsForB: ["planning", "memory-making", "intentional-date-night"],
      },
      {
        id: "male-date-09",
        prompt: "Sporting events and Topgolf or speakeasies and rooftop bars?",
        categoryA: "Active & Social Dates",
        categoryB: "Bars, Music & Nightlife",
        tagsForA: ["sporty", "casual", "outgoing"],
        tagsForB: ["stylish", "urban", "cocktail-scene"],
      },
      {
        id: "male-date-10",
        prompt: "Do your romantic instincts say playful ease or elevated intention?",
        categoryA: "Budget & Playful Dates",
        categoryB: "Food, Drink & Craft Experiences",
        tagsForA: ["easygoing", "fun", "unforced"],
        tagsForB: ["intentional", "refined", "memorable"],
      },
    ],
  },
};

export const HOME_LIVING_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "furniture-decor-styles",
        title: "Furniture & Decor Styles",
        brands: [
          { brand: "Mid-Century Modern", dnaTags: ["teak", "design-classic", "clean-lines"] },
          { brand: "Industrial", dnaTags: ["metal", "raw-materials", "urban-loft"] },
          { brand: "Minimalist / Zen", dnaTags: ["low-profile", "calm", "hidden-storage"] },
          { brand: "The \"Man Cave\" / Game Room", dnaTags: ["memorabilia", "comfort-zone", "play-first"] },
          { brand: "Scandi-Cool", dnaTags: ["light-wood", "hygge", "functional"] },
          { brand: "Dark & Moody", dnaTags: ["charcoal", "leather", "atmospheric"] },
          { brand: "Bohemian Loft", dnaTags: ["plants", "eclectic", "relaxed"] },
          { brand: "Classic Executive", dnaTags: ["oak", "bookshelves", "heritage"] },
        ],
      },
      {
        id: "tech-entertainment",
        title: "Tech & Entertainment",
        brands: [
          { brand: "Home Theater Setup", dnaTags: ["cinematic", "big-screen", "immersive"] },
          { brand: "Sound System", dnaTags: ["audio-first", "multi-room", "hi-fi"] },
          { brand: "Smart Lighting", dnaTags: ["ambient", "automated", "scene-setting"] },
          { brand: "Gaming Station", dnaTags: ["ergonomic", "dual-monitor", "performance"] },
          { brand: "Smart Thermostat", dnaTags: ["climate-control", "efficient", "automated"] },
          { brand: "Voice Assistants", dnaTags: ["hands-free", "connected-home", "utility"] },
          { brand: "Robot Vacuum", dnaTags: ["set-and-forget", "cleaning-tech", "convenience"] },
          { brand: "Frame TV", dnaTags: ["art-display", "hybrid-tech", "design-minded"] },
        ],
      },
      {
        id: "kitchen-bar",
        title: "Kitchen & Bar",
        brands: [
          { brand: "Cast Iron Skillet", dnaTags: ["durable", "classic-tool", "kitchen-essential"] },
          { brand: "Espresso Machine / Nespresso", dnaTags: ["morning-ritual", "coffee-led", "counterpiece"] },
          { brand: "Air Fryer", dnaTags: ["busy-life", "practical", "easy-meals"] },
          { brand: "Whiskey/Bar Cart", dnaTags: ["hosting", "spirits", "masculine-detail"] },
          { brand: "Chef’s Knife Set", dnaTags: ["quality-tools", "cooking-serious", "precision"] },
          { brand: "Smart Fridge", dnaTags: ["connected-kitchen", "luxury-tech", "inventory-minded"] },
          { brand: "Sous Vide", dnaTags: ["precision-cooking", "foodie-tech", "experimental"] },
          { brand: "Wine Fridge", dnaTags: ["hosting", "temperature-control", "elevated"] },
          { brand: "Built-in Coffee Bar", dnaTags: ["luxury-routine", "coffee-ritual", "custom-home"] },
          { brand: "Magnetic Knife Strip", dnaTags: ["utility", "clean-display", "space-saving"] },
        ],
      },
      {
        id: "bedroom-comfort",
        title: "Bedroom & Comfort",
        brands: [
          { brand: "Memory Foam Mattress", dnaTags: ["sleep-quality", "comfort-first", "investment"] },
          { brand: "Weighted Blanket", dnaTags: ["calming", "restful", "anxiety-relief"] },
          { brand: "Blackout Curtains", dnaTags: ["night-owl", "sleep-optimized", "light-control"] },
          { brand: "Linen Bedding", dnaTags: ["breathable", "relaxed-luxury", "textured"] },
          { brand: "Bedside Charging Station", dnaTags: ["wireless", "convenient", "nightstand-tech"] },
          { brand: "Cozy Throw Blankets", dnaTags: ["soft-texture", "layered", "sofa-comfort"] },
          { brand: "Towel Warmer", dnaTags: ["spa-touch", "comfort-luxury", "small-upgrade"] },
        ],
      },
      {
        id: "maintenance-utility",
        title: "Maintenance & Utility",
        brands: [
          { brand: "Essential Tool Kit", dnaTags: ["fix-it", "prepared", "practical"] },
          { brand: "Entryway Organizer", dnaTags: ["drop-zone", "organized", "daily-routine"] },
          { brand: "High-End Laundry Setup", dnaTags: ["efficient", "organized-home", "adulting-upgrade"] },
          { brand: "Air Purifier", dnaTags: ["clean-air", "city-living", "wellness"] },
          { brand: "Indoor Plants", dnaTags: ["greenery", "living-space", "low-maintenance"] },
          { brand: "Command Hooks & Strips", dnaTags: ["renter-friendly", "practical", "damage-free"] },
          { brand: "Over-the-Door Storage", dnaTags: ["small-space", "maximizing", "budget-smart"] },
          { brand: "Desk Converters", dnaTags: ["wfh", "ergonomic", "standing-option"] },
          { brand: "Adjustable Lighting", dnaTags: ["soft-light", "ambience", "anti-overhead"] },
        ],
      },
      {
        id: "wellness-fitness-outdoor",
        title: "Wellness, Fitness & Outdoor Upgrades",
        brands: [
          { brand: "Peloton / Home Gym", dnaTags: ["fitness-space", "discipline", "self-improvement"] },
          { brand: "Automated Blinds", dnaTags: ["app-controlled", "light-routine", "smart-luxury"] },
          { brand: "Outdoor Grill / Smoker", dnaTags: ["patio-life", "hosting", "slow-cook"] },
          { brand: "Sauna or Cold Plunge", dnaTags: ["wellness-flex", "recovery", "high-end"] },
        ],
      },
      {
        id: "budget-practical-style",
        title: "Budget & Practical Style Moves",
        brands: [
          { brand: "IKEA Hacks", dnaTags: ["modular", "budget-smart", "looks-expensive"] },
          { brand: "Area Rugs", dnaTags: ["space-defining", "easy-upgrade", "grounding"] },
          { brand: "Diffusers / Room Sprays", dnaTags: ["signature-scent", "fresh-home", "atmosphere"] },
          { brand: "Subscription Art", dnaTags: ["rotating-prints", "creative-home", "low-commitment"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-home-01",
        prompt: "Do you want your place to feel more design-forward or more tech-forward?",
        categoryA: "Furniture & Decor Styles",
        categoryB: "Tech & Entertainment",
        tagsForA: ["aesthetic", "decor-led", "intentional-space"],
        tagsForB: ["smart-home", "immersive", "connected"],
      },
      {
        id: "male-home-02",
        prompt: "Kitchen ritual or bedroom comfort upgrade?",
        categoryA: "Kitchen & Bar",
        categoryB: "Bedroom & Comfort",
        tagsForA: ["hosting", "foodie", "ritual-driven"],
        tagsForB: ["restful", "comfort", "sleep-quality"],
      },
      {
        id: "male-home-03",
        prompt: "Would you invest first in practical utility or wellness and fitness?",
        categoryA: "Maintenance & Utility",
        categoryB: "Wellness, Fitness & Outdoor Upgrades",
        tagsForA: ["practical", "organized", "prepared"],
        tagsForB: ["self-improvement", "wellness", "performance-living"],
      },
      {
        id: "male-home-04",
        prompt: "Dark moody leather energy or airy Scandi calm?",
        categoryA: "Furniture & Decor Styles",
        categoryB: "Furniture & Decor Styles",
        tagsForA: ["moody", "masculine", "atmospheric"],
        tagsForB: ["light", "functional", "calm"],
      },
      {
        id: "male-home-05",
        prompt: "Big screen entertainment or a better coffee-and-cooking setup?",
        categoryA: "Tech & Entertainment",
        categoryB: "Kitchen & Bar",
        tagsForA: ["cinematic", "gaming", "audio-visual"],
        tagsForB: ["culinary", "hosting", "morning-ritual"],
      },
      {
        id: "male-home-06",
        prompt: "Do you care more about the drop zone and tool kit or the throw blankets and blackout curtains?",
        categoryA: "Maintenance & Utility",
        categoryB: "Bedroom & Comfort",
        tagsForA: ["organized", "fix-it", "daily-function"],
        tagsForB: ["cozy", "sleep-optimized", "soft-luxury"],
      },
      {
        id: "male-home-07",
        prompt: "Peloton and cold plunge or IKEA hacks and renter-smart upgrades?",
        categoryA: "Wellness, Fitness & Outdoor Upgrades",
        categoryB: "Budget & Practical Style Moves",
        tagsForA: ["wellness-flex", "discipline", "premium-upgrade"],
        tagsForB: ["budget-smart", "small-space", "creative-practicality"],
      },
      {
        id: "male-home-08",
        prompt: "Would you rather build a game room or a classic executive study?",
        categoryA: "Furniture & Decor Styles",
        categoryB: "Furniture & Decor Styles",
        tagsForA: ["play-first", "memorabilia", "comfort-zone"],
        tagsForB: ["bookshelves", "heritage", "professional"],
      },
      {
        id: "male-home-09",
        prompt: "Smart lighting and automated blinds or candles, diffusers, and textured throws?",
        categoryA: "Tech & Entertainment",
        categoryB: "Budget & Practical Style Moves",
        tagsForA: ["automation", "scene-setting", "app-controlled"],
        tagsForB: ["atmosphere", "texture", "signature-scent"],
      },
      {
        id: "male-home-10",
        prompt: "Does your ideal home say polished control or relaxed comfort?",
        categoryA: "Maintenance & Utility",
        categoryB: "Bedroom & Comfort",
        tagsForA: ["controlled", "organized", "efficient"],
        tagsForB: ["relaxed", "soft", "comfort-first"],
      },
    ],
  },
};

export const LOVE_LANGUAGE_RELATIONSHIPS_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "core-love-languages",
        title: "The Five Core Languages",
        brands: [
          { brand: "Physical Touch", dnaTags: ["touch-first", "closeness", "affectionate"] },
          { brand: "Acts of Service", dnaTags: ["practical-care", "supportive", "helpful-love"] },
          { brand: "Words of Affirmation", dnaTags: ["verbal-praise", "encouragement", "recognition"] },
          { brand: "Quality Time", dnaTags: ["presence", "undistracted", "parallel-play"] },
          { brand: "Receiving Gifts", dnaTags: ["thoughtful-items", "seen-and-known", "gesture-based"] },
        ],
      },
      {
        id: "modern-dynamics-values",
        title: "Modern Relationship Dynamics & Values",
        brands: [
          { brand: "Emotional Safety", dnaTags: ["nonjudgmental", "vulnerability", "safe-space"] },
          { brand: "Shared Hobbies", dnaTags: ["bonding", "activity-led", "team-energy"] },
          { brand: "Intellectual Stimulation", dnaTags: ["deep-talk", "debate", "mind-match"] },
          { brand: "Independence / \"Space\"", dnaTags: ["autonomy", "respect", "solo-time"] },
          { brand: "Loyalty & Reliability", dnaTags: ["steady", "trust", "ride-or-die"] },
          { brand: "Ambition Alignment", dnaTags: ["shared-goals", "growth", "future-focused"] },
          { brand: "Sense of Humor", dnaTags: ["inside-jokes", "playful", "chemistry"] },
          { brand: "Physical Presence", dnaTags: ["showing-up", "silent-support", "grounding"] },
          { brand: "Protective Instinct", dnaTags: ["provider-energy", "protective", "responsibility"] },
          { brand: "Public Praise", dnaTags: ["public-hype", "affirmation", "respect-shown"] },
        ],
      },
      {
        id: "relationship-styles-milestones",
        title: "Relationship Milestones & Styles",
        brands: [
          { brand: "The \"Slow Burn\"", dnaTags: ["friendship-first", "gradual", "trust-building"] },
          { brand: "High Intensity", dnaTags: ["fast-commitment", "all-in", "serious-quickly"] },
          { brand: "The \"Travel Test\"", dnaTags: ["compatibility-test", "shared-experience", "real-world"] },
          { brand: "Family-Oriented", dnaTags: ["family-fit", "roots", "long-term-minded"] },
          { brand: "Career-First", dnaTags: ["ambitious", "schedule-awareness", "work-driven"] },
          { brand: "The \"Homesteader\"", dnaTags: ["private-life", "quiet-home", "domestic-future"] },
          { brand: "The Power Couple", dnaTags: ["legacy-building", "ambition-pairing", "public-success"] },
          { brand: "Conflict Style: Direct", dnaTags: ["immediate-resolution", "straight-talk", "clear-conflict"] },
          { brand: "Conflict Style: Space", dnaTags: ["processing-time", "cool-off", "measured-response"] },
          { brand: "The \"Trad\" Vibe", dnaTags: ["traditional-roles", "structured-home", "classic-dynamic"] },
          { brand: "The Modern Progressive", dnaTags: ["equality", "shared-load", "balanced-partnership"] },
        ],
      },
      {
        id: "communication-connection",
        title: "Communication & Connection",
        brands: [
          { brand: "Parallel Play", dnaTags: ["comfortable-silence", "presence", "coexisting"] },
          { brand: "Memes as Love Language", dnaTags: ["digital-flirting", "thinking-of-you", "humor-sharing"] },
          { brand: "Activity-Based Bonding", dnaTags: ["doing-together", "side-by-side", "shared-motion"] },
          { brand: "Vent vs. Solve", dnaTags: ["clarity", "support-style", "communication-skill"] },
          { brand: "Routine Rituals", dnaTags: ["consistency", "small-traditions", "anchoring"] },
          { brand: "Physical Playfulness", dnaTags: ["teasing", "light-contact", "fun-energy"] },
          { brand: "Digital Connection", dnaTags: ["text-frequency", "staying-in-touch", "remote-connection"] },
          { brand: "Financial Transparency", dnaTags: ["openness", "planning", "trust-building"] },
          { brand: "Future Casting", dnaTags: ["shared-vision", "when-we", "forward-looking"] },
        ],
      },
      {
        id: "gift-appreciation-styles",
        title: "Gift & Appreciation Styles",
        brands: [
          { brand: "Practical Gifts", dnaTags: ["useful", "attentive", "problem-solving"] },
          { brand: "Experience Gifts", dnaTags: ["planned-experience", "memory-making", "intentional"] },
          { brand: "Sentiment Gifts", dnaTags: ["nostalgic", "meaningful", "memory-object"] },
          { brand: "Encouragement", dnaTags: ["first-fan", "belief", "motivational-love"] },
          { brand: "Small Gestures", dnaTags: ["daily-care", "details-noticed", "quiet-affection"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-love-01",
        prompt: "Do you feel most loved through direct affection or practical care?",
        categoryA: "The Five Core Languages",
        categoryB: "Gift & Appreciation Styles",
        tagsForA: ["touch-first", "presence", "affirmation"],
        tagsForB: ["daily-care", "attentive", "intentional-gesture"],
      },
      {
        id: "male-love-02",
        prompt: "Would you rather have emotional safety or shared ambition at the center of a relationship?",
        categoryA: "Modern Relationship Dynamics & Values",
        categoryB: "Relationship Milestones & Styles",
        tagsForA: ["safe-space", "loyalty", "vulnerability"],
        tagsForB: ["shared-goals", "legacy-building", "future-focused"],
      },
      {
        id: "male-love-03",
        prompt: "Parallel play and rituals or deep debate and future planning?",
        categoryA: "Communication & Connection",
        categoryB: "Modern Relationship Dynamics & Values",
        tagsForA: ["coexisting", "routine", "comfortable-silence"],
        tagsForB: ["mind-match", "growth", "intellectual"] },
      {
        id: "male-love-04",
        prompt: "Slow burn friendship or high-intensity commitment?",
        categoryA: "Relationship Milestones & Styles",
        categoryB: "Relationship Milestones & Styles",
        tagsForA: ["friendship-first", "gradual", "trust-building"],
        tagsForB: ["all-in", "serious-quickly", "intense-bond"],
      },
      {
        id: "male-love-05",
        prompt: "Do you value independence and space more or constant digital connection?",
        categoryA: "Modern Relationship Dynamics & Values",
        categoryB: "Communication & Connection",
        tagsForA: ["autonomy", "respect", "solo-time"],
        tagsForB: ["text-frequency", "thinking-of-you", "staying-close"],
      },
      {
        id: "male-love-06",
        prompt: "Would you rather be hyped up publicly or supported quietly behind the scenes?",
        categoryA: "Modern Relationship Dynamics & Values",
        categoryB: "Gift & Appreciation Styles",
        tagsForA: ["public-hype", "recognition", "respect-shown"],
        tagsForB: ["quiet-affection", "first-fan", "daily-care"],
      },
      {
        id: "male-love-07",
        prompt: "Direct conflict and quick resolution or space to process first?",
        categoryA: "Relationship Milestones & Styles",
        categoryB: "Relationship Milestones & Styles",
        tagsForA: ["straight-talk", "clear-conflict", "resolve-fast"],
        tagsForB: ["processing-time", "cool-off", "measured-response"],
      },
      {
        id: "male-love-08",
        prompt: "Practical gifts and acts of service or sentimental keepsakes and words?",
        categoryA: "Gift & Appreciation Styles",
        categoryB: "The Five Core Languages",
        tagsForA: ["useful", "helpful-love", "attentive"],
        tagsForB: ["meaningful", "verbal-praise", "memory-driven"],
      },
      {
        id: "male-love-09",
        prompt: "Quiet home life together or power-couple momentum?",
        categoryA: "Relationship Milestones & Styles",
        categoryB: "Relationship Milestones & Styles",
        tagsForA: ["private-life", "domestic-future", "steady"] ,
        tagsForB: ["ambition-pairing", "public-success", "big-future"],
      },
      {
        id: "male-love-10",
        prompt: "Does love look more like being understood or being energized?",
        categoryA: "Modern Relationship Dynamics & Values",
        categoryB: "Communication & Connection",
        tagsForA: ["understood", "safe-space", "loyalty"],
        tagsForB: ["playful", "activity-led", "chemistry"],
      },
    ],
  },
};

export const HOBBIES_WEEKEND_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "technical-creative",
        title: "Technical & Creative",
        brands: [
          { brand: "Gaming (PC/Console)", dnaTags: ["competitive", "immersive", "digital-play"] },
          { brand: "Mechanical DIY", dnaTags: ["hands-on", "machines", "tinker-minded"] },
          { brand: "Woodworking", dnaTags: ["craft", "build-with-hands", "maker"] },
          { brand: "Photography/Videography", dnaTags: ["visual-eye", "content-making", "gear-focused"] },
          { brand: "PC Building", dnaTags: ["hardware", "optimization", "setup-culture"] },
          { brand: "Coding / Side Projects", dnaTags: ["builder", "problem-solving", "self-directed"] },
          { brand: "3D Printing", dnaTags: ["prototype", "maker-tech", "functional-design"] },
          { brand: "Cooking / Smoking Meats", dnaTags: ["culinary", "process-driven", "hosting"] },
          { brand: "Home Brewing / Mixology", dnaTags: ["craft-drinks", "experimentation", "host-energy"] },
          { brand: "Vinyl Collecting", dnaTags: ["analog", "music-culture", "hifi"] },
        ],
      },
      {
        id: "active-physical",
        title: "Active & Physical",
        brands: [
          { brand: "Weightlifting / Bodybuilding", dnaTags: ["discipline", "strength", "pr-focused"] },
          { brand: "BJJ / Martial Arts", dnaTags: ["combat-sport", "technical", "self-mastery"] },
          { brand: "Running / Marathons", dnaTags: ["endurance", "solo-push", "goal-driven"] },
          { brand: "Cycling", dnaTags: ["distance", "gear-heavy", "outdoor-performance"] },
          { brand: "Golfing", dnaTags: ["precision", "social-sport", "weekend-routine"] },
          { brand: "Pickleball / Tennis", dnaTags: ["social-sport", "fast-paced", "competitive-fun"] },
          { brand: "Hiking / Rucking", dnaTags: ["trail-time", "grit", "outdoor-reset"] },
          { brand: "Basketball / Soccer", dnaTags: ["pickup-games", "team-sport", "competitive"] },
          { brand: "Surfing / Skating", dnaTags: ["board-culture", "flow-state", "subculture"] },
          { brand: "Rock Climbing", dnaTags: ["problem-solving", "grip-strength", "adventure-fitness"] },
        ],
      },
      {
        id: "outdoor-adventure",
        title: "Outdoor & Adventure",
        brands: [
          { brand: "Fishing", dnaTags: ["patience", "water-time", "quiet-focus"] },
          { brand: "Camping / Overlanding", dnaTags: ["off-grid", "truck-life", "adventure"] },
          { brand: "Hunting / Archery", dnaTags: ["target-skill", "seasonal", "trad-outdoors"] },
          { brand: "Skiing / Snowboarding", dnaTags: ["winter-weekends", "mountain-culture", "adrenaline"] },
          { brand: "Gardening / Landscaping", dnaTags: ["yard-work", "cultivation", "grounded"] },
        ],
      },
      {
        id: "social-spectator",
        title: "Social & Spectator",
        brands: [
          { brand: "Fantasy Football", dnaTags: ["stats-obsessed", "sports-brain", "competitive-bantern"] },
          { brand: "Watch Parties", dnaTags: ["hosted-social", "big-game", "group-energy"] },
          { brand: "Live Sports", dnaTags: ["stadium", "fan-energy", "live-experience"] },
          { brand: "Bar Trivia", dnaTags: ["knowledge-game", "pub-social", "team-play"] },
          { brand: "Board Games / D&D", dnaTags: ["strategy", "tabletop", "group-session"] },
          { brand: "Concerts / Festivals", dnaTags: ["live-music", "crowd-energy", "travel-for-shows"] },
          { brand: "Car Meets", dnaTags: ["cars-and-coffee", "enthusiast-community", "weekend-meetup"] },
        ],
      },
      {
        id: "low-key-relaxation",
        title: "Low-Key & Relaxation",
        brands: [
          { brand: "Movie Marathons", dnaTags: ["comfort-viewing", "deep-dive", "at-home"] },
          { brand: "Reading", dnaTags: ["quiet-focus", "curiosity", "solo-time"] },
          { brand: "Podcast Binging", dnaTags: ["passive-learning", "background-companion", "driving-audio"] },
          { brand: "Napping", dnaTags: ["recovery", "rest-first", "weekend-reset"] },
          { brand: "Walking the Dog", dnaTags: ["routine", "fresh-air", "pet-bond"] },
          { brand: "Meditating / Yoga", dnaTags: ["mental-health", "flexibility", "calm-practice"] },
          { brand: "Journaling", dnaTags: ["reflection", "goal-setting", "inner-life"] },
          { brand: "People Watching", dnaTags: ["observant", "cafe-time", "urban-chill"] },
        ],
      },
      {
        id: "niche-collector",
        title: "Niche & Collector",
        brands: [
          { brand: "Sneaker Hunting", dnaTags: ["raffles", "drop-culture", "collecting"] },
          { brand: "Watch Collecting", dnaTags: ["movements", "vintage-finds", "detail-obsessed"] },
          { brand: "Trading Cards", dnaTags: ["collectibles", "rarity", "community-trading"] },
          { brand: "LEGO Building", dnaTags: ["adult-sets", "focused-build", "nostalgic-engineering"] },
          { brand: "Model Building", dnaTags: ["miniatures", "precision-craft", "patient-hobby"] },
          { brand: "Coffee Enthusiast", dnaTags: ["pour-over", "dialing-in", "ritual-detail"] },
          { brand: "Thrifting / Flipping", dnaTags: ["treasure-hunt", "resale-mindset", "rare-finds"] },
          { brand: "Volunteer Work", dnaTags: ["service", "community", "purpose-driven"] },
          { brand: "Flight Simulators", dnaTags: ["detailed-systems", "simulation", "cockpit-setup"] },
          { brand: "Investing / Crypto", dnaTags: ["market-tracking", "risk-reward", "portfolio-minded"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-hobby-01",
        prompt: "Do you recharge more by building something technical or moving your body hard?",
        categoryA: "Technical & Creative",
        categoryB: "Active & Physical",
        tagsForA: ["maker", "builder", "gear-focused"],
        tagsForB: ["discipline", "adrenaline", "performance"],
      },
      {
        id: "male-hobby-02",
        prompt: "Mountain weekends and overlanding or couch resets and movie marathons?",
        categoryA: "Outdoor & Adventure",
        categoryB: "Low-Key & Relaxation",
        tagsForA: ["off-grid", "adventure", "outdoors"],
        tagsForB: ["comfort", "recovery", "quiet-time"],
      },
      {
        id: "male-hobby-03",
        prompt: "Do you prefer crowd energy with friends or niche collecting on your own terms?",
        categoryA: "Social & Spectator",
        categoryB: "Niche & Collector",
        tagsForA: ["group-energy", "shared-fandom", "social-weekend"],
        tagsForB: ["collector", "detail-obsessed", "solo-deep-dive"],
      },
      {
        id: "male-hobby-04",
        prompt: "Gaming rig and side projects or golf range and pickleball runs?",
        categoryA: "Technical & Creative",
        categoryB: "Active & Physical",
        tagsForA: ["digital-play", "optimization", "self-directed"],
        tagsForB: ["social-sport", "weekend-routine", "movement"],
      },
      {
        id: "male-hobby-05",
        prompt: "Fishing and camping or bar trivia and watch parties?",
        categoryA: "Outdoor & Adventure",
        categoryB: "Social & Spectator",
        tagsForA: ["quiet-focus", "nature", "truck-life"],
        tagsForB: ["sports-brain", "hosted-social", "pub-energy"],
      },
      {
        id: "male-hobby-06",
        prompt: "Reading and journaling or sneaker raffles and watch research?",
        categoryA: "Low-Key & Relaxation",
        categoryB: "Niche & Collector",
        tagsForA: ["reflection", "inner-life", "calm-practice"],
        tagsForB: ["drop-culture", "precision-detail", "collecting"],
      },
      {
        id: "male-hobby-07",
        prompt: "Would you rather smoke a brisket all day or train for a personal record?",
        categoryA: "Technical & Creative",
        categoryB: "Active & Physical",
        tagsForA: ["process-driven", "hosting", "culinary-craft"],
        tagsForB: ["pr-focused", "discipline", "goal-driven"],
      },
      {
        id: "male-hobby-08",
        prompt: "Car meets and fantasy football or meditating with the dog and a podcast?",
        categoryA: "Social & Spectator",
        categoryB: "Low-Key & Relaxation",
        tagsForA: ["enthusiast-community", "banter", "fan-energy"],
        tagsForB: ["routine", "mental-health", "easy-reset"],
      },
      {
        id: "male-hobby-09",
        prompt: "Flight simulators and 3D printing or skiing and rock climbing?",
        categoryA: "Niche & Collector",
        categoryB: "Outdoor & Adventure",
        tagsForA: ["systems-minded", "maker-tech", "precision"],
        tagsForB: ["adrenaline", "mountain-culture", "physical-challenge"],
      },
      {
        id: "male-hobby-10",
        prompt: "Does your weekend look more like focused obsession or flexible fun?",
        categoryA: "Niche & Collector",
        categoryB: "Social & Spectator",
        tagsForA: ["obsessive-interest", "deep-dive", "specialized"],
        tagsForB: ["flexible", "group-based", "casual-energy"],
      },
    ],
  },
};

export const GIFTING_BANKS: Partial<Record<Gender, GenderedBrandBank>> = {
  male: {
    categories: [
      {
        id: "daily-upgrades",
        title: "High-Quality Daily Upgrades",
        brands: [
          { brand: "Premium Tech Hoodie", dnaTags: ["daily-wear", "quality-upgrade", "comfort"] },
          { brand: "Full-Grain Leather Wallet", dnaTags: ["everyday-carry", "aging-well", "timeless"] },
          { brand: "Noise-Canceling Headphones", dnaTags: ["travel", "focus", "premium-tech"] },
          { brand: "Electric Toothbrush", dnaTags: ["practical-upgrade", "self-care", "won't-buy-himself"] },
          { brand: "Merino Wool Socks", dnaTags: ["practical", "durable", "comfort-upgrade"] },
          { brand: "Solid Fragrance", dnaTags: ["portable", "grooming", "gym-bag"] },
          { brand: "Stainless Steel Insulated Bottle", dnaTags: ["hydration", "durable", "daily-use"] },
          { brand: "Luxury Grooming Kit", dnaTags: ["grooming", "elevated-basic", "self-maintenance"] },
        ],
      },
      {
        id: "tech-gadgets",
        title: "Tech & Gadgets",
        brands: [
          { brand: "Mechanical Keyboard", dnaTags: ["desk-setup", "tactile", "customizable"] },
          { brand: "Portable Power Bank", dnaTags: ["travel-tech", "useful", "fast-charge"] },
          { brand: "Smart Watch", dnaTags: ["fitness-tracking", "connected", "daily-tech"] },
          { brand: "Streaming Deck / Controller", dnaTags: ["creator-gear", "setup-optimization", "gaming-adjacent"] },
          { brand: "Retro Gaming Console", dnaTags: ["nostalgia", "gaming", "plug-and-play"] },
          { brand: "Action Camera", dnaTags: ["sports", "travel-content", "adventure-tech"] },
          { brand: "Smart Home Hub", dnaTags: ["automation", "connected-home", "utility-tech"] },
        ],
      },
      {
        id: "tools-utility",
        title: "Tools & Utility",
        brands: [
          { brand: "Multitool", dnaTags: ["pocket-ready", "prepared", "high-utility"] },
          { brand: "Precision Screwdriver Set", dnaTags: ["repair", "small-tech", "tinker-tool"] },
          { brand: "Magnetic Parts Tray", dnaTags: ["garage-helper", "tinkering", "small-but-smart"] },
          { brand: "Heavy-Duty Flashlight", dnaTags: ["practical", "car-kit", "reliable"] },
          { brand: "Cordless Drill Set", dnaTags: ["serious-tool", "diy", "power-tool"] },
          { brand: "Digital Tire Inflator", dnaTags: ["car-utility", "portable", "problem-solving"] },
        ],
      },
      {
        id: "home-lifestyle",
        title: "Home & Lifestyle",
        brands: [
          { brand: "Cast Iron Skillet", dnaTags: ["kitchen-essential", "durable", "classic"] },
          { brand: "Weighted Blanket", dnaTags: ["rest", "anxiety-relief", "comfort"] },
          { brand: "Coffee Subscription", dnaTags: ["ritual", "monthly-discovery", "enthusiast"] },
          { brand: "Adjustable Dumbbells", dnaTags: ["home-gym", "space-saving", "fitness"] },
          { brand: "Chef’s Knife", dnaTags: ["quality-tool", "cooking", "precision"] },
          { brand: "Outdoor Pizza Oven", dnaTags: ["hosting", "backyard", "foodie-flex"] },
          { brand: "High-End Bed Sheets", dnaTags: ["sleep-upgrade", "luxury-basic", "comfort"] },
        ],
      },
      {
        id: "experiences",
        title: "Experiences",
        brands: [
          { brand: "Concert or Sports Tickets", dnaTags: ["live-event", "memory-making", "favorite-team-or-artist"] },
          { brand: "Steakhouse Gift Card", dnaTags: ["guaranteed-win", "foodie", "high-end-meal"] },
          { brand: "MasterClass Subscription", dnaTags: ["learning", "curiosity", "skill-growth"] },
          { brand: "Golf Round at a Nice Course", dnaTags: ["sport-luxury", "tee-time", "splurge-experience"] },
          { brand: "Massage or Spa Day", dnaTags: ["recovery", "stress-relief", "wellness"] },
          { brand: "Race Track Experience", dnaTags: ["adrenaline", "supercar", "bucket-list"] },
        ],
      },
      {
        id: "budget-thoughtful",
        title: "Budget & Thoughtful Add-Ons",
        brands: [
          { brand: "His Favorite Obscure Snack", dnaTags: ["specific-taste", "thoughtful", "small-win"] },
          { brand: "Subscription for One Year", dnaTags: ["practical", "daily-value", "recurring-use"] },
          { brand: "High-End Pen", dnaTags: ["desk-object", "everyday-carry", "metal-detail"] },
          { brand: "Microfiber Cleaning Cloths", dnaTags: ["hyper-practical", "car-tech-cleaning", "useful"] },
          { brand: "Desk Pad", dnaTags: ["workspace-upgrade", "clean-desk", "aesthetic-utility"] },
          { brand: "Tattoo Gift Certificate", dnaTags: ["personal-expression", "experience-adjacent", "next-piece"] },
        ],
      },
    ],
    questions: [
      {
        id: "male-gift-01",
        prompt: "Would he rather get a better version of something he uses daily or a fun new gadget?",
        categoryA: "High-Quality Daily Upgrades",
        categoryB: "Tech & Gadgets",
        tagsForA: ["daily-use", "quality-upgrade", "timeless"],
        tagsForB: ["techy", "new-gear", "setup-minded"],
      },
      {
        id: "male-gift-02",
        prompt: "Practical tool he’ll actually use or a home-and-comfort upgrade?",
        categoryA: "Tools & Utility",
        categoryB: "Home & Lifestyle",
        tagsForA: ["useful", "prepared", "problem-solving"],
        tagsForB: ["comfort", "ritual", "home-upgrade"],
      },
      {
        id: "male-gift-03",
        prompt: "Would he value a live experience more than another object?",
        categoryA: "Experiences",
        categoryB: "High-Quality Daily Upgrades",
        tagsForA: ["memory-making", "adrenaline", "special-night"],
        tagsForB: ["practical-luxury", "daily-value", "keeps-for-years"],
      },
      {
        id: "male-gift-04",
        prompt: "Desk setup energy or garage/toolbox energy?",
        categoryA: "Tech & Gadgets",
        categoryB: "Tools & Utility",
        tagsForA: ["desk-setup", "optimization", "connected-tech"],
        tagsForB: ["garage", "hands-on", "repair-minded"],
      },
      {
        id: "male-gift-05",
        prompt: "Coffee ritual and chef’s knife or headphones and smartwatch?",
        categoryA: "Home & Lifestyle",
        categoryB: "Tech & Gadgets",
        tagsForA: ["ritual-driven", "culinary", "comfort-upgrade"],
        tagsForB: ["premium-tech", "tracking", "travel-ready"],
      },
      {
        id: "male-gift-06",
        prompt: "Race track and concert tickets or a really good hoodie and wallet?",
        categoryA: "Experiences",
        categoryB: "High-Quality Daily Upgrades",
        tagsForA: ["bucket-list", "live-event", "big-memory"],
        tagsForB: ["wear-daily", "quiet-luxury", "lasting-value"],
      },
      {
        id: "male-gift-07",
        prompt: "Would a small thoughtful add-on land better than an expensive but generic gift?",
        categoryA: "Budget & Thoughtful Add-Ons",
        categoryB: "High-Quality Daily Upgrades",
        tagsForA: ["specific", "thoughtful", "personal-taste"],
        tagsForB: ["premium", "essential-upgrade", "safe-win"],
      },
      {
        id: "male-gift-08",
        prompt: "Outdoor pizza oven and dumbbells or multitool and tire inflator?",
        categoryA: "Home & Lifestyle",
        categoryB: "Tools & Utility",
        tagsForA: ["home-base", "hosting", "fitness-at-home"],
        tagsForB: ["car-kit", "practical", "preparedness"],
      },
      {
        id: "male-gift-09",
        prompt: "MasterClass and golf tee time or keyboard and retro console?",
        categoryA: "Experiences",
        categoryB: "Tech & Gadgets",
        tagsForA: ["learning", "skill-growth", "premium-time"],
        tagsForB: ["gaming", "desk-gear", "fun-tech"],
      },
      {
        id: "male-gift-10",
        prompt: "Does the ideal gift say utility first or delight first?",
        categoryA: "Tools & Utility",
        categoryB: "Experiences",
        tagsForA: ["utility-first", "problem-solving", "use-it-forever"],
        tagsForB: ["delight", "story-worthy", "memorable"],
      },
    ],
  },
};
