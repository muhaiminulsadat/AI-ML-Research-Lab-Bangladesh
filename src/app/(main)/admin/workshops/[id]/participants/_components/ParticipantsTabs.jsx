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
import {Check, X, FileText, ExternalLink} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <div className="flex gap-2 bg-muted p-1 rounded-lg">
          <Button
            variant={tab === "participants" ? "default" : "ghost"}
            onClick={() => setTab("participants")}
          >
            Participants ({participants.length})
          </Button>
          <Button
            variant={tab === "speakers" ? "default" : "ghost"}
            onClick={() => setTab("speakers")}
          >
            Speakers ({speakers.length})
          </Button>
        </div>

        <Button variant="outline" onClick={downloadCSV}>
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
                <TableHead className="text-right w-32">Actions</TableHead>
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
                      <div className="flex flex-col gap-2">
                        <Select
                          value={s.status}
                          onValueChange={(val) =>
                            handleUpdateStatus(s._id, val, "registration")
                          }
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Reg Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">
                              Reg: Pending
                            </SelectItem>
                            <SelectItem value="approved">
                              Reg: Approve
                            </SelectItem>
                            <SelectItem value="rejected">
                              Reg: Reject
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          value={s.speaker_status || "pending"}
                          onValueChange={(val) =>
                            handleUpdateStatus(s._id, val, "speaker")
                          }
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Talk Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">
                              Talk: Pending
                            </SelectItem>
                            <SelectItem value="accepted">
                              Talk: Accept
                            </SelectItem>
                            <SelectItem value="rejected">
                              Talk: Reject
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
