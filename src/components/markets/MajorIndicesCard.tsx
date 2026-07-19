"use client";

import { motion } from "framer-motion";

interface MajorIndicesCardProps {
  name: string;
  flag: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export default function MajorIndicesCard({ name, flag, price, change, isPositive }: MajorIndicesCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-5 overflow-hidden group hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-white font-semibold text-base">{name}</h3>
            <span className="text-xl">{flag}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-400 font-medium">Live</span>
          </div>
        </div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xl font-bold text-white tracking-tight">{price}</p>
            <p className={`text-xs flex items-center gap-1 mt-1 font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isPositive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"}
                />
              </svg>
              {change}
            </p>
          </div>
        </div>
        <div className="h-8 w-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            <path
              d={isPositive 
                ? "M0,25 Q10,20 20,22 T40,18 T60,15 T80,10 T100,5"
                : "M0,5 Q10,10 20,8 T40,12 T60,15 T80,20 T100,25"
              }
              fill="none"
              stroke={isPositive ? "#4ade80" : "#f87171"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
