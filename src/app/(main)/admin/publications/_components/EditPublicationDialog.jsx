"use client";

import {useState, useEffect} from "react";
import {toast} from "sonner";
import {Loader2, X} from "lucide-react";
import {updatePublication} from "@/actions/publication.action";

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
import {format} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";

export default function EditPublicationDialog({
  publication,
  open,
  onOpenChange,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [authorInput, setAuthorInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    status: "ongoing",
    venue: "",
    abstract: "",
    paperUrl: "",
    codeUrl: "",
    authors: [],
    tags: [],
    date: new Date(),
  });

  useEffect(() => {
    if (publication) {
      setFormData({
        title: publication.title || "",
        status: publication.status || "ongoing",
        venue: publication.venue || "",
        abstract: publication.abstract || "",
        paperUrl: publication.paperUrl || "",
        codeUrl: publication.codeUrl || "",
        authors: publication.authors || [],
        tags: publication.tags || [],
        date: publication.date ? new Date(publication.date) : new Date(),
      });
    }
  }, [publication]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleArrayAdd = (e, inputState, setInputState, arrayField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = inputState.trim();
      if (val && !formData[arrayField].includes(val)) {
        setFormData((prev) => ({
          ...prev,
          [arrayField]: [...prev[arrayField], val],
        }));
      }
      setInputState("");
    }
  };

  const handleArrayRemove = (valToRemove, arrayField) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: prev[arrayField].filter((v) => v !== valToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Title is required.");
    }
    if (formData.authors.length === 0) {
      return toast.error("At least one author is required.");
    }

    setLoading(true);

    const res = await updatePublication(publication._id, formData);

    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      if (onSuccess) onSuccess(res.data);
      onOpenChange(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Publication</DialogTitle>
            <DialogDescription>
              Update the details for this research paper or project.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="grid gap-2 md:col-span-3">
                <Label htmlFor="edit-pub-title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edit-pub-title"
                  name="title"
                  placeholder="e.g. Attention Is All You Need"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2 md:col-span-1">
                <Label htmlFor="edit-pub-status" className="text-sm font-medium">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(val) =>
                    setFormData((prev) => ({...prev, status: val}))
                  }
                  disabled={loading}
                >
                  <SelectTrigger id="edit-pub-status">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing" className="cursor-pointer">
                      Ongoing
                    </SelectItem>
                    <SelectItem value="published" className="cursor-pointer">
                      Published
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-pub-authors" className="text-sm font-medium">
                Authors <span className="text-destructive">*</span>{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (Press Enter to add)
                </span>
              </Label>
              <Input
                id="edit-pub-authors"
                placeholder="e.g. Muhaiminul Islam Sadat"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                onKeyDown={(e) =>
                  handleArrayAdd(e, authorInput, setAuthorInput, "authors")
                }
                disabled={loading}
              />
              {formData.authors.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {formData.authors.map((author) => (
                    <span
                      key={author}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {author}
                      <button
                        type="button"
                        onClick={() => handleArrayRemove(author, "authors")}
                        className="hover:text-foreground transition-colors cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-pub-venue" className="text-sm font-medium">
                  Venue / Conference{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (Optional)
                  </span>
                </Label>
                <Input
                  id="edit-pub-venue"
                  name="venue"
                  placeholder="e.g. NeurIPS 2024"
                  value={formData.venue}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground",
                      )}
                      disabled={loading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(formData.date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) =>
                        date && setFormData((prev) => ({...prev, date}))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-pub-paper" className="text-sm font-medium">
                  Paper URL (PDF / ArXiv)
                </Label>
                <Input
                  id="edit-pub-paper"
                  name="paperUrl"
                  placeholder="https://arxiv.org/abs/..."
                  value={formData.paperUrl}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pub-code" className="text-sm font-medium">
                  Code URL (GitHub)
                </Label>
                <Input
                  id="edit-pub-code"
                  name="codeUrl"
                  placeholder="https://github.com/..."
                  value={formData.codeUrl}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-pub-abstract" className="text-sm font-medium">
                Abstract
              </Label>
              <Textarea
                id="edit-pub-abstract"
                name="abstract"
                placeholder="Brief summary of the research..."
                className="resize-none h-24"
                value={formData.abstract}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-pub-tags" className="text-sm font-medium">
                Tags{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (Press Enter to add)
                </span>
              </Label>
              <Input
                id="edit-pub-tags"
                placeholder="e.g. computer-vision"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  handleArrayAdd(e, tagInput, setTagInput, "tags")
                }
                disabled={loading}
              />
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/40"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleArrayRemove(tag, "tags")}
                        className="hover:text-foreground transition-colors cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
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
