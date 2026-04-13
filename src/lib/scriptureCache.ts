/**
 * LocalStorage-backed fallback cache for scripture fetches.
 *
 * React Query handles in-memory caching and retries, but the moment the tab
 * is reloaded its cache is gone. This cache lets users keep reading whatever
 * they've previously fetched even if bible-api.com is unreachable.
 */

const CACHE_PREFIX = "scripture-cache:";

export interface CachedScripture<T> {
  data: T;
  fetchedAt: number;
}

export function scriptureCacheKey(reference: string, translation: string): string {
  return `${reference}|${translation}`;
}

export function readCachedScripture<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedScripture<T>;
    if (parsed && typeof parsed === "object" && "data" in parsed) {
      return parsed.data;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeCachedScripture<T>(key: string, data: T): void {
  try {
    const payload: CachedScripture<T> = { data, fetchedAt: Date.now() };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
  } catch {
    // QuotaExceededError / SecurityError (private mode) / etc. — we simply
    // lose the offline cache for this entry, which is acceptable.
  }
}

export function clearScriptureCache(): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(CACHE_PREFIX)) keysToRemove.push(k);
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}
