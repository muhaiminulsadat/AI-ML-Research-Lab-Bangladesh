import {Suspense} from "react";
import {getWorkshops} from "@/actions/workshop.action";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {format} from "date-fns";
import {Edit, Eye, Plus, Users} from "lucide-react";
import DeleteWorkshopDialog from "./_components/DeleteWorkshopDialog";
import AdminWorkshopsSkeleton from "./_components/AdminWorkshopsSkeleton";

async function AdminWorkshopsFetcher() {
  const {data: workshops = []} = await getWorkshops();

  return (
    <div className="bg-[#090A0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-[300px] h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
              Workshop Title
            </TableHead>
            <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
              Dates
            </TableHead>
            <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
              Status
            </TableHead>
            <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
              Registration
            </TableHead>
            <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
              Seats
            </TableHead>
            <TableHead className="text-right pr-6 h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workshops.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No workshops created yet.
              </TableCell>
            </TableRow>
          ) : (
            workshops.map((workshop) => (
              <TableRow
                key={workshop._id}
                className="border-white/5 hover:bg-white/[0.02] transition-colors group"
              >
                <TableCell className="font-semibold text-foreground py-4">
                  <span className="line-clamp-1">{workshop.title}</span>
                </TableCell>
                <TableCell className="py-4 text-center text-sm text-muted-foreground whitespace-nowrap">
                  {workshop.start_date
                    ? format(new Date(workshop.start_date), "MMM d, yyyy")
                    : "TBD"}
                </TableCell>
                <TableCell className="py-4 text-center">
                  <Badge
                    variant="outline"
                    className={`capitalize px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
                      workshop.status === "upcoming"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : workshop.status === "past"
                          ? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                          : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    {workshop.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <Badge
                    variant="outline"
                    className={`capitalize px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
                      workshop.registration_open
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    }`}
                  >
                    {workshop.registration_open ? "Open" : "Closed"}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-center font-mono text-xs text-muted-foreground">
                  <span className="text-foreground font-semibold">
                    {workshop.seats_filled || 0}
                  </span>{" "}
                  / {workshop.seats_total || "∞"}
                </TableCell>
                <TableCell className="text-right pr-4 py-4">
                  <div className="flex justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View/Edit Participants"
                      asChild
                      className="h-8 w-8 rounded-full hover:bg-blue-500/10 hover:text-blue-400 cursor-pointer"
                    >
                      <Link
                        href={`/admin/workshops/${workshop._id}/participants`}
                      >
                        <Users className="w-4 h-4" />
                        <span className="sr-only">Participants</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Edit Workshop"
                      asChild
                      className="h-8 w-8 rounded-full hover:bg-amber-500/10 hover:text-amber-400 cursor-pointer"
                    >
                      <Link href={`/admin/workshops/${workshop._id}/edit`}>
                        <Edit className="w-4 h-4 text-amber-500/70" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View Public Page"
                      asChild
                      className="h-8 w-8 rounded-full hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      <Link
                        href={`/workshops/${workshop.slug}`}
                        target="_blank"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <DeleteWorkshopDialog
                      workshopId={workshop._id}
                      workshopTitle={workshop.title}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default async function AdminWorkshopsPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Manage Workshops
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Create, edit, and monitor your workshops and attendees.
          </p>
        </div>
        <Button asChild className="w-full md:w-auto">
          <Link href="/admin/workshops/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Workshop
          </Link>
        </Button>
      </div>

      <Suspense fallback={<AdminWorkshopsSkeleton />}>
        <AdminWorkshopsFetcher />
      </Suspense>
    </div>
  );
}
