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
  PlayCircle,
  CheckCircle2,
  Trophy,
  ChevronRight,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";

const roleConfig = {
  member: {
    icon: GraduationCap,
    label: "Member",
    badge: "bg-info/10 text-info border-info/20",
    greeting: "Keep learning, keep growing.",
  },
  advisor: {
    icon: Users,
    label: "Advisor",
    badge: "bg-success/10 text-success border-success/20",
    greeting: "Guiding the next generation of researchers.",
  },
  core_panel: {
    icon: Sparkles,
    label: "Core Panel",
    badge: "bg-primary/10 text-primary border-primary/20",
    greeting: "Shaping the future of the lab.",
  },
  admin: {
    icon: ShieldCheck,
    label: "Admin",
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    greeting: "The lab is yours to shape.",
  },
};

const statCards = (stats) => [
  {
    label: "Total Registered",
    value: stats.total,
    icon: Users,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Advisors",
    value: stats.advisors,
    icon: GraduationCap,
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    label: "Core Panel",
    value: stats.corePanel,
    icon: Briefcase,
    color: "text-success",
    bg: "bg-success/10",
  },
];

const memberQuickLinks = [
  {
    href: "/profile",
    icon: UserCircle,
    label: "My Profile",
    description: "View and edit your profile",
    color: "group-hover:text-warning",
    bg: "group-hover:bg-warning/10",
  },
  {
    href: "/members",
    icon: Users,
    label: "Members Directory",
    description: "Browse all lab members",
    color: "group-hover:text-info",
    bg: "group-hover:bg-info/10",
  },
  {
    href: "/research",
    icon: BookOpen,
    label: "Research",
    description: "Explore research & publications",
    color: "group-hover:text-success",
    bg: "group-hover:bg-success/10",
  },
];

const adminQuickLinks = [
  ...memberQuickLinks,
  {
    href: "/admin",
    icon: ClipboardList,
    label: "Admin Panel",
    description: "Manage lab members and content",
    color: "group-hover:text-destructive",
    bg: "group-hover:bg-destructive/10",
  },
];

export default function DashboardView({user, stats, enrollments = []}) {
  const role = roleConfig[user?.role] ?? roleConfig.member;
  const RoleIcon = role.icon;
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

  // Profile Completeness
  const profileItems = [
    {label: "Add a bio", completed: !!user?.bio},
    {label: "Add university", completed: !!user?.university},
    {label: "Add social links", completed: Object.values(user?.socialLinks || {}).some(v => !!v)},
    {label: "Add research interests", completed: user?.researchInterests?.length > 0},
  ];
  const completedCount = profileItems.filter(i => i.completed).length;
  const progressPercent = (completedCount / profileItems.length) * 100;
  const showCompleteness = completedCount < profileItems.length;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-12 py-10 space-y-6">
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

      {/* Profile Completeness - Senior Onboarding Overlay */}
      {showCompleteness && (
        <Card className="border-primary/20 bg-primary/[0.02] overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Trophy className="w-24 h-24 text-primary rotate-12" />
           </div>
           <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                 <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                       <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <UserCircle className="w-5 h-5" />
                       </div>
                       <h3 className="font-bold text-lg">Complete your profile</h3>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-md">
                       Join our research directory! Members with complete profiles are 3x more likely to find collaborators.
                    </p>
                 </div>

                 <div className="w-full md:w-64 space-y-3">
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-xs font-bold uppercase tracking-wider text-primary">Progress</span>
                       <span className="text-xs font-bold">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                       <div 
                         className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(var(--primary),0.4)]"
                         style={{ width: `${progressPercent}%` }}
                       />
                    </div>
                    <Link href="/profile">
                       <Button size="sm" className="w-full h-9 gap-2 mt-2 group/btn cursor-pointer">
                          Edit Profile
                          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                       </Button>
                    </Link>
                 </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-primary/10">
                 {profileItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                       <div className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                          item.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-muted-foreground/30 text-transparent"
                       )}>
                          <CheckCircle2 className="h-3 w-3" />
                       </div>
                       <span className={cn(
                          "text-xs font-medium",
                          item.completed ? "text-foreground" : "text-muted-foreground"
                       )}>
                          {item.label}
                       </span>
                    </div>
                 ))}
              </div>
           </CardContent>
        </Card>
      )}

      {/* Stats */}
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

      {/* My Courses */}
      <div className="rounded-2xl border bg-card shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <PlayCircle className="h-3.5 w-3.5" />
            My Courses
          </p>
          <Link href="/courses">
            <span className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Browse All
            </span>
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
            <BookOpen className="h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              You haven&apos;t enrolled in any courses yet.
            </p>
            <Link href="/courses">
              <Button variant="outline" size="sm" className="mt-1 cursor-pointer">
                Explore Courses
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {enrollments.map((enrollment) => (
              <Link
                key={enrollment._id}
                href={`/courses/${enrollment.course._id}`}
                className="cursor-pointer"
              >
                <div className="group rounded-xl border border-border/50 p-4 hover:bg-muted/40 transition-colors space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {enrollment.course.title}
                    </h4>
                    {enrollment.isCompleted && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/40 capitalize">
                      {enrollment.course.difficulty}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {enrollment.completedLectures?.length || 0}/{enrollment.totalLectures} lectures
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{width: `${enrollment.progress}%`}}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground text-right">
                      {enrollment.progress}%
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links + Announcements */}
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
    </div>
  );
}
