import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const timelineSteps = [
  {
    step: "01",
    title: "Sign Up & Tell Us About You",
    description:
      "Create your account and take a quick questionnaire — your style, your vibe, what you love, what you hate. This is how we learn you.",
    accent: "var(--swatch-cedar-grove)",
  },
  {
    step: "02",
    title: "AI Builds Your Profile",
    description:
      "Behind the scenes, our AI starts working immediately — analyzing your preferences to understand your taste at a level no one else can.",
    accent: "var(--swatch-teal)",
    aiHighlight: true,
  },
  {
    step: "03",
    title: "Create Your GoTwo Lists",
    description:
      "Coffee orders. Clothing sizes. Date night ideas. Gift wishlists. Build cards for every detail that matters — or let AI auto-fill them for you.",
    accent: "var(--swatch-cedar-grove)",
  },
  {
    step: "04",
    title: "Add Your People",
    description:
      "Invite your significant other, your mom, your brother, your best friend. Each person gets their own connection to your lists.",
    accent: "var(--swatch-teal)",
  },
  {
    step: "05",
    title: "Control Who Sees What",
    description:
      "Your partner sees your date ideas and gift preferences. Your mom sees your clothing sizes. You decide who gets access to what.",
    accent: "var(--swatch-cedar-grove)",
  },
  {
    step: "06",
    title: "AI Powers Every Decision",
    description:
      "Perfect gift suggestions. Curated date ideas. Shopping experiences tailored to the people you love — all powered by what they actually want.",
    accent: "var(--swatch-teal)",
    aiHighlight: true,
  },
];

const riseIn = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number] },
});

const Landing = () => {
  return (
    <div className="landing-page min-h-screen overflow-hidden">
      <div className="relative z-10">

        {/* Hero */}
        <section
          className="text-center flex flex-col justify-center items-center"
          style={{ paddingTop: 64, paddingBottom: 72, paddingLeft: 52, paddingRight: 52 }}
        >
          <motion.div
            {...riseIn(0)}
            className="flex flex-col items-center"
          >
            {/* Logo — exact specs */}
            <div style={{ marginBottom: 36, display: "flex", alignItems: "baseline", gap: 3 }}>
              <span style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 600,
                fontSize: 56,
                color: "#d4543a",
                lineHeight: 1,
              }}>Go</span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 70,
                color: "#2d6870",
                lineHeight: 1,
              }}>Two</span>
            </div>

            {/* Tagline block */}
            <motion.div {...riseIn(0.08)} className="flex flex-col items-center" style={{ marginBottom: 44 }}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 28,
                color: "#1e4a52",
                lineHeight: 1.3,
                margin: 0,
              }}>
                The Shortcut to Thoughtful.
              </h1>
              <em style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: 28,
                color: "#d4543a",
                lineHeight: 1.3,
                marginTop: 4,
                display: "block",
              }}>
                Never forget again.
              </em>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 13.5,
                color: "#4a6068",
                maxWidth: 360,
                textAlign: "center",
                marginTop: 10,
                marginBottom: 0,
                lineHeight: 1.5,
              }}>
                One place for everything that matters to the people who matter most.
              </p>
            </motion.div>

            {/* Video frame — exact specs */}
            <motion.div
              {...riseIn(0.24)}
              style={{ width: "100%", maxWidth: 560, marginBottom: 36 }}
            >
              <div
                className="w-full flex flex-col items-center justify-center gap-3.5 relative overflow-hidden"
                style={{
                  aspectRatio: "16/9",
                  background: "rgba(255,255,255,0.70)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  borderRadius: 16,
                  boxShadow: "0 8px 48px rgba(45,104,112,0.10), inset 0 1px 0 rgba(255,255,255,0.90)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
                }} />
                <div
                  className="flex items-center justify-center cursor-pointer hover:scale-105 transition-transform relative z-10"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "#d4543a",
                    boxShadow: "0 4px 24px rgba(212,84,58,0.38)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 22, height: 22, marginLeft: 3, color: "#fff" }}>
                    <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36A1 1 0 008 5.14z" fill="currentColor" />
                  </svg>
                </div>
                <span className="relative z-10" style={{
                  fontSize: 11,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase" as const,
                  color: "#8a9ea4",
                  fontWeight: 400,
                }}>
                  See it in action
                </span>
              </div>
            </motion.div>

            {/* Buttons — exact specs */}
            <motion.div
              {...riseIn(0.32)}
              className="flex flex-row justify-center"
              style={{ gap: 14, marginBottom: 12 }}
            >
              <Link to="/signup">
                <button
                  style={{
                    padding: "14px 32px",
                    borderRadius: 40,
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 500,
                    fontSize: 13.5,
                    background: "#d4543a",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(212, 84, 58, 0.30)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#c4432a";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 6px 28px rgba(212, 84, 58, 0.42)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#d4543a";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(212, 84, 58, 0.30)";
                  }}
                >
                  Get Started Free
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </Link>
              <a href="#how-it-works">
                <button
                  style={{
                    padding: "13px 28px",
                    borderRadius: 40,
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 400,
                    fontSize: 13.5,
                    background: "transparent",
                    color: "#2d6870",
                    border: "1.5px solid rgba(45, 104, 112, 0.45)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(45, 104, 112, 0.06)";
                    e.currentTarget.style.borderColor = "rgba(45, 104, 112, 1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(45, 104, 112, 0.45)";
                  }}
                >
                  See How It Works
                </button>
              </a>
            </motion.div>

            {/* Fine print */}
            <motion.p
              {...riseIn(0.40)}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 12,
                color: "#8a9ea4",
                marginTop: 0,
                marginBottom: 36,
              }}
            >
              Free to start &nbsp;·&nbsp; No credit card required
            </motion.p>

            {/* Social proof bar */}
            <motion.div
              {...riseIn(0.48)}
              className="flex items-center"
              style={{
                background: "rgba(255,255,255,0.70)",
                border: "1px solid rgba(255,255,255,0.8)",
                borderRadius: 50,
                padding: "12px 22px",
                gap: 14,
                boxShadow: "0 2px 16px rgba(45,104,112,0.07)",
              }}
            >
              {/* 500+ Couples */}
              <div className="flex flex-col items-center" style={{ gap: 1 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 20, color: "#1e4a52", lineHeight: 1.1 }}>500+</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10.5, color: "#8a9ea4" }}>Couples</span>
              </div>
              {/* Divider */}
              <div style={{ width: 1, height: 28, background: "rgba(45,104,112,0.15)" }} />
              {/* Stars */}
              <div className="flex flex-col items-center" style={{ gap: 1 }}>
                <div className="flex" style={{ gap: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} style={{ width: 13, height: 13, color: "#d4543a", fill: "#d4543a" }} />
                  ))}
                </div>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10.5, color: "#8a9ea4" }}>Rated 5 stars</span>
              </div>
              {/* Divider */}
              <div style={{ width: 1, height: 28, background: "rgba(45,104,112,0.15)" }} />
              {/* 0 Wrong orders */}
              <div className="flex flex-col items-center" style={{ gap: 1 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 20, color: "#1e4a52", lineHeight: 1.1 }}>0</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 10.5, color: "#8a9ea4" }}>Wrong orders</span>
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* Section divider */}
        <div
          className="mx-auto max-w-3xl h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(45, 104, 112, 0.15) 20%, rgba(45, 104, 112, 0.15) 80%, transparent)",
          }}
        />

        {/* How It Works — Timeline */}
        <section
          id="how-it-works"
          className="py-20 md:py-28"
        >
          <div className="max-w-5xl mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number] }}
              viewport={{ once: true, margin: "-15%" }}
              className="text-center mb-20"
            >
              <p
                className="text-sm tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--swatch-cedar-grove)", fontWeight: 500 }}
              >
                Your Journey
              </p>
              <h2
                className="text-3xl md:text-5xl font-semibold"
                style={{ color: "var(--swatch-viridian-odyssey)" }}
              >
                How It Works
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(45, 104, 112, 0.2) 10%, rgba(45, 104, 112, 0.2) 90%, transparent)",
                }}
              />

              <div className="space-y-12 md:space-y-16">
                {timelineSteps.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number] }}
                      viewport={{ once: true, margin: "-15%" }}
                      className="relative"
                    >
                      {/* Desktop layout */}
                      <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                        {/* Left content */}
                        <div className={isLeft ? "text-left pr-12" : "order-2 pl-12 text-left"}>
                          <div
                            className={`inline-block p-8 transition-all duration-300 hover:translate-y-[-2px] ${step.aiHighlight ? 'card-design-ai' : 'card-design-glass'}`}
                          >
                            {step.aiHighlight && (
                              <div
                                className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase mb-3 px-3 py-1 rounded-full"
                                style={{
                                  background: "rgba(45, 104, 112, 0.1)",
                                  color: "var(--swatch-teal-mid)",
                                  fontWeight: 500,
                                }}
                              >
                                <Sparkles className="w-3 h-3" />
                                AI-Powered
                              </div>
                            )}
                            <h3
                              className="text-xl md:text-2xl font-semibold mb-3"
                              style={{ color: "var(--swatch-viridian-odyssey)" }}
                            >
                              {step.title}
                            </h3>
                            <p
                              className="text-sm md:text-base leading-relaxed"
                              style={{ color: "var(--swatch-antique-coin)", fontWeight: 300 }}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Right spacer (or left spacer when reversed) */}
                        <div className={isLeft ? "order-2" : ""} />
                      </div>

                      {/* Timeline node — Desktop */}
                      <div
                        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full items-center justify-center z-10"
                        style={{
                          width: 38,
                          height: 38,
                          background: step.accent,
                          boxShadow: step.accent.includes('cedar')
                            ? "0 3px 14px rgba(212, 84, 58, 0.35)"
                            : "0 3px 14px rgba(45, 104, 112, 0.35)",
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{ color: "#fff", fontFamily: "'Jost', sans-serif" }}
                        >
                          {step.step}
                        </span>
                      </div>

                      {/* Mobile layout */}
                      <div className="md:hidden flex gap-5">
                        {/* Timeline node — Mobile */}
                        <div className="flex-shrink-0 relative z-10">
                          <div
                            className="rounded-full flex items-center justify-center"
                            style={{
                              width: 38,
                              height: 38,
                              background: step.accent,
                              boxShadow: step.accent.includes('cedar')
                                ? "0 3px 14px rgba(212, 84, 58, 0.35)"
                                : "0 3px 14px rgba(45, 104, 112, 0.35)",
                            }}
                          >
                            <span
                              className="text-xs font-bold"
                              style={{ color: "#fff", fontFamily: "'Jost', sans-serif" }}
                            >
                              {step.step}
                            </span>
                          </div>
                        </div>

                        {/* Mobile content */}
                        <div
                          className={`flex-1 p-6 ${step.aiHighlight ? 'card-design-ai' : 'card-design-glass'}`}
                        >
                          {step.aiHighlight && (
                            <div
                              className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase mb-3 px-3 py-1 rounded-full"
                              style={{
                                background: "rgba(45, 104, 112, 0.1)",
                                color: "var(--swatch-teal-mid)",
                                fontWeight: 500,
                              }}
                            >
                              <Sparkles className="w-3 h-3" />
                              AI-Powered
                            </div>
                          )}
                          <h3
                            className="text-lg font-semibold mb-2"
                            style={{ color: "var(--swatch-viridian-odyssey)" }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--swatch-antique-coin)", fontWeight: 300 }}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div
          className="mx-auto max-w-3xl h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(45, 104, 112, 0.15) 20%, rgba(45, 104, 112, 0.15) 80%, transparent)",
          }}
        />

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number] }}
              viewport={{ once: true, margin: "-15%" }}
              className="relative overflow-hidden rounded-[20px] p-12 md:p-16 text-center"
              style={{
                background: "var(--swatch-viridian-odyssey)",
                boxShadow: "0 24px 48px rgba(30, 74, 82, 0.3)",
              }}
            >
              {/* Subtle orbs */}
              <div className="absolute pointer-events-none" style={{
                top: -60, right: -60, width: 240, height: 240, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(212,84,58,0.18) 0%, transparent 70%)",
              }} />
              <div className="absolute pointer-events-none" style={{
                bottom: -80, left: -50, width: 280, height: 280, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }} />
              <div className="relative z-10">
                <div className="mb-6">
                  <span
                    className="logo-text"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1 }}
                  >
                    <span className="go" style={{ color: "var(--swatch-cedar-grove)" }}>
                      Go
                    </span>
                    <span className="two" style={{ color: "var(--swatch-cream-light)" }}>
                      Two
                    </span>
                  </span>
                </div>

                <h2
                  className="text-2xl md:text-4xl font-semibold mb-4"
                  style={{ color: "white" }}
                >
                  Ready to get it right,
                  <br />
                  every single time?
                </h2>

                <p
                  className="text-base mb-8"
                  style={{ color: "rgba(255,255,255,0.58)", fontWeight: 300, letterSpacing: "0.2px" }}
                >
                  Join couples who never have to guess again.
                </p>

                <Link to="/signup">
                  <Button
                    size="lg"
                    className="rounded-full font-medium border-0 text-white transition-all"
                    style={{
                      background: "var(--swatch-cedar-grove)",
                      padding: "16px 40px",
                      fontSize: "14px",
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 500,
                      boxShadow: "0 4px 20px rgba(212, 84, 58, 0.30)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--swatch-cedar-grove-hover)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 6px 28px rgba(212, 84, 58, 0.42)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--swatch-cedar-grove)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(212, 84, 58, 0.30)";
                    }}
                  >
                    Create Your First Card&nbsp;&nbsp;→
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center">
          <div
            className="mx-auto max-w-3xl h-px mb-10"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(45, 104, 112, 0.15) 20%, rgba(45, 104, 112, 0.15) 80%, transparent)",
            }}
          />
          <span className="logo-text text-2xl">
            <span className="go">Go</span>
            <span className="two">Two</span>
          </span>
          <p className="text-sm mt-3" style={{ color: "var(--swatch-text-light)", fontWeight: 300 }}>
            © {new Date().getFullYear()} GoTwo. Made with love.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
