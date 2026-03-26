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
  // {href: "/about", label: "About"},
  {href: "/members", label: "Members"},
];

const roleLinks = {
  student: [{href: "/dashboard", label: "Dashboard"}],
  researcher: [
    {href: "/dashboard", label: "Dashboard"},
    {href: "/research", label: "Research"},
  ],
  admin: [
    {href: "/dashboard", label: "Dashboard"},
    {href: "/research", label: "Research"},
    {href: "/admin", label: "Admin"},
  ],
};

const roleBadgeColor = {
  student: "bg-blue-500/10 text-blue-600 border-blue-200",
  researcher: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  admin: "bg-rose-500/10 text-rose-600 border-rose-200",
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
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
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
        "relative text-sm font-medium transition-colors duration-200",
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

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {user} = useGetCurrentUser();
  const {logout} = useLogOut();

  const isAuthenticated = !!user;
  const userRole = user?.role ?? "student";
  const allLinks = [
    ...publicLinks,
    ...(isAuthenticated ? (roleLinks[userRole] ?? []) : []),
  ];

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
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

          {/* Desktop Nav Links */}
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
                    className="hidden md:flex items-center gap-2 h-9 px-2 rounded-full"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback className="text-xs font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium max-w-[120px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "w-fit text-[10px] px-2 py-0 capitalize",
                          roleBadgeColor[userRole],
                        )}
                      >
                        {userRole}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserCircle className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 flex flex-col p-0">
                {/* Sheet Header */}
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
                          <AvatarImage src={user?.image} />
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
                            roleBadgeColor[userRole],
                          )}
                        >
                          {userRole}
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
                            className="w-full gap-1.5"
                          >
                            <UserCircle className="h-3.5 w-3.5" />
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
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
                        <Button variant="outline" className="w-full" size="sm">
                          Log in
                        </Button>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="w-full" size="sm">
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
