/**
 * AlphaVerse — Reusable Skeleton Loading Components
 * All use the shimmer CSS animation defined in globals.css.
 * No spinners. Pure shimmer placeholders.
 */

import React from "react";

const shimmer = "shimmer rounded-xl bg-white/5";

/* ─── Primitives ─────────────────────────────────────────────────── */

function Block({ className }: { className: string }) {
  return <div className={`${shimmer} ${className}`} aria-hidden="true" />;
}

/* ─── SkeletonCard — Frosted-glass style card placeholder ─────────── */
export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading…"
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-2xl p-6 space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <Block className="h-4 w-32" />
        <Block className="h-4 w-16" />
      </div>
      <Block className="h-8 w-40" />
      <Block className="h-3 w-24" />
      <Block className="h-8 w-full" />
    </div>
  );
}

/* ─── SkeletonList — Vertical list of rows ───────────────────────── */
export function SkeletonList({
  rows = 5,
  className = "",
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div aria-busy="true" aria-label="Loading…" className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="bg-white/[0.03] border border-white/8 rounded-xl p-4 flex items-center gap-4"
        >
          <Block className="h-10 w-10 !rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Block className="h-4 w-48" />
            <Block className="h-3 w-32" />
          </div>
          <Block className="h-5 w-16 shrink-0" />
        </div>
      ))}
    </div>
  );
}

/* ─── SkeletonProfile — Company / asset profile header ───────────── */
export function SkeletonProfile({ className = "" }: { className?: string }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading…"
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-2xl p-8 ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <Block className="h-16 w-16 !rounded-2xl shrink-0" />
          <div className="space-y-3">
            <Block className="h-7 w-52" />
            <Block className="h-4 w-36" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <Block className="h-10 w-32 ml-auto" />
          <Block className="h-5 w-20 ml-auto" />
        </div>
      </div>
    </div>
  );
}

/* ─── SkeletonTable — Data table rows ───────────────────────────── */
export function SkeletonTable({
  rows = 6,
  cols = 4,
  className = "",
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading…"
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex gap-4 p-4 border-b border-white/8">
        {Array.from({ length: cols }).map((_, i) => (
          <Block key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-white/5 last:border-0">
          {Array.from({ length: cols }).map((_, j) => (
            <Block key={j} className={`h-4 ${j === 0 ? "w-32" : "flex-1"}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── SkeletonChart — Chart area placeholder ─────────────────────── */
export function SkeletonChart({ className = "" }: { className?: string }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading…"
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-2xl p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <Block className="h-5 w-32" />
        <div className="flex gap-2">
          {[14, 18, 14, 18].map((w, i) => (
            <Block key={i} className={`h-6 w-${w}`} />
          ))}
        </div>
      </div>
      {/* Chart bars */}
      <div className="flex items-end gap-2 h-32">
        {[60, 80, 55, 90, 70, 85, 65, 95, 75, 88, 60, 78].map((h, i) => (
          <div
            key={i}
            className={`${shimmer} flex-1 !rounded-t-lg`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-3">
        {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
          <Block key={m} className="h-3 w-6" />
        ))}
      </div>
    </div>
  );
}

/* ─── SkeletonGrid — Grid of SkeletonCards ───────────────────────── */
export function SkeletonGrid({
  count = 3,
  cols = "grid-cols-1 md:grid-cols-3",
  className = "",
}: {
  count?: number;
  cols?: string;
  className?: string;
}) {
  return (
    <div aria-busy="true" className={`grid ${cols} gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
