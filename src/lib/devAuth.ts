// DEV-ONLY auth helpers. These are not normal customer runtime paths.
export const DEV_AUTH_EMAILS = ["adam.bozman@gmail.com"] as const;
export const DEV_AUTH_USER_IDS = ["e78cff1c-54e3-4365-b172-461b7b6f25e6"] as const;

export const normalizeAuthEmail = (value: string | null | undefined) => value?.trim().toLowerCase() ?? "";

export const isDevAuthEmail = (value: string | null | undefined) =>
  (DEV_AUTH_EMAILS as readonly string[]).includes(normalizeAuthEmail(value));

export const isDevAuthUserId = (value: string | null | undefined) =>
  DEV_AUTH_USER_IDS.includes((value ?? "").trim() as (typeof DEV_AUTH_USER_IDS)[number]);
