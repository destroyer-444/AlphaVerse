"use client";

import { motion } from "framer-motion";

const crypto = [
  { name: "Bitcoin", symbol: "BTC", price: "$67,450", change: "+2.4%", isPositive: true },
  { name: "Ethereum", symbol: "ETH", price: "$3,520", change: "+1.8%", isPositive: true },
  { name: "Solana", symbol: "SOL", price: "$145", change: "+3.1%", isPositive: true },
  { name: "Ripple", symbol: "XRP", price: "$0.52", change: "-0.8%", isPositive: false },
];

export default function Crypto() {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Crypto</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {crypto.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <p className="text-zinc-400 text-sm mb-1">{item.symbol}</p>
            <p className="text-white font-semibold mb-1">{item.name}</p>
            <p className="text-white text-sm font-bold">{item.price}</p>
            <p className={`text-xs font-semibold ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {item.change}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
