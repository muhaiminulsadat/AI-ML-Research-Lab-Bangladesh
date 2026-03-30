"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  PlayCircle, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  Share2,
  BookmarkPlus,
  ListVideo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CourseDetailView({ course }) {
  // Find the first available lecture to default to if exists
  const firstLecture = course.modules?.[0]?.lectures?.[0] || null;
  const [activeLecture, setActiveLecture] = useState(firstLecture);

  // In the future this will come from user's progress schema
  const completedLectures = []; 

  const handleLectureClick = (lecture) => {
    setActiveLecture(lecture);
    // Smooth scroll to top on mobile essentially
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalLectures = course.modules?.reduce((acc, mod) => acc + (mod.lectures?.length || 0), 0) || 0;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24">
      
      {/* Top Sticky Breadcrumb Nav */}
      <div className="w-full border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto max-w-[1400px] h-16 flex items-center justify-between px-4 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground font-medium">
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Catalog
            </Link>
          </Button>
          <div className="hidden md:flex items-center space-x-3 text-sm font-medium">
            <span className="text-muted-foreground truncate max-w-[200px] lg:max-w-[300px]">{course.title}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
            <span className="text-primary truncate max-w-[200px] lg:max-w-[300px] font-semibold">{activeLecture?.title || "Course Overview"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex bg-background/50 border-border/60">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex bg-background/50 border-border/60">
              <BookmarkPlus className="h-4 w-4 mr-2" /> Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="container max-w-[1400px] mx-auto pt-6 lg:pt-8 px-4 lg:px-8 flex-1">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
          
          {/* Left Column (Video & Content Details) */}
          <div className="flex-1 xl:w-[65%] 2xl:w-[70%] space-y-8">
            
            {/* Ultra-Premium Video Wrapper */}
            <div className="relative group rounded-2xl overflow-hidden ring-1 ring-border/50 shadow-2xl bg-[#0a0a0a]">
              {/* Subtle ambient glow behind the player */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              
              <div className="aspect-[16/9] w-full relative z-10">
                {activeLecture?.youtubeId ? (
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

            {/* Video Meta Info & Context */}
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
                    <Button className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold h-10 px-6">
                      <CheckCircle2 className="mr-2 h-5 w-5" /> Mark Mastered
                    </Button>
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
          </div>

          {/* Right Column: Sticky Playlist Sidebar */}
          <div className="xl:w-[35%] 2xl:w-[30%] shrink-0">
            <div className="sticky top-24 border border-border/50 rounded-2xl bg-card/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
              
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
                    <span className="text-primary">0% Completed</span>
                    <span className="text-muted-foreground">0 / {totalLectures}</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary/60 rounded-full overflow-hidden shrink-0">
                    <div className="h-full bg-primary w-[0%] rounded-full shadow-[0_0_12px_rgba(var(--primary),0.6)]" />
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
                                    onClick={() => handleLectureClick(lecture)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
