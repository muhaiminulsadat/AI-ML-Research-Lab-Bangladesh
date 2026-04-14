import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Users, Video, FileText, UserPlus, ArrowRight} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";

export default function AdminSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to the control center for your ML & AI Research Lab.
        </p>
      </div>

      {/* Stats Overview Skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-primary/5 border-primary/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total registered
            </CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-16 mb-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Users across the platform
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Published Courses
            </CardTitle>
            <Video className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-16 mb-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Active educational modules
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Research Papers
            </CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-16 mb-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Platform publications
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Workshops</CardTitle>
            <Users className="w-4 h-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full mt-2"
              size="sm"
              disabled
            >
              Manage Workshops
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Recent Registrations Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-md border-muted/60">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/10 pb-4">
            <div className="space-y-0.5">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-primary" />
                Recent Registrations
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Oversight of new lab members
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              disabled
            >
              View All
              <ArrowRight className="w-3 h-3" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-40" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Skeleton */}
        <div className="space-y-6">
          <Card className="shadow-sm border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
