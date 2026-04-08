import {getPublications} from "@/actions/publication.action";
import ResearchView from "./_components/ResearchView";

export const metadata = {
  title: "Research & Publications | ML & AI Lab",
  description:
    "Explore the ongoing projects and published papers from our ML & AI Lab.",
};

export default async function ResearchPage() {
  const result = await getPublications();
  const publications = result.success ? result.data : [];

  return <ResearchView publications={publications} />;
}
