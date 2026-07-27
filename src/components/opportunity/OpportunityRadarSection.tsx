"use client";

/**
 * OpportunityRadarSection — AlphaVerse Premium UI
 *
 * Renders the full Opportunity Radar page content.
 * Pure rendering — zero business logic.
 * Receives RadarResult from the server page and renders sections + cards.
 */

import { useState, memo } from "react";
import Link from "next/link";
import { RadarResult, Opportunity, RadarSection, OpportunityRisk } from "@/types/opportunity";
import PageHero from "@/components/common/PageHero";

// ─── Color Helpers ────────────────────────────────────────────────────────────

const RISK_STYLES: Record<OpportunityRisk, { badge: string; dot: string }> = {
  Low:    { badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20", dot: "bg-emerald-400" },
  Medium: { badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",   dot: "bg-yellow-400" },
  High:   { badge: "bg-red-500/15 text-red-300 border-red-500/20",            dot: "bg-red-400" },
};

const SCORE_BAR_COLOR = (v: number) => {
  if (v >= 70) return "bg-emerald-400";
  if (v >= 50) return "bg-yellow-400";
  return "bg-red-400";
};

const CATEGORY_COLORS: Record<string, string> = {
  "AI Leader":        "bg-violet-500/20 text-violet-300 border-violet-500/20",
  "Semiconductor":    "bg-blue-500/20 text-blue-300 border-blue-500/20",
  "High Growth":      "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
  "Undervalued":      "bg-cyan-500/20 text-cyan-300 border-cyan-500/20",
  "Momentum Leader":  "bg-orange-500/20 text-orange-300 border-orange-500/20",
  "Cloud":            "bg-sky-500/20 text-sky-300 border-sky-500/20",
  "EV Leader":        "bg-lime-500/20 text-lime-300 border-lime-500/20",
  "Low Risk":         "bg-green-500/20 text-green-300 border-green-500/20",
  "Strong Earnings":  "bg-amber-500/20 text-amber-300 border-amber-500/20",
  "Industrials":      "bg-zinc-500/20 text-zinc-300 border-zinc-500/20",
  "Aerospace":        "bg-indigo-500/20 text-indigo-300 border-indigo-500/20",
  "Global Blue Chip": "bg-purple-500/20 text-purple-300 border-purple-500/20",
  "Consumer Tech":    "bg-pink-500/20 text-pink-300 border-pink-500/20",
  "High Cash Flow":   "bg-teal-500/20 text-teal-300 border-teal-500/20",
  "Emerging Trend":   "bg-rose-500/20 text-rose-300 border-rose-500/20",
};

const defaultCategoryColor = "bg-zinc-500/20 text-zinc-300 border-zinc-500/20";

// ─── Score Ring (SVG) ─────────────────────────────────────────────────────────

function ScoreRing({ value, size = 56 }: { value: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;
  const color = value >= 70 ? "#34d399" : value >= 50 ? "#facc15" : "#f87171";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.07)" strokeWidth={5} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={5} fill="none"
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Opportunity Card ─────────────────────────────────────────────────────────

const OpportunityCard = memo(function OpportunityCard({
  opp,
  featured = false,
}: {
  opp: Opportunity;
  featured?: boolean;
}) {
  const risk = RISK_STYLES[opp.risk];

  return (
    <div
      className={`
        group relative bg-white/[0.03] hover:bg-white/[0.055] backdrop-blur-xl
        border hover:border-white/20 rounded-2xl transition-all duration-200
        hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
        flex flex-col overflow-hidden
        ${featured
          ? "border-white/15 p-7"
          : "border-white/10 p-5"
        }
      `}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Symbol badge */}
          <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-white/8 border border-white/10 rounded-xl">
            <span className="text-xs font-bold text-white">{opp.symbol.slice(0, 3)}</span>
          </div>
          <div className="min-w-0">
            <h3 className={`font-bold text-white truncate leading-tight ${featured ? "text-lg" : "text-sm"}`}>
              {opp.companyName}
            </h3>
            <p className="text-xs text-zinc-500 truncate">{opp.sector}</p>
          </div>
        </div>

        {/* Score ring */}
        <div className="relative shrink-0">
          <ScoreRing value={opp.score.composite} size={featured ? 60 : 50} />
          <span className={`absolute inset-0 flex items-center justify-center font-bold text-white rotate-90 ${featured ? "text-sm" : "text-xs"}`}>
            {opp.score.composite}
          </span>
        </div>
      </div>

      {/* Price + change */}
      <div className="flex items-end gap-3 mb-4">
        <span className={`font-bold text-white tabular-nums ${featured ? "text-2xl" : "text-lg"}`}>
          {opp.price}
        </span>
        <span className={`text-sm font-bold tabular-nums mb-0.5 ${opp.isPositive ? "text-green-400" : "text-red-400"}`}>
          {opp.changePercent}
        </span>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {opp.categories.slice(0, 3).map((cat) => (
          <span
            key={cat}
            className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[cat] ?? defaultCategoryColor}`}
          >
            {cat}
          </span>
        ))}
        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${risk.badge}`}>
          {opp.risk} Risk
        </span>
      </div>

      {/* Explanation */}
      <p className={`text-zinc-400 leading-relaxed mb-4 ${featured ? "text-sm" : "text-xs"} line-clamp-3`}>
        {opp.explanation}
      </p>

      {/* Score bars */}
      <div className="space-y-2 mb-4">
        {[
          { label: "Growth", value: opp.score.growth },
          { label: "Momentum", value: opp.score.momentum },
          { label: "Health", value: opp.score.financialHealth },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 w-14 shrink-0">{s.label}</span>
            <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${SCORE_BAR_COLOR(s.value)}`}
                style={{ width: `${s.value}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-400 tabular-nums w-6 text-right">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Catalyst */}
      <div className="flex items-start gap-2 mb-4 p-2.5 bg-white/[0.03] border border-white/6 rounded-xl">
        <span className="text-xs shrink-0 mt-0.5">⚡</span>
        <p className="text-xs text-zinc-400 line-clamp-2 leading-snug">{opp.latestCatalyst}</p>
      </div>

      {/* Confidence + Open */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500">Confidence</span>
          <div className="w-14 h-1 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${opp.confidence}%` }} />
          </div>
          <span className="text-[10px] text-zinc-400 tabular-nums">{opp.confidence}%</span>
        </div>

        <Link
          href={opp.href}
          className="
            inline-flex items-center gap-1.5 text-xs font-semibold text-white
            px-3 py-1.5 bg-white/10 hover:bg-white/18 border border-white/12 hover:border-white/22
            rounded-full transition-all duration-150 hover:-translate-y-px
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
          "
          aria-label={`Open ${opp.companyName} company page`}
        >
          Open
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
});

// ─── Hero — Today's Best Opportunity ─────────────────────────────────────────

function HeroOpportunity({ opp }: { opp: Opportunity }) {
  const risk = RISK_STYLES[opp.risk] ?? RISK_STYLES.Medium;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-950/40 via-white/[0.04] to-purple-950/30 border border-blue-500/30 rounded-3xl p-6 md:p-8 mb-12 shadow-[0_0_50px_rgba(59,130,246,0.12)]">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
              ⚡ #1 AI Ranked Opportunity
            </span>
            <span className="text-zinc-400 text-xs font-mono">{opp.sector}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{opp.symbol}</h2>
            <span className="text-lg md:text-xl text-zinc-400 font-light">{opp.companyName}</span>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
            {opp.explanation}
          </p>

          {/* Action */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={opp.href}
              className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              View Institutional Analysis →
            </Link>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
              <span className="text-zinc-400">Current Price:</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">{opp.price} ({opp.changePercent})</span>
            </div>
          </div>
        </div>

        {/* Right: Score panel */}
        <div className="w-full lg:w-72 shrink-0">
          {/* Score ring large */}
          <div className="flex flex-col items-center justify-center py-6 bg-white/[0.03] border border-white/8 rounded-2xl mb-4">
            <div className="relative mb-3">
              <ScoreRing value={opp.score.composite} size={80} />
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white rotate-90">
                {opp.score.composite}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Opportunity Score</p>
          </div>

          {/* Score breakdown */}
          <div className="space-y-3 mb-4">
            {opp.score.items.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-400">{s.label}</span>
                  <span className="text-xs font-bold text-white tabular-nums">{s.value}</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${SCORE_BAR_COLOR(s.value)}`} style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {opp.categories.slice(0, 4).map((cat) => (
              <span
                key={cat}
                className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full border ${CATEGORY_COLORS[cat] ?? defaultCategoryColor}`}
              >
                {cat}
              </span>
            ))}
            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full border ${risk.badge}`}>
              {opp.risk} Risk
            </span>
          </div>

          {/* Confidence */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-400">Confidence</span>
              <span className="text-xs font-bold text-white">{opp.confidence}%</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${opp.confidence}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section Tabs + Grid ──────────────────────────────────────────────────────

function SectionView({ sections }: { sections: RadarSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "top");
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  if (!active) return null;

  return (
    <div>
      {/* Tab bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            aria-selected={s.id === activeId}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
              border transition-all duration-150 shrink-0
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              ${s.id === activeId
                ? "bg-white text-black border-white"
                : "bg-white/6 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-zinc-200"
              }
            `}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
            <span className={`text-xs font-bold ${s.id === activeId ? "text-zinc-600" : "text-zinc-600"}`}>
              {s.opportunities.length}
            </span>
          </button>
        ))}
      </div>

      {/* Section description */}
      <p className="text-zinc-400 text-sm mb-6">{active.description}</p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {active.opportunities.map((opp, i) => (
          <OpportunityCard key={opp.symbol + i} opp={opp} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface OpportunityRadarSectionProps {
  radar: RadarResult;
}

export default function OpportunityRadarSection({ radar }: OpportunityRadarSectionProps) {
  const { topOpportunity, sections, totalScanned, generatedAt } = radar;

  // Format timestamp
  let timeLabel = "Live";
  try {
    timeLabel = new Date(generatedAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {}

  return (
    <div className="min-h-screen px-4 sm:px-6 pb-16 pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Hero Introduction Banner */}
        <PageHero
          title="Opportunity Radar"
          category="Proactive Alpha Discovery"
          summary="Continuous multi-factor scanning across 4,000+ equities to isolate asymmetric risk-reward setups."
          whyItMatters="Most investors discover breakouts after institutional capital has already entered; algorithmic radar identifies catalyst convergence early."
          howToUse={[
            "Examine the #1 AI Ranked Opportunity card for our highest-confidence breakout candidate of the session.",
            "Use the category tab buttons below to browse setups by sector, momentum leadership, or dividend yield.",
            "Click any card to view detailed price targets, stop-loss shields, and fundamental drivers.",
          ]}
          proTip="Combine high Opportunity Scores with Low Risk designations for core portfolio allocation candidates."
        />

        <div className="flex items-center justify-end gap-4 text-xs text-zinc-500 mb-8">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            {totalScanned} companies scanned
          </span>
          <span>Updated {timeLabel}</span>
        </div>

        {/* Hero */}
        {topOpportunity ? (
          <HeroOpportunity opp={topOpportunity} />
        ) : (
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-16 text-center mb-10">
            <div className="text-5xl mb-4 opacity-30">🎯</div>
            <h2 className="text-xl font-bold text-white mb-2">No Opportunities Available</h2>
            <p className="text-zinc-400 text-sm">
              The radar is scanning the market. Check back shortly or try refreshing the page.
            </p>
          </div>
        )}

        {/* Section tabs */}
        {sections.length > 0 ? (
          <SectionView sections={sections} />
        ) : (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-4 opacity-30">📊</div>
            <h2 className="text-lg font-bold text-white mb-2">Scanning Markets…</h2>
            <p className="text-zinc-500 text-sm">
              No opportunities match current filters. The radar refreshes every 5 minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
