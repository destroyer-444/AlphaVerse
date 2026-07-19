"use client";

import { motion } from "framer-motion";

interface NewsCardProps {
  headline: string;
  summary: string;
  time: string;
  category: string;
  impact: "Bullish" | "Bearish" | "Neutral";
}

export default function NewsCard({ headline, summary, time, category, impact }: NewsCardProps) {
  const impactColors = {
    Bullish: "bg-green-500/20 text-green-400",
    Bearish: "bg-red-500/20 text-red-400",
    Neutral: "bg-zinc-500/20 text-zinc-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all mb-4 last:mb-0"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-zinc-500 text-sm">{time}</span>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${impactColors[impact]}`}>
          {impact}
        </span>
      </div>
      
      <h3 className="text-white font-semibold mb-2 leading-snug">
        {headline}
      </h3>
      
      <p className="text-zinc-400 text-sm mb-3 leading-relaxed">
        {summary}
      </p>
      
      <span className="text-zinc-500 text-xs uppercase tracking-wider">
        {category}
      </span>
    </motion.div>
  );
}
