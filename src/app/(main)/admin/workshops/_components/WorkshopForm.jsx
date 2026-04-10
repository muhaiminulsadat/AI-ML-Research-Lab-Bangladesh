"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {createWorkshop, updateWorkshop} from "@/actions/workshop.action";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Loader2, Save, ArrowLeft} from "lucide-react";
import Link from "next/link";
import {toast} from "sonner";
import {format} from "date-fns";

export default function WorkshopForm({initialData = null, isEdit = false}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    venue: initialData?.venue || "",
    university: initialData?.university || "",
    banner_image: initialData?.banner_image || "",
    status: initialData?.status || "upcoming",
    registration_open: initialData?.registration_open ?? true,
    accepts_speakers: initialData?.accepts_speakers ?? true,
    seats_total: initialData?.seats_total || "",
    start_date: initialData?.start_date
      ? format(new Date(initialData.start_date), "yyyy-MM-dd")
      : "",
    end_date: initialData?.end_date
      ? format(new Date(initialData.end_date), "yyyy-MM-dd")
      : "",
    registration_deadline: initialData?.registration_deadline
      ? format(new Date(initialData.registration_deadline), "yyyy-MM-dd")
      : "",
    speaker_deadline: initialData?.speaker_deadline
      ? format(new Date(initialData.speaker_deadline), "yyyy-MM-dd")
      : "",
    max_speakers: initialData?.max_speakers || "",
  });

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {...formData};

    // Parse numbers & dates carefully
    ["seats_total", "max_speakers"].forEach((key) => {
      payload[key] = payload[key] ? Number(payload[key]) : undefined;
    });

    [
      "start_date",
      "end_date",
      "registration_deadline",
      "speaker_deadline",
    ].forEach((key) => {
      payload[key] = payload[key]
        ? new Date(payload[key]).toISOString()
        : undefined;
    });

    try {
      const res = isEdit
        ? await updateWorkshop(initialData._id, payload)
        : await createWorkshop(payload);

      if (res.success) {
        toast.success(res.message);
        router.push("/admin/workshops");
        router.refresh();
      } else {
        toast.error(res.message || "Operation failed.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/workshops">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Workshop" : "Create New Workshop"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Fill out the details for your event below.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-[#090A0F] border border-white/5 p-6 rounded-xl shadow-sm"
      >
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-2">
            Basic Information
          </h3>

          <div className="space-y-2">
            <Label htmlFor="title">Workshop Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University / Organization</Label>
              <Input
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner_image">Banner Image URL</Label>
            <Input
              id="banner_image"
              name="banner_image"
              type="url"
              value={formData.banner_image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-white/5 pb-2">
              Configuration
            </h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="registration_open"
                  checked={formData.registration_open}
                  onCheckedChange={(c) =>
                    handleChange({
                      target: {
                        name: "registration_open",
                        type: "checkbox",
                        checked: c,
                      },
                    })
                  }
                />
                <Label htmlFor="registration_open">Registration Open</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accepts_speakers"
                  checked={formData.accepts_speakers}
                  onCheckedChange={(c) =>
                    handleChange({
                      target: {
                        name: "accepts_speakers",
                        type: "checkbox",
                        checked: c,
                      },
                    })
                  }
                />
                <Label htmlFor="accepts_speakers">
                  Accepts Speaker Submissions
                </Label>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="status">Current Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v) => handleSelectChange("status", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-white/5 pb-2">
              Capacity
            </h3>

            <div className="space-y-2">
              <Label htmlFor="seats_total">
                Total Seats (Leave blank for unlimited)
              </Label>
              <Input
                id="seats_total"
                name="seats_total"
                type="number"
                min="1"
                value={formData.seats_total}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_speakers">
                Max Speakers (Leave blank for unlimited)
              </Label>
              <Input
                id="max_speakers"
                name="max_speakers"
                type="number"
                min="1"
                value={formData.max_speakers}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Schedule & Deadlines */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-2">
            Schedule & Deadlines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration_deadline">
                Registration Deadline
              </Label>
              <Input
                id="registration_deadline"
                name="registration_deadline"
                type="date"
                value={formData.registration_deadline}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="speaker_deadline">
                Speaker Submission Deadline
              </Label>
              <Input
                id="speaker_deadline"
                name="speaker_deadline"
                type="date"
                value={formData.speaker_deadline}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          {isEdit ? "Update Workshop" : "Publish Workshop"}
        </Button>
      </form>
    </div>
  );
}
