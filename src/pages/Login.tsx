import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { supabase, supabaseConfigError } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import AppleSignInButton from "@/components/AppleSignInButton";
import GoTwoText from "@/components/GoTwoText";

// DEV-ONLY bypass accounts. These are not normal customer login paths.
const DEV_EMAILS = ["adam.bozman@gmail.com"];

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const resolvePostLoginDestination = async (userId: string) => {
  const profileResult = await supabase
    .from("profiles")
    .select("onboarding_completed_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (!profileResult.error) {
    return profileResult.data?.onboarding_completed_at ? "/dashboard" : "/onboarding";
  }

  const legacyResult = await supabase
    .from("user_preferences")
    .select("onboarding_complete")
    .eq("user_id", userId)
    .maybeSingle();

  if (!legacyResult.error && legacyResult.data?.onboarding_complete) {
    return "/dashboard";
  }

  console.warn("Falling back to onboarding because onboarding status could not be resolved.", {
    profileError: profileResult.error,
    legacyError: legacyResult.error,
  });
  return "/onboarding";
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isDevEmail = DEV_EMAILS.includes(email.toLowerCase().trim());

  useEffect(() => {
    const inviteId = searchParams.get("invite");
    if (inviteId) {
      localStorage.setItem("gotwo_invite", inviteId);
    }
  }, [searchParams]);

  const navigateAfterLogin = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (currentUser) {
      navigate(await resolvePostLoginDestination(currentUser.id));
    } else {
      navigate("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (supabaseConfigError) {
        throw new Error(supabaseConfigError);
      }

      if (isDevEmail) {
        // DEV-ONLY bypass: instant sign-in via server-generated session.
        const { data, error } = await supabase.functions.invoke("dev-login", {
          body: { email: email.toLowerCase().trim() },
        });
        if (error) throw error;
        if (!data?.access_token || !data?.refresh_token) throw new Error("Dev login failed");
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        if (sessionError) throw sessionError;
        await navigateAfterLogin();
      } else {
        await signIn(email, password);
        await navigateAfterLogin();
      }
    } catch (error: unknown) {
      toast({ title: "Error", description: getErrorMessage(error), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page relative min-h-screen overflow-x-hidden">
      

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-4 py-5 sm:px-6 md:px-10 lg:px-16">
          <Link to="/">
            <GoTwoText
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}
            />
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-full px-6 text-sm font-bold border-0"
            style={{
              background: "var(--swatch-teal)",
              color: "var(--swatch-cream-light)",
            }}
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
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
              <h1
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--swatch-teal)",
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
              className="card-design-neumorph rounded-[28px] p-6 sm:p-8 md:p-10"
              style={{}}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold"
                    style={{ color: "var(--swatch-teal)" }}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                    placeholder="you@example.com"
                    className="rounded-xl h-12 border-0 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.04), inset -2px -2px 6px rgba(255,255,255,0.6)",
                      color: "var(--swatch-antique-coin)",
                    }}
                  />
                </div>

                {!isDevEmail && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-sm font-semibold"
                        style={{ color: "var(--swatch-teal)" }}
                      >
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="********"
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
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-full h-12 text-sm font-bold border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  disabled={loading}
                  style={{
                    background: "var(--swatch-cedar-grove)",
                    color: "var(--swatch-cream-light)",
                  }}
                >
                  {loading ? "Signing in..." : isDevEmail ? "Sign In (Dev)" : "Sign In"}
                  {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
                <div className="relative flex items-center my-2">
                  <div className="flex-1 h-px" style={{ background: "var(--swatch-antique-coin)", opacity: 0.2 }} />
                  <span className="px-3 text-xs" style={{ color: "var(--swatch-antique-coin)" }}>or</span>
                  <div className="flex-1 h-px" style={{ background: "var(--swatch-antique-coin)", opacity: 0.2 }} />
                </div>

                <GoogleSignInButton />
                <AppleSignInButton />
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
                style={{ color: "var(--swatch-teal)" }}
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
// Codebase classification: runtime authentication page with dev-only login bypass.
