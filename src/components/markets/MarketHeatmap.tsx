"use client";

import { motion } from "framer-motion";

const sectors = [
  { name: "Technology", change: 2.5, status: "positive" },
  { name: "Finance", change: 1.2, status: "positive" },
  { name: "Energy", change: -0.8, status: "negative" },
  { name: "Healthcare", change: 0.5, status: "positive" },
  { name: "Consumer", change: -0.3, status: "negative" },
  { name: "Industrials", change: 0.8, status: "positive" },
  { name: "Utilities", change: 0.1, status: "positive" },
  { name: "Real Estate", change: -0.5, status: "negative" },
];

export default function MarketHeatmap() {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Market Heatmap</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sectors.map((sector, index) => (
          <motion.div
            key={sector.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-xl ${
              sector.status === "positive"
                ? "bg-green-500/20 border border-green-500/30"
                : sector.status === "negative"
                ? "bg-red-500/20 border border-red-500/30"
                : "bg-zinc-500/20 border border-zinc-500/30"
            }`}
          >
            <p className="text-white font-medium text-sm mb-1">{sector.name}</p>
            <p className={`text-sm font-semibold ${
              sector.status === "positive" ? "text-green-400" : 
              sector.status === "negative" ? "text-red-400" : "text-zinc-400"
            }`}>
              {sector.change > 0 ? "+" : ""}{sector.change}%
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
