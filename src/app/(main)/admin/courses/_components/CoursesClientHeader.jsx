"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import CreateCourseDialog from "./CreateCourseDialog";

export default function CoursesClientHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
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

      <CreateCourseDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={() => {}} 
        // We no longer need to manually manage courses state since Server Actions auto-revalidate
      />
    </>
  );
}