"use client";

/**
 * AIInsightCard — AlphaVerse Human-Language Intelligence Primitive
 *
 * Explains market moves and institutional signals in plain English:
 * 1. What happened?
 * 2. Why did it happen?
 * 3. Should you care? (Actionable takeaway)
 */

import { motion } from "framer-motion";
import WhyThisMatters from "@/components/common/WhyThisMatters";

export interface AIInsightCardProps {
  title: string;
  category?: string;
  whatHappened: string;
  whyItHappened: string;
  actionableTakeaway: string;
  timestamp?: string;
  symbol?: string;
  impact?: "Bullish" | "Bearish" | "Neutral" | "High Impact";
}

export default function AIInsightCard({
  title,
  category = "Market Pulse",
  whatHappened,
  whyItHappened,
  actionableTakeaway,
  timestamp = "Just now",
  symbol,
  impact = "High Impact",
}: AIInsightCardProps) {
  const getBadgeStyle = () => {
    switch (impact) {
      case "Bullish":
        return "bg-emerald-500/15 border-emerald-500/30 text-emerald-400";
      case "Bearish":
        return "bg-rose-500/15 border-rose-500/30 text-rose-400";
      case "Neutral":
        return "bg-blue-500/15 border-blue-500/30 text-blue-400";
      default:
        return "bg-purple-500/15 border-purple-500/30 text-purple-400";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-2xl p-5 backdrop-blur-xl transition-all shadow-lg flex flex-col justify-between"
    >
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle()}`}>
              {impact}
            </span>
            {symbol && (
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-mono text-xs font-bold">
                ${symbol}
              </span>
            )}
          </div>
          <span className="text-zinc-500 text-[11px]">{timestamp}</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base md:text-lg tracking-tight mb-3">
          {title}
        </h3>

        {/* What happened */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-light">
              <strong className="text-white font-semibold">What happened: </strong>
              {whatHappened}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-light">
              <strong className="text-white font-semibold">Why: </strong>
              {whyItHappened}
            </p>
          </div>
        </div>
      </div>

      {/* Reusable Why This Matters Today */}
      <WhyThisMatters
        reason={`Takeaway: ${actionableTakeaway}`}
        title="Should You Care?"
        variant="banner"
      />
    </motion.div>
  );
}
