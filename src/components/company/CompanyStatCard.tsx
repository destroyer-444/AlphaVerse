"use client";

import { motion } from "framer-motion";
import { CompanyMetric } from "@/types/company";

interface CompanyStatCardProps {
  metric: CompanyMetric;
  index?: number;
}

export default function CompanyStatCard({ metric, index = 0 }: CompanyStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
    >
      <p className="text-sm text-zinc-400 mb-2">{metric.label}</p>
      <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
      {metric.change && (
        <p className={`text-sm font-medium ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {metric.change}
        </p>
      )}
    </motion.div>
  );
}
