import "server-only";
import { companyService } from "./companyService";
import { fmpCompanyProvider } from "./providers/fmpCompanyProvider";

/**
 * Resolves a company profile from FMP and falls back to the existing mock record
 * whenever the live provider is unavailable or returns incomplete data.
 */
export async function getLiveCompany(symbol: string) {
  const fallback = companyService.getCompany(symbol);
  if (!fallback) return undefined;

  try {
    return (await fmpCompanyProvider.getCompany(symbol, fallback)) ?? fallback;
  } catch {
    return fallback;
  }
}
