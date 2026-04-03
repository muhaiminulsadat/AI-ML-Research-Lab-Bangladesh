"use client";

import {useState} from "react";
import {format} from "date-fns";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  FileText,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {toast} from "sonner";
import {deletePublication} from "@/actions/publication.action";
import {useConfirm} from "@/hooks/useConfirm";

import CreatePublicationDialog from "./CreatePublicationDialog";
import EditPublicationDialog from "./EditPublicationDialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {cn} from "@/lib/utils";

export default function PublicationEditor({initialPublications}) {
  const [publications, setPublications] = useState(initialPublications);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingPub, setEditingPub] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  const {confirm, ConfirmationDialog} = useConfirm();

  const handleCreateSuccess = (newPub) => {
    setPublications((prev) => [newPub, ...prev]);
  };

  const handleEditSuccess = (updatedPub) => {
    setPublications((prev) =>
      prev.map((p) => (p._id === updatedPub._id ? updatedPub : p)),
    );
  };

  const executeDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await deletePublication(id);
      if (res.success) {
        toast.success(res.message);
        setPublications((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An error occurred during deletion.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDelete = (pub) => {
    confirm({
      title: "Delete Publication",
      description: `Are you sure you want to permanently delete "${pub.title}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: () => executeDelete(pub._id),
    });
  };

  const filteredPublications = publications.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authors.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <ConfirmationDialog />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Research Publications</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your lab's ongoing projects and published papers.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Publication
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4 px-6 border-b border-border/40 bg-muted/20">
          <div className="flex items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or author..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPublications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">No publications found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                {searchTerm
                  ? "We couldn't find any publications matching your search."
                  : "Get started by adding your first research paper or project."}
              </p>
              {!searchTerm && (
                <Button
                  variant="outline"
                  className="mt-4 cursor-pointer"
                  onClick={() => setIsCreateOpen(true)}
                >
                  Add Publication
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow>
                    <TableHead className="w-[400px]">Title & Authors</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Venue / Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPublications.map((pub) => (
                    <TableRow key={pub._id} className="group hover:bg-muted/30">
                      <TableCell>
                        <div className="flex flex-col gap-1.5">
                          <span className="font-semibold text-sm line-clamp-2">
                            {pub.title}
                          </span>
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {pub.authors.join(", ")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "capitalize text-xs font-medium",
                            pub.status === "published"
                              ? "bg-success/10 text-success border-success/30"
                              : "bg-amber-500/10 text-amber-600 border-amber-200",
                          )}
                        >
                          {pub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium">
                            {pub.venue || "—"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {pub.date ? format(new Date(pub.date), "MMM yyyy") : "—"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {pub.paperUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                              asChild
                              title="View Paper"
                            >
                              <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                                disabled={deletingId === pub._id}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  setEditingPub(pub);
                                  setIsEditOpen(true);
                                }}
                              >
                                <Pencil className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                                onClick={() => handleDelete(pub)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <CreatePublicationDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreateSuccess}
      />

      <EditPublicationDialog
        publication={editingPub}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
