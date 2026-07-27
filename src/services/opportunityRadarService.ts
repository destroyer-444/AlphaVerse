import "server-only";
/**
 * AlphaVerse — Opportunity Radar Service
 *
 * Proactively discovers investment opportunities by scoring every company
 * in the database using existing service results. All logic lives here.
 * React components only render what this service returns.
 *
 * Scoring weights:
 *   Growth          25%
 *   Momentum        20%
 *   Financial Health 20%
 *   Valuation       15%
 *   News            10%
 *   Risk (inverted) 10%
 */

import {
  Opportunity,
  OpportunityCategory,
  OpportunityRisk,
  OpportunityScore,
  OpportunityReason,
  RadarResult,
  RadarSection,
} from "@/types/opportunity";
import { companyService } from "./companyService";
import { companyIntelligenceService } from "./companyIntelligenceService";
import { companyNewsService } from "./companyNewsService";
import { getLiveCompany } from "./companyLiveService";
import { dataOrchestrator } from "./core/DataOrchestrator";
import { CACHE_TTL } from "@/lib/cache/revalidate";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, isFinite(v) ? v : 50));
}

function formatNumber(v: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(v);
}

// ─── News Score ───────────────────────────────────────────────────────────────

async function fetchNewsScore(symbol: string): Promise<{ score: number; catalyst: string }> {
  try {
    const apiKey = process.env.FMP_API_KEY;
    if (!apiKey) return { score: 50, catalyst: "Market activity within expected parameters." };

    const res = await fetch(
      `https://financialmodelingprep.com/stable/news/stock?symbols=${symbol}&limit=5&apikey=${apiKey}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return { score: 50, catalyst: "Market activity within expected parameters." };

    const articles = await res.json() as Array<{ title?: string; text?: string }>;
    if (!Array.isArray(articles) || articles.length === 0) {
      return { score: 50, catalyst: "No recent news in the past 24 hours." };
    }

    const posWords = ["beat", "surge", "rally", "upgrade", "record", "strong", "lead", "top", "gain", "grow"];
    const negWords = ["miss", "plunge", "drop", "decline", "warn", "cut", "fall", "loss", "weak", "probe"];

    let posCount = 0;
    let negCount = 0;
    for (const a of articles) {
      const text = ((a.title ?? "") + " " + (a.text ?? "")).toLowerCase();
      for (const w of posWords) if (text.includes(w)) posCount++;
      for (const w of negWords) if (text.includes(w)) negCount++;
    }

    const total = posCount + negCount;
    const score = total === 0 ? 55 : clamp(50 + ((posCount - negCount) / total) * 50);
    const headline = articles[0]?.title ?? "Recent market-moving events observed.";
    const catalyst = headline.length > 90 ? headline.slice(0, 90) + "…" : headline;

    return { score, catalyst };
  } catch {
    return { score: 50, catalyst: "Market activity within expected parameters." };
  }
}

// ─── Category Detection ───────────────────────────────────────────────────────

function detectCategories(
  symbol: string,
  sector: string,
  industry: string,
  growthScore: number,
  momentumScore: number,
  healthScore: number,
  valuationScore: number,
  riskScore: number,
  newsScore: number
): OpportunityCategory[] {
  const cats: OpportunityCategory[] = [];
  const sym = symbol.toUpperCase();
  const sec = sector.toLowerCase();
  const ind = industry.toLowerCase();

  // Sector / theme labels
  if (["NVDA", "AMD", "INTC", "TSM", "ASML"].includes(sym)) cats.push("Semiconductor");
  if (["NVDA", "MSFT", "GOOGL", "META", "AMD"].includes(sym)) cats.push("AI Leader");
  if (["MSFT", "AMZN", "GOOGL"].includes(sym)) cats.push("Cloud");
  if (["TSLA", "GM", "F"].includes(sym)) cats.push("EV Leader");
  if (["BA", "LMT"].includes(sym)) cats.push("Aerospace");
  if (["RELIANCE", "TCS", "INFY"].includes(sym)) cats.push("Global Blue Chip");
  if (["BA", "LMT", "GM", "F", "ADDYY", "AIR"].includes(sym)) cats.push("Industrials");
  if (["NKE", "ADDYY"].includes(sym)) cats.push("Consumer Tech");

  // Score-driven labels
  if (growthScore >= 72) cats.push("High Growth");
  if (valuationScore >= 65) cats.push("Undervalued");
  if (momentumScore >= 68) cats.push("Momentum Leader");
  if (riskScore <= 38) cats.push("Low Risk");
  if (healthScore >= 72) cats.push("High Cash Flow");
  if (newsScore >= 62) cats.push("Strong Earnings");
  if (momentumScore >= 55 && growthScore >= 55) cats.push("Emerging Trend");

  // Fallback
  if (cats.length === 0) {
    if (sec.includes("tech")) cats.push("High Growth");
    else if (ind.includes("dividend") || ind.includes("utility")) cats.push("Dividend");
    else cats.push("Emerging Trend");
  }

  return [...new Set(cats)].slice(0, 5);
}

// ─── Risk Classification ──────────────────────────────────────────────────────

function classifyRisk(riskScore: number, valuationScore: number): OpportunityRisk {
  // riskScore is raw risk (higher = more risk), valuationScore is attractiveness
  const combined = riskScore * 0.7 + (100 - valuationScore) * 0.3;
  if (combined <= 38) return "Low";
  if (combined <= 60) return "Medium";
  return "High";
}

// ─── Confidence ───────────────────────────────────────────────────────────────

function calculateConfidence(
  hasLivePrice: boolean,
  hasNewsData: boolean,
  intelligenceScores: number[],
  newsScore: number
): number {
  let conf = 40; // base
  if (hasLivePrice) conf += 25;
  if (hasNewsData) conf += 15;
  if (intelligenceScores.length >= 4) conf += 15;
  if (newsScore !== 50) conf += 5; // non-baseline news = fresher data
  return clamp(conf);
}

// ─── Explanation Generator ────────────────────────────────────────────────────

function buildExplanation(
  companyName: string,
  categories: OpportunityCategory[],
  growthScore: number,
  momentumScore: number,
  healthScore: number,
  newsScore: number,
  risk: OpportunityRisk
): string {
  const parts: string[] = [];

  if (growthScore >= 68) parts.push("revenue and earnings growth remain above sector peers");
  else if (growthScore >= 52) parts.push("steady topline growth supports near-term visibility");

  if (momentumScore >= 65) parts.push("technical momentum is trending above key moving averages");
  else if (momentumScore >= 50) parts.push("price action is stabilizing near medium-term support");

  if (healthScore >= 68) parts.push("balance sheet strength and cash flow generation are robust");

  if (newsScore >= 60) parts.push("recent news sentiment reflects positive market-moving developments");
  else if (newsScore <= 42) parts.push("near-term news flow carries some caution signals to monitor");

  if (risk === "Low") parts.push("risk profile remains well-contained relative to the broader market");
  else if (risk === "High") parts.push("elevated risk warrants position sizing discipline");

  if (parts.length === 0) {
    parts.push("underlying fundamentals maintain competitive market positioning");
  }

  const joined = parts.slice(0, 3).join("; ");
  return `${companyName} appears on the Radar because ${joined}.`;
}

// ─── Reason Lines ─────────────────────────────────────────────────────────────

function buildReasons(
  growthScore: number,
  momentumScore: number,
  healthScore: number,
  valuationScore: number,
  newsScore: number
): OpportunityReason[] {
  const reasons: OpportunityReason[] = [];

  if (growthScore >= 65) {
    reasons.push({ text: "Revenue and earnings growth tracking above sector average.", category: "Growth" });
  } else {
    reasons.push({ text: "Core operational execution maintains consistent output.", category: "Growth" });
  }

  if (momentumScore >= 62) {
    reasons.push({ text: "Price momentum confirms bullish moving average alignment.", category: "Momentum" });
  } else if (momentumScore >= 48) {
    reasons.push({ text: "Technical trend consolidating near medium-term support levels.", category: "Momentum" });
  }

  if (healthScore >= 65) {
    reasons.push({ text: "Strong liquidity, free cash flow, and manageable debt load.", category: "Financial" });
  } else {
    reasons.push({ text: "Balance sheet reflects stable operating foundation.", category: "Financial" });
  }

  if (valuationScore >= 62) {
    reasons.push({ text: "Valuation multiples offer an attractive risk/reward entry point.", category: "Valuation" });
  }

  if (newsScore >= 58) {
    reasons.push({ text: "Recent news cycle reflects positive sentiment and market confidence.", category: "News" });
  } else if (newsScore <= 44) {
    reasons.push({ text: "News flow signals caution; monitoring catalyst developments closely.", category: "News" });
  }

  return reasons.slice(0, 4);
}

// ─── Opportunity Builder ──────────────────────────────────────────────────────

async function buildOpportunity(symbol: string): Promise<Opportunity | null> {
  try {
    const [company, intelligence, newsData] = await Promise.all([
      getLiveCompany(symbol),
      companyIntelligenceService.getIntelligence(symbol),
      fetchNewsScore(symbol),
    ]);

    if (!company) return null;

    // Extract individual scores from intelligence.scores[]
    const scoreMap: Record<string, number> = {};
    for (const s of intelligence.scores) {
      scoreMap[s.label] = s.value;
    }

    const growthScore = scoreMap["Growth"] ?? 60;
    const momentumScore = scoreMap["Momentum"] ?? 60;
    const healthScore = scoreMap["Financial Health"] ?? 60;
    const valuationScore = scoreMap["Valuation"] ?? 55;
    const rawRiskScore = scoreMap["Risk"] ?? 45;
    const newsScore = newsData.score;

    // Weighted composite per spec
    const composite = clamp(
      growthScore * 0.25 +
      momentumScore * 0.20 +
      healthScore * 0.20 +
      valuationScore * 0.15 +
      newsScore * 0.10 +
      (100 - rawRiskScore) * 0.10
    );

    const score: OpportunityScore = {
      composite: Math.round(composite),
      growth: growthScore,
      momentum: momentumScore,
      financialHealth: healthScore,
      valuation: valuationScore,
      news: newsScore,
      risk: rawRiskScore,
      items: [
        { label: "Growth", value: growthScore, weight: 0.25 },
        { label: "Momentum", value: momentumScore, weight: 0.20 },
        { label: "Financial Health", value: healthScore, weight: 0.20 },
        { label: "Valuation", value: valuationScore, weight: 0.15 },
        { label: "News", value: newsScore, weight: 0.10 },
        { label: "Risk", value: 100 - rawRiskScore, weight: 0.10 },
      ],
    };

    const risk = classifyRisk(rawRiskScore, valuationScore);
    const categories = detectCategories(
      symbol,
      company.sector,
      company.industry,
      growthScore,
      momentumScore,
      healthScore,
      valuationScore,
      rawRiskScore,
      newsScore
    );

    const confidence = calculateConfidence(
      !!company.price,
      newsScore !== 50,
      Object.values(scoreMap),
      newsScore
    );

    const explanation = buildExplanation(
      company.name,
      categories,
      growthScore,
      momentumScore,
      healthScore,
      newsScore,
      risk
    );

    const reasons = buildReasons(growthScore, momentumScore, healthScore, valuationScore, newsScore);

    const isPositive = company.changePercent.startsWith("+") || !company.changePercent.startsWith("-");

    return {
      symbol,
      companyName: company.name,
      sector: company.sector,
      price: company.price,
      change: company.change,
      changePercent: company.changePercent,
      isPositive,
      marketCap: company.marketCap,
      score,
      confidence,
      risk,
      categories,
      primaryCategory: categories[0],
      explanation,
      reasons,
      latestCatalyst: newsData.catalyst,
      href: `/companies/${symbol}`,
    };
  } catch {
    return null;
  }
}

// ─── Section Builders ─────────────────────────────────────────────────────────

function buildSection(
  id: string,
  label: string,
  description: string,
  icon: string,
  all: Opportunity[],
  filter: (o: Opportunity) => boolean,
  sorter: (a: Opportunity, b: Opportunity) => number,
  limit = 6
): RadarSection {
  return {
    id,
    label,
    description,
    icon,
    opportunities: all.filter(filter).sort(sorter).slice(0, limit),
  };
}

// ─── OpportunityRadarService ──────────────────────────────────────────────────

export class OpportunityRadarService {
  async getRadar(): Promise<RadarResult> {
    return dataOrchestrator.fetchWithCache(
      "opportunity-radar-data",
      () => this.computeRadar(),
      CACHE_TTL.OPPORTUNITY
    );
  }

  private async computeRadar(): Promise<RadarResult> {
    const allCompanies = companyService.getAllCompanies();
    const symbols = allCompanies.map((c) => c.symbol);

    // Parallel fetch — no sequential calls, no duplicates
    const results = await Promise.all(symbols.map(buildOpportunity));
    const all = results.filter((o): o is Opportunity => o !== null);

    // Sort by composite score for default ordering
    const byScore = (a: Opportunity, b: Opportunity) => b.score.composite - a.score.composite;

    const topOpportunity = all.length > 0 ? [...all].sort(byScore)[0] : null;

    const sections: RadarSection[] = [
      buildSection(
        "top",
        "Top Opportunities",
        "Highest composite scores across all factors today.",
        "🎯",
        all,
        () => true,
        byScore,
        8
      ),
      buildSection(
        "high-growth",
        "High Growth",
        "Companies with exceptional revenue and earnings momentum.",
        "📈",
        all,
        (o) => o.categories.includes("High Growth") || o.score.growth >= 68,
        (a, b) => b.score.growth - a.score.growth,
        6
      ),
      buildSection(
        "value-picks",
        "Value Picks",
        "Undervalued companies with improving fundamentals.",
        "💎",
        all,
        (o) => o.categories.includes("Undervalued") || o.score.valuation >= 62,
        (a, b) => b.score.valuation - a.score.valuation,
        6
      ),
      buildSection(
        "ai-leaders",
        "AI Leaders",
        "Companies at the forefront of artificial intelligence.",
        "🤖",
        all,
        (o) => o.categories.includes("AI Leader"),
        byScore,
        6
      ),
      buildSection(
        "momentum",
        "Momentum",
        "Companies with strong technical price momentum.",
        "⚡",
        all,
        (o) => o.categories.includes("Momentum Leader") || o.score.momentum >= 65,
        (a, b) => b.score.momentum - a.score.momentum,
        6
      ),
      buildSection(
        "safest",
        "Safest Companies",
        "Low risk, financially resilient companies.",
        "🛡️",
        all,
        (o) => o.risk === "Low",
        (a, b) => a.score.risk - b.score.risk,
        6
      ),
      buildSection(
        "most-improved",
        "Most Improved",
        "Companies with the best news sentiment and recent momentum shift.",
        "🔄",
        all,
        (o) => o.score.news >= 55,
        (a, b) => b.score.news - a.score.news,
        6
      ),
    ].filter((s) => s.opportunities.length > 0);

    return {
      generatedAt: new Date().toISOString(),
      totalScanned: all.length,
      topOpportunity,
      sections,
    };
  }
}

export const opportunityRadarService = new OpportunityRadarService();
