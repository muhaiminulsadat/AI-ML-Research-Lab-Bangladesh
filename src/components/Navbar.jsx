"use client";
import {useState} from "react";
import Link from "next/link";
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
];

const roleLinks = {
  member: [
    {href: "/dashboard", label: "Dashboard", icon: LayoutDashboard},
    {href: "/courses", label: "Courses", icon: BookOpen},
    {href: "/members", label: "Members", icon: Users},
  ],
  advisor: [
    {href: "/dashboard", label: "Dashboard", icon: LayoutDashboard},
    {href: "/courses", label: "Courses", icon: BookOpen},
    {href: "/members", label: "Members", icon: Users},
  ],
  core_panel: [
    {href: "/dashboard", label: "Dashboard", icon: LayoutDashboard},
    {href: "/courses", label: "Courses", icon: BookOpen},
    {href: "/members", label: "Members", icon: Users},
  ],
  admin: [
    {href: "/dashboard", label: "Dashboard", icon: LayoutDashboard},
    {href: "/courses", label: "Courses", icon: BookOpen},
    {href: "/members", label: "Members", icon: Users},
    {href: "/admin", label: "Admin", icon: ShieldCheck},
  ],
};

const roleBadgeConfig = {
  member: {
    label: "Member",
    className: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  advisor: {
    label: "Advisor",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  core_panel: {
    label: "Core Panel",
    className: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  admin: {
    label: "Admin",
    className: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
};

function NavLink({href, label, onClick, mobile = false}) {
  const pathname = usePathname();
  const isActive = pathname === href;

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
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0 transition-colors",
            isActive ? "bg-primary" : "bg-border",
          )}
        />
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
  const authLinks = roleLinks[userRole] ?? [];

  const allLinks = [...publicLinks, ...(isAuthenticated ? authLinks : [])];

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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FlaskConical className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">
                ML/AI Research
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
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
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background" />
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
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
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
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 group-hover/admin:bg-rose-500/20 transition-colors">
                              <ShieldCheck className="h-3.5 w-3.5 text-rose-500" />
                            </div>
                            <span className="text-sm text-rose-600">
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
                      <FlaskConical className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-sm font-bold">ML/AI Research</span>
                      <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                        Lab · Bangladesh
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Nav Links */}
                <div className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
                  {allLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      {...link}
                      mobile
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  ))}
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
                      <div className="grid grid-cols-2 gap-2">
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
                      {userRole === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-1.5 text-rose-600 border-rose-200 hover:bg-rose-500/5 cursor-pointer"
                          >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Admin Panel
                          </Button>
                        </Link>
                      )}
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
