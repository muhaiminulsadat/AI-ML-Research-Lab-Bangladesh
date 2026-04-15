import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {adminGetAllUsers} from "@/actions/user.action";
import AdminMembersView from "./_components/AdminMembersView";
import MembersClientHeader from "./_components/MembersClientHeader";
import {connection} from "next/server";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Search, Users} from "lucide-react";
import {Input} from "@/components/ui/input";

export const metadata = {
  title: "Admin - Manage Members | ML & AI Lab",
};

async function AdminMembersData() {
  await connection();
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  const memberResult = await adminGetAllUsers();
  const members = memberResult.success ? memberResult.data : [];

  return <AdminMembersView initialMembers={members} />;
}

function MembersSkeleton() {
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
                disabled
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/10 h-12 border-b">
                <tr>
                  <th className="pl-6 font-medium">User</th>
                  <th className="font-medium">Contact / University</th>
                  <th className="w-[180px] text-right font-medium">Role</th>
                  <th className="w-[80px] pr-6 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({length: 5}).map((_, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <Skeleton className="h-4 w-24 rounded-md" />
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40 rounded-md" />
                        <Skeleton className="h-3 w-32 rounded-md" />
                      </div>
                    </td>
                    <td className="w-[180px] text-right py-4">
                      <Skeleton className="h-9 w-32 ml-auto rounded-md" />
                    </td>
                    <td className="w-[80px] pr-6 text-right py-4">
                      <Skeleton className="h-8 w-8 ml-auto rounded-md" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminMembersPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-6">
      <MembersClientHeader />
      <Suspense fallback={<MembersSkeleton />}>
        <AdminMembersData />
      </Suspense>
    </div>
  );
}
