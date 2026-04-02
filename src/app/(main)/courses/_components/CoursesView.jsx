"use client";

import {useState, useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import {Search, BookOpen, ChevronRight, PlayCircle, BarChart, X} from "lucide-react";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

export default function CoursesView({initialCourses}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return initialCourses;
    const q = searchQuery.toLowerCase();
    return initialCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  }, [initialCourses, searchQuery]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-1 rounded-full bg-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Course Catalog
            </h1>
          </div>
          <p className="text-sm text-muted-foreground pl-[18px] max-w-lg">
            Browse our curriculum of AI and Machine Learning courses.
          </p>
        </div>

        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "h-9 pl-9 pr-8 text-sm bg-muted/40 border-border/60",
              "placeholder:text-muted-foreground/50",
              "focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/40",
              "transition-all duration-200",
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {searchQuery && (
        <p className="text-xs text-muted-foreground/60 mb-4">
          {filteredCourses.length} result{filteredCourses.length !== 1 ? "s" : ""} for &ldquo;
          <span className="text-muted-foreground">{searchQuery}</span>&rdquo;
        </p>
      )}

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="h-12 w-12 rounded-full bg-muted/60 flex items-center justify-center">
            <Search className="h-5 w-5 text-muted-foreground/40" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground/70">No courses found</p>
            <p className="text-xs text-muted-foreground/60">
              Try adjusting your search terms.
            </p>
          </div>
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer mt-1"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

function CourseCard({course}) {
  const totalModules = course.modules?.length || 0;
  const totalLectures =
    course.modules?.reduce((acc, mod) => acc + (mod.lectures?.length || 0), 0) || 0;

  return (
    <Link
      href={`/courses/${course._id}`}
      className="group block h-full outline-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:translate-y-[-4px] cursor-pointer"
    >
      <div
        className={cn(
          "h-full flex flex-col rounded-2xl border border-border/40 bg-card overflow-hidden",
          "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:border-primary/20",
        )}
      >
        <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/60">
              <PlayCircle className="h-10 w-10 text-muted-foreground/10" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-foreground text-background shadow-sm border border-foreground/10">
              {course.difficulty}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-5">
          <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-3">
             <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                <span>{totalModules} Modules</span>
             </div>
             <div className="w-1 h-1 rounded-full bg-border" />
             <div className="flex items-center gap-1">
                <BarChart className="h-3 w-3" />
                <span>{totalLectures} Lectures</span>
             </div>
          </div>

          <h3 className="text-base font-bold leading-tight tracking-tight text-foreground line-clamp-2 transition-colors duration-200 mb-2 group-hover:text-primary">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2 mb-4 font-medium">
            {course.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
             {course.tags?.slice(0, 2).map((tag) => (
                <span
                   key={tag}
                   className="inline-flex items-center text-[10px] font-bold uppercase tracking-tight px-2 py-0.5 rounded-md bg-muted text-muted-foreground/80 border border-border/20"
                >
                   #{tag}
                </span>
             ))}
             {course.tags?.length > 2 && (
                <span className="text-[10px] font-bold text-muted-foreground/40 self-center">
                   +{course.tags.length - 2} more
                </span>
             )}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border/30 bg-muted/20 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-6 w-6 border-2 border-background shadow-sm shrink-0">
              {course.instructor?.profileImage && (
                <AvatarImage src={course.instructor.profileImage} />
              )}
              <AvatarFallback className="text-[8px] font-bold bg-muted text-muted-foreground">
                {course.instructor?.name?.substring(0, 2).toUpperCase() || "IN"}
              </AvatarFallback>
            </Avatar>
            <span
              className="text-xs font-bold text-foreground/70 tracking-tight truncate max-w-[140px]"
              title={course.instructor?.name}
            >
              {course.instructor?.name || "Instructor"}
            </span>
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border/50 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
             <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
