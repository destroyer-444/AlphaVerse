/**
 * AlphaVerse — Portfolio Intelligence Platform Types
 *
 * Server-first domain interfaces modeling multi-asset portfolio evaluation,
 * real-time risk synthesis, sector diversification, and AI decision consensus.
 * All calculations reside in the service layer; UI remains strictly presentational.
 */

import { DecisionRating, DecisionRisk, DecisionCatalyst } from "./decision";

export interface SectorExposure {
  sector: string;
  weight: number; // percentage e.g. 35.5
  value: number; // dollar amount
  color: string;
}

export interface CountryExposure {
  country: string;
  weight: number;
  value: number; // dollar amount
}

export interface PortfolioAllocation {
  sectors: SectorExposure[];
  countries: CountryExposure[];
  industries: { name: string; weight: number; value: number }[];
  marketCaps: { label: string; weight: number; value: number }[];
  assetClasses: { label: string; weight: number; value: number }[];
}

export interface HoldingMetrics {
  growthScore: number;
  riskScore: number;
  valuationScore: number;
  momentumScore: number;
  aiExposure: number;
}

export interface PortfolioHolding {
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  costBasis: number;
  totalValue: number;
  weight: number; // percentage of portfolio
  dailyChange: number; // dollar change today
  dailyChangePercent: number;
  totalReturn: number; // dollar return
  totalReturnPercent: number;
  decisionRating: DecisionRating;
  riskScore: number; // 0-100
  opportunityScore: number; // 0-100
  confidenceScore: number; // 0-100
  latestCatalyst?: {
    title: string;
    date: string;
    impact: string;
  };
  sector: string;
  industry: string;
  country: string;
  assetClass: "US Equities" | "Crypto" | "Commodities" | "Global Equities";
  metrics: HoldingMetrics;
}

export interface PortfolioScoreBreakdown {
  growth: number; // / 20
  risk: number; // / 20
  diversification: number; // / 15
  decisionRatings: number; // / 15
  macroAlignment: number; // / 10
  marketAlignment: number; // / 10
  news: number; // / 5
  momentum: number; // / 5
}

export interface PortfolioScore {
  overall: number; // 0-100
  breakdown: PortfolioScoreBreakdown;
  explanation: string;
}

export interface PortfolioRiskItem {
  id: string;
  title: string;
  why: string;
  impact: string;
  severity: "High" | "Medium" | "Low";
  probability: "High" | "Moderate" | "Low";
  suggestedAction: string;
  relatedSymbols: string[];
}

export interface PortfolioOpportunityItem {
  id: string;
  title: string;
  category: "Best Opportunity" | "Highest Conviction" | "Undervalued" | "Momentum" | "AI Leader" | "Recovery Candidate";
  symbol: string;
  companyName: string;
  rating: DecisionRating;
  upsideTarget: string;
  reason: string;
}

export interface DiversificationHealth {
  score: number; // 0-100
  concentrationRisk: "Low" | "Moderate" | "High" | "Severe";
  topHoldingWeight: number; // percentage
  top3HoldingsWeight: number; // percentage
  sectorBalance: "Balanced" | "Tech-Heavy" | "Defensive" | "Concentrated";
  macroAlignment: "Strong" | "Moderate" | "Weak";
  aiExposure: number; // percentage of portfolio tied to AI
  techExposure: number; // percentage
  growthExposure: number; // percentage
  dividendExposure: number; // percentage
  expectedVolatility: "Low" | "Moderate" | "Elevated" | "High";
  liquidityScore: number; // 0-100
}

export interface DecisionSummaryCounts {
  strongBuy: number;
  buy: number;
  accumulate: number;
  watch: number;
  neutral: number;
  reduce: number;
  avoid: number;
  total: number;
}

export interface PortfolioTimelineGroup {
  timeframe: "Today" | "This Week" | "This Month" | "Next Quarter";
  items: {
    symbol: string;
    companyName: string;
    title: string;
    date: string;
    impact: string;
  }[];
}

export interface PortfolioSummary {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  score: PortfolioScore;
  confidence: {
    value: number; // 0-100
    level: "High" | "Moderate" | "Cautious";
    explanation: string;
  };
  overallRating: "Strong Bullish" | "Bullish" | "Balanced" | "Cautious" | "Bearish";
  marketRegime: string;
  generatedAt: string;
}

export interface Portfolio {
  id: string;
  name: string;
  summary: PortfolioSummary;
  holdings: PortfolioHolding[];
  allocation: PortfolioAllocation;
  health: DiversificationHealth;
  risks: PortfolioRiskItem[];
  opportunities: PortfolioOpportunityItem[];
  personalizedInsights: string[]; // Top 5 Things To Do
  decisionSummary: DecisionSummaryCounts;
  timeline: PortfolioTimelineGroup[];
}
