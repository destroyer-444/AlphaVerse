"use client";

import { motion } from "framer-motion";
import { trendingTopics } from "@/data/news";

export default function TrendingTopics() {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Trending Topics</h3>
      <div className="flex flex-wrap gap-2">
        {trendingTopics.map((topic, index) => (
          <motion.button
            key={topic.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-white/10 hover:border-white/20 transition-all"
          >
            {topic.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
