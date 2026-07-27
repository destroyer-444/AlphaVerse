import Background from "@/components/Background";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TodaysAIBrief from "@/components/home/TodaysAIBrief";
import GlobalMarkets from "@/components/GlobalMarkets";
import AINewsIntelligence from "@/components/AINewsIntelligence";
import HomeAIInsights from "@/components/home/HomeAIInsights";
import HomeOpportunityRadar from "@/components/home/HomeOpportunityRadar";
import NextBigThing from "@/components/home/NextBigThing";
import FeaturedCompanies from "@/components/home/FeaturedCompanies";
import HomeMacroIntelligence from "@/components/home/HomeMacroIntelligence";

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-blue-500/30 selection:text-white">
      <Background />
      <Navigation />
      
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. Today's AI Brief (Critical Hierarchy) */}
      <TodaysAIBrief />
      
      {/* 3. Global Markets Snapshot */}
      <GlobalMarkets />
      
      {/* 4. Top News */}
      <AINewsIntelligence />
      
      {/* 5. AI Insights (Important Hierarchy) */}
      <HomeAIInsights />
      
      {/* 6. Opportunity Radar */}
      <HomeOpportunityRadar />
      
      {/* 7. Next Big Thing (Scalable Module) */}
      <NextBigThing />
      
      {/* 8. Featured Companies (Reference Hierarchy) */}
      <FeaturedCompanies />
      
      {/* 9. Macro Intelligence */}
      <HomeMacroIntelligence />
    </div>
  );
}
