export interface MarketCard {
  name: string;
  flag: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface Currency {
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface Commodity {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface CryptoAsset {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface HeatmapSector {
  name: string;
  change: number;
  status: "positive" | "negative" | "neutral";
}

export interface EconomicEvent {
  time: string;
  event: string;
  impact: "High" | "Medium" | "Low";
}

export interface MarketStock {
  name: string;
  change: string;
  price: string;
}

export interface Region {
  name: string;
  flag: string | null;
}

export interface MarketSummary {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface MarketHeadline {
  title: string;
  time: string;
}
