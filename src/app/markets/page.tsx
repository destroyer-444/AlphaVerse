"use client";

import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import MajorIndicesCard from "@/components/markets/MajorIndicesCard";
import MarketHeatmap from "@/components/markets/MarketHeatmap";
import TopGainersLosers from "@/components/markets/TopGainersLosers";
import Commodities from "@/components/markets/Commodities";
import Currencies from "@/components/markets/Currencies";
import Crypto from "@/components/markets/Crypto";
import EconomicEvents from "@/components/markets/EconomicEvents";
import MarketHeadlines from "@/components/markets/MarketHeadlines";

const regions = [
  { name: "Global", flag: null },
  { name: "India", flag: "🇮🇳" },
  { name: "USA", flag: "🇺🇸" },
  { name: "Europe", flag: "🇪🇺" },
  { name: "China", flag: "🇨🇳" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Crypto", flag: null },
];

const majorIndices = [
  { name: "NIFTY 50", flag: "🇮🇳", price: "26,120", change: "+0.72%", isPositive: true },
  { name: "SENSEX", flag: "🇮🇳", price: "85,430", change: "+0.61%", isPositive: true },
  { name: "NASDAQ", flag: "🇺🇸", price: "23,200", change: "-0.14%", isPositive: false },
  { name: "S&P 500", flag: "🇺🇸", price: "6,340", change: "+0.28%", isPositive: true },
  { name: "DAX", flag: "🇩🇪", price: "18,450", change: "+0.45%", isPositive: true },
  { name: "FTSE", flag: "🇬🇧", price: "8,150", change: "-0.22%", isPositive: false },
  { name: "Nikkei 225", flag: "🇯🇵", price: "41,300", change: "+0.84%", isPositive: true },
  { name: "Hang Seng", flag: "🇭🇰", price: "24,510", change: "-0.42%", isPositive: false },
];

export default function MarketsPage() {
  return (
    <PageLayout>
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Markets
            </h1>
            <p className="text-lg text-zinc-400">
              Global financial markets in one place.
            </p>
          </motion.div>

          {/* Region Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {regions.map((region, index) => (
              <motion.button
                key={region.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {region.flag && <span className="text-base">{region.flag}</span>}
                <span>{region.name}</span>
              </motion.button>
            ))}
          </motion.div>

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
