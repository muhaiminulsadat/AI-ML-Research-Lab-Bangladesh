import {getAllRegistrations} from "@/actions/workshop.action";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import ParticipantsTabs from "./_components/ParticipantsTabs";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/db";
import {Workshop} from "@/models/workshop.model";

export default async function WorkshopParticipantsPage({params}) {
  const resolvedParams = await params;
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  await connectDB();
  const workshop = await Workshop.findById(resolvedParams.id)
    .select("title slug")
    .lean();
  if (!workshop) redirect("/admin/workshops");

  const {data: registrations = []} = await getAllRegistrations(
    resolvedParams.id,
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-start sm:items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="shrink-0 mt-1 sm:mt-0"
        >
          <Link href="/admin/workshops">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Workshop Registrations
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base line-clamp-2">
            Manage participants and speakers for &quot;{workshop.title}&quot;
          </p>
        </div>
      </div>

      <ParticipantsTabs registrations={registrations || []} />
    </div>
  );
}
