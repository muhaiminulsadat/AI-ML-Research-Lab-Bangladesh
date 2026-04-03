import {
  BrainCircuit,
  Cpu,
  Network,
  Code2,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";

const domains = [
  {
    icon: BrainCircuit,
    title: "Generative Models",
    tag: "NeurIPS '24",
    desc: "Developing state-of-the-art transformers and diffusion architectures with robust structural coherence.",
  },
  {
    icon: Network,
    title: "Graph Neural Networks",
    tag: "ICML '24",
    desc: "Analyzing relational datasets for applications in molecular chemistry and predictive social dynamics.",
  },
  {
    icon: Zap,
    title: "Scalable Inference",
    tag: "MLSys '24",
    desc: "Optimizing model quantization, intelligent pruning, and low-latency serving infrastructure for edge constraints.",
  },
  {
    icon: Cpu,
    title: "Reinforcement Learning",
    tag: "ICLR '24",
    desc: "Training autonomous agents in simulated environments with complex multi-objective sparse reward parameters.",
  },
  {
    icon: Code2,
    title: "Algorithmic Alignment",
    tag: "ACL '24",
    desc: "Ensuring models behave identically to human constraints and absolute, verifiable mathematical safety bounds.",
  },
  {
    icon: Network,
    title: "Multimodal Processing",
    tag: "CVPR '24",
    desc: "Fusing text, spatio-visual, and auditory signals into cohesive massive embeddings for unified intelligence paradigms.",
  },
];

export default function DomainsSection() {
  return (
    <section className="border-t border-border/30 space-y-6">
      {/* ── Section header ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          {/* eyebrow */}
          <p className="font-mono text-[11px] tracking-[0.22em] text-primary/70 uppercase">
            // Focus Domains
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground leading-none">
            Where we push
            <br className="hidden sm:block" /> the boundaries
          </h2>
        </div>

        <p className="text-muted-foreground max-w-xs text-sm leading-relaxed sm:text-right">
          Investigating high-impact disciplines across the spectrum of
          theoretical and applied machine learning.
        </p>
      </div>

      {/* ── Cards grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain, i) => (
          <div
            key={i}
            className="group relative flex flex-col p-7 rounded-2xl
                       bg-secondary/10 border border-border/30
                       hover:border-primary/25 hover:bg-secondary/20
                       hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5
                       transition-all duration-300 cursor-default overflow-hidden"
          >
            {/* ── card top row: icon + index ── */}
            <div className="flex items-start justify-between mb-8">
              {/* icon box */}
              <div
                className="size-11 rounded-xl flex items-center justify-center shrink-0
                           bg-secondary/40 border border-border/25
                           group-hover:bg-primary/10 group-hover:border-primary/20
                           group-hover:scale-110 transition-all duration-300"
              >
                <domain.icon
                  className="size-[18px] text-muted-foreground
                             group-hover:text-primary transition-colors duration-300"
                />
              </div>

              {/* index number — fades out on hover, replaced by arrow */}
              <div className="relative size-6 flex items-center justify-center">
                <span
                  className="absolute font-mono text-[11px] text-muted-foreground/30
                             group-hover:opacity-0 transition-opacity duration-200"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  className="absolute size-3.5 text-primary opacity-0
                             group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            </div>

            {/* ── title + desc ── */}
            <div className="flex-1 space-y-2.5 mb-7">
              <h3 className="text-[17px] font-semibold tracking-tight text-foreground leading-snug">
                {domain.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {domain.desc}
              </p>
            </div>

            {/* ── conference tag ── */}
            <div className="flex items-center gap-2.5">
              <Separator className="flex-1 bg-border/25" />
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 rounded-full font-mono text-[10px]
                           tracking-widest text-primary/60 border-primary/15
                           bg-primary/5 uppercase shrink-0"
              >
                {domain.tag}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
