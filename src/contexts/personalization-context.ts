import { createContext, useContext } from "react";
import type { Gender } from "@/lib/gender";

type ProfileAnswers = Record<string, string | string[]>;

export interface Personalization {
  recommended_brands: string[];
  recommended_stores: string[];
  image_themes: string[];
  color_palette: string[];
  gift_categories: string[];
  price_tier: string;
  style_keywords: string[];
  persona_summary: string;
}

export interface PersonalizationContextType {
  personalization: Personalization | null;
  profileAnswers: ProfileAnswers | null;
  gender: Gender;
  loading: boolean;
  refetch: () => Promise<void>;
}

export const PersonalizationContext = createContext<PersonalizationContextType>({
  personalization: null,
  profileAnswers: null,
  gender: "non-binary",
  loading: true,
  refetch: async () => {},
});

export const usePersonalization = () => useContext(PersonalizationContext);
