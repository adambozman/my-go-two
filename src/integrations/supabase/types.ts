// SAFE SUPABASE TYPE ENTRYPOINT.
// The stale generated schema snapshot now lives in generated-legacy-types.ts.
// New code should use runtime-types.ts directly, but importing Database from this file is no longer dangerous.

export type { Database, Json } from "./runtime-types";

// Codebase classification: safe type shim for runtime imports.
