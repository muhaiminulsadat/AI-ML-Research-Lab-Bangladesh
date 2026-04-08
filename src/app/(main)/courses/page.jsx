import {getCourses} from "@/actions/course.action";
import CoursesView from "./_components/CoursesView";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";

export const metadata = {
  title: "Browse Courses | ML & AI Lab",
  description: "Browse and enroll in ML & AI Lab's courses.",
};

export default async function CoursesPage() {
  const res = await getCourses(false);
  const courses = res.success ? res.data : [];

  return <CoursesView initialCourses={courses} />;
}
