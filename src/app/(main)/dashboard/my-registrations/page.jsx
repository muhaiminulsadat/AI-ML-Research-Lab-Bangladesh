import {
  getMyRegistrations,
  cancelRegistration,
} from "@/actions/workshop.action";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";
import {Calendar, MapPin} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function MyRegistrationsPage() {
  const {user} = await getCurrentUser();
  if (!user) redirect("/login");

  const {data: registrations = []} = await getMyRegistrations();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Registrations</h1>
        <p className="text-muted-foreground mt-2">
          Manage your workshop attendances and speaking statuses.
        </p>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-20 border border-white/5 rounded-xl bg-muted/20">
          <p className="text-muted-foreground mb-4">
            You havent registered for any upcoming workshops yet.
          </p>
          <Button asChild>
            <Link href="/workshops">Browse Workshops</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {registrations.map((reg) => (
            <div
              key={reg._id}
              className="relative overflow-hidden bg-[#090A0F] border border-white/5 rounded-xl p-6 shadow-sm hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {reg.participation_type}
                      </Badge>
                      <Badge
                        className={
                          reg.status === "approved"
                            ? "bg-green-600/20 text-green-500 border-green-600/20"
                            : reg.status === "rejected"
                              ? "bg-red-600/20 text-red-500 border-red-600/20"
                              : "bg-amber-600/20 text-amber-500 border-amber-600/20"
                        }
                      >
                        {reg.status}
                      </Badge>
                      {reg.participation_type === "speaker" &&
                        reg.speaker_status && (
                          <Badge
                            className={
                              reg.speaker_status === "accepted"
                                ? "bg-purple-600/20 text-purple-500 border-purple-600/20"
                                : reg.speaker_status === "rejected"
                                  ? "bg-red-600/20 text-red-500 border-red-600/20"
                                  : "bg-amber-600/20 text-amber-500 border-amber-600/20"
                            }
                          >
                            Speaker: {reg.speaker_status}
                          </Badge>
                        )}
                    </div>
                    <Link
                      href={`/workshops/${reg.workshop_id?.slug}`}
                      className="hover:underline underline-offset-4"
                    >
                      <h3 className="text-xl font-bold text-foreground">
                        {reg.workshop_id?.title || "Workshop unavailable"}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        {reg.workshop_id?.start_date
                          ? format(
                              new Date(reg.workshop_id.start_date),
                              "MMM d, yyyy",
                            )
                          : "TBD"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{reg.workshop_id?.venue || "TBD"}</span>
                    </div>
                  </div>

                  {reg.participation_type === "speaker" &&
                    reg.speaker_details?.presentation_title && (
                      <div className="bg-muted/30 p-3 rounded-lg border border-white/5 space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                          Your Talk
                        </p>
                        <p className="font-medium text-sm text-foreground">
                          {reg.speaker_details.presentation_title}
                        </p>
                      </div>
                    )}
                </div>

                <div className="flex flex-col justify-end gap-3 min-w-[140px]">
                  {reg.status === "pending" && (
                    <form
                      action={async () => {
                        "use server";
                        await cancelRegistration(reg._id);
                      }}
                    >
                      <Button variant="destructive" className="w-full">
                        Cancel Registration
                      </Button>
                    </form>
                  )}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/workshops/${reg.workshop_id?.slug}`}>
                      View Workshop
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
