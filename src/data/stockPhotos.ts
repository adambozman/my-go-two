/**
 * Centralized local stock photo bank for connection cards.
 * All images are bundled locally — no external URLs.
 */

import partner1 from "@/assets/stock/partner-1.jpg";
import partner2 from "@/assets/stock/partner-2.jpg";
import partner3 from "@/assets/stock/partner-3.jpg";
import partner5 from "@/assets/stock/partner-5.jpg";
import partner6 from "@/assets/stock/partner-6.jpg";

import mom1 from "@/assets/stock/mom-1.jpg";
import mom2 from "@/assets/stock/mom-2.jpg";
import mom5 from "@/assets/stock/mom-5.jpg";
import mom6 from "@/assets/stock/mom-6.jpg";

import dad1 from "@/assets/stock/dad-1.jpg";
import dad2 from "@/assets/stock/dad-2.jpg";
import dad4 from "@/assets/stock/dad-4.jpg";
import dad5 from "@/assets/stock/dad-5.jpg";
import dad6 from "@/assets/stock/dad-6.jpg";

import sister1 from "@/assets/stock/sister-1.jpg";
import sister5 from "@/assets/stock/sister-5.jpg";
import sister6 from "@/assets/stock/sister-6.jpg";

import brother1 from "@/assets/stock/brother-1.jpg";
import brother5 from "@/assets/stock/brother-5.jpg";
import brother6 from "@/assets/stock/brother-6.jpg";

import friend1 from "@/assets/stock/friend-1.jpg";
import friend2 from "@/assets/stock/friend-2.jpg";

import coworker1 from "@/assets/stock/coworker-1.jpg";

export const STOCK_PHOTOS: Record<string, { id: string; url: string }[]> = {
  partner: [
    { id: "p1", url: partner1 },
    { id: "p2", url: partner2 },
    { id: "p3", url: partner3 },
    { id: "p5", url: partner5 },
    { id: "p6", url: partner6 },
    { id: "p4", url: brother1 }, // male portrait reuse
  ],
  mom: [
    { id: "m1", url: mom1 },
    { id: "m2", url: mom2 },
    { id: "m5", url: mom5 },
    { id: "m6", url: mom6 },
    { id: "m3", url: coworker1 }, // female portrait reuse
    { id: "m4", url: partner2 },
  ],
  dad: [
    { id: "d1", url: dad1 },
    { id: "d2", url: dad2 },
    { id: "d4", url: dad4 },
    { id: "d5", url: dad5 },
    { id: "d6", url: dad6 },
    { id: "d3", url: partner3 },
  ],
  sister: [
    { id: "s1", url: sister1 },
    { id: "s5", url: sister5 },
    { id: "s6", url: sister6 },
    { id: "s2", url: partner5 },
    { id: "s3", url: partner2 },
    { id: "s4", url: mom6 },
  ],
  brother: [
    { id: "b1", url: brother1 },
    { id: "b5", url: brother5 },
    { id: "b6", url: brother6 },
    { id: "b3", url: dad4 },
    { id: "b4", url: dad5 },
    { id: "b2", url: partner6 },
  ],
  friend: [
    { id: "f1", url: friend1 },
    { id: "f2", url: friend2 },
    { id: "f3", url: partner2 },
    { id: "f4", url: brother1 },
    { id: "f5", url: sister1 },
    { id: "f6", url: partner3 },
  ],
  coworker: [
    { id: "c1", url: coworker1 },
    { id: "c2", url: dad1 },
    { id: "c3", url: partner3 },
    { id: "c4", url: partner2 },
    { id: "c5", url: dad2 },
    { id: "c6", url: mom6 },
  ],
};

export const LABEL_TO_PHOTO_KEY: Record<string, string> = {
  partner: "partner", husband: "partner", wife: "partner",
  boyfriend: "partner", girlfriend: "partner", babe: "partner", bae: "partner",
  "significant other": "partner",
  mom: "mom", mother: "mom", mama: "mom", mommy: "mom",
  dad: "dad", father: "dad", papa: "dad", daddy: "dad",
  sister: "sister", sis: "sister",
  brother: "brother", bro: "brother",
  sibling: "friend",
  "best friend": "friend", friend: "friend", bestie: "friend", bff: "friend",
  "co-worker": "coworker", coworker: "coworker", colleague: "coworker", boss: "coworker",
};

/** Get the stock photo set for a given display label */
export function getPhotosForLabel(label: string): { id: string; url: string }[] {
  const lower = label.toLowerCase().trim();
  const key = LABEL_TO_PHOTO_KEY[lower];
  if (key && STOCK_PHOTOS[key]) return STOCK_PHOTOS[key];
  for (const [keyword, setKey] of Object.entries(LABEL_TO_PHOTO_KEY)) {
    if (lower.includes(keyword)) return STOCK_PHOTOS[setKey];
  }
  return STOCK_PHOTOS.partner;
}

/** Get the default (first) stock photo for a label */
export function getDefaultPhotoForLabel(label: string): string {
  return getPhotosForLabel(label)[0]?.url || partner1;
}
