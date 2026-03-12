import { OnboardingQuestion } from "./onboardingQuestions";

// Local style images
import minimalImg from "@/assets/styles/minimal.jpg";
import classicImg from "@/assets/styles/classic.jpg";
import sportyImg from "@/assets/styles/sporty.jpg";
import trendyImg from "@/assets/styles/trendy.jpg";
import edgyImg from "@/assets/styles/edgy.jpg";
import bohoImg from "@/assets/styles/boho.jpg";
import luxuryImg from "@/assets/styles/luxury.jpg";
import laidBackImg from "@/assets/styles/laid-back.jpg";
import hippyImg from "@/assets/styles/hippy.jpg";
import preppyImg from "@/assets/styles/preppy.jpg";
import streetImg from "@/assets/styles/street.jpg";
import elegantImg from "@/assets/styles/elegant.jpg";
import bougieImg from "@/assets/styles/bougie.jpg";
import polishedImg from "@/assets/styles/polished.jpg";
import casualImg from "@/assets/styles/casual.jpg";
import creativeImg from "@/assets/styles/creative.jpg";
import professionalImg from "@/assets/styles/professional.jpg";
import chillImg from "@/assets/styles/chill.jpg";
import budgetImg from "@/assets/styles/budget.jpg";
import balancedImg from "@/assets/styles/balanced.jpg";
import qualityImg from "@/assets/styles/quality.jpg";
import comfortImg from "@/assets/styles/comfort.jpg";
import fitImg from "@/assets/styles/fit.jpg";
import brandImg from "@/assets/styles/brand.jpg";
import priceImg from "@/assets/styles/price.jpg";
import timelessImg from "@/assets/styles/timeless.jpg";
import diningImg from "@/assets/styles/dining.jpg";
import travelingImg from "@/assets/styles/traveling.jpg";
import outdoorsImg from "@/assets/styles/outdoors.jpg";
import eventsImg from "@/assets/styles/events.jpg";
import stayingInImg from "@/assets/styles/staying-in.jpg";
import fitnessImg from "@/assets/styles/fitness.jpg";
import practicalGiftImg from "@/assets/styles/dining.jpg";
import thoughtfulGiftImg from "@/assets/styles/traveling.jpg";
import luxuriousGiftImg from "@/assets/styles/luxury.jpg";
import experienceGiftImg from "@/assets/styles/outdoors.jpg";
import surpriseGiftImg from "@/assets/styles/events.jpg";

export const profileQuestions: OnboardingQuestion[] = [
  {
    id: "identity",
    category: "profile",
    type: "single-select",
    title: "How do you identify?",
    subtitle: "Helps us with fit, tone, and recommendations",
    funnySubtext: "",
    multiSelect: false,
    options: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
      { id: "non-binary", label: "Non-binary" },
      { id: "prefer-not", label: "Prefer not to say" },
    ],
  },
  {
    id: "style-personality",
    category: "profile",
    type: "image-grid",
    title: "How would you describe your style?",
    subtitle: "Pick all that resonate with you",
    funnySubtext: "",
    options: [
      { id: "minimal", label: "Minimal", localImage: minimalImg },
      { id: "classic", label: "Classic", localImage: classicImg },
      { id: "sporty", label: "Sporty", localImage: sportyImg },
      { id: "trendy", label: "Trendy", localImage: trendyImg },
      { id: "edgy", label: "Edgy", localImage: edgyImg },
      { id: "boho", label: "Boho", localImage: bohoImg },
      { id: "luxury", label: "Luxury", localImage: luxuryImg },
      { id: "laid-back", label: "Laid-back", localImage: laidBackImg },
    ],
  },
  {
    id: "daily-vibe",
    category: "profile",
    type: "image-grid",
    title: "What's your vibe day to day?",
    subtitle: "How do you show up to the world?",
    funnySubtext: "",
    options: [
      { id: "polished", label: "Polished", localImage: polishedImg },
      { id: "casual", label: "Casual", localImage: casualImg },
      { id: "athletic", label: "Athletic", localImage: sportyImg },
      { id: "creative", label: "Creative", localImage: creativeImg },
      { id: "professional", label: "Professional", localImage: professionalImg },
      { id: "chill", label: "Chill", localImage: chillImg },
    ],
  },
  {
    id: "spending-mindset",
    category: "profile",
    type: "image-grid",
    title: "What's your spending mindset?",
    subtitle: "Your personal preference, not a store filter",
    funnySubtext: "",
    multiSelect: false,
    options: [
      { id: "budget", label: "Budget-conscious", localImage: budgetImg },
      { id: "balanced", label: "Balanced", localImage: balancedImg },
      { id: "quality", label: "Quality-focused", localImage: qualityImg },
      { id: "luxury-first", label: "Luxury-first", localImage: luxuryImg },
    ],
  },
  {
    id: "purchase-values",
    category: "profile",
    type: "image-grid",
    title: "What do you value most in purchases?",
    subtitle: "Pick what matters to you",
    funnySubtext: "",
    options: [
      { id: "comfort", label: "Comfort", localImage: comfortImg },
      { id: "fit", label: "Fit", localImage: fitImg },
      { id: "brand", label: "Brand name", localImage: brandImg },
      { id: "price", label: "Price", localImage: priceImg },
      { id: "trend", label: "Trend", localImage: trendyImg },
      { id: "timeless", label: "Timeless quality", localImage: timelessImg },
    ],
  },
  {
    id: "free-time",
    category: "profile",
    type: "image-grid",
    title: "How do you like to spend your free time?",
    subtitle: "Pick everything that applies",
    funnySubtext: "",
    options: [
      { id: "dining", label: "Dining out", localImage: diningImg },
      { id: "traveling", label: "Traveling", localImage: travelingImg },
      { id: "outdoors", label: "Outdoors", localImage: outdoorsImg },
      { id: "events", label: "Events", localImage: eventsImg },
      { id: "staying-in", label: "Staying in", localImage: stayingInImg },
      { id: "fitness", label: "Fitness", localImage: fitnessImg },
    ],
  },
  {
    id: "gift-preference",
    category: "profile",
    type: "image-grid",
    title: "When someone gives you a gift, you prefer:",
    subtitle: "This helps us recommend perfectly",
    funnySubtext: "",
    multiSelect: false,
    options: [
      { id: "practical", label: "Something practical", localImage: practicalGiftImg },
      { id: "thoughtful", label: "Something thoughtful", localImage: thoughtfulGiftImg },
      { id: "luxurious", label: "Something luxurious", localImage: luxuriousGiftImg },
      { id: "experience", label: "An experience", localImage: experienceGiftImg },
      { id: "surprise", label: "A surprise", localImage: surpriseGiftImg },
    ],
  },
  {
    id: "aesthetic-lean",
    category: "profile",
    type: "image-grid",
    title: "Which aesthetic do you lean toward?",
    subtitle: "Pick what fits your energy",
    funnySubtext: "",
    options: [
      { id: "hippy", label: "Hippy", localImage: hippyImg },
      { id: "preppy", label: "Preppy", localImage: preppyImg },
      { id: "street", label: "Street", localImage: streetImg },
      { id: "elegant", label: "Elegant", localImage: elegantImg },
      { id: "bougie", label: "Bougie", localImage: bougieImg },
      { id: "minimal", label: "Minimal", localImage: minimalImg },
    ],
  },
];
