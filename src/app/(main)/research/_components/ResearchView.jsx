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
      pub.authors.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filter === "all" || pub.status === filter;

    return matchesSearch && matchesFilter;
  });

  const publishedCount = publications.filter((p) => p.status === "published").length;
  const ongoingCount = publications.filter((p) => p.status === "ongoing").length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-6">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Research & Publications
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore our latest discoveries, ongoing projects, and published papers in
            artificial intelligence and machine learning.
          </p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex flex-col gap-1 items-start md:items-end min-w-max">
            <span className="text-2xl font-bold text-foreground">{publishedCount}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-1">
              Published
            </span>
          </div>
          <div className="w-px h-10 bg-border/40 hidden md:block" />
          <div className="flex flex-col gap-1 items-start min-w-max">
            <span className="text-2xl font-bold text-foreground">{ongoingCount}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">
              Ongoing
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, author, or topic..."
            className="pl-9 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex p-1 bg-muted/40 rounded-lg border border-border/50 w-full sm:w-auto">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
              filter === "all"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            All Papers
          </button>
          <button
            onClick={() => setFilter("published")}
            className={cn(
              "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
              filter === "published"
                ? "bg-background text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            Published
          </button>
          <button
            onClick={() => setFilter("ongoing")}
            className={cn(
              "flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
              filter === "ongoing"
                ? "bg-background text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            Ongoing
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredPublications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed bg-card/50">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-semibold">No publications found</h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            We couldn't find any research papers matching your current search or filters.
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
              className="group flex flex-col justify-between rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize text-[10px] font-semibold tracking-wider",
                      pub.status === "published"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                        : "bg-amber-500/10 text-amber-600 border-amber-200"
                    )}
                  >
                    {pub.status}
                  </Badge>
                  {pub.date && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 shrink-0">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(pub.date), "MMM yyyy")}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {pub.authors.join(", ")}
                  </p>
                </div>

                {pub.venue && (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80 bg-muted/40 w-fit px-2 py-1 rounded-md">
                    <Building2 className="h-3 w-3" />
                    <span className="truncate max-w-[200px]">{pub.venue}</span>
                  </div>
                )}

                {pub.abstract && (
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {pub.abstract}
                  </p>
                )}

                {pub.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pub.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded text-muted-foreground border border-border/60 bg-muted/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {pub.tags.length > 3 && (
                      <span className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded text-muted-foreground border border-border/60 bg-muted/20">
                        +{pub.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="px-6 py-4 bg-muted/30 border-t border-border/40 mt-auto flex items-center justify-between">
                <div className="flex gap-2">
                  {pub.paperUrl ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs bg-background hover:bg-muted gap-1.5 cursor-pointer"
                      asChild
                    >
                      <Link href={pub.paperUrl} target="_blank">
                        <FileText className="h-3 w-3" /> Paper
                      </Link>
                    </Button>
                  ) : (
                    <div className="h-8 flex items-center text-xs text-muted-foreground/50 border border-transparent px-3">
                      <FileText className="h-3 w-3 mr-1.5" /> Paper
                    </div>
                  )}

                  {pub.codeUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-background hover:bg-muted cursor-pointer"
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
                    className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                    asChild
                  >
                    <Link href={pub.paperUrl} target="_blank">
                      Details <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
