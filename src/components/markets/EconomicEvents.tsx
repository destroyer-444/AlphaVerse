"use client";

import { motion } from "framer-motion";

const events = [
  { time: "Today 2:00 PM", event: "Fed Interest Rate Decision", impact: "High" },
  { time: "Tomorrow 9:30 AM", event: "US GDP Release", impact: "High" },
  { time: "Tomorrow 3:00 PM", event: "ECB Press Conference", impact: "Medium" },
  { time: "Wednesday 10:00 AM", event: "US CPI Data", impact: "High" },
];

export default function EconomicEvents() {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Upcoming Economic Events</h3>
      <div className="space-y-4">
        {events.map((item, index) => (
          <motion.div
            key={item.event}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex-1">
              <p className="text-white font-medium">{item.event}</p>
              <p className="text-zinc-400 text-sm mt-1">{item.time}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              item.impact === "High" 
                ? "bg-red-500/20 text-red-400" 
                : "bg-yellow-500/20 text-yellow-400"
            }`}>
              {item.impact}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
