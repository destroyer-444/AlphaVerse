import "server-only";
/**
 * AlphaVerse — User Service
 *
 * Backend service layer managing user profiles, preferences, notification settings,
 * and dashboard layouts. Maintains clean separation of concerns without vendor lock-in.
 */

import {
  User,
  UserProfile,
  Preferences,
  NotificationSettings,
  DashboardSettings,
  ConnectedAccount,
  CompleteUserData,
} from "@/types/user";

// Default persistent user for AlphaVerse Pro
const DEFAULT_USER_ID = "usr-alpha-001";

const DEFAULT_USER: User = {
  id: DEFAULT_USER_ID,
  name: "Alex Vance",
  email: "alex.vance@alphaverse.ai",
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "pro",
  createdAt: "2025-01-15T08:30:00Z",
  updatedAt: new Date().toISOString(),
};

const DEFAULT_PROFILE: UserProfile = {
  userId: DEFAULT_USER_ID,
  name: "Alex Vance",
  email: "alex.vance@alphaverse.ai",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  country: "United States",
  timezone: "America/New_York (UTC-5)",
  preferredCurrency: "USD ($)",
  theme: "Dark",
  marketRegion: "US",
  language: "English (US)",
  bio: "Lead Institutional Quantitative Strategist & AI Portfolio Architect.",
  company: "AlphaVerse Capital Labs",
  title: "Principal Quantitative Analyst",
};

const DEFAULT_PREFERENCES: Preferences = {
  userId: DEFAULT_USER_ID,
  theme: "Dark",
  compactMode: false,
  animationToggle: true,
  defaultLandingPage: "/intelligence",
  preferredMarkets: ["US Equities", "Semiconductors", "Artificial Intelligence", "Crypto"],
};

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  userId: DEFAULT_USER_ID,
  emailAlerts: true,
  priceSpikes: true,
  macroEvents: true,
  catalystReminders: true,
  weeklyDigest: true,
  pushEnabled: false,
};

const DEFAULT_DASHBOARD: DashboardSettings = {
  userId: DEFAULT_USER_ID,
  layout: "grid",
  defaultTimeframe: "1M",
  showAIAnalyst: true,
  showOpportunityRadar: true,
  showMacroGraph: true,
  pinnedSymbols: ["NVDA", "AAPL", "MSFT", "BTC"],
};

const DEFAULT_CONNECTED_ACCOUNTS: ConnectedAccount[] = [
  {
    id: "acc-google-01",
    provider: "google",
    providerName: "Google Workspace",
    email: "alex.vance@alphaverse.ai",
    status: "Connected",
    connectedAt: "2025-01-15",
  },
  {
    id: "acc-github-01",
    provider: "github",
    providerName: "GitHub Developer",
    email: "alex-vance-quant",
    status: "Connected",
    connectedAt: "2025-02-01",
  },
  {
    id: "acc-email-01",
    provider: "email",
    providerName: "Magic Link (Passwordless)",
    email: "alex.vance@alphaverse.ai",
    status: "Connected",
    connectedAt: "2025-01-15",
  },
];

// In-memory store simulating database persistence across server requests
const store = {
  users: new Map<string, User>([[DEFAULT_USER_ID, DEFAULT_USER]]),
  profiles: new Map<string, UserProfile>([[DEFAULT_USER_ID, DEFAULT_PROFILE]]),
  preferences: new Map<string, Preferences>([[DEFAULT_USER_ID, DEFAULT_PREFERENCES]]),
  notifications: new Map<string, NotificationSettings>([[DEFAULT_USER_ID, DEFAULT_NOTIFICATIONS]]),
  dashboards: new Map<string, DashboardSettings>([[DEFAULT_USER_ID, DEFAULT_DASHBOARD]]),
  connectedAccounts: new Map<string, ConnectedAccount[]>([[DEFAULT_USER_ID, DEFAULT_CONNECTED_ACCOUNTS]]),
};

export class UserService {
  async getUser(userId = DEFAULT_USER_ID): Promise<User> {
    return store.users.get(userId) || DEFAULT_USER;
  }

  async getProfile(userId = DEFAULT_USER_ID): Promise<UserProfile> {
    return store.profiles.get(userId) || DEFAULT_PROFILE;
  }

  async getPreferences(userId = DEFAULT_USER_ID): Promise<Preferences> {
    return store.preferences.get(userId) || DEFAULT_PREFERENCES;
  }

  async getNotifications(userId = DEFAULT_USER_ID): Promise<NotificationSettings> {
    return store.notifications.get(userId) || DEFAULT_NOTIFICATIONS;
  }

  async getDashboardSettings(userId = DEFAULT_USER_ID): Promise<DashboardSettings> {
    return store.dashboards.get(userId) || DEFAULT_DASHBOARD;
  }

  async getConnectedAccounts(userId = DEFAULT_USER_ID): Promise<ConnectedAccount[]> {
    return store.connectedAccounts.get(userId) || DEFAULT_CONNECTED_ACCOUNTS;
  }

  async getCompleteUserData(userId = DEFAULT_USER_ID): Promise<CompleteUserData> {
    const [user, profile, preferences, notifications, dashboard, connectedAccounts] = await Promise.all([
      this.getUser(userId),
      this.getProfile(userId),
      this.getPreferences(userId),
      this.getNotifications(userId),
      this.getDashboardSettings(userId),
      this.getConnectedAccounts(userId),
    ]);

    return {
      user,
      profile,
      preferences,
      notifications,
      dashboard,
      connectedAccounts,
    };
  }

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const current = await this.getProfile(userId);
    const updated = { ...current, ...data };
    store.profiles.set(userId, updated);
    return updated;
  }

  async updatePreferences(userId: string, data: Partial<Preferences>): Promise<Preferences> {
    const current = await this.getPreferences(userId);
    const updated = { ...current, ...data };
    store.preferences.set(userId, updated);
    return updated;
  }
}

export const userService = new UserService();
