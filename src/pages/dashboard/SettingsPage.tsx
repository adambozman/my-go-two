import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { normalizeGender } from "@/lib/gender";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { User, Bell, Shield, Users, ChevronRight, Save, KeyRound, Mail, QrCode, Copy, Check, Clock, UserCheck, UserX, CreditCard, HelpCircle, Info, Trash2, Loader2, Share2 } from "lucide-react";
import SubscriptionSection from "@/components/SubscriptionSection";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface UserConnection {
  id: string;
  inviter_id: string;
  invitee_id: string | null;
  invitee_email: string;
  status: string;
  created_at: string;
  display_label: string | null;
}

interface UserSettingsRow {
  user_id: string;
  gift_reminders: boolean;
  connection_activity: boolean;
  recommendations: boolean;
  email_digests: boolean;
}

// TEST-ONLY response shape for reseeding fake connection accounts.
interface TestProfileSeedUser {
  display_name?: string;
  email?: string;
}

interface TestProfileSeedResult {
  users?: TestProfileSeedUser[];
}

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Connection state
  const [userConnections, setUserConnections] = useState<UserConnection[]>([]);
  const [pendingConnections, setPendingConnections] = useState<UserConnection[]>([]);
  const [connectionsLoading, setConnectionsLoading] = useState(true);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sharingInvite, setSharingInvite] = useState(false);
  const [resettingTestProfiles, setResettingTestProfiles] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [shareToken, setShareToken] = useState("");

  // User settings state
  type SettingsKeys = 'gift_reminders' | 'connection_activity' | 'recommendations' | 'email_digests';
  const [settings, setSettings] = useState<Record<SettingsKeys, boolean>>({
    gift_reminders: true, connection_activity: true, recommendations: true, email_digests: true,
  });
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const fetchSettings = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from("user_settings").select("*").eq("user_id", user.id).maybeSingle();
    const row = data as UserSettingsRow | null;
    if (row) {
      setSettings({
        gift_reminders: row.gift_reminders, connection_activity: row.connection_activity,
        recommendations: row.recommendations, email_digests: row.email_digests,
      });
    }
    setSettingsLoaded(true);
  }, [user]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const toggleSetting = async (key: SettingsKeys) => {
    if (!user) return;
    const newVal = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newVal }));
    // Upsert
    const payload: Pick<UserSettingsRow, "user_id"> & Partial<UserSettingsRow> = { user_id: user.id, [key]: newVal };
    const { error } = await supabase.from("user_settings").upsert(
      payload,
      { onConflict: "user_id" }
    );
    if (error) {
      setSettings(prev => ({ ...prev, [key]: !newVal }));
      toast({ title: "Failed to save", variant: "destructive" });
    }
  };

  const inviteLink = shareToken ? `${window.location.origin}/connect?token=${shareToken}` : "";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setEmail(user.email ?? "");
        const { data } = await supabase
          .from("profiles")
          .select("display_name, gender, birthday, anniversary")
          .eq("user_id", user.id)
          .single();
        setDisplayName(data?.display_name ?? "");
        setGender(data?.gender ? normalizeGender(data.gender) : "");
        setBirthday(data?.birthday ?? "");
        setAnniversary(data?.anniversary ?? "");
      } catch (error) {
        console.error("Failed to fetch profile settings", error);
      }
    };
    fetchProfile();
  }, []);

  // Connections logic
  const callEdgeFunction = useCallback(async (action: string, extra: Record<string, string> = {}) => {
    const { data, error } = await supabase.functions.invoke("searchforaddprofile", {
      body: { action, ...extra },
    });
    if (error) throw error;
    return data;
  }, []);

  const ensureShareToken = useCallback(async () => {
    if (shareToken) return shareToken;
    const result = await callEdgeFunction("create-connection-share-token", { channel: "link", days_valid: "30" });
    const nextToken = result?.share_token?.token;
    if (!nextToken) throw new Error("Could not create invite link");
    setShareToken(nextToken);
    return nextToken as string;
  }, [callEdgeFunction, shareToken]);

  useEffect(() => {
    if (!user || !qrDialogOpen || shareToken) return;
    ensureShareToken().catch(() => undefined);
  }, [ensureShareToken, qrDialogOpen, shareToken, user]);

  const fetchConnections = useCallback(async () => {
    if (!user) { setConnectionsLoading(false); return; }
    try {
      const { data: myData } = await supabase
        .from("user_connections")
        .select("*")
        .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
        .order("created_at", { ascending: false });
      setUserConnections(myData ?? []);
      const result = await callEdgeFunction("get-pending");
      setPendingConnections(result?.pending ?? []);
    } catch (error) {
      console.error("Failed to fetch connections", error);
    }
    setConnectionsLoading(false);
  }, [callEdgeFunction, user]);

  useEffect(() => { fetchConnections(); }, [fetchConnections]);

  // Fetch user's lists for sharing toggles
  const handleDeleteConnection = async (userConnectionId: string) => {
    if (!user) return;
    const { error } = await supabase.from("user_connections").delete().eq("id", userConnectionId);
    if (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Connection removed" });
      setUserConnections(prev => prev.filter((connection) => connection.id !== userConnectionId));
      setDeleteConfirmId(null);
    }
  };

  const handleEmailInvite = async () => {
    if (!user || !inviteEmail.trim()) return;
    setSending(true);
    try {
      const token = await ensureShareToken();
      await callEdgeFunction("send-invite-email", {
        invitee_email: inviteEmail.trim().toLowerCase(),
        invite_link: `${window.location.origin}/connect?token=${token}`,
      });
      toast({ title: "Invitation sent!", description: `Invited ${inviteEmail.trim()}` });
      setInviteEmail("");
      setEmailDialogOpen(false);
      fetchConnections();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to send invite";
      toast({ title: "Could not send invite", description: message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const handleCopyLink = async () => {
    if (!inviteLink) {
      const token = await ensureShareToken();
      await navigator.clipboard.writeText(`${window.location.origin}/connect?token=${token}`);
      setCopied(true);
      toast({ title: "Link copied!" });
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareInvite = async () => {
    setSharingInvite(true);
    try {
      const token = await ensureShareToken();
      const nextInviteLink = `${window.location.origin}/connect?token=${token}`;
      const shareText = `Connect with me on Go Two.\n\n${nextInviteLink}`;

      if (typeof navigator.share === "function") {
        await navigator.share({
          title: "Connect on Go Two",
          text: shareText,
          url: nextInviteLink,
        });
        toast({ title: "Invite ready", description: "Sent from your share sheet." });
        return;
      }

      await navigator.clipboard.writeText(nextInviteLink);
      setCopied(true);
      toast({ title: "Link copied!", description: "Paste it into text, WhatsApp, or anywhere you share." });
      setTimeout(() => setCopied(false), 2000);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Could not share invite";
      toast({ title: "Could not share invite", description: message, variant: "destructive" });
    } finally {
      setSharingInvite(false);
    }
  };

  const handleAccept = async (userConnectionId: string) => {
    try {
      await callEdgeFunction("accept-invite", { invite_id: userConnectionId });
      toast({ title: "Collaboration accepted!" });
      fetchConnections();
    } catch {
      toast({ title: "Failed to accept", variant: "destructive" });
    }
  };

  const handleAcceptAll = async () => {
    try {
      await callEdgeFunction("accept-by-email");
      toast({ title: "All invitations accepted!" });
      fetchConnections();
    } catch {
      toast({ title: "Failed to accept", variant: "destructive" });
    }
  };

  const handleResetTestProfiles = async () => {
    setResettingTestProfiles(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("searchforaddprofile", {
        body: { action: "reset-test-profiles" },
      });
      if (error) {
        throw error;
      }
      const typedResult = result as TestProfileSeedResult | null;
      const summary = Array.isArray(typedResult?.users)
        ? typedResult.users.map((entry) => `${entry.display_name ?? "Unknown"} (${entry.email ?? "no-email"})`).join(", ")
        : "Test profiles reset";
      toast({ title: "Test profiles ready", description: summary });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Try again.";
      toast({ title: "Failed to reset test profiles", description: message, variant: "destructive" });
    } finally {
      setResettingTestProfiles(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <UserCheck className="w-4 h-4" style={{ color: 'var(--swatch-gothic-revival-green)' }} />;
      case "pending": return <Clock className="w-4 h-4" style={{ color: 'var(--swatch-sonoma-chardonnay)' }} />;
      default: return <UserX className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "accepted": return "Connected";
      case "pending": return "Pending";
      default: return status;
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setLoading(true);
      await supabase.from("profiles").update({ 
        display_name: displayName,
        gender: gender ? normalizeGender(gender) : null,
        birthday: birthday || null,
        anniversary: anniversary || null,
      }).eq("user_id", user.id);
      toast({ title: "Profile updated" });
    } catch (error) {
      console.error("Failed to save profile settings", error);
    } finally {
      setLoading(false);
    }
  };

  const settingsItems = [
    { key: "profile", icon: User, title: "Profile", description: "Name, gender, and account details" },
    { key: "connections", icon: Users, title: "Connections", description: "Connect someone and manage access" },
    { key: "notifications", icon: Bell, title: "Notifications", description: "Push and email preferences" },
    { key: "privacy", icon: Shield, title: "Sharing & Privacy", description: "Default sharing rules and privacy controls" },
    { key: "subscription", icon: CreditCard, title: "Subscription", description: "Your plan and billing details" },
    { key: "help", icon: HelpCircle, title: "Help & Support", description: "Get help, contact us, FAQs" },
    { key: "about", icon: Info, title: "About GoTwo", description: "Version, terms, and privacy policy" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-0" style={{ paddingTop: 24 }}>

      {/* Settings Menu */}
      {!activeSection && (
        <div className="mx-auto w-full max-w-[520px]">
          <div className="card-design-neumorph px-5 py-6 sm:px-6 md:px-10 md:py-8">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'var(--swatch-teal)' }} className="mb-8 text-center">Your Account</h2>
            <div className="flex flex-col" style={{ gap: 6 }}>
              {settingsItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-colors text-left group w-full hover:bg-secondary/30"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(var(--swatch-teal-rgb), 0.08)' }}>
                    <item.icon className="h-4 w-4" style={{ color: 'var(--swatch-teal)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm" style={{ color: 'var(--swatch-teal)' }}>{item.title}</p>
                    <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>{item.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0" style={{ color: 'var(--swatch-text-light)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="mx-auto w-full max-w-[520px]">
          <button
            onClick={() => setActiveSection(null)}
            className="hover:underline block text-left"
            style={{ color: '#2d6870', fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, marginBottom: 12 }}
          >
            ← Back to Settings
          </button>
          <div className="card-design-neumorph px-5 py-6 sm:px-6 md:px-10">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'var(--swatch-teal)' }} className="mb-6 text-center">Profile</h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={email} disabled className="rounded-xl opacity-60" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>This customizes template fields (e.g. clothing sizes) to show relevant options.</p>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select gender..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="non-binary">Non-Binary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Birthday</Label>
                <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>Stored on your profile so reminders and connection sharing have real data to work with.</p>
                <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Anniversary</Label>
                <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>Optional. Leave blank if it does not apply to you.</p>
                <Input type="date" value={anniversary} onChange={(e) => setAnniversary(e.target.value)} className="rounded-xl" />
              </div>
              <div className="flex justify-center">
                <Button className="rounded-full" onClick={handleSave} disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
              {/* Password Change */}
              <div className="border-t pt-6 mt-6" style={{ borderColor: 'rgba(var(--swatch-teal-rgb), 0.1)' }}>
                <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--swatch-teal)' }}>Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" minLength={6} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" minLength={6} className="rounded-xl" />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      className="rounded-full"
                      disabled={passwordLoading || !newPassword || newPassword.length < 6}
                      onClick={async () => {
                        if (newPassword !== confirmPassword) {
                          toast({ title: "Passwords don't match", variant: "destructive" });
                          return;
                        }
                        setPasswordLoading(true);
                        try {
                          const { error } = await supabase.auth.updateUser({ password: newPassword });
                          if (error) throw error;
                          toast({ title: "Password updated" });
                          setNewPassword("");
                          setConfirmPassword("");
                        } catch (error: unknown) {
                          const message = error instanceof Error ? error.message : "Could not update password";
                          toast({ title: "Error", description: message, variant: "destructive" });
                        } finally {
                          setPasswordLoading(false);
                        }
                      }}
                    >
                      <KeyRound className="mr-2 h-4 w-4" />
                      {passwordLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connections Section */}
      {activeSection === "connections" && (
        <div className="mx-auto w-full max-w-[520px]">
          <button
            onClick={() => setActiveSection(null)}
            className="hover:underline block text-left"
            style={{ color: '#2d6870', fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, marginBottom: 12 }}
          >
            ← Back to Settings
          </button>
          <div className="card-design-neumorph px-5 py-6 sm:px-6 md:px-10">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'var(--swatch-teal)' }} className="mb-6 text-center">Connections</h2>

            {/* Invite Methods */}
            <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
              <button
                onClick={() => setQrDialogOpen(true)}
                className="card-design-neumorph p-5 text-left hover:scale-[1.01] transition-transform group flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(var(--swatch-teal-rgb), 0.08)' }}>
                  <QrCode className="w-5 h-5" style={{ color: 'var(--swatch-teal)' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm group-hover:underline" style={{ color: 'var(--swatch-teal)' }}>Share QR Code</h3>
                  <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>Scan to connect</p>
                </div>
              </button>
              <button
                onClick={() => setEmailDialogOpen(true)}
                className="card-design-neumorph p-5 text-left hover:scale-[1.01] transition-transform group flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(var(--swatch-teal-rgb), 0.08)' }}>
                  <Mail className="w-5 h-5" style={{ color: 'var(--swatch-teal)' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm group-hover:underline" style={{ color: 'var(--swatch-teal)' }}>Invite by Email</h3>
                  <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>Send an invitation</p>
                </div>
              </button>
              <button
                onClick={handleShareInvite}
                disabled={sharingInvite}
                className="card-design-neumorph p-5 text-left hover:scale-[1.01] transition-transform group flex items-center gap-3 disabled:opacity-60"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(var(--swatch-teal-rgb), 0.08)' }}>
                  {sharingInvite ? (
                    <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--swatch-teal)' }} />
                  ) : (
                    <Share2 className="w-5 h-5" style={{ color: 'var(--swatch-teal)' }} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm group-hover:underline" style={{ color: 'var(--swatch-teal)' }}>Share Link</h3>
                  <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>Text, phone, or WhatsApp</p>
                </div>
              </button>
            </div>
            <div className="mb-8">
              <Button
                variant="outline"
                className="rounded-full w-full"
                onClick={handleResetTestProfiles}
                disabled={resettingTestProfiles}
              >
                {resettingTestProfiles ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {resettingTestProfiles ? "Resetting test profiles..." : "Reset 2 Test Profiles"}
              </Button>
              <p className="mt-2 text-xs text-center" style={{ color: "var(--swatch-text-light)" }}>
                TEST-ONLY: resets Harper and Rowan as fake profiles for connection, delete, and share QA.
              </p>
            </div>

            {/* Pending Invites */}
            {pendingConnections.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--swatch-teal)' }}>Pending Invitations</h3>
                  {pendingConnections.length > 1 && (
                    <Button size="sm" variant="outline" className="rounded-full" onClick={handleAcceptAll}>Accept All</Button>
                  )}
                </div>
                <div className="space-y-3">
                  {pendingConnections.map((connection) => (
                    <div key={connection.id} className="card-design-neumorph flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5" style={{ color: 'var(--swatch-sonoma-chardonnay)' }} />
                        <span className="text-sm" style={{ color: 'var(--swatch-text-light)' }}>Someone invited you to connect</span>
                      </div>
                      <Button size="sm" className="rounded-full" onClick={() => handleAccept(connection.id)}>Accept</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connections List */}
            <div>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--swatch-teal)' }}>Your Connections</h3>
              {connectionsLoading ? (
                <p style={{ color: 'var(--swatch-text-light)' }} className="text-sm">Loading...</p>
              ) : userConnections.length === 0 && pendingConnections.length === 0 ? (
                <div className="card-design-neumorph p-8 text-center">
                  <Users className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--swatch-text-light)' }} />
                  <p className="text-sm" style={{ color: 'var(--swatch-text-light)' }}>No connections yet. Invite someone above!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userConnections.map((c) => {
                    const displayName = c.display_label || c.invitee_email || "Connection";
                    return (
                      <div key={c.id} className="card-design-neumorph flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(c.status)}
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--swatch-teal)' }}>{displayName}</p>
                            <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>
                              {c.inviter_id === user?.id ? "You invited" : "Invited you"} · {new Date(c.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full" style={{
                            background: c.status === "accepted" ? 'rgba(157, 166, 79, 0.2)' : 'rgba(233, 203, 116, 0.2)',
                            color: c.status === "accepted" ? 'var(--swatch-gothic-revival-green)' : 'var(--swatch-sonoma-chardonnay)',
                          }}>
                            {getStatusLabel(c.status)}
                          </span>
                          {deleteConfirmId === c.id ? (
                            <div className="flex gap-1.5">
                              <Button size="sm" variant="outline" className="rounded-full text-xs h-7 px-2" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                              <Button size="sm" variant="destructive" className="rounded-full text-xs h-7 px-2" onClick={() => handleDeleteConnection(c.id)}>Delete</Button>
                            </div>
                          ) : (
                            <button
                              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-destructive/10 transition-colors"
                              onClick={() => setDeleteConfirmId(c.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-destructive" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Section */}
      {activeSection === "notifications" && (
        <div className="mx-auto w-full max-w-[520px]">
          <button
            onClick={() => setActiveSection(null)}
            className="hover:underline block text-left"
            style={{ color: '#2d6870', fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, marginBottom: 12 }}
          >
            ← Back to Settings
          </button>
          <div className="card-design-neumorph px-5 py-6 sm:px-6 md:px-10">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'var(--swatch-teal)' }} className="mb-6 text-center">Notifications</h2>
            <div className="space-y-5">
              {([
                { label: "Gift reminders", desc: "Get notified before birthdays and anniversaries", key: "gift_reminders" as SettingsKeys },
                { label: "Connection activity", desc: "When a connection updates their preferences", key: "connection_activity" as SettingsKeys },
                { label: "New recommendations", desc: "AI-powered suggestions for your connections", key: "recommendations" as SettingsKeys },
                { label: "Email digests", desc: "Weekly summary of updates and ideas", key: "email_digests" as SettingsKeys },
              ]).map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--swatch-teal)' }}>{item.label}</p>
                    <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>{item.desc}</p>
                  </div>
                  <Switch
                    checked={settings[item.key]}
                    onCheckedChange={() => toggleSetting(item.key)}
                    disabled={!settingsLoaded}
                  />
                </div>
              ))}
              <p className="text-xs pt-4" style={{ color: 'var(--swatch-text-light)' }}>
                Notification preferences are saved automatically.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sharing & Privacy Section */}
      {activeSection === "privacy" && (
        <div className="mx-auto w-full max-w-[520px]">
          <button
            onClick={() => setActiveSection(null)}
            className="hover:underline block text-left"
            style={{ color: '#2d6870', fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, marginBottom: 12 }}
          >
            ← Back to Settings
          </button>
          <div className="card-design-neumorph px-5 py-6 sm:px-6 md:px-10">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'var(--swatch-teal)' }} className="mb-6 text-center">Sharing & Privacy</h2>
            <div className="space-y-5">
              <div className="card-design-neumorph p-5">
                <p className="text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--swatch-cedar-grove)' }}>Connection-specific sharing</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--swatch-text-light)' }}>
                  Sharing is now managed connection by connection. Open any connection to choose exactly which profile fields, derived features, and product cards they can see.
                </p>
                <div className="mt-4 space-y-2">
                  {userConnections.filter((connection) => connection.status === "accepted").length === 0 ? (
                    <p className="text-sm" style={{ color: 'var(--swatch-text-light)' }}>No accepted connections yet.</p>
                  ) : (
                    userConnections
                      .filter((connection) => connection.status === "accepted")
                      .map((connection) => {
                        const displayName = connection.display_label || connection.invitee_email || "Connection";
                        return (
                          <button
                            key={`privacy-${connection.id}`}
                            onClick={() => navigate(`/dashboard/connections/${connection.id}`)}
                            className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors hover:bg-secondary/30"
                            style={{ border: '1px solid rgba(var(--swatch-teal-rgb), 0.08)' }}
                          >
                            <div>
                              <p className="text-sm font-medium" style={{ color: 'var(--swatch-teal)' }}>{displayName}</p>
                              <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>Manage fields, cards, and shared access</p>
                            </div>
                            <ChevronRight className="h-4 w-4" style={{ color: 'var(--swatch-text-light)' }} />
                          </button>
                        );
                      })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Section */}
      {activeSection === "subscription" && (
        <SubscriptionSection onBack={() => setActiveSection(null)} />
      )}

      {/* Help & Support Section */}
      {activeSection === "help" && (
        <div className="mx-auto w-full max-w-[520px]">
          <button
            onClick={() => setActiveSection(null)}
            className="hover:underline block text-left"
            style={{ color: '#2d6870', fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, marginBottom: 12 }}
          >
            ← Back to Settings
          </button>
          <div className="card-design-neumorph px-5 py-6 sm:px-6 md:px-10">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'var(--swatch-teal)' }} className="mb-6 text-center">Help & Support</h2>
            <div className="space-y-3">
              {[
                { label: "FAQs", desc: "Common questions and quick answers", href: "#" },
                { label: "Contact Support", desc: "Reach our team via email", href: "mailto:support@gotwo.app" },
                { label: "Report a Bug", desc: "Let us know if something isn't working", href: "mailto:bugs@gotwo.app" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors text-left group w-full hover:bg-secondary/30"
                  style={{ border: '1px solid rgba(var(--swatch-teal-rgb), 0.08)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm" style={{ color: 'var(--swatch-teal)' }}>{item.label}</p>
                    <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0" style={{ color: 'var(--swatch-text-light)' }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About GoTwo Section */}
      {activeSection === "about" && (
        <div className="mx-auto w-full max-w-[520px]">
          <button
            onClick={() => setActiveSection(null)}
            className="hover:underline block text-left"
            style={{ color: '#2d6870', fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, marginBottom: 12 }}
          >
            ← Back to Settings
          </button>
          <div className="card-design-neumorph px-5 py-6 sm:px-6 md:px-10">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'var(--swatch-teal)' }} className="mb-6 text-center">About GoTwo</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between py-1">
                <p className="text-sm" style={{ color: 'var(--swatch-teal)' }}>Version</p>
                <p className="text-sm" style={{ color: 'var(--swatch-text-light)' }}>1.0.0</p>
              </div>
              <div className="border-t" style={{ borderColor: 'rgba(var(--swatch-teal-rgb), 0.1)' }} />
              {[
                { label: "Terms of Service", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Open Source Licenses", href: "#" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-center justify-between py-1 group">
                  <p className="text-sm group-hover:underline" style={{ color: 'var(--swatch-teal)' }}>{item.label}</p>
                  <ChevronRight className="h-4 w-4" style={{ color: 'var(--swatch-text-light)' }} />
                </a>
              ))}
              <div className="border-t pt-4" style={{ borderColor: 'rgba(var(--swatch-teal-rgb), 0.1)' }}>
                <p className="text-xs text-center" style={{ color: 'var(--swatch-text-light)' }}>
                  Made with care for people who actually pay attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="card-design-neumorph p-6 rounded-2xl">
              <QRCodeSVG
                value={inviteLink || `${window.location.origin}/connect`}
                size={200}
                bgColor="transparent"
                fgColor="#2F5F6D"
                level="M"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Have your connection scan this code to link your accounts
            </p>
            <div className="flex items-center gap-2 w-full">
              <Input value={inviteLink} readOnly className="rounded-xl text-xs" />
              <Button variant="outline" size="icon" className="shrink-0" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Invite Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite by Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Connection Email</Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="connection@example.com"
                className="rounded-xl"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              If they already have an account, they'll see the invite in their Settings. Otherwise, share your QR code or invite link.
            </p>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={handleEmailInvite} disabled={!inviteEmail.trim() || sending}>
              {sending ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;

// Codebase classification: runtime settings page with test-profile reset controls.
