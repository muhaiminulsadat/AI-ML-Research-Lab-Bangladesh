"use client";
import {useState} from "react";
import Link from "next/link";
import {Menu, X} from "lucide-react"; // install lucide-react if not present: npm install lucide-react
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
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

export default function Navbar() {
  // Simulate authentication and role – replace with real auth later
  const [isAuthenticated, setIsAuthenticated] = useState(true); // false = logged out
  const [userRole, setUserRole] = useState("researcher"); // 'student', 'researcher', 'admin'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Dr. Ahmed Raza",
    email: "ahmed@researchlab.com",
    image: "",
    role: userRole,
  };

  // Navigation links (public)
  const publicLinks = [
    {href: "/", label: "Home"},
    {href: "/about", label: "About"},
  ];

  // Role‑based links
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

  const allLinks = [
    ...publicLinks,
    ...(isAuthenticated ? roleLinks[userRole] || [] : []),
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Simulate redirect or just close menu
    setMobileMenuOpen(false);
  };

  // Get user initials for avatar fallback
  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Toggle user role for demo (remove in production)
  const toggleRole = () => {
    const roles = ["student", "researcher", "admin"];
    const next = roles[(roles.indexOf(userRole) + 1) % roles.length];
    setUserRole(next);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b max-w-7xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">ML/AI Research Lab</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: User menu / Auth buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.name} <br />
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                  <span className="block text-xs font-normal text-muted-foreground mt-1">
                    Role: {user.role}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => console.log("Profile clicked")}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
                {/* Demo toggle – remove in production */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleRole}>
                  Switch Role (demo)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex md:space-x-2">
              <Button
                variant="outline"
                onClick={() => console.log("Login clicked")}
              >
                Login
              </Button>
              <Button onClick={() => console.log("Sign Up clicked")}>
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {allLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        console.log("Login clicked");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        console.log("Sign Up clicked");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
