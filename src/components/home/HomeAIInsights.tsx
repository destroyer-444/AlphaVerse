"use client";

/**
 * HomeAIInsights — Homepage Important Level Intelligence Module
 *
 * Renders plain-language algorithmic takeaways explaining recent market actions
 * without overwhelming density. Emphasizes "Important" visual hierarchy.
 */

import Link from "next/link";
import AIInsightCard from "@/components/common/AIInsightCard";

export default function HomeAIInsights() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-20">
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
              Human-Language Translation • Important Priority
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Today&apos;s AI Insights
          </h2>
        </div>
        <Link
          href="/insights"
          className="text-xs font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
        >
          <span>View All Insights</span>
          <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AIInsightCard
          title="Semiconductor CapEx Guidance Raised"
          symbol="TSM"
          impact="Bullish"
          timestamp="20m ago"
          whatHappened="Taiwan Semiconductor raised 2026 capital expenditure guidance to $38B–$42B during its Q4 earnings call."
          whyItHappened="Hyperscale cloud providers (Microsoft, Amazon, Meta) are pre-booking 2nm and 3nm wafer capacity through 2027."
          actionableTakeaway="Equities supplying EUV lithography and advanced CoWoS packaging will benefit from sustained multi-year backlog visibility."
        />

        <AIInsightCard
          title="Yield Curve Disinversion Accelerates"
          category="Macro Pulse"
          impact="High Impact"
          timestamp="1h ago"
          whatHappened="The US 2-year / 10-year Treasury yield spread widened to +18 bps following stronger-than-expected retail sales data."
          whyItHappened="Fixed income markets are pricing out aggressive Fed rate cuts, shifting expectations toward a sustained neutral rate of 3.75%."
          actionableTakeaway="Rate-sensitive sectors (real estate, regional banking) face valuation headwinds compared to cash-flow positive mega-cap tech."
        />

        <AIInsightCard
          title="Sovereign AI Compute Mandates"
          symbol="ASML"
          impact="Bullish"
          timestamp="3h ago"
          whatHappened="The European Union announced a €15B sovereign AI infrastructure funding initiative to build domestic supercomputing clusters."
          whyItHappened="European governments are seeking technological independence from US hyperscalers for critical national defense and healthcare AI workloads."
          actionableTakeaway="Provides a structural non-US demand buffer for hardware vendors even if North American enterprise IT spend moderates."
        />
      </div>
    </section>
  );
}
