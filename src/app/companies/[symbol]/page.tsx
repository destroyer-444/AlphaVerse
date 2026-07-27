import { notFound } from "next/navigation";
import Link from "next/link";
import { getLiveCompany } from "@/services/companyLiveService";
import CompanyHeader from "@/components/company/CompanyHeader";
import CompanyOverview from "@/components/company/CompanyOverview";
import CompanyStatCard from "@/components/company/CompanyStatCard";
import SectionHeader from "@/components/company/SectionHeader";
import { companyRelationshipService } from "@/services/companyRelationshipService";
import CompanyEcosystemSection from "@/components/company/CompanyEcosystemSection";
import { CompanyMetric } from "@/types/company";
import { companyIntelligenceService } from "@/services/companyIntelligenceService";
import { companyNewsService } from "@/services/companyNewsService";
import { companyAnalysisService } from "@/services/companyAnalysisService";
import AnalystBriefSection from "@/components/company/AnalystBriefSection";
import EmptyState from "@/components/ui/EmptyState";
import { decisionEngineService } from "@/services/decisionEngineService";
import DecisionCenter from "@/components/decision/DecisionCenter";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const [company, intelligence, newsData, ecosystem, decisionReport] = await Promise.all([
    getLiveCompany(symbol),
    companyIntelligenceService.getIntelligence(symbol),
    companyNewsService.getNewsAndCatalysts(symbol),
    companyRelationshipService.getEcosystem(symbol),
    decisionEngineService.getReport(symbol),
  ]);
  const { news, catalysts } = newsData;
  const analystBrief = company && await companyAnalysisService.getAnalystBrief(symbol, company, intelligence, news, catalysts);

  if (!company) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-2xl text-3xl mb-5">
            🔍
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Company Not Found</h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            The symbol &ldquo;{symbol}&rdquo; doesn&apos;t match any company in our database.
            It may be delisted, private, or not yet covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/companies"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Browse Companies
            </Link>
            <Link
              href="/markets"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 border border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Back to Markets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const metrics: CompanyMetric[] = [
    { label: "Market Cap", value: company.marketCap },
    { label: "Sector", value: company.sector },
    { label: "Industry", value: company.industry },
  ];
  const ratingColor = (rating: string) => {
    if (rating === "Strong") return "text-green-400";
    if (rating === "Good") return "text-blue-400";
    if (rating === "Neutral") return "text-yellow-400";
    return "text-red-400";
  };
  const outlookBadgeStyle = (rating: string) => {
    if (rating === "Strong") return "bg-green-500/15 text-green-400 border-green-500/20";
    if (rating === "Good") return "bg-blue-500/15 text-blue-400 border-blue-500/20";
    if (rating === "Neutral") return "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
    return "bg-red-500/15 text-red-400 border-red-500/20";
  };
  const scoreColor = (score: number, label?: string) => {
    if (label === "Risk") {
      if (score <= 45) return "bg-green-400";
      if (score <= 65) return "bg-yellow-400";
      return "bg-red-400";
    }
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

          {/* AI Analyst Brief */}
          {analystBrief && <AnalystBriefSection brief={analystBrief} companyName={company.name} />}

          {/* AlphaVerse AI Decision Engine */}
          {decisionReport && <DecisionCenter report={decisionReport} />}

          {/* AlphaVerse Intelligence */}
          <section className="mt-8">
            <SectionHeader title="AlphaVerse Intelligence" subtitle="Real-time calculated signals and metrics for this company." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-zinc-400 mb-3">Market Outlook</p>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${outlookBadgeStyle(intelligence.rating)}`}>
                  {intelligence.outlook}
                </span>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-end justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">AlphaVerse Score</p>
                    <p className="text-2xl font-bold text-white">{intelligence.overallScore} <span className="text-base text-zinc-400">/ 100</span></p>
                  </div>
                  <span className={`text-sm font-semibold ${ratingColor(intelligence.rating)}`}>{intelligence.rating}</span>
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
                    <div className={`h-full rounded-full ${scoreColor(score.value, score.label)}`} style={{ width: `${score.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { title: "Why?", items: intelligence.reasons, marker: "bg-blue-400" },
                { title: "Risks", items: intelligence.risks, marker: "bg-red-400" },
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
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Watch Next</h3>
                  <ul className="space-y-4">
                    {catalysts.map((catalyst) => (
                      <li key={catalyst.id} className="text-sm">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-semibold text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-purple-400" />
                            {catalyst.title}
                          </span>
                          {catalyst.date && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20 shrink-0 font-medium">
                              {catalyst.date}
                            </span>
                          )}
                        </div>
                        <p className="text-zinc-300 text-xs leading-relaxed pl-3.5">{catalyst.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Latest News */}
          <section className="mt-8">
            <SectionHeader title="Latest News" subtitle={`Live news and sentiment analysis for ${company.name}.`} />
            {news.length === 0 ? (
              <EmptyState
                icon="📰"
                title="No Recent News"
                description={`No news articles found for ${company.name} in the past 24 hours. Check back soon.`}
                actionLabel="Browse All News"
                actionHref="/news"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article) => (
                  <a
                    key={article.id}
                    href={article.url || "#"}
                    target={article.url ? "_blank" : undefined}
                    rel={article.url ? "noopener noreferrer" : undefined}
                    className="group bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-xs text-zinc-400 font-medium truncate">{article.source}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          article.sentiment === "Positive"
                            ? "bg-green-500/15 text-green-400 border-green-500/20"
                            : article.sentiment === "Negative"
                            ? "bg-red-500/15 text-red-400 border-red-500/20"
                            : "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
                        }`}>
                          {article.sentiment}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                        {article.headline}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-white/5 mt-auto">
                      <span>{article.publishedTime}</span>
                      <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Read more &rarr;
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Company Ecosystem */}
          <CompanyEcosystemSection ecosystem={ecosystem} companyName={company.name} />
        </div>
      </div>
    </div>
  );
}
