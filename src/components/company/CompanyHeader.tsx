"use client";

import { motion } from "framer-motion";
import { Company } from "@/types/company";

interface CompanyHeaderProps {
  company: Company;
}

export default function CompanyHeader({ company }: CompanyHeaderProps) {
  const isPositive = company.changePercent.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{company.symbol.substring(0, 2)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{company.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-zinc-400">{company.symbol}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{company.exchange}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{company.country}</span>
            </div>
          </div>
        </div>

        {/* Price Info */}
        <div className="text-right">
          <p className="text-4xl font-bold text-white">{company.price}</p>
          <div className="flex items-center justify-end gap-2 mt-1">
            <span className={`text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {company.change}
            </span>
            <span className={`text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {company.changePercent}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
