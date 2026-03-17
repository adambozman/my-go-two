import { useEffect, useState, useRef } from "react";
import { Bell, Settings, Camera, Upload, Trash2, Database, ArrowLeft, Megaphone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import GoTwoText from "@/components/GoTwoText";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

import { useTopBar } from "@/contexts/TopBarContext";
import { useRotatingQuote } from "@/hooks/useRotatingQuote";

const taglines: Record<string, string> = {
  "/dashboard": "The people who matter most.",
  "/dashboard/recommendations": "AI-curated picks, just for you.",
  "/dashboard/questionnaires": "The more you share, the better they know you.",
  "/dashboard/search": "Find anything, for anyone.",
};

export function DashboardTopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { backState } = useTopBar();
  const rotatingQuote = useRotatingQuote();
  const [unreadCount, setUnreadCount] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState("?");
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

  return (
    <header className="px-4 md:px-8 shrink-0 flex flex-col" style={{ height: location.pathname.includes("recommendations") ? "auto" : "var(--header-height)", paddingTop: "var(--header-top-padding)", paddingBottom: location.pathname.includes("recommendations") ? "12px" : undefined }}>
      <div className="relative flex items-center justify-between gap-2 md:gap-4" style={{ height: "var(--header-icons-row-height)" }}>
        {/* Back button or Profile circle — left */}
        {backState ? (
          <button
            onClick={backState.onBack}
            className="relative shrink-0 focus:outline-none flex items-center gap-2"
            style={{ color: 'var(--swatch-teal)' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:block" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--swatch-teal)" }}>
              {backState.label}
            </span>
          </button>
        ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative shrink-0 focus:outline-none">
              <Avatar className="cursor-pointer" style={{ width: "var(--header-avatar-size)", height: "var(--header-avatar-size)" }}>
                {avatarUrl ? <AvatarImage src={avatarUrl} alt="Profile" /> : null}
                <AvatarFallback
                  className="text-xs md:text-sm font-semibold"
                  style={{ background: 'var(--swatch-viridian-odyssey)', color: '#fff' }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* Camera icon overlay */}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-[16px] h-[16px] md:w-[18px] md:h-[18px] rounded-full flex items-center justify-center border-2"
                style={{
                  background: 'var(--swatch-viridian-odyssey)',
                  borderColor: 'var(--swatch-cream-light)',
                }}
              >
                <Camera className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] text-white" />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </DropdownMenuItem>
            {avatarUrl && (
              <DropdownMenuItem onClick={handleRemovePhoto}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Photo
              </DropdownMenuItem>
            )}
            {user?.email === "adambozman@gmail.com" && (
              <>
                <DropdownMenuItem onClick={() => navigate("/dashboard/data-sync")}>
                  <Database className="mr-2 h-4 w-4" />
                  Data Sync
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard/sponsored")}>
                  <Megaphone className="mr-2 h-4 w-4" />
                  Sponsored Ads
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        {/* GoTwo logo — absolute center */}
        <GoTwoText className="absolute left-1/2 -translate-x-1/2" />

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

      {!location.pathname.includes("recommendations") && !location.pathname.includes("questionnaires") && location.pathname !== "/dashboard" && !location.pathname.endsWith("/dashboard") && (
        <div
          className="header-tagline-wrapper"
          style={{
            marginTop: backState ? 0 : "var(--header-tagline-margin-top)",
            opacity: backState ? 0 : 1,
            visibility: backState ? "hidden" : "visible",
            height: backState ? 0 : "auto",
            overflow: "hidden",
            transition: "opacity 0.8s ease",
            textAlign: "center",
          }}
        >
          {!backState && (
            <>
              <p className="header-tagline-quote">"{rotatingQuote.text}"</p>
              {rotatingQuote.author !== "Unknown" && (
                <p className="header-tagline-author">— {rotatingQuote.author}</p>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
}
