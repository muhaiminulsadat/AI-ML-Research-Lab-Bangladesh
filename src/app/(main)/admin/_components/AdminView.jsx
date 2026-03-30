"use client";

import {useState} from "react";
import {
  approveApplication,
  rejectApplication,
} from "@/actions/application.action";
import {toast} from "sonner";
import {useConfirm} from "@/hooks/useConfirm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Mail,
  GraduationCap,
  Users,
  FileText,
  Video,
} from "lucide-react";

export default function AdminView({applications, stats}) {
  const [list, setList] = useState(applications);
  const [loadingId, setLoadingId] = useState(null);
  const {confirm, ConfirmationDialog} = useConfirm();

  const handleApprove = async (id) => {
    setLoadingId(id);
    try {
      const result = await approveApplication(id);
      if (result.success) {
        toast.success(result.message, {duration: 10000});
        setList((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    setLoadingId(id);
    try {
      const result = await rejectApplication(id);
      if (result.success) {
        toast.success(result.message);
        setList((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const pending = list.filter((a) => a.status === "pending");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-10">
      <ConfirmationDialog />

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
            <Video className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.coursesCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Active educational modules</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Research Papers</CardTitle>
            <FileText className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.publicationsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Platform publications</p>
          </CardContent>
        </Card>
      </section>

      {/* Applications Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">
            Pending Applications
          </h2>
          <Badge variant="secondary" className="px-3 py-1 text-sm bg-muted/60">
            {pending.length} pending
          </Badge>
        </div>

        {pending.length === 0 ? (
          <Card className="border-dashed bg-muted/10">
            <CardContent className="py-16 text-center text-muted-foreground">
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-muted-foreground/60" />
              </div>
              <p className="font-medium text-foreground/80">You're all caught up!</p>
              <p className="text-sm">No pending applications at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pending.map((app) => (
              <Card key={app._id} className="flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all">
                <CardHeader className="bg-muted/30 border-b pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <CardTitle className="text-lg truncate">
                        {app.applicantName}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1.5 mt-1.5">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{app.email}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize shrink-0 border-primary/30 text-primary">
                      {app.applyingAs}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 py-4 space-y-4">
                  <div className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <GraduationCap className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span className="line-clamp-2">{app.university}</span>
                  </div>
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-md">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                      Motivation
                    </span>
                    <p className="text-sm line-clamp-4 leading-relaxed text-foreground/90">
                      "{app.motivation}"
                    </p>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 mt-auto flex gap-3">
                  <Button
                    variant="default"
                    className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-sm"
                    onClick={() => handleApprove(app._id)}
                    disabled={loadingId === app._id}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 gap-2 cursor-pointer shadow-sm"
                    onClick={() => handleReject(app._id)}
                    disabled={loadingId === app._id}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
