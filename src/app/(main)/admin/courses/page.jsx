import { getCourses } from "@/actions/course.action";
import CoursesAdminView from "./_components/CoursesAdminView";

export const metadata = {
  title: "Manage Courses | Admin",
};

export default async function AdminCoursesPage() {
  const res = await getCourses(true);
  const courses = res.success ? res.data : [];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-12 py-10">
      <CoursesAdminView initialCourses={courses} />
    </div>
  );
}
