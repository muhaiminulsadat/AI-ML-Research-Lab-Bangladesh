import { Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CourseInfo({
  course,
  activeLecture,
  isEnrolled,
  isPending,
  isCurrentLectureCompleted,
  onToggleComplete
}) {
  return (
    <div className="space-y-6 lg:px-2">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3.5 py-1.5 font-bold uppercase tracking-widest text-[10px] shadow-sm">
            {course.difficulty}
          </Badge>
          {course.tags?.slice(0,3).map(tag => (
            <Badge variant="outline" key={tag} className="text-muted-foreground border-border/50 px-3 py-1 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          {activeLecture ? activeLecture.title : course.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-between gap-6 mt-8">
          {/* Instructor Bio Snippet */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-sm">
              {course.instructor?.profileImage && <AvatarImage src={course.instructor.profileImage} />}
              <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
                {course.instructor?.name?.substring(0,2).toUpperCase() || "IN"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Taught by</span>
              <span className="text-base font-bold text-foreground">
                {course.instructor?.name || "Expert Instructor"}
              </span>
            </div>
          </div>
          
          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {activeLecture?.duration > 0 && (
              <div className="flex items-center text-sm font-semibold text-muted-foreground bg-secondary/30 px-3.5 py-2 rounded-xl border border-border/40 shadow-sm">
                <Clock className="w-4 h-4 mr-2 text-primary/80" />
                {activeLecture.duration} mins
              </div>
            )}
            {isEnrolled && activeLecture && (
              <Button 
                onClick={onToggleComplete}
                disabled={isPending}
                variant={isCurrentLectureCompleted ? "secondary" : "default"}
                className={`rounded-xl shadow-lg transition-all font-semibold h-10 px-6 ${isCurrentLectureCompleted ? 'text-emerald-500' : 'shadow-primary/20'}`}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <CheckCircle2 className={`mr-2 h-5 w-5 ${isCurrentLectureCompleted ? 'fill-emerald-500/20' : ''}`} />
                )}
                {isCurrentLectureCompleted ? "Completed" : "Mark Mastered"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator className="border-border/60 my-8" />

      {/* Elegant Description Box */}
      <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none text-muted-foreground">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4">About this course</h3>
        <p className="leading-relaxed whitespace-pre-wrap">
          {course.description}
        </p>
      </div>
    </div>
  );
}
