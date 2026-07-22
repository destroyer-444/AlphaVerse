import { notFound } from "next/navigation";
import Link from "next/link";
import { companyService } from "@/services/companyService";
import CompanyHeader from "@/components/company/CompanyHeader";
import CompanyOverview from "@/components/company/CompanyOverview";
import CompanyStatCard from "@/components/company/CompanyStatCard";
import SectionHeader from "@/components/company/SectionHeader";
import Competitors from "@/components/company/Competitors";
import { CompanyMetric } from "@/types/company";

export default function CompanyPage({ params }: { params: { symbol: string } }) {
  const company = companyService.getCompany(params.symbol);

  if (!company) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Company Not Found</h1>
          <p className="text-zinc-400 mb-8">
            The company with symbol "{params.symbol}" does not exist in our database.
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

          {/* Competitors */}
          <div className="mt-8">
            <Competitors company={company} />
          </div>
        </div>
      </div>
    </div>
  );
}
