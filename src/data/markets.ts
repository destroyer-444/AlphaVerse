import { MarketCard, Currency, Commodity, CryptoAsset, HeatmapSector, EconomicEvent, MarketStock, Region, MarketSummary, MarketHeadline } from "@/types/market";

export const majorIndices: MarketCard[] = [
  { name: "NIFTY 50", flag: "🇮🇳", price: "26,120", change: "+0.72%", isPositive: true },
  { name: "SENSEX", flag: "🇮🇳", price: "85,430", change: "+0.61%", isPositive: true },
  { name: "NASDAQ", flag: "🇺🇸", price: "23,200", change: "-0.14%", isPositive: false },
  { name: "S&P 500", flag: "🇺🇸", price: "6,340", change: "+0.28%", isPositive: true },
  { name: "DAX", flag: "🇩🇪", price: "18,450", change: "+0.45%", isPositive: true },
  { name: "FTSE", flag: "🇬🇧", price: "8,150", change: "-0.22%", isPositive: false },
  { name: "Nikkei 225", flag: "🇯🇵", price: "41,300", change: "+0.84%", isPositive: true },
  { name: "Hang Seng", flag: "🇭🇰", price: "24,510", change: "-0.42%", isPositive: false },
];

export const currencies: Currency[] = [
  { name: "USD/INR", price: "83.45", change: "+0.1%", isPositive: true },
  { name: "EUR/USD", price: "1.085", change: "-0.2%", isPositive: false },
  { name: "GBP/USD", price: "1.265", change: "+0.3%", isPositive: true },
  { name: "USD/JPY", price: "154.20", change: "+0.5%", isPositive: true },
];

export const commodities: Commodity[] = [
  { name: "Gold", symbol: "XAU", price: "$2,345", change: "+0.8%", isPositive: true },
  { name: "Silver", symbol: "XAG", price: "$28.50", change: "+1.2%", isPositive: true },
  { name: "Crude Oil", symbol: "WTI", price: "$78.20", change: "-0.5%", isPositive: false },
  { name: "Natural Gas", symbol: "NG", price: "$2.15", change: "-1.1%", isPositive: false },
];

export const crypto: CryptoAsset[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$67,450", change: "+2.4%", isPositive: true },
  { name: "Ethereum", symbol: "ETH", price: "$3,520", change: "+1.8%", isPositive: true },
  { name: "Solana", symbol: "SOL", price: "$145", change: "+3.1%", isPositive: true },
  { name: "Ripple", symbol: "XRP", price: "$0.52", change: "-0.8%", isPositive: false },
];

export const heatmapSectors: HeatmapSector[] = [
  { name: "Technology", change: 2.5, status: "positive" },
  { name: "Finance", change: 1.2, status: "positive" },
  { name: "Energy", change: -0.8, status: "negative" },
  { name: "Healthcare", change: 0.5, status: "positive" },
  { name: "Consumer", change: -0.3, status: "negative" },
  { name: "Industrials", change: 0.8, status: "positive" },
  { name: "Utilities", change: 0.1, status: "positive" },
  { name: "Real Estate", change: -0.5, status: "negative" },
];

export const economicEvents: EconomicEvent[] = [
  { time: "Today 2:00 PM", event: "Fed Interest Rate Decision", impact: "High" },
  { time: "Tomorrow 9:30 AM", event: "US GDP Release", impact: "High" },
  { time: "Tomorrow 3:00 PM", event: "ECB Press Conference", impact: "Medium" },
  { time: "Wednesday 10:00 AM", event: "US CPI Data", impact: "High" },
];

export const topGainers: MarketStock[] = [
  { name: "NVIDIA", change: "+3.2%", price: "$1,245" },
  { name: "TSMC", change: "+2.8%", price: "$185" },
  { name: "ASML", change: "+2.5%", price: "$1,020" },
];

export const topLosers: MarketStock[] = [
  { name: "Intel", change: "-2.1%", price: "$32" },
  { name: "Boeing", change: "-1.8%", price: "$178" },
  { name: "Nike", change: "-1.5%", price: "$95" },
];

export const regions: Region[] = [
  { name: "Global", flag: null },
  { name: "India", flag: "🇮🇳" },
  { name: "USA", flag: "🇺🇸" },
  { name: "Europe", flag: "🇪🇺" },
  { name: "China", flag: "🇨🇳" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Crypto", flag: null },
];

export const marketSummary: MarketSummary[] = [
  { title: "Top Gainer", value: "NIFTY 50", change: "+0.84%", isPositive: true },
  { title: "Top Loser", value: "Hang Seng", change: "-0.42%", isPositive: false },
  { title: "Most Active", value: "NASDAQ", change: "+0.28%", isPositive: true },
];

export const marketHeadlines: MarketHeadline[] = [
  { title: "NVIDIA surges to new all-time high", time: "15 min ago" },
  { title: "Fed signals potential rate cut in September", time: "32 min ago" },
  { title: "Oil prices stabilize after volatile week", time: "1 hour ago" },
  { title: "Apple announces major AI partnership", time: "2 hours ago" },
  { title: "European markets close mixed amid earnings", time: "3 hours ago" },
];
