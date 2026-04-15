"use client";

import {useState} from "react";
import {Search, Users, ShieldCheck} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {toast} from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {changeRole} from "@/actions/user.action";
import DeleteMemberDialog from "./DeleteMemberDialog";

const ROLES = [
  {value: "member", label: "Member"},
  {value: "advisor", label: "Advisor"},
  {value: "core_panel", label: "Core Panel"},
  {value: "admin", label: "Admin"},
];

export default function AdminMembersView({initialMembers}) {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    try {
      const res = await changeRole(userId, newRole);
      if (res.success) {
        toast.success(res.message);
        setMembers((prev) =>
          prev.map((m) => (m._id === userId ? {...m, role: newRole} : m)),
        );
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An error occurred while updating the role.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteSuccess = (userId) => {
    setMembers((prev) => prev.filter((m) => m._id !== userId));
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.university?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="py-4 px-6 border-b border-border/40 bg-muted/20">
          <div className="flex items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or university..."
                className="pl-9 h-9 border-border/60 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">No members found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                We couldn&apos;t find any members matching your search.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow>
                    <TableHead className="pl-6 h-12">User</TableHead>
                    <TableHead>Contact / University</TableHead>
                    <TableHead className="w-[180px] text-right">Role</TableHead>
                    <TableHead className="w-[80px] pr-6 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => {
                    const initials = member?.name
                      ? member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "?";

                    return (
                      <TableRow key={member._id} className="hover:bg-muted/30">
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-border/50">
                              <AvatarImage src={member.profileImage} />
                              <AvatarFallback className="text-xs bg-muted">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-sm">
                              {member.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground">
                              {member.email}
                            </span>
                            <span className="text-xs font-medium">
                              {member.university || "—"}
                            </span>
                            {member.department && (
                              <span className="text-[10px] text-muted-foreground">
                                {member.department}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="pr-6 py-4 text-right">
                          <Select
                            disabled={updatingId === member._id}
                            value={member.role || "member"}
                            onValueChange={(val) =>
                              handleRoleChange(member._id, val)
                            }
                          >
                            <SelectTrigger className="w-[160px] h-8 ml-auto text-xs font-medium cursor-pointer hover:bg-muted/50 transition-colors">
                              <SelectValue placeholder="Assign Role" />
                            </SelectTrigger>
                            <SelectContent align="end">
                              {ROLES.map((role) => (
                                <SelectItem
                                  key={role.value}
                                  value={role.value}
                                  className="text-xs cursor-pointer"
                                >
                                  {role.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="pr-6 py-4 text-right">
                          <DeleteMemberDialog
                            member={member}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
