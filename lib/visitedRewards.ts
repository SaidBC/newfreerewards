"use client";

/**
 * Tracks which rewards a visitor has already visited in the current browser
 * session. The data is kept in `sessionStorage`, so it is automatically cleared
 * when the user closes the tab/window – matching the "per session" semantics
 * the rest of the UI relies on.
 */

const STORAGE_KEY = "nfr_visited_rewards";
const STORAGE_EVENT = "nfr_visited_rewards_changed";

function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export type VisitedRewardKey = string;

export function buildVisitedKey(game: string, slug: string): VisitedRewardKey {
  return `${game}::${slug}`;
}

export function getVisitedRewards(): Set<VisitedRewardKey> {
  const storage = safeStorage();
  if (!storage) return new Set();

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((value) => typeof value === "string"));
  } catch {
    return new Set();
  }
}

export function isVisited(game: string, slug: string): boolean {
  return getVisitedRewards().has(buildVisitedKey(game, slug));
}

export function markRewardVisited(game: string, slug: string): void {
  const storage = safeStorage();
  if (!storage) return;

  try {
    const set = getVisitedRewards();
    set.add(buildVisitedKey(game, slug));
    storage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
  } catch {
    // Ignore quota or serialization errors – the badge is a nice-to-have.
  }
}

export function subscribeToVisitedRewards(
  callback: (visited: Set<VisitedRewardKey>) => void,
): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = () => callback(getVisitedRewards());
  window.addEventListener(STORAGE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(STORAGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
