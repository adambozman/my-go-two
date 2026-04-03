import { useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { type Gender, normalizeGender } from "@/lib/gender";
import { PersonalizationContext, type Personalization } from "@/contexts/personalization-context";

type ProfileAnswers = Record<string, string | string[]>;
type JsonRecord = Record<string, unknown>;
type ProfileGenderPayload = {
  gender?: string | null;
};

export const PersonalizationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [personalization, setPersonalization] = useState<Personalization | null>(null);
  const [profileAnswers, setProfileAnswers] = useState<ProfileAnswers | null>(null);
  const [gender, setGender] = useState<Gender>("non-binary");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) {
      setPersonalization(null);
      setProfileAnswers(null);
      setGender("non-binary");
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
        // Fall back to profile_answers.identity before defaulting
        const { data: prefData } = await supabase
          .from("user_preferences")
          .select("profile_answers")
          .eq("user_id", user.id)
          .single();

        if (prefData?.profile_answers) {
          const answers = prefData.profile_answers as ProfileAnswers;
          const identity = answers?.identity;
          const resolved = Array.isArray(identity) ? identity[0] : identity;
          setGender(normalizeGender(resolved));
        } else {
          setGender("non-binary");
        }
      }

      const { data } = await supabase
        .from("user_preferences")
        .select("profile_answers, ai_personalization")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfileAnswers((data.profile_answers as ProfileAnswers | null) ?? null);

        // Sanitize corrupted unicode characters from AI personalization data
        const raw = data.ai_personalization as JsonRecord | null;
        if (raw) {
          const sanitize = (v: unknown): unknown => {
            if (typeof v === "string") {
              let s = v.replace(/[^\x20-\x7E\n\r\t]/g, "").trim();
              s = s.replace(/^[[]{},\s:]+/, "").replace(/[[]{},\s:]+$/, "").trim();
              if (/[[\]{}]/.test(s) || s.includes("_keywords") || s.length < 2) return "";
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
          const newGender = (payload.new as ProfileGenderPayload | null)?.gender;
          setGender(normalizeGender(newGender));
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
