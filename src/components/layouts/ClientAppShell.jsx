"use client";

import {useState, useEffect} from "react";
import {usePathname} from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppSidebar from "./AppSidebar";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import {useGetCurrentUser} from "@/hooks/useAuth";
import {cn} from "@/lib/utils";

export default function ClientAppShell({children, workshopSlug}) {
  const pathname = usePathname();
  const {user, isPending} = useGetCurrentUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) {
      setTimeout(() => setIsCollapsed(JSON.parse(saved)), 0);
    }
  }, []);

  const toggleCollapse = () => {
    const newVal = !isCollapsed;
    setIsCollapsed(newVal);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newVal));
  };

  // Decide what routes are part of the "App" (which gets the Sidebar instead of top Navbar)
  const appRoutes = [
    "/dashboard",
    "/admin",
    "/courses",
    "/members",
    "/profile",
    "/research",
  ];
  const isAppRoute = appRoutes.some((r) => pathname.startsWith(r));

  if (isAppRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <AnnouncementBanner workshopSlug={workshopSlug} />
        <div className="flex flex-1">
          <AppSidebar
            user={user}
            isCollapsed={isCollapsed}
            onToggleCollapse={toggleCollapse}
          />

          {/* Main Content Area */}
          <main
            className={cn(
              "flex-1 flex flex-col min-w-0 transition-all duration-300",
              isCollapsed ? "lg:pl-20" : "lg:pl-64",
            )}
          >
            {/* Mobile Top Header (only visible on mobile if they need to see something) */}
            <div className="lg:hidden flex border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur z-40 w-full">
              <Navbar isMobileOnly={true} />
            </div>
            {/* The Actual Page Content */}
            <div className="flex-1 flex flex-col">{children}</div>
          </main>
        </div>
      </div>
    );
  }

  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

  // Public/Marketing Layout
  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthRoute && <AnnouncementBanner workshopSlug={workshopSlug} />}
      <Navbar />
      <main className="flex-1 container mx-auto flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
