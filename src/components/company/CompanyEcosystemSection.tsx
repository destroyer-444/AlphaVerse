import React from "react";
import Link from "next/link";
import { CompanyEcosystem, CompanyRelationshipItem } from "@/types/company";
import SectionHeader from "@/components/company/SectionHeader";

interface CompanyEcosystemSectionProps {
  ecosystem: CompanyEcosystem;
  companyName: string;
}

interface CategoryCardProps {
  title: string;
  items: CompanyRelationshipItem[];
  badgeColor: string;
  dotColor: string;
}

function CategoryCard({ title, items, badgeColor, dotColor }: CategoryCardProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${badgeColor}`}>
            {items.length}
          </span>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={`${item.type}-${item.symbol}`}
              href={item.href}
              className="group block p-3.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/20"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-white group-hover:text-blue-400 transition-colors text-sm flex items-center gap-1.5">
                  {item.symbol}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">&rarr;</span>
                </span>
                {item.relationship && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5 font-medium truncate max-w-[150px]">
                    {item.relationship}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 font-medium truncate">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CompanyEcosystemSection({ ecosystem, companyName }: CompanyEcosystemSectionProps) {
  return (
    <section className="mt-8">
      <SectionHeader
        title="Company Ecosystem"
        subtitle={`Strategic market network, supply chain partnerships, and index benchmarks for ${companyName}.`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryCard
          title="Competitors"
          items={ecosystem.competitors}
          badgeColor="bg-blue-500/15 text-blue-400 border-blue-500/20"
          dotColor="bg-blue-400"
        />
        <CategoryCard
          title="Customers"
          items={ecosystem.customers}
          badgeColor="bg-green-500/15 text-green-400 border-green-500/20"
          dotColor="bg-green-400"
        />
        <CategoryCard
          title="Suppliers"
          items={ecosystem.suppliers}
          badgeColor="bg-red-500/15 text-red-400 border-red-500/20"
          dotColor="bg-red-400"
        />
        <CategoryCard
          title="Partners"
          items={ecosystem.partners}
          badgeColor="bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
          dotColor="bg-yellow-400"
        />
        <CategoryCard
          title="Related ETFs"
          items={ecosystem.relatedEtfs}
          badgeColor="bg-purple-500/15 text-purple-400 border-purple-500/20"
          dotColor="bg-purple-400"
        />
        <CategoryCard
          title="Indexes"
          items={ecosystem.relatedIndexes}
          badgeColor="bg-indigo-500/15 text-indigo-400 border-indigo-500/20"
          dotColor="bg-indigo-400"
        />
      </div>
    </section>
  );
}
