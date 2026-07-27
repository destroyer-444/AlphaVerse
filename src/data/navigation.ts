import { NavigationItem } from "@/types/navigation";

// Primary institutional navigation groups
export const groupedNavigation: { [key: string]: NavigationItem[] } = {
  Primary: [
    {
      label: "Markets",
      href: "/markets",
      group: "Primary",
      description: "Global asset classes, forex, crypto & commodities",
    },
    {
      label: "Research",
      href: "/companies",
      group: "Primary",
      description: "Deep fundamental company analysis & catalyst news",
      children: [
        { label: "Companies Directory", href: "/companies", description: "Global equities & financial profiles" },
        { label: "Market News", href: "/news", description: "Live AI-synthesized catalysts & headlines" },
        { label: "AI Insights", href: "/insights", description: "Plain-language intelligence summaries" },
      ],
    },
    {
      label: "Discover",
      href: "/intelligence",
      group: "Primary",
      description: "Proactive AI discovery & macro correlations",
      children: [
        { label: "AI Decision Engine", href: "/intelligence", description: "Deterministic BUY/SELL ratings & signals" },
        { label: "Macro Intelligence", href: "/macro", description: "Cross-asset influence graphs & themes" },
        { label: "Opportunity Radar", href: "/opportunities", description: "Proactive algorithmic asset discovery" },
        { label: "Future Trends", href: "/trends", description: "The Next Big Thing & emerging mega-sectors" },
      ],
    },
    {
      label: "Tools",
      href: "/portfolio",
      group: "Primary",
      description: "Personalized institutional workspaces & monitoring",
      children: [
        { label: "Portfolio Intelligence", href: "/portfolio", description: "Live holding evaluation & diversification" },
        { label: "Alert Center", href: "/alerts", description: "Prioritized proactive event notifications" },
      ],
    },
  ],
  Secondary: [
    { label: "Profile", href: "/profile", group: "Secondary" },
    { label: "About", href: "/about", group: "Secondary" },
  ],
};

// Flat list for global search indexing and backward compatibility
export const navigationItems: NavigationItem[] = [
  { label: "Markets", href: "/markets" },
  { label: "Companies", href: "/companies" },
  { label: "News", href: "/news" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Macro", href: "/macro" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Alerts", href: "/alerts" },
  { label: "AI Insights", href: "/insights" },
  { label: "Future Trends", href: "/trends" },
  { label: "About", href: "/about" },
  { label: "Profile", href: "/profile" },
];
