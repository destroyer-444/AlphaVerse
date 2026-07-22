import { AllMarketsData, IMarketDataProvider } from "./marketProvider";
import {
  majorIndices,
  currencies,
  commodities,
  crypto,
  heatmapSectors,
  economicEvents,
  topGainers,
  topLosers,
  regions,
  marketSummary,
  marketHeadlines,
} from "@/data/markets";

/**
 * Mock Market Data Provider
 *
 * Uses static data from the data layer. Swap for a live provider
 * by calling setMarketDataProvider() in marketService.
 */
export class MockMarketProvider implements IMarketDataProvider {
  async getMajorIndices() {
    return majorIndices;
  }

  async getCurrencies() {
    return currencies;
  }

  async getCommodities() {
    return commodities;
  }

  async getCrypto() {
    return crypto;
  }

  async getHeatmapSectors() {
    return heatmapSectors;
  }

  async getEconomicEvents() {
    return economicEvents;
  }

  async getTopGainers() {
    return topGainers;
  }

  async getTopLosers() {
    return topLosers;
  }

  async getRegions() {
    return regions;
  }

  async getMarketSummary() {
    return marketSummary;
  }

  async getMarketHeadlines() {
    return marketHeadlines;
  }

  async getAllMarkets(): Promise<AllMarketsData> {
    return {
      majorIndices,
      currencies,
      commodities,
      crypto,
      heatmapSectors,
      economicEvents,
      topGainers,
      topLosers,
      regions,
      marketSummary,
      marketHeadlines,
    };
  }
}

export const mockMarketProvider = new MockMarketProvider();
