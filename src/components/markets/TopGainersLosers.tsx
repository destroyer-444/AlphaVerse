"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMarketData } from "@/hooks/useMarketData";

const nameToSymbol: Record<string, string> = {
  "NVIDIA": "NVDA",
  "TSMC": "TSM",
  "ASML": "ASML",
  "Intel": "INTC",
  "Boeing": "BA",
  "Nike": "NKE",
};

export default function TopGainersLosers() {
  const topGainers = useMarketData("topGainers") ?? [];
  const topLosers = useMarketData("topLosers") ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Top Gainers
        </h3>
        <div className="space-y-3">
          {topGainers.map((stock, index) => (
            <Link key={stock.name} href={`/companies/${nameToSymbol[stock.name]}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div>
                  <span className="text-white font-medium hover:text-blue-400 hover:underline transition-colors">
                  {stock.name}
                  </span>
                  <p className="text-zinc-400 text-sm">{stock.price}</p>
                </div>
                <span className="text-green-400 font-semibold">{stock.change}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Top Losers
        </h3>
        <div className="space-y-3">
          {topLosers.map((stock, index) => (
            <Link key={stock.name} href={`/companies/${nameToSymbol[stock.name]}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div>
                  <span className="text-white font-medium hover:text-blue-400 hover:underline transition-colors">
                  {stock.name}
                  </span>
                  <p className="text-zinc-400 text-sm">{stock.price}</p>
                </div>
                <span className="text-red-400 font-semibold">{stock.change}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
