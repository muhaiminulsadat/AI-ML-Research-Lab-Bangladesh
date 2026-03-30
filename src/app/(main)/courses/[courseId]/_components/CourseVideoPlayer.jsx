import {BookOpen, PlayCircle, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function CourseVideoPlayer({
  activeLecture,
  isEnrolled,
  isPending,
  onEnroll,
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-[#0a0a0a]">
      <div className="aspect-[16/9] w-full">
        {!isEnrolled ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground px-6">
            <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mb-5">
              <BookOpen className="h-7 w-7 text-primary/60" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 text-center">
              Enroll to begin learning
            </h3>
            <p className="text-sm text-muted-foreground/70 max-w-sm text-center mb-6">
              Join this course to access all video lectures and track your progress.
            </p>
            <Button
              onClick={onEnroll}
              disabled={isPending}
              className="px-6 cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlayCircle className="mr-2 h-4 w-4" />
              )}
              Start Course
            </Button>
          </div>
        ) : activeLecture?.youtubeId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${activeLecture.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
            title={activeLecture.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <PlayCircle className="h-12 w-12 mb-3 text-muted-foreground/20" />
            <p className="text-sm font-medium text-muted-foreground/60">
              Select a lecture to begin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
