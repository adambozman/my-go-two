/**
 * FUTURE-PROJECT ASSET
 *
 * Reserved relationship quote copy for possible future onboarding,
 * marketing, or ambient UX treatments.
 *
 * Not part of the current live customer flow.
 *
 * LEGAL: The author value "__GOTWO_LOGO__" is a sentinel.
 * Any component rendering this must replace it with <GoTwoInline />
 * (the brand logo). "Go Two" must NEVER appear as plain text.
 */

export const GOTWO_LOGO_SENTINEL = "__GOTWO_LOGO__" as const;

export const RELATIONSHIP_QUOTES = [
  { text: "The greatest gift is feeling known.", author: "__GOTWO_LOGO__" },
  { text: "Thoughtfulness is built from details remembered well.", author: "__GOTWO_LOGO__" },
  { text: "The small things are usually the big things.", author: "__GOTWO_LOGO__" },
  { text: "Being known should feel easier than being guessed at.", author: "__GOTWO_LOGO__" },
  { text: "Care becomes visible when memory turns into action.", author: "__GOTWO_LOGO__" },
  { text: "Good gifts start long before the occasion does.", author: "__GOTWO_LOGO__" },
  { text: "The right details remove everyday friction.", author: "__GOTWO_LOGO__" },
  { text: "Love often looks like remembering.", author: "__GOTWO_LOGO__" },
] as const;
