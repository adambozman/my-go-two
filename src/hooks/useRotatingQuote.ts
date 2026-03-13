import { useState, useEffect } from "react";
import { RELATIONSHIP_QUOTES, QUOTE_INTERVAL_MS, QUOTE_FADE_MS } from "@/lib/quotes";

interface RotatingQuote {
  text: string;
  author: string;
  visible: boolean; // true = faded in, false = fading out
}

/** Returns the current rotating quote and its visibility state.
 *  Cycles through RELATIONSHIP_QUOTES every QUOTE_INTERVAL_MS with a fade transition. */
export function useRotatingQuote(): RotatingQuote {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * RELATIONSHIP_QUOTES.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        // Swap quote then fade back in
        setIndex((i) => (i + 1) % RELATIONSHIP_QUOTES.length);
        setVisible(true);
      }, QUOTE_FADE_MS);
    }, QUOTE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return {
    ...RELATIONSHIP_QUOTES[index],
    visible,
  };
}
