// Male style images
import maleMinimal from "@/assets/styles/male/minimal.jpg";
import maleClassic from "@/assets/styles/male/classic.jpg";
import maleSporty from "@/assets/styles/male/sporty.jpg";
import maleTrendy from "@/assets/styles/male/trendy.jpg";
import maleEdgy from "@/assets/styles/male/edgy.jpg";
import maleBoho from "@/assets/styles/male/boho.jpg";
import maleLuxury from "@/assets/styles/male/luxury.jpg";
import maleLaidBack from "@/assets/styles/male/laid-back.jpg";

// Female style images
import femaleMinimal from "@/assets/styles/female/minimal.jpg";
import femaleClassic from "@/assets/styles/female/classic.jpg";
import femaleSporty from "@/assets/styles/female/sporty.jpg";
import femaleTrendy from "@/assets/styles/female/trendy.jpg";
import femaleEdgy from "@/assets/styles/female/edgy.jpg";
import femaleBoho from "@/assets/styles/female/boho.jpg";
import femaleLuxury from "@/assets/styles/female/luxury.jpg";
import femaleLaidBack from "@/assets/styles/female/laid-back.jpg";

// Neutral style images (existing)
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

// Category images
import maleShopping from "@/assets/categories/male/shopping.jpg";
import maleStyle from "@/assets/categories/male/style.jpg";
import maleFood from "@/assets/categories/male/food.jpg";
import maleGifts from "@/assets/categories/male/gifts.jpg";
import maleLifestyle from "@/assets/categories/male/lifestyle.jpg";
import maleFitCat from "@/assets/categories/male/fit.jpg";

import femaleShopping from "@/assets/categories/female/shopping.jpg";
import femaleStyle from "@/assets/categories/female/style.jpg";
import femaleFood from "@/assets/categories/female/food.jpg";
import femaleGifts from "@/assets/categories/female/gifts.jpg";
import femaleLifestyle from "@/assets/categories/female/lifestyle.jpg";
import femaleFitCat from "@/assets/categories/female/fit.jpg";

type Gender = "male" | "female" | "non-binary" | "prefer-not";

// Style images keyed by style ID then gender
const styleImages: Record<string, Record<string, string>> = {
  minimal: { male: maleMinimal, female: femaleMinimal, neutral: neutralMinimal },
  classic: { male: maleClassic, female: femaleClassic, neutral: neutralClassic },
  sporty: { male: maleSporty, female: femaleSporty, neutral: neutralSporty },
  trendy: { male: maleTrendy, female: femaleTrendy, neutral: neutralTrendy },
  edgy: { male: maleEdgy, female: femaleEdgy, neutral: neutralEdgy },
  boho: { male: maleBoho, female: femaleBoho, neutral: neutralBoho },
  luxury: { male: maleLuxury, female: femaleLuxury, neutral: neutralLuxury },
  "laid-back": { male: maleLaidBack, female: femaleLaidBack, neutral: neutralLaidBack },
  "luxury-first": { male: maleLuxury, female: femaleLuxury, neutral: neutralLuxury },
  // Map to closest male-appropriate image
  polished: { male: maleClassic, female: femaleClassic, neutral: neutralPolished },
  casual: { male: maleLaidBack, female: femaleLaidBack, neutral: neutralCasual },
  athletic: { male: maleSporty, female: femaleSporty, neutral: neutralSporty },
  creative: { male: maleBoho, female: femaleBoho, neutral: neutralCreative },
  professional: { male: maleClassic, female: femaleClassic, neutral: neutralProfessional },
  chill: { male: maleLaidBack, female: femaleLaidBack, neutral: neutralChill },
  budget: { male: maleLaidBack, female: femaleLaidBack, neutral: neutralBudget },
  balanced: { male: maleClassic, female: femaleClassic, neutral: neutralBalanced },
  quality: { male: maleLuxury, female: femaleLuxury, neutral: neutralQuality },
  comfort: { male: maleLaidBack, female: femaleLaidBack, neutral: neutralComfort },
  fit: { male: maleSporty, female: femaleSporty, neutral: neutralFit },
  brand: { male: maleLuxury, female: femaleLuxury, neutral: neutralBrand },
  price: { male: maleLaidBack, female: femaleLaidBack, neutral: neutralPrice },
  trend: { male: maleTrendy, female: femaleTrendy, neutral: neutralTrendy },
  timeless: { male: maleClassic, female: femaleClassic, neutral: neutralTimeless },
  dining: { male: maleClassic, female: femaleClassic, neutral: neutralDining },
  traveling: { male: maleLaidBack, female: femaleLaidBack, neutral: neutralTraveling },
  outdoors: { male: maleSporty, female: femaleSporty, neutral: neutralOutdoors },
  events: { male: maleClassic, female: femaleClassic, neutral: neutralEvents },
  "staying-in": { male: maleLaidBack, female: femaleLaidBack, neutral: neutralStayingIn },
  fitness: { male: maleSporty, female: femaleSporty, neutral: neutralFitness },
  practical: { male: maleClassic, female: femaleClassic, neutral: neutralPracticalGift },
  thoughtful: { male: maleClassic, female: femaleClassic, neutral: neutralThoughtfulGift },
  luxurious: { male: maleLuxury, female: femaleLuxury, neutral: neutralLuxuriousGift },
  experience: { male: maleSporty, female: femaleSporty, neutral: neutralExperienceGift },
  surprise: { male: maleTrendy, female: femaleTrendy, neutral: neutralSurpriseGift },
  hippy: { male: maleBoho, female: femaleBoho, neutral: neutralHippy },
  preppy: { male: maleClassic, female: femaleClassic, neutral: neutralPreppy },
  street: { male: maleEdgy, female: femaleEdgy, neutral: neutralStreet },
  elegant: { male: maleLuxury, female: femaleLuxury, neutral: neutralElegant },
  bougie: { male: maleLuxury, female: femaleLuxury, neutral: neutralBougie },
};

const categoryImages: Record<string, Record<string, string>> = {
  shopping: { male: maleShopping, female: femaleShopping, neutral: maleShopping },
  style: { male: maleStyle, female: femaleStyle, neutral: maleStyle },
  food: { male: maleFood, female: femaleFood, neutral: maleFood },
  gifts: { male: maleGifts, female: femaleGifts, neutral: maleGifts },
  lifestyle: { male: maleLifestyle, female: femaleLifestyle, neutral: maleLifestyle },
  fit: { male: maleFitCat, female: femaleFitCat, neutral: maleFitCat },
};

function resolveGender(gender: Gender | undefined): string {
  if (gender === "male") return "male";
  if (gender === "female") return "female";
  return "neutral";
}

export function getStyleImage(styleId: string, gender?: Gender): string {
  const g = resolveGender(gender);
  return styleImages[styleId]?.[g] || styleImages[styleId]?.neutral || "";
}

export function getCategoryImage(categoryId: string, gender?: Gender): string {
  const g = resolveGender(gender);
  return categoryImages[categoryId]?.[g] || categoryImages[categoryId]?.neutral || "";
}
