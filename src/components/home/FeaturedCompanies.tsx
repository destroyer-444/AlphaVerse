"use client";

/**
 * FeaturedCompanies — Homepage Institutional Equities Directory Preview
 *
 * Emphasizes clean density and direct navigation to detailed company profiles.
 */

import Link from "next/link";

const FEATURED = [
  { symbol: "NVDA", name: "NVIDIA Corporation", price: "$142.50", change: "+3.42%", up: true, sector: "Semiconductors" },
  { symbol: "AAPL", name: "Apple Inc.", price: "$231.20", change: "+1.15%", up: true, sector: "Consumer Electronics" },
  { symbol: "MSFT", name: "Microsoft Corporation", price: "$448.90", change: "-0.45%", up: false, sector: "Cloud & AI Software" },
  { symbol: "PLTR", name: "Palantir Technologies", price: "$78.40", change: "+6.82%", up: true, sector: "Defense & Big Data" },
  { symbol: "ASML", name: "ASML Holding N.V.", price: "$740.10", change: "+2.91%", up: true, sector: "EUV Lithography" },
  { symbol: "TSLA", name: "Tesla, Inc.", price: "$295.60", change: "-1.20%", up: false, sector: "EVs & Robotics" },
];

export default function FeaturedCompanies() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-20">
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              Equities Directory • Reference Priority
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Featured Global Companies
          </h2>
        </div>
        <Link
          href="/companies"
          className="text-xs font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
        >
          <span>Explore 21 Directory Equities</span>
          <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURED.map((c) => (
          <Link
            key={c.symbol}
            href={`/companies/${c.symbol}`}
            className="group block bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl p-5 backdrop-blur-xl transition-all shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-white font-mono font-extrabold text-lg tracking-tight group-hover:text-emerald-400 transition-colors">
                  ${c.symbol}
                </span>
                <p className="text-zinc-400 text-xs font-light truncate max-w-[180px]">
                  {c.name}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 font-mono text-[10px]">
                {c.sector}
              </span>
            </div>

            <div className="flex items-baseline justify-between border-t border-white/5 pt-3 font-mono">
              <span className="text-white font-bold text-base">{c.price}</span>
              <span className={`text-xs font-bold ${c.up ? "text-emerald-400" : "text-rose-400"}`}>
                {c.change}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
