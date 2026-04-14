import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

export default function CoursesSkeleton() {
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
            disabled
            className={cn(
              "h-9 pl-9 pr-8 text-sm bg-muted/40 border-border/60",
              "placeholder:text-muted-foreground/50",
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function CourseCardSkeleton() {
  return (
    <div className="h-full flex flex-col rounded-2xl border border-border/40 bg-card overflow-hidden">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="mt-auto flex gap-1.5 pt-4">
          <Skeleton className="h-4 w-12 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>
      <div className="px-5 py-4 border-t border-border/30 bg-muted/20 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
}
