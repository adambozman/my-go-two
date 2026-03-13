import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface BackState {
  label: string;
  onBack: () => void;
}

interface TopBarContextValue {
  backState: BackState | null;
  setBackState: (state: BackState | null) => void;
}

const TopBarContext = createContext<TopBarContextValue>({
  backState: null,
  setBackState: () => {},
});

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

export function useTopBar() {
  return useContext(TopBarContext);
}
