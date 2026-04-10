"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Loader2, Trash2, AlertTriangle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {deleteWorkshop} from "@/actions/workshop.action";

export default function DeleteWorkshopDialog({workshopId, workshopTitle}) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isMatched = confirmText === workshopTitle;

  const handleDelete = async () => {
    if (!isMatched) return;

    setLoading(true);
    try {
      const res = await deleteWorkshop(workshopId);
      if (res?.success) {
        toast.success(res.message);
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete workshop");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !loading && setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Delete Workshop"
          className="h-8 w-8 rounded-full hover:bg-destructive/15 hover:text-destructive text-destructive/70 transition-colors cursor-pointer group"
        >
          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-destructive" />
        <DialogHeader className="pt-4">
          <div className="mx-auto bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <DialogTitle className="text-center font-bold text-xl">
            Delete Workshop
          </DialogTitle>
          <DialogDescription className="text-center text-sm pt-2">
            This action{" "}
            <span className="font-bold text-destructive">cannot</span> be
            undone. This will permanently delete the workshop <br />
            <span className="font-semibold text-foreground">
              "{workshopTitle}"
            </span>{" "}
            <br />
            along with all its registrations, participants, and data.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted/50 p-4 rounded-lg border border-border/50 space-y-4 my-2">
          <p className="text-[13px] text-muted-foreground leading-relaxed text-center">
            To confirm deletion, please type the workshop title exactly as shown
            below:
            <br />
            <span className="font-mono bg-background px-2 py-0.5 rounded text-foreground font-semibold mt-1.5 inline-block select-all">
              {workshopTitle}
            </span>
          </p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={workshopTitle}
            className="font-mono text-sm"
            disabled={loading}
            autoComplete="off"
            autoCorrect="off"
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-0 mt-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isMatched || loading}
            className="w-full sm:w-auto relative overflow-hidden transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Permanently Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
