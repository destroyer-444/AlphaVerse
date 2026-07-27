"use client";

/**
 * HomeOpportunityRadar — Homepage Algorithmic Discovery Preview
 *
 * Prompts users to explore AlphaVerse's signature Opportunity Radar.
 * Emphasizes clean white space and progressive disclosure.
 */

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeOpportunityRadar() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-20">
      <div className="bg-gradient-to-r from-emerald-950/40 via-black to-black border border-emerald-500/30 rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Background ambient glow */}
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
            <span>⚡ Signature Algorithmic Engine</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Opportunity Radar
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
            Instead of manually searching for stocks, AlphaVerse continuously scans 21 global institutions across 6 financial dimensions—identifying undervalued breakouts, earnings catalysts, and high-conviction asymmetric setups before the market reacts.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-zinc-400">
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">📈 Undervalued Growth</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">🔥 Earnings Breakouts</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">🛡️ Defensive Yield</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 shrink-0 relative z-10 w-full md:w-auto">
          <Link
            href="/opportunities"
            className="w-full md:w-auto text-center px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm transition-all duration-200 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:scale-105"
          >
            Launch Radar Workspace →
          </Link>
          <span className="text-[11px] text-zinc-500 font-mono">Live 60s algorithmic revalidation</span>
        </div>
      </div>
    </section>
  );
}
