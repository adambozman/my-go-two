import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import GoTwoText from "@/components/GoTwoText";

const Connect = () => {
  const [searchParams] = useSearchParams();
  const inviteId = searchParams.get("invite");
  const token = searchParams.get("token");
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user && token) {
      setLinking(true);
      supabase.functions
        .invoke("searchforaddprofile", {
          body: { action: "link-by-token", token },
        })
        .then(({ data, error }) => {
          setLinking(false);
          if (error || data?.error) {
            const msg = data?.error || error?.message || "Failed to connect";
            if (msg === "Already connected" || data?.status === "already_connected") {
              toast({ title: "Already Connected", description: "You're already linked with this person." });
            } else {
              setError(msg);
            }
          } else if (data?.status === "pending_exists") {
            toast({ title: "Invite Pending", description: "A connection invite is already pending." });
          } else {
            toast({ title: "Invite Sent", description: "Your connection invite has been sent." });
          }
          navigate("/dashboard/settings");
        });
      return;
    }

    if (!authLoading && user && inviteId && inviteId !== user.id) {
      setLinking(true);
      supabase.functions
        .invoke("searchforaddprofile", {
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
          navigate("/dashboard/settings");
        });
    }
  }, [user, inviteId, token, authLoading, navigate, toast]);

  const storeInviteAndGo = (path: string) => {
    if (inviteId) {
      localStorage.setItem("gotwo_invite", inviteId);
    }
    if (token) {
      localStorage.setItem("gotwo_invite_token", token);
    }
    navigate(path);
  };

  if (authLoading || linking) {
    return (
      <div className="landing-page min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "var(--swatch-teal)" }} />
          <p style={{ color: "var(--swatch-antique-coin)" }}>{linking ? "Connecting accounts..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  // Show the full invite page design even without an invite param (for design preview)
  const hasInvite = Boolean(inviteId || token);

  return (
    <div className="landing-page relative min-h-screen overflow-x-hidden">
      

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-center px-4 py-5 sm:px-6 md:px-10 lg:px-16">
          <Link to="/">
            <GoTwoText
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}
            />
          </Link>
        </nav>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-4 pb-10 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Heading */}
            <div className="text-center mb-10">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: "linear-gradient(165deg, rgba(232,198,174,0.4) 0%, rgba(175,199,218,0.3) 100%)",
                  boxShadow: "8px 8px 20px rgba(217,101,79,0.06), -6px -6px 16px rgba(255,255,255,0.45)",
                }}
              >
                <Users className="w-9 h-9" style={{ color: "var(--swatch-teal)" }} />
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--swatch-teal)" }}
              >
                You've Been Invited
              </h1>
              <p className="text-lg md:text-xl" style={{ color: "var(--swatch-antique-coin)" }}>
                {hasInvite ? "Someone wants to connect with you on " : "Previewing the connection invite page for "}
                <GoTwoText className="text-2xl md:text-3xl" />
              </p>
            </div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl p-6 sm:p-8 md:p-10"
              style={{
                background: "linear-gradient(165deg, rgba(255,255,255,0.65) 0%, rgba(246,226,212,0.35) 100%)",
                border: "1px solid rgba(232,198,174,0.3)",
                boxShadow: "8px 8px 20px rgba(217,101,79,0.06), -6px -6px 16px rgba(255,255,255,0.45)",
              }}
            >
              {error && (
                <p className="text-destructive text-sm mb-4 text-center">{error}</p>
              )}
              <div className="space-y-4">
                <Button
                  className="w-full rounded-full h-14 text-base font-bold border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  onClick={() => storeInviteAndGo("/login")}
                  style={{ background: "var(--swatch-cedar-grove)", color: "var(--swatch-cream-light)" }}
                >
                  Sign In to Connect
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full h-14 text-base font-bold transition-all hover:scale-[1.02]"
                  onClick={() => storeInviteAndGo("/signup")}
                  style={{ borderColor: "var(--swatch-teal)", color: "var(--swatch-teal)", background: "transparent" }}
                >
                  Create an Account
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
