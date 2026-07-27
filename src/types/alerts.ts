/**
 * AlphaVerse — Intelligence Alert Engine Domain Types
 *
 * Models proactive real-time notifications derived from portfolio health,
 * macro regime shifts, consensus decision engine upgrades, and upcoming SEC catalysts.
 * Server-first domain definitions ensuring zero client-side calculation duplication.
 */

export type AlertSeverity = "Critical" | "High" | "Medium" | "Low";

export type AlertPriority = "P1 - Urgent" | "P2 - High" | "P3 - Moderate" | "P4 - Routine";

export type AlertCategory =
  | "Portfolio"
  | "Company"
  | "Macro"
  | "Market"
  | "Risk"
  | "Opportunity"
  | "Breaking News"
  | "Catalyst"
  | "Watchlist";

export type AlertSource =
  | "Portfolio Engine"
  | "Decision Engine"
  | "Macro Graph"
  | "Opportunity Radar"
  | "Company Intelligence"
  | "Market Intelligence"
  | "SEC EDGAR Feed";

export type AlertTimeline = "Today" | "Tomorrow" | "This Week" | "Next Week" | "This Month";

export interface AlertAction {
  label: string;
  href: string;
  type: "primary" | "secondary" | "danger";
}

export interface AlertRecommendation {
  title: string;
  rationale: string;
  action: AlertAction;
}

export interface AlertConfidence {
  score: number; // 0-100
  level: "High" | "Moderate" | "Cautious";
  explanation: string;
}

export interface AlertReason {
  headline: string;
  detail: string;
  triggerMetric?: string;
  triggerThreshold?: string;
}

export interface Alert {
  id: string;
  title: string;
  summary: string;
  category: AlertCategory;
  severity: AlertSeverity;
  priority: AlertPriority;
  priorityScore: number; // 0-100 sorting score
  confidence: AlertConfidence;
  impactScore: number; // 0-100
  affectedHoldings: string[];
  affectedSectors: string[];
  timeHorizon: string; // e.g., "Imminent (24h)", "Short-Term (5d)", "Quarterly"
  timeline: AlertTimeline;
  source: AlertSource;
  timestamp: string; // ISO string or relative e.g., "10m ago"
  isRead: boolean;
  isArchived: boolean;
  reason: AlertReason;
  recommendation?: AlertRecommendation;
  action?: AlertAction;
}

export interface AlertSummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
  unread: number;
  total: number;
  lastUpdated: string;
}

export interface BriefItem {
  title: string;
  subtitle: string;
  symbol?: string;
  href: string;
  badgeText: string;
  badgeColor: string;
}

export interface IntelligenceBrief {
  generatedAt: string;
  topOpportunity: BriefItem;
  highestRisk: BriefItem;
  mostImportantCatalyst: BriefItem;
  macroSummary: BriefItem;
  portfolioHealth: BriefItem;
}

export interface AlertGroup {
  label: string;
  count: number;
  alerts: Alert[];
}

export interface AlertCenterData {
  summary: AlertSummary;
  brief: IntelligenceBrief;
  alerts: Alert[];
  groupedByTimeline: AlertGroup[];
  groupedByCategory: AlertGroup[];
}
