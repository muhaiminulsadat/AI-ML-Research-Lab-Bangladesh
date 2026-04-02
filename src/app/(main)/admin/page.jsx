import {adminGetAllUsers} from "@/actions/user.action";
import {getCourses} from "@/actions/course.action";
import {getPublications} from "@/actions/publication.action";
import AdminView from "./_components/AdminView";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function AdminPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  const [membersResult, coursesResult, publicationsResult] =
    await Promise.all([
      adminGetAllUsers(),
      getCourses(true),
      getPublications(),
    ]);

  const stats = {
    usersCount: membersResult.data?.length || 0,
    coursesCount: coursesResult.data?.length || 0,
    publicationsCount: publicationsResult.data?.length || 0,
  };

  // Get last 5 registrations
  const recentUsers = membersResult.data?.slice(0, 5) || [];

  return (
    <AdminView
      stats={stats}
      recentUsers={recentUsers}
    />
  );
}
