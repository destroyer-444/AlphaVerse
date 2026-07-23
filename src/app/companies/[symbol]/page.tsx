import { notFound } from "next/navigation";
import Link from "next/link";
import { getLiveCompany } from "@/services/companyLiveService";
import CompanyHeader from "@/components/company/CompanyHeader";
import CompanyOverview from "@/components/company/CompanyOverview";
import CompanyStatCard from "@/components/company/CompanyStatCard";
import SectionHeader from "@/components/company/SectionHeader";
import Competitors from "@/components/company/Competitors";
import { CompanyMetric } from "@/types/company";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const company = await getLiveCompany(symbol);

  if (!company) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Company Not Found</h1>
          <p className="text-zinc-400 mb-8">
            The company with symbol "{symbol}" does not exist in our database.
          </p>
          <Link
            href="/markets"
            className="inline-block bg-white text-black px-8 py-4 rounded-full text-base font-medium hover:bg-zinc-200 transition-colors"
          >
            Back to Markets
          </Link>
        </div>
      </div>
    );
  }

  const metrics: CompanyMetric[] = [
    { label: "Market Cap", value: company.marketCap },
    { label: "Sector", value: company.sector },
    { label: "Industry", value: company.industry },
  ];
  const intelligence = {
    outlook: "Bullish",
    overallScore: 84,
    scoreExplanation: "Strong overall fundamentals with moderate valuation risk.",
    scores: [
      { label: "Growth", value: 91 },
      { label: "Momentum", value: 88 },
      { label: "Financial Health", value: 82 },
      { label: "Risk", value: 43 },
      { label: "Valuation", value: 62 },
    ],
    reasons: [
      "Strong demand continues across core markets.",
      "Earnings momentum remains supportive.",
      "Industry positioning supports long-term growth.",
    ],
    risks: [
      "Valuation may be sensitive to near-term expectations.",
      "Competitive pressure could affect future margins.",
      "Market volatility may impact short-term performance.",
    ],
    watchNext: [
      "Next earnings release and forward guidance.",
      "Updates to sector demand and spending trends.",
      "New product and partnership announcements.",
    ],
  };
  const scoreColor = (score: number) => {
    if (score >= 75) return "bg-green-400";
    if (score >= 55) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Markets
          </Link>

          {/* Company Header */}
          <CompanyHeader company={company} />

          {/* Key Metrics */}
          <SectionHeader title="Key Metrics" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <CompanyStatCard key={metric.label} metric={metric} index={index} />
            ))}
          </div>

          {/* Company Overview */}
          <CompanyOverview company={company} />

          {/* AlphaVerse Intelligence */}
          <section className="mt-8">
            <SectionHeader title="AlphaVerse Intelligence" subtitle="Placeholder signals and themes for this company." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-zinc-400 mb-3">Market Outlook</p>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-500/15 text-green-400 text-sm font-semibold border border-green-500/20">
                  {intelligence.outlook}
                </span>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-end justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">AlphaVerse Score</p>
                    <p className="text-2xl font-bold text-white">{intelligence.overallScore} <span className="text-base text-zinc-400">/ 100</span></p>
                  </div>
                  <span className="text-sm font-semibold text-green-400">Strong</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                  <div className="h-full rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400" style={{ width: `${intelligence.overallScore}%` }} />
                </div>
                <p className="text-sm text-zinc-400">{intelligence.scoreExplanation}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {intelligence.scores.map((score) => (
                <div key={score.label} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-sm text-zinc-400">{score.label}</p>
                    <p className="text-lg font-bold text-white">{score.value}</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full rounded-full ${scoreColor(score.value)}`} style={{ width: `${score.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { title: "Why?", items: intelligence.reasons, marker: "bg-blue-400" },
                { title: "Risks", items: intelligence.risks, marker: "bg-red-400" },
                { title: "Watch Next", items: intelligence.watchNext, marker: "bg-purple-400" },
              ].map((card) => (
                <div key={card.title} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${card.marker}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Competitors */}
          <div className="mt-8">
            <Competitors company={company} />
          </div>
        </div>
      </div>
    </div>
  );
}
