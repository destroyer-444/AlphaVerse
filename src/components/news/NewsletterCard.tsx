"use client";

import { motion } from "framer-motion";

export default function NewsletterCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-2">Stay Informed</h3>
      <p className="text-zinc-400 text-sm mb-4">
        Get daily market insights delivered to your inbox.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors"
      >
        Subscribe
      </motion.button>
    </motion.div>
  );
}
