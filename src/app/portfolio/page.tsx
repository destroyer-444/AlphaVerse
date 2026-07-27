import { ProtectedRoute } from "@/lib/auth";
import { portfolioEngineService } from "@/services/portfolioEngineService";
import PageLayout from "@/components/layout/PageLayout";
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";

export const metadata = {
  title: "Portfolio Intelligence Workspace | AlphaVerse Institutional",
  description: "Live multi-asset portfolio evaluation, risk diagnostics, and AI decision consensus powered by 6 synchronized intelligence engines.",
};

export const revalidate = 60; // 60s server revalidation

export default async function PortfolioPage() {
  const portfolio = await portfolioEngineService.getPortfolio();

  return (
    <PageLayout>
      <ProtectedRoute>
        <PortfolioDashboard portfolio={portfolio} />
      </ProtectedRoute>
    </PageLayout>
  );
}
