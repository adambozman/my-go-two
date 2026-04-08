import { useEffect } from "react";
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

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

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
      logAuthDiagnostic("dashboard-layout:invite-skip", {
        userId: user.id,
        reason: storedInviteId === user.id ? "self-invite" : "no-pending-invite",
      });
      return;
    }

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

  if (!user) {
    logAuthDiagnostic("dashboard-layout:redirect-login", {});
    return <Navigate to="/login" replace />;
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
