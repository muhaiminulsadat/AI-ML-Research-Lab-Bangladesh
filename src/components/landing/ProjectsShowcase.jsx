import Link from "next/link";
import {ArrowRight, ArrowUpRight} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default function ProjectsShowcase() {
  return (
    <section className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Featured Work
          </h2>
          <p className="text-muted-foreground">
            Breakthrough implementations and operational architecture.
          </p>
        </div>
        <Link
          href="/research"
          className="hidden sm:inline-flex group items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          View all works{" "}
          <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Project Card */}
        <Link
          href="/research"
          className="lg:col-span-2 group p-8 sm:p-12 rounded-[2.5rem] bg-card border border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden relative flex flex-col justify-end min-h-[400px]"
        >
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-12 sm:gap-6 w-full h-full sm:items-end">
            <div className="space-y-5 max-w-2xl">
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="font-mono text-xs uppercase tracking-widest bg-secondary/40 text-muted-foreground"
                >
                  OPEN SOURCE
                </Badge>
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                Synapse-7B Foundation
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our latest dense model trained entirely on hyper-curated
                academic sets. Surpasses comparable parameter weights on
                standard reasoning markers and logic verification tasks.
              </p>
              <div className="flex gap-2 flex-wrap pt-2">
                {["LLM", "Pre-training", "PyTorch", "FlashAttention"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border/20"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="w-12 h-12 rounded-full border border-border/40 bg-secondary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors shrink-0">
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
            </div>
          </div>
        </Link>

        {/* Minor project - 1 */}
        <Link
          href="/research"
          className="group p-8 rounded-[2rem] bg-secondary/10 border border-border/30 justify-between flex flex-col min-h-[300px] hover:bg-secondary/20 transition-all duration-500"
        >
          <div className="flex justify-between items-start mb-12">
            <Badge
              variant="outline"
              className="border-border/40 font-mono text-[10px] uppercase tracking-widest bg-transparent text-muted-foreground"
            >
              RESEARCH PUBLICATION
            </Badge>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Neuro-Visual Interfaces
            </h3>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              A cross-modal semantic bridge projecting raw EEG waveforms
              directly into controllable stable diffusion latent states.
            </p>
          </div>
        </Link>

        {/* Minor project - 2 */}
        <Link
          href="/research"
          className="group p-8 rounded-[2rem] bg-secondary/10 border border-border/30 justify-between flex flex-col min-h-[300px] hover:bg-secondary/20 transition-all duration-500"
        >
          <div className="flex justify-between items-start mb-12">
            <Badge
              variant="outline"
              className="border-border/40 font-mono text-[10px] uppercase tracking-widest bg-transparent text-muted-foreground"
            >
              FRAMEWORK LIBRARY
            </Badge>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              RLHF Toolkit v2
            </h3>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Highly scalable alignment pipelines enabling low-VRAM fine-tuning
              and proxy-based reward modeling for local nodes.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
