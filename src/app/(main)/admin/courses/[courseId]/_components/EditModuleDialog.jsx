"use client";

import {useState, useEffect} from "react";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {updateModule} from "@/actions/course.action";

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

export default function EditModuleDialog({
  courseId,
  module,
  open,
  onOpenChange,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (module) {
      setTitle(module.title || "");
    }
  }, [module]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Module title is required.");
    }

    setLoading(true);

    const res = await updateModule(courseId, module._id, {title});

    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      onSuccess(res.data);
      onOpenChange(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Edit Module</DialogTitle>
            <DialogDescription>
              Update the title for this module.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="edit-module-title" className="text-sm font-medium">
                Module Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-module-title"
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
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
