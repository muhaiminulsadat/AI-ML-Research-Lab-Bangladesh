import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

export default function ParticipantsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-start sm:items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          disabled
          className="shrink-0 mt-1 sm:mt-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <Skeleton className="h-8 sm:h-9 w-64 mb-2" />
          <Skeleton className="h-4 sm:h-5 w-80" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        <div className="bg-[#090A0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-6 space-y-4">
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Table Header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Table Rows */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-white/5 pb-4 mb-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
