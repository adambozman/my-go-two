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

export const PUBLIC_FEED_ITEMS: PublicFeedItem[] = [];

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
