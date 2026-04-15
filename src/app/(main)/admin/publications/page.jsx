import {getCurrentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getPublications} from "@/actions/publication.action";
import PublicationEditor from "./_components/PublicationEditor";

export const metadata = {
  title: "Admin - Publications | ML & AI Lab",
};

export default async function AdminPublicationsPage() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/dashboard");

  const pubResult = await getPublications(true);
  const publications = pubResult.success ? pubResult.data : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <PublicationEditor initialPublications={publications} />
    </div>
  );
}
