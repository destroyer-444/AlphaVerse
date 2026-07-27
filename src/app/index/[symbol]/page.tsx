import React from "react";
import Link from "next/link";

export default async function IndexPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const decodedSymbol = decodeURIComponent(symbol);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            &larr; Back to Companies
          </Link>
        </div>
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            Index Intelligence
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {decodedSymbol}
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8">
            Macroeconomic benchmark tracking, constituent weighting analysis, and real-time index signals are coming soon to AlphaVerse.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-zinc-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
