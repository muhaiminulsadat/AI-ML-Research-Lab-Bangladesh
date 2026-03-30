"use client";

import {useState} from "react";
import Link from "next/link";
import {ArrowLeft, Edit, Plus, Trash, PlayCircle, Clock} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {toast} from "sonner";
import {toggleCoursePublish} from "@/actions/course.action";
import CreateModuleDialog from "./CreateModuleDialog";
import CreateLectureDialog from "./CreateLectureDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

export default function CourseEditorView({initialCourse}) {
  const [course, setCourse] = useState(initialCourse);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [isLectureOpen, setIsLectureOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleTogglePublish = async () => {
    setIsPublishing(true);
    const newStatus = !course.isPublished;
    const res = await toggleCoursePublish(course._id, newStatus);

    if (res.success) {
      setCourse(res.data);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setIsPublishing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-3 mb-2 text-muted-foreground"
          >
            <Link href="/admin/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold tracking-tight">
                  {course.title}
                </h2>
                <Badge variant={course.isPublished ? "default" : "secondary"}>
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 max-w-2xl">
                {course.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                Edit Details
              </Button>
              <Button onClick={handleTogglePublish} disabled={isPublishing}>
                {course.isPublished ? "Unpublish" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: Modules */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Course Modules</h3>
              <p className="text-sm text-muted-foreground">
                Organize your course content into modules and lectures.
              </p>
            </div>
            <Button size="sm" onClick={() => setIsModuleOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Module
            </Button>
          </div>

          {course.modules?.length === 0 ? (
            <Card className="border-dashed bg-card/50">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium text-foreground">
                  No modules created yet
                </p>
                <p className="text-sm mt-1 max-w-sm">
                  Get started by creating your first module to hold video
                  lectures.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsModuleOpen(true)}
                >
                  Create First Module
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {course.modules
                .sort((a, b) => a.order - b.order)
                .map((module) => (
                  <Card key={module._id || module.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle className="text-base font-semibold">
                          {module.title}
                        </CardTitle>
                        <CardDescription>
                          {module.lectures?.length || 0} Lectures
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {module.lectures?.length > 0 && (
                        <div className="flex flex-col gap-2 mb-4">
                          {module.lectures.sort((a, b) => a.order - b.order).map((lecture) => (
                            <div key={lecture._id || lecture.title} className="flex items-center justify-between p-3 rounded-md border bg-secondary/20 hover:bg-secondary/40 transition-colors">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <PlayCircle className="h-5 w-5 text-primary/70 shrink-0" />
                                <span className="text-sm font-medium truncate">{lecture.title}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                {lecture.duration > 0 && (
                                  <span className="flex items-center text-xs text-muted-foreground bg-secondary/60 px-2 py-1 rounded-md">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {lecture.duration}m
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-dashed"
                        onClick={() => {
                          setActiveModuleId(module._id);
                          setIsLectureOpen(true);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Lecture
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>

        {/* Sidebar: Course Meta info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium capitalize">
                  {course.difficulty}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Instructor</span>
                <span
                  className="font-medium truncate max-w-[120px]"
                  title={course.instructor?.name}
                >
                  {course.instructor?.name || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Created At</span>
                <span className="font-medium">
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tags</span>
                <div className="flex gap-1 flex-wrap justify-end">
                  {course.tags?.length > 0 ? (
                    course.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-xs italic">
                      None
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateModuleDialog
        courseId={course._id}
        open={isModuleOpen}
        onOpenChange={setIsModuleOpen}
        onSuccess={(updatedCourse) => setCourse(updatedCourse)}
      />

      <CreateLectureDialog
        courseId={course._id}
        moduleId={activeModuleId}
        open={isLectureOpen}
        onOpenChange={setIsLectureOpen}
        onSuccess={(updatedCourse) => setCourse(updatedCourse)}
      />
    </div>
  );
}
