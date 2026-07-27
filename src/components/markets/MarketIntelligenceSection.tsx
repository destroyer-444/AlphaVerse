import React from "react";
import { MarketIntelligenceData, MarketSentiment } from "@/types/market";

interface MarketIntelligenceSectionProps {
  data: MarketIntelligenceData;
}

function getSentimentStyle(sentiment: MarketSentiment): string {
  switch (sentiment) {
    case "Bullish":
      return "bg-green-500/15 text-green-400 border-green-500/20";
    case "Bearish":
      return "bg-red-500/15 text-red-400 border-red-500/20";
    default:
      return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  }
}

function getConfidenceColor(conf: number): { label: string; text: string; bar: string } {
  if (conf >= 75) return { label: "High Confidence", text: "text-green-400", bar: "bg-green-400" };
  if (conf >= 50) return { label: "Moderate Confidence", text: "text-blue-400", bar: "bg-blue-400" };
  return { label: "Low Confidence", text: "text-yellow-400", bar: "bg-yellow-400" };
}

function getCategoryBadge(cat: string): string {
  switch (cat) {
    case "FOMC":
    case "Fed":
      return "bg-purple-500/15 text-purple-400 border-purple-500/20";
    case "CPI":
    case "PPI":
      return "bg-red-500/15 text-red-400 border-red-500/20";
    case "Jobs":
      return "bg-blue-500/15 text-blue-400 border-blue-500/20";
    case "Earnings":
      return "bg-green-500/15 text-green-400 border-green-500/20";
    default:
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
  }
}

export default function MarketIntelligenceSection({ data }: MarketIntelligenceSectionProps) {
  const confInfo = getConfidenceColor(data.confidence);

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
          AI Platform Intelligence
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Today&apos;s Market Intelligence
        </h1>
        <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-4xl">
          {data.summaryText}
        </p>
      </div>

      {/* Top Bar: Overall Market Score, Market Sentiment, Confidence Meter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Score */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Overall Market Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">{data.overallScore}</span>
              <span className="text-sm font-medium text-zinc-500">/ 100</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 mt-4 overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-700"
                style={{ width: `${data.overallScore}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            Aggregated from multi-asset breadth, leader momentum, and technical volume.
          </p>
        </div>

        {/* Market Sentiment */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Market Sentiment</p>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-base font-bold border ${getSentimentStyle(data.sentiment)}`}>
              {data.sentiment}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            Reflecting institutional risk appetite and sector leadership balance.
          </p>
        </div>

        {/* Confidence Meter */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Confidence Meter</p>
              <span className={`text-xs font-bold ${confInfo.text}`}>{data.confidence}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 mb-2 overflow-hidden border border-white/5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${confInfo.bar}`}
                style={{ width: `${data.confidence}%` }}
              />
            </div>
            <span className={`text-xs font-semibold ${confInfo.text}`}>{confInfo.label}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            Synthesized from live API quotes, breadth metrics, and macro calendars.
          </p>
        </div>
      </div>

      {/* Today's Drivers & Watch Next */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Drivers */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
            <h2 className="text-2xl font-bold text-white">Today&apos;s Drivers</h2>
          </div>
          <p className="text-xs text-zinc-400 mb-6 uppercase tracking-wider font-semibold">
            Primary Catalysts &amp; Asset Movements
          </p>
          <ul className="space-y-4 flex-1">
            {data.drivers.map((driver, idx) => (
              <li key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex gap-3.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
                <span className="text-sm font-medium text-zinc-200 leading-relaxed">{driver}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Watch Next */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" />
            <h2 className="text-2xl font-bold text-white">Watch Next</h2>
          </div>
          <p className="text-xs text-zinc-400 mb-6 uppercase tracking-wider font-semibold">
            Confirmed Macroeconomic &amp; Central Bank Catalysts
          </p>
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[420px] pr-1">
            {data.watchNext.map((event, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 transition-all hover:border-white/15">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${getCategoryBadge(event.category)}`}>
                    {event.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">{event.date}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">{event.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Winners & Top Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Winners */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-green-500/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              Top Winners
            </h2>
            <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Leading Gainers</span>
          </div>
          <div className="space-y-3">
            {data.topGainers.slice(0, 5).map((stock, idx) => (
              <div key={idx} className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-base">{stock.name}</p>
                  <p className="text-xs text-zinc-400 font-medium">{stock.price}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 font-bold text-sm">
                  {stock.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Losers */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-red-500/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              Top Losers
            </h2>
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Lagging Assets</span>
          </div>
          <div className="space-y-3">
            {data.topLosers.slice(0, 5).map((stock, idx) => (
              <div key={idx} className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-base">{stock.name}</p>
                  <p className="text-xs text-zinc-400 font-medium">{stock.price}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/20 font-bold text-sm">
                  {stock.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sector Heat & Economic Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sector Heat */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-6">Sector Heat</h2>
          <div className="space-y-3 flex-1">
            {data.sectorHeat.map((sector, idx) => {
              const isPos = sector.status === "positive" || sector.change >= 0;
              return (
                <div key={idx} className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-200">{sector.name}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                    isPos ? "bg-green-500/15 text-green-400 border-green-500/20" : "bg-red-500/15 text-red-400 border-red-500/20"
                  }`}>
                    {isPos ? "+" : ""}{sector.change.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Economic Calendar */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-6">Economic Calendar</h2>
          <div className="space-y-3 flex-1">
            {data.economicCalendar.slice(0, 6).map((event, idx) => (
              <div key={idx} className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-400 font-medium mb-0.5">{event.time}</p>
                  <p className="text-sm font-bold text-white truncate">{event.event}</p>
                </div>
                <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${
                  event.impact === "High" ? "bg-red-500/15 text-red-400 border-red-500/20" : "bg-blue-500/15 text-blue-400 border-blue-500/20"
                }`}>
                  {event.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Snapshot (Indexes, Crypto, Commodities, Currencies) */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Market Snapshot</h2>
        <p className="text-sm text-zinc-400 mb-8">
          Live benchmark prices across equities, cryptocurrencies, precious metals, and foreign exchange pairs.
        </p>

        <div className="space-y-8">
          {/* Indexes */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Major Indexes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.snapshot.indexes.slice(0, 4).map((idxItem, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white truncate">{idxItem.name}</span>
                    <span className="text-base">{idxItem.flag}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-extrabold text-white">{idxItem.price}</span>
                    <span className={`text-xs font-bold ${idxItem.isPositive ? "text-green-400" : "text-red-400"}`}>
                      {idxItem.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crypto */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Crypto Leaders</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.snapshot.crypto.slice(0, 4).map((item, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white truncate">{item.name}</span>
                    <span className="text-xs text-zinc-400 font-semibold">{item.symbol}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-extrabold text-white">{item.price}</span>
                    <span className={`text-xs font-bold ${item.isPositive ? "text-green-400" : "text-red-400"}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commodities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Commodities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.snapshot.commodities.slice(0, 4).map((item, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white truncate">{item.name}</span>
                    <span className="text-xs text-zinc-400 font-semibold">{item.symbol}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-extrabold text-white">{item.price}</span>
                    <span className={`text-xs font-bold ${item.isPositive ? "text-green-400" : "text-red-400"}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currencies */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Currencies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.snapshot.currencies.slice(0, 4).map((item, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white truncate">{item.name}</span>
                    <span className="text-xs text-zinc-400 font-semibold">Forex</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-extrabold text-white">{item.price}</span>
                    <span className={`text-xs font-bold ${item.isPositive ? "text-green-400" : "text-red-400"}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
