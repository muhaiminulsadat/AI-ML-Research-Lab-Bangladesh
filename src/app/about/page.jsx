import HeroMission from "./_components/HeroMission";
import NationalPipeline from "./_components/NationalPipeline";
import ResearchFocus from "./_components/ResearchFocus";
import OrgStructure from "./_components/OrgStructure";
import Leadership from "./_components/Leadership";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-foreground">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32 space-y-32">
        <HeroMission />
        <NationalPipeline />
        <ResearchFocus />
        <OrgStructure />
        <Leadership />
      </main>
    </div>
  );
}
