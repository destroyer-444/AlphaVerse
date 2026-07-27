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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="
        bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6
        hover:border-white/20 hover:bg-white/[0.05]
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        transition-colors duration-200
        cursor-default
      "
    >
      <p className="text-sm text-zinc-400 mb-2 font-medium">{metric.label}</p>
      <p className="text-2xl font-bold text-white mb-1 tracking-tight">{metric.value}</p>
      {metric.change && (
        <p
          className={`text-sm font-semibold ${
            metric.isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {metric.change}
        </p>
      )}
    </motion.div>
  );
}
