"use client";

import {useState} from "react";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {authClient} from "@/lib/auth-client";
import {createCourse} from "@/actions/course.action";

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
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateCourseDialog({open, onOpenChange, onSuccess}) {
  const {data: session} = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    difficulty: "beginner",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({...prev, difficulty: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.id) {
      return toast.error("Authentication error. Please log in again.");
    }

    if (!formData.title || !formData.description) {
      return toast.error("Please fill in all required fields.");
    }

    setLoading(true);

    const payload = {
      ...formData,
      instructor: session.user.id,
      isPublished: false,
    };

    const res = await createCourse(payload);

    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      onSuccess(res.data);
      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        thumbnail: "",
        difficulty: "beginner",
      });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Set up the core details for your new course. You can add modules
              and lectures later.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Course Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Introduction to Machine Learning"
                value={formData.title}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Briefly describe what students will learn..."
                className="resize-none h-24"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="thumbnail" className="text-sm font-medium">
                Thumbnail URL (Optional)
              </Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                placeholder="https://example.com/image.jpg"
                value={formData.thumbnail}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="difficulty" className="text-sm font-medium">
                Difficulty Level
              </Label>
              <Select
                value={formData.difficulty}
                onValueChange={handleSelectChange}
                disabled={loading}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
