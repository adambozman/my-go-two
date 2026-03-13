import { useEffect, useState } from "react";
import { Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import GoTwoText from "@/components/GoTwoText";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState("?");

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url, display_name")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setAvatarUrl(data.avatar_url);
        const name = data.display_name || user.user_metadata?.display_name || user.email || "";
        const parts = name.trim().split(/\s+/);
        setInitials(
          parts.length >= 2
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : (name[0] || "?").toUpperCase()
        );
      }
    };

    fetchProfile();

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
      <div className="relative flex items-center justify-between gap-4">
        {/* Profile circle — left */}
        <Avatar className="w-[44px] h-[44px] shrink-0 cursor-pointer" onClick={() => navigate("/dashboard/my-go-two")}>
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt="Profile" />
          ) : null}
          <AvatarFallback
            className="text-sm font-semibold"
            style={{ background: 'var(--swatch-viridian-odyssey)', color: '#fff' }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* GoTwo logo — absolute center */}
        <GoTwoText className="text-[58px] [&_.two]:text-[72px] absolute left-1/2 -translate-x-1/2" />

        {/* Settings + Bell — right */}
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

      <p
        className="italic"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: "#2D6870",
          marginTop: 12,
        }}
      >
        {activeTagline}
      </p>
    </header>
  );
}
