import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { normalizeGender } from "@/lib/gender";

// Dev account always treated as premium
const DEV_USER_IDS = ["e78cff1c-54e3-4365-b172-461b7b6f25e6"];
const DEV_EMAILS = ["adam.bozman@gmail.com"];

export const SUBSCRIPTION_TIERS = {
  premium: {
    product_id: "prod_U7vTm1mY6aBgKf",
    monthly_price_id: "price_1T9fcqQaPvMJyaGFK7svxopT",
    yearly_price_id: "price_1T9fcpQaPvMJyaGFWPfn8xe7",
  },
} as const;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  subscribed: boolean;
  subscriptionLoading: boolean;
  subscriptionEnd: string | null;
  checkSubscription: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  const applySignupData = async (userId: string) => {
    const raw = localStorage.getItem("gotwo_signup_data");
    if (!raw) return;
    try {
      const { age, gender } = JSON.parse(raw);
      await supabase
        .from("profiles")
        .update({ age, gender: normalizeGender(gender) })
        .eq("user_id", userId);
      localStorage.removeItem("gotwo_signup_data");
    } catch {}
  };

  const checkSubscription = useCallback(async () => {
    if (!session?.access_token) return;
    // Dev override — skip Stripe check
    if (user && DEV_USER_IDS.includes(user.id)) {
      setSubscribed(true);
      setSubscriptionEnd(null);
      return;
    }
    setSubscriptionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!error && data) {
        setSubscribed(data.subscribed ?? false);
        setSubscriptionEnd(data.subscription_end ?? null);
      }
    } catch {
      // silent fail
    } finally {
      setSubscriptionLoading(false);
    }
  }, [session?.access_token, user]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (_event === "SIGNED_IN" && session?.user) {
        applySignupData(session.user.id);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check subscription when session changes
  useEffect(() => {
    if (session?.access_token) {
      checkSubscription();
    } else {
      setSubscribed(false);
      setSubscriptionEnd(null);
    }
  }, [session?.access_token, checkSubscription]);

  // Auto-refresh subscription every 60s
  useEffect(() => {
    if (!session?.access_token) return;
    const interval = setInterval(checkSubscription, 60000);
    return () => clearInterval(interval);
  }, [session?.access_token, checkSubscription]);

  const signUp = async (email: string, password: string, displayName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, subscribed, subscriptionLoading, subscriptionEnd, checkSubscription, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
