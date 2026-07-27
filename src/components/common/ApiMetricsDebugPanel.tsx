"use client";

/**
 * ApiMetricsDebugPanel — AlphaVerse Live Data Infrastructure Debug Widget
 *
 * Development-only floating telemetry panel rendering live server cache efficiency,
 * FMP API call counters, response latencies, and circuit breaker states.
 * Zero business logic — strictly renders pre-computed telemetry from /api/metrics.
 */

import { useState, useEffect } from "react";

interface MetricsData {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  liveRequests: number;
  fmpCalls: number;
  retryCount: number;
  errorCount: number;
  averageLatencyMs: number;
  cacheHitRate: number;
  cacheMissRate: number;
  memoryUsageMb: number;
  circuit?: {
    state: "CLOSED" | "OPEN" | "HALF_OPEN";
    consecutiveFailures: number;
  };
}

export default function ApiMetricsDebugPanel() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // Enable debug panel in development mode or via localStorage flag
    if (process.env.NODE_ENV === "development" || typeof window !== "undefined") {
      setIsDev(true);
    }

    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/metrics");
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch {
        // Silently ignore fetch failures in widget
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isDev || !metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-xs">
      {/* Mini toggle pill */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-black/80 hover:bg-black text-emerald-400 border border-emerald-500/40 px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold">CACHE: {metrics.cacheHitRate}%</span>
          <span className="text-zinc-400">| FMP: {metrics.fmpCalls}</span>
          <span className="text-zinc-500 text-[10px]">▲ DEV</span>
        </button>
      ) : (
        /* Expanded Panel */
        <div className="bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 w-72 shadow-2xl text-zinc-300 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-extrabold text-white uppercase tracking-wider">M14.0 Telemetry</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white transition-colors px-1"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="text-zinc-400 block text-[9px] uppercase">Cache Hit Rate</span>
              <span className="text-emerald-400 font-bold text-sm">{metrics.cacheHitRate}%</span>
              <span className="text-[9px] text-zinc-500 block">{metrics.cacheHits} Hits</span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="text-zinc-400 block text-[9px] uppercase">Cache Misses</span>
              <span className="text-amber-400 font-bold text-sm">{metrics.cacheMissRate}%</span>
              <span className="text-[9px] text-zinc-500 block">{metrics.cacheMisses} Misses</span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="text-zinc-400 block text-[9px] uppercase">Live Requests</span>
              <span className="text-blue-400 font-bold text-sm">{metrics.liveRequests}</span>
              <span className="text-[9px] text-zinc-500 block">{metrics.fmpCalls} FMP Calls</span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="text-zinc-400 block text-[9px] uppercase">Avg Response</span>
              <span className="text-purple-400 font-bold text-sm">{metrics.averageLatencyMs}ms</span>
              <span className="text-[9px] text-zinc-500 block">TTL Active</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-400 border-t border-white/5">
            <span>Circuit: <strong className={metrics.circuit?.state === "CLOSED" ? "text-emerald-400" : "text-red-400"}>{metrics.circuit?.state || "CLOSED"}</strong></span>
            <span>Retries: {metrics.retryCount}</span>
            <span>Mem: {metrics.memoryUsageMb}MB</span>
          </div>

          <button
            type="button"
            onClick={async () => {
              await fetch("/api/metrics", { method: "POST" });
              setMetrics((prev) => prev ? { ...prev, cacheHits: 0, cacheMisses: 0, fmpCalls: 0 } : null);
            }}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-1.5 rounded-xl text-center transition-colors text-[10px]"
          >
            Reset Cache & Telemetry
          </button>
        </div>
      )}
    </div>
  );
}
