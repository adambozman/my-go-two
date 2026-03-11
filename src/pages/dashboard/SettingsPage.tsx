import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { User, Bell, Shield, Users, ChevronRight, Save, KeyRound, Mail, QrCode, Copy, Check, Clock, UserCheck, UserX, CreditCard, HelpCircle, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Couple {
  id: string;
  inviter_id: string;
  invitee_id: string | null;
  invitee_email: string;
  status: string;
  created_at: string;
}

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Connections state
  const [couples, setCouples] = useState<Couple[]>([]);
  const [pendingForMe, setPendingForMe] = useState<Couple[]>([]);
  const [connectionsLoading, setConnectionsLoading] = useState(true);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const inviteLink = user
    ? `${window.location.origin}/connect?invite=${user.id}`
    : "";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setEmail(user.email ?? "");
        const { data } = await supabase.from("profiles").select("display_name, gender").eq("user_id", user.id).single();
        setDisplayName(data?.display_name ?? "");
        setGender((data as any)?.gender ?? "");
      } catch {}
    };
    fetchProfile();
  }, []);

  // Connections logic
  const callEdgeFunction = async (action: string, extra: Record<string, string> = {}) => {
    const { data, error } = await supabase.functions.invoke("collaborations", {
      body: { action, ...extra },
    });
    if (error) throw error;
    return data;
  };

  const fetchConnections = async () => {
    if (!user) { setConnectionsLoading(false); return; }
    try {
      const { data: myData } = await supabase
        .from("couples")
        .select("*")
        .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
        .order("created_at", { ascending: false });
      setCouples(myData ?? []);
      const result = await callEdgeFunction("get-pending");
      setPendingForMe(result?.pending ?? []);
    } catch {}
    setConnectionsLoading(false);
  };

  useEffect(() => { fetchConnections(); }, [user]);

  const handleEmailInvite = async () => {
    if (!user || !inviteEmail.trim()) return;
    setSending(true);
    const { error } = await supabase.from("couples").insert({
      inviter_id: user.id,
      invitee_email: inviteEmail.trim(),
    });
    setSending(false);
    if (error) {
      toast({ title: "Could not send invite", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Invitation sent!", description: `Invited ${inviteEmail.trim()}` });
      setInviteEmail("");
      setEmailDialogOpen(false);
      fetchConnections();
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAccept = async (coupleId: string) => {
    try {
      await callEdgeFunction("accept-invite", { invite_id: coupleId });
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
        gender: gender || null,
      } as any).eq("user_id", user.id);
      toast({ title: "Profile updated" });
    } catch {} finally {
      setLoading(false);
    }
  };

  const settingsItems = [
    { key: "profile", icon: User, title: "Profile", description: "Name, gender, and account details" },
    { key: "connections", icon: Users, title: "Connections", description: "Connect your partner and manage access" },
    { key: "notifications", icon: Bell, title: "Notifications", description: "Push and email preferences" },
    { key: "privacy", icon: Shield, title: "Sharing & Privacy", description: "Default sharing rules and privacy controls" },
    { key: "subscription", icon: CreditCard, title: "Subscription", description: "Your plan and billing details" },
    { key: "help", icon: HelpCircle, title: "Help & Support", description: "Get help, contact us, FAQs" },
    { key: "about", icon: Info, title: "About GoTwo", description: "Version, terms, and privacy policy" },
  ];

  return (
    <div className="max-w-4xl">

      {/* Settings Menu */}
      {!activeSection && (
        <div className="relative overflow-hidden" style={{ background: '#1e4a52', borderRadius: 20, padding: '40px 32px' }}>
          {/* Decorative orbs */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,84,58,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -50, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="relative z-10">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 28, color: 'white' }} className="mb-6">Your Account</h2>
            <div className="flex flex-col gap-1">
              {settingsItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors text-left group w-full hover:bg-white/10"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }}>
                    <item.icon className="h-4 w-4" style={{ color: 'rgba(255,255,255,0.7)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm" style={{ color: 'white' }}>{item.title}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="card-design-neumorph p-8">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:underline mb-4 block">
            ← Back to Settings
          </button>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Profile</h2>
          
          <div className="space-y-5 max-w-md">
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
              <p className="text-xs text-muted-foreground">This customizes template fields (e.g. clothing sizes) to show relevant options.</p>
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

            <Button className="rounded-full" onClick={handleSave} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>

            {/* Password Change */}
            <div className="border-t border-border/30 pt-6 mt-6">
              <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--swatch-viridian-odyssey)' }}>
                Change Password
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="rounded-xl"
                  />
                </div>
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
                    } catch (error: any) {
                      toast({ title: "Error", description: error.message, variant: "destructive" });
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
      )}

      {/* Connections Section */}
      {activeSection === "connections" && (
        <div className="card-design-neumorph p-8">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:underline mb-4 block">
            ← Back to Settings
          </button>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Connections</h2>

          {/* Invite Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setQrDialogOpen(true)}
              className="card-design-neumorph p-6 text-left hover:scale-[1.01] transition-transform group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.5)' }}>
                <QrCode className="w-6 h-6" style={{ color: 'var(--swatch-viridian-odyssey)' }} />
              </div>
              <div>
                <h3 className="font-semibold text-primary group-hover:underline">Share QR Code</h3>
                <p className="text-sm text-muted-foreground">Scan to connect instantly</p>
              </div>
            </button>

            <button
              onClick={() => setEmailDialogOpen(true)}
              className="card-design-neumorph p-6 text-left hover:scale-[1.01] transition-transform group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.5)' }}>
                <Mail className="w-6 h-6" style={{ color: 'var(--swatch-cedar-grove)' }} />
              </div>
              <div>
                <h3 className="font-semibold text-primary group-hover:underline">Invite by Email</h3>
                <p className="text-sm text-muted-foreground">Send an email invitation</p>
              </div>
            </button>
          </div>

          {/* Pending Invites */}
          {pendingForMe.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-primary">Pending Invitations</h3>
                {pendingForMe.length > 1 && (
                  <Button size="sm" variant="outline" className="rounded-full" onClick={handleAcceptAll}>
                    Accept All
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {pendingForMe.map((c) => (
                  <div key={c.id} className="card-design-neumorph p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" style={{ color: 'var(--swatch-sonoma-chardonnay)' }} />
                      <span className="text-sm text-muted-foreground">Someone invited you to connect</span>
                    </div>
                    <Button size="sm" className="rounded-full" onClick={() => handleAccept(c.id)}>Accept</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connections List */}
          <div>
            <h3 className="text-base font-bold text-primary mb-4">Your Connections</h3>
            {connectionsLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : couples.length === 0 && pendingForMe.length === 0 ? (
              <div className="card-design-neumorph p-8 text-center">
                <Users className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--swatch-gypsum-rose)' }} />
                <p className="text-muted-foreground">No connections yet. Invite someone using a QR code or email above!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {couples.map((c) => (
                  <div key={c.id} className="card-design-neumorph p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(c.status)}
                      <div>
                        <p className="text-sm font-medium text-primary">{c.invitee_email}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.inviter_id === user?.id ? "You invited" : "Invited you"} · {new Date(c.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        background: c.status === "accepted" ? 'rgba(157, 166, 79, 0.2)' : 'rgba(233, 203, 116, 0.2)',
                        color: c.status === "accepted" ? 'var(--swatch-gothic-revival-green)' : 'var(--swatch-sonoma-chardonnay)',
                      }}
                    >
                      {getStatusLabel(c.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications Section */}
      {activeSection === "notifications" && (
        <div className="card-design-neumorph p-8">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:underline mb-4 block">
            ← Back to Settings
          </button>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Notifications</h2>
          <div className="space-y-5 max-w-md">
            {[
              { label: "Gift reminders", desc: "Get notified before birthdays and anniversaries", key: "gift_reminders" },
              { label: "Partner activity", desc: "When your partner updates their preferences", key: "partner_activity" },
              { label: "New recommendations", desc: "AI-powered suggestions for your partner", key: "recommendations" },
              { label: "Email digests", desc: "Weekly summary of updates and ideas", key: "email_digests" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--swatch-viridian-odyssey)' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.5)' }}>
                    <div className="absolute top-[2px] left-[2px] w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full" style={{ background: 'var(--swatch-teal)' }} />
                  </div>
                </label>
              </div>
            ))}
            <p className="text-xs pt-4" style={{ color: 'var(--swatch-text-light)' }}>
              Notification preferences are saved automatically.
            </p>
          </div>
        </div>
      )}

      {/* Sharing & Privacy Section */}
      {activeSection === "privacy" && (
        <div className="card-design-neumorph p-8">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:underline mb-4 block">
            ← Back to Settings
          </button>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Sharing & Privacy</h2>
          <div className="space-y-5 max-w-md">
            {[
              { label: "Share preferences with partner", desc: "Let your connected partner see your style and size preferences", key: "share_prefs" },
              { label: "Share wish list", desc: "Allow your partner to view your saved items", key: "share_wishlist" },
              { label: "Visible profile", desc: "Let others find you by email when sending invites", key: "visible_profile" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--swatch-viridian-odyssey)' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.5)' }}>
                    <div className="absolute top-[2px] left-[2px] w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full" style={{ background: 'var(--swatch-teal)' }} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subscription Section */}
      {activeSection === "subscription" && (
        <div className="card-design-neumorph p-8">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:underline mb-4 block">
            ← Back to Settings
          </button>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Subscription</h2>
          <div className="space-y-6 max-w-md">
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.25)', border: '1px solid rgba(var(--swatch-teal-rgb), 0.12)' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Current Plan</p>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(var(--swatch-teal-rgb), 0.15)', color: 'var(--swatch-teal)' }}>Free</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>You're on the free plan. Upgrade to unlock unlimited lists, AI recommendations, and more.</p>
            </div>
            <Button className="rounded-full w-full" style={{ background: '#d4543a', color: 'white', boxShadow: '0 4px 20px rgba(212,84,58,0.3)' }}>
              Upgrade Plan
            </Button>
            <div className="border-t pt-4" style={{ borderColor: 'rgba(var(--swatch-teal-rgb), 0.1)' }}>
              <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>
                Need to manage billing or cancel? Contact us at support@gotwo.app
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Section */}
      {activeSection === "help" && (
        <div className="card-design-neumorph p-8">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:underline mb-4 block">
            ← Back to Settings
          </button>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Help & Support</h2>
          <div className="space-y-3 max-w-md">
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
                  <p className="font-medium text-sm" style={{ color: 'var(--swatch-viridian-odyssey)' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'var(--swatch-text-light)' }}>{item.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0" style={{ color: 'var(--swatch-text-light)' }} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* About GoTwo Section */}
      {activeSection === "about" && (
        <div className="card-design-neumorph p-8">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:underline mb-4 block">
            ← Back to Settings
          </button>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>About GoTwo</h2>
          <div className="space-y-5 max-w-md">
            <div className="flex items-center justify-between py-1">
              <p className="text-sm" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Version</p>
              <p className="text-sm" style={{ color: 'var(--swatch-text-light)' }}>1.0.0</p>
            </div>
            <div className="border-t" style={{ borderColor: 'rgba(var(--swatch-teal-rgb), 0.1)' }} />
            {[
              { label: "Terms of Service", href: "#" },
              { label: "Privacy Policy", href: "#" },
              { label: "Open Source Licenses", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-1 group"
              >
                <p className="text-sm group-hover:underline" style={{ color: 'var(--swatch-viridian-odyssey)' }}>{item.label}</p>
                <ChevronRight className="h-4 w-4" style={{ color: 'var(--swatch-text-light)' }} />
              </a>
            ))}
            <div className="border-t pt-4" style={{ borderColor: 'rgba(var(--swatch-teal-rgb), 0.1)' }}>
              <p className="text-xs text-center" style={{ color: 'var(--swatch-text-light)' }}>
                Made with ♥ for couples who actually pay attention.
              </p>
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
                value={inviteLink}
                size={200}
                bgColor="transparent"
                fgColor="#2F5F6D"
                level="M"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Have your partner scan this code to link your accounts
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
              <Label>Partner's Email</Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="partner@example.com"
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
