import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  // Process stored invite/token handoff after auth settles.
  useEffect(() => {
    if (!user) return;

    const storedToken = localStorage.getItem("gotwo_invite_token")?.trim() ?? "";
    const storedInviteId = localStorage.getItem("gotwo_invite")?.trim() ?? "";

    if (!storedToken && (!storedInviteId || storedInviteId === user.id)) {
      localStorage.removeItem("gotwo_invite_token");
      localStorage.removeItem("gotwo_invite");
      return;
    }

    let cancelled = false;

    const actionBody = storedToken
      ? { action: "link-by-token", token: storedToken }
      : { action: "link-by-inviter", inviter_id: storedInviteId };

    supabase.functions.invoke("searchforaddprofile", { body: actionBody }).then(({ data, error }) => {
      localStorage.removeItem("gotwo_invite_token");
      localStorage.removeItem("gotwo_invite");

      if (cancelled || error || data?.error) {
        return;
      }

      if (data?.status === "already_connected") {
        toast({ title: "Already Connected", description: "You're already linked with this person." });
        return;
      }

      if (data?.status === "pending_exists") {
        toast({ title: "Invite Pending", description: "A connection invite is already pending." });
        return;
      }

      toast({ title: "Connected!", description: "You're now linked with your connection." });
    });

    return () => {
      cancelled = true;
    };
  }, [toast, user]);

  if (loading) {
    return (
      <div className="app-page min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
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
