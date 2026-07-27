"use client";

/**
 * RegionSelector — AlphaVerse Global First Workspace Selector
 *
 * Expands support across international financial hubs:
 * USA, India, Japan, China, Singapore, Europe, Crypto, Commodities, Forex.
 * Selecting a region evolves the UI into a region-focused workspace
 * displaying local market hours, primary indices, and regional sentiment.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface RegionWorkspace {
  id: string;
  name: string;
  flag: string;
  primaryExchange: string;
  tradingHours: string;
  currency: string;
  sentiment: string;
  topCatalyst: string;
  indices: string[];
}

const GLOBAL_REGIONS: RegionWorkspace[] = [
  {
    id: "usa",
    name: "USA",
    flag: "🇺🇸",
    primaryExchange: "NYSE / NASDAQ",
    tradingHours: "09:30 - 16:00 EST",
    currency: "USD ($)",
    sentiment: "Bullish (AI Tech Capital Flows)",
    topCatalyst: "S&P 500 tech earnings acceleration & Fed rate path stability",
    indices: ["S&P 500 ($SPX)", "NASDAQ 100 ($NDX)", "Dow Jones ($DJIA)"],
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    primaryExchange: "BSE / NSE",
    tradingHours: "09:15 - 15:30 IST",
    currency: "INR (₹)",
    sentiment: "Strong Growth (Domestic Retail Capital)",
    topCatalyst: "MSCI index rebalancing inflows & manufacturing FDI expansion",
    indices: ["NIFTY 50", "SENSEX", "BANK NIFTY"],
  },
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    primaryExchange: "Tokyo Stock Exchange (TSE)",
    tradingHours: "09:00 - 15:00 JST",
    currency: "JPY (¥)",
    sentiment: "Moderate Value (Corporate Governance Reform)",
    topCatalyst: "BOJ interest rate normalization & semiconductor equipment capital cycle",
    indices: ["Nikkei 225", "TOPIX", "TSE Growth"],
  },
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    primaryExchange: "SSE / SZSE / HKEX",
    tradingHours: "09:30 - 15:00 CST",
    currency: "CNY / HKD",
    sentiment: "Rebound Focus (Stimulus Re-rating)",
    topCatalyst: "PBOC liquidity injections & domestic AI hardware self-sufficiency",
    indices: ["Hang Seng", "CSI 300", "Shanghai Composite"],
  },
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    primaryExchange: "SGX",
    tradingHours: "09:00 - 17:00 SGT",
    currency: "SGD (S$)",
    sentiment: "Defensive Yield (APAC Wealth Hub)",
    topCatalyst: "REIT dividend yield compression & ASEAN cross-border trade flows",
    indices: ["Straits Times Index (STI)", "SGX REIT Index"],
  },
  {
    id: "europe",
    name: "Europe",
    flag: "🇪🇺",
    primaryExchange: "Euronext / LSE / Xetra",
    tradingHours: "09:00 - 17:30 CET",
    currency: "EUR (€) / GBP (£)",
    sentiment: "Mixed (Luxury Moderation / Defense Boom)",
    topCatalyst: "ECB rate-cutting trajectory & €15B sovereign AI infrastructure funding",
    indices: ["STOXX 50", "DAX 40", "FTSE 100", "CAC 40"],
  },
  {
    id: "crypto",
    name: "Crypto",
    flag: "⚡",
    primaryExchange: "24/7 Global Spot & Derivatives",
    tradingHours: "Continuous 24/7/365",
    currency: "USD / Stablecoins",
    sentiment: "High Momentum (Institutional ETF Inflows)",
    topCatalyst: "Spot Bitcoin & Ethereum ETF net inflows exceeding $2B monthly",
    indices: ["Bitcoin ($BTC)", "Ethereum ($ETH)", "Solana ($SOL)"],
  },
  {
    id: "commodities",
    name: "Commodities",
    flag: "🛢️",
    primaryExchange: "NYMEX / COMEX / LME",
    tradingHours: "Continuous Electronic Trading",
    currency: "USD ($)",
    sentiment: "Geopolitical Hedge (Gold All-Time Highs)",
    topCatalyst: "Central bank gold reserve accumulation & copper electrification supply deficit",
    indices: ["Gold ($XAU)", "Brent Crude ($OIL)", "Copper ($HG)"],
  },
  {
    id: "forex",
    name: "Forex",
    flag: "💱",
    primaryExchange: "Global Interbank Market",
    tradingHours: "Continuous 5-Day Week",
    currency: "Major Currency Pairs",
    sentiment: "USD Yield Advantage",
    topCatalyst: "US Treasury yield differentials against G10 sovereign yields",
    indices: ["USD Index ($DXY)", "EUR/USD", "USD/JPY", "GBP/USD"],
  },
];

export interface RegionSelectorProps {
  onRegionChange?: (regionId: string) => void;
  defaultRegion?: string;
}

export default function RegionSelector({
  onRegionChange,
  defaultRegion = "usa",
}: RegionSelectorProps) {
  const [selectedId, setSelectedId] = useState(defaultRegion);
  const currentWorkspace = GLOBAL_REGIONS.find((r) => r.id === selectedId) || GLOBAL_REGIONS[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (onRegionChange) {
      onRegionChange(id);
    }
  };

  return (
    <div className="w-full mb-10">
      {/* Region Selector Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {GLOBAL_REGIONS.map((region) => {
          const isSelected = region.id === selectedId;
          return (
            <motion.button
              key={region.id}
              onClick={() => handleSelect(region.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white border-2 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
              }`}
              aria-pressed={isSelected}
            >
              <span className="text-base">{region.flag}</span>
              <span>{region.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Evolving Region Workspace Preview Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWorkspace.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-r from-black/80 via-zinc-900/60 to-black/80 border border-white/15 rounded-3xl p-5 md:p-6 backdrop-blur-2xl shadow-xl max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentWorkspace.flag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                    {currentWorkspace.name} Workspace
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                    Active Session
                  </span>
                </div>
                <p className="text-zinc-400 text-xs font-mono mt-0.5">
                  Exchange: {currentWorkspace.primaryExchange} • Hours: {currentWorkspace.tradingHours}
                </p>
              </div>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-2xl px-4 py-2.5 shrink-0">
              <span className="text-[10px] text-zinc-500 font-mono uppercase block">Regional AI Sentiment</span>
              <span className="text-xs md:text-sm font-bold text-white block mt-0.5">
                {currentWorkspace.sentiment}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5">
              <span className="text-blue-400 font-mono text-[10px] font-bold uppercase block mb-1">
                ⚡ Top Regional Catalyst
              </span>
              <p className="text-zinc-300 font-light leading-snug">
                {currentWorkspace.topCatalyst}
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 flex flex-col justify-center">
              <span className="text-zinc-500 font-mono text-[10px] uppercase block mb-2">
                Primary Monitored Indices ({currentWorkspace.currency})
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono">
                {currentWorkspace.indices.map((idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold"
                  >
                    {idx}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
