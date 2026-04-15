import {Skeleton} from "@/components/ui/skeleton";

export default function CourseDetailSkeleton() {
  return (
    <div className="container mx-auto p-4 lg:p-8 pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Video & Info Section */}
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="w-full aspect-video rounded-xl" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Playlist / Sidebar Section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2 mb-6" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2 mb-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
