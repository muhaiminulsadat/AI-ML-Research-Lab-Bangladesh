import {getCourseById} from "@/actions/course.action";
import {getEnrollment} from "@/actions/enrollment.action";
import {getCurrentUser} from "@/lib/auth";
import {redirect, notFound} from "next/navigation";
import CourseDetailView from "./_components/CourseDetailView";

export async function generateMetadata({params}) {
  const {courseId} = await params;
  const res = await getCourseById(courseId, false);

  if (!res.success) return {title: "Course Not Found"};
  return {title: `${res.data.title} | ML & AI Lab`};
}

export default async function CourseDetailPage({params}) {
  const {courseId} = await params;
  const userRes = await getCurrentUser();

  if (!userRes?.user) {
    redirect(`/login?callbackUrl=/courses/${courseId}`);
  }

  if (userRes.user.role === "general") {
    redirect("/dashboard");
  }

  // Fetch course and enrollment concurrently
  const [courseRes, enrollmentRes] = await Promise.all([
    getCourseById(courseId, false),
    getEnrollment(courseId),
  ]);

  if (!courseRes.success || !courseRes.data) {
    return notFound();
  }

  return (
    <CourseDetailView
      course={courseRes.data}
      initialEnrollment={enrollmentRes.data || null}
    />
  );
}
