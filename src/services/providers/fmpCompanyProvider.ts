import { Company } from "@/types/company";
import { ICompanyDataProvider } from "./companyProvider";

interface FmpProfile {
  symbol?: string;
  companyName?: string;
  exchangeShortName?: string;
  exchange?: string;
  sector?: string;
  industry?: string;
  ceo?: string;
  fullTimeEmployees?: string | number;
  mktCap?: number;
  marketCap?: number;
  website?: string;
  description?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface FmpQuote {
  symbol?: string;
  name?: string;
  price?: number;
  change?: number;
  changesPercentage?: number;
  changePercentage?: number;
  marketCap?: number;
  exchange?: string;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

function formatMarketCap(value: number | undefined, fallback: string): string {
  if (!value || !Number.isFinite(value)) return fallback;
  if (value >= 1_000_000_000_000) return `$${formatNumber(value / 1_000_000_000_000)}T`;
  if (value >= 1_000_000_000) return `$${formatNumber(value / 1_000_000_000)}B`;
  if (value >= 1_000_000) return `$${formatNumber(value / 1_000_000)}M`;
  return `$${formatNumber(value)}`;
}

function formatSignedCurrency(value: number | undefined, fallback: string): string {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return `${value >= 0 ? "+" : "-"}$${formatNumber(Math.abs(value))}`;
}

function formatSignedPercent(value: number | undefined, fallback: string): string {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return `${value >= 0 ? "+" : ""}${formatNumber(value)}%`;
}

function formatHeadquarters(profile: FmpProfile, fallback: string): string {
  const location = [profile.city, profile.state, profile.country].filter(Boolean).join(", ");
  return location || fallback;
}

export class FmpCompanyProvider implements ICompanyDataProvider {
  private readonly baseUrl = "https://financialmodelingprep.com/stable";

  async getCompany(symbol: string, fallback: Company): Promise<Company | undefined> {
    const apiKey = process.env.FMP_API_KEY;
    if (!apiKey) return undefined;

    const encodedSymbol = encodeURIComponent(symbol.toUpperCase());
    const encodedApiKey = encodeURIComponent(apiKey);
    const [profileResponse, quoteResponse] = await Promise.all([
      fetch(`${this.baseUrl}/profile?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
      fetch(`${this.baseUrl}/quote?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
    ]);

    if (!quoteResponse.ok) return undefined;

    const [profiles, quotes] = await Promise.all([
      profileResponse.ok ? (profileResponse.json() as Promise<FmpProfile[]>) : Promise.resolve([]),
      quoteResponse.json() as Promise<FmpQuote[]>,
    ]);
    const profile = profiles[0] || {};
    const quote = quotes[0];

    if (!quote) return undefined;

    const percentChange = quote.changesPercentage ?? quote.changePercentage;
    const employeeCount = Number(profile.fullTimeEmployees);

    return {
      symbol: quote.symbol || profile.symbol || fallback.symbol,
      name: profile.companyName || quote.name || fallback.name,
      exchange: profile.exchangeShortName || profile.exchange || quote.exchange || fallback.exchange,
      country: profile.country || fallback.country,
      sector: profile.sector || fallback.sector,
      industry: profile.industry || fallback.industry,
      marketCap: formatMarketCap(quote.marketCap ?? profile.mktCap ?? profile.marketCap, fallback.marketCap),
      price: quote.price === undefined || !Number.isFinite(quote.price) ? fallback.price : `$${formatNumber(quote.price)}`,
      change: formatSignedCurrency(quote.change, fallback.change),
      changePercent: formatSignedPercent(percentChange, fallback.changePercent),
      description: profile.description || fallback.description,
      website: profile.website || fallback.website,
      ceo: profile.ceo || fallback.ceo,
      employees: Number.isFinite(employeeCount) ? formatNumber(employeeCount) : fallback.employees,
      headquarters: formatHeadquarters(profile, fallback.headquarters),
    };
  }

  async getFinancialData(symbol: string): Promise<any> {
    const apiKey = process.env.FMP_API_KEY;
    if (!apiKey) return undefined;

    const encodedSymbol = encodeURIComponent(symbol.toUpperCase());
    const encodedApiKey = encodeURIComponent(apiKey);

    try {
      const [ratiosRes, metricsRes, growthRes, quoteRes, profileRes, ratiosTtmRes, metricsTtmRes] = await Promise.all([
        fetch(`${this.baseUrl}/ratios?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
        fetch(`${this.baseUrl}/key-metrics?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
        fetch(`${this.baseUrl}/financial-growth?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
        fetch(`${this.baseUrl}/quote?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
        fetch(`${this.baseUrl}/profile?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
        fetch(`${this.baseUrl}/ratios-ttm?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
        fetch(`${this.baseUrl}/key-metrics-ttm?symbol=${encodedSymbol}&apikey=${encodedApiKey}`, { cache: "no-store" }),
      ]);

      const [ratios, metrics, growth, quote, profile, ratiosTtm, metricsTtm] = await Promise.all([
        ratiosRes.ok ? ratiosRes.json() : Promise.resolve([]),
        metricsRes.ok ? metricsRes.json() : Promise.resolve([]),
        growthRes.ok ? growthRes.json() : Promise.resolve([]),
        quoteRes.ok ? quoteRes.json() : Promise.resolve([]),
        profileRes.ok ? profileRes.json() : Promise.resolve([]),
        ratiosTtmRes.ok ? ratiosTtmRes.json() : Promise.resolve([]),
        metricsTtmRes.ok ? metricsTtmRes.json() : Promise.resolve([]),
      ]);

      const ratiosObj = Array.isArray(ratios) ? ratios[0] || {} : ratios || {};
      const ratiosTtmObj = Array.isArray(ratiosTtm) ? ratiosTtm[0] || {} : ratiosTtm || {};
      const metricsObj = Array.isArray(metrics) ? metrics[0] || {} : metrics || {};
      const metricsTtmObj = Array.isArray(metricsTtm) ? metricsTtm[0] || {} : metricsTtm || {};

      return {
        ratios: { ...ratiosTtmObj, ...ratiosObj },
        metrics: { ...metricsTtmObj, ...metricsObj },
        growth: Array.isArray(growth) ? growth[0] : growth,
        quote: Array.isArray(quote) ? quote[0] : quote,
        profile: Array.isArray(profile) ? profile[0] : profile,
      };
    } catch {
      return undefined;
    }
  }
}

export const fmpCompanyProvider = new FmpCompanyProvider();
