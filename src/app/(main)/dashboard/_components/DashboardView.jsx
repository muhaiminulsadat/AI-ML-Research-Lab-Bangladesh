"use client";
import Link from "next/link";
import {
  Users,
  GraduationCap,
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
  Clock,
  Layout,
  ExternalLink,
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

const QuickLink = ({href, icon: Icon, label, description, color, bg}) => (
  <Link href={href} className="group block">
    <div className="flex items-center gap-4 p-4 rounded-2xl border bg-card transition-all hover:border-primary/30 hover:shadow-sm">
      <div className={cn("p-2.5 rounded-xl bg-muted transition-colors", bg)}>
        <Icon className={cn("w-5 h-5 text-muted-foreground", color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold tracking-tight">{label}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  </Link>
);

export default function DashboardView({user, stats, enrollments = []}) {
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

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const activeEnrollment =
    enrollments
      .filter((e) => !e.isCompleted)
      .sort((a, b) => b.progress - a.progress)[0] || enrollments[0];

  const profileItems = [
    {label: "Add a bio", completed: !!user?.bio},
    {label: "Add university", completed: !!user?.university},
    {
      label: "Add research interests",
      completed: user?.researchInterests?.length > 0,
    },
  ];
  const completedCount = profileItems.filter((i) => i.completed).length;
  const progressPercent = (completedCount / profileItems.length) * 100;
  const showCompleteness = completedCount < profileItems.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-8">
        {activeEnrollment ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Session
              </h3>
            </div>
            <div className="relative group overflow-hidden rounded-3xl border bg-card p-1">
              <div className="absolute inset-0 bg-primary/[0.03] transition-colors group-hover:bg-primary/[0.05]" />
              <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-full md:w-48 aspect-video rounded-2xl overflow-hidden border shadow-inner shrink-0 bg-muted">
                  {activeEnrollment.course.thumbnail ? (
                    <img
                      src={activeEnrollment.course.thumbnail}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FlaskConical className="w-10 h-10 text-muted-foreground/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/60 text-[11px] text-white font-bold backdrop-blur">
                    {activeEnrollment.progress}%
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {activeEnrollment.course.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                      Continue where you left off. You&apos;ve completed{" "}
                      {activeEnrollment.completedLectures?.length || 0} of{" "}
                      {activeEnrollment.totalLectures} lectures.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <Link href={`/courses/${activeEnrollment.course._id}`}>
                      <Button className="h-11 px-6 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20 cursor-pointer active:scale-95 transition-all">
                        Resume Course
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Badge
                      variant="secondary"
                      className="h-11 px-4 rounded-xl text-xs border border-border/50 uppercase tracking-widest opacity-80"
                    >
                      {activeEnrollment.course.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="rounded-3xl border border-dashed border-muted-foreground/20 p-12 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-2">
              <BookOpen className="w-8 h-8 text-muted-foreground/30" />
            </div>
            <h3 className="text-lg font-bold">No active enrollments</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Start your journey into AI and Machine Learning by exploring our
              curated courses.
            </p>
            <Link href="/courses">
              <Button
                variant="outline"
                className="rounded-xl h-10 cursor-pointer"
              >
                Explore Catalog
              </Button>
            </Link>
          </div>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              My Research Path
            </h3>
            <Link
              href="/courses"
              className="text-xs font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1"
            >
              View All <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrollments.slice(0, 4).map((e) => (
              <Link key={e._id} href={`/courses/${e.course._id}`}>
                <div className="group p-5 rounded-2xl border bg-card hover:border-primary/40 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-[15px] font-bold leading-snug truncate pr-4 group-hover:text-primary transition-colors">
                      {e.course.title}
                    </h4>
                    {e.isCompleted ? (
                      <div className="p-1 px-2.5 rounded bg-success/10 text-success border border-success/20 text-[10px] font-bold uppercase tracking-tight">
                        Done
                      </div>
                    ) : (
                      <span className="text-[11px] font-bold text-muted-foreground">
                        {e.progress}%
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all duration-700 rounded-full",
                          e.isCompleted ? "bg-success" : "bg-primary",
                        )}
                        style={{width: `${e.progress}%`}}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-muted-foreground font-bold uppercase tracking-tight">
                      <span>
                        {e.completedLectures?.length || 0}/{e.totalLectures}{" "}
                        Lectures
                      </span>
                      <span className="capitalize">{e.course.difficulty}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <aside className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Lab Progress
            </h3>
            {showCompleteness ? (
              <Card className="rounded-2xl border-primary/20 bg-primary/[0.02] border overflow-hidden">
                <CardContent className="p-5 space-y-4">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-[11px] font-bold text-primary italic lowercase">
                        Completing profile...
                      </p>
                      <p className="text-[11px] font-bold uppercase tracking-tighter text-muted-foreground">
                        {completedCount}/3 items
                      </p>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden p-0.5 border">
                      <div
                        className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.3)] transition-all duration-1000"
                        style={{width: `${progressPercent}%`}}
                      />
                    </div>
                  </div>
                  <Link href="/profile">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-bold h-9 rounded-lg cursor-pointer"
                    >
                      Complete Profile Setup
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="p-5 rounded-2xl bg-success/5 border border-success/20 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-xs font-bold text-success">Profile 100%</p>
                  <p className="text-[11px] text-success/70">
                    Member status verified.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Lab Resources
            </h3>
            <div className="space-y-3">
              <QuickLink
                href="/profile"
                icon={UserCircle}
                label="My Journal"
                description="Update your researcher profile"
                color="text-warning"
                bg="bg-warning/10"
              />
              <QuickLink
                href="/members"
                icon={Users}
                label="Directory"
                description="Find your collaborators"
                color="text-info"
                bg="bg-info/10"
              />
              <QuickLink
                href="/research"
                icon={FlaskConical}
                label="Publications"
                description="Latest works from the lab"
                color="text-success"
                bg="bg-success/10"
              />
              {isAdmin && (
                <QuickLink
                  href="/admin"
                  icon={ShieldCheck}
                  label="Admin Hub"
                  description="Lab systems management"
                  color="text-destructive"
                  bg="bg-destructive/10"
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notices
            </h3>
            <div className="p-10 rounded-2xl border border-dashed text-center space-y-2 opacity-50">
              <p className="text-xs font-bold">No New Data</p>
              <p className="text-[11px] text-muted-foreground">
                Updates appear here.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
