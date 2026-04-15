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
          className="shrink-0 mt-1 sm:mt-0 border-white/10"
        >
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Workshop Registrations
          </h1>
          <Skeleton className="h-5 w-72 sm:w-96 mt-2.5 rounded-md" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2 bg-muted p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
            <Button
              variant="default"
              className="flex-1 sm:flex-none whitespace-nowrap opacity-70 pointer-events-none"
            >
              All{" "}
              <Skeleton className="w-4 h-3 ml-2 rounded-sm bg-primary-foreground/20" />
            </Button>
            <Button
              variant="ghost"
              className="flex-1 sm:flex-none whitespace-nowrap opacity-70 pointer-events-none"
            >
              Participants <Skeleton className="w-4 h-3 ml-2 rounded-sm" />
            </Button>
            <Button
              variant="ghost"
              className="flex-1 sm:flex-none whitespace-nowrap opacity-70 pointer-events-none"
            >
              Speakers <Skeleton className="w-4 h-3 ml-2 rounded-sm" />
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full sm:w-auto opacity-70 pointer-events-none"
          >
            <Skeleton className="w-4 h-4 mr-2 rounded-sm" />
            Export CSV
          </Button>
        </div>

        <div className="bg-[#090A0F] border border-white/5 rounded-2xl overflow-hidden shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 bg-muted/20 px-4 h-12">
            <span className="uppercase text-[10px] tracking-wider text-muted-foreground font-semibold">
              User Details
            </span>
            <span className="uppercase text-[10px] tracking-wider text-muted-foreground font-semibold hidden md:block">
              Role
            </span>
            <span className="uppercase text-[10px] tracking-wider text-muted-foreground font-semibold hidden sm:block">
              Status
            </span>
            <span className="uppercase text-[10px] tracking-wider text-muted-foreground font-semibold">
              Actions
            </span>
          </div>

          <div className="space-y-4 p-6 pt-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-white/5 rounded-xl bg-white/[0.01]"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40 rounded-md" />
                    <Skeleton className="h-4 w-28 rounded-md" />
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
                  <div className="space-y-2 hidden md:block">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-24 rounded-md" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-md shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
