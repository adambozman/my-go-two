export interface Quote {
  text: string;
  author: string;
}

/** Single source of truth for all rotating relationship quotes.
 *  Displayed in the header tagline on /dashboard/my-go-two.
 *  To add or remove quotes, edit this array only. */
export const RELATIONSHIP_QUOTES: Quote[] = [
  // Romantic classics
  { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
  { text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
  { text: "In all the world, there is no heart for me like yours.", author: "Maya Angelou" },
  { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
  { text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë" },
  { text: "I would rather spend one lifetime with you than face all the ages of this world alone.", author: "J.R.R. Tolkien" },
  { text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author: "Dr. Seuss" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
  { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
  { text: "The greatest happiness of life is the conviction that we are loved.", author: "Victor Hugo" },
  { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
  { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
  { text: "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.", author: "Helen Keller" },
  { text: "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.", author: "Maya Angelou" },
  { text: "A successful marriage requires falling in love many times, always with the same person.", author: "Mignon McLaughlin" },
  { text: "You don't love someone for their looks or their clothes, but because they sing a song only you can hear.", author: "Oscar Wilde" },
  { text: "I love her and that's the beginning and end of everything.", author: "F. Scott Fitzgerald" },
  { text: "She is the only evidence of God I have seen with the exception of the stars.", author: "Patrick Symmes" },
  { text: "If I know what love is, it is because of you.", author: "Hermann Hesse" },
  { text: "Come sleep with me; we won't make love — love will make us.", author: "Julio Cortázar" },
  { text: "I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love.", author: "Gabriel García Márquez" },
  { text: "Whatever you are, be a good one.", author: "Abraham Lincoln" },
  { text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.", author: "Leo Christopher" },
  { text: "In case you ever foolishly forget: I am never not thinking of you.", author: "Virginia Woolf" },
  { text: "I want to do with you what spring does with the cherry trees.", author: "Pablo Neruda" },
  { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known — and even that is an understatement.", author: "F. Scott Fitzgerald" },
  { text: "Every love story is beautiful, but ours is my favorite.", author: "Unknown" },
  { text: "I look at you and see the rest of my life in front of my eyes.", author: "Unknown" },
  { text: "You are my sun, my moon, and all my stars.", author: "E.E. Cummings" },
  { text: "The real lover is the man who can thrill you by touching your head or smiling into your eyes.", author: "Marilyn Monroe" },

  // Funny & relatable
  { text: "I love you more than coffee, but please don't make me prove it.", author: "Unknown" },
  { text: "Behind every great man is a woman rolling her eyes.", author: "Jim Carrey" },
  { text: "I love being married. It's so great to find that one special person you want to annoy for the rest of your life.", author: "Rita Rudner" },
  { text: "Love is blind, but marriage is a real eye-opener.", author: "Pauline Thomason" },
  { text: "A man in love is incomplete until he is married. Then he's finished.", author: "Zsa Zsa Gabor" },
  { text: "Before you marry a person, you should first make them use a computer with slow internet to see who they really are.", author: "Will Ferrell" },
  { text: "My wife and I were happy for twenty years. Then we met.", author: "Rodney Dangerfield" },
  { text: "Marriage is like a phone call in the night: first the ring, and then you wake up.", author: "Evelyn Hendrickson" },
  { text: "The secret of a happy marriage remains a secret.", author: "Henny Youngman" },
  { text: "I love you with all my butt. I would say heart, but my butt is bigger.", author: "Unknown" },
  { text: "Marriage is just texting each other 'do you need anything from the kitchen?' multiple times a day.", author: "Unknown" },
  { text: "I married for love, but the obvious side benefit of having someone to hand me my phone charger is incredible.", author: "Unknown" },
  { text: "You're the only person I'd share my fries with.", author: "Unknown" },
  { text: "Love is spending the rest of your life with someone you want to kill, and not doing it because you'd miss them.", author: "Unknown" },
  { text: "I love you even when I'm hungry, and that's saying something.", author: "Unknown" },
  { text: "You're the reason I look down at my phone and smile. Then walk into a wall.", author: "Unknown" },
  { text: "We go together like drunk and disorderly.", author: "Unknown" },
  { text: "I still fall for you every day. Sometimes literally, because you leave things on the floor.", author: "Unknown" },
  { text: "My wife tells me I have two faults. I don't listen, and something else.", author: "Unknown" },
  { text: "True love is not having to hold your stomach in anymore.", author: "Unknown" },
  { text: "Love: the condition in which the happiness of another person is essential to your own, except during the playoffs.", author: "Unknown" },
  { text: "I love you more than pizza, and I'm dead serious about both.", author: "Unknown" },
  { text: "A good marriage is one where each partner secretly suspects they got the better deal.", author: "Unknown" },
  { text: "You're my favorite notification.", author: "Unknown" },
  { text: "I love you more than yesterday. Yesterday you really got on my nerves.", author: "Unknown" },
  { text: "Growing old with you is the adventure I signed up for.", author: "Unknown" },
  { text: "Marry someone who will watch your weird documentaries with you and not complain.", author: "Unknown" },
  { text: "The most important four words for a successful marriage: 'I'll do the dishes.'", author: "Unknown" },
  { text: "You're the only one I want next to me when my fantasy team loses.", author: "Unknown" },
  { text: "Relationships are just two people constantly asking each other what they want to eat until one of them dies.", author: "Unknown" },

  // Guy-friendly perspectives
  { text: "A real man never stops trying to show a woman how much she means to him, even after he has her.", author: "Unknown" },
  { text: "Find a woman who makes you feel more alive. She won't make life perfect but she'll make it infinitely more interesting.", author: "Gavin Scott" },
  { text: "The best thing a man can do for his children is to love their mother.", author: "John Wooden" },
  { text: "To the world you may be one person, but to one person you may be the world.", author: "Bill Wilson" },
  { text: "A man reserves his true and deepest love not for the species of woman in whose company he finds himself electrified, but for that one in whose company he may feel tenderly drowsy.", author: "George Jean Nathan" },
  { text: "The woman who makes a man feel like the best version of himself is irreplaceable.", author: "Unknown" },
  { text: "A strong man doesn't need to control a woman. He just needs to make her feel safe enough to be herself.", author: "Unknown" },
  { text: "I'm not perfect, but I'll always be real with you.", author: "Unknown" },
  { text: "She's not my other half. She makes me whole.", author: "Unknown" },
  { text: "Any man can be a father, but it takes someone special to be a partner worth choosing every day.", author: "Unknown" },

  // Timeless wisdom
  { text: "The best relationships are the ones you never saw coming.", author: "Unknown" },
  { text: "Love is not about how much you say 'I love you' but how much you prove it's true.", author: "Unknown" },
  { text: "A great relationship is about two things: finding out the similarities and respecting the differences.", author: "Unknown" },
  { text: "You don't need someone to complete you. You only need someone to accept you completely.", author: "Unknown" },
  { text: "The goal in marriage is not to think alike, but to think together.", author: "Robert C. Dodds" },
  { text: "A happy marriage is a long conversation which always seems too short.", author: "André Maurois" },
  { text: "Love doesn't make the world go round. Love is what makes the ride worthwhile.", author: "Franklin P. Jones" },
  { text: "The best time to love with your whole heart is always now, in this moment, because no breath is guaranteed.", author: "Fawn Weaver" },
  { text: "Fall in love with someone who makes you glad to be different.", author: "Sue Zhao" },
  { text: "A loving relationship is one in which the loved one is free to be himself — to laugh with me, but never at me.", author: "Leo Buscaglia" },
  { text: "We loved with a love that was more than love.", author: "Edgar Allan Poe" },
  { text: "Love is not something you find. Love is something that finds you.", author: "Loretta Young" },
  { text: "The best proof of love is trust.", author: "Joyce Brothers" },
  { text: "In love, one and one are one.", author: "Jean-Paul Sartre" },
  { text: "Love is the flower you've got to let grow.", author: "John Lennon" },
  { text: "Grow old with me! The best is yet to be.", author: "Robert Browning" },
  { text: "Love is the only force capable of transforming an enemy into a friend.", author: "Martin Luther King Jr." },
  { text: "There is no charm equal to tenderness of heart.", author: "Jane Austen" },
  { text: "To be fully seen by somebody, then, and be loved anyhow — this is a human offering that can border on miraculous.", author: "Elizabeth Gilbert" },
  { text: "The way to love anything is to realize that it may be lost.", author: "G.K. Chesterton" },
];

/** How long each quote is displayed before fading to the next (ms) */
export const QUOTE_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

/** Fade transition duration (ms) */
export const QUOTE_FADE_MS = 800;
