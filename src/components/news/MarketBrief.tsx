"use client";

import { motion } from "framer-motion";
import { marketBrief } from "@/data/news";

export default function MarketBrief() {
  const colorStyles = {
    green: "bg-green-500/20 border-green-500/30",
    red: "bg-red-500/20 border-red-500/30",
    blue: "bg-blue-500/20 border-blue-500/30",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {marketBrief.map((brief, index) => (
        <motion.div
          key={brief.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`bg-white/[0.03] backdrop-blur-xl border rounded-2xl p-6 ${colorStyles[brief.color as keyof typeof colorStyles]}`}
        >
          <h3 className="text-lg font-bold text-white mb-4">{brief.title}</h3>
          <div className="space-y-2">
            {brief.items.map((item, i) => (
              <p key={i} className="text-zinc-300 text-sm">{item}</p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
