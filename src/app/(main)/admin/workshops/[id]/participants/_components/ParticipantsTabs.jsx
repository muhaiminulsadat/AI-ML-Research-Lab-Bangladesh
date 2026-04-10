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

export default function ParticipantsTabs({registrations}) {
  const [tab, setTab] = useState("participants");
  const router = useRouter();

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

  const downloadCSV = () => {
    const activeData = tab === "participants" ? participants : speakers;
    const headers =
      tab === "participants"
        ? "Name,Email,Institution,Designation,Phone,Status,Submitted At\n"
        : "Name,Email,Institution,Title,Type,Status,Speaker Status,Submitted At\n";

    const rows = activeData
      .map((r) => {
        if (tab === "participants") {
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

      <div className="bg-[#090A0F] border border-white/5 rounded-xl overflow-hidden shadow-sm">
        {tab === "participants" && (
          <Table>
            <TableHeader className="bg-muted/50 hover:bg-muted/50">
              <TableRow className="border-white/5">
                <TableHead>User Details</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableRow key={p._id} className="border-white/5">
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {p.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {p.email}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {p.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground">{p.institution}</div>
                      <div className="text-xs text-muted-foreground">
                        {p.designation}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(p.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          p.status === "approved"
                            ? "bg-green-600/20 text-green-500 border-green-600/20"
                            : p.status === "rejected"
                              ? "bg-red-600/20 text-red-500 border-red-600/20"
                              : "bg-amber-600/20 text-amber-500 border-amber-600/20"
                        }
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {p.status !== "approved" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                            onClick={() =>
                              handleUpdateStatus(
                                p._id,
                                "approved",
                                "registration",
                              )
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
                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            onClick={() =>
                              handleUpdateStatus(
                                p._id,
                                "rejected",
                                "registration",
                              )
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
            <TableHeader className="bg-muted/50 hover:bg-muted/50">
              <TableRow className="border-white/5">
                <TableHead>Speaker</TableHead>
                <TableHead>Topic & type</TableHead>
                <TableHead>Reg. Status</TableHead>
                <TableHead>Speaker Status</TableHead>
                <TableHead className="text-right w-24">Actions</TableHead>
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
                  <TableRow key={s._id} className="border-white/5">
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {s.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.institution}
                      </div>
                      {s.speaker_details?.file_url && (
                        <a
                          href={s.speaker_details.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary flex items-center mt-1 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> View PDF
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground text-sm font-medium line-clamp-1">
                        {s.speaker_details?.presentation_title}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {s.speaker_details?.presentation_type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          s.status === "approved"
                            ? "border-green-600/30 text-green-500"
                            : s.status === "rejected"
                              ? "border-red-600/30 text-red-500"
                              : "border-amber-600/30 text-amber-500"
                        }
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          s.speaker_status === "accepted"
                            ? "bg-purple-600/20 text-purple-500 border-purple-600/20"
                            : s.speaker_status === "rejected"
                              ? "bg-red-600/20 text-red-500 border-red-600/20"
                              : "bg-amber-600/20 text-amber-500 border-amber-600/20"
                        }
                      >
                        {s.speaker_status || "pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 border border-white/5 bg-muted/20 hover:bg-muted/50 rounded-full"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-52 bg-[#090A0F] border-white/10 rounded-xl p-2 shadow-2xl"
                        >
                          <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-wider font-semibold px-2">
                            Registration
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(
                                s._id,
                                "approved",
                                "registration",
                              )
                            }
                            className="gap-2 cursor-pointer focus:bg-green-500/10 focus:text-green-500 rounded-lg"
                          >
                            <Check className="h-4 w-4" />
                            Approve Registration
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(
                                s._id,
                                "rejected",
                                "registration",
                              )
                            }
                            className="gap-2 cursor-pointer focus:bg-red-500/10 focus:text-red-500 rounded-lg"
                          >
                            <X className="h-4 w-4" />
                            Reject Registration
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/5 my-2" />
                          <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-wider font-semibold px-2">
                            Speaker Status
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(s._id, "accepted", "speaker")
                            }
                            className="gap-2 cursor-pointer focus:bg-purple-500/10 focus:text-purple-500 rounded-lg"
                          >
                            <Check className="h-4 w-4" />
                            Accept Talk
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(s._id, "rejected", "speaker")
                            }
                            className="gap-2 cursor-pointer focus:bg-red-500/10 focus:text-red-500 rounded-lg"
                          >
                            <X className="h-4 w-4" />
                            Reject Talk
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
