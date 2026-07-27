import "server-only";
/**
 * AlphaVerse — Centralized Memory Cache & Deduplication Store
 *
 * Implements high-performance in-memory caching with strict TTL expiration,
 * stale-while-revalidate capabilities, and promise-level request deduplication
 * to prevent duplicate concurrent network fetch storms under high load.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number; // hard expiration time (ms since epoch)
  staleAt: number; // soft stale time (ms since epoch)
}

export class MemoryCache {
  private store = new Map<string, CacheEntry<any>>();
  private inFlight = new Map<string, Promise<any>>();

  /**
   * Retrieves an item from the cache if available.
   * Returns `{ data, isStale, isExpired }`.
   */
  public get<T>(key: string): { data: T | null; isStale: boolean; isExpired: boolean } {
    const entry = this.store.get(key);
    if (!entry) {
      return { data: null, isStale: false, isExpired: true };
    }

    const now = Date.now();
    if (now >= entry.expiresAt) {
      this.store.delete(key);
      return { data: null, isStale: true, isExpired: true };
    }

    const isStale = now >= entry.staleAt;
    return { data: entry.data as T, isStale, isExpired: false };
  }

  /**
   * Stores data in the cache with specified TTL and optional stale-while-revalidate window.
   */
  public set<T>(key: string, data: T, ttlMs: number, swrMs = 0): void {
    const now = Date.now();
    this.store.set(key, {
      data,
      expiresAt: now + ttlMs + swrMs,
      staleAt: now + ttlMs,
    });
  }

  /**
   * Checks if a request for the given key is currently in-flight.
   */
  public getInFlight<T>(key: string): Promise<T> | undefined {
    return this.inFlight.get(key);
  }

  /**
   * Registers an in-flight promise for deduplication.
   */
  public setInFlight<T>(key: string, promise: Promise<T>): void {
    this.inFlight.set(key, promise);
  }

  /**
   * Removes an in-flight promise registration once completed or rejected.
   */
  public clearInFlight(key: string): void {
    this.inFlight.delete(key);
  }

  public delete(key: string): void {
    this.store.delete(key);
  }

  public clear(): void {
    this.store.clear();
    this.inFlight.clear();
  }

  public size(): number {
    return this.store.size;
  }
}

export const memoryCache = new MemoryCache();
