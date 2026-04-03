import HeroSection from "@/components/landing/HeroSection";
import HeroBackground from "@/components/landing/HeroBackground";
import MissionSection from "@/components/landing/MissionSection";
import DomainsSection from "@/components/landing/DomainsSection";
import ProjectsShowcase from "@/components/landing/ProjectsShowcase";
import TeamSection from "@/components/landing/TeamSection";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-foreground">
      <HeroBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32 space-y-16">
        <HeroSection />
        <MissionSection />
        <DomainsSection />
        <ProjectsShowcase />
        <TeamSection />
        <CTASection />
      </main>
    </div>
  );
}
