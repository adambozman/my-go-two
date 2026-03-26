import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (error: unknown) {
      toast({ title: "Error", description: getErrorMessage(error), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Success", description: "Password updated successfully!" });
      navigate("/dashboard");
    } catch (error: unknown) {
      toast({ title: "Error", description: getErrorMessage(error), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const heading = isRecovery ? "Set New Password" : "Reset Password";
  const subtitle = isRecovery
    ? "Enter your new password below"
    : sent
    ? "Check your email for a reset link"
    : "Enter your email to reset your password";

  return (
    <div className="landing-page relative min-h-screen overflow-x-hidden">
      <div className="relative z-10 flex min-h-screen flex-col">
        <nav className="flex items-center justify-between px-4 py-5 sm:px-6 md:px-10 lg:px-16">
          <Link to="/">
            <span className="logo-text" style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", lineHeight: 1 }}>
              <span className="go">Go</span>
              <span className="two">Two</span>
            </span>
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

        <div className="flex flex-1 items-center justify-center px-4 pb-10 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-10">
              <h1
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--swatch-teal)" }}
              >
                {heading}
              </h1>
              <p className="text-base" style={{ color: "var(--swatch-antique-coin)" }}>
                {subtitle}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-design-neumorph rounded-[28px] p-6 sm:p-8 md:p-10"
              style={{}}
            >
              {isRecovery ? (
                <form onSubmit={handleUpdatePassword} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm font-semibold" style={{ color: "var(--swatch-teal)" }}>
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-semibold" style={{ color: "var(--swatch-teal)" }}>
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <Button
                    type="submit"
                    className="w-full rounded-full h-12 text-sm font-bold border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    disabled={loading}
                    style={{ background: "var(--swatch-cedar-grove)", color: "var(--swatch-cream-light)" }}
                  >
                    {loading ? "Updating..." : "Update Password"}
                    {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              ) : !sent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold" style={{ color: "var(--swatch-teal)" }}>
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
                  <Button
                    type="submit"
                    className="w-full rounded-full h-12 text-sm font-bold border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    disabled={loading}
                    style={{ background: "var(--swatch-cedar-grove)", color: "var(--swatch-cream-light)" }}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                    {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm mb-6" style={{ color: "var(--swatch-antique-coin)" }}>
                    We've sent a password reset link to <strong>{email}</strong>. Check your inbox.
                  </p>
                  <Button
                    asChild
                    className="rounded-full h-12 px-8 text-sm font-bold border-0 shadow-lg"
                    style={{ background: "var(--swatch-teal)", color: "var(--swatch-cream-light)" }}
                  >
                    <Link to="/login">
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back to Login
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>

            {!sent && !isRecovery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-center mt-8"
                style={{ color: "var(--swatch-antique-coin)" }}
              >
                Remember your password?{" "}
                <Link to="/login" className="font-bold hover:underline" style={{ color: "var(--swatch-teal)" }}>
                  Sign in
                </Link>
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
