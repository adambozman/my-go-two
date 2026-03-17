import { motion } from "framer-motion";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

interface GreetingHeaderProps {
  displayName: string | null;
}

export function GreetingHeader({ displayName }: GreetingHeaderProps) {
  const firstName = displayName?.split(/\s+/)[0] || "";
  const greeting = getGreeting();
  const accentColor =
    greeting === "Good morning"
      ? "var(--swatch-teal)"
      : greeting === "Good afternoon"
        ? "var(--swatch-cedar-grove)"
        : "var(--swatch-antique-coin)";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-1 pt-1"
    >
      <p
        className="text-[12px] font-medium uppercase tracking-[0.10em]"
        style={{ color: accentColor, fontFamily: "'Jost', sans-serif" }}
      >
        What's The Vibe Today{firstName ? `, ${firstName}` : ""}
      </p>
    </motion.div>
  );
}
