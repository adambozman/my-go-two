/**
 * Image position overrides — stores object-position (x%, y%) per imageKey.
 * Persisted in localStorage for simplicity.
 */

const STORAGE_KEY = "gotwo_image_positions";
export const POSITION_CHANGED_EVENT = "gotwo_position_changed";

export interface ImagePosition {
  x: number; // 0-100 percent
  y: number; // 0-100 percent
}

function readAll(): Record<string, ImagePosition> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getImagePosition(imageKey: string): ImagePosition | null {
  return readAll()[imageKey] ?? null;
}

export function setImagePosition(imageKey: string, pos: ImagePosition): void {
  const all = readAll();
  all[imageKey] = pos;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent(POSITION_CHANGED_EVENT, { detail: { imageKey, pos } }));
}

export function clearImagePosition(imageKey: string): void {
  const all = readAll();
  delete all[imageKey];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent(POSITION_CHANGED_EVENT, { detail: { imageKey, pos: null } }));
}
