import {
  getWorkshopBySlug,
  checkAlreadyRegistered,
} from "@/actions/workshop.action";
import {Badge} from "@/components/ui/badge";
import {getCurrentUser} from "@/lib/auth";
import {format} from "date-fns";
import {Calendar, MapPin, Users, Info} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "./_components/RegistrationForm";
import {notFound} from "next/navigation";

export default async function WorkshopDetailPage({params}) {
  const resolvedParams = await params;
  const {data: workshop} = await getWorkshopBySlug(resolvedParams.slug);

  if (!workshop) {
    return notFound();
  }

  const {user} = await getCurrentUser();
  let isRegistered = false;

  if (user) {
    const check = await checkAlreadyRegistered(workshop._id, user.email);
    isRegistered = check.registered;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {workshop.banner_image && (
        <div className="w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden border border-white/5 shadow-lg relative bg-[#090A0F]">
          <Image
            src={workshop.banner_image}
            alt={workshop.title}
            fill
            className="object-cover opacity-80"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="capitalize text-primary border-primary/50"
              >
                {workshop.status}
              </Badge>
              {workshop.registration_open ? (
                <Badge className="bg-green-600/20 text-green-500 border-green-600/20">
                  Registration Open
                </Badge>
              ) : (
                <Badge
                  variant="destructive"
                  className="bg-red-600/20 text-red-500 border-red-600/20"
                >
                  Registration Closed
                </Badge>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
              {workshop.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {workshop.description}
            </p>
          </div>

          <div className="bg-[#090A0F] border border-white/5 p-6 rounded-xl space-y-4">
            <h3 className="font-semibold text-base border-b border-white/5 pb-2 mb-4">
              Key Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="text-primary w-4 h-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {workshop.venue}
                  </p>
                  <p className="text-xs">{workshop.university}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="text-primary w-4 h-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {workshop.start_date
                      ? format(new Date(workshop.start_date), "MMM d, yyyy")
                      : "Date TBD"}
                  </p>
                  {workshop.end_date && (
                    <p className="text-xs">
                      To {format(new Date(workshop.end_date), "MMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>
              {workshop.seats_total && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="text-primary w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Capacity
                    </p>
                    <p className="text-xs">
                      {workshop.seats_total - (workshop.seats_filled || 0)}{" "}
                      seats remaining of {workshop.seats_total}
                    </p>
                  </div>
                </div>
              )}
              {workshop.registration_deadline && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Info className="text-primary w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Deadline
                    </p>
                    <p className="text-xs">
                      Register by{" "}
                      {format(
                        new Date(workshop.registration_deadline),
                        "MMM d, yyyy",
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#090A0F] border border-white/5 rounded-xl p-6 shadow-sm sticky top-24">
            {isRegistered ? (
              <div className="text-center py-6">
                <div className="bg-green-500/10 text-green-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                  <Users className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                  You are already registered
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  We look forward to seeing you at the workshop. Check{" "}
                  <Link
                    href="/dashboard/my-registrations"
                    className="text-primary hover:underline font-medium"
                  >
                    My Registrations
                  </Link>{" "}
                  for more details.
                </p>
              </div>
            ) : !workshop.registration_open ? (
              <div className="text-center py-6">
                <div className="bg-red-500/10 text-red-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                  <Info className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                  Registration Closed
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  We are no longer accepting registrations for this event.
                </p>
              </div>
            ) : workshop.seats_total &&
              workshop.seats_filled >= workshop.seats_total ? (
              <div className="text-center py-6">
                <div className="bg-amber-500/10 text-amber-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                  <Users className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                  Workshop is Full
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  This workshop has reached its maximum capacity.
                </p>
              </div>
            ) : (
              <RegistrationForm workshop={workshop} user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
