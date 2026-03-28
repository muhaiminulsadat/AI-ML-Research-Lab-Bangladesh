"use client";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Briefcase,
  FlaskConical,
  ArrowRight,
  UserCircle,
  BookOpen,
  Bell,
  Sparkles,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";

const roleConfig = {
  general: {
    icon: UserCircle,
    label: "General",
    badge: "bg-gray-500/10 text-gray-600 border-gray-200",
    greeting: "Welcome! Apply to become a member.",
  },
  member: {
    icon: GraduationCap,
    label: "Member",
    badge: "bg-blue-500/10 text-blue-600 border-blue-200",
    greeting: "Keep learning, keep growing.",
  },
  admin: {
    icon: ShieldCheck,
    label: "Admin",
    badge: "bg-rose-500/10 text-rose-600 border-rose-200",
    greeting: "The lab is yours to shape.",
  },
};

const statCards = (stats) => [
  {
    label: "Total Members",
    value: stats.total,
    icon: Users,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    label: "Students",
    value: stats.students,
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Researchers",
    value: stats.researchers,
    icon: Briefcase,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const memberQuickLinks = [
  {
    href: "/profile",
    icon: UserCircle,
    label: "My Profile",
    description: "View and edit your profile",
    color: "group-hover:text-orange-500",
    bg: "group-hover:bg-orange-500/10",
  },
  {
    href: "/members",
    icon: Users,
    label: "Members Directory",
    description: "Browse all lab members",
    color: "group-hover:text-blue-500",
    bg: "group-hover:bg-blue-500/10",
  },
  {
    href: "/research",
    icon: BookOpen,
    label: "Research",
    description: "Explore research & publications",
    color: "group-hover:text-emerald-500",
    bg: "group-hover:bg-emerald-500/10",
  },
];

const adminQuickLinks = [
  ...memberQuickLinks,
  {
    href: "/admin",
    icon: ClipboardList,
    label: "Admin Panel",
    description: "Manage members and applications",
    color: "group-hover:text-rose-500",
    bg: "group-hover:bg-rose-500/10",
  },
];

export default function DashboardView({user, stats}) {
  const role = roleConfig[user?.role] ?? roleConfig.general;
  const RoleIcon = role.icon;
  const isGeneral = user?.role === "general";
  const isMember = user?.role === "member";
  const isAdmin = user?.role === "admin";
  const quickLinks = isAdmin ? adminQuickLinks : memberQuickLinks;

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      {/* Welcome Hero */}
      <div className="relative rounded-2xl overflow-hidden border bg-card shadow-sm p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-500/5 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-2 ring-orange-400/30 shadow">
              <AvatarImage src={user?.profileImage} alt={user?.name} />
              <AvatarFallback className="text-lg font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{timeGreeting} 👋</p>
              <h1 className="text-2xl font-bold tracking-tight">
                {user?.name}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
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
                {user?.memberType && (
                  <Badge variant="outline" className="text-xs capitalize">
                    {user.memberType}
                  </Badge>
                )}
                {user?.university && (
                  <span className="text-xs text-muted-foreground">
                    {user.university}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            {role.greeting}
          </div>
        </div>
      </div>

      {/* General — Apply CTA */}
      {isGeneral && (
        <div className="rounded-2xl border bg-card shadow-sm p-6 flex flex-col items-center gap-4 text-center">
          <ClipboardList className="h-10 w-10 text-orange-400" />
          <div>
            <h2 className="text-lg font-semibold">You're not a member yet</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Apply to join the lab and get access to all features.
            </p>
          </div>
          <Link href="/apply">
            <Button className="bg-orange-400 hover:bg-orange-500 text-white">
              Apply Now
            </Button>
          </Link>
        </div>
      )}

      {/* Stats — member and admin only */}
      {(isMember || isAdmin) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards(stats).map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="shadow-sm">
                <CardContent className="pt-5 pb-5 flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
                      stat.bg,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Quick Links + Announcements — member and admin only */}
      {(isMember || isAdmin) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-card shadow-sm p-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Quick Access
            </p>
            <div className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href}>
                    <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg border bg-muted transition-colors shrink-0",
                          link.bg,
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-colors",
                            link.color,
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{link.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border bg-card shadow-sm p-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Bell className="h-3.5 w-3.5" />
              Announcements
            </p>
            <div className="flex flex-col items-center justify-center h-32 gap-2 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                No announcements yet.
              </p>
              <p className="text-xs text-muted-foreground/60">
                Check back soon for updates.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
