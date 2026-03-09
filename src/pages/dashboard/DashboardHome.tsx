import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListChecks, Share2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import GoTwoText from "@/components/GoTwoText";

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ lists: 0, cards: 0, collaborations: 0 });
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const [{ count: listCount }, { count: cardCount }, { count: coupleCount }, { data: profile }] = await Promise.all([
          supabase.from("lists").select("*", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("cards").select("*", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("couples").select("*", { count: "exact", head: true }).eq("status", "accepted"),
          supabase.from("profiles").select("display_name").eq("user_id", user.id).single(),
        ]);
        setStats({ lists: listCount ?? 0, cards: cardCount ?? 0, collaborations: coupleCount ?? 0 });
        setDisplayName(profile?.display_name ?? "");
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <div className="max-w-5xl">
      {/* Hero */}
      <div className="card-design-neumorph panel-polish p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Hey, {displayName || "there"} 👋
        </h1>
        <p className="text-muted-foreground">Your <GoTwoText className="text-base" /> dashboard — everything in one place.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "My Lists", value: stats.lists, icon: ListChecks, link: "/dashboard/my-go-two" },
          { label: "Total Cards", value: stats.cards, icon: Share2 },
          { label: "Collaborations", value: stats.collaborations, icon: Users, link: "/dashboard/collaborations" },
        ].map((s) => {
          const content = (
            <div className="card-design-neumorph p-5 hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.4)' }}>
                  <s.icon className="w-5 h-5" style={{ color: 'var(--swatch-cedar-grove)' }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--swatch-viridian-odyssey)' }}>{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </div>
          );
          return s.link ? (
            <Link key={s.label} to={s.link}>{content}</Link>
          ) : (
            <div key={s.label}>{content}</div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;
