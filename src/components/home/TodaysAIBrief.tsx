"use client";

/**
 * TodaysAIBrief — AlphaVerse Critical Information Hierarchy Header
 *
 * Designed as the primary entry point immediately below the hero.
 * Embodying the "Critical" visual hierarchy level with high contrast,
 * glowing borders, and clear, plain-language takeaways.
 * Answers: "What is happening across global markets right now?"
 */

import { motion } from "framer-motion";
import WhyThisMatters from "@/components/common/WhyThisMatters";

export default function TodaysAIBrief() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase">
              Live AI Synthesis • Critical Priority
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Today&apos;s AI Brief
          </h2>
        </div>
        <p className="text-zinc-400 text-xs md:text-sm max-w-md mt-2 md:mt-0 font-light leading-relaxed">
          Algorithmic distillation of global asset classes, macro signals, and institutional catalysts.
        </p>
      </div>

      {/* One Sentence AI Summary Banner (High-impact primary takeaway) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-black/80 border border-blue-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase font-bold">
              <span>⚡ Executive Summary</span>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400 font-bold">84% Model Confidence</span>
            </div>
            <p className="text-lg md:text-2xl font-bold text-white leading-snug">
              &ldquo;Global liquidity expansion is overpowering short-term inflation noise, driving institutional capital into US AI infrastructure and APAC semiconductor leaders.&rdquo;
            </p>
          </div>
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 bg-black/50 p-4 rounded-2xl border border-white/10 shrink-0">
            <span className="text-zinc-400 text-xs uppercase tracking-wider font-mono">Market Sentiment</span>
            <span className="text-emerald-400 font-extrabold text-2xl md:text-3xl tracking-tight flex items-center gap-1.5">
              <span>BULLISH</span>
              <span className="text-base">▲</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Grid of Critical Takeaway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Top Opportunity (Glowing Emerald Border) */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-black/60 hover:bg-black/80 border-2 border-emerald-500/40 hover:border-emerald-500/60 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                ★ Top Opportunity
              </span>
              <span className="text-white font-mono font-extrabold text-sm">$NVDA</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              Blackwell Data Center Acceleration
            </h3>
            <p className="text-zinc-300 text-xs leading-relaxed font-light mb-4">
              Supply chain telemetry indicates Q3 GPU shipments exceeding consensus by 14%. Sovereign AI clusters in Japan and Europe are absorbing excess capacity.
            </p>
          </div>
          <WhyThisMatters
            title="Why This Matters Today"
            reason="Represents the highest risk-adjusted upside in global equities over the next 60 days."
            variant="banner"
          />
        </motion.div>

        {/* Card 2: Top Risk (Glowing Rose Border) */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-black/60 hover:bg-black/80 border-2 border-rose-500/40 hover:border-rose-500/60 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_0_30px_rgba(244,63,94,0.1)] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                ⚠ Top Risk
              </span>
              <span className="text-rose-400 font-mono font-bold text-xs uppercase">Macro Signal</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              Stagflationary Energy Spikes
            </h3>
            <p className="text-zinc-300 text-xs leading-relaxed font-light mb-4">
              Geopolitical friction in the Strait of Hormuz could trigger a crude oil supply shock, elevating transportation costs and delaying central bank rate cuts.
            </p>
          </div>
          <WhyThisMatters
            title="Why This Matters Today"
            reason="A sustained $90+ Brent crude price would compress valuation multiples for non-AI growth tech."
            variant="banner"
          />
        </motion.div>

        {/* Card 3: Company To Watch & Upcoming Event */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                👁 Company To Watch
              </span>
              <span className="text-white font-mono font-extrabold text-sm">$PLTR</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              Palantir AIP Enterprise Adoption
            </h3>
            <p className="text-zinc-300 text-xs leading-relaxed font-light mb-4">
              Commercial deal velocity accelerating across US defense contractors and healthcare systems.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-zinc-400 text-[10px] font-mono uppercase block">Upcoming Catalyst</span>
              <span className="text-white text-xs font-bold">FOMC Rate Decision</span>
            </div>
            <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
              In 4 Days
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
