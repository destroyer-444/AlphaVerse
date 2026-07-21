import { NewsArticle, FeaturedStory, TrendingTopic, MostReadArticle, MarketBriefItem, NewsCategory } from "@/types/news";

export const featuredStory: FeaturedStory = {
  headline: "Federal Reserve signals possible rate cuts later this year",
  summary: "The Federal Reserve has indicated that interest rate cuts could be on the horizon as inflation pressures continue to ease. Chair Powell suggested that the central bank is closely monitoring economic data and remains prepared to adjust monetary policy if conditions warrant.",
  badges: ["High Impact", "Economy", "USA"],
  category: "Economy",
  region: "USA",
};

export const latestNews: NewsArticle[] = [
  {
    headline: "NVIDIA surges to new all-time high on AI demand",
    summary: "Chipmaker continues to dominate as tech companies increase AI infrastructure spending.",
    category: "Technology",
    time: "2h ago",
    impact: "Bullish",
  },
  {
    headline: "European markets close higher on economic data",
    summary: "Positive GDP figures from Germany and France drive regional gains.",
    category: "Markets",
    time: "3h ago",
    impact: "Bullish",
  },
  {
    headline: "Tesla announces new battery technology breakthrough",
    summary: "Electric vehicle maker claims significant efficiency improvements in next-gen batteries.",
    category: "Technology",
    time: "4h ago",
    impact: "Bullish",
  },
  {
    headline: "Gold prices climb amid geopolitical tensions",
    summary: "Safe-haven demand increases as Middle East concerns escalate.",
    category: "Energy",
    time: "5h ago",
    impact: "Bullish",
  },
  {
    headline: "Bitcoin surges past key resistance level",
    summary: "Cryptocurrency gains momentum as institutional interest grows.",
    category: "Crypto",
    time: "6h ago",
    impact: "Bullish",
  },
  {
    headline: "Oil prices stabilize after volatile week",
    summary: "Crude oil finds support as OPEC+ maintains production cuts.",
    category: "Energy",
    time: "7h ago",
    impact: "Neutral",
  },
  {
    headline: "Apple expands AI investments across product line",
    summary: "Tech giant integrates advanced AI features into upcoming devices.",
    category: "Technology",
    time: "8h ago",
    impact: "Bullish",
  },
  {
    headline: "Federal Reserve signals patience on interest rates",
    summary: "Central bank indicates no immediate changes to monetary policy.",
    category: "Economy",
    time: "9h ago",
    impact: "Neutral",
  },
  {
    headline: "Semiconductor shortage easing, analysts say",
    summary: "Supply chain improvements expected to boost tech sector.",
    category: "Technology",
    time: "10h ago",
    impact: "Bullish",
  },
  {
    headline: "China's manufacturing sector shows signs of recovery",
    summary: "Industrial production beats expectations in latest data.",
    category: "Economy",
    time: "11h ago",
    impact: "Bullish",
  },
  {
    headline: "Banking sector faces regulatory scrutiny",
    summary: "New rules proposed to increase capital requirements for major banks.",
    category: "Policy",
    time: "12h ago",
    impact: "Bearish",
  },
  {
    headline: "Renewable energy stocks surge on policy support",
    summary: "Government incentives drive investment in clean energy sector.",
    category: "Energy",
    time: "13h ago",
    impact: "Bullish",
  },
];

export const trendingTopics: TrendingTopic[] = [
  { name: "AI Boom" },
  { name: "Interest Rates" },
  { name: "Gold" },
  { name: "Oil" },
  { name: "NVIDIA" },
  { name: "Bitcoin" },
];

export const mostRead: MostReadArticle[] = [
  { title: "NVIDIA reaches new all-time high as AI demand surges", time: "2h ago" },
  { title: "European markets close higher on economic data", time: "3h ago" },
  { title: "Tesla announces new battery technology breakthrough", time: "4h ago" },
  { title: "Gold prices climb amid geopolitical tensions", time: "5h ago" },
  { title: "Bitcoin surges past key resistance level", time: "6h ago" },
];

export const marketBrief: MarketBriefItem[] = [
  {
    title: "Today's Winners",
    items: ["NVIDIA +3.2%", "TSMC +2.8%", "ASML +2.5%"],
    color: "green",
  },
  {
    title: "Today's Risks",
    items: ["Intel -2.1%", "Boeing -1.8%", "Nike -1.5%"],
    color: "red",
  },
  {
    title: "What To Watch Tomorrow",
    items: ["Fed Rate Decision", "US GDP Release", "ECB Press Conference"],
    color: "blue",
  },
];

export const newsCategories: NewsCategory[] = [
  { name: "All" },
  { name: "Markets" },
  { name: "Economy" },
  { name: "Technology" },
  { name: "Crypto" },
  { name: "Energy" },
  { name: "AI" },
  { name: "Policy" },
];

export const aiNewsItems: NewsArticle[] = [
  {
    headline: "Oil prices rise after Middle East tensions",
    summary: "Geopolitical concerns drive crude oil prices higher as supply disruptions loom.",
    category: "Markets",
    time: "12 min ago",
    impact: "Bullish",
  },
  {
    headline: "Federal Reserve hints at stable interest rates",
    summary: "Central bank signals patience in monetary policy amid economic uncertainty.",
    category: "Economy",
    time: "25 min ago",
    impact: "Neutral",
  },
  {
    headline: "Apple expands AI investments",
    summary: "Tech giant increases spending on artificial intelligence research and development.",
    category: "Technology",
    time: "1 hour ago",
    impact: "Bullish",
  },
  {
    headline: "Tesla reports stronger deliveries",
    summary: "Electric vehicle maker exceeds expectations in quarterly delivery numbers.",
    category: "Technology",
    time: "2 hours ago",
    impact: "Bullish",
  },
];
