"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  Video,
  UserPlus,
  ArrowRight,
  Clock,
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

export default function AdminView({stats, recentUsers = []}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to the control center for your AI/ML Research Lab.
        </p>
      </div>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total registered</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.usersCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Users across the platform</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
            <Video className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.coursesCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Active educational modules</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Research Papers</CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.publicationsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Platform publications</p>
          </CardContent>
        </Card>
      </section>

      {/* Recent Registrations & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="shadow-md border-muted/60">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/10 pb-4">
               <div className="space-y-0.5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-primary" />
                    Recent Registrations
                  </CardTitle>
                  <CardDescription>Oversight of new lab members</CardDescription>
               </div>
               <Link href="/admin/members">
                  <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs cursor-pointer group">
                     View All
                     <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
               </Link>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y">
                  {recentUsers.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground text-sm">
                      No new members yet.
                    </div>
                  ) : (
                    recentUsers.map((u) => {
                      const initials = u.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                      return (
                        <div key={u._id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                           <div className="flex items-center gap-3 min-w-0">
                              <Avatar className="h-9 w-9 border border-border/50">
                                 <AvatarImage src={u.profileImage} />
                                 <AvatarFallback className="text-xs font-bold">{initials}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                 <p className="text-sm font-semibold truncate">{u.name}</p>
                                 <p className="text-[11px] text-muted-foreground truncate">{u.email}</p>
                              </div>
                           </div>
                           <div className="flex flex-col items-end gap-1 shrink-0">
                              <Badge variant="outline" className="text-[10px] capitalize font-bold leading-none h-5">
                                 {u.role || "member"}
                              </Badge>
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                 <Clock className="w-2.5 h-2.5" />
                                 <span>{new Date(u.createdAt).toLocaleDateString()}</span>
                              </div>
                           </div>
                        </div>
                      )
                    })
                  )}
               </div>
            </CardContent>
         </Card>

         {/* Admin Quick Actions */}
         <div className="space-y-6">
            <h3 className="text-lg font-bold tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link href="/admin/members" className="group">
                  <div className="p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer space-y-2">
                     <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Users className="w-5 h-5" />
                     </div>
                     <p className="font-semibold text-sm">Manage Member Roles</p>
                     <p className="text-xs text-muted-foreground">Assign advisors and core panel members.</p>
                  </div>
               </Link>
               <Link href="/courses/create" className="group">
                  <div className="p-4 rounded-xl border border-border/60 bg-card hover:border-success/30/40 hover:shadow-lg transition-all cursor-pointer space-y-2">
                     <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                        <Video className="w-5 h-5" />
                     </div>
                     <p className="font-semibold text-sm">Add New Course</p>
                     <p className="text-xs text-muted-foreground">Expand the lab&apos;s educational content.</p>
                  </div>
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
