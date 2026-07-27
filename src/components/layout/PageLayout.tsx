import { ReactNode } from "react";
import Background from "@/components/Background";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import ApiMetricsDebugPanel from "@/components/common/ApiMetricsDebugPanel";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-black font-sans">
      <Background />
      <Navigation />
      <div className="relative z-10 pt-24">
        <PageTransition>{children}</PageTransition>
      </div>
      <ApiMetricsDebugPanel />
    </div>
  );
}
