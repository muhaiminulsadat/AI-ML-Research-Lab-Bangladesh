"use client";
import {useState} from "react";
import {
  GitBranch,
  ExternalLink,
  BookOpen,
  Building2,
  Mail,
  Pencil,
  GraduationCap,
  Briefcase,
  FlaskConical,
  MapPin,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import EditProfileModal from "./EditProfileModal";
import {cn} from "@/lib/utils";
import Link from "next/link";

const roleConfig = {
  student: {
    icon: GraduationCap,
    label: "Student",
    accent: "from-blue-500 to-cyan-500",
    badge: "bg-blue-500/10 text-blue-600 border-blue-200",
    ring: "ring-blue-500/30",
  },
  researcher: {
    icon: Briefcase,
    label: "Researcher / Faculty",
    accent: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    ring: "ring-emerald-500/30",
  },
  admin: {
    icon: FlaskConical,
    label: "Admin",
    accent: "from-rose-500 to-orange-500",
    badge: "bg-rose-500/10 text-rose-600 border-rose-200",
    ring: "ring-rose-500/30",
  },
};

export default function ProfileView({user}) {
  const [editOpen, setEditOpen] = useState(false);

  const role = roleConfig[user?.role] ?? roleConfig.student;
  const RoleIcon = role.icon;

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
      {/* Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border bg-card shadow-sm">
        {/* Cover Banner */}
        <div className="h-32 w-full bg-gradient-to-br from-orange-400 to-amber-500 opacity-80">
          <div
            className="absolute inset-0 h-32 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Avatar — overlaps banner */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <Avatar
              className={cn(
                "h-20 w-20 ring-4 ring-background shadow-lg",
                role.ring,
              )}
            >
              <AvatarImage src={user?.profileImage} alt={user?.name} />
              <AvatarFallback className="text-2xl font-bold bg-muted">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 mb-1"
              onClick={() => setEditOpen(true)}
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Profile
            </Button>
          </div>

          {/* Name + Role */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">
                {user?.name}
              </h1>
              <Badge
                variant="outline"
                className={cn(
                  "flex items-center gap-1 capitalize text-xs",
                  role.badge,
                )}
              >
                <RoleIcon className="h-3 w-3" />
                {role.label}
              </Badge>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {user?.email}
              </span>
              {user?.university && (
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {user.university}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {user?.bio && (
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            About
          </p>
          <p className="text-sm leading-relaxed">{user.bio}</p>
        </div>
      )}

      {/* Research Interests */}
      {user?.researchInterests?.length > 0 && (
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5" />
            Research Interests
          </p>
          <div className="flex flex-wrap gap-2">
            {user.researchInterests.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 text-xs rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {(user?.socialLinks?.github ||
        user?.socialLinks?.linkedin ||
        user?.socialLinks?.googleScholar) && (
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Links
          </p>
          <div className="flex flex-col gap-2">
            {user.socialLinks.github && (
              <Link
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted group-hover:bg-primary/10 transition-colors">
                  <GitBranch className="h-4 w-4" />
                </div>
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}
            {user.socialLinks.linkedin && (
              <Link
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted group-hover:bg-primary/10 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </div>
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}
            {user.socialLinks.googleScholar && (
              <Link
                href={user.socialLinks.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted group-hover:bg-primary/10 transition-colors">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span>Google Scholar</span>
                <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}
          </div>
        </div>
      )}

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
      />
    </div>
  );
}
