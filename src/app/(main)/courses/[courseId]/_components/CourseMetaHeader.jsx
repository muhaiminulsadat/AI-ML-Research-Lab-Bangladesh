import Link from "next/link";
import { ArrowLeft, ChevronRight, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseMetaHeader({ 
  course, 
  activeLecture, 
  isEnrolled, 
  isPending, 
  onEnroll 
}) {
  return (
    <div className="w-full border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-[1600px] mx-auto h-16 flex items-center justify-between px-4 lg:px-12">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground font-medium">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Link>
        </Button>
        <div className="hidden md:flex items-center space-x-3 text-sm font-medium">
          <span className="text-muted-foreground truncate max-w-[200px] lg:max-w-[300px]">
            {course.title}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
          <span className="text-primary truncate max-w-[200px] lg:max-w-[300px] font-semibold">
            {activeLecture?.title || "Course Overview"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isEnrolled && (
            <Button 
              onClick={onEnroll} 
              disabled={isPending}
              size="sm" 
              className="hidden md:flex shadow-sm shadow-primary/20"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enroll Now
            </Button>
          )}
          <Button variant="outline" size="sm" className="hidden md:flex bg-background/50 border-border/60">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>
    </div>
  );
}
