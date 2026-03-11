/**
 * Centralized gender-aware image resolver for ALL template images.
 * Three distinct banks: male, female, non-binary (neutral/product-focused).
 * 
 * Rules:
 * - Male: masculine product imagery (men's shoes, cologne, etc.)
 * - Female: feminine product imagery (heels, perfume, dresses, etc.)
 * - Non-binary / prefer-not: neutral, product-focused imagery (the default imports)
 */

// ── Male product images ──
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

// ── Default / Neutral / Female images (existing) ──
import imgClothingSizes from "@/assets/templates/clothing-sizes.jpg";
import imgShoeSize from "@/assets/templates/shoe-size.jpg";
import imgScents from "@/assets/templates/scents.jpg";
import imgGrooming from "@/assets/templates/grooming.jpg";
import imgMeasurements from "@/assets/templates/measurements.jpg";
import imgCoffeeOrder from "@/assets/templates/coffee-order.jpg";
import imgDietaryRestrictions from "@/assets/templates/dietary-restrictions.jpg";
import imgFastFoodOrder from "@/assets/templates/fast-food-order.jpg";
import imgFavoriteMeals from "@/assets/templates/favorite-meals.jpg";
import imgGrocerySpecifics from "@/assets/templates/grocery-specifics.jpg";
import imgAnniversaryGifts from "@/assets/templates/anniversary-gifts.jpg";
import imgBirthdayPreferences from "@/assets/templates/birthday-preferences.jpg";
import imgFlowers from "@/assets/templates/flowers.jpg";
import imgFragrances from "@/assets/templates/fragrances.jpg";
import imgJewelry from "@/assets/templates/jewelry.jpg";
import imgWishList from "@/assets/templates/wish-list.jpg";
import imgDateIdeas from "@/assets/templates/date-ideas.jpg";
import imgEvents from "@/assets/templates/events.jpg";
import imgFavoriteRestaurants from "@/assets/templates/favorite-restaurants.jpg";
import imgTravelPreferences from "@/assets/templates/travel-preferences.jpg";
import imgBrandPreferences from "@/assets/templates/brand-preferences.jpg";
import imgLoveLanguage from "@/assets/templates/love-language.jpg";
import imgPetPeeves from "@/assets/templates/pet-peeves.jpg";
import imgSpecificProducts from "@/assets/templates/specific-products.jpg";

// Product-level neutral images
import imgClothingTops from "@/assets/templates/clothing-tops.jpg";
import imgClothingBottoms from "@/assets/templates/clothing-bottoms.jpg";
import imgClothingOuterwear from "@/assets/templates/clothing-outerwear.jpg";
import imgClothingActivewear from "@/assets/templates/clothing-activewear.jpg";
import imgShoeSneakers from "@/assets/templates/shoe-sneakers.jpg";
import imgShoeBoots from "@/assets/templates/shoe-boots.jpg";
import imgShoeSandals from "@/assets/templates/shoe-sandals.jpg";
import imgScentPerfume from "@/assets/templates/scent-perfume.jpg";
import imgScentCandles from "@/assets/templates/scent-candles.jpg";
import imgScentBodycare from "@/assets/templates/scent-bodycare.jpg";
import imgScentOils from "@/assets/templates/scent-oils.jpg";
import imgScentHome from "@/assets/templates/scent-home.jpg";
import imgGroomingHair from "@/assets/templates/grooming-hair.jpg";
import imgGroomingSkin from "@/assets/templates/grooming-skin.jpg";
import imgGroomingShaving from "@/assets/templates/grooming-shaving.jpg";
import imgMeasureBody from "@/assets/templates/measure-body.jpg";
import imgMeasureRing from "@/assets/templates/measure-ring.jpg";
import imgJewelryNecklaces from "@/assets/templates/jewelry-necklaces.jpg";
import imgJewelryBracelets from "@/assets/templates/jewelry-bracelets.jpg";
import imgJewelryEarrings from "@/assets/templates/jewelry-earrings.jpg";
import imgJewelryWatches from "@/assets/templates/jewelry-watches.jpg";

type Gender = string; // "male" | "female" | "non-binary" | "prefer-not"

function isMale(gender: Gender): boolean {
  return gender === "male";
}

// ── Top-level template card images ──
// Maps template name → { male, female/neutral }
const templateImages: Record<string, { male: string; neutral: string }> = {
  "Clothing Sizes":      { male: maleClothingSizes, neutral: imgClothingSizes },
  "Shoe Size":           { male: maleShoeSize, neutral: imgShoeSize },
  "Scents":              { male: maleScents, neutral: imgScents },
  "Grooming":            { male: maleGrooming, neutral: imgGrooming },
  "Measurements":        { male: maleMeasurements, neutral: imgMeasurements },
  "Fragrances":          { male: maleFragrances, neutral: imgFragrances },
  "Jewelry":             { male: maleJewelry, neutral: imgJewelry },
  // Gender-neutral templates (food, experiences, etc.) – same for everyone
  "Coffee Order":        { male: imgCoffeeOrder, neutral: imgCoffeeOrder },
  "Dietary Restrictions": { male: imgDietaryRestrictions, neutral: imgDietaryRestrictions },
  "Fast Food Order":     { male: imgFastFoodOrder, neutral: imgFastFoodOrder },
  "Favorite Meals":      { male: imgFavoriteMeals, neutral: imgFavoriteMeals },
  "Grocery Specifics":   { male: imgGrocerySpecifics, neutral: imgGrocerySpecifics },
  "Anniversary Gifts":   { male: imgAnniversaryGifts, neutral: imgAnniversaryGifts },
  "Birthday Preferences": { male: imgBirthdayPreferences, neutral: imgBirthdayPreferences },
  "Flowers":             { male: imgFlowers, neutral: imgFlowers },
  "Wish List Items":     { male: imgWishList, neutral: imgWishList },
  "Date Ideas":          { male: imgDateIdeas, neutral: imgDateIdeas },
  "Events":              { male: imgEvents, neutral: imgEvents },
  "Favorite Restaurants": { male: imgFavoriteRestaurants, neutral: imgFavoriteRestaurants },
  "Travel Preferences":  { male: imgTravelPreferences, neutral: imgTravelPreferences },
  "Brand Preferences":   { male: imgBrandPreferences, neutral: imgBrandPreferences },
  "Love Language":       { male: imgLoveLanguage, neutral: imgLoveLanguage },
  "Pet Peeves":          { male: imgPetPeeves, neutral: imgPetPeeves },
  "Specific Product Versions": { male: imgSpecificProducts, neutral: imgSpecificProducts },
};

// ── Product-level images ──
// Maps product/subcategory ID → { male, neutral }
const productImages: Record<string, { male: string; neutral: string }> = {
  // Shoe products
  "sneakers":       { male: maleShoeSneakers, neutral: imgShoeSneakers },
  "boots":          { male: maleShoeBoots, neutral: imgShoeBoots },
  "sandals":        { male: maleShoeSandals, neutral: imgShoeSandals },
  // Clothing products
  "tops":           { male: maleClothingTops, neutral: imgClothingTops },
  "bottoms":        { male: maleClothingBottoms, neutral: imgClothingBottoms },
  "outerwear":      { male: maleClothingOuterwear, neutral: imgClothingOuterwear },
  "activewear":     { male: maleClothingActivewear, neutral: imgClothingActivewear },
  // Scent products
  "cologne":        { male: maleScentCologne, neutral: maleScentCologne },
  "candle":         { male: imgScentCandles, neutral: imgScentCandles },
  "body-lotion":    { male: maleScentBodycare, neutral: imgScentBodycare },
  "body-wash":      { male: maleScentBodycare, neutral: imgScentBodycare },
  "essential-oil":  { male: imgScentOils, neutral: imgScentOils },
  "room-spray":     { male: imgScentHome, neutral: imgScentHome },
  // Grooming subcategories
  "hair-care":      { male: maleGroomingHair, neutral: imgGroomingHair },
  "skin-care":      { male: maleGroomingSkin, neutral: imgGroomingSkin },
  "shaving":        { male: imgGroomingShaving, neutral: imgGroomingShaving },
  // Grooming products
  "shampoo":        { male: maleGroomingHair, neutral: imgGroomingHair },
  "conditioner":    { male: maleGroomingHair, neutral: imgGroomingHair },
  "hair-styling":   { male: maleGroomingHair, neutral: imgGroomingHair },
  "moisturizer":    { male: maleGroomingSkin, neutral: imgGroomingSkin },
  "cleanser":       { male: maleGroomingSkin, neutral: imgGroomingSkin },
  "sunscreen":      { male: maleGroomingSkin, neutral: imgGroomingSkin },
  "razor":          { male: imgGroomingShaving, neutral: imgGroomingShaving },
  "shaving-cream":  { male: imgGroomingShaving, neutral: imgGroomingShaving },
  "aftershave":     { male: imgGroomingShaving, neutral: imgGroomingShaving },
  "pre-shave":      { male: imgGroomingShaving, neutral: imgGroomingShaving },
  // Measurements
  "body":           { male: imgMeasureBody, neutral: imgMeasureBody },
  "ring":           { male: maleMeasureRing, neutral: imgMeasureRing },
  // Jewelry
  "necklaces":      { male: maleJewelryNecklaces, neutral: imgJewelryNecklaces },
  "bracelets":      { male: maleJewelryBracelets, neutral: imgJewelryBracelets },
  "earrings":       { male: imgJewelryEarrings, neutral: imgJewelryEarrings },
  "watches":        { male: maleJewelryWatches, neutral: imgJewelryWatches },
  // Fragrance products
  "daily-fragrance":   { male: maleScentCologne, neutral: imgScentPerfume },
  "evening-fragrance": { male: maleScentCologne, neutral: imgScentPerfume },
  "body-mist":         { male: maleScentBodycare, neutral: imgScentBodycare },
  "fragrance-oil":     { male: imgScentOils, neutral: imgScentOils },
};

/**
 * Get the correct template card image based on gender.
 */
export function getTemplateImage(templateName: string, gender: Gender): string {
  const entry = templateImages[templateName];
  if (!entry) return "";
  return isMale(gender) ? entry.male : entry.neutral;
}

/**
 * Get the correct product/subcategory image based on gender.
 * Falls back to the provided default if no override exists.
 */
export function getProductImage(productId: string, gender: Gender, fallback: string): string {
  const entry = productImages[productId];
  if (!entry) return fallback;
  return isMale(gender) ? entry.male : entry.neutral;
}
