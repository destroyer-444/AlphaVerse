/**
 * AlphaVerse — User Identity & Profile Platform Types
 *
 * Domain interfaces for persistent user authentication, profiles, preferences,
 * notification settings, and dashboard customizations.
 * Designed with zero vendor lock-in to support NextAuth/Auth.js and future OAuth providers.
 */

export type AuthProviderType = "google" | "github" | "email" | string;

export interface ConnectedAccount {
  id: string;
  provider: AuthProviderType;
  providerName: string;
  email: string;
  status: "Connected" | "Disconnected" | "Pending";
  connectedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "pro" | "member";
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  country: string;
  timezone: string;
  preferredCurrency: string;
  theme: "Dark" | "Light" | "System";
  marketRegion: "US" | "EU" | "APAC" | "Global";
  language: string;
  bio?: string;
  company?: string;
  title?: string;
}

export interface Preferences {
  userId: string;
  theme: "Dark" | "Light" | "System";
  compactMode: boolean;
  animationToggle: boolean;
  defaultLandingPage: string; // e.g. "/markets", "/opportunities", "/intelligence", "/macro"
  preferredMarkets: string[]; // e.g. ["US Equities", "Crypto", "Commodities"]
}

export interface NotificationSettings {
  userId: string;
  emailAlerts: boolean;
  priceSpikes: boolean;
  macroEvents: boolean;
  catalystReminders: boolean;
  weeklyDigest: boolean;
  pushEnabled: boolean;
}

export interface DashboardSettings {
  userId: string;
  layout: "grid" | "list" | "compact";
  defaultTimeframe: "1D" | "1W" | "1M" | "1Y" | "ALL";
  showAIAnalyst: boolean;
  showOpportunityRadar: boolean;
  showMacroGraph: boolean;
  pinnedSymbols: string[];
}

export interface UserSession {
  user: User;
  expires: string;
  status: "authenticated" | "unauthenticated" | "loading";
}

export interface CompleteUserData {
  user: User;
  profile: UserProfile;
  preferences: Preferences;
  notifications: NotificationSettings;
  dashboard: DashboardSettings;
  connectedAccounts: ConnectedAccount[];
}
