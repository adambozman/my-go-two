import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { type Gender, normalizeGender } from "@/lib/gender";

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
  gender: Gender;
  loading: boolean;
  refetch: () => Promise<void>;
}

const PersonalizationContext = createContext<PersonalizationContextType>({
  personalization: null,
  profileAnswers: null,
  gender: "neutral",
  loading: true,
  refetch: async () => {},
});

export const usePersonalization = () => useContext(PersonalizationContext);

export const PersonalizationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [personalization, setPersonalization] = useState<Personalization | null>(null);
  const [profileAnswers, setProfileAnswers] = useState<Record<string, string | string[]> | null>(null);
  const [gender, setGender] = useState<Gender>("neutral");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) {
      setPersonalization(null);
      setProfileAnswers(null);
      setGender("neutral");
      setLoading(false);
      return;
    }

    try {
      // Fetch gender from profiles table (authoritative source)
      const { data: profileData } = await supabase
        .from("profiles")
        .select("gender")
        .eq("user_id", user.id)
        .single();

      if (profileData?.gender) {
        setGender(normalizeGender(profileData.gender));
      } else {
        setGender("neutral");
      }

      const { data } = await supabase
        .from("user_preferences")
        .select("profile_answers, ai_personalization")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfileAnswers(data.profile_answers as any);

        // If gender not in profiles, fall back to profile_answers.identity
        if (!profileData?.gender && data.profile_answers) {
          const answers = data.profile_answers as any;
          const identity = answers?.identity;
          const resolved = Array.isArray(identity) ? identity[0] : identity;
          if (resolved) setGender(resolved);
        }

        // Sanitize corrupted unicode characters from AI personalization data
        const raw = data.ai_personalization as any;
        if (raw) {
          const sanitize = (v: unknown): unknown => {
            if (typeof v === "string") {
              let s = v.replace(/[^\x20-\x7E\n\r\t]/g, "").trim();
              s = s.replace(/^[\[\]{},\s:]+/, "").replace(/[\[\]{},\s:]+$/, "").trim();
              if (/[{}\[\]]/.test(s) || s.includes("_keywords") || s.length < 2) return "";
              return s;
            }
            if (Array.isArray(v)) return v.map(sanitize).filter(x => typeof x === "string" ? x.length > 0 : Boolean(x));
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
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Listen for realtime profile changes to update gender immediately
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`profile-gender-${user.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const newGender = (payload.new as any)?.gender;
          if (newGender) setGender(newGender);
          else setGender("neutral");
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  return (
    <PersonalizationContext.Provider
      value={{ personalization, profileAnswers, gender, loading, refetch: fetchData }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};
