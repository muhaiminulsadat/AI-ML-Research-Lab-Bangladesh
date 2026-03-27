import {getApplications} from "@/actions/application.action";
import {getApprovedMembers} from "@/actions/user.action";
import AdminView from "./_components/AdminView";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function AdminPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  const [applicationsResult, membersResult] = await Promise.all([
    getApplications(),
    getApprovedMembers(),
  ]);

  return (
    <AdminView
      applications={applicationsResult}
      members={membersResult.data || []}
    />
  );
}
