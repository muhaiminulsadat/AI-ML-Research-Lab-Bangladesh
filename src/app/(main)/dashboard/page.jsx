import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getMemberStats} from "@/actions/user.action";
import {getUserEnrollments} from "@/actions/enrollment.action";
import DashboardView from "./_components/DashboardView";

export default async function DashboardPage() {
  const {user} = await getCurrentUser();
  if (!user) redirect("/login");

  const [statsRes, enrollmentsRes] = await Promise.all([
    getMemberStats(),
    getUserEnrollments(),
  ]);

  const stats = statsRes.success
    ? statsRes.data
    : {total: 0, members: 0, advisors: 0, corePanel: 0};

  const enrollments = enrollmentsRes.success ? enrollmentsRes.data : [];

  const parsedUser = {
    ...user,
    socialLinks: user.socialLinks
      ? JSON.parse(user.socialLinks)
      : {github: "", linkedin: "", googleScholar: ""},
    researchInterests: user.researchInterests ?? [],
  };

  return <DashboardView user={parsedUser} stats={stats} enrollments={enrollments} />;
}
