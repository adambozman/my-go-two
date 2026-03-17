import { motion } from "framer-motion";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

interface GreetingHeaderProps {
  displayName: string | null;
  connectionCount: number;
}

export function GreetingHeader({ displayName, connectionCount }: GreetingHeaderProps) {
  const firstName = displayName?.split(/\s+/)[0] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-1"
    >
      <p
        className="text-[12px] font-medium uppercase tracking-[0.10em]"
        style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
      >
        {getGreeting()}{firstName ? `, ${firstName}` : ""}
      </p>
      <h1
        className="text-[26px] font-semibold leading-tight mt-1"
        style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Cormorant Garamond', serif" }}
      >
        {connectionCount > 0
          ? `${connectionCount} Connection${connectionCount !== 1 ? "s" : ""}`
          : "Your Dashboard"}
      </h1>
    </motion.div>
  );
}
