import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="border-t border-border/30 pt-24 pb-12">
      <div className="relative rounded-[3rem] overflow-hidden bg-card border border-border/30 px-6 py-20 sm:py-32 text-center text-balance flex flex-col justify-center items-center">
        {/* Clean inner radial flow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
            Join the intelligence frontier.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            We are intensely looking for brilliant theorists, scaling engineers,
            and postdocs to accelerate upcoming multimodal initiatives.
          </p>
          <div className="pt-4 flex flex-col items-center gap-6">
            <Link href="/members">
              <Button
                size="lg"
                className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold text-base group shadow-lg"
              >
                Join the Research Lab
                <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground/80 font-medium">
              Official Mail:{" "}
              <a
                href="mailto:contact@mlai-research-bd.org"
                className="text-foreground hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
              >
                contact@mlai-research-bd.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
