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
      const matchesFilter =
        activeFilter === "all" || role === activeFilter;
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
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      {/* Page Header */}
      <div className="space-y-1 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-1 rounded-full bg-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Members Directory
          </h1>
        </div>
        <p className="text-sm text-muted-foreground pl-[18px] max-w-lg">
          Connect with the researchers, advisors, and students driving our AI/ML community forward.
        </p>
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
              "h-9 pl-9 pr-8 text-sm bg-muted/40 border-border/60",
              "placeholder:text-muted-foreground/50",
              "focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/40",
              "transition-all duration-200",
            )}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/30 border border-border/40 w-fit overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-card text-foreground shadow-sm border border-border/60"
                    : "text-muted-foreground hover:text-foreground/80",
                )}
              >
                <Icon className="h-3 w-3" />
                <span>{f.label}</span>
                <span
                  className={cn(
                    "tabular-nums ml-0.5 text-[10px] min-w-[18px] text-center",
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
        <p className="text-xs text-muted-foreground/60 mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;
          <span className="text-muted-foreground">{search}</span>&rdquo;
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="space-y-12">
          {["advisor", "core_panel", "admin", "member"].map(
            (roleCode) => {
              const groupLabel = FILTERS.find((f) => f.value === roleCode)?.label;
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
            },
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="h-12 w-12 rounded-full bg-muted/60 flex items-center justify-center">
            <Users className="h-5 w-5 text-muted-foreground/40" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground/70">
              No members found
            </p>
            <p className="text-xs text-muted-foreground/60">
              Try adjusting your search or filter criteria.
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
  );
}
