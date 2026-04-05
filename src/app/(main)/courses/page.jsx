import {getCourses} from "@/actions/course.action";
import CoursesView from "./_components/CoursesView";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";

export const metadata = {
  title: "Browse Courses | AI/ML Lab",
  description: "Browse and enroll in AI/ML Lab's courses.",
};

export default async function CoursesPage() {
  
  const res = await getCourses(false);
  const courses = res.success ? res.data : [];

  return <CoursesView initialCourses={courses} />;
}
