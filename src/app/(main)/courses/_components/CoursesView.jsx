"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Search, BookOpen, Clock, Tag, ChevronRight, PlayCircle, BarChart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";

export default function CoursesView({initialCourses}) {
  const [courses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-12 py-10 space-y-8">
      {/* Clean, Functional Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Course Catalog
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Browse our comprehensive curriculum of AI and Machine Learning courses designed for rigorous engineering and research.
          </p>
        </div>
        
        <div className="relative w-full md:w-80 shrink-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Search catalog..."
            className="pl-9 border-border/60 bg-background shadow-sm h-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Courses Grid */}
      <section>
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl bg-card/20 border-dashed border-border/60">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No courses found</h3>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              We couldn't find any courses matching "{searchQuery}"
            </p>
            <Button variant="secondary" onClick={() => setSearchQuery("")}>
              Clear practical search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CourseCard({ course }) {
  const totalModules = course.modules?.length || 0;
  const totalLectures = course.modules?.reduce((acc, mod) => acc + (mod.lectures?.length || 0), 0) || 0;

  return (
    <Link href={`/courses/${course._id}`} className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
      <Card className="h-full flex flex-col bg-card border-border/50 hover:border-foreground/20 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md rounded-xl">
        
        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full bg-muted border-b border-border/30 overflow-hidden">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <PlayCircle className="h-8 w-8 mb-2 opacity-20" />
            </div>
          )}
          
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 text-foreground/80 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm border-none">
              {course.difficulty}
            </Badge>
          </div>
        </div>
        
        {/* Card Body */}
        <CardHeader className="p-5 flex-none space-y-3 pb-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> {totalModules} Modules
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <BarChart className="h-3.5 w-3.5" /> {totalLectures} Lectures
            </span>
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
              {course.description}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow px-5 pt-0 pb-4">
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {course.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="inline-flex items-center text-[11px] bg-secondary/50 px-2 py-0.5 rounded-md text-secondary-foreground">
                {tag}
              </span>
            ))}
            {course.tags?.length > 3 && (
              <span className="inline-flex items-center text-[11px] text-muted-foreground px-1">
                +{course.tags.length - 3}
              </span>
            )}
          </div>
        </CardContent>

        {/* Minimal Footer */}
        <CardFooter className="px-5 py-4 border-t border-border/40 bg-secondary/10 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-6 w-6">
              {course.instructor?.profileImage && <AvatarImage src={course.instructor.profileImage} />}
              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-medium">
                {course.instructor?.name?.substring(0, 2).toUpperCase() || "IN"}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-foreground/80 truncate max-w-[140px]" title={course.instructor?.name}>
              {course.instructor?.name || "Expert Instructor"}
            </span>
          </div>
          
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
        </CardFooter>
      </Card>
    </Link>
  );
}
