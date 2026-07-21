"use client";

import { motion } from "framer-motion";
import { marketSummary } from "@/data/markets";

export default function MarketSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Market Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketSummary.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
          >
            <p className="text-sm text-zinc-400 mb-2">{item.title}</p>
            <p className="text-lg font-semibold text-white mb-1">{item.value}</p>
            <p className={`text-sm font-medium ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {item.change}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
