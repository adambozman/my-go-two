export interface Quote {
  text: string;
  author: string;
}

/** Single source of truth for all rotating relationship quotes.
 *  Displayed in the header tagline on /dashboard/my-go-two.
 *  To add or remove quotes, edit this array only. */
export const RELATIONSHIP_QUOTES: Quote[] = [
  { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
  { text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
  { text: "In all the world, there is no heart for me like yours.", author: "Maya Angelou" },
  { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
  { text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë" },
  { text: "I would rather spend one lifetime with you than face all the ages of this world alone.", author: "J.R.R. Tolkien" },
  { text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author: "Dr. Seuss" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
  { text: "The real lover is the man who can thrill you just by touching your head or smiling into your eyes.", author: "Marilyn Monroe" },
  { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
  { text: "A successful marriage requires falling in love many times, always with the same person.", author: "Mignon McLaughlin" },
  { text: "You don't love someone for their looks or their clothes, but because they sing a song only you can hear.", author: "Oscar Wilde" },
  { text: "The greatest happiness of life is the conviction that we are loved.", author: "Victor Hugo" },
  { text: "Love is not about how many days, months, or years you have been together. It is about how much you love each other every day.", author: "Unknown" },
  { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
  { text: "Come sleep with me; we won't make love — love will make us.", author: "Julio Cortázar" },
  { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
  { text: "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.", author: "Helen Keller" },
  { text: "I am nothing special, of this I am sure. I am a common man with common thoughts. But I've loved another with all I have.", author: "Nicholas Sparks" },
  { text: "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.", author: "Maya Angelou" },
];

/** How long each quote is displayed before fading to the next (ms) */
export const QUOTE_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

/** Fade transition duration (ms) */
export const QUOTE_FADE_MS = 800;
