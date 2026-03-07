import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, Users, ChevronRight, Settings as SettingsIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setEmail(user.email ?? "");
        const { data } = await supabase.from("profiles").select("display_name").eq("user_id", user.id).single();
        setDisplayName(data?.display_name ?? "");
      } catch {}
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setLoading(true);
      await supabase.from("profiles").update({ display_name: displayName }).eq("user_id", user.id);
      toast({ title: "Profile updated" });
    } catch {} finally {
      setLoading(false);
    }
  };

  const settingsItems = [
    { icon: User, title: "Profile", description: "Name, avatar, and account details." },
    { icon: Bell, title: "Notifications", description: "Push and email preferences for list updates." },
    { icon: Shield, title: "Sharing & Privacy", description: "Default sharing rules and privacy controls." },
    { icon: Users, title: "Collaborators", description: "Manage shared access and permissions." },
  ];

  return (
    <div className="max-w-4xl">
      {/* Hero */}
      <div className="card-neu panel-polish p-8 mb-8">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4" style={{ border: '1px solid rgba(174,176,161,0.62)', background: 'rgba(181,184,168,0.3)', color: '#2F5F6D' }}>
          <SettingsIcon className="h-3 w-3" />
          Settings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3" style={{ color: 'rgba(107,109,98,0.35)' }}>
          Workspace settings<br />for your workspace.
        </h1>
        <p className="text-muted-foreground">Control notifications, profile preferences, and workspace defaults.</p>
      </div>

      {/* Settings Menu */}
      <div className="card-neu p-8">
        <h2 className="text-lg font-semibold mb-1" style={{ color: '#2F5F6D' }}>Settings Menu</h2>
        <p className="text-sm text-muted-foreground mb-6">Choose a section to manage your workspace preferences.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {settingsItems.map((item) => (
            <button
              key={item.title}
              className="flex items-center gap-3 p-4 rounded-2xl border border-border/20 hover:bg-secondary/30 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(232,198,174,0.3)' }}>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm" style={{ color: '#6B6D62' }}>{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
