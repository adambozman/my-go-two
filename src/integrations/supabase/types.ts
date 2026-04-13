// SAFE SUPABASE TYPE ENTRYPOINT.
// New code should use runtime-types.ts directly, but importing Database from this file is safe.

export type { Database, Json } from "./runtime-types";

// Codebase classification: safe type shim for runtime imports.
