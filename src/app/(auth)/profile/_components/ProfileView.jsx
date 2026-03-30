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
  ShieldCheck,
  UserCircle,
  ClipboardList,
  Lock,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import EditProfileModal from "./EditProfileModal";
import {cn} from "@/lib/utils";
import Link from "next/link";

const roleConfig = {
  general: {
    icon: UserCircle,
    label: "General",
    accent: "from-gray-400 to-slate-500",
    badge: "bg-gray-500/10 text-gray-600 border-gray-200",
    ring: "ring-gray-400/30",
  },
  member: {
    icon: GraduationCap,
    label: "Member",
    accent: "from-blue-500 to-cyan-500",
    badge: "bg-blue-500/10 text-blue-600 border-blue-200",
    ring: "ring-blue-500/30",
  },
  admin: {
    icon: ShieldCheck,
    label: "Admin",
    accent: "from-rose-500 to-orange-500",
    badge: "bg-rose-500/10 text-rose-600 border-rose-200",
    ring: "ring-rose-500/30",
  },
};

const memberTypeConfig = {
  student: {
    label: "Student",
    badge: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  researcher: {
    label: "Researcher",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
};

export default function ProfileView({user}) {
  const [editOpen, setEditOpen] = useState(false);

  const role = roleConfig[user?.role] ?? roleConfig.general;
  const RoleIcon = role.icon;
  const isGeneral = user?.role === "general";
  const isMember = user?.role === "member";
  const isAdmin = user?.role === "admin";
  const memberType = memberTypeConfig[user?.memberType];

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 lg:px-12 py-10 space-y-6">
      {/* Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border bg-card shadow-sm">
        <div
          className={cn(
            "h-40 lg:h-48 w-full bg-gradient-to-br opacity-80",
            role.accent,
          )}
        >
          <div
            className="absolute inset-0 h-40 lg:h-48 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-12 lg:-mt-16 mb-6">
            <Avatar
              className={cn(
                "h-24 w-24 lg:h-32 lg:w-32 ring-4 lg:ring-8 ring-background shadow-lg",
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
              {memberType && (
                <Badge
                  variant="outline"
                  className={cn("text-xs capitalize", memberType.badge)}
                >
                  {memberType.label}
                </Badge>
              )}
            </div>

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

      {/* General — Not a member yet */}
      {isGeneral && (
        <Card className="shadow-sm border-dashed">
          <CardContent className="pt-6 pb-6 flex flex-col items-center gap-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
              <ClipboardList className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-base font-semibold">
                You're not a member yet
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Apply to join the lab to unlock your full profile and access all
                features.
              </p>
            </div>
            <Link href="/apply">
              <Button className="bg-orange-400 hover:bg-orange-500 text-white gap-2">
                <ClipboardList className="h-4 w-4" />
                Apply Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Member & Admin — full profile sections */}
      {(isMember || isAdmin) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
          {user?.bio && (
            <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                About
              </p>
              <p className="text-sm leading-relaxed">{user.bio}</p>
            </div>
          )}

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
          </div>
          
          <div className="md:col-span-1 space-y-6">
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
          </div>
        </div>
      )}

      {/* Admin — quick link to admin panel */}
      {isAdmin && (
        <Card className="shadow-sm border-rose-200/50 bg-rose-500/5">
          <CardContent className="pt-5 pb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10">
                <ShieldCheck className="h-4 w-4 text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin Panel</p>
                <p className="text-xs text-muted-foreground">
                  Manage members and applications
                </p>
              </div>
            </div>
            <Link href="/admin">
              <Button
                size="sm"
                variant="outline"
                className="border-rose-200 text-rose-600 hover:bg-rose-500/10"
              >
                Open Panel
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
      />
    </div>
  );
}
