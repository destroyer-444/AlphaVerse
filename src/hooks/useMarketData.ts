"use client";

import { useEffect, useState } from "react";
import { marketService } from "@/services/marketService";
import { AllMarketsData } from "@/services/providers/marketProvider";

/**
 * Loads async market data in client components.
 * cacheKey must be stable and unique per data source.
 */
export function useAsyncMarketData<T>(
  cacheKey: string,
  fetcher: () => Promise<T>
): T | undefined {
  const [data, setData] = useState<T>();

  useEffect(() => {
    let cancelled = false;

    fetcher().then((result) => {
      if (!cancelled) {
        setData(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [cacheKey, fetcher]);

  return data;
}

const marketDataFetchers = {
  majorIndices: marketService.getMajorIndices,
  currencies: marketService.getCurrencies,
  commodities: marketService.getCommodities,
  crypto: marketService.getCrypto,
  heatmapSectors: marketService.getHeatmapSectors,
  economicEvents: marketService.getEconomicEvents,
  topGainers: marketService.getTopGainers,
  topLosers: marketService.getTopLosers,
  regions: marketService.getRegions,
  marketSummary: marketService.getMarketSummary,
  marketHeadlines: marketService.getMarketHeadlines,
} satisfies {
  [K in keyof AllMarketsData]: () => Promise<AllMarketsData[K]>;
};

/**
 * Loads a named market data set through the asynchronous market service.
 * This preserves the keyed hook API used by the market components.
 */
export function useMarketData<K extends keyof AllMarketsData>(
  cacheKey: K
): AllMarketsData[K] | undefined {
  const fetcher = marketDataFetchers[cacheKey] as () => Promise<AllMarketsData[K]>;

  return useAsyncMarketData(cacheKey, fetcher);
}
