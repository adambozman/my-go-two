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
const FOREGROUND_REFRESH_DEBOUNCE_MS = 1500;
const AUTH_DIAGNOSTIC_FLAG = "gotwo_debug_auth";

const authDiagnosticsEnabled = () => {
  try {
    return localStorage.getItem(AUTH_DIAGNOSTIC_FLAG) === "1";
  } catch {
    return false;
  }
};

const logAuthDiagnostic = (event: string, details?: Record<string, unknown>) => {
  if (!authDiagnosticsEnabled()) return;
  console.info(`[auth] ${event}`, details ?? {});
};

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

const clearSubscriptionCache = () => {
  try {
    sessionStorage.removeItem(SUBSCRIPTION_CACHE_KEY);
  } catch {
    // Ignore cache removal failures.
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
  const lastForegroundRefreshAtRef = useRef(0);

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

  const runSubscriptionCheck = useCallback(async (
    options?: { forceRefresh?: boolean; silent?: boolean }
  ) => {
    const accessToken = session?.access_token ?? null;
    const activeUser = session?.user ?? user;
    const forceRefresh = options?.forceRefresh ?? false;
    const silent = options?.silent ?? false;
    if (!accessToken || !activeUser) return;

    logAuthDiagnostic("subscription-check:start", {
      userId: activeUser.id,
      forceRefresh,
      silent,
    });

    // Dev override — skip Stripe check
    // DEV-ONLY override: skip Stripe subscription checks for known test accounts.
    if (DEV_USER_IDS.includes(activeUser.id) || DEV_EMAILS.includes(activeUser.email ?? "")) {
      setSubscribed(true);
      setSubscriptionEnd(null);
      setSubscriptionLoading(false);
      logAuthDiagnostic("subscription-check:dev-override", {
        userId: activeUser.id,
        email: activeUser.email ?? null,
      });
      writeSubscriptionCache({
        userId: activeUser.id,
        checkedAt: Date.now(),
        subscribed: true,
        subscriptionEnd: null,
      });
      return;
    }

    const cached = forceRefresh ? null : readSubscriptionCache(activeUser.id);
    if (cached) {
      setSubscribed(cached.subscribed);
      setSubscriptionEnd(cached.subscriptionEnd);
      setSubscriptionLoading(false);
      logAuthDiagnostic("subscription-check:cache-hit", {
        userId: activeUser.id,
        subscribed: cached.subscribed,
        subscriptionEnd: cached.subscriptionEnd,
      });
      return;
    }

    const requestId = latestSubscriptionRequestRef.current + 1;
    latestSubscriptionRequestRef.current = requestId;
    if (!silent) {
      setSubscriptionLoading(true);
    }

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
      logAuthDiagnostic("subscription-check:success", {
        userId: activeUser.id,
        subscribed: nextSubscribed,
        subscriptionEnd: nextSubscriptionEnd,
      });
      writeSubscriptionCache({
        userId: activeUser.id,
        checkedAt: Date.now(),
        subscribed: nextSubscribed,
        subscriptionEnd: nextSubscriptionEnd,
      });
    } catch (error) {
      console.warn("Subscription check failed:", error);
      logAuthDiagnostic("subscription-check:failed", {
        userId: activeUser.id,
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      if (mountedRef.current && latestSubscriptionRequestRef.current === requestId) {
        setSubscriptionLoading(false);
      }
    }
  }, [session, user]);

  const checkSubscription = useCallback(async () => {
    await runSubscriptionCheck({ forceRefresh: true });
  }, [runSubscriptionCheck]);

  useEffect(() => {
    mountedRef.current = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      logAuthDiagnostic("auth-state-change", {
        event: _event,
        userId: session?.user?.id ?? null,
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        signupDataAppliedForUserRef.current = null;
      }
      if (_event === "SIGNED_IN" && session?.user) {
        void applySignupData(session.user.id);
      }
    });

    void supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mountedRef.current) return;
        logAuthDiagnostic("session-restore:success", {
          userId: session?.user?.id ?? null,
        });
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to restore auth session:", error);
        logAuthDiagnostic("session-restore:failed", {
          message: error instanceof Error ? error.message : String(error),
        });
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
      void runSubscriptionCheck();
    } else {
      setSubscribed(false);
      setSubscriptionEnd(null);
      setSubscriptionLoading(false);
    }
  }, [session?.access_token, runSubscriptionCheck]);

  useEffect(() => {
    if (!session?.access_token) return;

    const refreshOnForeground = () => {
      if (document.visibilityState === "hidden") return;

      const now = Date.now();
      if (now - lastForegroundRefreshAtRef.current < FOREGROUND_REFRESH_DEBOUNCE_MS) {
        return;
      }

      lastForegroundRefreshAtRef.current = now;
      void runSubscriptionCheck({ forceRefresh: true, silent: true });
    };

    window.addEventListener("focus", refreshOnForeground);
    document.addEventListener("visibilitychange", refreshOnForeground);

    return () => {
      window.removeEventListener("focus", refreshOnForeground);
      document.removeEventListener("visibilitychange", refreshOnForeground);
    };
  }, [session?.access_token, runSubscriptionCheck]);

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
    clearSubscriptionCache();
    setSubscribed(false);
    setSubscriptionEnd(null);
    setSubscriptionLoading(false);
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
