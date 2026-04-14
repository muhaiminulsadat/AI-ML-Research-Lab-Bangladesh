import {Skeleton} from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-8 space-y-8">
        {/* Recent Session Skeleton */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
          <div className="relative overflow-hidden rounded-3xl border bg-card p-1">
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
              <Skeleton className="w-full md:w-48 aspect-video rounded-2xl shrink-0" />
              <div className="flex-1 space-y-4 w-full">
                <Skeleton className="h-8 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full max-w-lg rounded-md" />
                <Skeleton className="h-4 w-2/3 max-w-lg rounded-md" />
                <div className="flex gap-3 pt-2">
                  <Skeleton className="h-11 w-36 rounded-xl" />
                  <Skeleton className="h-11 w-24 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Research Path Skeleton */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 rounded-2xl border bg-card space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-8 rounded-md" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16 rounded-md" />
                  <Skeleton className="h-3 w-12 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-4 space-y-8">
        <section className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="p-5 rounded-2xl border bg-card space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-24 rounded-md" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </section>

        <section className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[72px] w-full rounded-2xl" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
