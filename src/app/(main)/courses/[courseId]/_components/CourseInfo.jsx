import {Clock, CheckCircle2, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";

export default function CourseInfo({
  course,
  activeLecture,
  isEnrolled,
  isPending,
  isCurrentLectureCompleted,
  onToggleComplete,
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary/10 text-primary">
            {course.difficulty}
          </span>
          {course.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground border border-border/40"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
          {activeLecture ? activeLecture.title : course.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border/60">
              {course.instructor?.profileImage && (
                <AvatarImage src={course.instructor.profileImage} />
              )}
              <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                {course.instructor?.name?.substring(0, 2).toUpperCase() || "IN"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
                Taught by
              </span>
              <span className="text-sm font-semibold text-foreground">
                {course.instructor?.name || "Instructor"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {activeLecture?.duration > 0 && (
              <div className="flex items-center text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/40">
                <Clock className="w-3 h-3 mr-1.5 opacity-60" />
                {activeLecture.duration} min
              </div>
            )}
            {isEnrolled && activeLecture && (
              <Button
                onClick={onToggleComplete}
                disabled={isPending}
                variant={isCurrentLectureCompleted ? "secondary" : "default"}
                size="sm"
                className={cn(
                  "h-8 px-4 text-xs font-medium cursor-pointer transition-all",
                  isCurrentLectureCompleted && "text-success",
                )}
              >
                {isPending ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <CheckCircle2
                    className={cn(
                      "mr-1.5 h-3.5 w-3.5",
                      isCurrentLectureCompleted && "fill-emerald-500/20",
                    )}
                  />
                )}
                {isCurrentLectureCompleted ? "Completed" : "Mark Complete"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border/40" />

      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground mb-3">
          About this course
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground/80 whitespace-pre-wrap">
          {course.description}
        </p>
      </div>
    </div>
  );
}
