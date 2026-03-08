import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ListChecks, Share2, Users, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DashboardHome = () => {
  const [stats, setStats] = useState({ lists: 0, cards: 0, collaborations: 0 });
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const [{ count: listCount }, { count: cardCount }, { count: coupleCount }, { data: profile }] = await Promise.all([
          supabase.from("lists").select("*", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("cards").select("*", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("couples").select("*", { count: "exact", head: true }).eq("status", "accepted"),
          supabase.from("profiles").select("display_name").eq("user_id", user.id).single(),
        ]);
        setStats({ lists: listCount ?? 0, cards: cardCount ?? 0, collaborations: coupleCount ?? 0 });
        setDisplayName(profile?.display_name ?? "");
      } catch {}
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl">
      {/* Hero card */}
      <div className="card-design-neumorph panel-polish p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Hey, {displayName || "there"} 👋
        </h1>
        <p className="text-muted-foreground">Your GoTwo dashboard — everything in one place.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "My Lists", value: stats.lists, icon: ListChecks },
          { label: "Total Cards", value: stats.cards, icon: Share2 },
          { label: "Active Collaborations", value: stats.collaborations, icon: Users },
        ].map((s) => (
          <div key={s.label} className="card-neu p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(232,198,174,0.4)' }}>
                <s.icon className="w-5 h-5" style={{ color: '#D9654F' }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: '#2F5F6D' }}>{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Link to="/dashboard/lists">
          <Button className="rounded-full px-6">
            <Plus className="mr-2 h-4 w-4" />
            Create New List
          </Button>
        </Link>
        <Link to="/dashboard/templates">
          <Button variant="outline" className="rounded-full px-6">Browse Templates</Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
