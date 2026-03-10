import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AuthWatercolor from "@/components/AuthWatercolor";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const inviteId = searchParams.get("invite");
    if (inviteId) {
      localStorage.setItem("gotwo_invite", inviteId);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        const { data: prefs } = await supabase
          .from("user_preferences")
          .select("onboarding_complete")
          .eq("user_id", currentUser.id)
          .maybeSingle();
        if (!prefs?.onboarding_complete) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page min-h-screen overflow-hidden relative">
      {/* Decorative organic shapes — matching landing */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 680,
            height: 680,
            top: "-12%",
            right: "-8%",
            background: "radial-gradient(circle, rgba(232,198,174,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            bottom: "15%",
            left: "-6%",
            background: "radial-gradient(circle, rgba(175,199,218,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 240,
            height: 240,
            top: "40%",
            right: "5%",
            background: "radial-gradient(circle, rgba(217,101,79,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 md:px-16 py-5">
          <Link to="/">
            <span
              className="logo-text"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", lineHeight: 1 }}
            >
              <span className="go">Go</span>
              <span className="two">Two</span>
            </span>
          </Link>
          <Link to="/signup">
            <Button
              size="sm"
              className="rounded-full px-6 text-sm font-bold border-0"
              style={{
                background: "var(--swatch-viridian-odyssey)",
                color: "var(--swatch-cream-light)",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </nav>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Heading */}
            <div className="text-center mb-10">
              <h1
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--swatch-viridian-odyssey)",
                }}
              >
                Welcome Back
              </h1>
              <p
                className="text-base"
                style={{ color: "var(--swatch-antique-coin)" }}
              >
                Sign in to your account
              </p>
            </div>

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: "linear-gradient(165deg, rgba(255,255,255,0.65) 0%, rgba(246,226,212,0.35) 100%)",
                border: "1px solid rgba(232,198,174,0.3)",
                boxShadow: "8px 8px 20px rgba(217,101,79,0.06), -6px -6px 16px rgba(255,255,255,0.45)",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold"
                    style={{ color: "var(--swatch-viridian-odyssey)" }}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="rounded-xl h-12 border-0 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.04), inset -2px -2px 6px rgba(255,255,255,0.6)",
                      color: "var(--swatch-antique-coin)",
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold"
                    style={{ color: "var(--swatch-viridian-odyssey)" }}
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="rounded-xl h-12 border-0 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.04), inset -2px -2px 6px rgba(255,255,255,0.6)",
                      color: "var(--swatch-antique-coin)",
                    }}
                  />
                </div>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold hover:underline"
                    style={{ color: "var(--swatch-cedar-grove)" }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full h-12 text-sm font-bold border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  disabled={loading}
                  style={{
                    background: "var(--swatch-cedar-grove)",
                    color: "var(--swatch-cream-light)",
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
              </form>
            </motion.div>

            {/* Footer link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-center mt-8"
              style={{ color: "var(--swatch-antique-coin)" }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold hover:underline"
                style={{ color: "var(--swatch-viridian-odyssey)" }}
              >
                Get Started Free
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
