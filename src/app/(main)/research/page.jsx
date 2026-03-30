import {getPublications} from "@/actions/publication.action";
import ResearchView from "./_components/ResearchView";

export const metadata = {
  title: "Research & Publications | AI/ML Lab",
  description: "Explore the ongoing projects and published papers from our AI/ML Lab.",
};

export default async function ResearchPage() {
  const result = await getPublications();
  const publications = result.success ? result.data : [];

  return <ResearchView publications={publications} />;
}
