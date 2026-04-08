import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import AppleSignInButton from "@/components/AppleSignInButton";
import GoTwoText from "@/components/GoTwoText";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const inviteId = searchParams.get("invite");
  const inviteToken = searchParams.get("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password, displayName);
      localStorage.setItem("gotwo_signup_data", JSON.stringify({
        age: parseInt(age) || null,
      }));
      if (inviteId) {
        localStorage.setItem("gotwo_invite", inviteId);
      }
      if (inviteToken) {
        localStorage.setItem("gotwo_invite_token", inviteToken);
      }
      toast({ title: "Check your email", description: "We sent you a confirmation link." });
      navigate("/login");
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
            variant="ghost"
            size="sm"
            className="text-sm font-semibold"
            style={{ color: "var(--swatch-teal)" }}
          >
            <Link to="/login">Log in</Link>
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
                Create Your Account
              </h1>
              <p
                className="text-base"
                style={{ color: "var(--swatch-antique-coin)" }}
              >
                Let's get to know each other
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
                    htmlFor="name"
                    className="text-sm font-semibold"
                    style={{ color: "var(--swatch-teal)" }}
                  >
                    What should we call you?
                  </Label>
                  <Input
                    id="name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    placeholder="Your name"
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
                    htmlFor="age"
                    className="text-sm font-semibold"
                    style={{ color: "var(--swatch-teal)" }}
                  >
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    min="13"
                    max="120"
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
                    placeholder="••••••••"
                    minLength={6}
                    className="rounded-xl h-12 border-0 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.04), inset -2px -2px 6px rgba(255,255,255,0.6)",
                      color: "var(--swatch-antique-coin)",
                    }}
                  />
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
                  {loading ? "Creating account..." : "Get Started Free"}
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold hover:underline"
                style={{ color: "var(--swatch-teal)" }}
              >
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
// Codebase classification: runtime signup page.
