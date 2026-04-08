import { useEffect, useState } from "react";
import { RELATIONSHIP_QUOTES } from "@/lib/quotes";

/**
 * FUTURE-PROJECT ASSET
 *
 * Simple rotating-quote hook kept for future use with reserved quote copy.
 * Not wired into the current live customer flow.
 */
export function useRotatingQuote(intervalMs = 4800) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (RELATIONSHIP_QUOTES.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % RELATIONSHIP_QUOTES.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return {
    index,
    quote: RELATIONSHIP_QUOTES[index],
    quotes: RELATIONSHIP_QUOTES,
  };
}
