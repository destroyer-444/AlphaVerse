import "server-only";
import React from "react";
import { getSession } from "./session";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export async function ProtectedRoute({ children }: ProtectedRouteProps) {
  const session = await getSession();

  if (!session || session.status !== "authenticated") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-2xl text-3xl mb-5">
            🔒
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Authentication Required</h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Please sign in with Google, GitHub, or Email to access this institutional platform area.
          </p>
          <a
            href="/api/auth/signin"
            className="inline-flex items-center justify-center w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Sign In to AlphaVerse
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
