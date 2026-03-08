import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <GoTwoText className="text-4xl" />
          </Link>
        </div>
        <div className="card-design-neumorph panel-polish p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1">Reset Password</h1>
            <p className="text-sm text-muted-foreground">
              {sent ? "Check your email for a reset link" : "Enter your email to reset your password"}
            </p>
          </div>
          {!sent && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="rounded-xl" />
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <p className="text-sm text-center">
                <Link to="/login" className="hover:underline" style={{ color: 'var(--swatch-cedar-grove)' }}>Back to login</Link>
              </p>
            </form>
          )}
          {sent && (
            <div className="text-center">
              <Link to="/login" className="text-sm hover:underline" style={{ color: 'var(--swatch-cedar-grove)' }}>Back to login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
