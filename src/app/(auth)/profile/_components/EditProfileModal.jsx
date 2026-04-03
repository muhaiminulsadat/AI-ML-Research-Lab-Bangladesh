"use client";
import {useState} from "react";
import {
  X,
  Plus,
  BookOpen,
  User,
  Building2,
  FileText,
  Link2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";
import {toast} from "sonner";
import {updateProfile} from "@/actions/user.action";
import {authClient} from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function EditProfileModal({open, onClose, user}) {
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState({
    name: user?.name ?? "",
    bio: user?.bio ?? "",
    university: user?.university ?? "",
    profileImage: user?.profileImage ?? "",
    researchInterests: user?.researchInterests ?? [],
    socialLinks: {
      github: user?.socialLinks?.github ?? "",
      linkedin: user?.socialLinks?.linkedin ?? "",
      googleScholar: user?.socialLinks?.googleScholar ?? "",
    },
  });

  const router = useRouter();


  const handleChange = (e) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSocialChange = (e) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: {...prev.socialLinks, [e.target.name]: e.target.value},
    }));
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim();
      if (!form.researchInterests.includes(tag)) {
        setForm((prev) => ({
          ...prev,
          researchInterests: [...prev.researchInterests, tag],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      researchInterests: prev.researchInterests.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await updateProfile(form);
    if (!res.success) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

  
    await authClient.getSession({fetchOptions: {cache: "no-store"}});
    toast.success("Profile updated!");
    setLoading(false);
    router.refresh();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-bold text-xl">
            <User className="h-4 w-4" />
            Edit Profile
          </DialogTitle>          <DialogDescription className="sr-only">
            Edit your profile details
          </DialogDescription>        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> Name
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* Profile Image URL */}
          <div className="space-y-2">
            <Label htmlFor="profileImage" className="flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5" /> Profile Image URL
            </Label>
            <Input
              id="profileImage"
              name="profileImage"
              placeholder="https://..."
              value={form.profileImage}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* University */}
          <div className="space-y-2">
            <Label htmlFor="university" className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" /> University
            </Label>
            <Input
              id="university"
              name="university"
              placeholder="e.g. BUET"
              value={form.university}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Bio
            </Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="e.g. Student at Civil Engineering..."
              value={form.bio}
              onChange={handleChange}
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Research Interests */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Research Interests
            </Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.researchInterests.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    disabled={loading}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Type and press Enter to add..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              disabled={loading}
            />
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5" /> Social Links
            </Label>
            <div className="space-y-2">
              <div className="relative">
                {/* <Github className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                <Input
                  name="github"
                  placeholder="GitHub URL"
                  value={form.socialLinks.github}
                  onChange={handleSocialChange}
                  className="pl-9"
                  disabled={loading}
                />
              </div>
              <div className="relative">
                {/* <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                <Input
                  name="linkedin"
                  placeholder="LinkedIn URL"
                  value={form.socialLinks.linkedin}
                  onChange={handleSocialChange}
                  className="pl-9"
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  name="googleScholar"
                  placeholder="Google Scholar URL"
                  value={form.socialLinks.googleScholar}
                  onChange={handleSocialChange}
                  className="pl-9"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
