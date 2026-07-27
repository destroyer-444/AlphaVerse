"use client";

/**
 * HomeMacroIntelligence — Homepage Cross-Asset Influence Preview
 *
 * Guides users toward the Macro Intelligence Graph without overcrowding the homepage.
 */

import Link from "next/link";

export default function HomeMacroIntelligence() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-24">
      <div className="bg-gradient-to-r from-blue-950/30 via-black to-purple-950/30 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider">
            <span>🌐 Macro Intelligence Graph</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            See How Global Assets Influence One Another
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
            Markets do not move in isolation. AlphaVerse models cross-asset chain reactions in real time—tracking how central bank interest rates, semiconductor export restrictions, and energy supply shocks propagate across asset classes and individual equities.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 shrink-0 w-full md:w-auto">
          <Link
            href="/macro"
            className="w-full md:w-auto text-center px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-sm transition-all duration-200 shadow-xl hover:scale-105"
          >
            Open Macro Intelligence →
          </Link>
          <span className="text-[11px] text-zinc-500 font-mono">Live correlation matrix active</span>
        </div>
      </div>
    </section>
  );
}
