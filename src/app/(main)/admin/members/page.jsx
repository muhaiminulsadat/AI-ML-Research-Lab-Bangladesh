import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {adminGetAllUsers} from "@/actions/user.action";
import AdminMembersView from "./_components/AdminMembersView";

export const metadata = {
  title: "Admin - Manage Members | ML & AI Lab",
};

export default async function AdminMembersPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  const memberResult = await adminGetAllUsers();
  const members = 
    memberResult.success 
      ? memberResult.data 
      : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <AdminMembersView initialMembers={members} />
    </div>
  );
}
