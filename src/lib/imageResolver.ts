import { profileQuestions } from "@/data/profileQuestions";

const STYLE_FALLBACK_ID = "minimal";

const INTRO_IMAGE_TO_STYLE_ID: Record<string, string> = {
  shopping: "luxury",
  style: "elegant",
  food: "dining",
  gifts: "thoughtful",
  lifestyle: "staying-in",
  fit: "fitness",
  taste: "minimal",
};

function findOptionImage(optionId: string): string {
  for (const question of profileQuestions) {
    const match = question.options?.find((option) => option.id === optionId && option.localImage);
    if (match?.localImage) {
      return match.localImage;
    }
  }

  for (const question of profileQuestions) {
    const fallback = question.options?.find((option) => option.id === STYLE_FALLBACK_ID && option.localImage);
    if (fallback?.localImage) {
      return fallback.localImage;
    }
  }

  return "";
}

export function getStyleImage(optionId: string, _gender?: string): string {
  return findOptionImage(optionId);
}

export function getCategoryImage(categoryId: string, _gender?: string): string {
  return findOptionImage(INTRO_IMAGE_TO_STYLE_ID[categoryId] || STYLE_FALLBACK_ID);
}
