/**
 * Centralized gender-aware image resolver for ALL template images.
 * Three distinct banks: male, female, non-binary (neutral/product-focused).
 *
 * Rules:
 * - Male: masculine product imagery (men's shoes, cologne, etc.)
 * - Female: feminine product imagery (heels, perfume, dresses, makeup, etc.)
 * - Non-binary / prefer-not / unset: neutral, product-focused imagery
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

// ── Female images (existing defaults – feminine-coded) ──
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

// ── Non-binary / Neutral images (product-focused, no gender coding) ──
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

// ── Gender-neutral templates (same for everyone) ──
import imgCoffeeOrder from "@/assets/templates/coffee-order.jpg";
import imgDietaryRestrictions from "@/assets/templates/dietary-restrictions.jpg";
import imgFastFoodOrder from "@/assets/templates/fast-food-order.jpg";
import imgFavoriteMeals from "@/assets/templates/favorite-meals.jpg";
import imgGrocerySpecifics from "@/assets/templates/grocery-specifics.jpg";
import imgAnniversaryGifts from "@/assets/templates/anniversary-gifts.jpg";
import imgBirthdayPreferences from "@/assets/templates/birthday-preferences.jpg";
import imgFlowers from "@/assets/templates/flowers.jpg";
import imgWishList from "@/assets/templates/wish-list.jpg";
import imgDateIdeas from "@/assets/templates/date-ideas.jpg";
import imgEvents from "@/assets/templates/events.jpg";
import imgFavoriteRestaurants from "@/assets/templates/favorite-restaurants.jpg";
import imgTravelPreferences from "@/assets/templates/travel-preferences.jpg";
import imgBrandPreferences from "@/assets/templates/love-language.jpg";
import imgLoveLanguage from "@/assets/templates/love-language.jpg";
import imgPetPeeves from "@/assets/templates/pet-peeves.jpg";
import imgSpecificProducts from "@/assets/templates/wish-list.jpg";

// Shared neutral product images (same for all genders)
import imgScentCandles from "@/assets/templates/scent-candles.jpg";
import imgScentOils from "@/assets/templates/scent-oils.jpg";
import imgScentHome from "@/assets/templates/scent-home.jpg";

type Gender = string; // "male" | "female" | "non-binary" | "prefer-not" | "neutral"

interface ImageBank {
  male: string;
  female: string;
  neutral: string;
}

function resolveGender(gender: Gender): "male" | "female" | "neutral" {
  if (gender === "male") return "male";
  if (gender === "female") return "female";
  return "neutral"; // non-binary, prefer-not, unset, etc.
}

function same(img: string): ImageBank {
  return { male: img, female: img, neutral: img };
}

// ── Top-level template card images ──
const templateImages: Record<string, ImageBank> = {
  "Clothing Sizes":      { male: maleClothingSizes, female: femaleClothingSizes, neutral: neutralClothingSizes },
  "Shoe Size":           { male: maleShoeSize, female: femaleShoeSize, neutral: neutralShoeSize },
  "Scents":              { male: maleScents, female: femaleScents, neutral: neutralScents },
  "Grooming":            { male: maleGrooming, female: femaleGrooming, neutral: neutralGrooming },
  "Measurements":        { male: maleMeasurements, female: femaleMeasurements, neutral: neutralMeasurements },
  "Fragrances":          { male: maleFragrances, female: femaleFragrances, neutral: neutralFragrances },
  "Jewelry":             { male: maleJewelry, female: femaleJewelry, neutral: neutralJewelry },
  // Gender-neutral templates – same for everyone
  "Coffee Order":        same(imgCoffeeOrder),
  "Dietary Restrictions": same(imgDietaryRestrictions),
  "Fast Food Order":     same(imgFastFoodOrder),
  "Favorite Meals":      same(imgFavoriteMeals),
  "Grocery Specifics":   same(imgGrocerySpecifics),
  "Anniversary Gifts":   same(imgAnniversaryGifts),
  "Birthday Preferences": same(imgBirthdayPreferences),
  "Flowers":             same(imgFlowers),
  "Wish List Items":     same(imgWishList),
  "Date Ideas":          same(imgDateIdeas),
  "Events":              same(imgEvents),
  "Favorite Restaurants": same(imgFavoriteRestaurants),
  "Travel Preferences":  same(imgTravelPreferences),
  "Brand Preferences":   same(imgBrandPreferences),
  "Love Language":       same(imgLoveLanguage),
  "Pet Peeves":          same(imgPetPeeves),
  "Specific Product Versions": same(imgSpecificProducts),
};

// ── Product-level images ──
const productImages: Record<string, ImageBank> = {
  // Shoes
  "sneakers":       { male: maleShoeSneakers, female: femaleShoeSneakers, neutral: neutralShoeSneakers },
  "boots":          { male: maleShoeBoots, female: femaleShoeBoots, neutral: neutralShoeBoots },
  "sandals":        { male: maleShoeSandals, female: femaleShoeSandals, neutral: neutralShoeSandals },
  // Clothing
  "tops":           { male: maleClothingTops, female: femaleClothingTops, neutral: neutralClothingTops },
  "bottoms":        { male: maleClothingBottoms, female: femaleClothingBottoms, neutral: neutralClothingBottoms },
  "outerwear":      { male: maleClothingOuterwear, female: femaleClothingOuterwear, neutral: neutralClothingOuterwear },
  "activewear":     { male: maleClothingActivewear, female: femaleClothingActivewear, neutral: neutralClothingActivewear },
  // Scents
  "cologne":        { male: maleScentCologne, female: femaleScentPerfume, neutral: neutralScentCologne },
  "perfume":        { male: maleScentCologne, female: femaleScentPerfume, neutral: neutralScentCologne },
  "candle":         same(imgScentCandles),
  "body-lotion":    { male: maleScentBodycare, female: femaleScentBodycare, neutral: neutralScentBodycare },
  "body-wash":      { male: maleScentBodycare, female: femaleScentBodycare, neutral: neutralScentBodycare },
  "essential-oil":  same(imgScentOils),
  "room-spray":     same(imgScentHome),
  // Grooming subcategories
  "hair-care":      { male: maleGroomingHair, female: femaleGroomingHair, neutral: neutralGroomingHair },
  "skin-care":      { male: maleGroomingSkin, female: femaleGroomingSkin, neutral: neutralGroomingSkin },
  "shaving":        { male: femaleGroomingShaving, female: femaleGroomingShaving, neutral: femaleGroomingShaving },
  // Grooming products
  "shampoo":        { male: maleGroomingHair, female: femaleGroomingHair, neutral: neutralGroomingHair },
  "conditioner":    { male: maleGroomingHair, female: femaleGroomingHair, neutral: neutralGroomingHair },
  "hair-styling":   { male: maleGroomingHair, female: femaleGroomingHair, neutral: neutralGroomingHair },
  "moisturizer":    { male: maleGroomingSkin, female: femaleGroomingSkin, neutral: neutralGroomingSkin },
  "cleanser":       { male: maleGroomingSkin, female: femaleGroomingSkin, neutral: neutralGroomingSkin },
  "sunscreen":      { male: maleGroomingSkin, female: femaleGroomingSkin, neutral: neutralGroomingSkin },
  "razor":          { male: femaleGroomingShaving, female: femaleGroomingShaving, neutral: femaleGroomingShaving },
  "shaving-cream":  { male: femaleGroomingShaving, female: femaleGroomingShaving, neutral: femaleGroomingShaving },
  "aftershave":     { male: femaleGroomingShaving, female: femaleGroomingShaving, neutral: femaleGroomingShaving },
  "pre-shave":      { male: femaleGroomingShaving, female: femaleGroomingShaving, neutral: femaleGroomingShaving },
  // Measurements
  "body":           { male: femaleMeasureBody, female: femaleMeasureBody, neutral: femaleMeasureBody },
  "ring":           { male: maleMeasureRing, female: femaleMeasureRing, neutral: neutralMeasureRing },
  // Jewelry
  "necklaces":      { male: maleJewelryNecklaces, female: femaleJewelryNecklaces, neutral: neutralJewelryNecklaces },
  "bracelets":      { male: maleJewelryBracelets, female: femaleJewelryBracelets, neutral: neutralJewelryBracelets },
  "earrings":       { male: femaleJewelryEarrings, female: femaleJewelryEarrings, neutral: femaleJewelryEarrings },
  "watches":        { male: maleJewelryWatches, female: femaleJewelryWatches, neutral: neutralJewelryWatches },
  // Fragrance products
  "daily-fragrance":   { male: maleScentCologne, female: femaleScentPerfume, neutral: neutralScentCologne },
  "evening-fragrance": { male: maleScentCologne, female: femaleScentPerfume, neutral: neutralScentCologne },
  "body-mist":         { male: maleScentBodycare, female: femaleScentBodycare, neutral: neutralScentBodycare },
  "fragrance-oil":     same(imgScentOils),
};

/**
 * Get the correct template card image based on gender.
 */
export function getTemplateImage(templateName: string, gender: Gender): string {
  const entry = templateImages[templateName];
  if (!entry) return "";
  return entry[resolveGender(gender)];
}

/**
 * Get the correct product/subcategory image based on gender.
 * Falls back to the provided default if no override exists.
 */
export function getProductImage(productId: string, gender: Gender, fallback: string): string {
  const entry = productImages[productId];
  if (!entry) return fallback;
  return entry[resolveGender(gender)];
}
