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
    accent: "var(--swatch-viridian-odyssey)",
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
    accent: "var(--swatch-viridian-odyssey)",
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
    accent: "var(--swatch-viridian-odyssey)",
    aiHighlight: true,
  },
];

const Landing = () => {
  return (
    <div className="landing-page min-h-screen overflow-hidden">
      {/* Decorative organic shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 680,
            height: 680,
            top: "-12%",
            right: "-8%",
            background: "radial-gradient(circle, rgba(232,198,174,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            bottom: "15%",
            left: "-6%",
            background: "radial-gradient(circle, rgba(175,199,218,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 240,
            height: 240,
            top: "40%",
            right: "5%",
            background: "radial-gradient(circle, rgba(217,101,79,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10">

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-8 md:px-16 pt-16 md:pt-28 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Giant GoTwo branding — THE focal point */}
            <div className="mb-6">
              <span
                className="logo-text"
                style={{ fontSize: "clamp(5.5rem, 14vw, 12rem)", lineHeight: 0.95 }}
              >
                <span className="go">Go</span>
                <span className="two">Two</span>
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold mb-10 leading-snug"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "var(--swatch-viridian-odyssey)",
              }}
            >
              The Shortcut to Thoughtful.
              <br />
              <span style={{ color: "var(--swatch-cedar-grove)" }}>Never forget again.</span>
            </motion.h1>

            {/* Video placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-72 md:w-80 mx-auto mb-10 relative"
              style={{ aspectRatio: "3/4" }}
            >
              <div
                className="w-full h-full rounded-3xl flex items-center justify-center card-design-neumorph"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(246,226,212,0.7) 0%, rgba(232,198,174,0.5) 100%)",
                }}
              >
                <span
                  className="tracking-[0.4em] uppercase text-xs font-semibold"
                  style={{ color: "var(--swatch-antique-coin)" }}
                >
                  Video
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-lg mx-auto mb-4"
            >
              <p
                className="text-base md:text-lg mb-2"
                style={{ color: "var(--swatch-antique-coin)" }}
              >
                Create personal{" "}
                <span className="logo-text text-base md:text-lg">
                  <span className="go">Go</span>
                  <span className="two">Two</span>
                </span>{" "}
                lists for the details that matter
                <br />
                coffee orders, clothing sizes, date ideas and much more.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="text-sm font-bold tracking-wide mb-4"
              style={{ color: "var(--swatch-viridian-odyssey)" }}
            >
              Because Light isn't Ultra.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="text-sm mb-10 leading-relaxed"
              style={{ color: "var(--swatch-antique-coin)" }}
            >
              Share it once. · Update anytime. · Stop the arguments before they start.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="text-base px-10 py-7 rounded-full font-bold border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{
                    background: "var(--swatch-cedar-grove)",
                    color: "var(--swatch-cream-light)",
                  }}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-10 py-7 rounded-full font-semibold transition-all hover:scale-105"
                  style={{
                    borderColor: "var(--swatch-viridian-odyssey)",
                    color: "var(--swatch-viridian-odyssey)",
                    background: "transparent",
                  }}
                >
                  See How It Works
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Divider wave */}
        <div className="w-full overflow-hidden" style={{ height: 80 }}>
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
              fill="rgba(47,95,109,0.06)"
            />
          </svg>
        </div>

        {/* How It Works — Timeline */}
        <section
          id="how-it-works"
          className="py-20 md:py-28"
          style={{ background: "rgba(47,95,109,0.04)" }}
        >
          <div className="max-w-5xl mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p
                className="text-sm font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--swatch-cedar-grove)" }}
              >
                Your Journey
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--swatch-viridian-odyssey)",
                }}
              >
                How It Works
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--swatch-gypsum-rose), var(--swatch-viridian-odyssey), var(--swatch-gypsum-rose), transparent)",
                }}
              />
              {/* Mobile vertical line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-px md:hidden"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--swatch-gypsum-rose), var(--swatch-viridian-odyssey), var(--swatch-gypsum-rose), transparent)",
                }}
              />

              <div className="space-y-12 md:space-y-16">
                {timelineSteps.map((step, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {/* Desktop layout */}
                      <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                        {/* Left content */}
                        <div className={isLeft ? "text-right pr-12" : "order-2 pl-12"}>
                          <div
                            className="inline-block rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-2px]"
                            style={{
                              background: step.aiHighlight
                                ? "linear-gradient(165deg, rgba(47,95,109,0.12) 0%, rgba(175,199,218,0.15) 100%)"
                                : "linear-gradient(165deg, rgba(255,255,255,0.65) 0%, rgba(246,226,212,0.35) 100%)",
                              border: step.aiHighlight
                                ? "1px solid rgba(47,95,109,0.2)"
                                : "1px solid rgba(232,198,174,0.3)",
                              boxShadow:
                                "8px 8px 20px rgba(217,101,79,0.06), -6px -6px 16px rgba(255,255,255,0.45)",
                            }}
                          >
                            {step.aiHighlight && (
                              <div
                                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase mb-3 px-3 py-1 rounded-full"
                                style={{
                                  background: "rgba(47,95,109,0.1)",
                                  color: "var(--swatch-viridian-odyssey)",
                                }}
                              >
                                <Sparkles className="w-3 h-3" />
                                AI-Powered
                              </div>
                            )}
                            <h3
                              className="text-xl md:text-2xl font-bold mb-3"
                              style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "var(--swatch-viridian-odyssey)",
                              }}
                            >
                              {step.title}
                            </h3>
                            <p
                              className="text-sm md:text-base leading-relaxed"
                              style={{ color: "var(--swatch-antique-coin)" }}
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
                        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center z-10"
                        style={{
                          background: step.accent,
                          boxShadow: `0 4px 16px ${step.accent}44`,
                        }}
                      >
                        <span
                          className="text-xs font-black"
                          style={{ color: "var(--swatch-cream-light)" }}
                        >
                          {step.step}
                        </span>
                      </div>

                      {/* Mobile layout */}
                      <div className="md:hidden flex gap-5">
                        {/* Timeline node — Mobile */}
                        <div className="flex-shrink-0 relative z-10">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              background: step.accent,
                              boxShadow: `0 4px 16px ${step.accent}44`,
                            }}
                          >
                            <span
                              className="text-xs font-black"
                              style={{ color: "var(--swatch-cream-light)" }}
                            >
                              {step.step}
                            </span>
                          </div>
                        </div>

                        {/* Mobile content */}
                        <div
                          className="flex-1 rounded-2xl p-6"
                          style={{
                            background: step.aiHighlight
                              ? "linear-gradient(165deg, rgba(47,95,109,0.12) 0%, rgba(175,199,218,0.15) 100%)"
                              : "linear-gradient(165deg, rgba(255,255,255,0.65) 0%, rgba(246,226,212,0.35) 100%)",
                            border: step.aiHighlight
                              ? "1px solid rgba(47,95,109,0.2)"
                              : "1px solid rgba(232,198,174,0.3)",
                            boxShadow:
                              "6px 6px 16px rgba(217,101,79,0.06), -4px -4px 12px rgba(255,255,255,0.4)",
                          }}
                        >
                          {step.aiHighlight && (
                            <div
                              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase mb-3 px-3 py-1 rounded-full"
                              style={{
                                background: "rgba(47,95,109,0.1)",
                                color: "var(--swatch-viridian-odyssey)",
                              }}
                            >
                              <Sparkles className="w-3 h-3" />
                              AI-Powered
                            </div>
                          )}
                          <h3
                            className="text-lg font-bold mb-2"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              color: "var(--swatch-viridian-odyssey)",
                            }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--swatch-antique-coin)" }}
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

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2rem] p-12 md:p-16 text-center"
              style={{
                background:
                  "linear-gradient(145deg, var(--swatch-viridian-odyssey) 0%, rgba(47,95,109,0.9) 100%)",
                boxShadow: "0 24px 48px rgba(47,95,109,0.3)",
              }}
            >
              {/* Decorative circles */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 300,
                  height: 300,
                  top: "-40%",
                  right: "-10%",
                  background:
                    "radial-gradient(circle, rgba(217,101,79,0.25) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: 200,
                  height: 200,
                  bottom: "-30%",
                  left: "-5%",
                  background:
                    "radial-gradient(circle, rgba(232,198,174,0.2) 0%, transparent 60%)",
                }}
              />

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
                  className="text-2xl md:text-4xl font-bold mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "var(--swatch-cream-light)",
                  }}
                >
                  Ready to make every
                  <br />
                  gesture count?
                </h2>

                <p
                  className="text-base mb-8 opacity-80"
                  style={{ color: "var(--swatch-cream-light)" }}
                >
                  Join couples who never have to guess again.
                </p>

                <Link to="/signup">
                  <Button
                    size="lg"
                    className="rounded-full px-10 py-7 text-base font-bold border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    style={{
                      background: "var(--swatch-cedar-grove)",
                      color: "var(--swatch-cream-light)",
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
        <footer
          className="py-10 text-center"
          style={{ borderTop: "1px solid rgba(232,198,174,0.3)" }}
        >
          <span className="logo-text text-2xl">
            <span className="go">Go</span>
            <span className="two">Two</span>
          </span>
          <p className="text-sm mt-3" style={{ color: "var(--swatch-antique-coin)" }}>
            © {new Date().getFullYear()} GoTwo. Made with love.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
