/**
 * AlphaVerse — Shared Semantic Color Constants
 * Single source of truth for all market-related color decisions.
 * Used in Tailwind class strings and inline styles.
 */

export const colors = {
  /** Live price movement — green */
  positive: {
    text: "text-green-400",
    bg: "bg-green-500/15",
    border: "border-green-500/20",
    badge: "bg-green-500/15 text-green-400 border-green-500/20",
    bar: "bg-green-400",
    dot: "bg-green-400",
    hex: "#4ade80",
  },

  /** Live price movement — red */
  negative: {
    text: "text-red-400",
    bg: "bg-red-500/15",
    border: "border-red-500/20",
    badge: "bg-red-500/15 text-red-400 border-red-500/20",
    bar: "bg-red-400",
    dot: "bg-red-400",
    hex: "#f87171",
  },

  /** No significant movement — zinc */
  neutral: {
    text: "text-zinc-400",
    bg: "bg-zinc-500/15",
    border: "border-zinc-500/20",
    badge: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
    bar: "bg-zinc-400",
    dot: "bg-zinc-400",
    hex: "#a1a1aa",
  },

  /** AI/Market sentiment Bullish — emerald */
  bullish: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/20",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    hex: "#34d399",
  },

  /** AI/Market sentiment Bearish — rose */
  bearish: {
    text: "text-rose-400",
    bg: "bg-rose-500/15",
    border: "border-rose-500/20",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/20",
    hex: "#fb7185",
  },

  /** Premium / AI gradient */
  premium: {
    gradientText: "bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent",
    gradientBg: "bg-gradient-to-r from-blue-500 to-violet-500",
    gradientBorder: "border border-blue-500/20",
    hex: { from: "#60a5fa", to: "#a78bfa" },
  },
} as const;

/** Get positive/negative class by boolean */
export function getPriceColor(isPositive: boolean | undefined) {
  if (isPositive === undefined) return colors.neutral;
  return isPositive ? colors.positive : colors.negative;
}

/** Get sentiment color by string */
export function getSentimentColor(sentiment: "Bullish" | "Neutral" | "Bearish") {
  switch (sentiment) {
    case "Bullish": return colors.bullish;
    case "Bearish": return colors.bearish;
    default:        return colors.neutral;
  }
}

/** Get score bar color by score value */
export function getScoreBarColor(score: number, invert = false): string {
  if (invert) {
    if (score <= 35) return "bg-green-400";
    if (score <= 65) return "bg-yellow-400";
    return "bg-red-400";
  }
  if (score >= 70) return "bg-green-400";
  if (score >= 45) return "bg-yellow-400";
  return "bg-red-400";
}
