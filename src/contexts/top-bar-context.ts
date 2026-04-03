import { createContext, useContext } from "react";

export interface BackState {
  label: string;
  onBack: () => void;
}

interface TopBarContextValue {
  backState: BackState | null;
  setBackState: (state: BackState | null) => void;
}

export const TopBarContext = createContext<TopBarContextValue>({
  backState: null,
  setBackState: () => {},
});

export function useTopBar() {
  return useContext(TopBarContext);
}
