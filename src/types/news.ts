export type NewsImpact = "Bullish" | "Bearish" | "Neutral";

export interface NewsArticle {
  headline: string;
  summary: string;
  category: string;
  time: string;
  impact: NewsImpact;
}

export interface FeaturedStory {
  headline: string;
  summary: string;
  badges: string[];
  category: string;
  region: string;
}

export interface TrendingTopic {
  name: string;
}

export interface MostReadArticle {
  title: string;
  time: string;
}

export interface MarketBriefItem {
  title: string;
  items: string[];
  color: "green" | "red" | "blue";
}

export interface NewsCategory {
  name: string;
}
