/**
 * UniversalSearchService — AlphaVerse
 *
 * Indexes every entity class on the platform and returns ranked, typed results.
 * All ranking logic lives here. UI components only render what this service returns.
 *
 * Ranking tiers (highest → lowest priority):
 *   1. exact_ticker   — query exactly matches a ticker symbol
 *   2. exact_name     — query exactly matches a full entity name
 *   3. prefix         — entity name/ticker starts with query
 *   4. contains       — entity name/ticker/description contains query
 *   5. related        — entity is related by topic/sector/theme
 *
 * Future-ready extension points:
 *   Portfolio, Watchlists, AI Chat, Opportunity Radar can be added as new
 *   index segments without touching any existing search logic.
 */

import {
  UniversalSearchResult,
  UniversalSearchResponse,
  SearchEntityType,
  SearchRankTier,
} from "@/types/search";
import { companyService } from "./companyService";
import { newsService } from "./newsService";
import { marketService } from "./marketService";

// ---------------------------------------------------------------------------
// Static index entries for entities that don't come from dynamic providers
// ---------------------------------------------------------------------------

interface StaticIndexEntry {
  id: string;
  type: SearchEntityType;
  title: string;
  ticker?: string;
  description: string;
  href: string;
  group: string;
  /** Keywords for "related" tier matching */
  tags?: string[];
}

const ETF_INDEX: StaticIndexEntry[] = [
  {
    id: "etf-SPY",
    type: "etf",
    title: "SPDR S&P 500 ETF Trust",
    ticker: "SPY",
    description: "Tracks the S&P 500 index. World's largest ETF by AUM.",
    href: "/etf/SPY",
    group: "ETFs",
    tags: ["sp500", "large cap", "us equities", "index fund"],
  },
  {
    id: "etf-QQQ",
    type: "etf",
    title: "Invesco QQQ Trust",
    ticker: "QQQ",
    description: "Tracks the NASDAQ-100 index. Heavy technology weighting.",
    href: "/etf/QQQ",
    group: "ETFs",
    tags: ["nasdaq", "tech", "growth", "technology"],
  },
  {
    id: "etf-SOXX",
    type: "etf",
    title: "iShares Semiconductor ETF",
    ticker: "SOXX",
    description: "Tracks U.S. listed semiconductor companies.",
    href: "/etf/SOXX",
    group: "ETFs",
    tags: ["semiconductor", "chips", "nvidia", "amd", "tech"],
  },
  {
    id: "etf-SMH",
    type: "etf",
    title: "VanEck Semiconductor ETF",
    ticker: "SMH",
    description: "Broad semiconductor industry exposure including TSMC and NVDA.",
    href: "/etf/SMH",
    group: "ETFs",
    tags: ["semiconductor", "chips", "nvidia", "tsmc"],
  },
  {
    id: "etf-XLE",
    type: "etf",
    title: "Energy Select Sector SPDR",
    ticker: "XLE",
    description: "Tracks the S&P 500 Energy sector. Includes oil and gas companies.",
    href: "/etf/XLE",
    group: "ETFs",
    tags: ["energy", "oil", "gas", "exxon", "chevron"],
  },
  {
    id: "etf-GLD",
    type: "etf",
    title: "SPDR Gold Shares",
    ticker: "GLD",
    description: "Physical gold-backed ETF. Tracks spot gold price.",
    href: "/etf/GLD",
    group: "ETFs",
    tags: ["gold", "precious metals", "commodities", "inflation hedge"],
  },
  {
    id: "etf-IWM",
    type: "etf",
    title: "iShares Russell 2000 ETF",
    ticker: "IWM",
    description: "Tracks the Russell 2000 small-cap index.",
    href: "/etf/IWM",
    group: "ETFs",
    tags: ["small cap", "russell", "us equities"],
  },
];

const INDEX_CATALOG: StaticIndexEntry[] = [
  {
    id: "index-NASDAQ",
    type: "index",
    title: "NASDAQ Composite",
    ticker: "NASDAQ",
    description: "Technology-heavy composite index of over 3,000 stocks.",
    href: "/index/NASDAQ",
    group: "Indexes",
    tags: ["nasdaq", "tech", "composite", "growth"],
  },
  {
    id: "index-SP500",
    type: "index",
    title: "S&P 500 Index",
    ticker: "S&P500",
    description: "Benchmark index of 500 largest U.S. public companies.",
    href: "/index/S&P500",
    group: "Indexes",
    tags: ["sp500", "large cap", "us market", "benchmark"],
  },
  {
    id: "index-DJI",
    type: "index",
    title: "Dow Jones Industrial Average",
    ticker: "DJIA",
    description: "Price-weighted index of 30 major U.S. blue-chip companies.",
    href: "/index/DJIA",
    group: "Indexes",
    tags: ["dow", "blue chip", "industrial", "us market"],
  },
  {
    id: "index-SOX",
    type: "index",
    title: "PHLX Semiconductor Index",
    ticker: "SOX",
    description: "Core semiconductor sector index tracking chip industry performance.",
    href: "/index/SOX",
    group: "Indexes",
    tags: ["semiconductor", "chips", "tech"],
  },
  {
    id: "index-VIX",
    type: "index",
    title: "CBOE Volatility Index",
    ticker: "VIX",
    description: "Market fear gauge measuring expected 30-day S&P 500 volatility.",
    href: "/index/VIX",
    group: "Indexes",
    tags: ["volatility", "fear", "options", "risk"],
  },
];

const CRYPTO_CATALOG: StaticIndexEntry[] = [
  {
    id: "crypto-BTC",
    type: "crypto",
    title: "Bitcoin",
    ticker: "BTC",
    description: "The original cryptocurrency. Decentralized digital gold.",
    href: "/intelligence",
    group: "Crypto",
    tags: ["bitcoin", "btc", "crypto", "digital asset", "blockchain"],
  },
  {
    id: "crypto-ETH",
    type: "crypto",
    title: "Ethereum",
    ticker: "ETH",
    description: "Smart contract platform. Powers DeFi and NFT ecosystems.",
    href: "/intelligence",
    group: "Crypto",
    tags: ["ethereum", "eth", "defi", "smart contracts", "blockchain"],
  },
  {
    id: "crypto-SOL",
    type: "crypto",
    title: "Solana",
    ticker: "SOL",
    description: "High-throughput blockchain optimized for speed and low fees.",
    href: "/intelligence",
    group: "Crypto",
    tags: ["solana", "sol", "layer1", "blockchain"],
  },
  {
    id: "crypto-BNB",
    type: "crypto",
    title: "BNB",
    ticker: "BNB",
    description: "Binance native token powering the BNB Chain ecosystem.",
    href: "/intelligence",
    group: "Crypto",
    tags: ["bnb", "binance", "crypto", "exchange token"],
  },
];

const CURRENCY_CATALOG: StaticIndexEntry[] = [
  {
    id: "fx-EURUSD",
    type: "currency",
    title: "EUR/USD",
    ticker: "EURUSD",
    description: "Euro to US Dollar. World's most traded currency pair.",
    href: "/intelligence",
    group: "Currencies",
    tags: ["euro", "dollar", "forex", "eur", "usd", "ecb"],
  },
  {
    id: "fx-GBPUSD",
    type: "currency",
    title: "GBP/USD",
    ticker: "GBPUSD",
    description: "British Pound to US Dollar. Also known as Cable.",
    href: "/intelligence",
    group: "Currencies",
    tags: ["pound", "sterling", "gbp", "uk", "forex"],
  },
  {
    id: "fx-USDJPY",
    type: "currency",
    title: "USD/JPY",
    ticker: "USDJPY",
    description: "US Dollar to Japanese Yen. Key Asia-Pacific currency benchmark.",
    href: "/intelligence",
    group: "Currencies",
    tags: ["yen", "japan", "jpy", "boj", "forex"],
  },
  {
    id: "fx-AUDUSD",
    type: "currency",
    title: "AUD/USD",
    ticker: "AUDUSD",
    description: "Australian Dollar to US Dollar. Risk-sensitive commodity currency.",
    href: "/intelligence",
    group: "Currencies",
    tags: ["aud", "australia", "commodity currency", "forex"],
  },
];

const COMMODITY_CATALOG: StaticIndexEntry[] = [
  {
    id: "comm-GOLD",
    type: "commodity",
    title: "Gold",
    ticker: "XAUUSD",
    description: "Precious metal. Primary safe-haven and inflation hedge asset.",
    href: "/intelligence",
    group: "Commodities",
    tags: ["gold", "precious metal", "inflation", "safe haven", "xau"],
  },
  {
    id: "comm-OIL",
    type: "commodity",
    title: "Crude Oil (WTI)",
    ticker: "WTI",
    description: "West Texas Intermediate crude oil. Global energy benchmark.",
    href: "/intelligence",
    group: "Commodities",
    tags: ["oil", "crude", "energy", "opec", "wti", "petroleum"],
  },
  {
    id: "comm-BRENT",
    type: "commodity",
    title: "Brent Crude Oil",
    ticker: "BRENT",
    description: "North Sea crude oil. International energy pricing benchmark.",
    href: "/intelligence",
    group: "Commodities",
    tags: ["oil", "crude", "brent", "energy", "opec", "petroleum"],
  },
  {
    id: "comm-SILVER",
    type: "commodity",
    title: "Silver",
    ticker: "XAGUSD",
    description: "Precious and industrial metal. Tracks gold with higher volatility.",
    href: "/intelligence",
    group: "Commodities",
    tags: ["silver", "precious metal", "xag", "industrial"],
  },
  {
    id: "comm-NATGAS",
    type: "commodity",
    title: "Natural Gas",
    ticker: "NATGAS",
    description: "Energy commodity used for heating and electricity generation.",
    href: "/intelligence",
    group: "Commodities",
    tags: ["natural gas", "gas", "energy", "utility"],
  },
];

const MARKET_INTELLIGENCE_ENTRY: StaticIndexEntry = {
  id: "mi-dashboard",
  type: "market_intelligence",
  title: "Market Intelligence Dashboard",
  description: "AI-powered daily market brief: score, sentiment, drivers, and watch list.",
  href: "/intelligence",
  group: "Market Intelligence",
  tags: [
    "market", "intelligence", "ai", "sentiment", "bullish", "bearish",
    "neutral", "score", "drivers", "watch", "fed", "fomc", "cpi",
    "inflation", "jobs", "nfp", "gdp", "earnings",
  ],
};

const ECONOMIC_EVENTS: StaticIndexEntry[] = [
  {
    id: "econ-FOMC",
    type: "economic_event",
    title: "FOMC Interest Rate Decision",
    ticker: "FOMC",
    description: "Federal Reserve monetary policy announcement. Impacts global liquidity.",
    href: "/intelligence",
    group: "Economic Events",
    tags: ["fomc", "fed", "federal reserve", "interest rate", "monetary policy"],
  },
  {
    id: "econ-CPI",
    type: "economic_event",
    title: "US Consumer Price Index (CPI)",
    ticker: "CPI",
    description: "Key inflation indicator driving central bank rate expectations.",
    href: "/intelligence",
    group: "Economic Events",
    tags: ["cpi", "inflation", "consumer prices", "fed", "macro"],
  },
  {
    id: "econ-NFP",
    type: "economic_event",
    title: "Non-Farm Payrolls (NFP)",
    ticker: "NFP",
    description: "US labor market report. Leading indicator for economic growth.",
    href: "/intelligence",
    group: "Economic Events",
    tags: ["nfp", "jobs", "employment", "labor", "payrolls"],
  },
  {
    id: "econ-GDP",
    type: "economic_event",
    title: "US GDP Report",
    ticker: "GDP",
    description: "Gross Domestic Product — measures total economic output.",
    href: "/intelligence",
    group: "Economic Events",
    tags: ["gdp", "growth", "economy", "output", "macro"],
  },
  {
    id: "econ-PPI",
    type: "economic_event",
    title: "Producer Price Index (PPI)",
    ticker: "PPI",
    description: "Wholesale inflation indicator. Leads consumer price changes.",
    href: "/intelligence",
    group: "Economic Events",
    tags: ["ppi", "inflation", "wholesale", "producer prices"],
  },
  {
    id: "econ-ECB",
    type: "economic_event",
    title: "ECB Policy Decision",
    ticker: "ECB",
    description: "European Central Bank rate decision. Impacts EUR/USD and EU markets.",
    href: "/intelligence",
    group: "Economic Events",
    tags: ["ecb", "europe", "euro", "eurusd", "monetary policy"],
  },
  {
    id: "econ-BOJ",
    type: "economic_event",
    title: "Bank of Japan (BoJ) Decision",
    ticker: "BOJ",
    description: "BoJ policy announcement. Drives JPY and global carry trade dynamics.",
    href: "/intelligence",
    group: "Economic Events",
    tags: ["boj", "japan", "yen", "usdjpy", "carry trade"],
  },
  {
    id: "econ-OPEC",
    type: "economic_event",
    title: "OPEC+ Production Meeting",
    ticker: "OPEC",
    description: "Oil production quota decisions from OPEC+ member nations.",
    href: "/intelligence",
    group: "Economic Events",
    tags: ["opec", "oil", "crude", "energy", "production"],
  },
];

// ---------------------------------------------------------------------------
// Ranking Engine
// ---------------------------------------------------------------------------

function scoreTier(tier: SearchRankTier): number {
  switch (tier) {
    case "exact_ticker": return 100;
    case "exact_name":   return 90;
    case "prefix":       return 70;
    case "contains":     return 50;
    case "related":      return 20;
  }
}

function getRankTier(
  query: string,
  name: string,
  ticker: string | undefined,
  tags: string[] | undefined
): SearchRankTier | null {
  const q = query.toLowerCase().trim();
  const n = name.toLowerCase();
  const t = ticker?.toLowerCase() ?? "";

  if (t === q) return "exact_ticker";
  if (n === q) return "exact_name";
  if (t.startsWith(q) || n.startsWith(q)) return "prefix";
  if (t.includes(q) || n.includes(q)) return "contains";
  if (tags?.some((tag) => tag.includes(q) || q.includes(tag))) return "related";
  return null;
}

function staticEntryToResult(
  entry: StaticIndexEntry,
  tier: SearchRankTier
): UniversalSearchResult {
  return {
    id: entry.id,
    type: entry.type,
    title: entry.title,
    ticker: entry.ticker,
    description: entry.description,
    href: entry.href,
    rankTier: tier,
    group: entry.group,
  };
}

// ---------------------------------------------------------------------------
// UniversalSearchService
// ---------------------------------------------------------------------------

export class UniversalSearchService {
  /**
   * Search across ALL entity classes on the platform.
   * Returns ranked, deduplicated results ready for UI rendering.
   */
  async search(rawQuery: string, limit = 24): Promise<UniversalSearchResponse> {
    const start = Date.now();
    const query = rawQuery.trim();

    if (query.length === 0) {
      return { query, results: [], totalCount: 0, durationMs: 0 };
    }

    const scored: Array<{ result: UniversalSearchResult; score: number }> = [];
    const seen = new Set<string>();

    const addResult = (result: UniversalSearchResult, score: number) => {
      if (seen.has(result.id)) return;
      seen.add(result.id);
      scored.push({ result, score });
    };

    // --- 1. Companies (from companyService) ---
    const companies = companyService.getAllCompanies();
    for (const co of companies) {
      const tier = getRankTier(query, co.name, co.symbol, [
        co.sector?.toLowerCase(),
        co.industry?.toLowerCase(),
        co.country?.toLowerCase(),
      ].filter(Boolean) as string[]);
      if (tier) {
        addResult(
          {
            id: `company-${co.symbol}`,
            type: "company",
            title: co.name,
            ticker: co.symbol,
            description: `${co.sector} · ${co.exchange ?? co.country}`,
            href: `/companies/${co.symbol}`,
            livePrice: co.price ? `$${co.price}` : undefined,
            liveChange: co.changePercent,
            isPositive: co.changePercent
              ? parseFloat(co.changePercent) >= 0
              : undefined,
            rankTier: tier,
            group: "Companies",
          },
          scoreTier(tier)
        );
      }
    }

    // --- 2. Static catalogs (ETFs, Indexes, Crypto, Currencies, Commodities) ---
    const catalogs: StaticIndexEntry[] = [
      ...ETF_INDEX,
      ...INDEX_CATALOG,
      ...CRYPTO_CATALOG,
      ...CURRENCY_CATALOG,
      ...COMMODITY_CATALOG,
    ];

    for (const entry of catalogs) {
      const tier = getRankTier(query, entry.title, entry.ticker, entry.tags);
      if (tier) {
        addResult(staticEntryToResult(entry, tier), scoreTier(tier));
      }
    }

    // --- 3. Market Intelligence ---
    const miTier = getRankTier(
      query,
      MARKET_INTELLIGENCE_ENTRY.title,
      undefined,
      MARKET_INTELLIGENCE_ENTRY.tags
    );
    if (miTier) {
      addResult(
        staticEntryToResult(MARKET_INTELLIGENCE_ENTRY, miTier),
        scoreTier(miTier)
      );
    }

    // --- 4. Economic Events ---
    for (const event of ECONOMIC_EVENTS) {
      const tier = getRankTier(query, event.title, event.ticker, event.tags);
      if (tier) {
        addResult(staticEntryToResult(event, tier), scoreTier(tier));
      }
    }

    // --- 5. News (from newsService) ---
    const { latestNews, aiNewsItems } = newsService.getAllNews();
    const allNews = [...latestNews, ...aiNewsItems];
    for (let i = 0; i < allNews.length; i++) {
      const article = allNews[i];
      const q = query.toLowerCase();
      const inHeadline = article.headline.toLowerCase().includes(q);
      const inSummary = article.summary?.toLowerCase().includes(q);
      const inCategory = article.category?.toLowerCase().includes(q);

      if (inHeadline || inSummary || inCategory) {
        const tier: SearchRankTier = inHeadline ? "contains" : "related";
        addResult(
          {
            id: `news-${i}`,
            type: "news",
            title: article.headline,
            description: article.category
              ? `${article.category} · ${article.time ?? "Recent"}`
              : article.time ?? "Recent",
            href: "/news",
            rankTier: tier,
            group: "News",
          },
          scoreTier(tier) - i * 0.01 // slight recency penalty by index
        );
      }
    }

    // Sort by descending score, then alphabetically within same score
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.result.title.localeCompare(b.result.title);
    });

    const results = scored.slice(0, limit).map((s) => s.result);

    return {
      query,
      results,
      totalCount: scored.length,
      durationMs: Date.now() - start,
    };
  }
}

export const universalSearchService = new UniversalSearchService();
