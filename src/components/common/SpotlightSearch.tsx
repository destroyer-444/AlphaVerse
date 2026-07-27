"use client";

/**
 * AlphaVerse — Universal Spotlight Search
 * Ctrl+K / Cmd+K opens. Esc closes.
 * Recent searches (localStorage). Popular quick-access when empty.
 * Grouped results, category badges, live prices, keyboard navigation.
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { universalSearchService } from "@/services/universalSearchService";
import { UniversalSearchResult, SearchEntityType } from "@/types/search";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_RECENT = 5;
const DEBOUNCE_MS = 110;
const LS_KEY = "av_recent_searches";

const POPULAR_SEARCHES = [
  { label: "NVIDIA", hint: "AI chips leader" },
  { label: "Apple", hint: "Consumer tech giant" },
  { label: "Bitcoin", hint: "Digital asset" },
  { label: "Oil", hint: "Energy commodity" },
  { label: "Fed", hint: "FOMC policy" },
  { label: "S&P 500", hint: "US benchmark index" },
];

const QUICK_LINKS = [
  { label: "Alerts", href: "/alerts", icon: "🔔" },
  { label: "Today's Brief", href: "/alerts", icon: "⚡" },
  { label: "Critical Alerts", href: "/alerts", icon: "🚨" },
  { label: "Portfolio", href: "/portfolio", icon: "💼" },
  { label: "My Holdings", href: "/portfolio", icon: "🏢" },
  { label: "Risk Center", href: "/portfolio", icon: "⚠️" },
  { label: "Profile", href: "/profile", icon: "👤" },
  { label: "Settings", href: "/profile", icon: "⚙️" },
  { label: "Dashboard", href: "/intelligence", icon: "📊" },
  { label: "Macro Graph", href: "/macro", icon: "🕸️" },
  { label: "Opportunity Radar", href: "/opportunities", icon: "🎯" },
];

// ─── Display Helpers ─────────────────────────────────────────────────────────

const ENTITY_ICON: Record<SearchEntityType, string> = {
  company:             "🏢",
  etf:                 "📊",
  index:               "📈",
  crypto:              "₿",
  currency:            "💱",
  commodity:           "⚡",
  news:                "📰",
  market_intelligence: "🧠",
  economic_event:      "🗓️",
  portfolio:           "💼",
  watchlist:           "⭐",
  ai_chat:             "🤖",
  opportunity:         "🎯",
};

const ENTITY_BADGE: Record<SearchEntityType, string> = {
  company:             "bg-blue-500/20 text-blue-300 border-blue-500/20",
  etf:                 "bg-violet-500/20 text-violet-300 border-violet-500/20",
  index:               "bg-emerald-500/20 text-emerald-300 border-emerald-500/20",
  crypto:              "bg-orange-500/20 text-orange-300 border-orange-500/20",
  currency:            "bg-cyan-500/20 text-cyan-300 border-cyan-500/20",
  commodity:           "bg-yellow-500/20 text-yellow-300 border-yellow-500/20",
  news:                "bg-purple-500/20 text-purple-300 border-purple-500/20",
  market_intelligence: "bg-pink-500/20 text-pink-300 border-pink-500/20",
  economic_event:      "bg-red-500/20 text-red-300 border-red-500/20",
  portfolio:           "bg-indigo-500/20 text-indigo-300 border-indigo-500/20",
  watchlist:           "bg-amber-500/20 text-amber-300 border-amber-500/20",
  ai_chat:             "bg-teal-500/20 text-teal-300 border-teal-500/20",
  opportunity:         "bg-lime-500/20 text-lime-300 border-lime-500/20",
};

const TYPE_LABEL: Record<SearchEntityType, string> = {
  company:             "Company",
  etf:                 "ETF",
  index:               "Index",
  crypto:              "Crypto",
  currency:            "Currency",
  commodity:           "Commodity",
  news:                "News",
  market_intelligence: "Intelligence",
  economic_event:      "Event",
  portfolio:           "Portfolio",
  watchlist:           "Watchlist",
  ai_chat:             "AI",
  opportunity:         "Opportunity",
};

// Highlight matching portion of text
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-blue-400/25 text-blue-200 rounded px-0.5 not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ─── Recent Searches Store ────────────────────────────────────────────────────

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecent(recents: string[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(recents));
  } catch {}
}

// ─── Component ────────────────────────────────────────────────────────────────

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UniversalSearchResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load recent on open
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(loadRecent());
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotalCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let cancelled = false;

    const timer = setTimeout(() => {
      universalSearchService.search(query).then((resp) => {
        if (!cancelled) {
          setResults(resp.results);
          setTotalCount(resp.totalCount);
          setDurationMs(resp.durationMs);
          setSelectedIndex(0);
          setIsLoading(false);
        }
      }).catch(() => {
        if (!cancelled) setIsLoading(false);
      });
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  // Flat results list for keyboard navigation (across all groups)
  const flatResults: UniversalSearchResult[] = useMemo(() => results, [results]);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  const navigate = useCallback(
    (href: string, label: string) => {
      // Save to recent
      const next = [label, ...recentSearches.filter((r) => r !== label)].slice(0, MAX_RECENT);
      setRecentSearches(next);
      saveRecent(next);
      router.push(href);
      close();
    },
    [recentSearches, router, close]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            navigate(flatResults[selectedIndex].href, flatResults[selectedIndex].title);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    },
    [flatResults, selectedIndex, navigate, close]
  );

  const clearRecent = useCallback(() => {
    setRecentSearches([]);
    saveRecent([]);
  }, []);

  // Group results by section label
  const grouped = useMemo(() => {
    const map = new Map<string, UniversalSearchResult[]>();
    for (const r of results) {
      if (!map.has(r.group)) map.set(r.group, []);
      map.get(r.group)!.push(r);
    }
    return map;
  }, [results]);

  // Compute flat index for each result (for keyboard highlight)
  const flatIndexMap = useMemo(() => {
    const m = new Map<string, number>();
    let i = 0;
    grouped.forEach((items) => {
      items.forEach((item) => { m.set(item.id, i++); });
    });
    return m;
  }, [grouped]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-[8vh]">
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
          className="absolute inset-0 bg-black/70 spotlight-backdrop"
          aria-hidden="true"
        />

        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.96, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Universal Search"
          className="
            relative w-full max-w-[640px]
            bg-[#111114]/98 backdrop-blur-2xl
            border border-white/12
            rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)]
            flex flex-col overflow-hidden
          "
          style={{ maxHeight: "min(640px, 80vh)" }}
        >
          {/* ── Search Input ─────────────────────────────────────────── */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 shrink-0">
            {/* Search / Loader icon */}
            {isLoading ? (
              <svg
                className="w-5 h-5 text-blue-400 animate-spin shrink-0"
                fill="none" viewBox="0 0 24 24"
              >
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search companies, ETFs, crypto, events…"
              aria-label="Search"
              aria-autocomplete="list"
              aria-expanded={results.length > 0}
              spellCheck={false}
              autoComplete="off"
              className="
                flex-1 bg-transparent text-white text-[15px] placeholder-zinc-600
                focus:outline-none leading-none
              "
            />

            {/* Clear / Kbd */}
            <div className="flex items-center gap-2 shrink-0">
              {query.length > 0 && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear"
                  className="text-zinc-600 hover:text-zinc-300 transition-colors p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-white/6 border border-white/10 rounded text-[10px] text-zinc-500 font-mono">
                ESC
              </kbd>
            </div>
          </div>

          {/* ── Results Area ─────────────────────────────────────────── */}
          <div
            ref={listRef}
            className="overflow-y-auto flex-1 overscroll-contain"
            role="listbox"
            aria-label="Search results"
          >
            <AnimatePresence mode="wait">
              {/* ── Empty state: recent + popular + quick links ── */}
              {query.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="p-3"
                >
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <section className="mb-4">
                      <div className="flex items-center justify-between px-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          Recent
                        </span>
                        <button
                          onClick={clearRecent}
                          className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors focus-visible:outline-none"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="space-y-0.5">
                        {recentSearches.map((r) => (
                          <button
                            key={r}
                            onClick={() => setQuery(r)}
                            className="
                              w-full flex items-center gap-3 px-3 py-2 rounded-xl
                              hover:bg-white/5 border border-transparent hover:border-white/8
                              transition-all text-left group
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                            "
                          >
                            <span className="text-base text-zinc-500 group-hover:text-zinc-400 transition-colors">🕐</span>
                            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{r}</span>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Popular Searches */}
                  <section className="mb-4">
                    <div className="px-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Popular
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {POPULAR_SEARCHES.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => setQuery(s.label)}
                          className="
                            flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                            hover:bg-white/6 border border-transparent hover:border-white/8
                            transition-all text-left group
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                          "
                        >
                          <span className="text-base">🔍</span>
                          <div className="min-w-0">
                            <p className="text-sm text-zinc-200 font-medium truncate group-hover:text-white transition-colors">
                              {s.label}
                            </p>
                            <p className="text-[10px] text-zinc-600 truncate">{s.hint}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Quick Links */}
                  <section>
                    <div className="px-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Quick Access
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {QUICK_LINKS.map((ql) => (
                        <button
                          key={ql.href}
                          onClick={() => navigate(ql.href, ql.label)}
                          className="
                            flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                            hover:bg-white/6 border border-transparent hover:border-white/8
                            transition-all text-left group
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                          "
                        >
                          <span className="text-base">{ql.icon}</span>
                          <span className="text-sm text-zinc-300 font-medium group-hover:text-white transition-colors">
                            {ql.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {/* ── No results ── */}
              {query.length > 0 && results.length === 0 && !isLoading && (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-14 text-center px-8"
                >
                  <div className="text-4xl mb-4 opacity-40">🔍</div>
                  <p className="text-white font-semibold mb-1">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Try a ticker symbol, company name, or topic like &ldquo;Fed&rdquo; or &ldquo;Oil&rdquo;
                  </p>
                </motion.div>
              )}

              {/* ── Grouped results ── */}
              {query.length > 0 && results.length > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="p-2 pb-3"
                >
                  {Array.from(grouped.entries()).map(([group, items]) => (
                    <section key={group} className="mb-1" aria-label={group}>
                      {/* Group header */}
                      <div className="flex items-center gap-2 px-3 py-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          {group}
                        </span>
                        <span className="text-[10px] text-zinc-700 font-medium">{items.length}</span>
                      </div>

                      {/* Results */}
                      {items.map((result) => {
                        const flatIdx = flatIndexMap.get(result.id) ?? 0;
                        const isSelected = flatIdx === selectedIndex;

                        return (
                          <motion.button
                            key={result.id}
                            data-idx={flatIdx}
                            role="option"
                            aria-selected={isSelected}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.1,
                              delay: Math.min(flatIdx * 0.025, 0.18),
                            }}
                            onClick={() => navigate(result.href, result.title)}
                            onMouseEnter={() => setSelectedIndex(flatIdx)}
                            className={`
                              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5
                              border transition-all duration-100 text-left group
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                              ${isSelected
                                ? "bg-white/9 border-white/12 shadow-sm"
                                : "border-transparent hover:bg-white/5 hover:border-white/8"
                              }
                            `}
                          >
                            {/* Entity icon */}
                            <div
                              className={`
                                w-9 h-9 shrink-0 flex items-center justify-center rounded-lg
                                border transition-colors
                                ${isSelected
                                  ? "bg-white/12 border-white/15"
                                  : "bg-white/6 border-white/8 group-hover:bg-white/10"
                                }
                              `}
                            >
                              <span className="text-base leading-none">
                                {ENTITY_ICON[result.type] ?? "🔍"}
                              </span>
                            </div>

                            {/* Title + desc */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[13px] font-semibold text-white truncate leading-snug">
                                  <Highlight text={result.title} query={query} />
                                </span>
                                {result.ticker && (
                                  <span className="text-[11px] text-zinc-500 font-mono shrink-0">
                                    {result.ticker}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-zinc-500 truncate leading-snug">
                                {result.description}
                              </p>
                            </div>

                            {/* Right: price or badge */}
                            <div className="flex flex-col items-end gap-0.5 shrink-0">
                              {result.livePrice ? (
                                <>
                                  <span className="text-[13px] font-bold text-white leading-tight tabular-nums">
                                    {result.livePrice}
                                  </span>
                                  {result.liveChange && (
                                    <span
                                      className={`text-[11px] font-bold leading-tight tabular-nums ${
                                        result.isPositive ? "text-green-400" : "text-red-400"
                                      }`}
                                    >
                                      {result.liveChange}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span
                                  className={`
                                    text-[10px] font-semibold uppercase px-2 py-0.5
                                    rounded-full border leading-snug
                                    ${ENTITY_BADGE[result.type]}
                                  `}
                                >
                                  {TYPE_LABEL[result.type]}
                                </span>
                              )}
                            </div>

                            {/* Chevron */}
                            <svg
                              className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                isSelected ? "text-zinc-400" : "text-zinc-700 group-hover:text-zinc-500"
                              }`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>
                        );
                      })}
                    </section>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Footer ───────────────────────────────────────────────── */}
          <div className="px-4 py-2 border-t border-white/6 flex items-center justify-between shrink-0 bg-white/[0.015]">
            <div className="flex items-center gap-3 text-[10px] text-zinc-600">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/8 border border-white/10 rounded font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/8 border border-white/10 rounded font-mono">↵</kbd>
                open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/8 border border-white/10 rounded font-mono">esc</kbd>
                close
              </span>
            </div>
            <div className="text-[10px] text-zinc-700 tabular-nums">
              {query.length > 0 && !isLoading && `${results.length}/${totalCount} · ${durationMs}ms`}
              {query.length > 0 && isLoading && (
                <span className="animate-pulse">Searching…</span>
              )}
              {query.length === 0 && (
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/8 border border-white/10 rounded font-mono text-zinc-600">⌘K</kbd>
                  to open
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
