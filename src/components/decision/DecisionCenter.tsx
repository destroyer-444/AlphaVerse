"use client";

/**
 * DecisionCenter — AlphaVerse Premium UI
 *
 * Renders the deterministic AI Decision Engine report.
 * Pure presentation — zero business logic. Zero chatbot.
 * Features an Apple-inspired Hero, Recommendation Badge, 7-Factor Score Breakdown,
 * Data-Driven Thesis, Why Now vs Why Not, Invalidation Shield, Timeline, and Scenarios.
 */

import { useState } from "react";
import { DecisionEngineReport, DecisionRating, DecisionScenario } from "@/types/decision";

const RATING_STYLES: Record<DecisionRating, { badge: string; text: string; glow: string; dot: string }> = {
  "Strong Buy": { badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40", text: "text-emerald-400", glow: "from-emerald-500/15 to-transparent", dot: "bg-emerald-400" },
  "Buy":        { badge: "bg-green-500/20 text-green-300 border-green-500/40",     text: "text-green-400",   glow: "from-green-500/15 to-transparent",   dot: "bg-green-400" },
  "Accumulate": { badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",        text: "text-cyan-400",    glow: "from-cyan-500/15 to-transparent",    dot: "bg-cyan-400" },
  "Watch":      { badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",        text: "text-blue-400",    glow: "from-blue-500/15 to-transparent",    dot: "bg-blue-400" },
  "Neutral":    { badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",  text: "text-yellow-400",  glow: "from-yellow-500/15 to-transparent",  dot: "bg-yellow-400" },
  "Reduce":     { badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",  text: "text-orange-400",  glow: "from-orange-500/15 to-transparent",  dot: "bg-orange-400" },
  "Avoid":      { badge: "bg-red-500/20 text-red-300 border-red-500/40",           text: "text-red-400",     glow: "from-red-500/15 to-transparent",     dot: "bg-red-400" },
};

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? "bg-emerald-400" : value >= 50 ? "bg-yellow-400" : "bg-red-400";
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-400 w-28 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-bold text-white tabular-nums w-8 text-right">{value}</span>
    </div>
  );
}

interface DecisionCenterProps {
  report: DecisionEngineReport;
}

export default function DecisionCenter({ report }: DecisionCenterProps) {
  const [activeTab, setActiveTab] = useState<"thesis" | "drivers" | "timeline">("thesis");

  const {
    symbol,
    companyName,
    rating,
    decisionScore,
    scoreBreakdown,
    confidence,
    investmentThesis,
    whyNow,
    whyNot,
    keyCatalysts,
    invalidationConditions,
    timeline,
    expectedDrivers,
    scenarios,
    signals,
    generatedAt,
  } = report;

  const style = RATING_STYLES[rating] ?? RATING_STYLES["Neutral"];

  let timeLabel = "Live";
  try {
    timeLabel = new Date(generatedAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {}

  return (
    <section className="mt-12 mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">🎯</span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              AlphaVerse AI Decision Engine
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Deterministic Investment Synthesis
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Synthesized across 7 real-time intelligence layers without random output or chatbot speculation.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
            </span>
            7-Layer Consensus
          </span>
          <span>Updated {timeLabel}</span>
        </div>
      </div>

      {/* Hero Banner: Recommendation + Score + Confidence */}
      <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/12 rounded-3xl p-6 md:p-8 mb-8 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${style.glow} pointer-events-none`} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Recommendation Badge (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
              AI Consensus Rating
            </span>
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-lg font-bold border ${style.badge}`}>
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${style.dot}`} />
                {rating}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Deterministic recommendation derived from live quote streaming, macro regime alignment, and fundamental health.
            </p>
          </div>

          {/* Middle: Decision Score & 7-Factor Breakdown (5 cols) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Composite Decision Score
              </span>
              <span className="text-xl font-bold text-white tabular-nums">{decisionScore} <span className="text-xs text-zinc-500">/ 100</span></span>
            </div>
            <div className="space-y-2">
              <ScoreBar label="Company Health" value={scoreBreakdown.companyIntelligence} />
              <ScoreBar label="Market Regime" value={scoreBreakdown.market} />
              <ScoreBar label="Macro Transmission" value={scoreBreakdown.macro} />
              <ScoreBar label="Technical Momentum" value={scoreBreakdown.momentum} />
            </div>
          </div>

          {/* Right: Confidence Meter (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Confidence Meter</span>
              <span className="text-xs font-bold text-white">{confidence.value}% ({confidence.level})</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-blue-400 to-violet-400 rounded-full" style={{ width: `${confidence.value}%` }} />
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              {confidence.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Signals Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {signals.map((sig) => (
          <div key={sig.label} className="bg-white/[0.02] border border-white/8 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 truncate">{sig.label}</span>
              <span className={`w-2 h-2 rounded-full shrink-0 ${sig.status === "Positive" ? "bg-emerald-400" : sig.status === "Neutral" ? "bg-yellow-400" : "bg-red-400"}`} />
            </div>
            <p className="text-base font-bold text-white mb-1 truncate">{sig.value}</p>
            <p className="text-[10px] text-zinc-500 truncate">{sig.description}</p>
          </div>
        ))}
      </div>

      {/* Tabs: Thesis / Drivers / Timeline */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("thesis")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${activeTab === "thesis" ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"}`}
          >
            📖 Investment Thesis
          </button>
          <button
            onClick={() => setActiveTab("drivers")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${activeTab === "drivers" ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"}`}
          >
            ⚙️ Expected Drivers
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${activeTab === "timeline" ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"}`}
          >
            ⏳ Execution Timeline
          </button>
        </div>

        {activeTab === "thesis" && (
          <div className="space-y-4">
            {investmentThesis.map((para, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/6">
                <span className="w-7 h-7 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  0{i + 1}
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed flex-1">{para}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "drivers" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-3">Macro Drivers</span>
              <ul className="space-y-2.5">
                {expectedDrivers.macro.map((d, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-3">Sector Drivers</span>
              <ul className="space-y-2.5">
                {expectedDrivers.sector.map((d, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/6">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-3">Company Drivers</span>
              <ul className="space-y-2.5">
                {expectedDrivers.company.map((d, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Next Week", desc: timeline.nextWeek, icon: "⚡" },
              { label: "Next Month", desc: timeline.nextMonth, icon: "🗓️" },
              { label: "Next Quarter", desc: timeline.nextQuarter, icon: "📊" },
              { label: "Next Year", desc: timeline.nextYear, icon: "🚀" },
            ].map((t) => (
              <div key={t.label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white">{t.label}</span>
                    <span className="text-sm">{t.icon}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two Columns: Why Now vs Why Not & Invalidation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: Why Now & Catalysts */}
        <div className="space-y-6">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Why Now? Top 5 Bullish Drivers</span>
            </h3>
            <ul className="space-y-3">
              {whyNow.map((reason, i) => (
                <li key={i} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <span className="text-emerald-400 font-bold shrink-0">+{i + 1}</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <span>⚡</span>
              <span>Key Fundamental Catalysts</span>
            </h3>
            <div className="space-y-3">
              {keyCatalysts.map((cat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/6 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">{cat.title}</h4>
                    </div>
                    <p className="text-xs text-zinc-400">{cat.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20 mb-1">
                      {cat.timeframe}
                    </span>
                    <p className="text-[10px] text-zinc-500">{cat.impact} Impact</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Why Not & Invalidation Conditions */}
        <div className="space-y-6">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span>Why Not? Top Operational Risks</span>
            </h3>
            <ul className="space-y-3">
              {whyNot.map((risk, i) => (
                <li key={i} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-3 p-3.5 rounded-2xl bg-red-500/5 border border-red-500/10">
                  <span className="text-red-400 font-bold shrink-0">-{i + 1}</span>
                  <div>
                    <span className="font-bold text-white block mb-0.5">{risk.title}</span>
                    <span>{risk.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-500/[0.03] backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🛡️</span>
              <h3 className="text-base font-bold text-red-300">Thesis Invalidation Conditions</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-5">
              Concrete, data-driven thresholds that would immediately trigger a downgrade or recommendation reversal.
            </p>
            <ul className="space-y-2.5">
              {invalidationConditions.map((cond, i) => (
                <li key={i} className="text-xs text-zinc-300 flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/15">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
          <span>🔮</span>
          <span>Deterministic Scenarios & Target Trajectories</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((sc) => {
            const badgeStyle =
              sc.type === "Bull Case" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" :
              sc.type === "Base Case" ? "bg-blue-500/15 text-blue-300 border-blue-500/25" :
              "bg-red-500/15 text-red-300 border-red-500/25";

            return (
              <div key={sc.type} className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${badgeStyle}`}>
                      {sc.type}
                    </span>
                    <span className="text-sm font-bold text-white font-mono">{sc.probability} Prob</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">{sc.title}</h4>
                  <p className="text-sm font-bold text-emerald-400 mb-3">Expected Return: {sc.expectedReturn}</p>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-5">{sc.description}</p>
                </div>
                <div className="pt-4 border-t border-white/6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Key Conditions</span>
                  <ul className="space-y-1.5">
                    {sc.keyConditions.map((cond, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
