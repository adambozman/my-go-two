export interface QuestionOption {
  id: string;
  label: string;
  emoji?: string;
  image?: string;
  localImage?: string;
}

export type QuestionType =
  | "image-grid"
  | "pill-select"
  | "single-select"
  | "free-input"
  | "date-input";

export interface OnboardingQuestion {
  id: string;
  category: string;
  type: QuestionType;
  title: string;
  subtitle: string;
  funnySubtext: string;
  options?: QuestionOption[];
  placeholder?: string;
  multiSelect?: boolean;
}

// Code path: type-only onboarding question contract for profileQuestions.
