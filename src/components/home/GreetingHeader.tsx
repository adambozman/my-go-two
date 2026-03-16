import { useEffect, useState } from "react";

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
  const [greeting] = useState(getGreeting);
  const firstName = displayName?.split(/\s+/)[0] || "";

  return (
    <div className="px-1">
      <p
        className="text-[13px] font-medium"
        style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}
      >
        {greeting}{firstName ? `, ${firstName}` : ""}
      </p>
      <h1
        className="text-[22px] font-semibold leading-tight mt-0.5"
        style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Cormorant Garamond', serif" }}
      >
        Your Dashboard
      </h1>
    </div>
  );
}
