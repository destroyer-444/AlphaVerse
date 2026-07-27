import "server-only";
/**
 * AlphaVerse — Centralized Cache TTL Policy & Revalidation Constants
 *
 * Defines standardized time-to-live (TTL) expiration schedules across all domain modules
 * to optimize live FMP API usage and guarantee sub-100ms response latencies.
 */

export const CACHE_TTL = {
  QUOTE: 30 * 1000, // 30 sec
  PROFILE: 24 * 60 * 60 * 1000, // 24 hours
  RATIOS: 6 * 60 * 60 * 1000, // 6 hours
  NEWS: 10 * 60 * 1000, // 10 min
  MACRO: 5 * 60 * 1000, // 5 min
  MARKET: 60 * 1000, // 60 sec
  OPPORTUNITY: 60 * 1000, // 60 sec
  DECISION: 60 * 1000, // 60 sec
  PORTFOLIO: 60 * 1000, // 60 sec
  ALERTS: 30 * 1000, // 30 sec
} as const;

export type CachePolicyType = keyof typeof CACHE_TTL;

/**
 * Returns the TTL in seconds (for Next.js `revalidate` exports).
 */
export function getRevalidateSeconds(policy: CachePolicyType): number {
  return Math.round(CACHE_TTL[policy] / 1000);
}
