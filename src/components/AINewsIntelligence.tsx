"use client";

import { motion } from "framer-motion";
import FeaturedArticle from "./FeaturedArticle";
import NewsCard from "./NewsCard";
import FilterBar from "./FilterBar";

const newsItems = [
  {
    headline: "Oil prices rise after Middle East tensions",
    summary: "Geopolitical concerns drive crude oil prices higher as supply disruptions loom.",
    time: "12 min ago",
    category: "Markets",
    impact: "Bullish" as const,
  },
  {
    headline: "Federal Reserve hints at stable interest rates",
    summary: "Central bank signals patience in monetary policy amid economic uncertainty.",
    time: "25 min ago",
    category: "Economy",
    impact: "Neutral" as const,
  },
  {
    headline: "Apple expands AI investments",
    summary: "Tech giant increases spending on artificial intelligence research and development.",
    time: "1 hour ago",
    category: "Technology",
    impact: "Bullish" as const,
  },
  {
    headline: "Tesla reports stronger deliveries",
    summary: "Electric vehicle maker exceeds expectations in quarterly delivery numbers.",
    time: "2 hours ago",
    category: "Technology",
    impact: "Bullish" as const,
  },
];

export default function AINewsIntelligence() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            AI News Intelligence
          </h2>
          <p className="text-lg text-zinc-400">
            AI summarizes the world's most important financial events in seconds.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Featured Article (65%) */}
          <div className="lg:col-span-2">
            <FeaturedArticle />
          </div>
          
          {/* Right Side - News Cards (35%) */}
          <div className="lg:col-span-1">
            <FilterBar />
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <motion.div
                  key={item.headline}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <NewsCard
                    headline={item.headline}
                    summary={item.summary}
                    time={item.time}
                    category={item.category}
                    impact={item.impact}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
