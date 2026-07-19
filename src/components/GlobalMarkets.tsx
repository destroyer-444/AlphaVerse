"use client";

import { motion } from "framer-motion";
import MarketCard from "./MarketCard";
import RegionSelector from "./RegionSelector";
import SearchBar from "./SearchBar";
import MarketSummary from "./MarketSummary";

const markets = [
  { name: "NIFTY 50", flag: "🇮🇳", value: "26,120", change: "+0.72%", isPositive: true },
  { name: "SENSEX", flag: "🇮🇳", value: "85,430", change: "+0.61%", isPositive: true },
  { name: "NASDAQ", flag: "🇺🇸", value: "23,200", change: "-0.14%", isPositive: false },
  { name: "S&P 500", flag: "🇺🇸", value: "6,340", change: "+0.28%", isPositive: true },
  { name: "Nikkei 225", flag: "🇯🇵", value: "41,300", change: "+0.84%", isPositive: true },
  { name: "Hang Seng", flag: "🇭🇰", value: "24,510", change: "-0.42%", isPositive: false },
];

export default function GlobalMarkets() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Global Markets
          </h2>
          <p className="text-lg text-zinc-400">
            Track major indices across the world.
          </p>
        </motion.div>
        
        <RegionSelector />
        <SearchBar />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {markets.map((market, index) => (
            <motion.div
              key={market.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MarketCard
                name={market.name}
                flag={market.flag}
                value={market.value}
                change={market.change}
                isPositive={market.isPositive}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <MarketSummary />
      </div>
    </section>
  );
}
