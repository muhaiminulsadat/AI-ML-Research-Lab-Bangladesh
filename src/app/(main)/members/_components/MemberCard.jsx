"use client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  BookOpen,
  Building2,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Briefcase,
  Crown,
  Shield,
} from "lucide-react";
import {cn} from "@/lib/utils";

const roleConfig = {
  student: {
    icon: GraduationCap,
    label: "Student",
    dot: "bg-blue-400",
    text: "text-blue-400",
    ring: "ring-blue-500/20",
    gradient: "from-blue-500/10 to-transparent",
  },
  researcher: {
    icon: Briefcase,
    label: "Researcher",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    ring: "ring-emerald-500/20",
    gradient: "from-emerald-500/10 to-transparent",
  },
  advisor: {
    icon: Crown,
    label: "Advisor",
    dot: "bg-fuchsia-400",
    text: "text-fuchsia-400",
    ring: "ring-fuchsia-500/20",
    gradient: "from-fuchsia-500/10 to-transparent",
  },
  core_panel: {
    icon: Shield,
    label: "Core Panel",
    dot: "bg-indigo-400",
    text: "text-indigo-400",
    ring: "ring-indigo-500/20",
    gradient: "from-indigo-500/10 to-transparent",
  },
  instructor: {
    icon: BookOpen,
    label: "Instructor",
    dot: "bg-amber-400",
    text: "text-amber-400",
    ring: "ring-amber-500/20",
    gradient: "from-amber-500/10 to-transparent",
  },
};

export default function MemberCard({member}) {
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

  const hasSocials =
    socialLinks?.github || socialLinks?.linkedin || socialLinks?.googleScholar;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border/60",
        "bg-card/80 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:border-border hover:shadow-lg hover:shadow-primary/5",
        "hover:-translate-y-1",
      )}
    >
      {/* Top gradient accent */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-0",
          "group-hover:opacity-100 transition-opacity duration-300",
          role.gradient === "from-blue-500/10 to-transparent"
            ? "from-blue-500/60 via-blue-400/30 to-transparent"
            : role.gradient === "from-emerald-500/10 to-transparent"
            ? "from-emerald-500/60 via-emerald-400/30 to-transparent"
            : role.gradient === "from-fuchsia-500/10 to-transparent"
            ? "from-fuchsia-500/60 via-fuchsia-400/30 to-transparent"
            : role.gradient === "from-indigo-500/10 to-transparent"
            ? "from-indigo-500/60 via-indigo-400/30 to-transparent"
            : role.gradient === "from-amber-500/10 to-transparent"
            ? "from-amber-500/60 via-amber-400/30 to-transparent"
            : "from-primary/60 via-primary/30 to-transparent",
        )}
      />

      <div className="p-5 pb-0">
        {/* Header: Avatar + Name + Role */}
        <div className="flex items-start gap-3.5">
          <div className="relative shrink-0">
            <Avatar
              className={cn(
                "h-11 w-11 ring-[1.5px] ring-offset-2 ring-offset-card",
                role.ring,
              )}
            >
              <AvatarImage src={member?.profileImage} alt={member?.name} />
              <AvatarFallback className="text-xs font-semibold bg-muted text-muted-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <h3 className="font-semibold text-[13px] leading-tight tracking-tight text-foreground truncate">
              {member?.name}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", role.dot)} />
              <span
                className={cn(
                  "text-[11px] font-medium tracking-wide uppercase",
                  role.text,
                )}
              >
                {role.label}
              </span>
            </div>
          </div>
        </div>

        {/* University */}
        {member?.university && (
          <div className="mt-3 flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-3 w-3 shrink-0 opacity-60" />
            <span className="text-xs truncate">{member.university}</span>
          </div>
        )}

        {/* Bio */}
        {member?.bio && (
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground/80 line-clamp-2">
            {member.bio}
          </p>
        )}

        {/* Research Interests */}
        {researchInterests.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {researchInterests.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground border border-border/40"
              >
                {tag}
              </span>
            ))}
            {researchInterests.length > 3 && (
              <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground/60">
                +{researchInterests.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Social Links Footer */}
      {hasSocials && (
        <div className="mt-auto px-5 py-3 border-t border-border/40 flex items-center gap-1">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors duration-200 px-2 py-1 rounded-md hover:bg-muted/60"
            >
              <GitBranch className="h-3 w-3" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors duration-200 px-2 py-1 rounded-md hover:bg-muted/60"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          )}
          {socialLinks.googleScholar && (
            <a
              href={socialLinks.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors duration-200 px-2 py-1 rounded-md hover:bg-muted/60"
            >
              <BookOpen className="h-3 w-3" />
              <span className="hidden sm:inline">Scholar</span>
            </a>
          )}
        </div>
      )}

      {/* Bottom padding when no socials */}
      {!hasSocials && <div className="pb-5" />}
    </div>
  );
}
