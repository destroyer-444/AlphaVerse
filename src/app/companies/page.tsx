import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { companyService } from "@/services/companyService";
import { Company } from "@/types/company";

function changeValue(changePercent: string): number {
  return Number.parseFloat(changePercent.replace("%", ""));
}

function CompanyCard({ company }: { company: Company }) {
  const isPositive = changeValue(company.changePercent) >= 0;

  return (
    <Link
      href={`/companies/${company.symbol}`}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
    >
      <article className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-white/[0.05] group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-sm font-bold text-white">{company.symbol.slice(0, 2)}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold truncate">{company.name}</p>
              <p className="text-zinc-500 text-sm mt-0.5">{company.symbol} · {company.exchange}</p>
            </div>
          </div>
          <span className="shrink-0 text-xs text-zinc-400 px-2 py-1 rounded-full bg-white/5">
            {company.sector}
          </span>
        </div>
        <div className="flex items-end justify-between mt-6">
          <div>
            <p className="text-zinc-500 text-xs mb-1">Market cap {company.marketCap}</p>
            <p className="text-xl font-bold text-white">{company.price}</p>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {company.change}
            </p>
            <p className={`text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {company.changePercent}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

function CompanyList({ companies, positive }: { companies: Company[]; positive: boolean }) {
  return (
    <div className="space-y-3">
      {companies.map((company) => (
        <Link
          key={company.symbol}
          href={`/companies/${company.symbol}`}
          className="group flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-white">{company.symbol.slice(0, 2)}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                {company.name}
              </p>
              <p className="text-zinc-500 text-sm">{company.symbol} · {company.price}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className={`font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>
              {company.changePercent}
            </p>
            <p className="text-zinc-500 text-xs">{company.marketCap}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function CompaniesPage() {
  const companies = companyService.getAllCompanies();
  const topGainers = [...companies]
    .filter((company) => changeValue(company.changePercent) > 0)
    .sort((a, b) => changeValue(b.changePercent) - changeValue(a.changePercent))
    .slice(0, 4);
  const topLosers = [...companies]
    .filter((company) => changeValue(company.changePercent) < 0)
    .sort((a, b) => changeValue(a.changePercent) - changeValue(b.changePercent))
    .slice(0, 4);
  const trendingCompanies = companies.slice(0, 5);

  return (
    <PageLayout>
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12">
            <p className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">Markets directory</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Explore Companies</h1>
                <p className="text-lg text-zinc-400">
                  Follow market leaders and discover companies across global industries.
                </p>
              </div>
              <div className="w-full lg:max-w-md relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search companies, symbols, sectors..."
                  aria-label="Search companies"
                  className="w-full pl-12 pr-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>
          </section>

          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Companies</h2>
                <p className="text-zinc-500 mt-1">{companies.length} companies in the AlphaVerse universe</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {companies.map((company) => <CompanyCard key={company.symbol} company={company} />)}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-1">Trending Companies</h2>
              <p className="text-zinc-500 text-sm mb-5">Most watched names today</p>
              <CompanyList companies={trendingCompanies} positive />
            </div>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-1">Top Gainers</h2>
              <p className="text-zinc-500 text-sm mb-5">Leading positive movers</p>
              <CompanyList companies={topGainers} positive />
            </div>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-1">Top Losers</h2>
              <p className="text-zinc-500 text-sm mb-5">Leading negative movers</p>
              <CompanyList companies={topLosers} positive={false} />
            </div>
          </section>
        </div>
      </main>
    </PageLayout>
  );
}
