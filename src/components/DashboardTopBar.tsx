import { useEffect, useState, useRef } from "react";
import { Bell, Settings, Camera, Upload, Trash2, Database } from "lucide-react";
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
  const { toast } = useToast();
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

  const activeTagline = taglines[location.pathname] ?? taglines["/dashboard"];

  return (
    <header className="px-4 md:px-8 pt-4 md:pt-7">
      <div className="relative flex items-center justify-between gap-2 md:gap-4">
        {/* Profile circle with dropdown — left */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative shrink-0 focus:outline-none">
              <Avatar className="w-9 h-9 md:w-[52px] md:h-[52px] cursor-pointer">
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
              <DropdownMenuItem onClick={() => navigate("/dashboard/data-sync")}>
                <Database className="mr-2 h-4 w-4" />
                Data Sync
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        {/* GoTwo logo — absolute center */}
        <GoTwoText className="text-[38px] md:text-[72px] [&_.two]:text-[48px] md:[&_.two]:text-[88px] absolute left-1/2 -translate-x-1/2" />

        {/* Settings + Bell — right */}
        <div className="flex items-center gap-1.5 md:gap-2.5 shrink-0">
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="relative w-8 h-8 md:w-10 md:h-10 rounded-full card-design-neumorph flex items-center justify-center"
          >
            <Settings className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground" />
          </button>

          <button
            onClick={() => navigate("/dashboard/notifications")}
            className="relative w-8 h-8 md:w-10 md:h-10 rounded-full card-design-neumorph flex items-center justify-center"
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

      <div className="mt-5 md:mt-7 border-b border-border/30" />

      <p
        className="italic text-center text-[13px] md:text-[22px] mt-3"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: "#2D6870",
        }}
      >
        {activeTagline}
      </p>
    </header>
  );
}
