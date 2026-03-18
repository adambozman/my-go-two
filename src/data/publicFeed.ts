export type PublicFeedCategory = "Outfit" | "Bundle" | "Popular Near You";

export interface PublicFeedItem {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorTag: string;
  title: string;
  summary: string;
  category: PublicFeedCategory;
  location: string;
  coverImage: string;
  parts: string[];
  likes: number;
  loves: number;
}

export interface PublicFeedViewItem extends PublicFeedItem {
  isLiked: boolean;
  isLoved: boolean;
  isFollowing: boolean;
}

interface PublicFeedState {
  likedIds: string[];
  lovedIds: string[];
  followedCreatorIds: string[];
}

const STORAGE_KEY = "gotwo-public-feed-state";

export const PUBLIC_FEED_ITEMS: PublicFeedItem[] = [
  {
    id: "public-look-1",
    creatorId: "creator-evie",
    creatorName: "Evie Lane",
    creatorTag: "@softtailored",
    title: "Soft City Layers",
    summary: "Relaxed camel trench, cream knit, straight denim, and low-profile sneakers.",
    category: "Outfit",
    location: "Popular in Dallas",
    coverImage: "/lovable-uploads/3fd53357-cb5d-4917-b388-1a3f2f1638a8.png",
    parts: ["Top", "Bottom", "Footwear", "Accessories"],
    likes: 284,
    loves: 76,
  },
  {
    id: "public-look-2",
    creatorId: "creator-mara",
    creatorName: "Mara Sol",
    creatorTag: "@maraafterdark",
    title: "Dinner Outfit Formula",
    summary: "A polished night-out combination people keep saving for date nights and events.",
    category: "Bundle",
    location: "Trending near you",
    coverImage: "/lovable-uploads/89e4d813-508b-4168-8f25-bbfe2d1f8084.png",
    parts: ["Top", "Bottom", "Footwear"],
    likes: 198,
    loves: 54,
  },
  {
    id: "public-look-3",
    creatorId: "creator-joel",
    creatorName: "Joel Mercer",
    creatorTag: "@joelbuildslooks",
    title: "Everyday Go-To Uniform",
    summary: "Neutral top, athletic taper, clean trainers, and one understated accessory.",
    category: "Popular Near You",
    location: "Popular in your location",
    coverImage: "/lovable-uploads/10449c4d-9e5b-44f4-af03-9f131e3dbce3.png",
    parts: ["Top", "Bottom", "Footwear", "Accessory"],
    likes: 341,
    loves: 102,
  },
];

function readState(): PublicFeedState {
  if (typeof window === "undefined") {
    return { likedIds: [], lovedIds: [], followedCreatorIds: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { likedIds: [], lovedIds: [], followedCreatorIds: [] };
    const parsed = JSON.parse(raw) as Partial<PublicFeedState>;
    return {
      likedIds: parsed.likedIds ?? [],
      lovedIds: parsed.lovedIds ?? [],
      followedCreatorIds: parsed.followedCreatorIds ?? [],
    };
  } catch {
    return { likedIds: [], lovedIds: [], followedCreatorIds: [] };
  }
}

function writeState(next: PublicFeedState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getPublicFeedViewItems(): PublicFeedViewItem[] {
  const state = readState();

  return PUBLIC_FEED_ITEMS.map((item) => ({
    ...item,
    isLiked: state.likedIds.includes(item.id),
    isLoved: state.lovedIds.includes(item.id),
    isFollowing: state.followedCreatorIds.includes(item.creatorId),
    likes: item.likes + (state.likedIds.includes(item.id) ? 1 : 0),
    loves: item.loves + (state.lovedIds.includes(item.id) ? 1 : 0),
  }));
}

export function togglePublicFeedReaction(itemId: string, reaction: "like" | "love") {
  const state = readState();
  const key = reaction === "like" ? "likedIds" : "lovedIds";
  const current = state[key];
  const nextValues = current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId];
  writeState({ ...state, [key]: nextValues });
}

export function togglePublicFeedFollow(creatorId: string) {
  const state = readState();
  const nextValues = state.followedCreatorIds.includes(creatorId)
    ? state.followedCreatorIds.filter((id) => id !== creatorId)
    : [...state.followedCreatorIds, creatorId];

  writeState({ ...state, followedCreatorIds: nextValues });
}
