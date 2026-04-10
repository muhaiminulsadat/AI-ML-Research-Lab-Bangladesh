import {getWorkshops, deleteWorkshop} from "@/actions/workshop.action";
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

export default async function AdminWorkshopsPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  const {data: workshops = []} = await getWorkshops();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Workshops
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, edit, and monitor your workshops and attendees.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/workshops/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Workshop
          </Link>
        </Button>
      </div>

      <div className="bg-[#090A0F] border border-white/5 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 bg-muted/50 hover:bg-muted/50">
              <TableHead>Workshop Title</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                <TableRow key={workshop._id} className="border-white/5">
                  <TableCell className="font-medium">
                    {workshop.title}
                  </TableCell>
                  <TableCell>
                    {workshop.start_date
                      ? format(new Date(workshop.start_date), "MMM d, yyyy")
                      : "TBD"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {workshop.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        workshop.registration_open ? "default" : "secondary"
                      }
                      className={
                        workshop.registration_open
                          ? "bg-green-600/20 text-green-500 hover:bg-green-600/30"
                          : ""
                      }
                    >
                      {workshop.registration_open ? "Open" : "Closed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {workshop.seats_filled || 0} / {workshop.seats_total || "∞"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="View/Edit Participants"
                        asChild
                      >
                        <Link
                          href={`/admin/workshops/${workshop._id}/participants`}
                        >
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="sr-only">Participants</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Edit Workshop"
                        asChild
                      >
                        <Link href={`/admin/workshops/${workshop._id}/edit`}>
                          <Edit className="w-4 h-4 text-amber-400" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="View Public Page"
                        asChild
                      >
                        <Link
                          href={`/workshops/${workshop.slug}`}
                          target="_blank"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
