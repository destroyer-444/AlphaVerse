import { ProtectedRoute } from "@/lib/auth";
import { intelligenceAlertService } from "@/services/intelligenceAlertService";
import PageLayout from "@/components/layout/PageLayout";
import AlertCenter from "@/components/alerts/AlertCenter";

export const metadata = {
  title: "Intelligence Alert Engine | AlphaVerse Institutional",
  description: "Proactive real-time alerts synthesized across 7 AlphaVerse intelligence engines, portfolio health shields, and SEC EDGAR catalyst feeds.",
};

export const revalidate = 60; // 60s server revalidation

export default async function AlertsPage() {
  const alertData = await intelligenceAlertService.getAlertCenterData();

  return (
    <PageLayout>
      <ProtectedRoute>
        <AlertCenter initialData={alertData} />
      </ProtectedRoute>
    </PageLayout>
  );
}
