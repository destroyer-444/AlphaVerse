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

export interface AllMarketsData {
  majorIndices: MarketCard[];
  currencies: Currency[];
  commodities: Commodity[];
  crypto: CryptoAsset[];
  heatmapSectors: HeatmapSector[];
  economicEvents: EconomicEvent[];
  topGainers: MarketStock[];
  topLosers: MarketStock[];
  regions: Region[];
  marketSummary: MarketSummary[];
  marketHeadlines: MarketHeadline[];
}

/**
 * Market Data Provider Interface
 * 
 * This interface defines the contract for market data providers.
 * Implementations can include mock data, live APIs, cached data, etc.
 * 
 * TODO: Add live API integration by implementing this interface
 * with actual API calls to market data providers (e.g., Alpha Vantage, Yahoo Finance, etc.)
 */
export interface IMarketDataProvider {
  /**
   * Get major market indices (S&P 500, NASDAQ, etc.)
   * TODO: Replace with live API call to fetch real-time indices
   */
  getMajorIndices(): Promise<MarketCard[]>;

  /**
   * Get currency exchange rates
   * TODO: Replace with live API call to fetch real-time forex rates
   */
  getCurrencies(): Promise<Currency[]>;

  /**
   * Get commodity prices (Gold, Silver, Oil, etc.)
   * TODO: Replace with live API call to fetch real-time commodity prices
   */
  getCommodities(): Promise<Commodity[]>;

  /**
   * Get cryptocurrency prices
   * TODO: Replace with live API call to fetch real-time crypto prices
   */
  getCrypto(): Promise<CryptoAsset[]>;

  /**
   * Get market heatmap sector performance
   * TODO: Replace with live API call to fetch real-time sector performance
   */
  getHeatmapSectors(): Promise<HeatmapSector[]>;

  /**
   * Get upcoming economic events
   * TODO: Replace with live API call to fetch economic calendar
   */
  getEconomicEvents(): Promise<EconomicEvent[]>;

  /**
   * Get top gaining stocks
   * TODO: Replace with live API call to fetch real-time gainers
   */
  getTopGainers(): Promise<MarketStock[]>;

  /**
   * Get top losing stocks
   * TODO: Replace with live API call to fetch real-time losers
   */
  getTopLosers(): Promise<MarketStock[]>;

  /**
   * Get available market regions
   * TODO: This can be static or fetched from API
   */
  getRegions(): Promise<Region[]>;

  /**
   * Get market summary statistics
   * TODO: Replace with live API call to fetch real-time summary
   */
  getMarketSummary(): Promise<MarketSummary[]>;

  /**
   * Get market headlines
   * TODO: Replace with live API call to fetch real-time headlines
   */
  getMarketHeadlines(): Promise<MarketHeadline[]>;

  /**
   * Get all market data in a single call
   * TODO: This can be optimized with a single API endpoint
   */
  getAllMarkets(): Promise<AllMarketsData>;
}
