import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, Shield, Users, ChevronRight, Settings as SettingsIcon, Save, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

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
    { key: "profile", icon: User, title: "Profile", description: "Name, gender, and account details." },
    { key: "notifications", icon: Bell, title: "Notifications", description: "Push and email preferences for list updates." },
    { key: "privacy", icon: Shield, title: "Sharing & Privacy", description: "Default sharing rules and privacy controls." },
    { key: "collaborators", icon: Users, title: "Collaborators", description: "Manage shared access and permissions." },
  ];

  return (
    <div className="max-w-4xl">
      {/* Hero */}
      <div className="card-design-neumorph panel-polish p-8 mb-8">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4" style={{ border: '1px solid var(--chip-border)', background: 'rgba(181,184,168,0.3)', color: 'var(--swatch-viridian-odyssey)' }}>
          <SettingsIcon className="h-3 w-3" />
          Settings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3" style={{ color: 'rgba(var(--swatch-antique-coin-rgb), 0.35)' }}>
          Workspace settings<br />for your workspace.
        </h1>
        <p className="text-muted-foreground">Control notifications, profile preferences, and workspace defaults.</p>
      </div>

      {/* Settings Menu */}
      {!activeSection && (
        <div className="card-design-neumorph p-8">
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--swatch-viridian-odyssey)' }}>Settings Menu</h2>
          <p className="text-sm text-muted-foreground mb-6">Choose a section to manage your workspace preferences.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settingsItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className="flex items-center gap-3 p-4 rounded-2xl border border-border/20 hover:bg-secondary/30 transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.3)' }}>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm" style={{ color: 'var(--swatch-antique-coin)' }}>{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </button>
            ))}
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
          </div>
        </div>
      )}

      {/* Placeholder for other sections */}
      {activeSection && activeSection !== "profile" && (
        <div className="card-design-neumorph p-8">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:underline mb-4 block">
            ← Back to Settings
          </button>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--swatch-viridian-odyssey)' }}>
            {settingsItems.find(s => s.key === activeSection)?.title}
          </h2>
          <p className="text-muted-foreground">Coming soon.</p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
