import type { SubtypeItem } from "@/components/TemplateCoverFlow";

export interface SubcategoryGroup {
  id: string;
  name: string;
  image: string;
  products: SubtypeItem[];
  gender?: string[]; // e.g. ["female"] means female-only; omit for all genders
}

/**
 * Images for shared (non-gender-exclusive) items are resolved at render time
 * by TemplateCoverFlow via getProductImage(). The `image` field on shared items
 * is intentionally empty — it is never read by the renderer.
 *
 * Only female-exclusive items (gated by `gender: ["female"]`) retain a direct
 * import since they are guaranteed to only render for female users.
 */

// Female-only imports — these items are filtered out for non-female users
import imgClothingDresses from "@/assets/templates/clothing-dresses.jpg";
import imgHeels from "@/assets/templates/shoe-heels.jpg";
import imgFlats from "@/assets/templates/shoe-flats.jpg";
import imgScentPerfume from "@/assets/templates/scent-perfume.jpg";
import imgGroomingMakeup from "@/assets/templates/grooming-makeup.jpg";

// Placeholder for shared items — image is resolved at render time by getProductImage()
const _ = "";

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
    { id: "tops", name: "Tops", image: _, fields: [tf("Size", "select", ["XS", "S", "M", "L", "XL", "XXL"]), tf("Preferred Fit", "select", ["Slim", "Regular", "Relaxed", "Oversized"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "bottoms", name: "Bottoms", image: _, fields: [tf("Waist Size"), tf("Length/Inseam"), tf("Preferred Fit", "select", ["Skinny", "Slim", "Regular", "Relaxed", "Wide"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "dresses", name: "Dresses", image: imgClothingDresses, gender: ["female"], fields: [tf("Size", "select", ["XS", "S", "M", "L", "XL", "XXL"]), tf("Length", "select", ["Mini", "Midi", "Maxi"]), tf("Preferred Style", "select", ["A-Line", "Bodycon", "Wrap", "Shift", "Maxi"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "outerwear", name: "Outerwear", image: _, fields: [tf("Size", "select", ["XS", "S", "M", "L", "XL", "XXL"]), tf("Type", "select", ["Jacket", "Coat", "Parka", "Blazer", "Vest"]), tf("Preferred Brands"), tf("Notes")] },
    { id: "activewear", name: "Activewear", image: _, fields: [tf("Top Size", "select", ["XS", "S", "M", "L", "XL"]), tf("Bottom Size", "select", ["XS", "S", "M", "L", "XL"]), tf("Sports Bra Size"), tf("Preferred Brands"), tf("Notes")] },
  ],
  "Shoe Size": [
    { id: "heels", name: "Heels", image: imgHeels, gender: ["female"], fields: [tf("Size (US)"), tf("Size (EU)"), tf("Heel Height", "select", ["Kitten (1-2\")", "Mid (2-3\")", "High (3-4\")", "Stiletto (4\"+)"]), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
    { id: "sneakers", name: "Sneakers", image: _, fields: [tf("Size (US)"), tf("Size (EU)"), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide", "Extra Wide"]), tf("Style", "select", ["Low-top", "Mid-top", "High-top", "Slip-on"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
    { id: "boots", name: "Boots", image: _, fields: [tf("Size (US)"), tf("Size (EU)"), tf("Boot Height", "select", ["Ankle", "Mid-Calf", "Knee-High", "Over-the-Knee"]), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
    { id: "sandals", name: "Sandals", image: _, fields: [tf("Size (US)"), tf("Size (EU)"), tf("Style", "select", ["Slides", "Strappy", "Wedge", "Gladiator", "Flip-Flop"]), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
    { id: "flats", name: "Flats", image: imgFlats, gender: ["female"], fields: [tf("Size (US)"), tf("Size (EU)"), tf("Style", "select", ["Ballet", "Loafer", "Mule", "Espadrille"]), tf("Preferred Brands"), tf("Width", "select", ["Narrow", "Standard", "Wide"]), tf("Fit Notes"), tf("Example Brand That Fits Perfectly")] },
  ],
  "Scents": [
    { id: "perfume", name: "Perfume", image: imgScentPerfume, gender: ["female"], fields: [...productFields("Concentration", ["EDT", "EDP", "Parfum", "Cologne"]), tf("Scent Family", "select", ["Floral", "Woody", "Fresh", "Oriental", "Gourmand"])] },
    { id: "cologne", name: "Cologne", image: _, gender: ["male"], fields: [...productFields("Concentration", ["EDT", "EDP", "Cologne"]), tf("Scent Family", "select", ["Fresh", "Woody", "Spicy", "Aquatic", "Aromatic"])] },
    { id: "candle", name: "Candle", image: _, fields: [...productFields("Wax Type", ["Soy", "Beeswax", "Coconut", "Paraffin", "No Preference"]), tf("Size", "select", ["Small", "Medium", "Large", "Travel"])] },
    { id: "body-lotion", name: "Body Lotion", image: _, fields: productFields("Skin Type", ["Normal", "Dry", "Sensitive", "All"]) },
    { id: "body-wash", name: "Body Wash", image: _, fields: productFields("Type", ["Gel", "Cream", "Oil", "Bar"]) },
    { id: "essential-oil", name: "Essential Oil", image: _, fields: productFields("Use", ["Aromatherapy", "Topical", "Diffuser", "Bath"]) },
    { id: "room-spray", name: "Room Spray", image: _, fields: productFields("Type", ["Spray", "Diffuser", "Incense", "Wax Melts"]) },
  ],
  "Grooming": [], // Handled by subcategories below
  "Measurements": [
    { id: "body", name: "Body", image: _, fields: [tf("Chest/Bust"), tf("Waist"), tf("Hips"), tf("Inseam"), tf("Shoulder Width"), tf("Notes")] },
    { id: "ring", name: "Ring Size", image: _, fields: [tf("Ring Size (US)"), tf("Ring Size (EU)"), tf("Preferred Finger"), tf("Metal Preference", "select", ["Gold", "Silver", "Rose Gold", "Platinum"]), tf("Notes")] },
  ],
  "Coffee Order": [
    { id: "hot", name: "Hot Coffee", image: _, fields: [tf("Drink", "select", ["Latte", "Cappuccino", "Americano", "Drip", "Mocha", "Flat White"]), tf("Milk", "select", ["Whole", "Skim", "Oat", "Almond", "Soy", "None"]), tf("Sweetener"), tf("Size", "select", ["Small", "Medium", "Large"]), tf("Extra Notes")] },
    { id: "iced", name: "Iced Coffee", image: _, fields: [tf("Drink", "select", ["Iced Latte", "Cold Brew", "Iced Americano", "Iced Mocha", "Frappuccino"]), tf("Milk", "select", ["Whole", "Skim", "Oat", "Almond", "Soy", "None"]), tf("Sweetener"), tf("Size", "select", ["Small", "Medium", "Large"]), tf("Extra Notes")] },
    { id: "espresso", name: "Espresso", image: _, fields: [tf("Type", "select", ["Single Shot", "Double Shot", "Ristretto", "Lungo", "Macchiato"]), tf("Sugar", "select", ["None", "One", "Two", "Splenda"]), tf("Preferred Roast", "select", ["Light", "Medium", "Dark"]), tf("Extra Notes")] },
    { id: "tea", name: "Tea", image: _, fields: [tf("Type", "select", ["Black", "Green", "Herbal", "Chai", "Matcha", "Oolong"]), tf("Milk", "select", ["None", "Whole", "Oat", "Almond"]), tf("Sweetener"), tf("Temperature", "select", ["Hot", "Iced"]), tf("Extra Notes")] },
  ],
  "Dietary Restrictions": [
    { id: "allergies", name: "Allergies", image: _, fields: [tf("Food Allergies"), tf("Severity", "select", ["Mild", "Moderate", "Severe/Anaphylaxis"]), tf("Cross-Contamination Concern", "select", ["Yes", "No"]), tf("Notes")] },
    { id: "lifestyle", name: "Lifestyle Diet", image: _, fields: [tf("Diet Type", "select", ["Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Gluten-Free"]), tf("Duration"), tf("Exceptions"), tf("Notes")] },
    { id: "intolerances", name: "Intolerances", image: _, fields: [tf("Intolerance"), tf("Severity", "select", ["Mild", "Moderate", "Severe"]), tf("Safe Alternatives"), tf("Notes")] },
  ],
  "Fast Food Order": [
    { id: "burgers", name: "Burgers", image: _, fields: [tf("Go-To Order"), tf("Preferred Chain"), tf("Toppings"), tf("Side", "select", ["Fries", "Onion Rings", "Salad", "None"]), tf("Drink"), tf("Notes")] },
    { id: "pizza", name: "Pizza", image: _, fields: [tf("Crust", "select", ["Thin", "Regular", "Deep Dish", "Stuffed"]), tf("Favorite Toppings"), tf("Preferred Chain"), tf("Size", "select", ["Personal", "Small", "Medium", "Large"]), tf("Notes")] },
    { id: "chicken", name: "Chicken", image: _, fields: [tf("Go-To Order"), tf("Style", "select", ["Fried", "Grilled", "Tenders", "Wings", "Nuggets"]), tf("Sauce"), tf("Preferred Chain"), tf("Notes")] },
    { id: "mexican", name: "Mexican", image: _, fields: [tf("Go-To Order"), tf("Protein", "select", ["Beef", "Chicken", "Pork", "Steak", "Veggie"]), tf("Spice Level", "select", ["Mild", "Medium", "Hot", "Extra Hot"]), tf("Preferred Chain"), tf("Notes")] },
    { id: "asian", name: "Asian", image: _, fields: [tf("Go-To Order"), tf("Cuisine", "select", ["Chinese", "Japanese", "Thai", "Vietnamese", "Korean"]), tf("Spice Level", "select", ["Mild", "Medium", "Hot"]), tf("Preferred Restaurant"), tf("Notes")] },
  ],
  "Favorite Meals": [
    { id: "breakfast", name: "Breakfast", image: _, fields: [tf("Favorite Dish"), tf("Style", "select", ["Sweet", "Savory", "Both"]), tf("Eggs", "select", ["Scrambled", "Fried", "Poached", "Omelet", "None"]), tf("Drink"), tf("Notes")] },
    { id: "lunch", name: "Lunch", image: _, fields: [tf("Favorite Dish"), tf("Type", "select", ["Sandwich", "Salad", "Soup", "Bowl", "Wrap"]), tf("Protein"), tf("Notes")] },
    { id: "dinner", name: "Dinner", image: _, fields: [tf("Favorite Dish"), tf("Cuisine", "select", ["Italian", "Mexican", "Asian", "American", "Mediterranean", "Indian"]), tf("Protein"), tf("Notes")] },
    { id: "dessert", name: "Desserts", image: _, fields: [tf("Favorite Dessert"), tf("Type", "select", ["Cake", "Ice Cream", "Cookies", "Pie", "Chocolate", "Pastry"]), tf("Flavor"), tf("Notes")] },
  ],
  "Grocery Specifics": [
    { id: "produce", name: "Produce", image: _, fields: [tf("Must-Have Fruits"), tf("Must-Have Vegetables"), tf("Organic Preference", "select", ["Always", "Sometimes", "No Preference"]), tf("Notes")] },
    { id: "dairy", name: "Dairy", image: _, fields: [tf("Milk Type", "select", ["Whole", "2%", "Skim", "Oat", "Almond", "None"]), tf("Cheese Preferences"), tf("Yogurt Preference"), tf("Notes")] },
    { id: "pantry", name: "Pantry", image: _, fields: [tf("Must-Have Items"), tf("Preferred Brands"), tf("Snack Preferences"), tf("Notes")] },
  ],
  "Anniversary Gifts": [
    { id: "traditional", name: "Traditional", image: _, fields: [tf("Anniversary Year"), tf("Traditional Material"), tf("Gift Ideas"), tf("Budget Range", "select", ["Under $50", "$50-$150", "$150-$500", "$500+"]), tf("Notes")] },
    { id: "experiences", name: "Experiences", image: _, fields: [tf("Type", "select", ["Dinner", "Weekend Getaway", "Spa Day", "Adventure", "Class"]), tf("Location Preference"), tf("Budget Range", "select", ["Under $100", "$100-$300", "$300-$500", "$500+"]), tf("Notes")] },
    { id: "luxury", name: "Luxury", image: _, fields: [tf("Category", "select", ["Jewelry", "Watch", "Designer", "Tech", "Art"]), tf("Preferred Brands"), tf("Budget"), tf("Notes")] },
  ],
  "Birthday Preferences": [
    { id: "gifts", name: "Gift Ideas", image: _, fields: [tf("Wish List Items"), tf("Gift Categories", "select", ["Tech", "Fashion", "Home", "Experience", "Books"]), tf("Budget Suggestion"), tf("Do NOT Get Me"), tf("Notes")] },
    { id: "party", name: "Party Style", image: _, fields: [tf("Party Type", "select", ["Intimate Dinner", "Big Party", "Surprise", "No Party", "Adventure"]), tf("Theme Ideas"), tf("Venue Preference"), tf("Notes")] },
    { id: "cake", name: "Cake & Treats", image: _, fields: [tf("Cake Flavor", "select", ["Chocolate", "Vanilla", "Red Velvet", "Funfetti", "Carrot", "Other"]), tf("Frosting", "select", ["Buttercream", "Cream Cheese", "Fondant", "Whipped"]), tf("Dietary Needs"), tf("Notes")] },
  ],
  "Flowers": [
    { id: "roses", name: "Roses", image: _, fields: [tf("Color Preference"), tf("Arrangement", "select", ["Bouquet", "Vase", "Box", "Single Stem"]), tf("Quantity"), tf("Occasion"), tf("Notes")] },
    { id: "tulips", name: "Tulips", image: _, fields: [tf("Color Preference"), tf("Arrangement", "select", ["Bouquet", "Vase", "Potted"]), tf("Quantity"), tf("Notes")] },
    { id: "sunflowers", name: "Sunflowers", image: _, fields: [tf("Arrangement", "select", ["Bouquet", "Vase", "Mixed Arrangement"]), tf("Size", "select", ["Small", "Medium", "Large"]), tf("Notes")] },
    { id: "lilies", name: "Lilies", image: _, fields: [tf("Color Preference"), tf("Type", "select", ["Asiatic", "Oriental", "Stargazer", "Calla"]), tf("Arrangement", "select", ["Bouquet", "Vase", "Mixed"]), tf("Notes")] },
  ],
  "Fragrances": [
    { id: "daily-fragrance", name: "Daily Fragrance", image: _, fields: [...productFields("Scent Family", ["Floral", "Woody", "Fresh", "Oriental", "Gourmand", "Aquatic"]), tf("Season", "select", ["Spring/Summer", "Fall/Winter", "Year-Round"])] },
    { id: "evening-fragrance", name: "Evening Fragrance", image: _, fields: [...productFields("Scent Family", ["Floral", "Woody", "Fresh", "Oriental", "Gourmand", "Spicy"]), tf("Season", "select", ["Spring/Summer", "Fall/Winter", "Year-Round"])] },
    { id: "body-mist", name: "Body Mist", image: _, fields: productFields("Scent Family", ["Floral", "Fruity", "Fresh", "Sweet"]) },
    { id: "fragrance-oil", name: "Fragrance Oil", image: _, fields: productFields("Use", ["Skin", "Diffuser", "Bath", "Layering"]) },
  ],
  "Jewelry": [
    { id: "necklaces", name: "Necklace", image: _, fields: [...productFields("Style", ["Chain", "Pendant", "Choker", "Layered"]), tf("Metal", "select", ["Gold", "Silver", "Rose Gold", "Platinum"]), tf("Length", "select", ["Choker (14\")", "Princess (18\")", "Matinee (22\")", "Opera (30\")"])] },
    { id: "bracelets", name: "Bracelet", image: _, fields: [...productFields("Style", ["Bangle", "Chain", "Cuff", "Charm", "Beaded"]), tf("Metal", "select", ["Gold", "Silver", "Rose Gold", "Leather"]), tf("Wrist Size")] },
    { id: "earrings", name: "Earrings", image: _, fields: [...productFields("Style", ["Stud", "Hoop", "Drop", "Huggie", "Clip-On"]), tf("Metal", "select", ["Gold", "Silver", "Rose Gold", "Platinum"]), tf("Sensitivity", "select", ["None", "Nickel-Free Only", "Hypoallergenic Only"])] },
    { id: "watches", name: "Watch", image: _, fields: [...productFields("Type", ["Analog", "Digital", "Smart Watch"]), tf("Style", "select", ["Casual", "Dress", "Sport", "Luxury"]), tf("Band", "select", ["Metal", "Leather", "Silicone", "NATO"])] },
  ],
  "Wish List Items": [
    { id: "tech", name: "Tech", image: _, fields: [tf("Item"), tf("Brand"), tf("Model/Version"), tf("Price Range"), tf("Where to Buy"), tf("Notes")] },
    { id: "fashion", name: "Fashion", image: _, fields: [tf("Item"), tf("Brand"), tf("Size"), tf("Color"), tf("Where to Buy"), tf("Notes")] },
    { id: "home", name: "Home", image: _, fields: [tf("Item"), tf("Brand"), tf("Style/Color"), tf("Price Range"), tf("Where to Buy"), tf("Notes")] },
    { id: "experiences", name: "Experiences", image: _, fields: [tf("Experience"), tf("Location"), tf("Price Range"), tf("When"), tf("Notes")] },
  ],
  "Date Ideas": [
    { id: "outdoor", name: "Outdoor", image: _, fields: [tf("Activity"), tf("Location"), tf("Season", "select", ["Spring", "Summer", "Fall", "Winter", "Any"]), tf("Budget", "select", ["Free", "Under $50", "$50-$100", "$100+"]), tf("Notes")] },
    { id: "indoor", name: "Indoor", image: _, fields: [tf("Activity"), tf("Location"), tf("Vibe", "select", ["Cozy", "Fun", "Creative", "Relaxing"]), tf("Budget", "select", ["Free", "Under $50", "$50-$100", "$100+"]), tf("Notes")] },
    { id: "romantic", name: "Romantic", image: _, fields: [tf("Activity"), tf("Location"), tf("Dress Code", "select", ["Casual", "Smart Casual", "Formal"]), tf("Budget", "select", ["Under $50", "$50-$100", "$100-$200", "$200+"]), tf("Notes")] },
  ],
  "Events": [
    { id: "concerts", name: "Concerts", image: _, fields: [tf("Favorite Artists/Bands"), tf("Genre", "select", ["Pop", "Rock", "Hip-Hop", "Country", "EDM", "Jazz", "Classical"]), tf("Venue Preference", "select", ["Small/Intimate", "Arena", "Festival", "Outdoor"]), tf("Notes")] },
    { id: "sports", name: "Sports", image: _, fields: [tf("Favorite Teams"), tf("Sports", "select", ["Football", "Basketball", "Baseball", "Soccer", "Hockey", "Tennis"]), tf("Seating", "select", ["General", "Lower Bowl", "Club", "Suite"]), tf("Notes")] },
    { id: "theater", name: "Theater", image: _, fields: [tf("Favorite Shows/Types"), tf("Type", "select", ["Musical", "Play", "Comedy", "Ballet", "Opera"]), tf("Seating", "select", ["Orchestra", "Mezzanine", "Balcony"]), tf("Notes")] },
  ],
  "Favorite Restaurants": [
    { id: "italian", name: "Italian", image: _, fields: [tf("Restaurant Name"), tf("Go-To Dish"), tf("Location"), tf("Price Range", "select", ["$", "$$", "$$$", "$$$$"]), tf("Notes")] },
    { id: "mexican", name: "Mexican", image: _, fields: [tf("Restaurant Name"), tf("Go-To Dish"), tf("Location"), tf("Price Range", "select", ["$", "$$", "$$$", "$$$$"]), tf("Notes")] },
    { id: "asian", name: "Asian", image: _, fields: [tf("Restaurant Name"), tf("Go-To Dish"), tf("Cuisine", "select", ["Chinese", "Japanese", "Thai", "Vietnamese", "Korean", "Indian"]), tf("Location"), tf("Notes")] },
    { id: "finedining", name: "Fine Dining", image: _, fields: [tf("Restaurant Name"), tf("Go-To Dish"), tf("Location"), tf("Price Range", "select", ["$$$", "$$$$"]), tf("Dress Code"), tf("Notes")] },
  ],
  "Travel Preferences": [
    { id: "beach", name: "Beach", image: _, fields: [tf("Dream Destinations"), tf("Accommodation", "select", ["Resort", "Hotel", "Airbnb", "Villa"]), tf("Activities"), tf("Budget Range"), tf("Notes")] },
    { id: "mountain", name: "Mountain", image: _, fields: [tf("Dream Destinations"), tf("Activities", "select", ["Hiking", "Skiing", "Camping", "Relaxing"]), tf("Accommodation", "select", ["Cabin", "Lodge", "Hotel", "Camping"]), tf("Budget Range"), tf("Notes")] },
    { id: "city", name: "City", image: _, fields: [tf("Dream Cities"), tf("Interests", "select", ["Culture", "Food", "Shopping", "Nightlife", "History"]), tf("Accommodation", "select", ["Hotel", "Airbnb", "Hostel", "Boutique"]), tf("Budget Range"), tf("Notes")] },
  ],
  "Brand Preferences": [
    { id: "clothing", name: "Clothing", image: _, fields: [tf("Favorite Brands"), tf("Style", "select", ["Casual", "Streetwear", "Classic", "Minimalist", "Bohemian"]), tf("Price Range", "select", ["Budget", "Mid-Range", "Premium", "Luxury"]), tf("Notes")] },
    { id: "beauty", name: "Beauty", image: _, fields: [tf("Favorite Brands"), tf("Category", "select", ["Skincare", "Makeup", "Hair", "Fragrance"]), tf("Price Range", "select", ["Drugstore", "Mid-Range", "Prestige", "Luxury"]), tf("Notes")] },
    { id: "tech", name: "Tech", image: _, fields: [tf("Favorite Brands"), tf("Category", "select", ["Phone", "Laptop", "Audio", "Smart Home", "Wearables"]), tf("Ecosystem", "select", ["Apple", "Android/Google", "Samsung", "Mixed"]), tf("Notes")] },
    { id: "home", name: "Home", image: _, fields: [tf("Favorite Brands"), tf("Category", "select", ["Furniture", "Decor", "Kitchen", "Bedding"]), tf("Style", "select", ["Modern", "Farmhouse", "Minimalist", "Eclectic", "Traditional"]), tf("Notes")] },
  ],
  "Love Language": [
    { id: "words", name: "Words of Affirmation", image: _, fields: [tf("What Means Most"), tf("Preferred Way", "select", ["Verbal", "Written Notes", "Text Messages", "Public Praise"]), tf("Examples"), tf("Notes")] },
    { id: "acts", name: "Acts of Service", image: _, fields: [tf("Most Appreciated Acts"), tf("Around the House"), tf("Errands"), tf("Notes")] },
    { id: "gifts", name: "Receiving Gifts", image: _, fields: [tf("Gift Style", "select", ["Thoughtful/Sentimental", "Practical", "Luxurious", "Handmade"]), tf("Favorites"), tf("Budget Doesn't Matter", "select", ["True - It's the thought", "Prefer modest gifts", "Love being spoiled"]), tf("Notes")] },
    { id: "time", name: "Quality Time", image: _, fields: [tf("Favorite Activities Together"), tf("Ideal Day Together"), tf("Frequency Needed"), tf("Notes")] },
  ],
  "Pet Peeves": [
    { id: "habits", name: "Habits", image: _, fields: [tf("Pet Peeve"), tf("Severity", "select", ["Mildly Annoying", "Really Bothers Me", "Deal Breaker"]), tf("Context"), tf("Notes")] },
    { id: "social", name: "Social", image: _, fields: [tf("Pet Peeve"), tf("Severity", "select", ["Mildly Annoying", "Really Bothers Me", "Deal Breaker"]), tf("Context"), tf("Notes")] },
    { id: "home", name: "At Home", image: _, fields: [tf("Pet Peeve"), tf("Severity", "select", ["Mildly Annoying", "Really Bothers Me", "Deal Breaker"]), tf("Context"), tf("Notes")] },
  ],
  "Specific Product Versions": [
    { id: "tech", name: "Tech", image: _, fields: [tf("Product"), tf("Brand"), tf("Exact Model/Version"), tf("Where to Buy"), tf("Notes")] },
    { id: "beauty", name: "Beauty", image: imgGroomingMakeup, gender: ["female"], fields: [tf("Product"), tf("Brand"), tf("Shade/Variant"), tf("Where to Buy"), tf("Notes")] },
    { id: "food", name: "Food & Drink", image: _, fields: [tf("Product"), tf("Brand"), tf("Flavor/Variant"), tf("Where to Buy"), tf("Notes")] },
  ],
};

// Templates with subcategory grouping (Category → Subcategory → Products)
export const templateSubcategories: Record<string, SubcategoryGroup[]> = {
  "Grooming": [
    {
      id: "hair-care", name: "Hair Care", image: _,
      products: [
        { id: "shampoo", name: "Shampoo", image: _, fields: productFields("Hair Type", ["Straight", "Wavy", "Curly", "Coily", "All Types"]) },
        { id: "conditioner", name: "Conditioner", image: _, fields: productFields("Hair Type", ["Straight", "Wavy", "Curly", "Coily", "All Types"]) },
        { id: "hair-styling", name: "Hair Styling", image: _, fields: productFields("Type", ["Gel", "Pomade", "Mousse", "Spray", "Cream", "Oil"]) },
      ],
    },
    {
      id: "skin-care", name: "Skin Care", image: _,
      products: [
        { id: "moisturizer", name: "Moisturizer", image: _, fields: productFields("Skin Type", ["Oily", "Dry", "Combination", "Normal", "Sensitive"]) },
        { id: "cleanser", name: "Cleanser", image: _, fields: productFields("Skin Type", ["Oily", "Dry", "Combination", "Normal", "Sensitive"]) },
        { id: "sunscreen", name: "Sunscreen", image: _, fields: [...productFields("SPF", ["SPF 15", "SPF 30", "SPF 50", "SPF 50+"]), tf("Finish", "select", ["Matte", "Dewy", "Natural"])] },
      ],
    },
    {
      id: "shaving", name: "Shaving", image: _,
      products: [
        { id: "razor", name: "Razor", image: _, fields: productFields("Type", ["Cartridge", "Safety", "Electric", "Straight", "Disposable"]) },
        { id: "shaving-cream", name: "Shaving Cream", image: _, fields: productFields("Type", ["Cream", "Gel", "Foam", "Soap", "Oil"]) },
        { id: "aftershave", name: "Aftershave", image: _, fields: productFields("Type", ["Balm", "Splash", "Lotion", "Gel"]) },
        { id: "pre-shave", name: "Pre-Shave", image: _, fields: productFields("Type", ["Oil", "Cream", "Gel", "Scrub"]) },
      ],
    },
    {
      id: "makeup", name: "Makeup", image: imgGroomingMakeup, gender: ["female"],
      products: [
        { id: "foundation", name: "Foundation", image: imgGroomingMakeup, fields: [...productFields("Finish", ["Matte", "Dewy", "Satin", "Natural"]), tf("Shade")] },
        { id: "concealer", name: "Concealer", image: imgGroomingMakeup, fields: [...productFields("Coverage", ["Light", "Medium", "Full"]), tf("Shade")] },
        { id: "mascara", name: "Mascara", image: imgGroomingMakeup, fields: productFields("Effect", ["Lengthening", "Volumizing", "Curling", "Waterproof"]) },
        { id: "lip-product", name: "Lip Product", image: imgGroomingMakeup, fields: [...productFields("Type", ["Lipstick", "Lip Gloss", "Lip Liner", "Lip Balm", "Lip Stain"]), tf("Shade")] },
      ],
    },
  ],
};

// Filter subtypes and subcategories by gender
export function filterSubtypesByGender(items: SubtypeItem[], gender: string): SubtypeItem[] {
  return items.filter(item => !item.gender || item.gender.includes(gender));
}

export function filterSubcategoriesByGender(groups: SubcategoryGroup[], gender: string): SubcategoryGroup[] {
  return groups.filter(g => !g.gender || g.gender.includes(gender));
}
