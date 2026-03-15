/**
 * Image overrides — lets users assign spare bank photos to any image key.
 * Stored in localStorage. Fires a custom event on change so components
 * can re-render immediately without a page refresh.
 */

const STORAGE_KEY = "gotwo_image_overrides";
export const OVERRIDE_CHANGED_EVENT = "gotwo_override_changed";

export function getOverrides(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getOverride(imageKey: string): string | null {
  return getOverrides()[imageKey] ?? null;
}

export function setOverride(imageKey: string, spareUrl: string): void {
  const overrides = getOverrides();
  overrides[imageKey] = spareUrl;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, { detail: { imageKey, url: spareUrl } }));
}

export function clearOverride(imageKey: string): void {
  const overrides = getOverrides();
  delete overrides[imageKey];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, { detail: { imageKey, url: null } }));
}
