import "server-only";
import { companyService } from "./companyService";
import { fmpCompanyProvider } from "./providers/fmpCompanyProvider";
import { dataOrchestrator } from "./core/DataOrchestrator";
import { CACHE_TTL } from "@/lib/cache/revalidate";

/**
 * Resolves a company profile from FMP with centralized TTL caching, request deduplication,
 * and circuit breaker fallback protection.
 */
export async function getLiveCompany(symbol: string) {
  const fallback = companyService.getCompany(symbol);
  if (!fallback) return undefined;

  return dataOrchestrator.fetchWithCache(
    `company-live-${symbol.toUpperCase()}`,
    async () => {
      const live = await fmpCompanyProvider.getCompany(symbol, fallback);
      return live ?? fallback;
    },
    CACHE_TTL.QUOTE,
    {
      isFmp: true,
      retries: 2,
      fallback,
    }
  );
}
