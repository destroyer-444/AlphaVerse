"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Company } from "@/types/company";

interface CompetitorsProps {
  company: Company;
}

const competitorMap: Record<string, string[]> = {
  NVDA: ["AMD", "INTC"],
  AAPL: ["MSFT", "GOOGL"],
  MSFT: ["AAPL", "GOOGL"],
  GOOGL: ["MSFT", "META"],
  TSLA: ["F", "GM"],
  AMZN: ["META", "GOOGL"],
  META: ["GOOGL", "AAPL"],
  RELIANCE: ["TCS", "INFY"],
  TCS: ["INFY", "RELIANCE"],
  INFY: ["TCS", "RELIANCE"],
  INTC: ["AMD", "NVDA"],
  NKE: ["ADDYY", "ADIDAS"],
  TSM: ["ASML", "INTC"],
  AMD: ["INTC", "NVDA"],
  ASML: ["TSM", "AMD"],
  BA: ["AIR", "LMT"],
};

export default function Competitors({ company }: CompetitorsProps) {
  const competitorSymbols = competitorMap[company.symbol] || [];
  
  if (competitorSymbols.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Competitors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {competitorSymbols.map((symbol, index) => (
          <Link
            key={symbol}
            href={`/companies/${symbol}`}
            className="group"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
            >
              <p className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                {symbol}
              </p>
              <p className="text-zinc-400 text-sm">View Company</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
