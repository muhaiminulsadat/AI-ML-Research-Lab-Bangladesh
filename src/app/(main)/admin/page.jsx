import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import AdminView from "./_components/AdminView";
import {getApplications} from "@/actions/application.action";

export default async function AdminPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  const applications = await getApplications();

  return <AdminView applications={applications} />;
}
