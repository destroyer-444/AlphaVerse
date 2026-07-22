"use client";

import { motion } from "framer-motion";
import { useMarketData } from "@/hooks/useMarketData";

export default function Currencies() {
  const currencies = useMarketData("currencies") ?? [];
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Currencies</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currencies.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <p className="text-white font-semibold mb-1">{item.name}</p>
            <p className="text-white text-sm font-bold">{item.price}</p>
            <p className={`text-xs font-semibold ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {item.change}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
