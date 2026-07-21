"use client";

import { motion } from "framer-motion";
import { marketHeadlines } from "@/data/markets";

export default function MarketHeadlines() {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Latest Market Headlines</h3>
      <div className="space-y-3">
        {marketHeadlines.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <p className="text-white text-sm font-medium leading-snug">{item.title}</p>
            <p className="text-zinc-500 text-xs mt-1">{item.time}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
