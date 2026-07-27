import "server-only";
import { CompanyIntelligence, CompanyScoreItem } from "@/types/company";
import { fmpCompanyProvider } from "./providers/fmpCompanyProvider";
import { dataOrchestrator } from "./core/DataOrchestrator";
import { CACHE_TTL } from "@/lib/cache/revalidate";

function clamp(val: number, min = 0, max = 100): number {
  if (!Number.isFinite(val)) return 50;
  return Math.max(min, Math.min(max, val));
}

function averageScore(scores: (number | undefined)[], defaultScore = 50): number {
  const valid = scores.filter((s): s is number => s !== undefined && Number.isFinite(s));
  if (valid.length === 0) return defaultScore;
  const sum = valid.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / valid.length);
}

function calculateGrowthScore(growth: any, ratios: any, metrics: any): number {
  const revGrowth = growth?.revenueGrowth !== undefined ? clamp(50 + growth.revenueGrowth * 150) : undefined;
  const epsGrowthVal = growth?.epsgrowth ?? growth?.epsdilutedGrowth;
  const epsGrowth = epsGrowthVal !== undefined ? clamp(50 + epsGrowthVal * 150) : undefined;
  const opMargin = ratios?.operatingProfitMargin !== undefined ? clamp(30 + ratios.operatingProfitMargin * 200) : undefined;
  const roeVal = metrics?.returnOnEquity ?? ratios?.returnOnEquity;
  const roe = roeVal !== undefined ? clamp(30 + roeVal * 200) : undefined;
  const roaVal = metrics?.returnOnAssets ?? metrics?.operatingReturnOnAssets;
  const roa = roaVal !== undefined ? clamp(30 + roaVal * 300) : undefined;

  return averageScore([revGrowth, epsGrowth, opMargin, roe, roa], 65);
}

function calculateHealthScore(ratios: any, metrics: any, quote: any): number {
  const debtEqVal = ratios?.debtToEquityRatio;
  const debtEq = debtEqVal !== undefined ? clamp(100 - debtEqVal * 40) : undefined;
  const currRatioVal = ratios?.currentRatio ?? metrics?.currentRatio;
  const currRatio = currRatioVal !== undefined ? clamp(currRatioVal * 45) : undefined;
  
  let fcfVal = metrics?.freeCashFlowYield;
  if (fcfVal === undefined && ratios?.freeCashFlowPerShare && quote?.price) {
    fcfVal = ratios.freeCashFlowPerShare / quote.price;
  }
  const fcf = fcfVal !== undefined ? clamp(50 + fcfVal * 1000) : undefined;

  let cashPosVal = ratios?.cashRatio;
  if (cashPosVal === undefined && ratios?.cashPerShare && quote?.price) {
    cashPosVal = ratios.cashPerShare / quote.price;
  }
  const cashPos = cashPosVal !== undefined ? clamp(20 + cashPosVal * 200) : undefined;

  const ocfVal = ratios?.operatingCashFlowRatio ?? ratios?.operatingCashFlowSalesRatio;
  const ocf = ocfVal !== undefined ? clamp(30 + ocfVal * 50) : undefined;

  return averageScore([debtEq, currRatio, fcf, cashPos, ocf], 60);
}

function calculateValuationScore(ratios: any, quote: any, metrics: any, growth: any): number {
  const peVal = ratios?.priceToEarningsRatio ?? quote?.pe;
  const pe = peVal !== undefined && peVal > 0 ? clamp(110 - peVal * 2) : undefined;

  let fwdPeVal = ratios?.forwardPriceToEarningsRatio;
  if (fwdPeVal === undefined && peVal && growth?.epsgrowth !== undefined) {
    fwdPeVal = peVal / (1 + growth.epsgrowth);
  }
  const fwdPe = fwdPeVal !== undefined && fwdPeVal > 0 ? clamp(110 - fwdPeVal * 2.2) : undefined;

  const pegVal = ratios?.priceToEarningsGrowthRatio ?? ratios?.forwardPriceToEarningsGrowthRatio;
  const peg = pegVal !== undefined && pegVal > 0 ? clamp(110 - pegVal * 40) : undefined;

  const psVal = ratios?.priceToSalesRatio ?? metrics?.evToSales;
  const ps = psVal !== undefined && psVal > 0 ? clamp(100 - psVal * 3.5) : undefined;

  const evEbitdaVal = metrics?.evToEBITDA ?? ratios?.enterpriseValueMultiple;
  const evEbitda = evEbitdaVal !== undefined && evEbitdaVal > 0 ? clamp(110 - evEbitdaVal * 3) : undefined;

  return averageScore([pe, fwdPe, peg, ps, evEbitda], 55);
}

function calculateRiskScore(profile: any, ratios: any, quote: any): number {
  const betaVal = profile?.beta ?? quote?.beta;
  const beta = betaVal !== undefined ? clamp(betaVal * 35) : undefined;

  const debtVal = ratios?.debtToAssetsRatio ?? ratios?.debtToCapitalRatio;
  const debt = debtVal !== undefined ? clamp(10 + debtVal * 120) : undefined;

  let volVal: number | undefined;
  if (quote?.yearHigh && quote?.yearLow && quote.yearHigh > quote.yearLow) {
    volVal = (quote.yearHigh - quote.yearLow) / ((quote.yearHigh + quote.yearLow) / 2);
  }
  const volatility = volVal !== undefined ? clamp(volVal * 100) : undefined;

  let profConsist: number | undefined;
  const npm = ratios?.netProfitMargin;
  if (npm !== undefined) {
    profConsist = npm > 0.15 ? 15 : npm > 0 ? 35 : 80;
  }

  return averageScore([beta, debt, volatility, profConsist], 45);
}

function calculateMomentumScore(quote: any): number {
  let perfVal: number | undefined;
  if (quote?.price && quote?.yearLow && quote?.yearHigh && quote.yearHigh > quote.yearLow) {
    perfVal = (quote.price - quote.yearLow) / (quote.yearHigh - quote.yearLow);
  }
  const perf = perfVal !== undefined ? clamp(perfVal * 100) : undefined;

  let dma50Val: number | undefined;
  if (quote?.price && quote?.priceAvg50) {
    dma50Val = (quote.price - quote.priceAvg50) / quote.priceAvg50;
  }
  const dma50 = dma50Val !== undefined ? clamp(50 + dma50Val * 200) : undefined;

  let dma200Val: number | undefined;
  if (quote?.price && quote?.priceAvg200) {
    dma200Val = (quote.price - quote.priceAvg200) / quote.priceAvg200;
  }
  const dma200 = dma200Val !== undefined ? clamp(50 + dma200Val * 150) : undefined;

  let maTrendVal: number | undefined;
  if (quote?.priceAvg50 && quote?.priceAvg200) {
    maTrendVal = (quote.priceAvg50 - quote.priceAvg200) / quote.priceAvg200;
  }
  const maTrend = maTrendVal !== undefined ? clamp(50 + maTrendVal * 250) : undefined;

  return averageScore([perf, dma50, dma200, maTrend], 60);
}

function generateReasons(growth: number, health: number, momentum: number, valuation: number, ratios: any, metrics: any): string[] {
  const reasons: string[] = [];
  if (growth >= 70 || ratios?.operatingProfitMargin > 0.25) {
    reasons.push("Revenue growth and operating profitability remain above peers.");
  }
  if (health >= 70 || ratios?.currentRatio > 2.0) {
    reasons.push("Balance sheet liquidity and financial strength remain robust.");
  }
  if (momentum >= 65) {
    reasons.push("Long-term moving-average trend continues to be supportive.");
  }
  if (valuation >= 65) {
    reasons.push("Valuation multiples present an attractive risk-reward profile.");
  }
  if (metrics?.returnOnEquity > 0.20 || ratios?.returnOnEquity > 0.20) {
    reasons.push("High return on equity demonstrates efficient capital allocation.");
  }
  if (metrics?.freeCashFlowYield > 0 || ratios?.freeCashFlowPerShare > 0) {
    reasons.push("Positive free cash flow generation supports ongoing strategic investments.");
  }

  const fallbacks = [
    "Consistent operational execution across core business segments.",
    "Strong competitive moat reinforces market leadership and customer retention.",
    "Stable end-market demand provides ongoing revenue and cash flow visibility.",
  ];
  for (const fb of fallbacks) {
    if (reasons.length < 3 && !reasons.includes(fb)) {
      reasons.push(fb);
    }
  }
  return reasons.slice(0, 3);
}

function generateRisks(valuation: number, risk: number, momentum: number, ratios: any, profile: any): string[] {
  const risks: string[] = [];
  if (valuation <= 50 || ratios?.priceToEarningsRatio > 35) {
    risks.push("Premium valuation multiples leave little room for execution missteps.");
  }
  if (risk >= 60 || profile?.beta > 1.3) {
    risks.push("Higher equity beta indicates above-average price volatility compared to the market.");
  }
  if (ratios?.operatingProfitMargin < 0.15) {
    risks.push("Margin compression risk from rising operational or competitive costs.");
  }
  if (ratios?.debtToEquityRatio > 1.0 || ratios?.debtToAssetsRatio > 0.4) {
    risks.push("Elevated debt levels could increase financial sensitivity during interest rate cycles.");
  }
  if (momentum <= 50) {
    risks.push("Recent technical momentum has softened below short-term moving averages.");
  }

  const fallbacks = [
    "Macroeconomic fluctuations and trade shifts could impact overall sector demand.",
    "Intense industry competition may challenge long-term pricing power and market share.",
    "Shifting regulatory frameworks could create unforeseen operating headwinds.",
  ];
  for (const fb of fallbacks) {
    if (risks.length < 3 && !risks.includes(fb)) {
      risks.push(fb);
    }
  }
  return risks.slice(0, 3);
}

function generateWatchNext(): string[] {
  return [
    "Next quarterly earnings release and management forward guidance.",
    "Upcoming central bank interest rate decisions and macroeconomic policy updates.",
    "Key industry conferences, sector catalyst events, and product announcements.",
  ];
}

function getFallbackIntelligence(): CompanyIntelligence {
  return {
    outlook: "Bullish",
    rating: "Strong",
    overallScore: 84,
    scoreExplanation: "Strong overall fundamentals with moderate valuation risk.",
    scores: [
      { label: "Growth", value: 91 },
      { label: "Momentum", value: 88 },
      { label: "Financial Health", value: 82 },
      { label: "Risk", value: 43 },
      { label: "Valuation", value: 62 },
    ],
    reasons: [
      "Strong demand continues across core markets.",
      "Earnings momentum remains supportive.",
      "Industry positioning supports long-term growth.",
    ],
    risks: [
      "Valuation may be sensitive to near-term expectations.",
      "Competitive pressure could affect future margins.",
      "Market volatility may impact short-term performance.",
    ],
    watchNext: [
      "Next earnings release and forward guidance.",
      "Updates to sector demand and spending trends.",
      "New product and partnership announcements.",
    ],
  };
}

export class CompanyIntelligenceService {
  async getIntelligence(symbol: string): Promise<CompanyIntelligence> {
    return dataOrchestrator.fetchWithCache(
      `company-intelligence-${symbol.toUpperCase()}`,
      () => this.computeIntelligence(symbol),
      CACHE_TTL.RATIOS,
      { isFmp: true }
    );
  }

  private async computeIntelligence(symbol: string): Promise<CompanyIntelligence> {
    try {
      if (!fmpCompanyProvider.getFinancialData) {
        return getFallbackIntelligence();
      }

      const data = await fmpCompanyProvider.getFinancialData(symbol);
      if (!data || (!data.ratios && !data.metrics && !data.growth && !data.quote)) {
        return getFallbackIntelligence();
      }

      const { ratios, metrics, growth, quote, profile } = data;

      const growthScore = calculateGrowthScore(growth, ratios, metrics);
      const healthScore = calculateHealthScore(ratios, metrics, quote);
      const valuationScore = calculateValuationScore(ratios, quote, metrics, growth);
      const riskScore = calculateRiskScore(profile, ratios, quote);
      const momentumScore = calculateMomentumScore(quote);

      const overallScore = Math.round(
        growthScore * 0.25 +
          healthScore * 0.25 +
          momentumScore * 0.20 +
          valuationScore * 0.15 +
          (100 - riskScore) * 0.15
      );

      const rating: "Strong" | "Good" | "Neutral" | "Weak" =
        overallScore >= 75 ? "Strong" : overallScore >= 60 ? "Good" : overallScore >= 45 ? "Neutral" : "Weak";

      const outlook =
        rating === "Strong" ? "Bullish" : rating === "Good" ? "Positive" : rating === "Neutral" ? "Neutral" : "Cautious";

      const categoryScores = [
        { name: "Growth", value: growthScore },
        { name: "Momentum", value: momentumScore },
        { name: "Financial Health", value: healthScore },
        { name: "Valuation", value: valuationScore },
      ].sort((a, b) => b.value - a.value);

      const bestCat = categoryScores[0].name;
      const scoreExplanation =
        rating === "Strong"
          ? `Strong overall fundamentals led by robust ${bestCat} and market positioning.`
          : rating === "Good"
            ? `Solid financial metrics with supportive ${bestCat} and balanced risk profile.`
            : rating === "Neutral"
              ? `Mixed performance indicators with steady fundamentals but selective risks.`
              : `Challenging operational outlook requiring careful risk monitoring.`;

      const scores: CompanyScoreItem[] = [
        { label: "Growth", value: growthScore },
        { label: "Momentum", value: momentumScore },
        { label: "Financial Health", value: healthScore },
        { label: "Risk", value: riskScore },
        { label: "Valuation", value: valuationScore },
      ];

      const reasons = generateReasons(growthScore, healthScore, momentumScore, valuationScore, ratios, metrics);
      const risks = generateRisks(valuationScore, riskScore, momentumScore, ratios, profile);
      const watchNext = generateWatchNext();

      return {
        outlook,
        rating,
        overallScore,
        scoreExplanation,
        scores,
        reasons,
        risks,
        watchNext,
      };
    } catch {
      return getFallbackIntelligence();
    }
  }
}

export const companyIntelligenceService = new CompanyIntelligenceService();
