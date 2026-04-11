"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ShieldCheck,
  UserCircle,
  LogOut,
  FlaskConical,
  PanelLeftClose,
  PanelLeft,
  GraduationCap,
  FileText,
  ClipboardList,
  Calendar,
} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useLogOut} from "@/hooks/useAuth";

const getLinks = (role) => {
  const baseLinks = [
    {href: "/dashboard", label: "Dashboard", icon: LayoutDashboard},
    {
      href: "/dashboard/my-registrations",
      label: "My Registrations",
      icon: ClipboardList,
    },
    {href: "/courses", label: "Courses", icon: BookOpen},
    {href: "/research", label: "Research", icon: FileText},
    {href: "/members", label: "Members", icon: Users},
  ];

  if (role === "admin") {
    baseLinks.push(
      {href: "/admin", label: "Admin Panel", icon: ShieldCheck},
      {href: "/admin/members", label: "Manage Members", icon: Users},
      {href: "/admin/courses", label: "Manage Courses", icon: GraduationCap},
      {href: "/admin/workshops", label: "Manage Workshops", icon: Calendar},
      {
        href: "/admin/publications",
        label: "Manage Publications",
        icon: FileText,
      },
    );
  }

  return baseLinks;
};

export default function AppSidebar({user, isCollapsed, onToggleCollapse}) {
  const pathname = usePathname();
  const {logout} = useLogOut();
  const isLoggingOut = false;
  const links = getLinks(user?.role || "general");

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 border-r border-border/50 bg-card/50 backdrop-blur-xl hidden lg:flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div
        className={cn(
          "h-16 flex items-center border-b border-border/50",
          isCollapsed ? "justify-center px-0" : "justify-between px-6",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80 cursor-pointer"
          title="Go to Homepage"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary overflow-hidden flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Lab Logo"
              fill sizes='40px' className="object-contain brightness-0 scale-[1.15]"
            />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg tracking-tight whitespace-nowrap">
              ML & AI Lab
            </span>
          )}
        </Link>

        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
            onClick={onToggleCollapse}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center mt-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={onToggleCollapse}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar">
        {!isCollapsed && (
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
            Platform
          </div>
        )}

        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/admin" || link.href === "/dashboard"
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              title={isCollapsed ? link.label : undefined}
              className={cn(
                "flex items-center rounded-xl text-sm font-medium transition-all duration-200 group relative cursor-pointer",
                isCollapsed ? "justify-center p-3" : "py-2.5 px-3 gap-3",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive
                    ? "text-primary"
                    : "opacity-70 group-hover:opacity-100",
                )}
              />

              {!isCollapsed && (
                <span className="whitespace-nowrap">{link.label}</span>
              )}
            </Link>
          );
        })}
      </div>

      <div
        className={cn(
          "p-4 border-t border-border/50 bg-card/80",
          isCollapsed ? "items-center flex flex-col px-2 gap-4" : "",
        )}
      >
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 mb-3 rounded-lg hover:bg-secondary/40 p-2 transition-colors cursor-pointer",
            isCollapsed ? "justify-center" : "",
          )}
        >
          <Avatar className="h-9 w-9 border border-border/50 shadow-sm shrink-0">
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate tracking-tight leading-none group-hover:text-primary transition-colors">
                {user?.name}
              </span>
              <span className="text-[11px] text-muted-foreground truncate leading-snug mt-1 capitalize">
                {user?.role}
              </span>
            </div>
          )}
        </Link>

        {!isCollapsed ? (
          <>
            <button
              onClick={logout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-destructive/80 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/profile"
              title="Account Settings"
              className="flex justify-center text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <UserCircle className="h-5 w-5" />
            </Link>
            <button
              onClick={logout}
              disabled={isLoggingOut}
              title="Sign Out"
              className="flex justify-center text-destructive/80 hover:text-destructive cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
