import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function WorkshopsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card
          key={i}
          className="flex flex-col border-white/5 bg-[#090A0F] overflow-hidden"
        >
          <Skeleton className="h-48 w-full rounded-none" />
          <CardHeader>
            <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4 mt-2" />
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[50%]" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[40%]" />
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t border-white/5 mt-auto">
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
