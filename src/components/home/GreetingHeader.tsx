import { motion } from "framer-motion";

interface GreetingHeaderProps {
  displayName: string | null;
}

export function GreetingHeader({ displayName: _displayName }: GreetingHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden"
      aria-hidden="true"
    />
  );
}
