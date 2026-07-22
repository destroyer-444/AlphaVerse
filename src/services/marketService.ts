import {
  MarketCard,
  Currency,
  Commodity,
  CryptoAsset,
  HeatmapSector,
  EconomicEvent,
  MarketStock,
  Region,
  MarketSummary,
  MarketHeadline,
} from "@/types/market";
import {
  AllMarketsData,
  IMarketDataProvider,
} from "./providers/marketProvider";
import { mockMarketProvider } from "./providers/mockMarketProvider";

let marketDataProvider: IMarketDataProvider = mockMarketProvider;

/** Swap the active provider (e.g. mock → live API) without changing consumers. */
export function setMarketDataProvider(provider: IMarketDataProvider): void {
  marketDataProvider = provider;
}

export function getMarketDataProvider(): IMarketDataProvider {
  return marketDataProvider;
}

/**
 * Market Service — async facade over IMarketDataProvider.
 * All methods delegate to the active provider with full type safety.
 */
export const marketService = {
  getMajorIndices(): Promise<MarketCard[]> {
    return marketDataProvider.getMajorIndices();
  },

  getCurrencies(): Promise<Currency[]> {
    return marketDataProvider.getCurrencies();
  },

  getCommodities(): Promise<Commodity[]> {
    return marketDataProvider.getCommodities();
  },

  getCrypto(): Promise<CryptoAsset[]> {
    return marketDataProvider.getCrypto();
  },

  getHeatmapSectors(): Promise<HeatmapSector[]> {
    return marketDataProvider.getHeatmapSectors();
  },

  getEconomicEvents(): Promise<EconomicEvent[]> {
    return marketDataProvider.getEconomicEvents();
  },

  getTopGainers(): Promise<MarketStock[]> {
    return marketDataProvider.getTopGainers();
  },

  getTopLosers(): Promise<MarketStock[]> {
    return marketDataProvider.getTopLosers();
  },

  getRegions(): Promise<Region[]> {
    return marketDataProvider.getRegions();
  },

  getMarketSummary(): Promise<MarketSummary[]> {
    return marketDataProvider.getMarketSummary();
  },

  getMarketHeadlines(): Promise<MarketHeadline[]> {
    return marketDataProvider.getMarketHeadlines();
  },

  getAllMarkets(): Promise<AllMarketsData> {
    return marketDataProvider.getAllMarkets();
  },
};
