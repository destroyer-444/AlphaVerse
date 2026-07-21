"use client";

import { motion } from "framer-motion";
import { Company } from "@/types/company";

interface CompanyOverviewProps {
  company: Company;
}

export default function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Company Overview</h2>
      <p className="text-zinc-300 leading-relaxed mb-6">{company.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">Sector</p>
          <p className="text-white font-medium">{company.sector}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">Industry</p>
          <p className="text-white font-medium">{company.industry}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">CEO</p>
          <p className="text-white font-medium">{company.ceo}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">Employees</p>
          <p className="text-white font-medium">{company.employees}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">Headquarters</p>
          <p className="text-white font-medium">{company.headquarters}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl">
          <p className="text-sm text-zinc-400 mb-1">Website</p>
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            {company.website.replace("https://www.", "")}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
