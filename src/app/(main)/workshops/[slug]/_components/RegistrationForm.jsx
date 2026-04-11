"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {registerForWorkshop} from "@/actions/workshop.action";
import {toast} from "sonner";
import {Loader2, CheckCircle2} from "lucide-react";
import Link from "next/link";
import {Card} from "@/components/ui/card";

export default function RegistrationForm({workshop, user}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    workshop_id: workshop._id,
    name: user?.name || "",
    email: user?.email || "",
    institution: user?.university || user?.institution || "",
    designation: user?.designation || "",
    phone: "",
    participation_type: "participant",
    speaker_details: {
      presentation_title: "",
      abstract: "",
      presentation_type: "paper",
      co_authors: "",
      file_url: "",
    },
  });

  const updateForm = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({...prev, [field]: value}));
    }
  };

  const currentStepIsValid = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.institution;
    }
    if (step === 2) {
      if (formData.participation_type === "speaker") {
        return (
          formData.speaker_details.presentation_title &&
          formData.speaker_details.abstract &&
          formData.speaker_details.presentation_type
        );
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStepIsValid()) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentStepIsValid()) return;

    setLoading(true);
    let payload = {...formData};

    // Remove speaker details if participant
    if (payload.participation_type === "participant") {
      delete payload.speaker_details;
    }

    try {
      const res = await registerForWorkshop(payload);
      if (res.success) {
        setSuccess(true);
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to register.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Registration Successful!</h3>
        <p className="text-muted-foreground text-sm">
          You are successfully registered as a{" "}
          <span className="capitalize font-semibold text-foreground">
            {formData.participation_type}
          </span>
          .
        </p>
      </div>
    );
  }

  const steps = ["Personal Info", "Participation", "Review"];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 relative">
        <div className="absolute left-0 top-1/2 w-full h-px bg-white/10 -z-10 -translate-y-1/2" />
        {steps.map((label, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-[#090A0F] px-2 gap-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step > idx + 1
                  ? "bg-primary text-primary-foreground"
                  : step === idx + 1
                    ? "bg-primary text-primary-foreground border-2 border-primary/20 ring-4 ring-primary/10"
                    : "bg-muted text-muted-foreground border border-white/10"
              }`}
            >
              {step > idx + 1 ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">
              {label}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}
        className="space-y-6"
      >
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {!user && (
              <div className="bg-primary/10 text-white p-3 rounded-lg text-sm border border-primary/20 mb-4 flex justify-between items-center">
                <span>Already a member?</span>
                <Link
                  href="/login"
                  className="text-primary font-semibold underline underline-offset-4"
                >
                  Login to auto-fill
                </Link>
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateForm("name", e.target.value)}
                required
                disabled={!!user}
                placeholder="Muhaiminul Sadat"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateForm("email", e.target.value)}
                required
                disabled={!!user}
                placeholder="muhaiminulsadat@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="institution"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
              >
                Institution / University *
              </Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => updateForm("institution", e.target.value)}
                required
                disabled={!!user && !!user?.university}
                placeholder="Bangladesh University of Engineering and Technology (BUET)"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="designation"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
              >
                Designation
              </Label>
              <Select
                value={formData.designation}
                onValueChange={(val) => updateForm("designation", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Researcher">Researcher</SelectItem>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Industry Professional">
                    Industry Professional
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="grid grid-cols-1 gap-4">
              <Card
                className={`p-4 cursor-pointer transition-all border-2 ${
                  formData.participation_type === "participant"
                    ? "border-primary bg-primary/5"
                    : "border-white/5 hover:border-white/20 bg-transparent"
                }`}
                onClick={() => updateForm("participation_type", "participant")}
              >
                <div className="font-semibold mb-1">Participant</div>
                <div className="text-sm text-muted-foreground">
                  Just attend the workshop and learn.
                </div>
              </Card>

              {workshop.accepts_speakers && (
                <Card
                  className={`p-4 cursor-pointer transition-all border-2 ${
                    formData.participation_type === "speaker"
                      ? "border-primary bg-primary/5"
                      : "border-white/5 hover:border-white/20 bg-transparent"
                  }`}
                  onClick={() => updateForm("participation_type", "speaker")}
                >
                  <div className="font-semibold mb-1">Speaker</div>
                  <div className="text-sm text-muted-foreground">
                    Present your research, paper, or host a demo.
                  </div>
                </Card>
              )}
            </div>

            {formData.participation_type === "speaker" && (
              <div className="space-y-4 pt-4 border-t border-white/5 mt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="present_title"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
                  >
                    Presentation Title *
                  </Label>
                  <Input
                    id="present_title"
                    value={formData.speaker_details.presentation_title}
                    onChange={(e) =>
                      updateForm(
                        "speaker_details.presentation_title",
                        e.target.value,
                      )
                    }
                    required={formData.participation_type === "speaker"}
                    placeholder="Enter your talk title"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="presentation_type"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
                  >
                    Presentation Type *
                  </Label>
                  <Select
                    value={formData.speaker_details.presentation_type}
                    onValueChange={(val) =>
                      updateForm("speaker_details.presentation_type", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paper">Paper Presentation</SelectItem>
                      <SelectItem value="poster">Poster Session</SelectItem>
                      <SelectItem value="demo">Live Demo</SelectItem>
                      <SelectItem value="keynote">Keynote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="abstract"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
                  >
                    Abstract *
                  </Label>
                  <Textarea
                    id="abstract"
                    rows={4}
                    value={formData.speaker_details.abstract}
                    onChange={(e) =>
                      updateForm("speaker_details.abstract", e.target.value)
                    }
                    required={formData.participation_type === "speaker"}
                    placeholder="A brief summary of your presentation..."
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="co"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
                  >
                    Co-authors (Optional)
                  </Label>
                  <Input
                    id="co"
                    value={formData.speaker_details.co_authors}
                    onChange={(e) =>
                      updateForm("speaker_details.co_authors", e.target.value)
                    }
                    placeholder="Tanvir Ahmed, Nusrat Jahan"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="file_url"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block"
                  >
                    Upload PDF / External Link (Optional)
                  </Label>
                  <Input
                    id="file_url"
                    type="url"
                    value={formData.speaker_details.file_url}
                    onChange={(e) =>
                      updateForm("speaker_details.file_url", e.target.value)
                    }
                    placeholder="https://example.com/paper.pdf"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
            <h3 className="font-semibold text-lg mb-2">Review Your Details</h3>
            <div className="bg-muted/30 p-4 rounded-xl space-y-3 text-sm border border-white/5">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium text-foreground">
                  {formData.name}
                </span>

                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">
                  {formData.email}
                </span>

                <span className="text-muted-foreground">Institution:</span>
                <span className="font-medium text-foreground">
                  {formData.institution}
                </span>

                <span className="text-muted-foreground">Participation:</span>
                <span className="font-medium text-foreground capitalize">
                  {formData.participation_type}
                </span>
              </div>
            </div>

            {formData.participation_type === "speaker" && (
              <div className="bg-muted/30 p-4 rounded-xl space-y-3 text-sm border border-white/5">
                <h4 className="font-medium text-foreground border-b border-white/5 pb-2 mb-2">
                  Speaker Details
                </h4>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="font-medium text-foreground">
                    {formData.speaker_details.presentation_title}
                  </span>

                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium text-foreground capitalize">
                    {formData.speaker_details.presentation_type}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4 mt-4 border-t border-white/5 gap-4">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={loading}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!currentStepIsValid()}
            >
              Next Step
            </Button>
          ) : (
            <Button type="submit" disabled={loading || !currentStepIsValid()}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? "Registering..." : "Submit Registration"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
