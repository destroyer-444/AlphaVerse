export interface Company {
  symbol: string;
  name: string;
  exchange: string;
  country: string;
  sector: string;
  industry: string;
  marketCap: string;
  price: string;
  change: string;
  changePercent: string;
  description: string;
  website: string;
  ceo: string;
  employees: string;
  headquarters: string;
}

export interface CompanyMetric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface CompanyStat {
  label: string;
  value: string;
  icon?: string;
}

export interface CompanyScoreItem {
  label: string;
  value: number;
}

export interface CompanyIntelligence {
  outlook: string;
  rating: "Strong" | "Good" | "Neutral" | "Weak";
  overallScore: number;
  scoreExplanation: string;
  scores: CompanyScoreItem[];
  reasons: string[];
  risks: string[];
  watchNext: string[];
}

export type NewsSentiment = "Positive" | "Neutral" | "Negative";

export interface CompanyNews {
  id: string;
  headline: string;
  source: string;
  publishedTime: string;
  summary: string;
  url: string;
  sentiment: NewsSentiment;
}

export interface CompanyCatalyst {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  impact?: "High" | "Medium" | "Low" | "Neutral";
}

export type ValuationOpinion = "Undervalued" | "Fairly Valued" | "Premium Valuation" | "Highly Speculative";

export interface CompanyAnalystBrief {
  overallThesis: string;
  bullCase: string;
  bearCase: string;
  biggestRisk: string;
  keyDrivers: string[];
  valuationOpinion: ValuationOpinion;
  twelveMonthOutlook: string;
  confidence: number;
}

export interface CompanyRelationshipItem {
  name: string;
  symbol: string;
  type: "company" | "etf" | "index";
  href: string;
  relationship?: string;
}

export interface CompanyEcosystem {
  competitors: CompanyRelationshipItem[];
  customers: CompanyRelationshipItem[];
  suppliers: CompanyRelationshipItem[];
  partners: CompanyRelationshipItem[];
  sectorPeers: CompanyRelationshipItem[];
  relatedEtfs: CompanyRelationshipItem[];
  relatedIndexes: CompanyRelationshipItem[];
}
