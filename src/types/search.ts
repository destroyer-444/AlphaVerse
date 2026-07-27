/**
 * UniversalSearch Types — AlphaVerse
 * Reusable search result types for every entity class on the platform.
 * Future-ready: Add new entity types here without changing any service logic.
 */

export type SearchEntityType =
  | "company"
  | "etf"
  | "index"
  | "crypto"
  | "currency"
  | "commodity"
  | "news"
  | "market_intelligence"
  | "economic_event"
  // Future extension points
  | "portfolio"
  | "watchlist"
  | "ai_chat"
  | "opportunity";

export type SearchRankTier =
  | "exact_ticker"
  | "exact_name"
  | "prefix"
  | "contains"
  | "related";

export interface UniversalSearchResult {
  /** Unique identifier within the result set */
  id: string;
  /** Entity classification */
  type: SearchEntityType;
  /** Primary display title */
  title: string;
  /** Ticker symbol (optional — not all entities have tickers) */
  ticker?: string;
  /** Short context line shown below the title */
  description: string;
  /** Navigation destination route */
  href: string;
  /** Live price string (e.g., "$206.84") — optional */
  livePrice?: string;
  /** Live change string (e.g., "+1.24%") — optional */
  liveChange?: string;
  /** isPositive flag for coloring change indicator */
  isPositive?: boolean;
  /** AlphaVerse market score (0–100) — optional */
  marketScore?: number;
  /** Ranking tier that determined this result's position */
  rankTier: SearchRankTier;
  /** Group label used for visual section grouping in the UI */
  group: string;
}

export interface UniversalSearchResponse {
  query: string;
  results: UniversalSearchResult[];
  totalCount: number;
  /** Milliseconds taken to produce the response */
  durationMs: number;
}
