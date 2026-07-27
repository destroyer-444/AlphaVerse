"use client";

/**
 * ProfileDashboard — AlphaVerse Premium Institutional UI
 *
 * Renders the Apple-inspired User Profile & Settings dashboard.
 * Pure presentation — zero business logic.
 * Full accessibility: keyboard navigation, ARIA attributes, and screen reader labels.
 */

import { useState } from "react";
import { CompleteUserData } from "@/types/user";

interface ProfileDashboardProps {
  initialData: CompleteUserData;
}

export default function ProfileDashboard({ initialData }: ProfileDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "avatar" | "account" | "preferences" | "appearance" | "security" | "connected"
  >("avatar");

  const { user, profile, preferences, connectedAccounts } = initialData;
  const [theme, setTheme] = useState(preferences.theme);
  const [compact, setCompact] = useState(preferences.compactMode);
  const [anim, setAnim] = useState(preferences.animationToggle);
  const [twoFactor, setTwoFactor] = useState(true);

  const navItems = [
    { id: "avatar", label: "Identity & Bio", icon: "👤" },
    { id: "account", label: "Account Settings", icon: "⚙️" },
    { id: "preferences", label: "Platform Preferences", icon: "🎛️" },
    { id: "appearance", label: "Visual Appearance", icon: "✨" },
    { id: "security", label: "Security & 2FA", icon: "🛡️" },
    { id: "connected", label: "Connected Providers", icon: "🔗" },
  ] as const;

  return (
    <div className="min-h-screen px-4 sm:px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl" aria-hidden="true">💎</span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Institutional Identity Platform
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">User Profile & Settings</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage your AlphaVerse Pro credentials, market regions, theme preferences, and connected OAuth providers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              AlphaVerse Pro Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar (3 Cols) */}
          <nav
            role="tablist"
            aria-label="Profile navigation sections"
            className="lg:col-span-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-3 space-y-1"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${item.id}`}
                  id={`tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    isActive
                      ? "bg-white text-black shadow-lg"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="text-base" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Content Panel (9 Cols) */}
          <main
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="lg:col-span-9 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden min-h-[520px]"
          >
            {/* 1. Identity & Bio (Avatar) */}
            {activeTab === "avatar" && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Identity & Bio</h2>
                  <p className="text-xs text-zinc-400">Public representation and institutional credentials across AlphaVerse.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/8">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt={`${profile.name}'s profile avatar`}
                      className="w-24 h-24 rounded-full object-cover border-2 border-blue-400/50 shadow-xl"
                    />
                    <span
                      aria-label="Online status"
                      className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-400 border-2 border-black rounded-full"
                    />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 w-max mx-auto sm:mx-0">
                        {profile.title}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 mb-2">{profile.email}</p>
                    <p className="text-xs text-zinc-300 max-w-md">{profile.bio}</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      aria-label="Upload new profile picture"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      Change Avatar
                    </button>
                    <button
                      type="button"
                      aria-label="Remove profile picture"
                      className="px-4 py-2 text-zinc-500 hover:text-red-400 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">Organization</span>
                    <p className="text-sm font-bold text-white">{profile.company}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">Account Role</span>
                    <p className="text-sm font-bold text-emerald-400 capitalize">{user.role} Member (Uncapped API)</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Account Settings</h2>
                  <p className="text-xs text-zinc-400">Regional localization, timezone synchronization, and currency defaults.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="display-name" className="block text-xs font-semibold text-zinc-300 mb-2">Display Name</label>
                    <input
                      id="display-name"
                      type="text"
                      defaultValue={profile.name}
                      aria-label="Display Name"
                      className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email-addr" className="block text-xs font-semibold text-zinc-300 mb-2">Email Address</label>
                    <input
                      id="email-addr"
                      type="email"
                      defaultValue={profile.email}
                      disabled
                      aria-label="Email Address (Disabled)"
                      className="w-full bg-white/[0.02] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="country-sel" className="block text-xs font-semibold text-zinc-300 mb-2">Country / Jurisdiction</label>
                    <input
                      id="country-sel"
                      type="text"
                      defaultValue={profile.country}
                      aria-label="Country or Jurisdiction"
                      className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="timezone-sel" className="block text-xs font-semibold text-zinc-300 mb-2">Timezone</label>
                    <input
                      id="timezone-sel"
                      type="text"
                      defaultValue={profile.timezone}
                      aria-label="Timezone"
                      className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="curr-sel" className="block text-xs font-semibold text-zinc-300 mb-2">Preferred Currency</label>
                    <select
                      id="curr-sel"
                      defaultValue={profile.preferredCurrency}
                      aria-label="Preferred Currency"
                      className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="USD ($)">USD ($) — US Dollar</option>
                      <option value="EUR (€)">EUR (€) — Euro</option>
                      <option value="GBP (£)">GBP (£) — British Pound</option>
                      <option value="JPY (¥)">JPY (¥) — Japanese Yen</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="region-sel" className="block text-xs font-semibold text-zinc-300 mb-2">Primary Market Region</label>
                    <select
                      id="region-sel"
                      defaultValue={profile.marketRegion}
                      aria-label="Primary Market Region"
                      className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="US">United States (NYSE, NASDAQ)</option>
                      <option value="EU">Europe (LSE, Euronext, DAX)</option>
                      <option value="APAC">Asia-Pacific (Tokyo, Hong Kong)</option>
                      <option value="Global">Global All-Market Coverage</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/8 flex justify-end">
                  <button
                    type="button"
                    aria-label="Save account changes"
                    className="px-6 py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    Save Account Changes
                  </button>
                </div>
              </div>
            )}

            {/* 3. Platform Preferences */}
            {activeTab === "preferences" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Platform Preferences</h2>
                  <p className="text-xs text-zinc-400">Configure theme appearance, UI density, animations, and landing routes.</p>
                </div>

                {/* Theme Selector */}
                <div>
                  <span className="block text-xs font-semibold text-zinc-300 mb-3" id="theme-label">Color Scheme Theme</span>
                  <div role="radiogroup" aria-labelledby="theme-label" className="grid grid-cols-3 gap-3 max-w-md">
                    {(["Dark", "Light", "System"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        role="radio"
                        aria-checked={theme === t}
                        onClick={() => setTheme(t)}
                        className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                          theme === t
                            ? "bg-white text-black border-white shadow-md"
                            : "bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {t === "Dark" ? "🌙 Dark" : t === "Light" ? "☀️ Light" : "💻 System"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Switches */}
                <div className="space-y-4 pt-4 border-t border-white/8 max-w-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-white block" id="compact-label">Compact Card Density Mode</span>
                      <span className="text-xs text-zinc-500">Reduce Frosted Glass card padding for high-density terminal screens.</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={compact}
                      aria-labelledby="compact-label"
                      onClick={() => setCompact(!compact)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        compact ? "bg-blue-500" : "bg-white/15"
                      }`}
                    >
                      <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${compact ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-white block" id="anim-label">Micro-Animations & Smooth Transitions</span>
                      <span className="text-xs text-zinc-500">Enable Apple-inspired hover lift effects and glowing gradient borders.</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={anim}
                      aria-labelledby="anim-label"
                      onClick={() => setAnim(!anim)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        anim ? "bg-blue-500" : "bg-white/15"
                      }`}
                    >
                      <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${anim ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>

                {/* Default Landing Page */}
                <div className="pt-4 border-t border-white/8 max-w-md">
                  <label htmlFor="landing-sel" className="block text-xs font-semibold text-zinc-300 mb-2">Default Startup Route</label>
                  <select
                    id="landing-sel"
                    defaultValue={preferences.defaultLandingPage}
                    aria-label="Default Startup Route"
                    className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="/intelligence">🧠 Market Intelligence Dashboard</option>
                    <option value="/opportunities">🎯 Opportunity Radar Engine</option>
                    <option value="/macro">🕸️ Global Macro Intelligence Graph</option>
                    <option value="/markets">📈 Core Markets Benchmark</option>
                  </select>
                </div>
              </div>
            )}

            {/* 4. Visual Appearance Preview */}
            {activeTab === "appearance" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Visual Appearance & Live Preview</h2>
                  <p className="text-xs text-zinc-400">Live preview of how AlphaVerse UI cards respond to your custom profile settings.</p>
                </div>

                <div className={`p-6 rounded-3xl bg-gradient-to-br from-blue-600/15 via-white/[0.03] to-violet-600/15 border border-white/15 transition-all ${compact ? "p-4" : "p-8"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Live Component Preview</span>
                    <span className="text-xs font-mono text-emerald-400">Theme: {theme} | Density: {compact ? "Compact" : "Standard"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Institutional Intelligence Card</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    This sample Frosted Glass container demonstrates the Apple-inspired styling, border luminescence,
                    and micro-interactive hover behaviors active on your workstation.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`bg-white text-black font-semibold text-xs rounded-full px-5 py-2 transition-transform ${anim ? "hover:scale-105 active:scale-95" : ""}`}
                    >
                      Sample Primary Action
                    </button>
                    <button
                      type="button"
                      className="bg-white/10 text-white font-semibold text-xs rounded-full px-5 py-2 border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Security & 2FA */}
            {activeTab === "security" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Security & Active Sessions</h2>
                  <p className="text-xs text-zinc-400">Manage institutional multi-factor authentication and review authorized device access.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-white">Two-Factor Authentication (2FA)</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${twoFactor ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300"}`}>
                        {twoFactor ? "Active (FIDO2 / Passkey)" : "Disabled"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">Protects your account against unauthorized programmatic API access.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`px-5 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      twoFactor ? "bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/25" : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    }`}
                  >
                    {twoFactor ? "Disable 2FA" : "Enable 2FA"}
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">Authorized Workstation Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: "Windows 11 Workstation — Chrome Desktop", ip: "192.168.1.104", loc: "New York, US", current: true, time: "Active Now" },
                      { device: "Apple MacBook Pro M3 — Safari Institutional", ip: "172.16.0.42", loc: "New York, US", current: false, time: "2 hours ago" },
                      { device: "iPhone 16 Pro Max — AlphaVerse iOS Mobile", ip: "10.0.0.18", loc: "Manhattan, US", current: false, time: "Yesterday" },
                    ].map((sess, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl" aria-hidden="true">{sess.device.includes("iPhone") ? "📱" : "💻"}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">{sess.device}</h4>
                              {sess.current && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">This Device</span>
                              )}
                            </div>
                            <p className="text-[10px] font-mono text-zinc-500">{sess.ip} • {sess.loc} • {sess.time}</p>
                          </div>
                        </div>
                        {!sess.current && (
                          <button
                            type="button"
                            aria-label={`Revoke session for ${sess.device}`}
                            className="text-[11px] text-zinc-500 hover:text-red-400 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded px-2 py-1"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. Connected Accounts */}
            {activeTab === "connected" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Connected OAuth Providers</h2>
                  <p className="text-xs text-zinc-400">Single Sign-On (SSO) and passwordless identity federations.</p>
                </div>

                <div className="space-y-3">
                  {connectedAccounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-2xl" aria-hidden="true">
                          {acc.provider === "google" ? "🌐" : acc.provider === "github" ? "🐙" : "✉️"}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white">{acc.providerName}</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                              {acc.status}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-zinc-400 mt-0.5">{acc.email}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label={`Configure connection for ${acc.providerName}`}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-xl text-xs font-semibold border border-white/10 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      >
                        {acc.status === "Connected" ? "Manage Federation" : "Connect Provider"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
