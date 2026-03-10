import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ListChecks, Share2, Sparkles, ArrowRight, Coffee, Shirt, Gift, CalendarHeart } from "lucide-react";
import { motion } from "framer-motion";

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
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 md:px-16 py-5">
          <span className="logo-text text-2xl">
            <span className="go">Go</span>
            <span className="two">Two</span>
          </span>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-sm font-semibold" style={{ color: "var(--swatch-viridian-odyssey)" }}>
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="rounded-full px-6 text-sm font-bold border-0"
                style={{
                  background: "var(--swatch-viridian-odyssey)",
                  color: "var(--swatch-cream-light)",
                }}
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-8 md:px-16 pt-16 md:pt-24 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Giant GoTwo branding */}
            <div className="mb-8">
              <span className="logo-text" style={{ fontSize: "clamp(5rem, 12vw, 10rem)", lineHeight: 1 }}>
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

            {/* Video placeholder — kept for future use */}
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
                  background: "linear-gradient(165deg, rgba(246,226,212,0.7) 0%, rgba(232,198,174,0.5) 100%)",
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
              <p className="text-base md:text-lg mb-2" style={{ color: "var(--swatch-antique-coin)" }}>
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
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="rgba(47,95,109,0.06)" />
          </svg>
        </div>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 md:py-28" style={{ background: "rgba(47,95,109,0.04)" }}>
          <div className="max-w-6xl mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p
                className="text-sm font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--swatch-cedar-grove)" }}
              >
                Simple & Powerful
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

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: ListChecks,
                  step: "01",
                  title: "Create Your Cards",
                  description: "Build GoTwo cards for your favorite coffee order, clothing sizes, gift ideas, and anything else your partner needs to know.",
                },
                {
                  icon: Share2,
                  step: "02",
                  title: "Share With Your Partner",
                  description: "Invite your significant other to access your lists. They'll always have your preferences at their fingertips.",
                },
                {
                  icon: Heart,
                  step: "03",
                  title: "Never Guess Again",
                  description: "No more wrong sizes, forgotten orders, or generic gifts. Every choice becomes thoughtful and personal.",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div
                    className="p-8 md:p-10 text-center rounded-3xl transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-xl"
                    style={{
                      background: "linear-gradient(165deg, rgba(255,255,255,0.7) 0%, rgba(246,226,212,0.4) 100%)",
                      border: "1px solid rgba(232,198,174,0.35)",
                      boxShadow: "8px 8px 20px rgba(217,101,79,0.08), -6px -6px 16px rgba(255,255,255,0.5)",
                    }}
                  >
                    {/* Step number */}
                    <span
                      className="text-6xl md:text-7xl font-black opacity-[0.07] absolute top-4 right-6"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      {step.step}
                    </span>

                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, var(--swatch-viridian-odyssey) 0%, rgba(47,95,109,0.8) 100%)",
                        boxShadow: "0 8px 20px rgba(47,95,109,0.25)",
                      }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: "var(--swatch-cream-light)" }} />
                    </div>

                    <h3
                      className="text-xl md:text-2xl font-bold mb-3"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Preview */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p
                className="text-sm font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--swatch-cedar-grove)" }}
              >
                Ready To Go
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--swatch-viridian-odyssey)",
                }}
              >
                Curated Templates
              </h2>
              <p className="text-base max-w-md mx-auto" style={{ color: "var(--swatch-antique-coin)" }}>
                Start with our ready-made cards or create your own from scratch.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
              {[
                { Icon: Coffee, label: "Coffee Order", gradient: "135deg, rgba(217,101,79,0.18) 0%, rgba(232,198,174,0.25) 100%" },
                { Icon: Shirt, label: "Clothing Sizes", gradient: "135deg, rgba(47,95,109,0.18) 0%, rgba(175,199,218,0.25) 100%" },
                { Icon: CalendarHeart, label: "Date Ideas", gradient: "135deg, rgba(101,70,85,0.18) 0%, rgba(216,209,214,0.25) 100%" },
                { Icon: Gift, label: "Gift Ideas", gradient: "135deg, rgba(233,203,116,0.22) 0%, rgba(232,198,174,0.25) 100%" },
                { Icon: Sparkles, label: "Wish Lists", gradient: "135deg, rgba(157,166,79,0.18) 0%, rgba(232,198,174,0.25) 100%" },
              ].map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div
                    className="p-6 md:p-7 text-center rounded-2xl transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-lg"
                    style={{
                      background: `linear-gradient(${t.gradient})`,
                      border: "1px solid rgba(232,198,174,0.3)",
                      boxShadow: "6px 6px 16px rgba(217,101,79,0.06), -4px -4px 12px rgba(255,255,255,0.4)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <t.Icon className="w-6 h-6" style={{ color: "var(--swatch-viridian-odyssey)" }} />
                    </div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "var(--swatch-viridian-odyssey)" }}
                    >
                      {t.label}
                    </p>
                  </div>
                </motion.div>
              ))}
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
                background: "linear-gradient(145deg, var(--swatch-viridian-odyssey) 0%, rgba(47,95,109,0.9) 100%)",
                boxShadow: "0 24px 48px rgba(47,95,109,0.3)",
              }}
            >
              {/* Decorative circles in CTA */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 300,
                  height: 300,
                  top: "-40%",
                  right: "-10%",
                  background: "radial-gradient(circle, rgba(217,101,79,0.25) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: 200,
                  height: 200,
                  bottom: "-30%",
                  left: "-5%",
                  background: "radial-gradient(circle, rgba(232,198,174,0.2) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10">
                <Sparkles className="w-10 h-10 mx-auto mb-5" style={{ color: "var(--swatch-cedar-grove)" }} />

                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "var(--swatch-cream-light)",
                  }}
                >
                  Ready to make every
                  <br />
                  gesture count?
                </h2>

                <p className="text-base mb-8 opacity-80" style={{ color: "var(--swatch-cream-light)" }}>
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
        <footer className="py-10 text-center" style={{ borderTop: "1px solid rgba(232,198,174,0.3)" }}>
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
