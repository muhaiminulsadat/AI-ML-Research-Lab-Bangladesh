"use client";

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import CreateCourseDialog from "./CreateCourseDialog";

export default function CoursesAdminView({initialCourses}) {
  const [courses, setCourses] = useState(initialCourses);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground mt-1">
            Manage lab courses, modules, and enrollments.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-card/50">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">No courses yet</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">
              You haven&apos;t created any courses. Click the button above to
              start your first course.
            </p>
          </div>
        ) : (
          courses.map((course) => (
            <Card
              key={course._id}
              className="group hover:shadow-md transition-all border-border/50"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant="outline"
                    className="capitalize bg-secondary/50"
                  >
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
          ))
        )}
      </div>

      <CreateCourseDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={(newCourse) => setCourses([newCourse, ...courses])}
      />
    </div>
  );
}
