import {Suspense} from "react";
import {getWorkshops} from "@/actions/workshop.action";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Calendar, MapPin, Users} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {format} from "date-fns";
import WorkshopsSkeleton from "./_components/WorkshopsSkeleton";

async function WorkshopsList({currentTab}) {
  const {data: workshops = []} = await getWorkshops(currentTab);

  if (workshops.length === 0) {
    return (
      <div className="text-center py-20 border border-white/5 rounded-xl bg-[#090A0F]/50">
        <p className="text-muted-foreground">
          No {currentTab} workshops found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workshops.map((workshop) => (
        <Card
          key={workshop._id}
          className="flex flex-col border-white/5 bg-[#090A0F] overflow-hidden"
        >
          {workshop.banner_image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={workshop.banner_image}
                alt={workshop.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
              <Badge variant="outline" className="capitalize">
                {workshop.status}
              </Badge>
              {workshop.registration_open && (
                <Badge className="bg-green-600/20 text-green-500 hover:bg-green-600/30 border-green-600/20">
                  Registration Open
                </Badge>
              )}
            </div>
            <CardTitle className="line-clamp-2">{workshop.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="line-clamp-1">
                {workshop.venue}, {workshop.university}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {workshop.start_date
                  ? format(new Date(workshop.start_date), "MMM d, yyyy")
                  : "TBD"}
                {workshop.end_date &&
                  ` - ${format(new Date(workshop.end_date), "MMM d, yyyy")}`}
              </span>
            </div>
            {workshop.seats_total && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>
                  {workshop.seats_total - (workshop.seats_filled || 0)} seats
                  remaining
                </span>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-4 border-t border-white/5 mt-auto">
            <Button className="w-full" asChild>
              <Link href={`/workshops/${workshop.slug}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default async function WorkshopsPage({searchParams}) {
  const params = await searchParams;
  const currentTab = params?.tab === "past" ? "past" : "upcoming";

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Workshops
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Attend and present your research at our exclusive events.
          </p>
        </div>
        <div className="flex gap-2 p-1 rounded-lg">
          <Button
            variant={currentTab === "upcoming" ? "default" : "outline"}
            className="rounded-xl border-white/5"
            asChild
          >
            <Link href="/workshops?tab=upcoming">Upcoming</Link>
          </Button>
          <Button
            variant={currentTab === "past" ? "default" : "outline"}
            className="rounded-xl border-white/5"
            asChild
          >
            <Link href="/workshops?tab=past">Past</Link>
          </Button>
        </div>
      </div>

      <Suspense fallback={<WorkshopsSkeleton />} key={currentTab}>
        <WorkshopsList currentTab={currentTab} />
      </Suspense>
    </div>
  );
}
