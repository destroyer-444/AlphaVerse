import "server-only";
import { UserSession } from "@/types/user";
import { userService } from "@/services/userService";

export interface AuthProviderConfig {
  id: string;
  name: string;
  type: "oauth" | "email" | "credentials";
  enabled: boolean;
  icon: string;
}

export const AUTH_PROVIDERS: AuthProviderConfig[] = [
  {
    id: "google",
    name: "Google Workspace",
    type: "oauth",
    enabled: true,
    icon: "🌐",
  },
  {
    id: "github",
    name: "GitHub Developer",
    type: "oauth",
    enabled: true,
    icon: "🐙",
  },
  {
    id: "email",
    name: "Magic Link (Passwordless)",
    type: "email",
    enabled: true,
    icon: "✉️",
  },
];

export async function getSession(): Promise<UserSession> {
  const user = await userService.getUser();
  return {
    user,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "authenticated",
  };
}
