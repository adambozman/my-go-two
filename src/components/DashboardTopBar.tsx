import { useEffect, useState, useRef } from "react";
import { Bell, Settings, Camera, Upload, Trash2, Database, Megaphone, Home, Heart, Sparkles, ClipboardList, Search } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import GoTwoText from "@/components/GoTwoText";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

import { useTopBar } from "@/contexts/TopBarContext";
import { useRotatingQuote } from "@/hooks/useRotatingQuote";
import { cn } from "@/lib/utils";

const taglines: Record<string, string> = {
  "/dashboard": "The people who matter most.",
  "/dashboard/recommendations": "AI-curated picks, just for you.",
  "/dashboard/questionnaires": "The more you share, the better they know you.",
  "/dashboard/search": "Find anything, for anyone.",
};

const navItems = [
  { icon: Home, url: "/dashboard", end: true, label: "Home" },
  { icon: Heart, url: "/dashboard/my-go-two", label: "My Go Two" },
  { icon: Sparkles, url: "/dashboard/recommendations", label: "For You" },
  { icon: ClipboardList, url: "/dashboard/questionnaires", label: "Know Me" },
  { icon: Search, url: "/dashboard/search", label: "Search" },
] as const;

export function DashboardTopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { backState } = useTopBar();
  const rotatingQuote = useRotatingQuote();
  const [unreadCount, setUnreadCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url, display_name")
        .eq("user_id", user.id)
        .single();
      if (data) {
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      return;
    }

    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", user.id);

    if (!updateError) {
      setAvatarUrl(publicUrl);
      toast({ title: "Photo updated!" });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemovePhoto = async () => {
    if (!user) return;

    const { data: files } = await supabase.storage.from("avatars").list(user.id);
    if (files?.length) {
      await supabase.storage.from("avatars").remove(files.map((f) => `${user.id}/${f.name}`));
    }

    await supabase.from("profiles").update({ avatar_url: null }).eq("user_id", user.id);
    setAvatarUrl(null);
    toast({ title: "Photo removed" });
  };

  const isMyGoTwo = location.pathname === "/dashboard/my-go-two";
  const activeTagline = taglines[location.pathname] ?? taglines["/dashboard"];
  const showQuote = isMyGoTwo;

  return (
    <header
      className="px-4 md:px-8 shrink-0 flex flex-col"
      style={{
        height: "var(--header-height)",
        paddingTop: "var(--header-top-padding)",
      }}
    >
      <div className="relative flex items-center justify-between gap-2 md:gap-4" style={{ height: "var(--header-icons-row-height)" }}>
        <div className="shrink-0" style={{ width: "var(--header-avatar-size)", height: "var(--header-avatar-size)" }} />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        {/* GoTwo logo — left aligned */}
        <GoTwoText className="absolute left-0 translate-x-0" />

        <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-start gap-2 md:gap-3">
          {navItems.map((item) => {
            const isActive = item.end ? location.pathname === item.url : location.pathname.startsWith(item.url);
            return (
              <NavLink
                key={item.url}
                to={item.url}
                aria-label={item.label}
                className={cn(
                  "flex w-[66px] flex-col items-center gap-1 text-center transition-all",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className="relative rounded-full card-design-neumorph flex items-center justify-center"
                  style={{
                    width: "var(--header-icon-btn-size)",
                    height: "var(--header-icon-btn-size)",
                    background: isActive ? "rgba(245,233,220,0.92)" : undefined,
                    borderColor: isActive ? "rgba(45,104,112,0.18)" : undefined,
                    boxShadow: isActive
                      ? "inset 0 1px 0 rgba(255,255,255,0.94), 0 8px 20px rgba(45,104,112,0.10), 0 0 0 1px rgba(45,104,112,0.06)"
                      : undefined,
                  }}
                >
                  <item.icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
                <span className="whitespace-nowrap text-[10px] font-medium leading-none" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Settings + Bell — right */}
        <div className="flex items-center gap-1.5 md:gap-2.5 shrink-0">
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="relative rounded-full card-design-neumorph flex items-center justify-center"
            style={{ width: "var(--header-icon-btn-size)", height: "var(--header-icon-btn-size)" }}
          >
            <Settings className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground" />
          </button>

          <button
            onClick={() => navigate("/dashboard/notifications")}
            className="relative rounded-full card-design-neumorph flex items-center justify-center"
            style={{ width: "var(--header-icon-btn-size)", height: "var(--header-icon-btn-size)" }}
          >
            <Bell className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground" />
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

      <div className="border-b border-border/30" style={{ marginTop: "var(--header-divider-margin-top)" }} />

      {showQuote && (
        <div
          className="header-tagline-wrapper"
          style={{
            marginTop: "var(--header-tagline-margin-top)",
            transition: "opacity 0.8s ease",
            textAlign: "center",
          }}
        >
          <p className="header-tagline-quote">"{rotatingQuote.text}"</p>
          {rotatingQuote.author !== "Unknown" && (
            <p className="header-tagline-author">— {rotatingQuote.author}</p>
          )}
        </div>
      )}
    </header>
  );
}
