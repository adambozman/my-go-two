import { useEffect, useState, ReactNode, useCallback, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "@/contexts/auth-context";

// DEV-ONLY override accounts. These are not real subscription checks.
const DEV_USER_IDS = ["e78cff1c-54e3-4365-b172-461b7b6f25e6"];
const DEV_EMAILS = ["adam.bozman@gmail.com"];
const SUBSCRIPTION_CACHE_KEY = "gotwo_subscription_cache_v1";
const SUBSCRIPTION_CACHE_TTL_MS = 5 * 60 * 1000;
const SUBSCRIPTION_TIMEOUT_MS = 8000;

type SubscriptionCacheRecord = {
  userId: string;
  checkedAt: number;
  subscribed: boolean;
  subscriptionEnd: string | null;
};

const readSubscriptionCache = (userId: string): SubscriptionCacheRecord | null => {
  try {
    const raw = sessionStorage.getItem(SUBSCRIPTION_CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SubscriptionCacheRecord;
    if (
      typeof parsed?.userId !== "string" ||
      typeof parsed?.checkedAt !== "number" ||
      parsed.userId !== userId
    ) {
      return null;
    }

    if (Date.now() - parsed.checkedAt > SUBSCRIPTION_CACHE_TTL_MS) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const writeSubscriptionCache = (record: SubscriptionCacheRecord) => {
  try {
    sessionStorage.setItem(SUBSCRIPTION_CACHE_KEY, JSON.stringify(record));
  } catch {
    // Ignore cache write failures.
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const latestSubscriptionRequestRef = useRef(0);
  const signupDataAppliedForUserRef = useRef<string | null>(null);

  const applySignupData = async (userId: string) => {
    if (signupDataAppliedForUserRef.current === userId) return;
    const raw = localStorage.getItem("gotwo_signup_data");
    if (!raw) {
      signupDataAppliedForUserRef.current = userId;
      return;
    }

    try {
      const { age } = JSON.parse(raw);
      await supabase
        .from("profiles")
        .update({ age })
        .eq("user_id", userId);
      localStorage.removeItem("gotwo_signup_data");
    } catch {
      // Ignore malformed cached signup data.
    } finally {
      signupDataAppliedForUserRef.current = userId;
    }
  };

  const checkSubscription = useCallback(async () => {
    const accessToken = session?.access_token ?? null;
    const activeUser = session?.user ?? user;
    if (!accessToken || !activeUser) return;

    // Dev override — skip Stripe check
    // DEV-ONLY override: skip Stripe subscription checks for known test accounts.
    if (DEV_USER_IDS.includes(activeUser.id) || DEV_EMAILS.includes(activeUser.email ?? "")) {
      setSubscribed(true);
      setSubscriptionEnd(null);
      writeSubscriptionCache({
        userId: activeUser.id,
        checkedAt: Date.now(),
        subscribed: true,
        subscriptionEnd: null,
      });
      return;
    }

    const cached = readSubscriptionCache(activeUser.id);
    if (cached) {
      setSubscribed(cached.subscribed);
      setSubscriptionEnd(cached.subscriptionEnd);
      return;
    }

    const requestId = latestSubscriptionRequestRef.current + 1;
    latestSubscriptionRequestRef.current = requestId;
    setSubscriptionLoading(true);

    try {
      const result = await Promise.race([
        supabase.functions.invoke("check-subscription", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        new Promise<never>((_, reject) => {
          window.setTimeout(() => reject(new Error("check-subscription timed out")), SUBSCRIPTION_TIMEOUT_MS);
        }),
      ]);

      if (!mountedRef.current || latestSubscriptionRequestRef.current !== requestId) return;

      const { data, error } = result;
      if (error) throw error;

      const nextSubscribed = data?.subscribed ?? false;
      const nextSubscriptionEnd = data?.subscription_end ?? null;

      setSubscribed(nextSubscribed);
      setSubscriptionEnd(nextSubscriptionEnd);
      writeSubscriptionCache({
        userId: activeUser.id,
        checkedAt: Date.now(),
        subscribed: nextSubscribed,
        subscriptionEnd: nextSubscriptionEnd,
      });
    } catch (error) {
      console.warn("Subscription check failed:", error);
    } finally {
      if (mountedRef.current && latestSubscriptionRequestRef.current === requestId) {
        setSubscriptionLoading(false);
      }
    }
  }, [session, user]);

  useEffect(() => {
    mountedRef.current = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (_event === "SIGNED_IN" && session?.user) {
        void applySignupData(session.user.id);
      }
    });

    void supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mountedRef.current) return;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to restore auth session:", error);
        if (!mountedRef.current) return;
        setSession(null);
        setUser(null);
        setLoading(false);
      });

    return () => {
      mountedRef.current = false;
      latestSubscriptionRequestRef.current += 1;
      subscription.unsubscribe();
    };
  }, []);

  // Check subscription when session changes
  useEffect(() => {
    if (session?.access_token) {
      void checkSubscription();
    } else {
      setSubscribed(false);
      setSubscriptionEnd(null);
      setSubscriptionLoading(false);
    }
  }, [session?.access_token, checkSubscription]);

  // Auto-refresh subscription every 60s
  useEffect(() => {
    if (!session?.access_token) return;
    const interval = window.setInterval(() => {
      void checkSubscription();
    }, 60000);
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
// Codebase classification: runtime auth provider.
