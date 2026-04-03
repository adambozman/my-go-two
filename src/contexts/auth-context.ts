import { createContext, useContext } from "react";
import type { Session, User } from "@supabase/supabase-js";

export const SUBSCRIPTION_TIERS = {
  premium: {
    product_id: "prod_U7vTm1mY6aBgKf",
    monthly_price_id: "price_1T9fcqQaPvMJyaGFK7svxopT",
    yearly_price_id: "price_1T9fcpQaPvMJyaGFWPfn8xe7",
  },
} as const;

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  subscribed: boolean;
  subscriptionLoading: boolean;
  subscriptionEnd: string | null;
  checkSubscription: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);
