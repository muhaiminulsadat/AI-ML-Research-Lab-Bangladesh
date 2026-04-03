"use client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  BookOpen,
  Building2,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {cn} from "@/lib/utils";

const roleConfig = {
  member: {
    icon: GraduationCap,
    label: "Member",
    dot: "bg-info",
    text: "text-info",
    ring: "ring-info/20",
    gradient: "from-info/10 to-transparent",
    premium: false,
    theme: "info",
  },
  advisor: {
    icon: Users,
    label: "Advisor",
    dot: "bg-success",
    text: "text-success",
    ring: "ring-success/30",
    gradient: "from-success/20 via-success/5 to-transparent",
    premium: true,
    border: "border-success/20",
    shadow: "shadow-success/5",
    theme: "success",
  },
  core_panel: {
    icon: Sparkles,
    label: "Core Panel",
    dot: "bg-primary",
    text: "text-primary",
    ring: "ring-primary/30",
    gradient: "from-primary/20 via-primary/5 to-transparent",
    premium: true,
    border: "border-primary/20",
    shadow: "shadow-primary/5",
    theme: "primary",
  },
  admin: {
    icon: ShieldCheck,
    label: "Admin",
    dot: "bg-destructive",
    text: "text-destructive",
    ring: "ring-destructive/30",
    gradient: "from-destructive/20 via-destructive/5 to-transparent",
    premium: true,
    border: "border-destructive/20",
    shadow: "shadow-destructive/5",
    theme: "destructive",
  },
};

export default function MemberCard({member}) {
  const role = roleConfig[member?.role] ?? roleConfig.member;
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
        "group relative flex flex-col rounded-2xl border border-border/60 card-lift",
        "bg-card/80 backdrop-blur-sm",
        "transition-all duration-300 ease-out hover:border-border hover:shadow-lg hover:shadow-primary/5",
        role.premium && role.border,
        role.premium && role.shadow,
      )}
    >
      {/* Top gradient accent */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-linear-to-r opacity-0",
          "group-hover:opacity-100 transition-opacity duration-300",
          member.role === "member"
            ? "from-info/60 via-info/30 to-transparent"
            : member.role === "advisor"
              ? "from-success/60 via-success/30 to-transparent"
              : member.role === "core_panel"
                ? "from-primary/60 via-primary/30 to-transparent"
                : member.role === "admin"
                  ? "from-destructive/60 via-destructive/30 to-transparent"
                  : "from-primary/60 via-primary/30 to-transparent",
        )}
      />
      {/* Role-tinted hover wash */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br opacity-0",
          "group-hover:opacity-100 transition-opacity duration-300",
          role.gradient,
        )}
      />

      <div className="relative p-5 pb-0 z-1">
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
            {role.premium && (
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-1 ring-border shadow-sm">
                <RoleIcon className={cn("h-2.5 w-2.5", role.text)} />
              </div>
            )}
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
            {member.memberId && (
              <p className="text-[10px] font-bold tracking-tight text-muted-foreground/50">
                {member.memberId}
              </p>
            )}
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
        <div className="relative z-1 mt-auto px-5 py-3 border-t border-border/40 flex items-center gap-1 bg-card/60 backdrop-blur-sm">
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
