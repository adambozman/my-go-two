import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ListChecks, Share2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import GoTwoText from "@/components/GoTwoText";

const Landing = () => {
  return (
    <div className="landing-page min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        <GoTwoText className="text-2xl" />
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="rounded-full">Get Started Free</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight mb-6">
            The Shortcut to Thoughtful.
            <br />
            Never forget again.
          </h1>

          {/* Video placeholder */}
          <div className="w-64 h-80 mx-auto rounded-3xl card-design-neumorph flex items-center justify-center mb-8">
            <span className="text-muted-foreground tracking-[0.3em] uppercase text-sm">Video</span>
          </div>

          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-2">
            Create personal <GoTwoText className="text-base" /> lists for the details that matter
            <br />coffee orders, clothing sizes, date ideas and much more.
          </p>
          <p className="text-sm text-muted-foreground font-medium mb-4">Because Light isn't Ultra.</p>
          <p className="text-sm text-muted-foreground mb-8">
            Share it once.<br />
            Update anytime.<br />
            Stop the arguments before they start
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-base px-8 py-6 rounded-full">
                Get Started Free
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-full">
                See How It Works
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: ListChecks,
              title: "Create Your Cards",
              description: "Build GoTwo cards for your favorite coffee order, clothing sizes, gift ideas, and anything else your partner needs to know.",
            },
            {
              icon: Share2,
              title: "Share With Your Partner",
              description: "Invite your significant other to access your lists. They'll always have your preferences at their fingertips.",
            },
            {
              icon: Heart,
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
              className="card-design-neumorph p-8 text-center"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.4)' }}>
                <step.icon className="w-7 h-7" style={{ color: 'var(--swatch-cedar-grove)' }} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates Preview */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Ready-Made Templates
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Start with our curated templates or create your own custom cards.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { emoji: "☕", label: "Coffee Order" },
            { emoji: "🥗", label: "Salad Preferences" },
            { emoji: "👕", label: "Clothing Sizes" },
            { emoji: "💕", label: "Date Ideas" },
            { emoji: "🎁", label: "Gift Ideas" },
          ].map((t) => (
            <div key={t.label} className="card-design-neumorph p-5 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{t.emoji}</div>
              <p className="text-sm font-medium text-primary">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20 text-center">
        <div className="bg-primary rounded-3xl p-12">
          <Sparkles className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--swatch-cedar-grove)' }} />
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to make every gesture count?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Join couples who never have to guess again.
          </p>
          <Link to="/signup">
            <Button size="lg" className="rounded-full px-8 py-6 text-base" style={{ background: 'var(--swatch-cedar-grove)', color: 'var(--swatch-cream-light)' }}>
              Create Your First Card
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <GoTwoText className="text-xl mb-2" />
        <p>© {new Date().getFullYear()} GoTwo. Made with love.</p>
      </footer>
    </div>
  );
};

export default Landing;
