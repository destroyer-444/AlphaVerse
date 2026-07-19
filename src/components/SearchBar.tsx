"use client";

import { motion } from "framer-motion";

export default function SearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mb-12"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search companies, indices, ETFs..."
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
    </motion.div>
  );
}
