"use client";
import {useState} from "react";
import {
  GitBranch,
  ExternalLink,
  BookOpen,
  Building2,
  Mail,
  Pencil,
  Key,
  GraduationCap,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import {cn} from "@/lib/utils";
import Link from "next/link";

const roleConfig = {
  member: {
    icon: GraduationCap,
    label: "Member",
    accent: "from-info to-background",
    badge: "bg-info/10 text-info border-info/20",
    ring: "ring-info/30",
  },
  advisor: {
    icon: Users,
    label: "Advisor",
    accent: "from-success to-background",
    badge: "bg-success/10 text-success border-success/20",
    ring: "ring-success/30",
  },
  core_panel: {
    icon: Sparkles,
    label: "Core Panel",
    accent: "from-primary to-background",
    badge: "bg-primary/10 text-primary border-primary/20",
    ring: "ring-primary/30",
  },
  admin: {
    icon: ShieldCheck,
    label: "Admin",
    accent: "from-destructive to-background",
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    ring: "ring-destructive/30",
  },
};

export default function ProfileView({user}) {
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const role = roleConfig[user?.role] ?? roleConfig.member;
  const RoleIcon = role.icon;
  const isAdmin = user?.role === "admin";

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
            <div className="flex items-center gap-2 mb-1">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => setPasswordOpen(true)}
              >
                <Key className="h-3.5 w-3.5" />
                Change Password
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">
                {user?.name}
              </h1>
              {user?.memberId && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-muted text-[10px] font-bold text-muted-foreground/60 tracking-wider">
                  {user.memberId}
                </span>
              )}
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

      {/* Profile Details */}
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

      {/* Admin Panel Link */}
      {isAdmin && (
        <Card className="shadow-sm border-destructive/20 bg-destructive/5">
          <CardContent className="pt-5 pb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                <ShieldCheck className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin Panel</p>
                <p className="text-xs text-muted-foreground">
                  Manage lab members and content
                </p>
              </div>
            </div>
            <Link href="/admin">
              <Button
                size="sm"
                variant="outline"
                className="border-destructive/20 text-destructive hover:bg-destructive/10"
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
      <ChangePasswordModal
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </div>
  );
}
