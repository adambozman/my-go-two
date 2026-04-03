import { useEffect, useRef, useState } from "react";
import { Bell, ClipboardList, Heart, Home, Settings, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { makeStorageRef, resolveStorageUrl } from "@/lib/storageRefs";

export interface MyGoTwoNavItem {
  icon: typeof Home;
  url: string;
  label: string;
  end?: boolean;
}

export const MYGOTWO_NAV_ITEMS: MyGoTwoNavItem[] = [
  { icon: Home, url: "/dashboard", end: true, label: "Home" },
  { icon: Heart, url: "/dashboard/my-go-two", label: "My Go Two" },
  { icon: Sparkles, url: "/dashboard/recommendations", label: "For You" },
  { icon: ClipboardList, url: "/dashboard/questionnaires", label: "Know Me" },
  { icon: Bell, url: "/dashboard/notifications", label: "Notifications" },
];

export function useMyGoTwoHeaderState(channelName: string) {
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
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        () => fetchUnreadCount(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelName, user]);

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
      .from("avatars-1")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      return;
    }

    const storageRef = makeStorageRef("avatars-1", path);
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

    const { data: files } = await supabase.storage.from("avatars-1").list(user.id);
    if (files?.length) {
      await supabase.storage.from("avatars-1").remove(files.map((file) => `${user.id}/${file.name}`));
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

  return {
    user,
    unreadCount,
    avatarUrl,
    displayName,
    initials,
    fileInputRef,
    handleUpload,
    handleRemovePhoto,
    handleSignOut,
    navigate,
  };
}
