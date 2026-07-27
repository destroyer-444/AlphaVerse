import PageLayout from "@/components/layout/PageLayout";
import { opportunityRadarService } from "@/services/opportunityRadarService";
import OpportunityRadarSection from "@/components/opportunity/OpportunityRadarSection";

export const revalidate = 60; // Revalidate every minute

export default async function OpportunitiesPage() {
  const radar = await opportunityRadarService.getRadar();

  return (
    <PageLayout>
      <OpportunityRadarSection radar={radar} />
    </PageLayout>
  );
}
