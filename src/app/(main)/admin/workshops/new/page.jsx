import WorkshopForm from "../_components/WorkshopForm";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function NewWorkshopPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  return <WorkshopForm isEdit={false} />;
}
