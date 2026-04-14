import {Skeleton} from "@/components/ui/skeleton";

export default function MainLoading() {
  return (
    <div className="w-full flex-1 flex flex-col space-y-8 p-6 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-10 w-[200px] md:w-[300px]" />
        <Skeleton className="h-4 w-[250px] md:w-[400px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col space-y-4 p-5 border border-border/50 rounded-xl bg-card/20"
          >
            <Skeleton className="h-[140px] w-full rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="pt-4 flex gap-3 mt-auto">
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
