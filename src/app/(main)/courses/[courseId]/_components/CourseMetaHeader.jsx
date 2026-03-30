import Link from "next/link";
import {ArrowLeft, ChevronRight, Share2, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function CourseMetaHeader({
  course,
  activeLecture,
  isEnrolled,
  isPending,
  onEnroll,
}) {
  return (
    <div className="w-full border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="w-full max-w-[1400px] mx-auto h-14 flex items-center justify-between px-4 sm:px-6 lg:px-10">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-foreground font-medium cursor-pointer"
        >
          <Link href="/courses">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Catalog</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>

        <div className="hidden md:flex items-center gap-2 text-sm min-w-0 flex-1 justify-center px-4">
          <span className="text-muted-foreground truncate max-w-[200px] lg:max-w-[280px]">
            {course.title}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
          <span className="text-primary truncate max-w-[200px] lg:max-w-[280px] font-medium">
            {activeLecture?.title || "Overview"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isEnrolled && (
            <Button
              onClick={onEnroll}
              disabled={isPending}
              size="sm"
              className="hidden sm:flex cursor-pointer h-8 text-xs"
            >
              {isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
              Enroll Now
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex bg-transparent border-border/60 h-8 text-xs cursor-pointer"
          >
            <Share2 className="h-3 w-3 mr-1.5" /> Share
          </Button>
        </div>
      </div>
    </div>
  );
}
