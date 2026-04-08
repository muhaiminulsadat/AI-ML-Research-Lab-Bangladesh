import panelMembers from "@/constants/panel";
import PanelHero from "./_components/PanelHero";
import DirectorsSection from "./_components/DirectorsSection";
import DivisionsSection from "./_components/DivisionsSection";

export const metadata = {
  title: "Executive Panel | ML & AI Research Lab",
  description:
    "Meet the executive panel overseeing the activities of the ML & AI Research Lab, Bangladesh.",
};

export default function PanelPage() {
  const {directors, administration, research, ict, law, executives} =
    panelMembers;

  const totalMembers =
    (directors?.length || 0) +
    (administration?.length || 0) +
    (research?.length || 0) +
    (ict?.length || 0) +
    (law?.length || 0) +
    (executives?.length || 0);

  const divisionDataMap = {administration, research, ict, law, executives};

  return (
    <div className="min-h-screen max-w-7xl mx-auto divide-y divide-border/20">
      <PanelHero totalMembers={totalMembers} />
      <DirectorsSection directors={directors} />
      <DivisionsSection dataMap={divisionDataMap} />
    </div>
  );
}
