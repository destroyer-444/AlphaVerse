import "server-only";
import { Company, CompanyIntelligence, CompanyNews, CompanyCatalyst, CompanyAnalystBrief, ValuationOpinion } from "@/types/company";
import { fmpCompanyProvider } from "./providers/fmpCompanyProvider";

function determineValuationOpinion(pe: number | null, forwardPE: number | null, growth: number | null, peg: number | null): ValuationOpinion {
  if (pe !== null && pe < 0) {
    return "Highly Speculative";
  }
  if (pe === null && forwardPE === null && peg === null) {
    return "Highly Speculative";
  }
  if (peg !== null && Number.isFinite(peg) && peg > 0) {
    if (peg < 1.0) return "Undervalued";
    if (peg <= 2.2) return "Fairly Valued";
    return "Premium Valuation";
  }
  const effectivePE = pe !== null && Number.isFinite(pe) && pe > 0 ? pe : (forwardPE !== null && Number.isFinite(forwardPE) && forwardPE > 0 ? forwardPE : null);
  if (effectivePE === null) {
    return "Highly Speculative";
  }
  if (effectivePE > 35) return "Premium Valuation";
  if (effectivePE >= 15) return "Fairly Valued";
  return "Undervalued";
}

export class CompanyAnalysisService {
  async getAnalystBrief(
    symbol: string,
    company: Company,
    intelligence: CompanyIntelligence,
    news: CompanyNews[],
    catalysts: CompanyCatalyst[]
  ): Promise<CompanyAnalystBrief> {
    let finData: any = {};
    try {
      finData = await fmpCompanyProvider.getFinancialData(symbol);
    } catch {
      finData = {};
    }

    const ratiosObj = finData.ratios || {};
    const metricsObj = finData.metrics || {};
    const growthObj = finData.growth || {};
    const quoteObj = finData.quote || {};

    const pe = quoteObj.pe ?? ratiosObj.priceToEarningsRatioTTM ?? ratiosObj.priceEarningsRatio ?? ratiosObj.priceToEarningsRatio ?? metricsObj.peRatio ?? null;
    const forwardPE = metricsObj.forwardPE ?? ratiosObj.forwardPriceToEarningsRatio ?? null;
    const peg = ratiosObj.priceToEarningsGrowthRatioTTM ?? ratiosObj.priceToEarningsGrowthRatio ?? ratiosObj.pegRatio ?? null;
    const growth = growthObj.epsgrowth !== undefined ? growthObj.epsgrowth * 100 : (growthObj.revenueGrowth !== undefined ? growthObj.revenueGrowth * 100 : null);

    // Calculate confidence 0-100
    let confidence = 0;

    // News & Catalysts availability (up to 30 pts)
    if (news && news.length > 0) confidence += 20;
    else confidence += 10; // API checked cleanly
    if (catalysts && catalysts.length > 0 && catalysts[0].id !== "no-catalysts") confidence += 10;
    else if (catalysts && catalysts.length > 0) confidence += 5;

    // Financial completeness (up to 40 pts)
    if (pe !== null && Number.isFinite(pe) && pe > 0) confidence += 15;
    else if (quoteObj.price > 0 && quoteObj.marketCap > 0) confidence += 10;
    if (growth !== null && Number.isFinite(growth)) confidence += 15;
    else if (growthObj.revenueGrowth !== undefined || growthObj.netIncomeGrowth !== undefined) confidence += 10;
    if (ratiosObj && Object.keys(ratiosObj).length > 0) confidence += 10;

    // Data freshness & quote completeness (up to 30 pts)
    if (company.price && company.price !== "$0" && company.price !== "N/A") confidence += 15;
    if (company.marketCap && company.marketCap !== "$0" && company.marketCap !== "N/A") confidence += 15;

    confidence = Math.min(100, Math.max(0, confidence));

    const valOpinion = determineValuationOpinion(pe, forwardPE, growth, peg);

    if (confidence < 45) {
      const lowConfMsg = "Current information is insufficient for high-confidence conclusions. Available live financial metrics and historical data are limited for this symbol.";
      return {
        overallThesis: lowConfMsg,
        bullCase: "Current information is insufficient for high-confidence conclusions regarding upside drivers.",
        bearCase: "Current information is insufficient for high-confidence conclusions regarding downside risks.",
        biggestRisk: "Current information is insufficient for high-confidence conclusions due to limited data visibility.",
        keyDrivers: ["Current information is insufficient for high-confidence conclusions."],
        valuationOpinion: valOpinion,
        twelveMonthOutlook: "Current information is insufficient for high-confidence conclusions for the 12-month horizon.",
        confidence,
      };
    }

    const peStr = pe !== null && Number.isFinite(pe) && pe > 0 ? `trading at a trailing P/E multiple of ${pe.toFixed(1)}x` : `operating within the ${company.sector || "commercial"} sector`;
    const scoreStr = `an overall AlphaVerse rating of ${intelligence.overallScore}/100 (${intelligence.rating})`;
    const valStr = `classified as ${valOpinion.toLowerCase()}`;
    const overallThesis = `${company.name} demonstrates ${scoreStr} while ${peStr}. With valuation currently ${valStr}, the company's financial profile is anchored by existing scale in ${company.industry || "its industry"}, though market trajectory remains sensitive to ongoing operational execution.`;

    const reasons = intelligence.reasons && intelligence.reasons.length > 0 ? intelligence.reasons.slice(0, 2).join(" ") : "Core operational positioning supports current revenue generation.";
    const growthStr = growth !== null && Number.isFinite(growth) ? ` Recent metrics reflect a growth indicator of ${growth.toFixed(1)}%.` : "";
    const posNews = news.some(n => n.sentiment === "Positive") ? " Recent news headlines reflect supportive market sentiment and ongoing demand." : "";
    const bullCase = `Key upward catalysts include strong operational positioning: ${reasons}${growthStr}${posNews}`.trim();

    const risks = intelligence.risks && intelligence.risks.length > 0 ? intelligence.risks.slice(0, 2).join(" ") : "Market volatility and competitive pressures could affect future margins.";
    const valRisk = valOpinion === "Premium Valuation" ? " The current premium valuation multiple leaves limited margin for error if earnings momentum decelerates." : (valOpinion === "Highly Speculative" ? " The speculative valuation profile elevates sensitivity to macroeconomic shifts and profitability timelines." : "");
    const negNews = news.some(n => n.sentiment === "Negative") ? " Recent media sentiment highlights competitive or industry headwinds." : "";
    const bearCase = `Primary downward risks include: ${risks}${valRisk}${negNews}`.trim();

    const biggestRisk = (intelligence.risks && intelligence.risks[0]) || "Industry competitive pressures and macroeconomic volatility could impact forward profitability margins.";

    const keyDrivers: string[] = [
      `Execution in core ${company.industry || "industry"} markets and end-user demand stability.`,
      `Operating margin resilience and cash flow generation consistency.`,
    ];
    if (catalysts.length > 0 && catalysts[0].id !== "no-catalysts") {
      keyDrivers.push(`Upcoming confirmed event: ${catalysts[0].title} scheduled for ${catalysts[0].date}.`);
    } else {
      keyDrivers.push("Sector capital expenditure trends and competitive differentiation.");
    }
    if (pe !== null && Number.isFinite(pe) && pe > 0) {
      keyDrivers.push(`Maintenance of earnings growth to support the current ${pe.toFixed(1)}x P/E multiple.`);
    } else {
      keyDrivers.push("Progress toward sustainable profitability and margin expansion.");
    }

    const twelveMonthOutlook = `AlphaVerse maintains a ${intelligence.outlook.toLowerCase()} 12-month perspective on ${company.name}. Supported by a ${intelligence.rating.toLowerCase()} fundamental score, forward stock performance will depend on the company's ability to navigate industry headwinds and justify its ${valOpinion.toLowerCase()} profile.`;

    return {
      overallThesis,
      bullCase,
      bearCase,
      biggestRisk,
      keyDrivers,
      valuationOpinion: valOpinion,
      twelveMonthOutlook,
      confidence,
    };
  }
}

export const companyAnalysisService = new CompanyAnalysisService();
