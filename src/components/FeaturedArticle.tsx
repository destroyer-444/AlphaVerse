"use client";

import { motion } from "framer-motion";

export default function FeaturedArticle() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
          High Impact
        </span>
        <span className="text-zinc-500 text-sm">Featured</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
        NVIDIA reaches another record as AI spending accelerates.
      </h2>
      
      <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
        Technology companies continue increasing AI infrastructure spending, boosting semiconductor demand worldwide.
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-sm rounded-full">
          AI
        </span>
        <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-sm rounded-full">
          Semiconductors
        </span>
        <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-sm rounded-full">
          USA
        </span>
      </div>
      
      <button className="flex items-center gap-2 text-white font-medium hover:text-zinc-300 transition-colors">
        Read Analysis
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </motion.div>
  );
}
