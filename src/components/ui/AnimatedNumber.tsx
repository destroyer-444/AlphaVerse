"use client";

/**
 * AlphaVerse — AnimatedNumber
 * Count-up animation for numeric display values.
 * - Only animates on first mount (not every re-render)
 * - 700–1000ms duration
 * - Memoized to prevent unnecessary re-renders
 * - Works with integers and fixed-decimal floats
 */

import { useEffect, useRef, useState, memo } from "react";

interface AnimatedNumberProps {
  /** The target numeric value */
  value: number;
  /** Number of decimal places to show (default 0) */
  decimals?: number;
  /** Prefix e.g. "$" */
  prefix?: string;
  /** Suffix e.g. "%" */
  suffix?: string;
  /** Duration in ms (default 800) */
  duration?: number;
  /** Extra className */
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const AnimatedNumber = memo(function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 800,
  className = "",
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only animate once on mount
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const startVal = 0;
    const endVal = value;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setDisplay(startVal + (endVal - startVal) * eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatted = display.toFixed(decimals);

  return (
    <span className={`countup-enter tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
});

export default AnimatedNumber;
