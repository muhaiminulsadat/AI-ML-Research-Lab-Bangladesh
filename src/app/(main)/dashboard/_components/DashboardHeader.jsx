"use client";
import {
  Users,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Layout,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
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

export default function DashboardHeader({user}) {
  const role = roleConfig[user?.role] ?? roleConfig.member;
  const RoleIcon = role.icon;

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
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
          <Layout className="w-4 h-4" />
          Control Center
        </div>
        <h1 className="text-3xl font-bold tracking-tight flex items-baseline gap-3">
          {timeGreeting}, {user?.name.split(" ")[0]}
          <span className="text-sm font-medium text-muted-foreground tracking-normal block md:inline font-sans capitalize">
            — {role.label} @ ML & AI Lab
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className={cn("px-3 py-1 text-xs gap-1.5 font-bold", role.badge)}
        >
          <RoleIcon className="w-3 h-3" />
          {role.label}
        </Badge>
        <div className="h-10 w-px bg-border hidden md:block mx-1" />
        <Avatar className="h-10 w-10 ring-2 ring-primary/20 shadow-sm">
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback className="font-bold text-xs">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
