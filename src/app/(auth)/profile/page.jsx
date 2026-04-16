import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import ProfileView from "./_components/ProfileView";
import {Suspense} from "react";
import {connection} from "next/server";
import {Skeleton} from "@/components/ui/skeleton";

function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
      <Skeleton className="w-full h-48 rounded-xl bg-white/5" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="w-full h-[400px] rounded-xl bg-white/5 md:col-span-1" />
        <Skeleton className="w-full h-[400px] rounded-xl bg-white/5 md:col-span-2" />
      </div>
    </div>
  );
}

async function ProfileContent() {
  await connection();
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

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
