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

/* ── Build-time glob for mapping source paths → runtime URLs ── */
const allAssets = import.meta.glob<string>(
  "/src/assets/**/*.{jpg,jpeg,png,webp,svg}",
  { eager: true, import: "default" },
);

/** Cached set of blocked runtime URLs (for resolver checks) */
let blockedUrls = new Set<string>();

/** Cached set of blocked source paths (for gallery checks) */
let blockedPaths = new Set<string>();

/** Whether the cache has been initialised at least once */
let initialised = false;

/**
 * Load all blocked paths from the DB and rebuild the caches.
 * Called once at app startup and again after every delete.
 */
export async function initBlocklist(): Promise<void> {
  const { data, error } = await supabase
    .from("image_blocklist" as any)
    .select("path");

  if (error) {
    console.warn("[imageBlocklist] Failed to load blocklist:", error.message);
    initialised = true;
    return;
  }

  const paths: string[] = (data as any[])?.map((r: any) => r.path) ?? [];
  blockedPaths = new Set(paths);
  blockedUrls = new Set(
    paths.map((p) => allAssets[p]).filter(Boolean),
  );
  initialised = true;
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
    .from("image_blocklist" as any)
    .insert({ path } as any);

  if (error) {
    // duplicate path is fine (unique constraint)
    if (error.code === "23505") {
      blockedPaths.add(path);
      const url = allAssets[path];
      if (url) blockedUrls.add(url);
      return true;
    }
    console.error("[imageBlocklist] Insert failed:", error.message);
    return false;
  }

  // Update local caches immediately
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
    .from("image_blocklist" as any)
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

export { blockedPaths, blockedUrls, initialised };
