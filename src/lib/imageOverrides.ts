/**
 * Image overrides — lets users assign spare bank photos to any image key.
 * Stored in localStorage so no DB needed.
 */

const STORAGE_KEY = "gotwo_image_overrides";

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
}

export function clearOverride(imageKey: string): void {
  const overrides = getOverrides();
  delete overrides[imageKey];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}
