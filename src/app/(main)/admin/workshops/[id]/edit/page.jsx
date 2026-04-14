import WorkshopForm from "../../_components/WorkshopForm";
import {getCurrentUser} from "@/lib/auth";
import {getWorkshopBySlug} from "@/actions/workshop.action";
import {redirect, notFound} from "next/navigation";
import connectDB from "@/lib/db";
import {Workshop} from "@/models/workshop.model";
import {convertToObject} from "@/lib/utility";
import {Suspense} from "react";
import WorkshopFormSkeleton from "../../_components/WorkshopFormSkeleton";

async function WorkshopEditFetcher({id}) {
  await connectDB();
  const workshopRaw = await Workshop.findById(id).lean();

  if (!workshopRaw) notFound();

  return (
    <WorkshopForm isEdit={true} initialData={convertToObject(workshopRaw)} />
  );
}

export default async function EditWorkshopPage({params}) {
  const resolvedParams = await params;
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  return (
    <Suspense fallback={<WorkshopFormSkeleton />}>
      <WorkshopEditFetcher id={resolvedParams.id} />
    </Suspense>
  );
}
