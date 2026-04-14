import {Skeleton} from "@/components/ui/skeleton";

export default function WorkshopDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      {/* Banner Skeleton */}
      <Skeleton className="w-full h-64 md:h-96 mb-8 rounded-xl border border-white/5 shadow-lg bg-[#090A0F]" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-32 rounded-full" />
              </div>
            </div>

            {/* Title & Description Skeleton */}
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="h-5 w-[80%]" />
            </div>
          </div>

          {/* Key Information Box Skeleton */}
          <div className="bg-[#090A0F] border border-white/5 p-6 rounded-xl space-y-4">
            <h3 className="font-semibold text-base border-b border-white/5 pb-2 mb-4">
              Key Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Registration Area Skeleton */}
        <div className="space-y-6">
          <div className="bg-[#090A0F] border border-white/5 rounded-xl p-6 shadow-sm sticky top-24">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-4 pt-4 border-t border-white/5">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
