"use client";

/**
 * WhyThisMatters — AlphaVerse Reusable Significance Pattern
 *
 * Embeds inside critical and important cards to explain complex financial
 * events in simple, human-readable terms. Prioritizes progressive disclosure
 * and calm typography.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface WhyThisMattersProps {
  reason: string;
  defaultOpen?: boolean;
  variant?: "inline" | "card" | "banner";
  title?: string;
}

export default function WhyThisMatters({
  reason,
  defaultOpen = false,
  variant = "inline",
  title = "Why This Matters Today",
}: WhyThisMattersProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (variant === "card") {
    return (
      <div className="bg-black/50 border border-white/10 rounded-2xl p-4 mt-3 backdrop-blur-md">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{title}</span>
        </div>
        <p className="text-zinc-300 text-xs leading-relaxed font-light">
          {reason}
        </p>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-xl p-3.5 mt-3 flex items-start gap-3">
        <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
          ℹ
        </div>
        <div>
          <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[10px] mb-0.5">
            {title}
          </span>
          <p className="text-zinc-300 text-xs leading-snug font-light">
            {reason}
          </p>
        </div>
      </div>
    );
  }

  // Inline collapsible variant for progressive disclosure
  return (
    <div className="mt-2.5 pt-2.5 border-t border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center gap-1.5 text-emerald-400/90 hover:text-emerald-300 font-semibold text-[11px] tracking-wide transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded px-1 -ml-1"
        aria-expanded={isOpen}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{title}</span>
        <span className="text-[9px] transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-zinc-300 text-xs leading-relaxed pt-2 pl-5 border-l-2 border-emerald-500/40 font-light mt-1.5">
              {reason}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
