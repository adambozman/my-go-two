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

/**
 * Inspirational quotes from real people for the bottom quote bar.
 * These rotate on a timer — author names are displayed as-is.
 */
export const INSPIRATIONAL_QUOTES = [
  { text: "The best things in life are the people who know you and love you anyway.", author: "Elisabeth Kübler-Ross" },
  { text: "We are most alive when we find the courage to be vulnerable and tender.", author: "Brené Brown" },
  { text: "No one has ever become poor by giving.", author: "Anne Frank" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "People will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.", author: "Ralph Waldo Emerson" },
] as const;
