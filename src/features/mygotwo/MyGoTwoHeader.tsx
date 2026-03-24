import { useEffect, useRef, useState } from "react";
import { Bell, Settings, Upload, Trash2, ChevronDown, LogOut, Home, Heart, Sparkles, ClipboardList } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import GoTwoText from "@/components/GoTwoText";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { makeStorageRef, resolveStorageUrl } from "@/lib/storageRefs";

const navItems = [
  { icon: Home, url: "/dashboard", end: true, label: "Home" },
  { icon: Heart, url: "/dashboard/my-go-two", label: "My Go Two" },
  { icon: Sparkles, url: "/dashboard/recommendations", label: "For You" },
  { icon: ClipboardList, url: "/dashboard/questionnaires", label: "Know Me" },
  { icon: Bell, url: "/dashboard/notifications", label: "Notifications" },
] as const;

export default function MyGoTwoHeader() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [unreadCount, setUnreadCount] = useState(0);
  const [avatarValue, setAvatarValue] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("My Account");
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

      if (!data) return;

      setAvatarValue(data.avatar_url);
      const resolvedName = data.display_name || user.user_metadata?.display_name || user.email || "My Account";
      setDisplayName(resolvedName);
      const parts = resolvedName.trim().split(/\s+/).filter(Boolean);
      const nextInitials = parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`
        : (resolvedName[0] || "?");
      setInitials(nextInitials.toUpperCase());
    };

    const fetchUnreadCount = async () => {
      const { count } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false);
      setUnreadCount(count ?? 0);
    };

    fetchProfile();
    fetchUnreadCount();

    const channel = supabase
      .channel("mygotwo-notif-count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        () => fetchUnreadCount(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    let cancelled = false;

    const loadAvatar = async () => {
      const resolved = await resolveStorageUrl(avatarValue);
      if (!cancelled) setAvatarUrl(resolved || null);
    };

    loadAvatar();

    return () => {
      cancelled = true;
    };
  }, [avatarValue]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

    const storageRef = makeStorageRef("avatars", path);
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: storageRef })
      .eq("user_id", user.id);

    if (!updateError) {
      setAvatarValue(storageRef);
      toast({ title: "Photo updated!" });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemovePhoto = async () => {
    if (!user) return;

    const { data: files } = await supabase.storage.from("avatars").list(user.id);
    if (files?.length) {
      await supabase.storage.from("avatars").remove(files.map((file) => `${user.id}/${file.name}`));
    }

    await supabase.from("profiles").update({ avatar_url: null }).eq("user_id", user.id);
    setAvatarValue(null);
    setAvatarUrl(null);
    toast({ title: "Photo removed" });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign out right now.";
      toast({ title: "Sign out failed", description: message, variant: "destructive" });
    }
  };

  return (
    <header
      className="shrink-0 flex flex-col px-3 sm:px-4 md:px-6 lg:px-8"
      style={{
        minHeight: "calc(var(--header-top-padding) + var(--header-icons-row-height) + var(--header-divider-margin-top) + 1px)",
        paddingTop: "var(--header-top-padding)",
      }}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5 sm:gap-2 md:gap-4" style={{ height: "var(--header-icons-row-height)" }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        <div className="flex min-w-0 items-center justify-start">
          <GoTwoText className="shrink min-w-0 text-[clamp(18px,5vw,54px)]" />
        </div>

        <nav className="flex min-w-0 items-start justify-center gap-1 sm:gap-1.5 lg:gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.end}
              aria-label={item.label}
              className="flex w-[32px] flex-col items-center gap-1 text-center text-muted-foreground transition-all hover:text-foreground sm:w-[40px] md:w-[56px] lg:w-[66px]"
            >
              <span
                className="relative rounded-full card-design-neumorph flex items-center justify-center"
                style={{
                  width: "clamp(26px, 5vw, var(--header-icon-btn-size))",
                  height: "clamp(26px, 5vw, var(--header-icon-btn-size))",
                }}
              >
                <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                {item.url === "/dashboard/notifications" && unreadCount > 0 ? (
                  <span
                    className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-0.5 text-[8px] font-bold sm:h-5 sm:min-w-[20px] sm:text-[10px]"
                    style={{ background: "var(--swatch-teal)", color: "var(--swatch-cream-light)" }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                ) : null}
              </span>
              <span className="hidden whitespace-nowrap text-[10px] font-medium leading-none lg:block" style={{ fontFamily: "'Jost', sans-serif" }}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="group flex items-center gap-1.5 rounded-full border border-white/70 px-1.5 py-1 text-left transition-all hover:border-white hover:shadow-[0_10px_28px_rgba(74,96,104,0.12)] focus:outline-none sm:gap-2 sm:px-2 sm:py-1.5 md:gap-3 md:px-2.5"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(245,233,220,0.56) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.92), 0 6px 18px rgba(74,96,104,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Avatar className="h-7 w-7 border border-white/70 shadow-[0_4px_10px_rgba(30,74,82,0.12)] sm:h-8 sm:w-8">
                  <AvatarImage src={avatarUrl ?? undefined} alt={displayName} className="object-cover" />
                  <AvatarFallback
                    className="text-[11px] font-semibold"
                    style={{
                      background: "linear-gradient(135deg, rgba(45,104,112,0.92) 0%, rgba(30,74,82,0.92) 100%)",
                      color: "var(--swatch-cream-light)",
                    }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden min-w-0 md:block">
                  <p
                    className="truncate text-sm font-medium leading-none"
                    style={{ color: "var(--swatch-teal)", maxWidth: "7rem", fontFamily: "'Jost', sans-serif" }}
                  >
                    {displayName}
                  </p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180 sm:h-4 sm:w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-2xl border border-white/70 p-2"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(245,233,220,0.9) 100%)",
                boxShadow: "0 18px 42px rgba(30,74,82,0.14), inset 0 1px 0 rgba(255,255,255,0.88)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div className="mb-2 flex items-center gap-3 rounded-2xl px-2 py-2">
                <Avatar className="h-10 w-10 border border-white/70">
                  <AvatarImage src={avatarUrl ?? undefined} alt={displayName} className="object-cover" />
                  <AvatarFallback
                    className="text-xs font-semibold"
                    style={{
                      background: "linear-gradient(135deg, rgba(45,104,112,0.92) 0%, rgba(30,74,82,0.92) 100%)",
                      color: "var(--swatch-cream-light)",
                    }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold" style={{ color: "var(--swatch-teal)" }}>
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")} className="rounded-xl">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="rounded-xl">
                <Upload className="mr-2 h-4 w-4" />
                Upload photo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRemovePhoto} className="rounded-xl">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove photo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="rounded-xl text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border-b border-border/30" style={{ marginTop: "var(--header-divider-margin-top)" }} />
    </header>
  );
}
