import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { marketIntelligenceService } from "@/services/marketIntelligenceService";
import MarketIntelligenceSection from "@/components/markets/MarketIntelligenceSection";

export const revalidate = 60;

export default async function IntelligencePage() {
  const intelligenceData = await marketIntelligenceService.getIntelligence();

  return (
    <PageLayout>
      <div className="px-6 py-12 bg-black min-h-screen text-white">
        <div className="max-w-7xl mx-auto">
          <MarketIntelligenceSection data={intelligenceData} />
        </div>
      </div>
    </PageLayout>
  );
}
