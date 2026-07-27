/**
 * AlphaVerse — Opportunity Types
 * Type layer for the Opportunity Radar Engine.
 * All business logic remains in the service layer.
 */

/** Category tags that can be assigned to any opportunity */
export type OpportunityCategory =
  | "High Growth"
  | "Undervalued"
  | "Momentum Leader"
  | "AI Leader"
  | "Semiconductor"
  | "Cloud"
  | "Cybersecurity"
  | "Dividend"
  | "Recovery"
  | "Strong Earnings"
  | "Low Risk"
  | "High Cash Flow"
  | "Emerging Trend"
  | "Consumer Tech"
  | "EV Leader"
  | "Global Blue Chip"
  | "Aerospace"
  | "Industrials";

/** Risk classification derived from volatility, valuation, debt, and profit consistency */
export type OpportunityRisk = "Low" | "Medium" | "High";

/** One scored dimension of an opportunity */
export interface OpportunityScoreItem {
  label: string;
  value: number;        // 0–100
  weight: number;       // fractional weight used in composite
}

/** The weighted composite score breakdown for an opportunity */
export interface OpportunityScore {
  composite: number;    // 0–100 weighted total
  growth: number;
  momentum: number;
  financialHealth: number;
  valuation: number;
  news: number;
  risk: number;
  items: OpportunityScoreItem[];
}

/** A single reason line supporting this opportunity */
export interface OpportunityReason {
  text: string;
  category: "Growth" | "Momentum" | "Financial" | "Valuation" | "News" | "Macro";
}

/** A complete scored, categorized market opportunity */
export interface Opportunity {
  symbol: string;
  companyName: string;
  sector: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  marketCap: string;

  score: OpportunityScore;
  confidence: number;           // 0–100
  risk: OpportunityRisk;

  categories: OpportunityCategory[];
  primaryCategory: OpportunityCategory;

  explanation: string;          // data-driven prose, never invented
  reasons: OpportunityReason[];
  latestCatalyst: string;       // one-line catalyst statement

  href: string;                 // /companies/SYMBOL
}

/** A named section of the radar showing a filtered/sorted list */
export interface RadarSection {
  id: string;
  label: string;
  description: string;
  icon: string;
  opportunities: Opportunity[];
}

/** Top-level result returned by OpportunityRadarService */
export interface RadarResult {
  generatedAt: string;          // ISO timestamp
  totalScanned: number;
  topOpportunity: Opportunity | null;
  sections: RadarSection[];
}
