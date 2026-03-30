"use client";

import {useState} from "react";
import {
  approveApplication,
  rejectApplication,
} from "@/actions/application.action";
import {revokeMember, changeRole} from "@/actions/user.action";
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
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreVertical,
  CheckCircle,
  XCircle,
  ShieldAlert,
  UserX,
  Mail,
  GraduationCap,
  Shield,
} from "lucide-react";

export default function AdminView({applications, members}) {
  const [list, setList] = useState(applications);
  const [memberList, setMemberList] = useState(members);
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

  const executeRevoke = async (id) => {
    setLoadingId(id);
    try {
      const result = await revokeMember(id);
      if (result.success) {
        toast.success(result.message);
        setMemberList((prev) => prev.filter((m) => m._id !== id));
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRevoke = (id, name) => {
    confirm({
      title: "Revoke Membership",
      description: `Are you sure you want to revoke ${name}'s membership? This action will restrict their access.`,
      confirmText: "Revoke",
      cancelText: "Cancel",
      onConfirm: () => executeRevoke(id),
    });
  };

  const executeRoleChange = async (id, role) => {
    setLoadingId(id);
    try {
      const result = await changeRole(id, role);
      if (result.success) {
        toast.success(result.message);
        setMemberList((prev) =>
          prev.map((m) => (m._id === id ? {...m, role} : m)),
        );
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRoleChange = (id, role, currentRole) => {
    if (role === currentRole) return;

    if (role === "admin") {
      confirm({
        title: "Promote to Admin",
        description:
          "Are you sure you want to promote this user to Admin? They will have full administrative privileges.",
        confirmText: "Promote",
        cancelText: "Cancel",
        onConfirm: () => executeRoleChange(id, role),
      });
    } else {
      executeRoleChange(id, role);
    }
  };

  const pending = list.filter((a) => a.status === "pending");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-12">
      <ConfirmationDialog />

      {/* Applications Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Pending Applications
          </h2>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {pending.length} pending
          </Badge>
        </div>

        {pending.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              No pending applications at the moment.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pending.map((app) => (
              <Card key={app._id} className="flex flex-col overflow-hidden">
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
                    <Badge variant="outline" className="capitalize shrink-0">
                      {app.applyingAs}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 py-4 space-y-4">
                  <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{app.university}</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Motivation
                    </span>
                    <p className="text-sm line-clamp-4 leading-relaxed">
                      {app.motivation}
                    </p>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 mt-auto flex gap-3">
                  <Button
                    variant="default"
                    className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                    onClick={() => handleApprove(app._id)}
                    disabled={loadingId === app._id}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 gap-2 cursor-pointer"
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

      {/* Members Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Approved Members
          </h2>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {memberList.length} members
          </Badge>
        </div>

        {memberList.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              No approved members yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {memberList.map((member) => (
              <Card key={member._id} className="flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-10 w-10 border shrink-0">
                        <AvatarImage src={member.profileImage} />
                        <AvatarFallback>
                          {member.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <CardTitle className="text-base truncate">
                          {member.name}
                        </CardTitle>
                        <CardDescription className="truncate">
                          {member.email}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 cursor-pointer"
                          disabled={loadingId === member._id}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                          onClick={() => handleRevoke(member._id, member.name)}
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Revoke Membership
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Uni
                      </span>
                      <span
                        className="font-medium truncate max-w-[140px] text-right"
                        title={member.university}
                      >
                        {member.university}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        Type
                      </span>
                      <Badge variant="secondary" className="capitalize">
                        {member.memberType || "—"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-4 border-t mt-1">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Role
                      </span>
                      <Select
                        defaultValue={member.role}
                        onValueChange={(val) =>
                          handleRoleChange(member._id, val, member.role)
                        }
                        disabled={loadingId === member._id}
                      >
                        <SelectTrigger className="h-8 w-[110px] text-xs font-medium cursor-pointer">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="general"
                            className="cursor-pointer"
                          >
                            General
                          </SelectItem>
                          <SelectItem value="member" className="cursor-pointer">
                            Member
                          </SelectItem>
                          <SelectItem value="admin" className="cursor-pointer">
                            Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
