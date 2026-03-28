import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {BookOpen, Building2, ExternalLink, GitBranch} from "lucide-react";

export default function MemberCard({member, roleConfig}) {
  const role = roleConfig[member?.role] ?? roleConfig.student;
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
