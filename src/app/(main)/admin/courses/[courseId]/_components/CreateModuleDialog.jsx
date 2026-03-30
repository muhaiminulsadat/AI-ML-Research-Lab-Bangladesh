"use client";

import {useState} from "react";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {addModuleToCourse} from "@/actions/course.action";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function CreateModuleDialog({
  courseId,
  open,
  onOpenChange,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Module title is required.");
    }

    setLoading(true);

    const res = await addModuleToCourse(courseId, {title});

    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      onSuccess(res.data); // Return updated course
      onOpenChange(false);
      setTitle("");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Module</DialogTitle>
            <DialogDescription>
              Create a section to group related video lectures together.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Module Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. Chapter 1: Introduction"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Module"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
