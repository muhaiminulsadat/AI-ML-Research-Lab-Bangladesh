import { getCourseById } from "@/actions/course.action";
import { notFound } from "next/navigation";
import CourseEditorView from "./_components/CourseEditorView";

export const metadata = {
  title: "Edit Course | Admin",
};

export default async function EditCoursePage({ params }) {
  const { courseId } = await params;

  const res = await getCourseById(courseId, true);

  if (!res.success || !res.data) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <CourseEditorView initialCourse={res.data} />
    </div>
  );
}
