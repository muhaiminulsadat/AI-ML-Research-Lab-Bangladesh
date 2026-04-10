"use client";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {
  Menu,
  FlaskConical,
  ChevronDown,
  UserCircle,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Users,
  ClipboardList,
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {Badge} from "@/components/ui/badge";
import {useGetCurrentUser, useLogOut} from "@/hooks/useAuth";
import {cn} from "@/lib/utils";

const publicLinks = [
  {href: "/", label: "Home"},
  {href: "/panel", label: "Panel"},
  {href: "/research", label: "Research"},
  {href: "/workshops", label: "Workshops"},
  {href: "/courses", label: "Courses"},
  {href: "/contact", label: "Contact us"},
  {href: "/about", label: "About us"},
];

const getAppLinks = (role) => {
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

const roleBadgeConfig = {
  member: {
    label: "Member",
    className: "bg-info/10 text-info border-info/30",
  },
  advisor: {
    label: "Advisor",
    className: "bg-success/10 text-success border-success/30",
  },
  core_panel: {
    label: "Core Panel",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  admin: {
    label: "Admin",
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

function NavLink({href, label, icon: Icon, onClick, mobile = false}) {
  const pathname = usePathname();
  // Exact match for root or specific paths, and startsWith match (with slash) for nested
  const isActive =
    href === "/"
      ? pathname === "/"
      : href === "/admin"
        ? pathname === "/admin"
        : pathname === href || pathname.startsWith(`${href}/`);

  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted",
        )}
      >
        {Icon ? (
          <Icon
            className={cn(
              "h-4 w-4 shrink-0",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          />
        ) : (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full shrink-0 transition-colors",
              isActive ? "bg-primary" : "bg-border",
            )}
          />
        )}
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium transition-colors duration-200 cursor-pointer",
        "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
        isActive
          ? "text-primary after:w-full"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export default function Navbar({isMobileOnly = false}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {user} = useGetCurrentUser();
  const {logout} = useLogOut();

  const isAuthenticated = !!user;
  const userRole = user?.role ?? "member";
  const roleConfig = roleBadgeConfig[userRole] ?? roleBadgeConfig.member;

  const appLinks = getAppLinks(userRole);
  const allLinks = [...publicLinks];

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md",
        isMobileOnly && "lg:hidden",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary overflow-hidden">
              <Image
                src="/logo.png"
                alt="ML & AI Research Lab Logo"
                fill
                className="object-contain brightness-0 scale-[1.15]"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-foreground">
                ML & AI Research
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">
                Lab · Bangladesh
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {allLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Desktop Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden md:flex items-center gap-2 h-10 px-2.5 rounded-full hover:bg-muted/80 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="h-7 w-7 ring-2 ring-border ring-offset-1 ring-offset-background transition-all duration-200 group-hover:ring-primary/30">
                        <AvatarImage
                          src={user?.profileImage}
                          alt={user?.name}
                        />
                        <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success border-2 border-background" />
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-64 p-0 overflow-hidden rounded-2xl border shadow-xl shadow-black/5"
                >
                  {/* User Info Header */}
                  <div className="relative px-4 py-4 bg-primary/10 border-b">
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="relative flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                          <AvatarImage
                            src={user?.profileImage}
                            alt={user?.name}
                          />
                          <AvatarFallback className="text-sm font-bold bg-primary text-primary-foreground">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-background" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                        <Badge
                          variant="outline"
                          className={cn(
                            "mt-1 w-fit text-[10px] px-2 py-0 capitalize",
                            roleConfig.className,
                          )}
                        >
                          {roleConfig.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-1.5">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                          <UserCircle className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <span className="text-sm">Profile</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                          <LayoutDashboard className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <span className="text-sm">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    {userRole === "admin" && (
                      <>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem asChild>
                          <Link
                            href="/admin"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer group/admin"
                          >
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10 group-hover/admin:bg-destructive/20 transition-colors">
                              <ShieldCheck className="h-3.5 w-3.5 text-destructive" />
                            </div>
                            <span className="text-sm text-destructive">
                              Admin Panel
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </div>

                  {/* Logout */}
                  <div className="p-1.5 border-t bg-muted/30">
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10">
                        <LogOut className="h-3.5 w-3.5 text-destructive" />
                      </div>
                      <span className="text-sm">Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 cursor-pointer"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 flex flex-col p-0">
                <SheetHeader className="px-5 py-4 border-b shrink-0">
                  <SheetTitle className="flex items-center gap-2.5">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary shrink-0 overflow-hidden">
                      <Image
                        src="/logo.png"
                        alt="ML & AI Research Lab Logo"
                        fill
                        className="object-contain brightness-0 scale-[1.15]"
                      />
                    </div>
                    <div className="flex flex-col leading-none text-left">
                      <span className="text-[15px] font-bold">
                        ML & AI Research
                      </span>
                      <span className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">
                        Lab · Bangladesh
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Nav Links */}
                <div className="flex-1 px-3 py-3 space-y-6 overflow-y-auto custom-scrollbar">
                  {isAuthenticated && (
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                        Dashboard Navigation
                      </div>
                      {appLinks.map((link) => (
                        <NavLink
                          key={link.href + "-app"}
                          {...link}
                          mobile
                          onClick={() => setMobileMenuOpen(false)}
                        />
                      ))}
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                      Public Site
                    </div>
                    {allLinks.map((link) => (
                      <NavLink
                        key={link.href}
                        {...link}
                        mobile
                        onClick={() => setMobileMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-4 border-t bg-muted/30 shrink-0">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-background border">
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarImage src={user?.profileImage} />
                          <AvatarFallback className="text-xs font-bold">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-semibold truncate">
                            {user?.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {user?.email}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "shrink-0 text-[10px] px-1.5 py-0 capitalize",
                            roleConfig.className,
                          )}
                        >
                          {roleConfig.label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-1.5 cursor-pointer"
                          >
                            <UserCircle className="h-3.5 w-3.5" />
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5 cursor-pointer"
                          onClick={() => {
                            logout();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full cursor-pointer"
                          size="sm"
                        >
                          Log in
                        </Button>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="w-full cursor-pointer" size="sm">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
