import { ListVideo, BookOpen, PlayCircle, CheckCircle2, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CourseSidebarPlaylist({
  course,
  isEnrolled,
  activeLecture,
  completedLectures,
  progressPercentage,
  totalLectures,
  onLectureClick
}) {
  return (
    <div className={`sticky top-24 border border-border/50 rounded-2xl bg-card/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[calc(100vh-8rem)] ${!isEnrolled && 'opacity-60 grayscale-[50%] pointer-events-none'}`}>
      
      {/* Sidebar Header Widget */}
      <div className="p-6 border-b border-border/50 bg-card/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <h3 className="text-lg font-extrabold flex items-center gap-2 tracking-tight">
          <ListVideo className="h-5 w-5 text-primary" />
          Course Content
        </h3>
        <div className="flex items-center gap-3 mt-3 text-sm font-medium text-muted-foreground">
          <span className="flex items-center"><BookOpen className="h-3.5 w-3.5 mr-1.5 text-foreground/40"/> {course.modules?.length || 0} Modules</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center"><PlayCircle className="h-3.5 w-3.5 mr-1.5 text-foreground/40"/> {totalLectures} Lectures</span>
        </div>
        
        {/* Advanced Progress Bar */}
        <div className="mt-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
            <span className="text-primary">{progressPercentage}% Completed</span>
            <span className="text-muted-foreground">{completedLectures.length} / {totalLectures}</span>
          </div>
          <div className="h-1.5 w-full bg-secondary/60 rounded-full overflow-hidden shrink-0">
            <div 
              className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),0.6)] transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Interactive Accordion */}
      <div className="overflow-y-auto custom-scrollbar flex-1 p-3">
        {course.modules?.length > 0 ? (
          <Accordion 
            type="multiple" 
            defaultValue={course.modules.map(m => m._id)} 
            className="w-full space-y-2"
          >
            {course.modules.sort((a, b) => a.order - b.order).map((module, index) => (
              <AccordionItem 
                key={module._id} 
                value={module._id} 
                className="border-none bg-transparent"
              >
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline rounded-xl hover:bg-secondary/40 transition-colors data-[state=open]:bg-secondary/20 group">
                  <div className="flex flex-col items-start text-left gap-1.5">
                    <span className="text-[10px] font-bold text-primary/80 uppercase tracking-[0.2em]">Module {index + 1}</span>
                    <span className="text-sm font-bold text-foreground/90 group-hover:text-foreground transition-colors leading-snug">{module.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-1 px-1">
                  {module.lectures?.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {module.lectures.sort((a,b) => a.order - b.order).map((lecture, lIndex) => {
                        const isActive = activeLecture?._id === lecture._id;
                        const isCompleted = completedLectures.includes(lecture._id);

                        return (
                          <button
                            key={lecture._id}
                            onClick={() => onLectureClick(lecture)}
                            className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                              isActive 
                                ? "bg-primary/10 shadow-sm" 
                                : "hover:bg-secondary/50"
                            }`}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                            )}
                            
                            <div className="shrink-0 mt-0.5 ml-1">
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              ) : isActive ? (
                                <PlayCircle className="h-4 w-4 text-primary animate-pulse shrink-0 drop-shadow-md" />
                              ) : (
                                <span className="flex h-5 w-5 items-center justify-center rounded-md text-[11px] font-bold text-muted-foreground group-hover:text-primary transition-colors bg-background border border-border/50 group-hover:border-primary/30">
                                  {lIndex + 1}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex flex-col overflow-hidden items-start w-full pr-2">
                              <span className={`text-sm tracking-tight w-full leading-snug ${isActive ? "font-bold text-primary" : "font-medium text-foreground/80 group-hover:text-foreground"}`}>
                                {lecture.title}
                              </span>
                              {lecture.duration > 0 && (
                                <span className="text-[11px] mt-1.5 flex items-center gap-1 font-medium text-muted-foreground/80">
                                  <Clock className="h-3 w-3" /> {lecture.duration} min
                                </span>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-secondary/20 border border-dashed border-border/50 text-center">
                       <p className="text-xs text-muted-foreground italic">Lectures coming soon.</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="p-8 mt-4 text-center border border-dashed rounded-xl bg-card/30">
             <p className="text-sm text-muted-foreground">Course content is being prepared.</p>
          </div>
        )}
      </div>

    </div>
  );
}
