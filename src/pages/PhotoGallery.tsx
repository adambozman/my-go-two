import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── Stock photos ──
import partner1 from "@/assets/stock/partner-1.jpg";
import partner2 from "@/assets/stock/partner-2.jpg";
import partner3 from "@/assets/stock/partner-3.jpg";
import partner4 from "@/assets/stock/partner-4.jpg";
import partner5 from "@/assets/stock/partner-5.jpg";
import partner6 from "@/assets/stock/partner-6.jpg";
import partner7 from "@/assets/stock/partner-7.jpg";
import mom1 from "@/assets/stock/mom-1.jpg";
import mom2 from "@/assets/stock/mom-2.jpg";
import mom3 from "@/assets/stock/mom-3.jpg";
import mom4 from "@/assets/stock/mom-4.jpg";
import mom5 from "@/assets/stock/mom-5.jpg";
import mom6 from "@/assets/stock/mom-6.jpg";
import dad1 from "@/assets/stock/dad-1.jpg";
import dad2 from "@/assets/stock/dad-2.jpg";
import dad3 from "@/assets/stock/dad-3.jpg";
import dad4 from "@/assets/stock/dad-4.jpg";
import dad5 from "@/assets/stock/dad-5.jpg";
import dad6 from "@/assets/stock/dad-6.jpg";
import dad7 from "@/assets/stock/dad-7.jpg";
import sister1 from "@/assets/stock/sister-1.jpg";
import sister2 from "@/assets/stock/sister-2.jpg";
import sister3 from "@/assets/stock/sister-3.jpg";
import sister4 from "@/assets/stock/sister-4.jpg";
import sister5 from "@/assets/stock/sister-5.jpg";
import sister6 from "@/assets/stock/sister-6.jpg";
import brother1 from "@/assets/stock/brother-1.jpg";
import brother2 from "@/assets/stock/brother-2.jpg";
import brother3 from "@/assets/stock/brother-3.jpg";
import brother4 from "@/assets/stock/brother-4.jpg";
import brother5 from "@/assets/stock/brother-5.jpg";
import brother6 from "@/assets/stock/brother-6.jpg";
import friend1 from "@/assets/stock/friend-1.jpg";
import friend2 from "@/assets/stock/friend-2.jpg";
import friend3 from "@/assets/stock/friend-3.jpg";
import friend4 from "@/assets/stock/friend-4.jpg";
import friend5 from "@/assets/stock/friend-5.jpg";
import coworker1 from "@/assets/stock/coworker-1.jpg";
import coworker2 from "@/assets/stock/coworker-2.jpg";
import coworker3 from "@/assets/stock/coworker-3.jpg";
import coworker4 from "@/assets/stock/coworker-4.jpg";

// ── Occasion stock photos ──
import anniversaries from "@/assets/stock/anniversaries.jpg";
import birthdays from "@/assets/stock/birthdays.jpg";
import dateNights from "@/assets/stock/date-nights.jpg";
import firstDate from "@/assets/stock/first-date.jpg";
import holidays from "@/assets/stock/holidays.jpg";
import justBecause from "@/assets/stock/just-because.jpg";
import newLists from "@/assets/stock/new-lists.jpg";
import trips from "@/assets/stock/trips.jpg";
import updatedCards from "@/assets/stock/updated-cards.jpg";
import valentines from "@/assets/stock/valentines.jpg";

// ── Style images ──
import maleMinimal from "@/assets/styles/male/minimal.jpg";
import maleClassic from "@/assets/styles/male/classic.jpg";
import maleSporty from "@/assets/styles/male/sporty.jpg";
import maleTrendy from "@/assets/styles/male/trendy.jpg";
import maleEdgy from "@/assets/styles/male/edgy.jpg";
import maleBoho from "@/assets/styles/male/boho.jpg";
import maleLuxury from "@/assets/styles/male/luxury.jpg";
import maleLaidBack from "@/assets/styles/male/laid-back.jpg";
import femaleMinimal from "@/assets/styles/female/minimal.jpg";
import femaleClassic from "@/assets/styles/female/classic.jpg";
import femaleSporty from "@/assets/styles/female/sporty.jpg";
import femaleTrendy from "@/assets/styles/female/trendy.jpg";
import femaleEdgy from "@/assets/styles/female/edgy.jpg";
import femaleBoho from "@/assets/styles/female/boho.jpg";
import femaleLuxury from "@/assets/styles/female/luxury.jpg";
import femaleLaidBack from "@/assets/styles/female/laid-back.jpg";
import neutralMinimal from "@/assets/styles/minimal.jpg";
import neutralClassic from "@/assets/styles/classic.jpg";
import neutralSporty from "@/assets/styles/sporty.jpg";
import neutralTrendy from "@/assets/styles/trendy.jpg";
import neutralEdgy from "@/assets/styles/edgy.jpg";
import neutralBoho from "@/assets/styles/boho.jpg";
import neutralLuxury from "@/assets/styles/luxury.jpg";
import neutralLaidBack from "@/assets/styles/laid-back.jpg";
import neutralPolished from "@/assets/styles/polished.jpg";
import neutralCasual from "@/assets/styles/casual.jpg";
import neutralCreative from "@/assets/styles/creative.jpg";
import neutralProfessional from "@/assets/styles/professional.jpg";
import neutralChill from "@/assets/styles/chill.jpg";
import neutralBudget from "@/assets/styles/budget.jpg";
import neutralBalanced from "@/assets/styles/balanced.jpg";
import neutralQuality from "@/assets/styles/quality.jpg";
import neutralComfort from "@/assets/styles/comfort.jpg";
import neutralFit from "@/assets/styles/fit.jpg";
import neutralBrand from "@/assets/styles/brand.jpg";
import neutralPrice from "@/assets/styles/price.jpg";
import neutralTimeless from "@/assets/styles/timeless.jpg";
import neutralDining from "@/assets/styles/dining.jpg";
import neutralTraveling from "@/assets/styles/traveling.jpg";
import neutralOutdoors from "@/assets/styles/outdoors.jpg";
import neutralEvents from "@/assets/styles/events.jpg";
import neutralStayingIn from "@/assets/styles/staying-in.jpg";
import neutralFitness from "@/assets/styles/fitness.jpg";
import neutralPracticalGift from "@/assets/styles/practical-gift.jpg";
import neutralThoughtfulGift from "@/assets/styles/thoughtful-gift.jpg";
import neutralLuxuriousGift from "@/assets/styles/luxurious-gift.jpg";
import neutralExperienceGift from "@/assets/styles/experience-gift.jpg";
import neutralSurpriseGift from "@/assets/styles/surprise-gift.jpg";
import neutralHippy from "@/assets/styles/hippy.jpg";
import neutralPreppy from "@/assets/styles/preppy.jpg";
import neutralStreet from "@/assets/styles/street.jpg";
import neutralElegant from "@/assets/styles/elegant.jpg";
import neutralBougie from "@/assets/styles/bougie.jpg";

// ── Category images ──
import maleShopping from "@/assets/categories/male/shopping.jpg";
import maleStyleCat from "@/assets/categories/male/style.jpg";
import maleFood from "@/assets/categories/male/food.jpg";
import maleGifts from "@/assets/categories/male/gifts.jpg";
import maleLifestyle from "@/assets/categories/male/lifestyle.jpg";
import maleFitCat from "@/assets/categories/male/fit.jpg";
import femaleShopping from "@/assets/categories/female/shopping.jpg";
import femaleStyleCat from "@/assets/categories/female/style.jpg";
import femaleFood from "@/assets/categories/female/food.jpg";
import femaleGifts from "@/assets/categories/female/gifts.jpg";
import femaleLifestyle from "@/assets/categories/female/lifestyle.jpg";
import femaleFitCat from "@/assets/categories/female/fit.jpg";

// ── Dashboard images ──
import quickGiftIdeas from "@/assets/dashboard/quick-gift-ideas.jpg";
import quickSavedItems from "@/assets/dashboard/quick-saved-items.jpg";
import quickTheirBrands from "@/assets/dashboard/quick-their-brands.jpg";
import quickTheirSizes from "@/assets/dashboard/quick-their-sizes.jpg";

// ── Template images (gender-specific samples) ──
import maleShoeSize from "@/assets/templates/male/shoe-size.jpg";
import maleShoeSneakers from "@/assets/templates/male/shoe-sneakers.jpg";
import maleShoeBoots from "@/assets/templates/male/shoe-boots.jpg";
import maleShoeSandals from "@/assets/templates/male/shoe-sandals.jpg";
import maleClothingTops from "@/assets/templates/male/clothing-tops.jpg";
import maleClothingBottoms from "@/assets/templates/male/clothing-bottoms.jpg";
import maleClothingOuterwear from "@/assets/templates/male/clothing-outerwear.jpg";
import maleClothingActivewear from "@/assets/templates/male/clothing-activewear.jpg";
import maleClothingSizes from "@/assets/templates/male/clothing-sizes.jpg";
import maleScents from "@/assets/templates/male/scents.jpg";
import maleScentCologne from "@/assets/templates/male/scent-cologne.jpg";
import maleScentBodycare from "@/assets/templates/male/scent-bodycare.jpg";
import maleGrooming from "@/assets/templates/male/grooming.jpg";
import maleGroomingHair from "@/assets/templates/male/grooming-hair.jpg";
import maleGroomingSkin from "@/assets/templates/male/grooming-skin.jpg";
import maleMeasurements from "@/assets/templates/male/measurements.jpg";
import maleMeasureRing from "@/assets/templates/male/measure-ring.jpg";
import maleFragrances from "@/assets/templates/male/fragrances.jpg";
import maleJewelry from "@/assets/templates/male/jewelry.jpg";
import maleJewelryNecklaces from "@/assets/templates/male/jewelry-necklaces.jpg";
import maleJewelryBracelets from "@/assets/templates/male/jewelry-bracelets.jpg";
import maleJewelryWatches from "@/assets/templates/male/jewelry-watches.jpg";

// Female templates
import femaleClothingSizes from "@/assets/templates/clothing-sizes.jpg";
import femaleShoeSize from "@/assets/templates/shoe-size.jpg";
import femaleScents from "@/assets/templates/scents.jpg";
import femaleGrooming from "@/assets/templates/grooming.jpg";
import femaleMeasurements from "@/assets/templates/measurements.jpg";
import femaleFragrances from "@/assets/templates/fragrances.jpg";
import femaleJewelry from "@/assets/templates/jewelry.jpg";
import femaleClothingTops from "@/assets/templates/clothing-tops.jpg";
import femaleClothingBottoms from "@/assets/templates/clothing-bottoms.jpg";
import femaleClothingOuterwear from "@/assets/templates/clothing-outerwear.jpg";
import femaleClothingActivewear from "@/assets/templates/clothing-activewear.jpg";
import femaleScentPerfume from "@/assets/templates/scent-perfume.jpg";
import femaleScentBodycare from "@/assets/templates/scent-bodycare.jpg";
import femaleGroomingHair from "@/assets/templates/grooming-hair.jpg";
import femaleGroomingSkin from "@/assets/templates/grooming-skin.jpg";
import femaleShoeSneakers from "@/assets/templates/shoe-sneakers.jpg";
import femaleShoeBoots from "@/assets/templates/shoe-boots.jpg";
import femaleShoeSandals from "@/assets/templates/shoe-sandals.jpg";
import femaleMeasureRing from "@/assets/templates/measure-ring.jpg";
import femaleJewelryNecklaces from "@/assets/templates/jewelry-necklaces.jpg";
import femaleJewelryBracelets from "@/assets/templates/jewelry-bracelets.jpg";
import femaleJewelryEarrings from "@/assets/templates/jewelry-earrings.jpg";
import femaleJewelryWatches from "@/assets/templates/jewelry-watches.jpg";
import femaleGroomingShaving from "@/assets/templates/grooming-shaving.jpg";
import femaleMeasureBody from "@/assets/templates/measure-body.jpg";
import femaleGroomingMakeup from "@/assets/templates/grooming-makeup.jpg";
import femaleShoeHeels from "@/assets/templates/shoe-heels.jpg";
import femaleShoeFlats from "@/assets/templates/shoe-flats.jpg";
import femaleClothingDresses from "@/assets/templates/clothing-dresses.jpg";

// Neutral templates
import neutralShoeSize from "@/assets/templates/neutral/shoe-size.jpg";
import neutralShoeSneakers from "@/assets/templates/neutral/shoe-sneakers.jpg";
import neutralShoeBoots from "@/assets/templates/neutral/shoe-boots.jpg";
import neutralShoeSandals from "@/assets/templates/neutral/shoe-sandals.jpg";
import neutralClothingTops from "@/assets/templates/neutral/clothing-tops.jpg";
import neutralClothingBottoms from "@/assets/templates/neutral/clothing-bottoms.jpg";
import neutralClothingOuterwear from "@/assets/templates/neutral/clothing-outerwear.jpg";
import neutralClothingActivewear from "@/assets/templates/neutral/clothing-activewear.jpg";
import neutralClothingSizes from "@/assets/templates/neutral/clothing-sizes.jpg";
import neutralScents from "@/assets/templates/neutral/scents.jpg";
import neutralScentCologne from "@/assets/templates/neutral/scent-cologne.jpg";
import neutralScentBodycare from "@/assets/templates/neutral/scent-bodycare.jpg";
import neutralGrooming from "@/assets/templates/neutral/grooming.jpg";
import neutralGroomingHair from "@/assets/templates/neutral/grooming-hair.jpg";
import neutralGroomingSkin from "@/assets/templates/neutral/grooming-skin.jpg";
import neutralMeasurements from "@/assets/templates/neutral/measurements.jpg";
import neutralMeasureRing from "@/assets/templates/neutral/measure-ring.jpg";
import neutralFragrances from "@/assets/templates/neutral/fragrances.jpg";
import neutralJewelry from "@/assets/templates/neutral/jewelry.jpg";
import neutralJewelryNecklaces from "@/assets/templates/neutral/jewelry-necklaces.jpg";
import neutralJewelryBracelets from "@/assets/templates/neutral/jewelry-bracelets.jpg";
import neutralJewelryWatches from "@/assets/templates/neutral/jewelry-watches.jpg";

// Gender-neutral templates
import imgCoffeeOrder from "@/assets/templates/coffee-order.jpg";
import imgCoffeeHot from "@/assets/templates/coffee-hot.jpg";
import imgCoffeeIced from "@/assets/templates/coffee-iced.jpg";
import imgCoffeeEspresso from "@/assets/templates/coffee-espresso.jpg";
import imgCoffeeTea from "@/assets/templates/coffee-tea.jpg";
import imgDietaryRestrictions from "@/assets/templates/dietary-restrictions.jpg";
import imgFastFoodOrder from "@/assets/templates/fast-food-order.jpg";
import imgFavoriteMeals from "@/assets/templates/favorite-meals.jpg";
import imgGrocerySpecifics from "@/assets/templates/grocery-specifics.jpg";
import imgGroceryDairy from "@/assets/templates/grocery-dairy.jpg";
import imgGroceryPantry from "@/assets/templates/grocery-pantry.jpg";
import imgGroceryProduce from "@/assets/templates/grocery-produce.jpg";
import imgAnniversaryGifts from "@/assets/templates/anniversary-gifts.jpg";
import imgBirthdayPreferences from "@/assets/templates/birthday-preferences.jpg";
import imgFlowers from "@/assets/templates/flowers.jpg";
import imgFlowersRoses from "@/assets/templates/flowers-roses.jpg";
import imgFlowersTulips from "@/assets/templates/flowers-tulips.jpg";
import imgFlowersSunflowers from "@/assets/templates/flowers-sunflowers.jpg";
import imgFlowersLilies from "@/assets/templates/flowers-lilies.jpg";
import imgWishList from "@/assets/templates/wish-list.jpg";
import imgDateIdeas from "@/assets/templates/date-ideas.jpg";
import imgDateIndoor from "@/assets/templates/date-indoor.jpg";
import imgDateOutdoor from "@/assets/templates/date-outdoor.jpg";
import imgDateRomantic from "@/assets/templates/date-romantic.jpg";
import imgEventsTemplate from "@/assets/templates/events.jpg";
import imgEventConcerts from "@/assets/templates/event-concerts.jpg";
import imgEventSports from "@/assets/templates/event-sports.jpg";
import imgEventTheater from "@/assets/templates/event-theater.jpg";
import imgFavoriteRestaurants from "@/assets/templates/favorite-restaurants.jpg";
import imgTravelPreferences from "@/assets/templates/travel-preferences.jpg";
import imgTravelBeach from "@/assets/templates/travel-beach.jpg";
import imgTravelCity from "@/assets/templates/travel-city.jpg";
import imgTravelMountain from "@/assets/templates/travel-mountain.jpg";
import imgBrandPreferences from "@/assets/templates/brand-preferences.jpg";
import imgLoveLanguage from "@/assets/templates/love-language.jpg";
import imgPetPeeves from "@/assets/templates/pet-peeves.jpg";
import imgSpecificProducts from "@/assets/templates/specific-products.jpg";
import imgScentCandles from "@/assets/templates/scent-candles.jpg";
import imgScentOils from "@/assets/templates/scent-oils.jpg";
import imgScentHome from "@/assets/templates/scent-home.jpg";
import imgFoodAsian from "@/assets/templates/food-asian.jpg";
import imgFoodBurgers from "@/assets/templates/food-burgers.jpg";
import imgFoodChicken from "@/assets/templates/food-chicken.jpg";
import imgFoodMexican from "@/assets/templates/food-mexican.jpg";
import imgFoodPizza from "@/assets/templates/food-pizza.jpg";
import imgMealBreakfast from "@/assets/templates/meal-breakfast.jpg";
import imgMealLunch from "@/assets/templates/meal-lunch.jpg";
import imgMealDinner from "@/assets/templates/meal-dinner.jpg";
import imgMealDessert from "@/assets/templates/meal-dessert.jpg";

// ── Preview / Texture images ──
import bgBoldShapes from "@/assets/previews/bg-bold-shapes.jpg";
import bgCleanLinen from "@/assets/previews/bg-clean-linen.jpg";
import bgGeometric from "@/assets/previews/bg-geometric.jpg";
import bgGrainSpots from "@/assets/previews/bg-grain-spots.jpg";

interface PhotoItem {
  label: string;
  src: string;
  path: string;
}

interface Section {
  title: string;
  photos: PhotoItem[];
}

const sections: Record<string, Section[]> = {
  male: [
    { title: "Styles", photos: [
      { label: "minimal", src: maleMinimal, path: "styles/male/minimal.jpg" },
      { label: "classic", src: maleClassic, path: "styles/male/classic.jpg" },
      { label: "sporty", src: maleSporty, path: "styles/male/sporty.jpg" },
      { label: "trendy", src: maleTrendy, path: "styles/male/trendy.jpg" },
      { label: "edgy", src: maleEdgy, path: "styles/male/edgy.jpg" },
      { label: "boho", src: maleBoho, path: "styles/male/boho.jpg" },
      { label: "luxury", src: maleLuxury, path: "styles/male/luxury.jpg" },
      { label: "laid-back", src: maleLaidBack, path: "styles/male/laid-back.jpg" },
    ]},
    { title: "Categories", photos: [
      { label: "shopping", src: maleShopping, path: "categories/male/shopping.jpg" },
      { label: "style", src: maleStyleCat, path: "categories/male/style.jpg" },
      { label: "food", src: maleFood, path: "categories/male/food.jpg" },
      { label: "gifts", src: maleGifts, path: "categories/male/gifts.jpg" },
      { label: "lifestyle", src: maleLifestyle, path: "categories/male/lifestyle.jpg" },
      { label: "fit", src: maleFitCat, path: "categories/male/fit.jpg" },
    ]},
    { title: "Clothing", photos: [
      { label: "clothing-tops", src: maleClothingTops, path: "templates/male/clothing-tops.jpg" },
      { label: "clothing-bottoms", src: maleClothingBottoms, path: "templates/male/clothing-bottoms.jpg" },
      { label: "clothing-outerwear", src: maleClothingOuterwear, path: "templates/male/clothing-outerwear.jpg" },
      { label: "clothing-activewear", src: maleClothingActivewear, path: "templates/male/clothing-activewear.jpg" },
      { label: "clothing-sizes", src: maleClothingSizes, path: "templates/male/clothing-sizes.jpg" },
    ]},
    { title: "Shoes", photos: [
      { label: "shoe-size", src: maleShoeSize, path: "templates/male/shoe-size.jpg" },
      { label: "shoe-sneakers", src: maleShoeSneakers, path: "templates/male/shoe-sneakers.jpg" },
      { label: "shoe-boots", src: maleShoeBoots, path: "templates/male/shoe-boots.jpg" },
      { label: "shoe-sandals", src: maleShoeSandals, path: "templates/male/shoe-sandals.jpg" },
    ]},
    { title: "Grooming", photos: [
      { label: "grooming", src: maleGrooming, path: "templates/male/grooming.jpg" },
      { label: "grooming-hair", src: maleGroomingHair, path: "templates/male/grooming-hair.jpg" },
      { label: "grooming-skin", src: maleGroomingSkin, path: "templates/male/grooming-skin.jpg" },
    ]},
    { title: "Scents & Fragrances", photos: [
      { label: "scents", src: maleScents, path: "templates/male/scents.jpg" },
      { label: "fragrances", src: maleFragrances, path: "templates/male/fragrances.jpg" },
      { label: "scent-cologne", src: maleScentCologne, path: "templates/male/scent-cologne.jpg" },
      { label: "scent-bodycare", src: maleScentBodycare, path: "templates/male/scent-bodycare.jpg" },
      { label: "scent-candles", src: imgScentCandles, path: "templates/scent-candles.jpg" },
      { label: "scent-oils", src: imgScentOils, path: "templates/scent-oils.jpg" },
      { label: "scent-home", src: imgScentHome, path: "templates/scent-home.jpg" },
    ]},
    { title: "Jewelry", photos: [
      { label: "jewelry", src: maleJewelry, path: "templates/male/jewelry.jpg" },
      { label: "jewelry-necklaces", src: maleJewelryNecklaces, path: "templates/male/jewelry-necklaces.jpg" },
      { label: "jewelry-bracelets", src: maleJewelryBracelets, path: "templates/male/jewelry-bracelets.jpg" },
      { label: "jewelry-watches", src: maleJewelryWatches, path: "templates/male/jewelry-watches.jpg" },
    ]},
    { title: "Measurements", photos: [
      { label: "measurements", src: maleMeasurements, path: "templates/male/measurements.jpg" },
      { label: "measure-ring", src: maleMeasureRing, path: "templates/male/measure-ring.jpg" },
    ]},
    { title: "Stock Photos", photos: [
      { label: "dad-1", src: dad1, path: "stock/dad-1.jpg" },
      { label: "dad-2", src: dad2, path: "stock/dad-2.jpg" },
      { label: "dad-3", src: dad3, path: "stock/dad-3.jpg" },
      { label: "dad-4", src: dad4, path: "stock/dad-4.jpg" },
      { label: "dad-5", src: dad5, path: "stock/dad-5.jpg" },
      { label: "dad-6", src: dad6, path: "stock/dad-6.jpg" },
      { label: "dad-7", src: dad7, path: "stock/dad-7.jpg" },
      { label: "brother-1", src: brother1, path: "stock/brother-1.jpg" },
      { label: "brother-2", src: brother2, path: "stock/brother-2.jpg" },
      { label: "brother-3", src: brother3, path: "stock/brother-3.jpg" },
      { label: "brother-4", src: brother4, path: "stock/brother-4.jpg" },
      { label: "brother-5", src: brother5, path: "stock/brother-5.jpg" },
      { label: "brother-6", src: brother6, path: "stock/brother-6.jpg" },
    ]},
    { title: "Food & Dining", photos: [
      { label: "coffee-order", src: imgCoffeeOrder, path: "templates/coffee-order.jpg" },
      { label: "coffee-hot", src: imgCoffeeHot, path: "templates/coffee-hot.jpg" },
      { label: "coffee-iced", src: imgCoffeeIced, path: "templates/coffee-iced.jpg" },
      { label: "coffee-espresso", src: imgCoffeeEspresso, path: "templates/coffee-espresso.jpg" },
      { label: "coffee-tea", src: imgCoffeeTea, path: "templates/coffee-tea.jpg" },
      { label: "dietary-restrictions", src: imgDietaryRestrictions, path: "templates/dietary-restrictions.jpg" },
      { label: "fast-food-order", src: imgFastFoodOrder, path: "templates/fast-food-order.jpg" },
      { label: "favorite-meals", src: imgFavoriteMeals, path: "templates/favorite-meals.jpg" },
      { label: "favorite-restaurants", src: imgFavoriteRestaurants, path: "templates/favorite-restaurants.jpg" },
      { label: "grocery-specifics", src: imgGrocerySpecifics, path: "templates/grocery-specifics.jpg" },
      { label: "grocery-dairy", src: imgGroceryDairy, path: "templates/grocery-dairy.jpg" },
      { label: "grocery-pantry", src: imgGroceryPantry, path: "templates/grocery-pantry.jpg" },
      { label: "grocery-produce", src: imgGroceryProduce, path: "templates/grocery-produce.jpg" },
      { label: "food-asian", src: imgFoodAsian, path: "templates/food-asian.jpg" },
      { label: "food-burgers", src: imgFoodBurgers, path: "templates/food-burgers.jpg" },
      { label: "food-chicken", src: imgFoodChicken, path: "templates/food-chicken.jpg" },
      { label: "food-mexican", src: imgFoodMexican, path: "templates/food-mexican.jpg" },
      { label: "food-pizza", src: imgFoodPizza, path: "templates/food-pizza.jpg" },
      { label: "meal-breakfast", src: imgMealBreakfast, path: "templates/meal-breakfast.jpg" },
      { label: "meal-lunch", src: imgMealLunch, path: "templates/meal-lunch.jpg" },
      { label: "meal-dinner", src: imgMealDinner, path: "templates/meal-dinner.jpg" },
      { label: "meal-dessert", src: imgMealDessert, path: "templates/meal-dessert.jpg" },
    ]},
    { title: "Date Ideas", photos: [
      { label: "date-ideas", src: imgDateIdeas, path: "templates/date-ideas.jpg" },
      { label: "date-indoor", src: imgDateIndoor, path: "templates/date-indoor.jpg" },
      { label: "date-outdoor", src: imgDateOutdoor, path: "templates/date-outdoor.jpg" },
      { label: "date-romantic", src: imgDateRomantic, path: "templates/date-romantic.jpg" },
    ]},
    { title: "Events", photos: [
      { label: "events", src: imgEventsTemplate, path: "templates/events.jpg" },
      { label: "event-concerts", src: imgEventConcerts, path: "templates/event-concerts.jpg" },
      { label: "event-sports", src: imgEventSports, path: "templates/event-sports.jpg" },
      { label: "event-theater", src: imgEventTheater, path: "templates/event-theater.jpg" },
    ]},
    { title: "Travel", photos: [
      { label: "travel-preferences", src: imgTravelPreferences, path: "templates/travel-preferences.jpg" },
      { label: "travel-beach", src: imgTravelBeach, path: "templates/travel-beach.jpg" },
      { label: "travel-city", src: imgTravelCity, path: "templates/travel-city.jpg" },
      { label: "travel-mountain", src: imgTravelMountain, path: "templates/travel-mountain.jpg" },
    ]},
    { title: "Gifts & Occasions", photos: [
      { label: "anniversary-gifts", src: imgAnniversaryGifts, path: "templates/anniversary-gifts.jpg" },
      { label: "birthday-preferences", src: imgBirthdayPreferences, path: "templates/birthday-preferences.jpg" },
      { label: "flowers", src: imgFlowers, path: "templates/flowers.jpg" },
      { label: "flowers-roses", src: imgFlowersRoses, path: "templates/flowers-roses.jpg" },
      { label: "flowers-tulips", src: imgFlowersTulips, path: "templates/flowers-tulips.jpg" },
      { label: "flowers-sunflowers", src: imgFlowersSunflowers, path: "templates/flowers-sunflowers.jpg" },
      { label: "flowers-lilies", src: imgFlowersLilies, path: "templates/flowers-lilies.jpg" },
      { label: "wish-list", src: imgWishList, path: "templates/wish-list.jpg" },
    ]},
    { title: "Preferences & Lifestyle", photos: [
      { label: "brand-preferences", src: imgBrandPreferences, path: "templates/brand-preferences.jpg" },
      { label: "love-language", src: imgLoveLanguage, path: "templates/love-language.jpg" },
      { label: "pet-peeves", src: imgPetPeeves, path: "templates/pet-peeves.jpg" },
      { label: "specific-products", src: imgSpecificProducts, path: "templates/specific-products.jpg" },
    ]},
    { title: "Gift Style", photos: [
      { label: "practical-gift", src: neutralPracticalGift, path: "styles/practical-gift.jpg" },
      { label: "thoughtful-gift", src: neutralThoughtfulGift, path: "styles/thoughtful-gift.jpg" },
      { label: "luxurious-gift", src: neutralLuxuriousGift, path: "styles/luxurious-gift.jpg" },
      { label: "experience-gift", src: neutralExperienceGift, path: "styles/experience-gift.jpg" },
      { label: "surprise-gift", src: neutralSurpriseGift, path: "styles/surprise-gift.jpg" },
    ]},
  ],

  female: [
    { title: "Styles", photos: [
      { label: "minimal", src: femaleMinimal, path: "styles/female/minimal.jpg" },
      { label: "classic", src: femaleClassic, path: "styles/female/classic.jpg" },
      { label: "sporty", src: femaleSporty, path: "styles/female/sporty.jpg" },
      { label: "trendy", src: femaleTrendy, path: "styles/female/trendy.jpg" },
      { label: "edgy", src: femaleEdgy, path: "styles/female/edgy.jpg" },
      { label: "boho", src: femaleBoho, path: "styles/female/boho.jpg" },
      { label: "luxury", src: femaleLuxury, path: "styles/female/luxury.jpg" },
      { label: "laid-back", src: femaleLaidBack, path: "styles/female/laid-back.jpg" },
    ]},
    { title: "Categories", photos: [
      { label: "shopping", src: femaleShopping, path: "categories/female/shopping.jpg" },
      { label: "style", src: femaleStyleCat, path: "categories/female/style.jpg" },
      { label: "food", src: femaleFood, path: "categories/female/food.jpg" },
      { label: "gifts", src: femaleGifts, path: "categories/female/gifts.jpg" },
      { label: "lifestyle", src: femaleLifestyle, path: "categories/female/lifestyle.jpg" },
      { label: "fit", src: femaleFitCat, path: "categories/female/fit.jpg" },
    ]},
    { title: "Clothing", photos: [
      { label: "clothing-tops", src: femaleClothingTops, path: "templates/clothing-tops.jpg" },
      { label: "clothing-bottoms", src: femaleClothingBottoms, path: "templates/clothing-bottoms.jpg" },
      { label: "clothing-outerwear", src: femaleClothingOuterwear, path: "templates/clothing-outerwear.jpg" },
      { label: "clothing-activewear", src: femaleClothingActivewear, path: "templates/clothing-activewear.jpg" },
      { label: "clothing-dresses", src: femaleClothingDresses, path: "templates/clothing-dresses.jpg" },
      { label: "clothing-sizes", src: femaleClothingSizes, path: "templates/clothing-sizes.jpg" },
    ]},
    { title: "Shoes", photos: [
      { label: "shoe-size", src: femaleShoeSize, path: "templates/shoe-size.jpg" },
      { label: "shoe-sneakers", src: femaleShoeSneakers, path: "templates/shoe-sneakers.jpg" },
      { label: "shoe-boots", src: femaleShoeBoots, path: "templates/shoe-boots.jpg" },
      { label: "shoe-sandals", src: femaleShoeSandals, path: "templates/shoe-sandals.jpg" },
      { label: "shoe-heels", src: femaleShoeHeels, path: "templates/shoe-heels.jpg" },
      { label: "shoe-flats", src: femaleShoeFlats, path: "templates/shoe-flats.jpg" },
    ]},
    { title: "Grooming", photos: [
      { label: "grooming", src: femaleGrooming, path: "templates/grooming.jpg" },
      { label: "grooming-hair", src: femaleGroomingHair, path: "templates/grooming-hair.jpg" },
      { label: "grooming-skin", src: femaleGroomingSkin, path: "templates/grooming-skin.jpg" },
      { label: "grooming-shaving", src: femaleGroomingShaving, path: "templates/grooming-shaving.jpg" },
      { label: "grooming-makeup", src: femaleGroomingMakeup, path: "templates/grooming-makeup.jpg" },
    ]},
    { title: "Scents & Fragrances", photos: [
      { label: "scents", src: femaleScents, path: "templates/scents.jpg" },
      { label: "fragrances", src: femaleFragrances, path: "templates/fragrances.jpg" },
      { label: "scent-perfume", src: femaleScentPerfume, path: "templates/scent-perfume.jpg" },
      { label: "scent-bodycare", src: femaleScentBodycare, path: "templates/scent-bodycare.jpg" },
      { label: "scent-candles", src: imgScentCandles, path: "templates/scent-candles.jpg" },
      { label: "scent-oils", src: imgScentOils, path: "templates/scent-oils.jpg" },
      { label: "scent-home", src: imgScentHome, path: "templates/scent-home.jpg" },
    ]},
    { title: "Jewelry", photos: [
      { label: "jewelry", src: femaleJewelry, path: "templates/jewelry.jpg" },
      { label: "jewelry-necklaces", src: femaleJewelryNecklaces, path: "templates/jewelry-necklaces.jpg" },
      { label: "jewelry-bracelets", src: femaleJewelryBracelets, path: "templates/jewelry-bracelets.jpg" },
      { label: "jewelry-earrings", src: femaleJewelryEarrings, path: "templates/jewelry-earrings.jpg" },
      { label: "jewelry-watches", src: femaleJewelryWatches, path: "templates/jewelry-watches.jpg" },
    ]},
    { title: "Measurements", photos: [
      { label: "measurements", src: femaleMeasurements, path: "templates/measurements.jpg" },
      { label: "measure-ring", src: femaleMeasureRing, path: "templates/measure-ring.jpg" },
      { label: "measure-body", src: femaleMeasureBody, path: "templates/measure-body.jpg" },
    ]},
    { title: "Stock Photos", photos: [
      { label: "mom-1", src: mom1, path: "stock/mom-1.jpg" },
      { label: "mom-2", src: mom2, path: "stock/mom-2.jpg" },
      { label: "mom-3", src: mom3, path: "stock/mom-3.jpg" },
      { label: "mom-4", src: mom4, path: "stock/mom-4.jpg" },
      { label: "mom-5", src: mom5, path: "stock/mom-5.jpg" },
      { label: "mom-6", src: mom6, path: "stock/mom-6.jpg" },
      { label: "sister-1", src: sister1, path: "stock/sister-1.jpg" },
      { label: "sister-2", src: sister2, path: "stock/sister-2.jpg" },
      { label: "sister-3", src: sister3, path: "stock/sister-3.jpg" },
      { label: "sister-4", src: sister4, path: "stock/sister-4.jpg" },
      { label: "sister-5", src: sister5, path: "stock/sister-5.jpg" },
      { label: "sister-6", src: sister6, path: "stock/sister-6.jpg" },
    ]},
    { title: "Food & Dining", photos: [
      { label: "coffee-order", src: imgCoffeeOrder, path: "templates/coffee-order.jpg" },
      { label: "coffee-hot", src: imgCoffeeHot, path: "templates/coffee-hot.jpg" },
      { label: "coffee-iced", src: imgCoffeeIced, path: "templates/coffee-iced.jpg" },
      { label: "coffee-espresso", src: imgCoffeeEspresso, path: "templates/coffee-espresso.jpg" },
      { label: "coffee-tea", src: imgCoffeeTea, path: "templates/coffee-tea.jpg" },
      { label: "dietary-restrictions", src: imgDietaryRestrictions, path: "templates/dietary-restrictions.jpg" },
      { label: "fast-food-order", src: imgFastFoodOrder, path: "templates/fast-food-order.jpg" },
      { label: "favorite-meals", src: imgFavoriteMeals, path: "templates/favorite-meals.jpg" },
      { label: "favorite-restaurants", src: imgFavoriteRestaurants, path: "templates/favorite-restaurants.jpg" },
      { label: "grocery-specifics", src: imgGrocerySpecifics, path: "templates/grocery-specifics.jpg" },
      { label: "grocery-dairy", src: imgGroceryDairy, path: "templates/grocery-dairy.jpg" },
      { label: "grocery-pantry", src: imgGroceryPantry, path: "templates/grocery-pantry.jpg" },
      { label: "grocery-produce", src: imgGroceryProduce, path: "templates/grocery-produce.jpg" },
      { label: "food-asian", src: imgFoodAsian, path: "templates/food-asian.jpg" },
      { label: "food-burgers", src: imgFoodBurgers, path: "templates/food-burgers.jpg" },
      { label: "food-chicken", src: imgFoodChicken, path: "templates/food-chicken.jpg" },
      { label: "food-mexican", src: imgFoodMexican, path: "templates/food-mexican.jpg" },
      { label: "food-pizza", src: imgFoodPizza, path: "templates/food-pizza.jpg" },
      { label: "meal-breakfast", src: imgMealBreakfast, path: "templates/meal-breakfast.jpg" },
      { label: "meal-lunch", src: imgMealLunch, path: "templates/meal-lunch.jpg" },
      { label: "meal-dinner", src: imgMealDinner, path: "templates/meal-dinner.jpg" },
      { label: "meal-dessert", src: imgMealDessert, path: "templates/meal-dessert.jpg" },
    ]},
    { title: "Date Ideas", photos: [
      { label: "date-ideas", src: imgDateIdeas, path: "templates/date-ideas.jpg" },
      { label: "date-indoor", src: imgDateIndoor, path: "templates/date-indoor.jpg" },
      { label: "date-outdoor", src: imgDateOutdoor, path: "templates/date-outdoor.jpg" },
      { label: "date-romantic", src: imgDateRomantic, path: "templates/date-romantic.jpg" },
    ]},
    { title: "Events", photos: [
      { label: "events", src: imgEventsTemplate, path: "templates/events.jpg" },
      { label: "event-concerts", src: imgEventConcerts, path: "templates/event-concerts.jpg" },
      { label: "event-sports", src: imgEventSports, path: "templates/event-sports.jpg" },
      { label: "event-theater", src: imgEventTheater, path: "templates/event-theater.jpg" },
    ]},
    { title: "Travel", photos: [
      { label: "travel-preferences", src: imgTravelPreferences, path: "templates/travel-preferences.jpg" },
      { label: "travel-beach", src: imgTravelBeach, path: "templates/travel-beach.jpg" },
      { label: "travel-city", src: imgTravelCity, path: "templates/travel-city.jpg" },
      { label: "travel-mountain", src: imgTravelMountain, path: "templates/travel-mountain.jpg" },
    ]},
    { title: "Gifts & Occasions", photos: [
      { label: "anniversary-gifts", src: imgAnniversaryGifts, path: "templates/anniversary-gifts.jpg" },
      { label: "birthday-preferences", src: imgBirthdayPreferences, path: "templates/birthday-preferences.jpg" },
      { label: "flowers", src: imgFlowers, path: "templates/flowers.jpg" },
      { label: "flowers-roses", src: imgFlowersRoses, path: "templates/flowers-roses.jpg" },
      { label: "flowers-tulips", src: imgFlowersTulips, path: "templates/flowers-tulips.jpg" },
      { label: "flowers-sunflowers", src: imgFlowersSunflowers, path: "templates/flowers-sunflowers.jpg" },
      { label: "flowers-lilies", src: imgFlowersLilies, path: "templates/flowers-lilies.jpg" },
      { label: "wish-list", src: imgWishList, path: "templates/wish-list.jpg" },
    ]},
    { title: "Preferences & Lifestyle", photos: [
      { label: "brand-preferences", src: imgBrandPreferences, path: "templates/brand-preferences.jpg" },
      { label: "love-language", src: imgLoveLanguage, path: "templates/love-language.jpg" },
      { label: "pet-peeves", src: imgPetPeeves, path: "templates/pet-peeves.jpg" },
      { label: "specific-products", src: imgSpecificProducts, path: "templates/specific-products.jpg" },
    ]},
    { title: "Gift Style", photos: [
      { label: "practical-gift", src: neutralPracticalGift, path: "styles/practical-gift.jpg" },
      { label: "thoughtful-gift", src: neutralThoughtfulGift, path: "styles/thoughtful-gift.jpg" },
      { label: "luxurious-gift", src: neutralLuxuriousGift, path: "styles/luxurious-gift.jpg" },
      { label: "experience-gift", src: neutralExperienceGift, path: "styles/experience-gift.jpg" },
      { label: "surprise-gift", src: neutralSurpriseGift, path: "styles/surprise-gift.jpg" },
    ]},
  ],

  nonbinary: [
    { title: "Styles", photos: [
      { label: "minimal", src: neutralMinimal, path: "styles/minimal.jpg" },
      { label: "classic", src: neutralClassic, path: "styles/classic.jpg" },
      { label: "sporty", src: neutralSporty, path: "styles/sporty.jpg" },
      { label: "trendy", src: neutralTrendy, path: "styles/trendy.jpg" },
      { label: "edgy", src: neutralEdgy, path: "styles/edgy.jpg" },
      { label: "boho", src: neutralBoho, path: "styles/boho.jpg" },
      { label: "luxury", src: neutralLuxury, path: "styles/luxury.jpg" },
      { label: "laid-back", src: neutralLaidBack, path: "styles/laid-back.jpg" },
      { label: "polished", src: neutralPolished, path: "styles/polished.jpg" },
      { label: "casual", src: neutralCasual, path: "styles/casual.jpg" },
      { label: "creative", src: neutralCreative, path: "styles/creative.jpg" },
      { label: "professional", src: neutralProfessional, path: "styles/professional.jpg" },
      { label: "chill", src: neutralChill, path: "styles/chill.jpg" },
      { label: "hippy", src: neutralHippy, path: "styles/hippy.jpg" },
      { label: "preppy", src: neutralPreppy, path: "styles/preppy.jpg" },
      { label: "street", src: neutralStreet, path: "styles/street.jpg" },
      { label: "elegant", src: neutralElegant, path: "styles/elegant.jpg" },
      { label: "bougie", src: neutralBougie, path: "styles/bougie.jpg" },
      { label: "timeless", src: neutralTimeless, path: "styles/timeless.jpg" },
    ]},
    { title: "Lifestyle Preferences", photos: [
      { label: "budget", src: neutralBudget, path: "styles/budget.jpg" },
      { label: "balanced", src: neutralBalanced, path: "styles/balanced.jpg" },
      { label: "quality", src: neutralQuality, path: "styles/quality.jpg" },
      { label: "comfort", src: neutralComfort, path: "styles/comfort.jpg" },
      { label: "fit", src: neutralFit, path: "styles/fit.jpg" },
      { label: "brand", src: neutralBrand, path: "styles/brand.jpg" },
      { label: "price", src: neutralPrice, path: "styles/price.jpg" },
      { label: "dining", src: neutralDining, path: "styles/dining.jpg" },
      { label: "traveling", src: neutralTraveling, path: "styles/traveling.jpg" },
      { label: "outdoors", src: neutralOutdoors, path: "styles/outdoors.jpg" },
      { label: "events", src: neutralEvents, path: "styles/events.jpg" },
      { label: "staying-in", src: neutralStayingIn, path: "styles/staying-in.jpg" },
      { label: "fitness", src: neutralFitness, path: "styles/fitness.jpg" },
    ]},
    { title: "Clothing", photos: [
      { label: "clothing-tops", src: neutralClothingTops, path: "templates/neutral/clothing-tops.jpg" },
      { label: "clothing-bottoms", src: neutralClothingBottoms, path: "templates/neutral/clothing-bottoms.jpg" },
      { label: "clothing-outerwear", src: neutralClothingOuterwear, path: "templates/neutral/clothing-outerwear.jpg" },
      { label: "clothing-activewear", src: neutralClothingActivewear, path: "templates/neutral/clothing-activewear.jpg" },
      { label: "clothing-sizes", src: neutralClothingSizes, path: "templates/neutral/clothing-sizes.jpg" },
    ]},
    { title: "Shoes", photos: [
      { label: "shoe-size", src: neutralShoeSize, path: "templates/neutral/shoe-size.jpg" },
      { label: "shoe-sneakers", src: neutralShoeSneakers, path: "templates/neutral/shoe-sneakers.jpg" },
      { label: "shoe-boots", src: neutralShoeBoots, path: "templates/neutral/shoe-boots.jpg" },
      { label: "shoe-sandals", src: neutralShoeSandals, path: "templates/neutral/shoe-sandals.jpg" },
    ]},
    { title: "Grooming", photos: [
      { label: "grooming", src: neutralGrooming, path: "templates/neutral/grooming.jpg" },
      { label: "grooming-hair", src: neutralGroomingHair, path: "templates/neutral/grooming-hair.jpg" },
      { label: "grooming-skin", src: neutralGroomingSkin, path: "templates/neutral/grooming-skin.jpg" },
    ]},
    { title: "Scents & Fragrances", photos: [
      { label: "scents", src: neutralScents, path: "templates/neutral/scents.jpg" },
      { label: "fragrances", src: neutralFragrances, path: "templates/neutral/fragrances.jpg" },
      { label: "scent-cologne", src: neutralScentCologne, path: "templates/neutral/scent-cologne.jpg" },
      { label: "scent-bodycare", src: neutralScentBodycare, path: "templates/neutral/scent-bodycare.jpg" },
      { label: "scent-candles", src: imgScentCandles, path: "templates/scent-candles.jpg" },
      { label: "scent-oils", src: imgScentOils, path: "templates/scent-oils.jpg" },
      { label: "scent-home", src: imgScentHome, path: "templates/scent-home.jpg" },
    ]},
    { title: "Jewelry", photos: [
      { label: "jewelry", src: neutralJewelry, path: "templates/neutral/jewelry.jpg" },
      { label: "jewelry-necklaces", src: neutralJewelryNecklaces, path: "templates/neutral/jewelry-necklaces.jpg" },
      { label: "jewelry-bracelets", src: neutralJewelryBracelets, path: "templates/neutral/jewelry-bracelets.jpg" },
      { label: "jewelry-watches", src: neutralJewelryWatches, path: "templates/neutral/jewelry-watches.jpg" },
    ]},
    { title: "Measurements", photos: [
      { label: "measurements", src: neutralMeasurements, path: "templates/neutral/measurements.jpg" },
      { label: "measure-ring", src: neutralMeasureRing, path: "templates/neutral/measure-ring.jpg" },
    ]},
    { title: "Stock Photos", photos: [
      { label: "partner-1", src: partner1, path: "stock/partner-1.jpg" },
      { label: "partner-2", src: partner2, path: "stock/partner-2.jpg" },
      { label: "partner-3", src: partner3, path: "stock/partner-3.jpg" },
      { label: "partner-4", src: partner4, path: "stock/partner-4.jpg" },
      { label: "partner-5", src: partner5, path: "stock/partner-5.jpg" },
      { label: "partner-6", src: partner6, path: "stock/partner-6.jpg" },
      { label: "partner-7", src: partner7, path: "stock/partner-7.jpg" },
      { label: "friend-1", src: friend1, path: "stock/friend-1.jpg" },
      { label: "friend-2", src: friend2, path: "stock/friend-2.jpg" },
      { label: "friend-3", src: friend3, path: "stock/friend-3.jpg" },
      { label: "friend-4", src: friend4, path: "stock/friend-4.jpg" },
      { label: "friend-5", src: friend5, path: "stock/friend-5.jpg" },
      { label: "coworker-1", src: coworker1, path: "stock/coworker-1.jpg" },
      { label: "coworker-2", src: coworker2, path: "stock/coworker-2.jpg" },
      { label: "coworker-3", src: coworker3, path: "stock/coworker-3.jpg" },
      { label: "coworker-4", src: coworker4, path: "stock/coworker-4.jpg" },
    ]},
    { title: "Food & Dining", photos: [
      { label: "coffee-order", src: imgCoffeeOrder, path: "templates/coffee-order.jpg" },
      { label: "coffee-hot", src: imgCoffeeHot, path: "templates/coffee-hot.jpg" },
      { label: "coffee-iced", src: imgCoffeeIced, path: "templates/coffee-iced.jpg" },
      { label: "coffee-espresso", src: imgCoffeeEspresso, path: "templates/coffee-espresso.jpg" },
      { label: "coffee-tea", src: imgCoffeeTea, path: "templates/coffee-tea.jpg" },
      { label: "dietary-restrictions", src: imgDietaryRestrictions, path: "templates/dietary-restrictions.jpg" },
      { label: "fast-food-order", src: imgFastFoodOrder, path: "templates/fast-food-order.jpg" },
      { label: "favorite-meals", src: imgFavoriteMeals, path: "templates/favorite-meals.jpg" },
      { label: "favorite-restaurants", src: imgFavoriteRestaurants, path: "templates/favorite-restaurants.jpg" },
      { label: "grocery-specifics", src: imgGrocerySpecifics, path: "templates/grocery-specifics.jpg" },
      { label: "grocery-dairy", src: imgGroceryDairy, path: "templates/grocery-dairy.jpg" },
      { label: "grocery-pantry", src: imgGroceryPantry, path: "templates/grocery-pantry.jpg" },
      { label: "grocery-produce", src: imgGroceryProduce, path: "templates/grocery-produce.jpg" },
      { label: "food-asian", src: imgFoodAsian, path: "templates/food-asian.jpg" },
      { label: "food-burgers", src: imgFoodBurgers, path: "templates/food-burgers.jpg" },
      { label: "food-chicken", src: imgFoodChicken, path: "templates/food-chicken.jpg" },
      { label: "food-mexican", src: imgFoodMexican, path: "templates/food-mexican.jpg" },
      { label: "food-pizza", src: imgFoodPizza, path: "templates/food-pizza.jpg" },
      { label: "meal-breakfast", src: imgMealBreakfast, path: "templates/meal-breakfast.jpg" },
      { label: "meal-lunch", src: imgMealLunch, path: "templates/meal-lunch.jpg" },
      { label: "meal-dinner", src: imgMealDinner, path: "templates/meal-dinner.jpg" },
      { label: "meal-dessert", src: imgMealDessert, path: "templates/meal-dessert.jpg" },
    ]},
    { title: "Date Ideas", photos: [
      { label: "date-ideas", src: imgDateIdeas, path: "templates/date-ideas.jpg" },
      { label: "date-indoor", src: imgDateIndoor, path: "templates/date-indoor.jpg" },
      { label: "date-outdoor", src: imgDateOutdoor, path: "templates/date-outdoor.jpg" },
      { label: "date-romantic", src: imgDateRomantic, path: "templates/date-romantic.jpg" },
    ]},
    { title: "Events", photos: [
      { label: "events", src: imgEventsTemplate, path: "templates/events.jpg" },
      { label: "event-concerts", src: imgEventConcerts, path: "templates/event-concerts.jpg" },
      { label: "event-sports", src: imgEventSports, path: "templates/event-sports.jpg" },
      { label: "event-theater", src: imgEventTheater, path: "templates/event-theater.jpg" },
    ]},
    { title: "Travel", photos: [
      { label: "travel-preferences", src: imgTravelPreferences, path: "templates/travel-preferences.jpg" },
      { label: "travel-beach", src: imgTravelBeach, path: "templates/travel-beach.jpg" },
      { label: "travel-city", src: imgTravelCity, path: "templates/travel-city.jpg" },
      { label: "travel-mountain", src: imgTravelMountain, path: "templates/travel-mountain.jpg" },
    ]},
    { title: "Gifts & Occasions", photos: [
      { label: "anniversary-gifts", src: imgAnniversaryGifts, path: "templates/anniversary-gifts.jpg" },
      { label: "birthday-preferences", src: imgBirthdayPreferences, path: "templates/birthday-preferences.jpg" },
      { label: "flowers", src: imgFlowers, path: "templates/flowers.jpg" },
      { label: "flowers-roses", src: imgFlowersRoses, path: "templates/flowers-roses.jpg" },
      { label: "flowers-tulips", src: imgFlowersTulips, path: "templates/flowers-tulips.jpg" },
      { label: "flowers-sunflowers", src: imgFlowersSunflowers, path: "templates/flowers-sunflowers.jpg" },
      { label: "flowers-lilies", src: imgFlowersLilies, path: "templates/flowers-lilies.jpg" },
      { label: "wish-list", src: imgWishList, path: "templates/wish-list.jpg" },
    ]},
    { title: "Preferences & Lifestyle", photos: [
      { label: "brand-preferences", src: imgBrandPreferences, path: "templates/brand-preferences.jpg" },
      { label: "love-language", src: imgLoveLanguage, path: "templates/love-language.jpg" },
      { label: "pet-peeves", src: imgPetPeeves, path: "templates/pet-peeves.jpg" },
      { label: "specific-products", src: imgSpecificProducts, path: "templates/specific-products.jpg" },
    ]},
    { title: "Gift Style", photos: [
      { label: "practical-gift", src: neutralPracticalGift, path: "styles/practical-gift.jpg" },
      { label: "thoughtful-gift", src: neutralThoughtfulGift, path: "styles/thoughtful-gift.jpg" },
      { label: "luxurious-gift", src: neutralLuxuriousGift, path: "styles/luxurious-gift.jpg" },
      { label: "experience-gift", src: neutralExperienceGift, path: "styles/experience-gift.jpg" },
      { label: "surprise-gift", src: neutralSurpriseGift, path: "styles/surprise-gift.jpg" },
    ]},
  ],

  shared: [
    { title: "Dashboard Quick Actions", photos: [
      { label: "quick-gift-ideas", src: quickGiftIdeas, path: "dashboard/quick-gift-ideas.jpg" },
      { label: "quick-saved-items", src: quickSavedItems, path: "dashboard/quick-saved-items.jpg" },
      { label: "quick-their-brands", src: quickTheirBrands, path: "dashboard/quick-their-brands.jpg" },
      { label: "quick-their-sizes", src: quickTheirSizes, path: "dashboard/quick-their-sizes.jpg" },
    ]},
    { title: "Occasions", photos: [
      { label: "anniversaries", src: anniversaries, path: "stock/anniversaries.jpg" },
      { label: "birthdays", src: birthdays, path: "stock/birthdays.jpg" },
      { label: "date-nights", src: dateNights, path: "stock/date-nights.jpg" },
      { label: "first-date", src: firstDate, path: "stock/first-date.jpg" },
      { label: "holidays", src: holidays, path: "stock/holidays.jpg" },
      { label: "just-because", src: justBecause, path: "stock/just-because.jpg" },
      { label: "new-lists", src: newLists, path: "stock/new-lists.jpg" },
      { label: "trips", src: trips, path: "stock/trips.jpg" },
      { label: "updated-cards", src: updatedCards, path: "stock/updated-cards.jpg" },
      { label: "valentines", src: valentines, path: "stock/valentines.jpg" },
    ]},
    { title: "Background Textures", photos: [
      { label: "bg-bold-shapes", src: bgBoldShapes, path: "previews/bg-bold-shapes.jpg" },
      { label: "bg-clean-linen", src: bgCleanLinen, path: "previews/bg-clean-linen.jpg" },
      { label: "bg-geometric", src: bgGeometric, path: "previews/bg-geometric.jpg" },
      { label: "bg-grain-spots", src: bgGrainSpots, path: "previews/bg-grain-spots.jpg" },
    ]},
  ],
};

const tabLabels: Record<string, string> = {
  male: "Male",
  female: "Female",
  nonbinary: "Non-Binary",
  shared: "Shared",
};

export default function PhotoGallery() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleted, setDeleted] = useState<Set<string>>(new Set());
  const [expandedImage, setExpandedImage] = useState<PhotoItem | null>(null);
  const [showDeletedList, setShowDeletedList] = useState(false);

  const toggleSelect = (path: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const markDeleted = (paths: string[]) => {
    setDeleted((prev) => {
      const next = new Set(prev);
      paths.forEach((p) => {
        next.add(p);
        console.info(`[PHOTO_DELETE_REQUEST] src/assets/${p}`);
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("photoGalleryDeleteQueue", JSON.stringify(Array.from(next)));
      }

      return next;
    });

    // Also remove from selected
    setSelected((prev) => {
      const next = new Set(prev);
      paths.forEach((p) => next.delete(p));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Photo Gallery</h1>
            <p className="text-xs text-muted-foreground">
              {selected.size > 0
                ? `${selected.size} selected`
                : deleted.size > 0
                ? `${deleted.size} photo(s) marked for deletion`
                : "Click photos to select • Review your entire image bank"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {deleted.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-destructive text-destructive"
              onClick={() => setShowDeletedList(!showDeletedList)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              View Deleted ({deleted.size})
            </Button>
          )}
          {selected.size > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelected(new Set())}
              >
                Clear
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="gap-1.5"
                onClick={() => markDeleted(Array.from(selected))}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete ({selected.size})
              </Button>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  const paths = Array.from(selected).join("\n• ");
                  alert(`🔄 Photos marked for replacement:\n\n• ${paths}\n\nTell Lovable what style you want for these photos!`);
                }}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Replace ({selected.size})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Deleted photos summary panel */}
      {showDeletedList && deleted.size > 0 && (
        <div className="mx-4 mt-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-destructive">Photos to Delete ({deleted.size})</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDeleted(new Set());
                  setShowDeletedList(false);
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("photoGalleryDeleteQueue");
                  }
                }}
              >
                Undo All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const text = Array.from(deleted)
                    .map((p) => `src/assets/${p}`)
                    .join("\n");
                  const fullText = `Delete these files:\n${text}`;
                  try {
                    navigator.clipboard.writeText(fullText);
                    alert("Copied! Paste in chat and I'll delete them from the codebase.");
                  } catch {
                    // Clipboard blocked in iframe — show in a prompt for manual copy
                    prompt("Copy this list and paste it in chat:", fullText);
                  }
                }}
              >
                Copy List
              </Button>
            </div>
          </div>
          <div className="max-h-40 space-y-0.5 overflow-y-auto text-xs text-muted-foreground">
            {Array.from(deleted).map((p) => (
              <div key={p} className="group flex items-center justify-between">
                <span>src/assets/{p}</span>
                <button
                  className="text-xs text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    setDeleted((prev) => {
                      const next = new Set(prev);
                      next.delete(p);
                      if (typeof window !== "undefined") {
                        localStorage.setItem("photoGalleryDeleteQueue", JSON.stringify(Array.from(next)));
                      }
                      return next;
                    })
                  }
                >
                  undo
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setExpandedImage(null)}
        >
          <div className="max-w-3xl max-h-[85vh] relative">
            <img
              src={expandedImage.src}
              alt={expandedImage.label}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-3">
              <p className="text-white font-medium">{expandedImage.label}</p>
              <p className="text-white/60 text-xs">src/assets/{expandedImage.path}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="p-4">
        <Tabs defaultValue="male">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            {Object.keys(sections).map((key) => (
              <TabsTrigger key={key} value={key} className="text-xs px-3 py-1.5">
                {tabLabels[key]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(sections).map(([key, sects]) => (
            <TabsContent key={key} value={key} className="mt-4 space-y-8">
              {sects.map((section) => {
                const visiblePhotos = section.photos.filter((photo) => !deleted.has(photo.path));

                if (visiblePhotos.length === 0) {
                  return null;
                }

                return (
                  <div key={section.title}>
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      {section.title}
                      <span className="text-xs font-normal text-muted-foreground">
                        ({visiblePhotos.length}/{section.photos.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                      {visiblePhotos.map((photo) => {
                        const isSelected = selected.has(photo.path);
                        return (
                          <div
                            key={photo.path}
                            className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                              isSelected
                                ? "border-primary ring-2 ring-primary/30"
                                : "border-transparent hover:border-muted-foreground/20"
                            }`}
                          >
                            <div className="aspect-square">
                              <img
                                src={photo.src}
                                alt={photo.label}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                onClick={() => setExpandedImage(photo)}
                              />
                            </div>
                            {/* Select checkbox overlay */}
                            <button
                              className={`absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] transition-all ${
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground/40 bg-background/80 opacity-0 group-hover:opacity-100"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelect(photo.path);
                              }}
                            >
                              {isSelected && "✓"}
                            </button>
                            {/* Delete button */}
                            <button
                              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-all hover:scale-110 group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                markDeleted([photo.path]);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                            {/* Label */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1 pt-4">
                              <p className="truncate text-[10px] text-white">{photo.label}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
