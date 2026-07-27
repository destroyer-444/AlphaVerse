"use client";

/**
 * PortfolioDashboard — AlphaVerse Premium Institutional UI
 *
 * Renders the Apple-inspired live Portfolio Intelligence workspace.
 * Zero business logic — consumes deterministic calculations from PortfolioEngineService.
 * Includes interactive tab navigation, visual allocation bars, health gauges, and empty onboarding states.
 */

import { useState } from "react";
import { Portfolio } from "@/types/portfolio";

interface PortfolioDashboardProps {
  portfolio: Portfolio;
}

export default function PortfolioDashboard({ portfolio }: PortfolioDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "holdings" | "health" | "risks" | "opportunities" | "timeline">("overview");
  const [allocationView, setAllocationView] = useState<"sectors" | "industries" | "countries" | "assetClasses">("sectors");

  const { summary, holdings, allocation, health, risks, opportunities, personalizedInsights, decisionSummary, timeline } = portfolio;
  const isPositiveChange = summary.dailyChange >= 0;
  const isPositiveReturn = summary.totalReturn >= 0;

  // Render Empty State Onboarding if no holdings exist
  if (holdings.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 mx-auto flex items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-3xl text-4xl mb-6 shadow-inner">
            📊
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-2">
            Institutional Workspace Onboarding
          </span>
          <h1 className="text-3xl font-bold text-white mb-3">Live Portfolio Intelligence</h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Your portfolio is not just a static watchlist. AlphaVerse continuously evaluates your equity and crypto
            allocations using 6 synchronized AI decision engines, risk shields, and macro graphs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Import Institutional Flagship Fund (Demo)
            </button>
            <a
              href="/companies"
              className="w-full sm:w-auto bg-white/10 text-white font-semibold px-6 py-3 rounded-full text-sm border border-white/15 hover:bg-white/20 transition-colors"
            >
              Explore Companies
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Page Header & Workspace Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl" aria-hidden="true">💎</span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Live Intelligence Workspace
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/15">
                PRO ACTIVE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {portfolio.name}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Synchronized multi-asset evaluation powered by 6 deterministic AI engines and EDGAR institutional feeds.
            </p>
          </div>

          {/* Decision Summary Pills */}
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto">
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {decisionSummary.strongBuy + decisionSummary.buy} Buy
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {decisionSummary.accumulate} Accumulate
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-zinc-500/20 text-zinc-300 border border-zinc-500/30">
              {decisionSummary.watch + decisionSummary.neutral} Watch
            </span>
            {(decisionSummary.reduce > 0 || decisionSummary.avoid > 0) && (
              <span className="px-2.5 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30">
                {decisionSummary.reduce + decisionSummary.avoid} Reduce
              </span>
            )}
          </div>
        </div>

        {/* Hero Section — 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Card 1: Total NAV Value */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-all shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">Total NAV Value</span>
            <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
              ${summary.totalValue.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${isPositiveChange ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                {isPositiveChange ? "▲" : "▼"} ${Math.abs(summary.dailyChange).toLocaleString()} ({isPositiveChange ? "+" : ""}{summary.dailyChangePercent}%)
              </span>
              <span className="text-zinc-500">Today</span>
            </div>
          </div>

          {/* Card 2: Total Return */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-all shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">Total All-Time Return</span>
            <div className={`text-3xl font-extrabold tracking-tight mb-2 ${isPositiveReturn ? "text-emerald-400" : "text-red-400"}`}>
              {isPositiveReturn ? "+" : "-"}${Math.abs(summary.totalReturn).toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <span className="text-white font-bold">{isPositiveReturn ? "+" : ""}{summary.totalReturnPercent}%</span>
              <span>vs Cost Basis</span>
            </div>
          </div>

          {/* Card 3: Portfolio Score (0-100) */}
          <div className="bg-gradient-to-br from-blue-600/15 via-white/[0.03] to-violet-600/15 backdrop-blur-xl border border-blue-500/25 rounded-3xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Portfolio Score</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {summary.overallRating}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-extrabold text-white tracking-tight">{summary.score.overall}</span>
              <span className="text-sm font-semibold text-zinc-400">/ 100</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-violet-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${summary.score.overall}%` }}
              />
            </div>
          </div>

          {/* Card 4: AI Confidence & Regime */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-all shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">AI Confidence & Regime</span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">{summary.confidence.value}%</span>
              <span className="text-xs font-bold text-zinc-300">({summary.confidence.level})</span>
            </div>
            <p className="text-xs text-zinc-400 truncate font-medium">
              Regime: <span className="text-white font-bold">{summary.marketRegime}</span>
            </p>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <nav
          role="tablist"
          aria-label="Portfolio sections"
          className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl mb-8 overflow-x-auto"
        >
          {[
            { id: "overview", label: "Overview & Allocation", icon: "📊" },
            { id: "holdings", label: `Live Holdings (${holdings.length})`, icon: "🏢" },
            { id: "health", label: "Diversification & Health", icon: "🛡️" },
            { id: "risks", label: `Risk Center (${risks.length})`, icon: "⚠️" },
            { id: "opportunities", label: `Opportunity Radar (${opportunities.length})`, icon: "🎯" },
            { id: "timeline", label: "Catalyst Timeline", icon: "🗓️" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white text-black shadow-lg scale-[1.02]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span aria-hidden="true">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ─── TAB 1: OVERVIEW & ALLOCATION ────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top 5 Things To Do (Personalized Insights) */}
            <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-white/[0.05] backdrop-blur-xl border border-white/12 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl" aria-hidden="true">💡</span>
                <h2 className="text-lg font-bold text-white tracking-tight">Personalized AI Action Insights</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 ml-auto">
                  Top 5 Things To Do
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalizedInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/40 border border-white/8 flex items-start gap-3 hover:border-white/20 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Allocation Section */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Asset & Sector Allocation</h2>
                  <p className="text-xs text-zinc-400">Institutional capital distribution across industries, regions, and market caps.</p>
                </div>
                {/* Allocation Toggle Buttons */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-semibold">
                  {(["sectors", "industries", "countries", "assetClasses"] as const).map((view) => (
                    <button
                      key={view}
                      onClick={() => setAllocationView(view)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                        allocationView === view ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stacked Allocation Progress Bar */}
              <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden flex mb-6 shadow-inner">
                {allocation[allocationView].map((item: any, i: number) => (
                  <div
                    key={i}
                    title={`${item.sector || item.name || item.country || item.label}: ${item.weight}%`}
                    style={{
                      width: `${item.weight}%`,
                      backgroundColor: item.color || ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ec4899", "#06b6d4"][i % 6],
                    }}
                    className="h-full transition-all duration-500 hover:opacity-80"
                  />
                ))}
              </div>

              {/* Allocation List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allocation[allocationView].map((item: any, i: number) => {
                  const label = item.sector || item.name || item.country || item.label;
                  const color = item.color || ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ec4899", "#06b6d4"][i % 6];
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-sm font-bold text-white truncate">{label}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-extrabold text-white block">{item.weight}%</span>
                        <span className="text-[10px] font-mono text-zinc-400">${item.value.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: LIVE HOLDINGS TABLE ───────────────────────────────────────── */}
        {activeTab === "holdings" && (
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl animate-fadeIn overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Live Evaluated Holdings</h2>
                <p className="text-xs text-zinc-400">Continuous AI evaluation, risk scoring, and consensus ratings per position.</p>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Sorted by NAV Weight • Total {holdings.length} Positions
              </span>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    <th className="pb-3 pr-4">Asset / Symbol</th>
                    <th className="pb-3 px-4">Weight %</th>
                    <th className="pb-3 px-4">Cost vs Price</th>
                    <th className="pb-3 px-4">Total Return</th>
                    <th className="pb-3 px-4">Decision Rating</th>
                    <th className="pb-3 px-4">AI Score</th>
                    <th className="pb-3 px-4">Risk</th>
                    <th className="pb-3 pl-4">Latest Catalyst</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6 text-sm font-medium">
                  {holdings.map((h) => {
                    const isPos = h.totalReturn >= 0;
                    return (
                      <tr key={h.symbol} className="hover:bg-white/[0.02] transition-colors group">
                        {/* Asset */}
                        <td className="py-4 pr-4">
                          <a href={`/companies/${h.symbol}`} className="flex items-center gap-3 group-hover:text-blue-400 transition-colors">
                            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-extrabold text-white text-xs shrink-0 shadow-sm">
                              {h.symbol.slice(0, 3)}
                            </div>
                            <div>
                              <div className="font-bold text-white flex items-center gap-1.5">
                                {h.symbol}
                                {h.metrics.aiExposure > 70 && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                                    AI LEADER
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-zinc-400 truncate max-w-[140px]">{h.name}</div>
                            </div>
                          </a>
                        </td>

                        {/* Weight */}
                        <td className="py-4 px-4 font-extrabold text-white">
                          {h.weight}%
                          <span className="block text-[10px] font-mono font-normal text-zinc-400">${h.totalValue.toLocaleString()}</span>
                        </td>

                        {/* Cost vs Price */}
                        <td className="py-4 px-4">
                          <span className="text-white font-bold">${h.currentPrice.toLocaleString()}</span>
                          <span className="block text-[10px] font-mono text-zinc-500">Cost: ${h.costBasis.toLocaleString()}</span>
                        </td>

                        {/* Return */}
                        <td className={`py-4 px-4 font-bold ${isPos ? "text-emerald-400" : "text-red-400"}`}>
                          {isPos ? "+" : ""}${Math.abs(h.totalReturn).toLocaleString()}
                          <span className="block text-[10px] font-mono">{isPos ? "+" : ""}{h.totalReturnPercent}%</span>
                        </td>

                        {/* Decision Rating Badge */}
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            h.decisionRating.includes("Buy") || h.decisionRating === "Accumulate"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : h.decisionRating.includes("Reduce") || h.decisionRating === "Avoid"
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}>
                            {h.decisionRating}
                          </span>
                        </td>

                        {/* Opportunity Score */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-white">{h.opportunityScore}</span>
                            <span className="text-[10px] text-zinc-500">/ 100</span>
                          </div>
                        </td>

                        {/* Risk Score */}
                        <td className="py-4 px-4">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            h.riskScore > 65 ? "text-red-300 bg-red-500/15" : h.riskScore > 40 ? "text-amber-300 bg-amber-500/15" : "text-emerald-300 bg-emerald-500/15"
                          }`}>
                            {h.riskScore}/100
                          </span>
                        </td>

                        {/* Catalyst */}
                        <td className="py-4 pl-4 max-w-[200px]">
                          {h.latestCatalyst ? (
                            <div>
                              <p className="text-xs font-semibold text-zinc-200 truncate">{h.latestCatalyst.title}</p>
                              <span className="text-[10px] font-mono text-zinc-500">{h.latestCatalyst.date}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-zinc-600 font-mono">No imminent catalyst</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── TAB 3: DIVERSIFICATION & HEALTH ──────────────────────────────────── */}
        {activeTab === "health" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Health & Risk Diagnostics</h2>
                  <p className="text-xs text-zinc-400">Institutional diversification metrics and macro regime stress shielding.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-400">Diversification Shield:</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Score {health.score} / 100
                  </span>
                </div>
              </div>

              {/* Health Gauges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Concentration Risk</span>
                  <div className="text-2xl font-extrabold text-amber-400">{health.concentrationRisk}</div>
                  <p className="text-xs text-zinc-400">
                    Top 3 holdings ({holdings.slice(0, 3).map(h => h.symbol).join(", ")}) account for <strong className="text-white">{health.top3HoldingsWeight}%</strong> of equity.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Sector Balance</span>
                  <div className="text-2xl font-extrabold text-blue-400">{health.sectorBalance}</div>
                  <p className="text-xs text-zinc-400">
                    Technology & Semiconductor exposure sits at <strong className="text-white">{health.techExposure}%</strong> of portfolio NAV.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Macro Regime Alignment</span>
                  <div className="text-2xl font-extrabold text-emerald-400">{health.macroAlignment}</div>
                  <p className="text-xs text-zinc-400">
                    Synchronized with global rate expansion cycles and enterprise cloud spending.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Generative AI Sensitivity</span>
                  <div className="text-2xl font-extrabold text-violet-400">{health.aiExposure}%</div>
                  <p className="text-xs text-zinc-400">
                    Weighted revenue exposure to AI compute infrastructure and enterprise software copilots.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Expected Volatility</span>
                  <div className="text-2xl font-extrabold text-amber-400">{health.expectedVolatility}</div>
                  <p className="text-xs text-zinc-400">
                    Beta of 1.24 relative to S&P 500 institutional benchmarks due to crypto and tech weights.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Liquidity Score</span>
                  <div className="text-2xl font-extrabold text-emerald-400">{health.liquidityScore} / 100</div>
                  <p className="text-xs text-zinc-400">
                    100% of holdings trade on major tier-1 institutional exchanges with ultra-low bid-ask spreads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: RISK CENTER ───────────────────────────────────────────────── */}
        {activeTab === "risks" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl" aria-hidden="true">⚠️</span>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Institutional Risk Center</h2>
                  <p className="text-xs text-zinc-400">Active stress vulnerabilities, probability assessments, and suggested mitigation actions.</p>
                </div>
              </div>

              <div className="space-y-4">
                {risks.map((risk) => (
                  <div key={risk.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 space-y-3 hover:border-white/15 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          risk.severity === "High" ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}>
                          {risk.severity} Severity
                        </span>
                        <h3 className="text-base font-bold text-white">{risk.title}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                        <span>Probability:</span>
                        <strong className="text-white">{risk.probability}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                      <strong className="text-zinc-400">Why:</strong> {risk.why}
                    </p>
                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                      <strong className="text-zinc-400">NAV Impact:</strong> {risk.impact}
                    </p>

                    <div className="pt-3 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                        <span aria-hidden="true">🛡️</span>
                        <span>Suggested Action: {risk.suggestedAction}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {risk.relatedSymbols.map((sym) => (
                          <span key={sym} className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-300 font-bold">
                            {sym}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 5: OPPORTUNITY RADAR ─────────────────────────────────────────── */}
        {activeTab === "opportunities" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl" aria-hidden="true">🎯</span>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Opportunity Center</h2>
                  <p className="text-xs text-zinc-400">High-conviction upside targets and valuation recovery candidates across your positions.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-col justify-between gap-4 hover:border-white/15 transition-all group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {opp.category}
                        </span>
                        <span className="text-sm font-extrabold text-emerald-400 font-mono">{opp.upsideTarget} Target</span>
                      </div>

                      <a href={`/companies/${opp.symbol}`} className="block group-hover:text-blue-400 transition-colors mb-2">
                        <h3 className="text-lg font-bold text-white">{opp.symbol} — {opp.companyName}</h3>
                      </a>
                      <p className="text-xs text-zinc-300 leading-relaxed font-medium">{opp.reason}</p>
                    </div>

                    <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {opp.rating}
                      </span>
                      <a href={`/companies/${opp.symbol}`} className="text-xs font-semibold text-blue-400 hover:underline">
                        View Decision Center →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 6: CATALYST TIMELINE ─────────────────────────────────────────── */}
        {activeTab === "timeline" && (
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl animate-fadeIn">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl" aria-hidden="true">🗓️</span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Catalyst Timeline</h2>
                <p className="text-xs text-zinc-400">Scheduled earnings releases, developer conferences, and macroeconomic announcements.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((group) => (
                <div key={group.timeframe} className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">{group.timeframe}</h3>
                    <span className="text-xs font-mono text-zinc-500">{group.items.length} Events</span>
                  </div>

                  <div className="space-y-3">
                    {group.items.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/6 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-mono">{item.symbol}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            item.impact === "High" ? "bg-red-500/20 text-red-300" : "bg-blue-500/20 text-blue-300"
                          }`}>
                            {item.impact}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-zinc-200 leading-tight">{item.title}</p>
                        <p className="text-[10px] font-mono text-zinc-500">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
