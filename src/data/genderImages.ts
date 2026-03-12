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
import neutralPracticalGift from "@/assets/styles/dining.jpg";
import neutralThoughtfulGift from "@/assets/styles/traveling.jpg";
import neutralLuxuriousGift from "@/assets/styles/luxury.jpg";
import neutralExperienceGift from "@/assets/styles/outdoors.jpg";
import neutralSurpriseGift from "@/assets/styles/events.jpg";
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
  // These don't have gender variants yet — use neutral
  polished: { male: maleClassic, female: femaleClassic, neutral: neutralPolished },
  casual: { male: maleLaidBack, female: femaleLaidBack, neutral: neutralCasual },
  athletic: { male: maleSporty, female: femaleSporty, neutral: neutralSporty },
  creative: { male: maleBoho, female: femaleBoho, neutral: neutralCreative },
  professional: { male: maleClassic, female: femaleClassic, neutral: neutralProfessional },
  chill: { male: maleLaidBack, female: femaleLaidBack, neutral: neutralChill },
  budget: { male: neutralBudget, female: neutralBudget, neutral: neutralBudget },
  balanced: { male: neutralBalanced, female: neutralBalanced, neutral: neutralBalanced },
  quality: { male: neutralQuality, female: neutralQuality, neutral: neutralQuality },
  comfort: { male: neutralComfort, female: neutralComfort, neutral: neutralComfort },
  fit: { male: neutralFit, female: neutralFit, neutral: neutralFit },
  brand: { male: neutralBrand, female: neutralBrand, neutral: neutralBrand },
  price: { male: neutralPrice, female: neutralPrice, neutral: neutralPrice },
  trend: { male: maleTrendy, female: femaleTrendy, neutral: neutralTrendy },
  timeless: { male: neutralTimeless, female: neutralTimeless, neutral: neutralTimeless },
  dining: { male: neutralDining, female: neutralDining, neutral: neutralDining },
  traveling: { male: neutralTraveling, female: neutralTraveling, neutral: neutralTraveling },
  outdoors: { male: neutralOutdoors, female: neutralOutdoors, neutral: neutralOutdoors },
  events: { male: neutralEvents, female: neutralEvents, neutral: neutralEvents },
  "staying-in": { male: neutralStayingIn, female: neutralStayingIn, neutral: neutralStayingIn },
  fitness: { male: neutralFitness, female: neutralFitness, neutral: neutralFitness },
  practical: { male: neutralPracticalGift, female: neutralPracticalGift, neutral: neutralPracticalGift },
  thoughtful: { male: neutralThoughtfulGift, female: neutralThoughtfulGift, neutral: neutralThoughtfulGift },
  luxurious: { male: neutralLuxuriousGift, female: neutralLuxuriousGift, neutral: neutralLuxuriousGift },
  experience: { male: neutralExperienceGift, female: neutralExperienceGift, neutral: neutralExperienceGift },
  surprise: { male: neutralSurpriseGift, female: neutralSurpriseGift, neutral: neutralSurpriseGift },
  hippy: { male: neutralHippy, female: neutralHippy, neutral: neutralHippy },
  preppy: { male: neutralPreppy, female: neutralPreppy, neutral: neutralPreppy },
  street: { male: neutralStreet, female: neutralStreet, neutral: neutralStreet },
  elegant: { male: neutralElegant, female: neutralElegant, neutral: neutralElegant },
  bougie: { male: neutralBougie, female: neutralBougie, neutral: neutralBougie },
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
