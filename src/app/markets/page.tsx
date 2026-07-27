"use client";

import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/common/PageHero";
import RegionSelector from "@/components/RegionSelector";
import MajorIndicesCard from "@/components/markets/MajorIndicesCard";
import MarketHeatmap from "@/components/markets/MarketHeatmap";
import TopGainersLosers from "@/components/markets/TopGainersLosers";
import Commodities from "@/components/markets/Commodities";
import Currencies from "@/components/markets/Currencies";
import Crypto from "@/components/markets/Crypto";
import EconomicEvents from "@/components/markets/EconomicEvents";
import MarketHeadlines from "@/components/markets/MarketHeadlines";
import { useMarketData } from "@/hooks/useMarketData";

export default function MarketsPage() {
  const majorIndices = useMarketData("majorIndices") ?? [];
  return (
    <PageLayout>
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Hero Introduction Banner */}
          <PageHero
            title="Global Markets & Asset Classes"
            category="Live Institutional Workspace"
            summary="Monitor real-time price action across equities, commodities, forex, and cryptocurrency."
            whyItMatters="Cross-asset price signals reveal macro rotation trends before individual equity earnings reports capture them."
            howToUse={[
              "Select a region pill below to activate a region-focused workspace with localized trading hours and sentiment.",
              "Use the interactive heatmap to identify overextended sector valuations.",
              "Track economic event countdowns on the right sidebar for volatility catalysts.",
            ]}
            proTip="Notice how currency movements in USD/JPY directly impact Japanese semiconductor equity valuations."
          />

          {/* Upgraded 9-Region Workspace Selector */}
          <RegionSelector />

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search companies, ETFs, indices..."
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
              />
              <svg
                className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Main Content (75%) */}
            <div className="lg:col-span-3 space-y-8">
              {/* Section 1: Major Indices */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">Major Indices</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {majorIndices.map((index, i) => (
                    <motion.div
                      key={index.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                    >
                      <MajorIndicesCard
                        name={index.name}
                        flag={index.flag}
                        price={index.price}
                        change={index.change}
                        isPositive={index.isPositive}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Section 2: Market Heatmap */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <MarketHeatmap />
              </motion.div>

              {/* Section 3: Top Gainers/Losers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <TopGainersLosers />
              </motion.div>

              {/* Section 4: Commodities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Commodities />
              </motion.div>

              {/* Section 5: Currencies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Currencies />
              </motion.div>

              {/* Section 6: Crypto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Crypto />
              </motion.div>

              {/* Section 7: Economic Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <EconomicEvents />
              </motion.div>
            </div>

            {/* Right Column - Sidebar (25%) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-24"
              >
                <MarketHeadlines />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
