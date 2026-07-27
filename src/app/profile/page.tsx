import { ProtectedRoute } from "@/lib/auth";
import { userService } from "@/services/userService";
import PageLayout from "@/components/layout/PageLayout";
import ProfileDashboard from "@/components/profile/ProfileDashboard";

export const metadata = {
  title: "Profile & Settings | AlphaVerse Institutional",
  description: "Manage your AlphaVerse Pro identity, regional market preferences, and connected OAuth federations.",
};

export default async function ProfilePage() {
  const completeData = await userService.getCompleteUserData();

  return (
    <PageLayout>
      <ProtectedRoute>
        <ProfileDashboard initialData={completeData} />
      </ProtectedRoute>
    </PageLayout>
  );
}
