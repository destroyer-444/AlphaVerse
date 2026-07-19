"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      {/* Subtle animated floating gradient */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
      />
      
      {/* Soft premium blue glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/30 rounded-full blur-[120px]"
      />
      
      {/* Badge */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
      >
        <span className="text-sm text-zinc-300 font-medium">AI • Global Markets • Research</span>
      </motion.div>
      
      {/* Headline */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="relative z-10 mt-8 text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight max-w-4xl leading-tight"
      >
        Understand Markets Before They Move.
      </motion.h1>
      
      {/* Subtitle */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative z-10 mt-6 text-lg md:text-xl lg:text-2xl text-zinc-300 max-w-[700px] leading-relaxed"
      >
        AI-powered financial intelligence for investors, traders, and researchers.
      </motion.p>
      
      {/* Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-12 flex flex-col sm:flex-row gap-4"
      >
        <button className="bg-white text-black px-8 py-4 rounded-full text-base font-medium hover:bg-zinc-200 transition-colors">
          Get Started
        </button>
        <button className="bg-white/10 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/20 transition-colors border border-white/20">
          Explore Markets
        </button>
      </motion.div>
      
      {/* Trust text */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        className="relative z-10 mt-8 text-sm text-zinc-500"
      >
        Trusted by future investors, traders and researchers.
      </motion.p>
    </motion.section>
  );
}
