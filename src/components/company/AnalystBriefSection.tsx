import React from "react";
import { CompanyAnalystBrief, ValuationOpinion } from "@/types/company";
import SectionHeader from "@/components/company/SectionHeader";

interface AnalystBriefSectionProps {
  brief: CompanyAnalystBrief;
  companyName: string;
}

function getValuationBadgeStyle(opinion: ValuationOpinion): string {
  switch (opinion) {
    case "Undervalued":
      return "bg-green-500/15 text-green-400 border-green-500/20";
    case "Fairly Valued":
      return "bg-blue-500/15 text-blue-400 border-blue-500/20";
    case "Premium Valuation":
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
    case "Highly Speculative":
      return "bg-purple-500/15 text-purple-400 border-purple-500/20";
    default:
      return "bg-zinc-500/15 text-zinc-400 border-zinc-500/20";
  }
}

function getConfidenceLabel(confidence: number): { label: string; color: string; barColor: string } {
  if (confidence >= 75) {
    return { label: "High Confidence", color: "text-green-400", barColor: "bg-green-400" };
  }
  if (confidence >= 45) {
    return { label: "Moderate Confidence", color: "text-blue-400", barColor: "bg-blue-400" };
  }
  return { label: "Low Confidence", color: "text-yellow-400", barColor: "bg-yellow-400" };
}

export default function AnalystBriefSection({ brief, companyName }: AnalystBriefSectionProps) {
  const confInfo = getConfidenceLabel(brief.confidence);

  return (
    <section className="mt-8">
      <SectionHeader
        title="AI Analyst Brief"
        subtitle={`Automated financial narrative and valuation analysis for ${companyName}.`}
      />

      {/* Top Cards: Valuation Opinion, Confidence Meter, 12-Month Outlook */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Valuation Opinion Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Valuation Opinion</p>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${getValuationBadgeStyle(brief.valuationOpinion)}`}>
              {brief.valuationOpinion}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            Derived from trailing and forward PE, growth multiples, and PEG analysis.
          </p>
        </div>

        {/* Confidence Meter Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Confidence Meter</p>
              <span className={`text-xs font-bold ${confInfo.color}`}>{brief.confidence}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 mb-2 overflow-hidden border border-white/5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${confInfo.barColor}`}
                style={{ width: `${brief.confidence}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${confInfo.color}`}>{confInfo.label}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            Scored on data freshness, financial statement completeness, and news volume.
          </p>
        </div>

        {/* 12-Month Outlook Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">12-Month Outlook</p>
            <p className="text-sm text-zinc-200 font-medium leading-relaxed">
              {brief.twelveMonthOutlook}
            </p>
          </div>
        </div>
      </div>

      {/* Hero Card: Overall Thesis */}
      <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">Overall Thesis</p>
        <p className="text-base font-semibold text-white leading-relaxed">
          {brief.overallThesis}
        </p>
      </div>

      {/* Bull Case & Bear Case */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
            <h3 className="text-base font-bold text-white">Bull Case</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {brief.bullCase}
          </p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-red-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
            <h3 className="text-base font-bold text-white">Bear Case</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {brief.bearCase}
          </p>
        </div>
      </div>

      {/* Biggest Risk & Key Drivers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
              <h3 className="text-base font-bold text-white">Biggest Risk</h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {brief.biggestRisk}
            </p>
          </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
            <h3 className="text-base font-bold text-white">Key Drivers</h3>
          </div>
          <ul className="space-y-2.5">
            {brief.keyDrivers.map((driver, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 bg-blue-400" />
                <span>{driver}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
