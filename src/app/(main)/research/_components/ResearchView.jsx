"use client";

import {useState} from "react";
import {format} from "date-fns";
import {
  Search,
  BookOpen,
  FileText,
  GitBranch,
  Calendar,
  Building2,
  ExternalLink,
} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";

export default function ResearchView({publications}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "published", "ongoing"

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some((a) =>
        a.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      pub.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filter === "all" || pub.status === filter;

    return matchesSearch && matchesFilter;
  });

  const publishedCount = publications.filter(
    (p) => p.status === "published",
  ).length;
  const ongoingCount = publications.filter(
    (p) => p.status === "ongoing",
  ).length;

  return (
    <section className="relative w-full">
      {/* Subtle lab grid + glow background */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-40 bg-linear-to-b from-primary/15 via-primary/0 to-transparent blur-3xl opacity-80 dark:opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-[0.4] dark:opacity-[0.22]" />

      <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/50 pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span className="label-gradient">Research archive</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                <span className="hero-gradient">Research</span>
                <span className="text-foreground/80"> &amp; publications</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Explore published papers and ongoing work across artificial
                intelligence and machine learning.
              </p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            <div className="min-w-max rounded-2xl border border-success/20 bg-card/80 px-4 py-3 ai-glow">
              <div className="text-2xl font-semibold text-foreground tabular-nums">
                {publishedCount}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-success/80">
                Published
              </div>
            </div>
            <div className="min-w-max rounded-2xl border border-warning/20 bg-card/80 px-4 py-3">
              <div className="text-2xl font-semibold text-foreground tabular-nums">
                {ongoingCount}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-warning/80">
                Ongoing
              </div>
            </div>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Search by title, author, or topic..."
              className={cn(
                "pl-9 bg-card/80 border-border/70",
                "placeholder:text-muted-foreground/50",
                "focus-visible:ring-1 focus-visible:ring-primary/35 focus-visible:border-primary/40",
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex p-1.5 bg-card/80 rounded-full border border-border/60 w-full sm:w-auto overflow-x-auto custom-scrollbar ai-glow">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer whitespace-nowrap",
                filter === "all"
                  ? "bg-card text-foreground shadow-sm border border-border/60"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              )}
            >
              All Papers
            </button>
            <button
              type="button"
              onClick={() => setFilter("published")}
              className={cn(
                "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer whitespace-nowrap",
                filter === "published"
                  ? "bg-card text-success shadow-sm border border-success/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              )}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => setFilter("ongoing")}
              className={cn(
                "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer whitespace-nowrap",
                filter === "ongoing"
                  ? "bg-card text-warning shadow-sm border border-warning/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              )}
            >
              Ongoing
            </button>
          </div>
        </div>

        {/* Grid */}
        {filteredPublications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border/60 bg-card/70">
            <div className="h-16 w-16 rounded-full bg-muted/70 flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold">No publications found</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
              We couldn't find any research papers matching your current search
              or filters.
            </p>
            {(searchTerm || filter !== "all") && (
              <Button
                variant="outline"
                className="mt-6 cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((pub) => (
              <div
                key={pub._id}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border border-border/50 card-lift",
                  "bg-card",
                  "transition-all duration-300 ease-out",
                  "hover:border-border hover:shadow-xl hover:shadow-primary/5",
                )}
              >
                {/* Subtle top/side gradient border on hover */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent pointer-events-none transition-all duration-300",
                    pub.status === "published"
                      ? "group-hover:ring-success/20 group-hover:bg-success/[0.02]"
                      : "group-hover:ring-warning/20 group-hover:bg-warning/[0.02]",
                  )}
                />

                <div className="relative p-6 space-y-4 z-1">
                  <div className="flex items-start justify-between gap-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full",
                        pub.status === "published"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-warning/10 text-warning border-warning/20",
                      )}
                    >
                      {pub.status}
                    </Badge>
                    {pub.date && (
                      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 shrink-0">
                        <Calendar className="h-3.5 w-3.5 opacity-70" />
                        {format(new Date(pub.date), "MMM yyyy")}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                      {pub.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground/80 line-clamp-1">
                      {pub.authors.join(", ")}
                    </p>
                  </div>

                  {pub.venue && (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/70 bg-muted/50 w-fit px-2.5 py-1.5 rounded-md border border-border/50">
                      <Building2 className="h-3.5 w-3.5 opacity-60" />
                      <span className="truncate max-w-50">{pub.venue}</span>
                    </div>
                  )}

                  {pub.abstract && (
                    <p className="text-sm text-foreground/60 line-clamp-3 leading-relaxed">
                      {pub.abstract}
                    </p>
                  )}

                  {pub.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {pub.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center text-[10px] font-semibold px-2 py-1 rounded-md text-foreground/70 bg-muted/60 border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                      {pub.tags.length > 3 && (
                        <span className="inline-flex items-center text-[10px] font-semibold px-2 py-1 rounded-md text-foreground/70 bg-muted/60 border border-border/40">
                          +{pub.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="relative z-1 px-6 py-4 bg-muted/30 border-t border-border/40 mt-auto flex items-center justify-between overflow-hidden rounded-b-2xl">
                  <div className="flex gap-2">
                    {pub.paperUrl ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 text-xs gap-1.5 font-semibold bg-background hover:bg-muted border border-border/50 cursor-pointer shadow-sm"
                        asChild
                      >
                        <Link href={pub.paperUrl} target="_blank">
                          <FileText className="h-3.5 w-3.5" /> Paper
                        </Link>
                      </Button>
                    ) : (
                      <div className="h-8 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/50 border border-border/30 px-3 rounded-md bg-background/50">
                        <FileText className="h-3.5 w-3.5 opacity-60" /> Paper
                      </div>
                    )}

                    {pub.codeUrl && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0 gap-0 bg-background hover:bg-muted border border-border/50 cursor-pointer shadow-sm flex items-center justify-center"
                        asChild
                        title="View Code/Repo"
                      >
                        <Link href={pub.codeUrl} target="_blank">
                          <GitBranch className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    )}
                  </div>

                  {pub.paperUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer group/details"
                      asChild
                    >
                      <Link href={pub.paperUrl} target="_blank">
                        Details{" "}
                        <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-50 group-hover/details:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
