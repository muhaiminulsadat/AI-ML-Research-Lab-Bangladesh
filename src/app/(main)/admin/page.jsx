import {getApplications} from "@/actions/application.action";
import {adminGetAllUsers} from "@/actions/user.action";
import {getCourses} from "@/actions/course.action";
import {getPublications} from "@/actions/publication.action";
import AdminView from "./_components/AdminView";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function AdminPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  const [applicationsResult, membersResult, coursesResult, publicationsResult] =
    await Promise.all([
      getApplications(),
      adminGetAllUsers(),
      getCourses(true),
      getPublications(),
    ]);

  const stats = {
    usersCount: membersResult.data?.length || 0,
    coursesCount: coursesResult.data?.length || 0,
    publicationsCount: publicationsResult.data?.length || 0,
  };

  return (
    <AdminView
      applications={applicationsResult}
      stats={stats}
    />
  );
}
