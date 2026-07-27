import "server-only";
/**
 * AlphaVerse — Request Orchestration & Circuit Breaker Queue
 *
 * Provides enterprise-grade resilience for live API execution:
 * 1. Concurrency control & rate limiting protection
 * 2. Exponential backoff retry policies for transient network faults
 * 3. Circuit Breaker pattern (Closed -> Open -> Half-Open) to fail fast when external providers degrade
 * 4. Automatic fallback resolution
 */

import { apiMetrics } from "./apiMetrics";

type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

interface QueueOptions<T> {
  retries?: number; // default 2
  retryDelayMs?: number; // default 300ms
  fallback?: T | (() => T | Promise<T>);
  isFmp?: boolean;
}

export class RequestQueue {
  private state: CircuitState = "CLOSED";
  private consecutiveFailures = 0;
  private failureThreshold = 5; // Open circuit after 5 consecutive failures
  private resetTimeoutMs = 30000; // Try recovery after 30 seconds
  private lastStateChange = Date.now();
  private activeConcurrency = 0;
  private maxConcurrency = 25; // Protect against thread starvation

  /**
   * Executes a network operation with retry, circuit breaker, and concurrency protection.
   */
  public async execute<T>(fn: () => Promise<T>, options: QueueOptions<T> = {}): Promise<T> {
    const { retries = 2, retryDelayMs = 300, fallback, isFmp = false } = options;

    // 1. Check Circuit Breaker State
    this.evaluateCircuitState();
    if (this.state === "OPEN") {
      apiMetrics.recordError();
      if (fallback !== undefined) {
        return typeof fallback === "function" ? (fallback as any)() : fallback;
      }
      throw new Error("AlphaVerse Circuit Breaker is OPEN — external live provider temporarily degraded.");
    }

    // 2. Concurrency Protection
    if (this.activeConcurrency >= this.maxConcurrency) {
      await this.sleep(50);
    }

    this.activeConcurrency++;
    const startTime = Date.now();

    try {
      let attempt = 0;
      while (true) {
        try {
          const result = await fn();
          const latency = Date.now() - startTime;
          apiMetrics.recordLiveRequest(latency, isFmp);

          // Success resets circuit breaker failure counter
          this.recordSuccess();
          this.activeConcurrency--;
          return result;
        } catch (err) {
          attempt++;
          if (attempt > retries) {
            throw err;
          }
          apiMetrics.recordRetry();
          const delay = retryDelayMs * Math.pow(2, attempt - 1);
          await this.sleep(delay);
        }
      }
    } catch (finalError) {
      this.activeConcurrency--;
      apiMetrics.recordError();
      this.recordFailure();

      if (fallback !== undefined) {
        return typeof fallback === "function" ? (fallback as any)() : fallback;
      }
      throw finalError;
    }
  }

  private evaluateCircuitState(): void {
    const now = Date.now();
    if (this.state === "OPEN" && now - this.lastStateChange > this.resetTimeoutMs) {
      this.state = "HALF_OPEN";
      this.lastStateChange = now;
    }
  }

  private recordSuccess(): void {
    this.consecutiveFailures = 0;
    if (this.state === "HALF_OPEN") {
      this.state = "CLOSED";
      this.lastStateChange = Date.now();
    }
  }

  private recordFailure(): void {
    this.consecutiveFailures++;
    if (this.consecutiveFailures >= this.failureThreshold && this.state !== "OPEN") {
      this.state = "OPEN";
      this.lastStateChange = Date.now();
    } else if (this.state === "HALF_OPEN") {
      this.state = "OPEN";
      this.lastStateChange = Date.now();
    }
  }

  public getCircuitState(): { state: CircuitState; consecutiveFailures: number } {
    this.evaluateCircuitState();
    return { state: this.state, consecutiveFailures: this.consecutiveFailures };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const requestQueue = new RequestQueue();
