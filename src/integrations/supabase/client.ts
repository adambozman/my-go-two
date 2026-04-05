import { createClient } from "@supabase/supabase-js";
import type { Database } from "./runtime-types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_PLACEHOLDER_URL = "https://placeholder.supabase.invalid";
const SUPABASE_PLACEHOLDER_KEY = "missing-supabase-publishable-key";
const missingSupabaseEnv: string[] = [];

if (!SUPABASE_URL) {
  missingSupabaseEnv.push("VITE_SUPABASE_URL");
}

if (!SUPABASE_PUBLISHABLE_KEY) {
  missingSupabaseEnv.push("VITE_SUPABASE_PUBLISHABLE_KEY");
}

const supabaseConfigError =
  missingSupabaseEnv.length > 0
    ? `Supabase is not configured. Missing ${missingSupabaseEnv.join(", ")}.`
    : null;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

if (supabaseConfigError) {
  console.error(supabaseConfigError);
}

export const supabase = createClient<Database>(
  SUPABASE_URL || SUPABASE_PLACEHOLDER_URL,
  SUPABASE_PUBLISHABLE_KEY || SUPABASE_PLACEHOLDER_KEY,
  {
    global: supabaseConfigError
      ? {
          fetch: async () => {
            throw new Error(supabaseConfigError);
          },
        }
      : undefined,
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);

export { supabaseConfigError };
// Codebase classification: runtime Supabase client bootstrap.
