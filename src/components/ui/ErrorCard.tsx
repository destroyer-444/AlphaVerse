/**
 * AlphaVerse — ErrorCard Component
 * Premium error state for API failures.
 * Never shows raw error messages to users.
 */

import React from "react";

interface ErrorCardProps {
  title?: string;
  description?: string;
  /** Optional retry callback */
  onRetry?: () => void;
  /** Optional navigation href */
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export default function ErrorCard({
  title = "Unable to Load Data",
  description = "We couldn't retrieve this information right now. Please try again in a moment.",
  onRetry,
  backHref,
  backLabel = "Go Back",
  className = "",
}: ErrorCardProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        bg-white/[0.03] backdrop-blur-xl border border-red-500/20 rounded-2xl
        flex flex-col items-center text-center py-12 px-8
        ${className}
      `}
    >
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-2xl text-3xl mb-5">
        ⚠️
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mb-6">{description}</p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="
              inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              bg-red-500/15 hover:bg-red-500/25 border border-red-500/25 hover:border-red-500/40
              text-red-300 text-sm font-medium
              transition-all duration-200 hover:-translate-y-0.5
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
              active:scale-95
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        )}
        {backHref && (
          <a
            href={backHref}
            className="
              inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              bg-white/8 hover:bg-white/12 border border-white/12 hover:border-white/20
              text-zinc-300 text-sm font-medium
              transition-all duration-200 hover:-translate-y-0.5
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </a>
        )}
      </div>
    </div>
  );
}
