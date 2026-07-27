import "server-only";
import { CompanyNews, CompanyCatalyst, NewsSentiment } from "@/types/company";
import { dataOrchestrator } from "./core/DataOrchestrator";
import { CACHE_TTL } from "@/lib/cache/revalidate";

function stripHtml(html: string | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
}

function formatTime(dateStr: string | undefined): string {
  if (!dateStr) return "Recently";
  try {
    const d = new Date(dateStr.replace(" ", "T"));
    if (isNaN(d.getTime())) return dateStr.split(" ")[0] || "Recently";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateStr.split(" ")[0] || "Recently";
  }
}

function formatRevenue(val: number | null | undefined): string {
  if (!val || !Number.isFinite(val)) return "N/A";
  if (val >= 1_000_000_000_000) return `${(val / 1_000_000_000_000).toFixed(2)}T`;
  if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(2)}B`;
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(2)}M`;
  return val.toLocaleString();
}

function classifySentiment(text: string): NewsSentiment {
  const lower = text.toLowerCase();
  const posKeywords = [
    "beat", "surge", "jump", "rally", "outperform", "buy", "upgrade", "record",
    "growth", "strong", "higher", "profit", "gain", "boom", "soar", "bull",
    "positive", "success", "milestone", "expand", "lead", "top", "raise"
  ];
  const negKeywords = [
    "miss", "plunge", "drop", "fall", "decline", "sell", "downgrade", "loss",
    "weak", "lower", "slump", "crash", "bear", "negative", "warn", "cut",
    "probe", "investigation", "lawsuit", "delay", "risk", "slash", "underperform"
  ];

  let posCount = 0;
  let negCount = 0;

  for (const word of posKeywords) {
    if (lower.includes(word)) posCount++;
  }
  for (const word of negKeywords) {
    if (lower.includes(word)) negCount++;
  }

  if (posCount > negCount) return "Positive";
  if (negCount > posCount) return "Negative";
  return "Neutral";
}

export class CompanyNewsService {
  private readonly baseUrl = "https://financialmodelingprep.com/stable";

  async getCompanyNews(symbol: string): Promise<CompanyNews[]> {
    const apiKey = process.env.FMP_API_KEY;
    if (!apiKey) return [];

    try {
      const response = await fetch(`${this.baseUrl}/fmp-articles?page=0&size=100&apikey=${encodeURIComponent(apiKey)}`, {
        cache: "no-store",
      });

      if (!response.ok) return [];

      const articles: any[] = await response.json();
      if (!Array.isArray(articles)) return [];

      const targetSymbol = symbol.toUpperCase();
      const filtered = articles.filter((a) => {
        const tickers: string = a.tickers || "";
        if (tickers.toUpperCase().includes(targetSymbol)) return true;
        const title: string = a.title || "";
        if (title.toUpperCase().includes(targetSymbol)) return true;
        const content: string = a.content || "";
        if (content.toUpperCase().includes(targetSymbol)) return true;
        return false;
      });

      return filtered.slice(0, 6).map((article, idx) => {
        const rawText = stripHtml(article.content || "");
        const summary = rawText.length > 200 ? rawText.slice(0, 197) + "..." : rawText || "No summary available for this article.";
        const sentiment = classifySentiment(`${article.title || ""} ${summary}`);

        return {
          id: `news-${idx}-${article.date || Date.now()}`,
          headline: article.title || "Company News Update",
          source: article.site || article.author || "Financial Modeling Prep",
          publishedTime: formatTime(article.date),
          summary,
          url: article.link || "",
          sentiment,
        };
      });
    } catch {
      return [];
    }
  }

  async getCompanyCatalysts(symbol: string): Promise<CompanyCatalyst[]> {
    const apiKey = process.env.FMP_API_KEY;
    if (!apiKey) return this.getFallbackCatalysts();

    try {
      const today = new Date().toISOString().split("T")[0];
      const futureDate = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const response = await fetch(
        `${this.baseUrl}/earnings-calendar?from=${today}&to=${futureDate}&apikey=${encodeURIComponent(apiKey)}`,
        { cache: "no-store" }
      );

      if (!response.ok) return this.getFallbackCatalysts();

      const items: any[] = await response.json();
      if (!Array.isArray(items)) return this.getFallbackCatalysts();

      const targetSymbol = symbol.toUpperCase();
      const matches = items.filter((item) => item.symbol && item.symbol.toUpperCase() === targetSymbol);

      if (matches.length === 0) {
        return this.getFallbackCatalysts();
      }

      return matches.map((item, idx) => ({
        id: `catalyst-earnings-${item.date || idx}`,
        title: "Quarterly Earnings Release & Management Guidance",
        date: item.date || "",
        category: "Earnings",
        description: `Consensus EPS Estimate: $${item.epsEstimated !== null && item.epsEstimated !== undefined ? item.epsEstimated : "N/A"} | Revenue Estimate: $${formatRevenue(item.revenueEstimated)}`,
        impact: "High",
      }));
    } catch {
      return this.getFallbackCatalysts();
    }
  }

  async getNewsAndCatalysts(symbol: string): Promise<{ news: CompanyNews[]; catalysts: CompanyCatalyst[] }> {
    return dataOrchestrator.fetchWithCache(
      `news-catalysts-${symbol.toUpperCase()}`,
      async () => {
        const [news, catalysts] = await Promise.all([
          this.getCompanyNews(symbol),
          this.getCompanyCatalysts(symbol),
        ]);
        return { news, catalysts };
      },
      CACHE_TTL.NEWS,
      { isFmp: true }
    );
  }

  private getFallbackCatalysts(): CompanyCatalyst[] {
    return [
      {
        id: "no-catalysts",
        title: "No confirmed upcoming company catalysts.",
        date: "",
        category: "Notice",
        description: "There are currently no scheduled earnings announcements or confirmed events in the calendar for this symbol.",
        impact: "Neutral",
      },
    ];
  }
}

export const companyNewsService = new CompanyNewsService();
