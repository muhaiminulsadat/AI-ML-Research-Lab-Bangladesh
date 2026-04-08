"use client";
import {useState, useMemo} from "react";
import {
  Search,
  Users,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import MemberCard from "./MemberCard";

const FILTERS = [
  {label: "All", value: "all", icon: Users},
  {label: "Advisors", value: "advisor", icon: Users},
  {label: "Core Panel", value: "core_panel", icon: Sparkles},
  {label: "Members", value: "member", icon: GraduationCap},
  {label: "Admins", value: "admin", icon: ShieldCheck},
];

export default function MembersView({members}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        m.name?.toLowerCase().includes(q) ||
        m.university?.toLowerCase().includes(q) ||
        m.researchInterests?.some((t) => t.toLowerCase().includes(q));

      const role = m.role || "member";
      const matchesFilter = activeFilter === "all" || role === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [members, search, activeFilter]);

  const counts = useMemo(
    () => ({
      all: members.length,
      advisor: members.filter((m) => m.role === "advisor").length,
      core_panel: members.filter((m) => m.role === "core_panel").length,
      member: members.filter((m) => (m.role || "member") === "member").length,
      admin: members.filter((m) => m.role === "admin").length,
    }),
    [members],
  );

  return (
    <section className="relative w-full">
      {/* Subtle lab grid + glow background */}
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

        {/* Toolbar: Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
            <Input
              placeholder="Search by name, university, or interests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "h-9 pl-9 pr-8 text-sm bg-card/80 border-border/70",
                "placeholder:text-muted-foreground/50",
                "focus-visible:ring-1 focus-visible:ring-primary/35 focus-visible:border-primary/40",
                "transition-all duration-200",
              )}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                aria-label="Clear search"
                type="button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1 p-1.5 rounded-full bg-card/80 border border-border/60 w-full sm:w-fit overflow-x-auto custom-scrollbar ai-glow">
            {FILTERS.map((f) => {
              const Icon = f.icon;
              const isActive = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-card text-foreground shadow-sm border border-border/60"
                      : "text-muted-foreground hover:text-foreground/80",
                  )}
                >
                  <Icon className="h-3 w-3" />
                  <span>{f.label}</span>
                  <span
                    className={cn(
                      "tabular-nums ml-0.5 text-[10px] min-w-4.5 text-center",
                      "px-1 py-px rounded-sm",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground/60",
                    )}
                  >
                    {counts[f.value] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        {search && (
          <p className="text-xs text-muted-foreground/70 mb-4">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for
            &ldquo;
            <span className="text-muted-foreground font-medium">{search}</span>
            &rdquo;
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="space-y-12">
            {["advisor", "core_panel", "admin", "member"].map((roleCode) => {
              const groupLabel = FILTERS.find(
                (f) => f.value === roleCode,
              )?.label;
              const roleMembers = filtered.filter(
                (m) => (m.role || "member") === roleCode,
              );

              if (roleMembers.length === 0) return null;

              return (
                <div key={roleCode} className="space-y-4">
                  {activeFilter === "all" && (
                    <h2 className="text-xl font-bold tracking-tight border-b border-border/40 pb-2 flex items-center gap-2">
                      {groupLabel}
                      <div className="text-xs font-semibold bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-md">
                        {roleMembers.length}
                      </div>
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {roleMembers.map((member) => (
                      <MemberCard key={member._id} member={member} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center rounded-2xl border border-dashed border-border/60 bg-card/70">
            <div className="h-12 w-12 rounded-full bg-muted/70 flex items-center justify-center">
              <Users className="h-5 w-5 text-muted-foreground/40" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground/80">
                No members found
              </p>
              <p className="text-xs text-muted-foreground/70 max-w-xs mx-auto">
                Try adjusting your search or filter criteria to broaden the
                directory.
              </p>
            </div>
            {(search || activeFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("all");
                }}
                className="text-xs text-primary hover:text-primary/80 transition-colors mt-1"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
