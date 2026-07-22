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

    if (!profileResponse.ok || !quoteResponse.ok) return undefined;

    const [profiles, quotes] = await Promise.all([
      profileResponse.json() as Promise<FmpProfile[]>,
      quoteResponse.json() as Promise<FmpQuote[]>,
    ]);
    const profile = profiles[0];
    const quote = quotes[0];

    if (!profile || !quote) return undefined;

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
}

export const fmpCompanyProvider = new FmpCompanyProvider();
