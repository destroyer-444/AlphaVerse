import Background from "@/components/Background";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import GlobalMarkets from "@/components/GlobalMarkets";
import AINewsIntelligence from "@/components/AINewsIntelligence";

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <Background />
      <Navigation />
      <Hero />
      <GlobalMarkets />
      <AINewsIntelligence />
    </div>
  );
}
