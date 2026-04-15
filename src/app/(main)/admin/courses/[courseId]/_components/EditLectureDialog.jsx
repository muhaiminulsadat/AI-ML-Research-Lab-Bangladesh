"use client";

import {useState, useEffect} from "react";
import {toast} from "sonner";
import {Loader2, Video} from "lucide-react";
import {updateLecture} from "@/actions/course.action";

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

export default function EditLectureDialog({
  courseId,
  moduleId,
  lecture,
  open,
  onOpenChange,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    youtubeId: "",
    duration: "",
  });

  useEffect(() => {
    if (lecture) {
      setTimeout(() => {
        setFormData({
          title: lecture.title || "",
          youtubeId: lecture.youtubeId || "",
          duration: lecture.duration ? String(lecture.duration) : "",
        });
      }, 0);
    }
  }, [lecture]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const extractYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.youtubeId.trim()) {
      return toast.error("Title and YouTube Video URL/ID are required.");
    }

    setLoading(true);

    const extractedId = extractYouTubeId(formData.youtubeId);

    const payload = {
      title: formData.title,
      youtubeId: extractedId,
      duration: formData.duration ? parseInt(formData.duration) : 0,
    };

    const res = await updateLecture(courseId, moduleId, lecture._id, payload);

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
      <DialogContent className="sm:max-w-[450px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Edit Lecture</DialogTitle>
            <DialogDescription>
              Update the details for this lecture.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="edit-lecture-title" className="text-sm font-medium">
                Lecture Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-lecture-title"
                name="title"
                placeholder="e.g. Setting up Python"
                value={formData.title}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-youtubeId" className="text-sm font-medium">
                YouTube URL or Video ID{" "}
                <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Video className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="edit-youtubeId"
                  name="youtubeId"
                  placeholder="https://youtube.com/watch?v=..."
                  className="pl-10"
                  value={formData.youtubeId}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-duration" className="text-sm font-medium">
                Duration (minutes){" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (Optional)
                </span>
              </Label>
              <Input
                id="edit-duration"
                name="duration"
                type="number"
                placeholder="e.g. 15"
                min="0"
                value={formData.duration}
                onChange={handleChange}
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
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="cursor-pointer">
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
