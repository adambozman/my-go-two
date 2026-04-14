import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/GoTwoTransparentNew.png";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"idle" | "form" | "submitting" | "done" | "already">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setStep("submitting");

    try {
      const { error: insertError } = await supabase
        .from("waitlist" as any)
        .insert([{ email: email.toLowerCase().trim(), name: name.trim() || null }] as any);

      if (insertError) {
        if (insertError.code === "23505") {
          setStep("already");
        } else {
          throw insertError;
        }
      } else {
        setStep("done");
      }
    } catch (err: any) {
      console.error("Waitlist error:", err);
      setError("Something went wrong. Please try again.");
      setStep("form");
    }
  };

  return (
    <div
      className="landing-page"
      style={{
        minHeight: "100vh",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      {/* Logo */}
      <img
        src={logoImg}
        alt="Go Two"
        style={{
          width: "clamp(180px, 32vw, 300px)",
          height: "auto",
          marginBottom: 40,
        }}
      />

      {/* Headline */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 700,
          color: "#3a7880",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        The Shortcut to Thoughtful.
      </h1>

      {/* Subheadline */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(20px, 3.5vw, 36px)",
          fontStyle: "italic",
          fontWeight: 600,
          color: "var(--logo-go-color)",
          lineHeight: 1.2,
          marginTop: 8,
        }}
      >
        Never forget again.
      </p>

      {/* Body */}
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "clamp(13px, 1.8vw, 16px)",
          fontWeight: 300,
          color: "#5a5047",
          lineHeight: 1.55,
          marginTop: 20,
          maxWidth: 440,
        }}
      >
        One place for everything that matters to the people you love.
      </p>

      {/* CTA area */}
      <div style={{ marginTop: 36, width: "100%", maxWidth: 380 }}>
        {step === "idle" && (
          <button
            onClick={() => setStep("form")}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.3px",
              color: "#fff",
              background: "var(--logo-go-color)",
              border: "none",
              borderRadius: 999,
              padding: "14px 36px",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(217,101,79,0.25)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Join the Waitlist
          </button>
        )}

        {(step === "form" || step === "submitting") && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                padding: "12px 18px",
                borderRadius: 12,
                border: "1px solid rgba(45,104,112,0.2)",
                background: "rgba(255,255,255,0.6)",
                outline: "none",
                color: "var(--swatch-teal)",
              }}
            />
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                padding: "12px 18px",
                borderRadius: 12,
                border: "1px solid rgba(45,104,112,0.2)",
                background: "rgba(255,255,255,0.6)",
                outline: "none",
                color: "var(--swatch-teal)",
              }}
            />
            {error && (
              <p style={{ color: "#c0392b", fontSize: 13, margin: 0 }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={step === "submitting"}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.3px",
                color: "#fff",
                background: "var(--logo-go-color)",
                border: "none",
                borderRadius: 999,
                padding: "14px 36px",
                cursor: step === "submitting" ? "wait" : "pointer",
                opacity: step === "submitting" ? 0.7 : 1,
                boxShadow: "0 6px 20px rgba(217,101,79,0.25)",
                transition: "all 0.15s ease",
              }}
            >
              {step === "submitting" ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}

        {step === "done" && (
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 600,
                color: "var(--swatch-teal)",
              }}
            >
              You're on the list.
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#5a5047",
                marginTop: 8,
              }}
            >
              We'll let you know when Go Two is ready.
            </p>
          </div>
        )}

        {step === "already" && (
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 600,
                color: "var(--swatch-teal)",
              }}
            >
              You're already on the list.
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#5a5047",
                marginTop: 8,
              }}
            >
              Hang tight — we'll reach out soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Waitlist;
