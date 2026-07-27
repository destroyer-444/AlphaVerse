"use client";

/**
 * NextBigThing — AlphaVerse Scalable Future Trends Intelligence Module
 *
 * Restores the original vision of AlphaVerse by highlighting emerging mega-trends.
 * Engineered as a scalable module supporting AI confidence scores, timelines,
 * catalysts, risks, key companies, ETFs, and plain-language significance.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhyThisMatters from "@/components/common/WhyThisMatters";

interface TrendModule {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  confidence: number;
  timeline: string;
  whyItMatters: string;
  catalysts: string[];
  risks: string[];
  companies: string[];
  etfs: string[];
}

const TREND_MODULES: TrendModule[] = [
  {
    id: "ai-infra",
    title: "AI Infrastructure",
    icon: "⚡",
    tagline: "Next-gen hyperscale data centers & liquid-cooled GPU clusters",
    confidence: 94,
    timeline: "2025 – 2028",
    whyItMatters: "General artificial intelligence requires 10x today's compute capacity. The physical hardware layer captures 70% of total economic profit in the AI tech stack.",
    catalysts: ["Blackwell volume ramp", "Sovereign AI gigawatt data centers", "Custom ASIC silicon shift"],
    risks: ["Power grid interconnect delays", "Advanced packaging bottlenecks"],
    companies: ["NVDA", "ASML", "TSM", "AVGO", "SMCI"],
    etfs: ["SMH", "SOXX", "BOTZ"],
  },
  {
    id: "robotics",
    title: "Humanoid Robotics",
    icon: "🤖",
    tagline: "General-purpose physical AI automation for manufacturing & logistics",
    confidence: 86,
    timeline: "2026 – 2030",
    whyItMatters: "Solves structural global labor shortages in logistics and automotive assembly. Unit economics reach parity with human labor at $15,000 per unit.",
    catalysts: ["Tesla Optimus Gen 3 factory deployment", "Figure 02 BMW integration", "Vision-language-action (VLA) foundation models"],
    risks: ["Battery power density limits", "Precision actuator supply chain constraint"],
    companies: ["TSLA", "NVDA", "TER", "ROK", "ISRG"],
    etfs: ["BOTZ", "ROBO", "ARKQ"],
  },
  {
    id: "quantum",
    title: "Quantum Computing",
    icon: "🔮",
    tagline: "Fault-tolerant logical qubits for material science & encryption",
    confidence: 78,
    timeline: "2027 – 2032",
    whyItMatters: "Will render RSA cryptography obsolete while accelerating drug discovery and battery chemistry modeling by orders of magnitude.",
    catalysts: ["1,000+ logical qubit milestones", "Neutral atom error correction breakthroughs", "Quantum-classical hybrid supercomputing"],
    risks: ["Extreme cryogenic cooling costs", "High qubit decoherence error rates"],
    companies: ["IONQ", "RGTI", "QBTS", "IBM", "GOOGL"],
    etfs: ["QTUM", "DEFI", "ARKQ"],
  },
  {
    id: "defense",
    title: "Defense Technology",
    icon: "🛡️",
    tagline: "Autonomous drone swarms, AI battle management & hypersonics",
    confidence: 91,
    timeline: "2025 – 2029",
    whyItMatters: "Modern warfare has pivoted from exquisite legacy platforms to mass-producible autonomous AI systems, driving a structural re-rating of defense tech budgets.",
    catalysts: ["US Replicator initiative scaling", "NATO defense spending exceeding 2.5% GDP", "AI-driven electronic warfare"],
    risks: ["Government procurement bureaucracy", "Export control restrictions"],
    companies: ["PLTR", "AVAV", "RKT", "KTOS", "AXON"],
    etfs: ["ITA", "XAR", "SHLD"],
  },
  {
    id: "nuclear",
    title: "Nuclear Energy",
    icon: "⚛️",
    tagline: "Small Modular Reactors (SMRs) & fusion powering AI data centers",
    confidence: 89,
    timeline: "2026 – 2031",
    whyItMatters: "Hyperscale AI data centers require 24/7 baseload zero-carbon power that solar and wind cannot provide without massive battery storage.",
    catalysts: ["Microsoft/Constellation Three Mile Island restart", "Amazon & Google SMR campus co-location deals", "NRC regulatory streamlining"],
    risks: ["Long reactor construction timelines", "Uranium enrichment fuel supply deficits"],
    companies: ["CEG", "VST", "SMR", "CCJ", "OKLO"],
    etfs: ["NLR", "URA", "URNM"],
  },
  {
    id: "space",
    title: "Space Economy",
    icon: "🛰️",
    tagline: "Low Earth Orbit (LEO) broadband swarms & orbital logistics",
    confidence: 83,
    timeline: "2026 – 2030",
    whyItMatters: "Reusable super-heavy lift rockets have reduced launch costs per kilogram by 90%, enabling profitable orbital manufacturing and global direct-to-cell satellite Wi-Fi.",
    catalysts: ["SpaceX Starship commercial payload operationalization", "Direct-to-smartphone satellite constellation deployments", "Lunar defense architecture"],
    risks: ["Orbital debris (Kessler syndrome)", "High capital expenditure burn rates"],
    companies: ["RKLB", "LMT", "LHX", "MAXR", "ASTS"],
    etfs: ["UFO", "ARKX", "ROKC"],
  },
  {
    id: "longevity",
    title: "Longevity & Biotech",
    icon: "🧬",
    tagline: "AI-generated therapeutics, CRISPR gene editing & cellular reprogramming",
    confidence: 85,
    timeline: "2025 – 2030",
    whyItMatters: "AI structural biology (AlphaFold 3) has compressed clinical trial drug discovery timelines from years to weeks, targeting age-related metabolic and neurodegenerative diseases.",
    catalysts: ["GLP-1 next-gen cardiovascular & Alzheimer's indications", "CRISPR in vivo clinical approvals", "AI lab automation integration"],
    risks: ["FDA clinical trial Phase 3 attrition", "High patient reimbursement friction"],
    companies: ["CRSP", "VRTX", "LLY", "NVO", "RXRX"],
    etfs: ["XBI", "IBB", "ARKG"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Identity",
    icon: "🔐",
    tagline: "Zero-trust AI threat hunting, deepfake defense & post-quantum encryption",
    confidence: 92,
    timeline: "2025 – 2028",
    whyItMatters: "Agentic AI cyberattacks can probe corporate networks autonomously 24/7. Organizations must deploy AI-native defense platforms to achieve machine-speed neutralization.",
    catalysts: ["Autonomous AI SOC (Security Operations Center) adoption", "Mandatory federal zero-trust compliance", "Post-quantum cryptography migration"],
    risks: ["Vendor platform consolidation fatigue", "False positive alert overload"],
    companies: ["CRWD", "PANW", "FTNT", "ZS", "NET"],
    etfs: ["CIBR", "HACK", "BUG"],
  },
];

export default function NextBigThing() {
  const [selectedModule, setSelectedModule] = useState<TrendModule | null>(null);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-400 font-mono text-xs font-bold tracking-widest uppercase">
              Scalable Intelligence Module • Important Priority
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            The Next Big Thing
          </h2>
        </div>
        <p className="text-zinc-400 text-xs md:text-sm max-w-md mt-2 md:mt-0 font-light leading-relaxed">
          Algorithmic roadmap of emerging technological mega-sectors reshaping global GDP. Click any industry to inspect institutional catalysts, timelines, and key equities.
        </p>
      </div>

      {/* Grid of Scalable Industry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TREND_MODULES.map((mod) => (
          <motion.div
            key={mod.id}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedModule(selectedModule?.id === mod.id ? null : mod)}
            className={`cursor-pointer rounded-3xl p-5 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between ${
              selectedModule?.id === mod.id
                ? "bg-purple-900/30 border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-white/20 shadow-lg"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{mod.icon}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">
                  {mod.confidence}% Confidence
                </span>
              </div>
              <h3 className="text-white font-bold text-base mb-1">
                {mod.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-snug font-light mb-4 line-clamp-2">
                {mod.tagline}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-mono border-t border-white/5 pt-3 mb-2">
                <span className="text-zinc-500">TIMELINE:</span>
                <span className="text-zinc-300 font-bold">{mod.timeline}</span>
              </div>

              {/* Equities Badges */}
              <div className="flex flex-wrap gap-1">
                {mod.companies.slice(0, 3).map((sym) => (
                  <span
                    key={sym}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px] font-bold"
                  >
                    ${sym}
                  </span>
                ))}
                {mod.companies.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 font-mono text-[10px]">
                    +{mod.companies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Scalable Module Workspace (Progressive Disclosure) */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-black/90 via-[#0e0e16] to-black/95 border-2 border-purple-500/40 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-3xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedModule.icon}</span>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      {selectedModule.title} — Deep Dive
                    </h3>
                    <p className="text-zinc-400 text-xs font-light">
                      {selectedModule.tagline} • Expected Horizon: {selectedModule.timeline}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedModule(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors text-sm"
                  aria-label="Close deep dive"
                >
                  ✕
                </button>
              </div>

              {/* Grid of Intelligence Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Key Catalysts */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                  <span className="text-emerald-400 font-mono text-xs uppercase font-bold block mb-2.5">
                    🚀 Key Growth Catalysts
                  </span>
                  <ul className="space-y-1.5">
                    {selectedModule.catalysts.map((cat, i) => (
                      <li key={i} className="text-zinc-300 text-xs flex items-start gap-2 font-light">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Risks */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                  <span className="text-rose-400 font-mono text-xs uppercase font-bold block mb-2.5">
                    ⚠ Structural Headwinds & Risks
                  </span>
                  <ul className="space-y-1.5">
                    {selectedModule.risks.map((risk, i) => (
                      <li key={i} className="text-zinc-300 text-xs flex items-start gap-2 font-light">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Institutional Exposure */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-blue-400 font-mono text-xs uppercase font-bold block mb-2.5">
                      🏛️ Institutional Exposure
                    </span>
                    <div className="mb-3">
                      <span className="text-[10px] text-zinc-500 uppercase block mb-1 font-mono">Pure-Play Equities</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedModule.companies.map((c) => (
                          <a
                            key={c}
                            href={`/companies/${c}`}
                            className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 font-mono text-xs font-bold transition-colors"
                          >
                            ${c} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block mb-1 font-mono">Top Thematic ETFs</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedModule.etfs.map((e) => (
                          <span
                            key={e}
                            className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-300 font-mono text-xs font-medium"
                          >
                            ${e}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reusable Why This Matters Today */}
              <WhyThisMatters
                title="Why This Matters Today"
                reason={selectedModule.whyItMatters}
                variant="banner"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
