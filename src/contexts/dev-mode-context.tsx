import { createContext, useContext, useMemo } from "react";
import { useAuth } from "@/contexts/auth-context";

const DEV_EMAILS = ["adam.bozman@gmail.com"];

type DevModeContextValue = { isDevMode: boolean };
const DevModeContext = createContext<DevModeContextValue>({ isDevMode: false });

export function DevModeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const isDevMode = useMemo(
    () => Boolean(user?.email && DEV_EMAILS.includes(user.email)),
    [user?.email],
  );
  return (
    <DevModeContext.Provider value={{ isDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  return useContext(DevModeContext);
}
