"use client";

/**
 * AlertCenter — AlphaVerse Proactive Intelligence UI
 *
 * Renders the Apple-inspired proactive alert feed and Today's Intelligence Brief.
 * Zero business logic — consumes deterministic scoring and prioritization from IntelligenceAlertService.
 * Includes interactive filtering by severity, category, read status, and timeline groupings.
 */

import { useState, useMemo } from "react";
import { AlertCenterData, AlertSeverity, AlertCategory } from "@/types/alerts";

interface AlertCenterProps {
  initialData: AlertCenterData;
}

export default function AlertCenter({ initialData }: AlertCenterProps) {
  const [data, setData] = useState<AlertCenterData>(initialData);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Unread" | "Read">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"feed" | "timeline">("feed");

  const { summary, brief } = data;

  // Toggle read status in local UI state
  const toggleRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      alerts: prev.alerts.map((a) => (a.id === id ? { ...a, isRead: !a.isRead } : a)),
      summary: {
        ...prev.summary,
        unread: prev.alerts.reduce((cnt, a) => (a.id === id ? (!a.isRead ? cnt - 1 : cnt + 1) : !a.isRead ? cnt + 1 : cnt), 0),
      },
    }));
  };

  const markAllAsRead = () => {
    setData((prev) => ({
      ...prev,
      alerts: prev.alerts.map((a) => ({ ...a, isRead: true })),
      summary: { ...prev.summary, unread: 0 },
    }));
  };

  // Filtered alerts
  const filteredAlerts = useMemo(() => {
    return data.alerts.filter((alert) => {
      if (selectedSeverity !== "All" && alert.severity !== selectedSeverity) return false;
      if (selectedCategory !== "All" && alert.category !== selectedCategory) return false;
      if (selectedStatus === "Unread" && alert.isRead) return false;
      if (selectedStatus === "Read" && !alert.isRead) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = alert.title.toLowerCase().includes(q);
        const matchesSummary = alert.summary.toLowerCase().includes(q);
        const matchesSymbol = alert.affectedHoldings.some((h) => h.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesSymbol) return false;
      }
      return true;
    });
  }, [data.alerts, selectedSeverity, selectedCategory, selectedStatus, searchQuery]);

  const severityBadgeStyles: Record<AlertSeverity, string> = {
    Critical: "bg-red-500/20 text-red-300 border border-red-500/40 shadow-red-500/10",
    High: "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-amber-500/10",
    Medium: "bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-blue-500/10",
    Low: "bg-zinc-500/20 text-zinc-300 border border-zinc-500/40",
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 pb-24 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl" aria-hidden="true">🔔</span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Proactive Intelligence Platform
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/15">
                LIVE 7-ENGINE SCAN
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Intelligence Alert Center
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Continuous multi-engine monitoring across your portfolio, watchlists, macro regime shifts, and EDGAR feeds.
            </p>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto">
            <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span>{summary.critical + summary.high} High/Critical</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {summary.unread} Unread
            </span>
            {summary.unread > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* ─── SECTION 1: TODAY'S INTELLIGENCE BRIEF (SMART DIGEST) ─────────────── */}
        <div className="bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-white/[0.05] backdrop-blur-2xl border border-white/12 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-lg shadow-inner">
                ⚡
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-tight">Today&apos;s Intelligence Brief</h2>
                <p className="text-xs text-zinc-400">Executive daily digest synthesized across all AlphaVerse decision layers.</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 bg-black/40 px-3 py-1 rounded-full border border-white/5">
              Generated at {new Date(brief.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Brief Card 1: Top Opportunity */}
            <a
              href={brief.topOpportunity.href}
              className="p-4 rounded-2xl bg-black/40 border border-white/8 hover:border-emerald-500/40 transition-all group flex flex-col justify-between gap-3 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Top Opportunity</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {brief.topOpportunity.badgeText}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {brief.topOpportunity.title}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{brief.topOpportunity.subtitle}</p>
            </a>

            {/* Brief Card 2: Highest Risk */}
            <a
              href={brief.highestRisk.href}
              className="p-4 rounded-2xl bg-black/40 border border-white/8 hover:border-red-500/40 transition-all group flex flex-col justify-between gap-3 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Highest Risk</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    {brief.highestRisk.badgeText}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  {brief.highestRisk.title}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{brief.highestRisk.subtitle}</p>
            </a>

            {/* Brief Card 3: Key Catalyst */}
            <a
              href={brief.mostImportantCatalyst.href}
              className="p-4 rounded-2xl bg-black/40 border border-white/8 hover:border-amber-500/40 transition-all group flex flex-col justify-between gap-3 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Key Catalyst</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {brief.mostImportantCatalyst.badgeText}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  {brief.mostImportantCatalyst.title}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{brief.mostImportantCatalyst.subtitle}</p>
            </a>

            {/* Brief Card 4: Macro Summary */}
            <a
              href={brief.macroSummary.href}
              className="p-4 rounded-2xl bg-black/40 border border-white/8 hover:border-blue-500/40 transition-all group flex flex-col justify-between gap-3 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Macro Summary</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {brief.macroSummary.badgeText}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {brief.macroSummary.title}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{brief.macroSummary.subtitle}</p>
            </a>

            {/* Brief Card 5: Portfolio Health */}
            <a
              href={brief.portfolioHealth.href}
              className="p-4 rounded-2xl bg-black/40 border border-white/8 hover:border-white/30 transition-all group flex flex-col justify-between gap-3 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Portfolio Shield</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    brief.portfolioHealth.badgeColor === "emerald"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {brief.portfolioHealth.badgeText}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-white/80 transition-colors">
                  {brief.portfolioHealth.title}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{brief.portfolioHealth.subtitle}</p>
            </a>
          </div>
        </div>

        {/* ─── SECTION 2: INTERACTIVE FILTER TOOLBAR & SEARCH ───────────────────── */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-6 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts by ticker, title, or keyword..."
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle (Feed vs Timeline) */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <span className="text-xs font-bold text-zinc-400 mr-1">View:</span>
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode("feed")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "feed" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Priority Feed
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("timeline")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "timeline" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Timeline Groups
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills: Severity, Category, Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/8 text-xs font-semibold">
            {/* Severity Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-zinc-500 font-mono mr-1">Severity:</span>
              {(["All", "Critical", "High", "Medium", "Low"] as const).map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedSeverity === sev
                      ? "bg-white/20 text-white font-bold border border-white/30"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-zinc-500 font-mono mr-1">Category:</span>
              {(["All", "Portfolio", "Company", "Macro", "Catalyst", "Risk", "Opportunity"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "bg-white/20 text-white font-bold border border-white/30"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Read Status Filter */}
            <div className="flex items-center gap-1.5 ml-auto">
              {(["All", "Unread", "Read"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedStatus === st
                      ? "bg-blue-500 text-white font-bold shadow-md shadow-blue-500/20"
                      : "text-zinc-400 hover:text-white bg-black/30 border border-white/5"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── SECTION 3: ALERT FEED & TIMELINE RENDERING ───────────────────────── */}
        {filteredAlerts.length === 0 ? (
          /* Empty State Illustration */
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-12 sm:p-16 text-center max-w-xl mx-auto shadow-2xl my-12">
            <div className="w-20 h-20 mx-auto flex items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-3xl text-4xl mb-6 shadow-inner animate-bounce">
              🎉
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              All Clear Shield Active
            </span>
            <h2 className="text-2xl font-bold text-white mb-3">No Important Alerts Today</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Your portfolio concentration, macro alignment, and watchlist companies are operating within optimal institutional risk parameters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedSeverity("All");
                setSelectedCategory("All");
                setSelectedStatus("All");
                setSearchQuery("");
              }}
              className="bg-white text-black font-bold px-6 py-2.5 rounded-full text-xs hover:bg-zinc-200 transition-transform hover:scale-105"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "feed" ? (
          /* Standard Priority Feed View */
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onToggleRead={() => toggleRead(alert.id)} badgeStyles={severityBadgeStyles} />
            ))}
          </div>
        ) : (
          /* Timeline Groups View */
          <div className="space-y-8">
            {(["Today", "Tomorrow", "This Week", "Next Week", "This Month"] as const).map((timeframe) => {
              const timelineAlerts = filteredAlerts.filter((a) => a.timeline === timeframe);
              if (timelineAlerts.length === 0) return null;
              return (
                <div key={timeframe} className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-blue-400">{timeframe}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                      {timelineAlerts.length} {timelineAlerts.length === 1 ? "Alert" : "Alerts"}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {timelineAlerts.map((alert) => (
                      <AlertCard key={alert.id} alert={alert} onToggleRead={() => toggleRead(alert.id)} badgeStyles={severityBadgeStyles} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-component: Individual Alert Card ────────────────────────────────────

interface AlertCardProps {
  alert: any;
  onToggleRead: () => void;
  badgeStyles: Record<AlertSeverity, string>;
}

function AlertCard({ alert, onToggleRead, badgeStyles }: AlertCardProps) {
  return (
    <div
      className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        alert.isRead
          ? "bg-white/[0.015] border-white/6 opacity-75 hover:opacity-100"
          : "bg-white/[0.04] border-white/15 shadow-xl shadow-black/40 hover:border-white/25"
      }`}
    >
      {/* Unread indicator strip */}
      {!alert.isRead && (
        <span className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-violet-500" />
      )}

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        {/* Left header: Badges and Title */}
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${badgeStyles[alert.severity as AlertSeverity]}`}>
              {alert.severity} Severity
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-zinc-300 text-[10px] font-bold border border-white/10">
              {alert.category}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
              {alert.source}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">• {alert.timestamp}</span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
            {alert.title}
          </h3>
        </div>

        {/* Right header: Priority Score & Read Toggle */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Impact Score</span>
            <span className="text-base font-extrabold text-white">{alert.impactScore} / 100</span>
          </div>
          <button
            type="button"
            onClick={onToggleRead}
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {alert.isRead ? "Mark unread" : "Mark read ✓"}
          </button>
        </div>
      </div>

      {/* Summary Body */}
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium mb-4">
        {alert.summary}
      </p>

      {/* Reason Box */}
      {alert.reason && (
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/6 text-xs mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-zinc-500 font-mono mr-1.5 uppercase">Trigger Reason:</span>
            <strong className="text-zinc-200">{alert.reason.headline}</strong> — <span className="text-zinc-400">{alert.reason.detail}</span>
          </div>
          {alert.reason.triggerThreshold && (
            <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-blue-300 shrink-0 border border-white/10">
              Threshold: {alert.reason.triggerThreshold}
            </span>
          )}
        </div>
      )}

      {/* Footer: Affected Holdings & Action Button */}
      <div className="pt-4 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-zinc-400">Affected Assets:</span>
          {alert.affectedHoldings.length > 0 ? (
            alert.affectedHoldings.map((sym: string) => (
              <a
                key={sym}
                href={`/companies/${sym}`}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors border border-white/10"
              >
                ${sym}
              </a>
            ))
          ) : (
            <span className="text-xs font-mono text-zinc-500">Portfolio-Wide / Macro</span>
          )}
        </div>

        {/* Recommendation / Action Button */}
        {(alert.recommendation || alert.action) && (
          <div className="flex items-center gap-2 ml-auto">
            <a
              href={alert.recommendation?.action.href || alert.action?.href || "/portfolio"}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5 ${
                alert.severity === "Critical" || alert.severity === "High"
                  ? "bg-white text-black hover:bg-zinc-200 scale-102"
                  : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30"
              }`}
            >
              <span>{alert.recommendation?.action.label || alert.action?.label || "Explore Details →"}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
