"use client";

/**
 * PageHero — AlphaVerse Product Identity Introduction Banner
 *
 * An Apple-inspired frosted glass hero card designed for instant clarity.
 * Answers 3 fundamental questions within 10 seconds:
 * 1. What is this page?
 * 2. Why should I care?
 * 3. How should I use it?
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PageHeroProps {
  title: string;
  summary: string;
  whyItMatters: string;
  howToUse: string[];
  proTip?: string;
  category?: string;
}

export default function PageHero({
  title,
  summary,
  whyItMatters,
  howToUse,
  proTip,
  category = "Intelligence Module",
}: PageHeroProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 w-full mb-10 overflow-hidden bg-white/[0.03] hover:bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-2xl group"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/15 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/15 transition-all duration-500" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {category}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg mt-2 max-w-3xl leading-relaxed font-light">
            {summary}
          </p>
        </div>

        {/* Toggle details button for progressive disclosure */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start md:self-center shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label={isExpanded ? "Collapse introduction guide" : "Expand introduction guide"}
        >
          <span>{isExpanded ? "Hide Guide" : "Show Guide"}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block text-[10px]"
          >
            ▼
          </motion.span>
        </button>
      </div>

      {/* Expandable guide content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-2">
              {/* Column 1: Why it matters */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Why This Matters</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {whyItMatters}
                </p>
              </div>

              {/* Column 2: How to use */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>How To Use This Page</span>
                </div>
                <ul className="space-y-2">
                  {howToUse.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-snug">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro Tip Pill */}
            {proTip && (
              <div className="mt-6 flex items-center gap-3 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-200/90 font-medium">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  ★
                </div>
                <div>
                  <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px] mb-0.5">
                    Pro Tip
                  </span>
                  <span>{proTip}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
