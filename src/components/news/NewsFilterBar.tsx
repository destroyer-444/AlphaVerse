"use client";

import { motion } from "framer-motion";
import { newsCategories } from "@/data/news";

export default function NewsFilterBar() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-2xl">
        <input
          type="text"
          placeholder="Search companies, sectors or news..."
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

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {newsCategories.map((category, index) => (
          <motion.button
            key={category.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 hover:border-white/20 transition-all"
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
