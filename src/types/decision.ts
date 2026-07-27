/**
 * AlphaVerse — AI Decision Engine Types
 * Highest-level intelligence layer for deterministic investment decisions.
 * All business logic remains in the service layer.
 */

export type DecisionRating =
  | "Strong Buy"
  | "Buy"
  | "Accumulate"
  | "Watch"
  | "Neutral"
  | "Reduce"
  | "Avoid";

export interface DecisionScoreBreakdown {
  companyIntelligence: number;
  market: number;
  macro: number;
  news: number;
  momentum: number;
  valuation: number;
  risk: number;
}

export interface DecisionConfidence {
  value: number; // 0-100
  level: "High" | "Moderate" | "Cautious";
  explanation: string;
}

export interface DecisionSignal {
  label: string;
  status: "Positive" | "Neutral" | "Negative";
  value: string | number;
  description: string;
}

export interface DecisionRisk {
  title: string;
  impact: "High" | "Medium" | "Low" | "Neutral";
  description: string;
}

export interface DecisionCatalyst {
  title: string;
  timeframe: string;
  impact: "High" | "Medium" | "Low" | "Neutral";
  description: string;
}

export interface DecisionAction {
  rating: DecisionRating;
  targetPrice?: string;
  actionSummary: string;
}

export interface DecisionScenario {
  type: "Bull Case" | "Base Case" | "Bear Case";
  title: string;
  probability: string;
  expectedReturn: string;
  description: string;
  keyConditions: string[];
}

export interface DecisionTimeline {
  nextWeek: string;
  nextMonth: string;
  nextQuarter: string;
  nextYear: string;
}

export interface ExpectedDrivers {
  macro: string[];
  sector: string[];
  company: string[];
}

export interface DecisionSummary {
  symbol: string;
  companyName: string;
  rating: DecisionRating;
  score: number; // 0-100 composite
  confidence: DecisionConfidence;
  generatedAt: string;
}

export interface DecisionEngineReport {
  symbol: string;
  companyName: string;
  generatedAt: string;
  rating: DecisionRating;
  decisionScore: number; // 0-100
  scoreBreakdown: DecisionScoreBreakdown;
  confidence: DecisionConfidence;
  investmentThesis: string[]; // Max 4 paragraphs
  whyNow: string[]; // Top 5 reasons
  whyNot: DecisionRisk[]; // Top risks
  keyCatalysts: DecisionCatalyst[];
  invalidationConditions: string[];
  timeline: DecisionTimeline;
  expectedDrivers: ExpectedDrivers;
  scenarios: DecisionScenario[];
  signals: DecisionSignal[];
}
