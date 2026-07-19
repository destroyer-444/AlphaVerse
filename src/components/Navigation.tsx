"use client";

import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-xl tracking-tight">
            AlphaVerse
          </div>
          <div className="hidden md:flex items-center gap-8">
            <motion.a
              href="#"
              className="relative text-zinc-400 hover:text-white transition-colors text-sm group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Markets
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500/0 group-hover:bg-blue-500/60"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#"
              className="relative text-zinc-400 hover:text-white transition-colors text-sm group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              News
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500/0 group-hover:bg-blue-500/60"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#"
              className="relative text-zinc-400 hover:text-white transition-colors text-sm group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              AI Insights
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500/0 group-hover:bg-blue-500/60"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#"
              className="relative text-zinc-400 hover:text-white transition-colors text-sm group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Future Trends
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500/0 group-hover:bg-blue-500/60"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#"
              className="relative text-zinc-400 hover:text-white transition-colors text-sm group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              About
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500/0 group-hover:bg-blue-500/60"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>
          <motion.button
            className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sign In
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
