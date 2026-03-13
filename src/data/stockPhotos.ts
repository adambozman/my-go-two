/**
 * Centralized local stock photo bank for connection + dashboard cards.
 * All images are bundled locally — no external URLs.
 * Relationship sets and dashboard scene rules are resolved from one place.
 */

import partner1 from "@/assets/stock/partner-1.jpg";
import partner2 from "@/assets/stock/partner-2.jpg";
import partner3 from "@/assets/stock/partner-3.jpg";
import partner4 from "@/assets/stock/partner-4.jpg";
import partner5 from "@/assets/stock/partner-5.jpg";
import partner6 from "@/assets/stock/partner-6.jpg";
import partner7 from "@/assets/stock/partner-7.jpg";

import mom1 from "@/assets/stock/mom-1.jpg";
import mom2 from "@/assets/stock/mom-2.jpg";
import mom3 from "@/assets/stock/mom-3.jpg";
import mom4 from "@/assets/stock/mom-4.jpg";
import mom5 from "@/assets/stock/mom-5.jpg";
import mom6 from "@/assets/stock/mom-6.jpg";

import dad1 from "@/assets/stock/dad-1.jpg";
import dad2 from "@/assets/stock/dad-2.jpg";
import dad3 from "@/assets/stock/dad-3.jpg";
import dad4 from "@/assets/stock/dad-4.jpg";
import dad5 from "@/assets/stock/dad-5.jpg";
import dad6 from "@/assets/stock/dad-6.jpg";
import dad7 from "@/assets/stock/dad-7.jpg";

import sister1 from "@/assets/stock/sister-1.jpg";
import sister2 from "@/assets/stock/sister-2.jpg";
import sister3 from "@/assets/stock/sister-3.jpg";
import sister4 from "@/assets/stock/sister-4.jpg";
import sister5 from "@/assets/stock/sister-5.jpg";
import sister6 from "@/assets/stock/sister-6.jpg";

import brother1 from "@/assets/stock/brother-1.jpg";
import brother2 from "@/assets/stock/brother-2.jpg";
import brother3 from "@/assets/stock/brother-3.jpg";
import brother4 from "@/assets/stock/brother-4.jpg";
import brother5 from "@/assets/stock/brother-5.jpg";
import brother6 from "@/assets/stock/brother-6.jpg";

import friend1 from "@/assets/stock/friend-1.jpg";
import friend2 from "@/assets/stock/friend-2.jpg";
import friend3 from "@/assets/stock/friend-3.jpg";
import friend4 from "@/assets/stock/friend-4.jpg";
import friend5 from "@/assets/stock/friend-5.jpg";

import coworker1 from "@/assets/stock/coworker-1.jpg";
import coworker2 from "@/assets/stock/coworker-2.jpg";
import coworker3 from "@/assets/stock/coworker-3.jpg";
import coworker4 from "@/assets/stock/coworker-4.jpg";

import { getTemplateImage } from "@/data/templateImageResolver";
import { normalizeGender } from "@/lib/gender";
import { isBlocked } from "@/data/imageBlocklist";

export const STOCK_PHOTOS: Record<string, { id: string; url: string }[]> = {
  partner: [
    { id: "p1", url: partner1 },
    { id: "p2", url: partner2 },
    { id: "p3", url: partner3 },
    { id: "p4", url: partner4 },
    { id: "p5", url: partner5 },
    { id: "p6", url: partner6 },
    { id: "p7", url: partner7 },
  ],
  mom: [
    { id: "m1", url: mom1 },
    { id: "m2", url: mom2 },
    { id: "m3", url: mom3 },
    { id: "m4", url: mom4 },
    { id: "m5", url: mom5 },
    { id: "m6", url: mom6 },
  ],
  dad: [
    { id: "d1", url: dad1 },
    { id: "d2", url: dad2 },
    { id: "d3", url: dad3 },
    { id: "d4", url: dad4 },
    { id: "d5", url: dad5 },
    { id: "d6", url: dad6 },
    { id: "d7", url: dad7 },
  ],
  sister: [
    { id: "s1", url: sister1 },
    { id: "s2", url: sister2 },
    { id: "s3", url: sister3 },
    { id: "s4", url: sister4 },
    { id: "s5", url: sister5 },
    { id: "s6", url: sister6 },
  ],
  brother: [
    { id: "b1", url: brother1 },
    { id: "b2", url: brother2 },
    { id: "b3", url: brother3 },
    { id: "b4", url: brother4 },
    { id: "b5", url: brother5 },
    { id: "b6", url: brother6 },
  ],
  friend: [
    { id: "f1", url: friend1 },
    { id: "f2", url: friend2 },
    { id: "f3", url: friend3 },
    { id: "f4", url: friend4 },
    { id: "f5", url: friend5 },
  ],
  coworker: [
    { id: "c1", url: coworker1 },
    { id: "c2", url: coworker2 },
    { id: "c3", url: coworker3 },
    { id: "c4", url: coworker4 },
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

const normalizeLabel = (value: string) => value.toLowerCase().trim();

/** Get the stock photo set for a given display label */
export function getPhotosForLabel(label: string): { id: string; url: string }[] {
  const lower = normalizeLabel(label);
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

/**
 * Assign a unique photo to each card in a list so no two cards
 * in the same carousel share the same image.
 * Cards that already have a user-set photo keep it; only cards
 * using fallback/stock photos get de-duplicated.
 */
export function assignUniquePhotos<T extends { image: string; name: string }>(
  cards: T[],
  isUserPhoto?: (card: T) => boolean
): T[] {
  const used = new Set<string>();

  // First pass: lock in user-uploaded photos
  for (const card of cards) {
    if (isUserPhoto?.(card)) {
      used.add(card.image);
    }
  }

  // Second pass: assign unique stock photos
  return cards.map((card) => {
    if (isUserPhoto?.(card)) return card;

    const photos = getPhotosForLabel(card.name);
    const available = photos.find((p) => !used.has(p.url));
    const chosen = available?.url || photos[0]?.url || partner1;
    used.add(chosen);
    return { ...card, image: chosen };
  });
}

export interface DashboardStockCard {
  id: string;
  name: string;
  image: string;
}

export interface DashboardStockSection {
  id: string;
  label: string;
  cards: DashboardStockCard[];
}

/**
 * Maps every dashboard card name to a template resolver key.
 * This keeps all dashboard cards under one single gender-aware image policy.
 */
const DASHBOARD_CARD_TO_TEMPLATE: Record<string, string> = {
  birthdays: "Birthday Preferences",
  anniversaries: "Anniversary Gifts",
  holidays: "Events",
  "date nights": "Date Ideas",
  "new lists": "Wish List Items",
  "updated cards": "Brand Preferences",
  "shared items": "Specific Product Versions",
  "valentine's day": "Flowers",
  christmas: "Events",
  "mother's day": "Flowers",
  "father's day": "Brand Preferences",
  "just because": "Wish List Items",
  "first date": "Date Ideas",
  "trips together": "Travel Preferences",
  milestones: "Anniversary Gifts",
  "favorite moments": "Love Language",
};


/**
 * Global dashboard image resolver.
 * Every card uses one centralized template resolver path.
 */
export function getDashboardCardImage(cardName: string, gender: string): string {
  const key = normalizeLabel(cardName);
  const g = normalizeGender(gender);
  const templateName = DASHBOARD_CARD_TO_TEMPLATE[key] || "Specific Product Versions";
  return getTemplateImage(templateName, g);
}

/** Build dashboard sections from centralized global image rules */
export function buildDashboardOtherCategories(gender: string): DashboardStockSection[] {
  return [
    {
      id: "calendar",
      label: "Shared Calendar",
      cards: [
        { id: "cal-1", name: "Birthdays", image: getDashboardCardImage("Birthdays", gender) },
        { id: "cal-2", name: "Anniversaries", image: getDashboardCardImage("Anniversaries", gender) },
        { id: "cal-3", name: "Holidays", image: getDashboardCardImage("Holidays", gender) },
        { id: "cal-4", name: "Date Nights", image: getDashboardCardImage("Date Nights", gender) },
      ],
    },
    {
      id: "activity",
      label: "Recent Activity",
      cards: [
        { id: "act-1", name: "New Lists", image: getDashboardCardImage("New Lists", gender) },
        { id: "act-2", name: "Updated Cards", image: getDashboardCardImage("Updated Cards", gender) },
        { id: "act-3", name: "Shared Items", image: getDashboardCardImage("Shared Items", gender) },
      ],
    },
    {
      id: "occasions",
      label: "Occasions",
      cards: [
        { id: "occ-1", name: "Valentine's Day", image: getDashboardCardImage("Valentine's Day", gender) },
        { id: "occ-2", name: "Christmas", image: getDashboardCardImage("Christmas", gender) },
        { id: "occ-3", name: "Mother's Day", image: getDashboardCardImage("Mother's Day", gender) },
        { id: "occ-4", name: "Father's Day", image: getDashboardCardImage("Father's Day", gender) },
        { id: "occ-5", name: "Just Because", image: getDashboardCardImage("Just Because", gender) },
      ],
    },
    {
      id: "memories",
      label: "Memories",
      cards: [
        { id: "mem-1", name: "First Date", image: getDashboardCardImage("First Date", gender) },
        { id: "mem-2", name: "Trips Together", image: getDashboardCardImage("Trips Together", gender) },
        { id: "mem-3", name: "Milestones", image: getDashboardCardImage("Milestones", gender) },
        { id: "mem-4", name: "Favorite Moments", image: getDashboardCardImage("Favorite Moments", gender) },
      ],
    },
  ];
}
