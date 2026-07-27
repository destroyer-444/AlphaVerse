"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { navigationItems } from "@/data/navigation";
import { APP_NAME } from "@/lib/constants";
import SpotlightSearch from "@/components/common/SpotlightSearch";

export default function Navigation() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut
  const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
    if (e.key === "Escape" && dropdownOpen) {
      setDropdownOpen(false);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <a
              href="/"
              aria-label={`${APP_NAME} — Home`}
              className="text-white font-semibold text-xl tracking-tight shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg px-1"
            >
              {APP_NAME}
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6" role="menubar" aria-label="Site sections">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  aria-label={item.label}
                  className="relative text-zinc-400 hover:text-white transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-1 py-0.5"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-blue-400/60 transition-all duration-200 group-hover:w-full rounded-full"
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
            </div>

            {/* Right side: Search trigger + User Menu */}
            <div className="flex items-center gap-3 shrink-0 relative">
              {/* Search trigger button */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search (Ctrl+K)"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="
                  hidden sm:flex items-center gap-2 px-3 py-1.5
                  bg-white/6 hover:bg-white/10
                  border border-white/10 hover:border-white/20
                  text-zinc-400 hover:text-zinc-200
                  rounded-xl text-sm
                  transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                "
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs">Search</span>
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 bg-white/8 border border-white/10 rounded text-[10px] font-mono text-zinc-500">
                  ⌘K
                </kbd>
              </motion.button>

              {/* Mobile search icon */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                whileTap={{ scale: 0.93 }}
                className="sm:hidden p-2 text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>

              {/* Auth Menu */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-label="User Account Menu"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Alex Vance avatar"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-white hidden md:inline pr-1">Alex Vance</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      role="menu"
                      aria-label="User options"
                      className="absolute right-0 mt-2 w-56 bg-[#0e0e12]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 shadow-2xl z-50 animate-fadeIn"
                    >
                      <div className="px-3 py-2 border-b border-white/8 mb-1">
                        <p className="text-xs font-bold text-white truncate">Alex Vance</p>
                        <p className="text-[10px] text-zinc-400 truncate font-mono">alex.vance@alphaverse.ai</p>
                        <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          PRO MEMBER
                        </span>
                      </div>

                      <a
                        href="/profile"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <span aria-hidden="true">👤</span>
                        <span>Profile</span>
                      </a>

                      <a
                        href="/profile"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <span aria-hidden="true">⚙️</span>
                        <span>Settings</span>
                      </a>

                      <a
                        href="/intelligence"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <span aria-hidden="true">🧠</span>
                        <span>Dashboard</span>
                      </a>

                      <div className="border-t border-white/8 mt-1 pt-1">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setIsLoggedIn(false);
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors text-left"
                        >
                          <span aria-hidden="true">🚪</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <motion.button
                  onClick={() => setIsLoggedIn(true)}
                  aria-label="Sign in to AlphaVerse"
                  className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  Sign In
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spotlight Search Portal */}
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
