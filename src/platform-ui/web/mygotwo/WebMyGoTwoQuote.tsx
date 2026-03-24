import { useRotatingQuote } from "@/hooks/useRotatingQuote";

export default function WebMyGoTwoQuote() {
  const quote = useRotatingQuote();

  return (
    <div className="w-full px-6 pt-2 text-center">
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
