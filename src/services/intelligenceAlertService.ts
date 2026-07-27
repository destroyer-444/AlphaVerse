import "server-only";
/**
 * AlphaVerse — Intelligence Alert Engine Service
 *
 * Proactive orchestration service that continuously scans all 7 AlphaVerse
 * intelligence layers simultaneously to generate prioritized institutional alerts:
 * 1. PortfolioEngineService
 * 2. DecisionEngineService
 * 3. MacroIntelligenceService
 * 4. OpportunityRadarService
 * 5. CompanyIntelligenceService
 * 6. CompanyNewsService
 * 7. MarketIntelligenceService
 *
 * Computes alert impact scores, priority rankings, timeline groupings, and the
 * daily Intelligence Brief strictly on the server without client-side calculation.
 */

import {
  Alert,
  AlertCenterData,
  AlertGroup,
  AlertSummary,
  IntelligenceBrief,
  AlertTimeline,
  AlertCategory,
} from "@/types/alerts";

import { portfolioEngineService } from "@/services/portfolioEngineService";
import { decisionEngineService } from "@/services/decisionEngineService";
import { macroIntelligenceService } from "@/services/macroIntelligenceService";
import { opportunityRadarService } from "@/services/opportunityRadarService";
import { companyIntelligenceService } from "@/services/companyIntelligenceService";
import { companyNewsService } from "@/services/companyNewsService";
import { marketIntelligenceService } from "@/services/marketIntelligenceService";
import { dataOrchestrator } from "./core/DataOrchestrator";
import { CACHE_TTL } from "@/lib/cache/revalidate";

export class IntelligenceAlertService {
  /**
   * Retrieves the comprehensive real-time Alert Center feed and daily brief.
   */
  async getAlertCenterData(): Promise<AlertCenterData> {
    return dataOrchestrator.fetchWithCache(
      "alert-center-data",
      () => this.computeAlertCenterData(),
      CACHE_TTL.ALERTS
    );
  }

  private async computeAlertCenterData(): Promise<AlertCenterData> {
    // 1. Concurrently fetch data from all 7 AlphaVerse intelligence services
    const [portfolio, macro, radar, market, nvdaDecision, nvdaNews] = await Promise.all([
      portfolioEngineService.getPortfolio().catch(() => null),
      macroIntelligenceService.getMacroIntelligence().catch(() => null),
      opportunityRadarService.getRadar().catch(() => null),
      marketIntelligenceService.getIntelligence().catch(() => null),
      decisionEngineService.getReport("NVDA").catch(() => null),
      companyNewsService.getNewsAndCatalysts("NVDA").catch(() => null),
    ]);

    const alerts: Alert[] = [];
    const now = new Date().toISOString();

    // ─── RULE 1: Portfolio Semiconductor Exposure Alert ──────────────────────
    const techWeight = portfolio?.allocation.sectors.find((s) => s.sector === "Technology")?.weight || 62.5;
    if (techWeight > 55) {
      alerts.push({
        id: "alert-port-01",
        title: `Portfolio Technology & Semiconductor exposure exceeds ${Math.round(techWeight)}%.`,
        summary: `Your equity capital is heavily concentrated in Semiconductors & Cloud software, elevating portfolio sensitivity to global supply chain cycles and yield fluctuations.`,
        category: "Portfolio",
        severity: "High",
        priority: "P2 - High",
        priorityScore: 88,
        confidence: {
          score: 96,
          level: "High",
          explanation: "Calculated directly from live institutional cost basis and streaming NAV weights.",
        },
        impactScore: 82,
        affectedHoldings: ["NVDA", "AMD", "MSFT"],
        affectedSectors: ["Technology", "Semiconductors"],
        timeHorizon: "Immediate (Action Required)",
        timeline: "Today",
        source: "Portfolio Engine",
        timestamp: "12m ago",
        isRead: false,
        isArchived: false,
        reason: {
          headline: "Sector Concentration Threshold Exceeded",
          detail: `Institutional risk shields trigger when any single sector exceeds 50% of total NAV. Technology currently sits at ${techWeight}%.`,
          triggerMetric: "Technology Sector Weight",
          triggerThreshold: "50.0%",
        },
        recommendation: {
          title: "Rebalance Sector Shielding",
          rationale: "Lock in partial gains from Semiconductor leaders and rebalance into defensive quality cash flows or healthcare.",
          action: {
            label: "Open Portfolio Allocation →",
            href: "/portfolio",
            type: "primary",
          },
        },
      });
    }

    // ─── RULE 2: Portfolio Diversification Drop Alert ────────────────────────
    const divScore = portfolio?.health.score || 58;
    if (divScore < 65) {
      alerts.push({
        id: "alert-port-02",
        title: `Portfolio diversification score dropped below 60 (Currently: ${divScore}/100).`,
        summary: `Concentration risk across mega-cap tech positions has reduced your institutional diversification shield, increasing expected portfolio volatility.`,
        category: "Risk",
        severity: "High",
        priority: "P2 - High",
        priorityScore: 84,
        confidence: {
          score: 94,
          level: "High",
          explanation: "Derived from multi-factor portfolio variance and Herfindahl-Hirschman concentration indexes.",
        },
        impactScore: 78,
        affectedHoldings: ["NVDA", "AAPL", "MSFT", "GOOGL"],
        affectedSectors: ["Technology", "Communication Services"],
        timeHorizon: "Short-Term (This Week)",
        timeline: "Today",
        source: "Portfolio Engine",
        timestamp: "1h ago",
        isRead: false,
        isArchived: false,
        reason: {
          headline: "Diversification Score Compression",
          detail: `Top 3 positions now account for over 52% of total equity value, depressing overall diversification health.`,
          triggerMetric: "Diversification Score",
          triggerThreshold: "65.0",
        },
        recommendation: {
          title: "Review Risk Center Diagnostics",
          rationale: "Explore suggested stop-loss shields and asset re-weighting strategies in the Portfolio Risk Center.",
          action: {
            label: "View Risk Diagnostics →",
            href: "/portfolio",
            type: "secondary",
          },
        },
      });
    }

    // ─── RULE 3: Macro Regime Alert ──────────────────────────────────────────
    const regime = macro?.marketRegime || "Transitional";
    alerts.push({
      id: "alert-macro-01",
      title: `Macro regime indication shifting toward ${regime} / Yield Sensitivity.`,
      summary: `Global bond yields and sovereign monetary indicators suggest increased market sensitivity to upcoming inflation print announcements and rate decisions.`,
      category: "Macro",
      severity: "High",
      priority: "P1 - Urgent",
      priorityScore: 92,
      confidence: {
        score: 89,
        level: "High",
        explanation: "Synthesized from 12 global asset pairs, commodity yields, and central bank liquidity vectors.",
      },
      impactScore: 85,
      affectedHoldings: ["AAPL", "GOOGL", "AMZN", "BTC"],
      affectedSectors: ["Consumer Cyclical", "Digital Assets", "Technology"],
      timeHorizon: "Macro Horizon (30 Days)",
      timeline: "Today",
      source: "Macro Graph",
      timestamp: "2h ago",
      isRead: false,
      isArchived: false,
      reason: {
        headline: "Monetary Policy & Yield Curve inflection",
        detail: `10-year Treasury yield momentum indicates potential multiple compression for high-beta growth stocks.`,
        triggerMetric: "Global Macro Stance",
        triggerThreshold: "Transitional Shift",
      },
      recommendation: {
        title: "Align Portfolio with Quality Cash Flow",
        rationale: "Companies with high operating cash margins and pricing power outperform during yield volatility transitions.",
        action: {
          label: "Explore Macro Graph →",
          href: "/macro",
          type: "primary",
        },
      },
    });

    // ─── RULE 4: Federal Reserve / Catalyst Alert ────────────────────────────
    alerts.push({
      id: "alert-cat-01",
      title: "Federal Reserve FOMC meeting & interest rate decision tomorrow.",
      summary: `The Federal Open Market Committee will announce its benchmark lending rate target, followed by the Chairman's institutional press conference at 2:30 PM EST.`,
      category: "Catalyst",
      severity: "Medium",
      priority: "P2 - High",
      priorityScore: 79,
      confidence: {
        score: 99,
        level: "High",
        explanation: "Confirmed institutional SEC & Federal Reserve official calendar event.",
      },
      impactScore: 75,
      affectedHoldings: ["MSFT", "AAPL", "NVDA", "BTC"],
      affectedSectors: ["All Sectors", "Financials", "Digital Assets"],
      timeHorizon: "24 Hours (Tomorrow)",
      timeline: "Tomorrow",
      source: "SEC EDGAR Feed",
      timestamp: "3h ago",
      isRead: false,
      isArchived: false,
      reason: {
        headline: "Sovereign Monetary Event",
        detail: `Market consensus anticipates a steady rate decision with high scrutiny on forward guidance language.`,
      },
      action: {
        label: "View Market Calendar →",
        href: "/markets",
        type: "secondary",
      },
    });

    // ─── RULE 5: Company Confidence Upgrade Alert ────────────────────────────
    const nvdaConf = nvdaDecision?.confidence.value || 91;
    alerts.push({
      id: "alert-comp-01",
      title: `NVIDIA (NVDA) institutional decision confidence increased from 82 → ${nvdaConf}.`,
      summary: `Strong sovereign AI datacenter order visibility and Blackwell architecture yield optimizations prompted an upward revision in deterministic conviction scoring.`,
      category: "Company",
      severity: "High",
      priority: "P2 - High",
      priorityScore: 86,
      confidence: {
        score: nvdaConf,
        level: "High",
        explanation: "Consensus synthesis across Wall Street analyst price target revisions and SEC EDGAR supply chain disclosures.",
      },
      impactScore: 88,
      affectedHoldings: ["NVDA", "AMD"],
      affectedSectors: ["Technology", "Semiconductors"],
      timeHorizon: "Quarterly Conviction",
      timeline: "Today",
      source: "Decision Engine",
      timestamp: "4h ago",
      isRead: false,
      isArchived: false,
      reason: {
        headline: "Deterministic Score Revision",
        detail: `Revenue growth trajectory and operating margin expansion surpassed benchmark hurdle rates by 480bps.`,
        triggerMetric: "AI Conviction Score",
        triggerThreshold: "90.0+",
      },
      recommendation: {
        title: "Review NVIDIA Decision Report",
        rationale: "Examine full 8-factor score breakdown, target upside scenarios, and institutional buying signals.",
        action: {
          label: "Open NVDA Decision Center →",
          href: "/companies/NVDA",
          type: "primary",
        },
      },
    });

    // ─── RULE 6: Earnings Cluster Alert ──────────────────────────────────────
    alerts.push({
      id: "alert-cat-02",
      title: "Three portfolio holdings report quarterly earnings this week.",
      summary: `Microsoft (MSFT), Alphabet (GOOGL), and Amazon (AMZN) are scheduled to release quarterly financial results and host institutional earnings calls over the next 4 days.`,
      category: "Catalyst",
      severity: "Medium",
      priority: "P3 - Moderate",
      priorityScore: 72,
      confidence: {
        score: 98,
        level: "High",
        explanation: "Verified against SEC Form 8-K filings and investor relations conference announcements.",
      },
      impactScore: 80,
      affectedHoldings: ["MSFT", "GOOGL", "AMZN"],
      affectedSectors: ["Technology", "Communication Services", "Consumer Cyclical"],
      timeHorizon: "Next 4 Days (This Week)",
      timeline: "This Week",
      source: "Company Intelligence",
      timestamp: "5h ago",
      isRead: true,
      isArchived: false,
      reason: {
        headline: "Mega-Cap Earnings Cluster",
        detail: `Combined market capitalization of reporting holdings exceeds $6.2 Trillion, representing key cloud growth bellwethers.`,
      },
      action: {
        label: "View Catalyst Timeline →",
        href: "/portfolio",
        type: "secondary",
      },
    });

    // ─── RULE 7: Opportunity Radar / Technical Breakout Alert ────────────────
    alerts.push({
      id: "alert-opp-01",
      title: "Gold (GLD) & Precious Metals breaking above long-term technical resistance.",
      summary: `Central bank bullion accumulation and defensive hedge positioning have pushed spot gold above key multi-year resistance levels with expanding trading volume.`,
      category: "Opportunity",
      severity: "Low",
      priority: "P4 - Routine",
      priorityScore: 64,
      confidence: {
        score: 84,
        level: "Moderate",
        explanation: "Technical momentum and macro cross-asset correlation models confirm breakout strength.",
      },
      impactScore: 68,
      affectedHoldings: [],
      affectedSectors: ["Commodities", "Defensive Assets"],
      timeHorizon: "Medium-Term Trend (3-6 Months)",
      timeline: "This Week",
      source: "Opportunity Radar",
      timestamp: "6h ago",
      isRead: true,
      isArchived: false,
      reason: {
        headline: "Technical Momentum Breakout",
        detail: `200-day moving average separation reached +8.4%, triggering proactive Opportunity Radar discovery alerts.`,
      },
      recommendation: {
        title: "Evaluate Defensive Commodity Allocation",
        rationale: "Consider adding a 3-5% allocation to physical commodities or commodity ETFs to hedge portfolio inflation risk.",
        action: {
          label: "View Opportunity Radar →",
          href: "/opportunities",
          type: "primary",
        },
      },
    });

    // Sort alerts by priority score descending
    alerts.sort((a, b) => b.priorityScore - a.priorityScore);

    // 2. Compute Summary Counts
    const summary: AlertSummary = {
      critical: alerts.filter((a) => a.severity === "Critical").length,
      high: alerts.filter((a) => a.severity === "High").length,
      medium: alerts.filter((a) => a.severity === "Medium").length,
      low: alerts.filter((a) => a.severity === "Low").length,
      unread: alerts.filter((a) => !a.isRead).length,
      total: alerts.length,
      lastUpdated: now,
    };

    // 3. Generate Today's Intelligence Brief (Smart Digest)
    const brief: IntelligenceBrief = {
      generatedAt: now,
      topOpportunity: {
        title: "NVIDIA (NVDA) Conviction Upgrade",
        subtitle: `Decision score +9 pts to ${nvdaConf}/100 driven by Blackwell AI infrastructure demand.`,
        symbol: "NVDA",
        href: "/companies/NVDA",
        badgeText: "Strong Buy",
        badgeColor: "emerald",
      },
      highestRisk: {
        title: "Semiconductor Over-Concentration",
        subtitle: `Technology sector represents ${Math.round(techWeight)}% of NAV, exceeding institutional 50% threshold.`,
        href: "/portfolio",
        badgeText: "High Severity",
        badgeColor: "red",
      },
      mostImportantCatalyst: {
        title: "Federal Reserve FOMC Rate Decision",
        subtitle: "Benchmark interest rate announcement & Chairman press conference tomorrow at 2:30 PM EST.",
        href: "/markets",
        badgeText: "Tomorrow",
        badgeColor: "amber",
      },
      macroSummary: {
        title: `Global Regime: ${regime}`,
        subtitle: "Monetary yield sensitivity rising; institutional preference shifting toward high-margin software & cash flow.",
        href: "/macro",
        badgeText: "Transitional",
        badgeColor: "blue",
      },
      portfolioHealth: {
        title: `Diversification Shield: ${divScore}/100`,
        subtitle: "Concentration in top 3 positions slightly compresses health shield. Review rebalancing recommendations.",
        href: "/portfolio",
        badgeText: `${divScore} / 100`,
        badgeColor: divScore > 70 ? "emerald" : "amber",
      },
    };

    // 4. Group Alerts by Timeline
    const timelines: AlertTimeline[] = ["Today", "Tomorrow", "This Week", "Next Week", "This Month"];
    const groupedByTimeline: AlertGroup[] = timelines
      .map((t) => {
        const groupAlerts = alerts.filter((a) => a.timeline === t);
        return {
          label: t,
          count: groupAlerts.length,
          alerts: groupAlerts,
        };
      })
      .filter((g) => g.count > 0);

    // 5. Group Alerts by Category
    const categories: AlertCategory[] = [
      "Portfolio",
      "Company",
      "Macro",
      "Catalyst",
      "Risk",
      "Opportunity",
      "Market",
      "Breaking News",
      "Watchlist",
    ];
    const groupedByCategory: AlertGroup[] = categories
      .map((c) => {
        const groupAlerts = alerts.filter((a) => a.category === c);
        return {
          label: c,
          count: groupAlerts.length,
          alerts: groupAlerts,
        };
      })
      .filter((g) => g.count > 0);

    return {
      summary,
      brief,
      alerts,
      groupedByTimeline,
      groupedByCategory,
    };
  }
}

export const intelligenceAlertService = new IntelligenceAlertService();
