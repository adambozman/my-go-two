/**
 * Image blocklist — backed by the database.
 *
 * On app boot, `initBlocklist()` loads all blocked paths from the
 * `image_blocklist` table into a module-level Set.  Resolvers call
 * `isBlocked(url)` synchronously against that cache.
 *
 * The gallery calls `addToBlocklist(path)` which writes to the DB
 * and updates the local cache in one step.
 */

import { supabase } from "@/integrations/supabase/client";

interface ImageBlocklistRow {
  path: string;
}

/* ── Build-time glob for active asset buckets only ── */
const activeAssetGlobs = [
  import.meta.glob<string>("/src/assets/styles/**/*.{jpg,jpeg,png,webp,svg}", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("/src/assets/templates/**/*.{jpg,jpeg,png,webp,svg}", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("/src/assets/spare/**/*.{jpg,jpeg,png,webp,svg}", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("/src/assets/stock/**/*.{jpg,jpeg,png,webp,svg}", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("/src/assets/previews/**/*.{jpg,jpeg,png,webp,svg}", {
    eager: true,
    import: "default",
  }),
];

const allAssets = Object.assign({}, ...activeAssetGlobs);

/** Cached set of blocked runtime URLs (for resolver checks) */
let blockedUrls = new Set<string>();

/** Cached set of blocked source paths (for gallery checks) */
let blockedPaths = new Set<string>();

/** Whether the blocklist has finished loading from the DB */
let blocklistReady = false;

/**
 * Load all blocked paths from the DB and rebuild the caches.
 * Called once at app startup and again after every delete.
 */
export async function initBlocklist(): Promise<void> {
  const { data, error } = await supabase
    .from("image_blocklist")
    .select("path");

  if (error) {
    console.warn("[imageBlocklist] Failed to load blocklist:", error.message);
    blocklistReady = true;
    return;
  }

  const rows = (data ?? []) as ImageBlocklistRow[];
  const paths = rows.map((row) => row.path);
  blockedPaths = new Set(paths);
  blockedUrls = new Set(
    paths.map((p) => allAssets[p]).filter(Boolean),
  );
  blocklistReady = true;
}

/** Check if the blocklist cache has been loaded */
export function isBlocklistReady(): boolean {
  return blocklistReady;
}

/** Synchronous check used by all resolvers */
export function isBlocked(url: string): boolean {
  return blockedUrls.has(url);
}

/** Check by source path (used by gallery) */
export function isPathBlocked(path: string): boolean {
  return blockedPaths.has(path);
}

/**
 * Permanently block an image path.
 * Writes to DB, then refreshes both caches.
 */
export async function addToBlocklist(path: string): Promise<boolean> {
  const { error } = await supabase
    .from("image_blocklist")
    .insert({ path });

  if (error) {
    if (error.code === "23505") {
      blockedPaths.add(path);
      const url = allAssets[path];
      if (url) blockedUrls.add(url);
      return true;
    }
    console.error("[imageBlocklist] Insert failed:", error.message);
    return false;
  }

  blockedPaths.add(path);
  const url = allAssets[path];
  if (url) blockedUrls.add(url);
  return true;
}

/**
 * Remove a path from the blocklist (undo).
 */
export async function removeFromBlocklist(path: string): Promise<boolean> {
  const { error } = await supabase
    .from("image_blocklist")
    .delete()
    .eq("path", path);

  if (error) {
    console.error("[imageBlocklist] Delete failed:", error.message);
    return false;
  }

  blockedPaths.delete(path);
  const url = allAssets[path];
  if (url) blockedUrls.delete(url);
  return true;
}

export { blockedPaths, blockedUrls };
