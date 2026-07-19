"use client";

import { motion } from "framer-motion";

const filters = ["All", "Markets", "Economy", "Technology", "Crypto", "AI"];

export default function FilterBar() {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter, index) => (
        <motion.button
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 hover:border-white/20 transition-all"
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
}
