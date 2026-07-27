"use client";

/**
 * MacroDashboard — AlphaVerse Premium UI
 *
 * Renders the Macro Intelligence Graph engine.
 * Pure presentation — zero business logic.
 * Features an interactive SVG Relationship Graph where nodes and edges
 * highlight on hover/click, showing detailed correlation explanations.
 */

import { useState, useMemo } from "react";
import {
  MacroDashboardData,
  MacroNode,
  MacroEdge,
  MacroScenario,
  CrossAssetRelationship,
  MarketRegime,
} from "@/types/macro";

// ─── Color & Style Helpers ────────────────────────────────────────────────────

const REGIME_STYLES: Record<MarketRegime, { badge: string; text: string; dot: string }> = {
  "Risk-On":      { badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-400" },
  "Risk-Off":     { badge: "bg-red-500/15 text-red-300 border-red-500/20",         text: "text-red-400",     dot: "bg-red-400" },
  "Transitional": { badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",  text: "text-yellow-400",  dot: "bg-yellow-400" },
  "Inflationary": { badge: "bg-orange-500/15 text-orange-300 border-orange-500/20",  text: "text-orange-400",  dot: "bg-orange-400" },
  "Deflationary": { badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",      text: "text-cyan-400",    dot: "bg-cyan-400" },
};

const NODE_TYPE_ICONS: Record<string, string> = {
  index:     "📈",
  commodity: "⚡",
  currency:  "💱",
  rate:      "🏦",
  sector:    "🏢",
  theme:     "🤖",
  crypto:    "₿",
};

const NODE_TYPE_COLORS: Record<string, string> = {
  index:     "bg-blue-500/20 text-blue-300 border-blue-500/30",
  commodity: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  currency:  "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  rate:      "bg-purple-500/20 text-purple-300 border-purple-500/30",
  sector:    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  theme:     "bg-violet-500/20 text-violet-300 border-violet-500/30",
  crypto:    "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

function getEdgeColor(edge: MacroEdge, isSelected: boolean, isHovered: boolean): string {
  if (isSelected || isHovered) {
    if (edge.value > 0 || edge.type === "Positive Correlation") return "#4ade80"; // green-400
    if (edge.value < 0 || edge.type === "Negative Correlation") return "#f87171"; // red-400
    return "#60a5fa"; // blue-400
  }
  if (edge.value > 0 || edge.type === "Positive Correlation") return "rgba(74, 222, 128, 0.4)";
  if (edge.value < 0 || edge.type === "Negative Correlation") return "rgba(248, 113, 113, 0.4)";
  return "rgba(161, 161, 170, 0.35)"; // zinc-400
}

function getEdgeWidth(strength: string, isSelected: boolean, isHovered: boolean): number {
  const base = strength === "Strong" ? 2.5 : strength === "Moderate" ? 1.8 : 1.2;
  return isSelected || isHovered ? base * 1.6 : base;
}

// ─── SVG Interactive Graph ────────────────────────────────────────────────────

function RelationshipGraph({
  nodes,
  edges,
}: {
  nodes: MacroNode[];
  edges: MacroEdge[];
}) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("SPX");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  // Map nodes for fast coordinate lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, MacroNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Find active node (selected or hovered)
  const activeNodeId = hoveredNodeId || selectedNodeId;
  const activeNode = activeNodeId ? nodeMap.get(activeNodeId) : null;
  const activeEdge = hoveredEdgeId ? edges.find((e) => e.id === hoveredEdgeId) : null;

  // Determine which edges and nodes are connected to activeNode
  const connectedEdges = useMemo(() => {
    if (!activeNodeId) return new Set<string>();
    return new Set(
      edges
        .filter((e) => e.source === activeNodeId || e.target === activeNodeId)
        .map((e) => e.id)
    );
  }, [activeNodeId, edges]);

  const connectedNodes = useMemo(() => {
    if (!activeNodeId) return new Set<string>();
    const set = new Set<string>([activeNodeId]);
    edges.forEach((e) => {
      if (e.source === activeNodeId) set.add(e.target);
      if (e.target === activeNodeId) set.add(e.source);
    });
    return set;
  }, [activeNodeId, edges]);

  return (
    <div className="bg-[#0e0e11] border border-white/10 rounded-3xl p-6 lg:p-8 mb-12 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🕸️</span>
            <span>Global Macro Influence Graph</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Interactive map of cross-asset correlations, supply chain linkages, and rate sensitivities.
            Click any node to explore connections.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs bg-white/[0.04] px-4 py-2 rounded-2xl border border-white/8">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-green-400 rounded-full" />
            <span className="text-zinc-300">Positive / Bullish</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-red-400 rounded-full" />
            <span className="text-zinc-300">Negative / Inverse</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-400 rounded-full" />
            <span className="text-zinc-300">Structural / Supply</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* SVG Canvas (3 Cols on large screens) */}
        <div className="lg:col-span-3 bg-black/60 rounded-2xl border border-white/6 overflow-hidden relative min-h-[460px] flex items-center justify-center">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-auto max-h-[540px] select-none"
          >
            {/* Background grid lines */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="1000" height="600" fill="url(#grid)" />
            <circle cx="500" cy="300" r="350" fill="url(#glow)" pointerEvents="none" />

            {/* Render Edges */}
            {edges.map((edge) => {
              const src = nodeMap.get(edge.source);
              const tgt = nodeMap.get(edge.target);
              if (!src || !tgt) return null;

              const isConn = connectedEdges.has(edge.id);
              const isHov = hoveredEdgeId === edge.id;
              const color = getEdgeColor(edge, isConn, isHov);
              const width = getEdgeWidth(edge.strength, isConn, isHov);
              const opacity = !activeNodeId || isConn ? 1 : 0.15;

              return (
                <g key={edge.id} className="transition-opacity duration-300" style={{ opacity }}>
                  {/* Invisible hit-area line for easy hover */}
                  <line
                    x1={src.x} y1={src.y}
                    x2={tgt.x} y2={tgt.y}
                    stroke="transparent"
                    strokeWidth="16"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredEdgeId(edge.id)}
                    onMouseLeave={() => setHoveredEdgeId(null)}
                  />
                  {/* Visible edge */}
                  <line
                    x1={src.x} y1={src.y}
                    x2={tgt.x} y2={tgt.y}
                    stroke={color}
                    strokeWidth={width}
                    strokeDasharray={edge.type === "Supply Chain" ? "6,4" : undefined}
                    strokeLinecap="round"
                    className="pointer-events-none transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Render Nodes */}
            {nodes.map((node) => {
              const isSel = selectedNodeId === node.id;
              const isHov = hoveredNodeId === node.id;
              const isConn = connectedNodes.has(node.id);
              const opacity = !activeNodeId || isConn ? 1 : 0.25;

              const r = 20 + (node.importance - 6) * 2.5;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className="cursor-pointer transition-all duration-300 group"
                  style={{ opacity }}
                >
                  {/* Outer selection ring */}
                  {(isSel || isHov) && (
                    <circle
                      r={r + 6}
                      fill="none"
                      stroke={isSel ? "#60a5fa" : "rgba(255, 255, 255, 0.4)"}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-spin-slow"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    r={r}
                    className={`
                      transition-all duration-200
                      ${node.isPositive ? "fill-[#0a2f1c] stroke-green-500/60" : "fill-[#3a1014] stroke-red-500/60"}
                      ${isSel ? "!stroke-blue-400 stroke-[3px]" : "stroke-2"}
                      group-hover:scale-105
                    `}
                  />

                  {/* Icon */}
                  <text
                    textAnchor="middle"
                    dy="-3"
                    className="text-xs select-none pointer-events-none fill-white"
                  >
                    {NODE_TYPE_ICONS[node.type] ?? "📈"}
                  </text>

                  {/* Label */}
                  <text
                    textAnchor="middle"
                    dy="11"
                    className="text-[9px] font-bold fill-white select-none pointer-events-none tracking-tight"
                  >
                    {node.symbol || node.label.slice(0, 5)}
                  </text>

                  {/* Price/Change tooltip pill below node */}
                  <g transform={`translate(0, ${r + 14})`}>
                    <rect
                      x="-36" y="-8" width="72" height="16"
                      rx="8"
                      fill="rgba(15, 15, 20, 0.9)"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1"
                    />
                    <text
                      textAnchor="middle"
                      dy="3"
                      className={`text-[9px] font-bold select-none pointer-events-none ${node.isPositive ? "fill-green-400" : "fill-red-400"}`}
                    >
                      {node.change}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Detail Panel (1 Col on large screens) */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[460px]">
          {activeEdge ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                  Relationship Edge
                </span>
                <span className="text-xs font-bold text-zinc-400">{activeEdge.strength}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {activeEdge.source} ↔ {activeEdge.target}
              </h3>
              <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/15 mb-4">
                {activeEdge.type}
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {activeEdge.explanation}
              </p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/8">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">Correlation Coeff</span>
                <span className={`text-lg font-bold tabular-nums ${activeEdge.value >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {activeEdge.value > 0 ? `+${activeEdge.value}` : activeEdge.value}
                </span>
              </div>
            </div>
          ) : activeNode ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${NODE_TYPE_COLORS[activeNode.type] ?? ""}`}>
                  {activeNode.type}
                </span>
                <span className="text-xs text-zinc-500">Importance: {activeNode.importance}/10</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{activeNode.label}</h3>
              <p className="text-xs font-mono text-zinc-400 mb-4">{activeNode.symbol || activeNode.id}</p>

              <div className="flex items-baseline gap-3 mb-4 p-3 bg-white/5 rounded-xl border border-white/8">
                <span className="text-2xl font-bold text-white tabular-nums">{activeNode.value}</span>
                <span className={`text-sm font-bold tabular-nums ${activeNode.isPositive ? "text-green-400" : "text-red-400"}`}>
                  {activeNode.change}
                </span>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {activeNode.description}
              </p>

              {/* Connected edges list */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">
                  Connected Macro Factors ({connectedEdges.size})
                </span>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {edges
                    .filter((e) => e.source === activeNode.id || e.target === activeNode.id)
                    .map((e) => {
                      const otherId = e.source === activeNode.id ? e.target : e.source;
                      return (
                        <button
                          key={e.id}
                          onClick={() => setSelectedNodeId(otherId)}
                          onMouseEnter={() => setHoveredEdgeId(e.id)}
                          onMouseLeave={() => setHoveredEdgeId(null)}
                          className="w-full flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/10 border border-white/6 transition-colors text-left"
                        >
                          <span className="text-xs font-bold text-white">{otherId}</span>
                          <span className="text-[10px] text-zinc-400 truncate max-w-[120px]">{e.type}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <span className="text-3xl mb-3 opacity-30">👆</span>
              <p className="text-sm text-zinc-400">Select a node or edge on the graph to inspect macro transmission channels.</p>
            </div>
          )}

          <div className="pt-4 border-t border-white/8 mt-4 text-[11px] text-zinc-500 text-center">
            {activeNodeId ? `Showing transmission for ${activeNodeId}` : "Interactive Mode Active"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scenarios Section ────────────────────────────────────────────────────────

function ScenariosSection({ scenarios }: { scenarios: MacroScenario[] }) {
  const badgeStyles: Record<string, string> = {
    "Bull Case": "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    "Base Case": "bg-blue-500/15 text-blue-300 border-blue-500/25",
    "Bear Case": "bg-red-500/15 text-red-300 border-red-500/25",
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🔮</span>
            <span>Live Macro Scenarios</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Data-driven forward projections based on current yield curve slope, commodity flows, and sector momentum.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((sc) => (
          <div
            key={sc.type}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${badgeStyles[sc.type] ?? ""}`}>
                  {sc.type}
                </span>
                <span className="text-sm font-bold text-white font-mono">{sc.probability} Prob</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{sc.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-6">{sc.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Key Drivers</span>
                  <ul className="space-y-1">
                    {sc.keyDrivers.map((d, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/8 space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold text-emerald-400 mr-1">Favoring:</span>
                {sc.assetsFavoring.map((a) => (
                  <span key={a} className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold text-red-400 mr-1">At Risk:</span>
                {sc.assetsAtRisk.map((a) => (
                  <span key={a} className="text-[10px] bg-red-500/10 text-red-300 border border-red-500/20 px-2 py-0.5 rounded-md">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Cross Asset Grid Table ───────────────────────────────────────────────────

function CrossAssetGridSection({ grid }: { grid: CrossAssetRelationship[] }) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>⚡</span>
          <span>Cross-Asset Correlation Matrix</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Pairwise transmission linkages between equities, yields, commodities, and digital assets.
        </p>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02]">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-400">Asset Pair</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-400">Correlation</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-400">Strength</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-400">Macro Relationship</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6 text-sm">
              {grid.map((item, i) => (
                <tr key={i} className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-4 px-6 font-bold text-white whitespace-nowrap">
                    {item.source} <span className="text-zinc-500 font-normal mx-1">↔</span> {item.target}
                  </td>
                  <td className="py-4 px-6 font-mono font-bold whitespace-nowrap">
                    <span className={item.correlation >= 0 ? "text-green-400" : "text-red-400"}>
                      {item.correlation > 0 ? `+${item.correlation}` : item.correlation}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/8 text-zinc-300 border border-white/12">
                      {item.strength}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-zinc-300 text-xs leading-relaxed max-w-md">
                    {item.relationship}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Top Drivers & Watchlist ──────────────────────────────────────────────────

function DriversAndWatchlist({
  posDrivers,
  negDrivers,
  watchlist,
}: {
  posDrivers: string[];
  negDrivers: string[];
  watchlist: MacroDashboardData["watchlist"];
}) {
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">("today");
  const watchItems =
    activeTab === "today" ? watchlist.watchToday : activeTab === "week" ? watchlist.watchThisWeek : watchlist.watchThisMonth;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      {/* Top Drivers (2 cols) */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Positive Drivers */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h3 className="font-bold text-white">Top Positive Macro Drivers</h3>
          </div>
          <ul className="space-y-3">
            {posDrivers.map((d, i) => (
              <li key={i} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <span className="text-emerald-400 font-bold shrink-0">+{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Negative Drivers */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <h3 className="font-bold text-white">Top Negative Macro Drivers</h3>
          </div>
          <ul className="space-y-3">
            {negDrivers.map((d, i) => (
              <li key={i} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2.5 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                <span className="text-red-400 font-bold shrink-0">-{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Macro Watchlist (1 col) */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span>🗓️</span>
              <span>Macro Watchlist</span>
            </h3>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl mb-4 border border-white/6">
            {(["today", "week", "month"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  activeTab === tab ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab === "today" ? "Today" : tab === "week" ? "This Week" : "This Month"}
              </button>
            ))}
          </div>

          {/* List */}
          <ul className="space-y-2.5">
            {watchItems.map((item, i) => (
              <li key={i} className="text-xs text-zinc-300 p-3 rounded-xl bg-white/[0.02] border border-white/6 leading-snug flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-3 border-t border-white/6 text-[10px] text-zinc-500 text-center">
          Auto-synchronized with global central bank & economic calendars
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface MacroDashboardProps {
  data: MacroDashboardData;
}

export default function MacroDashboard({ data }: MacroDashboardProps) {
  const {
    overallScore,
    marketRegime,
    confidence,
    macroStory,
    nodes,
    edges,
    topPositiveDrivers,
    topNegativeDrivers,
    watchlist,
    scenarios,
    crossAssetGrid,
    generatedAt,
  } = data;

  const regime = REGIME_STYLES[marketRegime] ?? REGIME_STYLES["Risk-On"];

  let timeLabel = "Live";
  try {
    timeLabel = new Date(generatedAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {}

  return (
    <div className="min-h-screen px-4 sm:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🧠</span>
              <h1 className="text-3xl font-bold text-white tracking-tight">Macro Intelligence Graph</h1>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
              Central intelligence layer mapping how global equities, Treasury yields, commodities,
              currencies, and sector themes influence one another in real time.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
              </span>
              {nodes.length} macro factors mapped
            </span>
            <span>Updated {timeLabel}</span>
          </div>
        </div>

        {/* Hero Banner: Score + Regime + Story */}
        <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/12 rounded-3xl p-8 mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-violet-600/10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Score Panel (4 cols) */}
            <div className="lg:col-span-4 flex items-center justify-around sm:justify-start gap-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                  Global Macro Score
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white tabular-nums">{overallScore}</span>
                  <span className="text-zinc-500 text-sm">/100</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
                  Market Regime
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${regime.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${regime.dot}`} />
                  {marketRegime}
                </span>
              </div>
            </div>

            {/* Middle: Today's Macro Story (6 cols) */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Today&apos;s Macro Narrative
                </span>
              </div>
              <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                &ldquo;{macroStory}&rdquo;
              </p>
            </div>

            {/* Right: Confidence (2 cols) */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">Confidence</span>
                <span className="text-xs font-bold text-white">{confidence}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-blue-400 to-violet-400 rounded-full" style={{ width: `${confidence}%` }} />
              </div>
              <span className="text-[10px] text-zinc-500 text-center">Multi-asset convergence</span>
            </div>
          </div>
        </div>

        {/* Interactive Graph */}
        <RelationshipGraph nodes={nodes} edges={edges} />

        {/* Scenarios */}
        <ScenariosSection scenarios={scenarios} />

        {/* Cross Asset Grid */}
        <CrossAssetGridSection grid={crossAssetGrid} />

        {/* Top Drivers & Watchlist */}
        <DriversAndWatchlist
          posDrivers={topPositiveDrivers}
          negDrivers={topNegativeDrivers}
          watchlist={watchlist}
        />
      </div>
    </div>
  );
}
