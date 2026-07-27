import "server-only";
/**
 * AlphaVerse — Centralized Live Data Orchestrator
 *
 * Serves as the high-performance middleware layer between domain intelligence engines
 * and external providers (Financial Modeling Prep). Features:
 * 1. Request deduplication (promise sharing across concurrent requests for same key)
 * 2. TTL memory caching with stale-while-revalidate background refresh
 * 3. Circuit breaker & retry protection via RequestQueue
 * 4. Automatic telemetry metrics collection for development debugging
 */

import { memoryCache } from "@/lib/cache/memoryCache";
import { requestQueue } from "@/lib/cache/requestQueue";
import { apiMetrics, ApiMetricsSnapshot } from "@/lib/cache/apiMetrics";

interface OrchestratorOptions<T> {
  isFmp?: boolean;
  retries?: number;
  fallback?: T | (() => T | Promise<T>);
  swrMs?: number; // Stale-while-revalidate window (default 60000ms)
}

export class DataOrchestrator {
  /**
   * Orchestrates an API fetch with full caching, deduplication, retry, and circuit breaker protection.
   */
  public async fetchWithCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs: number,
    options: OrchestratorOptions<T> = {}
  ): Promise<T> {
    const { isFmp = false, retries = 2, fallback, swrMs = 60000 } = options;

    // 1. Check memory cache
    const cached = memoryCache.get<T>(key);
    if (cached.data !== null && !cached.isExpired) {
      apiMetrics.recordHit();

      // If stale, trigger background refresh non-blocking
      if (cached.isStale) {
        this.triggerBackgroundRefresh(key, fetcher, ttlMs, swrMs, isFmp, retries);
      }

      return cached.data;
    }

    // 2. Cache miss — check for in-flight request deduplication
    const inFlight = memoryCache.getInFlight<T>(key);
    if (inFlight) {
      apiMetrics.recordHit(); // Deduplicated request shares the fetch
      return inFlight;
    }

    // 3. Execute live request through Circuit Breaker Queue
    apiMetrics.recordMiss();
    const executePromise = requestQueue
      .execute(fetcher, { retries, fallback, isFmp })
      .then((data) => {
        if (data !== undefined && data !== null) {
          memoryCache.set(key, data, ttlMs, swrMs);
        }
        return data;
      })
      .finally(() => {
        memoryCache.clearInFlight(key);
      });

    memoryCache.setInFlight(key, executePromise);
    return executePromise;
  }

  private triggerBackgroundRefresh<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs: number,
    swrMs: number,
    isFmp: boolean,
    retries: number
  ): void {
    if (memoryCache.getInFlight(key)) return;

    const bgPromise = requestQueue
      .execute(fetcher, { retries, isFmp })
      .then((data) => {
        if (data !== undefined && data !== null) {
          memoryCache.set(key, data, ttlMs, swrMs);
        }
        return data;
      })
      .catch(() => {
        // Silently ignore background refresh errors; stale cache remains valid until hard expiry
      })
      .finally(() => {
        memoryCache.clearInFlight(key);
      });

    memoryCache.setInFlight(key, bgPromise);
  }

  public invalidate(key: string): void {
    memoryCache.delete(key);
  }

  public clearAll(): void {
    memoryCache.clear();
    apiMetrics.reset();
  }

  public getMetricsSnapshot(): ApiMetricsSnapshot {
    return apiMetrics.getSnapshot();
  }

  public getCircuitState() {
    return requestQueue.getCircuitState();
  }
}

export const dataOrchestrator = new DataOrchestrator();
