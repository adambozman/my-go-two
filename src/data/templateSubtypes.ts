import type { SubtypeItem } from "@/components/TemplateCoverFlow";

// === CLOTHING SIZES ===
import imgClothingTops from "@/assets/templates/clothing-tops.jpg";
import imgClothingBottoms from "@/assets/templates/clothing-bottoms.jpg";
import imgClothingDresses from "@/assets/templates/clothing-dresses.jpg";
import imgClothingOuterwear from "@/assets/templates/clothing-outerwear.jpg";
import imgClothingActivewear from "@/assets/templates/clothing-activewear.jpg";

// === SHOE SIZE (already in TemplateCoverFlow) ===
import imgHeels from "@/assets/templates/shoe-heels.jpg";
import imgSneakers from "@/assets/templates/shoe-sneakers.jpg";
import imgBoots from "@/assets/templates/shoe-boots.jpg";
import imgSandals from "@/assets/templates/shoe-sandals.jpg";
import imgFlats from "@/assets/templates/shoe-flats.jpg";

// === SCENTS ===
import imgScentPerfume from "@/assets/templates/scent-perfume.jpg";
import imgScentCandles from "@/assets/templates/scent-candles.jpg";
import imgScentBodycare from "@/assets/templates/scent-bodycare.jpg";
import imgScentOils from "@/assets/templates/scent-oils.jpg";
import imgScentHome from "@/assets/templates/scent-home.jpg";

// === GROOMING ===
import imgGroomingHair from "@/assets/templates/grooming-hair.jpg";
import imgGroomingSkin from "@/assets/templates/grooming-skin.jpg";
import imgGroomingShaving from "@/assets/templates/grooming-shaving.jpg";
import imgGroomingMakeup from "@/assets/templates/grooming-makeup.jpg";

// === MEASUREMENTS ===
import imgMeasureBody from "@/assets/templates/measure-body.jpg";
import imgMeasureRing from "@/assets/templates/measure-ring.jpg";

// === COFFEE ORDER ===
import imgCoffeeHot from "@/assets/templates/coffee-hot.jpg";
import imgCoffeeIced from "@/assets/templates/coffee-iced.jpg";
import imgCoffeeEspresso from "@/assets/templates/coffee-espresso.jpg";
import imgCoffeeTea from "@/assets/templates/coffee-tea.jpg";

// === FAST FOOD ===
import imgFoodBurgers from "@/assets/templates/food-burgers.jpg";
import imgFoodPizza from "@/assets/templates/food-pizza.jpg";
import imgFoodChicken from "@/assets/templates/food-chicken.jpg";
import imgFoodMexican from "@/assets/templates/food-mexican.jpg";
import imgFoodAsian from "@/assets/templates/food-asian.jpg";

// === FAVORITE MEALS ===
import imgMealBreakfast from "@/assets/templates/meal-breakfast.jpg";
import imgMealLunch from "@/assets/templates/meal-lunch.jpg";
import imgMealDinner from "@/assets/templates/meal-dinner.jpg";
import imgMealDessert from "@/assets/templates/meal-dessert.jpg";

// === GROCERY ===
import imgGroceryProduce from "@/assets/templates/grocery-produce.jpg";
import imgGroceryDairy from "@/assets/templates/grocery-dairy.jpg";
import imgGroceryPantry from "@/assets/templates/grocery-pantry.jpg";

// === FLOWERS ===
import imgFlowersRoses from "@/assets/templates/flowers-roses.jpg";
import imgFlowersTulips from "@/assets/templates/flowers-tulips.jpg";
import imgFlowersSunflowers from "@/assets/templates/flowers-sunflowers.jpg";
import imgFlowersLilies from "@/assets/templates/flowers-lilies.jpg";

// === JEWELRY ===
import imgJewelryNecklaces from "@/assets/templates/jewelry-necklaces.jpg";
import imgJewelryBracelets from "@/assets/templates/jewelry-bracelets.jpg";
import imgJewelryEarrings from "@/assets/templates/jewelry-earrings.jpg";
import imgJewelryWatches from "@/assets/templates/jewelry-watches.jpg";

// === DATE IDEAS ===
import imgDateOutdoor from "@/assets/templates/date-outdoor.jpg";
import imgDateIndoor from "@/assets/templates/date-indoor.jpg";
import imgDateRomantic from "@/assets/templates/date-romantic.jpg";

// === EVENTS ===
import imgEventConcerts from "@/assets/templates/event-concerts.jpg";
import imgEventSports from "@/assets/templates/event-sports.jpg";
import imgEventTheater from "@/assets/templates/event-theater.jpg";

// === TRAVEL ===
import imgTravelBeach from "@/assets/templates/travel-beach.jpg";
import imgTravelMountain from "@/assets/templates/travel-mountain.jpg";
import imgTravelCity from "@/assets/templates/travel-city.jpg";

// === RESTAURANT (reuse food images) ===
// === REMAINING categories reuse existing template images ===
import imgFavoriteRestaurants from "@/assets/templates/favorite-restaurants.jpg";
import imgAnniversaryGifts from "@/assets/templates/anniversary-gifts.jpg";
import imgBirthdayPreferences from "@/assets/templates/birthday-preferences.jpg";
import imgWishList from "@/assets/templates/wish-list.jpg";
import imgDietaryRestrictions from "@/assets/templates/dietary-restrictions.jpg";
import imgBrandPreferences from "@/assets/templates/brand-preferences.jpg";
import imgLoveLanguage from "@/assets/templates/love-language.jpg";
import imgPetPeeves from "@/assets/templates/pet-peeves.jpg";
import imgSpecificProducts from "@/assets/templates/specific-products.jpg";
import imgFragrances from "@/assets/templates/fragrances.jpg";

const tf = (label: string, type: "text" | "select" = "text", options?: string[]): SubtypeItem["fields"][0] => ({
  label, type, value: "", ...(options ? { options } : {}),
});

// Standard product-centric fields
const productFields = (typeLabel: string, typeOptions?: string[]) => [
  tf("Brand"),
  tf("Product Name"),
  ...(typeOptions ? [tf(typeLabel, "select", typeOptions)] : []),
  tf("Where to Buy"),
  tf("Price Range", "select", ["Under $10", "$10-$25", "$25-$50", "$50-$100", "$100+"]),
  tf("Rating", "select", ["Love It", "Really Like", "It's Okay", "Want to Switch"]),
  tf("Notes"),
];

export const allTemplateSubtypes: Record<string, SubtypeItem[]> = {
  "Clothing Sizes": [
    { id: "tops", name: "Tops", image: imgClothingTops, fields: [tf("Size", "select", ["XS", "S", "M", "L", "XL", "XXL"]), tf("Preferred Fit", "select", ["Slim", "Regular", "Relaxed", "Oversized"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "bottoms", name: "Bottoms", image: imgClothingBottoms, fields: [tf("Waist Size"), tf("Length/Inseam"), tf("Preferred Fit", "select", ["Skinny", "Slim", "Regular", "Relaxed", "Wide"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "dresses", name: "Dresses", image: imgClothingDresses, fields: [tf("Size", "select", ["XS", "S", "M", "L", "XL", "XXL"]), tf("Length", "select", ["Mini", "Midi", "Maxi"]), tf("Preferred Style", "select", ["A-Line", "Bodycon", "Wrap", "Shift", "Maxi"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "outerwear", name: "Outerwear", image: imgClothingOuterwear, fields: [tf("Size", "select", ["XS", "S", "M", "L", "XL", "XXL"]), tf("Type", "select", ["Jacket", "Coat", "Parka", "Blazer", "Vest"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "activewear", name: "Activewear", image: imgClothingActivewear, fields: [tf("Top Size", "select", ["XS", "S", "M", "L", "XL"]), tf("Bottom Size", "select", ["XS", "S", "M", "L", "XL"]), tf("Sports Bra Size"), tf("Preferred Brands"), tf("Notes")] },
  ],
  "Shoe Size": [
    { id: "heels", name: "Heels", image: imgHeels, fields: [tf("Size (US)"), tf("Size (EU)"), tf("Heel Height", "select", ["Kitten (1-2\")", "Mid (2-3\")", "High (3-4\")", "Stiletto (4\"+)"]), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
    { id: "sneakers", name: "Sneakers", image: imgSneakers, fields: [tf("Size (US)"), tf("Size (EU)"), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide", "Extra Wide"]), tf("Style", "select", ["Low-top", "Mid-top", "High-top", "Slip-on"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
    { id: "boots", name: "Boots", image: imgBoots, fields: [tf("Size (US)"), tf("Size (EU)"), tf("Boot Height", "select", ["Ankle", "Mid-Calf", "Knee-High", "Over-the-Knee"]), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
    { id: "sandals", name: "Sandals", image: imgSandals, fields: [tf("Size (US)"), tf("Size (EU)"), tf("Style", "select", ["Slides", "Strappy", "Wedge", "Gladiator", "Flip-Flop"]), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
    { id: "flats", name: "Flats", image: imgFlats, fields: [tf("Size (US)"), tf("Size (EU)"), tf("Style", "select", ["Ballet", "Loafer", "Mule", "Espadrille"]), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
  ],
  "Scents": [
    { id: "perfume", name: "Perfume", image: imgScentPerfume, fields: [tf("Favorite Scents"), tf("Scent Family", "select", ["Floral", "Woody", "Fresh", "Oriental", "Gourmand"]), tf("Preferred Brands"), tf("Concentration", "select", ["EDT", "EDP", "Parfum"]), tf("Notes")] },
    { id: "candles", name: "Candles", image: imgScentCandles, fields: [tf("Favorite Scents"), tf("Preferred Brands"), tf("Wax Type", "select", ["Soy", "Beeswax", "Coconut", "Paraffin", "No Preference"]), tf("Size Preference", "select", ["Small", "Medium", "Large", "Variety"]), tf("Notes")] },
    { id: "bodycare", name: "Body Care", image: imgScentBodycare, fields: [tf("Favorite Scents"), tf("Product Types", "select", ["Lotion", "Body Wash", "Body Spray", "All"]), tf("Preferred Brands"), tf("Skin Sensitivity", "select", ["Normal", "Sensitive", "Very Sensitive"]), tf("Notes")] },
    { id: "oils", name: "Essential Oils", image: imgScentOils, fields: [tf("Favorite Oils"), tf("Use", "select", ["Aromatherapy", "Topical", "Diffuser", "Bath"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "home", name: "Home Fragrance", image: imgScentHome, fields: [tf("Favorite Scents"), tf("Type", "select", ["Diffuser", "Room Spray", "Incense", "Wax Melts"]), tf("Preferred Brands"), tf("Notes")] },
  ],
  "Grooming": [
    { id: "hair", name: "Hair Care", image: imgGroomingHair, fields: [tf("Hair Type", "select", ["Straight", "Wavy", "Curly", "Coily"]), tf("Current Products"), tf("Preferred Brands"), tf("Concerns"), tf("Notes")] },
    { id: "skin", name: "Skin Care", image: imgGroomingSkin, fields: [tf("Skin Type", "select", ["Oily", "Dry", "Combination", "Normal", "Sensitive"]), tf("Current Routine"), tf("Preferred Brands"), tf("Concerns"), tf("Notes")] },
    { id: "shaving", name: "Shaving", image: imgGroomingShaving, fields: [tf("Razor Type", "select", ["Cartridge", "Safety", "Electric", "Straight"]), tf("Shaving Cream/Soap"), tf("Aftershave"), tf("Preferred Brands"), tf("Notes")] },
    { id: "makeup", name: "Makeup", image: imgGroomingMakeup, fields: [tf("Foundation Shade"), tf("Skin Tone", "select", ["Fair", "Light", "Medium", "Tan", "Deep"]), tf("Preferred Brands"), tf("Must-Have Products"), tf("Notes")] },
  ],
  "Measurements": [
    { id: "body", name: "Body", image: imgMeasureBody, fields: [tf("Chest/Bust"), tf("Waist"), tf("Hips"), tf("Inseam"), tf("Shoulder Width"), tf("Notes")] },
    { id: "ring", name: "Ring Size", image: imgMeasureRing, fields: [tf("Ring Size (US)"), tf("Ring Size (EU)"), tf("Preferred Finger"), tf("Metal Preference", "select", ["Gold", "Silver", "Rose Gold", "Platinum"]), tf("Notes")] },
  ],
  "Coffee Order": [
    { id: "hot", name: "Hot Coffee", image: imgCoffeeHot, fields: [tf("Drink", "select", ["Latte", "Cappuccino", "Americano", "Drip", "Mocha", "Flat White"]), tf("Milk", "select", ["Whole", "Skim", "Oat", "Almond", "Soy", "None"]), tf("Sweetener"), tf("Size", "select", ["Small", "Medium", "Large"]), tf("Extra Notes")] },
    { id: "iced", name: "Iced Coffee", image: imgCoffeeIced, fields: [tf("Drink", "select", ["Iced Latte", "Cold Brew", "Iced Americano", "Iced Mocha", "Frappuccino"]), tf("Milk", "select", ["Whole", "Skim", "Oat", "Almond", "Soy", "None"]), tf("Sweetener"), tf("Size", "select", ["Small", "Medium", "Large"]), tf("Extra Notes")] },
    { id: "espresso", name: "Espresso", image: imgCoffeeEspresso, fields: [tf("Type", "select", ["Single Shot", "Double Shot", "Ristretto", "Lungo", "Macchiato"]), tf("Sugar", "select", ["None", "One", "Two", "Splenda"]), tf("Preferred Roast", "select", ["Light", "Medium", "Dark"]), tf("Extra Notes")] },
    { id: "tea", name: "Tea", image: imgCoffeeTea, fields: [tf("Type", "select", ["Black", "Green", "Herbal", "Chai", "Matcha", "Oolong"]), tf("Milk", "select", ["None", "Whole", "Oat", "Almond"]), tf("Sweetener"), tf("Temperature", "select", ["Hot", "Iced"]), tf("Extra Notes")] },
  ],
  "Dietary Restrictions": [
    { id: "allergies", name: "Allergies", image: imgDietaryRestrictions, fields: [tf("Food Allergies"), tf("Severity", "select", ["Mild", "Moderate", "Severe/Anaphylaxis"]), tf("Cross-Contamination Concern", "select", ["Yes", "No"]), tf("Notes")] },
    { id: "lifestyle", name: "Lifestyle Diet", image: imgMealLunch, fields: [tf("Diet Type", "select", ["Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Gluten-Free"]), tf("Duration"), tf("Exceptions"), tf("Notes")] },
    { id: "intolerances", name: "Intolerances", image: imgGroceryDairy, fields: [tf("Intolerance"), tf("Severity", "select", ["Mild", "Moderate", "Severe"]), tf("Safe Alternatives"), tf("Notes")] },
  ],
  "Fast Food Order": [
    { id: "burgers", name: "Burgers", image: imgFoodBurgers, fields: [tf("Go-To Order"), tf("Preferred Chain"), tf("Toppings"), tf("Side", "select", ["Fries", "Onion Rings", "Salad", "None"]), tf("Drink"), tf("Notes")] },
    { id: "pizza", name: "Pizza", image: imgFoodPizza, fields: [tf("Crust", "select", ["Thin", "Regular", "Deep Dish", "Stuffed"]), tf("Favorite Toppings"), tf("Preferred Chain"), tf("Size", "select", ["Personal", "Small", "Medium", "Large"]), tf("Notes")] },
    { id: "chicken", name: "Chicken", image: imgFoodChicken, fields: [tf("Go-To Order"), tf("Style", "select", ["Fried", "Grilled", "Tenders", "Wings", "Nuggets"]), tf("Sauce"), tf("Preferred Chain"), tf("Notes")] },
    { id: "mexican", name: "Mexican", image: imgFoodMexican, fields: [tf("Go-To Order"), tf("Protein", "select", ["Beef", "Chicken", "Pork", "Steak", "Veggie"]), tf("Spice Level", "select", ["Mild", "Medium", "Hot", "Extra Hot"]), tf("Preferred Chain"), tf("Notes")] },
    { id: "asian", name: "Asian", image: imgFoodAsian, fields: [tf("Go-To Order"), tf("Cuisine", "select", ["Chinese", "Japanese", "Thai", "Vietnamese", "Korean"]), tf("Spice Level", "select", ["Mild", "Medium", "Hot"]), tf("Preferred Restaurant"), tf("Notes")] },
  ],
  "Favorite Meals": [
    { id: "breakfast", name: "Breakfast", image: imgMealBreakfast, fields: [tf("Favorite Dish"), tf("Style", "select", ["Sweet", "Savory", "Both"]), tf("Eggs", "select", ["Scrambled", "Fried", "Poached", "Omelet", "None"]), tf("Drink"), tf("Notes")] },
    { id: "lunch", name: "Lunch", image: imgMealLunch, fields: [tf("Favorite Dish"), tf("Type", "select", ["Sandwich", "Salad", "Soup", "Bowl", "Wrap"]), tf("Protein"), tf("Notes")] },
    { id: "dinner", name: "Dinner", image: imgMealDinner, fields: [tf("Favorite Dish"), tf("Cuisine", "select", ["Italian", "Mexican", "Asian", "American", "Mediterranean", "Indian"]), tf("Protein"), tf("Notes")] },
    { id: "dessert", name: "Desserts", image: imgMealDessert, fields: [tf("Favorite Dessert"), tf("Type", "select", ["Cake", "Ice Cream", "Cookies", "Pie", "Chocolate", "Pastry"]), tf("Flavor"), tf("Notes")] },
  ],
  "Grocery Specifics": [
    { id: "produce", name: "Produce", image: imgGroceryProduce, fields: [tf("Must-Have Fruits"), tf("Must-Have Vegetables"), tf("Organic Preference", "select", ["Always", "Sometimes", "No Preference"]), tf("Notes")] },
    { id: "dairy", name: "Dairy", image: imgGroceryDairy, fields: [tf("Milk Type", "select", ["Whole", "2%", "Skim", "Oat", "Almond", "None"]), tf("Cheese Preferences"), tf("Yogurt Preference"), tf("Notes")] },
    { id: "pantry", name: "Pantry", image: imgGroceryPantry, fields: [tf("Must-Have Items"), tf("Preferred Brands"), tf("Snack Preferences"), tf("Notes")] },
  ],
  "Anniversary Gifts": [
    { id: "traditional", name: "Traditional", image: imgAnniversaryGifts, fields: [tf("Anniversary Year"), tf("Traditional Material"), tf("Gift Ideas"), tf("Budget Range", "select", ["Under $50", "$50-$150", "$150-$500", "$500+"]), tf("Notes")] },
    { id: "experiences", name: "Experiences", image: imgDateRomantic, fields: [tf("Type", "select", ["Dinner", "Weekend Getaway", "Spa Day", "Adventure", "Class"]), tf("Location Preference"), tf("Budget Range", "select", ["Under $100", "$100-$300", "$300-$500", "$500+"]), tf("Notes")] },
    { id: "luxury", name: "Luxury", image: imgJewelryNecklaces, fields: [tf("Category", "select", ["Jewelry", "Watch", "Designer", "Tech", "Art"]), tf("Preferred Brands"), tf("Budget"), tf("Notes")] },
  ],
  "Birthday Preferences": [
    { id: "gifts", name: "Gift Ideas", image: imgBirthdayPreferences, fields: [tf("Wish List Items"), tf("Gift Categories", "select", ["Tech", "Fashion", "Home", "Experience", "Books"]), tf("Budget Suggestion"), tf("Do NOT Get Me"), tf("Notes")] },
    { id: "party", name: "Party Style", image: imgEventConcerts, fields: [tf("Party Type", "select", ["Intimate Dinner", "Big Party", "Surprise", "No Party", "Adventure"]), tf("Theme Ideas"), tf("Venue Preference"), tf("Notes")] },
    { id: "cake", name: "Cake & Treats", image: imgMealDessert, fields: [tf("Cake Flavor", "select", ["Chocolate", "Vanilla", "Red Velvet", "Funfetti", "Carrot", "Other"]), tf("Frosting", "select", ["Buttercream", "Cream Cheese", "Fondant", "Whipped"]), tf("Dietary Needs"), tf("Notes")] },
  ],
  "Flowers": [
    { id: "roses", name: "Roses", image: imgFlowersRoses, fields: [tf("Color Preference"), tf("Arrangement", "select", ["Bouquet", "Vase", "Box", "Single Stem"]), tf("Quantity"), tf("Occasion"), tf("Notes")] },
    { id: "tulips", name: "Tulips", image: imgFlowersTulips, fields: [tf("Color Preference"), tf("Arrangement", "select", ["Bouquet", "Vase", "Potted"]), tf("Quantity"), tf("Notes")] },
    { id: "sunflowers", name: "Sunflowers", image: imgFlowersSunflowers, fields: [tf("Arrangement", "select", ["Bouquet", "Vase", "Mixed Arrangement"]), tf("Size", "select", ["Small", "Medium", "Large"]), tf("Notes")] },
    { id: "lilies", name: "Lilies", image: imgFlowersLilies, fields: [tf("Color Preference"), tf("Type", "select", ["Asiatic", "Oriental", "Stargazer", "Calla"]), tf("Arrangement", "select", ["Bouquet", "Vase", "Mixed"]), tf("Notes")] },
  ],
  "Fragrances": [
    { id: "floral", name: "Floral", image: imgFragrances, fields: [tf("Favorite Notes"), tf("Preferred Brands"), tf("Season", "select", ["Spring/Summer", "Fall/Winter", "Year-Round"]), tf("Notes")] },
    { id: "woody", name: "Woody", image: imgScentOils, fields: [tf("Favorite Notes"), tf("Preferred Brands"), tf("Season", "select", ["Spring/Summer", "Fall/Winter", "Year-Round"]), tf("Notes")] },
    { id: "fresh", name: "Fresh", image: imgScentBodycare, fields: [tf("Favorite Notes"), tf("Preferred Brands"), tf("Season", "select", ["Spring/Summer", "Fall/Winter", "Year-Round"]), tf("Notes")] },
    { id: "oriental", name: "Oriental", image: imgScentPerfume, fields: [tf("Favorite Notes"), tf("Preferred Brands"), tf("Season", "select", ["Spring/Summer", "Fall/Winter", "Year-Round"]), tf("Notes")] },
  ],
  "Jewelry": [
    { id: "necklaces", name: "Necklaces", image: imgJewelryNecklaces, fields: [tf("Style", "select", ["Chain", "Pendant", "Choker", "Layered"]), tf("Metal", "select", ["Gold", "Silver", "Rose Gold", "Platinum"]), tf("Length", "select", ["Choker (14\")", "Princess (18\")", "Matinee (22\")", "Opera (30\")"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "bracelets", name: "Bracelets", image: imgJewelryBracelets, fields: [tf("Style", "select", ["Bangle", "Chain", "Cuff", "Charm", "Beaded"]), tf("Metal", "select", ["Gold", "Silver", "Rose Gold", "Leather"]), tf("Wrist Size"), tf("Preferred Brands"), tf("Notes")] },
    { id: "earrings", name: "Earrings", image: imgJewelryEarrings, fields: [tf("Style", "select", ["Stud", "Hoop", "Drop", "Huggie", "Clip-On"]), tf("Metal", "select", ["Gold", "Silver", "Rose Gold", "Platinum"]), tf("Preferred Brands"), tf("Sensitivity", "select", ["None", "Nickel-Free Only", "Hypoallergenic Only"]), tf("Notes")] },
    { id: "watches", name: "Watches", image: imgJewelryWatches, fields: [tf("Type", "select", ["Analog", "Digital", "Smart Watch"]), tf("Style", "select", ["Casual", "Dress", "Sport", "Luxury"]), tf("Preferred Brands"), tf("Band", "select", ["Metal", "Leather", "Silicone", "NATO"]), tf("Notes")] },
  ],
  "Wish List Items": [
    { id: "tech", name: "Tech", image: imgSpecificProducts, fields: [tf("Item"), tf("Brand"), tf("Model/Version"), tf("Price Range"), tf("Where to Buy"), tf("Notes")] },
    { id: "fashion", name: "Fashion", image: imgClothingDresses, fields: [tf("Item"), tf("Brand"), tf("Size"), tf("Color"), tf("Where to Buy"), tf("Notes")] },
    { id: "home", name: "Home", image: imgScentHome, fields: [tf("Item"), tf("Brand"), tf("Style/Color"), tf("Price Range"), tf("Where to Buy"), tf("Notes")] },
    { id: "experiences", name: "Experiences", image: imgDateOutdoor, fields: [tf("Experience"), tf("Location"), tf("Price Range"), tf("When"), tf("Notes")] },
  ],
  "Date Ideas": [
    { id: "outdoor", name: "Outdoor", image: imgDateOutdoor, fields: [tf("Activity"), tf("Location"), tf("Season", "select", ["Spring", "Summer", "Fall", "Winter", "Any"]), tf("Budget", "select", ["Free", "Under $50", "$50-$100", "$100+"]), tf("Notes")] },
    { id: "indoor", name: "Indoor", image: imgDateIndoor, fields: [tf("Activity"), tf("Location"), tf("Vibe", "select", ["Cozy", "Fun", "Creative", "Relaxing"]), tf("Budget", "select", ["Free", "Under $50", "$50-$100", "$100+"]), tf("Notes")] },
    { id: "romantic", name: "Romantic", image: imgDateRomantic, fields: [tf("Activity"), tf("Location"), tf("Dress Code", "select", ["Casual", "Smart Casual", "Formal"]), tf("Budget", "select", ["Under $50", "$50-$100", "$100-$200", "$200+"]), tf("Notes")] },
  ],
  "Events": [
    { id: "concerts", name: "Concerts", image: imgEventConcerts, fields: [tf("Favorite Artists/Bands"), tf("Genre", "select", ["Pop", "Rock", "Hip-Hop", "Country", "EDM", "Jazz", "Classical"]), tf("Venue Preference", "select", ["Small/Intimate", "Arena", "Festival", "Outdoor"]), tf("Notes")] },
    { id: "sports", name: "Sports", image: imgEventSports, fields: [tf("Favorite Teams"), tf("Sports", "select", ["Football", "Basketball", "Baseball", "Soccer", "Hockey", "Tennis"]), tf("Seating", "select", ["General", "Lower Bowl", "Club", "Suite"]), tf("Notes")] },
    { id: "theater", name: "Theater", image: imgEventTheater, fields: [tf("Favorite Shows/Types"), tf("Type", "select", ["Musical", "Play", "Comedy", "Ballet", "Opera"]), tf("Seating", "select", ["Orchestra", "Mezzanine", "Balcony"]), tf("Notes")] },
  ],
  "Favorite Restaurants": [
    { id: "italian", name: "Italian", image: imgFoodPizza, fields: [tf("Restaurant Name"), tf("Go-To Dish"), tf("Location"), tf("Price Range", "select", ["$", "$$", "$$$", "$$$$"]), tf("Notes")] },
    { id: "mexican", name: "Mexican", image: imgFoodMexican, fields: [tf("Restaurant Name"), tf("Go-To Dish"), tf("Location"), tf("Price Range", "select", ["$", "$$", "$$$", "$$$$"]), tf("Notes")] },
    { id: "asian", name: "Asian", image: imgFoodAsian, fields: [tf("Restaurant Name"), tf("Go-To Dish"), tf("Cuisine", "select", ["Chinese", "Japanese", "Thai", "Vietnamese", "Korean", "Indian"]), tf("Location"), tf("Notes")] },
    { id: "finedining", name: "Fine Dining", image: imgMealDinner, fields: [tf("Restaurant Name"), tf("Go-To Dish"), tf("Location"), tf("Price Range", "select", ["$$$", "$$$$"]), tf("Dress Code"), tf("Notes")] },
  ],
  "Travel Preferences": [
    { id: "beach", name: "Beach", image: imgTravelBeach, fields: [tf("Dream Destinations"), tf("Accommodation", "select", ["Resort", "Hotel", "Airbnb", "Villa"]), tf("Activities"), tf("Budget Range"), tf("Notes")] },
    { id: "mountain", name: "Mountain", image: imgTravelMountain, fields: [tf("Dream Destinations"), tf("Activities", "select", ["Hiking", "Skiing", "Camping", "Relaxing"]), tf("Accommodation", "select", ["Cabin", "Lodge", "Hotel", "Camping"]), tf("Budget Range"), tf("Notes")] },
    { id: "city", name: "City", image: imgTravelCity, fields: [tf("Dream Cities"), tf("Interests", "select", ["Culture", "Food", "Shopping", "Nightlife", "History"]), tf("Accommodation", "select", ["Hotel", "Airbnb", "Hostel", "Boutique"]), tf("Budget Range"), tf("Notes")] },
  ],
  "Brand Preferences": [
    { id: "clothing", name: "Clothing", image: imgClothingTops, fields: [tf("Favorite Brands"), tf("Style", "select", ["Casual", "Streetwear", "Classic", "Minimalist", "Bohemian"]), tf("Price Range", "select", ["Budget", "Mid-Range", "Premium", "Luxury"]), tf("Notes")] },
    { id: "beauty", name: "Beauty", image: imgGroomingSkin, fields: [tf("Favorite Brands"), tf("Category", "select", ["Skincare", "Makeup", "Hair", "Fragrance"]), tf("Price Range", "select", ["Drugstore", "Mid-Range", "Prestige", "Luxury"]), tf("Notes")] },
    { id: "tech", name: "Tech", image: imgSpecificProducts, fields: [tf("Favorite Brands"), tf("Category", "select", ["Phone", "Laptop", "Audio", "Smart Home", "Wearables"]), tf("Ecosystem", "select", ["Apple", "Android/Google", "Samsung", "Mixed"]), tf("Notes")] },
    { id: "home", name: "Home", image: imgScentHome, fields: [tf("Favorite Brands"), tf("Category", "select", ["Furniture", "Decor", "Kitchen", "Bedding"]), tf("Style", "select", ["Modern", "Farmhouse", "Minimalist", "Eclectic", "Traditional"]), tf("Notes")] },
  ],
  "Love Language": [
    { id: "words", name: "Words of Affirmation", image: imgLoveLanguage, fields: [tf("What Means Most"), tf("Preferred Way", "select", ["Verbal", "Written Notes", "Text Messages", "Public Praise"]), tf("Examples"), tf("Notes")] },
    { id: "acts", name: "Acts of Service", image: imgBrandPreferences, fields: [tf("Most Appreciated Acts"), tf("Around the House"), tf("Errands"), tf("Notes")] },
    { id: "gifts", name: "Receiving Gifts", image: imgWishList, fields: [tf("Gift Style", "select", ["Thoughtful/Sentimental", "Practical", "Luxurious", "Handmade"]), tf("Favorites"), tf("Budget Doesn't Matter", "select", ["True - It's the thought", "Prefer modest gifts", "Love being spoiled"]), tf("Notes")] },
    { id: "time", name: "Quality Time", image: imgDateIndoor, fields: [tf("Favorite Activities Together"), tf("Ideal Day Together"), tf("Frequency Needed"), tf("Notes")] },
  ],
  "Pet Peeves": [
    { id: "habits", name: "Habits", image: imgPetPeeves, fields: [tf("Pet Peeve"), tf("Severity", "select", ["Mildly Annoying", "Really Bothers Me", "Deal Breaker"]), tf("Context"), tf("Notes")] },
    { id: "social", name: "Social", image: imgDateOutdoor, fields: [tf("Pet Peeve"), tf("Severity", "select", ["Mildly Annoying", "Really Bothers Me", "Deal Breaker"]), tf("Context"), tf("Notes")] },
    { id: "home", name: "At Home", image: imgScentHome, fields: [tf("Pet Peeve"), tf("Severity", "select", ["Mildly Annoying", "Really Bothers Me", "Deal Breaker"]), tf("Context"), tf("Notes")] },
  ],
  "Specific Product Versions": [
    { id: "tech", name: "Tech", image: imgSpecificProducts, fields: [tf("Product"), tf("Brand"), tf("Exact Model/Version"), tf("Where to Buy"), tf("Notes")] },
    { id: "beauty", name: "Beauty", image: imgGroomingMakeup, fields: [tf("Product"), tf("Brand"), tf("Shade/Variant"), tf("Where to Buy"), tf("Notes")] },
    { id: "food", name: "Food & Drink", image: imgGroceryPantry, fields: [tf("Product"), tf("Brand"), tf("Flavor/Variant"), tf("Where to Buy"), tf("Notes")] },
  ],
};
