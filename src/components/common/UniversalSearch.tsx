"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { searchService, SearchResult } from "@/services/searchService";

interface UniversalSearchProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const categoryIcons: Record<string, string> = {
  company: "🏢",
  news: "📰",
  market: "📈",
  crypto: "₿",
  commodity: "💎",
};

const categoryColors: Record<string, string> = {
  company: "bg-blue-500/20 text-blue-400",
  news: "bg-purple-500/20 text-purple-400",
  market: "bg-green-500/20 text-green-400",
  crypto: "bg-orange-500/20 text-orange-400",
  commodity: "bg-yellow-500/20 text-yellow-400",
};

export default function UniversalSearch({ isOpen = false, onClose }: UniversalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 0) {
      let cancelled = false;

      searchService.searchAll(query).then((searchResults) => {
        if (!cancelled) {
          setResults(searchResults);
          setSelectedIndex(0);
        }
      });

      return () => {
        cancelled = true;
      };
    }

    setResults([]);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      router.push(results[selectedIndex].url);
      setQuery("");
      setResults([]);
      onClose?.();
    } else if (e.key === "Escape") {
      setQuery("");
      setResults([]);
      onClose?.();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setQuery("");
    setResults([]);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setQuery("");
          setResults([]);
          onClose?.();
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Search Modal */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Search Input */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-white/10">
          <svg
            className="w-6 h-6 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search companies, markets, news..."
            className="flex-1 bg-transparent text-white text-lg placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
            <span>to close</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {query.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-zinc-400 text-lg">Start typing to search...</p>
                <p className="text-zinc-600 text-sm mt-2">
                  Try searching for companies, markets, or news
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-zinc-400 text-lg">No results found</p>
                <p className="text-zinc-600 text-sm mt-2">
                  Try a different search term
                </p>
              </div>
            ) : (
              <div className="p-2">
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.05 }}
                    onClick={() => handleResultClick(result)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      index === selectedIndex
                        ? "bg-white/10 border border-white/20"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
                      <span className="text-xl">{categoryIcons[result.type] || "🔍"}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium truncate">{result.title}</h4>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            categoryColors[result.type] || "bg-zinc-500/20 text-zinc-400"
                          }`}
                        >
                          {result.type}
                        </span>
                      </div>
                      {result.subtitle && (
                        <p className="text-zinc-400 text-sm truncate">{result.subtitle}</p>
                      )}
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-5 h-5 text-zinc-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between text-zinc-500 text-sm">
          <div className="flex items-center gap-4">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs mr-1">↑↓</kbd>
              to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs mr-1">↵</kbd>
              to select
            </span>
          </div>
          <span>{results.length} results</span>
        </div>
      </motion.div>
    </div>
  );
}
