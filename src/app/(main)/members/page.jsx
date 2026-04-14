import {Suspense} from "react";
import {getMembers} from "@/actions/user.action";
import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import MembersView from "./_components/MembersView";
import MembersSkeleton from "./_components/MembersSkeleton";

async function MembersFetcher() {
  const res = await getMembers();
  const members = res.success ? res.data : [];
  return <MembersView members={members} />;
}

export default async function MembersPage() {
  const {user} = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <Suspense fallback={<MembersSkeleton />}>
      <MembersFetcher />
    </Suspense>
  );
}
