/**
 * AlphaVerse — Macro Intelligence Types
 * Type layer for the Macro Intelligence Graph Engine.
 * All business logic remains in the service layer.
 */

export type CorrelationStrength = "Strong" | "Moderate" | "Weak";
export type ImpactLevel = "High" | "Medium" | "Low";

export type MacroNodeType = 
  | "index"
  | "commodity"
  | "currency"
  | "rate"
  | "sector"
  | "theme"
  | "crypto";

export type MacroEdgeType =
  | "Positive Correlation"
  | "Negative Correlation"
  | "Supply Chain"
  | "Interest Rate Sensitive"
  | "Commodity Sensitive"
  | "Currency Sensitive"
  | "Demand Driver";

export type MarketRegime = 
  | "Risk-On"
  | "Risk-Off"
  | "Transitional"
  | "Inflationary"
  | "Deflationary";

export interface MacroNode {
  id: string;
  label: string;
  symbol?: string;
  type: MacroNodeType;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  description: string;
  x: number; // 0-1000 relative coordinate for SVG layout
  y: number; // 0-600 relative coordinate for SVG layout
  importance: number; // 1-10 for sizing
}

export interface MacroEdge {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  type: MacroEdgeType;
  strength: CorrelationStrength;
  value: number; // -1.0 to +1.0 numeric correlation or influence
  explanation: string;
}

export interface MacroTheme {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Emerging" | "Fading";
  impact: ImpactLevel;
  relatedNodes: string[]; // Node IDs
}

export interface MacroSignal {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  impact: ImpactLevel;
  type: "positive" | "negative" | "neutral";
}

export interface MacroScenario {
  type: "Bull Case" | "Base Case" | "Bear Case";
  title: string;
  probability: string;
  description: string;
  keyDrivers: string[];
  assetsFavoring: string[];
  assetsAtRisk: string[];
}

export interface CrossAssetRelationship {
  source: string;
  target: string;
  correlation: number;
  strength: CorrelationStrength;
  relationship: string;
}

export interface MacroWatchlist {
  watchToday: string[];
  watchThisWeek: string[];
  watchThisMonth: string[];
}

export interface MacroDashboardData {
  generatedAt: string;
  overallScore: number; // 0-100
  marketRegime: MarketRegime;
  confidence: number; // 0-100
  macroStory: string;
  nodes: MacroNode[];
  edges: MacroEdge[];
  topPositiveDrivers: string[];
  topNegativeDrivers: string[];
  watchlist: MacroWatchlist;
  scenarios: MacroScenario[];
  themes: MacroTheme[];
  crossAssetGrid: CrossAssetRelationship[];
}
