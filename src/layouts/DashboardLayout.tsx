import { useEffect, useRef, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

/**
 * Grace period (ms) before redirecting to login after user becomes null.
 * During a token refresh cycle the user can flicker to null for several
 * seconds (token rotation + 429 recovery).  We also do a localStorage
 * check to avoid redirecting when the session is actually still persisted.
 */
const AUTH_REDIRECT_GRACE_MS = 5000;

/** Check if a persisted Supabase session exists in localStorage. */
const hasPersistedSession = (): boolean => {
  try {
    const key = `sb-xpxedmasobzrjigtxtms-auth-token`;
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    // Check that the session has an access token and isn't explicitly expired
    return Boolean(parsed?.access_token || parsed?.user);
  } catch {
    return false;
  }
};

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const processedInviteSignatureRef = useRef<string | null>(null);
  const [redirectReady, setRedirectReady] = useState(false);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track whether user was ever present this mount — only redirect to login
  // if the user was NEVER authenticated (fresh page load with no session).
  // If user was authenticated and then flickers to null, that's a transient
  // refresh issue — not a reason to redirect.
  const everHadUserRef = useRef(false);

  if (user) {
    everHadUserRef.current = true;
  }

  // When user disappears *after* initial load, wait a grace period before
  // redirecting so that a concurrent session refresh can finish.
  useEffect(() => {
    if (loading) return;

    if (user) {
      // User is present — clear any pending redirect.
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
      setRedirectReady(false);
      return;
    }

    // user is null and not loading — start grace timer.
    if (!redirectTimerRef.current) {
      redirectTimerRef.current = setTimeout(async () => {
        redirectTimerRef.current = null;

        // Before redirecting, double-check localStorage. The session may
        // still be persisted even though React state lost track of it during
        // a token rotation cycle. If it's there, attempt to re-read it.
        if (hasPersistedSession()) {
          logAuthDiagnostic("dashboard-layout:grace-recovery-attempt", {});
          try {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
              logAuthDiagnostic("dashboard-layout:grace-recovery-success", {
                userId: data.session.user?.id ?? null,
              });
              // The AuthContext onAuthStateChange listener will pick this up
              // and set user again, cancelling the redirect naturally.
              return;
            }
          } catch {
            // Recovery failed — proceed to redirect.
          }
        }

        setRedirectReady(true);
      }, AUTH_REDIRECT_GRACE_MS);
    }

    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, [user, loading]);

  // Process stored invite/token handoff after auth settles.
  useEffect(() => {
    if (!user) return;

    const storedToken = localStorage.getItem("gotwo_invite_token")?.trim() ?? "";
    const storedInviteId = localStorage.getItem("gotwo_invite")?.trim() ?? "";
    const usedTokenFlow = Boolean(storedToken);

    logAuthDiagnostic("dashboard-layout:invite-check", {
      userId: user.id,
      hasStoredToken: Boolean(storedToken),
      hasStoredInviteId: Boolean(storedInviteId),
      usedTokenFlow,
    });

    if (!storedToken && (!storedInviteId || storedInviteId === user.id)) {
      localStorage.removeItem("gotwo_invite_token");
      localStorage.removeItem("gotwo_invite");
      processedInviteSignatureRef.current = null;
      logAuthDiagnostic("dashboard-layout:invite-skip", {
        userId: user.id,
        reason: storedInviteId === user.id ? "self-invite" : "no-pending-invite",
      });
      return;
    }

    const inviteSignature = `${user.id}:${storedToken}:${storedInviteId}`;
    if (processedInviteSignatureRef.current === inviteSignature) {
      logAuthDiagnostic("dashboard-layout:invite-duplicate-skip", {
        userId: user.id,
        usedTokenFlow,
      });
      return;
    }
    processedInviteSignatureRef.current = inviteSignature;

    let cancelled = false;

    const actionBody = storedToken
      ? { action: "link-by-token", token: storedToken }
      : { action: "link-by-inviter", inviter_id: storedInviteId };

    logAuthDiagnostic("dashboard-layout:invite-process", {
      userId: user.id,
      action: storedToken ? "link-by-token" : "link-by-inviter",
    });

    supabase.functions.invoke("searchforaddprofile", { body: actionBody }).then(({ data, error }) => {
      localStorage.removeItem("gotwo_invite_token");
      localStorage.removeItem("gotwo_invite");

      if (cancelled) {
        logAuthDiagnostic("dashboard-layout:invite-cancelled", { userId: user.id });
        return;
      }

      if (error || data?.error) {
        const message = data?.error || error?.message || "Failed to process invite.";
        logAuthDiagnostic("dashboard-layout:invite-failed", {
          userId: user.id,
          message,
        });
        toast({
          title: "Invite Link Problem",
          description:
            message === "Invalid or expired connection token"
              ? "This invite link is no longer valid. Ask for a fresh invite."
              : message,
          variant: "destructive",
        });
        return;
      }

      if (data?.status === "already_connected") {
        logAuthDiagnostic("dashboard-layout:invite-already-connected", { userId: user.id });
        toast({ title: "Already Connected", description: "You're already linked with this person." });
        return;
      }

      if (data?.status === "pending_exists") {
        logAuthDiagnostic("dashboard-layout:invite-pending-exists", { userId: user.id });
        toast({ title: "Invite Pending", description: "A connection invite is already pending." });
        return;
      }

      if (usedTokenFlow) {
        logAuthDiagnostic("dashboard-layout:invite-token-sent", { userId: user.id });
        toast({
          title: "Invite Sent",
          description: "Your connection request was sent from the invite link.",
        });
        return;
      }

      logAuthDiagnostic("dashboard-layout:invite-connected", { userId: user.id });
      toast({ title: "Connected!", description: "You're now linked with your connection." });
    });

    return () => {
      cancelled = true;
    };
  }, [toast, user]);

  if (loading) {
    logAuthDiagnostic("dashboard-layout:loading", {});
    return (
      <div className="app-page min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user && redirectReady) {
    logAuthDiagnostic("dashboard-layout:redirect-login", {});
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    // Still within the grace period — show a brief loading state instead of
    // immediately bouncing to login.
    logAuthDiagnostic("dashboard-layout:grace-period", {});
    return (
      <div className="app-page min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-page flex min-h-screen flex-col overflow-x-hidden lg:h-screen lg:overflow-hidden">
      <DashboardTopBar />
      <main className="flex flex-1 min-h-0 flex-col overflow-x-hidden px-3 pb-4 sm:px-4 md:px-6 lg:px-8 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
// Codebase classification: runtime dashboard shell.
