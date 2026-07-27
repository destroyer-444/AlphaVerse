import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/common/PageHero";
import { marketIntelligenceService } from "@/services/marketIntelligenceService";
import MarketIntelligenceSection from "@/components/markets/MarketIntelligenceSection";

export const revalidate = 60;

export default async function IntelligencePage() {
  const intelligenceData = await marketIntelligenceService.getIntelligence();

  return (
    <PageLayout>
      <div className="px-6 py-8 bg-black min-h-screen text-white">
        <div className="max-w-7xl mx-auto">
          <PageHero
            title="AI Decision Engine"
            category="Deterministic 6-Engine Consensus"
            summary="Continuous algorithmic evaluation of financial statements, institutional order flow, and SEC insider filings."
            whyItMatters="Removes subjective bias and emotional noise by synthesizing fundamental value, momentum, and risk shields into clear BUY/SELL ratings."
            howToUse={[
              "Review the Overall Market Regime score to determine macro risk tolerance before deploying capital.",
              "Filter equities by Consensus Rating (Strong Buy, Buy, Hold) to identify high-conviction institutional setups.",
              "Inspect the Individual Engine Breakdown on any stock card to see which factor (Value, Momentum, Risk) is driving the thesis.",
            ]}
            proTip="Look for divergence where Fundamental Value scores are high but technical Sentiment is temporarily depressed—a classic contrarian buying opportunity."
          />
          <MarketIntelligenceSection data={intelligenceData} />
        </div>
      </div>
    </PageLayout>
  );
}
