"use client";

import { motion } from "framer-motion";
import { regions } from "@/data/markets";

export default function RegionSelector() {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {regions.slice(0, 6).map((region, index) => (
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
    </div>
  );
}
