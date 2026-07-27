import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/common/PageHero";
import { macroIntelligenceService } from "@/services/macroIntelligenceService";
import MacroDashboard from "@/components/macro/MacroDashboard";

export const revalidate = 60; // 60 seconds revalidation per spec

export default async function MacroPage() {
  const data = await macroIntelligenceService.getMacroIntelligence();

  return (
    <PageLayout>
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <PageHero
            title="Cross-Asset Macro Intelligence"
            category="Systemic Influence Engine"
            summary="Map chain reactions between central bank rates, geopolitical energy bottlenecks, and global equity valuation multiples."
            whyItMatters="A single macroeconomic shock (e.g. Strait of Hormuz oil spike) alters discount rates across every equity in your portfolio."
            howToUse={[
              "Click any node in the interactive influence graph below to isolate its downstream chain reactions.",
              "Review the regime indicators to determine if capital is actively rotating into Risk-On or Defensive setups.",
              "Test historical stress scenarios in the simulation panel to gauge portfolio vulnerability.",
            ]}
            proTip="Notice how the 10-year Treasury yield node acts as the primary gravitational pull on high-valuation software equities."
          />
          <MacroDashboard data={data} />
        </div>
      </div>
    </PageLayout>
  );
}
