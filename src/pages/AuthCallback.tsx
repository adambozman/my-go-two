import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const completeOAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const providerError = params.get("error_description") || params.get("error");
      if (providerError) {
        if (!active) return;
        setErrorMessage(providerError);
        return;
      }

      const code = params.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          if (!active) return;
          setErrorMessage(error.message);
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        if (!active) return;
        setErrorMessage(error.message);
        return;
      }

      if (!active) return;
      navigate(data.session ? "/dashboard" : "/login", { replace: true });
    };

    void completeOAuth();

    return () => {
      active = false;
    };
  }, [navigate]);

  if (errorMessage) {
    return (
      <div className="app-page flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card/80 p-6 text-center">
          <h1 className="text-xl font-semibold text-foreground">Sign-in failed</h1>
          <p className="mt-3 text-sm text-muted-foreground">{errorMessage}</p>
          <Link
            to="/login"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Return to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Finishing sign-in...</p>
    </div>
  );
};

export default AuthCallback;
