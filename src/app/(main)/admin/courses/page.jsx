import {getCourses} from "@/actions/course.action";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {connection} from "next/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import CoursesClientHeader from "./_components/CoursesClientHeader";

export const metadata = {
  title: "Manage Courses | Admin",
};

async function CoursesAdminData() {
  await connection();
  const res = await getCourses(true);
  const courses = res.success ? res.data : [];

  if (courses.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-card/50 mt-6">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Plus className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">No courses yet</h3>
        <p className="text-muted-foreground mt-1 max-w-sm">
          You haven&apos;t created any courses. Click the button above to start
          your first course.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {courses.map((course) => (
        <Card
          key={course._id}
          className="group hover:shadow-md transition-all border-border/50"
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline" className="capitalize bg-secondary/50">
                {course.difficulty}
              </Badge>
              <Badge variant={course.isPublished ? "default" : "secondary"}>
                {course.isPublished ? "Published" : "Draft"}
              </Badge>
            </div>
            <CardTitle className="line-clamp-1">{course.title}</CardTitle>
            <CardDescription className="line-clamp-2 min-h-[2.5rem]">
              {course.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center justify-between">
              <span>{course.modules?.length || 0} Modules</span>
              <Button variant="ghost" size="sm" className="h-8" asChild>
                <Link href={`/admin/courses/${course._id}`}>Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {Array.from({length: 6}).map((_, i) => (
        <Card key={i} className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-1" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-2/3 mt-1" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mt-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminCoursesPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-12 py-10 space-y-6">
      <CoursesClientHeader />

      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesAdminData />
      </Suspense>
    </div>
  );
}
