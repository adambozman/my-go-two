import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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

interface PersonalizationContextType {
  personalization: Personalization | null;
  profileAnswers: Record<string, string | string[]> | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

const PersonalizationContext = createContext<PersonalizationContextType>({
  personalization: null,
  profileAnswers: null,
  loading: true,
  refetch: async () => {},
});

export const usePersonalization = () => useContext(PersonalizationContext);

export const PersonalizationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [personalization, setPersonalization] = useState<Personalization | null>(null);
  const [profileAnswers, setProfileAnswers] = useState<Record<string, string | string[]> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) {
      setPersonalization(null);
      setProfileAnswers(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase
        .from("user_preferences")
        .select("profile_answers, ai_personalization")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfileAnswers(data.profile_answers as any);
        // Sanitize corrupted unicode characters from AI personalization data
        const raw = data.ai_personalization as any;
        if (raw) {
          const sanitize = (v: unknown): unknown => {
            if (typeof v === "string") return v.replace(/[^\x20-\x7E\n\r\t]/g, "").replace(/,\s*$/, "").trim();
            if (Array.isArray(v)) return v.map(sanitize).filter(Boolean);
            if (v && typeof v === "object") {
              return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, sanitize(val)]));
            }
            return v;
          };
          setPersonalization(sanitize(raw) as Personalization);
        }
      }
    } catch (e) {
      console.error("Failed to fetch personalization:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <PersonalizationContext.Provider
      value={{ personalization, profileAnswers, loading, refetch: fetchData }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};
