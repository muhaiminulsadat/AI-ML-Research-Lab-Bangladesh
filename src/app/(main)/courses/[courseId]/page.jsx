import { getCourseById } from "@/actions/course.action";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import CourseDetailView from "./_components/CourseDetailView";

export async function generateMetadata({ params }) {
  const { courseId } = await params;
  const res = await getCourseById(courseId, false);
  
  if (!res.success) return { title: "Course Not Found" };
  return { title: `${res.data.title} | AI/ML Lab` };
}

export default async function CourseDetailPage({ params }) {
  const { courseId } = await params;
  const { user } = await getCurrentUser();

  if (!user || user.role === "general") {
    redirect("/dashboard");
  }

  // Fetch only if it's published (handled correctly by false parameter)
  const res = await getCourseById(courseId, false);
  
  if (!res.success || !res.data) {
    return notFound();
  }

  return <CourseDetailView course={res.data} />;
}
