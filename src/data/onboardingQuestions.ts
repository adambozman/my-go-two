export interface SwipeCard {
  id: string;
  category: string;
  question: string;
  image: string;
  funnySubtext?: string;
  value: string;
  gender?: ("male" | "female" | "non-binary")[];
}

// Images will be gender-specific where relevant
const getGenderImage = (base: string, gender: string) => {
  // For now using placeholder - in production these would be different images
  return `https://images.unsplash.com/photo-${base}?w=400&h=500&fit=crop`;
};

export const onboardingCategories = [
  { id: "vibe", name: "Your Vibe", icon: "✨" },
  { id: "food", name: "Food & Drink", icon: "🍕" },
  { id: "style", name: "Style", icon: "👗" },
  { id: "activities", name: "Fun Stuff", icon: "🎉" },
  { id: "places", name: "Dream Places", icon: "🌴" },
  { id: "brands", name: "Brands You Love", icon: "💎" },
];

export const onboardingQuestions: SwipeCard[] = [
  // VIBE CATEGORY
  {
    id: "morning-person",
    category: "vibe",
    question: "Are you a morning person?",
    image: "1506905925346-21bda4d32df4",
    funnySubtext: "Be honest... we won't judge your 47 alarms",
    value: "morning_person",
  },
  {
    id: "spontaneous",
    category: "vibe",
    question: "Spontaneous adventures?",
    image: "1530521954074-e64f6810b32d",
    funnySubtext: "Pack bags in 5 mins or need a spreadsheet?",
    value: "spontaneous",
  },
  {
    id: "homebody",
    category: "vibe",
    question: "Cozy nights in over going out?",
    image: "1616046229478-9901c5536a45",
    funnySubtext: "Netflix, snacks, and zero pants required",
    value: "homebody",
  },
  {
    id: "romantic",
    category: "vibe",
    question: "Big romantic gestures?",
    image: "1518199266791-5375a83190b7",
    funnySubtext: "Rose petals or is that just extra laundry?",
    value: "romantic_gestures",
  },
  {
    id: "flowers",
    category: "vibe",
    question: "Do you love receiving flowers?",
    image: "1490750967868-88aa4486c946",
    funnySubtext: "Even if they die in 3 days, worth it?",
    value: "loves_flowers",
  },

  // FOOD & DRINK CATEGORY
  {
    id: "coffee-addict",
    category: "food",
    question: "Coffee is life?",
    image: "1509042239860-f550ce710b93",
    funnySubtext: "Don't talk to me before my first cup",
    value: "coffee_lover",
  },
  {
    id: "sweet-tooth",
    category: "food",
    question: "Sweet over savory?",
    image: "1551024601-bec78aea704b",
    funnySubtext: "Dessert first is a valid life choice",
    value: "sweet_tooth",
  },
  {
    id: "spicy-food",
    category: "food",
    question: "The spicier the better?",
    image: "1583119022894-919a68a3d0e3",
    funnySubtext: "Hot sauce on everything? Even cereal?",
    value: "spicy_food",
  },
  {
    id: "wine-lover",
    category: "food",
    question: "Wine o'clock is your favorite time?",
    image: "1510812431401-41d2bd2722f3",
    funnySubtext: "Red, white, or yes please",
    value: "wine_lover",
  },
  {
    id: "foodie",
    category: "food",
    question: "Would you travel for food?",
    image: "1414235077428-338989a2e8c0",
    funnySubtext: "3 hour drive for that taco place? Say less",
    value: "foodie",
  },

  // STYLE CATEGORY - Gender specific
  {
    id: "jewelry-lover",
    category: "style",
    question: "Love getting jewelry?",
    image: "1515562141207-7a88fb7ce338",
    funnySubtext: "Sparkly things make everything better",
    value: "jewelry_lover",
    gender: ["female", "non-binary"],
  },
  {
    id: "watches",
    category: "style",
    question: "Watches over jewelry?",
    image: "1523170335258-f5ed11844a49",
    funnySubtext: "Time is money, look good doing it",
    value: "watch_lover",
    gender: ["male", "non-binary"],
  },
  {
    id: "sneakerhead",
    category: "style",
    question: "Are you a sneakerhead?",
    image: "1542291026-7eec264c27ff",
    funnySubtext: "More shoes than a centipede needs",
    value: "sneakerhead",
  },
  {
    id: "designer",
    category: "style",
    question: "Designer items are worth it?",
    image: "1490427712608-588e68359dbd",
    funnySubtext: "Quality over quantity (that's the excuse)",
    value: "designer_items",
  },
  {
    id: "perfume",
    category: "style",
    question: "Obsessed with finding your signature scent?",
    image: "1541643600914-78b084683601",
    funnySubtext: "You've got a whole collection, don't you?",
    value: "perfume_collector",
  },

  // ACTIVITIES CATEGORY
  {
    id: "concerts",
    category: "activities",
    question: "Live music > recorded any day?",
    image: "1470229722913-5180ce5f1572",
    funnySubtext: "Even with $15 beer and no parking",
    value: "concert_lover",
  },
  {
    id: "sports-fan",
    category: "activities",
    question: "Sports games are a whole event?",
    image: "1461896836934- voices-7b8339",
    funnySubtext: "Face paint optional but encouraged",
    value: "sports_fan",
  },
  {
    id: "spa-day",
    category: "activities",
    question: "Spa days are essential?",
    image: "1544161515-4ab6ce6db874",
    funnySubtext: "Self-care isn't selfish, it's survival",
    value: "spa_lover",
  },
  {
    id: "gaming",
    category: "activities",
    question: "Gaming sessions are sacred?",
    image: "1612287230202-1ff1d85d1bdf",
    funnySubtext: "Don't disturb when the headset's on",
    value: "gamer",
  },
  {
    id: "outdoors",
    category: "activities",
    question: "Hiking, camping, nature vibes?",
    image: "1551632811-561732d1e306",
    funnySubtext: "Bug bites are just adventure souvenirs",
    value: "outdoors_lover",
  },

  // PLACES CATEGORY
  {
    id: "beach",
    category: "places",
    question: "Beach vacations are peak happiness?",
    image: "1507525428034-b723cf961d3e",
    funnySubtext: "Sand in weird places is worth it",
    value: "beach_lover",
  },
  {
    id: "city-trip",
    category: "places",
    question: "City trips over nature escapes?",
    image: "1480714378408-67cf0d13bc1b",
    funnySubtext: "Museums, food tours, zero hiking",
    value: "city_traveler",
  },
  {
    id: "europe",
    category: "places",
    question: "Europe is on your bucket list?",
    image: "1499856871958-5b9627545d1a",
    funnySubtext: "Pastries, history, and tiny cars",
    value: "europe_dreamer",
  },
  {
    id: "tropical",
    category: "places",
    question: "Tropical islands are the dream?",
    image: "1559128010-7c1ad6e1b6a5",
    funnySubtext: "Overwater bungalow or it didn't happen",
    value: "tropical_lover",
  },
  {
    id: "staycation",
    category: "places",
    question: "Staycations are underrated?",
    image: "1566073771259-6a8506099945",
    funnySubtext: "Why travel when your couch exists?",
    value: "staycation_fan",
  },

  // BRANDS CATEGORY
  {
    id: "apple",
    category: "brands",
    question: "Apple everything?",
    image: "1611186871348-b1ce696e52c9",
    funnySubtext: "Blue bubbles or nothing",
    value: "brand_apple",
  },
  {
    id: "nike",
    category: "brands",
    question: "Nike over everything?",
    image: "1542291026-7eec264c27ff",
    funnySubtext: "Just do it (buy more shoes)",
    value: "brand_nike",
  },
  {
    id: "lululemon",
    category: "brands",
    question: "Lululemon is worth every penny?",
    image: "1518611012118-696072aa579a",
    funnySubtext: "Athleisure is a lifestyle",
    value: "brand_lululemon",
    gender: ["female", "non-binary"],
  },
  {
    id: "sephora",
    category: "brands",
    question: "Sephora trips are dangerous?",
    image: "1596462502278-27bfdc403348",
    funnySubtext: "Went in for one thing, left with 12",
    value: "brand_sephora",
    gender: ["female", "non-binary"],
  },
  {
    id: "yeti",
    category: "brands",
    question: "YETI coolers/cups are essential?",
    image: "1504674900247-0877df9cc836",
    funnySubtext: "Temperature control is a personality trait",
    value: "brand_yeti",
  },
];

export const getQuestionsForGender = (gender: string): SwipeCard[] => {
  const normalizedGender = gender.toLowerCase() as "male" | "female" | "non-binary";
  return onboardingQuestions.filter(
    (q) => !q.gender || q.gender.includes(normalizedGender)
  );
};
