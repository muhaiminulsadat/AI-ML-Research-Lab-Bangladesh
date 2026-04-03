import Link from "next/link";
import {ArrowRight, ArrowUpRight} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default function ProjectsShowcase() {
  return (
    <section className="space-y-12">
      <div className="flex flex-col items-center text-center sm:text-left sm:flex-row justify-between sm:items-end gap-6">
        <div className="space-y-4 flex flex-col items-center sm:items-start">
          <p className="font-mono text-[11px] tracking-[0.22em] text-primary/70 uppercase">
            // Featured Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
            Breakthrough
            <br className="hidden sm:block" /> implementations
          </h2>
        </div>
        <p className="text-muted-foreground max-w-xs text-sm leading-relaxed text-center sm:text-right">
          Showcasing our latest operational architectures and foundational
          models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Project Card */}
        <Link
          href="/research"
          className="lg:col-span-2 group p-8 sm:p-12 rounded-[2.5rem] bg-[#090A0F] border border-white/5 hover:bg-[#0D0F14] hover:border-white/10 transition-all duration-300 overflow-hidden relative flex flex-col justify-end min-h-[400px] hover:shadow-2xl hover:-translate-y-1 block"
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
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                Synapse-7B Foundation
              </h3>
              <p className="text-white/50 text-lg leading-relaxed font-normal">
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
          className="group p-8 rounded-[2rem] bg-[#090A0F] border border-white/5 hover:bg-[#0D0F14] hover:border-white/10 shadow-lg hover:-translate-y-1 hover:shadow-xl justify-between flex flex-col min-h-[300px] transition-all duration-300 relative overflow-hidden block"
        >
          <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="flex justify-between items-start mb-12 relative z-10">
            <Badge
              variant="outline"
              className="border-border/40 font-mono text-[10px] uppercase tracking-widest bg-transparent text-muted-foreground"
            >
              RESEARCH PUBLICATION
            </Badge>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
              Neuro-Visual Interfaces
            </h3>
            <p className="text-[14px] text-white/50 leading-relaxed font-normal">
              A cross-modal semantic bridge projecting raw EEG waveforms
              directly into controllable stable diffusion latent states.
            </p>
          </div>
        </Link>

        {/* Minor project - 2 */}
        <Link
          href="/research"
          className="group p-8 rounded-[2rem] bg-[#090A0F] border border-white/5 hover:bg-[#0D0F14] hover:border-white/10 shadow-lg hover:-translate-y-1 hover:shadow-xl justify-between flex flex-col min-h-[300px] transition-all duration-300 relative overflow-hidden block"
        >
          <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="flex justify-between items-start mb-12 relative z-10">
            <Badge
              variant="outline"
              className="border-border/40 font-mono text-[10px] uppercase tracking-widest bg-transparent text-muted-foreground"
            >
              FRAMEWORK LIBRARY
            </Badge>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
              RLHF Toolkit v2
            </h3>
            <p className="text-[14px] text-white/50 leading-relaxed font-normal">
              Highly scalable alignment pipelines enabling low-VRAM fine-tuning
              and proxy-based reward modeling for local nodes.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
