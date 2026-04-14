import {
  getMyRegistrations,
  cancelRegistration,
} from "@/actions/workshop.action";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {format} from "date-fns";
import {
  CalendarDays,
  MapPin,
  Mic,
  ArrowRight,
  PartyPopper,
  Clock,
  BadgeAlert,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

function RegistrationsSkeleton() {
  return (
    <div className="grid gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-[#090A0F] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between gap-8 md:items-center"
        >
          <div className="flex-1 space-y-5">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
            </div>
            <Skeleton className="h-8 w-3/4 max-w-md rounded-md" />
            <div className="flex gap-6">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-32 rounded-md" />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0 md:min-w-40">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg bg-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function RegistrationsList() {
  const {data: registrations = []} = await getMyRegistrations();

  if (registrations.length === 0) {
    return (
      <div className="text-center py-20 border border-white/5 rounded-xl bg-muted/20">
        <p className="text-muted-foreground mb-4">
          You haven't registered for any upcoming workshops yet.
        </p>
        <Button asChild>
          <Link href="/workshops">Browse Workshops</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      {registrations.map((reg) => {
        const isSpeakerAccepted =
          reg.participation_type === "speaker" &&
          reg.speaker_status === "accepted";

        return (
          <div
            key={reg._id}
            className="relative overflow-hidden bg-[#090A0F] border border-white/5 hover:border-white/10 rounded-2xl p-6 shadow-xl transition-all group"
          >
            {isSpeakerAccepted && (
              <div className="absolute inset-0 bg-primary/3 blur-3xl pointer-events-none" />
            )}

            <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-12 items-start md:items-center">
              <div className="flex-1 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="capitalize text-[10px] tracking-wider px-2 py-0.5 bg-muted text-muted-foreground border-white/5"
                  >
                    {reg.participation_type === "speaker" ? (
                      <div className="flex items-center gap-1.5">
                        <Mic className="w-3 h-3" /> Speaker
                      </div>
                    ) : (
                      "Participant"
                    )}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`capitalize text-[10px] tracking-wider px-2 py-0.5 ${
                      reg.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : reg.status === "rejected"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}
                  >
                    {reg.status}
                  </Badge>
                  {reg.participation_type === "speaker" &&
                    reg.speaker_status && (
                      <Badge
                        variant="outline"
                        className={`capitalize text-[10px] tracking-wider px-2 py-0.5 ${
                          isSpeakerAccepted
                            ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.15)]"
                            : reg.speaker_status === "rejected"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}
                      >
                        Talk: {reg.speaker_status}
                      </Badge>
                    )}
                </div>

                <Link
                  href={`/workshops/${reg.workshop_id?.slug}`}
                  className="block group-hover:pl-1 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors line-clamp-2">
                    {reg.workshop_id?.title || "Workshop unavailable"}
                  </h3>
                </Link>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-white/3 border border-white/5">
                      <CalendarDays className="w-4 h-4 text-primary" />
                    </div>
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
                    <div className="p-1.5 rounded-md bg-white/3 border border-white/5">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span>{reg.workshop_id?.venue || "TBD"}</span>
                  </div>
                </div>

                {reg.participation_type === "speaker" &&
                  reg.speaker_details?.presentation_title && (
                    <div className="mt-4 relative">
                      <div className="bg-[#111218] p-4 rounded-xl border border-white/5">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1.5 flex items-center gap-2">
                          Your Proposed Talk
                        </p>
                        <p className="font-semibold text-sm text-foreground/90 leading-relaxed">
                          {reg.speaker_details.presentation_title}
                        </p>
                      </div>

                      {/* Success Message Banner for Speakers */}
                      {isSpeakerAccepted && (
                        <div className="mt-3 bg-primary/3 border border-primary/20 p-3 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-700">
                          <div className="bg-primary/10 p-1.5 rounded-lg shrink-0">
                            <PartyPopper className="w-5 h-5 text-primary" />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                              Congratulations!
                            </h4>
                            <p className="text-xs text-foreground/70">
                              Your talk proposal has been officially selected
                              for this workshop. We look forward to your
                              incredible session!
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col justify-end gap-3 w-full md:w-auto shrink-0 md:min-w-40">
                <Button
                  variant="default"
                  className="w-full text-xs font-bold rounded-lg h-10 group/btn"
                  asChild
                >
                  <Link href={`/workshops/${reg.workshop_id?.slug}`}>
                    Go to Workshop
                    <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                  </Link>
                </Button>

                {reg.status === "pending" && (
                  <form
                    action={async () => {
                      "use server";
                      await cancelRegistration(reg._id);
                    }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full text-xs font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 h-10 rounded-lg"
                    >
                      Cancel Request
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function MyRegistrationsPage() {
  const {user} = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Registrations</h1>
        <p className="text-muted-foreground mt-2">
          Manage your workshop attendances and speaking statuses.
        </p>
      </div>

      <Suspense fallback={<RegistrationsSkeleton />}>
        <RegistrationsList />
      </Suspense>
    </div>
  );
}
