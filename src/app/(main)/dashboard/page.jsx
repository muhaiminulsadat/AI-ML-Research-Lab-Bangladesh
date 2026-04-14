import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getMemberStats} from "@/actions/user.action";
import {getUserEnrollments} from "@/actions/enrollment.action";
import DashboardView from "./_components/DashboardView";
import {Suspense} from "react";
import DashboardHeader from "./_components/DashboardHeader";
import {Skeleton} from "@/components/ui/skeleton";
import DashboardSkeleton from "./_components/DashboardSkeleton";

async function DashboardContent({user}) {
  const [statsRes, enrollmentsRes] = await Promise.all([
    getMemberStats(),
    getUserEnrollments(),
  ]);

  const stats = statsRes.success
    ? statsRes.data
    : {total: 0, members: 0, advisors: 0, corePanel: 0};

  const enrollments = enrollmentsRes.success ? enrollmentsRes.data : [];

  return <DashboardView user={user} stats={stats} enrollments={enrollments} />;
}

export default async function DashboardPage() {
  const {user} = await getCurrentUser();
  if (!user) redirect("/login");

  const parsedUser = {
    ...user,
    socialLinks: user.socialLinks
      ? JSON.parse(user.socialLinks)
      : {github: "", linkedin: "", googleScholar: ""},
    researchInterests: user.researchInterests ?? [],
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      <DashboardHeader user={parsedUser} />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent user={parsedUser} />
      </Suspense>
    </div>
  );
}
