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
    <div className="landing-page" style={{
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* Logo — top center, brand mark with breathing room */}
      <div style={{ paddingTop: "clamp(48px, 8vh, 96px)" }}>
        <img
          src={logoImg}
          alt="Go Two"
          style={{
            width: "clamp(140px, 22vw, 220px)",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* Content — centered in remaining space */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        maxWidth: 560,
        textAlign: "center",
        marginTop: "clamp(-20px, -2vh, -10px)",
      }}>
        {/* Headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(36px, 5.5vw, 56px)",
          fontWeight: 600,
          color: "var(--logo-two-color)",
          lineHeight: 1.05,
          margin: 0,
          letterSpacing: "-0.01em",
        }}>
          The Shortcut to Thoughtful.
        </h1>

        {/* Subheadline */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(22px, 3.2vw, 34px)",
          fontStyle: "italic",
          fontWeight: 500,
          color: "var(--logo-go-color)",
          lineHeight: 1.2,
          margin: 0,
          marginTop: "clamp(6px, 1vh, 12px)",
        }}>
          Never forget again.
        </p>

        {/* Body */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "clamp(14px, 1.6vw, 17px)",
          fontWeight: 300,
          color: "var(--logo-two-color)",
          lineHeight: 1.6,
          margin: 0,
          marginTop: "clamp(20px, 3vh, 36px)",
          opacity: 0.6,
        }}>
          One place for everything that matters<br />
          to the people you love.
        </p>

        {/* CTA */}
        <div style={{ marginTop: "clamp(28px, 4vh, 48px)", width: "100%", maxWidth: 340 }}>
          {step === "idle" && (
            <button
              onClick={() => setStep("form")}
              className="surface-button-primary panel-polish"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.4px",
                borderRadius: 999,
                padding: "16px 44px",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              Join the Waitlist
            </button>
          )}

          {(step === "form" || step === "submitting") && (
            <form onSubmit={handleSubmit} style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="surface-field"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 15,
                  padding: "14px 20px",
                  borderRadius: 14,
                  outline: "none",
                  color: "var(--logo-two-color)",
                }}
              />
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="surface-field"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 15,
                  padding: "14px 20px",
                  borderRadius: 14,
                  outline: "none",
                  color: "var(--logo-two-color)",
                }}
              />
              {error && (
                <p style={{ color: "#c0392b", fontSize: 13, margin: 0 }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={step === "submitting"}
                className="surface-button-primary panel-polish"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  borderRadius: 999,
                  padding: "16px 44px",
                  marginTop: 4,
                  cursor: step === "submitting" ? "wait" : "pointer",
                  opacity: step === "submitting" ? 0.65 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                {step === "submitting" ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}

          {step === "done" && (
            <div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26,
                fontWeight: 600,
                color: "var(--logo-two-color)",
                margin: 0,
              }}>
                You're on the list.
              </p>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: "var(--logo-two-color)",
                opacity: 0.6,
                marginTop: 10,
              }}>
                We'll let you know when Go Two is ready.
              </p>
            </div>
          )}

          {step === "already" && (
            <div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26,
                fontWeight: 600,
                color: "var(--logo-two-color)",
                margin: 0,
              }}>
                You're already on the list.
              </p>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: "var(--logo-two-color)",
                opacity: 0.6,
                marginTop: 10,
              }}>
                Hang tight — we'll reach out soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom breathing room */}
      <div style={{ height: "clamp(40px, 6vh, 80px)" }} />
    </div>
  );
};

export default Waitlist;
