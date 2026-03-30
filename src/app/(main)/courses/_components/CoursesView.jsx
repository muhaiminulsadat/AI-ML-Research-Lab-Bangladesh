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
      className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl cursor-pointer"
    >
      <div
        className={cn(
          "h-full flex flex-col rounded-2xl border border-border/60",
          "bg-card/80 backdrop-blur-sm overflow-hidden",
          "transition-all duration-300 ease-out",
          "hover:border-border hover:shadow-lg hover:shadow-primary/5",
          "hover:-translate-y-1",
        )}
      >
        <div className="relative aspect-[16/9] w-full bg-muted overflow-hidden">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="h-8 w-8 text-muted-foreground/20" />
            </div>
          )}
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-background/90 text-foreground/80 backdrop-blur-sm border border-border/20">
              {course.difficulty}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4 pb-0">
          <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground mb-2.5">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 opacity-60" /> {totalModules} Modules
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-border" />
            <span className="flex items-center gap-1">
              <BarChart className="h-3 w-3 opacity-60" /> {totalLectures} Lectures
            </span>
          </div>

          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-1.5">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2 mb-3">
            {course.description}
          </p>

          {course.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {course.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground border border-border/40"
                >
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground/60">
                  +{course.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto px-4 py-3 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              {course.instructor?.profileImage && (
                <AvatarImage src={course.instructor.profileImage} />
              )}
              <AvatarFallback className="text-[8px] font-semibold bg-muted text-muted-foreground">
                {course.instructor?.name?.substring(0, 2).toUpperCase() || "IN"}
              </AvatarFallback>
            </Avatar>
            <span
              className="text-[11px] font-medium text-muted-foreground/80 truncate max-w-[120px]"
              title={course.instructor?.name}
            >
              {course.instructor?.name || "Instructor"}
            </span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </div>
    </Link>
  );
}
