import { useEffect, useState } from "react";
import { Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import GoTwoText from "@/components/GoTwoText";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const taglines: Record<string, string> = {
  "/dashboard": "The people who matter most.",
  "/dashboard/my-go-two": "Everything about you, in one place.",
  "/dashboard/recommendations": "AI-curated picks, just for you.",
  "/dashboard/questionnaires": "The more you share, the better they know you.",
  "/dashboard/search": "Find anything, for anyone.",
};

export function DashboardTopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchCount = async () => {
      const { count } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false);
      setUnreadCount(count ?? 0);
    };

    fetchCount();

    const channel = supabase
      .channel("topbar-notif-count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        () => fetchCount()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const activeTagline = taglines[location.pathname] ?? taglines["/dashboard"];

  return (
    <header className="px-8" style={{ paddingTop: 28, paddingBottom: 0 }}>
      <div className="flex items-center justify-between gap-4">
        <GoTwoText className="text-[48px] [&_.two]:text-[60px] shrink-0" />

        <p
          className="flex-1 text-center italic truncate"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "#2D6870",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {activeTagline}
        </p>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="relative w-10 h-10 rounded-full card-design-neumorph flex items-center justify-center"
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            onClick={() => navigate("/dashboard/notifications")}
            className="relative w-10 h-10 rounded-full card-design-neumorph flex items-center justify-center"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center"
                style={{ background: 'var(--swatch-viridian-odyssey)', color: 'var(--swatch-cream-light)' }}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 28 }} className="border-b border-border/30" />
    </header>
  );
}
