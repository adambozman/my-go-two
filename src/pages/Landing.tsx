import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
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
        <section className="max-w-5xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-10 text-center min-h-screen flex flex-col justify-center">
          <motion.div
            {...riseIn(0)}
            className="flex flex-col items-center"
          >
            {/* GoTwo branding */}
            <div className="mb-6">
              <span
                className="logo-text"
                style={{ fontSize: "clamp(4rem, 12vw, 9rem)", lineHeight: 0.95 }}
              >
                <span className="go">Go</span>
                <span className="two">Two</span>
              </span>
            </div>

            <motion.h1
              {...riseIn(0.08)}
              className="text-2xl md:text-4xl font-semibold mb-4 leading-snug"
              style={{ color: "var(--swatch-viridian-odyssey)" }}
            >
              The Shortcut to Thoughtful.
              <br />
              <em style={{ color: "var(--swatch-cedar-grove)", fontStyle: "italic" }}>
                Never forget again.
              </em>
            </motion.h1>

            <motion.p
              {...riseIn(0.16)}
              className="text-sm md:text-base mb-10"
              style={{ color: "var(--swatch-antique-coin)", fontWeight: 300 }}
            >
              One place for everything that matters to the people who matter most.
            </motion.p>

            {/* Video placeholder */}
            <motion.div
              {...riseIn(0.24)}
              className="w-full max-w-3xl mb-10 relative"
              style={{ aspectRatio: "16/9" }}
            >
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3 card-design-neumorph"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    background: "var(--swatch-cedar-grove)",
                    boxShadow: "0 4px 20px rgba(212, 84, 58, 0.30)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 ml-0.5" style={{ color: "#fff" }}>
                    <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36A1 1 0 008 5.14z" fill="currentColor" />
                  </svg>
                </div>
                <span
                  className="tracking-[0.3em] uppercase text-xs"
                  style={{ color: "var(--swatch-text-light)", fontWeight: 500 }}
                >
                  See It In Action
                </span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              {...riseIn(0.32)}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="rounded-full font-medium border-0 transition-all text-white"
                  style={{
                    background: "var(--swatch-cedar-grove)",
                    padding: "14px 32px",
                    fontSize: "13.5px",
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
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full font-medium transition-all"
                  style={{
                    border: "1.5px solid rgba(45, 104, 112, 0.45)",
                    color: "var(--swatch-teal)",
                    background: "transparent",
                    padding: "14px 32px",
                    fontSize: "13.5px",
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 500,
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
                </Button>
              </a>
            </motion.div>

            <motion.p
              {...riseIn(0.40)}
              className="text-xs mt-4"
              style={{ color: "var(--swatch-text-light)", fontWeight: 300 }}
            >
              Free to start &nbsp;·&nbsp; No credit card required
            </motion.p>
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
                      transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.2] }}
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
              transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.2] }}
              viewport={{ once: true, margin: "-15%" }}
              className="relative overflow-hidden rounded-[2rem] p-12 md:p-16 text-center"
              style={{
                background:
                  "linear-gradient(145deg, var(--swatch-viridian-odyssey) 0%, var(--swatch-teal) 100%)",
                boxShadow: "0 24px 48px rgba(30, 74, 82, 0.3)",
              }}
            >
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
                  style={{ color: "var(--swatch-cream-light)" }}
                >
                  Ready to make every
                  <br />
                  gesture count?
                </h2>

                <p
                  className="text-base mb-8 opacity-80"
                  style={{ color: "var(--swatch-cream-light)", fontWeight: 300 }}
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
                    Create Your First Card
                    <ArrowRight className="ml-2 w-5 h-5" />
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
