"use client";

import {useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  updateRegistrationStatus,
  updateSpeakerStatus,
} from "@/actions/workshop.action";
import {format} from "date-fns";
import {toast} from "sonner";
import {
  Check,
  X,
  FileText,
  ExternalLink,
  MoreVertical,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";

export default function ParticipantsTabs({registrations}) {
  const [tab, setTab] = useState("all");
  const router = useRouter();
  const {confirm, ConfirmationDialog} = useConfirm();

  const participants = registrations.filter(
    (r) => r.participation_type === "participant",
  );
  const speakers = registrations.filter(
    (r) => r.participation_type === "speaker",
  );

  const handleUpdateStatus = async (id, status, type = "registration") => {
    try {
      const res =
        type === "registration"
          ? await updateRegistrationStatus(id, status)
          : await updateSpeakerStatus(id, status);

      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const confirmAction = (id, status, type = "registration") => {
    if (status === "rejected") {
      const actionName =
        type === "registration"
          ? "reject this registration"
          : "reject this talk";
      confirm({
        title: "Confirm Rejection",
        description: `Are you sure you want to ${actionName}? This action can be undone later by re-approving, but it will notify the user.`,
        confirmText: "Reject",
        onConfirm: () => handleUpdateStatus(id, status, type),
      });
    } else {
      handleUpdateStatus(id, status, type);
    }
  };

  const downloadCSV = () => {
    const activeData =
      tab === "all"
        ? registrations
        : tab === "participants"
          ? participants
          : speakers;
    const headers =
      tab === "all"
        ? "Name,Email,Participation Type,Institution,Status,Submitted At\n"
        : tab === "participants"
          ? "Name,Email,Institution,Designation,Phone,Status,Submitted At\n"
          : "Name,Email,Institution,Title,Type,Status,Speaker Status,Submitted At\n";

    const rows = activeData
      .map((r) => {
        if (tab === "all") {
          return `"${r.name}","${r.email}","${r.participation_type}","${r.institution}","${r.status}","${format(new Date(r.createdAt), "yyyy-MM-dd")}"`;
        } else if (tab === "participants") {
          return `"${r.name}","${r.email}","${r.institution}","${r.designation || ""}","${r.phone || ""}","${r.status}","${format(new Date(r.createdAt), "yyyy-MM-dd")}"`;
        } else {
          return `"${r.name}","${r.email}","${r.institution}","${r.speaker_details?.presentation_title || ""}","${r.speaker_details?.presentation_type || ""}","${r.status}","${r.speaker_status || "pending"}","${format(new Date(r.createdAt), "yyyy-MM-dd")}"`;
        }
      })
      .join("\n");

    const blob = new Blob([headers + rows], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `workshop_${tab}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-2 bg-muted p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
          <Button
            variant={tab === "all" ? "default" : "ghost"}
            onClick={() => setTab("all")}
            className="flex-1 sm:flex-none whitespace-nowrap"
          >
            All ({registrations.length})
          </Button>
          <Button
            variant={tab === "participants" ? "default" : "ghost"}
            onClick={() => setTab("participants")}
            className="flex-1 sm:flex-none whitespace-nowrap"
          >
            Participants ({participants.length})
          </Button>
          <Button
            variant={tab === "speakers" ? "default" : "ghost"}
            onClick={() => setTab("speakers")}
            className="flex-1 sm:flex-none whitespace-nowrap"
          >
            Speakers ({speakers.length})
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={downloadCSV}
          className="w-full sm:w-auto"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="bg-[#090A0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {tab === "all" && (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 bg-muted/30 hover:bg-muted/30">
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground w-[220px]">
                  User Details
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
                  Role
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
                  Institution
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
                  Submitted
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
                  Status
                </TableHead>
                <TableHead className="text-right h-12 uppercase text-[10px] tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No registrations found.
                  </TableCell>
                </TableRow>
              ) : (
                registrations.map((p) => (
                  <TableRow
                    key={p._id}
                    className="border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <TableCell className="py-4">
                      <div className="font-semibold text-foreground">
                        {p.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {p.email}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="secondary"
                        className={`px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                          p.participation_type === "speaker"
                            ? "bg-primary/20 text-primary border-primary/20"
                            : "bg-muted text-muted-foreground border-white/5"
                        }`}
                      >
                        {p.participation_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm font-medium text-foreground line-clamp-1">
                        {p.institution}
                      </div>
                      {p.designation && (
                        <div className="text-xs text-muted-foreground/80 mt-0.5 line-clamp-1">
                          {p.designation}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-4 text-sm text-muted-foreground">
                      {format(new Date(p.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Badge
                          variant="outline"
                          className={`capitalize px-2 py-0.5 text-[10px] font-medium tracking-wide ${
                            p.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : p.status === "rejected"
                                ? "bg-red-500/10 text-red-500 border-red-500/20"
                                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}
                        >
                          {p.status}
                        </Badge>
                        {p.participation_type === "speaker" && (
                          <Badge
                            variant="outline"
                            className={`capitalize px-2 py-0.5 text-[10px] font-medium tracking-wide ${
                              p.speaker_status === "accepted"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                : p.speaker_status === "rejected"
                                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                                  : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            }`}
                          >
                            {p.speaker_status || "pending"}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4 pr-4">
                      {p.participation_type === "speaker" ? (
                        <div className="flex justify-end opacity-80 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 border border-white/5 bg-muted/20 hover:bg-muted/50 rounded-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-52 bg-[#090A0F] border-white/10 rounded-xl p-2 shadow-2xl"
                            >
                              <DropdownMenuLabel className="text-muted-foreground text-[10px] uppercase tracking-wider font-bold px-2 py-1.5 flex items-center">
                                Registration Control
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  confirmAction(
                                    p._id,
                                    "approved",
                                    "registration",
                                  )
                                }
                                className="gap-2 cursor-pointer focus:bg-emerald-500/10 focus:text-emerald-500 rounded-lg text-sm mb-1 transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center shrink-0">
                                  <Check className="h-3.5 w-3.5" />
                                </div>
                                Approve Registration
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  confirmAction(
                                    p._id,
                                    "rejected",
                                    "registration",
                                  )
                                }
                                className="gap-2 cursor-pointer focus:bg-red-500/10 focus:text-red-500 rounded-lg text-sm mb-1 transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-red-500/10 flex items-center justify-center shrink-0">
                                  <X className="h-3.5 w-3.5" />
                                </div>
                                Reject Registration
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-white/5 my-2" />
                              <DropdownMenuLabel className="text-muted-foreground text-[10px] uppercase tracking-wider font-bold px-2 py-1.5 flex items-center">
                                Speaker Control
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  confirmAction(p._id, "accepted", "speaker")
                                }
                                className="gap-2 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400 rounded-lg text-sm mb-1 transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-purple-500/10 flex items-center justify-center shrink-0">
                                  <Check className="h-3.5 w-3.5" />
                                </div>
                                Accept Talk
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  confirmAction(p._id, "rejected", "speaker")
                                }
                                className="gap-2 cursor-pointer focus:bg-red-500/10 focus:text-red-500 rounded-lg text-sm mb-1 transition-colors"
                              >
                                <div className="w-5 h-5 rounded bg-red-500/10 flex items-center justify-center shrink-0">
                                  <X className="h-3.5 w-3.5" />
                                </div>
                                Reject Talk
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          {p.status !== "approved" && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                              onClick={() =>
                                confirmAction(p._id, "approved", "registration")
                              }
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          {p.status !== "rejected" && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full text-red-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                              onClick={() =>
                                confirmAction(p._id, "rejected", "registration")
                              }
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {tab === "participants" && (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 bg-muted/30 hover:bg-muted/30">
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground w-[250px]">
                  User Details
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
                  Institution
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
                  Submitted
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
                  Status
                </TableHead>
                <TableHead className="text-right h-12 uppercase text-[10px] tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No participants found.
                  </TableCell>
                </TableRow>
              ) : (
                participants.map((p) => (
                  <TableRow
                    key={p._id}
                    className="border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <TableCell className="py-4">
                      <div className="font-semibold text-foreground">
                        {p.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {p.email}
                      </div>
                      <div className="text-[11px] text-muted-foreground/70 mt-1 font-mono">
                        {p.phone || "No phone"}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm font-medium text-foreground">
                        {p.institution}
                      </div>
                      <div className="text-xs text-muted-foreground/80 mt-0.5">
                        {p.designation}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-muted-foreground">
                      {format(new Date(p.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Badge
                        variant="outline"
                        className={`capitalize px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
                          p.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : p.status === "rejected"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4 pr-4">
                      <div className="flex justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        {p.status !== "approved" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                            onClick={() =>
                              confirmAction(p._id, "approved", "registration")
                            }
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        {p.status !== "rejected" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full text-red-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                            onClick={() =>
                              confirmAction(p._id, "rejected", "registration")
                            }
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {tab === "speakers" && (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 bg-muted/30 hover:bg-muted/30">
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground w-[250px]">
                  Speaker
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
                  Topic & type
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
                  Reg. Status
                </TableHead>
                <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
                  Speaker Status
                </TableHead>
                <TableHead className="text-right h-12 uppercase text-[10px] tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {speakers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No speakers found.
                  </TableCell>
                </TableRow>
              ) : (
                speakers.map((s) => (
                  <TableRow
                    key={s._id}
                    className="border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <TableCell className="py-4">
                      <div className="font-semibold text-foreground">
                        {s.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {s.institution}
                      </div>
                      {s.speaker_details?.file_url && (
                        <a
                          href={s.speaker_details.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-primary flex items-center mt-1.5 hover:underline w-fit"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> View PDF
                        </a>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm font-medium text-foreground line-clamp-1 max-w-[280px]">
                        {s.speaker_details?.presentation_title}
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 uppercase font-semibold tracking-wider mt-1.5 bg-muted/50 w-fit px-1.5 py-0.5 rounded-md border border-white/5">
                        {s.speaker_details?.presentation_type}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Badge
                        variant="outline"
                        className={`capitalize px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
                          s.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : s.status === "rejected"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Badge
                        variant="outline"
                        className={`capitalize px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
                          s.speaker_status === "accepted"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : s.speaker_status === "rejected"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}
                      >
                        {s.speaker_status || "pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4 pr-4">
                      <div className="flex justify-end opacity-80 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 border border-white/5 bg-muted/20 hover:bg-muted/50 rounded-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-52 bg-[#090A0F] border-white/10 rounded-xl p-2 shadow-2xl"
                          >
                            <DropdownMenuLabel className="text-muted-foreground text-[10px] uppercase tracking-wider font-bold px-2 py-1.5 flex items-center">
                              Registration Control
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                confirmAction(s._id, "approved", "registration")
                              }
                              className="gap-2 cursor-pointer focus:bg-emerald-500/10 focus:text-emerald-500 rounded-lg text-sm mb-1 transition-colors"
                            >
                              <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <Check className="h-3.5 w-3.5" />
                              </div>
                              Approve Registration
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                confirmAction(s._id, "rejected", "registration")
                              }
                              className="gap-2 cursor-pointer focus:bg-red-500/10 focus:text-red-500 rounded-lg text-sm mb-1 transition-colors"
                            >
                              <div className="w-5 h-5 rounded bg-red-500/10 flex items-center justify-center shrink-0">
                                <X className="h-3.5 w-3.5" />
                              </div>
                              Reject Registration
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5 my-2" />
                            <DropdownMenuLabel className="text-muted-foreground text-[10px] uppercase tracking-wider font-bold px-2 py-1.5 flex items-center">
                              Speaker Control
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                confirmAction(s._id, "accepted", "speaker")
                              }
                              className="gap-2 cursor-pointer focus:bg-purple-500/10 focus:text-purple-400 rounded-lg text-sm mb-1 transition-colors"
                            >
                              <div className="w-5 h-5 rounded bg-purple-500/10 flex items-center justify-center shrink-0">
                                <Check className="h-3.5 w-3.5" />
                              </div>
                              Accept Talk
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                confirmAction(s._id, "rejected", "speaker")
                              }
                              className="gap-2 cursor-pointer focus:bg-red-500/10 focus:text-red-500 rounded-lg text-sm mb-1 transition-colors"
                            >
                              <div className="w-5 h-5 rounded bg-red-500/10 flex items-center justify-center shrink-0">
                                <X className="h-3.5 w-3.5" />
                              </div>
                              Reject Talk
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <ConfirmationDialog />
    </div>
  );
}
