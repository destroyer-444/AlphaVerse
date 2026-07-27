/**
 * AlphaVerse — EmptyState Component
 * Premium empty state for every section that may have no data.
 * Shows icon + title + description + optional action button.
 */

import React from "react";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function EmptyState({
  icon = "📭",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  size = "md",
  className = "",
}: EmptyStateProps) {
  const sizeStyles = {
    sm: { wrap: "py-8 px-6", icon: "text-3xl", title: "text-base", desc: "text-xs" },
    md: { wrap: "py-12 px-8", icon: "text-4xl", title: "text-lg",  desc: "text-sm" },
    lg: { wrap: "py-16 px-8", icon: "text-5xl", title: "text-2xl", desc: "text-base" },
  }[size];

  const hasAction = actionLabel && (actionHref || onAction);

  return (
    <div
      role="status"
      aria-label={title}
      className={`
        bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-2xl
        flex flex-col items-center text-center
        ${sizeStyles.wrap} ${className}
      `}
    >
      {/* Icon */}
      <div
        className={`
          ${sizeStyles.icon} mb-4 w-16 h-16 flex items-center justify-center
          bg-white/5 border border-white/8 rounded-2xl
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className={`font-bold text-white mb-2 ${sizeStyles.title}`}>{title}</h3>

      {/* Description */}
      {description && (
        <p className={`text-zinc-400 leading-relaxed max-w-sm ${sizeStyles.desc}`}>
          {description}
        </p>
      )}

      {/* Action */}
      {hasAction && (
        <div className="mt-6">
          {actionHref ? (
            <a
              href={actionHref}
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25
                text-white text-sm font-medium
                transition-all duration-200 hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              "
            >
              {actionLabel}
            </a>
          ) : (
            <button
              onClick={onAction}
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25
                text-white text-sm font-medium
                transition-all duration-200 hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                active:scale-95
              "
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
