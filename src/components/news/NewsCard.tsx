"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface NewsCardProps {
  headline: string;
  summary: string;
  category: string;
  time: string;
  impact: "Bullish" | "Bearish" | "Neutral";
}

const nameToSymbol: Record<string, string> = {
  "NVIDIA": "NVDA",
  "Apple": "AAPL",
  "Tesla": "TSLA",
  "Bitcoin": "BTC",
};

function linkCompanyNames(text: string): React.ReactNode {
  const parts = text.split(/(NVIDIA|Apple|Tesla|Bitcoin)/);
  return parts.map((part, index) => {
    if (nameToSymbol[part]) {
      return (
        <Link
          key={index}
          href={`/companies/${nameToSymbol[part]}`}
          className="text-white font-semibold hover:text-blue-400 hover:underline transition-colors"
        >
          {part}
        </Link>
      );
    }
    return part;
  });
}

export default function NewsCard({ headline, summary, category, time, impact }: NewsCardProps) {
  const impactColors = {
    Bullish: "bg-green-500/20 text-green-400",
    Bearish: "bg-red-500/20 text-red-400",
    Neutral: "bg-zinc-500/20 text-zinc-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-500 text-sm">{time}</span>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${impactColors[impact]}`}>
          {impact}
        </span>
      </div>
      
      <h3 className="text-white font-semibold mb-2 leading-snug">
        {linkCompanyNames(headline)}
      </h3>
      
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
        {linkCompanyNames(summary)}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">
          {category}
        </span>
        <button className="text-white text-sm font-medium hover:text-zinc-300 transition-colors flex items-center gap-1">
          Read More
          <svg
            className="w-3 h-3"
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
      </div>
    </motion.div>
  );
}
