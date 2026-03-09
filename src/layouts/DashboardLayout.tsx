import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Process stored invite link (from QR code signup flow)
  useEffect(() => {
    if (!user) return;
    const inviteId = localStorage.getItem("gotwo_invite");
    if (!inviteId || inviteId === user.id) {
      localStorage.removeItem("gotwo_invite");
      return;
    }
    supabase.functions.invoke("collaborations", {
      body: { action: "link-by-inviter", inviter_id: inviteId },
    }).then(({ error }) => {
      localStorage.removeItem("gotwo_invite");
      if (!error) {
        toast({ title: "Connected!", description: "You're now linked with your partner." });
      }
    });
  }, [user]);

  return (
    <div className="app-page min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <DashboardTopBar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
