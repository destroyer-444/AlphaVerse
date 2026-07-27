"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { universalSearchService } from "@/services/universalSearchService";
import {
  UniversalSearchResult,
  SearchEntityType,
} from "@/types/search";

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

const ENTITY_ICON: Record<SearchEntityType, string> = {
  company:            "🏢",
  etf:                "📊",
  index:              "📈",
  crypto:             "₿",
  currency:           "💱",
  commodity:          "⚡",
  news:               "📰",
  market_intelligence:"🧠",
  economic_event:     "🗓️",
  portfolio:          "💼",
  watchlist:          "⭐",
  ai_chat:            "🤖",
  opportunity:        "🎯",
};

const ENTITY_BADGE: Record<SearchEntityType, string> = {
  company:            "bg-blue-500/20 text-blue-300 border-blue-500/25",
  etf:                "bg-violet-500/20 text-violet-300 border-violet-500/25",
  index:              "bg-emerald-500/20 text-emerald-300 border-emerald-500/25",
  crypto:             "bg-orange-500/20 text-orange-300 border-orange-500/25",
  currency:           "bg-cyan-500/20 text-cyan-300 border-cyan-500/25",
  commodity:          "bg-yellow-500/20 text-yellow-300 border-yellow-500/25",
  news:               "bg-purple-500/20 text-purple-300 border-purple-500/25",
  market_intelligence:"bg-pink-500/20 text-pink-300 border-pink-500/25",
  economic_event:     "bg-red-500/20 text-red-300 border-red-500/25",
  portfolio:          "bg-indigo-500/20 text-indigo-300 border-indigo-500/25",
  watchlist:          "bg-amber-500/20 text-amber-300 border-amber-500/25",
  ai_chat:            "bg-teal-500/20 text-teal-300 border-teal-500/25",
  opportunity:        "bg-lime-500/20 text-lime-300 border-lime-500/25",
};

const TYPE_LABEL: Record<SearchEntityType, string> = {
  company:            "Company",
  etf:                "ETF",
  index:              "Index",
  crypto:             "Crypto",
  currency:           "Currency",
  commodity:          "Commodity",
  news:               "News",
  market_intelligence:"Intelligence",
  economic_event:     "Economic Event",
  portfolio:          "Portfolio",
  watchlist:          "Watchlist",
  ai_chat:            "AI Chat",
  opportunity:        "Opportunity",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface UniversalSearchProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function UniversalSearch({ isOpen = false, onClose }: UniversalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UniversalSearchResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const reset = useCallback(() => {
    setQuery("");
    setResults([]);
    setTotalCount(0);
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    reset();
    onClose?.();
  }, [reset, onClose]);

  // Debounced search
  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setTotalCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let cancelled = false;

    const timer = setTimeout(() => {
      universalSearchService.search(query).then((response) => {
        if (!cancelled) {
          setResults(response.results);
          setTotalCount(response.totalCount);
          setDurationMs(response.durationMs);
          setSelectedIndex(0);
          setIsLoading(false);
        }
      }).catch(() => {
        if (!cancelled) setIsLoading(false);
      });
    }, 120); // 120ms debounce

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      router.push(results[selectedIndex].href);
      close();
    } else if (e.key === "Escape") {
      close();
    }
  };

  const handleResultClick = (result: UniversalSearchResult) => {
    router.push(result.href);
    close();
  };

  // Group results by their group label
  const grouped = results.reduce<Record<string, UniversalSearchResult[]>>(
    (acc, result) => {
      const g = result.group;
      if (!acc[g]) acc[g] = [];
      acc[g].push(result);
      return acc;
    },
    {}
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Search Modal */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.97 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-[#0d0d0f]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {/* Search Input Row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
          {isLoading ? (
            <svg
              className="w-5 h-5 text-blue-400 animate-spin shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search companies, ETFs, crypto, currencies, news…"
            className="flex-1 bg-transparent text-white text-base placeholder-zinc-500 focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {query.length > 0 && (
            <button
              onClick={reset}
              className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden sm:inline-flex px-2 py-1 bg-white/8 border border-white/10 rounded text-xs text-zinc-500 shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          <AnimatePresence mode="wait">
            {query.length === 0 ? (
              /* --- Empty state: quick actions --- */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4">
                  Quick Access
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Market Intelligence", href: "/intelligence", icon: "🧠" },
                    { label: "Companies", href: "/companies", icon: "🏢" },
                    { label: "News", href: "/news", icon: "📰" },
                    { label: "Markets", href: "/markets", icon: "📈" },
                  ].map((item) => (
                    <button
                      key={item.href}
                      onClick={() => { router.push(item.href); close(); }}
                      className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 rounded-xl transition-all text-left"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-zinc-300 font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : results.length === 0 && !isLoading ? (
              /* --- No results --- */
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 text-center"
              >
                <p className="text-zinc-400 text-lg mb-1">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-zinc-600 text-sm">Try a ticker, company name, or topic like &ldquo;Fed&rdquo; or &ldquo;Oil&rdquo;</p>
              </motion.div>
            ) : (
              /* --- Grouped results --- */
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-2 pb-3"
              >
                {/* Flat index for keyboard selection across groups */}
                {(() => {
                  let flatIdx = 0;
                  return Object.entries(grouped).map(([group, items]) => (
                    <div key={group} className="mb-1">
                      {/* Group label */}
                      <div className="px-4 py-1.5 flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          {group}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-medium">
                          {items.length}
                        </span>
                      </div>

                      {/* Results in this group */}
                      {items.map((result) => {
                        const currentFlatIdx = flatIdx++;
                        const isSelected = currentFlatIdx === selectedIndex;
                        return (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.12, delay: Math.min(currentFlatIdx * 0.03, 0.2) }}
                            onClick={() => handleResultClick(result)}
                            onMouseEnter={() => setSelectedIndex(currentFlatIdx)}
                            className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all mx-1 mb-0.5 group ${
                              isSelected
                                ? "bg-white/10 border border-white/15"
                                : "border border-transparent hover:bg-white/5"
                            }`}
                          >
                            {/* Entity icon */}
                            <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white/8 border border-white/8 group-hover:bg-white/12 transition-colors">
                              <span className="text-base leading-none">
                                {ENTITY_ICON[result.type] ?? "🔍"}
                              </span>
                            </div>

                            {/* Title + Description */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-white text-sm font-semibold truncate leading-tight">
                                  {result.title}
                                </span>
                                {result.ticker && (
                                  <span className="text-[11px] text-zinc-400 font-mono shrink-0">
                                    {result.ticker}
                                  </span>
                                )}
                              </div>
                              <p className="text-zinc-500 text-xs truncate">{result.description}</p>
                            </div>

                            {/* Right side: live price + type badge */}
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              {result.livePrice && (
                                <span className="text-white text-sm font-bold leading-tight">
                                  {result.livePrice}
                                </span>
                              )}
                              {result.liveChange && (
                                <span className={`text-[11px] font-bold ${result.isPositive ? "text-green-400" : "text-red-400"}`}>
                                  {result.liveChange}
                                </span>
                              )}
                              {!result.livePrice && (
                                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${ENTITY_BADGE[result.type]}`}>
                                  {TYPE_LABEL[result.type]}
                                </span>
                              )}
                            </div>

                            {/* Arrow chevron */}
                            <svg
                              className={`w-4 h-4 shrink-0 transition-colors ${isSelected ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-400"}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        );
                      })}
                    </div>
                  ));
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer: stats + keyboard shortcuts */}
        <div className="px-5 py-2.5 border-t border-white/8 flex items-center justify-between text-zinc-600 text-xs shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-[10px]">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-[10px]">↵</kbd>
              open
            </span>
          </div>
          {query.length > 0 && !isLoading && (
            <span className="text-zinc-600">
              {results.length} of {totalCount} · {durationMs}ms
            </span>
          )}
          {query.length > 0 && isLoading && (
            <span className="text-zinc-600 animate-pulse">Searching…</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
