import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import ProfileView from "./_components/ProfileView";

export default async function ProfilePage() {
  const {user} = await getCurrentUser();
  if (!user) redirect("/login");

  const parsedUser = {
    ...user,
    socialLinks: user.socialLinks
      ? JSON.parse(user.socialLinks)
      : {github: "", linkedin: "", googleScholar: ""},
    researchInterests: user.researchInterests ?? [],
  };

  return <ProfileView user={parsedUser} />;
}
