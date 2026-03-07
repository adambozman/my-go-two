import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ListChecks, Share2, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ lists: 0, cards: 0, collaborations: 0 });
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [{ count: listCount }, { count: cardCount }, { count: coupleCount }, { data: profile }] = await Promise.all([
        supabase.from("lists").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("cards").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("couples").select("*", { count: "exact", head: true }).eq("status", "accepted"),
        supabase.from("profiles").select("display_name").eq("user_id", user.id).single(),
      ]);
      setStats({ lists: listCount ?? 0, cards: cardCount ?? 0, collaborations: coupleCount ?? 0 });
      setDisplayName(profile?.display_name ?? "");
    };

    fetchData();
  }, [user]);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Hey, {displayName || "there"} 👋
        </h1>
        <p className="text-muted-foreground">Your GoTwo dashboard — everything in one place.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "My Lists", value: stats.lists, icon: ListChecks },
          { label: "Total Cards", value: stats.cards, icon: Share2 },
          { label: "Active Collaborations", value: stats.collaborations, icon: Users },
        ].map((s) => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Link to="/dashboard/lists">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New List
          </Button>
        </Link>
        <Link to="/dashboard/templates">
          <Button variant="outline">Browse Templates</Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
