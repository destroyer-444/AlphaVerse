"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { newsService } from "@/services/newsService";

const nameToSymbol: Record<string, string> = {
  "NVIDIA": "NVDA",
  "Tesla": "TSLA",
  "Bitcoin": "BTC",
};

function linkCompanyNames(text: string): React.ReactNode {
  const parts = text.split(/(NVIDIA|Tesla|Bitcoin)/);
  return parts.map((part, index) => {
    if (nameToSymbol[part]) {
      return (
        <Link
          key={index}
          href={`/companies/${nameToSymbol[part]}`}
          className="text-white font-medium hover:text-blue-400 hover:underline transition-colors"
        >
          {part}
        </Link>
      );
    }
    return part;
  });
}

export default function MostRead() {
  const mostRead = newsService.getMostRead();
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Most Read</h3>
      <div className="space-y-3">
        {mostRead.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <p className="text-white text-sm font-medium leading-snug">{linkCompanyNames(article.title)}</p>
            <p className="text-zinc-500 text-xs mt-1">{article.time}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
