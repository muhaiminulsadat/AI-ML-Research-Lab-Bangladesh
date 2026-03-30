import { getCourses } from "@/actions/course.action";
import CoursesView from "./_components/CoursesView";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Browse Courses | AI/ML Lab",
  description: "Browse and enroll in AI/ML Lab's courses.",
};

export default async function CoursesPage() {
  const { user } = await getCurrentUser();

  // Role check: Only 'member' or 'admin' can access
  if (!user || user.role === "general") {
    redirect("/dashboard"); // or wherever general users should go
  }

  // Fetch only published courses since this is not an admin view
  const res = await getCourses(false);
  const courses = res.success ? res.data : [];

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 lg:p-10">
      <CoursesView initialCourses={courses} />
    </div>
  );
}
