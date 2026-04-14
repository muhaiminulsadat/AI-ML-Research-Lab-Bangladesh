import {Users, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

const FILTERS = [
  {label: "All", value: "all", icon: Users},
  {label: "Advisors", value: "advisor", icon: Users},
  {label: "Core Panel", value: "core_panel", icon: Users},
  {label: "Members", value: "member", icon: Users},
  {label: "Admins", value: "admin", icon: Users},
];

export default function MembersSkeleton() {
  return (
    <section className="relative w-full">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-40 bg-linear-to-b from-primary/15 via-primary/0 to-transparent blur-3xl opacity-80 dark:opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-[0.4] dark:opacity-[0.22]" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="label-gradient">Lab community</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              <span className="hero-gradient">Members</span>
              <span className="text-foreground/80 ml-1.5">directory</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Browse advisors, core panel, and members contributing to the ML &
              AI Lab, with quick filters for roles and research focus.
            </p>
          </div>
        </div>

        {/* Toolbar: Search + Filter Skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
            <Input
              placeholder="Search by name, university, or interests..."
              disabled
              className={cn(
                "h-9 pl-9 pr-8 text-sm bg-card/80 border-border/70",
                "placeholder:text-muted-foreground/50",
              )}
            />
          </div>

          <div className="flex items-center gap-1 p-1.5 rounded-full bg-card/80 border border-border/60 w-full sm:w-fit overflow-x-auto">
            {FILTERS.map((f, i) => (
              <div
                key={f.value}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap",
                  i === 0
                    ? "bg-card text-foreground shadow-sm border border-border/60"
                    : "text-muted-foreground",
                )}
              >
                <f.icon className="h-3 w-3" />
                <span>{f.label}</span>
                <Skeleton className="h-4 w-4 ml-1 rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="group relative flex flex-col h-full rounded-2xl border border-border/50 bg-card overflow-hidden"
            >
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-2xl shrink-0" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="px-5 py-4 border-t border-border/40 mt-auto flex items-center justify-between">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-12 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
