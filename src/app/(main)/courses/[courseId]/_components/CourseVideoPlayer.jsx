import { BookOpen, PlayCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseVideoPlayer({ 
  activeLecture, 
  isEnrolled, 
  isPending, 
  onEnroll 
}) {
  return (
    <div className="relative group rounded-2xl overflow-hidden ring-1 ring-border/50 shadow-2xl bg-[#0a0a0a]">
      {/* Subtle ambient glow behind the player */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      <div className="aspect-[16/9] w-full relative z-10">
        {!isEnrolled ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/10 border border-dashed border-border/20 m-4 rounded-xl" style={{width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)'}}>
            <BookOpen className="h-16 w-16 mb-4 opacity-30 text-primary" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Enroll to begin learning</h3>
            <p className="max-w-md text-center mb-6">Join this course to access all video lectures and track your progress.</p>
            <Button onClick={onEnroll} disabled={isPending} className="px-8 shadow-lg shadow-primary/20">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlayCircle className="mr-2 h-5 w-5" />}
              Start Course Now
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
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground container-bg border border-dashed border-border/20 m-4 rounded-xl" style={{width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)'}}>
            <PlayCircle className="h-16 w-16 mb-4 opacity-30 text-primary" />
            <p className="text-xl font-medium tracking-tight">Select a lecture to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}
