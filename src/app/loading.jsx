import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full flex-1 flex flex-col items-center min-h-[60vh] space-y-8 p-8 md:p-12 lg:p-24 animate-in fade-in duration-500">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-14 w-[300px] md:w-[450px]" />
          <Skeleton className="h-5 w-[250px] md:w-[350px]" />
          <Skeleton className="h-5 w-[200px] md:w-[300px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col space-y-4">
              <Skeleton className="h-[250px] w-full rounded-2xl" />
              <div className="space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="pt-2 flex gap-3">
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-10 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
