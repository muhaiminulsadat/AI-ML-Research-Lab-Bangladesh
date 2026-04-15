import {Suspense} from "react";
import {adminGetAllUsers} from "@/actions/user.action";
import {getCourses} from "@/actions/course.action";
import {getPublications} from "@/actions/publication.action";
import AdminView from "./_components/AdminView";
import AdminSkeleton from "./_components/AdminSkeleton";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {connection} from "next/server";

async function AdminDataFetcher() {
  await connection();
  const [membersResult, coursesResult, publicationsResult] = await Promise.all([
    adminGetAllUsers(),
    getCourses(true),
    getPublications(true),
  ]);

  const stats = {
    usersCount: membersResult.data?.length || 0,
    coursesCount: coursesResult.data?.length || 0,
    publicationsCount: publicationsResult.data?.length || 0,
  };

  // Get last 5 registrations
  const recentUsers = membersResult.data?.slice(0, 5) || [];

  return <AdminView stats={stats} recentUsers={recentUsers} />;
}

export default async function AdminPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminDataFetcher />
    </Suspense>
  );
}
