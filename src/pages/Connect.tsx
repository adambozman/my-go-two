import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import { Users, Loader2 } from "lucide-react";

const Connect = () => {
  const [searchParams] = useSearchParams();
  const inviteId = searchParams.get("invite");
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If user is logged in and we have an invite, link immediately
    if (!authLoading && user && inviteId && inviteId !== user.id) {
      setLinking(true);
      supabase.functions
        .invoke("collaborations", {
          body: { action: "link-by-inviter", inviter_id: inviteId },
        })
        .then(({ data, error }) => {
          setLinking(false);
          if (error || data?.error) {
            const msg = data?.error || error?.message || "Failed to connect";
            if (msg === "Already connected") {
              toast({ title: "Already Connected", description: "You're already linked with this person." });
            } else {
              setError(msg);
            }
          } else {
            toast({ title: "Connected!", description: "You're now linked with your partner." });
          }
          navigate("/dashboard/collaborations");
        });
    }
  }, [user, inviteId, authLoading, navigate, toast]);

  // Store invite for after login/signup
  const storeInviteAndGo = (path: string) => {
    if (inviteId) {
      localStorage.setItem("gotwo_invite", inviteId);
    }
    navigate(path);
  };

  if (authLoading || linking) {
    return (
      <div className="landing-page min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "var(--swatch-viridian-odyssey)" }} />
          <p className="text-muted-foreground">{linking ? "Connecting accounts..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (!inviteId) {
    return (
      <div className="landing-page min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Invalid invite link</p>
          <Link to="/">
            <Button variant="outline" className="rounded-full">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Not logged in — show options
  return (
    <div className="landing-page min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <GoTwoText className="text-4xl" />
          </Link>
        </div>
        <div className="card-design-neumorph panel-polish p-8 text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(var(--swatch-gypsum-rose-rgb), 0.5)" }}>
            <Users className="w-8 h-8" style={{ color: "var(--swatch-viridian-odyssey)" }} />
          </div>
          <h1 className="text-2xl font-bold mb-2">You've been invited!</h1>
          <p className="text-muted-foreground mb-6">
            Someone wants to connect with you on <GoTwoText className="text-sm inline" />.
          </p>
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}
          <div className="space-y-3">
            <Button className="w-full rounded-full" onClick={() => storeInviteAndGo("/login")}>
              Sign In to Connect
            </Button>
            <Button variant="outline" className="w-full rounded-full" onClick={() => storeInviteAndGo("/signup")}>
              Create an Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
