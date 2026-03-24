import { useRotatingQuote } from "@/hooks/useRotatingQuote";

interface WebMyGoTwoQuoteProps {
  className?: string;
}

export default function WebMyGoTwoQuote({ className = "" }: WebMyGoTwoQuoteProps) {
  const quote = useRotatingQuote();

  return (
    <div className={`pointer-events-none w-full px-6 pt-2 text-center ${className}`.trim()}>
      <p
        className="mx-auto max-w-[720px] text-[28px] font-semibold italic leading-[1.25] text-[var(--logo-two-color)]"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          opacity: quote.visible ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        "{quote.text}"
      </p>
    </div>
  );
}
