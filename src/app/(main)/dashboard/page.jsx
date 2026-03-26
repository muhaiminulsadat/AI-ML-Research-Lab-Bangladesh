import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getMemberStats} from "@/actions/user.action";
import DashboardView from "./_components/DashboardView";

export default async function DashboardPage() {
  const {user} = await getCurrentUser();
  if (!user) redirect("/login");

  const statsRes = await getMemberStats();
  const stats = statsRes.success
    ? statsRes.data
    : {total: 0, students: 0, researchers: 0};

  const parsedUser = {
    ...user,
    socialLinks: user.socialLinks
      ? JSON.parse(user.socialLinks)
      : {github: "", linkedin: "", googleScholar: ""},
    researchInterests: user.researchInterests ?? [],
  };

  return <DashboardView user={parsedUser} stats={stats} />;
}
