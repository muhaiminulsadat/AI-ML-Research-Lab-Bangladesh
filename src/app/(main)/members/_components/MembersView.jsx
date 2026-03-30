"use client";
import {useState, useMemo} from "react";
import {
  Search,
  Users,
  GraduationCap,
  Briefcase,
  Building2,
  BookOpen,
  ExternalLink,
  GitBranch,
  SlidersHorizontal,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";

const roleConfig = {
  student: {
    icon: GraduationCap,
    label: "Student",
    badge: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  researcher: {
    icon: Briefcase,
    label: "Researcher",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
};

const FILTERS = [
  {label: "All", value: "all", icon: Users},
  {label: "Students", value: "student", icon: GraduationCap},
  {label: "Researchers", value: "researcher", icon: Briefcase},
];

function MemberCard({member}) {
  const role = roleConfig[member?.memberType] ?? roleConfig.student;
  const RoleIcon = role.icon;

  const socialLinks = (() => {
    try {
      return typeof member.socialLinks === "string"
        ? JSON.parse(member.socialLinks)
        : (member.socialLinks ?? {});
    } catch {
      return {};
    }
  })();

  const researchInterests = member.researchInterests ?? [];

  const initials = member?.name
    ? member.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="group relative rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 shrink-0 ring-2 ring-border">
          <AvatarImage src={member?.profileImage} alt={member?.name} />
          <AvatarFallback className="text-sm font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="font-semibold text-sm leading-tight truncate">
            {member?.name}
          </h3>
          <Badge
            variant="outline"
            className={cn(
              "flex items-center gap-1 w-fit text-[10px] capitalize px-2 py-0",
              role.badge,
            )}
          >
            <RoleIcon className="h-2.5 w-2.5" />
            {role.label}
          </Badge>
        </div>
      </div>

      {/* University */}
      {member?.university && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{member.university}</span>
        </p>
      )}

      {/* Bio */}
      {member?.bio && (
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {member.bio}
        </p>
      )}

      {/* Research Interests */}
      {researchInterests.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {researchInterests.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] px-2 py-0 rounded-full"
            >
              {tag}
            </Badge>
          ))}
          {researchInterests.length > 3 && (
            <Badge
              variant="secondary"
              className="text-[10px] px-2 py-0 rounded-full"
            >
              +{researchInterests.length - 3}
            </Badge>
          )}
        </div>
      )}

      {/* Social Links */}
      {(socialLinks?.github || socialLinks?.googleScholar) && (
        <div className="flex items-center gap-2 pt-1 border-t">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <GitBranch className="h-3.5 w-3.5" />
              </Button>
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          )}
          {socialLinks.googleScholar && (
            <a
              href={socialLinks.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <BookOpen className="h-3.5 w-3.5" />
              </Button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function MembersView({members}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.university?.toLowerCase().includes(search.toLowerCase()) ||
        m.researchInterests?.some((t) =>
          t.toLowerCase().includes(search.toLowerCase()),
        );
      const matchesFilter =
        activeFilter === "all" || m.memberType === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [members, search, activeFilter]);

  const counts = useMemo(
    () => ({
      all: members.length,
      student: members.filter((m) => m.memberType === "student").length,
      researcher: members.filter((m) => m.memberType === "researcher").length,
    }),
    [members],
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-12 py-10 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Members</h1>
        <p className="text-muted-foreground text-sm">
          Meet the researchers and students of the ML/AI Research Lab.
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, university or interest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 bg-muted/60 rounded-xl p-1">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  activeFilter === f.value
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {f.label}
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full",
                    activeFilter === f.value
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {counts[f.value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <Users className="h-10 w-10 text-muted-foreground/30" />
          <p className="text-sm font-medium">No members found</p>
          <p className="text-xs text-muted-foreground">
            Try adjusting your search or filter.
          </p>
        </div>
      )}
    </div>
  );
}
