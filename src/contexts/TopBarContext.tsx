import { useState, useCallback, type ReactNode } from "react";
import type { BackState } from "@/contexts/top-bar-context";
import { TopBarContext } from "@/contexts/top-bar-context";

export function TopBarProvider({ children }: { children: ReactNode }) {
  const [backState, setBackStateRaw] = useState<BackState | null>(null);

  const setBackState = useCallback((state: BackState | null) => {
    setBackStateRaw(state);
  }, []);

  return (
    <TopBarContext.Provider value={{ backState, setBackState }}>
      {children}
    </TopBarContext.Provider>
  );
}
