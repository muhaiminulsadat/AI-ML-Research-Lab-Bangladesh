"use client";

import {useState} from "react";
import Link from "next/link";
import {Search, BookOpen, Clock, Tag} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Hub</h1>
          <p className="text-muted-foreground mt-1">
            Explore our curated catalog of AI and Machine Learning courses.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-9 bg-secondary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-card/50 border border-dashed">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">No courses found</h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            We couldn't find any published courses matching your search
            criteria. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({course}) {
  const totalModules = course.modules?.length || 0;
  const totalLectures =
    course.modules?.reduce(
      (acc, mod) => acc + (mod.lectures?.length || 0),
      0,
    ) || 0;

  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-all border-border/50 group bg-card">
      <div className="aspect-video w-full bg-secondary/40 relative overflow-hidden">
        {course.thumbnail ? (
          // Use standard img for now, or Next/Image if configured
          <img
            src={course.thumbnail}
            alt={course.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-gradient-to-br from-secondary/50 to-secondary opacity-80">
            <BookOpen className="h-12 w-12 mb-2 opacity-50" />
            <span className="text-sm font-medium">Course Thumbnail</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            variant="secondary"
            className="backdrop-blur-md bg-background/80 capitalize font-medium"
          >
            {course.difficulty}
          </Badge>
        </div>
      </div>

      <CardHeader className="flex-none pb-2">
        <div className="flex gap-2 text-xs text-muted-foreground mb-2 items-center">
          <span className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" /> {totalModules} Modules
          </span>
          <span>•</span>
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {totalLectures} Lectures
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
          <Link
            href={`/courses/${course._id}`}
            className="before:absolute before:inset-0"
          >
            {course.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow pt-2">
        <div className="flex flex-wrap gap-1 mt-1">
          {course.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-[10px] bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground"
            >
              <Tag className="h-2 w-2 mr-1 opacity-70" />
              {tag}
            </span>
          ))}
          {course.tags?.length > 3 && (
            <span className="inline-flex items-center text-[10px] bg-secondary/50 px-2 py-0.5 rounded-full text-muted-foreground">
              +{course.tags.length - 3}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t bg-secondary/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden shrink-0">
            {course.instructor?.profileImage ? (
              <img
                src={course.instructor.profileImage}
                alt={course.instructor.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[10px] font-bold text-primary">
                {course.instructor?.name?.charAt(0) || "I"}
              </span>
            )}
          </div>
          <span
            className="text-xs text-muted-foreground font-medium truncate max-w-[100px]"
            title={course.instructor?.name}
          >
            {course.instructor?.name || "Instructor"}
          </span>
        </div>
        <Button
          variant="ghost"
          className="text-primary hover:text-primary hover:bg-primary/10 shrink-0 font-semibold"
          size="sm"
        >
          View Detail →
        </Button>
      </CardFooter>
    </Card>
  );
}
