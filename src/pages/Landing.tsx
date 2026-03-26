import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const riseIn = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.9,
    delay,
    ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number],
  },
});

const timelineSteps = [
  {
    step: "01",
    title: "Sign Up & Tell Us About You",
    description:
      "Quick signup, then tell us who you are. Your taste, your style, your non-negotiables.",
    accent: "coral" as const,
  },
  {
    step: "02",
    title: "AI Builds Your Profile",
    description:
      "Our AI reads between the lines - building a taste profile that actually knows you.",
    accent: "teal" as const,
    ai: true,
  },
  {
    step: "03",
    title: "Create Your GoTwo Lists",
    description:
      "Coffee order. Ring size. Favorite shampoo. Add it once, it's there forever.",
    accent: "coral" as const,
  },
  {
    step: "04",
    title: "Invite Your People",
    description:
      "Send a link. They connect instantly. Now everyone who matters actually knows you.",
    accent: "teal" as const,
  },
  {
    step: "05",
    title: "Control Who Sees What",
    description:
      "You control the access. Your partner sees one thing. Your mom sees another.",
    accent: "coral" as const,
  },
  {
    step: "06",
    title: "AI Powers Every Decision",
    description:
      "Gift ideas, date night picks, favorite stores - served up for whoever's shopping for you.",
    accent: "teal" as const,
    ai: true,
  },
];

const Landing = () => {
  return (
    <div className="landing-page min-h-screen overflow-x-hidden">
      <div className="relative z-10">
        {/* HERO */}
        <section
          style={{ padding: "64px 52px 72px" }}
          className="relative flex flex-col items-center overflow-hidden text-center"
        >
          <motion.div
            {...riseIn(0)}
            style={{ marginBottom: 36, display: "flex", alignItems: "baseline", gap: 3 }}
          >
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 600,
                fontSize: 56,
                color: "var(--logo-go-color)",
                lineHeight: 1,
              }}
            >
              Go
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 70,
                color: "var(--logo-two-color)",
                lineHeight: 1,
                letterSpacing: "-0.5px",
              }}
            >
              Two
            </span>
          </motion.div>

          <motion.div
            {...riseIn(0.1)}
            className="flex flex-col items-center"
            style={{ gap: 4, marginBottom: 44 }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 600,
                color: "var(--logo-two-color)",
                letterSpacing: "0.2px",
              }}
            >
              The Shortcut to Thoughtful.
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 600,
                fontStyle: "italic",
                color: "#d4543a",
              }}
            >
              Never forget again.
            </span>
            <p
              style={{
                marginTop: 10,
                fontSize: 13.5,
                fontWeight: 300,
                color: "#4a6068",
                letterSpacing: "0.2px",
                lineHeight: 1.6,
                maxWidth: 360,
                textAlign: "center",
              }}
            >
              One place for everything that matters to the people you love.
            </p>
          </motion.div>

          <motion.div
            {...riseIn(0.24)}
            style={{
              width: "100%",
              maxWidth: 560,
              aspectRatio: "16/9",
              marginBottom: 36,
              position: "relative",
              overflow: "hidden",
              background: "rgba(255,255,255,0.70)",
              border: "1px solid rgba(255,255,255,0.85)",
              borderRadius: 16,
              boxShadow:
                "0 8px 48px rgba(45,104,112,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#d4543a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 24px rgba(212,84,58,0.38)",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                position: "relative",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.07)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,84,58,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(212,84,58,0.38)";
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20, marginLeft: 3, color: "#fff" }}>
                <path
                  d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36A1 1 0 008 5.14z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 11,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#8a9ea4",
                fontWeight: 400,
                position: "relative",
                zIndex: 1,
                marginTop: 14,
              }}
            >
              See it in action
            </span>
          </motion.div>

          <motion.div
            {...riseIn(0.3)}
            className="flex items-center"
            style={{ gap: 14, marginBottom: 12 }}
          >
            <Link
              to="/signup"
              className="surface-button-primary inline-flex items-center justify-center rounded-full"
              style={{
                background: "var(--swatch-cedar-grove)",
                color: "hsl(var(--destructive-foreground))",
                border: "none",
                padding: "14px 32px",
                fontFamily: "'Jost', sans-serif",
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: "0.3px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Get Started Free &nbsp;-&gt;
            </Link>
            <a
              href="#how-it-works"
              className="surface-button-secondary inline-flex items-center justify-center rounded-full"
              style={{
                color: "var(--swatch-teal)",
                border: "none",
                padding: "13px 28px",
                fontFamily: "'Jost', sans-serif",
                fontSize: 13.5,
                fontWeight: 400,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              See How It Works
            </a>
          </motion.div>

          <motion.p
            {...riseIn(0.36)}
            style={{ fontSize: 12, color: "#8a9ea4", fontWeight: 300, letterSpacing: "0.3px" }}
          >
            Free to start &nbsp;&middot;&nbsp; No credit card required
          </motion.p>

          <motion.div
            {...riseIn(0.42)}
            className="flex flex-col items-center text-center"
            style={{ marginTop: 72 }}
          >
            <p
              style={{
                fontSize: 10.5,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#d4543a",
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Everything that matters
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 38,
                fontWeight: 600,
                color: "var(--logo-two-color)",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              One place for all of it
            </h2>
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                color: "#4a6068",
                maxWidth: 380,
                lineHeight: 1.7,
              }}
            >
              Stop asking. Stop guessing. Stop the friction. Every preference, saved once -
              accessible to whoever you choose.
            </p>
          </motion.div>
        </section>

        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(45,104,112,0.15) 20%, rgba(45,104,112,0.15) 80%, transparent)",
            margin: "0 52px",
          }}
        />

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={{ padding: "72px 0 56px" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number] }}
            viewport={{ once: true, margin: "-15%" }}
            className="text-center"
            style={{ padding: "0 52px", marginBottom: 52 }}
          >
            <p
              style={{
                fontSize: 10.5,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#d4543a",
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Your journey
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 38,
                fontWeight: 600,
                color: "var(--logo-two-color)",
                lineHeight: 1.15,
              }}
            >
              How It Works
            </h2>
          </motion.div>

          <div className="relative" style={{ padding: "0 52px" }}>
            <div
              className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 md:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(45,104,112,0.2) 8%, rgba(45,104,112,0.2) 92%, transparent 100%)",
              }}
            />
            <div
              className="absolute bottom-0 left-[19px] top-0 w-px md:hidden"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(45,104,112,0.2) 8%, rgba(45,104,112,0.2) 92%, transparent 100%)",
              }}
            />

            <div className="space-y-11">
              {timelineSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                const isCoral = step.accent === "coral";
                const nodeStyle = {
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: isCoral ? "#d4543a" : "#2d6870",
                  boxShadow: isCoral
                    ? "0 3px 14px rgba(212,84,58,0.35)"
                    : "0 3px 14px rgba(45,104,112,0.35)",
                  display: "flex",
                  alignItems: "center" as const,
                  justifyContent: "center" as const,
                  position: "relative" as const,
                  zIndex: 2,
                };

                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number] }}
                    viewport={{ once: true, margin: "-15%" }}
                  >
                    <div
                      className="hidden md:grid"
                      style={{ gridTemplateColumns: "1fr 48px 1fr", alignItems: "center", gap: 20 }}
                    >
                      {isLeft ? (
                        <>
                          <div className={step.ai ? "card-design-ai" : "card-design-glass"} style={{ padding: "22px 22px" }}>
                            {step.ai ? (
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 5,
                                  fontSize: 9.5,
                                  letterSpacing: 1.8,
                                  textTransform: "uppercase",
                                  color: "#3a7880",
                                  background: "rgba(45,104,112,0.1)",
                                  border: "1px solid rgba(45,104,112,0.18)",
                                  borderRadius: 20,
                                  padding: "3px 10px",
                                  marginBottom: 10,
                                  fontWeight: 500,
                                }}
                              >
                                <Sparkles style={{ width: 10, height: 10 }} /> AI-Powered
                              </div>
                            ) : null}
                            <h3
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 19,
                                fontWeight: 700,
                                color: "var(--logo-two-color)",
                                marginBottom: 7,
                                lineHeight: 1.2,
                              }}
                            >
                              {step.title}
                            </h3>
                            <p style={{ fontSize: 13, color: "#4a6068", lineHeight: 1.7, fontWeight: 300 }}>
                              {step.description}
                            </p>
                          </div>
                          <div style={nodeStyle}>
                            <span style={{ fontSize: 12, fontWeight: 500, color: "white", letterSpacing: "0.2px" }}>
                              {step.step}
                            </span>
                          </div>
                          <div />
                        </>
                      ) : (
                        <>
                          <div />
                          <div style={nodeStyle}>
                            <span style={{ fontSize: 12, fontWeight: 500, color: "white", letterSpacing: "0.2px" }}>
                              {step.step}
                            </span>
                          </div>
                          <div className={step.ai ? "card-design-ai" : "card-design-glass"} style={{ padding: "22px 22px" }}>
                            {step.ai ? (
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 5,
                                  fontSize: 9.5,
                                  letterSpacing: 1.8,
                                  textTransform: "uppercase",
                                  color: "#3a7880",
                                  background: "rgba(45,104,112,0.1)",
                                  border: "1px solid rgba(45,104,112,0.18)",
                                  borderRadius: 20,
                                  padding: "3px 10px",
                                  marginBottom: 10,
                                  fontWeight: 500,
                                }}
                              >
                                <Sparkles style={{ width: 10, height: 10 }} /> AI-Powered
                              </div>
                            ) : null}
                            <h3
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 19,
                                fontWeight: 700,
                                color: "var(--logo-two-color)",
                                marginBottom: 7,
                                lineHeight: 1.2,
                              }}
                            >
                              {step.title}
                            </h3>
                            <p style={{ fontSize: 13, color: "#4a6068", lineHeight: 1.7, fontWeight: 300 }}>
                              {step.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-4 md:hidden" style={{ gap: 16 }}>
                      <div className="flex-shrink-0" style={nodeStyle}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: "white" }}>{step.step}</span>
                      </div>
                      <div className={`flex-1 ${step.ai ? "card-design-ai" : "card-design-glass"}`} style={{ padding: "18px 18px" }}>
                        {step.ai ? (
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              fontSize: 9.5,
                              letterSpacing: 1.8,
                              textTransform: "uppercase",
                              color: "#3a7880",
                              background: "rgba(45,104,112,0.1)",
                              border: "1px solid rgba(45,104,112,0.18)",
                              borderRadius: 20,
                              padding: "3px 10px",
                              marginBottom: 10,
                              fontWeight: 500,
                            }}
                          >
                            <Sparkles style={{ width: 10, height: 10 }} /> AI-Powered
                          </div>
                        ) : null}
                        <h3
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 19,
                            fontWeight: 700,
                            color: "var(--logo-two-color)",
                            marginBottom: 7,
                            lineHeight: 1.2,
                          }}
                        >
                          {step.title}
                        </h3>
                        <p style={{ fontSize: 13, color: "#4a6068", lineHeight: 1.7, fontWeight: 300 }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div style={{ padding: "32px 40px 64px" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number] }}
            viewport={{ once: true, margin: "-15%" }}
            className="relative overflow-hidden text-center"
            style={{ background: "#1e4a52", borderRadius: 20, padding: "52px 44px" }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(212,84,58,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -80,
                left: -50,
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="relative z-10">
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 3, marginBottom: 22 }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600, fontSize: 34, color: "#d4543a", lineHeight: 1 }}>
                  Go
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 44, color: "white", lineHeight: 1 }}>
                  Two
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 34,
                  fontWeight: 600,
                  color: "white",
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                Ready to get it right,
                <br />
                every single time?
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.58)",
                  marginBottom: 30,
                  fontWeight: 300,
                  letterSpacing: "0.2px",
                }}
              >
                Join couples who never have to guess again.
              </p>
              <Link
                to="/signup"
                className="surface-button-primary inline-flex items-center justify-center rounded-full"
                style={{
                  background: "var(--swatch-cedar-grove)",
                  color: "hsl(var(--destructive-foreground))",
                  border: "none",
                  padding: "15px 38px",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 13.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.2px",
                }}
              >
                Create Your First Card &nbsp;-&gt;
              </Link>
            </div>
          </motion.div>
        </div>

        {/* FOOTER */}
        <footer
          style={{
            padding: "26px 40px",
            borderTop: "1px solid rgba(45,104,112,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
            <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600, fontSize: 20, color: "var(--logo-go-color)", lineHeight: 1 }}>
              Go
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 26, color: "var(--logo-two-color)", lineHeight: 1 }}>
              Two
            </span>
          </div>
          <p style={{ fontSize: 11.5, color: "#8a9ea4", fontWeight: 300, letterSpacing: "0.3px" }}>
            &copy; {new Date().getFullYear()} GoTwo. Made with love.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
