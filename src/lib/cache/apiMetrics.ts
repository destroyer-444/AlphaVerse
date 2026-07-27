import "server-only";
/**
 * AlphaVerse — API Telemetry & Metrics Store
 *
 * Centralized server-side telemetry store tracking real-time performance,
 * cache efficiency, FMP API consumption, retry attempts, and memory footprint.
 * Strictly decoupled from presentational UI components.
 */

export interface ApiMetricsSnapshot {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  liveRequests: number;
  fmpCalls: number;
  retryCount: number;
  errorCount: number;
  averageLatencyMs: number;
  cacheHitRate: number; // percentage e.g. 84.5
  cacheMissRate: number; // percentage
  errorRate: number; // percentage
  memoryUsageMb: number;
  lastUpdated: string;
}

class ApiMetricsStore {
  private totalRequests = 0;
  private cacheHits = 0;
  private cacheMisses = 0;
  private liveRequests = 0;
  private fmpCalls = 0;
  private retryCount = 0;
  private errorCount = 0;
  private totalLatencyMs = 0;
  private latencySamples = 0;

  public recordHit(): void {
    this.totalRequests++;
    this.cacheHits++;
  }

  public recordMiss(): void {
    this.totalRequests++;
    this.cacheMisses++;
  }

  public recordLiveRequest(latencyMs: number, isFmp = false): void {
    this.liveRequests++;
    if (isFmp) {
      this.fmpCalls++;
    }
    if (latencyMs > 0) {
      this.totalLatencyMs += latencyMs;
      this.latencySamples++;
    }
  }

  public recordRetry(): void {
    this.retryCount++;
  }

  public recordError(): void {
    this.errorCount++;
  }

  public getSnapshot(): ApiMetricsSnapshot {
    const hitRate = this.totalRequests > 0 ? (this.cacheHits / this.totalRequests) * 100 : 0;
    const missRate = this.totalRequests > 0 ? (this.cacheMisses / this.totalRequests) * 100 : 0;
    const errorRate = this.totalRequests > 0 ? (this.errorCount / this.totalRequests) * 100 : 0;
    const avgLatency = this.latencySamples > 0 ? this.totalLatencyMs / this.latencySamples : 0;

    let memoryUsageMb = 0;
    if (typeof process !== "undefined" && process.memoryUsage) {
      const mem = process.memoryUsage();
      memoryUsageMb = Math.round((mem.heapUsed / 1024 / 1024) * 100) / 100;
    }

    return {
      totalRequests: this.totalRequests,
      cacheHits: this.cacheHits,
      cacheMisses: this.cacheMisses,
      liveRequests: this.liveRequests,
      fmpCalls: this.fmpCalls,
      retryCount: this.retryCount,
      errorCount: this.errorCount,
      averageLatencyMs: Math.round(avgLatency * 10) / 10,
      cacheHitRate: Math.round(hitRate * 10) / 10,
      cacheMissRate: Math.round(missRate * 10) / 10,
      errorRate: Math.round(errorRate * 10) / 10,
      memoryUsageMb,
      lastUpdated: new Date().toISOString(),
    };
  }

  public reset(): void {
    this.totalRequests = 0;
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.liveRequests = 0;
    this.fmpCalls = 0;
    this.retryCount = 0;
    this.errorCount = 0;
    this.totalLatencyMs = 0;
    this.latencySamples = 0;
  }
}

export const apiMetrics = new ApiMetricsStore();
