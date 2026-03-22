import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  // Process stored invite link (from QR code signup flow)
  useEffect(() => {
    if (!user) return;
    const inviteId = localStorage.getItem("gotwo_invite");
    if (!inviteId || inviteId === user.id) {
      localStorage.removeItem("gotwo_invite");
      return;
    }
    supabase.functions.invoke("searchforaddprofile", {
      body: { action: "link-by-inviter", inviter_id: inviteId },
    }).then(({ error }) => {
      localStorage.removeItem("gotwo_invite");
      if (!error) {
        toast({ title: "Connected!", description: "You're now linked with your partner." });
      }
    });
  }, [user]);

  if (loading) {
    return (
      <div className="app-page min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-page flex min-h-screen flex-col overflow-x-hidden lg:h-screen lg:overflow-hidden">
      <DashboardTopBar />
      <main className="flex-1 min-h-0 overflow-x-hidden px-3 pb-4 sm:px-4 md:px-6 lg:px-8 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
