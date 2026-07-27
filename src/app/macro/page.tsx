import PageLayout from "@/components/layout/PageLayout";
import { macroIntelligenceService } from "@/services/macroIntelligenceService";
import MacroDashboard from "@/components/macro/MacroDashboard";

export const revalidate = 60; // 60 seconds revalidation per spec

export default async function MacroPage() {
  const data = await macroIntelligenceService.getMacroIntelligence();

  return (
    <PageLayout>
      <MacroDashboard data={data} />
    </PageLayout>
  );
}
