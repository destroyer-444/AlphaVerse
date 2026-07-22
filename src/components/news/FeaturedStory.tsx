"use client";

import { motion } from "framer-motion";
import { newsService } from "@/services/newsService";

export default function FeaturedStory() {
  const featuredStory = newsService.getFeaturedStory();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
    >
      <div className="flex items-center gap-2 mb-4">
        {featuredStory.badges.map((badge, index) => (
          <span
            key={index}
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              badge === "High Impact"
                ? "bg-red-500/20 text-red-400"
                : "bg-white/5 border border-white/10 text-zinc-300"
            }`}
          >
            {badge}
          </span>
        ))}
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
        {featuredStory.headline}
      </h2>
      
      <p className="text-zinc-400 text-lg mb-6 leading-relaxed max-w-4xl">
        {featuredStory.summary}
      </p>
      
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors">
          Read Full Analysis
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
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
